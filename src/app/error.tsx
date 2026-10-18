"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="app">
      <div className="case-title">Etwas ist schiefgelaufen</div>
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
          Diese Seite konnte gerade nicht geladen werden. Das liegt nicht an deiner Eingabe — bitte
          versuche es erneut.
        </p>
      </div>
      <div className="btn-row">
        <button className="btn-primary" onClick={reset}>
          Erneut versuchen
        </button>
        <Link href="/dashboard" className="btn-secondary">
          Zur Übersicht
        </Link>
      </div>
    </div>
  );
}
