# Quellen-Status – Denkgang

Arbeitsdokument zur fachlichen Quellenprüfung (siehe MASTER-PROMPT.md §9–10, §22). Nach der
Drive-Neuorganisation (20.09.2026) liegt eine vollständige, sauber benannte Fachbibliothek vor
(35+ Bücher, siehe unten). Erste Prüfrunde ist erfolgt — Ergebnisse direkt in `sourceStatus`
der betroffenen Einträge in `src/lib/seedContent.ts` eingepflegt.

**Technische Einschränkung:** Sehr große Bücher (z. B. Hohmann/Mima, 38 MB) lassen sich nicht
komplett per `read_file_content` extrahieren — die Antwort wird bei sehr langen Kapiteln
abgeschnitten, bevor die gesuchte Textstelle erreicht wird. Gezielte `fullText`-Suche innerhalb
eines Buchordners findet trotzdem zuverlässig die richtige Teildatei/Kapitel.

**Workaround gefunden (28.09.2026), aber mit fester Größengrenze:** Bricht `read_file_content`
eine PDF-Datei mitten im Text ab, lässt sich die Datei stattdessen per `download_file_content`
(liefert base64) herunterladen und lokal mit `pdftotext -layout <datei>.pdf <datei>.txt`
vollständig zu Text konvertieren — ohne die Kappung von `read_file_content`. Erfolgreich getestet
an VetCenter „Erkrankungen des Bewegungsapparates" (2,7 MB Rohdatei → 106.693 Zeichen bei
`read_file_content`, aber 280.920 Zeichen bei lokaler Extraktion — kompletter Rest des Kapitels
dadurch erst zugänglich geworden). **Harte Grenze:** `download_file_content` verweigert Dateien
über 10 MB Rohgröße explizit mit einer klaren Fehlermeldung; kl(4).pdf (9 MB Rohdatei, ca. 12 MB
nach Base64-Kodierung) scheiterte am 28.09.2026 wiederholt mit der unklareren Fehlermeldung
„session expired" statt der Größenmeldung — vermutlich, weil die Base64-Kodierung die effektive
Übertragungsgröße über die 10-MB-Grenze hebt, auch wenn die Rohdatei knapp darunter liegt. Der
Workaround funktioniert also zuverlässig nur für Rohdateien bis ca. 7 MB. Für größere Dateien wie
kl(4).pdf (9 MB) oder Hohmann b11.pdf (15 MB, siehe Quadriceps/Bruno unten) bleibt keine der
beiden Methoden vollständig; hier hilft nur eine Bitte an Vanessa um eine bereits vorab in
kleinere Teile gesplittete Datei (wie bei Baumgartner/Wittek/Khol kl.pdf → kl(1)–kl(13).pdf schon
geschehen).

## Geprüft (Stand 20.09.2026)

