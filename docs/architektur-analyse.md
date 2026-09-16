# Denkgang — Analyse des Prototyps & Architekturvorschlag

Stand: Analyse des Prototyps `befundwerk-prototype.html` gemäß Projektbrief. Dieses Dokument fasst zusammen, was der Prototyp fachlich und technisch leistet, und schlägt eine Zielarchitektur für die echte Web-App vor. **Es wurde noch kein Anwendungscode geschrieben** — der Projektbrief bittet ausdrücklich darum, vor der Implementierung Rückmeldung einzuholen.

## 1. Bestandsaufnahme: Prototyp

### 1.1 Technischer Aufbau
Ein einzelnes HTML-File ohne Build-Step: Vanilla JS, ein globales `state`-Objekt, eine `render()`-Funktion, die bei jeder Interaktion das komplette `#app`-innerHTML neu erzeugt (kein virtuelles DOM, kein Router). Keine Persistenz — alles lebt nur im Arbeitsspeicher der Browser-Session.

### 1.2 Datenmodell (drei Arrays)

- **`CASES`** (8 Fälle): `id`, `topic`, `species`, `title`, `status` (durchgehend `DRAFT`), `learningObjective`, `anamnese`, `beobachtung` + `diagramLabel`, `palpation`, `hypothesisQ` + `hypothesisOptions[]` (`label`, `correct`, `errorCategory`, `arguesAgainst`, `differentiationDistractors[]`), `expertNote`, `weakeningQ` + `weakeningOptions[]`, `retrievalQ` + `retrievalOptions[]`, `sourceStatus` (Klartext, teils explizit als unverifiziert markiert — Bruno/TPLO-Zeitraum, Luna/Ortolani-Quelle).
- **`ANATOMY`** (7 Items): `id`, `name`, `relatedCaseId` (Verknüpfung, taucht **nirgends in der UI** auf — nur zur internen Kompetenzberechnung), `origin`, `insertion`, `funktion`, `innervation`, `clinicalRelevance`, `palpationHint`, `transferQ` + `transferOptions[]`, `sourceStatus`.
- **`MEDIALIBRARY`** (3 Platzhalter, noch keine echten Dateien): `id`, `title`, `type`, `relatedCaseIds[]` (many-to-many, ein Medium für mehrere Fälle), `note`.

### 1.3 Lernlogik (State-Machine pro Fall, Schritte 0–9)

1. **Anamnese** immer sichtbar.
2. **Aktive Untersuchungswahl**: Beobachtung vs. Palpation (Reihenfolge wird bewertet — zuerst beobachten gilt als Best Practice), plus Falle "Bildgebung zu früh angefordert". Mastery-Mechanismus: nach 3× korrekter Reihenfolge in Folge (`examOrderStreak`) wird die Auswahl automatisch übersprungen, bleibt aber über einen Link reaktivierbar.
3. **Hypothese**: Pflichtauswahl der wahrscheinlichsten Ursache + optionale zweite Alternative (max. 2 von 4 Optionen wählbar).
4. **Konfidenz-Regler** (0–100 %), zeigt keinen Wert an, bis er aktiv bewegt wurde (verhindert Anker-Effekt).
5. **Differenzierung** (nur falls Alternative gewählt): "was spricht dagegen" — Antwortpool aus der echten Gegenevidenz + themengleichen Distraktoren, einmalig gemischt (Fisher-Yates).
6. **Schwächungsfrage** (Differentialdiagnostik) — wird **vor** der Auflösung abgefragt, nicht danach.
7. **Freiwilliges Begründungsfeld** (Elaboration).
8. **Auflösung**: `expertNote` + `sourceStatus` + Kalibrierungssatz (Konfidenz vs. tatsächliche Korrektheit) + Bewertung der freien Begründung per **Live-Fetch direkt ans `api.anthropic.com` aus dem Client** (`evaluateExplanation()`, Zeile ~1261) — das ist exakt die Stelle, die der Brief als "muss über Server-Endpunkt laufen" markiert, weil hier sonst ein API-Key im Frontend läge.
9. **Retrievalfrage** (anatomieverknüpftes Faktenwissen).
10. **Schwierigkeits-Selbsteinschätzung** (leicht/mittel/schwer) → `computeNextReview()` gibt nur einen **Text** zurück ("fällig in 7 Tagen"), kein echtes Datum — das ist die Spacing-Simulation, die laut Brief durch echtes datumsbasiertes Spacing ersetzt werden soll. Die Logik selbst (falsch → morgen fällig; schwer/niedrige Konfidenz → 4 Tage; mittel → 7 Tage; leicht + hohe Konfidenz → 14 Tage) ist bereits genau die im Brief beschriebene Kombination aus Korrektheit, Konfidenz und Schwierigkeit — sie muss nicht neu erfunden, nur auf echte Zeitstempel umgestellt werden.

