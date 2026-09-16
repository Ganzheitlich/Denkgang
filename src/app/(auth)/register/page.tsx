"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerAction } from "./actions";

export default function RegisterPage() {
  const [error, formAction, pending] = useActionState(registerAction, undefined);

  return (
    <div className="auth-shell">
      <div className="wordmark">Denkgang</div>
      <div className="tagline">Klinisches Denken trainieren, nicht nur Fakten pauken.</div>
      <div className="card">
        <h3 style={{ marginBottom: 14 }}>Konto erstellen</h3>
        <form action={formAction}>
          <div className="field">
            <label htmlFor="name">Name (optional)</label>
            <input id="name" name="name" type="text" autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="email">E-Mail</label>
            <input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="password">Passwort</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>
          {error && <p className="error-note">{error}</p>}
          <div className="btn-row">
            <button type="submit" className="btn-primary" disabled={pending}>
              {pending ? "Konto wird angelegt…" : "Registrieren"}
            </button>
          </div>
        </form>
      </div>
      <p className="auth-switch">
        Schon ein Konto? <Link href="/login">Jetzt anmelden</Link>
      </p>
    </div>
  );
}
