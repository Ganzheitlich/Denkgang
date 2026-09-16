"use client";

import { useActionState } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [error, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <div className="auth-shell">
      <div className="brand-row" style={{ marginBottom: 4 }}>
        <BrandMark size={32} />
        <div className="wordmark">Denkgang</div>
      </div>
      <div className="tagline">Klinisches Denken trainieren, nicht nur Fakten pauken.</div>
      <div className="card">
        <h3 style={{ marginBottom: 14 }}>Anmelden</h3>
        <form action={formAction}>
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
              autoComplete="current-password"
            />
          </div>
          {error && <p className="error-note">{error}</p>}
          <div className="btn-row">
            <button type="submit" className="btn-primary" disabled={pending}>
              {pending ? "Anmeldung läuft…" : "Anmelden"}
            </button>
          </div>
        </form>
      </div>
      <p className="auth-switch">
        Noch kein Konto? <Link href="/register">Jetzt registrieren</Link>
      </p>
    </div>
  );
}
