/**
 * Minimaler E-Mail-Versand ueber die Resend-HTTP-API (kein SDK-Paket, nur
 * fetch) -- bewusst so gebaut, dass die Funktion schon vollstaendig steht,
 * aber erst aktiv wird, sobald RESEND_API_KEY gesetzt ist. Ohne Key (aktueller
 * Stand: noch kein E-Mail-Anbieter eingerichtet) wird der Link stattdessen nur
 * ins Server-Log geschrieben -- so laesst sich der Passwort-Reset-Ablauf schon
 * jetzt lokal testen, ohne auf ein externes Konto zu warten.
 */
export async function sendPasswordResetEmail(email: string, resetUrl: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    console.warn(
      `[mail] Kein E-Mail-Anbieter konfiguriert (RESEND_API_KEY/RESEND_FROM_EMAIL fehlt). ` +
        `Passwort-Reset-Link fuer ${email}: ${resetUrl}`,
    );
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: email,
      subject: "Denkgang — Passwort zurücksetzen",
      html: `<p>Hallo,</p><p>klicke auf den folgenden Link, um dein Denkgang-Passwort zurückzusetzen. Der Link ist eine Stunde gültig.</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>Falls du das nicht angefordert hast, kannst du diese E-Mail ignorieren.</p>`,
    }),
  });

  if (!response.ok) {
    console.error(`[mail] Versand an Resend fehlgeschlagen (Status ${response.status}) für ${email}`);
  }
}
