import { randomBytes, createHash } from "crypto";

/** Hoch-entropisches Zufallstoken fuer den Reset-Link (als URL-Parameter). */
export function generateResetToken(): string {
  return randomBytes(32).toString("hex");
}

/** SHA-256-Hash des Tokens -- nur der Hash landet in der DB, nie das Token selbst. */
export function hashResetToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
