import { redirect } from "next/navigation";
import { auth } from "@/auth";

/**
 * Ersetzt die urspruengliche middleware/proxy-basierte Zugriffskontrolle:
 * Netlifys Next.js-Runtime kam mit der Edge-Function-Variante nicht zurecht
 * ("nextHandler ist keine Funktion" auf jeder Seite). Jede geschuetzte Seite
 * prueft die Sitzung jetzt stattdessen selbst, direkt im bereits erprobten
 * Server-Handler-Pfad.
 */
export async function requireSession() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return session;
}

export async function requireReviewerSession() {
  const session = await requireSession();
  if (session.user.role !== "REVIEWER" && session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }
  return session;
}
