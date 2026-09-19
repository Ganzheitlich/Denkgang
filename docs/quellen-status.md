# Quellen-Status – Denkgang

Arbeitsdokument für die anstehende fachliche Quellenprüfung (siehe MASTER-PROMPT.md §9–10, §22).
Listet alle bisher im Content verwendeten „Quellenkandidat"-Angaben, ob das Buch in Vanessas
Fachbüchern (Drive/Dropbox) bestätigt gefunden wurde, und welche Content-Items betroffen sind.

**Wichtig:** Dies ist noch keine fachliche Prüfung — nur eine Bestandsaufnahme, welche Bücher
überhaupt vorliegen. Die eigentliche Prüfung (stimmt die zitierte Aussage wirklich auf der
genannten Seite?) steht noch aus.

**Technische Einschränkung:** Größere Bücher (über ca. 9 MB) lassen sich über den aktuellen
Drive-Zugriff nicht als Rohdatei/Faksimile abrufen, nur als extrahierter Text (`read_file_content`,
OCR-artige Repräsentation ohne Layout/Bilder/Tabellen). Für reine Text-/Fakten-Verifikation reicht
das; für exakte Seiten-/Abbildungsprüfung nicht.

## Status je Quelle

| Quelle (wie zitiert) | In Bibliothek gefunden? | Gefundener Dateiname | Verwendet in |
|---|---|---|---|
| Hárrer, *Manuelle Therapie beim Hund* (ISBN 978-3-13-245429-3), Thieme 2025 | ✅ bestätigt | `Manuelle Therapie beim Hund-1.pdf` (27 MB) | biceps (Anatomie + Wissen), huefte (Anatomie + Wissen), facettengelenke (Wissen), iliopsoas (Wissen, ergänzend), Rocky-Fall (Ellenbogenregion) |
| Hohmann, *Bewegungsapparat Hund* (ISBN 978-3-13-245265-7), Thieme 2025 | ✅ bestätigt — **Korrektur nötig**: echter Titel nennt zusätzlich Co-Autorin „Mima" | `Bewegungsapparat Hund - Hohmann, Mima.pdf` (38,5 MB) | quadriceps (Anatomie + Wissen), facettengelenke (Wissen), Findus-Fall (Kap. 10 Bezug) |
| Mai, *Physiotherapie und Bewegungstraining für Hunde* (ISBN 978-3-13-240099-3), Thieme 2022 | ⚠️ vermutlich bestätigt, Titel/Autor noch nicht 1:1 abgeglichen | `Physiotherapie und bewegungstraining für Hunde.pdf` (27 MB) *oder* `Physiotherapie für Hunde.pdf` (5,6 MB) — welches der beiden das richtige ist, noch zu klären | quadriceps (Wissen, Reha-Zeitraum 12–16 Wochen — explizit als unverifiziert markiert) |
| Könneker, *Osteopathie in der Kleintierpraxis* (ISBN 978-3-8304-9174-3), Thieme 2010 | ❌ nicht gefunden | — | iliopsoas (Anatomie + Wissen), Emma-Fall |
| Zentek, *Ernährung des Hundes* (ISBN 978-3-132-46109-3), Thieme 2026 | ❌ nicht gefunden | — | Findus-Fall |
| Welter-Böller, *Faszientherapie beim Hund* (ISBN 978-3-13-245372-2), Thieme 2025 | ✅ bestätigt | `Faszientherapie beim Hund.pdf` (17,5 MB) | Rocky-Fall (ergänzend, Tuberculum supraglenoidale) |

## Zusätzlich vorhanden, bisher nirgends zitiert

Diese Bücher liegen vor, wurden aber noch in keinem Content verwendet — mögliche Kandidaten für
künftige Pathologie-/Untersuchung-Einträge:

- **Wittek et al., *Klinische Propädeutik der Haus- und Heimtiere*** (ISBN 978-3-13-245774-4),
  Thieme 2026 — allgemeines Untersuchungs-Lehrbuch, passt sehr gut zur Untersuchung-Kategorie.
  (Teilweise bereits als zusammengefügte Test-PDF an Vanessa geschickt, s. Chat-Verlauf.)
- **Pathophysiologie des Bewegungsapparates – VetCenter**, Thieme — passt zur künftigen
  Pathologie-Kategorie.

## Noch unklar

- Sehr viele kryptisch benannte Einzeldateien im ursprünglichen Drive-Ordner (`k(1)–k(49).pdf`,
  `ma.pdf`, `ma(7)–(17).pdf`, `ph.pdf`, `ph(19)–(27).pdf`, `b4/b10/b11/b12.pdf`) — vermutlich
  weitere gesplittete Bücher, Inhalt noch nicht identifiziert. Nach Abschluss der
  Drive-Neuorganisation durch Vanessa neu zu sichten.

## Nächste Schritte (sobald Vanessa Bescheid gibt)

1. Für jede ✅-Quelle: zitierte Aussage im Content gegen den tatsächlichen Text prüfen (Kapitel,
   Seite, korrekte Wiedergabe).
2. `sourceStatus`-Felder entsprechend aktualisieren: bestätigte Angaben mit echter Seitenzahl,
   nicht auffindbare weiterhin klar als „NICHT VERIFIZIERT" kennzeichnen (nicht raten).
3. Hohmann-Korrektur (Co-Autorin „Mima") in den betroffenen 3 Content-Items nachziehen.
4. Klären, welches der beiden "Physiotherapie"-PDFs das korrekte Mai-Buch ist.
