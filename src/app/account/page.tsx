import Link from "next/link";
import { requireSession } from "@/lib/auth-helpers";
import { DeleteAccountForm } from "@/components/DeleteAccountForm";

const ROLE_LABELS: Record<string, string> = {
  STUDENT: "Lernende:r",
  REVIEWER: "Reviewer:in",
  ADMIN: "Admin",
};

export default async function AccountPage() {
  const session = await requireSession();
  const user = session.user;

  return (
    <div className="app">
      <div className="top-nav">
        <Link href="/dashboard" className="back-link">
          ← Zur Übersicht
        </Link>
        <span className="tag">Konto</span>
      </div>
      <div className="case-title">Mein Konto</div>

      <div className="card" style={{ marginBottom: 18 }}>
        <p style={{ marginTop: 0 }}>
          <strong>E-Mail:</strong> {user.email}
        </p>
        <p style={{ marginBottom: 0 }}>
          <strong>Rolle:</strong> {ROLE_LABELS[user.role] ?? user.role}
        </p>
      </div>

      <h3 style={{ marginBottom: 10 }}>Konto löschen</h3>
      <div className="disclaimer" style={{ marginBottom: 14 }}>
        Löscht dein Konto und alle damit verbundenen personenbezogenen Daten dauerhaft — das kann
        nicht rückgängig gemacht werden. Dein Lernfortschritt (bearbeitete Fälle, Übungsverlauf)
        wird vollständig entfernt. Bereits von dir verfasste oder geprüfte Lerninhalte bleiben
        erhalten, werden aber nicht mehr dir zugeordnet.
      </div>
      <div className="card">
        <DeleteAccountForm />
      </div>
    </div>
  );
}
