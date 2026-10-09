# Content-Roadmap – Denkgang

Arbeitsdokument für den Weg zu einer inhaltlich vollständigen Wissensbibliothek und
Anatomie-Sektion (Ziel von Vanessa, 21.09.2026: „am Ende keinerlei offene Fragen" —
geschätzt mehrere hundert Einträge in Summe). Ergänzt `docs/quellen-status.md`
(Quellenprüfung bestehender Inhalte) um die Planung für **neue** Inhalte.

**Prinzip:** Qualität vor Tempo (MASTER-PROMPT §22). Jeder Eintrag wird direkt beim
Schreiben gegen eine echte Quelle aus der Drive-Bibliothek geprüft und mit
`sourceStatus` versehen — nie erst nachträglich. Alles startet als `DRAFT`, Vanessa
prüft final. Diese Liste wird laufend abgehakt, damit über mehrere Sessions hinweg
kein Überblick verloren geht.

## Technische Grundlage

- **AnatomyItem-Kind-Erweiterung (04.10.2026).** Auf Vanessas Nachfrage
  ("Wieviele Muskeln hat so ein Hund? Wirklich alle abgedeckt? Knochen hätte
  ich gerne auch noch dabei, ebenso Nerven, Bänder usw") wurde das bisher
  reine Muskel-Datenmodell erweitert: `AnatomyItem` hat jetzt ein `kind`-Feld
  (`AnatomyKind`-Enum: `MUSKEL`/`KNOCHEN`/`GELENK`/`BAND`/`NERV`/`SONSTIGE`,
  Default `MUSKEL` für Abwärtskompatibilität). Die vier bisherigen
  "Muskel-Felder" (`origin`/`insertion`/`funktion`/`innervation`) bleiben als
  Spalten bestehen (keine Schema-Zersplitterung in 6 verschiedene Tabellen),
  sind jetzt aber **nullable** und tragen je nach `kind` eine andere
  fachliche Bedeutung — die Beschriftung in der UI kommt zentral aus
  `src/lib/anatomyKind.ts` (`ANATOMY_FIELD_LABELS`), z. B. bei `NERV`:
  `origin` = Ursprungssegmente, `insertion` = Verlauf, `funktion` =
  motorische Versorgung, `innervation` = sensible Versorgung; bei `KNOCHEN`:
  `origin` = Lage, `insertion` = tastbare Landmarken, `funktion` =
  Besonderheiten, `innervation` = Periost-/Gefäßversorgung. Leere Felder
  werden in der UI (`AnatomyFlow.tsx`, `review/anatomy/[id]/page.tsx`)
  automatisch ausgeblendet statt als "—"-Platzhalter angezeigt. Migration
  `20261004184915_anatomy_item_kind` ist rein additiv (neue Spalte mit
  Default, vier Spalten von `NOT NULL` auf nullable) — kein Datenverlust,
  keine Breaking Changes für bestehende 51 Muskel-Items. Der sokratische
  Anatomie-Tutor-Prompt (`anatomyTutorPrompt.ts`) wurde ebenfalls
  kind-bewusst gemacht (nutzt dieselben Feld-Labels, Herleitungsfragen
  passen sich sinngemäß an Muskel/Gelenk/Nerv/Knochen an).
  **Scope-Entscheidung (bestätigt mit Vanessa):** Weiterhin klinisch
  kuratiert, nicht anatomisch vollständig — es werden auch für die neuen
  Kinds nur Strukturen mit echtem physiotherapeutisch-diagnostischem Wert
  aus verifizierten Quellen aufgenommen, kein Selbstzweck-Vollständigkeits-
  ziel Richtung der ca. 700 Skelettmuskeln/hunderter Knochen eines Hundes.
  Im selben Zug wurden drei bestehende, bisher ins Muskel-Schema
  gezwängte Items korrekt reklassifiziert (keine inhaltliche Änderung an
  bereits verifizierten Fakten, nur Kind + Feld-Zuordnung): `facettengelenke`
  und `huefte` → `GELENK` (die inhaltlich bereits vorhandene
  Kapsel-Band-Information bei `huefte` von `funktion` nach `insertion`
  verschoben, da dort unter `GELENK` korrekt als "Kapsel-Band-Apparat"
  beschriftet), `discus` → `SONSTIGE` (Bandscheibe ist kein Gelenk). Alle
  drei zeigen jetzt keine "—"-Platzhalter mehr. Verifiziert: `tsc`/`eslint`
  clean, `next build` erfolgreich, Reseed bestätigt (weiterhin 51
  Anatomie-Items, keine Zähländerung), Playwright gegen Review-Seite und
  öffentlichen Anatomie-Flow für je ein Beispiel pro neu genutztem Kind
  (`GELENK`: huefte, `SONSTIGE`: discus, `MUSKEL`: biceps als
  Regressions-Check) — 0 Fehler.
- **Erster Content-Batch für die neuen Kinds (04.10.2026, direkt im
  Anschluss an die Kind-Erweiterung):** 5 neue Anatomie-Items (51 → 56),
  alle aus bereits verifizierten Quellen, ohne neue Recherche — gezielt aus
  Material gewählt, das entweder im Backlog als „Schema-Mismatch,
  zurückgestellt" markiert war oder bereits 1:1 als Wissensbibliothek-Text
  vorlag und jetzt zusätzlich strukturiert gespiegelt wird (analog zum
  Muskel-Pattern, z. B. `quadriceps`). `KNOCHEN` (2, löst den seit
  23.09.2026 offenen Backlog-Punkt): `processus-anconaeus` und
  `processus-coronoideus-medialis` (Hárrer Kap. 13.1.1/13.2.1 +
  Koch/Fischer Kap. 6.3.3–6.3.4 + VetCenter Ellbogengelenkdysplasie) — mit
  Tastbefund/Provokationstechnik, IPA-/FPC-Rasseprädisposition und dem
  Standhaltungs-Unterschied (IPA abduziert vs. FPC/OCD adduziert).
  `NERV` (3, erste Items dieses Kinds überhaupt): `n-ischiadicus`,
  `n-radialis`, `n-femoralis` (alle Hárrer Kap. 17.5.3, S. 288–292) —
  spiegeln strukturiert Teile der bereits bestehenden Wissenseinträge
  `n-ischiadicus-verlauf-kein-piriformis-syndrom`,
  `vordergliedmasse-nerven-radialis-medianus-ulnaris-verlauf` und
  `hintergliedmasse-nerven-femoralis-saphenus-obturatorius`. Alle 5 neuen
  Items sowie die 5 dadurch aktualisierten bestehenden Wissenseinträge
  (gegenseitige `relatedAnatomyIds`-Verknüpfung) via Playwright verifiziert
  (5/5 Review-Seiten, 0 Fehler), `tsc`/`eslint` clean, `next build`
  erfolgreich, Reseed bestätigt (56 Anatomie-Items). Noch offen für
  künftige Sessions: `n-medianus`/`n-ulnaris`/`n-saphenus`/`n-obturatorius`
  (Quellenmaterial bereits vorhanden, nur noch nicht als eigene Items
  gespiegelt), ein erstes `BAND`-Item (noch kein Beispiel dieses Kinds),
  sowie perspektivisch Knochen/Gelenke jenseits der bereits ins alte Schema
  gezwängten drei Fälle (facettengelenke/huefte/discus).
- **Zweiter Content-Batch für die neuen Kinds (05.10.2026):** Die am Ende
  des ersten Batches offen gelassenen Punkte direkt nachgeholt. 5 weitere
  neue Anatomie-Items (56 → 61). `NERV` (4, alle aus Hárrer Kap. 17.5.3):
  `n-medianus` (S. 293f., Pronator-teres-Engstelle, verknüpft mit
  `karpaltunnelsyndrom-hund-hypothese`), `n-ulnaris` (S. 293f.,
  Os-carpi-accessorium-Engstelle mit Loge-de-Guyon-Analogie, direkt
  verknüpft mit dem bestehenden Eintrag
  `os-carpi-accessorium-nervus-ulnaris-differenzierung`), `n-saphenus`
  (S. 291f., rein sensibler Ast des N. femoralis — explizit als „keine
  motorische Versorgung" ausgewiesen statt das Feld kommentarlos
  leerzulassen) und `n-obturatorius` (S. 292, Adduktoren-Lähmungsbild mit
  Halbkreis-Gangbild als Hüft-/Knie-Differentialdiagnose). Damit sind jetzt
  alle 7 in Hárrer Kap. 17.5.3 einzeln behandelten Nerven als `NERV`-Items
  erfasst. `BAND` (1, erstes Item dieses Kinds): `lig-capitis-femoris`
  (Ligamentum capitis ossis femoris) — dafür gezielt nachrecherchiert
  (nicht nur die zuvor per Volltextsuche gefundene Existenz-Bestätigung):
  Chunk `183590104_002_002_007.pdf` (Salomon et al., Kap. 2.7.3
  „Intraartikuläre Strukturen", S. 124f.) direkt gelesen und daraus Lage
  (zwischen Fossa acetabuli und Fovea capitis ossis femoris), mechanische
  Funktion sowie ein genuin neuer, klinisch relevanter Fakt gewonnen: Das
  Band dient als Leitstruktur für die den Femurkopf versorgende Arterie —
  bei Ruptur (v. a. bei unreifen Tieren) kann es deshalb zu einer
  Femurkopfnekrose kommen. Löst damit die beim Item `huefte` seit
  03.10.2026 dokumentierte Einschränkung teilweise auf (sourceStatus dort
  sowie beim mirrorenden Wissenseintrag `huefte`/„Der Ortolani-Test..."
  entsprechend aktualisiert und auf das neue Item verwiesen, Inhalt
  bewusst nicht dupliziert) — der spezifische Zusammenhang mit
  Hüftdysplasie bleibt weiterhin nicht aus dieser Quelle belegt, nur die
  Femurkopfnekrose-Klinik ist jetzt direkt bestätigt. Alle 5 neuen Items
  plus die aktualisierten `huefte`-Einträge (Anatomie-Item + Wissenseintrag)
  via Playwright verifiziert (6/6 Seiten, 0 Fehler), `tsc`/`eslint` clean,
  `next build` erfolgreich, Reseed bestätigt (61 Anatomie-Items). Noch
  offen für künftige Sessions: weitere `BAND`-Items (Ligg. collateralia an
  Karpus/Tarsus/Zehen, Kreuzbänder als eigene Items statt nur in
  Wissenstexten erwähnt), `KNOCHEN`-Items jenseits der Ellbogenfortsätze
  (z. B. Tuber calcanei, markante Landmarken aus Hohmann Kap. 7 — dort
  aber nur beschriftete Abbildungen ohne Fließtext, siehe bestehender
  Backlog-Hinweis), sowie GELENK-Items für weitere Hauptgelenke (Knie,
  Schulter, Ellbogen, Karpus, Tarsus selbst, nicht nur ihre Muskulatur).
- **Dritter Content-Batch — Kniegelenk komplett (05.10.2026):** Das Knie
  direkt als erstes Hauptgelenk vollständig ausgebaut, gestützt auf bereits
  sehr dichten vorhandenen BIOMECHANIK-/PATHOLOGIE-Content zum Thema
  Kreuzband (`kniegelenk-baender-kapselmuster`, `kreuzbandriss-
  krankheitsbild`, `kreuzbandriss-biomechanik-und-therapie`,
  `kniegelenk-menisken-patella-biomechanik`,
  `kniegelenk-manuelle-untersuchung-bewegungspalpation`,
  `knie-liegender-hund-spezialtests`, `kreuzband-meniskus-tests`). 4 neue
  Anatomie-Items (61 → 65). `BAND` (3): `lig-cruciatum-craniale` und
  `lig-cruciatum-caudale` (Hárrer Kap. 8.1, S. 81f. + Koch/Fischer Kap.
  8.3.4, S. 199–202) — mit der caninen Besonderheit, dass der vordere
  Kreuzbandriss fast immer ein chronisch-degenerativer Prozess ist
  („cranial tibial thrust" durch den M. quadriceps bei jedem Schritt),
  während ein isolierter hinterer Kreuzbandriss selten und meist
  traumatisch ist — beide klinisch über das Endgefühl des Schubladentests
  unterscheidbar; `ligg-collateralia-genus` (gruppiert, Hárrer Kap. 8.1 +
  Koch/Fischer Kap. 6.2.4, S. 120–127) mit dem Seitenbandtest und der
  Befund-Seiten-Zuordnung. Bei allen drei Bändern ehrlich ausgewiesen:
  präzise osteologische Ursprungs-/Ansatzpunkte sind im Quellentext nicht
  einzeln benannt (nur intraartikuläre Lage bzw. grober Verlauf) — bewusst
  nicht erfunden. `GELENK` (1): `art-femorotibialis` (Kniegelenk selbst,
  Hárrer Kap. 8.1 + 8.2.1, S. 80–84) mit Kapselmuster (Extension > Flexion
  > Rotation), Endgefühl und dem „Knick"/„Klaffen"-Bewegungspalpations-
  Tastbefund. Alle 4 neuen Items sowie 7 dadurch aktualisierte bestehende
  Wissenseinträge (gegenseitige `relatedAnatomyIds`-Verknüpfung) via
  Playwright verifiziert (4/4 neue Review-Seiten, 0 Fehler), `tsc`/`eslint`
  clean, `next build` erfolgreich, Reseed bestätigt (65 Anatomie-Items,
  Kind-Verteilung: 48 Muskel, 7 Nerv, 4 Band, 3 Gelenk, 2 Knochen, 1
  Sonstige). **Damit ist das Kniegelenk — Muskulatur, Bänder, Gelenk
  selbst, Menisken/Patella-Mechanik, Untersuchungstechnik — als erstes
  Hauptgelenk vollständig und kind-übergreifend abgedeckt.** Noch offen:
  dasselbe Muster für Hüfte (Gelenk-Item existiert schon, Bänder/Labrum
  fehlen noch als eigene Items), Schulter, Ellbogen, Karpus, Tarsus.
- **Vierter Content-Batch — Hüftgelenk-Bänder vervollständigen
  (06.10.2026):** Dieselbe Google-Drive-Chunk-Quelle (Salomon et al.,
  `183590104_002_002_007.pdf`), aus der bereits `lig-capitis-femoris`
  stammt, enthält im selben Abschnitt (Kap. 2.7.10, „Gelenkbänder des
  Hüftgelenkes", explizit für den Hund „Hd.") eine vollständige
  Drei-Bänder-Aufzählung: Lig. transversum acetabuli, Lig. capitis ossis
  femoris, Lig. accessorium ossis femoris (letzteres dort ausdrücklich
  „nur beim Pferd" — bewusst NICHT für den Hund übernommen, um keine
  art-fremde Struktur fälschlich zuzuordnen). 2 neue Anatomie-Items
  (65 → 67). `BAND` (1): `lig-transversum-acetabuli` — Fortsetzung des
  Labrum acetabulare, überbrückt die Incisura acetabuli und schließt den
  Pfannenrand zu einem vollständigen Ring. `SONSTIGE` (1, erstes Item
  dieses Kinds): `labrum-acetabulare` — bewusst nicht als `BAND`
  eingeordnet, da es sich fachlich um eine faserknorpelige Gelenklippe
  handelt (Pfannenvergrößerung/-vertiefung, Belastbarkeit,
  Anpassungsfähigkeit, Stoßdämpfung, fließender Übergang in den
  Gelenkknorpel der Facies lunata), nicht um ein klassisches Band
  zwischen zwei Knochen — Ursprungsfeld deshalb bewusst leer gelassen
  statt mit einem erfundenen osteologischen Punkt befüllt.
  **Selbstkorrektur an bestehendem Content (MASTER-PROMPT §22):** Beim
  erneuten Lesen derselben Quelle für diesen Batch fiel auf, dass Kap.
  2.7.10 dieselbe Struktur (Lig. capitis ossis femoris) detaillierter und
  dog-spezifischer beschreibt als die ursprünglich für dieses Item
  zitierte Stelle (Kap. 2.7.3) — insbesondere kennzeichnet Kap. 2.7.10
  die Bedeutung der im Band verlaufenden Gefäße für die Femurkopf-
  ernährung ausdrücklich als „umstritten" (geringe Penetration ins
  Knochengewebe v. a. bei Jungtieren), während die zuvor zitierte Stelle
  diesen Zusammenhang unrelativiert als Nekroserisiko bei Ruptur
  dargestellt hatte. Das bestehende Item `lig-capitis-femoris` wurde
  entsprechend überarbeitet (Funktion, klinische Relevanz, Transferfrage
  und Quellenangabe) — inkl. der neuen Maßangabe (ca. 15×5 mm bei großen
  Hunderassen, Band reicht nicht für Luxationsschutz). Die identische
  Formulierung im mirrorenden `huefte`-Anatomie-Item und im
  `huefte`-Wissenseintrag („Der Ortolani-Test...") wurde parallel
  aktualisiert, um nicht an zwei von drei Stellen eine inzwischen selbst
  relativierte Aussage stehen zu lassen. Alle 2 neuen Items sowie das
  aktualisierte `lig-capitis-femoris` via Playwright verifiziert (3/3
  Seiten, 0 Fehler), `tsc`/`eslint` clean, `next build` erfolgreich,
  Reseed bestätigt (67 Anatomie-Items, Kind-Verteilung: 48 Muskel, 7
  Nerv, 5 Band, 3 Gelenk, 2 Knochen, 2 Sonstige). **Damit ist auch die
  Hüfte — Muskulatur, Gelenk, Bänder, Labrum — als zweites Hauptgelenk
  kind-übergreifend abgedeckt.** Noch offen: Schulter (Gelenk-Item und
  Bänder fehlen noch komplett), Ellbogen (nur die zwei Processus-Items
  als `KNOCHEN` vorhanden, kein `art-cubiti`-Gelenk-Item und keine
  Seitenbänder), Karpus, Tarsus (beide bisher nur über Muskulatur
  abgedeckt, keine eigenen Gelenk-/Banditems).
- **Fünfter Content-Batch — Schultergelenk komplett (06.10.2026):** Dritte
  vollständig kind-übergreifend abgedeckte Hauptgelenkregion, diesmal ohne
  neue Quellenrecherche: Die Wissensbibliothek enthielt bereits vier dicht
  verifizierte Hárrer-Einträge zur Schulter
  (`schultergelenk-skapulothorakales-gleitlager-anatomie`,
  `bizepstest-schultergelenk-stabilitaetstests`,
  `schultergelenkmuskulatur-flexoren-extensoren-differenzierung`,
  `vordergliedmasse-gewichtsverteilung-taeter-opfer-prinzip`, Kap. 12.1.1–
  12.1.5/12.2.1/12.3.1–12.3.4 sowie Kap. 11, S. 126–144) und einen
  Koch/Fischer-Eintrag zur Luxation (`schultergelenkluxation-hund`, Kap.
  8.4.6, S. 228f.) — diese bereits geprüften Fakten wurden als strukturierte
  Anatomie-Items neu aufbereitet statt dupliziert. 3 neue Items (67 → 70).
  `KNOCHEN` (1, drittes Item dieses Kinds): `skapula` — alle Landmarken
  (Margo cranialis/dorsalis/caudalis, Tuberculum supraglenoidale/
  infraglenoidale, Fossa supraspinata/infraspinata, Akromion, Fossa
  subscapularis, Facies serrata) sowie das Synsarkose-Konzept
  (skapulothorakales Gleitlager statt echtem Gelenk — deshalb gilt hier
  nicht die Konvex-Konkav-Regel der Gelenklehre). `GELENK` (1, viertes
  Item dieses Kinds): `art-humeri` — anatomisch ein Kugelgelenk, das
  funktionell wie ein Scharniergelenk behandelt wird (ROM, Kapselmuster,
  Endgefühle alle direkt aus Hárrer), inkl. der Luxations-Ätiologie
  (mediale Bandlaxizität bei kongenitaler, laterale Richtung bei
  traumatischer Luxation) aus Koch/Fischer ergänzt. `BAND` (1, sechstes
  Item dieses Kinds): `ligg-glenohumeralia` — mediales und laterales
  Ligament mit ehrlich ausgewiesener Einschränkung (präzise osteologische
  Ursprungs-/Ansatzpunkte in keiner der beiden Quellen einzeln benannt),
  inkl. der muskulären Doppelstabilisierung (M. subscapularis medial, M.
  infraspinatus lateral) und der mediales/laterales-Gapping-Testlogik. Alle
  3 neuen Items sowie 4 dadurch aktualisierte bestehende Wissenseinträge
  (gegenseitige `relatedAnatomyIds`-Verknüpfung) via Playwright verifiziert
  (3/3 neue Review-Seiten, 0 Fehler), `tsc`/`eslint` clean, `next build`
  erfolgreich, Reseed bestätigt (70 Anatomie-Items, Kind-Verteilung: 48
  Muskel, 7 Nerv, 6 Band, 4 Gelenk, 3 Knochen, 2 Sonstige). **Damit ist auch
  die Schulter — Schultergürtelmuskulatur, Skapula, Gelenk selbst, Bänder —
  als drittes Hauptgelenk kind-übergreifend abgedeckt.** Noch offen:
  Ellbogen (nur die zwei Processus-Items als `KNOCHEN` vorhanden, kein
  `art-cubiti`-Gelenk-Item und keine Seitenbänder — Quellenmaterial dafür
  vermutlich ebenfalls schon in der Wissensbibliothek vorhanden, analog zu
  diesem Batch zu prüfen), Karpus, Tarsus (beide bisher nur über
  Muskulatur abgedeckt, keine eigenen Gelenk-/Banditems).
- **Sechster Content-Batch — Ellbogengelenk komplett (09.10.2026):** Vierte
  vollständig kind-übergreifend abgedeckte Hauptgelenkregion, wie beim
  Schulter-Batch ohne neue Quellenrecherche: Die Wissensbibliothek enthielt
  bereits dichtes, verifiziertes Material aus Hárrer
  (`ellenbogengelenk-teilgelenke`, Kap. 13 Einleitung, S. 165;
  `processus-coronoideus-medialis-ueberlastung-provokation`, Kap. 13.1.1/
  13.2.1, S. 165/167f.) und aus Koch/Fischer
  (`unterarm-ellbogen-liegender-hund-untersuchung`, Kap. 6.3.3–6.3.4, S.
  142–148) sowie den zwei bereits bestehenden `KNOCHEN`-Items
  (`processus-anconaeus`, `processus-coronoideus-medialis`) — diese Fakten
  wurden als drei neue strukturierte Items aufbereitet statt dupliziert.
  3 neue Items (70 → 73). `KNOCHEN` (1, viertes Item dieses Kinds):
  `radius-ulna` — Landmarken (Styloid-Fortsätze, Radiuskopf, Olecranon)
  sowie die klinisch sehr konkrete Drittel-abhängige Differentialdiagnosen-
  Zuordnung von Druckschmerz (distal: Osteosarkom/hypertrophe
  Osteodystrophie/retinierte Knorpelzapfen; Diaphyse: Panosteitis/
  Wachstumsstörung/hypertrophe Osteopathie; proximal: Panosteitis/
  Ellbogengelenkdysplasie). `GELENK` (1, fünftes Item dieses Kinds):
  `art-cubiti` — funktionell drei eng gekoppelte Teilgelenke (Art.
  humeroulnaris, Art. humeroradialis, Art. radioulnaris proximalis) mit
  ROM-Werten; ehrlich ausgewiesen, dass die ausgewerteten Quellenausschnitte
  anders als bei Knie/Hüfte/Schulter kein explizites Kapselmuster/Endgefühl
  für dieses Gelenk nennen — bewusst nicht erfunden. `BAND` (1, siebtes Item
  dieses Kinds): `ligg-collateralia-cubiti` — mediales und laterales
  Seitenband mit der Rotationsbegrenzungslogik bei gebeugtem Ellbogen
  (Kreuzung von Radius/Ulna) und der vollständigen Seitenbandruptur-/
  Luxations-Differentialdiagnostik aus dem Seitenbandtest. Alle 3 neuen
  Items sowie 5 dadurch aktualisierte bestehende Wissenseinträge
  (gegenseitige `relatedAnatomyIds`-Verknüpfung) via Playwright verifiziert
  (3/3 neue Review-Seiten, 0 Fehler), `tsc`/`eslint` clean (ein
  straight-quote-Tippfehler in der Jena-Studie-Erwähnung wie gewohnt vor dem
  Commit behoben), `next build` erfolgreich, Reseed bestätigt (73
  Anatomie-Items, Kind-Verteilung: 48 Muskel, 7 Nerv, 7 Band, 5 Gelenk, 4
  Knochen, 2 Sonstige). **Damit ist auch der Ellbogen — Muskulatur,
  Unterarmknochen, Gelenk selbst, Seitenbänder — als viertes Hauptgelenk
  kind-übergreifend abgedeckt.** Noch offen: Karpus, Tarsus (beide bisher
  nur über Muskulatur abgedeckt, keine eigenen Gelenk-/Banditems) — die
  Wissensbibliothek enthält dafür vermutlich ebenfalls bereits verifiziertes
  Material (Karpus/Tarsus-Untersuchungstechniken), analog zu diesem und dem
  letzten Batch zunächst dort zu prüfen, bevor neue Quellenrecherche nötig
  wird.
- **Siebter Content-Batch — Karpalgelenk komplett (09.10.2026):** Fünfte
  vollständig kind-übergreifend abgedeckte Hauptgelenkregion, erneut ohne
  neue Quellenrecherche: Die Wissensbibliothek enthielt bereits dichtes,
  verifiziertes Material aus Hárrer (`karpalgelenk-gelenketagen`, Kap. 15,
  S. 192; `os-carpi-accessorium-nervus-ulnaris-differenzierung`, Kap.
  15.2.1, S. 194) und aus Koch/Fischer
  (`zehen-karpus-vordergliedmasse-untersuchung`, Kap. 5.4.1–5.4.2, S.
  98–101; `hyperextensionstrauma-carpus`, Kap. 8.4.2, S. 219–221) sowie
  VetCenter (`karpalgelenk-luxation-hyperextension-hund`) — diese Fakten
  wurden als drei neue strukturierte Items aufbereitet statt dupliziert.
  3 neue Items (73 → 76). `KNOCHEN` (1, fünftes Item dieses Kinds):
  `os-carpi-accessorium` — Lage als Umlenkrolle für die Flexor-/
  Extensor-carpi-ulnaris-Sehne, dritte Gelenketage des Karpalgelenks
  (Art. ossis carpi accessorii) sowie die diagnostisch wichtige
  Loge-de-Guyon-Analogie (N.-ulnaris-Ast unter der medialen Bandfixierung
  kann eine Gelenkprovokation vortäuschen). `GELENK` (1, sechstes Item
  dieses Kinds): `art-carpi` — drei Gelenketagen (Art. antebrachiocarpea,
  Art. mediocarpea, Art. ossis carpi accessorii) mit explizitem
  Kapselmuster (Flexion–Extension) und Endgefühl (fest-elastisch,
  anders als beim Ellbogen diesmal direkt aus der Quelle), ROM-Werten
  sowie den klinisch konkreten Winkelangaben (Hyperextension 25° ± 10°,
  Valgusstellung bis 15°). `BAND` (1, achtes Item dieses Kinds):
  `ligg-carpi` — alle Bandgruppen gebündelt (palmare Bänder/Sehnenplatten,
  gerade/schräge radiokarpale Bänder, interkarpale Bänder,
  Kollateralbänder) mit dem Valgusstellungs-Belastungsmechanismus (mediale
  stärker belastet als laterale) und der vollständigen Therapie-
  Differenzierung nach betroffener Bandgruppe. Alle 3 neuen Items sowie 5
  dadurch aktualisierte bestehende Wissenseinträge (gegenseitige
  `relatedAnatomyIds`-Verknüpfung) via Playwright verifiziert (3/3 neue
  Review-Seiten, 0 Fehler), `tsc`/`eslint` clean (diesmal im ersten
  Durchlauf ohne Quote-Tippfehler), `next build` erfolgreich, Reseed
  bestätigt (76 Anatomie-Items, Kind-Verteilung: 48 Muskel, 7 Nerv, 8
  Band, 6 Gelenk, 5 Knochen, 2 Sonstige). **Damit ist auch der Karpus —
  Muskulatur, Os carpi accessorium, Gelenk selbst, Bänder — als fünftes
  Hauptgelenk kind-übergreifend abgedeckt.** Noch offen: Tarsus
  (Sprunggelenk, bisher nur über Muskulatur abgedeckt) — die
  Wissensbibliothek enthält dafür bereits den Eintrag
  `tarsus-erkrankungen-hund` (Koch/Fischer) sowie vermutlich weiteres
  Material zu Tarsusuntersuchung/-biomechanik, analog zu diesem Batch
  zunächst dort zu prüfen. Nach dem Tarsus wären alle sechs Hauptgelenke
  (Knie, Hüfte, Schulter, Ellbogen, Karpus, Tarsus) kind-übergreifend
  abgedeckt — ein guter Zeitpunkt, um den „Noch offen"-Fokus auf weitere
  KNOCHEN-Landmarken (Wirbelsäule, Becken, Schädel) oder eine erneute
  Qualitätsprüfung des bestehenden Bestands zu verlagern.
- **Achter Content-Batch — Sprunggelenk komplett, alle sechs Hauptgelenke
  abgeschlossen (09.10.2026):** Sechste und letzte vollständig
  kind-übergreifend abgedeckte Hauptgelenkregion, wie bei den letzten
  Batches ohne neue Quellenrecherche: Die Wissensbibliothek enthielt
  bereits dichtes, verifiziertes Material aus Hárrer
  (`sprunggelenk-zehen-funktionelle-anatomie-hyperaesthesien`, Kap. 10.1,
  S. 112) und aus Koch/Fischer
  (`zehen-mittelfuss-sprunggelenk-untersuchung`, Kap. 5.3.1–5.3.2, S.
  83–88; `zehen-tarsus-sprunggelenk-liegender-hund-untersuchung`, Kap.
  6.2.1–6.2.2, S. 111–117; `tarsus-erkrankungen-hund`, Kap. 8.3.3, S.
  195–199) — diese Fakten wurden als drei neue strukturierte Items
  aufbereitet statt dupliziert. 3 neue Items (76 → 79). `KNOCHEN` (1,
  sechstes Item dieses Kinds): `calcaneus-talus` — kombiniert beide
  zentralen Tarsalknochen in einem Item (analog zu `radius-ulna`): die
  20°-Lateralstellung des Talus gegenüber der Tibiaachse (erklärt die
  physiologische Außenrotation der Pfote bei Flexion) sowie das Tuber
  calcanei als Fersensehnenstrang-Ansatz mit der kompletten
  Differentialdiagnostik bei Tischplattenkontakt. `GELENK` (1, siebtes
  Item dieses Kinds): `art-tarsi` — vier Gelenketagen, von denen nur die
  Art. tarsocruralis wirklich beweglich ist (funktionelle Begründung:
  sonst würde Schub aus der Hinterhand verpuffen), inkl. der
  Terminologie-Brücke Hárrer („Art. tarsocruralis“) ↔ Koch/Fischer
  („Art. talocruralis“) für dieselbe Etage; ehrlich ausgewiesen, dass
  Kapselmuster/Endgefühl in den ausgewerteten Quellenausschnitten fehlen
  (wie beim Ellbogen). `BAND` (1, neuntes Item dieses Kinds): `ligg-tarsi`
  — mediales/laterales Kollateralband inkl. des isoliert testbaren kurzen
  kaudalen Anteils des lateralen Bandes sowie der kurzen intertarsalen
  Bänder mit ihrer altersbedingten Spontanruptur-Prädisposition (Collies).
  Bei allen drei neuen Items bewusst kein `relatedCaseId`/`bildUrl`
  gesetzt — keiner der acht Fälle behandelt den Tarsus unmittelbar, und
  ein erzwungener Fall-/Bildbezug hätte nur suggeriert, es gäbe einen
  passenden Fall, den es nicht gibt (beide Felder sind laut `AnatomySeed`-
  Typ optional, siehe Eintrag vom 21.09.2026). Alle 3 neuen Items sowie 4
  dadurch aktualisierte bestehende Wissenseinträge (gegenseitige
  `relatedAnatomyIds`-Verknüpfung) via Playwright verifiziert (3/3 neue
  Review-Seiten, 0 Fehler — inkl. korrekter Darstellung ganz ohne Bild),
  `tsc`/`eslint` clean, `next build` erfolgreich, Reseed bestätigt (79
  Anatomie-Items, Kind-Verteilung: 48 Muskel, 7 Nerv, 9 Band, 7 Gelenk, 6
  Knochen, 2 Sonstige). **Damit sind jetzt alle sechs Hauptgelenke (Knie,
  Hüfte, Schulter, Ellbogen, Karpus, Tarsus) — jeweils mit Muskulatur,
  mindestens einem KNOCHEN-Landmarken-Item, dem Gelenk selbst und seinen
  Bändern — kind-übergreifend abgedeckt.** Noch offen für künftige
  Sessions: weitere KNOCHEN-Landmarken außerhalb der sechs Hauptgelenke
  (Wirbelsäule/Wirbelkörper-Typen, Becken, Schädel — bisher nur einzelne
  Aspekte wie `facettengelenke` oder `discus` erfasst, kein eigenes
  Wirbel-KNOCHEN-Item), eine systematische Qualitätsprüfung des
  bestehenden 79-Item-Bestands gegen die Originalquellen (MASTER-PROMPT
  §21), oder — nach Rücksprache mit Vanessa — ein erneuter Fokus auf die
  Wissensbibliothek, die seit dem 03.10.2026 pausiert ist.
- **Neunter Content-Batch — Obere Halswirbelsäule/Kopfgelenke (C0–C2)
  (09.10.2026):** Erster Schritt in Richtung Wirbelsäulen-Anatomie,
  erneut ohne neue Quellenrecherche: Die Wissensbibliothek enthielt
  bereits außergewöhnlich dichtes, verifiziertes Material speziell zur
  klinisch besonders wichtigen Region C0–C2 (Chihuahua/Pekinese/
  Zwergpudel-Risikozone für atlantoaxiale Subluxation) aus Hárrer Kap.
  16.2.1 (`obere-hws-funktionelle-anatomie-atlas-foramen-jugulare`,
  `obere-hws-instabilitaet-dens-warnsignale`, S. 204–206), VetCenter
  (`atlantoaxiale-subluxation-densentwicklung-diagnostisches-zeichen`)
  und Alexander, Physikalische Therapie für Kleintiere Kap. 13 — diese
  Fakten wurden als drei neue strukturierte Items aufbereitet statt
  dupliziert. 3 neue Items (79 → 82). `KNOCHEN` (1, siebtes Item dieses
  Kinds): `atlas-axis` — Atlas (C1, ringförmig, „Träger des Kopfes“,
  Atlasflügel immer tastbar) und Axis (C2, mit Dens axis) kombiniert in
  einem Item (analog zu `radius-ulna`/`calcaneus-talus`), inkl. der
  klinisch zentralen Foramen-jugulare-Nachbarschaft der C0-Gelenkkapsel
  (N. vagus/accessorius/glossopharyngeus, V. jugularis) und der
  Densanomalie-Prädisposition kleiner Rassen. `GELENK` (1, achtes Item
  dieses Kinds): `artt-craniocervicales` — C0 (Ellipsoidgelenk) und C1
  (bikonvexes Zapfengelenk, Hälfte der gesamten HWS-Rotation) mit der
  gegenläufig gekoppelten Rotations-/Seitneige-Bewegung; ehrlich
  ausgewiesen, dass Kapselmuster/Endgefühl im Original nicht genannt
  werden. `BAND` (1, zehntes Item dieses Kinds):
  `lig-transversum-atlantis` — der Sicherungsmechanismus gegen ein
  Abrutschen des Dens axis Richtung Medulla oblongata bei Kopfflexion,
  mit vollständiger Insuffizienz-Ätiologie (traumatisch, iatrogen durch
  Kortison, entzündlich, oder entwicklungsbedingt bei Kleinrassen) und
  dem diagnostischen 2–3-fachen-Abstandszeichen. Bei allen drei Items
  `relatedCaseId: "filou"` gesetzt (bereits der Fall des bestehenden
  `rueckenmark`-Items, thematisch konsistent für Neuro-/Wirbelsäulen-
  Content), aber bewusst kein `bildUrl` (kein vorhandenes Bild passt).
  Alle 3 neuen Items sowie 3 dadurch aktualisierte bestehende
  Wissenseinträge (gegenseitige `relatedAnatomyIds`-Verknüpfung, jeweils
  ergänzt neben dem bereits vorhandenen `rueckenmark`-Verweis) via
  Playwright verifiziert (3/3 neue Review-Seiten, 0 Fehler), `tsc`/
  `eslint` clean, `next build` erfolgreich, Reseed bestätigt (82
  Anatomie-Items, Kind-Verteilung: 48 Muskel, 7 Nerv, 10 Band, 8 Gelenk,
  7 Knochen, 2 Sonstige). **Hinweis für künftige Sessions:** Das
  bestehende `rueckenmark`-Item hat weiterhin keinen expliziten `kind`
  gesetzt (läuft über den `MUSKEL`-Default) und referenziert noch kein
  einziges der jetzt sechs Hauptgelenk- bzw. Wirbel-Items zurück — eine
  Reklassifizierung zu `SONSTIGE` (analog zur Reklassifizierung von
  `facettengelenke`/`huefte`/`discus` am 03.10.2026) wäre im Rahmen der
  ohnehin geplanten Qualitätsprüfung sinnvoll. Noch offen: der Rest der
  Halswirbelsäule (C3–C7, „untere HWS“ — Eintrag
  `untere-hws-funktionelle-anatomie-differentialdiagnosen` existiert
  bereits als Quelle), Brust-/Lendenwirbelsäule (allgemeiner Wirbel-
  Bauplan, Procc. spinosi/transversi/articulares als eigenes KNOCHEN-
  Item — aktuell nur in Muskel-Ursprungsangaben erwähnt, nie als
  eigenständige Struktur), Becken (Os ilium/ischii/pubis), Schädel.
- **Zehnter Content-Batch — Facettengelenke HWS/BWS plus
  Rückenmark-Reklassifizierung (09.10.2026):** Direkte Fortsetzung des
  neunten Batches in Richtung Wirbelsäule, erneut ohne neue
  Quellenrecherche. **Korrektur zuerst:** Das bestehende `rueckenmark`-
  Item (im letzten Batch als offener Punkt vermerkt) hatte noch keinen
  expliziten `kind`-Wert und lief über den `MUSKEL`-Default, zusätzlich
  mit zwei „—“-Platzhaltern bei `origin`/`insertion` — derselbe
  Schema-Mismatch, der am 03.10.2026 bereits bei `facettengelenke`/
  `huefte`/`discus` behoben wurde. Jetzt auf `kind: SONSTIGE`
  umgestellt, Platzhalter entfernt (Felder bewusst leer gelassen statt
  erfunden). Nach dem Reseed per Playwright bestätigt: Das Item bleibt
  weiterhin `APPROVED` (Vanessas vorherige Freigabe geht durch den
  bestehenden Update-ohne-Status-Reset-Mechanismus, siehe Eintrag vom
  21.09.2026, nicht verloren) und rendert jetzt korrekt mit dem
  „Struktur“-Badge und „Aufbau → Funktion“-Feldern statt leerer
  Ursprung/Ansatz-Zeilen. 2 neue Items (82 → 84). `GELENK` (2, neuntes/
  zehntes Item dieses Kinds): `facettengelenke-hws` (C3–C7, Hárrer Kap.
  16.2.2, S. 210f.) — Palpationslandmarken (v. a. C6 über seine
  ausgeprägte Crista ventralis), die andere Kopplungslogik als an der
  oberen HWS (gleichsinnig in Flexion/Extension statt durchgehend
  entgegengesetzt, siehe `artt-craniocervicales`) sowie der klinisch
  nützliche Dermatom-Hinweis (supraskapuläres Kratzen als mögliches
  HWS-Zeichen statt Juckreiz); `facettengelenke-bws` (Th1–Th13, Hárrer
  Kap. 16.2.3–16.2.4, S. 214–222) — die Facettengeometrie-Wende am 10.
  Brustwirbel (63 % Facettenaplasie bei Kleinrassen), die Th10/L1-
  Übergangsmechanik als Spondylose-Risikozone sowie die vollständige
  Provokationstechnik-Trias (Springingtest, Rosett-Test, mediale
  Rippentranslation zur Rippe/Bandscheibe-DD). Beide Items ergänzen die
  bereits bestehende `facettengelenke` (lumbosakraler Übergang) sauber
  um die kranialeren Wirbelsäulenabschnitte, ohne deren Inhalt zu
  überschneiden. Alle 2 neuen Items sowie 3 dadurch aktualisierte
  bestehende Wissenseinträge (gegenseitige `relatedAnatomyIds`-
  Verknüpfung) via Playwright verifiziert (3/3 Review-Seiten inkl.
  Rückenmark-Recheck, 0 Fehler), `tsc`/`eslint` clean, `next build`
  erfolgreich, Reseed bestätigt (84 Anatomie-Items, Kind-Verteilung: 47
  Muskel, 7 Nerv, 10 Band, 10 Gelenk, 7 Knochen, 3 Sonstige). Noch
  offen: allgemeiner Wirbel-Bauplan als eigenes KNOCHEN-Item (Procc.
  spinosi/transversi/articulares, Wirbelkörper/-bogen — aktuell nur in
  Muskel-Ursprungsangaben erwähnt), Lendenwirbelsäule als eigene
  GELENK-Region (nur der lumbosakrale Übergang ist bereits erfasst),
  Becken (Os ilium/ischii/pubis), Schädel.
- `AnatomyItem.relatedCaseId` ist jetzt optional (Schema war es schon immer,
  `AnatomySeed`-Typ wurde am 21.09.2026 angepasst). Anatomie-Items können ab sofort
  unabhängig von einem passenden Fall angelegt werden — nötig, um auf hunderte
  Einträge zu skalieren, ohne für jeden auch einen neuen Fall zu erfinden.
- `findKnowledgeForCase`/`findKnowledgeForAnatomy` geben jetzt Listen zurück; bei
  mehreren passenden Einträgen wählt die Nutzerin selbst (siehe Commit
  „Mehr-erfahren-CTA", 21.09.2026).
- **Kritischer Bugfix (21.09.2026):** Die `update`-Blöcke der `case.upsert`/
  `anatomyItem.upsert`-Aufrufe in `seedContent()` haben bei bereits
  existierenden Datensätzen bisher **nur die Bild-URL-Felder** aktualisiert —
  jede inhaltliche Änderung an einem schon angelegten Fall/Anatomie-Item (z. B.
  eine korrigierte `sourceStatus`) wurde beim erneuten Seeden stillschweigend
  verworfen. Neu angelegte Einträge waren nicht betroffen (die liefen über den
  `create`-Zweig). Behoben durch vollständige `update`-Blöcke (alle Skalarfelder
  außer `status`, damit ein bereits von Vanessa vergebenes `APPROVED` beim
  Reseed nicht zurückgesetzt wird) sowie durch unbedingtes
  `deleteMany`+`createMany` für die Options-Tabellen
  (`CaseHypothesisOption`/`CaseWeakeningOption`/`CaseRetrievalOption`/
  `AnatomyTransferOption`), statt sie nur im `create`-Zweig zu schreiben. Nach
  zweifachem Reseed verifiziert: keine doppelten Options-Zeilen, `status`
  bleibt erhalten, Inhaltsänderungen (getestet an `quadriceps`) kommen jetzt
  tatsächlich an. **Konsequenz:** Alle in früheren Sessions als „geprüft/
  korrigiert" gemeldeten Änderungen an bereits existierenden Fällen/
  Anatomie-Items müssen als nicht zuverlässig in der DB angekommen gelten,
  bis sie im Rahmen dieses Fixes neu geseedet wurden (was mit diesem Commit
  passiert ist).

- **Anatomie-Lückenschluss (23.09.2026):** Vanessa hat zu Recht bemängelt, dass
  viele Anatomie-Items bei Ursprung/Ansatz/Innervation nur "Im Quellentext
  nicht genannt" stehen hatten — das ist als Endzustand nicht akzeptabel.
  Klare neue Regel: Fehlt eine Angabe in den Büchern, wird sie per
  Web-Recherche aus verifizierten veterinäranatomischen Fachquellen ergänzt
  (IMAIOS vet-Anatomy, WikiVet, universitäre Lehrmaterialien wie
  vanat.ahc.umn.edu) statt leer/unklar zu bleiben. 19 Anatomie-Items
  (komplette Schulter-/Ellbogen-/Unterarm-/Kniegelenksregions-Muskulatur aus
  den Hárrer-Kapiteln) wurden so lückenlos komplettiert — jedes mit klar
  getrennter Quellenangabe (was Hárrer sagt vs. was per Web-Recherche
  ergänzt wurde) im `sourceStatus`. Getroffene Web-Werte konvergierten
  durchgängig über mehrere unabhängige Quellen; zwei Fälle (Ansatz des
  M. biceps femoris/M. semitendinosus/M. gracilis am Tuber calcanei)
  bestätigten sich sogar zusätzlich unabhängig durch die bereits gelesene
  Koch/Fischer-Quelle (Fersensehnenstrang-Beschreibung). Ein Fall (Funktion
  der beiden Anteile des M. sartorius) zeigte eine Diskrepanz zwischen
  Hárrer und Web-Quellen, die transparent dokumentiert statt vermischt
  wurde. Dieselbe Lücken-Regel gilt ab sofort für alle künftigen
  Anatomie-Items: keine leeren/unklaren Kernfelder mehr als Endzustand.

## Stand (29.09.2026)

- Wissensbibliothek: 353 Einträge (genaue Kategorien-Aufteilung kann leicht
  abweichen, da manche Einträge mehrere Kategorien berühren). Koch/Fischer,
  Lahmheitsuntersuchung beim Hund
  (ISBN 978-3-13-242101-1), ist vollständig durchgearbeitet (Kap. 1–9, 54
  Einträge seit dem 21.09.). Danach 49 weitere neue Einträge aus Hárrer,
  Manuelle Therapie beim Hund — **damit ist Hárrer, Manuelle Therapie beim
  Hund (ISBN 978-3-13-245429-3), in seinen fachlich dichten
  Kernabschnitten vollständig ausgewertet (Kap. 6–17)**. Kap. 18 ist reine
  Literaturliste, kein Extraktionsziel mehr. Danach 31 weitere neue
  Einträge aus Mai, Physiotherapie und Bewegungstraining für Hunde —
  **damit ist Mai, Physiotherapie und Bewegungstraining für Hunde
  (ISBN 978-3-13-240099-3), vollständig durchgearbeitet** (Kap. 4
  „Training und Hundesport", Kap. 5.1–5.3 sowie 5.5 „Hydrotherapie" und
  5.6 „Hilfsmittel"; das Buch endet danach mit einem reinen Anhang ohne
  weitere Fachkapitel). Siehe BIOMECHANIK-/THERAPIE-Backlog unten für die
  im Detail bewusst ausgelassenen reinen Technik-Rezeptteile (u. a. die
  ca. 25 Einzelübungen aus Kap. 5.5, die alle demselben Indikation/Wie
  oft/Wie lange-Schema folgen). Danach 4 weitere neue Einträge aus Hohmann,
  Bewegungsapparat Hund (ISBN 978-3-13-245265-7), Kap. 2 „Statik und
  Dynamik des Hundes" (vollständig, S. 22–30) und Kap. 3 „Schwerpunkt und
  Unterstützungsfläche" (vollständig, S. 31–35) — Bogensehnenbrücken-
  Bauprinzip, Ursachen gestörter Gelenkfunktion, Muskelfunktionsstörungen/
  Atrophietypen, Schwerkraft/Masse-Feder-Modell/Schwerpunktlage sowie
  Unterstützungsflächen-Grundlagen und deren pathologische Veränderungen
  (Dreibeinigkeit, Cauda-equina). Damit ist Teil 1 des Buches („Klinische
  Untersuchung, Statik und Dynamik") vollständig ausgewertet. Danach 6
  weitere neue Einträge aus Kap. 4 „Der Knochen" (Teil 2 „Grundlagen der
  Anatomie", vollständig, S. 38–47): Knochenaufbau, sechs Knochenformen,
  trajektorielle Struktur/Minimal-Maximal-Prinzip, Knochenfunktionen inkl.
  Humerus-Tibia-Kraftübertragung/OCD, Knochenwachstum mit
  Kastrationseffekt, sowie der piezoelektrische Effekt physikalisch-
  historisch vertieft (ergänzt den bestehenden Eintrag aus Mai statt ihn
  zu duplizieren). Danach 6 weitere neue Einträge aus Kap. 5.2/5.3 „Das
  Gelenk" (allgemeine Gelenkphysiologie, vollständig, S. 48–60):
  Gelenkknorpel (Reibung/Wärme, Degenerationskaskade), Gelenkkapsel mit
  vier Mechanorezeptortypen, Synovia/Gelenkbänder, Menisken,
  Gelenkbiomechanik (Hebelarme, gewichttragende Fläche, Circulus
  vitiosus) sowie Rollen/Gleiten/Rollgleiten mit Ruhestellung/Gelenkspiel.
  Kap. 5.4 „Die Gelenke im Einzelnen" (regionaler Gelenkatlas, S. 60–161)
  bewusst nicht extrahiert — Details und Begründung siehe Hohmann-Backlog
  unten. Danach 6 weitere neue Einträge aus Kap. 8 „Die Bewegung des
  Hundes" (vollständig, S. 200–217): Pantografenbein-Prinzip,
  Vorschwing-/Stemmphasen-Muskelchoreografie, Selbststabilisierung der
  Gliedmaße, Schritt/Trab (Trittsiegel, Crabbing), Passgang/Galopp/Sprung
  sowie Schrittlänge-Anteile mit diagnostischer Konsequenz und
  Beweglichkeitsfaktoren. Danach 2 weitere neue Einträge aus Kap. 9.1
  „Grundlagen" (Muskeln in Bewegung): der Muskel-Steckbrief (Kraft/
  Leistung/Fasertyp mit Renngreyhound-Rekordwerten) sowie die Fischer/
  Lilje-Neudefinition der Beuger-/Strecker-Rollen. Kap. 9.2/9.3 (der
  komplette Vordergliedmaßen-Muskelatlas) bewusst nicht extrahiert —
  Doppelarbeit zu Hárrer, Details siehe Hohmann-Backlog. Danach 2 weitere
  neue Einträge aus Kap. 10 „Klinischer Bezug zu ideomotorischen
  Bewegungen": ideomotorische Bewegungen als diagnostisches Potenzial
  sowie die hängende Rute als Differentialdiagnose-Fallbeispiel (Water
  Tail bis Cauda-equina-Syndrom) — **damit ist Hohmann, Bewegungsapparat
  Hund (ISBN 978-3-13-245265-7), vollständig ausgewertet.** Baumgartner/
  Wittek/Khol „Klinische Propädeutik der Haus- und Heimtiere" wurde
  erkundet (Struktur, relevante Kapitel 6/7 identifiziert), aber wegen
  Multi-Spezies-Umfang und Extraktions-Qualitätsproblemen zurückgestellt
  (siehe UNTERSUCHUNG-Backlog). Danach 3 weitere neue Einträge aus dem
  ersten Abschnitt von VetCenter „Wirbelsäulenerkrankungen"
  (Rückenmarkkompressionen — Ätiologie/Pathogenese/Symptome/
  Lokalisationsbestimmung/Differentialdiagnose, S. 1–9 von 43): die
  Sekundärschädigungskaskade bei plötzlicher vs. langsamer Kompression,
  die krankheitsunabhängige Lokalisationslogik (Ausfallreihenfolge,
  OMN/UMN) sowie eine Differentialdiagnosen-Liste jenseits des
  Bandscheibenvorfalls. Danach ein weiterer neuer Eintrag aus dem
  Diskopathie-Abschnitt: die Hansen-I/II-Klassifikation mit dem
  anatomischen Schutzmechanismus des Lig. intercapitale (Th1–Th10) und
  dem Nervenwurzelzeichen als Fehldeutungsfalle. Auf Vanessas Nachfrage,
  ob die Formulierungen zu nah an den Quelltexten bleiben, wurde die
  Paraphrasier-Disziplin danach verschärft (unabhängige Synthese statt
  Verkettung von Quell-Stichpunkten) — angewendet auf 2 weitere neue
  Einträge aus dem Abschnitt „Wirbelsäulentrauma": der spinale Schock als
  diagnostische Frühbefund-Falle sowie die Grenzen des Röntgenbilds nach
  einem Unfall (Momentaufnahme-Charakter, spontan reponierte Luxationen).
  Danach 2 weitere neue Einträge (S. 27–29): die Acht-Stunden-
  Prognosegrenze bei Tiefenschmerzverlust nach Trauma sowie die
  atlantoaxiale Subluxation mit Rasseprädisposition, Altersstatistik und
  diagnostischem Flexionsaufnahme-Zeichen. Danach ein weiterer neuer
  Eintrag zum Wobbler-Syndrom (S. 31–34): die zwei rassetypischen
  Entstehungswege (Deutsche Dogge vs. Dobermann), die Symptomprogression
  von hinten nach vorne sowie das Konzept der rein dynamischen,
  stressaufnahme-abhängigen Rückenmarkkompression. Danach ein weiterer
  neuer Eintrag zur lumbosakralen Instabilität/Stenose (S. 35–38): die
  orthopädische Verwechslungsgefahr mit einer Kreuzbandläsion bei
  foraminaler Nervenwurzelkompression, Automutilation als mögliches
  Symptom sowie spezifische Bildgebungsgrenzen. Danach ein letzter neuer
  Eintrag zur Diskospondylitis (S. 39–43, letzter Abschnitt): die
  hämatogene Infektionsroute mit meist wirbelsäulenfernem Ursprungsherd
  (Harnapparat/Periodont/Herzklappen/Haut) und die zeitliche Verzögerung
  der Röntgenbefunde gegenüber CT/MRT — **damit ist VetCenter
  „Wirbelsäulenerkrankungen" als Quelle vollständig ausgewertet (43/43
  Webseiten).** Danach 2 neue fallunabhängige Anatomie-Items aus dem
  ANATOMIE-Backlog (27.09.2026): M. semimembranosus und M. gastrocnemius
  (Ursprung/Ansatz/Funktion aus Hárrer, Innervation per Web-Recherche
  ergänzt) — damit ist die zuvor offene Hamstrings-/
  Unterschenkelmuskulatur-Lücke geschlossen, 29 → 31 Anatomie-Items.
  Danach 2 weitere gruppierte Items, das Hintergliedmaßen-Pendant zu den
  bereits bestehenden Karpus-Gruppen: `extensoren-tarsus-zehen` und
  `flexoren-tarsus-zehen` (Hárrer Kap. 9.3, S. 96–99) — 31 → 33
  Anatomie-Items, damit ist die komplette Hintergliedmaße von Hüfte bis
  Zehen abgedeckt. Processus anconaeus/coronoideus medialis und Lig.
  capitis femoris bleiben bewusst offen (Schema-Mismatch, siehe
  ANATOMIE-Backlog unten — keine einseitige Datenmodell-Änderung ohne
  Rücksprache). Danach Baumgartner/Wittek/Khol Kap. 6 „Orthopädischer
  Untersuchungsgang" satzweise sorgfältig gelesen (Abschnitte 6.1–6.7,
  vollständige S. 178–209): Die dokumentierte Spalten-Verschachtelung
  ist real und exakt so lokalisiert wie vermerkt (Spezies-Icon-Boxen
  reißen mitten im Satz auf), der übrige Fließtext ist aber sauber
  lesbar. Ergebnis der Prüfung gegen den bestehenden Content:
  Provokationsproben, Ortolani-/Schubladen-/Bizepssehnentest, die
  Processus-anconaeus-/-coronoideus-medialis-Unterscheidung sowie die
  neurogene/Inaktivitäts-Atrophie-Unterscheidung sind bereits in
  hundespezifischerer und detaillierterer Form aus Koch/Fischer und
  Hárrer vorhanden — hier keine Doppelarbeit betrieben. Ein Abschnitt
  war jedoch genuin neu und lag klar außerhalb der Fehlerzone: 6.6.4
  „Untersuchung von Knochen" beschreibt, dass die drei
  Fraktur-Kardinalsymptome (Achsenbrechung, abnorme Beweglichkeit,
  Krepitation) keineswegs immer alle drei nachweisbar sein müssen —
  bei einer Fissur fehlen definitionsgemäß alle drei, obwohl eine
  Fraktur vorliegt. Daraus 1 neuer Eintrag: die diagnostische Grenze
  von Krepitation als Ausschlusskriterium. Danach die restlichen
  Abschnitte 6.8–6.12 gelesen: 6.8 (Hintergliedmaße), 6.11 (Wunden)
  und 6.12 (weiterführende Bildgebung) überschneiden sich stark mit
  Bestehendem, 6.9 (Rektaluntersuchung) ist großtierspezifisch — alle
  drei ohne neue Einträge. 6.10 (Wirbelsäule) lieferte den bisher
  fehlenden Baustein eines dedizierten Wirbelsäulen-Prüfschemas:
  1 weiterer neuer Eintrag zu den drei Verbiegungstypen der
  Wirbelsäule (Lordose/Kyphose/Skoliose), zur Kyphose als möglichem
  Kompensationszeichen einer Gliedmaßenlahmheit statt eines primären
  Rückenbefunds sowie zum Prüfschema in drei Bewegungsebenen —
  **damit ist Kap. 6 „Orthopädischer Untersuchungsgang" (S. 178–231)
  vollständig gelesen, mit 2 neuen Einträgen als Nettoertrag.** Danach
  Kap. 7 „Neurologischer Untersuchungsgang" (S. 231–253) gelesen: eine
  echte Zweitquelle zu Koch/Fischer, wobei die meisten Abschnitte
  (Haltungs-/Stellreaktionen, Hirnnervenfunktionen, allgemeine
  OMN/UMN-Theorie) bereits abgedeckt sind. Zwei echte Lücken gefunden:
  die einzelnen namentlich benannten spinalen Reflexe (Patellar-,
  Tibialis-cranialis-, Achillessehnen-, Extensor-carpi-radialis-,
  Trizeps-, Flexor-, Anal-/Perinealreflex) fehlten bisher komplett als
  Referenztabelle mit Nerv/Segment/Auslösetechnik, ebenso der in der
  Praxis wichtige Pannikulusreflex zur groben Höhenlokalisation
  thorakolumbaler Rückenmarksläsionen. Daraus 2 neue Einträge. Danach
  die vier ursprünglich vorgemerkten Abschnitte aus Kap. 4 „Allgemeiner
  klinischer Untersuchungsgang" gelesen (4.2 Allgemeinverhalten, 4.6
  Körpertemperatur, 4.7 Puls, 4.10.1 Atmung) — hier gab es bisher
  **keinerlei** strukturierte Terminologie in Denkgang. 4 neue,
  überwiegend tabellenbasierte Einträge zu Bewusstseinsstufen
  (Apathie/Somnolenz/Stupor/Koma), Fieberterminologie (Grade,
  Verlaufsmuster), Pulsqualität (Pulsus-Terminologie) und
  Atemtypus/Dyspnoe-Terminologie. Damit sind alle vier vorgemerkten
  Kap.-4-Abschnitte abgearbeitet. Danach zusätzlich Kap. 4.5.3
  „Hautelastizität" gelesen (28.09.2026): 1 weiterer neuer Eintrag zum
  Hautturgor-Test als Dehydratationsgradmesser beim Hund, inkl. der
  ergänzenden V.-ulnaris-/Augapfel-Schwellenwerte. Ein Versuch, danach
  auch Kap. 4.10.4/4.10.5 (Herz-/Lungenauskultation) auszuwerten,
  zeigte, dass die gespeicherte Drive-Extraktion mitten in einer
  Tabelle abbricht — bewusst nichts aus dem unvollständigen Fragment
  übernommen. Die übrigen, nicht vorgemerkten Abschnitte von Kap. 4 sind
  offen — siehe UNTERSUCHUNG-Backlog für den Stand im Detail. Danach
  zurück zu einem länger offenen Backlog-Punkt: VetCenter „Erkrankungen
  des Bewegungsapparates" (121 S.) war bisher nur bis ca. S. 80 gesichtet.
  Die drei dort explizit vorgemerkten, noch offenen Themen gelesen und
  umgesetzt (28.09.2026): Immunvermittelte Gelenkerkrankungen (15
  benannte Subtypen in einer Vergleichstabelle, ergänzt den bestehenden
  `polyarthritis-hund`-Eintrag statt ihn zu duplizieren — inkl. bewusster
  Vermeidung der Abkürzung „IPA" wegen Kollision mit „Isolierter
  Processus Anconaeus"), Osteochondrosis dissecans im Schultergelenk
  (eigenständiges Krankheitsbild mit Gelenkmaus-Pathogenese) und die
  Kontraktur des M. infraspinatus (das namensgebende „eigenartige"
  Jagdhund-Gangbild, verknüpft mit dem bestehenden Anatomie-Item). 3 neue
  Einträge. Beim Weiterlesen (S. 57–64) zeigte sich, dass zwei weitere
  namentlich benannte Ellbogendysplasie-Komponenten bisher fehlten:
  IOCH (Inkomplette Ossifikation des Condylus humeri — mit der
  wichtigen Praxiskonsequenz, bei Diagnose immer auch den
  kontralateralen Ellbogen zu röntgen, da eine Bagatelltrauma-Fraktur
  drohen kann) und MEHB (Metaplasie der Beugesehnen am medialen
  Epicondylus). Dazwischen außerdem Distractio cubiti (DC) gefunden —
  löst direkt den seit dem 25.09. offenen Hárrer-Backlog-Punkt zum
  Radiuskurvensyndrom auf (siehe PATHOLOGIE-Hárrer-Abschnitt oben).
  3 weitere neue Einträge. Danach Karpalgelenkluxation und
  -hyperextension gelesen (S. 71–75): 1 gemeinsamer neuer Eintrag
  `karpalgelenk-luxation-hyperextension-hund` (PATHOLOGIE) — der
  plantigrade „Bärentatzen"-Gang als gemeinsames Symptom zweier
  Krankheitsbilder mit sehr unterschiedlicher Ursache (akutes Trauma
  vs. Grunderkrankung vs. rasseassoziierte chronische Degeneration bei
  Shelties/Collies), klar abgegrenzt vom bestehenden
  Tarsus-Instabilitäts-Eintrag (Hintergliedmaße statt Vordergliedmaße).
  Danach Femurkopfluxation ergänzt (S. 78–80): 1 weiterer neuer Eintrag
  `femurkopfluxation-kaudodorsal-zeitfenster-begleitverletzungen` —
  gezielt um das, was im bestehenden `hueftgelenkluxation-hund`-Eintrag
  fehlte (dritte, kaudodorsale Luxationsrichtung, Begleitverletzungs-
  Statistik, Vier-Tage-Zeitfenster für die Reposition), nicht als
  Duplikat. Dabei zeigte sich, dass die gespeicherte Drive-Extraktion
  mitten im Femurkopfluxations-Therapieabschnitt abbricht (dasselbe
  Zeichenlimit-Muster wie bei kl(4).pdf). Statt erneut `read_file_content`
  zu versuchen, wurde die Datei per `download_file_content` (base64)
  heruntergeladen und lokal mit `pdftotext -layout` vollständig
  konvertiert (280.920 statt 106.693 Zeichen — keine Kappung mehr). Die
  vollständige Extraktion zeigte: keine Fraktur-/Tumor-/
  Wirbelsäulenabschnitte vorhanden (falsche Vermutung), stattdessen die
  fehlenden Erfolgsquoten der Femurkopfluxations-Reposition (in den
  bestehenden Eintrag nachträglich ergänzt) sowie als letztes Thema der
  Datei die Quadrizepskontraktur nach distaler Femurfraktur — 1 weiterer
  neuer Eintrag `quadrizepskontraktur-nach-femurfraktur-physiotherapie-
  kontraindiziert` mit der für die Zielgruppe besonders wichtigen Warnung,
  dass Physiotherapie bei bereits eingetretener Kontraktur gefährlich
  statt hilfreich ist. **Damit ist die 121-seitige Datei „Erkrankungen
  des Bewegungsapparates" vollständig ausgewertet.** Denselben lokalen
  PDF-Extraktionsweg danach auf Hárrer Kap. 17.1 (Sympathikus-
  Grundlagen, zuvor gelesen, aber nie in einen Eintrag umgesetzt)
  angewendet: 1 weiterer neuer Eintrag zur Segmentüberlappung von
  Plexus brachialis und zervikalem Sympathikus, die erklärt, warum ein
  Horner-Syndrom bevorzugt bei tiefen Plexus-brachialis-Läsionen
  auftritt — inkl. der Warnung, dass dieselbe Symptomkombination je
  nach Ursache entgegengesetzte Therapieentscheidungen verlangt.
  Danach Hárrer Kap. 13-Rest (Ellenbogenregion) und Kap. 15
  (Karpalgelenk/Zehen-Kollateralligamente) vollständig gegengelesen —
  beide bestätigt ohne neue Inhalte, entsprechend im Backlog geschlossen
  (siehe unten). **Entdeckung (29.09.2026):** Das Buch Alexander (Hrsg.),
  „Physikalische Therapie für Kleintiere", war bisher fälschlich als
  „weitgehend ausgeschöpft" vermerkt, obwohl nur eine von sieben
  Kapitel-Dateien überhaupt gesichtet wurde. Als erste der bisher
  ungelesenen Kapitel-Dateien wurde „Schmerz und Nozizeption" (H.-U.
  Kulpa) vollständig extrahiert (per `download_file_content` +
  lokaler `pdftotext`-Konvertierung, 61.367 Zeichen, keine Kappung) und
  ausgewertet: 3 neue Einträge zu den Grundlagen der Schmerzphysiologie
  beim Tier — akuter vs. chronischer Schmerz und die IASP-Definition der
  „Schmerzkrankheit" (PATHOLOGIE), tierartübergreifendes und
  speziesspezifisches Schmerzverhalten als Untersuchungsgrundlage
  (UNTERSUCHUNG), sowie periphere/zentrale Sensibilisierung als
  Mechanismus der Chronifizierung samt klinischer Schmerzformen-
  Terminologie (PATHOLOGIE) — Details siehe PATHOLOGIE/GRUNDLAGEN-
  Alexander-Abschnitt unten. Danach „Physiologische Grundlagen" (C.-S.
  Alexander/G. Baatz) ebenso vollständig extrahiert (84.375 Zeichen, keine
  Kappung): 3 weitere neue Einträge aus dem Nervensystem-Abschnitt —
  Propriozeption als Zusammenspiel arbeitsteiliger Rezeptortypen
  (Muskelspindel/Golgi-Sehnenorgan/Vater-Pacini-Körperchen, BIOMECHANIK),
  die physiologische Klassifikation Eigen-/Fremdreflex mit den
  Sherrington-Gesetzen (UNTERSUCHUNG) sowie der γ-Loop-Mechanismus der
  Muskeltonus-Regulation mit Angst als Tonus-Störfaktor (BIOMECHANIK). Der
  Muskulatur- und der Gelenke-Abschnitt desselben Kapitels wurden bewusst
  nicht in eigene Einträge umgesetzt (Doppelarbeit zu bereits vorhandenen
  Hohmann-/Mai-/Hárrer-Inhalten ohne neue Fakten). Danach „Physiotechnik"
  (C.-S. Alexander) vollständig extrahiert (43.692 Zeichen, keine Kappung):
  4 weitere neue THERAPIE-Einträge zur Elektrotherapie — physikalische
  Grundlagen samt Galvanisation und Iontophorese, TENS/Ultrareizstrom nach
  Träbert mit ihrem gemeinsamen Verdeckungsprinzip-Mechanismus,
  Elektrostimulation zur Atrophieprophylaxe inkl. des historisch
  widerlegten Exponentialstroms (Lehrbeispiel: ältere Empfehlung ohne
  aktuellen Sicherheitsnachweis), sowie Hochfrequenztherapie/Diathermie mit
  der besonders sicherheitsrelevanten Metallimplantat-Gefahr (Verbrennung
  statt bloßer Wirkungslosigkeit — praxisrelevant bei TPLO- und anderen
  Implantat-Patienten). Der im selben Kapitel enthaltene Licht-/
  Chromotherapie-Abschnitt wurde bewusst nicht umgesetzt, da er
  überwiegend humanmedizinische, chronobiologische Evidenz mit nur vager
  veterinärmedizinischer Übertragbarkeit referiert. Danach „Indikationen"
  (C.-S. Alexander/A. Jaggy/I. Kathmann) teilweise extrahiert (121.417
  Zeichen, keine Kappung; sehr umfangreiches Kapitel — Schmerzpatient,
  prä-/postoperative Rehabilitation, Arthrosepatient, neurologische
  Rehabilitation nach Diskushernie/Kopftrauma/Wirbelfraktur/
  Spinalnerventrauma/atlantoaxialer Subluxation/degenerativer Myelopathie,
  Geriatriepatient, Gelenkfehlstellung): 3 neue Einträge aus den
  Abschnitten Schmerzpatient und Geriatriepatient —
  `gewebeheilungsphasen-rehabilitation-zeitfenster-technik` (THERAPIE: die
  drei Gewebeheilungsphasen mit konkreten Zeitfenstern und
  phasenspezifischer Technikwahl, ergänzt gezielt den bestehenden Eintrag
  `belastungssteuerung-nach-verletzung` um das WANN/WAS),
  `schmerzpatient-klassifikation-vier-schmerztypen-therapiewahl` (THERAPIE:
  Gelenk-/Weichteil-/Neuritis-/Muskelspannungsschmerz als vier
  unterschiedliche Mechanismen mit direkter Technikwahl-Konsequenz, inkl.
  Traktion als Arthrose-Mittel-der-Wahl und der Schultergelenk-Kälte-
  Ausnahme) und `geriatrischer-hund-alterungsmechanismen-
  rassenabhaengige-lebenserwartung` (PATHOLOGIE: rassenabhängige
  Lebenserwartung/Alterungsgeschwindigkeit, die drei universellen
  Alterungsmechanismen Dehydrierung/Fibrosierung/Involution,
  Multimorbiditäts-Erklärung, physikalische Digitaliswirkung der
  Ganzkörpermassage — erste Geriatrie-Einträge der Wissensbibliothek
  überhaupt). **Noch nicht ausgewertet** (nächster Fortsetzungspunkt für
  eine Folgesession): die umfangreiche neurologische Rehabilitations-
  Sektion (Diskushernie, Kopftrauma, Wirbelfraktur, Spinalnerventrauma,
  atlantoaxiale Subluxation, degenerative Myelopathie — hoher
  Duplikations-Verdacht mit der bereits vollständig ausgewerteten
  VetCenter-Quelle „Wirbelsäulenerkrankungen", da dort dieselben
  Krankheitsbilder bereits diagnostisch abgedeckt sind; zu prüfen ist, ob
  dieses Kapitel spezifisch neue Rehabilitations-/Physiotherapie-Aspekte
  beisteuert, die dort fehlen) sowie der Abschnitt „Gelenkfehlstellung".
  Danach „Krankengymnastik (Physiotherapie) — Ausgewählte Techniken"
  vollständig extrahiert (37.610 Zeichen, keine Kappung): 4 neue
  THERAPIE-Einträge — eine Bewegungstherapie-Grundtaxonomie
  (passiv/aktiv-assistiv/aktiv mit offener/geschlossener kinematischer
  Kette/resistiv/isometrisch), das von der Autorin selbst entwickelte
  Reflexinduzierte Training (RITA) zur Gehbewegungssimulation bei
  schlaffer Parese über Fremdreflexe (direkte praktische Anwendung der
  bereits bestehenden Sherrington-Gesetze-Einträge), die PNF-Technik samt
  einer konkreten Artspezifitätsfalle (dieselbe Vorführbewegung der
  Vorderextremität ist beim Hund eine Extension, beim Menschen eine
  Flexion des Schultergelenks — wegen der entgegengesetzten
  Bizeps-Funktionsdefinition) sowie die fachliche Abgrenzung
  „Dehnen" (nur durch Therapeuten, überschreitet bewusst das
  Bewegungsausmaß) versus „Stretching" (bleibt innerhalb des
  Bewegungsausmaßes, tierhaltertauglich). Danach „Massage" vollständig
  extrahiert (47.063 Zeichen, keine Kappung) — **damit ist Alexander
  (Hrsg.), Physikalische Therapie für Kleintiere, vollständig
  ausgewertet (alle 7 Kapitel-Dateien).** 4 neue THERAPIE-Einträge:
  Massagewirkung auf Durchblutung/Schmerz/Muskeltonus (inkl. der
  Meerschweinchen-Kapillarwerte nach Nöcker 1980 und des gegenläufigen
  Muskeltonus-Effekts je nach Ausgangszustand), die fünf klassischen
  Massagegriffe nach Hoffman (Effleurage/Petrissage/Friktion/Vibration/
  Tapotement, ergänzt die bestehende Tuina-Vergleichstabelle um die
  westlichen Referenztechniken), die Bindegewebsmassage nach Dicke/
  Schliack/Wolff als reflextherapeutisches Verfahren für innere Organe
  sowie die Kolonmassage nach Vogler mit ihren fünf anatomisch
  definierten Kolonpunkten gegen Obstipation (direkt anschlussfähig an
  den bestehenden Geriatrie-Eintrag). Bewusst nicht übernommen: Japanische
  Stäbchenmassage, Bürstenmassage und Narbenmassage nach Thomsen (drei
  weitere im Kapitel beschriebene Sonderformen mit geringerem
  Alleinstellungswert gegenüber den bereits abgedeckten Verfahren —
  als Backlog-Punkt für eine mögliche spätere Ergänzung vermerkt, siehe
  Alexander-Abschnitt unten). Danach die neurologische Rehabilitations-
  Sektion des Indikationen-Kapitels begonnen: die Übersichtstabelle
  „Neurologische Indikationen für Physiotherapie" (Tab. 13.7) als neuer
  Eintrag `neurologische-rehabilitation-uebersicht-nach-laehmungsmuster`
  umgesetzt (Rehabilitationsmaßnahmen nach Lähmungsmuster
  Tetra-/Para-/Monoparese, inkl. der Ausnahme „strikte Boxenruhe statt
  Bewegungstherapie" bei instabiler Wirbelsäule). Beim anschließenden
  Abschnitt „Rückenmarksinfarkt" zeigte sich ein **Quellenkonflikt**: Diese
  ältere Quelle (2003) nennt eine Altersprädisposition für alte Hunde und
  empfiehlt Kortikosteroide (Methylprednisolon/Dexamethason) gegen
  sekundäre Ödembildung — beides widerspricht dem bereits verifizierten,
  neueren und spezialisierteren Eintrag `rueckenmarksinfarkt-
  fibrokartilaginoese-embolie` (Koch/Fischer 2019: jungadulte Hunde,
  Kortikosteroide explizit wirkungslos). Beide widersprüchlichen Angaben
  wurden bewusst NICHT übernommen; stattdessen wurde der bestehende
  Eintrag nur um zwei unstrittige, neue Fakten aus Alexander ergänzt: den
  Grau-Substanz-Mechanismus der Tiefensensibilitäts-Erhaltung trotz
  schwerer Motorik-Ausfälle (zusätzliches Differenzierungskriterium zur
  Kompression) sowie ein konkretes physiotherapeutisches
  Rehabilitationsprotokoll (Frequenz/Dauer von Massage, Schwimmtraining,
  Elektrostimulation, Stützgestell; ø 2 Wochen Rehabilitationsdauer). Der
  Quellenkonflikt selbst ist ausführlich im `sourceStatus` dieses Eintrags
  dokumentiert. **Wichtige Lehre für die weitere Bearbeitung dieses
  Kapitels:** Die übrigen, noch nicht ausgewerteten Einzelkrankheiten
  (Kippfenstersyndrom, Polyradikuloneuritis, Diskushernie, Kopftrauma,
  Wirbelfraktur, Spinalnerventrauma, atlantoaxiale Subluxation,
  degenerative Myelopathie) müssen vor Umsetzung ebenso sorgfältig gegen
  bereits bestehende Einträge (v. a. aus VetCenter „Wirbelsäulenerkrankungen"
  und Koch/Fischer) auf Widersprüche geprüft werden, nicht nur auf reine
  Doppelung — ältere Therapieempfehlungen dieser Quelle sind mit Vorsicht
  zu behandeln. Kippfenstersyndrom danach bewusst übersprungen (katzen-
  spezifisch, konsistent mit der bereits an anderer Stelle getroffenen
  Ausschluss-Entscheidung für dieses Krankheitsbild). Die anschließende
  Akute idiopathische Polyradikuloneuritis dagegen als neuer Eintrag
  `akute-idiopathische-polyradikuloneuritis-aufsteigende-laehmung`
  (PATHOLOGIE) umgesetzt — im Original ausdrücklich als „häufigste
  Polyneuropathie beim Hund" bezeichnet, also entgegen der früheren
  Einschätzung in einer anderen Quelle nicht seltenheitsspezifisch, und
  bisher nirgends inhaltlich beschrieben (nur Namensnennung als
  Differentialdiagnose). Das aufsteigende Lähmungsmuster mit der
  Reflex-Schmerz-Dissoziation sowie das physiotherapeutische
  Rehabilitationsprotokoll wurden übernommen; die im Original genannte
  Kortikosteroidgabe in den ersten 10 Tagen dagegen bewusst nicht — dieselbe
  Vorsicht wie beim Rückenmarksinfarkt-Quellenkonflikt. Anschließend
  Diskushernie/-prolaps gelesen und bewusst NICHT umgesetzt: hoher
  Duplikationsgrad mit den bereits ausführlich bestehenden Einträgen zum
  thorakolumbalen/zervikalen Bandscheibenvorfall und zur Hansen-I/II-
  Klassifikation (VetCenter) bestätigt — keine wesentlich neuen Fakten.
  **Die restlichen Abschnitte des Kapitels wurden danach vollständig
  ausgewertet (29.09.2026), mit dem Ergebnis: Kopftrauma war komplett
  unbehandeltes Terrain** (die VetCenter-Quelle deckt nur Wirbelsäule/
  Rückenmark ab, nicht das Gehirn) — neuer Eintrag
  `kopftrauma-coup-contrecoup-verzoegerte-symptome` (PATHOLOGIE): Coup-
  Contrecoup-Mechanismus, subtentorielle Hernie mit Spezies-Vergleich zur
  Humanmedizin, Pupillen als ICP-Indikator, physiotherapeutisches
  Vorsichtsprinzip gegen Nachblutungen. Wirbelfraktur/-luxation/
  -subluxation als neuer Eintrag `wirbelfraktur-luxation-uebergangszonen-
  verletzungsklassifikation` (PATHOLOGIE) ergänzt die bereits
  ausführlichen VetCenter-Diagnostik-/Prognose-Einträge gezielt um die
  vier anatomisch prädisponierten Übergangszonen und die Commotio-/
  Contusio-/Laceratio-medullae-spinalis-Klassifikation — bewusst nicht
  dupliziert. Spinalnerventrauma lieferte gleich zwei neue Einträge
  (`periphere-nervenlaehmungen-radialis-supraskapularis-ischiadikus` und
  `physiotherapie-periphere-nervenlaehmung-protokoll-entscheidungspunkte`)
  sowie eine Ergänzung des bestehenden Horner-Syndrom-Eintrags um die
  Avulsions-/Amputations-Prognostik. Atlantoaxiale Subluxation und
  degenerative Myelopathie waren beide bereits als eigene Einträge
  vorhanden (VetCenter bzw. Koch/Fischer) und wurden entsprechend nur um
  die jeweiligen, dort fehlenden Rehabilitationsprotokolle ergänzt statt
  neu angelegt — bei der DM ausdrücklich mit dem Hinweis, dass die ältere
  Quelle die Ursache noch als ungeklärt beschreibt (vor der SOD1-
  Entdeckung 2009), was keinen Widerspruch, sondern nur einen älteren
  Wissensstand darstellt. Zuletzt der Abschnitt „Gelenkfehlstellung"
  (Tab. 13.12) als neuer Eintrag
  `gelenkfehlstellung-kaskade-zweigelenkige-muskeln-hueft-knie`
  (BIOMECHANIK) umgesetzt: die Übertragung einer Hüftfehlstellung aufs
  Kniegelenk über zweigelenkige Muskeln, mit dem aus der Humanmedizin
  bekannten Parallel-Phänomen. **Damit ist das komplette Indikationen-
  Kapitel (Kap. 13) vollständig ausgewertet — nur Kippfenstersyndrom
  (katzenspezifisch) und Diskushernie/-prolaps (zu stark duplizierend)
  wurden bewusst nicht in eigene Einträge umgesetzt.**
- **Neue Quelle (29.09.2026): Kasper, Markus/Zohmann, Andreas (Hrsg., unter
  Mitarbeit von Peter Knafl und Sabine Tacke), Ganzheitliche Schmerztherapie
  für Hund und Katze, Sonntag Verlag/Georg Thieme Verlag KG, 2., aktualisierte
  Auflage 2011, ISBN 978-3-8304-9288-7.** Direkt aus Vanessas Google-Drive-
  Bibliothek erschlossen (Ordner-ID `1ujBnaEPGqeLZquilC5vXpGSTS0n4Gy_J`, 42
  PDF-Chunks g.pdf–g(41).pdf); die Bulk-Extraktion von Kap. 2–3 (S. 7–48)
  wurde an einen Subagenten delegiert, um das Hauptkontextfenster zu schonen
  — Ergebnis war eine saubere, mit Seitenzahlen markierte Verbatim-Abschrift,
  die selbst auf Extraktionsunsicherheiten hinwies (siehe unten). Daraus 5
  neue Einträge: (1) `schmerzgrade-lahmheitsgrade-kasper-zohmann-dreistufig`
  (UNTERSUCHUNG) — eine dritte, dreistufig-deskriptive Schmerz-/
  Lahmheitsgrad-Einteilung neben den bestehenden vierstufigen Skalen nach
  Brunnberg und Mai, mit expliziter Abgrenzung aller drei Systeme
  voneinander; (2) `segmentalreflektorischer-komplex-dermatom-myotom-
  sklerotom-viszerotom` (PATHOLOGIE) — das bisher in Denkgang fehlende
  Metamerie-Konzept (Dermatom/Myotom/Sklerotom/Viszerotom über Angio-/
  Neurotom verschaltet), Head'sche Zonen, Kibler'sche Hautfalte, Junghanns'
  Bewegungssegment und die anatomische Grundlage des dolor translatus; (3)
  `gate-control-theorie-deszendierende-schmerzhemmung` (PATHOLOGIE) — die
  Gate-Control-Theorie (Melzack u. Wall 1965) und die deszendierende
  Schmerzhemmung als komplementäre Gegenseite zum bestehenden
  Sensibilisierungs-Eintrag aus Kulpa/Alexander; (4)
  `schmerzreise-hd-knie-sig-lsue-kaskade` und (5)
  `schmerzreise-vorderextremitaet-tlue-kompensation-kaskade` (beide
  BIOMECHANIK) — die im Buch als „Schmerzreise" bezeichnete, sehr detaillierte
  Kaskade von einer Hüftdysplasie über Kniegelenk, Iliosakralgelenk und
  Lendenwirbelsäule bis zu den Vordergliedmaßen (inkl. der rassespezifischen
  Gewichtsverteilungstabelle Tab. 3.2), bewusst als vertiefende Fortsetzung
  des bestehenden, einfacheren Alexander-Eintrags
  `gelenkfehlstellung-kaskade-zweigelenkige-muskeln-hueft-knie` angelegt statt
  diesen zu duplizieren. Die vom Subagenten selbst geflaggten
  Extraktionsunsicherheiten (dichte Zweispaltigkeit auf S. 32–44 mit
  Restunsicherheit in der lokalen Absatzreihenfolge; ein möglicherweise
  doppelt extrahierter Absatz am Übergang 3.12.3/3.12.4) wurden in den
  sourceStatus-Feldern der betroffenen Einträge offen dokumentiert statt
  stillschweigend geglättet. Danach 3 weitere neue Einträge aus Kap. 3.6–3.11
  (Schmerzspirale, Psychosomatik/Somatopsychik, Fehlregulation, Schmerz als
  Leitsymptom bzw. Heilungshindernis, S. 25–31):
  `schmerzspirale-circulus-vitiosus-pseudoradikulaeres-geschehen`
  (PATHOLOGIE) — der zeitliche Circulus-vitiosus-Ablauf vom Initialreiz über
  segmentale Muskelkontraktion bis zum pseudoradikulären Geschehen, bewusst
  als dynamische Ergänzung zum eher statischen
  `segmentalreflektorischer-komplex`-Eintrag angelegt;
  `schmerz-psychologische-dimensionen-fehlregulation` (PATHOLOGIE) — die
  drei Dimensionen des Schmerzerlebens nach Melzack/Wall (1965)
  (sensorisch-diskriminativ/affektiv-motivational/kognitiv-evaluativ) sowie
  Fehlregulation als eigenständige, nicht-strukturelle Schmerzursache
  (bewusst ohne das im Original enthaltene, nicht weiter belegte
  Kultur-Stereotyp-Beispiel übernommen); und
  `wesensveraenderung-stress-schmerz-wechselwirkung-locus-minoris-resistentiae`
  (UNTERSUCHUNG) — Stress/Angst als schmerzverstärkender Faktor, das
  Ablegeverhalten als beobachtbares Zeichen einer thorakolumbalen
  Spondylarthrose, eine feste Anamnese-Fragenliste bei Wesensveränderung
  sowie das Konzept des „locus minoris resistentiae" (bidirektionales
  Herz-Orthopädie-Beispiel). Abschnitt 3.7.2 (inhaltlich redundant) und
  3.8 „Besitzerbezogene Schmerzen" (energetische Bilanz, Homöopathie-
  Miteinreibung, Meridian-Spekulation zur Linksseiten-Prävalenz) wurden
  bewusst nicht in Einträge umgesetzt — zu spekulativ/nicht evidenzbasiert
  für den fachlichen Anspruch dieser Wissensbibliothek (siehe
  Backlog-Eintrag zu dieser Quelle für die Begründung im Detail). Danach
  2 weitere neue Einträge aus Kap. 3.12.3–3.12.5 (Keine klinisch inapparente
  HD, Schmerzvermeidungsstrategie bei angeborenen Gelenkerkrankungen,
  Schmerz-/Missempfindungsstrategie im Alter, S. 45–48):
  `hd-engrammbildung-schmerzvermeidungsstrategie-junghund` (PATHOLOGIE) —
  warum angeborene Gelenkerkrankungen bei Junghunden durch eine fehlerhafte
  Engrammbildung jahrelang unsichtbar bleiben können, mit konkreter
  Screening-Konsequenz (Kibler'sche Hautfalte im Rahmen der
  Grundimmunisierung, Köppel'sches Frühdiagnose-Fenster 16.–20. Lebenswoche);
  und `geriatrischer-schmerzpatient-funktions-struktur-aktualitaetsanalyse`
  (UNTERSUCHUNG) — der bisher in Denkgang fehlende dreistufige
  Untersuchungsgang nach Tilscher und Eder (1989, Funktionsanalyse/
  Strukturanalyse/Aktualitätsanalyse) für den multimorbiden geriatrischen
  Patienten, ergänzt um die 80/20-Priorisierungsregel und die Warnung vor
  Übertherapie. Ein im Rohtext zweifach extrahierter Absatz
  (Übermotivation/soziale Isolation am Kapitelübergang 3.12.3/3.12.4) wurde
  nur einmal übernommen. **Damit sind Kap. 2 (Schmerz – was ist das?) und
  Kap. 3 (Schmerzsymptome) dieser Quelle vollständig ausgewertet.** Danach
  Kap. 4 „Untersuchungsgang" (S. 49–124) per delegiertem Subagenten
  extrahiert (Scratchpad-Datei `kap4-untersuchungsgang-verbatim.txt`, nicht
  Teil des Repos) und vollständig gelesen — ein sehr umfangreiches Kapitel
  (1567 Zeilen Rohtext) mit 20 vom Subagenten selbst geflaggten
  Extraktionsunsicherheiten (durchgehend dichte Zweispaltigkeit auf vielen
  Seiten), die in den sourceStatus-Feldern der betroffenen Einträge
  dokumentiert werden. Erste Charge von 5 neuen Einträgen aus Kap. 4.5
  (Manuelle Untersuchungen — Palpationen, S. 76–104):
  `kiblersche-hautfaltenpalpation-technik-vier-kriterien` (UNTERSUCHUNG) —
  die konkrete Technik hinter dem in mehreren bestehenden Einträgen nur
  namentlich erwähnten Begriff, inkl. physiologischer Verquellungszonen und
  kaudaler Dermatomverschiebung;
  `druckpunktpalpation-kothbauer-technik-organzuordnung` (UNTERSUCHUNG) —
  Tab. 4.5 (Organ-Druckpunkt-Zuordnung), Technik und die wichtige
  Einschränkung, dass ein positiver Punkt kein Organbeweis, sondern nur ein
  Frühwarnsystem ist; zwei neue, eigenständige Einträge zum
  Triggerpunkt-Untersuchungssystem nach Kasper/Zohmann — Hintergliedmaßen
  (`triggerpunktuntersuchung-kasper-zohmann-hintergliedmasse`: LG03, MA31,
  MA32, Knieumfassungsschmerz BL40) und Vordergliedmaßen
  (`triggerpunktuntersuchung-kasper-zohmann-vordergliedmasse`: medialer/
  lateraler Ellenbogentrigger, Schulter als „Weichgelenk", proximaler
  Bizeps-, Trizeps- und Supraspinatustrigger); sowie
  `muskelfunktionsketten-kasper-zohmann-diagnostisches-werkzeug`
  (BIOMECHANIK) — die benannten kranialen/kaudalen Muskelketten der
  Vordergliedmaße (Tab. 4.7) als diagnostisches Werkzeug, ausdrücklich
  abgegrenzt vom bestehenden, konzeptionell anderen Eintrag
  `offene-geschlossene-muskelkette` (Hohmann, offene/geschlossene
  kinematische Kette). Danach 2 weitere neue Einträge aus Kap. 4.5.7.2 und
  4.8.4: `sakroiliakalgelenk-anatomie-blockierung-zohmann-probe`
  (UNTERSUCHUNG) — SIG-Bandanatomie, der fehlende bzw. schwächer
  ausgebildete Lig.-sacrotuberale-latum-Ersatz beim Hund (bei der Katze
  ganz fehlend, Erklärung für häufigere Beckenfrakturen), der
  Blockierungsmechanismus und die SIG-Probe nach Zohmann (adaptierter
  Federtest); sowie `hd-fruehdiagnostik-koeppel-os-coxae-quartum`
  (UNTERSUCHUNG) — die radiologische Köppel-Methode am Os coxae quartum
  (14.–20. Lebenswoche, ca. 90 % Treffsicherheit, Unterscheidung primär
  ossäre vs. ligamentäre HD-Form), die gezielt den bestehenden
  Koch/Fischer-Eintrag zu Genetik/Coxarthrose um ein zeitlich deutlich
  vorgelagertes, eigenständiges Frühdiagnoseverfahren ergänzt. Danach 2
  weitere neue Einträge (beide PATHOLOGIE): Aus Kap. 4.6
  `katzenspezifische-schmerzdiagnostik-verdeckte-symptomatik` — warum
  Katzenschmerz so viel seltener bemerkt wird als Hundeschmerz, der stark
  abweichende Untersuchungsablauf, der TLÜ als katzentypischer Locus
  minoris resistentiae sowie die Obstipations-Fehldiagnosefalle bei
  LSÜ-Schmerz; schließt eine echte Artspezifika-Lücke in der bisher stark
  hundelastigen Wissensbibliothek. Aus Kap. 4.5.6
  `zehenarthrosen-sesambeinfrakturen-uebersehene-schmerzquellen` — die
  rassetypische Sesambeinfraktur beim Rottweiler (verknüpft mit der bereits
  vorhandenen Gewichtsverteilungstabelle) sowie häufig übersehene
  Zehenarthrosen beim älteren Tier, samt der vollständigen
  Untersuchungstechnik der distalen Extremität. Danach 4 weitere, letzte
  neue Einträge aus Kap. 4: `geschlechtsspezifische-segmentpraedispositionen-
  signalement` (PATHOLOGIE, Kap. 4.1.2) — geschlechtsspezifische
  Segmentdispositionen inkl. der ca. 40-%-Korrelation zwischen
  Kastrationsnarbe und Spondylose bei Hündinnen;
  `alter-gewicht-schmerzregulation-signalement` (PATHOLOGIE, Kap. 4.1.3–
  4.1.4) — das „mittelalte Paradox" (größte Schmerzpatienten-Population
  trotz, nicht wegen, noch guter Beweglichkeit) sowie Gewichtsverteilung/
  Adipositas als Risikofaktoren; `schritt-trab-knorpelernaehrung-
  synoviapumpe-biomechanik` (BIOMECHANIK, Kap. 4.3.2.2) — warum der Trab
  bei Überlastung die biomechanisch ungesündere Gangart ist (Synoviapumpen-
  Mechanismus), bewusst von der bestehenden Schmerzreise-Kaskade
  abgegrenzt; und `dynamische-diagnose-anfangserfolgskurve-
  therapieerwartung` (UNTERSUCHUNG, Kap. 4.9) — die 50-%-pro-Sitzung-
  Abflachungskurve als Werkzeug zur Besitzer-Erwartungssteuerung. **Damit
  ist Kap. 4 „Untersuchungsgang" dieser Quelle inhaltlich vollständig
  ausgewertet** (23 neue Einträge aus Kap. 2–4 in dieser Session), mit
  Ausnahme bewusst zurückgestellter kleinerer Restthemen (siehe
  Backlog-Eintrag zu dieser Quelle für die vollständige Liste). Eines
  dieser zurückgestellten Restthemen — 4.1.1 „Rasse und Verwendungszweck"
  — wurde am 04.10.2026 nachgeholt: ein neuer Eintrag
  `rasse-verwendungszweck-praedisposition-ueberforderung` (PATHOLOGIE,
  350 Wissenseinträge gesamt) zum Über-/Unterforderungskonzept, zur
  Kritik an unkritischen Rassetabellen (HD-Vorröntgen-Verzerrung) sowie
  zum Schonungsparadox in der Wachstumsphase (trainierte Dackel neigen
  eher zu Bandscheibenproblemen als unterforderte, adipöse) inklusive der
  Kappenhüfte-Kritik — **damit ist jetzt auch Kap. 4.1 „Nationale
  (Signalement)" dieser Quelle vollständig ausgewertet** (4.1.1–4.1.4
  komplett). Verifiziert via Playwright (1/1 Seite, 0 Fehler). Danach ein
  letzter neuer Eintrag aus Kap. 4.5.7.1 (351 Wissenseinträge gesamt):
  `vorderextremitaet-funktionspruefung-bizepsursprungssehnen-
  ueberdehnungstest` (UNTERSUCHUNG) — der Streckungstest mit
  Halsfixierung (Fehlerquelle: ohne Fixierung falsch-negativ), die
  Schulter-/Ellenbogen-Differenzierung durch proximales Umgreifen, und
  vor allem der scharfe Bizepsursprungssehnen-Überdehnungstest (Ellenbogen
  bei maximal nach hinten angehobener Extremität dürfte nicht mehr
  streckbar sein — ist er es doch, spricht das für eine irreversible
  Sehnenüberdehnung), plus die Beugungstest-Einschränkungen bei Schulter-
  und Sprunggelenk. Explizit mit dem bestehenden Eintrag
  `muskelfunktionsketten-kasper-zohmann-diagnostisches-werkzeug`
  verknüpft (dieselbe Trapezius-Infraspinatus-Trizeps-Kette, dort als
  Anatomiekonzept, hier als konkrete Funktionsprüfung). **Damit ist Kap.
  4.5.7 „Funktionsprüfungen" dieser Quelle vollständig ausgewertet**
  (4.5.7.1 und 4.5.7.2 komplett). Verifiziert via Playwright (1/1 Seite,
  0 Fehler). Danach ein weiterer neuer Eintrag aus Kap. 4.2 (352
  Wissenseinträge gesamt): `anamnese-fragetechnik-verlaufskontrolle-
  interpretationslogik` (UNTERSUCHUNG) — das „Sonstiges?"-Prinzip (Besitzer
  brauchen Zeit, sich auf die Fragetiefe einzustellen, wichtige Fakten
  fallen oft erst am Gesprächsende wieder ein), eine Tabelle konkreter
  Frage-Schlussfolgerungs-Paare (z. B. Jahreszeiten-Symptomverstärkung →
  Arthrose vs. Herz-/Kreislaufbelastung, vermehrter Trab →
  Schwungunterstützungsbedarf), sowie die Verlaufsanamnese-Mahnung, bei
  pauschalen Besitzeraussagen („geht besser/schlechter") detailliert
  nachzufragen statt sie unhinterfragt zu übernehmen — inkl. des Beispiels,
  dass ein unverändertes Gangbild einen vom Besitzer wahrgenommenen
  Therapieerfolg nicht ausschließt. Bewusst gegen den bestehenden,
  strukturell orientierten Eintrag `anamnese-struktur-vier-kategorien-
  adspektion-ruhepositionen` (andere Quelle: Könneker/Reiter) abgegrenzt —
  unterschiedliche Ebenen (Kategorien-Checkliste vs. konkrete
  Fragetechnik), bewusst nicht dupliziert. Verifiziert via Playwright
  (1/1 Seite, 0 Fehler). Danach ein weiterer neuer Eintrag aus der
  Einleitung von Kap. 4.3 (353 Wissenseinträge gesamt):
  `lahmheit-bewegungsstoerung-begriffsklaerung-gangbildanalyse`
  (UNTERSUCHUNG) — die Kritik an der rein quantitativen klassischen
  Lahmheit-/Bewegungsstörung-Definition („wie viele Beine") zugunsten
  einer qualitativen Unterscheidung (Gewichtsumverteilung vs. veränderter
  Bewegungsablauf bei unauffälliger Gewichtsverteilung), die vier von der
  Gangbildanalyse gesuchten Veränderungskategorien, ihr rein befundender
  (nicht diagnostischer) Charakter sowie die Begründung, warum sie im
  Untersuchungsgang bewusst vor der Palpation steht. Bewusst NICHT
  übernommen: die Detailabschnitte zum LSÜ-Twist-/Kopfnicken-Mechanismus
  und die als spaltenverschränkt geflaggten Gangbildbefund-Tabellen (Tab.
  4.2–4.4) — bleiben für eine künftige, sorgfältige Einzelprüfung offen.
  Bewusst gegen den bestehenden Eintrag `schmerzreise-hd-knie-sig-lsue-
  kaskade` (dieselbe Quelle) abgegrenzt — unterschiedliche Ebenen
  (biomechanischer Mechanismus vs. begriffliche/methodische Grundlage).
  Verifiziert via Playwright (1/1 Seite, 0 Fehler). Kap. 5–8
  wurden danach stichprobenartig gesichtet (mehrere Chunks aus Kap. 5
  „Methoden der Schmerztherapie" sowie der Anfang von Kap. 7 „Schmerztherapie
  bei bestimmten Indikationen"/Kap. 8) und bewusst NICHT vollständig
  extrahiert: Kap. 5.2 besteht praktisch vollständig aus
  Medikamentendosierungstabellen (außerhalb des Extraktionsziels), die
  übrigen Abschnitte (Neuraltherapie, Akupunktur, Radiosynoviorthese,
  Homöopathie) sowie Kap. 7 (tabellarischer Indikationskatalog nach
  Neuraltherapie-/Akupunktur-/Homöopathie-Mittelauswahl) sind überwiegend
  alternativmedizinische Modalitätenbeschreibungen ohne direkten
  Physiotherapie- oder klinisch-diagnostischen Bezug, Kap. 8 ist reines
  Praxisorganisations-Kapitel. **Begründete Entscheidung, nicht
  Zeitmangel:** Diese Kapitel passen nicht zum evidenzbasierten
  Physiotherapie-Trainings-Auftrag von Denkgang und werden bewusst
  zurückgestellt (Details und die eine denkbare Ausnahme — die mehrfach
  referenzierten Goldimplantations-Kriterien — im Backlog-Eintrag zu dieser
  Quelle). **Kasper/Zohmann gilt damit für diese Session als
  abgeschlossen: 23 neue Einträge aus Kap. 2–4.**
- **Neue Quelle (01.10.2026): Kraft, Wilfried (Hrsg.), Geriatrie bei Hund
  und Katze, 2. Auflage, Parey Verlag, Stuttgart, 2003.** Aus Vanessas
  Google-Drive-Bibliothek erschlossen (Ordner-ID
  `1dsKHQd_GQUEfcu0VhHW1MzaxnD46XwKq`); anders als die PDF-Chunk-Bücher
  liegt diese Quelle als einzelne, nach Organsystem/Thema benannte
  VetCenter-Kapitel-PDFs vor (Einführung, Allgemeines, je ein PDF pro
  Organsystem — Nervensystem, Zirkulationsapparat, Harnsystem usw. —, plus
  Querschnittsthemen wie Ernährung, Anästhesie, Labordiagnostik im Alter).
  Direkt gelesen: „Massage als Metaphylaxe beim geriatrischen Patienten“
  (Cécile-Simone Alexander, Vortrag 2001) — daraus 1 neuer Eintrag
  `physiotherapie-geriatrischer-patient-altersveraenderungen-fahrplan`
  (THERAPIE): die zwei Grundmechanismen des Alterns (Dehydrierung,
  Fibrosierung) und ein vollständiger System-für-System-Fahrplan von
  Alterungsveränderung zu konkreter physiotherapeutischer Intervention
  (inkl. der „physikalischen Digitaliswirkung“ der Ganzkörpermassage auf
  den Herzmuskel), bewusst ergänzend zum bestehenden Eintrag zu den fünf
  klassischen Massagegriffen (derselben Autorin, aus ihrem anderen Buch)
  angelegt, nicht dupliziert. Die übrigen, organsystemisch benannten
  Kapitel dieser Quelle sind überwiegend internistisch (Endokrinologie,
  Gynäkologie, Harnsystem usw.) und noch nicht gesichtet — siehe
  Backlog-Eintrag zu dieser Quelle für die Einschätzung, welche davon für
  Denkgangs physiotherapeutischen Fokus voraussichtlich ergiebig sind.
- **Neue Quelle (01.10.2026): Könneker, Henrike/Reiter, Ute, Osteopathie in
  der Kleintierpraxis, Sonntag Verlag/Georg Thieme Verlag KG, Stuttgart,
  2010 (ISBN 978-3-8304-9174-3).** Aus Vanessas Google-Drive-Bibliothek
  erschlossen (Ordner-ID `1Q0EHXX11GL_0yoalAOVocsNFpMO2NMhD`), liegt als
  PDF-Chunk-Serie vor (Präfix `o`, mindestens `o.pdf` bis `o(34).pdf`).
  Vollständig gelesen und ausgewertet: Kap. 3 „Diagnostisches Basiswissen"
  (S. 12–25, Chunks o(3)–o(7).pdf) — daraus 4 neue Einträge:
  `somatische-dysfunktion-art-kriterienraster` (UNTERSUCHUNG: Definition der
  somatischen Dysfunktion, das A.R.T.-/T.A.R.T.-Kriterienraster, sowie eine
  explizit eingeordnete, nicht als gesichert dargestellte Kurzeinführung in
  den osteopathischen Motilitätsbegriff), `primaerlaesion-sekundaerlaesion-
  kompensation-koenneker` (GRUNDLAGEN: Primär-/Sekundärläsion, Key Lesion,
  Kompensation vs. Dysfunktion — als allgemeine diagnostische Denkregel an
  die bestehenden, konkreteren Kompensations-Einträge `wirbelsaeule-krummer-
  ruecken-lahmheitshinweis` und `schmerzreise-vorderextremitaet-tlue-
  kompensation-kaskade` angebunden), `barrierekonzept-direkte-indirekte-
  ease-einstellung` (UNTERSUCHUNG: restriktive Barriere, direkte/indirekte/
  Ease-Einstellung — bewusst von der bestehenden Endgefühl-Dokumentation aus
  Hárrer abgegrenzt statt dupliziert) sowie `zehner-test-hund-globale-
  spannungsuntersuchung` (UNTERSUCHUNG: der für den Hund modifizierte,
  elfschrittige orientierende Ganzkörper-Spannungstest samt den beiden
  Durchführungsregeln minimale Impulse/Spannungs- statt Schmerzsuche). Danach
  Kap. 4 „Der rote Faden der osteopathischen Behandlung" (S. 26–32, Chunks
  o(11), o(13)–o(14).pdf; o(8)–o(10) und o(12) sind Drive-interne Duplikate
  ohne neuen Inhalt) **vollständig gelesen bis S. 32 — daraus 2 weitere neue
  Einträge:** `vom-globalen-zum-spezifischen-behandlungsreihenfolge`
  (THERAPIE: Sanduhrprinzip der Befunderhebung, Behandlung von der
  allgemeinsten zur spezifischsten Ebene, am wenigsten berührungsintensive
  Technik zuerst, Kontrolluntersuchung über den Behandlungsort hinaus —
  bewusst ohne den kraniosakralen Rhythmusdifferenzierungs-Schritt aus
  Kap. 4.6.1–4.6.3 derselben Quelle, der auf einem nicht unabhängig
  bestätigten Konzept beruht) sowie `verkettungsmuster-eskalationsstufen-
  unbehandelter-befund` (PATHOLOGIE: fünf Eskalationsstufen von der lokalen
  Spannungsadaptation bis zur Dekompensation, mit der klinischen Konsequenz
  für Prognose und Erwartungsmanagement) sowie
  `therapieverlauf-warnsignale-strukturerkrankung-probebehandlung`
  (UNTERSUCHUNG: die Drei-Sitzungs-Regel — bleibt die erwartete Besserung
  spätestens nach der dritten Behandlung aus, ist die Diagnose zu
  überprüfen statt die Technik zu wechseln —, die Ablehnung von Einzel-
  „Probebehandlungen" und Dokumentation als Voraussetzung für
  Verlaufskontrolle). **Damit ist Kap. 4 „Der rote Faden der
  osteopathischen Behandlung" (S. 26–33) vollständig ausgewertet** (mit
  Ausnahme des kraniosakralen Rhythmusdifferenzierungs-Schritts, bewusst
  ausgelassen). Danach Kap. 5.1–5.2 „Myofasziales Release (MFR)" (S. 36–43,
  Chunk o(19).pdf) gesichtet — daraus 1 weiterer neuer Eintrag:
  `faszie-sinnesorgan-mechanorezeptoren-perforanten-trias` (BIOMECHANIK:
  interstitielle Rezeptoren/Ruffini-Endigungen, die Perforanten-Trias und
  Faszie als propriozeptives Sinnesorgan — mit transparenter Kennzeichnung
  der beiden im Original nicht eigenständig nachvollzogenen
  Literaturverweise, u. a. zur behaupteten räumlichen Nähe zu
  Akupunkturpunkten). Bewusst nicht übernommen: die im selben Abschnitt
  beschriebene MFR-Technik selbst (Unwinding, Point of Balance,
  funktioneller Stillpunkt) — sie setzt wie die kraniosakrale
  Rhythmusprüfung eine unabhängig nicht bestätigte Eigenwahrnehmung einer
  gewebeeigenen Entwindungsbewegung voraus und wurde daher nicht als
  Technik-Anleitung aufgenommen (Details und die weitere Einschätzung von
  Kap. 5–6 im Backlog-Eintrag zu dieser Quelle). Danach Kap. 6.1
  „Faszienzüge und Diaphragmen aus osteopathischer Sicht" (S. 46–48, Chunk
  o(20).pdf) — daraus 1 weiterer neuer Eintrag:
  `diaphragmen-transversale-spannungszonen-koerper` (BIOMECHANIK: die fünf
  anatomisch definierten Diaphragmen des Körpers — Zwerchfell, kraniale
  Thoraxapertur, kraniozervikal, intrakraniell, Beckenboden — als
  gemeinsame Durchtrittsstellen für Gefäße/Nerven/Organe mit
  vergleichbarem Störungsmuster bei Kompression; explizit an die
  bestehenden, aus Hárrer stammenden Einzelbeispiele
  `hypaxiale-muskulatur-iliopsoas-diaphragma-thoracic-outlet` angebunden).
  Bewusst nicht übernommen: die im selben Abschnitt behauptete Existenz
  exakt beschriebener Faszienketten-Verläufe (osteopathische Modellbildung,
  Studienverweis nicht eigenständig geprüft). Kap. 6.2–6.4 (MFR-in-Ketten-
  Technik, S. 49–69, Chunks o(22)–o(23).pdf) nur überflogen, dabei wie
  erwartet bestätigt: Die Technik beruht wieder auf der Wahrnehmung eines
  Unwinding (bewusst nicht übernommen, siehe Backlog). **Danach Kap. 7.1
  „Grundlagen der osteoartikulären Osteopathie" (S. 70–79, Chunks o(23)–
  o(24).pdf) gelesen — die bislang ergiebigste Einzelsitzung dieser Quelle,
  3 weitere neue Einträge:** `ausweichbewegungen-verfaelschte-
  gelenkuntersuchung` (UNTERSUCHUNG: wie eine kombinierte Ausweich-Rotation
  ein Kapselmuster bei der Hüftextension verdeckt, und wie man das
  verhindert), `kennmuskeln-reflektorische-spannungszeichen-gelenkregion`
  (UNTERSUCHUNG: Tab. 7.3, sechs Kennmuskeln als Hinweisgeber auf
  Problemregionen, mit der im Original selbst gemachten Einschränkung,
  dass dies noch keine verifizierte Tier-Dogmatik ist) sowie
  `joint-play-technik-traktionsstufen-wirbelsaeulen-limitation`
  (UNTERSUCHUNG: die drei Traktionsstufen Lösen/Straffen/Dehnen, der
  siebenschrittige Joint-Play-Ablauf und die methodische Grenze, an der
  Wirbelsäule außer an den Kopfgelenken nie zwischen rechtem und linkem
  Facettengelenk unterscheiden zu können — ergänzt den theoretischeren
  Hohmann-Eintrag `rollen-gleiten-rollgleiten-ruhestellung-gelenkspiel` um
  die praktische Durchführungsebene). Diese drei Einträge bestätigen die
  ursprüngliche Einschätzung, dass Kap. 7 die ergiebigste Einzelquelle
  dieses Buches für Denkgang ist, da sie kaum osteopathie-spezifische
  Theoriekonzepte benötigen. Danach Kap. 7.2.3 „Untersuchungsgang" (S. 81–
  83, Chunk o(24).pdf) — daraus 1 weiterer neuer Eintrag:
  `anamnese-struktur-vier-kategorien-adspektion-ruhepositionen`
  (UNTERSUCHUNG: die vier Anamnese-Kategorien allgemein/speziell/
  systemisch/Familienanamnese mit ihren Einzelfragen sowie die Adspektion
  in den drei Ruhepositionen plus Gangartenprüfung — eine bislang in
  dieser Bibliothek fehlende allgemeine Anamnese-/Adspektions-
  Systematik, kein Duplikat eines fallspezifischen Anamnese-Eintrags).
  **Damit ist Kap. 7.1–7.2 vollständig ausgewertet** (mit Ausnahme von
  7.1.2, siehe Backlog). Danach 7.3.1 „Hintergliedmaßen" und der Anfang
  von 7.3.2 „Vordergliedmaßen" (S. 87–104, Chunk o(25).pdf: Hüfte, Knie,
  Tibiofibulargelenk, Tarsalgelenk, Schulter, Ellenbogen) gezielt gegen
  Hárrer/Koch-Fischer geprüft — **Ergebnis: durchgängige inhaltliche
  Überschneidung, bewusst keine neuen Einträge.** Details der
  Einzelprüfung (welche konkreten Hárrer-Einträge welche Könneker/Reiter-
  Inhalte bereits abdecken) im Backlog-Eintrag zu dieser Quelle. Karpus
  (S. 104–107, Chunk o(25).pdf) ebenfalls überprüft und als bereits
  abgedeckt bestätigt (Endgefühle am Karpalgelenk sind bereits im
  bestehenden Hárrer-Eintrag dokumentiert) — bewusst kein neuer Eintrag.
  Danach der Einleitungsabschnitt zu Kap. 7.4 „Die Wirbelsäule" (S. 107f.)
  — daraus 1 weiterer neuer Eintrag:
  `wirbelsaeule-kompensationsfaehigkeit-spaete-symptome-kein-kapselmuster`
  (PATHOLOGIE: die Kompensationsfähigkeit der Wirbelsäule als Grund für
  spät erkannte Beschwerden, der an der Wirbelsäule fehlende Kapselmuster-
  Begriff als methodische Lücke, sowie primäre vs. sekundäre
  Wirbelsäulenläsion mit Verknüpfung zum bestehenden Eintrag
  `wirbelsaeule-krummer-ruecken-lahmheitshinweis` aus umgekehrter
  Kausalrichtung). Dies bestätigt die Erwartung, dass Kap. 7.4 im
  Gegensatz zu 7.3 eigenständigere Inhalte liefert. Danach Kap. 7.4.1
  „Spezifische Anamnese und Adspektion" (S. 108–110, Chunk o(26).pdf) —
  daraus 2 weitere neue Einträge:
  `wirbelsaeulenspezifische-anamnese-lokalisationshinweise` (UNTERSUCHUNG:
  eine Tabelle, die aus verändertem Alltagsverhalten — Strecken, Schütteln,
  Treppensteigen hoch/runter, zweiphasiges Aufstehen, Hinein-/
  Hinausspringen, inkl. katzenspezifischer Kratzbaum-/Katzenklo-Fragen —
  auf die wahrscheinlich betroffene Wirbelsäulenregion schließt) sowie
  `adspektion-wirbelsaeule-rute-taktgeber-warnsignal` (UNTERSUCHUNG: die
  Rute als „Taktgeber“-Warnsignal für eine LWS-Problematik, wenn sie den
  Bewegungsrhythmus der Hinterhand mitzubestimmen statt nur zu folgen
  scheint). Außerdem aus der Kap.-7.4-Einleitung (S. 108) 1 weiterer neuer
  Eintrag: `strukturschaedigung-wirbelsaeule-realistisches-therapieziel-
  ease` (THERAPIE: Kompensationsmechanismen in Nachbar-/
  Übergangssegmenten nach bereits eingetretener Strukturschädigung, und
  das daraus resultierende realistische Therapieziel — Erhalt der
  Kompensationsfähigkeit statt Heilung der Struktur). **Damit ist Kap.
  7.4.1 vollständig ausgewertet.** Danach 7.4.2 „Untersuchung und
  Behandlung der Wirbelsäule" begonnen (HWS-Anatomie und Joint-Play-
  Technik, BWS-Anatomie/Beweglichkeit, Chunk o(26).pdf, S. 110–115): Die
  konkreten Joint-Play-Grifftechniken für HWS/BWS **bewusst nicht
  übernommen** (wie bei Kap. 7.3 reine Technik-Anleitungen ohne
  eigenständigen Lehrwert bzw. Überschneidung mit Hárrer), die BWS-
  Anatomie lieferte aber **1 weiteren neuen Eintrag**:
  `antiklinaler-brustwirbel-landmarke-bewegungswechsel` (BIOMECHANIK: der
  antiklinale Brustwirbel zwischen Th9–Th11 als Punkt, an dem die
  Facettengelenkausrichtung kippt und sich damit die mögliche
  Bewegungsrichtung umkehrt, plus eine Dornfortsatz-Palpationslandkarte —
  ergänzt den bestehenden Kasper/Zohmann-Eintrag `schmerzreise-hd-knie-
  sig-lsue-kaskade`, der denselben antiklinalen Wirbel bereits als
  Schwachstelle der Schmerzkaskade nennt, um die eigenständige
  Bewegungsfähigkeits-Regel und die Palpationslandkarte). Danach BWS/LWS-
  Facettengelenk-Technik (S. 115–119, Chunk o(26).pdf) überflogen: die
  konkreten Joint-Play-Grifftechniken (Federn/Gleiten, Aufklappbarkeit)
  **bewusst nicht übernommen** (reine Technik ohne eigenständigen
  Lehrwert), die LWS-Kennmuskeln (M. quadratus lumborum, M. longissimus)
  **bereits durch die bestehende Kennmuskel-Tabelle aus Kap. 7.1.3
  abgedeckt** — kein neuer Eintrag. 2 eigenständige Biomechanik-Fakten
  aus demselben Abschnitt ergaben aber **2 weitere neue Einträge**, siehe
  Stand oben (`divergenz-konvergenz-facettengelenke-wirbelsaeulenbewegung`,
  `pumpbewegung-henkelbewegung-rippenatmung`). Der Rest von 7.4.2
  (S. 119–124: SIG und Schwanzwirbel) wurde gezielt gegen die bereits sehr
  umfangreiche bestehende Hárrer-SIG-Dokumentation geprüft — durchgängige
  Überschneidung, bewusst keine neuen Einträge. **Damit ist Kap. 7
  „Osteoartikuläre Techniken" (S. 70–124) vollständig ausgewertet: 12 neue
  Einträge insgesamt**, bei dokumentiertem Verzicht auf alle rein
  technikbasierten oder bereits anderweitig abgedeckten Abschnitte (Details
  im Backlog-Eintrag zu dieser Quelle). Danach Kap. 1.2 „Geschichte der
  Osteopathie" (S. 4–8, Chunk o(2).pdf) sowie der Beginn von Kap. 2
  (S. 8f.) gelesen und **bewusst nicht extrahiert**: Der Abschnitt ist
  Ideengeschichte (Paracelsus, Descartes, vitalistische Schule, Andrew
  Taylor Stills Biografie und religiös-philosophische Grundüberzeugungen,
  der Littlejohn-Schisma, kurze Geschichte der Veterinärosteopathie in
  Europa ab Giniaux 1992) ohne verifizierbare klinische oder anatomische
  Einzelaussage — für Denkgangs Ziel, klinisches Denken zu trainieren,
  liefert dieser Abschnitt keinen geeigneten Lehrinhalt (vergleichbar mit
  der bereits getroffenen Entscheidung, rein praxisorganisatorische/
  alternativmedizinische Kapitel bei Kasper/Zohmann auszulassen). **Mit
  dieser bewussten Auslassung von Kap. 1–2 gilt die aktive Extraktion aus
  Könneker/Reiter, Osteopathie in der Kleintierpraxis, für diese Session
  als abgeschlossen: 19 neue Einträge aus Kap. 3–7.** Kap. 8 „Viszerale
  Techniken" wurde zusätzlich stichprobenartig geprüft (S. 148–157) und
  ebenfalls bewusst nicht extrahiert — überwiegend disputierte
  Organmotilitäts-/-mobilitätstheorie, die unstrittige
  Innervationsanatomie ohne Denkgang-spezifischen Mehrwert, die solide
  Physiologie des enterischen Nervensystems ohne Bezug zum
  physiotherapeutischen Fokus (Details im Backlog). **Damit gilt auch
  Kap. 8 für diese Session als geprüft und abgeschlossen.** Kap. 9
  (Kraniosakrale Techniken) und Kap. 10 (Von der Technik zur Kunst)
  bleiben ungelesen und als niedrige Priorität für eine Folgesession
  offen — siehe Backlog-Eintrag zu dieser Quelle für die bereits
  dokumentierte Einordnung der dort zu erwartenden strittigen Konzepte
  (primär respiratorischer Mechanismus, kraniosakraler Rhythmus). Als
  nächste Quelle wurde Welter-Böller, Barbara/Welter, Maximilian/John,
  Hedi, Faszientherapie beim Hund (ISBN 978-3-13-245372-2, Thieme, 2.
  Auflage 2025, Drive-Ordner-ID `1hP6DF8W9ft61bAIN9N6rXrKYw1L7aAv1`)
  ausgewählt — eine gezielte Ergänzung zum bereits ausgewerteten
  Faszienkapitel aus Könneker/Reiter, da hier ein ganzes Buch
  faszienspezifisch und hundespezifisch ist. Kap. 1 „Einleitung" (S. 16,
  Chunk f(1).pdf) wurde gelesen und **bewusst nicht extrahiert**
  (motivierende Einleitung mit A.-T.-Still-Zitaten, keine überprüfbare
  Facheinzelaussage). Kap. 2 „Anatomie und Physiologie der Faszien"
  (S. 20–31, vollständig, Chunk f(2).pdf) lieferte **4 neue Einträge**:
  das Tensegrity-Modell nach Buckminster Fuller (1975) als Erklärung
  energiearmer Haltungsstabilität (Stäbe = Knochen, Zugelemente =
  Faszien unter Dauerspannung); der Katapulteffekt (Kram/Dawson 1998)
  der Zehenbeuger-Sehnen als elastischer Energiespeicher, der mit der
  Gangart zunimmt und bei Senk-/Spreizpfote spürbar an Effizienz
  verliert; die von Robert Schleip (Fascia Research Center Ulm)
  entdeckten kontraktilen Myofibroblasten in gesunder Faszie (u. a. Dura
  mater, Fascia thoracolumbalis) mit mutmaßlich sympathikusabhängiger,
  unwillkürlicher Tonusregulation; sowie eine zweite, komplementäre
  Diaphragmen-Klassifikation (respiratorische vs. faszial Diaphragmen),
  die explizit gegen den bestehenden, anatomisch-regional gegliederten
  Fünf-Diaphragmen-Eintrag aus Könneker/Reiter abgegrenzt und
  querverlinkt wurde, statt ihn zu duplizieren. Die Golgi-Rezeptoren-
  Einleitung in Kap. 3.2.1 (Chunk f(2).pdf, Satzende) wurde gegen den
  bestehenden, aus Alexander/Baatz stammenden Golgi-Sehnenorgan-Eintrag
  geprüft und als zu nah daran bewusst nicht erneut extrahiert. Danach
  Chunk f(3).pdf gelesen (Rest von Kap. 3 „Faszien als „Sinnesorgane"",
  S. 32–35, sowie Kap. 4.1–4.2 „Pathologie der Faszien", S. 36f.) — **6
  weitere neue Einträge plus eine Ergänzung eines bestehenden Eintrags**:
  3.1 „Embodiment" lieferte den Rahmenbegriff der Faszie als größtem
  Sinnesorgan des Körpers samt des Warnbeispiels zur altersbedingten
  Achilles-Plantarsehnen-Degeneration beim Menschen
  (`embodiment-faszien-koerperwahrnehmung-tiefensensibilitaet`); 3.2.2–
  3.2.3 (Vater-Pacini- und Ruffini-Körperchen) wurden als Vergleichstabelle
  mit gegensätzlichem Reaktionsprofil aufbereitet und gezielt gegen den
  bestehenden, nur knappen Ruffini-Hinweis im Könneker/Reiter-Eintrag
  `faszie-sinnesorgan-mechanorezeptoren-perforanten-trias` abgegrenzt
  (`vater-pacini-ruffini-koerperchen-gegensaetzliche-reaktionsprofile`);
  3.2.4 (interstitielle Rezeptoren) lieferte deren Doppelfunktion als
  Ergo- und Interozeptoren
  (`interstitielle-rezeptoren-ergorezeptoren-interozeption`); 3.2.5
  (WDR-Programm) den Mechanismus der Nozizeptor-zu-Mechanorezeptor-
  Umschaltung durch Bewegung als Erklärung für scheinbare Besserung durch
  Aufwärmen
  (`wdr-neuronen-nozizeptor-mechanorezeptor-umschaltung-schmerzlinderung`);
  3.2.6 (Schmerzreaktion der Faszie) die thorakolumbale Faszie als
  Schmerzrezeptor-Hotspot samt Palpationskriterium zur Abgrenzung
  faszialer von viszeraler Schmerzhaftigkeit
  (`faszienschmerz-thorakolumbale-faszie-myofibroblasten-verklebung`,
  verknüpft mit dem bestehenden Myofibroblasten-Eintrag); 4.1
  (Faszienrestriktion) die vollständige Pathophysiologie samt
  „Faszienkater"-Konzept, die den knappen Restriktionsbegriff aus dem
  bestehenden Tensegrity-Eintrag ergänzt statt zu duplizieren
  (`faszienrestriktion-pathophysiologie-immobilisation-faszienkater`).
  4.2 (Faszien und Stress) war inhaltlich zu knapp für einen
  eigenständigen Eintrag und wurde stattdessen als dritter Abschnitt in
  den bestehenden Eintrag
  `myofibroblasten-faszien-kontraktionsfaehigkeit-vegetative-kontrolle`
  eingearbeitet (klinischer Stress-Myofibroblasten-Zusammenhang,
  Malinois-Beispiel). Damit ist Kap. 3 vollständig und Kap. 4.1–4.2 von
  Kap. 4 ausgewertet. Danach Chunk f(4).pdf gelesen (4.3 Narbengewebe und
  4.4 Faszien und Alter, S. 37f., 4.1–4.2 im selben Chunk nochmals
  dupliziert vorhanden — nicht erneut verarbeitet) — **2 weitere neue
  Einträge, damit ist Kap. 4 „Pathologie der Faszien" vollständig
  ausgewertet.** 4.3 lieferte die Funktionslosigkeit des Narbengewebes
  samt der daraus folgenden Agonist-/Antagonist-Fehlkoordination bei
  Muskelbeteiligung
  (`narbengewebe-funktionsverlust-agonist-antagonist-fehlkoordination`) —
  bewusst nicht übernommen wurde dabei die im Original pauschale
  Bezeichnung des Narbengewebes als „somatische Dysfunktion", da dies der
  bestehenden, strengeren Reversibilitäts-Definition dieses Begriffs
  (`somatische-dysfunktion-art-kriterienraster`, Könneker/Reiter)
  widerspricht; 4.4 lieferte die altersbedingte Umwandlung vom
  Scherengitter- zum Filzmuster der Muskelfaszie samt der paradoxen
  Kompensationsfunktion dieser Verfilzung für Statik und Haltung trotz
  Muskelabbaus, verknüpft mit dem bestehenden Katapulteffekt-Eintrag
  (`faszienalterung-scherengittermuster-verfilzung-kompensation`). Damit
  ist Teil 2 des Buches („Anatomie, Physiologie, Funktion und Pathologie
  der Faszien", Kap. 2–4) vollständig ausgewertet. Danach Chunk f(5).pdf
  gelesen (Kap. 5 „Faszienbefundung", S. 40–51, vollständig, sowie der
  Beginn von Kap. 6.1) — **5 weitere neue Einträge, damit ist Kap. 5
  vollständig ausgewertet.** 5.1/5.1.1 (Exterieurbeurteilung) lieferte
  die drei Grundformen Galopp-/Trab-/Kraftform mit Windhund-, Wolf-/
  Border-Collie- und Leonberger-Beispiel, verknüpft mit den bestehenden
  Katapulteffekt- und Myofibroblasten-Einträgen
  (`exterieur-faszienspannung-galopp-trab-kraftform`) sowie, als eigener
  Eintrag, die Rutenhaltung als Spannungsindikator
  (`rutenhaltung-sichelrute-ringelrute-faszienspannungsindikator`).
  Bewusst nicht übernommen: die im selben Abschnitt behaupteten
  Zusammenhänge zwischen bestimmten Schädelformen (Bulldogge, Chihuahua,
  Cocker Spaniel) bzw. aufrechter Halshaltung und einer Störung des
  „craniosacralen Rhythmus" bzw. direkter Sympathikus-Aktivierung über
  die Halswirbelsäule — dieselbe Einordnung wie bei Könneker/Reiter Kap.
  9 (unabhängig nicht bestätigte Rhythmus-/Kausalitätsannahme). 5.2/5.2.1
  (Gang-/Haltungsanalyse) und 5.1.2/5.2.2 (statische Adspektion,
  Haltungstests) lieferten die systematischen Beobachtung-Hinweis-Tabellen
  für Gangbild (`gangbildanalyse-faszienzeichen-vorne-seite-hinten`) und
  für statische Zeichen samt des diagnostisch wertvollen Ausweichsitzes
  bei Kreuzbein-/SIG-Problematik, verknüpft mit den bestehenden
  Iliosakralgelenk-Einträgen
  (`adspektion-haltungstests-faszienzeichen-statisch`). 5.3/5.3.1
  (Faszienpalpation) lieferte die multidirektionale Prüftechnik und das
  Thixotropie-Phänomen samt zweier herausgegriffener Landmarken (Th9–10
  Geschirr-Risikozone, Th13–L3 als einfachste Palpationsstelle der
  thorakolumbalen Faszie); die vollständige Liste aller Palpationsorte je
  benannter Körperfaszie wurde bewusst nicht als eigener Katalog
  übernommen (reine Technikanleitung ohne darüber hinausgehenden
  Lehrwert) (`faszienpalpation-technik-multidirektional-thixotropie`). Der
  Beginn von Kap. 6.1 (Faszienreifung, 4.–9. Lebensmonat als sensible
  Phase) führte direkt zu den bereits ausführlich vorhandenen FPC-/IPA-
  Einträgen (Ellbogendysplasie) — hier bewusst keine erneute Extraktion,
  da das Thema bereits aus mehreren Quellen umfassend abgedeckt ist.
  Danach Chunk f(6).pdf gelesen (Kap. 6 „Behandlungsmöglichkeiten bei
  Faszienproblemen", S. 52–78, vollständig) — **3 weitere neue Einträge,
  damit ist Kap. 6 vollständig ausgewertet.** Aus 6.2 „Manuelle
  Faszientherapie" (Dehnung, Myofasziales Release, Massage, Tapes,
  Gelenkkapselmobilisation, Narbenbehandlung): die verzögerte, erst nach
  ca. 30 Minuten einsetzende und über Stunden über den Ausgangswert
  hinaus ansteigende Gewebehydration nach Dehnung
  (`dehnung-faszienhydration-verzoegerter-rebound-effekt`) sowie die
  Erweiterung des piezoelektrischen Effekts von starren Knochenkristallen
  auf die biegsamen „Flüssigkristalle" Aktin/Myosin/Elastin/Kollagen,
  verknüpft mit den bestehenden knochenbezogenen Piezoelektrizitäts-
  Einträgen
  (`faszien-piezoelektrizitaet-fluessigkristalle-signalweiterleitung`).
  Bewusst nicht übernommen aus 6.2: die Methode des Myofaszialen Release
  mit State of Ease/State of Bind, Stillpoint und Unwinding (6.2.3) —
  dieselbe unabhängig nicht bestätigte Eigenwahrnehmung wie die bereits
  bei Könneker/Reiter ausgeschlossene MFR-Technik; Ausstreichungen,
  Massage und Tapes/Bandagen (6.2.1, 6.2.4, 6.2.5) — restatten im
  Wesentlichen die bereits extrahierten WDR-/Ruffini-/Thixotropie-
  Mechanismen auf verschiedene benannte Techniken angewendet, ohne
  darüber hinausgehenden eigenständigen Lehrwert; die
  Gelenkkapselmobilisation (6.2.6) — reine Technik, inhaltlich bereits
  durch bestehende Traktions-/rhythmische-Mobilisationstechniken
  abgedeckt; die Narbenbehandlungstechnik (6.2.7) — das darin enthaltene
  Wundheilungsphasen-Zeitschema ist nahezu deckungsgleich mit dem bereits
  bestehenden Eintrag `wundheilungsphasen-zeitfenster-reha` (Mai, andere
  Quelle), die eigentliche manuelle Mobilisationstechnik nach Fourie/Robb
  ist reine Technikanleitung. 6.3 „Spezielle Techniken für besondere
  Faszien" (Falx cerebri „Clear the Confusion", Detonisierung der kurzen
  Nackenstrecker/Meningen-Harmonisierung, Dura-Traktionen, Shiften der
  Wirbelkörper) **vollständig bewusst nicht extrahiert**: durchgehend
  entweder reine Grifftechnik ohne eigenständigen Lehrwert oder explizit
  auf das craniosacrale System bezogen (Harmonisierung von Falx
  cerebri/Tentorium/Falx cerebelli) — dieselbe Einordnung wie das bereits
  zurückgestellte Kap. 9 bei Könneker/Reiter. 6.4 „Faszienregulation an
  den Extremitäten" (3D-Mobilisation der Schulter, Release der Fascia
  antebrachii, Faszienlift) und 6.5 „Besondere Techniken am Rumpf"
  (Faszienlift, Kiblersche Hautfalte, subkutane Reflextherapie/
  Bindegewebsmassage) **ebenfalls vollständig bewusst nicht extrahiert**:
  reine Grifftechnik ohne über bereits Bestehendes hinausgehenden
  Lehrwert, sowie bei Kiblerscher Hautfalte und Bindegewebsmassage
  (inkl. identischer Elisabeth-Dicke-Historie) durchgängige Überschneidung
  mit den bereits sehr ausführlichen bestehenden Einträgen aus
  Kasper/Zohmann. 6.6 „General Listening/Masterclass" (Listening,
  Motilität/„Faszientanz", Unwinding) **vollständig bewusst nicht
  extrahiert**: explizit auf craniosacrale Konzepte verweisend
  („craniale Welle nach Sutherland", „primäre Atmung") und durchgehend
  auf unabhängig nicht bestätigter therapeutischer Eigenwahrnehmung
  beruhend — bestätigt exakt die bereits getroffene Einordnung. 6.7
  „Diaphragmen als zentrale Strukturen": Die allgemeine Diaphragmen-
  Klassifikation wiederholt im Kern die bereits aus Kap. 2.6 extrahierte
  Zweiteilung (keine neue Extraktion), die einzelnen
  Diaphragmen-Behandlungsabschnitte (6.7.2–6.7.6) sind bis auf die reine
  Anatomie durchgehend Unwinding-/Ear-Pull-Technik (bewusst nicht
  übernommen) — die anatomischen Grenzen von vorderer Thoraxapertur und
  Diaphragma pelvis waren jedoch genuin neu und wurden als eigenständiger
  Anatomie-Eintrag übernommen
  (`vordere-thoraxapertur-diaphragma-pelvis-anatomische-grenzen`). Damit
  ist Kap. 6 trotz seines überwiegend technik- und
  craniosacral-lastigen Profils mit 3 soliden neuen Einträgen
  abgeschlossen. Danach Teil 4 „Das parietale System" begonnen: Chunk
  f(7).pdf gelesen (Kap. 7.1 „Kopf-, Hals- und Rumpffaszien", S. 80–96,
  vollständig) — bestätigt die im Backlog bereits vorab geäußerte
  Erwartung eines erheblichen Überschneidungs- und Craniosacral-
  Kontaminationsrisikos sehr deutlich: Praktisch jede der acht
  Einzelfaszien-Unterkapitel (7.1.1–7.1.8) verknüpft ihre jeweilige
  Restriktion über lange, unabhängig nicht verifizierbare Kausalketten
  mit dem „Sphenobasilargelenk", dem „craniosacralen Rhythmus" bzw. dem
  „interkraniellen Membransystem" — bis hin zu einer im Original explizit
  als Vermutung formulierten „energetischen Verbindung" zwischen Proc.
  mastoideus und Tuber ossis ischii. Die jeweiligen
  „Indikationen"-Listen reichen entsprechend bis zu „Lernschwierigkeiten,
  Aggressionen, Mattigkeit, Depression, Angst" als angeblicher Folge
  einer Kopffaszien-Restriktion — eine Kausalbehauptung, die weit über
  das hinausgeht, was unabhängig belegbar ist, und bewusst nicht
  übernommen wurde (dieselbe Einordnung wie das bereits bei Könneker/
  Reiter, Kap. 9, ausgeschlossene craniosacrale Konzept). Die
  „Behandlungsvorschläge" bestehen zudem durchgehend aus bereits
  bekannter oder reiner Grifftechnik (Unwinding, Ear Pull, TTouches,
  Clear the Confusion, myofasziales Release). Trotz dieses insgesamt
  wenig ergiebigen Profils fanden sich **2 werthaltige, von der
  Craniosacral-Kontamination klar abtrennbare Inhalte**: Die drei Blätter
  der Fascia cervicalis profunda mit ihrem jeweiligen anatomischen Inhalt
  (vegetativer Truncus vagosympathicus, N. laryngeus recurrens, A.
  carotis communis, Speise-/Luftröhre) — unstrittige, klinisch relevante
  Halsanatomie, die erklärt, warum Druck durch ein Halsband mehr als nur
  Haut betreffen kann
  (`fascia-cervicalis-profunda-drei-blaetter-vagosympathicus-trachea`);
  sowie aus 7.1.5 (Fascia trunci superficialis, die im Text abrupt in
  einen Exkurs zur degenerativen Myelopathie übergeht) das dort genannte
  frühe, nicht pathognomonische Erstsymptom der abgeschliffenen
  Mittelkrallen der Hinterpfoten — als Ergänzung in den bereits
  bestehenden, sehr ausführlichen DM-Eintrag eingearbeitet statt
  dupliziert. Die übrigen sechs Unterkapitel (7.1.1, 7.1.2, 7.1.3, 7.1.6,
  7.1.7, 7.1.8: Fascia capitis superficialis/profunda, Fascia cervicalis
  superficialis, Fascia trunci profunda, Fascia thoracolumbalis, Fascia
  spinocostotransversalis) wurden gezielt auf unabhängig von der
  Craniosacral-Theorie stehende, neue Fakten geprüft und ergaben keinen
  zusätzlichen Eintrag — entweder reine Grifftechnik oder inhaltliche
  Überschneidung mit der bereits sehr umfangreichen bestehenden
  Thorakolumbalfaszien-/Rippen-Dokumentation aus Hárrer und Könneker/
  Reiter. Danach 7.2 „Vordergliedmaßen" (7.2.1–7.2.6, S. 96–102, bereits
  im selben Chunk f(7).pdf enthalten) gelesen — **1 weiterer neuer
  Eintrag**, und wie erwartet deutlich weniger craniosacral-kontaminiert
  als 7.1 (die Gliedmaßen liegen anatomisch weit vom Schädel entfernt).
  7.2.3/7.2.4 (Fascia antebrachii, Membrana interossea antebrachii)
  lieferten eine genuin neue, biomechanisch konkrete Funktion: das Os
  carpi accessorium als mechanischer „Spanner" der Fascia antebrachii,
  der bei Karpalflexion nach medial wegklappen muss, und dessen
  Spannerfunktion bei der für rennende Windhunde typischen
  Karpalüberstreckung verloren gehen kann — gezielt verknüpft mit dem
  bestehenden Windhund-/Katapulteffekt-Eintrag sowie den bereits
  bestehenden, orthopädisch/neurologisch ausgerichteten Os-carpi-
  accessorium-Einträgen aus Koch/Fischer (Ergänzung, keine Duplikation)
  (`fascia-antebrachii-os-accessorium-spannerfunktion-ueberstreckung`).
  7.2.1/7.2.2 (Fascia axillaris, Fascia brachii) lieferten nur dünne
  Verletzungsmechanismen (Geschirrreibung) ohne über die bereits in der
  Gangbildzeichen-Tabelle dokumentierten Adduktions-/Abduktionszeichen
  hinausgehenden Mehrwert — bewusst nicht als eigene Einträge
  übernommen. 7.2.5/7.2.6 (Fascia dorsalis manus, Fascia palmaris) sind
  bis auf Narbenmobilisation nach Schnittverletzungen (bereits durch den
  bestehenden allgemeinen Narbengewebe-Eintrag abgedeckt) unauffällig —
  ebenfalls keine eigenen Einträge. Danach 7.3 „Beckengliedmaßen"
  (7.3.1–7.3.7, S. 103–116, bereits vollständig im selben Chunk f(7).pdf
  enthalten) gelesen — **3 weitere neue Einträge, damit ist Kap. 7 „Das
  parietale System" (S. 80–117) vollständig ausgewertet.** 7.3.3 (Fascia
  lata) lieferte die Erklärung für die auffällig elastikfaserreiche
  Kniekehlenregion dieser Faszie: Sie leitet den Katapulteffekt der
  Beugesehnen bis ins Knie weiter und erzeugt so eine federnde statt rein
  muskulär erzeugte Knieflexion beim Übergang in die Hangbeinphase —
  verknüpft mit dem bestehenden Katapulteffekt- und dem neuen Os-carpi-
  accessorium-Eintrag als Vorderextremitäten-Pendant
  (`fascia-lata-kniekehle-katapulteffekt-uebertragung-hangbeinphase`).
  7.3.5/7.3.6 (Fascia genus, Fascia cruris) lieferten ein zweiseitiges
  Problembild: zu geringe Faszienspannung begünstigt Kreuzband-/
  Meniskusinstabilität, zu starke Spannung dagegen ein gerades,
  schubarmes Knie-/Sprunggelenk mit einer Belastungsverschiebung von der
  Art. talocalcanea zur Art. talocalcaneocentralis und erhöhtem
  Arthroserisiko — inklusive der Gefährdung junger, faszial noch nicht
  ausgereifter Hunde (Reifungszeit ca. 14 Monate)
  (`fascia-genus-cruris-kreuzband-kniewinkel-sprunggelenk-spannung`). Der
  umfangreiche Kreuzbandriss-Exkurs in 7.3.6 bestätigte zunächst
  durchgehende Überschneidung mit bereits bestehenden, ausführlicheren
  Einträgen (Epidemiologie, Schubladentest, OP-Verfahren aus Koch/
  Fischer u. a.) — enthielt aber einen genuin neuen, gegenintuitiven
  Rehabilitationshinweis: Laufband- und Aquatraining trainieren beim
  Kreuzbandriss einseitig den M. quadriceps (der Hund führt das Bein nur
  aktiv in der Hangbeinphase vor, die Stemmphase übernimmt das Laufband
  passiv), verstärken damit genau die Dysbalance, die das Kreuzband
  ohnehin schon belastet, und sind dadurch in der frühen
  Rehabilitationsphase eher kontraindiziert — im Kontrast zur
  beschriebenen natürlichen Selbstrehabilitation kleiner Hunde
  (`laufband-aquatraining-quadrizeps-imbalance-kreuzband-rehabilitation`).
  7.3.1/7.3.2 (Fascia glutea, Lig. sacrotuberale) bewusst nicht
  übernommen — neben Überschneidung mit der bestehenden SIG-Dokumentation
  fiel hier zusätzlich ein Faktencheck-Fund auf: Die Quelle behauptet
  einen häufigen Hypertonus des M. piriformis bei Hüftgelenksdysplasie,
  was in Spannung zum bestehenden, auf Hárrer gestützten Eintrag
  `n-ischiadicus-verlauf-kein-piriformis-syndrom` steht (dort: der
  M. piriformis schwächt beim Hund unter Überlastung eher ab, statt
  hyperton zu werden) — diese Spannung wurde nicht stillschweigend
  aufgelöst, sondern durch bewussten Verzicht auf die neue Behauptung
  gehandhabt, statt widersprüchliche Fakten nebeneinander stehen zu
  lassen. 7.3.4 (Fascia femoralis medialis) sowie 7.3.7 (Fascia
  plantaris/dorsalis pedis) lieferten keinen über Bestehendes
  hinausgehenden Mehrwert. Danach Teil 5 „Das viszerale System" begonnen:
  Chunk f(8).pdf gelesen (Kap. 8 „Anatomie der Faszien im Bereich der
  Viszera", S. 118–124, vollständig) — entgegen der eigenen Erwartung
  („vermutlich im selben disputierten Organtheorie-Profil wie das
  bereits ausgeschlossene Kap. 8 bei Könneker/Reiter") überwiegend
  solide, unstrittige, auf König/Liebich (Standardlehrbuch) gestützte
  Körperhöhlenanatomie ohne craniosacrale oder Organmotilitäts-
  Spekulation — **3 neue Einträge**: die Vier-Quadranten-Gliederung des
  Abdomens mit Organzuordnung als praktisches Lokalisationsraster für
  palpatorische/bildgebende Befunde
  (`bauchhoehle-vier-quadranten-organtopografie`); das durchgehende
  Dreischicht-Prinzip der faszialen Auskleidung aller drei Körperhöhlen
  (Fascia endothoracica–transversalis–pelvis als eine kontinuierliche
  Struktur, nicht drei getrennte)
  (`koerperhoehlen-dreischichtige-faszienauskleidung-kontinuitaet`); und,
  aus dem unmittelbar anschließenden Kap. 9.1, das Konzept des
  „viszeralen Gelenks" (Organe als über Serosa-Gleitflächen und
  Mesenterien/Bänder verbundene Gelenkpartner) — hier bewusst als
  didaktische Erweiterung des Gelenkbegriffs eingeordnet statt als
  etablierte Gelenkklassifikation, da die Quelle selbst den geringen
  Wissensstand beim Hund (im Vergleich zum Menschen) ausdrücklich einräumt
  (`viszerales-gelenk-serosa-mesenterium-gleitflaechen`). Diese drei
  Einträge stützen sich auf reguläre, unstrittige Anatomie (Serosa,
  Mesenterium, Peritoneum) statt auf die später in Kap. 9–10 zu
  erwartende Organmotilitäts-/Listening-Theorie — die ursprüngliche
  Vorab-Einschätzung erweist sich damit für Kap. 8 als zu pessimistisch,
  was zeigt, dass eine Buchkapitel-Einordnung nach Titel allein kein
  Ersatz für die tatsächliche Lektüre ist. Danach den Rest von Kap. 9
  „Die Organe im Gesamtsystem der Faszien" gelesen (9.1.2–9.4, S. 128–133,
  Chunk f(9).pdf) — **3 weitere neue Einträge, damit ist Kap. 9
  vollständig ausgewertet.** 9.1.2 „Motor der Bewegung" unterscheidet drei
  Organbewegungsformen: Motrizität (passive Mitbewegung der Organe bei
  Skelettbewegung, z. B. die Niere auf dem M. psoas) und Mobilität
  (Eigenbewegung im Aufhängungssystem durch Zwerchfell/Herz/Peristaltik,
  inkl. der Zwerchfellbewegungs-Statistik von rund 28.800 Bewegungen pro
  Tag und dem Gastropexie-Beispiel) wurden übernommen
  (`motrizitaet-mobilitaet-organbewegung-skelett-atmung-peristaltik`); die
  dritte Form, die Motilität (Organ-Eigenbewegung, nur durch „sehr
  präsente, lauschende Berührung“ wahrnehmbar, Exspir-/Inspir-Rhythmus),
  bewusst nicht — dieselbe Eigenwahrnehmungskategorie wie die bereits bei
  Könneker/Reiter ausgeschlossene Organmotilitätstheorie, die Vorab-
  Erwartung bestätigt sich hier also doch, nur für einen Teilaspekt des
  Kapitels statt für das ganze. 9.2/9.2.1 lieferten die drei
  Ursachengruppen verminderter Organbeweglichkeit (Adhäsion/Verklebung/
  Verwachsung mit Zeitverlauf, Ptose mit Leber-/Nieren-Fettkapsel-
  Beispiel, Viszerospasmus)
  (`viszerale-restriktionen-adhaesion-ptose-viszerospasmus`) sowie die
  Gruppenläsion (>3 aufeinanderfolgende gestörte Wirbelsegmente) als
  Hinweis auf eine viszerovertebrale Verkettung, verknüpft mit der
  bestehenden Kibler-Palpationstechnik um ein zusätzliches Texturzeichen
  (`gruppenlaesion-viszerovertebrale-verkettung-kibler-textur`) — die
  dabei beschriebene Inhibitionstechnik selbst wurde bewusst nicht als
  Technikanleitung übernommen. 9.3/9.4 („Fasziale Ketten im
  Gesamtsystem", Spannungsausbreitung über die Fascia cervicalis
  profunda bis zu den Organen) lieferte keinen eigenständigen neuen
  Eintrag: Der Inhalt wiederholt im Kern die bereits aus Kap. 8.3
  extrahierte Dreischicht-Kontinuität (`koerperhoehlen-dreischichtige-
  faszienauskleidung-kontinuitaet`) und erweitert sie um das allgemeine,
  bereits an anderer Stelle als osteopathische Modellbildung eingeordnete
  „Faszienketten"-Konzept (vgl. die entsprechende Zurückhaltung bei
  Könneker/Reiter) — hier bewusst keine zusätzliche Extraktion, um das
  Konzept nicht über die bereits verifizierte Kontinuität hinaus
  aufzuwerten. Danach Kap. 10 „Typische Restriktionen im Bereich der
  Viszera" gelesen (S. 134–153, vollständig, Chunk f(10).pdf) — **1
  weiterer neuer Eintrag plus 1 Ergänzung eines bestehenden Eintrags,
  damit ist Teil 5 „Das viszerale System" (Kap. 8–10) vollständig
  ausgewertet.** Das Kapitel bestätigt das bereits aus Kap. 9 bekannte
  Muster in verschärfter Form: Für jedes einzelne Organ (Lunge, Magen,
  Leber, Dünndarm, Dickdarm, Harnblase, Niere, weibliche
  Geschlechtsorgane) folgt derselbe Dreischritt aus solider Topografie
  (meist gut verifizierbar, viele Angaben direkt aus König/Liebich), einem
  „Faszialen Ketten"-Abschnitt mit größtenteils unstrittiger
  Bänderanatomie, aber auch spekulativen Spannungsausbreitungs-
  Formulierungen (wiederholt als „denkbar“ oder „möglich“ relativiert,
  nie als gesicherter Fakt behauptet), einer „Symptome"-Liste, die über
  fast alle Organe hinweg dieselben wenig trennscharfen Zeichen wiederholt
  (v. a. „aufgekrümmter Rücken“ und „schwungloser, steifer Gang“ — ohne
  erkennbaren diagnostischen Mehrwert, da identisch für Lunge, Magen,
  Leber und Darm angegeben), und „Behandlungsvorschlägen“, die für jedes
  Organ erneut auf Wahrnehmung/Induktion der Motilitätsbewegung
  hinauslaufen (durchgehend dieselbe disputierte Eigenwahrnehmung wie
  bereits bei Könneker/Reiter und in Kap. 9.1.2 ausgeschlossen). Aus
  diesem umfangreichen, aber überwiegend bereits bekannten oder disputierten
  Material stach ein einziger, klar physiotherapeutisch relevanter Fund
  heraus (Kap. 10.9, Kastration der Hündin): die Diskrepanz zwischen der
  nach 10–14 Tagen äußerlich verheilten Kastrationsnarbe an der Linea
  alba und der tatsächlichen, rund dreimonatigen Reifungszeit bis zu
  belastbarem Narbengewebe — mit der konkreten Empfehlung, sportlich
  geführte Hunde bis dahin regelmäßig physiotherapeutisch zu begleiten,
  statt die Fadenentfernung mit voller Belastbarkeit gleichzusetzen,
  verknüpft mit den bestehenden Wundheilungs-/Narbengewebe-Einträgen
  (`kastrationsnarbe-linea-alba-reifungszeit-sporthund-nachsorge`).
  Zusätzlich wurde aus Kap. 10.8 (Niere) die dort beschriebene praktische
  Nutzung der Psoas-Nieren-Nachbarschaft (Hüftbeuger-Dehnung als indirekte
  Nierenmobilisation) in den bereits bestehenden Motrizität-/Mobilität-
  Eintrag aus Kap. 9.1.2 eingearbeitet statt dupliziert. Die detaillierte
  Organ-für-Organ-Bänderanatomie (Mesenterien, Keimdrüsenbänder,
  Blasenbänder etc.) wurde dagegen bewusst nicht einzeln in die
  Wissensbibliothek übernommen — sie liegt an der Grenze zur
  veterinärinternistischen Anatomie ohne unmittelbaren Bezug zu Denkgangs
  physiotherapeutischem Fokus und ist zudem über weite Strecken reine
  Strukturbeschreibung ohne eigenständige klinische Schlussfolgerung.
  Danach Teil 6 „Das craniosacrale System" (Kap. 11, S. 156–159, Chunk
  f(11).pdf) vollständig gelesen — wie erwartet die strittigste
  Einzelquelle des Buches, deckungsgleich mit der bereits bei
  Könneker/Reiter (Kap. 9) ausgeschlossenen craniosacralen Theorie
  (Indikationen bis hin zu „Verhaltensauffälligkeiten", Ear-Pull-/Clear-
  the-Confusion-Techniken). Keine neue Extraktion, aber ein wertvoller
  Negativbefund: Die Quelle bestätigt explizit, dass mehrere beim
  Menschen beschriebene Dura-Verbindungsstrukturen (Soulie-Fasern,
  Hofmann-Bänder, Verbindung zu Mm. rectus capitis dorsalis minor/
  obliquus capitis caudalis und zum Lig. nuchae) beim Hund gezielt
  gesucht und nicht gefunden wurden — eingearbeitet als Verschärfung des
  bereits bestehenden Hárrer-Eintrags zu Meningen/Dura-Verbindungen
  (`meningen-membranoeses-system-dura-verbindungen`), statt dupliziert.
  Danach das letzte Kapitel gelesen: Teil 7 Anhang, Kap. 12
  „Faszientraining beim Hund" (S. 160–164, vollständig, Chunk f(12).pdf)
  — **wie in der Vorschau erwartet das ergiebigste Kapitel des gesamten
  Buches, 5 neue Einträge.** Anders als die vorangehenden,
  technik-/theorielastigen Kapitel ist dies ein durchgehend konkretes,
  unstrittiges Trainingswissenschafts-Kapitel ohne jede craniosacrale
  oder Organmotilitäts-Spekulation. Der detaillierte, gewebespezifische
  Regenerationszeitplan nach überschwelliger Belastung (90 Minuten bis 10
  Tage, mit der daraus folgenden Begründung, warum tägliches Training
  kontraproduktiv ist)
  (`regenerationszeitplan-nach-ueberschwelliger-belastung`); die vier
  Anpassungsphasen des Trainings samt der zentralen Asymmetrie zwischen
  einjähriger Faszienstabilität und nur zehntägigem Muskelabbau — mit der
  daraus folgenden Rehabilitationskonsequenz, dass ein bereits faszial
  ausgereifter Hund nach Immobilisation risikoarm per Schwimmen
  muskulär wiederaufgebaut werden kann
  (`vier-anpassungsphasen-training-faszien-muskel-asymmetrie`); die
  Trainingsperiodisierung (6–7 Wochen Aufbau, 12 Wochen Plateauphase)
  samt dem Wolfswelpen-Reifungsmodell als natürlichem Vorbild und den
  beiden gangbildbasierten Überlastungszeichen
  (`sechs-wochen-periodisierung-deload-plateauphase-ueberlastungszeichen`);
  die Progressionsleiter von Trainingsumfang über Dauermethode und
  Intervalltraining bis zum Bodenstangentraining, das gleichzeitig als
  myofaszialer Koordinationstest dient
  (`trainingsreizschwelle-progression-bodenstangen-koordinationstest`);
  sowie die biomechanische Begründung, warum ausgerechnet die Landung aus
  der Trab-Schwebephase den M.-serratus-ventralis-/Fascia-
  spinocostotransversalis-Tragegurt kräftigt und dadurch die
  Zehengelenke entlastet, verknüpft mit dem bestehenden Hohmann-Eintrag
  zur Bogensehnenbrücke
  (`trab-landephase-serratus-ventralis-fascia-spinocostotransversalis-training`).
  **Mit Kap. 12 und dem anschließenden reinen Literaturverzeichnis (Kap.
  13) ist Welter-Böller/Welter/John, Faszientherapie beim Hund, damit
  vollständig ausgewertet — alle 7 Teile/12 Kapitel gelesen, mit
  insgesamt 37 neuen Wissenseinträgen aus dieser Quelle plus mehreren
  Ergänzungen bestehender Einträge (Degenerative Myelopathie,
  Myofibroblasten, Motrizität/Mobilität, Meningen/Dura-Verbindungen).**
  Nächste Quellenwahl: Aus Vanessas Drive-Bibliothek standen zwei
  unangetastete, fachlich einschlägige Kandidaten zur Wahl — Waibl/
  Mayrhofer/Matis/Köstlin/Wilkens, Atlas der Röntgenanatomie des Hundes
  (Thieme/Enke, 3. Aufl. 2012), und Salomon/Geyer/Gille (Hrsg.), Anatomie
  für die Tiermedizin (Thieme). Der Röntgenanatomie-Atlas wurde nach
  Sichtung von Einführung, Beckengliedmaße und Thorax **verworfen**: Er
  besteht durchgehend aus Lagerungsanleitungen (Ziel/Zentralstrahl/
  Beachte) plus reinen Struktur-Label-Legenden zu Röntgenbildern, die dem
  Text nicht beiliegen — es gibt keinen erklärenden Fließtext, der sich im
  Sinne von MASTER-PROMPT §22/Abschnitt „eigene Erklärung" synthetisieren
  ließe, und die beiden einzigen potenziell anschlussfähigen Konzepte
  (Fabellae als Prädilektionsstelle, Wachstumsfugenschluss als
  Trainingsgrenze) sind in der Bibliothek bereits ausführlich abgedeckt.
  Zudem enthält der Thorax-Teil veraltete, laut Buch-Einführung selbst
  durch Sonographie/Endoskopie abgelöste Verfahren (Bronchographie,
  Angiokardiographie mit Kontrastmittel). Stattdessen wurde mit Salomon
  et al., Anatomie für die Tiermedizin, begonnen — ein Standardwerk mit
  echtem Lehrtext, allerdings sehr umfangreich (vergleichende Anatomie der
  Haussäugetiere, nicht hundespezifisch, mehrere hundert granulare
  Drive-Chunks) und wird deshalb über mehrere Sessions hinweg
  kapitelweise bearbeitet, mit Fokus auf hundespezifisch markierte Stellen
  und auf Inhalte, die unabhängig von der Tierart als Grundlage für
  klinisches Denken taugen. Aus Kap. 1 „Allgemeine Anatomie der
  Haussäugetiere" zwei neue Einträge: das vollständige
  Richtungs-/Lagebezeichnungssystem (Grundachsen kranial/kaudal,
  dorsal/ventral, medial/lateral, dazu die Sonderbegriffe für Kopf/Hals
  sowie der Begriffswechsel zu dorsal/palmar/plantar/axial unterhalb von
  Karpus/Tarsus) als eigenständige Nachschlage-Grundlage
  (`richtungs-lagebezeichnungen-tierkoerper-kranial-kaudal-dorsal-palmar`),
  sowie ein Peritoneum-Eintrag zur klinisch auffälligen
  Schmerzasymmetrie zwischen parietalem (hochsensibel) und viszeralem
  (kaum schmerzempfindlich) Bauchfell — bis heute laut Quelle nicht
  vollständig erklärt —, ergänzt um Aszites-Mechanismus (venöser
  Rückstau überschreitet die Resorptionskapazität), die nur bei
  weiblichen Tieren bestehende aufsteigende Infektionsroute über die
  Eileiteröffnungen sowie den zellulären Adhäsionsmechanismus
  (Mesothelzerstörung durch Druck → bindegewebige Fusion), verknüpft mit
  der bestehenden Adhäsion/Ptose/Viszerospasmus-Systematik aus
  Welter-Böller/Welter/John
  (`peritoneum-aszites-peritonitis-adhaesionen-schmerzasymmetrie`). Die
  genaue Titel-/ISBN-Angabe von „Anatomie für die Tiermedizin" ist dabei
  bewusst als NICHT VERIFIZIERT gekennzeichnet, da das im Drive-Chunk
  eingeblendete Wasserzeichen eine erkennbar falsche, zu einem anderen
  Werk im selben Thieme-VetCenter-Paket gehörende ISBN nennt
  („Krankheiten der Katze"). Aus Kap. 2.1/2.2 „Bewegungsapparat"/„Binde-
  und Stützgewebe, Übersicht" ein weiterer neuer Eintrag zum
  Zwei-Phasen-Dehnungsverhalten von Kollagenfasern (erst ca. 3 %
  Wellenstreckung ohne echte Faserbelastung, dann nur noch ca. 5 %
  tatsächliche, über diese Grenze hinaus irreversible Elastizität;
  Reißfestigkeit 50–100 N/mm²) samt der gegensätzlichen funktionellen
  Anpassung bei Be- vs. Entlastung — als mechanistische Grundlage hinter
  der bereits bestehenden Beobachtung zur Gelenkkapselschrumpfung bei
  Ruhigstellung und zur Trainingsprogressions-Logik
  (`kollagenfaser-wellung-dehnungsgrenze-funktionelle-anpassung`). Nicht
  extrahiert: die reine Zell- und Fasertypen-Taxonomie des Binde- und
  Stützgewebes (Mesenchymzellen, Fibroblasten/Fibrozyten,
  Retikulumzellen, Glykosaminoglykan-/Proteoglykan-/Glykoprotein-Details,
  Fettgewebe-Histologie) — reine Histologie ohne eigenständigen
  klinisch-biomechanischen Mehrwert über das bereits Extrahierte hinaus;
  Myofibroblasten und Ehlers-Danlos-artige Kollagendefekte sind in der
  Bibliothek bereits an anderer Stelle abgedeckt. Kap. 2 „Bewegungsapparat"
  erwies sich danach als vollständiger vergleichend-anatomischer Atlas über
  alle Haussäugetierarten (S. 36–249) und die Folgekapitel als allgemeines
  veterinärmedizinisches Grundlagenwissen ohne physiotherapeutischen Bezug —
  die systematische Weiterextraktion aus Salomon/Geyer/Gille wurde daher
  bewusst gestoppt, die Quelle bleibt als Referenzwerk für
  Stichproben-Verifikation bestehen. Stattdessen aus VetCenter,
  Hundekrankheiten kompakt, „Neurologische Erkrankungen" (derselben Reihe
  wie die bereits ausgewerteten Kapitel „Erkrankungen des Bewegungsapparates"
  und „Wirbelsäulenerkrankungen") ein Fund: Der bestehende Eintrag zum
  Plexus-brachialis-Schaden kannte den allgemeinen Mechanismus, aber nicht
  die drei klinisch unterscheidbaren Unterformen (kranialer partieller
  Abriss mit guter Prognose vs. kaudaler partieller Abriss — am häufigsten,
  mit Horner-Syndrom in bis zu 50 % und schlechter Prognose — vs. kompletter
  Abriss) — als Ergänzung in den bestehenden Eintrag eingearbeitet. Der Rest
  des Kapitels (Hydrozephalus, Epilepsie-Medikation, GME/SRMA) ist reine
  internistische Diagnostik/Pharmakotherapie ohne physiotherapeutischen
  Handlungsspielraum und wurde bewusst nicht extrahiert; die
  Polyradikuloneuritis/Coonhound-Paralysis ist bereits durch einen
  ausführlicheren, dezidiert physiotherapeutischen Eintrag abgedeckt.
- Anatomie-Sektion: 33 Items. Die ursprünglichen 29 haben vollständige
  Ursprung-/Ansatz-/Innervations-Angaben (siehe Anatomie-Lückenschluss
  oben); die 4 neuen (semimembranosus, gastrocnemius, extensoren-/
  flexoren-tarsus-zehen) tragen dieselbe Vollständigkeit, mit klar
  gekennzeichneten Web-Ergänzungen für die im Original fehlende
  Innervation — keine offenen "Im Quellentext nicht genannt"-Kernfelder
  mehr.
- **Anatomie-Sektion auf 41 Items erweitert (03.10.2026) — Schultergürtelmuskulatur
  ergänzt.** Lücke erkannt: Die komplette Vorder-/Hintergliedmaße war bereits
  abgedeckt, aber die Schultergürtelmuskulatur (oberflächliche und tiefe
  Schicht nach Hárrer Kap. 12.1.4) fehlte komplett, obwohl mehrere
  Wissenseinträge (Bogensehnenbrücke/Tragegurt, Trab-Landephase) bereits
  intensiv auf M. serratus ventralis Bezug nehmen. Aus Hárrer Kap. 12.3.1/
  12.3.2 (S. 134–141, bereits vollständig lokal vorliegende Quelle, keine
  neue Drive-Recherche nötig) 8 neue Items: M. trapezius, M. omotransversarius,
  M. brachiocephalicus, M. latissimus dorsi, M. pectoralis superficialis,
  M. pectoralis profundus, M. rhomboideus, M. serratus ventralis. Ursprung/
  Ansatz wurden aus dem im Original beschriebenen Palpationsverlauf abgeleitet
  (Hárrer gibt hier keine separaten "Ursprung:"/"Ansatz:"-Zeilen, sondern
  beschreibt den Muskel entlang seines Faserverlaufs); wo auch die Funktion im
  Original fehlt, wurde sie aus der beschriebenen Dehnposition abgeleitet
  (Umkehrschluss: Dehnrichtung → Kontraktionsrichtung) und als eigene
  Schlussfolgerung von Denkgang gekennzeichnet, nicht als Harrer-Zitat.
  Innervation durchgängig per Web-Recherche ergänzt (dieselbe disclosed
  WICHTIGE-EINSCHRÄNKUNG-Kennzeichnung wie bei allen bisherigen
  Hárrer-Items) — bei M. omotransversarius widersprachen sich die
  gefundenen Quellen selbst (N. accessorius vs. Rami ventrales der
  Halsspinalnerven) und wurden deshalb bewusst als NICHT VERIFIZIERT belassen
  statt eine der beiden Angaben zu wählen. M. latissimus dorsi: Ansatz im
  Original nur vage als „Medialseite des Humerus" angegeben, hier auf
  Crista tuberculi minoris humeri präzisiert in Übereinstimmung mit dem
  bereits bestehenden M.-teres-major-Eintrag (gemeinsame Endsehne, dieselbe
  Quelle). M. serratus ventralis: Tragegurt-Funktion explizit mit dem
  bestehenden Trab-Landephase-Wissenseintrag verknüpft (andere, bereits
  verifizierte Quellen: Hohmann, Welter-Böller/Welter/John). Alle 8 Items
  via Playwright verifiziert (8/8 Review-Seiten, 0 Fehler). Direkt im
  Anschluss (ebenfalls 03.10.2026) aus Hárrer Kap. 16.3 „Muskulatur" (Die
  Wirbelsäule, S. 245–253) 6 weitere neue Items zur Rumpf-/Nackenmuskulatur
  (41 → 47): Subokzipitale Muskulatur/dorsale Kopfheber, M. erector spinae
  (Iliocostalis/Longissimus/Spinalis-Semispinalis), Mm. multifidi/
  Mm. rotatores, M. quadratus lumborum, Mm. scaleni (mit Thoracic-outlet-
  Mechanismus, cross-referenziert mit dem bestehenden Wissenseintrag) und
  Diaphragma. Bewusst nicht dupliziert: M. iliopsoas und M. serratus
  ventralis thoracis (Hárrer verweist hier selbst auf die bereits
  bestehenden Einträge). Bewusst ausgelassen: M. longus capitis/colli/
  M. splenius (OCR-Spaltenvertauschung im Drive-Chunk macht die
  ventral/dorsal-Zuordnung nicht zweifelsfrei rekonstruierbar), die sehr
  kurzen Mm. interspinales/intertransversarii sowie M. serratus dorsalis,
  die Mm. intercostales und M. retractor costae (laut Quelle selbst nicht
  eigenständig untersuchbar); die Bauchmuskulatur (M. transversus
  abdominis u. a.) bleibt offen, da der gelesene Chunk genau dort abbricht.
  Details siehe Hárrer-Backlog unten. Alle 6 Items via Playwright
  verifiziert (6/6 Review-Seiten, 0 Fehler). Direkt im Anschluss
  (04.10.2026) Hárrer Kap. 16.3 weitergelesen und damit die zuvor offen
  gelassene Unschärfe zu M. longus capitis/M. longus colli/M. splenius
  aufgelöst: Kapitelüberschrift 16.3.8 „Behandlung der Extensoren und
  Seitneiger (M. erector spinae, M. spinalis et semispinalis,
  M. splenius, Mm. intertransversarii)" stellt eindeutig klar, dass
  M. splenius zur dorsalen Extensoren-/Seitneiger-Gruppe (Rr. dorsales)
  gehört, M. longus capitis/colli dagegen zur ventralen Flexoren-Gruppe
  (Rr. ventrales). 4 weitere neue Items (47 → 51): **M. splenius**
  (eigenes Item), **M. longus capitis/M. longus colli** (ein
  gemeinsames Item — die Quelle nennt im Behandlungsabschnitt beide
  Namen uneinheitlich für denselben Muskel ohne getrennte Ursprung-/
  Ansatzpunkte, diese Unschärfe wird im `sourceStatus` offen benannt),
  ein gemeinsames Item für die schräge/quere Bauchmuskulatur
  (M. obliquus externus/internus abdominis + M. transversus abdominis —
  laut Quelle palpatorisch nicht einzeln abgrenzbar) sowie ein eigenes
  Item für **M. rectus abdominis** (gezielt längs testbar). Zusätzlich
  wurde das bestehende Item `erector-spinae-iliocostalis-longissimus-
  spinalis` um die **Mm. intertransversarii** erweitert (reine
  Seitneige-Funktion, dieselbe Rr.-dorsales-Gruppe) — die frühere
  Auslassung als „ohne testbare Funktion" hielt einer genaueren Lesung
  nicht stand. Innervation bei allen 4 neuen Items per Web-Recherche
  ergänzt (disclosed). M. serratus dorsalis cranialis/caudalis, Mm.
  intercostales externi/interni, M. retractor costae bleiben weiterhin
  bewusst ausgelassen (Quelle: keine eigenständig testbare Funktion) —
  **damit ist Hárrer Kap. 16.3 „Muskulatur" vollständig ausgewertet.**
  Alle 5 betroffenen Review-Seiten via Playwright verifiziert (5/5, 0
  Fehler). Danach Hárrer Kap. 17 „Neurotension" (S. 269–298) vollständig
  gelesen (04.10.2026) — eine Bestandsprüfung ergab, dass dieses Kapitel in
  einer früheren Session bereits sehr dicht ausgewertet worden war (u. a.
  `nervenwurzeln-bindegewebeschichten-nervenspannung`,
  `nervenblutversorgung-ischaemie-zeitfenster`,
  `meningen-membranoeses-system-dura-verbindungen`,
  `n-ischiadicus-verlauf-kein-piriformis-syndrom`,
  `hintergliedmasse-nerven-femoralis-saphenus-obturatorius`,
  `vordergliedmasse-nerven-radialis-medianus-ulnaris-verlauf`,
  `nervenkompression-druck-dehnungsschwellen`,
  `neurotensionsbehandlung-wirkprinzip-kontraindikationen`,
  `horner-syndrom-plexus-brachialis-laesionshoehe`) — inklusive der
  bewussten, im jeweiligen `sourceStatus` dokumentierten Entscheidung, die
  konkreten Behandlungstechniken (Duramobilisation/Slumptest-ASTE,
  die einzelnen Nerven-Neurotensionstests mit Griff/Ausführung sowie die
  drei Nervenmobilisationstechniken Annäherung/Längszug/Querverschiebung)
  NICHT zu übernehmen, da es sich um praktische Handgriffe für ausgebildete
  Therapeut:innen handelt, nicht um Nachschlage-Wissen für die
  Wissensbibliothek — diese Entscheidung wird hiermit bestätigt und gilt
  fort. Zwei echte Lücken blieben: 2 neue Einträge schließen sie
  (349 Einträge gesamt): `grenzstrang-sympathikus-organsegmente-
  rueckschluss` (Kap. 17.1.1 — Aufbau des Grenzstrangs mit den drei
  Halsganglien, die drei sympathischen Abgänge vom Ganglion stellatum, Nn.
  splanchnici major/minor mit Diaphragma-Engstelle, Ganglion impar, die
  physiotherapeutische Rückschluss-Logik von rezidivierenden
  LWS-Blockaden auf Organprobleme inkl. Kreuzband-OP-Beispiel, sowie der
  Parasympathikus-Verlauf über den N. vagus) und
  `spinalnerv-segmentaufbau-kibbler-hautfalte-beispiel` (Kap. 17.1.3 —
  Spinalnerv-Aufbau inkl. Ramus meningeus/N. von Luschka, sowie Hárrers
  konkretes klinisches Beispiel: Kibbler-Hautfalte am Segment C5 öffnet
  die Kette Dermatom/M. deltoideus → Myotom/M. cleidobrachialis → Gelenk/
  Akromion → Nerv/N. axillaris, plus die sympathische T2–7/T8–L4-
  Aufteilung von Vorder-/Hintergliedmaße am L4/5-Beispiel). Beide gezielt
  gegen bereits bestehende, verwandte Einträge abgegrenzt (Horner-Syndrom
  bzw. der allgemeinere segmentalreflektorische Komplex aus Kasper/
  Zohmann), um Dopplung zu vermeiden. **Damit ist Hárrer, Manuelle
  Therapie beim Hund (ISBN 978-3-13-245429-3), jetzt auch in Kap. 17
  vollständig ausgewertet — das gesamte Buch (Kap. 6–17) ist fachlich
  dicht erschöpft.** Beide Review-Seiten via Playwright verifiziert (2/2,
  0 Fehler).
- **Quellen-Diversifizierung (22.09.2026):** Auf Vanessas Wunsch wird ab jetzt
  nicht mehr nur aus Hárrer geschöpft. Bei Unklarheiten/Widersprüchen wird
  aktiv mit einer zweiten Quelle abgeglichen (siehe Toe-in/Toe-out-Fund
  unten), und für Themen, die in der vorhandenen Buch-Bibliothek fehlen oder
  lückenhaft sind, wird auch mit Internetquellen gearbeitet — aber nur mit
  erkennbar seriösen/fachlich verifizierten Portalen (peer-reviewte
  Übersichtsarbeiten via PubMed/PMC, veterinärmedizinische Fachgesellschaften
  wie ACVS, etablierte Kliniken wie VCA). **Technische Einschränkung:**
  WebFetch (direkter Volltextabruf einzelner URLs) ist in dieser
  Arbeitsumgebung durch eine Netzwerk-Egress-Beschränkung blockiert (betrifft
  praktisch alle getesteten Domains, auch z. B. Wikipedia). Nur WebSearch
  funktioniert und liefert dabei von einem Hilfsmodell zusammengefasste
  Kernaussagen der Suchtreffer, keinen geprüften Volltext. Web-gestützte
  Einträge kennzeichnen das explizit in ihrem `sourceStatus` statt es zu
  verschweigen.
- Anatomie-Sektion: 29 Items (biceps, iliopsoas, quadriceps, facettengelenke,
  huefte, + 2 weitere zu bereits bestehenden Fällen, plus zweiundzwanzig neue,
  fallunabhängige Items nach Hárrer: komplette Schulterflexoren-/
  Extensorengruppe (supraspinatus, infraspinatus, subscapularis,
  coracobrachialis, deltoideus, teres-major, teres-minor), komplette
  Ellbogenflexoren-/-extensorengruppe (brachialis, triceps-brachii,
  tensor-fasciae-antebrachii, anconeus), komplette Unterarmmuskulatur
  (supinator, brachioradialis, pronator-teres, pronator-quadratus,
  extensoren-karpus-zehen, flexoren-karpus-zehen) — die gesamte
  Vordergliedmaße von Schulter bis Karpus ist damit abgedeckt — sowie fünf
  neue Items zur Kniegelenksregion (biceps-femoris, semitendinosus, gracilis,
  sartorius, tensor-fasciae-latae)
- `quadriceps` (Anatomie-Item + gespiegelter Wissenseintrag): Status von
  „Quellenkandidat, blockiert" auf „Teilverifiziert" gehoben (Hárrer Kap. 8,
  S. 91–93 bestätigt Funktion/Ansatz; Vasti-Ursprungspunkte und Innervation
  N. femoralis bleiben im Original unbenannt und sind entsprechend
  gekennzeichnet)

## Backlog nach Quelle

Checkboxen = grobe Segmentierung, kein 1:1-Verhältnis zu späteren Einträgen (ein
Kapitel kann mehrere Einträge ergeben oder umgekehrt). `[ ]` offen, `[x]` erledigt,
`[~]` teilweise/in Arbeit.

### THERAPIE — Kraft, Wilfried (Hrsg.), Geriatrie bei Hund und Katze (Parey Verlag, 2. Aufl. 2003, VetCenter/Thieme)

Quelle liegt in Vanessas Google-Drive-Bibliothek (Ordner-ID
`1dsKHQd_GQUEfcu0VhHW1MzaxnD46XwKq`) als einzelne, nach Thema/Organsystem
benannte PDF-Dateien (kein Chunk-Schema). Vollständige Dateiliste (Stand
01.10.2026, zwei Ordnerseiten abgerufen):

- [x] „Massage als Metaphylaxe beim geriatrischen Patienten“ (Alexander):
  daraus `physiotherapie-geriatrischer-patient-altersveraenderungen-fahrplan`.
- [ ] „Einführung“, „Allgemeines“ — noch nicht gesichtet; am ehesten
  Kandidaten für grundlegende geriatrische Konzepte mit Querbezug zu
  Physiotherapie, vor Extraktion kurz gegenprüfen.
- [ ] „Grundsätze der Therapie von Krankheiten...“ (Dateiname abgeschnitten,
  vollständigen Titel beim Öffnen prüfen) — potenziell physiotherapie-
  relevant, Titel deutet auf allgemeine Therapieprinzipien hin.
- [ ] „Krankheitsprophylaxe“ — potenziell relevant für präventive
  Trainings-/Bewegungsinhalte, kurz prüfen.
- [ ] „Anästhesie beim alten Patienten“ — eher anästhesiologisch/internistisch,
  niedrige Priorität für Denkgangs Physiotherapie-Fokus.
- [ ] „Ernährung alter Hunde und Katzen“ — ernährungsmedizinisch, niedrige
  Priorität (Denkgang fokussiert nicht auf Ernährung).
- [ ] „Labordiagnostik – Einfluss des Alters...“ — laborchemisch, niedrige
  Priorität.
- [x] „Nervensystem“ (Andrea Tipold) und „Zirkulationsapparat“ (Wilfried
  Kraft) **direkt gegengeprüft (01.10.2026) — bewusst NICHT umgesetzt.**
  Beide Kapitel wurden auf physiotherapie-relevante Begriffe durchsucht
  (Physiotherapie, Krankengymnastik, Bewegungstherapie, Rehabilitation,
  Massage, Mobilität, Gangbild) — null Treffer in „Nervensystem“ (reine
  neurologische Differentialdiagnostik altersbedingter ZNS-Veränderungen
  nach Inzidenzstatistiken, ohne jeden Bewegungs-/Reha-Bezug). Auch
  „Zirkulationsapparat“ ist durchgehend internistische Kardiologie
  (Epidemiologie, Pathophysiologie, Diagnostik inkl. EKG-/Echokardiographie-
  Referenzwerttabellen, Medikamentendosierungen) — die einzige
  physiotherapie-nahe Aussage ist ein einzelner Satz zur „Reduktion der
  körperlichen Belastung, bei niederen Insuffizienzgraden jedoch keine
  absolute Ruhigstellung“, zu knapp für einen eigenständigen Eintrag.
  Damit ist die ursprüngliche Vermutung, diese beiden Kapitel könnten
  physiotherapie-relevante Inseln enthalten, widerlegt statt nur vermutet.
- [ ] Übrige organsystemische Kapitel (Harnsystem, Respirationstrakt,
  Endokrinologie, Gynäkologie, Leber, Exokrines Pankreas, Magen-Darm-Trakt,
  Haarkleid/Haut/Unterhaut, Krankheiten des Gehörgangs, Krankheiten der
  Augen, Tumorkrankheiten) — nach dem Befund bei Nervensystem/
  Zirkulationsapparat mit sehr geringer Erwartung an physiotherapie-
  relevante Inhalte; nur noch bei sehr gezieltem Bedarf einzeln prüfen,
  keine pauschale Vollsichtung mehr vorgesehen.
- [ ] Möglicherweise weitere, noch nicht aufgelistete Dateien im
  Drive-Ordner (nur zwei Seiten der Ordnerauflistung abgerufen) — bei
  Fortsetzung zuerst vollständige Dateiliste erneut abrufen.

### UNTERSUCHUNG/THERAPIE — Könneker, Henrike/Reiter, Ute, Osteopathie in der Kleintierpraxis (ISBN 978-3-8304-9174-3, Sonntag/Thieme, 2010)

Quelle liegt in Vanessas Google-Drive-Bibliothek (Ordner-ID
`1Q0EHXX11GL_0yoalAOVocsNFpMO2NMhD`) als PDF-Chunk-Serie (Präfix `o`,
`o.pdf` bis mindestens `o(34).pdf`, Chunks sind seitenfortlaufend). Autorinnen
sind Tierärztinnen mit zusätzlicher Physiotherapie- bzw. Osteopathieausbildung;
das Buch selbst benennt im Vorwort explizit fünf „osteopathische Prinzipien“
als theoretischen Unterbau — relevant für die Einordnung der später folgenden
Kapitel.

- [x] Kap. 1–2 (Osteopathische Denkweise, Geschichte, Techniken-Überblick,
  S. 2–11) **vollständig gelesen (Chunk o(2).pdf) und bewusst nicht
  extrahiert**: reine Ideen-/Philosophiegeschichte (Paracelsus, Descartes,
  Still-Biografie, Littlejohn-Schisma, kurze Geschichte der
  Veterinärosteopathie in Europa) ohne verifizierbare klinische/
  anatomische Einzelaussage — kein geeigneter Lehrinhalt für Denkgangs
  Ziel, klinisches Denken zu trainieren. Bestätigt die ursprüngliche
  Einschätzung.
- [x] Kap. 3 „Diagnostisches Basiswissen" (S. 12–25, Chunks o(3)–o(7).pdf)
  **vollständig gelesen und ausgewertet — 4 neue Einträge**, siehe Stand
  oben.
- [x] Kap. 4 „Der rote Faden der osteopathischen Behandlung" (S. 26–33)
  **vollständig gelesen und ausgewertet (Chunks o(7), o(11), o(13)–o(16).pdf;
  o(8)–o(10), o(12), o(15) sind Drive-interne Duplikate ohne neuen Inhalt) —
  3 neue Einträge**, siehe Stand oben
  (`vom-globalen-zum-spezifischen-behandlungsreihenfolge`,
  `verkettungsmuster-eskalationsstufen-unbehandelter-befund`,
  `therapieverlauf-warnsignale-strukturerkrankung-probebehandlung`). Bewusst
  nicht übernommen: der in 4.6.1–4.6.3 beschriebene Schritt des „globalen
  Monitorings" zur Differenzierung von myofaszialer (dreidimensionaler) und
  kraniosakraler (linearer) Rhythmik, da dieser Schritt die unabhängig nicht
  bestätigte Wahrnehmbarkeit eines eigenständigen kraniosakralen Rhythmus
  voraussetzt — die einzige bewusste Auslassung in diesem ansonsten
  vollständig ausgewerteten Kapitel.
- [x] Kap. 5–6 „Myofasziales Release" (S. 36–68): Kap. 5.1–5.2 (S. 36–43,
  Chunk o(19).pdf) gesichtet. Die Rezeptorphysiologie der Faszie (S. 42,
  interstitielle Rezeptoren, Ruffini-Endigungen, Perforanten-Trias) wurde
  als unstrittiger, eigenständiger Eintrag übernommen (siehe Stand oben,
  `faszie-sinnesorgan-mechanorezeptoren-perforanten-trias`). Die eigentliche
  MFR-Technik (5.2.1 Unwinding/Release, 5.3 Durchführung inkl. Point of
  Balance, funktioneller Stillpunkt, 5.3.1 segmentales AKR-Wirbelsäulen-
  Ruten-Release) wurde **bewusst nicht übernommen**: Die Technik setzt
  voraus, dass der Therapeut eine eigenständige, gewebeeigene
  „Entwindungsbewegung" während der Behandlung fühlt, die sich zu einem
  „Point of Balance" hin auflöst — dies ist dieselbe Art unabhängig nicht
  bestätigter Eigenwahrnehmung wie die bereits ausgelassene kraniosakrale
  Rhythmusprüfung und die Motilität (vgl. `somatische-dysfunktion-art-
  kriterienraster`), nur auf das myofasziale System angewendet. Danach
  Kap. 6.1 „Faszienzüge und Diaphragmen aus osteopathischer Sicht"
  (S. 46–48, Chunk o(20).pdf) gesichtet: Die anatomisch benennbaren fünf
  Diaphragmen des Körpers samt ihrer Durchtrittsstellen-Funktion wurden als
  eigenständiger Eintrag übernommen (siehe Stand oben,
  `diaphragmen-transversale-spannungszonen-koerper`); die im selben
  Abschnitt (6.1.1) behauptete Existenz exakt beschriebener Faszienketten-
  Verläufe (unter Verweis auf nicht eigenständig geprüfte Studien zu
  Faszienstruktur/Kollagenfasergehalt) wurde **bewusst nicht übernommen** —
  das Konzept der Faszienketten als durchgängiges, kraftübertragendes
  System ist osteopathische/manualtherapeutische Modellbildung (vergleichbar
  mit dem im humanmedizinischen Bereich bekannten, ebenfalls umstrittenen
  „Anatomy Trains"-Konzept) und wird hier nicht als gesicherte Anatomie
  dargestellt. Kap. 6.2–6.4 (S. 49–69, Prinzip/Durchführung des MFR in
  Ketten sowie dessen regionale Anwendung an Gliedmaßen, Thorax, Becken,
  Kraniozervikal inkl. Ohrzugtechnik) überflogen (Chunks o(22)–o(23).pdf):
  Bestätigt wie erwartet dieselbe Einordnung wie beim einfachen MFR —
  die Technik beruht wieder auf der Wahrnehmung eines Unwinding bis zum
  funktionellen Stillpunkt und wurde daher **bewusst nicht übernommen**.
  **Damit ist Kap. 5–6 für diese Session abgeschlossen** (3 neue Einträge:
  Faszienrezeptoren, Diaphragmen-Katalog; die eigentlichen MFR-Techniken
  bewusst ausgelassen).
- [x] **Kap. 7 „Osteoartikuläre Techniken" (S. 70–124) — wie erwartet die
  bislang ergiebigste Einzelquelle dieses Buches.** 7.1 „Grundlagen der
  osteoartikulären Osteopathie" (S. 70–79, Chunks o(23)–o(24).pdf)
  vollständig gelesen: 7.1.1 (Gegenüberstellung Osteopathie/Manuelle
  Medizin/Chiropraxis zu Gelenkdysfunktion, Terminologie-Warnung vor
  „Subluxation"/„Dislokation") **bewusst nicht als eigener Eintrag
  übernommen** — deckt sich inhaltlich zu stark mit dem bestehenden
  Eintrag `manuelle-medizin-drei-schulen-omt-chiropraxis-osteopathie`
  (Mai, andere Quelle), der dieselbe Drei-Schulen-Gegenüberstellung inkl.
  der Subluxations-/Blockade-Terminologiefrage bereits abdeckt. 7.1.3
  „Grundbegriffe der Gelenkmechanik" (S. 78f.) dagegen ergab **3 neue
  Einträge**, siehe Stand oben (`ausweichbewegungen-verfaelschte-
  gelenkuntersuchung`, `kennmuskeln-reflektorische-spannungszeichen-
  gelenkregion`, `joint-play-technik-traktionsstufen-wirbelsaeulen-
  limitation`). 7.2.2 „Techniken" (Traktion, Mobilisation, HVLA/
  Manipulation — Letztere wird im Buch nicht im Detail beschrieben, da
  Manipulationen explizit nicht Gegenstand dieses Buches sind) **bewusst
  nicht als eigener Eintrag übernommen** — die Traktionsstufen und das
  MFR/MFR-in-Ketten-Prinzip sind bereits in bestehenden Einträgen
  abgedeckt, und die Manipulations-/HVLA-Technik selbst wird von der
  Quelle nicht detailliert genug beschrieben, um sie eigenständig korrekt
  darzustellen. 7.2.3 „Untersuchungsgang" (Anamnese-Struktur, Adspektion,
  orientierende vs. gezielte Beweglichkeitsprüfung) ergab **1 weiteren
  neuen Eintrag**, siehe Stand oben
  (`anamnese-struktur-vier-kategorien-adspektion-ruhepositionen`). **Damit
  ist Kap. 7.1–7.2 vollständig ausgewertet.** 7.3.1 „Hintergliedmaßen" und
  der Anfang von 7.3.2 „Vordergliedmaßen" (S. 87–104, Chunk o(25).pdf:
  Hüftgelenk, Kniegelenk inkl. Schubladen-/Tibiakompressions-/
  Seitenbandtest, Verbindung der Unterschenkelknochen/proximales und
  distales Tibiofibulargelenk, Tarsalgelenk, Schultergelenk,
  Ellenbogengelenk) **gezielt gegen die bestehende Hárrer-/Koch-Fischer-
  Dokumentation geprüft und dabei durchgängige, inhaltlich enge
  Überschneidung festgestellt — bewusst keine neuen Einträge daraus.**
  Konkret geprüft und als bereits abgedeckt bestätigt: Kapselmuster/
  Endgefühl für Hüfte und Knie (vgl. `hueftgelenk-anatomie-rom-endgefuehl`
  und den Knie-Kapselmuster-Eintrag, beide Hárrer), Schubladentest/
  Tibiakompressionstest/Seitenbandtest (vgl. den Lachmann-/
  Tibiakompressions-/Apley-/McMurray-Eintrag und den eigenständigen
  Schubladentest-Eintrag, beide Hárrer), proximales Tibiofibulargelenk
  (bereits als eigener Hárrer-Eintrag vorhanden) sowie die Kennmuskeln
  M. iliopsoas/M. piriformis (bereits in der in dieser Session aus Kap. 7.1.3
  dieses Buches erstellten Kennmuskel-Tabelle enthalten). Die einzigen in
  diesem Abschnitt neuen Inhalte sind entweder reine Grifftechnik-
  Beschreibungen ohne eigenständigen Lehrwert (Handposition für Traktion/
  Joint Play) oder die bereits an anderer Stelle ausgeschlossene MFR-in-
  Ketten-/Release-Anleitung — beides bewusst nicht übernommen. Karpus
  (S. 104–107) ebenfalls geprüft: Endgefühle am Karpalgelenk bereits im
  bestehenden Hárrer-Eintrag dokumentiert — bewusst kein neuer Eintrag.
  **Fazit zu 7.3: überwiegend redundant zur bestehenden Hárrer-/Koch-
  Fischer-Dokumentation.** Die Zehengelenke beider Gliedmaßenpaare wurden
  von der Quelle nicht im Detail beschrieben (Verweis auf Synonymität zu
  den bereits behandelten Gelenken) und daher nicht gesondert geprüft —
  niedrige Priorität, da bei ähnlichem Muster wie die übrigen Gelenke zu
  rechnen ist. **Kap. 7.4 „Die Wirbelsäule" (S. 107–124) bestätigt wie
  erwartet eigenständigere Inhalte:** Der Einleitungsabschnitt (S. 107f.)
  ergab 1 neuen Eintrag, siehe Stand oben
  (`wirbelsaeule-kompensationsfaehigkeit-spaete-symptome-kein-
  kapselmuster`, `strukturschaedigung-wirbelsaeule-realistisches-
  therapieziel-ease`). **7.4.1 „Spezifische Anamnese und Adspektion"
  (S. 108–110, Chunk o(26).pdf) vollständig gelesen und ausgewertet — 2
  weitere neue Einträge**, siehe Stand oben
  (`wirbelsaeulenspezifische-anamnese-lokalisationshinweise`,
  `adspektion-wirbelsaeule-rute-taktgeber-warnsignal`). Damit hat dieser
  Abschnitt insgesamt 4 Einträge geliefert — deutlich ergiebiger als
  Kap. 7.3, wie erwartet. **7.4.2 „Untersuchung und Behandlung der
  Wirbelsäule" begonnen** (S. 110–115, Chunk o(26).pdf: HWS-Anatomie/
  Bewegungskopplung, HWS-Joint-Play-Grifftechniken für Kopfgelenke und
  C2–C7, BWS-Anatomie/Beweglichkeit, BWS-Ganganalyse/Beweglichkeits-
  prüfung über Vorder-/Hintergliedmaßenbewegung). Bestätigt wie bei
  Kap. 7.3: Die konkreten HWS-Joint-Play-Grifftechniken (Atlantookzipital-,
  Atlantoaxialgelenk, C2–C7) sind reine Grifftechnik-Beschreibungen ohne
  eigenständigen Lehrwert bzw. decken sich mit bestehenden Hárrer-HWS-
  Einträgen — **bewusst nicht übernommen.** Die BWS-Anatomie (antiklinaler
  Brustwirbel, Facettengelenk-Richtungswechsel, Dornfortsatz-Muster)
  ergab dagegen **1 neuen Eintrag**, siehe Stand oben
  (`antiklinaler-brustwirbel-landmarke-bewegungswechsel` — ergänzt den
  bestehenden Kasper/Zohmann-Eintrag `schmerzreise-hd-knie-sig-lsue-
  kaskade` um die Bewegungsfähigkeits-Regel und die Palpationslandkarte,
  statt dessen Schmerzkaskaden-Inhalt zu duplizieren). Danach BWS/LWS-
  Facettengelenktechnik (S. 115–119) überflogen: Joint-Play-Grifftechniken
  (Federn/Gleiten, Aufklappbarkeit der Facettengelenke) **bewusst nicht
  übernommen** (reine Technik), LWS-Kennmuskeln M. quadratus lumborum/
  M. longissimus **bereits durch die bestehende Kennmuskel-Tabelle aus
  Kap. 7.1.3 abgedeckt** (kein neuer Eintrag nötig). **2 weitere neue
  Einträge** aus denselben Seiten, siehe Stand oben
  (`divergenz-konvergenz-facettengelenke-wirbelsaeulenbewegung`: das
  Divergenz-/Konvergenz-Gleitmuster der Facettengelenke bei Flexion/
  Extension/Lateralflexion, allgemein für die gesamte Wirbelsäule gültig;
  `pumpbewegung-henkelbewegung-rippenatmung`: sternale Tragrippen mit
  Pumpbewegung vs. freie Atmungsrippen mit Henkelbewegung bei der
  Einatmung). Noch offen: der Rest von 7.4.2 (S. 119–124: LWS-Behandlung,
  SIG, Wirbelsäulen-Release-Techniken) — hier ist erneut auf
  Überschneidung mit den umfangreichen bestehenden LWS-/SIG-Einträgen aus
  Hárrer und Kasper/Zohmann zu achten, aber nach den bisherigen BWS-/LWS-
  Funden weiterhin mit vereinzelten eigenständigen Anatomie-/Biomechanik-
  Nuggets neben überwiegend redundanten Grifftechniken zu rechnen.
  **Update: Rest von 7.4.2 gelesen (S. 119–124, SIG und Schwanzwirbel,
  Chunk o(26).pdf) — gezielt gegen die bestehende, bereits sehr
  umfangreiche Hárrer-SIG-Dokumentation geprüft (u. a.
  `iliosakralgelenk-anatomie-symptome-ursachen`,
  `iliosakralgelenk-sakrum-ilium-laesion-beinlaenge`,
  `iliosakralgelenk-manuelle-untersuchung-provokationstests`, die bereits
  Nutation/Gegennutation, Joint Play, Provokationstests, die ⅗-Regel, Lig.
  sacrotuberale und reduziertes Rutenschwingen als ISG-Symptom abdecken).
  Ergebnis: durchgängige inhaltliche Überschneidung — bewusst keine neuen
  Einträge aus dem SIG- und Schwanzwirbel-Abschnitt.** Dasselbe gilt für
  die konkreten Joint-Play-Grifftechniken der Schwanzwirbel (reine
  Technik). **Kap. 7 „Osteoartikuläre Techniken" (S. 70–124) ist damit
  vollständig ausgewertet.** Bilanz: 12 neue Einträge aus diesem Kapitel
  insgesamt (Ausweichbewegungen, Kennmuskeln aus 7.1.3, Joint-Play-
  Technik/Traktionsstufen, Anamnese-Struktur, drei Einträge aus der
  Wirbelsäulen-Einleitung/-Anamnese in 7.4.1, antiklinaler Brustwirbel,
  Divergenz/Konvergenz, Pumpbewegung/Henkelbewegung aus 7.4.2) — bei
  bewusstem, dokumentiertem Verzicht auf die gesamten gelenkspezifischen
  Grifftechnik-Abschnitte für Hüfte, Knie, Tibiofibulargelenk, Tarsus,
  Schulter, Ellenbogen, Karpus, HWS, BWS/LWS-Facettengelenke, SIG und
  Schwanzwirbel (durchgängig entweder reine Technik ohne Lehrwert oder
  bereits durch Hárrer/Koch-Fischer bzw. durch Einträge aus Kap. 7.1.3
  dieser Quelle selbst abgedeckt) sowie auf 7.1.1/7.1.2 (Drei-Schulen-
  Gegenüberstellung, bereits durch `manuelle-medizin-drei-schulen-omt-
  chiropraxis-osteopathie` abgedeckt).
- [x] Kap. 8 „Viszerale Techniken" (S. 125–162): Stichprobenartig gelesen
  (S. 148–157, Chunk o(28).pdf, im Rahmen der Chunk-Navigation dieser
  Session) — **Befund: überwiegend disputierte osteopathische
  Organtheorie, bewusst nicht extrahiert.** Konkret gesichtet und als
  wenig ergiebig bewertet: Organmotilität/-mobilität als Exspir-/Inspir-
  Rhythmus (beruht wie die bereits ausgeschlossene MFR-Technik auf einer
  unabhängig nicht bestätigten Eigenwahrnehmung), viszerale Fixierung/
  Restriktion, Tensionsprüfung, viszerovertebrale Inhibitionstechnik —
  alles osteopathisches Erklärungsmodell ohne unabhängige Bestätigung.
  Die parasympathische Innervationstabelle der Bauchorgane (Tab. 8.4) ist
  zwar reine, unstrittige Anatomie, deckt sich aber mit Standard-
  Veterinäranatomie ohne Denkgang-spezifischen Mehrwert. Der Abschnitt
  zum enterischen Nervensystem (Bauchhirn, Serotoninproduktion, 90:10-
  Afferenzen-Verhältnis) ist wissenschaftlich solide, aber internistische
  Physiologie ohne Bezug zu Denkgangs physiotherapeutischem Fokus —
  bewusst ausgelassen, analog zur Handhabung anderer internistischer
  Inhalte (vgl. Kasper/Zohmann Kap. 5–8). Eine vollständige Durchsicht des
  restlichen Kapitels (S. 125–147, 158–162: Organtopografie, viszerales
  Faszienskelett, Organverbindung über embryonalen Ursprung) wurde auf
  Basis dieses Befunds nicht mehr für nötig gehalten.
- [ ] Kap. 9 „Kraniosakrale Techniken" (S. 163–223): primär respiratorischer
  Mechanismus, kraniosakraler Rhythmus, Stillpunkt, SSB/SSO-Technik. Die
  Grundannahme eines bei erwachsenen Säugetieren mit verknöcherten
  Schädelnähten weiterhin beweglichen/rhythmischen Schädels ist
  wissenschaftlich umstritten und nicht unabhängig bestätigt — deutlich
  strittiger als die übrigen Kapitel dieser Quelle. Falls überhaupt
  extrahiert, nur mit explizit gekennzeichnetem Theoriemodell-Status
  („nach osteopathischer Lehre", nicht als gesicherte Anatomie/Physiologie)
  und nur dort, wo ein eigenständiger klinisch-didaktischer Mehrwert für
  Denkgangs Physiotherapie-Fokus erkennbar ist — eher niedrige Priorität.
- [ ] Kap. 10 „Von der Technik zur Kunst" (S. 224–227): ganzheitliche
  Denkweise, eher philosophisch/zusammenfassend — niedrige Priorität.
- [ ] Anhang (Abkürzungen, Lage-/Richtungsbezeichnungen, Glossar, Literatur,
  Sachverzeichnis, S. 228–245) — kein Extraktionsziel.

### BIOMECHANIK/ANATOMIE — Welter-Böller, Barbara/Welter, Maximilian/John, Hedi, Faszientherapie beim Hund (ISBN 978-3-13-245372-2, Thieme, 2. Aufl. 2025)

Quelle liegt in Vanessas Google-Drive-Bibliothek (Ordner-ID
`1hP6DF8W9ft61bAIN9N6rXrKYw1L7aAv1`) als PDF-Chunk-Serie (Präfix `f`, `f.pdf`
bis mindestens `f(10).pdf`). Gezielt als Ergänzung zum bereits ausgewerteten
Faszienkapitel aus Könneker/Reiter gewählt, da dieses Buch vollständig
hundespezifisch und faszienspezifisch ist (nicht nur ein Teilkapitel eines
allgemeinen Osteopathie-Werks). Buchstruktur laut Inhaltsverzeichnis (aus
`f.pdf`):

- Teil 1: Kap. 1 Einleitung (S. 16)
- Teil 2 „Anatomie, Physiologie, Funktion und Pathologie der Faszien":
  Kap. 2 Anatomie und Physiologie der Faszien (S. 20–31), Kap. 3 Faszien als
  „Sinnesorgane" (S. 32–35), Kap. 4 Pathologie der Faszien (S. 36–37)
- Teil 3 „Befundungs- und Behandlungsmöglichkeiten": Kap. 5 Faszienbefundung
  (S. 40–51), Kap. 6 Behandlungsmöglichkeiten (S. 52–78)
- Teil 4 „Das parietale System": Kap. 7, fasziale Anatomie von Kopf/Hals/
  Rumpf und allen vier Gliedmaßen (S. 80–117)
- Teil 5 „Das viszerale System": Kap. 8–10, Organfaszien/„viszerales
  Gelenk"/viszerale Restriktionen (S. 118–153)
- Teil 6 „Das craniosacrale System": Kap. 11 (S. 156–159)
- Teil 7 Anhang: Kap. 12 Faszientraining beim Hund (S. 160–164)

Status:

- [x] Kap. 1 „Einleitung" (S. 16, Chunk f(1).pdf) **vollständig gelesen und
  bewusst nicht extrahiert**: motivierende Einleitung mit A.-T.-Still-
  Zitaten, keine überprüfbare Facheinzelaussage — gleiche Einordnung wie
  Könneker/Reiters Kap. 1–2.
- [x] Kap. 2 „Anatomie und Physiologie der Faszien" (S. 20–31, vollständig,
  Chunk f(2).pdf) **vollständig ausgewertet — 4 neue Einträge**, siehe Stand
  oben (Tensegrity-Modell, Katapulteffekt, Myofibroblasten, zweite
  Diaphragmen-Klassifikation).
- [x] Kap. 3 „Faszien als „Sinnesorgane"" (S. 32–35) **vollständig gelesen
  und ausgewertet (Chunks f(2)/f(3).pdf) — 5 neue Einträge**: 3.1
  Embodiment, 3.2.2–3.2.3 Vater-Pacini-/Ruffini-Vergleich, 3.2.4
  interstitielle Rezeptoren (Ergo-/Interozeption), 3.2.5 WDR-Programm,
  3.2.6 Schmerzreaktion der Faszie — siehe Stand oben für Details. 3.2.1
  (Golgi-Rezeptoren) bewusst nicht extrahiert (Duplikat des bestehenden
  Alexander/Baatz-Eintrags).
- [x] Kap. 4 „Pathologie der Faszien" (S. 36–38) **vollständig gelesen
  und ausgewertet (Chunks f(3)/f(4).pdf) — 3 neue Einträge insgesamt**:
  4.1 Faszienrestriktion (`faszienrestriktion-pathophysiologie-
  immobilisation-faszienkater`), 4.2 Faszien und Stress (als Ergänzung in
  den bestehenden Myofibroblasten-Eintrag eingearbeitet statt als
  eigener Eintrag), 4.3 Narbengewebe
  (`narbengewebe-funktionsverlust-agonist-antagonist-fehlkoordination`)
  und 4.4 Faszien und Alter
  (`faszienalterung-scherengittermuster-verfilzung-kompensation`). Damit
  ist Teil 2 des Buches („Anatomie, Physiologie, Funktion und Pathologie
  der Faszien", Kap. 2–4) vollständig ausgewertet.
- [x] Kap. 5 „Faszienbefundung" (S. 40–51) **vollständig gelesen und
  ausgewertet (Chunk f(5).pdf) — 5 neue Einträge**: Exterieur/
  Grundformen (`exterieur-faszienspannung-galopp-trab-kraftform`),
  Rutenhaltung
  (`rutenhaltung-sichelrute-ringelrute-faszienspannungsindikator`),
  Gangbildzeichen vorne/Seite/hinten
  (`gangbildanalyse-faszienzeichen-vorne-seite-hinten`), statische
  Adspektion/Haltungstests
  (`adspektion-haltungstests-faszienzeichen-statisch`) und
  Faszienpalpationstechnik
  (`faszienpalpation-technik-multidirektional-thixotropie`). Bestätigte
  Erwartung: hoher Lehrwert durch konkrete, beobachtbare
  Untersuchungskriterien. Bewusst nicht übernommen: die Schädelform-/
  Halshaltungs-Zusammenhänge mit dem „craniosacralen Rhythmus" (disputiert,
  siehe Stand oben) sowie die vollständige Einzelfaszien-Palpationsorte-
  Liste aus 5.3.1 (reine Technikanleitung).
- [x] Kap. 6 „Behandlungsmöglichkeiten" (S. 52–78) **vollständig gelesen
  und ausgewertet (Chunks f(5)/f(6).pdf) — 3 neue Einträge**: 6.1
  (Faszienreifung, 4.–9. Lebensmonat als sensible Phase) führt direkt zu
  den bereits umfassend vorhandenen FPC-/IPA-Einträgen
  (`ellbogengelenkdysplasie` u. a.) — keine erneute Extraktion. 6.2
  „Manuelle Faszientherapie" lieferte 2 neue Einträge (verzögerter
  Dehnungs-Hydrationseffekt
  `dehnung-faszienhydration-verzoegerter-rebound-effekt`, fasziale
  Piezoelektrizität/Flüssigkristalle
  `faszien-piezoelektrizitaet-fluessigkristalle-signalweiterleitung`);
  bewusst nicht übernommen: Myofasziales Release/Unwinding (6.2.3, 
  disputierte Eigenwahrnehmung, wie bei Könneker/Reiter), Ausstreichungen/
  Massage/Tapes (6.2.1/6.2.4/6.2.5, restatten bestehende WDR-/Ruffini-/
  Thixotropie-Mechanismen ohne Mehrwert), Gelenkkapselmobilisation (6.2.6,
  reine Technik) und die Narbenbehandlung (6.2.7, Wundheilungsphasen-
  Schema deckungsgleich mit bestehendem
  `wundheilungsphasen-zeitfenster-reha`). 6.3 „Spezielle Techniken" (Falx
  cerebri „Clear the Confusion", Meningen-Harmonisierung, Dura-
  Traktionen, Wirbelkörper-Shiften) **vollständig bewusst nicht
  extrahiert** — wie erwartet reine Technik bzw. explizit
  craniosacral-bezogen. 6.4 „Faszienregulation Extremitäten" und 6.5
  „Besondere Techniken Rumpf" (Faszienlift, Kiblersche Hautfalte,
  Bindegewebsmassage) **vollständig bewusst nicht extrahiert** — reine
  Technik bzw. Überschneidung mit bestehenden Kasper/Zohmann-Einträgen
  (inkl. identischer Elisabeth-Dicke-Historie). 6.6 „General Listening/
  Masterclass" (Listening, Motilität/„Faszientanz", Unwinding) **wie
  vorab erwartet vollständig bewusst nicht extrahiert** — explizit auf
  „craniale Welle nach Sutherland"/„primäre Atmung" verweisend, bestätigt
  die Vorab-Einordnung exakt. 6.7 „Diaphragmen": allgemeine
  Klassifikation dupliziert Kap. 2.6 (keine neue Extraktion), einzelne
  Diaphragmen-Behandlungen sind Unwinding-Technik (nicht übernommen),
  aber die anatomischen Grenzen von vorderer Thoraxapertur und Diaphragma
  pelvis waren neu
  (`vordere-thoraxapertur-diaphragma-pelvis-anatomische-grenzen`).
- [x] Kap. 7 „Das parietale System" (S. 80–117) **vollständig gelesen und
  ausgewertet (Chunk f(7).pdf) — 9 neue Einträge insgesamt, Details siehe
  Stand oben.** 7.1 „Kopf-, Hals- und Rumpffaszien" (1 neuer Eintrag plus
  1 Ergänzung eines bestehenden Eintrags): entgegen der ursprünglichen
  Erwartung „solide Anatomie" dominiert hier eine durchgehende
  Verknüpfung jeder Einzelfaszie mit craniosacraler Theorie
  (Sphenobasilargelenk, „energetische" Fernverbindungen, bis zu
  Verhaltensbehauptungen wie „Lernschwierigkeiten, Aggressionen" als
  Restriktionsfolge) — dieselbe Kategorie wie das bereits bei Könneker/
  Reiter ausgeschlossene Kap. 9. 7.2 „Vordergliedmaßen" (1 neuer Eintrag):
  wie erwartet deutlich weniger craniosacral-kontaminiert, da anatomisch
  weit vom Schädel entfernt. 7.3 „Beckengliedmaßen" (3 neue Einträge):
  ebenfalls wenig craniosacral-kontaminiert, dafür mit einem bewusst
  dokumentierten Faktencheck-Fund (Spannung zum bestehenden
  Piriformis-Syndrom-Eintrag, siehe Stand oben) sowie dem gegenintuitiven
  Laufband-/Aquatraining-Rehabilitationshinweis als wertvollstem Fund.
  Insgesamt bestätigt dieses Kapitel das bereits bei Kap. 5/6 etablierte
  Muster: Trotz erheblicher Craniosacral- und Technik-Kontamination sowie
  dichter Überschneidung mit Hárrer/Koch-Fischer finden sich bei
  sorgfältiger Prüfung immer wieder einzelne, klar abgrenzbare,
  eigenständig wertvolle Fakten.
- [x] Kap. 8–10 „Das viszerale System" (S. 118–153) **vollständig gelesen
  und ausgewertet (Chunks f(8)/f(9)/f(10).pdf) — 7 neue Einträge plus 2
  Ergänzungen bestehender Einträge insgesamt, Details siehe Stand oben.**
  Kap. 8 „Anatomie der Faszien im Bereich der Viszera" (2 neue Einträge):
  entgegen der eigenen Vorab-Einschätzung keine disputierte Organtheorie,
  sondern solide, auf König/Liebich gestützte Körperhöhlenanatomie. Kap.
  9 „Die Organe im Gesamtsystem der Faszien" (4 neue Einträge, inkl. 9.1
  „Das viszerale Gelenk"): die vorab erwartete Organmotilitätstheorie kam
  tatsächlich vor, betraf aber nur eine von drei beschriebenen
  Organbewegungsformen (Motrizität/Mobilität solide übernommen, nur
  Motilität ausgeschlossen); 9.3/9.4 (Faszienketten) lieferte keinen
  weiteren Eintrag (Wiederholung von Kap. 8.3). Kap. 10 „Typische
  Restriktionen im Bereich der Viszera" (1 neuer Eintrag plus 1
  Ergänzung): folgt für jedes Organ (Lunge, Magen, Leber, Dünndarm,
  Dickdarm, Harnblase, Niere, weibliche Geschlechtsorgane) demselben
  Muster aus solider Topografie, größtenteils unstrittiger, aber
  spekulativ in „Spannungsausbreitung denkbar“ eingekleideter
  Bänderanatomie, einer wenig trennscharfen, organübergreifend
  wiederholten Symptomliste und durchgehend disputierten
  Motilitäts-Behandlungsvorschlägen — einziger herausstechender,
  physiotherapeutisch relevanter Fund: die Diskrepanz zwischen
  äußerlich verheilter Kastrationsnarbe (10–14 Tage) und tatsächlicher
  Narbengewebe-Reifungszeit (ca. 3 Monate) bei sportlich geführten
  Hunden. Insgesamt bestätigt Teil 5 damit ein ähnliches Muster wie
  bereits Teil 4 (Kap. 5–7): hoher Anteil an Technik/Disputiertem, aber
  bei konsequenter Prüfung immer wieder einzelne, klar abgrenzbare
  Fakten von eigenständigem Wert.
- [x] Kap. 11 „Das craniosacrale System" (S. 156–159) **vollständig
  gelesen (Chunk f(11).pdf) — wie erwartet die strittigste Einzelquelle,
  bestätigt die Vorab-Einschätzung vollständig.** 11.1/11.2 (Intra-/
  Extracraniales Fasziensystem) beschreiben dieselben Meningen (Pia
  mater, Arachnoidea, Dura mater, Falx cerebri, Tentorium) und
  Fixationspunkte, die bereits ausführlich aus Hárrer (Kap. 17.1.6)
  extrahiert sind — keine neue Extraktion nötig, da Duplikat. Die
  „Indikationen"-Listen (Hydrocephalus, Hypophysenfunktionsstörung,
  „Verhaltensauffälligkeiten" wie Nervosität/Apathie/Lernschwierigkeiten
  als angebliche Folge von Kopfform-bedingtem Tentorium-Zug) sowie die
  Behandlungsvorschläge (Ear Pull, Clear the Confusion, Duratraktion)
  bewusst nicht übernommen — dieselbe disputierte craniosacrale Theorie
  wie bei Könneker/Reiter Kap. 9. Ein einziger werthaltiger Fund: Die
  Quelle bestätigt explizit, dass mehrere beim Menschen beschriebene
  Dura-Verbindungsstrukturen (Soulie-Fasern, Hofmann-Bänder, die
  Verbindung zu Mm. rectus capitis dorsalis minor/obliquus capitis
  caudalis und zum Lig. nuchae) beim Hund gezielt gesucht und nicht
  gefunden wurden — eine Verschärfung des bereits im bestehenden
  Hárrer-Eintrag dokumentierten „nicht bestätigt" zu einem expliziten
  Negativbefund, ergänzt in den bestehenden Eintrag
  `meningen-membranoeses-system-dura-verbindungen` statt als eigener
  Eintrag dupliziert.
- [x] Kap. 12 „Faszientraining beim Hund" (S. 160–164) **vollständig
  gelesen und ausgewertet (Chunk f(12).pdf) — 5 neue Einträge, das
  ergiebigste Einzelkapitel des gesamten Buches.** Die Vorab-Erwartung
  „hoher praktischer Lehrwert" bestätigt sich vollständig: Trainingsreiz-
  Regenerationszeitplan, die vier Adaptationsphasen samt Faszien-/Muskel-
  Asymmetrie, die 6+12-Wochen-Periodisierung mit Wolfswelpen-
  Reifungsmodell, die Trainingsprogressionsleiter samt
  Bodenstangen-Koordinationstest sowie die Serratus-ventralis-/Fascia-
  spinocostotransversalis-Trab-Biomechanik — siehe Stand oben für alle
  fünf neuen Einträge. Kap. 13 (Literaturverzeichnis) ist reine
  Quellenliste, kein Extraktionsziel. **Damit ist Welter-Böller/Welter/
  John, Faszientherapie beim Hund, als Quelle vollständig ausgewertet:
  37 neue Einträge aus Kap. 2–12.**

### PATHOLOGIE/BIOMECHANIK/UNTERSUCHUNG — Kasper/Zohmann, Ganzheitliche Schmerztherapie für Hund und Katze (ISBN 978-3-8304-9288-7, Sonntag/Thieme, 2. Aufl. 2011)

Quelle liegt in Vanessas Google-Drive-Bibliothek (Ordner-ID
`1ujBnaEPGqeLZquilC5vXpGSTS0n4Gy_J`, 42 PDF-Chunks `g.pdf`–`g(41).pdf`,
deutlich kleiner/unproblematischer als bei den meisten anderen Büchern
dieser Session). Vollständiges Inhaltsverzeichnis wurde erfasst. Kap. 2–3
wurden per delegiertem Subagenten als Verbatim-Text extrahiert
(Scratchpad-Datei `kap2-3-verbatim.txt`, nicht Teil des Repos — bei Bedarf
erneut aus denselben Chunks extrahieren) und Satz für Satz gelesen.

- [x] Kap. 2 „Schmerz – was ist das?" (S. 7–14): akuter/chronischer Schmerz,
  Nozizeption (Transduktion/Transmission/Modulation/Projektion/Perzeption),
  periphere/zentrale Sensibilisierung inkl. Hyperpathie als dritter
  Kategorie neben Hyperalgesie/Allodynie, Gate-Control-Theorie,
  deszendierende Schmerzhemmung, Chronifizierung/Schmerzgedächtnis — daraus
  `gate-control-theorie-deszendierende-schmerzhemmung`. Die übrigen
  Sensibilisierungs-Inhalte decken sich weitgehend mit dem bestehenden
  Kulpa/Alexander-Eintrag `periphere-zentrale-sensibilisierung-
  chronifizierung-schmerz` und wurden bewusst nicht dupliziert; Hyperpathie
  als dritte Kategorie könnte bei Gelegenheit noch als kleine Ergänzung in
  jenen bestehenden Eintrag eingearbeitet werden (bisher nicht gemacht).
- [x] Kap. 3.1–3.4 (Schmerzäußerungen, Missempfindung/Parästhesie,
  Schmerzgrade, Schmerzkrankheit, S. 15–20): daraus
  `schmerzgrade-lahmheitsgrade-kasper-zohmann-dreistufig`. Tab. 3.1
  (regionaler Schmerzsymptom-Katalog, als 3-spaltige Tabelle bei der
  Extraktion beschädigt) sowie die drei offenen Praxisbeobachtungen der
  Autoren (Linksseiten-Prävalenz Vordergliedmaßenlahmheit, felines
  Lebersegment-Muster, Kothbauer'sche Druckpunkt-Normalisierung) bewusst
  nicht in eigene Einträge umgesetzt — zu anekdotisch/spekulativ für einen
  eigenständigen Faktenbaustein, ggf. als klar gekennzeichnete
  Experten-Hypothese in einem künftigen Untersuchungs-Eintrag verwertbar.
- [x] Kap. 3.5–3.5.2 (Segmentalreflektorik, S. 20–25): daraus
  `segmentalreflektorischer-komplex-dermatom-myotom-sklerotom-viszerotom`.
- [x] Kap. 3.6 (Schmerzspirale, S. 25–27): daraus
  `schmerzspirale-circulus-vitiosus-pseudoradikulaeres-geschehen`.
- [x] Kap. 3.7 und 3.11 (Psychosomatik/Somatopsychik — exogene Faktoren,
  Schmerz als Heilungshindernis, S. 27–29 und S. 31): daraus
  `wesensveraenderung-stress-schmerz-wechselwirkung-locus-minoris-resistentiae`.
  Abschnitt 3.7.2 (Somatopsychik/endogene Faktoren) bewusst nicht gesondert
  umgesetzt — bietet keine über diesen Eintrag hinausgehende Substanz.
- [x] Kap. 3.9–3.10 (Schmerzen durch Fehlregulation, Schmerz als
  Leitsymptom, S. 29–31): daraus
  `schmerz-psychologische-dimensionen-fehlregulation`.
- [ ] Kap. 3.8 (Besitzerbezogene Schmerzen, S. 28–29): **bewusst nicht
  umgesetzt.** Enthält überwiegend spekulative, nicht evidenzbasierte
  Aussagen (energetische Bilanz zwischen Tier und Besitzer, Homöopathie-
  Miteinreibung „beide bekommen die gleiche Information eingerieben",
  Meridian-Spekulation zur Linksseiten-Prävalenz chronischer
  Vordergliedmaßenprobleme). Passt nicht zum evidenzbasierten
  physiotherapeutischen Anspruch von Denkgang — dauerhaft zurückgestellt,
  nicht nur aufgeschoben.
- [x] Kap. 3.12.1–3.12.2.2 (Die Schmerzreise — Gelenkbereich, Kniegelenk,
  Schonhaltung, sekundäre/tertiäre Folgen, S. 32–44): daraus
  `schmerzreise-hd-knie-sig-lsue-kaskade` und
  `schmerzreise-vorderextremitaet-tlue-kompensation-kaskade`. **Wichtig:**
  Diese Seiten weisen laut Subagenten-Extraktion eine dichte
  Zweispaltigkeit auf, die die lokale Absatzreihenfolge unsicher macht
  (Einzelsätze bleiben wortgetreu). Vor einer wörtlichen Zitation aus
  diesem Abschnitt das Original-PDF visuell gegenprüfen. Die
  Ellbogendysplasie-als-sekundäre-Folge-Hypothese (S. 43) wurde in
  `schmerzreise-vorderextremitaet-tlue-kompensation-kaskade` ausdrücklich
  als von den Autoren selbst benannte offene Hypothese gekennzeichnet, nicht
  als Fakt übernommen.
- [x] Kap. 3.12.3–3.12.4 (Keine klinisch inapparente HD,
  Schmerzvermeidungsstrategie bei angeborenen Gelenkerkrankungen,
  S. 45–47): daraus `hd-engrammbildung-schmerzvermeidungsstrategie-junghund`.
  Der am Seitenübergang 3.12.3/3.12.4 zweifach extrahierte Absatz
  (Übermotivation/soziale Isolation, vermutlich Spaltenreihenfolge-Artefakt)
  wurde nur einmal übernommen.
- [x] Kap. 3.12.5 (Schmerz-/Missempfindungsstrategie im Alter, S. 47–48):
  daraus `geriatrischer-schmerzpatient-funktions-struktur-aktualitaetsanalyse`
  (inkl. der aus 3.12.3 stammenden 80/20-Regel, thematisch hier eingeordnet).
- [~] Kap. 4 „Untersuchungsgang" (S. 49–124): vollständig per Subagent
  extrahiert und gelesen (1567 Zeilen, Scratchpad-Datei
  `kap4-untersuchungsgang-verbatim.txt`, nicht Teil des Repos — bei Bedarf
  erneut aus Chunks g(19)–g(27).pdf extrahieren). **Wichtig:** Durchgehend
  dichte Zweispaltigkeit auf vielen Seiten, vom Subagenten mit 20
  Einzel-[HINWEIS]-Markierungen versehen (u. a. Tab. 4.2–4.4
  Gangbild-Befundtabellen mit unsicherer Spaltenzuordnung Bedeutung/
  Bemerkungen; Tab. 4.6 Triggerpunkt-Übersichtstabelle stark durcheinander,
  der begleitende Fließtext 4.5.4.1 gilt als verlässlicher; mehrere
  rekonstruierte Absatzreihenfolgen an Kapitelübergängen) — vor wörtlicher
  Zitation Original-PDF gegenprüfen. Teilweise umgesetzt:
  - [x] 4.5.2 Hautfaltenpalpation nach Kibler (S. 76–78): daraus
    `kiblersche-hautfaltenpalpation-technik-vier-kriterien`.
  - [x] 4.5.3 Druckpunktpalpation nach Kothbauer (S. 78–82): daraus
    `druckpunktpalpation-kothbauer-technik-organzuordnung`.
  - [x] 4.5.4 Triggerpunktuntersuchung, Hintergliedmaßen-Trigger LG03/MA31/
    MA32/BL40 (S. 82–90): daraus
    `triggerpunktuntersuchung-kasper-zohmann-hintergliedmasse`.
  - [x] 4.5.4 Triggerpunktuntersuchung, Ellenbogen-/Schulter-Trigger (S. 90–101):
    daraus `triggerpunktuntersuchung-kasper-zohmann-vordergliedmasse`.
  - [x] 4.5.5 Muskelpalpationen, Tab. 4.7 Muskelketten (S. 101–104): daraus
    `muskelfunktionsketten-kasper-zohmann-diagnostisches-werkzeug`.
  - [x] 4.1.2 Geschlecht (S. 54–55): daraus
    `geschlechtsspezifische-segmentpraedispositionen-signalement`.
  - [x] 4.1.3–4.1.4 Alter, Größe und Gewicht (S. 53–54, 117–118): daraus
    `alter-gewicht-schmerzregulation-signalement`.
  - [x] 4.1.1 Rasse und Verwendungszweck (04.10.2026, S. 51–52, Chunk
    g(19).pdf): daraus `rasse-verwendungszweck-praedisposition-ueberforderung`
    — das Über-/Unterforderungskonzept, die Kritik an unkritischen
    Rassetabellen (HD-Vorröntgen-Verzerrung, länderspezifische
    Zuchtziel-Unterschiede), das Schonungsparadox in der Wachstumsphase
    (trainierte Dackel neigen eher zu Bandscheibenproblemen als
    unterforderte, adipöse), sowie die Kappenhüfte-Kritik (derselbe
    HD-Befund, kein eigenständiges Phänomen). **Damit ist Kap. 4.1
    „Nationale (Signalement)" dieser Quelle vollständig ausgewertet**
    (4.1.1–4.1.4 alle umgesetzt). Verifiziert via Playwright (1/1 Seite,
    0 Fehler).
  - [x] 4.2 Vorbericht/Anamnese (04.10.2026, S. 54–57, Chunk g(20).pdf): daraus
    `anamnese-fragetechnik-verlaufskontrolle-interpretationslogik` — das
    „Sonstiges?"-Prinzip, konkrete Frage-Schlussfolgerungs-Paare sowie die
    Verlaufsanamnese-Mahnung (pauschale Besitzeraussagen nicht unhinterfragt
    übernehmen). Gegen den bestehenden, strukturell orientierten Eintrag
    `anamnese-struktur-vier-kategorien-adspektion-ruhepositionen` (andere
    Quelle: Könneker/Reiter) abgegrenzt — unterschiedliche Ebenen, bewusst
    nicht dupliziert. Der abgebildete Anamnesebogen (Abb. 4.1) bewusst nicht
    übernommen (reines Formularbeispiel). Verifiziert via Playwright
    (1/1 Seite, 0 Fehler).
  - [x] 4.3.2.2 Gangarten — Schritt/Trab (S. 61–63): daraus
    `schritt-trab-knorpelernaehrung-synoviapumpe-biomechanik`.
  - [x] 4.3 Gangbildanalyse, Einleitung/Lahmheit-vs.-Bewegungsstörung-Definition
    (04.10.2026, S. 57f., Chunk g(20).pdf): daraus
    `lahmheit-bewegungsstoerung-begriffsklaerung-gangbildanalyse` — geprüft
    gegen `schmerzreise-hd-knie-sig-lsue-kaskade` und bewusst nicht
    dupliziert (unterschiedliche Ebenen: begriffliche/methodische Grundlage
    vs. konkreter biomechanischer Mechanismus). Verifiziert via Playwright
    (1/1 Seite, 0 Fehler).
  - [ ] 4.3 Gangbildanalyse, Rest (S. 58–74): LSÜ-Twist-Mechanismus und
    Kopfnicken-Mechanismus im Detail (Abb. 4.3/4.4), Passgang,
    Asymmetrie-Ursachenkatalog, Krallenschleifen-
    Differenzialdiagnose (orthopädisch vs. neurologisch), Tab. 4.2–4.4
    Gangbildbefund-Tabellen (vom Subagenten als stark spaltenverschränkt
    geflaggt, Bedeutung/Bemerkungen-Spalten zusammengefasst) — vorsichtig
    gegen bestehende Koch/Fischer- und Mai-Gangbildanalyse-Einträge
    abgrenzen (Stützbein-/Hangbeinlahmheit dort schon vorhanden).
  - [ ] 4.4 Adspektion in der Ruhe (S. 74–76): Checkliste orthopädischer/
    internistischer Befunde, Horner-Syndrom-Hinweis, Piloarrektion —
    teilweise Überschneidung mit bestehenden Adspektions-Einträgen zu
    prüfen.
  - [x] 4.5.6 Untersuchung der distalen Extremitäten (S. 104–107):
    Zehenarthrosen und rassetypische Sesambeinfrakturen (Rottweiler) —
    daraus `zehenarthrosen-sesambeinfrakturen-uebersehene-schmerzquellen`.
  - [x] 4.5.7 Funktionsprüfungen (S. 107–112), vollständig. Die SIG-Anatomie
    und Zohmann'sche Gelenkfunktionsprüfung waren bereits umgesetzt (siehe
    `sakroiliakalgelenk-anatomie-blockierung-zohmann-probe`). Am 04.10.2026
    ergänzt: 4.5.7.1 (S. 107f., Chunk g(23).pdf) als
    `vorderextremitaet-funktionspruefung-bizepsursprungssehnen-
    ueberdehnungstest` — der Streckungstest mit Halsfixierung, die
    Schulter-/Ellenbogen-Differenzierung, der Bizepsursprungssehnen-
    Überdehnungstest sowie die Beugungstest-Einschränkungen bei Schulter-
    und Sprunggelenk; explizit mit `muskelfunktionsketten-kasper-zohmann-
    diagnostisches-werkzeug` (dieselbe Trapezius-Infraspinatus-Trizeps-
    Kette) verknüpft. Verifiziert via Playwright (1/1 Seite, 0 Fehler).
  - [x] 4.6 Die Untersuchung der Katze (S. 112–114): daraus
    `katzenspezifische-schmerzdiagnostik-verdeckte-symptomatik`.
  - [ ] 4.7 Bildgebende Diagnostik (S. 114–116): CT-/MRI-/Arthroskopie-
    Indikationskatalog, Ultraschall-Indikationen für internistische
    Schmerzprozesse — eher generisches Radiologie-Grundwissen, Mehrwert vs.
    bestehende Einträge vorher prüfen.
  - [~] 4.8 Untersuchung/Untersuchungszeitpunkt zur HD-Frühdiagnostik
    (S. 116–122): Die radiologische Köppel-Methode (Os coxae quartum/OCQ)
    ist umgesetzt (siehe `hd-fruehdiagnostik-koeppel-os-coxae-quartum`).
    Noch offen: Der Ortolani-Test zu zwei rassenunabhängigen Zeitpunkten
    (8.–9. Lebenswoche Seitenlage vs. 4.–8. Lebensmonat Rückenlage) — der
    Ortolani-Test selbst ist bereits mehrfach aus Hárrer abgedeckt (u. a.
    `ortolani-test-hueftlaxitaet`, Bardens-Test-Eintrag), vor
    Eintragserstellung sorgfältig abgrenzen (nur die beiden konkreten
    Altersstufen-Protokolle wären ggf. neu genug für eine Ergänzung). Auch
    4.8.1–4.8.3 (Anamnese/Adspektion/Palpation bei Jungtieren, inkl. Tab. 4.8
    Gewichtsverteilung und dem Norberg-Olson-Winkel-Relativierungshinweis der
    Autoren) noch nicht ausgewertet.
  - [x] 4.9 „Dynamische" Diagnose (S. 122–123): daraus
    `dynamische-diagnose-anfangserfolgskurve-therapieerwartung`. **Damit ist
    Kap. 4 „Untersuchungsgang" inhaltlich vollständig ausgewertet**, bis auf
    die oben dokumentierten, bewusst zurückgestellten kleineren Restthemen
    (4.1.1 Rasse/Verwendungszweck, 4.2 Anamnese-Detailkatalog, 4.3-Rest,
    4.4 Adspektions-Checkliste, 4.5.7.1 Funktionsprüfungs-Technik,
    4.7 Bildgebende Diagnostik, 4.8-Rest).
- [x] **Kap. 5–8: stichprobenartig gesichtet (29.09.–01.10.2026), bewusst
  NICHT in Einträge umgesetzt — begründete Entscheidung, kein Zeitmangel.**
  Mehrere Chunks aus Kap. 5 „Methoden der Schmerztherapie" (g(28)–g(37).pdf,
  S. 125–214) sowie der Anfang von Kap. 7 „Schmerztherapie bei bestimmten
  Indikationen" (g(41).pdf, S. 304–306, Übergang zu Kap. 8 „Wesen und
  Organisation einer Schmerzambulanz") direkt gelesen, um die inhaltliche
  Ausrichtung einzuschätzen, bevor eine große Extraktion beauftragt wird
  (wie bei Kap. 2–4 praktiziert). Befund: Kap. 5.2 „Medikamentöse
  Schmerztherapie" besteht praktisch vollständig aus Dosierungstabellen
  (Opioide, NSAIDs, Lokalanästhetika, Kortikosteroide, α2-Agonisten,
  Ketamin, Tab. 5.1–5.5) — eindeutig außerhalb des Extraktionsziels
  (etablierte Session-Konvention: keine Medikamentendosierungen). Die
  übrigen Kap.-5-Abschnitte (5.3 Neuraltherapie-Grundlagen, 5.5/5.8
  Akupunktur, 5.9 Neuraltherapie-Technik, 5.10 Radiosynoviorthese, 5.11
  Homöopathie) sind überwiegend alternativmedizinische
  Modalitätenbeschreibungen ohne direkten Physiotherapie- oder
  klinisch-diagnostischen Bezug. Kap. 7 ist nach Stichprobe (Tab. 7.47
  „Analbeutel") als Indikationskatalog im festen Tabellenschema
  Leitsymptom/Therapieschlüssel/NT (Neuraltherapie-Punkte)/AP
  (Akupunkturpunkte)/PT/GI/HP (Homöopathie-Mittel mit Symptombild)/MED
  (Medikamente)/KOMB aufgebaut — strukturell ebenfalls primär
  Modalitäten-/Mittel-Auswahl statt klinisches Denken oder
  Physiotherapie-Technik. Kap. 8 ist reines Praxisorganisations-Kapitel
  (Schmerzambulanz-Einrichtung, Terminplanung, Preisgestaltung) ohne
  fachlichen Content. **Entscheidung:** Diese Kapitel passen nicht zum
  evidenzbasierten Physiotherapie-Trainings-Auftrag von Denkgang (MASTER-
  PROMPT) und werden bewusst nicht vollständig extrahiert — analog zur
  bereits getroffenen Entscheidung gegen Kap. 3.8 dieser Quelle. Falls eine
  künftige Session dennoch einzelne, klar physiotherapie-relevante Inseln
  darin vermutet (am ehesten: die mehrfach referenzierte Goldimplantation
  mit ihren Indikations-/Zeitpunkt-Kriterien, da in den bereits erstellten
  Kap.-2–4-Einträgen durchgehend als Therapieoption erwähnt, ohne dass ihre
  eigentlichen Kriterien bisher ausgewertet wurden), sollte das gezielt per
  Einzelkapitel-Lektüre geprüft werden, nicht per Vollextraktion. **Damit
  gilt Kasper/Zohmann, Ganzheitliche Schmerztherapie für Hund und Katze, für
  diese Session als abgeschlossen: 23 neue Wissensbibliothek-Einträge aus
  Kap. 2–4, Kap. 5–8 bewusst zurückgestellt.**

### PATHOLOGIE — VetCenter, Hundekrankheiten kompakt, „Erkrankungen des Bewegungsapparates" (121 S., vetcenter.thieme.de)

- [x] Erkrankungen der Bizepssehne (Tendinitis/Tendovaginitis/Ruptur/Luxation)
- [x] Ellbogengelenkdysplasie (IPA, FPC, OCD, Inkongruenz)
- [x] Osteomyelitis (Kapitelanfang, S. 1 ff.) — inhaltlich abgedeckt über
      Koch/Fischer Kap. 8.2.6 (`osteomyelitis-hund`, 24.09.2026) statt aus
      dieser Quelle separat gelesen; VetCenters eigene Version bleibt
      ungelesen, gilt aber als nicht mehr prioritär
- [x] Hüftgelenkluxation (traumatisch) + Ehmer-Schlinge — jetzt über
      Koch/Fischer Kap. 8.3.10 abgedeckt (`hueftgelenkluxation-hund`,
      24.09.2026), inkl. der hier geforderten klaren Abgrenzung zur HD
      (plötzliches Trauma vs. langsam entstandene Gelenklockerheit)
- [x] **Immunvermittelte Gelenkerkrankungen (28.09.2026).** Als
      `immunvermittelte-gelenkerkrankungen-subtypen-hund` umgesetzt: 15
      benannte Subtypen (reaktive Polyarthritis Typ I–IV, SLE,
      impfassoziiert, Polyarthritis/Polymyositis, PA/M, Polyarteriitis
      nodosa, Akita-Inu-Arthritis, Sjögren-Syndrom, Shar-Pei-Fieber,
      medikamenteninduziert, juvenile Cellulitis/Arthritis,
      Lymphoplasmazelluläre Gonitis) in einer Vergleichstabelle mit
      Rasse-/Altersprädisposition, Zusatzbefunden und Prognose. Ergänzt
      den bestehenden Eintrag `polyarthritis-hund` (Koch/Fischer, Kap.
      8.2.5), der nur die allgemeine Klassifikation und die idiopathische
      Polyarthritis als häufigste Form behandelt, um die granulare
      Differenzierung — bewusst nicht dupliziert. Die im Original
      verwendete Abkürzung „IPA" für die Typ-I–IV-Klassifikation wurde
      bewusst NICHT übernommen und stattdessen ausgeschrieben, da „IPA"
      in Denkgang bereits für „Isolierter Processus Anconaeus" (ED)
      etabliert ist — genau die Verwechslungsgefahr, vor der dieser
      Backlog-Eintrag ursprünglich gewarnt hatte.
- [x] **Osteochondrosis dissecans (OCD) im Schultergelenk (28.09.2026).**
      Als `osteochondrosis-dissecans-schultergelenk-hund` umgesetzt:
      Pathogenese (Gelenkmaus-Entstehung, Bizepssehnenscheiden-
      Beteiligung), Rasseprädispositionen, altersabhängiges
      Therapieschema (konservativ < 6 Mon., sonst operativ) und Prognose.
      Eigenständiges Krankheitsbild, klar abgegrenzt von der Erwähnung
      als ED-Differential und von der allgemeinen OC/OCD-Pathogenese aus
      Koch/Fischer bzw. Hohmann.
- [x] **Kontraktur des M. infraspinatus (28.09.2026).** Als
      `infraspinatuskontraktur-jagdhund-gliedmassenfehlhaltung` umgesetzt:
      typischer Jagdhund-Vorbericht, die namensgebende
      Gliedmaßenfehlhaltung (Detailbeschreibung der Rotations-/
      Beugestellungen), die sekundäre Inaktivitätsatrophie von
      M. supraspinatus/M. deltoideus, Differentialdiagnose (Luxatio
      antebrachii lateralis), Tenotomie-Therapie und die bleibende
      Infraspinatus-Atrophie trotz günstiger Prognose. Erweitert die
      bisher nur einzeilige `clinicalRelevance`-Erwähnung im
      Anatomie-Item `infraspinatus` (Hárrer) um das vollständige
      Krankheitsbild — verknüpft via `relatedAnatomyIds`.
- [x] Generalisierte Skeletterkrankungen: Osteochondrose (OC), Panostitis,
      hypertrophe Osteodystrophie — inhaltlich abgedeckt über Koch/Fischer
      Kap. 8.2.1–8.2.4 (24.09.2026, siehe eigener Abschnitt oben) statt aus
      VetCenters eigenem Kapitel 8.2 separat gelesen
- [x] Hüftgelenkdysplasie (HD) als eigenständiges Krankheitsbild — jetzt
      ausführlich über Koch/Fischer Kap. 8.3.9 abgedeckt
      (`hueftgelenkdysplasie-und-coxarthrose`, 24.09.2026): Definition,
      Genetik/Heritabilität, Rasseunterschiede, Einfluss von Fütterung/
      Aufzucht, Übergang zur Coxarthrose, radiologische Zeichen
      (Norbergwinkel, Inkongruenz etc.) und vollständige Therapiepalette
      (TPO/DPO, Hüftprothese, Femurkopfresektion, PIN-Operation). Kein
      FCI/OFA-Röntgenscoring-Schema enthalten — bleibt offen, falls
      benötigt.
- [x] Kreuzbandriss / vordere Kreuzbandruptur — zentral für Fall Bruno; die
      klinischen Tests (Lachmann, Tibiakompression, Apley, McMurray) sind über
      Hárrer Kap. 8, S. 85–87 als eigener Untersuchung-Wissenseintrag
      abgedeckt (`kreuzband-meniskus-tests`); das Krankheitsbild selbst
      (Ätiologie, Risikofaktoren, Partial-/Komplettruptur, Meniskusbeteiligung,
      Therapieoptionen, Prognose) jetzt als `kreuzbandriss-krankheitsbild` über
      Web-Recherche (peer-reviewte Übersichtsarbeiten via PubMed/PMC, ACVS,
      VCA) ergänzt — bewusst NICHT aus Hárrer, sondern als erste Quelle
      außerhalb der Buch-Bibliothek, wie von Vanessa gewünscht (Quellenmix,
      Cross-Check). Volltextzugriff (WebFetch) war in dieser Umgebung
      technisch blockiert; die Aussagen stammen aus konvergenten
      Websuche-Zusammenfassungen mehrerer unabhängiger Fachquellen, siehe
      `sourceStatus` des Eintrags für Details/Einschränkungen.
- [x] Patellaluxation — als `patellaluxation-krankheitsbild` umgesetzt.
      Kombination aus Buch- und Web-Quelle: Alexander/Baatz/Jaggy/Kathmann
      (VetCenter, „Pathophysiologie des Bewegungsapparates") liefert das
      Achsenabweichungs-Konzept und die Quadrizeps-Zugmechanik bei medialer
      Luxation sowie einen guten Differentialdiagnostik-Hinweis
      (Patellaluxation + Borreliose gleichzeitig möglich) — aber keine
      Grad-Einteilung. Putnam-Klassifikation (Grad I–IV), mediale vs. laterale
      Luxation mit ihren jeweiligen Deformitäten, Prävalenz und Therapie
      stammen aus konvergenter Websuche (ACVS, Merck Vet Manual, OFA,
      PubMed/PMC, vettimes) — die beiden Quellenarten bestätigen sich
      gegenseitig im Kernmechanismus (Achsenabweichung → veränderte
      Quadrizeps-Zugrichtung → Patella-Fehlführung).
- [x] **Zwei weitere Ellbogendysplasie-Komponenten + Radiuskurvensyndrom
      (28.09.2026, S. 57–64).** Beim Weiterlesen gefunden und umgesetzt:
      `inkomplette-ossifikation-condylus-humeri-hund` (IOCH — inkl. der
      wichtigen Praxiskonsequenz, bei Diagnose immer auch den
      kontralateralen Ellbogen zu röntgen, da eine Fraktur nach
      Bagatelltrauma drohen kann, sowie der teils prophylaktischen
      Zugschrauben-Versorgung bei Spanieln),
      `metaplasie-beugesehnen-medialer-epicondylus-mehb-hund` (MEHB —
      seltene Sehnen-Knochen-Metaplasie mit unspezifischem klinischem
      Bild) und `distractio-cubiti-radius-curvus-carpus-valgus-hund`
      (Short-Radius- vs. Short-Ulna-Syndrom als zwei entgegengesetzte
      Deformitätsmuster je nach betroffener Wachstumsfuge — löst den
      Hárrer-Backlog-Punkt „Radiuskurvensyndrom" auf, siehe
      PATHOLOGIE-Hárrer-Abschnitt oben). Damit ist von den in Kap.
      „Ellbogengelenkdysplasie" benannten Einzelkomponenten (IPA, FPC,
      OCD, IOCH, MEHB, DC) nur noch keine offen.
- [x] **Karpalgelenkluxation und -hyperextension (28.09.2026, S. 71–75).**
      Als ein gemeinsamer Eintrag `karpalgelenk-luxation-hyperextension-hund`
      umgesetzt (nicht zwei getrennte, da beide zum selben plantigraden
      „Bärentatzen"-Gangbild führen und sich gegenseitig als
      Differentialdiagnose bedingen): Luxation als akutes
      Hochenergietrauma vs. Hyperextension als Folge einer
      Grunderkrankung oder — bei Shelties/Collies — als eigenständige
      chronisch-degenerative „Niederbrechen"-Erkrankung ganz ohne
      Trauma. Betrifft das Karpalgelenk (Vordergliedmaße) und ist damit
      klar vom bestehenden `tarsus-erkrankungen-hund`-Eintrag
      (Sprunggelenk, Hintergliedmaße) abzugrenzen, obwohl beide zum
      gleichen Gangbild führen können. Die dort ebenfalls genannte
      Tendopathie des M. abductor pollicis longus ist über den
      bestehenden Eintrag `tendovaginitis-abductor-pollicis-longus`
      bereits abgedeckt und wurde nicht dupliziert.
- [x] **Femurkopfluxation, Ergänzung (28.09.2026, S. 78–80).** Als
      `femurkopfluxation-kaudodorsal-zeitfenster-begleitverletzungen`
      umgesetzt — bewusst als gezielte Ergänzung, nicht als Duplikat des
      bestehenden `hueftgelenkluxation-hund` (Koch/Fischer): die dort
      fehlende dritte Luxationsrichtung (kaudodorsal, mit
      spiegelverkehrtem Rotationsmuster und N.-ischiadicus-Risiko), die
      Häufigkeit von Begleitverletzungen (60–80 %, davon 50 %
      Thoraxtrauma — nie isoliert behandeln), eine ergänzende
      Linien-Palpationstechnik sowie das Vier-Tage-Zeitfenster für eine
      noch erfolgversprechende geschlossene Reposition.
      **Technische Grenze überwunden — Lösung für künftige Fälle dieser
      Art dokumentiert:** Die über `read_file_content` gespeicherte
      Drive-Extraktion (`vetcenter-bewegungsapparat.txt`, 106.693
      Zeichen) brach mitten im Therapie-Abschnitt der Femurkopfluxation
      ab, obwohl die Quelldatei 121 Seiten umfasst — dasselbe
      Zeichenlimit-Muster wie zuvor bei kl(4).pdf. Lösung: Statt erneut
      `read_file_content` zu versuchen, wurde die PDF-Datei direkt per
      `download_file_content` (base64) heruntergeladen und lokal mit
      `pdftotext -layout` vollständig zu Text konvertiert (280.920
      Zeichen statt 106.693 — keine Kappung). Diese Methode empfiehlt
      sich künftig direkt, sobald `read_file_content` bei einer PDF-Datei
      eine Kappungswarnung zeigt, statt Zeit mit wiederholten
      `read_file_content`-Versuchen zu verlieren.
      Die vollständige lokale Extraktion zeigte: Es gibt in dieser Quelle
      **keine** Fraktur-, Tumor- oder Wirbelsäulenabschnitte — die
      Vermutung dazu war falsch. Die Datei ist ein reiner Katalog
      namentlich benannter Gelenk-/Gliedmaßenkrankheitsbilder und endet
      nach der Femurkopfluxation (jetzt vollständig ausgewertet, inkl.
      der zuvor fehlenden Erfolgsquoten [geschlossen ~50 %, offen
      ~85–90 %] und Nachsorge-Details, in den bestehenden Eintrag
      nachträglich ergänzt) mit einem letzten, bisher komplett fehlenden
      Thema: **Quadrizepskontraktur nach distaler Femurfraktur** — als
      `quadrizepskontraktur-nach-femurfraktur-physiotherapie-kontraindiziert`
      umgesetzt. Fachlich besonders relevant für die Zielgruppe: Die
      Quelle warnt ausdrücklich, dass Physiotherapie/forciertes Dehnen
      bei bereits eingetretener Kontraktur nicht nur wirkungslos, sondern
      gefährlich ist (Risiko erneuter Muskelrisse oder Frakturen) — ein
      Fall, in dem die Grenzen der eigenen Modalität aktiv erkannt werden
      müssen.
      **Damit ist die Quelldatei „Erkrankungen des Bewegungsapparates"
      (121 S.) vollständig ausgewertet.**

### PATHOLOGIE/GRUNDLAGEN — Alexander C. (Hrsg.), „Physikalische Therapie für Kleintiere" (Parey Verlag, 2. Auflage 2003, VetCenter/Thieme)

**Korrektur (29.09.2026):** Dieses Buch ist umfangreicher als bisher hier vermerkt.
Es besteht aus mehreren eigenständigen, jeweils von einem Fachautor verfassten
Kapitel-Dateien im Drive-Ordner — bisher wurde nur die Kapitel-Datei
„Pathophysiologie des Bewegungsapparates" (Alexander/Baatz/Jaggy/Kathmann)
gesichtet, und auch die nur teilweise. Fünf weitere Kapitel-Dateien waren bis
heute ungelesen: „Physiologische Grundlagen", „Schmerz und Nozizeption" (H.-U.
Kulpa), „Physiotechnik", „Indikationen" und „Krankengymnastik (Physiotherapie)"
sowie „Massage" — alle direkt einschlägig für Denkgangs Physiotherapie-Fokus.
Die frühere Einschätzung „inhaltlich weitgehend ausgeschöpft" (s. u.) war
verfrüht und wird hiermit zurückgenommen.

#### Kapitel „Pathophysiologie des Bewegungsapparates" (Alexander/Baatz/Jaggy/Kathmann)

Digitale Kapitelansicht ohne Seitenzahlen — Zitation nach Abschnittsüberschrift.

- [x] Achsenabweichung (Varus/Valgus, Patellaluxation als Beispiel,
      Quadrizeps-Zugmechanik) — für `patellaluxation-krankheitsbild` genutzt
- [x] Myogelose, Muskelhartspann, Muskelkontraktur, Muskeltrauma,
      Muskelzerrung, Weichteilrheumatismus — komplette Differenzierung als
      `muskulaere-weichteilbefunde-differenzieren` umgesetzt
- [x] Pathologie der Gelenke, Allgemeines/Begriffsbestimmung + Pathogenese
      der Knorpelschäden (Arthrose vs. Arthritis, IL-1/TNF-α-Kaskade,
      Schmerz-Schonhaltungs-Kreislauf, Grenzen der Physiotherapie) — als
      `arthrose-pathogenese-circulus-vitiosus` umgesetzt
- [x] Die vier mechanischen Hauptursachen der Arthrose (Inkongruenz,
      Achsenabweichung, Instabilität, neuromuskuläre Imbalance) mit
      angeboren/erworben-Beispielen und HD-Kausalkette — als
      `arthrose-mechanische-hauptursachen` umgesetzt. Instabilität und
      neuromuskuläre Imbalance damit als Kategorie abgedeckt, aber nur mit
      den kurzen Stichpunkt-Beispielen aus dieser Quelle — keine eigene
      Tiefenrecherche zu z. B. Ehlers-Danlos beim Hund oder zerebellärer
      Ataxie gemacht.
- [x] Abschnitt „Nervensystem" (A. Jaggy/I. Kathmann), Grundbegriffe und
      Lokalisationslogik: Lähmungs-/Ataxie-/Dysmetrie-Terminologie (als
      `laehmung-ataxie-dysmetrie-grundbegriffe`), UMN/OMN-Läsionslokalisation
      inkl. Warnhinweis zur international abweichenden UMN-Abkürzung (als
      `umn-omn-laesionslokalisation`), Mono-/Polyneuropathie-Lokalisation
      (als `mono-polyneuropathie-lokalisation`) und die Seddon-Klassifikation
      von Nervenverletzungen (als `seddon-klassifikation-nervenverletzungen`,
      verknüpft mit den bereits vorhandenen Neurotension-Einträgen). Bewusst
      NICHT übernommen: die anschließend besprochenen Einzelkrankheiten
      (feline Aortenthrombose/Kippfenstersyndrom, Coonhound-Paralyse,
      diabetische Polyneuropathie) — katzen- bzw. seltenheitsspezifisch,
      passen eher in eine spätere gezielte Ergänzung als in Grundlagen-Einträge.
- [ ] Rest dieser Kapitel-Datei (Literaturverzeichnis zeigt u. a. Abschnitte zu
      Polyneuropathien, Klinischer Pathophysiologie, Canine Rehabilitation)
      noch nicht systematisch gesichtet.

#### Kapitel „Schmerz und Nozizeption" (H.-U. Kulpa)

- [x] **Vollständig gelesen und ausgewertet (29.09.2026).** Kapitel per
      `download_file_content` + lokaler `pdftotext`-Extraktion vollständig
      abgerufen (61.367 Zeichen, keine Kappung). 3 neue Einträge:
      `schmerz-akut-chronisch-iasp-schmerzkrankheit` (PATHOLOGIE: IASP-
      Schmerzdefinition, Abgrenzung Nozizeption/Schmerz, akuter vs.
      chronischer/protrahierter/chronifizierter Schmerz mit IASP-Zeitgrenzen,
      Chronifizierung als eigenständige „Schmerzkrankheit", Grenzen rein
      somatischer Therapie), `schmerzverhalten-erkennen-tierartunterschiede`
      (UNTERSUCHUNG: allgemeine klinische Schmerzanzeichen sowie
      speziesspezifisches akutes Schmerzverhalten nach Hellebrekers,
      Hund/Katze im Kontrast, „stumm leidende" Großtiere, Warmblüter/
      Kaltblüter- und Rasseunterschiede) und
      `periphere-zentrale-sensibilisierung-chronifizierung-schmerz`
      (PATHOLOGIE: periphere und zentrale Sensibilisierung/Wind-up als
      Mechanismus der Chronifizierung, Hyperalgesie/Allodynie, klinische
      Schmerzformen-Terminologie Dolor projectus/translatus, Anaesthesia
      dolorosa, Zentraler Schmerz, Kausalgie — verknüpft mit der
      Reflextherapie-Wirkung von Massage/Akupunktur/TENS über Head-Zonen).
      Bewusst nicht übernommen: einzelne Rezeptor-/Ionenkanal-Details (VR1,
      TTX-resistente Natriumkanäle, NMDA-Subtyp-Kaskaden) — für den
      Praxisbezug der Wissensbibliothek zu tief, ohne fachlichen
      Mehrwert für Tierphysiotherapeut:innen in Ausbildung.

#### Kapitel „Physiologische Grundlagen" (C.-S. Alexander/G. Baatz)

- [x] **Vollständig gelesen und ausgewertet (29.09.2026).** Kapitel per
      `download_file_content` + lokaler `pdftotext`-Extraktion vollständig
      abgerufen (84.375 Zeichen, keine Kappung; 1.605 Zeilen, Abschnitte
      Muskulatur/Gelenke/Nervensystem). 3 neue Einträge, alle aus dem
      Nervensystem-Abschnitt (G. Baatz):
      `propriozeption-rezeptortypen-muskelspindel-golgi-sehnenorgan`
      (BIOMECHANIK: die drei propriozeptiven Teilsinne, Muskelspindel [Ia,
      aktivierend, misst Länge] vs. Golgi-Sehnenorgan [Ib, hemmend, misst
      Spannung] vs. Vater-Pacini-/Golgi-Mazzoni-Körperchen als
      Mechanorezeptoren, 2°-Messgenauigkeit — ergänzt gezielt den
      bestehenden Eintrag `gelenkkapsel-vier-mechanorezeptortypen`, ohne ihn
      zu duplizieren), `monosynaptische-polysynaptische-reflexe-sherrington-
      gesetze` (UNTERSUCHUNG: Eigenreflex vs. Fremdreflex, Sherrington-
      Gesetze Summation/Irradiation/Sensitivierung, reziproke
      Agonist-/Antagonist-Innervation, physiologischer vs. pathologischer
      gekreuzter Streckreflex als Verwechslungsfalle — ergänzt die
      bestehenden Reflex-Technik-Einträge um die physiologische
      Klassifikationsebene) und `muskeltonus-gamma-loop-halte-stellreflexe`
      (BIOMECHANIK: Ruhetonus, γ-Loop-Mechanismus mit Angst als
      Tonus-Störfaktor bei der Untersuchung, Halte-/Stellreflexe,
      statische/statokinetische Reflexe, Aufrichtreaktion als Kettenreflex
      — ergänzt den bestehenden klinischen Aufrichtreaktions-Test-Eintrag
      um die zugrunde liegende Physiologie). Bewusst nicht übernommen: der
      Muskulatur-Abschnitt (Muskelfasertypen, Kontraktionsmechanismus,
      Muskelstoffwechsel) — inhaltlich bereits über Hohmann/Mai/Hárrer
      hinreichend abgedeckt, keine neuen Fakten; der Gelenke-Abschnitt
      (Gelenkknorpel/-kapsel/Synovia) — Doppelarbeit zu Hohmann Kap. 5.2/5.3.

#### Kapitel „Physiotechnik" (C.-S. Alexander)

- [x] **Vollständig gelesen und ausgewertet (29.09.2026).** Kapitel per
      `download_file_content` + lokaler `pdftotext`-Extraktion vollständig
      abgerufen (43.692 Zeichen, keine Kappung; 977 Zeilen). Deckt nur
      Elektrotherapie und Lichttherapie (Phototherapie) ab — die im
      einleitenden Absatz angekündigten Abschnitte zu therapeutischem
      Ultraschall, Laser- und Magnetfeldanwendungen kommen in dieser
      Kapitel-Datei tatsächlich NICHT vor (per Grep bestätigt), obwohl sie
      inhaltlich zur „Physiotechnik" zählen würden — vermutlich in einer
      anderen, hier nicht vorliegenden Kapitel-Datei behandelt oder im
      Buch nicht ausgeführt. 4 neue Einträge, alle THERAPIE, alle aus dem
      Elektrotherapie-Abschnitt: `elektrotherapie-grundlagen-stromformen-
      galvanisation` (physikalische Grundprinzipien: Rheobase,
      Akkommodation, Refraktärzeit; Galvanisation mit Kathoden-/
      Anodenwirkung; Iontophorese), `tens-traebert-reizstrom-
      schmerztherapie-mechanismus` (TENS-Wirkmechanismus über Aβ-Fasern
      und Hinterhorn-Interneuron-Blockade, Endorphinausschüttung;
      Ultrareizstrom nach Träbert; gemeinsamer Gewöhnungseffekt mit
      Behandlungspausen-Notwendigkeit), `elektrostimulation-muskelatrophie-
      exponentialstrom-irrtum` (Typ-I-/Typ-II-faserspezifische
      Elektrostimulation zur Atrophieprophylaxe; der historisch empfohlene,
      heute als potenziell schädlich geltende Exponentialstrom als
      Lehrbeispiel für überholte Therapieempfehlungen — thematisch
      anschlussfähig an den Bruno-Fall) und
      `hochfrequenztherapie-diathermie-metallimplantat-gefahr`
      (Kurzwelle/Dezimeterwelle/Mikrowelle im Vergleich, explizite
      Metallimplantat-/Herzschrittmacher-Verbrennungsgefahr mit
      5-Meter-Sicherheitsabstand — besonders relevant bei postoperativen
      Implantat-Patienten wie nach TPLO). Bewusst nicht übernommen: der
      Licht-/Chromotherapie-Abschnitt (überwiegend humanmedizinische,
      chronobiologische Evidenz mit nur vager, unbelegter
      veterinärmedizinischer Übertragbarkeit) sowie die Diadynamischen
      Ströme nach Bernard und das Interferenzstromverfahren nach Nemec
      (gerätespezifische Detailtiefe ohne zusätzlichen Praxis-Mehrwert
      gegenüber den bereits abgedeckten TENS-/Träbert-/Galvanisations-
      Grundprinzipien).

#### Kapitel „Indikationen" (C.-S. Alexander/A. Jaggy/I. Kathmann) — TEILWEISE ausgewertet

- [x] **Abschnitte „Schmerzpatient" und „Geriatriepatient" gelesen und
      ausgewertet (29.09.2026).** Kapitel per `download_file_content` +
      lokaler `pdftotext`-Extraktion vollständig abgerufen (121.417 Zeichen,
      keine Kappung; 2.312 Zeilen — mit Abstand das umfangreichste bisher
      gefundene Einzelkapitel dieses Buches). 3 neue Einträge:
      `gewebeheilungsphasen-rehabilitation-zeitfenster-technik` (THERAPIE),
      `schmerzpatient-klassifikation-vier-schmerztypen-therapiewahl`
      (THERAPIE) und `geriatrischer-hund-alterungsmechanismen-
      rassenabhaengige-lebenserwartung` (PATHOLOGIE) — Details siehe
      Stand-Abschnitt oben.
- [x] **Neurologische Indikationen — Übersichtstabelle umgesetzt (29.09.2026).**
      Tab. 13.7 „Neurologische Indikationen für Physiotherapie" als neuer
      Eintrag `neurologische-rehabilitation-uebersicht-nach-laehmungsmuster`
      (THERAPIE) umgesetzt.
- [x] **Rückenmarksinfarkt gegengelesen — Quellenkonflikt gefunden und
      dokumentiert (29.09.2026).** Diese Quelle (2003) widerspricht dem
      bestehenden, neueren Eintrag `rueckenmarksinfarkt-
      fibrokartilaginoese-embolie` (Koch/Fischer 2019) in zwei Punkten:
      Altersprädisposition (alt vs. jungadult) und Kortikosteroidnutzen
      (empfohlen vs. explizit wirkungslos). Beide widersprüchlichen
      Angaben wurden NICHT übernommen. Stattdessen wurde der bestehende
      Eintrag um zwei unstrittige neue Fakten ergänzt: den
      Grau-Substanz-Mechanismus der Tiefensensibilitäts-Erhaltung sowie
      ein konkretes physiotherapeutisches Rehabilitationsprotokoll
      (Frequenz/Dauer der Maßnahmen, ø 2 Wochen Rehabilitationsdauer).
      Der Konflikt ist vollständig im `sourceStatus` dieses Eintrags
      dokumentiert.
- [x] **Kippfenstersyndrom geprüft und bewusst übersprungen (29.09.2026):**
      katzenspezifisch (feline Aortenthrombose kombiniert mit Klemmtrauma),
      konsistent mit der bereits früher getroffenen Ausschluss-Entscheidung
      für dieses Krankheitsbild in einer anderen Quelle.
- [x] **Akute idiopathische Polyradikuloneuritis umgesetzt (29.09.2026)** als
      `akute-idiopathische-polyradikuloneuritis-aufsteigende-laehmung`
      (PATHOLOGIE) — die häufigste Polyneuropathie des Hundes, bisher ohne
      eigenen Eintrag. Kortikosteroidgabe aus der Quelle bewusst nicht
      übernommen (ungeprüft gegen neuere Literatur).
- [x] **Diskushernie/-prolaps gelesen, bewusst nicht umgesetzt (29.09.2026):**
      hoher Duplikationsgrad mit den bereits bestehenden, ausführlichen
      Einträgen zum thorakolumbalen/zervikalen Bandscheibenvorfall und zur
      Hansen-I/II-Klassifikation (VetCenter) bestätigt.
- [x] **Restliche Kapitel-Abschnitte vollständig ausgewertet (29.09.2026),
      nach demselben zweistufigen Prüfschema (Duplikation UND Widerspruch):**
      Kopftrauma als komplett neues Themengebiet identifiziert (VetCenter
      deckt nur Wirbelsäule/Rückenmark ab) → neuer Eintrag
      `kopftrauma-coup-contrecoup-verzoegerte-symptome` (PATHOLOGIE).
      Wirbelfraktur/-luxation/-subluxation → neuer Eintrag
      `wirbelfraktur-luxation-uebergangszonen-verletzungsklassifikation`
      (PATHOLOGIE), gezielt um die anatomischen Prädilektionsstellen und
      die Rückenmarksverletzungs-Klassifikation ergänzt, ohne die
      bestehenden VetCenter-Diagnostik-/Prognose-Einträge zu duplizieren.
      Spinalnerventrauma → zwei neue Einträge
      (`periphere-nervenlaehmungen-radialis-supraskapularis-ischiadikus`,
      `physiotherapie-periphere-nervenlaehmung-protokoll-entscheidungspunkte`)
      sowie eine Ergänzung von `horner-syndrom-plexus-brachialis-
      laesionshoehe` um die Avulsions-/Amputations-Prognostik. Atlantoaxiale
      Subluxation und degenerative Myelopathie waren beide bereits als
      eigene Einträge vorhanden — hier wurden nur die jeweils fehlenden
      Rehabilitationsprotokolle ergänzt, keine neuen Einträge angelegt.
      Gelenkfehlstellung (Tab. 13.12) → neuer Eintrag
      `gelenkfehlstellung-kaskade-zweigelenkige-muskeln-hueft-knie`
      (BIOMECHANIK). Der allgemeine „Arthrosepatient"-Abschnitt (Tab. 13.6)
      bleibt als kleinerer, nicht sicherheitsrelevanter Restpunkt
      offen (teilweise bereits in
      `schmerzpatient-klassifikation-vier-schmerztypen-therapiewahl`
      verwertet).

**Damit ist das Indikationen-Kapitel (Kap. 13) vollständig ausgewertet** —
bis auf den kleinen Arthrosepatient-Restpunkt (Tab. 13.6) und die bewusst
ausgeschlossenen Themen Kippfenstersyndrom (katzenspezifisch) und
Diskushernie/-prolaps (zu stark duplizierend).

#### Kapitel „Krankengymnastik (Physiotherapie) — Ausgewählte Techniken" (C.-S. Alexander)

- [x] **Vollständig gelesen und ausgewertet (29.09.2026).** Kapitel per
      `download_file_content` + lokaler `pdftotext`-Extraktion vollständig
      abgerufen (37.610 Zeichen, keine Kappung; 760 Zeilen). 4 neue
      THERAPIE-Einträge: `bewegungstherapie-taxonomie-passiv-aktiv-resistiv`
      (passiv/aktiv-assistiv/aktiv/resistiv/isometrisch mit offener/
      geschlossener kinematischer Kette und gemeinsamer Kontraindikations-
      liste), `rita-reflexinduziertes-training-alexander-fremdreflexe`
      (das von der Buchautorin selbst entwickelte RITA-Verfahren, direkte
      praktische Anwendung der bereits bestehenden Sherrington-Gesetze),
      `pnf-technik-artspezifische-bewegungsmuster-terminologiefalle`
      (PNF-Grundwerkzeuge Stretch/Widerstand/Approximation plus der
      konkreten Artspezifitätsfalle bei der Vorderextremitäten-Vorführung:
      Extension beim Hund vs. Flexion beim Menschen, wegen
      entgegengesetzter Bizeps-Funktionsdefinition) und
      `dehnen-versus-stretching-risikoprofile-technik` (die fachliche
      Abgrenzung zwischen therapeutenpflichtigem Dehnen — überschreitet
      bewusst das Bewegungsausmaß — und tierhaltertauglichem Stretching —
      bleibt innerhalb des Bewegungsausmaßes — samt der beiden
      Aktive-Inhibition-Mechanismen postisometrische Relaxation und
      Antagonistenhemmung). Bewusst nicht übernommen: die
      Bobath-/Vojta-Verfahren (im Original selbst als für die
      Veterinärmedizin nicht direkt übertragbar beschrieben, ohne
      konkrete Anlehnungstechnik) sowie die vollständige PNF-Pattern-
      Tabelle mit allen Diagonalen für Vorder- und Hintergliedmaße
      (zu techniklastig für einen Nachschlage-Eintrag, das Kernprinzip
      — die Terminologiefalle — ist im neuen Eintrag abgedeckt).

#### Kapitel „Massage" (C.-S. Alexander) — **letztes Kapitel dieses Buches**

- [x] **Vollständig gelesen und ausgewertet (29.09.2026).** Kapitel per
      `download_file_content` + lokaler `pdftotext`-Extraktion vollständig
      abgerufen (47.063 Zeichen, keine Kappung; 1.081 Zeilen). 4 neue
      THERAPIE-Einträge: `massagewirkung-durchblutung-schmerz-muskeltonus`
      (Kapillarwerte nach Nöcker 1980, vier Schmerzlinderungsmechanismen,
      gegenläufiger Muskeltonus-Effekt), `klassische-massagegriffe-fuenf-
      handgriffe-hoffman` (Effleurage/Petrissage/Friktion/Vibration/
      Tapotement, ergänzt die bestehende Tuina-Vergleichstabelle),
      `bindegewebsmassage-dicke-schliack-wolff-reflexzonentherapie`
      (reflextherapeutisches Verfahren für innere Organe) und
      `kolonmassage-vogler-obstipation-fuenf-kolonpunkte` (schließt direkt
      an den bestehenden Geriatrie-Eintrag an). **Backlog für eine mögliche
      spätere Ergänzung:** Japanische Stäbchenmassage (Triggerpunkt-/
      Narbenbehandlung mit Holzstäbchen), Bürstenmassage/Trockenbürsten
      sowie Narbenmassage nach Thomsen (Schiebe-/Abhebetechnik) — drei im
      Kapitel beschriebene Sonderformen, bewusst zurückgestellt, da ihr
      Alleinstellungswert gegenüber den bereits umgesetzten Verfahren
      (Bindegewebsmassage, Kolonmassage, klassische Griffe) geringer
      eingeschätzt wurde; ihre Rohdaten liegen aber bereits vollständig
      extrahiert in der Kapitel-Datei vor (Zeilen 923–1034 von
      `massage.txt`, siehe Scratchpad dieser Session) und könnten bei
      Bedarf ohne erneuten Drive-Zugriff nachgezogen werden.

**Damit ist Alexander (Hrsg.), Physikalische Therapie für Kleintiere
(2. Auflage, Parey Verlag, 2003), vollständig ausgewertet — alle 7
Kapitel-Dateien** (Pathophysiologie des Bewegungsapparates, Schmerz und
Nozizeption, Physiologische Grundlagen, Physiotechnik, Indikationen
[bis auf die neurologische Rehabilitations-Sektion und Gelenkfehlstellung,
siehe oben], Krankengymnastik, Massage).

  (Drive-Ordner `1qVtWpp31AzfZL1HQp8a7qJssmwL8r71a`)

### PATHOLOGIE — VetCenter, „Wirbelsäulenerkrankungen" (eigene Datei, 43 Web-Seiten, vetcenter.thieme.de)

- [x] **Erster Abschnitt „Rückenmarkkompressionen durch Wirbelsäulenläsionen"
      (Ätiologie/Pathogenese/Symptome/Lokalisationsbestimmung/
      Differentialdiagnose, S. 1–9 von 43) gelesen und ausgewertet
      (25.09.2026).** Drei neue Wissenseinträge: die Sekundärschädigungs-
      kaskade bei plötzlicher vs. langsamer Kompression (Elektrolytshift →
      Blutung → Ischämie → Ödem → Myelomalazie → Sekundärschäden, Circulus
      vitiosus bei Unterschreiten der Mindestdurchblutung), die
      krankheitsunabhängige Lokalisationslogik (charakteristische
      Ausfallreihenfolge Propriozeption→Motorik→Oberflächensensibilität→
      Tiefenschmerz, OMN- vs. UMN-Lokalisation inkl. der zeitlich
      begrenzten Blasenfunktionsstörung) sowie eine Differentialdiagnosen-
      Liste jenseits des Bandscheibenvorfalls (Diskospondylitis, infektiöse
      Myelitiden, Polyradikuloneuritis/Coonhound-Paralysis, Myasthenia
      gravis u. a.). Bewusst nicht extrahiert: die allgemeine Fünf-Grade-
      Prognoseskala mit Erfolgsraten (teilweise redundant zur bereits
      bestehenden krankheitsspezifischen Fünf-Grade-Skala beim
      thorakolumbalen Bandscheibenvorfall) sowie sämtliche Medikamenten-
      Dosierungsangaben (Prednisolon, NSAID, Protonenpumpenblocker mit
      mg/kg-Angaben) — Letzteres bewusst außerhalb des Nachschlage-Scopes
      für eine physiotherapeutisch ausgerichtete Plattform (analog zur
      bereits dokumentierten Nutraceutical-Dosierungs-Auslassung bei Mai).
      Verifiziert via Playwright (3/3 Seiten, 0 Fehler).
- [x] **„Diskopathie/Diskushernie/Diskusprolaps" (S. 10–15 von 43) gelesen
      und ausgewertet (25.09.2026).** Weitestgehend redundant zu den
      bestehenden Bandscheibenvorfall-Einträgen (Hansen-Mechanismus,
      Grading, Symptome, Diagnosesicherung) — aber ein neuer, eigenständiger
      Wissenseintrag zu drei genuin neuen Details: die explizite
      Hansen-I/II-Klassifikation mit Altersangaben (4–6 J. vs. 6–10 J.),
      der anatomische Schutzmechanismus des Lig. intercapitale gegen
      Diskusprolaps zwischen Th1 und Th10 (Rippenkopfgelenk-zu-
      Rippenkopfgelenk-Verspannung) sowie das Nervenwurzelzeichen als
      Fehldeutungsfalle (zervikaler Bandscheibenvorfall kann sich als
      isolierte Vorderbeinlahmheit äußern). Verifiziert via Playwright
      (1/1 Seite, 0 Fehler).
- [x] **„Luxationen, Frakturen, Frakturluxationen/Traumata der
      Wirbelsäule" (S. 18–24 von 43) gelesen und ausgewertet (25.09.2026,
      mit verschärfter Paraphrasier-Disziplin — siehe unten).** Zwei neue
      UNTERSUCHUNG-Wissenseinträge: der spinale Schock als reversibler,
      morphologisch nicht fassbarer Funktionsausfall in der ersten ein bis
      zwei Stunden nach Trauma (verfälscht die Früheinschätzung) plus die
      gegenseitige Maskierung von oberer und unterer
      Motoneuronschädigung, sowie die Grenzen des Röntgenbilds nach einem
      Trauma (reine Momentaufnahme, spontan reponierte Luxationen bleiben
      unsichtbar, Narkose-bedingtes Risiko durch Wegfall des
      stabilisierenden Muskeltonus). Bewusst nicht extrahiert: die
      Notfallmedikation (Methylprednisolon, Opioid-Dosierungen) und die
      allgemeinen Pflegemaßnahmen bei Festliegen (bereits über bestehende
      Rückenmarkkompressions-Einträge abgedeckt). Verifiziert via
      Playwright (2/2 Seiten, 0 Fehler).
      **Hinweis zur Arbeitsweise:** Ab diesem Abschnitt wurde die
      Paraphrasierung bewusst verschärft (auf Vanessas Nachfrage, ob zu
      nah an der Quellformulierung gearbeitet wird) — statt Stichpunkte
      der Quelle nur mit Bindewörtern zu Fließtext zu verketten, wird jetzt
      stärker unabhängig synthetisiert: eigene Reihenfolge der Argumente,
      eigene Einstiegsfrage/-these pro Abschnitt, Fakten unverändert.
- [x] **„Prognose" (Wirbelsäulentrauma) und „Atlantoaxiale Subluxation
      beim Hund" (S. 27–29 von 43) gelesen und ausgewertet (25.09.2026).**
      Zwei weitere neue Wissenseinträge, ebenfalls mit der verschärften
      Paraphrasier-Disziplin verfasst: die Acht-Stunden-Prognosegrenze bei
      Tiefenschmerzverlust nach Trauma (drei Zeitfenster: erhalten/akut
      erloschen/über 8 h erloschen → günstig/vorsichtig/ungünstig), sowie
      die atlantoaxiale Subluxation mit ihrer entwicklungsbedingten
      Ätiologie (Denshypoplasie/-fraktur/unvollständiger Epiphysenschluss
      plus Bandinstabilität), Rasseprädisposition (Chihuahua, Pekinese,
      Zwergpudel), der Altersstatistik (>50 % Symptome im 1. Lebensjahr)
      und dem diagnostischen Flexionsaufnahme-Zeichen (2- bis 3-facher
      Abstand Dornfortsatz–Atlasbogen). Bewusst ausgelassen: die
      chirurgischen Stabilisierungstechniken und Verbandsmaterialien
      (S. 25–27, rein operativ-technisch, außerhalb des
      physiotherapeutischen Nachschlage-Scopes). Ergänzt den bestehenden
      Eintrag `obere-hws-instabilitaet-dens-warnsignale` (Hárrer,
      manualtherapeutische Warnsignale) um die entwicklungsbedingte
      Ätiologie und Diagnosesicherung, ohne dessen Inhalte zu wiederholen.
      Verifiziert via Playwright (2/2 Seiten, 0 Fehler).
- [x] **„Kompressionssyndrom der kaudalen Halswirbelsäule (Wobbler-
      Syndrom)" (S. 31–34 von 43) gelesen und ausgewertet (25.09.2026).**
      Ein neuer, dicht synthetisierter Wissenseintrag zu den zwei
      rassetypischen Entstehungswegen (Deutsche Dogge: Wirbeldeformation/
      Malartikulation durch Genetik/Überernährung, selten echte
      Rückenmarkkompression; Dobermann: Spondylolisthesis-Instabilität
      plus Typ-II-Bandscheibenschäden), der Symptomprogression von hinten
      nach vorne (initiale Hintergliedmaßen-Ataxie → später auch
      Vordergliedmaßen-Parese mit Nervenwurzelzeichen bei Halsüberstreckung)
      sowie dem Konzept der rein dynamischen, nur unter Stressaufnahme
      sichtbaren Rückenmarkkompression (Lig. longitudinale dorsale/Lig.
      flavum/Typ-II-Vorfall). Ergänzt den bestehenden Kurzbefund im
      Übersichtseintrag `neurologische-erkrankungen-rueckenmark-periphere-
      nerven` sowie das Nervenwurzelzeichen-Konzept aus dem Hansen-
      Klassifikations-Eintrag um die krankheitsspezifische Tiefe, ohne
      diese zu wiederholen. Bewusst ausgelassen: die chirurgischen
      Stabilisierungstechniken (Platten, Cages, Ankylosierungsverfahren)
      als rein operativ-technischer Inhalt außerhalb des Nachschlage-
      Scopes. Verifiziert via Playwright (1/1 Seite, 0 Fehler).
- [x] **„Instabilität im Lumbosakralbereich, Stenose des
      Lumbosakralkanals, Cauda-equina-Kompressions-Syndrom" (S. 35–38 von
      43) gelesen und ausgewertet (25.09.2026).** Weitestgehend redundant
      zum bereits sehr ausführlichen bestehenden DLSS-Eintrag (Koch/
      Fischer: Ätiologie, Klinik, Pseudohyperreflexie, Bildgebung,
      Therapie mit Erfolgsraten) — aber ein neuer, eigenständiger Eintrag
      zu vier genuin neuen Aspekten: die orthopädische
      Verwechslungsgefahr bei foraminaler Nervenwurzelkompression
      (Lahmheitsbild täuschend ähnlich einer Kreuzbandläsion, zusätzliche
      Differentialdiagnosen Coxarthrose/Kniegelenkserkrankungen/
      Prostataerkrankungen), der ischämische Verstärkungsmechanismus bei
      gleichzeitiger Gefäßkompression, Automutilation von Rute/Perineum/
      Präputium als mögliches, leicht als Verhaltensproblem
      fehlgedeutetes Symptom, sowie die spezifischen Grenzen von Röntgen-
      und Myelographie-Diagnostik (u. a. Foraminostenose myelographisch
      nicht darstellbar — gerade bei der orthopädisch täuschenden
      Verlaufsform). Verweist auf den bestehenden Eintrag zur allgemeinen
      Sekundärschädigungskaskade statt den Ischämie-Mechanismus zu
      wiederholen. Verifiziert via Playwright (1/1 Seite, 0 Fehler).
- [x] **„Diskospondylitis, Osteomyelitis der Wirbelkörper (Spondylitis)"
      (S. 39–43 von 43, letzter Abschnitt) gelesen und ausgewertet
      (25.09.2026) — damit ist diese Quelldatei vollständig (43/43
      Webseiten) ausgewertet.** Ein neuer Eintrag zur hämatogenen
      Infektionsroute (meist Staph. intermedius/aureus, seltener
      Aspergillose/Gräsergrannen/iatrogen) mit dem didaktisch wichtigen
      Punkt, dass die eigentliche Infektionsquelle meist außerhalb der
      Wirbelsäule liegt (Harnapparat-/Periodont-/Herzklappen-/
      Hautinfektionen als Prädisposition), der Differentialdiagnose
      gegen Spondylosis deformans und Wirbelneoplasien, sowie der
      zeitlichen Verzögerung der Röntgenbefunde (10–14 Tage) gegenüber
      CT/MRT. Medikamentendosierungen bewusst nicht übernommen.
      **Korrektur einer früheren Roadmap-Annahme:** Die im allerersten
      Seitenabschnitt der Datei genannten Stichworte „Wirbelmissbildungen,
      Exostosenbildung, Tumoren, Rückenmarködem, Zysten der
      Rückenmarkhäute, Abszesse der Wirbelsäule" sind dort nur als
      Ätiologie-Aufzählung möglicher Kompressionsursachen genannt — die
      Datei enthält dazu KEINE eigenen, vertiefenden Abschnitte mehr
      (das komplette Inhaltsverzeichnis der Datei ist: allgemeine
      Rückenmarkkompression, Diskushernien, Wirbelfrakturen/-luxationen/
      Trauma, Atlantoaxiale Subluxation, Wobbler-Syndrom, Lumbosakrale
      Instabilität/Cauda equina, Diskospondylitis/Spondylitis — dann
      Quellenangabe/Ende). Diese Themen bleiben als potenzielle
      Anatomie-/Pathologie-Lücken für eine andere Quelle vorgemerkt,
      sind aber nicht mehr Teil des VetCenter-Fortsetzungspunkts.
      Verifiziert via Playwright (1/1 Seite, 0 Fehler). **VetCenter
      „Wirbelsäulenerkrankungen" ist damit als Quelle abgeschlossen.**

### PATHOLOGIE — Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3)

- [x] Toe-in/Toe-out als Nervenkompressions-Warnzeichen (M. supinator/N.
      radialis, M. pronator teres/N. medianus) — Kap. 14 (Unterarmregion),
      S. 179
- [x] Warum Hunde ihre Zehen beknabbern — drei Differentialdiagnosen
      (Allergie, Arthrose, Hyperästhesie durch Nervenreizung) — Kap. 15
      (Karpalgelenk und Zehen), S. 193
- [x] **Radiuskurvensyndrom (28.09.2026).** Eigene Quelle gefunden und
      umgesetzt: VetCenter, „Erkrankungen des Bewegungsapparates",
      Abschnitt „Distractio cubiti (DC)" — als
      `distractio-cubiti-radius-curvus-carpus-valgus-hund`. Löst den
      bisher nur als Endzustand erwähnten Begriff „Radius curvus"
      mechanistisch auf: Short-Radius- vs. Short-Ulna-Syndrom als zwei
      Varianten je nachdem, welche der beiden Wachstumsfugen zu früh
      schließt, mit ihren jeweils entgegengesetzten Deformitäten.
- [ ] Kap. 16 (Wirbelsäule) — teilweise für Quellenprüfung von facettengelenke
      gelesen, aber nicht systematisch nach weiteren Pathologie-Themen
      durchsucht (z. B. Spondylose, IVDD, Cauda-equina)
- [x] **Kap. 17 jetzt vollständig ausgewertet (28.09.2026 Kap. 17.1–17.5.2,
      04.10.2026 Rest).** 28.09.2026 (per lokaler PDF-Extraktion neu geholt
      — ma(17).pdf, 3,1 MB, `read_file_content` kappte bei 106.325 Zeichen,
      lokale `pdftotext`-Extraktion lieferte vollständige 157.905 Zeichen):
      Ein Punkt aus dem allgemein eher humanmedizin-nahen Grundlagenteil
      erwies sich als genuin wertvoll und dog-spezifisch klinisch relevant:
      die Segmentüberlappung von Plexus brachialis (C6–Th2) und zervikalen
      Sympathikusfasern (C8–Th7) erklärt, warum ein Horner-Syndrom
      bevorzugt bei tiefen/kaudalen Plexus-brachialis-Läsionen auftritt.
      Als `horner-syndrom-plexus-brachialis-laesionshoehe` (UNTERSUCHUNG)
      umgesetzt — ergänzt den bestehenden Kopfnerven/Horner-Syndrom-
      Eintrag (Koch/Fischer) um dieses Lokalisationskriterium sowie
      `plexusschaden-vordergliedmasse` um die Horner-Komponente,
      inklusive der klinisch wichtigen Warnung, dass Horner-Syndrom je
      nach Ursache (Trauma vs. Mittelohrentzündung) entgegengesetzte
      Therapieentscheidungen verlangt. Die übrige Grenzstrang-/
      Parasympathikus-Detailanatomie war damals noch als „ohne
      erkennbaren zusätzlichen Denkgang-Mehrwert über den Horner-Punkt
      hinaus" zurückgestellt worden — **diese Einschätzung wurde am
      04.10.2026 revidiert**, nachdem sich beim vollständigen Durchlesen
      zeigte, dass Hárrer selbst daraus eine genuin klinische
      Rückschluss-Logik ableitet (rezidivierende LWS-Blockaden als
      möglicher Hinweis auf eine Darmstörung, da beide aus denselben
      Segmenten sympathisch versorgt werden), die über den reinen
      Horner-Punkt klar hinausgeht. Neuer Eintrag:
      `grenzstrang-sympathikus-organsegmente-rueckschluss` (ANATOMIE):
      Grenzstrangaufbau mit den drei Halsganglien, die drei sympathischen
      Abgänge vom Ganglion stellatum, Nn. splanchnici major/minor mit
      Diaphragma-Engstelle, Ganglion impar, die LWS-Organ-
      Rückschlusslogik inkl. des Kreuzband-OP-Beispiels (paravertebrale
      Technik an der hinteren BWS wirkt schon 1 Tag post-OP auf die
      Hintergliedmaße) sowie der Parasympathikus-Verlauf über den
      N. vagus. 17.2–17.2.4 (Bewegung/Dehnung/Kompression, Ursachen und
      Symptome mechanosensitiver Nerven — als
      `nervenkompression-druck-dehnungsschwellen` umgesetzt) sowie
      17.3/17.4/17.5.1/17.5.2 (Wirkprinzip, Kontraindikationen,
      Nervenleitung, Mechanosensitivitäts-Untersuchung — als
      `neurotensionsbehandlung-wirkprinzip-kontraindikationen` umgesetzt, S.
      279–281) waren bereits abgedeckt. Neu am 04.10.2026 außerdem: Kap.
      17.1.3 (Spinalnerv, S. 272f.) als
      `spinalnerv-segmentaufbau-kibbler-hautfalte-beispiel` (UNTERSUCHUNG)
      — Spinalnerv-Aufbau inkl. Ramus meningeus/N. von Luschka sowie
      Hárrers konkretes klinisches Fallbeispiel (Kibbler-Hautfalte am
      Segment C5 öffnet die Kette Dermatom/M. deltoideus → Myotom/
      M. cleidobrachialis → Gelenk/Akromion → Nerv/N. axillaris) plus die
      sympathische T2–7/T8–L4-Aufteilung von Vorder-/Hintergliedmaße am
      L4/5-Beispiel; gezielt gegen den bereits bestehenden, allgemeineren
      Eintrag `segmentalreflektorischer-komplex-dermatom-myotom-
      sklerotom-viszerotom` (andere Quelle: Kasper/Zohmann) abgegrenzt,
      um Dopplung zu vermeiden. **Endgültig bewusst NICHT als
      Wissensbibliothek-Content übernommen** (Entscheidung bestätigt):
      der gesamte Rest von 17.5 (S. 282–296) mit den konkreten
      Behandlungstechniken (Duramobilisation/Slumptest-ASTE, die
      einzelnen Nerven-Neurotensionstests mit Griff/Ausführung, die drei
      Nervenmobilisationstechniken Annäherung/Längszug/Querverschiebung)
      — praktische Handgriffe für ausgebildete Therapeut:innen, kein
      Nachschlage-Wissen, außer Vanessa möchte das anders. **Damit ist
      Hárrer, Manuelle Therapie beim Hund, jetzt vollständig ausgewertet
      (Kap. 6–17).** Beide neuen Einträge via Playwright verifiziert
      (2/2 Seiten, 0 Fehler).
      **Wichtiger Fund:** Kap. 17 (S. 279) widerspricht Kap. 14 (S. 179) in der
      Zuordnung „Toe-in/Toe-out" ↔ M. supinator — derselbe Muskel-Nerv-Bezug
      (M. supinator → N. radialis) wird einmal der Toe-in-, einmal der
      Toe-out-Stellung zugeschrieben. In `toe-in-toe-out-nervenkompression`
      sowie den Anatomie-Items `supinator`/`pronator-teres` als „WIDERSPRUCH IN
      DER QUELLE" dokumentiert, nicht aufgelöst. **Braucht Vanessas fachliche/
      praktische Einschätzung, welche Zuordnung stimmt** — bis dahin bleibt die
      Kap.-14-Version (ausführlichere Gegenüberstellung) als vorläufige Basis
      stehen, aber mit sichtbarem Hinweis für Leser:innen.

### UNTERSUCHUNG — Koch/Fischer, Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1)

- [x] Kap. 4 Adspektion und Ganganalyse (S. 80–82)
- [x] Kap. 5.1 Voruntersuchungen / neurologischer Kurz-Check (S. 82)
- [x] Kap. 5.2 Spezifische Bemerkung zur Untersuchung des stehenden Hundes
      (S. 83, allgemeine Prinzipien: bilateral synchron, distal→proximal,
      5 Befundkategorien) — als Einleitung in
      `zehen-mittelfuss-sprunggelenk-untersuchung` mit verwendet
- [x] Kap. 5.3 Hintergliedmaße, komplett (S. 84–97): Zehen/Metatarsus/
      Tarsalknochen + Sprunggelenk + Fersensehnenstrang (als
      `zehen-mittelfuss-sprunggelenk-untersuchung`), Unterschenkel + Knie
      (als `unterschenkel-knie-stehender-hund-untersuchung`, verknüpft mit
      Fall Bruno und der bestehenden Patellaluxation/Quadriceps-Content),
      Oberschenkel + Hüfte + M.-iliopsoas-Test (als
      `oberschenkel-huefte-stehender-hund-untersuchung`, verknüpft mit Fall
      Luna und den Anatomie-Items iliopsoas/huefte/quadriceps/biceps-femoris/
      semitendinosus), sowie die Differentialdiagnosen-Übersichtstabelle
      Tab. 5.1 (als eigener kompakter `hintergliedmasse-differenzialdiagnosen-kompass`).
      Damit ist die komplette Hintergliedmaßen-Untersuchung am stehenden Hund
      abgedeckt — vier neue UNTERSUCHUNG-Einträge in Summe.
- [x] Kap. 5.4 Vordergliedmaße, komplett (S. 98–109): Zehen/Metacarpus/
      Karpalknochen + Karpalgelenk (als
      `zehen-karpus-vordergliedmasse-untersuchung`), Unterarm + Ellbogen
      inkl. Seitenbänder (als `unterarm-ellbogen-vordergliedmasse-untersuchung`,
      verknüpft mit den Anatomie-Items supinator/brachioradialis/
      pronator-teres), Oberarm + Schultergelenk (inkl. der muskulären
      „Schultermanschette"/„dynamischen Bänder") + Schulterblatt (als
      `oberarm-schulter-vordergliedmasse-untersuchung`, verknüpft mit Fall
      Rocky und den Anatomie-Items biceps/subscapularis/supraspinatus/
      infraspinatus/teres-minor), sowie die Differentialdiagnosen-
      Übersichtstabelle Tab. 5.2 (als `vordergliedmasse-differenzialdiagnosen-kompass`).
      Damit ist — analog zur Hintergliedmaße — auch die komplette
      Vordergliedmaßen-Untersuchung am stehenden Hund abgedeckt.
- [x] Kap. 6.1 (Untersuchung des liegenden Hundes, allgemeine Prinzipien,
      S. 110) als `liegender-hund-untersuchungsprinzipien` umgesetzt: warum
      trotz bekannter Verdachtsregion alle vier Gliedmaßen untersucht werden
      (betroffene zuletzt), plus die 7 erfassten Befundkategorien.
- [x] Kap. 6.2 (Untersuchung des liegenden Hundes, Hintergliedmaße, S. 111–136)
      komplett gelesen und umgesetzt: Zehen/Tarsus/Sprunggelenk (als
      `zehen-tarsus-sprunggelenk-liegender-hund-untersuchung`), Unterschenkel +
      Femur (als `unterschenkel-femur-liegender-hund-untersuchung`), Knie mit
      allen Spezialtests inkl. der Koch-eigenen PL-0–4-Klassifikation,
      Schubladen-/Tibia-Kompressions-/Meniskustest (als
      `knie-liegender-hund-spezialtests`, verknüpft mit Fall Bruno), Hüfte mit
      vollständigem Ortolani- UND erstmals Bardens-Test (als
      `huefte-liegender-hund-spezialtests`, verknüpft mit Fall Luna). Zwei
      bewusst transparent gekennzeichnete Abgrenzungen zu bereits vorhandenem
      Hárrer-Content: (1) die PL-0–4-Klassifikation (Untersuchungsbefund,
      Koch et al. 1998) ist NICHT dieselbe Skala wie die andernorts
      dokumentierte Putnam-Grad-I–IV-Klassifikation
      (Krankheitsbild-Schweregrad) — im neuen Eintrag als eigener Abschnitt
      klargestellt, nicht vermischt; (2) Koch/Fischers eigener
      „Schubladentest" (5–15° Beugung) vs. der bereits vorhandene, nach
      Hárrer benannte „Lachmann-Test" (volle Extension) — als offene
      Terminologie-/Winkelkonvention-Diskrepanz zwischen den Quellen
      dokumentiert, nicht stillschweigend geglättet.
- [x] Kap. 6.3 (Untersuchung des liegenden Hundes, Vordergliedmaße, S. 136–156)
      komplett gelesen und umgesetzt: Zehen/Metacarpus/Karpalgelenk inkl.
      Finkelstein-analogem Test für M. abductor pollicis longus (als
      `zehen-karpus-liegender-hund-untersuchung`), Unterarm + Ellbogen inkl.
      medialem Kompartiment-Test (als
      `unterarm-ellbogen-liegender-hund-untersuchung`), Oberarm/Schulter/
      Schulterblatt inkl. OCD-Provokationstest und Bizepssehnentest (als
      `oberarm-schulter-liegender-hund-untersuchung`, verknüpft mit Fall
      Rocky). Kap. 6 endet danach mit einem einzeiligen Literaturverzeichnis
      (6.4) — Kap. 6 (liegender Hund) ist damit vollständig abgedeckt.
- [x] **Kapitel 7 „Neurologischer Untersuchungsgang" (Daniel Koch, Martin S.
      Fischer), S. 157–180, vollständig gelesen und umgesetzt (24.09.2026).**
      Die vorige Session-Notiz („ab S. 157 folgt kein Neuro-Kapitel, sondern
      Pathologie") war ein eigener Irrtum und ist damit erledigt/widerlegt —
      Kap. 7 ist tatsächlich exakt das erwartete Neuro-Kapitel. Die zuvor
      vermutete Datei-ID-Verwechslung erwies sich beim erneuten,
      einzeln-verifizierten Nachlesen als unbegründet (die ursprüngliche
      u(N)-Zuordnung war korrekt) — die Vorsicht war trotzdem richtig, da
      sie den tatsächlichen späteren Fehler (s. u.) nicht verhindert hätte,
      wäre er unbemerkt geblieben. Neun neue Wissenseinträge:
      - UNTERSUCHUNG: `neurologische-untersuchung-anamnese-einordnung` (7.1
        Einordnung + 7.2 Anamnese: Rasseprädispositionen, 12 Leitfragen),
        `bewusstsein-haltung-gang-neurologisch` (7.3–7.5), 
        `haltungs-und-stellreaktionen-hund` (7.6, alle 7 Teiltests),
        `spinale-reflexe-hund` (7.7, alle 6 Reflexe mit Rückenmarksegment),
        `kopfnervenpruefung-hund` (7.8, alle 9 Kopfnerventests + Horner-
        Syndrom + Strabismus-Lokalisation), 
        `schmerzausloesung-neurologische-warnzeichen` (7.9),
        `neurologische-lokalisationslogik-algorithmus` (7.10.1 + allgemeiner
        Teil von 7.10.2: PNS/ZNS-Algorithmus, Segmentmuster-Tabelle,
        Grad-1–5-Gradierung extraduraler Kompressionen).
      - PATHOLOGIE: `neurologische-erkrankungen-gehirn-vestibulaer-hirnstamm`
        und `neurologische-erkrankungen-rueckenmark-periphere-nerven` (Tab.
        7.1–7.7, alle ca. 20 Einzeldiagnosen aus 7.10.2 mit Befund und
        Häufigkeit).
      Neu verknüpft mit Fall Filou (akute Hinterhand-Schwäche) und den
      bestehenden Anatomie-Items `rueckenmark`/`discus`; Rückenmark-Pathologie
      zusätzlich mit Fall Bär (chronische, nicht-akute Wirbelsäulenproblematik
      als Kontrast zu Filous akutem Bild).
      **Eine transparent dokumentierte Quellenungenauigkeit:** Im
      Kapitelabschnitt zum Drohreflex steht als Überschrift „(II, VIII)",
      obwohl die zugehörige Fließtextbeschreibung eindeutig N. opticus (II)
      und N. facialis (VII) als Reflexbogen nennt — vermutlich ein
      Texterfassungsfehler der Quelle. Im neuen Eintrag `kopfnervenpruefung-
      hund` wurde dies nicht stillschweigend geglättet, sondern die
      Korrektur (II/VII statt II/VIII) mit explizitem Hinweisabschnitt
      offengelegt.
      Kapitel 7 gilt damit als abgeschlossen; als Nächstes folgt laut
      Literaturverzeichnis (7.11) kein weiteres Unterkapitel — Kap. 8 des
      Buches (noch nicht gesichtet, Chunks ab u(32)) ist der nächste
      natürliche Fortsetzungspunkt.
- [x] Die Datei hat ~46 Einzel-PDF-Chunks (u.pdf, u(1)–u(46), Ordner-ID
      1J3C3r71IrVdvrSUmTm8yRjMtMuyI8ZeT). Sicher verifizierte Zuordnungen
      (Seitenkopf im zurückgegebenen Text geprüft, nicht nur die
      Chunk-Nummer angenommen): u(13)=S.80–82, u(14)=S.82–83, u(15)=S.83–84,
      u(16)=S.84–98 [Kap. 5.3 komplett], u(17)=S.98–109 [Kap. 5.4 komplett],
      u(18)=S.110f. [Anfang Kap. 6], u(19)=S.111–136 [Kap. 6.2
      Hintergliedmaße komplett], u(20)=S.136–156 [Kap. 6.3 Vordergliedmaße
      komplett + Kap. 6.4 Literaturverzeichnis], u(21)=S.157 [7.1+7.2 Anfang],
      u(22)=S.157f. [7.2 Ende], u(23)=S.158f. [7.3+7.4+7.5 Anfang],
      u(24)=S.158 [7.3+7.4, kürzerer Überlapp-Chunk], u(25)=S.158–159
      [7.4 Ende+7.5 komplett], u(26)=S.159f. [7.5 Ende+7.6.1–7.6.2 Anfang],
      u(27)=S.160–164 [7.6 komplett+7.7 Anfang], u(28)=S.164–168 [7.7
      komplett+7.8 Anfang], u(29)=S.168–174 [7.8 komplett+7.9 komplett],
      u(30)=S.174f. [7.9 Ende+7.10.1+7.10.2 Anfang], u(31)=S.175–180
      [7.10.1–7.10.2 komplett+7.11 Literatur, Kapitelende]. Kap. 6 und 7
      sind damit vollständig abgedeckt. Für Kap. 8 (Buchtitel/Thema noch
      nicht bekannt) weiter ab u(32) lesen.
- [x] **Buchstruktur ab „Teil 3" geklärt (24.09.2026):** Nach Kap. 7 (S. 180)
      folgt "Teil 3 – Hilfestellung zur Therapieplanung bei häufigen
      Erkrankungen" mit Kap. 8 "Wichtige Erkrankungen des Skeletts" (S.
      182–229) und Kap. 9 "Ausgewählte neurologische Erkrankungen" (ab S.
      230). Das erklärt rückwirkend alle Seitenverweise wie „(S. 192)",
      „(S. 199)" etc. aus den Kap.-5/6-Befund-DD-Listen — sie zeigen auf
      genau diese beiden Kapitel.
- [x] **Kap. 8.1–8.2 (Allgemeine Informationen + Generalisierte
      Skeletterkrankungen, S. 182–195) vollständig gelesen und umgesetzt
      (24.09.2026).** Acht neue Wissenseinträge:
      - PATHOLOGIE: `gelenkerkrankungen-haeufigkeit-und-ursachen` (8.1.1:
        Häufigkeitsverteilung, Zuchtkritik, Kreuzbandriss als
        Dysplasie- statt Unfallproblem), `osteochondrose-hund` (8.2.1,
        inkl. Lokalisationstabelle mit Häufigkeits-%), 
        `panosteitis-hypertrophe-osteodystrophie-knorpelzapfen` (8.2.2–
        8.2.4, drei juvenile Wachstumserkrankungen im Vergleich),
        `polyarthritis-hund` (8.2.5, inkl. Arthritis-Klassifikationstabelle),
        `osteomyelitis-hund` (8.2.6), `knochentumoren-gelenktumoren-hund`
        (8.2.7–8.2.8: Osteosarkom + Synovialzellsarkom),
        `hypertrophe-osteopathie-marie-bamberger` (8.2.9).
      - THERAPIE: `allgemeine-therapieprinzipien-gelenkerkrankungen` (8.1.2).
      **Bewusste Entscheidung zu Medikamenten-Dosierungen:** Die Quelle
      nennt durchgehend präzise mg/kg-Dosierungen (NSAIDs, Opioide,
      Kortikosteroide, Antibiotika). Diese wurden NICHT übernommen — die
      App richtet sich an Tierphysiotherapeut:innen, die nicht
      verschreiben; übernommen wurden nur Wirkprinzip, Wirkdauer,
      Applikationsart und die für die Physiotherapie relevanten
      Konsequenzen (z. B. Therapiebeginn nach Femurkopfresektion an Tag 5).
      Falls Vanessa das anders haben möchte, kann das nachträglich ergänzt
      werden.
      **Cross-Source-Abgleich:** Zwei zuvor offene VetCenter-Backlog-Punkte
      (Osteomyelitis-Kapitelanfang, generalisierte Skeletterkrankungen
      OC/Panosteitis/hypertrophe Osteodystrophie) sind mit diesem
      Koch/Fischer-Content inhaltlich abgedeckt und im VetCenter-Abschnitt
      unten als erledigt markiert, statt denselben Themenkomplex ein
      zweites Mal aus einer anderen Quelle zu lesen.
      Nächster Fortsetzungspunkt: Kap. 8.3 „Erkrankungen der
      Hintergliedmaße" (ab S. 195, Chunk u(35) — Zuordnung noch nicht
      einzeln verifiziert, beim Fortsetzen per `search_files` neu prüfen).
- [x] **Kap. 8.3 (Erkrankungen der Hintergliedmaße, S. 195–219) vollständig
      gelesen und umgesetzt (24.09.2026), 9 neue PATHOLOGIE-Einträge:**
      `tarsus-erkrankungen-hund` (8.3.3: Instabilität, Spontanfraktur
      Calcaneus, Fersensehnenriss, Fersenkappenluxation),
      `kreuzbandriss-biomechanik-und-therapie` (8.3.4: cranial tibial
      thrust als biomechanische Erklärung, TPLO/TTA — ergänzt die
      bestehende webbasierte `kreuzbandriss-krankheitsbild`),
      `patellaluxation-grad-und-therapieoptionen` (8.3.5: US-Standard-
      Gradeinteilung, bestätigt konvergent die bestehende Putnam-Skala aus
      `patellaluxation-krankheitsbild`, klar abgegrenzt von Kochs eigener
      PL-0–4-Untersuchungsklassifikation aus Kap. 6.2.4),
      `weitere-knieerkrankungen-hund` (8.3.6: Avulsion M. extensor
      digitorum longus, Osgood-Schlatter), `hamstringfibrose-deutscher-
      schaeferhund` (8.3.7), `legg-perthes-erkrankung` (8.3.8),
      `hueftgelenkdysplasie-und-coxarthrose` (8.3.9, schließt die lange
      offene HD-Lücke, siehe VetCenter-Backlog oben),
      `hueftgelenkluxation-hund` (8.3.10, mit expliziter Abgrenzung zur
      HD) und `iliopsoaszerrung-hund` (8.3.11, verknüpft mit Fall Emma).
      Chunk u(35) war ungewöhnlich groß (74.000 Zeichen) und deckte allein
      S. 195–219 ab, endend mitten in 8.4.1/8.4.2 (Erkrankungen der
      Vordergliedmaße: Sesamoid-Erkrankung, Hyperextensionstrauma Carpus —
      dort abgebrochen, noch nicht umgesetzt).
- [x] **Kap. 8.4 (Erkrankungen der Vordergliedmaße, S. 219–229) vollständig
      gelesen und umgesetzt (24.09.2026) — damit ist Kapitel 8 komplett
      abgeschlossen.** Sechs neue PATHOLOGIE-Einträge:
      `sesambeinfragmentierung-vordergliedmasse` (8.4.1),
      `hyperextensionstrauma-carpus` (8.4.2),
      `tendovaginitis-abductor-pollicis-longus` (8.4.3, ergänzt den
      bestehenden Untersuchungs-Eintrag zum Finkelstein-analogen Test
      `zehen-karpus-liegender-hund-untersuchung` um das vollständige
      Krankheitsbild), `ellbogendysplasie-pathogenese-und-therapie` (8.4.4,
      ergänzt den bestehenden VetCenter-Eintrag `ellbogengelenkdysplasie`
      um Pathogenese-Mechanismen, Genetik und die vollständige
      Therapiepalette — mit explizitem Hinweis, dass Kochs Begriff „UAP"
      dieselbe Erkrankung meint wie VetCenters „IPA", keine widersprüchliche
      Zweitdiagnose), `bizepssehnenentzuendung-therapieoptionen` (8.4.5,
      ergänzt den bestehenden VetCenter-Eintrag `bizepssehnenerkrankungen`
      um Sehnenverlauf, Sonografie-Diagnostik und drei OP-Techniken) und
      `schultergelenkluxation-hund` (8.4.6). Kap. 8.4.7 verweist im
      Original nur auf die allgemeinen Osteochondrose-Informationen, Kap. 8
      endet danach mit dem Literaturverzeichnis (8.5).
      **Kapitel 8 „Wichtige Erkrankungen des Skeletts" (S. 182–229) ist
      damit vollständig abgedeckt** — 23 neue Wissenseinträge insgesamt
      (8.1–8.2: 8, 8.3: 9, 8.4: 6). Nächster Fortsetzungspunkt: Kap. 9
      „Ausgewählte neurologische Erkrankungen" (ab S. 230, Chunk u(37) —
      Zuordnung noch nicht einzeln verifiziert, beim Fortsetzen per
      `search_files` neu prüfen).
- [x] **Kap. 9 „Ausgewählte neurologische Erkrankungen" (S. 230–236)
      vollständig gelesen und umgesetzt (24.09.2026) — Kapitel 9 ist damit
      abgeschlossen und das Buch komplett durchgearbeitet (Kap. 9 endet mit
      dem Literaturverzeichnis 9.8; danach keine weiteren Kapitel mehr im
      Dokument).** Sieben neue PATHOLOGIE-Einträge:
      `lahmheit-laehmung-abgrenzung` (9.1: warum Becken-/Cauda-equina- und
      Hals-/Plexus-brachialis-Region orthopädische und neurologische
      Differentialdiagnosen verwechselbar machen — inkl. vollständiger
      DD-Liste und Bildgebungs-Empfehlung MRT vs. CT),
      `degenerative-lumbosakrale-stenose-cauda-equina` (9.2: DLSS/Cauda-
      equina-Syndrom mit Pseudohyperreflexie-Falle am Patellareflex),
      `degenerative-myelopathie-hund` (9.3: SOD1-Gentest, klare Abgrenzung
      zur DLSS anhand Schmerz vs. schmerzlos und UMN- vs. LMN-Reflexmuster),
      `rueckenmarksinfarkt-fibrokartilaginoese-embolie` (9.4: FCE, fehlende
      Ausfallskaskade als Unterscheidungsmerkmal zu kompressiven Läsionen),
      `thorakolumbaler-bandscheibenvorfall-therapie` (9.5: Fünf-Grade-Skala
      und Schiff-Sherrington-Phänomen), `zervikaler-bandscheibenvorfall-hund`
      (9.6) und `plexusschaden-vordergliedmasse` (9.7: warum hier fast
      immer Physiotherapie statt Nervennaht die Therapie der Wahl ist).
      **Wichtiger Befund beim Schreiben:** Kapitel 9 liefert für genau die
      Krankheiten, die in Kap. 7.10.2 (Tab. 7.5–7.7) bereits als
      Kurz-Übersichtstabelle im bestehenden Eintrag
      `neurologische-erkrankungen-rueckenmark-periphere-nerven` stehen, jetzt
      die volle klinische Tiefe (Ätiologie, Pathogenese, Bildgebung,
      Therapie) nach — alle sieben neuen Einträge sind daher bewusst als
      ergänzende Vertiefungen zu diesem bereits vorhandenen Eintrag verfasst
      und verweisen im `sourceStatus` darauf, statt den Tabelleninhalt zu
      duplizieren. `plexusschaden-vordergliedmasse` verweist zusätzlich auf
      den bestehenden VetCenter-Eintrag `seddon-klassifikation-
      nervenverletzungen`. **Medikamentendosierungen** (NSAID/Gabapentin bei
      DLSS) wie schon bei Kap. 8 bewusst nicht übernommen (Zielgruppe
      Physiotherapeut:innen). Verifiziert per Playwright-Screenshot (7/7
      Seiten, 0 Console-/Page-Errors).
      **Damit ist Koch/Fischer, Lahmheitsuntersuchung beim Hund
      (ISBN 978-3-13-242101-1), 2. Auflage 2019, vollständig durchgearbeitet
      (Kap. 1–9).** Nächster Schritt: nächstes Buch aus dem Backlog wählen
      (Baumgartner Klinische Propädeutik, Mai Physiotherapie-Restkapitel,
      Hohmann Bewegungsapparat Hund-Restkapitel oder VetCenter
      Wirbelsäulenerkrankungen — siehe Abschnitte unten).

### UNTERSUCHUNG — Baumgartner/Wittek/Khol, Klinische Propädeutik der Haus- und Heimtiere (ISBN 978-3-13-245774-4, Thieme, 10. Aufl. 2026)

- [x] **Kap. 6.1–6.7 (S. 178–209) satzweise gelesen, 1 neuer Eintrag
      (27.09.2026).** Die dokumentierte Spalten-Verschachtelung wurde
      bestätigt und ist exakt so lokalisiert wie unten beschrieben
      (Spezies-Icon-Boxen reißen mitten im Satz auf); der übrige
      Fließtext liest sich dazwischen sauber und zusammenhängend.
      Systematischer Abgleich mit dem bestehenden Content ergab: Die
      meisten fachlich dichten Passagen in diesem Kapitel (Adspektion/
      Beurteilung der Lahmheit, Provokationsproben/Beugeproben,
      Ortolani-Test, Schubladentest, Bizepssehnentest, die
      Processus-anconaeus-/-coronoideus-medialis-Rotationsprüfung am
      Ellenbogen, Osteomyelitis, Panostitis, neurogene vs.
      Inaktivitätsatrophie) sind bereits in hundespezifischerer und
      detaillierterer Form aus Koch/Fischer und Hárrer im Content
      vorhanden — hier wurde bewusst nichts dupliziert. Zusätzlich sind
      mehrere Kapitelabschnitte (6.4.3 Ganganalyse-Technik, Tab. 6.2/6.3
      Lahmheitsgrad-Scores, 6.5 Provokationsproben) überwiegend
      pferde-/rinderspezifisch und für Denkgang nicht relevant. Ein
      Abschnitt war jedoch genuin neu, klar dog-relevant und lag
      eindeutig außerhalb der Fehlerzone: **6.6.4 „Untersuchung von
      Knochen"** beschreibt, dass die drei Fraktur-Kardinalsymptome
      (abnorme Achsenbrechung, abnorme Beweglichkeit, Krepitation)
      keineswegs immer alle drei nachweisbar sein müssen — Krepitation
      kann u. a. bei vollständiger oder fehlender Fragmentverlagerung,
      Weichteilinterposition oder sehr kleinen Knochen ausbleiben; bei
      einer Fissur (Haarriss ohne Verlagerung) fehlen definitionsgemäß
      alle drei, obwohl eine Fraktur vorliegt. Daraus 1 neuer Eintrag:
      `fraktur-kardinalsymptome-diagnostische-grenzen` (UNTERSUCHUNG) —
      die diagnostische Grenze von Krepitation als vermeintliches
      Ausschlusskriterium, mit der Fissur als Extrembeispiel und der
      praktischen Konsequenz (Röntgen-Indikation trotz negativem
      Kardinalsymptom-Befund).

- [x] **Kap. 6.8–6.12 (S. 209–231) satzweise gelesen, 1 weiterer neuer
      Eintrag (27.09.2026).** 6.8 (Untersuchung der Hintergliedmaße)
      bestätigte die Erwartung: starke Überlappung mit Ortolani-/
      Schubladen-/Tibiakompressionstest, die bereits deutlich
      detaillierter aus Hárrer und Koch/Fischer vorhanden sind — nichts
      übernommen. 6.9 (Rektale Untersuchung) ist wie vermutet
      großtierspezifisch (Becken-/Wirbelpalpation von innen beim Pferd)
      und wurde übersprungen. 6.11 (Wunduntersuchung) und 6.12
      (Weiterführende Untersuchungsmethoden: Röntgen/Sono/CT/MRT/
      Szintigrafie) sind allgemein gehalten, aber ebenfalls bereits
      hinreichend über bestehende Einträge (u. a. Osteomyelitis-Diagnostik,
      Diskospondylitis-Bildgebung) abgedeckt — keine neuen Einträge.
      **6.10 (Untersuchung der Wirbelsäule)** lieferte dagegen den
      erhofften, bisher fehlenden Baustein: 1 neuer Eintrag
      `wirbelsaeule-krummer-ruecken-lahmheitshinweis` (UNTERSUCHUNG) — die
      drei Verbiegungstypen Lordose/Kyphose/Skoliose, die Kyphose
      insbesondere als mögliches Kompensationszeichen einer
      Gliedmaßenlahmheit statt eines primären Wirbelsäulenbefunds, das
      Prüfschema der Wirbelsäulenbeweglichkeit in drei Ebenen (inkl.
      Futterreiz-Technik für die Halswirbelsäule) sowie die Notwendigkeit,
      die orthopädische Wirbelsäulenprüfung stets mit der neurologischen
      Untersuchung zu kombinieren. Die im selben Abschnitt behandelte
      Iliosakralgelenk-Palpation wurde bewusst nicht übernommen, da sie in
      den bestehenden Hárrer-Einträgen (Kap. 16.2.7) bereits erheblich
      detaillierter abgedeckt ist.
      **Damit ist Kap. 6 „Orthopädischer Untersuchungsgang" vollständig
      gelesen (S. 178–231), mit 2 neuen Einträgen als Nettoertrag.**

- [x] **Kap. 7 „Neurologischer Untersuchungsgang" (S. 231–253, Datei
      kl(7).pdf, Kapitelautoren Pakozdy/Tipold) gelesen, 2 neue Einträge
      (27.09.2026).** Wie erwartet eine echte Zweitquelle zu Koch/Fischer
      Kap. 6/7: 7.5 (Haltung/Gang), 7.6 (Hirnnervenfunktionen), 7.7
      (Haltungs-/Stellreaktionen: Korrekturreaktion, Hüpfreaktion,
      Schubkarrentest, Tischkantenprobe) und die allgemeine
      Reflexbogen-/OMN-UMN-Theorie überschneiden sich stark mit
      bestehendem Content und wurden nicht dupliziert. Zwei Lücken waren
      dagegen genuin neu: Erstens fehlten die einzelnen namentlich
      benannten spinalen Reflexe (Patellar-, Tibialis-cranialis-,
      Achillessehnen-, Extensor-carpi-radialis-, Trizeps-, Flexor-,
      Anal-/Perineal-/Bulbokavernosusreflex) mit Nerv, Rückenmarksegment
      und exakter Auslösetechnik komplett — bisher gab es nur die
      allgemeine OMN/UMN-Interpretation, keine Referenztabelle der
      Einzelreflexe selbst. Daraus 1 neuer, tabellenbasierter
      Nachschlage-Eintrag: `spinale-reflexe-hund-nerv-segment-technik`
      (UNTERSUCHUNG). Zweitens fehlte der Pannikulusreflex
      (Cutaneus-trunci-Reflex) vollständig, obwohl er in der Praxis das
      Standardwerkzeug zur groben Höhenlokalisation thorakolumbaler
      Rückenmarksläsionen (zwischen L4 und C8) ist — dazu 1 weiterer
      neuer Eintrag `pannikulusreflex-hoehenlokalisation-
      rueckenmarklaesion` (UNTERSUCHUNG), der auch die selteneren,
      ergänzenden Zervikofazialisreflex und Slap-Test (Halsmark- bzw.
      Larynxfunktions-Lokalisation) kurz einordnet. Diese Textstelle
      enthielt keine Spezies-Icon-Verschachtelung, aber vereinzelte
      Wortdopplungen aus der Texterfassung (z. B. „physiologisch phy...“),
      die anhand von wortgleichen Wiederholungen an anderer Stelle im
      selben Kapitel eindeutig auflösbar waren — satzweise gegengeprüft
      vor Übernahme. Verifiziert per Playwright-Screenshot (2/2 Seiten,
      0 Console-/Page-Errors); die Reflex-Tabelle rendert bei 390px
      Mobile-Breite mit sehr schmalen Spalten (bestehendes,
      appweites Verhalten aller Tabellen-Einträge, keine Regression aus
      diesem Content).
- [x] **Kap. 4 „Allgemeiner klinischer Untersuchungsgang" — die vier
      vorgemerkten Abschnitte 4.2, 4.6, 4.7, 4.10.1 gelesen, 4 neue
      Einträge (27.09.2026).** Datei kl(4).pdf (S. 50–163) ist mit knapp
      390.000 Zeichen die bisher größte Einzeldatei dieses Buches und zu
      weiten Teilen multi-spezies-spezifisch (Kolik beim Pferd,
      Terrarienhaltung, Vogelverhalten, Wiederkäuer-Pansenperkussion
      usw.) — diese Anteile wurden übersprungen. Die vier vorgemerkten,
      allgemein gehaltenen Abschnitte erwiesen sich dagegen als
      vollständig neues Terrain: Denkgang hatte bisher **keinerlei**
      strukturierte Terminologie zu Bewusstseinsstufen, Fieber oder
      Puls-/Atemqualität. Vier neue, überwiegend tabellenbasierte
      Nachschlage-Einträge:
      `bewusstseinsstufen-apathie-somnolenz-stupor-koma` (4.2, S. 53–56;
      ergänzt den bestehenden Eintrag `bewusstsein-haltung-gang-
      neurologisch`, der die vier Begriffe bisher nur ungegliedert als
      Gruppe nennt, um die Abgrenzungskriterien zwischen ihnen),
      `fieberterminologie-grade-verlaufsmuster` (4.6, S. 81–83: Referenz-
      wert Hund, Fehlerquellen, Grade der Temperaturerhöhung, fünf
      Fiebertypen nach Tagesverlauf, Typus inversus),
      `pulsqualitaet-terminologie-hund` (4.7, S. 84–87: die
      Pulsus-Terminologie inkl. Pulsus celer als spezifischer
      Aortenklappeninsuffizienz-Hinweis, Pulsdefizit, physiologische
      respiratorische Arrhythmie) und
      `atemtypus-dyspnoe-pathologische-atemmuster` (4.10.1, S. 117–120:
      Atemtypen, Dyspnoe-Beurteilungskriterien, Biot-/synkopisches/
      Cheyne-Stokes-Atmen, Hecheln, Singultus). Verifiziert per
      Playwright-Screenshot (4/4 Seiten, 0 Console-/Page-Errors) — die
      2-spaltigen Tabellen dieser Einträge rendern bei 390px
      Mobile-Breite sauber lesbar (im Gegensatz zur 4-spaltigen
      Reflex-Tabelle aus Kap. 7).
      **Damit sind alle vier ursprünglich vorgemerkten Abschnitte aus
      Kap. 4 abgearbeitet.**

- [x] **Zusätzlich Kap. 4.5.3 „Hautelastizität" gelesen, 1 neuer Eintrag
      (28.09.2026).** Nicht ursprünglich vorgemerkt, aber naheliegende
      Fortsetzung derselben Vitalparameter-Logik: Hautturgor als
      Dehydratationsgradmesser. Auch hier gab es zuvor keinerlei
      strukturierte Terminologie in Denkgang. Neu:
      `hautelastizitaet-dehydratationsgrad-hund` (UNTERSUCHUNG) — die
      Hund/Katze-spezifische Hautfaltenprobe (physiologisch 1–2 Sek.,
      pathologisch \> 2 Sek. bzw. aufgehoben), ihre Grenzen als
      Einzelparameter, sowie die ergänzenden Schwellenwerte V.-ulnaris-
      Füllung (ab ca. 7 % Flüssigkeitsdefizit) und Augapfel-Einsinken (ab
      ca. 10 %). Verifiziert per Playwright-Screenshot (0 Console-/
      Page-Errors).
      Beim Versuch, anschließend auch Kap. 4.10.4/4.10.5 (Herz-/
      Lungenperkussion und -auskultation, S. 128–133) auszuwerten, zeigte
      sich, dass die gespeicherte Drive-Extraktion (`baumgartner-kl4.txt`,
      388.254 Zeichen) genau mitten in Tab. 4.10 (Herzdämpfung nach
      Tierart) abbricht — die Pathologische-Befunde-/Ursachen-Abschnitte
      der Lungenauskultation (Rasselgeräusche, Pfeifgeräusche usw.)
      fehlen dadurch. Bewusst **nicht** aus dem unvollständigen Fragment
      extrahiert (Prinzip: im Zweifel eher auslassen als aus
      unvollständigem Kontext übernehmen, MASTER-PROMPT §22) — bei
      Bedarf in einer späteren Session per erneutem Drive-Read
      nachholen. Die übrigen Abschnitte von Kap. 4 (4.1 Vorbericht, 4.3
      Körperhaltung, 4.4 Ernährungszustand, 4.5.1/4.5.2/4.5.5 restliche
      Hautuntersuchung, 4.8–4.9 Kopf/Hals, 4.10.2/4.10.3
      Thoraxpalpation/Lungenperkussion) waren nicht vorgemerkt und wurden
      nicht systematisch gelesen — bei Bedarf für eine spätere Session
      offen.

- [ ] **Ursprüngliche Struktur-Erkundung (25.09.2026, weiterhin gültig für
      die noch nicht gelesenen Kapitel/Abschnitte).**
      Dieses Buch ist — anders als Koch/Fischer und Hárrer — ein
      **Allgemeinwerk für ALLE Tierarten** (Pferd, Rind, kleine
      Wiederkäuer, Neuweltkamele, Schwein, Hund, Katze, Heimtiere, Vögel,
      Exoten), nicht hundespezifisch. Der Fließtext ist durchgehend mit
      Spezies-Icons markiert (Ä=Hund, Å=Katze, Í=Pferd, Ç=Rind usw.), die
      meisten Passagen betreffen Pferd/Rind/Schwein/Vogel-spezifische
      Details (Zuchtmanagement, Klauenerkrankungen, Vogelröntgen,
      Wiederkäuer-Stoffwechsel) und sind für Denkgang irrelevant.
      Inhaltsverzeichnis zeigt aber zwei hochrelevante Kapitel:
      **Kap. 6 „Orthopädischer Untersuchungsgang" (S. 178–230, Kofler/
      Lischer/Rheinfeld/Kramer/Pees)** und **Kap. 7 „Neurologischer
      Untersuchungsgang" (S. 231–ca. 249, Pakozdy/Tipold)** — beide ein
      allgemeinveterinärmedizinisches Pendant zu Koch/Fischer Kap. 6/7,
      mit eigenständigen Autoren und damit eine echte Zweitquelle zum
      Gegenlesen/Ergänzen (z. B. Kap. 7.7 Haltungs-/Stellreaktionen,
      Kap. 7.8 Spinale Reflexe). Kap. 4 „Allgemeiner klinischer
      Untersuchungsgang" (S. 50–163) enthält außerdem die schon länger
      vorgemerkten allgemeinen Vitalparameter-Grundlagen (4.2
      Allgemeinverhalten, 4.6 Körpertemperatur, 4.7 Puls, 4.10.1 Atmung).
      **Technisches Problem:** Die Chunk-Extraktion (kl.pdf, kl(1)–kl(13).pdf)
      zeigt bei genauerem Hinsehen deutliche Anzeichen von
      Spalten-Verschachtelung (zweispaltiges Layout mit seitlichen
      Spezies-Icon-Boxen, die beim Extrahieren in falscher Reihenfolge
      zwischen den Fließtext gemischt werden — z. B. „Í Eine nisches
      Lahmheit Symptom ist als beim Ausdruck Pferd in einer der Regel
      ein die kli-..."). Das macht eine zuverlässige wortgetreue
      Übernahme deutlich riskanter als bei Koch/Fischer oder Hárrer.
      **Entscheidung:** Vorerst zurückgestellt zugunsten von Hárrer (Kap.
      6/7 Hüfte, siehe BIOMECHANIK-Abschnitt unten), das hundespezifisch
      und sauber extrahiert ist und daher pro Lesezeit deutlich mehr
      verlässlichen Content liefert. Beim nächsten Anlauf: Kap. 6 (S.
      178–230, Datei kl(6).pdf) und Kap. 7 (ab S. 231, Datei kl(7).pdf)
      satzweise sehr sorgfältig lesen und jede Aussage gegen den
      Seitenkopf/die restliche Chunk-Struktur prüfen, bevor sie
      übernommen wird — im Zweifel eher eine Aussage auslassen als eine
      durch Spaltenverschachtelung verfälschte Aussage übernehmen
      (MASTER-PROMPT §22).

### THERAPIE — Mai, Physiotherapie und Bewegungstraining für Hunde (ISBN 978-3-13-240099-3, Thieme 2022)

- [x] **Kap. 4.1 „Training" und Kap. 4.2 „Immobilisation" (Anfang, S. 56–59,
      ph(20).pdf) abgeschlossen (25.09.2026).** Vier neue Einträge:
      `ausdauertraining-methoden-fasertyp-adaptation` (4.1.1 — die vier
      Ausdauertrainingsmethoden Dauer/Intervall/Wiederholung/Wettkampf
      als Tabelle, Fast-twitch→Slow-twitch-Faseradaptation, die Grenze der
      Trainierbarkeit bei rassebedingter Fasertyp-Verteilung),
      `open-window-phaenomen-hochleistungssport` (4.1.1 — Kortisol-
      vermittelte Immunsuppression nach Erschöpfungsleistung, Stress-
      durchfall mit Darmbarriere-Verlust, als Differentialdiagnose bei
      unerklärlicher Krankheit nach Wettkampf/intensivem Training),
      `trainingsspezifitaet-schnelligkeitstraining-aufwaermen` (4.1.3–4.1.4
      — die drei Schnelligkeitskomponenten, das Spezifitäts-Prinzip mit
      den Beispielen Schlittenhund/Greyhound/Agility-Hund-in-der-Halle,
      Übergeschwindigkeitstraining, die 2–3-min-/5-min-Aufwärm-
      Zeitschwellen — ergänzt den bestehenden, ausführlicheren
      Aufwärm-/Abkühl-Eintrag aus Kap. 4.3.5–4.3.6 um die
      sportartspezifische Perspektive) und
      `piezoelektrischer-effekt-knochenumbau-belastung` (4.2 — der
      piezoelektrische Effekt mit Osteoblasten-/Osteoklasten-Zuordnung,
      Kalzium-Verdopplung im Harn nach 4 Wochen Immobilisation,
      implantatspezifische Resorptionszeichen bei Schrauben/Platten —
      ergänzt den bestehenden Eintrag zur Gelenkknorpel-/Bandschädigung
      unter Ruhigstellung aus Kap. 4.3, S. 62, um die parallele
      Knochenphysiologie; beide Einträge behandeln unterschiedliche
      Gewebe, keine Duplikation). Verifiziert per Playwright-Screenshot
      (4/4 Seiten, 0 Console-/Page-Errors).
      **Kap. 4.2 „Immobilisation" (Rest: Knorpel, Knochen-Sehnen-Übergang,
      Sehnen, Kapsel/Bänder, Muskeln, S. 59–62, ph(21).pdf) abgeschlossen
      (25.09.2026).** Drei weitere neue Einträge:
      `knorpelernaehrung-pumpmechanismus-be-entlastung` (der
      Schwamm-Prinzip-Pumpmechanismus für die Knorpelernährung,
      Tidemark-Verschiebung bei fehlender Wechselbelastung,
      Trainingsalternativen wie Aqua-Trainer/Manualtherapie — mit dem
      im Original selbst als „zurzeit heftig umstritten" gekennzeichneten
      Vorbehalt zur Knorpel-Regenerationsfähigkeit bewusst mit
      übernommen), `knochen-sehnen-uebergang-sehnenheilung-rehazeitplan`
      (die 3- bis 4-fache Kraftkonzentration am Knochen-Sehnen-Übergang,
      20 % Belastbarkeit nach 4 Wochen Immobilisation, 12 Monate
      Regenerationsdauer, Sehnen-Kollagen-Desorganisation, ein konkreter
      Reha-Zeitplan nach Sehnennaht) und
      `kapsel-faserknorpel-muskelfasertyp-atrophie-immobilisation`
      (Faserknorpel-Einwuchs in die Gelenkkapsel bei Immobilisation als
      Tabelle mit dem Typ-I-/Typ-II-Fasertyp-Atrophieunterschied, plus
      die positionsabhängige Muskelatrophie). Alle drei Einträge wurden
      gegen die bereits bestehenden Einträge zur allgemeinen
      Ruhigstellungs-Problematik (Kap. 4.3, S. 62) und zum
      piezoelektrischen Effekt geprüft — keine inhaltliche Duplikation,
      da jeweils andere Gewebemechanismen im Fokus stehen. Verifiziert
      per Playwright-Screenshot (3/3 Seiten, 0 Console-/Page-Errors).
      **Damit ist Kap. 4.2 vollständig abgedeckt.** Nächster
      Fortsetzungspunkt: Kap. 4.3 (Rückenschmerzen/Trainingsfehler,
      Trainingsalter-Richtlinien, S. 62–65 — noch offen, siehe unten).
- [x] Belastungssteuerung nach Verletzung (Immobilisation vs. kontrollierte
      Bewegung, Kap. 4.3, S. 62)
- [x] Aufwärmen und Abkühlen beim Hundetraining (Kap. 4.3.5–4.3.6, S. 65–67)
- [x] **Kap. 4.3 „Hundesport" (S. 62–70, ph(21)/ph(22).pdf) abgeschlossen
      (25.09.2026).** Fünf neue Einträge:
      `hallgren-studie-rueckenschmerz-trainingsfehler` (die schwedische
      400-Hunde-Studie: >80% der Rückenschmerz-Hunde mit
      Wachstumsphasen-Gelenkerkrankung, 75% der unklar lahmenden Hunde
      mit Rückenschmerz, 91% der häufig am Leinenruck gearbeiteten Hunde
      mit HWS-Schäden, 72% bei Gewalteinwirkung mit Rückenschmerz — als
      Sekundärzitat gekennzeichnet, da Hallgrens Originalstudie nicht
      geprüft wurde, nur Mais Zusammenfassung), `brustgeschirr-passform-kriterien`
      (Passform-Checkliste, warum ein zu enges Geschirr selbst zum
      Risikofaktor wird), `trainingsalter-welpen-junghunde-alte-hunde`
      (Sozialisierungsfenster bis Woche 16, Wachstumsfugenschluss als
      Trainingsgrenze mit rassegrößenabhängigen Monatsangaben als
      Faustregel-Tabelle, Anpassungen für alte Hunde),
      `rassebesonderheiten-training-brachiozephal-herz-fell-boden`
      (brachiozephale Rassen/Herzvorerkrankungen wie DKM/Fellbeschaffenheit
      als Belastungsgrenzen, Untergrund als eigener Risikofaktor je nach
      orthopädischem Profil) und `nutraceuticals-chondroprotektiva-ueberblick`
      (GAG/Chondroitin/Hyaluronsäure/MSM/Omega-3 im Überblick, mit dem im
      Original selbst formulierten Vorbehalt zur unsicheren Wirksamkeit;
      konkrete mg/kg-Dosierungsangaben bewusst NICHT übernommen, da
      tierärztliche Verordnungsdetails außerhalb des
      Nachschlage-Charakters der Bibliothek liegen). Kap. 4.3.5–4.3.6
      (Aufwärmen/Abkühlen) waren bereits durch den bestehenden Eintrag
      `aufwaermen-abkuehlen-hund` vollständig abgedeckt — keine
      Duplikation. Verifiziert per Playwright-Screenshot (5/5 Seiten, 0
      Console-/Page-Errors). **Damit ist Mai Kap. 4 („Training und
      Hundesport") vollständig abgeschlossen.** Nächster
      Fortsetzungspunkt: der noch nicht systematisch gesichtete Rest des
      Buches (Hydrotherapie, westliche Massage-Grundtechniken,
      Bandagieren/Orthesen) oder nächstes Buch aus dem Backlog.
- [x] **Kap. 5.1 „Evaluierung" (S. 71–78, ph(23).pdf) abgeschlossen
      (25.09.2026).** Sechs neue Einträge:
      `force-plate-vs-praktische-lahmheitserkennung` (5.1.1 — warum
      Force-Plate-Messungen trotz wissenschaftlicher Exaktheit nicht
      praxisrelevant sind, die Volten-Technik mit Außenhand-/
      Innenhand-Zuordnung, Untergrund/Zeitpunkt als diagnostisches
      Werkzeug — gute Ergänzung zum bestehenden Eintrag
      `ganganalyse-gangbild`), `lahmheitsgrad-mai-differenzierungsmerkmale`
      (5.1.2 — Mais eigenständige, von der bereits dokumentierten
      Brunnberg-Skala inhaltlich abweichende 4-Grad-Skala mit
      ausdrücklichem Hinweis auf die Verwechslungsgefahr durch die
      zufällig gleiche Nummerierung, die Regelmäßigkeit-als-DD-Kriterium
      mit Central-Pattern-Generator-Erklärung, „Bügeln" als Fachbegriff),
      `schmerzskalen-mathews-hielm-bjorkman` (5.1.5–5.1.6 — Mathews-Skala
      vs. Hielm-Bjorkman-OA-Skala im Vergleich, subtile Schmerzzeichen
      beim stoischen Hund), `body-conditioning-score-bcs` (5.1.7 — die
      5 BCS-Grade als Tabelle, Studienbeleg zur Wirksamkeit reiner
      Gewichtsreduktion bei Arthrose), `goniometrie-rom-messung-grenzen`
      (5.1.8 — warum getrennte Extension-/Flexion-Dokumentation
      aussagekräftiger ist als ein ROM-Summenwert, die ca. 11 %
      Interrater-Varianz als Methodengrenze) und
      `wundheilungsphasen-zeitfenster-reha` (5.1.14 — die vier
      Wundheilungsphasen mit exakten Tagesangaben als Tabelle,
      Konsequenz für die Belastungssteuerung in der Reha). Bewusst NICHT
      übernommen: 5.1.3–5.1.4 (neurologischer Untersuchungsgang/Reflexe —
      Standardwissen ohne caninen-spezifischen Mehrwert gegenüber
      Lehrbuchgrundlagen), 5.1.9–5.1.13 (Muskel-/Gelenkumfangsmessung,
      Schrittlängenmessung, Belastungsmessung, Gangbildänderungen — reine
      Messmethodik-Wiederholungen ohne neuen fachlichen Gehalt gegenüber
      den bereits erfassten Prinzipien). Verifiziert per
      Playwright-Screenshot (6/6 Seiten, 0 Console-/Page-Errors).
      Nächster Fortsetzungspunkt: Kap. 4.3 (Rückenschmerzen/
      Trainingsfehler, Trainingsalter-Richtlinien, S. 62–65, vermutlich
      ph(20)–ph(22).pdf) oder Kap. 5.2 (Therapiepläne für ausgewählte
      Erkrankungen, direkt im Anschluss an S. 78).
- [x] **Kap. 5.2 „Ausgewählte Erkrankungen" (S. 79–85, ph(24).pdf) in seinen
      fachlich dichten Kernabschnitten abgeschlossen (25.09.2026).** Fünf
      neue Einträge: `postoperative-rehabilitation-parameter-abschlusskriterien`
      (5.2.1 — die 5 Entscheidungsparameter für jeden Reha-Plan, die
      Chirurg-Therapeut-Zusammenarbeit inkl. Rücküberweisungskriterien,
      die 5 Abschlusskriterien einer Rehabilitation),
      `hd-operationsmethoden-vergleich-reha` (5.2.3 — Beckenosteotomie/
      Totalendoprothese/Oberschenkelkopfresektion im Vergleich, inkl. des
      Kompensations-Paradoxons bei kleinen Hunden nach
      Oberschenkelkopfresektion), `kreuzbandriss-op-methoden-reha-desmitis`
      (5.2.4 — extrakapsuläre Technik/intrakapsuläre Auto-Implantat-
      Technik/TPLO mit ihren stark unterschiedlichen
      Belastungsfreigabe-Zeitpunkten, plus die TPLO-typische Komplikation
      Desmitis der Patellasehne — ergänzt die bestehenden
      Kreuzbandriss-Einträge um die operationsmethodenspezifische
      Belastungslogik), `frakturheilung-belastung-als-stimulus` (5.2.5 —
      warum Knochenheilung Belastung statt Schonung braucht,
      Osteoporose-Risiko bei Immobilisation, 2–52 Wochen
      Heilungsdauer-Spanne) und `arthrose-risikofaktoren-teufelskreis-schonung`
      (5.2.7 — die vier Risikofaktorengruppen für Arthrose, der
      Teufelskreis aus Schmerz/Schonung/Übergewicht, moderates Training
      als Ausweg). Bewusst NICHT übernommen: 5.2.2 (Gelenkoperationen
      allgemein — reine Woche-für-Woche-Übungsprotokolle ohne
      zusätzlichen Diagnostik-/Differenzierungswert), 5.2.6 (Der
      neurologische Patient — umfangreiche Pflegeanleitung für
      Festlieger; inhaltlich wertvoll, aber als eigenständiger,
      abgegrenzter Themenblock für eine spätere Session zurückgestellt)
      sowie die konkreten Wochenplan-Tabellen (z. B. University-of-
      Tennessee-TPLO-Schema) als reine Technik-Rezepte. Verifiziert per
      Playwright-Screenshot (5/5 Seiten, 0 Console-/Page-Errors).
      Nächster Fortsetzungspunkt: 5.2.2 und 5.2.6 (Der neurologische
      Patient — Festlieger-Pflege) nachholen, dann Kap. 5.3.1 (Manuelle
      Medizin) und 5.3.2 (Tuina) wie unten offen vermerkt, oder Kap. 4.3
      fortsetzen.
- [x] **Kap. 5.2.6 „Der neurologische Patient" (S. 82–84, ph(24).pdf)
      abgeschlossen (25.09.2026).** Ein neuer Eintrag:
      `neurologischer-patient-festliegend-pflege-training` — Pflege-
      grundsätze für festliegende Hunde (Lagerung/Umbetten-Rhythmus,
      Defäkations-/Blasenmanagement inkl. Harnwegsinfekt-Früherkennung
      per Streifentest, Analdrüsenkontrolle, Fellpflege), der erhöhte
      Kalorienbedarf (1,2–1,6-fach) und Sedierung/Schmerztherapie,
      Trainingsprinzipien ohne aktive Bewegungsfähigkeit (passive ROM,
      Flexorreflex-Auslösung, „Radfahren", Sensibilitätsreize, elektrische
      Muskelreizung nur als letzte Stufe) sowie ein konkretes
      Reha-Zeitschema nach Bandscheiben-OP (48h/14 Tage-Meilensteine,
      HWS- vs. BWS/LWS-Schwerpunkt). Bewusst NICHT übernommen: 5.2.2
      (Gelenkoperationen allgemein, reine Wochenplan-Technik-Rezepte).
      Verifiziert per Playwright-Screenshot (1/1 Seite, 0 Console-/
      Page-Errors). **Damit ist Kap. 5.2 vollständig abgeschlossen.**
      Nächster Fortsetzungspunkt: Kap. 5.3.1 (Manuelle Medizin) und 5.3.2
      (Tuina), oder Kap. 4.3 (Rückenschmerzen/Trainingsfehler,
      Trainingsalter-Richtlinien).
- [x] Bewegungstherapie bei Arthrose (Grundprinzipien: kurze Bewegungsphasen,
      viele Pausen, Gewichtsreduktion vor Muskelaufbau, Untergrund) — aus der
      Einleitung von Kap. 5.3 (ph(25).pdf), S. 85
- [x] Ziele und Grundprinzip der Bewegungstherapie (Kap. 5.4, ph(26).pdf, S.
      100f.) — neun Ziele, Abgrenzung zu „einfachem Laufenlassen“
- [x] **Kap. 5.3.1 „Manuelle Medizin" (S. 85–87, ph(25).pdf) abgeschlossen
      (25.09.2026).** Ein neuer Eintrag:
      `manuelle-medizin-drei-schulen-omt-chiropraxis-osteopathie` — OMT
      (Maitland/Mulligan/Kaltenborn, biomechanisch begründet über das
      Konzept der Muskelfunktionsketten), Chiropraxis (Subluxations-
      Modell) und Osteopathie (ganzheitliches Selbstheilungs-Modell) im
      Überblick, jeweils klar als Schulmeinung statt als verifizierte
      Tatsache gekennzeichnet. Besonders wichtig: Die im Original selbst
      berichtete Kontroverse um die Chiropraxis (der Schulmedizin ist es
      nicht gelungen, die postulierten Wirbel-Subluxationen
      röntgenologisch nachzuweisen) wurde bewusst mit übernommen, statt
      das Modell unkritisch als Fakt darzustellen — ein Beispiel für die
      geforderte Abgrenzung zwischen etablierter Biomechanik und
      schulenspezifischer Theorie.
      **Kap. 5.3.2 „Tuina" (S. 86–99, ph(25).pdf) abgeschlossen
      (25.09.2026).** Zwei neue Einträge:
      `tuina-geschichte-tcm-theorie-belegte-wirkungen` (Herkunft/
      Geschichte, TCM-interne Erklärung als ausdrücklich gekennzeichnete
      Schulmeinung — Qi/Yin-Yang/Meridiane NICHT VERIFIZIERT als
      unabhängiger Wirkmechanismus —, getrennt davon die aus westlicher
      Sicht belegten physiologischen Massage-Effekte wie Vasodilatation
      und Gate-Control-Analgesie, Indikationen und eine ausführliche
      Kontraindikationsliste) und `tuina-grifftechniken-glossar` (die 13
      benannten Grifftechniken TUI/NA/AN/MO/ROU/QIA/PAI/KOU/DOU/YAO/GUN/
      ZHEN/CUO als Nachschlage-Tabelle mit Ausführung, Vergleich zur
      westlichen Massage und der jeweils TCM-zugeschriebenen Wirkung,
      plus das Tonisieren-/Sedieren-Prinzip). Beide Einträge halten
      durchgängig die im Backlog geforderte Trennung zwischen
      TCM-Begrifflichkeit und schulmedizinisch verifizierten Aussagen ein.
      Verifiziert per Playwright-Screenshot (3/3 Seiten, 0 Console-/
      Page-Errors). **Damit ist Mai Kap. 5.3 vollständig abgedeckt.**
      Nächster Fortsetzungspunkt: Kap. 4.3 (Rückenschmerzen/
      Trainingsfehler, Trainingsalter-Richtlinien) oder der Rest des
      Buches (Hydrotherapie, westliche Massage-Grundtechniken,
      Bandagieren/Orthesen — noch nicht systematisch gesichtet).
- [x] **Kap. 5.5.24 „Hydrotherapie" (S. 125–127, ph(27).pdf) abgeschlossen
      (25.09.2026).** Zwei neue Einträge:
      `hydrotherapie-physik-auftrieb-druck-widerstand` (Auftrieb als
      Funktion des Körperbaus, die Gelenkbelastungs-Faustregel nach
      Wasserstand als Tabelle — 90 % bis zum Sprunggelenk, 85 % bis zum
      Ellbogen, 40 % bis zur Hüfte, <30 % bis zum Hals —,
      hydrostatischer Druck für den Lymphtransport, Wasserwiderstand als
      Trainingsreiz, Temperaturlogik kühl-für-Training vs.
      lauwarm-für-Reha) und `unterwasserlaufband-indikation-kontraindikation`
      (Einsatzgebiete, vollständige Kontraindikationsliste, praktische
      Hinweise inkl. Waten als geräteloser Alternative). Verifiziert per
      Playwright-Screenshot (2/2 Seiten, 0 Console-/Page-Errors).
      **Kap. 5.5 „Übungen" (S. 107–127+, ph(27).pdf) im Übrigen bewusst
      NICHT einzeln übernommen** — die knapp 25 Einzelübungen
      (Assistiertes Aufrichten, Stehen, Gewichtsverlagern, Stufen,
      Cavaletti, Slalom, Theraband etc.) folgen alle demselben
      Indikation/Wie oft/Wie lange-Rezeptschema, analog zu den bereits an
      anderer Stelle bewusst ausgelassenen Gelenktechnik-Rezepten aus
      Hárrer — reine Anwendungsanleitungen ohne zusätzlichen
      Differenzialdiagnose- oder Mechanismus-Gehalt für die
      Wissensbibliothek. Die kurze Einleitung zu Kap. 5.5 (kleine,
      erreichbare Trainingsziele setzen, Evaluierung bei jeder
      Intervall-Steigerung insbesondere bei Arbeitshunden, Dokumentation
      auch zur eigenen Absicherung) wiederholt bereits an anderer Stelle
      erfasste Evaluierungs-/Dokumentationsprinzipien aus Kap. 5.1 — keine
      Duplikation nötig.
      Nächster Fortsetzungspunkt: Kap. 5.6 „Hilfsmittel" (letztes echtes
      Inhaltskapitel des Buches, siehe unten).
- [x] **Kap. 5.6 „Hilfsmittel" (S. 135–138, ph(28).pdf) abgeschlossen
      (25.09.2026) — damit ist Mai, Physiotherapie und Bewegungstraining
      für Hunde, vollständig durchgearbeitet.** Zwei neue Einträge:
      `hilfsmittel-behinderung-ist-kein-tierleid` (die verbreitete
      Fehlannahme „Behinderung = Leid", der Rollstuhl-Fallbeispiel-Diskurs,
      die Unterscheidung Management- vs. Tierschutzproblem) und
      `rehabilitations-hilfsmittel-uebersicht-schlingen-schienen-rollstuhl`
      (alle 7 Hilfsmittelklassen — Schlingen/Schienen/Boots/Gelenkschoner/
      Rollstuhl/Rampen/Inkontinenzbetten — als Tabelle mit Indikation und
      Anforderungen, plus die alltagspraktische Handhabbarkeits-Dimension
      für den Besitzer). Verifiziert per Playwright-Screenshot (2/2
      Seiten, 0 Console-/Page-Errors).
      **Wichtige Korrektur der bisherigen Annahme:** Das Buch endet nach
      Kap. 5.6 mit „Teil 3 Anhang" (Kap. 6 Kontaktadressen, Kap. 7
      Glossar, Kap. 8 Literatur) — es gibt entgegen der ursprünglichen
      Vermutung KEIN separates Kapitel zu „westlicher Massage" oder
      „Bandagieren/Orthesen". Der Anhang ist wie Hárrers Literaturliste
      kein Extraktionsziel. **Mai ist damit vollständig abgeschlossen.**

### BIOMECHANIK — Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3)

- [x] Das Ellenbogengelenk als drei Teilgelenke, ROM-Werte, "Jena-Studie"
      (effektive vs. gesamte Gelenkbeweglichkeit während Lokomotion) und die
      Überlastungskette Hintergliedmaße → Schultergürtel → Ellenbogen/Schulter
      — Kap. 13, S. 165.
- [x] Die Unterarm-Rotationsgelenke (Art. radioulnaris proximalis/distalis,
      Membrana interossea antebrachii, ~20° Pronation/~50° Supination,
      Radiuskurvensyndrom) — Kap. 14, S. 179.
- [x] Das Karpalgelenk als drei Gelenketagen (Art. antebrachiocarpea,
      mediocarpea, ossis carpi accessorii) plus Metacarpus/Sesambeinchen —
      Kap. 15, S. 192.
- [x] **Rest von Kap. 13 (Ellenbogenregion) gegengelesen (29.09.2026,
      ma(13).pdf, vollständig, 165–179).** Systematisch auf noch nicht
      erfasste Biomechanik-Fakten geprüft — Ergebnis: bereits vollständig
      abgedeckt. Die ROM-Werte (Flexion 30–36°, Extension 160–166°,
      Pronation ~20°, Supination ~50°), die Endgefühle je Bewegungsrichtung,
      die Jena-Studie (135° Gesamt- vs. 20° effektive Bewegung während
      Lokomotion), die Typ-I-Faseranteile der Ellenbogenmuskeln (inkl.
      M. anconeus 100 %) sowie der Proc.-coronoideus-medialis-
      Überlastungsmechanismus durch Rotationskräfte sind bereits in
      bestehenden Einträgen erfasst. Der verbleibende Rest der Datei
      (13.2/13.3: konkrete Untersuchungs-/Behandlungsgriffe wie Traktion,
      Gleiten, Querdehnung, Funktionsmassage, Querfriktion) bleibt bewusst
      NICHT als Wissensbibliothek-Content vorgesehen — praktische
      Handgriffe für ausgebildete Therapeut:innen, kein Nachschlage-Wissen
      (konsistent mit der bisherigen Praxis bei Kap. 17.5). Kap. 13 gilt
      damit als abgeschlossen. Wirbelsäule Kap. 16 — teilweise schon für
      Quellenprüfung gelesen, aber nicht systematisch auf weitere
      Biomechanik-Fakten durchsucht (noch offen).
- [x] Kap. 9 Unterschenkelregion (ma(9).pdf) — proximales/distales
      Tibiofibulargelenk, Membrana interossea cruris, die Diskussion um das
      tatsächliche Bewegungsausmaß über die Talus-Form erklärt — S. 94f.
      (`tibiofibulargelenke`). Die Muskulatur dieser Region (Unterschenkel)
      selbst ist damit noch nicht abgedeckt, nur die Gelenkmechanik.
- [x] **Kap. 6 „Die Hintergliedmaßen" (S. 42, LSÜ-Twist als Kompensations-
      mechanismus bei eingeschränkter Hüftextension) und Kap. 7 „Hüftregion"
      (S. 43–79) vollständig gelesen und umgesetzt (25.09.2026).** Acht neue
      Wissenseinträge: `hueftgelenk-anatomie-rom-endgefuehl` (Kap. 7.1: Art.
      coxae als „Nussgelenk", vollständige ROM-Tabelle, Kapselmuster,
      Endgefühl, Kollodiaphysenwinkel/PennHIP-Hinweis — ergänzt das
      bestehende Anatomie-Item `huefte`), `hueftgelenk-manuelle-
      untersuchung-ortolani-joint-play` (Kap. 7.2.1: Bewegungspalpation,
      Joint Play distal/lateral, Provokation, Ortolani-Test — bestätigt und
      vertieft den im Anatomie-Item `huefte` bereits kurz erwähnten
      Ortolani-Befund), `hueftgelenk-manuelle-therapie-traktion-oszillation`
      (Kap. 7.2.2: Oszillation/Traktion/Gleittechniken je nach
      Einschränkungsrichtung), `hueftflexoren-untersuchung-differenzierung`
      (Kap. 7.3.1: Iliopsoas vs. Rectus femoris, TFL vs. Sartorius
      unterscheiden), `hueftadduktoren-untersuchung-und-
      glutealinsuffizienz` (Kap. 7.3.2: Mechanismus, wie hypertone
      Adduktoren über einen lateralisierten Femurkopf die
      Glutealmuskulatur insuffizient machen), `hueftextensoren-hamstrings-
      fasertyp-differenzierung` (Kap. 7.3.3: Fasertyp-basierte
      Tonus-/Atrophie-Differenzierung Semis vs. M. biceps femoris),
      `hueftrotatoren-kruppenmuskulatur-tiefe-rotatoren` (Kap. 7.3.4 +
      7.3.8: Kruppenmuskulatur + kleine Beckengesellschaft, N.-ischiadicus-
      Warnhinweis, Stabilitätstraining-Prinzip bei Hüftarthrose) und
      `kniegelenk-menisken-patella-biomechanik` (Kap. 8.1: neu entdeckter,
      bisher nicht ausgewerteter Anatomie-Abschnitt zu Meniskusfunktion und
      Patella-Tracking, der beim erneuten Lesen von Kap. 8 zusätzlich zu
      den bereits verwendeten Muskeldaten auffiel — ergänzt die
      bestehenden Kniemuskulatur-Anatomie-Items um die Gelenkbiomechanik).
      **Bewusste Entscheidung:** Die im Original zu jedem Einzelmuskel
      ausführlich beschriebenen Behandlungstechniken (Querdehnung/
      Längsdehnung/Funktionsmassage/Deep friction/Übungen, je Muskel fast
      identisch aufgebaut) wurden nicht 1:1 als Einzeleinträge pro Muskel
      übernommen — das wären 15+ nahezu redundante Rezept-Einträge
      gewesen. Stattdessen wurden die Untersuchungs-/Differenzierungslogik
      (fachlich am wertvollsten für klinisches Denken) sowie die
      Kernprinzipien der Behandlung auf Gelenk- bzw. Muskelgruppenebene
      zusammengefasst. Verifiziert per Playwright-Screenshot (8/8 Seiten,
      0 Console-/Page-Errors).
      **OCR-Qualitätshinweis:** Die Chunk-Extraktion dieses Buchs enthält
      im Bereich der Übungen-Randspalten (z. B. Ende Kap. 7.3.5/7.3.6, um
      „Sitz-Steh-Übung"/Cavaletti/Bergaufgehen) sichtbar verschachtelte,
      teilweise duplizierte Textfragmente (zweispaltiges Layout, beim
      Extrahieren nicht sauber sortiert) — diese Übungslisten wurden
      deshalb bewusst nicht in die neuen Einträge übernommen, da eine
      verlässliche Rekonstruktion aus dem verfügbaren Text nicht möglich
      war. Beim nächsten Fortsetzen dieses Buchs ggf. gezielt prüfen, ob
      andere Kapitel dieselbe Spalten-Verschachtelung zeigen.
      Nächster Fortsetzungspunkt: Rest von Kap. 8 „Knieregion" (Muskulatur/
      Untersuchung/Behandlung ab ca. S. 83, Chunk ma(7).pdf/ma(8).pdf —
      Seitenzuordnung neu prüfen), danach Kap. 13-Rest und Kap. 16
      Wirbelsäule (S. 202).
- [x] **Kap. 8 „Knieregion" vollständig abgeschlossen (25.09.2026), S. 80–94
      (ma(8).pdf).** Vier weitere neue Wissenseinträge:
      `kniegelenk-baender-kapselmuster` (Kap. 8.1: Kreuz-/Kollateralbänder,
      Kapselmuster Extension > Flexion > Rotation — ergänzt
      `kniegelenk-menisken-patella-biomechanik` sowie den bestehenden
      Kreuzband-/Meniskustest-Eintrag um die normale Bandbiomechanik),
      `kniegelenk-manuelle-untersuchung-bewegungspalpation` (Kap. 8.2.1:
      Bewegungspalpation mit den tastbaren „Knick"/„Klaffen"-Signaturen,
      Joint Play, Flexionslimit-DD muskulär vs. Recessus suprapatellaris,
      Pes-anserinus-DD über Kniegelenk-Provokationskombinationen — ergänzt
      die bereits vorhandene Pes-anserinus-DD aus der Hüftregion um die
      Gegenperspektive vom Knie aus), `kniegelenk-manuelle-therapie-
      mobilisation-patella` (Kap. 8.2.2: Mobilisationsrichtung je nach
      Einschränkung, Kompression, Patella-Mobilisation) und
      `kniemuskulatur-popliteus-quadriceps-differenzierung` (Kap. 8.3.1:
      wichtiger Artunterschied — M. popliteus streckt beim Hund das Knie,
      beim Menschen beugt er es —, Vasti-Differenzierung, TFL/Tractus-
      iliotibialis-Hinweis bei Patelladysplasie-Verdacht). Die
      Kreuzband-/Meniskus-Klinik-Tests (Lachmann, Tibiakompressionstest,
      Apley, McMurray) aus diesem Kapitel waren bereits in einer früheren
      Session als eigener Eintrag erfasst — keine Duplikation. **Damit ist
      Hárrer Kap. 6–8 (Hintergliedmaße/Hüfte/Knie) vollständig
      abgedeckt.** Verifiziert per Playwright-Screenshot (4/4 Seiten, 0
      Console-/Page-Errors).
      Nächster Fortsetzungspunkt: Kap. 9 Unterschenkelregion — Muskulatur
      (Gelenkmechanik bereits über `tibiofibulargelenke` abgedeckt, siehe
      oben), danach Kap. 13-Rest und Kap. 16 Wirbelsäule (S. 202).
- [x] **Kap. 9 Unterschenkelmuskulatur abgeschlossen (25.09.2026), S. 95–100
      (ma(9).pdf) — damit ist auch Kap. 9 komplett abgedeckt.** Drei neue
      Wissenseinträge: `unterschenkelmuskulatur-dorsalflexoren-uebersicht`
      (Kap. 9.3.1/9.3.4: M. tibialis cranialis, Mm. peronei longus/brevis,
      Zehenextensoren-Gruppe — inkl. Begriffsklärung „Sprunggelenksflexion"
      = funktionell Anheben der Pfote, nicht Extension wie man es aus der
      Humananatomie kennen könnte), `zehenbeuger-oberflaechlich-tief-
      differenzierung` (Kap. 9.3.2/9.3.3: M. flexor digitorum superficialis
      als Typ-I-faserreicher Antischwerkraftmuskel vs. die tiefen
      Zehenbeuger, samt Differenzierungstests) und
      `musculus-gastrocnemius-sprungfeder-tendo-calcaneus` (Kap. 9.3.3:
      Sprungfeder-Energiespeicherfunktion, Fabellae als
      Tendopathie-Prädilektionsstelle, sowie der klinisch wichtige
      Praxistipp zur Unterscheidung Teilriss — nur Gastrocnemius-Sehne,
      Tarsalgelenk übermäßig flektiert, Zehen gebeugt — vs. Komplettriss
      des gesamten Tendo calcaneus communis — Tarsalgelenk plantigrad;
      ergänzt den bestehenden Koch/Fischer-Eintrag `tarsus-erkrankungen-
      hund` um dieses Unterscheidungsmerkmal). Verifiziert per
      Playwright-Screenshot (3/3 Seiten, 0 Console-/Page-Errors).
      **Damit sind Hárrer Kap. 6–9 (Hintergliedmaße komplett von Hüfte bis
      Zehen) vollständig abgedeckt.** Nächster Fortsetzungspunkt: Kap. 13
      Rest (Ellenbogenregion) oder Kap. 16 Wirbelsäule (S. 202) — beide
      noch komplett offen für systematische Biomechanik-Auswertung
      (bisher nur einzelne Fakten für die Quellenprüfung entnommen).
- [x] **Kap. 16 „Die Wirbelsäule" (S. 202–247, ma(16).pdf) — Kernabschnitte
      gelesen und umgesetzt (25.09.2026), gezielt statt vollständig.**
      Wegen des enormen Umfangs (3265 Zeilen, HWS+BWS+Rippen+Sympathikus+
      LWS+ISG+Rute als Gelenkkapitel, dazu ein komplettes Muskelkapitel mit
      derselben Region-für-Region-/Muskel-für-Muskel-Untersuchungs- und
      Behandlungstiefe wie in Kap. 7–9) wurde bewusst selektiv gelesen:
      die allgemeinen, wirbelsäulenübergreifenden Grundlagenabschnitte
      (16.1, 16.1.1, 16.1.2) vollständig, das ISG-Unterkapitel (16.2.7)
      vollständig (da von den Kap.-6/7/9-Einträgen bereits als
      Cross-Reference „Differenzialdiagnostik siehe Kap. LWS/ISG"
      angekündigt), sowie der einleitende Muskel-Funktionsteil (16.3.1)
      und die subokzipitale Muskulatur (16.3.2) als Beispiel für die
      Untersuchungstiefe der übrigen Muskelgruppen. **Bewusst NICHT
      gelesen:** die einzelnen Gelenk-Untersuchungs-/Behandlungskapitel
      pro Wirbelsäulenabschnitt (16.2.1–16.2.4 HWS/BWS/Rippen, 16.2.5
      Sympathikus, 16.2.6 LWS-Einzeltechniken, 16.2.8 Rute) sowie die
      übrigen Muskelgruppen-Kapitel (16.3.3–16.3.11: Rumpfmuskulatur,
      Bauchmuskulatur, Atemmuskulatur) — das sind, analog zu den
      Hüft-/Knie-/Unterschenkelkapiteln, hunderte nahezu identisch
      aufgebaute Einzeltechniken (Palpation/Schmerzprovokation/
      Längenveränderung je Muskel bzw. Bewegungspalpation/Joint
      play/Mobilisation je Segment), deren vollständige Auswertung den
      Rahmen einer einzelnen Session sprengen würde.
      Sieben neue Wissenseinträge: `wirbelsaeule-ligamente-cecs-
      spondylose` (16.1/16.1.1: alle Wirbelsäulenbänder mit Funktion,
      plus der Mechanismus, wie Bandscheibenhöhenverlust den
      Spinalnerv-Platz im Foramen intervertebrale verengt — direkte
      Verbindung zu CECS/Wobbler-Syndrom und zur Spondylose-Entstehung
      am Lig. longitudinale ventrale bei Hypermobilität),
      `wirbelsaeulendysfunktionen-ursachen-mobilisationsprinzipien`
      (16.1.2: Ursachen/Folgen von WS-Blockaden, welche
      Mobilisationstechnik zu welcher Pathologie passt, Kontraindikationen),
      `iliosakralgelenk-anatomie-symptome-ursachen` (16.2.7: ISG-Anatomie,
      vollständige Symptomliste inkl. Fossa-ischiorectalis-/N.-pudendus-
      Verbindung zu Blasen-/Darmproblemen, Ursachenliste),
      `iliosakralgelenk-sakrum-ilium-laesion-beinlaenge` (16.2.7:
      Sakrum- vs. Iliumläsion, Befundtabelle Ilium dorsal/ventral,
      funktioneller vs. anatomischer Beinlängenunterschied),
      `iliosakralgelenk-manuelle-untersuchung-provokationstests` (16.2.7:
      DD Hüfte-ISG-LWS-Provokation, die validierte ⅗-Regel nach Fortin
      et al., Bewegungspalpation/Vorlaufphänomen/Federtest),
      `autochthone-rueckenmuskulatur-funktionelle-anatomie` (16.3.1:
      dorsale/ventrale Rückenmuskelgruppen, die M.-longissimus-Kette als
      Erklärung für Becken→obere-HWS-Fortleitung, allgemeine muskuläre
      Symptomliste) und `subokzipitale-muskulatur-kopfschmerz-schwindel`
      (16.3.2: Überlastungsauslöser wie Apportieren/Kong-Kauen/
      Hochschauen zum Halter, Symptome bis hin zu vagusvermittelter
      Übelkeit und Sehstörungen). Verifiziert per Playwright-Screenshot
      (7/7 Seiten, 0 Console-/Page-Errors).
      Nächster Fortsetzungspunkt: Kap. 16.2.1–16.2.6/16.2.8 (HWS/BWS/
      Rippen/Sympathikus/LWS/Rute — Einzelgelenk-Techniken) und Kap.
      16.3.3–16.3.11 (übrige Rückenmuskelgruppen), danach Kap. 13-Rest
      (Ellenbogenregion) und Kap. 10–12 (Vordergliedmaße-Regionen, noch
      nicht auf Vollständigkeit geprüft).
- [x] **Kap. 16-Rest: funktionelle Anatomie/Differenzialdiagnostik aller
      Wirbelsäulenabschnitte sowie Rumpf-/Atemmuskulatur abgeschlossen
      (25.09.2026), S. 204–252 (ma(16).pdf) — nach demselben selektiven
      Prinzip wie beim ersten Kap.-16-Durchgang: Anatomie/Funktion/
      Differenzialdiagnostik/benannte Tests vollständig übernommen, die
      reinen Einzelgelenk-/Einzelmuskel-Bewegungspalpations-/Joint-play-/
      Mobilisationsrezepte weiterhin bewusst ausgelassen (identisches
      Muster wie bei den Hüft-/Knie-/Unterschenkelkapiteln).**
      Elf neue Wissenseinträge: `obere-hws-funktionelle-anatomie-atlas-
      foramen-jugulare` (Kap. 16.2.1: C0/C1-Kopplung, der Atlas-Foramen-
      jugulare-Hirnnerven-Mechanismus als Lehrbeispiel für „Ursache ≠
      Symptomort"), `obere-hws-instabilitaet-dens-warnsignale` (Kap.
      16.2.1: Dens-/Lig.-transversum-Sicherungsmechanismus und konkrete
      Überweisungskriterien — sicherheitsrelevant), `untere-hws-
      funktionelle-anatomie-differentialdiagnosen` (Kap. 16.2.2:
      Palpationslandmarken, gekoppelte Bewegungen, Dermatom-Hinweis
      supraskapulär, Ursachenliste), `bws-funktionelle-anatomie-
      facettengeometrie` (Kap. 16.2.3: Facettenwandel kranial→kaudal,
      Th10-Sonderstellung, Th10–L1-Spondylose-Risiko, Symptom-/
      Ursachenliste inkl. Organe/Diaphragma), `bws-springingtest-rosett-
      test-differenzierung` (Kap. 16.2.3/16.2.4: die zwei benannten
      Provokationstests plus die Rippen-Bandscheiben-DD über mediale
      Translation, inkl. Rotwarnsignal „Hund geht in die Knie" = Diskus
      statt „Muskelzucken" = Facettengelenk), `rippen-anatomie-1-rippe-
      stellungsdiagnose` (Kap. 16.2.4: Pumpenschwengel- vs.
      Eimerhenkelbewegung, Rippen-Bandscheiben-Kopplung, Stellungs-
      diagnostik 1. und 2.–13. Rippe), `sympathikus-manuelle-therapie-
      wirkmechanismus` (Kap. 16.2.5: der komplette neurophysiologische
      Erklärungsmechanismus, warum Manuelle Therapie als Reflextherapie
      wirkt — Negativspirale, Kollagen-/Cross-Link-Veränderungen,
      C8–L4-Stimulationsprinzip), `lws-facettengeometrie-instabilitaet-
      bandscheibe` (Kap. 16.2.6: L4-Übergangszone, vier
      Facettengelenk-Formen, die 42-%/47-%-Schäferhund-Zahlen nach
      Benninger et al. 2006, der Instabilitäts-Bandscheiben-Mechanismus
      als mögliche IVDD-Teilerklärung bei lang-kurzbeinigen Rassen),
      `hypaxiale-muskulatur-iliopsoas-diaphragma-thoracic-outlet` (Kap.
      16.3.4: die fasziale Kette Iliopsoas→Diaphragma→Organmotilität→
      N. vagus, plus das Thoracic-outlet-Risiko der Mm. scaleni am
      Plexus brachialis), `epaxiale-stammmuskulatur-erector-spinae-
      multifidi` (Kap. 16.3.3: M.-erector-spinae-Funktionseinheit, die
      Fascia-thoracolumbalis-Kette „hinten"→„vorne", Multifidus-Tonus
      als Facettenproblem-Indikator, methodische Grenzen der
      Kurzmuskel-Längentestung) und `atemmuskulatur-inspiratoren-
      exspiratoren-uebersicht` (Kap. 16.3.5/16.3.6: vollständige
      Inspiratoren-/Exspiratoren-Übersicht, Diaphragma-Palpation,
      Intercostales-externi-vs.-interni-Gegensatz). Verifiziert per
      Playwright-Screenshot (11/11 Seiten, 0 Console-/Page-Errors).
      **Damit ist Hárrer Kap. 16 „Die Wirbelsäule" in seinen fachlich
      dichten Kernabschnitten (Anatomie, Funktion, Differenzialdiagnostik,
      benannte Tests) vollständig ausgewertet.** Weiterhin offen (bewusst
      ausgelassen, siehe oben): alle reinen Bewegungspalpations-/Joint-
      play-/Mobilisationstechnik-Rezepte für einzelne Wirbelsäulen-
      segmente sowie 16.3.7–16.3.11 (Behandlungstechniken der bereits
      untersuchten Muskelgruppen) und 16.2.8 Rute (dünner Anatomieteil,
      nur Facettengelenke an den ersten 4 Schwanzwirbeln, kein
      eigenständiger Eintrag nötig).
      Nächster Fortsetzungspunkt: Kap. 13-Rest (Ellenbogenregion) oder
      Kap. 10–12 (Vordergliedmaße-Regionen, noch nicht auf Vollständigkeit
      geprüft).
- [x] **Kap. 10 „Sprunggelenk und Zehen" (S. 112, ma(10).pdf) sowie Kap. 13
      „Ellenbogenregion" (S. 165–178, ma(13).pdf) abgeschlossen
      (25.09.2026).** Kap. 10 besteht zu über 90 % aus reinen
      Gelenk-für-Gelenk-Joint-play-Rezepten (Fixation + Gleiten dorsal/
      plantar für jedes einzelne Tarsal-/Zehengelenk) nach demselben
      Fixations-/Gleit-Prinzip wie die bereits erfassten Gelenktechniken —
      diese wurden bewusst nicht einzeln übernommen. Ein neuer Eintrag:
      `sprunggelenk-zehen-funktionelle-anatomie-hyperaesthesien` (Kap.
      10.1: warum nur die Art. tarsocruralis wirklich beweglich ist,
      Zehenanatomie, und die Nervenversorgungs-/Hyperästhesie-Liste als
      Differenzialdiagnose zu vorschnell dermatologisch gedeutetem
      Beknabbern). **Kap. 13 komplett abgeschlossen** — zwei neue
      Einträge: `ellenbogenmuskulatur-flexoren-extensoren-fasertyp` (Kap.
      13.1.2: Flexoren M. biceps brachii/M. brachialis, Extensoren M.
      triceps brachii mit seinen 4 Köpfen/M. tensor fasciae antebrachii/
      M. anconeus — Fasertyp- und Funktionsübersicht, ergänzt den
      bestehenden Eintrag zur Ellenbogengelenk-Biomechanik aus
      Kap. 13, S. 165) und `processus-coronoideus-medialis-ueberlastung-
      provokation` (Kap. 13.1.1/13.2.1: der Rotations-Überlastungs-
      mechanismus am medialen Kronfortsatz, seine Verbindung zur
      Bizepssehnen-Ansatzreizung, und die gezielte Provokationstechnik).
      Die Unterarm-Gelenkanatomie (Kap. 14.1.1, gleich im Anschluss
      gelesen) sowie die Toe-in-/Toe-out-Nervenkompression (Kap. 14
      Einleitung) waren bereits als `unterarm-rotationsgelenke` bzw.
      `toe-in-toe-out-nervenkompression` aus früheren Sessions erfasst —
      keine Duplikation. Verifiziert per Playwright-Screenshot (3/3
      Seiten, 0 Console-/Page-Errors).
      Nächster Fortsetzungspunkt: Kap. 11/12 (Vordergliedmaße-Einleitung
      und Schulterregion/skapulothorakales Gleitlager, S. 126–164, noch
      komplett offen).
- [x] **Kap. 12 „Schulterregion und skapulothorakales Gleitlager" (S. 127–144,
      ma(12).pdf) abgeschlossen (25.09.2026).** Gelesen: 12.1.1–12.1.5
      (Skapula-Anatomie, skapulothorakales Gleitlager/Synsarkose statt
      echtem Gelenk, Schultergelenk-Anatomie/ROM/Kapselmuster/
      Stabilisatoren, Schultergürtel-/Schultergelenkmuskulatur), 12.2.1
      (spezifische Untersuchung — Bizepstest, Stabilitätstests) und
      12.3.1–12.3.4 (Muskelgruppen-Untersuchung). Drei neue Einträge:
      `schultergelenk-skapulothorakales-gleitlager-anatomie` (warum die
      Skapula muskulär statt gelenkig am Thorax hängt und die
      Konvex-Konkav-Regel hier nicht gilt, Schultergelenk-ROM/
      Kapselmuster/Stabilisatoren, die Biceps-Schulter-Korrelation),
      `bizepstest-schultergelenk-stabilitaetstests` (Bizepstest als
      Rupturzeichen der Ursprungssehne, Sulcus-intertubercularis-
      Provokation, mediales/laterales Gapping mit Stabilisator-Zuordnung)
      und `schultergelenkmuskulatur-flexoren-extensoren-differenzierung`
      (oberflächliche/tiefe Schultergürtelmuskulatur als Tabelle, der
      Flexor-/Extensor-Funktionswechsel je nach Sehnenverlauf vor/hinter
      der Rotationsachse bei M. infraspinatus/M. subscapularis/
      M. coracobrachialis, Differenzierung per Ausschluss- und
      Zusatzbewegung, M.-supraspinatus-Kontraktur bei sehr aktiven
      Hunden). Bewusst ausgelassen: 12.2.2 (Behandlung der
      Stabilitätsdefizite) und 12.3.5–12.3.8 (Behandlungstechnik-Rezepte
      für die einzelnen Muskelgruppen) — reine, bereits aus anderen
      Kapiteln bekannte Technik-Rezepte ohne neuen fachlichen Gehalt.
      Verifiziert per Playwright-Screenshot (3/3 Seiten, 0 Console-/
      Page-Errors).
      Nächster Fortsetzungspunkt: Kap. 11 (Vordergliedmaße-Einleitung,
      laut Inhaltsverzeichnis sehr kurz, S. 126) oder nächstes Buch aus
      dem Backlog, falls Kap. 11 keinen eigenständigen Eintrag
      rechtfertigt.
- [x] **Kap. 11 „Die Vordergliedmaßen" (Einleitung, S. 126, ma(11).pdf)
      abgeschlossen (25.09.2026).** Wie erwartet sehr kurz, aber
      fachlich eigenständig (keine Überschneidung mit den bereits aus
      Kap. 6–10/12/13 erfassten Gelenk-/Muskel-Inhalten): rassebedingte
      Gewichtsverteilung auf die Vordergliedmaße (60% im Mittel, 80%
      Whippet vs. 58% Rottweiler) und ihre Konsequenz für die
      Kompensationsfähigkeit bei Lastumverteilung, das Täter-Opfer-Prinzip
      (verspannte Schultergürtelmuskulatur schränkt die
      Skapulabeweglichkeit ein → kleinere Schritte → Gelenküberlastung als
      Folge, nicht Ursache), der Zusammenhang Skapulawinkelung↔Gangbild
      (steil → Stechtrab, physiologisch z. B. beim Foxterrier; flach →
      raumgreifender Trab), und das Schwerelot als klinisches
      Beurteilungskonzept für eine physiologische Skapulastellung. Ein
      neuer Eintrag: `vordergliedmasse-gewichtsverteilung-taeter-opfer-prinzip`.
      Verifiziert per Playwright-Screenshot (1/1 Seite, 0 Console-/
      Page-Errors).
      **Damit sind Hárrer Kap. 6–13 vollständig ausgewertet** (die
      fachlich dichten Kernabschnitte; reine Technik-Rezepte bewusst
      ausgelassen, siehe oben). Nächster Fortsetzungspunkt: verbleibende
      Hárrer-Kapitel (Kap. 14 nur teilweise erfasst — Unterarm-
      Rotationsgelenke und Toe-in/Toe-out sind vorhanden, der Rest von
      Kap. 14 sowie Kap. 15, 17, 18 sind noch nicht auf Vollständigkeit
      geprüft) oder nächstes Buch aus dem Backlog.
- [x] **Kap. 14-Rest (Unterarmregion, S. 179–191, ma(14).pdf) und Kap. 15.1
      (Karpalgelenk-/Zehen-Anatomie, S. 192f., ma(14)/ma(15).pdf) auf
      Vollständigkeit geprüft (25.09.2026) — bereits vollständig
      abgedeckt, keine neuen Einträge nötig.** Geprüft und als bereits
      vorhanden bestätigt: Unterarmmuskulatur (Supinatoren/Pronatoren/
      Extensoren/Flexoren inkl. Fasertyp-Angaben) als Anatomie-Items,
      Radioulnargelenk-Anatomie als `unterarm-rotationsgelenke`,
      Toe-in/Toe-out-Mechanismus als `toe-in-toe-out-nervenkompression`,
      Karpalgelenk-Etagen/Metacarpus/Sesambeine als
      `karpalgelenk-gelenketagen`, Zehen-Beknabbern-DDx als
      `zehen-beknabbern-differentialdiagnosen`, Radiuskurvensyndrom
      ebenfalls vorhanden. Die reinen Gelenk-/Muskel-Technik-Rezepte
      (14.2.1–14.2.2, 14.3.1–14.3.7) bleiben wie gehabt bewusst
      ausgelassen.
      **Kap. 15.2 (Karpal-/Zehen-Kleingelenke, S. 193f., ma(15).pdf)
      abgeschlossen (25.09.2026).** Zwei neue Einträge:
      `mtp-pip-dip-gelenktypen-zehengang` (MTP als zweiachsiges
      Scharniergelenk vs. PIP/DIP als Sattelgelenke, ROM,
      Sesambein-Bandapparat, der klinische Gangbild-Marker „wie auf
      Eiern" bei PIP/DIP-Funktionsverlust) und
      `os-carpi-accessorium-nervus-ulnaris-differenzierung` (der
      N.-ulnaris-Ast unter der Bandfixierung des Os carpi accessorium —
      Loge-de-Guyon-Analogie beim Hund — als Ursache falsch-positiver
      Gelenkprovokation bei Sporthunden, arthrogen/neurogen-
      Differenzierung). Die restlichen Technik-Rezepte in 15.2.1/15.2.3–
      15.2.6 bewusst ausgelassen (reine Joint-play-/Gleit-/Traktions-
      Wiederholungen bereits bekannter Prinzipien). Verifiziert per
      Playwright-Screenshot (2/2 Seiten, 0 Console-/Page-Errors).
      **Damit ist Hárrer Kap. 14/15 (Unterarm, Karpalgelenk, Zehen)
      vollständig ausgewertet.** Laut Inhaltsverzeichnis am Ende von
      ma(15).pdf folgt als Teil 4 nur noch Kap. 16 (Wirbelsäule, bereits
      abgedeckt) und Kap. 17 „Neurotension" (S. 269, noch offen).
      Nächster Fortsetzungspunkt: Kap. 17 Neurotension prüfen (vermutlich
      ma(16)–ma(18).pdf) oder nächstes Buch aus dem Backlog.
- [x] **Kap. 17.1 „Neurotension — Anatomie" (S. 273–277, ma(17).pdf)
      abgeschlossen (25.09.2026).** ma(18).pdf enthält entgegen der
      Namenskonvention nur noch Kap. 18 „Literaturliste" und das
      Sachverzeichnis (kein eigener Inhaltskapitel-Text mehr) — Kap. 17
      „Neurotension" (S. 269–297) liegt komplett in ma(17).pdf. 17.2–17.5
      (Ursachen/Symptome der Mechanosensitivität, Wirkprinzip,
      Kontraindikationen, Nervenleitung) waren bereits aus einer früheren
      Session vollständig erfasst (`nervenkompression-...`,
      `neurotensionsbehandlung-wirkprinzip-kontraindikationen`) — geprüft,
      keine Duplikate. Drei neue Einträge aus dem bisher unbearbeiteten
      17.1 (Anatomie): `nervenwurzeln-bindegewebeschichten-nervenspannung`
      (Bewegungsverhalten der Nervenwurzeln bei Wirbelsäulenbewegung, die
      vier Bindegewebeschichten Endo-/Peri-/Epi-/Mesoneurium als Tabelle,
      der Verklebungsmechanismus am Mesoneurium bei Überlastung),
      `nervenblutversorgung-ischaemie-zeitfenster` (intra-/extraneurales
      Gefäßsystem mit Schutzmechanismus, das 2-Stunden-Zeitfenster bis zum
      irreversiblen peripheren Nervenschaden vs. 3–8 min im Gehirn,
      longitudinales/transversales Rückenmark-Gefäßsystem, klappenloses
      venöses System) und `meningen-membranoeses-system-dura-verbindungen`
      (die drei Hirnhäute, Fixationspunkte der Dura vom Sakrum bis zur
      Schädelbasis, das membranöse System, der theoretische Wirkweg einer
      Sakrumfehlstellung bis zum Kopf — mit den im Original ausdrücklich
      als „beim Hund nicht bestätigt" markierten Übertragungen aus der
      Humananatomie bewusst 1:1 als Unsicherheit übernommen statt als
      sichere caninen Fakten dargestellt). Bewusst NICHT übernommen:
      17.1.1–17.1.3 (generische, nicht caninen-spezifische
      Neurophysiologie-Grundlagen: Sympathikus-Grenzstrang-Anatomie,
      Neuron-/Erregungsleitungs-Grundlagen, Spinalnerv-Grundaufbau — zu
      lehrbuchgenerisch für eigenständige Einträge), 17.1.7 (Befestigungen
      der Neuralstrukturen — als kompakte Liste in den
      Nervenwurzeln-Eintrag integriert), 17.2.2 (konkrete
      „Spannungspunkte" C6/7 etc. — bereits in der Vorsession bewusst
      ausgelassen, da die Autorin deren Übertragbarkeit auf den Hund
      selbst als unüberprüfbar bezeichnet), sowie 17.5 (die einzelnen
      Neurotensionstests je Nerv mit ASTE/Griff/Ausführung — praktische
      Technik-Rezepte) und 17.5.3 (Druckpunktpalpation/vollständige
      Nervenverlaufsanatomie für Hintergliedmaßen-Nerven — umfangreicher
      Nerven-Atlas, noch nicht ausgewertet). Verifiziert per
      Playwright-Screenshot (3/3 Seiten, 0 Console-/Page-Errors).
      Nächster Fortsetzungspunkt: 17.5.3 (Nervenverlauf/Druckpunkte N.
      ischiadicus/tibialis/peroneus/femoralis/saphenus/obturatorius,
      inkl. der interessanten Differenzialdiagnose „kein
      Piriformis-Syndrom beim Hund möglich") oder nächstes Buch aus dem
      Backlog — **damit ist Hárrer im Kern (Kap. 6–17) durchgearbeitet**,
      nur noch dieser Spezial-Abschnitt sowie Kap. 18 (reine
      Literaturliste, nicht extraktionsrelevant) stehen aus.
- [x] **Kap. 17.5.3 „Druckpunktpalpation" — Nervenverlaufsanatomie
      (S. 288–297, ma(17).pdf) im Kern abgeschlossen (25.09.2026).** Vier
      neue Einträge: `n-ischiadicus-verlauf-kein-piriformis-syndrom`
      (Verlauf/Aufzweigung des N. ischiadicus plus die caninen-spezifische
      Differenzialdiagnose, dass ein Piriformis-Syndrom beim Hund
      anatomisch nicht möglich ist — andere Muskelschichtung als beim
      Menschen), `hintergliedmasse-nerven-femoralis-saphenus-obturatorius`
      (N. femoralis/N. saphenus/N. obturatorius als Tabelle mit Verlauf/
      Versorgung/Palpation, plus das Halbkreis-Gangbild bei
      N.-obturatorius-Schädigung als leicht fehlinterpretierbares
      Hüft-/Knie-Differential), `vordergliedmasse-nerven-radialis-medianus-ulnaris-verlauf`
      (N. radialis/N. medianus/N. ulnaris als Tabelle inkl. der
      ungeschützten N.-radialis-Engstelle an der Crista supracondylaris
      lateralis, sowie die Erklärung, warum eine Ellenbogendenervation bei
      ED — anders als am Hüftgelenk — keine guten Ergebnisse liefert, weil
      auch periostale Fasern die Kapsel mitinnervieren) und
      `karpaltunnelsyndrom-hund-hypothese` (der biomechanisch plausible,
      aber von der Autorin ausdrücklich als unbewiesen gekennzeichnete
      Mechanismus eines caninen Karpaltunnelsyndroms bei
      Sprunglandungen — inkl. der Mahnung, Pfoten-Beknabbern nicht
      vorschnell auf Allergie/Grasmilben zu schieben). Bewusst NICHT
      übernommen: die vollständigen Verlaufsbeschreibungen für N. tibialis
      und N. peroneus (reine Palpationslandmarken ohne zusätzlichen
      Differenzialdiagnose-Mehrwert gegenüber den bereits erfassten
      Nerven) sowie 17.5.4 (Behandlung der peripheren Nerven —
      Technik-Rezepte). Verifiziert per Playwright-Screenshot (4/4 Seiten,
      0 Console-/Page-Errors).
      **Damit ist Hárrer, Manuelle Therapie beim Hund, in seinen fachlich
      dichten Kernabschnitten vollständig ausgewertet (Kap. 6–17).**
      Kap. 18 ist reine Literaturliste, kein Extraktionsziel mehr.
      Nächster Schritt: nächstes Buch aus dem Backlog wählen (Mai
      Physiotherapie Restkapitel inkl. Tuina, Hohmann Bewegungsapparat
      Restkapitel, VetCenter Wirbelsäulenerkrankungen, oder
      Baumgartner/Wittek/Khol trotz der bekannten
      Qualitätseinschränkungen).

### BIOMECHANIK — Hohmann, Bewegungsapparat Hund (ISBN 978-3-13-245265-7)

- [x] **Kap. 2 „Statik und Dynamik des Hundes" vollständig abgeschlossen
      (25.09.2026), S. 22–30 (b3.pdf).** Vier neue BIOMECHANIK/PATHOLOGIE-
      Wissenseinträge: das Bogensehnenbrücken-Bauprinzip (Brückenbogen/
      -sehne/Tragegurt, unterschiedliche Anbindung von Vorder-/Hintergliedmaße,
      Auffang- vs. Stemmhebelwerk), eine Übersicht der Ursachen gestörter
      Gelenkfunktion (Circulus vitiosus, Wachstumsstörungen, endokrine/
      immunologische/infektiöse Ursachen, funktionell vs. strukturell als
      Therapieweiche), Muskelfunktionsstörungen (Hypo-/Hypertonus, passive/
      aktive Muskelinsuffizienz, zwei Atrophietypen mit Zeitfenster:
      Inaktivitätsatrophie 3–4 Wochen vs. degenerative Atrophie innerhalb
      einer Woche) sowie Schwerkraft/Masse-Feder-Modell (Beuger-/Strecker-
      Verhältnis, elastische Energierückgewinnung nach Gelenk und Gangart,
      Schwerpunktlage 3/5 vorne). Bewusst nicht dupliziert: die bereits
      vorhandenen Einträge `tonische-und-phasische-muskulatur` (anderer
      Circulus-vitiosus-Mechanismus, Kap. 6.1) und `offene-geschlossene-
      muskelkette` (enthält bereits eine Teilliste der Antischwerkraft-
      muskeln für die Stemmphase) wurden respektiert, nicht wiederholt. Die
      Schwerpunkt-Gewichtsverteilung ergänzt den bestehenden Hárrer-Kap.-11-
      Eintrag (`vordergliedmasse-gewichtsverteilung-taeter-opfer-prinzip`)
      als zweite unabhängige Quelle mit teils abweichenden Rassebeispielen
      (Dobermann, Deutscher Schäferhund, Greyhound statt Hárrers Beispielen)
      — beide Quellen stimmen im Kernbefund überein. Verifiziert via
      Playwright (4/4 Seiten, 0 Fehler) und visueller Kontrolle der beiden
      tabellenlastigen Einträge.
- [x] **Kap. 3 „Schwerpunkt und Unterstützungsfläche" vollständig
      abgeschlossen (25.09.2026), S. 31–35 (b4.pdf).** Abschnitt 3.1
      „Schwerpunkt" bereits über Kap. 2 mit abgedeckt (b3.pdf reicht bis
      S. 31). Für Abschnitt 3.2 „Die Unterstützungsfläche" zwei neue
      Wissenseinträge: Grundlagen/Regelkreis (Definition, Rezeptoren-Regelkreis
      der Gleichgewichtskontrolle, sechs physiologische Situationen von
      Bauchlage bis Greyhound-Bemuskelung, BIOMECHANIK) sowie pathologische
      Veränderungen (Verkleinerung/Vergrößerung, Dreibeinigkeits-Tabelle mit
      gegensätzlicher Schwerpunktverlagerung je nach amputierter/geschonter
      Gliedmaße, Cauda-equina-Endstadium, Normalisierung durch Physiotherapie
      als Therapieziel, PATHOLOGIE). Damit ist auch Kap. 3 komplett
      abgedeckt — Teil 1 „Klinische Untersuchung/Statik und Dynamik" des
      Buches ist nun vollständig ausgewertet. Verifiziert via Playwright
      (2/2 Seiten, 0 Fehler).
- [x] **Kap. 4 „Der Knochen" vollständig abgeschlossen (25.09.2026), S. 38–47
      (b5.pdf).** Sechs neue Wissenseinträge: Knochenaufbau (organisch/
      anorganisch mit Zug-/Druckkraft-Zuordnung, Makro-/Mikrostruktur inkl.
      Osteon/Havers-/Volkmann-Kanal, BIOMECHANIK), sechs Knochenformen inkl.
      Sesambeine/Organknochen (ANATOMIE), trajektorielle Struktur/Minimal-
      Maximal-Prinzip + Knochendichte-Alterseffekt (BIOMECHANIK), sechs
      Knochenfunktionen inkl. Humerus-Tibia-Kraftübertragungsanalogie als
      OCD-Erklärung (BIOMECHANIK, mit epistemischem Vorbehalt beim
      Osteocalcin-Fruchtbarkeitsbefund, der im Original nur an Mäusen gezeigt
      wurde), Knochenwachstum mit Zeitfenstern/Kastrationseffekt/
      Statikfolgen-Liste (PATHOLOGIE) sowie der piezoelektrische Effekt aus
      physikalisch-historischer Perspektive (Curie-Brüder 1880, Shamos/
      Lavine 1967, Osteoklasten-Mechanismus mit Howship-Lakune, BIOMECHANIK).
      Bewusst nicht dupliziert: Kap. 5.1 „Einteilungen der Gelenke" (S. 48,
      identische Tab. 5.1–5.3) ist bereits über den bestehenden Eintrag
      `gelenktypen-klassifikation` abgedeckt — hier nur Kap. 4 extrahiert.
      Der neue Piezoelektrizitäts-Eintrag ergänzt bewusst den bestehenden
      `piezoelektrischer-effekt-knochenumbau-belastung` (Mai Kap. 4.2) um die
      physikalischen Grundlagen, statt dessen klinische Kennzahlen
      (Kalziumverdopplung, Stress Shielding) zu wiederholen. Die
      Wachstumsstörungen Panostitis/OCD/hypertrophe Osteodystrophie wurden
      nicht erneut im Detail behandelt (bereits über Koch/Fischer
      differenziert), nur die neue Statikfolgen-Liste (Supination,
      Karpushyperextension, Radius curvus, X-/O-Beinigkeit u. a.) ergänzt.
      Verifiziert via Playwright (6/6 Seiten, 0 Fehler).
- [x] **Kap. 5.1–5.3 „Das Gelenk" (allgemeine Gelenkphysiologie) vollständig
      abgeschlossen (25.09.2026), S. 48–60 (b6.pdf).** Kap. 5.1 „Einteilungen
      der Gelenke" war bereits über den bestehenden Eintrag
      `gelenktypen-klassifikation` abgedeckt (identische Tab. 5.1–5.3, keine
      erneute Extraktion nötig). Sechs neue Wissenseinträge zu Kap. 5.2/5.3:
      Gelenkknorpel (Vier-Schichten-Struktur, Reibungskoeffizienten mit
      Wärmeentwicklung bis 70 °C, Über-/Unterbelastungs-Degenerationskaskade
      — ergänzt bewusst den bestehenden Pumpmechanismus-Eintrag aus Mai statt
      ihn zu wiederholen), Gelenkkapsel mit den vier Mechanorezeptortypen
      (Typ 1 bei Arthritis, Typ 4 bei Arthrose), Synovia/Gelenkbänder als
      Bänder-Muskel-Funktionseinheit (Ligg. articularia/capsularia/
      intracapsularia), die Menisken (Inkongruenzausgleich, mediale
      Fixierung vs. laterale Beweglichkeit, Vaskularisierung nur 10–15 %),
      allgemeine Gelenkbiomechanik (Hebelarme, gewichttragende vs.
      Gelenkkontaktfläche, Circulus vitiosus bei gestörter Druckbelastung)
      sowie Rollen/Gleiten/Rollgleiten mit Ruhestellung/verriegelter
      Stellung/Gelenkspiel (erklärt die Grundbegriffe, auf die bereits
      bestehende Einträge zu Ruhestellung/Joint play ohne Herleitung Bezug
      nehmen). **Bewusste Scope-Entscheidung:** Kap. 5.4 „Die Gelenke im
      Einzelnen" (S. 60–161, regionaler Gelenk-für-Gelenk-Atlas von Schulter
      bis Hüftgelenk und vermutlich weiter) wird NICHT extrahiert — analog
      zu den bereits bewusst ausgelassenen Technik-Rezeptteilen bei Hárrer/
      Mai überschneidet sich dieser Regionen-Atlas voraussichtlich stark mit
      Hárrers bereits vollständig ausgewertetem Regionenteil (Kap. 6–17).
      Ebenfalls bewusst nicht extrahiert: die krankheitsspezifischen
      Unterkapitel zu OCD-Lokalisationsstatistiken, Distractio cubiti,
      hypertropher Osteodystrophie und persistierendem Knorpelzapfen
      (S. 53f.) — das sind Diagnose-Details, kein allgemeine Gelenkphysiologie,
      und HOD/persistierender Knorpelzapfen sind über den bestehenden
      Differenzierungseintrag (Koch/Fischer) bereits abgedeckt. Verifiziert
      via Playwright (6/6 Seiten, 0 Fehler).
- [x] Kap. 6 Die Muskulatur (b7.pdf, 22 MB) — Extraktion hat diesmal
      funktioniert (anders als frühere Session-Notiz vermutete). Kein
      Regionen-Atlas mit Ursprung/Ansatz/Funktion einzelner Muskeln (kein
      Ersatz für Hárrers Regionenkapitel), sondern allgemeine Muskelphysiologie:
      Faserarchitektur, Myokine, alternder Muskel. Zwei Themen daraus als
      eigene BIOMECHANIK-Wissenseinträge umgesetzt: tonische/phasische
      Muskulatur mit Dysbalance-Circulus-vitiosus (Kap. 6.1, Tab. 6.1, S. 170f.)
      und offene/geschlossene Muskelkette inkl. der beiden belegten
      Stemmphase-Ketten (Kap. 6.5, S. 180ff.). Kein Fließtext zu
      M. semimembranosus/M. semitendinosus/M. gastrocnemius als Einzelmuskel
      gefunden (nur Fasertyp-Beispiele) — für die restlichen
      Hintergliedmaßen-Muskeln bleibt eine Regionen-Quelle (Hárrer-Pendant zu
      Kap. 8, oder Hohmanns Landmarken-Kap. 7/9) nötig.
- [x] **Kap. 8 „Die Bewegung des Hundes" vollständig abgeschlossen
      (25.09.2026), S. 200–217 (b10.pdf).** Sechs neue BIOMECHANIK-
      Wissenseinträge: das Pantografenbein-Prinzip (Zwangskopplung
      Schulterblatt/Unterarm über M. triceps brachii bzw. M. gastrocnemius,
      klinischer Nutzen bei langhaarigen Hunden), die Muskelchoreografie der
      Vorschwing-/Stemmphase (Zehn-Abschnitte-Gliederung, konstante
      Vorschwingzeit 25–30 ms über fast alle Säugetiere, Raith-Befund zur
      Lastenübernahme), die Selbststabilisierung der Gliedmaße
      („intelligente Bein-Mechanik", schneller als der Reflexbogen), Schritt/
      Trab (dreieckige Unterstützungsfläche vs. Unterstützungslinie,
      Trittsiegel/Schnüren, Schwerpunktlinie, drei Trab-Varianten, Crabbing),
      Passgang/Galopp/Sprung (Passgang beim Hund als meist pathologisches
      Signal, Galopp-Schwebephasen, Sprintstart-Kinetik, 8-fache-
      Körpergewicht-Landekraft beim Ballfangen) sowie Schrittlänge-Anteile
      mit diagnostischer Konsequenz (ED spät vs. HD/Spondylose früh
      auffällig) und Beweglichkeitsfaktoren (aktives vs. passives ROM, nur
      ⅓ im Alltag genutzt). Verifiziert via Playwright (6/6 Seiten,
      0 Fehler).
- [x] **Kap. 9.1 „Grundlagen" abgeschlossen (25.09.2026), S. 219f. (b11.pdf).**
      b11.pdf ließ sich diesmal komplett lesen (die frühere Blockade
      betraf offenbar nur einen früheren Leseversuch). Zwei neue
      BIOMECHANIK-Wissenseinträge: der Muskel-Steckbrief (Kraft in Newton,
      Leistung in Watt, Fasertyp-Anteil, konkrete Renngreyhound-Rekordwerte
      mit explizitem Übertragbarkeits-Vorbehalt) sowie die Fischer/Lilje-
      Neudefinition von Beuger-/Strecker-Rollen (Strecker dosieren die
      Flexion, „steifer Stab"-Konzept; Beuger dosieren die Extension und
      geben gespeicherte Energie frei) inkl. des Hinweises, dass
      humanmedizinische Synergisten-/Antagonisten-Zuordnungen sich nicht 1:1
      auf den Hund übertragen lassen. **Bewusste Scope-Entscheidung:**
      Kap. 9.2/9.3 „Muskeln der Vordergliedmaße im Überblick/im Detail"
      (S. 220–450+, ein vollständiger Ursprung-/Ansatz-/Funktion-Atlas
      Muskel für Muskel) wird NICHT extrahiert — dieser Regionen-Atlas der
      Vordergliedmaße überschneidet sich mit der bereits vollständigen
      Hárrer-Abdeckung (Kap. 12–14) und wäre reine Doppelarbeit. b11.pdf
      enthält keine Hintergliedmaßen-Kapitel (9.4+); ein entsprechendes
      Kapitel wurde in diesem Drive-Ordner nicht gefunden.
- [x] **Kap. 10 „Klinischer Bezug zu ideomotorischen Bewegungen" vollständig
      abgeschlossen (25.09.2026), S. 450–453 (b12.pdf).** Zwei neue
      Wissenseinträge: ideomotorische Bewegungen als diagnostisches
      Potenzial (Definition, Beispielliste, Zeitfaktor als Diagnose-Hinweis,
      Aufwärts-/Abwärtsbewegungs-Asymmetrie, ganzheitliche Betrachtung statt
      Reduktion auf „die Hüftdysplasie", UNTERSUCHUNG) sowie die hängende
      Rute als Fallbeispiel für Differentialdiagnostik-Breite (akutes „Water
      Tail" beim Labrador bis chronisches Cauda-equina-Syndrom, PATHOLOGIE).
      Der bereits bestehende Fall-Nala-Quellenverweis (DRAFT,
      „Quellenkandidat" ohne Seitenzahl) wurde dabei auf „Verifiziert" mit
      korrekter Seitenangabe aktualisiert und mit dem neuen Wissenseintrag
      verknüpft. **Damit ist Hohmann, Bewegungsapparat Hund
      (ISBN 978-3-13-245265-7), vollständig ausgewertet** — Teil 4 „Anhang"
      (Kap. 11 Glossar, Kap. 12 Literaturverzeichnis, Kap. 13 Schlusswort)
      ist reiner Anhang ohne Extraktionsziel, analog zu Hárrers Kap. 18 und
      Mais Anhang. Verifiziert via Playwright (2/2 Seiten, 0 Fehler).

### ANATOMIE — neue, fallunabhängige Items (jetzt technisch möglich)

Ziel: alle Strukturen, die in Fällen/Wissenstexten schon *erwähnt* werden, aber
noch kein eigenes Anatomie-Item haben, nachziehen. Beispiele aus bereits
gelesenen Quellen:

- [x] M. supraspinatus, M. infraspinatus, M. deltoideus, M. subscapularis,
      M. coracobrachialis, M. teres major, M. teres minor (komplette
      Extensoren-/Flexorengruppe des Schultergelenks) — verifiziert gegen
      Hárrer Kap. 12, S. 127–164. M. subscapularis/M. coracobrachialis ehrlich
      als "nicht palpierbar, nur Ausschlussdiagnostik" markiert, da sie laut
      Quelle medial liegen.
- [x] M. biceps femoris, M. semitendinosus, M. gracilis, M. sartorius,
      M. tensor fasciae latae — verifiziert gegen Hárrer Kap. 8 (Knieregion),
      S. 91–93, zusammen mit dem korrigierten `quadriceps`-Item.
- [x] **M. semimembranosus und M. gastrocnemius (27.09.2026) — damit ist die
      "Hamstrings"-/Unterschenkelmuskulatur-Lücke geschlossen.** Ursprung/
      Ansatz/Innervation stammen aus Hárrer nur teilweise (Kap. 7.3.3
      Hüftextensoren/Hamstrings S. 55f. + Kap. 8.1.1 Menisken S. 80 für
      Semimembranosus: Fasertyp/Klinik/Palpation/Meniskus-Einstrahlung;
      Kap. 9.3.3 Sprunggelenksextensoren S. 99f. für Gastrocnemius: Ursprung
      inkl. Fabellae, gemeinsamer Ansatz, Sprungfeder-Funktion,
      Teilriss-/Komplettriss-Unterscheidung) — beide Male ohne explizite
      Innervationsangabe im Original. Ergänzt per Web-Recherche (IMAIOS
      vet-Anatomy, ScienceDirect) um die fehlenden Ursprungs-/Ansatz-Details
      (Semimembranosus: zweigeteilter Ursprung Tuber ischiadicum, getrennte
      Ansätze Pars cranialis/caudalis) sowie beide Innervationsangaben
      (N. tibialis), mit der etablierten WICHTIGE-EINSCHRÄNKUNG-Kennzeichnung
      (WebFetch blockiert, nur Websuche-Zusammenfassungen statt
      Volltextprüfung). Bestehende Wissenseinträge
      `hueftextensoren-hamstrings-fasertyp-differenzierung` und
      `musculus-gastrocnemius-sprungfeder-tendo-calcaneus` um
      `relatedAnatomyIds`-Verknüpfung zu den neuen Items ergänzt. Verifiziert
      via Playwright (2/2 Seiten, 0 Fehler). Damit: 31 Anatomie-Items.
- [x] **Zwei gruppierte Items für Extensoren-/Pronatorengruppe und
      Flexorengruppe des Unterschenkels (Tarsus/Zehen) (27.09.2026) —
      Hintergliedmaßen-Pendant zu den bereits bestehenden Karpus-Gruppen der
      Vordergliedmaße.** `extensoren-tarsus-zehen` (M. tibialis cranialis,
      Mm. peronei longus et brevis, Mm. extensores digitorum longus et
      lateralis, M. extensor digiti I longus) und `flexoren-tarsus-zehen`
      (M. flexor digitorum superficialis, Mm. flexores digitorum profundi
      [lateralis et medialis], M. tibialis caudalis) — verifiziert gegen
      Hárrer Kap. 9.3.1–9.3.4, S. 96–99. Innervation im Original nicht als
      Sammelangabe genannt, per Web-Recherche ergänzt (N. fibularis
      profundus/superficialis bzw. N. tibialis), mit WICHTIGE-EINSCHRÄNKUNG-
      Kennzeichnung. Bestehende Wissenseinträge
      `unterschenkelmuskulatur-dorsalflexoren-uebersicht` und
      `zehenbeuger-oberflaechlich-tief-differenzierung` um
      `relatedAnatomyIds`-Verknüpfung ergänzt. Verifiziert via Playwright
      (2/2 Seiten, 0 Fehler). Damit: 33 Anatomie-Items — die komplette
      Hintergliedmaße von Hüfte bis Zehen ist jetzt mit Anatomie-Items
      abgedeckt (Ausnahme: einzelne Zehengelenk-Kollateralbänder, siehe
      unten).
      **Bewusste Scope-Entscheidung zu Processus anconaeus/coronoideus
      medialis und Lig. capitis femoris:** Das AnatomySeed-Datenmodell
      (Ursprung/Ansatz/Funktion/Innervation) ist strukturell auf Muskeln
      zugeschnitten. Reine Knochenfortsätze wie der Processus anconaeus
      oder der Processus coronoideus medialis (keine Muskeln, kein
      Ursprung/Ansatz im eigentlichen Sinn) passen nicht sinnvoll in dieses
      Schema — eine Erzwingung würde die Feldbedeutung verfälschen. Das
      Lig. capitis femoris (ein Band, kein Muskel) hätte zwar zwei
      Ansatzpunkte, aber keine muskuläre „Funktion" oder Innervation im
      selben Sinn. Beide Punkte bleiben daher im Backlog offen, bis
      entweder eine eigene Datenstruktur für Knochen-/Bandlandmarken
      entsteht (Frage an Vanessa, keine einseitige Schemaänderung) oder sie
      passender als Abschnitt eines bestehenden Wissenseintrags ergänzt
      werden.
- [x] M. brachialis, M. triceps brachii, M. tensor fasciae antebrachii,
      M. anconeus (komplette Ellbogenflexoren-/-extensorengruppe) —
      verifiziert gegen Hárrer Kap. 13, S. 165–178
- [x] M. supinator, M. brachioradialis, M. pronator teres,
      M. pronator quadratus sowie zwei gruppierte Items für Extensoren-/
      Flexorenmuskulatur des Karpus/der Zehen — verifiziert gegen Hárrer
      Kap. 14, S. 179–184. Damit ist die komplette Vordergliedmaße von
      Schulter bis Karpus abgedeckt.
- [x] **Kap. 15 Karpalgelenk und Zehen gegengelesen (29.09.2026, ma(15).pdf,
      vollständig).** Ergebnis wie bei Kap. 13: bereits vollständig
      abgedeckt (ROM-Werte, MTP/PIP/DIP-Mechanik, Sesambein-Ligamente
      inkl. Lig. sesamoideum collaterale mediale/laterale, „wie auf
      Eiern"-Gangbild, Loge-de-Guyon-Analogie am Os carpi accessorium).
      Die einzelnen Kollateralbänder der Zehengelenke selbst (mediales/
      laterales Kollateralband je MTP/PIP/DIP) bleiben bewusst NICHT als
      eigene Anatomie-Items vorgesehen — dieselbe Schema-Begründung wie
      bei Processus anconaeus/coronoideus medialis und Lig. capitis
      femoris (AnatomySeed ist auf Muskeln zugeschnitten, ein Kollateral-
      band hat keine muskuläre „Funktion"/Innervation im selben Sinn);
      sie sind über den bestehenden Biomechanik-Eintrag „Karpalgelenk"
      bereits mit erwähnt. Der Rest der Datei (Untersuchungs-/
      Behandlungsgriffe) bleibt wie bei Kap. 13 bewusst kein
      Wissensbibliothek-Content.
- [ ] Processus anconaeus, Processus coronoideus medialis (Ellbogen — direkt
      aus dem ED-Pathologie-Eintrag ableitbar, Quelle bereits gelesen)
- [ ] Ligamentum capitis femoris (Hüfte — bereits in Luna/Fällen erwähnt, aber
      „NICHT VERIFIZIERT" markiert; eigene Anatomie-Seite könnte das mit einer
      dedizierten Quelle nachholen)
- [x] Schultergürtelmuskulatur aus Hárrer Kap. 12.1.4/12.3.1–12.3.2, S. 127,
      134–141 (03.10.2026): M. trapezius, M. omotransversarius,
      M. brachiocephalicus, M. latissimus dorsi, M. pectoralis superficialis,
      M. pectoralis profundus, M. rhomboideus, M. serratus ventralis — 8 neue
      Anatomie-Items (33 → 41). Details siehe „Stand" oben.
- [x] Rumpf-/Nackenmuskulatur aus Hárrer Kap. 16.3 „Muskulatur" gelesen
      (03.10.2026, S. 245–253, ma(16).pdf). Daraus 6 neue Anatomie-Items
      (41 → 47): Subokzipitale Muskulatur/dorsale Kopfheber (16.3.1–16.3.2,
      vier Muskelpaare um C0–C2), M. erector spinae
      (Iliocostalis/Longissimus/Spinalis-Semispinalis als funktionelle
      Einheit, 16.3.3, inkl. Becken-HWS-Fortleitungslogik über den
      M.-longissimus-Verlauf), Mm. multifidi/Mm. rotatores (tiefe
      intersegmentale Stabilisatoren, 16.3.3, inkl. Facettengelenk-
      Palpationshinweis), M. quadratus lumborum (16.3.4, Spondylose-/
      LSÜ-Twist-Assoziation), Mm. scaleni (16.3.4–16.3.5, Thoracic-outlet-
      Mechanismus über den Plexus brachialis — cross-referenziert mit dem
      bestehenden Wissenseintrag zum Thoracic-outlet-Syndrom), Diaphragma
      (16.3.4–16.3.5, wichtigster Inspirator, N.-vagus-Fortleitungs-
      mechanismus bis zur HWS). M. iliopsoas und M. serratus ventralis
      thoracis bewusst nicht dupliziert — Hárrer verweist hier selbst auf
      die bereits bestehenden Einträge (Hüfte- bzw. Schultergürtel-Kapitel).
      Bewusst NICHT extrahiert: M. longus capitis/M. longus colli/
      M. splenius (an dieser Stelle durch OCR-Spaltenvertauschung im
      Drive-Chunk partiell widersprüchlich lesbar — ventral/dorsal-
      Zuordnung nicht zweifelsfrei rekonstruierbar, lieber ausgelassen als
      ein Risiko einer Fehlzuordnung einzugehen), Mm. interspinales/
      intertransversarii (sehr kurze Einzelmuskeln ohne eigenständig
      sinnvoll testbare Funktion laut Quelle selbst), M. serratus dorsalis
      cranialis/caudalis, Mm. intercostales externi/interni,
      M. retractor costae (Quelle selbst: „Eine eigenständige spezifische
      Muskeluntersuchung ist nicht möglich") sowie die Bauchmuskulatur
      (M. transversus abdominis u. a. — Text bricht an dieser Stelle im
      gelesenen Chunk ab, vollständige Beschreibung nicht erreicht;
      bleibt für eine Folgesession offen). Alle 6 Items via Playwright
      verifiziert (6/6 Review-Seiten, 0 Fehler).
- [x] Rumpf-/Nackenmuskulatur Teil 2 aus Hárrer Kap. 16.3, weiter gelesen
      (04.10.2026, ma(16).pdf): Die bei der ersten Lesung offen gelassene
      Unschärfe zu M. longus capitis/M. longus colli/M. splenius konnte
      durch die eindeutige Kapitelüberschrift 16.3.8 „Behandlung der
      Extensoren und Seitneiger (M. erector spinae, M. spinalis et
      semispinalis, M. splenius, Mm. intertransversarii)" aufgelöst werden
      — M. splenius gehört damit zweifelsfrei zur dorsalen
      Extensoren-/Seitneiger-Gruppe (Rr. dorsales), M. longus
      capitis/colli zur ventralen Flexoren-Gruppe (Rr. ventrales). Neu:
      **M. splenius** (eigenes Item), **M. longus capitis/M. longus
      colli** (ein gemeinsames Item — die Quelle verwendet beide Namen im
      Behandlungsabschnitt uneinheitlich für denselben Muskel, ohne
      getrennte Ursprung-/Ansatzpunkte; diese Unschärfe wird im
      `sourceStatus` offengelegt statt künstlich geglättet). Außerdem
      wurde das bestehende Item `erector-spinae-iliocostalis-
      longissimus-spinalis` um die **Mm. intertransversarii** erweitert
      (reine Seitneige-Funktion, dieselbe Rr.-dorsales-Gruppe laut
      16.3.1-Übersicht — die frühere Auslassung als „ohne testbare
      Funktion" war bei genauerem Lesen nicht haltbar, da die Quelle sie
      eigens mit Dehnposition und Lage beschreibt). Die Bauchmuskulatur
      (Kap. 16.3.6, S. 253) wurde diesmal vollständig gelesen: **zwei
      neue Items** — ein gemeinsames Item für M. obliquus
      externus/internus abdominis + M. transversus abdominis (laut
      Quelle selbst palpatorisch nicht einzeln abgrenzbar) sowie ein
      eigenes Item für **M. rectus abdominis** (gezielt längs testbar,
      Proc. xiphoideus gegen Os pubis). Innervation war für alle 4 neuen
      Items im Original nicht genannt und wurde per Web-Recherche
      ergänzt (mit offen ausgewiesener WebFetch-Einschränkung im
      `sourceStatus`). M. serratus dorsalis cranialis/caudalis, Mm.
      intercostales externi/interni, M. retractor costae bleiben
      bewusst ausgelassen (Quelle: keine eigenständig testbare Funktion).
      4 neue Anatomie-Items (47 → 51) plus 1 Edit, via Playwright
      verifiziert (5/5 Review-Seiten, 0 Fehler).
- [ ] Weitere Muskeln aus Hárrer (Regionen-Kapitel wie Kap. 12 sind für
      Ursprung/Ansatz/Funktion ergiebiger als Hohmanns Landmarken-Atlas Kap. 7,
      der nur beschriftete Abbildungen ohne Fließtext-Details liefert) —
      systematisch Region für Region weiterlesen
- [ ] Knochen- und Gelenkpunkte aus Hohmann Kap. 7 „Markante Knochenpunkte und
      tastbare Muskeln" (b9.pdf) — enthält nur beschriftete Abbildungen (Liste
      tastbarer Landmarken), keine Ursprung/Ansatz/Funktion-Angaben; eher als
      Ergänzung für `palpationHint`/Bildbriefe geeignet, nicht als alleinige
      Quelle für ein vollständiges Anatomie-Item

### VERWORFEN — Waibl/Mayrhofer/Matis/Köstlin/Wilkens, Atlas der Röntgenanatomie des Hundes (Thieme/Enke, 3. Aufl. 2012)

- [x] Einführung, Beckengliedmaße, Thorax gesichtet (29.09.2026/02.10.2026) —
      **als Extraktionsquelle verworfen.** Das Buch besteht pro Röntgenbild aus
      einem festen Dreischritt (Ziel/Zentralstrahl/Beachte) plus einer reinen
      Struktur-Label-Legende (Knochen-/Organname + Nummer), die sich auf ein
      Röntgenbild bezieht, das der extrahierte Text selbst nicht enthält. Es
      gibt keinen erklärenden Fließtext im Sinne von MASTER-PROMPT §22, der
      sich eigenständig synthetisieren ließe — anders als bei jeder bisher
      verwendeten Quelle ist hier nichts zu „erklären", nur aufzuzählen. Die
      Einführung selbst ist reine Belichtungs-/Strahlenschutztechnik für
      Röntgenpersonal (kV/mAs-Tabellen), nicht für eine Physiotherapie-
      Zielgruppe relevant. Die beiden einzigen Konzepte mit Anschlusswert
      (Fabellae als Tendopathie-Prädilektionsstelle; Wachstumsfugenschluss als
      Trainingsgrenze/Fraktur-Verwechslungsgefahr) sind in der Bibliothek
      bereits ausführlich eigenständig abgedeckt (u. a.
      `wachstumsfugenschluss-als-trainingsgrenze-welpe-junghund-alter-hund`,
      IOCH- und Distractio-cubiti-Einträge). Der Thorax-Teil enthält zudem
      laut Buch-eigener Einführung durch Sonographie/Endoskopie abgelöste
      Verfahren (Bronchographie, Angiokardiographie mit Kontrastmittel) ohne
      heutigen Praxisbezug. Die übrigen Kapitel (Kopf, Wirbelsäule,
      Schultergliedmaße, Abdomen) folgen erkennbar demselben Schema und
      wurden deshalb nicht mehr einzeln gesichtet. Bleibt als mögliche
      Zukunftsnutzung: Bildbrief-Referenz für anatomisch korrekte
      Röntgenbild-Beschriftung, falls Denkgang einmal eigene Röntgenbild-
      Lernmodule bekommt — aktuell kein Bestandteil des Produkts.

### ANATOMIE/PATHOLOGIE — Salomon/Geyer/Gille (Hrsg.), Anatomie für die Tiermedizin (Thieme)

- [x] Kap. 1 „Allgemeine Anatomie der Haussäugetiere", Abschnitte 1.1–1.5
      (Stoffgebiet der Anatomie, Organsysteme im Überblick, anatomische
      Nomenklatur, topografische Gliederung/Richtungsbezeichnungen,
      Körperhöhlen) gelesen (02.10.2026). Daraus 2 neue Einträge: das
      vollständige Richtungs-/Lagebezeichnungssystem
      (`richtungs-lagebezeichnungen-tierkoerper-kranial-kaudal-dorsal-palmar`)
      sowie Peritoneum-Klinik (Schmerzasymmetrie parietal/viszeral, Aszites,
      aufsteigende Infektion bei weiblichen Tieren, Adhäsionsmechanismus;
      `peritoneum-aszites-peritonitis-adhaesionen-schmerzasymmetrie`). Nicht
      extrahiert: die reinen Organsystem-Überblicksabsätze (1.2, bereits
      andernorts detaillierter abgedeckt), die vollständige Nomenklatur-/
      Aussprache-Regelwerk-Tiefe (1.3, zu basal für die Zielgruppe) sowie die
      granulare Körperregionen-Terminologie (1.4.1–1.4.2, reine
      Namensliste ohne Argumentationswert über die bereits extrahierten
      Richtungsbegriffe hinaus). **Wichtige Einschränkung:** Das Werk ist
      vergleichende Anatomie der Haussäugetiere, nicht hundespezifisch — nur
      explizit als hundebezogen markierte oder artunabhängig gültige Aussagen
      werden übernommen. Sehr umfangreich (mehrere hundert granulare
      Drive-Chunks), wird deshalb über mehrere Sessions kapitelweise
      weitergelesen. **ISBN/Auflage nicht verifizierbar:** Das Wasserzeichen
      in den Drive-Chunks nennt durchgängig eine erkennbar falsche
      Titel-/ISBN-Kombination eines anderen Werks aus demselben Thieme-
      VetCenter-Lizenzpaket („Krankheiten der Katze", ISBN
      978-3-13-242675-7); diese wird nicht übernommen, sourceStatus markiert
      ISBN/Auflage entsprechend als NICHT VERIFIZIERT.
- [x] Kap. 2.1/2.2 „Allgemeine Vorbemerkungen"/„Binde- und Stützgewebe,
      Übersicht" gelesen (02.10.2026). Daraus 1 neuer Eintrag: das
      Zwei-Phasen-Dehnungsverhalten von Kollagenfasern (Wellenstreckung ~3 %,
      Gesamtdehnbarkeit ~5 % mit Irreversibilität darüber, Reißfestigkeit
      50–100 N/mm², gegensätzliche Anpassung bei Be-/Entlastung)
      (`kollagenfaser-wellung-dehnungsgrenze-funktionelle-anpassung`). Reine
      Zell-/Fasertypen-Histologie ohne eigenständigen klinischen Mehrwert
      sowie bereits abgedeckte Themen (Myofibroblasten, Ehlers-Danlos)
      bewusst nicht erneut extrahiert.
- [x] **Kap. 2.3 ff. gegengelesen und Umfang des Buches neu eingeschätzt
      (02.10.2026) — systematische Weiterextraktion bewusst gestoppt.**
      Stichprobenprüfung ergab: Kap. 2 „Bewegungsapparat" selbst zieht sich
      von S. 36 bis S. 249 (Chunk `002_004_001` beginnt bereits auf S. 342 in
      Kap. 4 „Atmungssystem") — das ist ein vollständiger vergleichend-
      anatomischer Knochen-/Gelenk-/Muskelatlas über alle fünf Haussäugetier-
      arten (Pferd, Rind, Schwein, Katze, Hund gemischt im Fließtext), keine
      hundespezifische Darstellung. Die Chunk-Nummerierung folgt zwar grob
      der Seitenreihenfolge, aber einzelne Abschnitts-Ordner überspringen
      riesige Seitenbereiche nicht-offensichtlich, was systematisches
      Sequenziell-Lesen unpraktikabel macht, ohne zuerst alle ~150+ Chunks
      nur zur Seiten-Sortierung einzulesen. Dazu kommt: Die auf Kap. 2
      folgenden Organsystem-Kapitel (3 Verdauungssystem, 4 Atmungssystem, ...)
      sind allgemeines veterinärmedizinisches Grundlagenwissen (Embryologie,
      Histologie, Organogenese) ohne Bezug zu Denkgangs physiotherapeutischem
      Fokus (MASTER-PROMPT §15: Knochen/Gelenke/Muskeln/Sehnen/Bänder/Nerven/
      Faszien/Biomechanik, nicht Verdauungs-/Atmungsorganogenese). **Fazit:**
      Die bereits dog-spezifisch und physiotherapie-fokussiert ausgewerteten
      Quellen (Hárrer, Hohmann, Koch/Fischer) decken den regionalen Muskel-/
      Gelenkatlas für den Hund bereits gründlich ab — eine vollständige
      Durcharbeitung dieses Mehrspezies-Werks böte ein sehr ungünstiges
      Aufwand-Ertrags-Verhältnis bei hohem Redundanz- und Fehlzuordnungs-
      risiko (versehentliche Übernahme einer pferde-/rinderspezifischen
      Aussage als allgemeingültig). Salomon/Geyer/Gille bleibt daher als
      **Referenzwerk für Stichproben-Verifikation** bestehender Einträge
      im Bestand (wie bereits bei Kap. 1 geschehen), wird aber nicht weiter
      kapitelweise durchgearbeitet. Insgesamt aus dieser Quelle: 3 neue
      Einträge (Richtungsbezeichnungen, Peritoneum-Klinik, Kollagenfaser-
      Dehnungsverhalten).

### PATHOLOGIE — VetCenter, Hundekrankheiten kompakt, „Neurologische Erkrankungen" (Enke Verlag, 1. Aufl. 2014, vetcenter.thieme.de)

- [x] Vollständig gesichtet (02.10.2026, 28 Web-Seiten). Dieselbe
      „Hundekrankheiten kompakt"-Reihe, deren Kapitel „Erkrankungen des
      Bewegungsapparates" und „Wirbelsäulenerkrankungen" bereits früher
      vollständig ausgewertet wurden. Das Kapitel behandelt: Kongenitaler
      Hydrozephalus, Epilepsie (inkl. ausführlicher Antiepileptika-
      Dosierungstabellen), Granulomatöse Meningoenzephalomyelitis (GME),
      Aseptische Meningitis/SRMA, Akute idiopathische Polyradikuloneuritis
      (Coonhound-Paralysis), Plexus-brachialis-Abriss, Sensibilitätsstörungen/
      Parästhesien. **Bewusst nicht extrahiert:** Hydrozephalus, Epilepsie
      (Medikamentendosierung ist ärztliche, keine physiotherapeutische
      Entscheidung) und GME/SRMA — reine internistische Diagnostik-/
      Therapieprotokolle ohne physiotherapeutischen Handlungsspielraum.
      Polyradikuloneuritis/Coonhound-Paralysis bereits durch einen
      bestehenden, ausführlicheren Eintrag aus einer dezidiert
      physiotherapeutischen Quelle (Alexander, Physikalische Therapie für
      Kleintiere) abgedeckt — keine neuen Fakten in dieser Quelle gefunden.
      Sensibilitätsstörungs-Terminologie (Hyperästhesie/Dysästhesie/
      Parästhesie, Head-Zonen) ebenfalls bereits an mehreren Stellen der
      Bibliothek korrekt verwendet — kein eigenständiger Mehrwert für einen
      neuen Terminologie-Eintrag. **Ein echter Fund:** Der bestehende Eintrag
      `plexusschaden-vordergliedmasse` (Quelle: Koch/Fischer) kannte den
      allgemeinen Mechanismus, aber nicht die klinisch unterscheidbaren
      Unterformen — ergänzt um die Drei-Formen-Systematik (kranialer
      partieller Abriss: N. suprascapularis/musculocutaneus, abgeschwächte
      Ellbogenflexion, gute Prognose; kaudaler partieller Abriss, am
      häufigsten: N. radialis/medianus/ulnaris, hängender Ellbogen,
      Pannikulusreflexausfall, bis 50 % Horner-Syndrom, schlechte Prognose;
      kompletter Abriss: Kombination) samt 2–6-Monats-Prognosefenster.
      Bewusst nicht übernommen: die rein chirurgischen Therapieoptionen
      (Bizepssehnentransposition, Karpalarthrodese, Neurotisation) — liegen
      außerhalb des physiotherapeutischen Handlungsspielraums, den dieser
      Eintrag bereits mit Koch/Fischer abbildet.

## Arbeitsweise für künftige Sessions

1. Ein Kästchen oben auswählen (oder ein neues Kapitel aus der in
   `docs/quellen-status.md` gelisteten Bibliothek erschließen).
2. Quelle gezielt lesen/per `fullText`-Suche erschließen (nicht ganze große
   Dateien am Stück — siehe technische Einschränkung in `quellen-status.md`).
3. Eigene Erklärung + eigene Struktur schreiben (Text-/Listen-/Tabellenblöcke),
   nie Fließtext 1:1 übernehmen (MASTER-PROMPT §10).
4. `sourceStatus` ehrlich formulieren — inkl. Einschränkungen, wenn nur ein Teil
   der Aussage belegt ist.
5. Verlinkung setzen (`relatedCaseIds`/`relatedAnatomyIds`), wo inhaltlich
   passend — muss nicht erzwungen werden.
6. `npx tsc --noEmit`, Postgres starten, `npx tsx prisma/seed.ts`, kurzer
   visueller Check (Review-Vorschau, ggf. Fehlantwort-Flow), dann committen +
   pushen.
7. Dieses Dokument aktualisieren (Kästchen abhaken, neue Unterpunkte ergänzen,
   sobald eine Quelle mehr Struktur offenbart als vorher bekannt).
