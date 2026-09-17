"use client";

import { useActionState } from "react";
import Link from "next/link";
import Image from "next/image";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [error, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <div className="auth-shell">
      <div className="auth-logo">
        <Image
          src="/denkgang-logo-full.png"
          alt="Denkgang — Klinisches Denken trainieren für Tiertherapeuten"
          width={1033}
          height={1020}
          priority
          className="logo-img"
        />
      </div>
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
