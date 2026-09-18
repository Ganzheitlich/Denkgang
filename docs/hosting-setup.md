# Hosting & Datenbank — Umzug von Netlify zu Vercel + Neon

## Status: Umzug abgeschlossen, App live auf Vercel

Live unter **`https://denkgang.vercel.app`**. Datenbank ist Neon (Projekt "Denkgang", Region
Frankfurt, kostenloser Plan). Content ist über `/api/admin/seed` eingespielt, erster Testaccount
über `/register` angelegt und Login funktioniert.

### Stolpersteine beim ersten Deploy (falls das nochmal passiert)

1. **Beim Aufräumen doppelter Environment Variables versehentlich die einzige `DATABASE_URL` für
   "Production" mitgelöscht** (nur die für "Development" blieb übrig) → Build brach mit
   `Error: The datasource.url property is required...` ab. Fix: `DATABASE_URL` erneut aus Neon
   kopieren und explizit mit Häkchen bei "Production" neu anlegen.
2. **Tippfehler `ADMIN_E-MAILS` statt `ADMIN_EMAILS`** — der Code liest exakt `ADMIN_EMAILS`,
   jede Abweichung (Bindestrich, Leerzeichen, Groß-/Kleinschreibung) wird ignoriert.
3. **`MissingSecret`-Fehler von Auth.js trotz gesetztem `NEXTAUTH_SECRET`** — Ursache nicht
   abschließend geklärt (evtl. ein leerer/beschädigter Wert durch einen früheren Bearbeitungsschritt),
   behoben durch Löschen und Neuanlegen der Variable mit frischem Wert. Falls das nochmal auftritt:
   Variable komplett löschen und neu anlegen statt nur den Wert zu editieren.

Allgemein: Nach jeder Änderung an Environment Variables löst Vercel automatisch einen neuen
Production-Build aus — kein manueller Push nötig, aber die Vercel-Logs (Runtime Logs, nicht nur
Build-Logs) sind die zuverlässigste Quelle für die tatsächliche Fehlerursache, da die Website
selbst bei Auth-Fehlern nur eine generische Meldung zeigt.

## Warum umziehen

Netlifys kostenloses Team-Kontingent (Build-Minuten) ist aufgebraucht (siehe unten, historischer
Abschnitt) und lässt sich ohne Kreditkarte nicht aufladen. Ziel ist ein Hosting-Setup, das mit
einem kostenlosen Konto ganz ohne Kreditkarte funktioniert.

**Empfehlung: Vercel (Hosting) + Neon (Datenbank direkt).**

- **Vercel** ist von den Next.js-Machern selbst, der kostenlose "Hobby"-Plan braucht keine
  Kreditkarte zur Anmeldung, und die Next.js-Unterstützung (Server Actions, Route Handler) ist
  dort nativer als Netlifys Next.js-Adapter.
- **Neon** ist die Postgres-Datenbank, die hinter "Netlify DB" ohnehin schon lief — wir wechseln
  also nur direkt zur Quelle. Ebenfalls kostenlos ohne Kreditkarte.

## Code-seitig bereits vorbereitet (erledigt)

- `src/lib/prisma.ts` und `prisma/seed.ts` nutzen jetzt eine normale `DATABASE_URL` statt
  Netlifys `getConnectionString()` — funktioniert mit jeder Postgres-Verbindung (Neon, Supabase,
  lokal, etc.), nicht mehr an Netlify gebunden.
- `@netlify/database` als Abhängigkeit entfernt (`package.json`, `package-lock.json`).
- `netlify.toml` und `netlify/database/migrations/` (die für Netlifys Auto-Migrations-Mechanismus
  gespiegelten Migrationsdateien) entfernt — nicht mehr nötig.
