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

- Wissensbibliothek: 25 Einträge (7 Anatomie-Spiegelungen, 5 Grundlagen, 3
  Untersuchung, 3 Pathologie, 3 Biomechanik, 4 Therapie)
- Anatomie-Sektion: 18 Items (biceps, iliopsoas, quadriceps, facettengelenke,
  huefte, + 2 weitere zu bereits bestehenden Fällen, plus elf neue,
  fallunabhängige Items: die komplette Schulterflexoren-/Extensorengruppe
  (supraspinatus, infraspinatus, subscapularis, coracobrachialis,
  deltoideus, teres-major, teres-minor) und die komplette
  Ellbogenflexoren-/-extensorengruppe (brachialis, triceps-brachii,
  tensor-fasciae-antebrachii, anconeus) nach Hárrer)

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

### PATHOLOGIE — Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3)

- [x] Toe-in/Toe-out als Nervenkompressions-Warnzeichen (M. supinator/N.
      radialis, M. pronator teres/N. medianus) — Kap. 14 (Unterarmregion),
      S. 179
- [ ] Radiuskurvensyndrom (frühzeitiger Epiphysenschluss der Ulna →
      Valgusstellung des Radius) — nur beiläufig erwähnt in Kap. 14, S. 179,
      eigenes Unterkapitel/eigene Quelle noch zu finden

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

### THERAPIE — Mai, Physiotherapie und Bewegungstraining für Hunde (ISBN 978-3-13-240099-3, Thieme 2022)

- [x] Belastungssteuerung nach Verletzung (Immobilisation vs. kontrollierte
      Bewegung, Kap. 4.3, S. 62)
- [x] Aufwärmen und Abkühlen beim Hundetraining (Kap. 4.3.5–4.3.6, S. 65–67)
- [ ] Rückenschmerzen und Trainingsfehler (Hallgren-Studie, zitiert in Kap.
      4.3, S. 63f. — Leinenruck, Halti, Brustgeschirr-Passform als
      Risikofaktoren). Achtung: Hallgrens Originalstudie (Animal Learn Verlag)
      selbst noch nicht geprüft, nur Mais Zusammenfassung gelesen — als
      Sekundärzitat kennzeichnen.
- [ ] Trainingsalter-Richtlinien für Welpen/Junghunde/alte Hunde (Kap.
      4.3.3–4.3.4, S. 64f.) — z. B. Faustregeln ab wann Joggen/Rad/Reiten,
      Wachstumsfugenschluss als Grenze
- [ ] Evaluierung/objektive Verlaufskontrolle in der Reha (Kap. 5.1, S. 71) —
      Links-Rechts-Vergleich als Praxisstandard, warum Force-Plate-Messungen
      trotz wissenschaftlicher Exaktheit nicht praxisrelevant sind. Gute
      Ergänzung zum bestehenden Untersuchung-Eintrag „Ganganalyse“.
- [x] Bewegungstherapie bei Arthrose (Grundprinzipien: kurze Bewegungsphasen,
      viele Pausen, Gewichtsreduktion vor Muskelaufbau, Untergrund) — aus der
      Einleitung von Kap. 5.3 (ph(25).pdf), S. 85
- [x] Ziele und Grundprinzip der Bewegungstherapie (Kap. 5.4, ph(26).pdf, S.
      100f.) — neun Ziele, Abgrenzung zu „einfachem Laufenlassen“
- [ ] Kap. 5.3.1 Manuelle Medizin — Überblick über OMT (Maitland/Mulligan/
      Kaltenborn), Chiropraxis, Osteopathie (ph(25).pdf, S. 85–87) — bewusst
      noch nicht geschrieben: braucht sorgfältige Abgrenzung zwischen
      etablierter Biomechanik-Erklärung und schulenspezifischer Theorie
- [ ] Kap. 5.3.2 Tuina (Traditionelle chinesische Massage, ph(25).pdf, S.
      87–100) — sehr umfangreich (Geschichte, TCM-Theorie, einzelne
      Grifftechniken, Kontraindikationen). Konzeptionelle Entscheidung noch
      offen: eigener „Referenzbild“-artiger Nachschlage-Eintrag zu den
      Grifftechniken (TUI, NA, AN, MO, ROU, QIA, PAI, KOU, DOU, YAO, GUN,
      ZHEN, CUO) wäre möglich, sollte aber die TCM-Begrifflichkeit klar von
      schulmedizinisch verifizierten Aussagen trennen.
