# Hosting & Datenbank — Empfehlung zum Start

Entscheidung laut Projektbrief: "Wähl die Option, die am einfachsten einzurichten und günstig
zum Starten ist." Diese Kombination erfüllt das mit minimalem Konto-/Konfigurationsaufwand.
Die eigentliche Account-Erstellung und Freischaltung kann nur die Produktinhaberin selbst
vornehmen (Zugangsdaten, Zahlungsinformationen) — dieses Dokument beschreibt die Schritte dafür.

## Empfehlung

| Zweck | Wahl | Warum |
|---|---|---|
| Datenbank | **Neon** (serverless Postgres) | Kostenloser Einstiegsplan, in wenigen Minuten eingerichtet, funktioniert direkt mit dem bereits eingebundenen `@prisma/adapter-neon`. |
| Hosting | **Netlify** | Im Environment bereits als Integration verbunden, offizielle Next.js-Runtime, kostenloser Plan reicht für den Start. |
| Mediendateien (später) | **Netlify Blobs** oder **Supabase Storage** | Erst relevant, sobald echtes Bild-/Videomaterial vorliegt (siehe Projektbrief, Punkt 5). Keine Einrichtung nötig, solange die Mediathek nur Platzhalter enthält. |

## 1. Datenbank bei Neon einrichten

1. Auf [neon.tech](https://neon.tech) registrieren (kostenloser Plan reicht zum Start).
2. Neues Projekt anlegen, Region wählen.
3. Die angezeigte Connection-String (`postgresql://...`) kopieren.
4. Da das Projekt Prisma 7 mit Driver-Adapter nutzt, zusätzlich installieren:
   ```bash
   npm install @prisma/adapter-neon
   ```
   und in `src/lib/prisma.ts` `PrismaPg` durch `PrismaNeon` aus `@prisma/adapter-neon`
   ersetzen (gleiche Aufruf-Signatur, nur der Import ändert sich) — siehe
   [Prisma-Doku zu Driver-Adaptern](https://www.prisma.io/docs/orm/overview/databases/neon).
   Alternativ funktioniert die Neon-URL auch unverändert mit dem aktuell verwendeten
   `@prisma/adapter-pg`, solange die Verbindung im "pooled" Modus über TCP läuft — für den
   Start ausreichend, der Wechsel auf den Neon-eigenen Adapter ist eine spätere Optimierung.
5. `DATABASE_URL` in den Produktions-Umgebungsvariablen (Netlify, siehe unten) auf diese
   Connection-String setzen.
6. Einmalig gegen die neue Datenbank migrieren und den Content seeden:
   ```bash
   DATABASE_URL="<neon-connection-string>" npx prisma migrate deploy
   DATABASE_URL="<neon-connection-string>" npx prisma db seed
   ```

## 2. Hosting bei Netlify einrichten

1. Repository in Netlify verbinden (Import from Git).
2. Netlify erkennt Next.js automatisch (Build-Command `next build`, keine weitere
   Konfiguration nötig dank offizieller Next.js-Runtime).
3. Unter **Site settings → Environment variables** setzen:
   - `DATABASE_URL` — Neon-Connection-String
   - `NEXTAUTH_SECRET` — mit `openssl rand -base64 32` erzeugen
   - `NEXTAUTH_URL` — die endgültige Netlify-URL (z. B. `https://denkgang.netlify.app`)
   - `ANTHROPIC_API_KEY` — nur serverseitig verwendet, niemals als "public"/`NEXT_PUBLIC_`
     Variable anlegen
   - `ADMIN_EMAILS` — E-Mail-Adresse(n), die sich bei Registrierung automatisch die Rolle
     `ADMIN` geben (Reviewerin)
4. Deploy auslösen.

## Sicherheitshinweis zu `ANTHROPIC_API_KEY`

Der Prototyp rief die Anthropic-API direkt aus dem Browser auf — dabei wäre der Key im
Frontend-Code sichtbar gewesen. In dieser App läuft der Aufruf ausschließlich über die
Route `/api/cases/[id]/evaluate-explanation` auf dem Server; der Key wird nie an den Client
ausgeliefert. Beim Einrichten der Umgebungsvariable in Netlify darauf achten, sie **nicht**
mit dem Präfix `NEXT_PUBLIC_` zu versehen — das würde sie ins Client-Bundle einbetten.

## Spätere Erweiterung: echte Mediendateien

Sobald echtes Bild-/Videomaterial für die Mediathek vorliegt (Projektbrief, Punkt 5), kann
`MediaAsset.storageUrl` auf eine URL bei Netlify Blobs oder einem S3-kompatiblen Speicher
zeigen. Bis dahin bleibt das Feld leer und die Mediathek zeigt nur die vorbereiteten
Platzhalter-Einträge (Titel, Typ, Zuordnung zu Fällen) — genau wie im Prototyp vorgesehen.
