import Link from "next/link";

export default function DatenschutzPage() {
  return (
    <div className="app">
      <div className="top-nav">
        <Link href="/" className="back-link">
          ← Zurück
        </Link>
      </div>
      <div className="case-title">Datenschutzerklärung</div>

      <h3 style={{ marginBottom: 10 }}>1. Verantwortliche Stelle</h3>
      <div className="card" style={{ marginBottom: 18 }}>
        <p style={{ marginTop: 0, marginBottom: 0 }}>
          Vanessa Sander (Ganzheitlich Sander)
          <br />
          Marktal 90, 06493 Harzgerode
          <br />
          E-Mail: tierheilpraxis.sander@gmx.de
        </p>
      </div>

      <h3 style={{ marginBottom: 10 }}>2. Welche Daten wir verarbeiten</h3>
      <div className="card" style={{ marginBottom: 18 }}>
        <p style={{ marginTop: 0 }}>
          Bei der Registrierung: E-Mail-Adresse, Passwort (ausschließlich als Hash gespeichert, nie
          im Klartext), optional ein Name.
        </p>
        <p style={{ marginBottom: 0 }}>
          Bei der Nutzung: dein Lernfortschritt (bearbeitete Fälle, Übungsverlauf, Antworten,
          eingeschätzte Sicherheit, Wiederholungs-Zeitpunkte). Diese Daten sind notwendig, um dir
          die Lernplattform überhaupt bereitstellen zu können (z. B. damit du dort weitermachen
          kannst, wo du aufgehört hast).
        </p>
      </div>

      <h3 style={{ marginBottom: 10 }}>3. Rechtsgrundlage</h3>
      <div className="card" style={{ marginBottom: 18 }}>
        <p style={{ marginTop: 0, marginBottom: 0 }}>
          Die Verarbeitung erfolgt zur Erfüllung des Nutzungsverhältnisses (Art. 6 Abs. 1 lit. b
          DSGVO) bzw., soweit es um den Schutz vor Missbrauch geht (z. B. die Begrenzung von
          Anmeldeversuchen gegen automatisiertes Passwort-Raten), auf Grundlage unseres
          berechtigten Interesses an einem sicheren Betrieb der Plattform (Art. 6 Abs. 1 lit. f
          DSGVO).
        </p>
      </div>

      <h3 style={{ marginBottom: 10 }}>4. Hosting und Auftragsverarbeiter</h3>
      <div className="card" style={{ marginBottom: 18 }}>
        <p style={{ marginTop: 0 }}>
          Diese Anwendung läuft bei <strong>Vercel Inc.</strong> (Hosting) und nutzt{" "}
          <strong>Neon</strong> als Datenbank-Anbieter (Serverstandort Frankfurt). Beide Anbieter
          verarbeiten Daten in unserem Auftrag.
        </p>
        <p style={{ marginBottom: 0 }}>
          Soweit dabei Daten in die USA übermittelt werden, geschieht dies auf Grundlage von
          EU-Standardvertragsklauseln bzw. eines Angemessenheitsbeschlusses (EU-US Data Privacy
          Framework), sofern der jeweilige Anbieter daran teilnimmt. Der aktuelle Status wird
          laufend geprüft.
        </p>
      </div>

      <h3 style={{ marginBottom: 10 }}>5. Speicherdauer</h3>
      <div className="card" style={{ marginBottom: 18 }}>
        <p style={{ marginTop: 0, marginBottom: 0 }}>
          Deine Daten bleiben gespeichert, solange dein Konto besteht. Du kannst dein Konto und
          alle damit verbundenen Daten jederzeit selbst und dauerhaft löschen, unter{" "}
          <Link href="/account">Mein Konto</Link>.
        </p>
      </div>

      <h3 style={{ marginBottom: 10 }}>6. Technisch notwendige Daten (Cookies)</h3>
      <div className="card" style={{ marginBottom: 18 }}>
        <p style={{ marginTop: 0, marginBottom: 0 }}>
          Wir setzen ein technisch notwendiges Session-Cookie ein, um dich nach dem Login
          angemeldet zu halten. Dieses Cookie ist für den Betrieb der Plattform erforderlich und
          dient keinen Analyse- oder Werbezwecken.
        </p>
      </div>

      <h3 style={{ marginBottom: 10 }}>7. Deine Rechte</h3>
      <div className="card" style={{ marginBottom: 18 }}>
        <p style={{ marginTop: 0 }}>
          Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art.
          17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und
          Widerspruch (Art. 21) gegen die Verarbeitung deiner Daten.
        </p>
        <p style={{ marginBottom: 0 }}>
          Wende dich dafür an die oben genannte Kontakt-E-Mail-Adresse. Außerdem hast du das Recht,
          dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
        </p>
      </div>

      <h3 style={{ marginBottom: 10 }}>8. Keine Weitergabe an Dritte</h3>
      <div className="card">
        <p style={{ marginTop: 0, marginBottom: 0 }}>
          Deine Daten werden nicht an Dritte verkauft oder für Werbezwecke weitergegeben. Eine
          Weitergabe erfolgt ausschließlich an die oben genannten Auftragsverarbeiter, soweit dies
          für den Betrieb der Plattform notwendig ist.
        </p>
      </div>
    </div>
  );
}
