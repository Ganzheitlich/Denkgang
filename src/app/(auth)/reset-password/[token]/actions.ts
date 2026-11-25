"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { isRateLimited, clientIpFromHeaders } from "@/lib/rateLimit";
import { hashResetToken } from "@/lib/passwordResetToken";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 10;

const passwordSchema = z.string().min(8, "Das Passwort muss mindestens 8 Zeichen haben.");

export async function resetPasswordAction(
  token: string,
  _prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const ip = clientIpFromHeaders(await headers());
  if (isRateLimited(`reset-password:${ip}`, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_ATTEMPTS)) {
    return "Zu viele Versuche. Bitte in ein paar Minuten erneut versuchen.";
  }

  const parsed = passwordSchema.safeParse(formData.get("password"));
  if (!parsed.success) {
    return parsed.error.issues[0]?.message ?? "Ungültige Eingabe.";
  }

  const tokenHash = hashResetToken(token);
  const resetToken = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });

  if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
    return "Dieser Link ist ungültig oder abgelaufen. Bitte fordere einen neuen an.";
  }

  const passwordHash = await bcrypt.hash(parsed.data, 12);

  await prisma.$transaction([
    prisma.user.update({ where: { id: resetToken.userId }, data: { passwordHash } }),
    // Alle offenen Reset-Tokens dieses Nutzers entwerten -- ein benutzter Link
    // und eventuelle aeltere, noch unbenutzte Links sollen danach nicht mehr
    // funktionieren.
    prisma.passwordResetToken.deleteMany({ where: { userId: resetToken.userId } }),
  ]);

  redirect("/login?reset=success");
}
