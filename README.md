# Denkgang

Web-App für **Denkgang** — klinisches Denken trainieren, nicht nur Fakten pauken. Ein
Lernprodukt für angehende und praktizierende Tierphysiotherapeut:innen.

Diese App ist die produktive Weiterentwicklung des ursprünglichen HTML-Prototyps
(`befundwerk-prototype.html`). Die Content-Struktur und Lernlogik wurden 1:1 übernommen;
siehe [`docs/architektur-analyse.md`](./docs/architektur-analyse.md) für die Analyse und
den Architekturvorschlag, der dieser Umsetzung zugrunde liegt.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **PostgreSQL** über **Prisma 7** (Driver Adapter `@prisma/adapter-pg`)
- **Auth.js (NextAuth v5)** — E-Mail/Passwort-Login, Rollen `STUDENT` / `REVIEWER` / `ADMIN`
- Serverseitiger Anthropic-Aufruf zur Bewertung freiwilliger Begründungstexte
  (`/api/cases/[id]/evaluate-explanation`) — der API-Key verlässt den Server nie

## Lokale Entwicklung

1. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
2. `.env` aus `.env.example` anlegen und `DATABASE_URL` auf eine lokale oder gehostete
   Postgres-Instanz zeigen lassen (siehe [`docs/hosting-setup.md`](./docs/hosting-setup.md)
   für Optionen). `NEXTAUTH_SECRET` mit `openssl rand -base64 32` erzeugen.
3. Datenbank-Schema anwenden und den Prototyp-Content einspielen:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```
   Alle Inhalte landen mit Status `DRAFT` in der DB — wie im Prototyp, bis sie über die
   Review-Oberfläche freigegeben werden.
4. Dev-Server starten:
   ```bash
   npm run dev
   ```
5. Unter `/register` ein Konto anlegen. E-Mail-Adressen aus `ADMIN_EMAILS` (siehe `.env`)
   erhalten automatisch die Rolle `ADMIN` und damit Zugriff auf `/review`, um Inhalte
   freizugeben — ohne Freigabe bleibt das Dashboard leer (Absicht, siehe Rollen-Workflow
   unten).

## Rollen & Content-Workflow

- **STUDENT** (Standard bei Registrierung): sieht nur `APPROVED`-Inhalte, bearbeitet Fälle
  und Anatomie-Items, sammelt Lernfortschritt.
- **REVIEWER** / **ADMIN**: zusätzlich Zugriff auf `/review`, um Fälle, Anatomie-Items und
  Mediathek-Einträge zwischen `DRAFT` und `APPROVED` umzuschalten. Bewusst minimal gehalten
  (Einzelnutzerin-Workflow) — kein separates `REVIEW`-Zwischenstadium in der UI, das Feld
  existiert im Schema für spätere Erweiterung.

## Wichtige Befehle

```bash
npm run dev          # Dev-Server
npm run build         # Produktions-Build inkl. Typecheck
npm run lint           # ESLint
npx prisma studio      # DB-Inhalte visuell inspizieren
npx prisma migrate dev # Schema-Änderungen anwenden (legt Migration an)
npx prisma db seed     # Prototyp-Content erneut einspielen (idempotent, upsert per slug)
```

## Deployment

Siehe [`docs/hosting-setup.md`](./docs/hosting-setup.md) für die empfohlene, kostengünstige
Hosting/DB-Kombination und die nötigen Umgebungsvariablen.