Bei Fallabschluss (`finishCase`) werden Fehlerkategorien gesammelt (u. a. *falsche Priorisierung*, *Differentialdiagnostik unvollständig*, *Anatomieverwechslung*, *Befund überbewertet*, *Über-/Unterkonfidenz*, *vorschnelle Diagnose*, *Befund übersehen*) und in `history[]` gepusht; zusätzlich wird der Fall im Queue-Array um mindestens eine Position nach hinten verschoben (einfaches Interleaving).

Die **Anatomie-Flows** sind separat (3 Schritte: Ursprung/Ansatz/Funktion → klinische Bedeutung/Palpation → Transferfrage), speichern aber pro Item nur den *letzten* Versuch (`anatomyHistory` wird bei erneutem Versuch überschrieben, nicht historisiert).

Das **Dashboard** berechnet vier Kompetenzwerte:
- *Anatomie-Wissen* = kombinierte Korrektheit aus Fall-Retrievalfragen + Anatomie-Transferfragen
- *Clinical Reasoning* = % korrekt priorisierte Hypothesen
- *Differentialdiagnostik* = % korrekte Schwächungsfragen
- *Kalibrierung* = `100 - |Ø(Konfidenz − tatsächliche Korrektheit×100)|`

Daraus wird automatisch das "größte aktuelle Lernpotenzial" (schwächster Wert) sowie eine Fehlerkategorie-Tag-Cloud abgeleitet.

### 1.4 Content-Status
Alle 15 Wissenselemente sind `DRAFT` mit `sourceStatus`-Feldern, die ehrlich zwischen "Quellenkandidat mit ISBN/Kapitel" und "Quelle erforderlich" unterscheiden. Zwei Punkte sind explizit als unverifiziert markiert. Es werden **keine** Seitenzahlen oder Studien behauptet, die nicht als Kandidat gekennzeichnet sind — dieses Muster muss in der neuen Architektur als Pflichtfeld (nicht optionale Doku) weitergeführt werden.

## 2. Vorgeschlagene Architektur

Ziel: bestehende Content-Struktur 1:1 übernehmen, nur die technische Hülle (Auth, Persistenz, Mehrbenutzerfähigkeit, Rollen, Mediathek, Server-seitige LLM-Aufrufe) neu bauen.

### 2.1 Stack-Vorschlag

| Bereich | Vorschlag | Begründung |
|---|---|---|
| Frontend + Backend | **Next.js (App Router, TypeScript)** | Ein Repo für UI + API-Routen (keine separate Backend-Infrastruktur nötig); React erlaubt, die bestehende Step-Machine 1:1 als Komponenten-State abzubilden, ohne die pädagogische Logik umzudenken. |
| Datenbank | **Postgres** (z. B. Supabase oder Neon) | Relational passt gut zu den klar strukturierten Case-/Anatomy-/Options-Tabellen; Supabase liefert zusätzlich Auth + Storage aus einer Hand, falls gewünscht. |
| ORM | **Prisma** | Schema-first, generiert Typen direkt aus der DB — hält Backend und Frontend-Typen synchron. |
| Auth | **Auth.js (NextAuth)** mit E-Mail/Passwort (+ optional Magic Link) | Deckt Login/Registrierung/Rollen ab, ohne einen kompletten Auth-Service selbst zu bauen. |
| Datei-/Mediaspeicher | **Supabase Storage** oder **Netlify Blobs** | Bilder/Videos extern, referenziert per URL — genau das im Prototyp vorbereitete `MEDIALIBRARY`-Konzept. |
| LLM-Auswertung (Elaboration) | **Next.js API-Route** (`/api/cases/[id]/evaluate-explanation`), Anthropic-Key nur serverseitig | Ersetzt den aktuellen Client-Fetch 1:1 in der Logik, verschiebt ihn nur hinter den Server. |
| Hosting | **Netlify** (Next.js-Runtime) | Im Environment bereits als Integration verbunden — falls gewünscht, sonst gleichwertig Vercel. |

*Leichtgewichtige Alternative*, falls kein React gewünscht ist: SvelteKit mit demselben Backend-Ansatz (API-Routen + Prisma + Postgres) — die Step-Machine des Prototyps ist ohnehin nah an Sveltes reaktivem Modell.

