import Link from "next/link";

export default function ImpressumPage() {
  return (
    <div className="app">
      <div className="top-nav">
        <Link href="/" className="back-link">
          ← Zurück
        </Link>
      </div>
      <div className="case-title">Impressum</div>

      <div className="card">
        <p style={{ marginTop: 0 }}>Angaben gemäß § 5 DDG</p>
        <p>
          Vanessa Sander
          <br />
          Ganzheitlich Sander
          <br />
          Marktal 90
          <br />
          06493 Harzgerode
        </p>

        <p>
          <strong>Kontakt</strong>
          <br />
          E-Mail: tierheilpraxis.sander@gmx.de
        </p>

        <p style={{ marginBottom: 0 }}>
          <strong>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</strong>
          <br />
          Vanessa Sander (Anschrift wie oben)
        </p>
      </div>
    </div>
  );
}
