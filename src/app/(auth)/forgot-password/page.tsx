"use client";

import { useActionState } from "react";
import Link from "next/link";
import Image from "next/image";
import { forgotPasswordAction } from "./actions";

export default function ForgotPasswordPage() {
  const [message, formAction, pending] = useActionState(forgotPasswordAction, undefined);

  return (
    <div className="auth-shell">
      <div className="auth-logo auth-logo-compact">
        <Image
          src="/denkgang-logo-full.png"
          alt="Denkgang — Klinisches Denken trainieren für Tiertherapeuten"
          width={1033}
          height={1020}
          className="logo-img"
        />
      </div>
      <div className="card">
        <h3 style={{ marginBottom: 14 }}>Passwort vergessen</h3>
        <p style={{ marginTop: 0 }}>
          Gib deine E-Mail-Adresse ein. Falls dazu ein Konto existiert, bekommst du einen Link zum
          Zurücksetzen des Passworts.
        </p>
        <form action={formAction}>
          <div className="field">
            <label htmlFor="email">E-Mail</label>
            <input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          {message && <p className="feedback">{message}</p>}
          <div className="btn-row">
            <button type="submit" className="btn-primary" disabled={pending}>
              {pending ? "Wird gesendet…" : "Link anfordern"}
            </button>
          </div>
        </form>
      </div>
      <p className="auth-switch">
        <Link href="/login">← Zurück zur Anmeldung</Link>
      </p>
    </div>
  );
}