### 2.2 Datenbankschema (Kernidee, 1:1 aus den Prototyp-Arrays abgeleitet)

```
users
  id, email, password_hash, role ENUM('student','reviewer','admin'), created_at

cases
  id, slug, topic, species, title,
  status ENUM('DRAFT','REVIEW','APPROVED'),
  learning_objective, anamnese, beobachtung, diagram_label, palpation,
  hypothesis_q, weakening_q, retrieval_q,
  expert_note, source_status,
  created_by, reviewed_by, created_at, updated_at

case_hypothesis_options
  id, case_id, sort_order, label, is_correct,
  error_category, argues_against, differentiation_distractors (text[]/jsonb)

case_weakening_options
  id, case_id, sort_order, label, is_correct, error_category

case_retrieval_options
  id, case_id, sort_order, label, is_correct, error_category

anatomy_items
  id, slug, name, related_case_id, status,
  origin, insertion, funktion, innervation,
  clinical_relevance, palpation_hint, transfer_q, source_status,
  created_at, updated_at

anatomy_transfer_options
  id, anatomy_id, sort_order, label, is_correct

media_assets
  id, title, type, storage_url, note, status, created_at

media_case_links
  media_id, case_id   -- many-to-many, entspricht relatedCaseIds

user_case_attempts
  id, user_id, case_id, attempt_number,
  exam_order (jsonb), exam_premature_imaging (bool),
  hypothesis_selected (jsonb), confidence (int),
  differentiation_choice (jsonb), weakening_choice_id, retrieval_choice_id,
  explanation (text), explanation_feedback (text),
  difficulty_rating, hypothesis_correct, weakening_correct, retrieval_correct,
  error_categories (text[]), created_at

user_case_schedule
  user_id, case_id, due_at (timestamp), exam_order_streak (int),
  exam_auto_skipped (bool)

user_anatomy_attempts
  id, user_id, anatomy_id, correct (bool), attempted_at
```

`user_case_attempts` und `user_anatomy_attempts` werden — anders als im Prototyp — als **vollständige Historie** geführt (nicht überschrieben), damit spätere Auswertungen (z. B. Lernkurven über Zeit) möglich sind; die Dashboard-Aggregation kann weiterhin nur den letzten oder alle Versuche einbeziehen, das ist eine reine Anzeige-Entscheidung.

`user_case_schedule.due_at` löst die aktuelle Text-Simulation ("fällig in 7 Tagen") durch ein echtes Datum ab; die bestehende `computeNextReview()`-Logik (falsch → morgen, schwer/geringe Konfidenz → +4 Tage, mittel → +7, leicht+hohe Konfidenz → +14) wird unverändert übernommen, nur auf `now() + interval` umgestellt.

### 2.3 Rollen-/Review-Workflow
`status`-Feld auf `cases` und `anatomy_items` steuert Sichtbarkeit: reguläre Nutzer:innen sehen nur `APPROVED`. Reviewer:innen bekommen eine einfache interne Ansicht, um DRAFT → REVIEW → APPROVED zu schalten (kein voller CMS-Aufwand nötig für den Start — ein schlichtes internes Formular reicht, da die Produktinhaberin selbst prüft).

### 2.4 Migration der bestehenden Inhalte
Einmaliges Seed-Skript, das `CASES`, `ANATOMY`, `MEDIALIBRARY` wortgetreu in die DB überträgt — inklusive `sourceStatus`-Texten unverändert (keine Umformulierung, keine Ergänzung von Quellenangaben). Status bleibt `DRAFT`, bis die Produktinhaberin sie manuell auf `APPROVED` setzt.

## 3. Offene Punkte für Rückmeldung

Bevor mit der Implementierung begonnen wird:

1. **Framework-Präferenz**: Next.js/React wie vorgeschlagen, oder Präferenz für SvelteKit o. Ä.?
2. **Hosting/DB**: Netlify + Supabase/Neon wie vorgeschlagen, oder bestehende Präferenzen/Accounts?
3. **Auth-Tiefe für den Start**: reicht E-Mail/Passwort, oder soll direkt Social Login (Google) mit rein?
4. **Umfang der Reviewer-Oberfläche**: reicht ein minimales Formular zum Status-Umschalten, oder soll das Review gleich inhaltliche Bearbeitung (Editieren von Fragen/Optionen) erlauben?

Erst nach Rückmeldung zu diesen Punkten beginnt die eigentliche Implementierung, wie im Projektbrief gefordert.
