"use client";

import { useActionState } from "react";
import { resetPasswordAction } from "./actions";

export function ResetPasswordForm({ token }: { token: string }) {
  const boundAction = resetPasswordAction.bind(null, token);
  const [error, formAction, pending] = useActionState(boundAction, undefined);

  return (
    <form action={formAction}>
      <div className="field">
        <label htmlFor="password">Neues Passwort</label>
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
          {pending ? "Wird gespeichert…" : "Passwort speichern"}
        </button>
      </div>
    </form>
  );
}
