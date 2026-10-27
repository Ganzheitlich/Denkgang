"use client";

import { useActionState, useState } from "react";
import { deleteAccountAction } from "@/app/account/actions";

export function DeleteAccountForm() {
  const [error, formAction, pending] = useActionState(deleteAccountAction, undefined);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <form action={formAction}>
      <div className="field">
        <label htmlFor="delete-password">Passwort zur Bestätigung</label>
        <input id="delete-password" name="password" type="password" required autoComplete="current-password" />
      </div>
      <label style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13.5, marginBottom: 14 }}>
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          style={{ marginTop: 3 }}
        />
        <span>
          Ja, ich möchte mein Konto und alle damit verbundenen Daten (Lernfortschritt, Übungsverlauf)
          unwiderruflich löschen.
        </span>
      </label>
      {error && <p className="error-note">{error}</p>}
      <div className="btn-row" style={{ marginTop: 0 }}>
        <button type="submit" className="btn-danger" disabled={pending || !confirmed}>
          {pending ? "Konto wird gelöscht…" : "Konto endgültig löschen"}
        </button>
      </div>
    </form>
  );
}