- `package.json`-Build-Skript umgestellt auf
  `"prisma migrate deploy && prisma generate && next build"` — das wendet Datenbank-Migrationen
  jetzt direkt beim Build an (Vercel hat keinen Netlify-äquivalenten separaten
  Migrations-Mechanismus, aber `prisma migrate deploy` im Build-Schritt übernimmt das genauso
  zuverlässig, solange `DATABASE_URL` zur Build-Zeit gesetzt ist).
- `src/auth.ts` (`trustHost: true`) funktioniert unverändert auf Vercel.

## Was Vanessa manuell tun muss (kann ich nicht für sie erledigen)

Kontoerstellung und die erste Verknüpfung müssen über die jeweilige Web-Oberfläche laufen, dafür
gibt es keine Automatisierung von hier aus.

### 1. Neon-Datenbank anlegen

1. Auf [neon.tech](https://neon.tech) mit GitHub- oder Google-Konto anmelden (kein
   Kreditkarte nötig für den Free-Tier).
2. Neues Projekt anlegen, z. B. Name "denkgang".
3. Die angezeigte **Connection String** kopieren (Format
   `postgresql://<user>:<passwort>@<host>/<db>?sslmode=require`).

### 2. Vercel-Projekt anlegen

1. Auf [vercel.com](https://vercel.com) mit dem GitHub-Konto anmelden (kein Kreditkarte nötig
   für den Hobby-Plan).
2. "Add New… → Project" → das GitHub-Repository `Ganzheitlich/Denkgang` auswählen und
   importieren.
3. Als Branch für die Produktion `claude/projektbrief-prototyp-analyse-gos89f` einstellen
   (Vercel nimmt sonst automatisch den Default-Branch — in den Projekteinstellungen unter
   "Git" bei Bedarf anpassen).
4. Framework wird automatisch als "Next.js" erkannt, keine weiteren Build-Einstellungen nötig
   (das Build-Skript steckt bereits in `package.json`).

### 3. Umgebungsvariablen in Vercel setzen

Unter Project Settings → Environment Variables, jeweils für "Production" (und gerne auch
"Preview"):

| Key | Wert |
|---|---|
| `DATABASE_URL` | Die Neon-Connection-String aus Schritt 1 |
| `NEXTAUTH_SECRET` | Neu generieren, z. B. mit `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Die Vercel-URL, z. B. `https://denkgang.vercel.app` (nach dem ersten Deploy bekannt) |
| `ADMIN_EMAILS` | `gruenebergvanessa@gmail.com` |
| `SEED_SECRET` | Ein selbst gewähltes langes Zufalls-Secret (schützt `/api/admin/seed`) |
| `ANTHROPIC_API_KEY` | **Bewusst weiterhin nicht setzen** — siehe Abschnitt unten |

Anders als bei Netlify gibt es bei Vercel keine "secret vs. normal"-Falle (siehe historischer
Abschnitt unten) — alle Variablen sind dort einheitlich zur Laufzeit verfügbar.

### 4. Nach dem ersten Deploy

1. Prüfen, dass der Build durchläuft (Vercel zeigt Build-Logs live an).
2. `NEXTAUTH_URL` ggf. auf die tatsächliche Vercel-URL nachziehen, falls sie beim ersten Setup
   noch nicht final feststand, und neu deployen.
3. Content einspielen: `https://<vercel-url>/api/admin/seed?secret=<SEED_SECRET>` im Browser
   aufrufen (idempotent, siehe unten).
4. Wie gewohnt unter `/review` die gewünschten Fälle freigeben.

## Vor dem finalen Live-Gang nicht vergessen

- **`ANTHROPIC_API_KEY` bewusst noch nicht gesetzt** — Entscheidung der Produktinhaberin
  (16.09., "wir verzichten erstmal auf die API"). Die Begründungs-Auswertung läuft bis dahin im
  Fallback-Modus ("Automatischer Vergleich gerade nicht verfügbar"), der Rest der App
  funktioniert unverändert.

## Admin-Seed-Endpunkt