| Anspruch | Quelle | Ergebnis |
|---|---|---|
| M. biceps brachii — Ursprung/Ansatz/Funktion (biceps, Rocky) | Hárrer, Kap. 12, S. 127–132 | ✅ **Vollständig bestätigt**. Untersuchungstechnik im Fall ist eine vereinfachte Zusammenfassung zweier im Original getrennter Tests. |
| Ortolani-Test — Mechanik (huefte, Luna) | Hárrer, Kap. 7, S. 43–48 | ✅ **Test-Mechanik exakt bestätigt** (longitudinaler Druck, Subluxation, Reposition mit Klick). ⚠️ „Ligamentum capitis femoris" und „Hüftdysplasie" kommen in diesem Kapitel nicht vor — dieser Teil bleibt NICHT VERIFIZIERT gegen diese Quelle (ist etabliertes Allgemeinwissen, aber nicht hier belegt). |
| Facettengelenke als Struktur (facettengelenke, Nala) | Hárrer, Kap. 16, ab S. 202 | ✅ Struktur bestätigt. ⚠️ „Lumbosakraler Übergang" als Begriff dort nicht wörtlich vorhanden. Verhaltensbezug (Hohmann Kap. 10) noch NICHT VERIFIZIERT. |
| M. iliopsoas — Ursprung/Ansatz/Funktion (iliopsoas, Emma) | Könneker, Kap. 7 (Tab. Beckengliedmaße) + Hárrer, Kap. 7, S. 47f. | ✅ **Vollständig bestätigt** — **Korrektur**: Ursprung M. iliacus ist „Facies sacropelvina ossis ilii", nicht „Facies iliaca" wie zuvor angegeben (jetzt korrigiert). Hárrer bestätigt zusätzlich fast wortgleich: „reflektorisch häufig verspannt bei Hüftproblemen sind der M. iliopsoas". |
| Übergewicht als Risikofaktor für Bewegungsapparat (Findus) | Zentek, Kap. 7.10, S. 311 | ✅ **Vollständig bestätigt**, nahezu wortgleiches Zitat: „Bei älteren Hunden stellt Überernährung in Verbindung mit Übergewicht einen wichtigen Risikofaktor für Erkrankungen des Bewegungsapparats dar." Die konkrete Mechanik „mechanische Gelenkbelastung" ist eigene, plausible Erklärung, nicht wortgleich zitiert. |
| M. quadriceps femoris — Details (quadriceps, Bruno) | Hohmann, Kap. 9 | ⚠️ Muskel als tastbare Landmarke bestätigt (Kap. 7). `fullText`-Suche bestätigt, dass „Quadriceps femoris" im Kapitel 9 (b11.pdf) vorkommt, aber die Extraktion bricht bei jedem Versuch nach S. 297 ab (Kapitel ist zu lang / Datei zu groß, ~15 MB) — die eigentliche Textstelle mit Ursprung/Ansatz/Funktion bleibt technisch nicht erreichbar. Bleibt offen. |
| Rocky — Kap. 13 + Welter-Böller | Hárrer Kap. 13, Welter-Böller Kap. 6, S. 53 | ✅ Hárrer Kap. 13 bestätigt Ellenbogendysplasie als reale Differenzialdiagnose (Distraktor), sonst nichts Neues. Welter-Böller bestätigt wörtlich: Tuberculum supraglenoidale = Knochenhöcker über der Gelenkpfanne der Scapula, Ursprung der Bizepssehne (deckt retrievalQ ab). ⚠️ Der dort beschriebene Schadensmechanismus (Apophysenausriss bei Überbeanspruchung) betrifft nur die Wachstumsphase (bis 5. Monat) — nicht die Tendinopathie beim 4-jährigen Rocky. Diese klinische Diagnose bleibt NICHT VERIFIZIERT gegen diese Quelle. |

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

1. ~~Rocky Kap. 13 (Ellenbogenregion) + Welter-Böller prüfen.~~ ✅ Erledigt (s. o.).
2. Quadriceps/Bruno: Kap. 9 (Hohmann, b11.pdf, 15 MB) bleibt technisch nicht extrahierbar über
   S. 297 hinaus — mehrere gezielte Versuche (Volltext-Read, `fullText`-Suche mit erhöhter
   Snippet-Verbosity) bestätigen den Begriff im Kapitel, erreichen aber nicht die Textstelle
   selbst. Auch der neue `download_file_content` + `pdftotext`-Workaround (s. o.) scheitert hier
   explizit an der 10-MB-Grenze (b11.pdf: 15 MB) — am 28.09.2026 erneut versucht und bestätigt
   nicht möglich. Bleibt offen, bis Vanessa ggf. die betroffene Seite direkt bereitstellen kann
   oder das Kapitel wie bei Baumgartner/Wittek/Khol in kleinere Dateien vorab aufgeteilt wird.
3. ~~Hohmann-Korrektur (Co-Autorin „Mima")~~ — erledigt sich von selbst: „Mima Hohmann" ist der
   volle Autorinnenname (Einzelautorin), keine zweite Person. Zitierweise „Hohmann, ..." war
   bereits korrekt.
4. Damit ist die erste Prüfrunde aller ursprünglichen „Quellenkandidat"-Einträge abgeschlossen
   bis auf Quadriceps/Bruno (Punkt 2). Vanessa prüft die Ergebnisse manuell.
5. Danach: neue Inhalte auf Basis der jetzt vollständigen Bibliothek planen (v. a. Pathologie,
   Untersuchungstechniken).
