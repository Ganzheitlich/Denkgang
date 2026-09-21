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

- `AnatomyItem.relatedCaseId` ist jetzt optional (Schema war es schon immer,
  `AnatomySeed`-Typ wurde am 21.09.2026 angepasst). Anatomie-Items können ab sofort
  unabhängig von einem passenden Fall angelegt werden — nötig, um auf hunderte
  Einträge zu skalieren, ohne für jeden auch einen neuen Fall zu erfinden.
- `findKnowledgeForCase`/`findKnowledgeForAnatomy` geben jetzt Listen zurück; bei
  mehreren passenden Einträgen wählt die Nutzerin selbst (siehe Commit
  „Mehr-erfahren-CTA", 21.09.2026).

## Stand (21.09.2026)

- Wissensbibliothek: 18 Einträge (7 Anatomie-Spiegelungen, 5 Grundlagen, 3
  Untersuchung, 2 Pathologie, 1 Biomechanik, 0 Therapie)
- Anatomie-Sektion: 7 Items (biceps, iliopsoas, quadriceps, facettengelenke,
  huefte, + 2 weitere zu bereits bestehenden Fällen)

## Backlog nach Quelle

Checkboxen = grobe Segmentierung, kein 1:1-Verhältnis zu späteren Einträgen (ein
Kapitel kann mehrere Einträge ergeben oder umgekehrt). `[ ]` offen, `[x]` erledigt,
`[~]` teilweise/in Arbeit.

### PATHOLOGIE — VetCenter, Hundekrankheiten kompakt, „Erkrankungen des Bewegungsapparates" (121 S., vetcenter.thieme.de)

- [x] Erkrankungen der Bizepssehne (Tendinitis/Tendovaginitis/Ruptur/Luxation)
- [x] Ellbogengelenkdysplasie (IPA, FPC, OCD, Inkongruenz)
- [ ] Osteomyelitis (Kapitelanfang, S. 1 ff.)
- [ ] Hüftgelenkluxation (traumatisch) + Ehmer-Schlinge — Achtung: nicht mit
      Hüftgelenkdysplasie (HD) verwechseln, im Original als Differentialdiagnose
      klar getrennt
- [ ] Immunvermittelte Gelenkerkrankungen (Lymphoplasmazelluläre Gonitis,
      rheumatoide Arthritis, systemischer Lupus erythematodes, IPA Typ I–IV als
      Immunreaktion — Achtung: anderer Kontext als das strukturelle „IPA" bei ED,
      im Original getrennt zu halten)
- [ ] Osteochondrosis dissecans (OCD) im Schultergelenk (eigenständig, nicht nur
      als ED-Differential)
- [ ] Kontraktur des M. infraspinatus (typisches Jagdhund-Bild, „eigenartige
      Gliedmaßenhaltung")
- [ ] Generalisierte Skeletterkrankungen: Osteochondrose (OC), weitere im
      Kapitel 8.2 folgende Erkrankungen (Panostitis, hypertrophe Osteodystrophie
      — Seitenbereich noch nicht gelesen)
- [ ] Hüftgelenkdysplasie (HD) als eigenständiges Krankheitsbild (Definition,
      Ätiologie, Diagnostik) — bisher nur über Ortolani-Test (Hárrer) und als
      Differential erwähnt, noch keine eigene Quelle gelesen
- [ ] Kreuzbandriss / vordere Kreuzbandruptur — zentral für Fall Bruno; im
      bisher gelesenen Auszug nur beiläufig erwähnt, eigentliches Unterkapitel
      noch nicht gefunden/gelesen
- [ ] Patellaluxation — bisher nur als Symptom-Hinweis in der Ganganalyse
      erwähnt, eigenes Unterkapitel noch nicht gelesen
- [ ] Rest des Kapitels systematisch weiterlesen (Datei ca. 121 Seiten, bisher
      nur bis ca. S. 80 gesichtet — Fraktur-, Tumor- und Wirbelsäulenabschnitte
      am Ende vermutlich noch offen)

### PATHOLOGIE — VetCenter, „Wirbelsäulenerkrankungen" (eigene Datei, noch ungelesen)

- [ ] Ganze Datei sichten — zentral für Fall Nala (Facettengelenke,
      lumbosakraler Übergang, Spondylose/IVDD als Differentialdiagnosen)

### UNTERSUCHUNG — Koch/Fischer, Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1)

- [x] Kap. 4 Adspektion und Ganganalyse (S. 80–82)
- [x] Kap. 5.1 Voruntersuchungen / neurologischer Kurz-Check (S. 82)
- [ ] Kap. 5 (Rest): Untersuchung des stehenden Hundes — gelenkspezifische
      Palpation, Provokationstests
- [ ] Untersuchung des liegenden Hundes (eigenes Kapitel, Nummer noch zu
      prüfen)
- [ ] Vollständiger neurologischer Untersuchungsgang (im Buch referenziert als
      „S. 157" — noch nicht gelesen)
- [ ] Gelenkspezifische Stabilitätstests (Kreuzband: Schublade/Tibia-Kompression;
      Hüfte: Ortolani bereits über Hárrer verifiziert, ggf. hier ergänzen;
      Ellbogen/Karpus/Tarsus falls vorhanden)
- [ ] Die Datei hat ~46 Einzel-PDF-Chunks (u.pdf, u1–u46) — bisher nur u.pdf
      (Titel) und u13.pdf gelesen. Rest systematisch per gezielter
      `fullText`-Suche nach Kapitelbegriffen erschließen, nicht komplett am
      Stück laden.

### UNTERSUCHUNG — Baumgartner, Klinische Propädeutik der Haus- und Heimtiere

- [ ] Ganze Datei noch ungelesen. Enthält voraussichtlich: Allgemeine
      Adspektion, Auskultation, Palpation-Grundlagen, Vitalparameter — guter
      Ergänzungsstoff zur Allgemeinuntersuchung aus Koch/Fischer Kap. 5.1.

### THERAPIE — bisher 0 Einträge, Quelle noch zu erschließen

- [ ] Mai, Physiotherapie und Bewegungstraining für Hunde — Ordner in Drive
      vorhanden (siehe `docs/quellen-status.md`), noch nicht gesichtet. Naheliegender
      Startpunkt für die komplett leere THERAPIE-Kategorie.

### BIOMECHANIK — Hohmann, Bewegungsapparat Hund (ISBN 978-3-13-245265-7)

- [ ] Kap. 2 Statik und Dynamik des Hundes (b3.pdf, teilweise bereits beim
      Lesen für ED/Bizeps überflogen)
- [ ] Kap. 3 Schwerpunkt und Unterstützungsfläche (b4.pdf)
- [ ] Kap. 4 Der Knochen (b5.pdf)
- [x] Kap. 5 Das Gelenk (b6.pdf) — Struktur-/Bauart-/Gelenktyp-Einteilung mit
      caninen Beispielen + Gelenkflächen-Inkongruenz (S. 48–50). Rest des
      Kapitels (Gelenkkapsel, Synovia, Bänder — falls noch mehr folgt) noch
      nicht gesichtet.
- [ ] Kap. 6 Die Muskulatur (b7.pdf, 22 MB — evtl. Extraktionsprobleme wie bei
      Kap. 9 erwarten, ggf. gezielte Teilsuche nötig)
- [ ] Kap. 8 Die Bewegung des Hundes (b10.pdf) — Bewegungsarten,
      Gangartenanalyse (Ergänzung zu Koch/Fischer, anderer Autor/Blickwinkel)
- [ ] Kap. 9 Muskeln in Bewegung (b11.pdf, 15 MB) — weiterhin technisch blockiert
      für Quadriceps-Detail; ggf. andere, kleinere Muskeln aus diesem Kapitel
      zuerst versuchen (kürzere Passagen könnten erreichbar sein, auch wenn das
      ganze Kapitel es nicht ist)
- [ ] Kap. 10 Klinischer Bezug zu ideomotorischen Bewegungen (b12.pdf) — schon
      als Zitat für „vorschnelle Diagnose" genutzt (Fall Nala), eigener
      Wissenseintrag noch offen

### ANATOMIE — neue, fallunabhängige Items (jetzt technisch möglich)

Ziel: alle Strukturen, die in Fällen/Wissenstexten schon *erwähnt* werden, aber
noch kein eigenes Anatomie-Item haben, nachziehen. Beispiele aus bereits
gelesenen Quellen:

- [ ] M. infraspinatus, M. supraspinatus, M. deltoideus (Schulter — schon als
      Distraktoren in Retrieval-Fragen genutzt, aber ohne eigenes Item)
- [ ] M. triceps brachii (ebenfalls bereits als Distraktor verwendet)
- [ ] Processus anconaeus, Processus coronoideus medialis (Ellbogen — direkt
      aus dem ED-Pathologie-Eintrag ableitbar, Quelle bereits gelesen)
- [ ] Ligamentum capitis femoris (Hüfte — bereits in Luna/Fällen erwähnt, aber
      „NICHT VERIFIZIERT" markiert; eigene Anatomie-Seite könnte das mit einer
      dedizierten Quelle nachholen)
- [ ] Weitere Muskeln aus Hohmann Kap. 6/7/9, sobald gelesen (systematisch
      Region für Region: Schulter/Oberarm, Unterarm/Pfote, Becken/Oberschenkel,
      Unterschenkel/Pfote, Rumpf/Wirbelsäule)
- [ ] Knochen- und Gelenkpunkte aus Hohmann Kap. 7 „Markante Knochenpunkte und
      tastbare Muskeln" (b9.pdf) — dort steht bereits eine fertige Liste
      tastbarer Landmarken, sehr direkt in Anatomie-Items umsetzbar

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