`GET /api/admin/seed?secret=<SEED_SECRET>` spielt den Prototyp-Content idempotent ein — kann bei
Bedarf erneut aufgerufen werden (z. B. nach einer Schema-Änderung oder neuen Bildern), ohne
Duplikate zu erzeugen.

## Sicherheitshinweis zu `ANTHROPIC_API_KEY`

Der Prototyp rief die Anthropic-API direkt aus dem Browser auf — dabei wäre der Key im
Frontend-Code sichtbar gewesen. In dieser App läuft der Aufruf ausschließlich über die Route
`/api/cases/[id]/evaluate-explanation` auf dem Server; der Key wird nie an den Client
ausgeliefert.

## Spätere Erweiterung: echte Mediendateien

Für die (noch als "Bald verfügbar" markierte) Mediathek kann `MediaAsset.storageUrl` auf eine URL
bei Vercel Blob oder einem S3-kompatiblen Speicher zeigen, sobald echtes Bild-/Videomaterial
dafür vorliegt. Die Fall- und Anatomiebilder (siehe `docs/bildbriefe.md`) laufen unabhängig davon
bereits über `public/cases/` + `Case.einstiegsbildUrl`/`befundbildUrl` bzw.
`AnatomyItem.bildUrl`.

---

## Historie: Netlify-Setup (bis 17.09., seitdem nicht mehr verwendet)

Dieser Abschnitt bleibt als Lernprotokoll stehen — die beschriebenen Fallen (insbesondere die
"secret"-Variable-Falle) sind allgemein lehrreich, falls das Projekt später doch wieder auf
Netlify oder eine ähnliche Plattform wechselt.

### Warum ursprünglich Netlify

Entscheidung laut Projektbrief: "Wähl die Option, die am einfachsten einzurichten und günstig
zum Starten ist." Umgesetzt wurde die engste mögliche Integration: **Netlify DB**, Netlifys
eigene, auf Neon basierende Postgres-Extension.

### Blockade, die zum Umzug führte

Das kostenlose Netlify-Team-Kontingent (Build-Minuten) war seit dem 17.09. aufgebraucht — neue
Pushes bauten nicht mehr, die Seite blieb auf dem letzten erfolgreichen Deploy live. Laut
Nutzerin hätte sich das Kontingent erst am 9.10. zurückgesetzt, und eine Kreditkarte zum Aufladen
stand nicht zur Verfügung — daher der Umzug zu Vercel + Neon.

### Wichtige Falle: Umgebungsvariablen NICHT als "secret" markieren (Netlify-spezifisch)

Sowohl `SEED_SECRET` als auch `NEXTAUTH_SECRET` wurden zunächst mit dem Secret-Flag
(`envVarIsSecret: true`) gesetzt — dadurch waren sie zwar in der Netlify-UI vor Blicken
geschützt, aber **im Functions-Laufzeitkontext nicht als `process.env`-Wert verfügbar**. Das
äußerte sich als "SEED_SECRET nicht konfiguriert" bzw. bei NextAuth als "Es gab ein Problem mit
der Serverkonfiguration" bei jedem Login-/Registrierungsversuch. Fix war, alle Variablen als
normale (nicht "secret") Variable mit allen vier Scopes zu setzen. Vercel kennt dieses
Unterscheidungsproblem nicht — alle Environment Variables sind dort einheitlich zur Laufzeit
verfügbar, unabhängig davon, ob sie in der UI ausgeblendet ("Sensitive") sind oder nicht.

### Weitere gelöste Netlify-spezifische Probleme (nicht mehr relevant)

- Ein Edge-Function-Konflikt zwischen Next.js 16s `proxy.ts`-Konvention und
  `@netlify/plugin-nextjs` hatte einmal die komplette Seite lahmgelegt ("nextHandler ist keine
  Funktion") — gelöst durch komplette Umstellung auf serverseitige Zugriffsprüfungen statt
  Middleware/Edge Functions (diese Umstellung bleibt bestehen, unabhängig von der
  Hosting-Plattform, und ist auch für Vercel die richtige Architektur).
