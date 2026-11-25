"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isRateLimited, clientIpFromHeaders } from "@/lib/rateLimit";
import { generateResetToken, hashResetToken } from "@/lib/passwordResetToken";
import { sendPasswordResetEmail } from "@/lib/mail";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 5;
const TOKEN_TTL_MS = 60 * 60 * 1000;

const emailSchema = z.string().email();

const GENERIC_MESSAGE =
  "Falls ein Konto mit dieser E-Mail-Adresse existiert, haben wir eine E-Mail mit einem Link zum Zurücksetzen des Passworts gesendet.";

/**
 * Antwortet absichtlich IMMER mit derselben generischen Meldung, unabhaengig
 * davon, ob die E-Mail-Adresse tatsaechlich zu einem Konto gehoert -- sonst
 * liesse sich das Formular zum Durchprobieren/Enumerieren existierender
 * Konten missbrauchen.
 */
export async function forgotPasswordAction(
  _prevState: string | undefined,
  formData: FormData,
): Promise<string> {
  const parsed = emailSchema.safeParse(formData.get("email"));
  if (!parsed.success) {
    return "Bitte eine gültige E-Mail-Adresse angeben.";
  }
  const email = parsed.data;

  const ip = clientIpFromHeaders(await headers());
  if (
    isRateLimited(`forgot-password:ip:${ip}`, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_ATTEMPTS) ||
    isRateLimited(`forgot-password:email:${email.toLowerCase()}`, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_ATTEMPTS)
  ) {
    return GENERIC_MESSAGE;
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    const token = generateResetToken();
    await prisma.passwordResetToken.create({
      data: {
        tokenHash: hashResetToken(token),
        userId: user.id,
        expiresAt: new Date(Date.now() + TOKEN_TTL_MS),
      },
    });

    const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
    const resetUrl = `${baseUrl}/reset-password/${token}`;
    await sendPasswordResetEmail(email, resetUrl);
  }

  return GENERIC_MESSAGE;
}
