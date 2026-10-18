import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="app">
      <div className="case-title">Seite nicht gefunden</div>
      <div className="empty-state">
        <Image
          src="/denkgang-mark.png"
          alt=""
          width={873}
          height={873}
          className="logo-img empty-state-mark"
          style={{ width: 36, height: 36 }}
        />
        <p style={{ margin: 0 }}>
          Diese Seite gibt es nicht (mehr) — oder der Inhalt ist noch nicht freigegeben.
        </p>
      </div>
      <div className="btn-row">
        <Link href="/dashboard" className="btn-primary">
          Zur Übersicht
        </Link>
      </div>
    </div>
  );
}
