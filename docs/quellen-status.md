# Quellen-Status – Denkgang

Arbeitsdokument zur fachlichen Quellenprüfung (siehe MASTER-PROMPT.md §9–10, §22). Nach der
Drive-Neuorganisation (20.09.2026) liegt eine vollständige, sauber benannte Fachbibliothek vor
(35+ Bücher, siehe unten). Erste Prüfrunde ist erfolgt — Ergebnisse direkt in `sourceStatus`
der betroffenen Einträge in `src/lib/seedContent.ts` eingepflegt.

**Technische Einschränkung:** Sehr große Bücher (z. B. Hohmann/Mima, 38 MB) lassen sich nicht
komplett per `read_file_content` extrahieren — die Antwort wird bei sehr langen Kapiteln
abgeschnitten, bevor die gesuchte Textstelle erreicht wird. Gezielte `fullText`-Suche innerhalb
eines Buchordners findet trotzdem zuverlässig die richtige Teildatei/Kapitel.

## Geprüft (Stand 20.09.2026)

| Anspruch | Quelle | Ergebnis |
|---|---|---|
| M. biceps brachii — Ursprung/Ansatz/Funktion (biceps, Rocky) | Hárrer, Kap. 12, S. 127–132 | ✅ **Vollständig bestätigt**. Untersuchungstechnik im Fall ist eine vereinfachte Zusammenfassung zweier im Original getrennter Tests. |
| Ortolani-Test — Mechanik (huefte, Luna) | Hárrer, Kap. 7, S. 43–48 | ✅ **Test-Mechanik exakt bestätigt** (longitudinaler Druck, Subluxation, Reposition mit Klick). ⚠️ „Ligamentum capitis femoris" und „Hüftdysplasie" kommen in diesem Kapitel nicht vor — dieser Teil bleibt NICHT VERIFIZIERT gegen diese Quelle (ist etabliertes Allgemeinwissen, aber nicht hier belegt). |
| Facettengelenke als Struktur (facettengelenke, Nala) | Hárrer, Kap. 16, ab S. 202 | ✅ Struktur bestätigt. ⚠️ „Lumbosakraler Übergang" als Begriff dort nicht wörtlich vorhanden. Verhaltensbezug (Hohmann Kap. 10) noch NICHT VERIFIZIERT. |
| M. quadriceps femoris — Details (quadriceps, Bruno) | Hohmann/Mima, Kap. 9 | ⚠️ Muskel als tastbare Landmarke bestätigt (Kap. 7), aber Kap. 9 (Ursprung/Ansatz/Funktion) ist zu groß für vollständige Extraktion — Inhalt noch nicht direkt geprüft. |
| Iliopsoas (Emma) | Könneker + Hárrer | Noch nicht geprüft in dieser Runde. |
| Findus-Fall (Ernährung/Gewicht) | Zentek | Noch nicht geprüft in dieser Runde. |
| Rocky — Kap. 13 + Welter-Böller | Hárrer Kap. 13, Welter-Böller Kap. 6 | Noch nicht geprüft. |

## Vollständige Fachbibliothek (Drive, Stand 20.09.2026)

Über 35 Bücher, u. a.: Hárrer *Manuelle Therapie beim Hund*, Mai *Physiotherapie und
Bewegungstraining für Hunde*, Hohmann/Mima *Bewegungsapparat Hund*, Könneker/Reiter *Osteopathie
in der Kleintierpraxis*, Welter-Böller *Faszientherapie beim Hund*, Zentek *Ernährung des Hundes*,
Wittek et al. *Klinische Propädeutik der Haus- und Heimtiere*, Koch/Fischer/Dobenecker
*Lahmheitsuntersuchung beim Hund*, *Atlas der Röntgenanatomie des Hundes*, vollständige
Pathologie-Reihe „Hunde-/Katzenkrankheiten kompakt" (VetCenter/Thieme, nach Organsystem), plus
Bücher zu Verhaltensmedizin, Ernährung, Geriatrie, Akupunktur, Phytotherapie, Wundmanagement,
Labordiagnostik, Schmerztherapie u. v. m.

Besonders relevant für künftige Kategorien:
- **Untersuchung**: Wittek et al. *Klinische Propädeutik*, Koch/Fischer/Dobenecker
  *Lahmheitsuntersuchung beim Hund*
- **Pathologie**: VetCenter-Reihe (Hunde-/Katzenkrankheiten kompakt), Pathophysiologie des
  Bewegungsapparates

## Nächste Schritte

1. Iliopsoas/Emma (Könneker) und Findus (Zentek) prüfen.
2. Rocky Kap. 13 (Ellenbogenregion) + Welter-Böller prüfen.
3. Quadriceps/Bruno: Weg finden, um Kap. 9 (Hohmann/Mima) trotz Dateigröße gezielt zu prüfen
   (z. B. gezieltere `fullText`-Suche nach "Rectus femoris" statt ganzes Kapitel laden).
4. Hohmann-Korrektur (Co-Autorin „Mima") in den 3 betroffenen Content-Items nachziehen.
5. Danach: neue Inhalte auf Basis der jetzt vollständigen Bibliothek planen (v. a. Pathologie,
   Untersuchungstechniken).