- [ ] Rest des Buches (ca. 26+ Einzeldateien ph.pdf, ph1–ph26) noch nicht
      systematisch gesichtet — voraussichtlich eigene Kapitel zu Hydrotherapie,
      Massage-Grundtechniken (westliche/klassische Massage), Bandagieren/
      Orthesen.

### BIOMECHANIK — Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3)

- [x] Das Ellenbogengelenk als drei Teilgelenke, ROM-Werte, "Jena-Studie"
      (effektive vs. gesamte Gelenkbeweglichkeit während Lokomotion) und die
      Überlastungskette Hintergliedmaße → Schultergürtel → Ellenbogen/Schulter
      — Kap. 13, S. 165.
- [x] Die Unterarm-Rotationsgelenke (Art. radioulnaris proximalis/distalis,
      Membrana interossea antebrachii, ~20° Pronation/~50° Supination,
      Radiuskurvensyndrom) — Kap. 14, S. 179.
- [ ] Rest von Kap. 13 (Ellenbogenregion) und alle anderen Regionen-Kapitel
      (Hüfte Kap. 7, Wirbelsäule Kap. 16 — teilweise schon für Quellenprüfung
      gelesen, aber nicht systematisch auf weitere Biomechanik-Fakten
      durchsucht) enthalten wahrscheinlich noch mehr ähnliche
      Gelenkmechanik-Fakten.

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

- [x] M. supraspinatus, M. infraspinatus, M. deltoideus, M. subscapularis,
      M. coracobrachialis, M. teres major, M. teres minor (komplette
      Extensoren-/Flexorengruppe des Schultergelenks) — verifiziert gegen
      Hárrer Kap. 12, S. 127–164. M. subscapularis/M. coracobrachialis ehrlich
      als "nicht palpierbar, nur Ausschlussdiagnostik" markiert, da sie laut
      Quelle medial liegen.
- [ ] M. biceps femoris, M. semitendinosus, M. semimembranosus ("Hamstrings"),
      M. gastrocnemius, M. gracilis — Hintergliedmaße, bisher nur als
      Landmarken bei Hohmann erwähnt, noch keine Hárrer-Region dazu gelesen
      (vermutlich eigenes Kapitel "Kniegelenk"/"Oberschenkel" bei Hárrer)
- [x] M. brachialis, M. triceps brachii, M. tensor fasciae antebrachii,
      M. anconeus (komplette Ellbogenflexoren-/-extensorengruppe) —
      verifiziert gegen Hárrer Kap. 13, S. 165–178
- [ ] Kap. 14 Unterarmregion: M. supinator, M. pronator teres — bereits als
      zentrale Akteure im Toe-in/Toe-out-Pathologie-Eintrag genannt, aber noch
      ohne eigenes Anatomie-Item (Ursprung/Ansatz nicht aus dem bisher
      gelesenen Auszug bekannt, nur Funktion/klinische Rolle)
- [ ] Kap. 15 (falls vorhanden) und Rest von Kap. 14 (Unterarmregion,
      Karpalgelenk) noch nicht gelesen
- [ ] Processus anconaeus, Processus coronoideus medialis (Ellbogen — direkt
      aus dem ED-Pathologie-Eintrag ableitbar, Quelle bereits gelesen)
- [ ] Ligamentum capitis femoris (Hüfte — bereits in Luna/Fällen erwähnt, aber
      „NICHT VERIFIZIERT" markiert; eigene Anatomie-Seite könnte das mit einer
      dedizierten Quelle nachholen)
- [ ] Weitere Muskeln aus Hárrer (Regionen-Kapitel wie Kap. 12 sind für
      Ursprung/Ansatz/Funktion ergiebiger als Hohmanns Landmarken-Atlas Kap. 7,
      der nur beschriftete Abbildungen ohne Fließtext-Details liefert) —
      systematisch Region für Region weiterlesen
- [ ] Knochen- und Gelenkpunkte aus Hohmann Kap. 7 „Markante Knochenpunkte und
      tastbare Muskeln" (b9.pdf) — enthält nur beschriftete Abbildungen (Liste
      tastbarer Landmarken), keine Ursprung/Ansatz/Funktion-Angaben; eher als
      Ergänzung für `palpationHint`/Bildbriefe geeignet, nicht als alleinige
      Quelle für ein vollständiges Anatomie-Item

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
