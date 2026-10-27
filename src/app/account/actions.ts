"use server";

import bcrypt from "bcryptjs";
import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { isRateLimited } from "@/lib/rateLimit";

const DELETE_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const DELETE_RATE_LIMIT_MAX_ATTEMPTS = 10;

/**
 * Loescht Konto und alle personenbezogenen Daten unwiderruflich (DSGVO-
 * Betroffenenrecht auf Loeschung, Art. 17). Lernfortschritt (CaseAttempt,
 * AnatomyAttempt, CaseSchedule, UserTopicMastery) ist per onDelete: Cascade
 * an den User gebunden, Inhalts-Autorenschaft (Case.createdBy/reviewedBy)
 * per onDelete: SetNull entkoppelt — beides schon im Schema so angelegt,
 * ein einzelnes prisma.user.delete reicht.
 */
export async function deleteAccountAction(
  _prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const session = await auth();
  if (!session?.user) {
    return "Nicht angemeldet.";
  }

  if (isRateLimited(`delete-account:${session.user.id}`, DELETE_RATE_LIMIT_WINDOW_MS, DELETE_RATE_LIMIT_MAX_ATTEMPTS)) {
    return "Zu viele Versuche. Bitte in ein paar Minuten erneut versuchen.";
  }

  const password = formData.get("password");
  if (typeof password !== "string" || password.length === 0) {
    return "Bitte dein Passwort eingeben.";
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return "Konto nicht gefunden.";
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return "Passwort ist falsch.";
  }

  await prisma.user.delete({ where: { id: user.id } });
  await signOut({ redirectTo: "/login" });
}
