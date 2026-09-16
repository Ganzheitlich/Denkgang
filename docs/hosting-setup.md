# Hosting & Datenbank — Stand & letzter manueller Schritt

## Vor dem finalen Live-Gang nicht vergessen

- **`ANTHROPIC_API_KEY` bewusst noch nicht gesetzt** — Entscheidung der Produktinhaberin
  (16.09., "wir verzichten erstmal auf die API"). Die Begründungs-Auswertung läuft bis dahin im
  Fallback-Modus ("Automatischer Vergleich gerade nicht verfügbar"), der Rest der App
  funktioniert unverändert. Vor dem finalen Live-Gang ergänzen, siehe unten.

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

**`ANTHROPIC_API_KEY` ist bewusst noch nicht gesetzt** (Entscheidung der Produktinhaberin, s.
o.). Ohne ihn läuft die App normal, die Begründungs-Auswertung zeigt aber den Hinweis
"Automatischer Vergleich gerade nicht verfügbar" statt einer echten Rückmeldung. Zum Ergänzen,
sobald gewünscht: **Netlify → Projekt "denkgang" → Site settings → Environment variables → Add
a variable** → Key `ANTHROPIC_API_KEY`, Scope "all", **nicht** mit Präfix `NEXT_PUBLIC_`
versehen (sonst würde er ins Client-Bundle eingebettet).

## Erledigt: GitHub-Repository verknüpft, App live

Das Repository ist mit dem Netlify-Projekt verknüpft (Continuous Deployment — jeder Push auf
`claude/projektbrief-prototyp-analyse-gos89f` löst automatisch einen Build aus). Die App läuft
unter `https://denkgang.netlify.app`, Datenbank-Migrationen werden automatisch angewendet, der
Prototyp-Content ist über `/api/admin/seed` eingespielt (siehe unten).

## Wichtige Falle: Umgebungsvariablen NICHT als "secret" markieren

Sowohl `SEED_SECRET` als auch `NEXTAUTH_SECRET` wurden zunächst mit dem Secret-Flag
(`envVarIsSecret: true`) gesetzt — dadurch waren sie zwar in der Netlify-UI vor Blicken
geschützt, aber **im Functions-Laufzeitkontext nicht als `process.env`-Wert verfügbar**. Das
äußerte sich als "SEED_SECRET nicht konfiguriert" bzw. bei NextAuth als "Es gab ein Problem mit
der Serverkonfiguration" bei jedem Login-/Registrierungsversuch (NextAuth braucht den Secret
nur beim tatsächlichen Erzeugen/Prüfen eines Sessions-JWT, nicht beim bloßen Seitenaufruf — das
hat die Fehlersuche erschwert, weil die Seiten selbst normal luden). Fix: alle Variablen als
normale (nicht "secret") Variable mit allen vier Scopes (`builds`, `functions`, `runtime`,
`post_processing`) setzen. **Für neue Variablen auf diesem Projekt immer so vorgehen**, bis
geklärt ist, ob das ein generelles Verhalten dieses Netlify-Plans ist oder ein einmaliger
Fehler.

## Admin-Seed-Endpunkt

`GET /api/admin/seed?secret=<SEED_SECRET>` (Wert steht in den Netlify-Umgebungsvariablen)
spielt den Prototyp-Content idempotent ein — kann bei Bedarf erneut aufgerufen werden (z. B.
nach einer Schema-Änderung), ohne Duplikate zu erzeugen.

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
