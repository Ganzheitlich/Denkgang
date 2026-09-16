# Hosting & Datenbank — Stand & letzter manueller Schritt

Entscheidung laut Projektbrief: "Wähl die Option, die am einfachsten einzurichten und günstig
zum Starten ist." Umgesetzt wurde die engste mögliche Integration: **Netlify DB**, Netlifys
eigene, auf Neon basierende Postgres-Extension — keine separate Kontoerstellung bei einem
zweiten Anbieter nötig, da bereits ein Netlify-Konto verbunden ist.

## Was bereits erledigt ist

- Das bestehende Netlify-Projekt **denkgang** (`https://denkgang.netlify.app`, bisher nur ein
  manuell hochgeladener Prototyp-Screenshot) ist das Ziel für den echten App-Deploy.
- Die **Neon-Extension ("Netlify DB")** ist für dieses Projekt installiert und initialisiert
  (`@netlify/database` ist als Abhängigkeit im Projekt enthalten). Sie provisioniert die
  Postgres-Datenbank automatisch beim nächsten Build — kein manuelles Anlegen, kein
  Verbindungsstring von Hand kopieren.
- `src/lib/prisma.ts` und `prisma/seed.ts` lesen die Verbindung über `getConnectionString()`
  aus `@netlify/database` (mit Fallback auf die lokale `DATABASE_URL` für die Entwicklung).
- Die Prisma-Migrationen sind zusätzlich unter `netlify/database/migrations/` gespiegelt —
  Netlify wendet sie automatisch vor jedem Deploy auf die (automatisch erstellte) Datenbank an.
- `netlify.toml` legt den Build-Befehl (`npx prisma generate && next build`) und das
  offizielle Next.js-Plugin fest.
- Umgebungsvariablen sind auf dem Netlify-Projekt bereits gesetzt: `NEXTAUTH_SECRET` (zufällig
  generiert), `NEXTAUTH_URL` (`https://denkgang.netlify.app`), `ADMIN_EMAILS`
  (`gruenebergvanessa@gmail.com` — dieses Konto bekommt bei Registrierung automatisch die
  Rolle `ADMIN`).

## Was noch fehlt — ein manueller Klick

**`ANTHROPIC_API_KEY` ist noch nicht gesetzt** (nur die Produktinhaberin hat diesen Key).
Ohne ihn läuft die App normal, die Begründungs-Auswertung zeigt aber den Hinweis
"Automatischer Vergleich gerade nicht verfügbar" statt einer echten Rückmeldung.
Zum Ergänzen: **Netlify → Projekt "denkgang" → Site settings → Environment variables → Add a
variable** → Key `ANTHROPIC_API_KEY`, Scope "all", **nicht** mit Präfix `NEXT_PUBLIC_`
versehen (sonst würde er ins Client-Bundle eingebettet).

**Das GitHub-Repository ist noch nicht mit dem Netlify-Projekt verknüpft.** Der Versuch, das
Deployment automatisiert über die verbundene Netlify-Integration anzustoßen, ist an der
Netzwerk-Policy dieser Sandbox gescheitert (der dafür nötige Proxy-Host
`netlify-mcp.netlify.app` ist für diese Sitzung nicht freigegeben — kein Problem, das sich von
hier aus umgehen lässt). Der zuverlässigere und für die Zukunft ohnehin bessere Weg ist eine
direkte Git-Anbindung (jeder Push löst automatisch einen Build aus, statt manueller Deploys):

1. [https://app.netlify.com/projects/denkgang](https://app.netlify.com/projects/denkgang) öffnen.
2. **Site configuration → Build & deploy → Continuous deployment → Link repository**
   (oder "Link site to Git").
3. GitHub autorisieren, Repository `Ganzheitlich/Denkgang` auswählen.
4. Als Branch `claude/projektbrief-prototyp-analyse-gos89f` wählen (oder vorher nach `main`
   mergen, je nachdem wie weitergearbeitet werden soll).
5. Build-Einstellungen werden aus `netlify.toml` übernommen — nichts weiter einzustellen.
6. Deploy auslösen (passiert nach dem Verknüpfen automatisch).

Sobald das verknüpft ist, provisioniert Netlify beim ersten Build automatisch die Datenbank,
wendet die Migrationen an und die App ist unter `https://denkgang.netlify.app` live. Der
Seed-Content (8 Fälle, 7 Anatomie-Items, 3 Medien, Status `DRAFT`) muss danach einmalig über
`npx prisma db seed` gegen die Produktions-DB eingespielt werden — entweder lokal mit der
Netlify-Connection-String (**Site settings → Environment variables → NETLIFY_DB_URL**, falls
dort sichtbar) oder in einem zukünftigen Claude-Code-Lauf, der auf die verknüpfte Seite Zugriff
hat.

## Sicherheitshinweis zu `ANTHROPIC_API_KEY`

Der Prototyp rief die Anthropic-API direkt aus dem Browser auf — dabei wäre der Key im
Frontend-Code sichtbar gewesen. In dieser App läuft der Aufruf ausschließlich über die Route
`/api/cases/[id]/evaluate-explanation` auf dem Server; der Key wird nie an den Client
ausgeliefert.

## Spätere Erweiterung: echte Mediendateien

Sobald echtes Bild-/Videomaterial für die Mediathek vorliegt (Projektbrief, Punkt 5), kann
`MediaAsset.storageUrl` auf eine URL bei Netlify Blobs oder einem S3-kompatiblen Speicher
zeigen. Bis dahin bleibt das Feld leer und die Mediathek zeigt nur die vorbereiteten
Platzhalter-Einträge (Titel, Typ, Zuordnung zu Fällen) — genau wie im Prototyp vorgesehen.
