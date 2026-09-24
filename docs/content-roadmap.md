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

## Stand (24.09.2026)

- Wissensbibliothek: 58 Einträge (7 Anatomie-Spiegelungen, 6 Grundlagen, 20
  Untersuchung, 15 Pathologie, 9 Biomechanik, 5 Therapie — genaue Aufteilung
  kann leicht abweichen, da manche Einträge mehrere Kategorien berühren). Die
  7 neuen seit dem 21.09. sind Koch/Fischer Kap. 6.2/6.3 (liegender Hund,
  siehe Backlog unten) — damit ist Kap. 6 des Buches vollständig abgedeckt.
- Anatomie-Sektion: alle 29 Items haben jetzt vollständige Ursprung-/Ansatz-/
  Innervations-Angaben (siehe Anatomie-Lückenschluss oben) — keine offenen
  "Im Quellentext nicht genannt"-Kernfelder mehr.
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
- [~] Hüftgelenkdysplasie (HD) als eigenständiges Krankheitsbild (Definition,
      Ätiologie, Diagnostik) — bisher nur über Ortolani-Test (Hárrer) und als
      Beispiel für Gelenkinkongruenz in `arthrose-mechanische-hauptursachen`
      abgedeckt (inkl. der konkreten HD-Kausalkette: Inkongruenz → Druck am
      Pfannenrand → biochemische Knorpelzerstörung). Eine eigenständige
      HD-Quelle mit Definition/Diagnostik/Röntgenscoring (z. B. FCI/OFA-Score)
      fehlt weiterhin.
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
- [ ] Rest des Kapitels systematisch weiterlesen (Datei ca. 121 Seiten, bisher
      nur bis ca. S. 80 gesichtet — Fraktur-, Tumor- und Wirbelsäulenabschnitte
      am Ende vermutlich noch offen)

### PATHOLOGIE — Alexander/Baatz/Jaggy/Kathmann, „Pathophysiologie des Bewegungsapparates" (VetCenter/Thieme, aus: Physikalische Therapie für Kleintiere)

Neu entdeckte Quelle (22.09.2026), bisher nur teilweise gesichtet (nur Muskulatur-
und Achsenabweichungs-Abschnitt gelesen für `patellaluxation-krankheitsbild`).
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
- [ ] Rest der Datei (Literaturverzeichnis zeigt u. a. Kapitel zu
      Polyneuropathien, Klinischer Pathophysiologie, Canine Rehabilitation)
      noch nicht systematisch gesichtet — diese Quelle gilt damit als
      inhaltlich weitgehend ausgeschöpft für die aktuell relevanten
      Denkgang-Themen (Bewegungsapparat + Grundlagen-Neurologie).

### PATHOLOGIE — VetCenter, „Wirbelsäulenerkrankungen" (eigene Datei, noch ungelesen)

- [ ] Ganze Datei sichten — zentral für Fall Nala (Facettengelenke,
      lumbosakraler Übergang, Spondylose/IVDD als Differentialdiagnosen)

### PATHOLOGIE — Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3)

- [x] Toe-in/Toe-out als Nervenkompressions-Warnzeichen (M. supinator/N.
      radialis, M. pronator teres/N. medianus) — Kap. 14 (Unterarmregion),
      S. 179
- [x] Warum Hunde ihre Zehen beknabbern — drei Differentialdiagnosen
      (Allergie, Arthrose, Hyperästhesie durch Nervenreizung) — Kap. 15
      (Karpalgelenk und Zehen), S. 193
- [ ] Radiuskurvensyndrom (frühzeitiger Epiphysenschluss der Ulna →
      Valgusstellung des Radius) — nur beiläufig erwähnt in Kap. 14, S. 179,
      eigenes Unterkapitel/eigene Quelle noch zu finden
- [ ] Kap. 16 (Wirbelsäule) — teilweise für Quellenprüfung von facettengelenke
      gelesen, aber nicht systematisch nach weiteren Pathologie-Themen
      durchsucht (z. B. Spondylose, IVDD, Cauda-equina)
- [~] Kap. 17 Neurotension (S. 269–296) — gelesen: 17.1 (ZNS/PNS-Grundlagen,
      Sympathikus, Horner-Syndrom — sehr ausführlich, aber eher humanmedizin-
      nahe Grundlagenanatomie, noch nicht als Wissenseintrag umgesetzt),
      17.2–17.2.4 (Bewegung/Dehnung/Kompression, Ursachen und Symptome
      mechanosensitiver Nerven — als `nervenkompression-druck-dehnungsschwellen`
      umgesetzt) sowie 17.3/17.4/17.5.1/17.5.2 (Wirkprinzip, Kontraindikationen,
      Nervenleitung, Mechanosensitivitäts-Untersuchung — als
      `neurotensionsbehandlung-wirkprinzip-kontraindikationen` umgesetzt, S.
      279–281). Noch offen: der Rest von 17.5 (S. 282–296) mit den konkreten
      Behandlungstechniken (Duramobilisation etc.) — bewusst NICHT als
      Wissensbibliothek-Content vorgesehen (praktische Handgriffe für
      ausgebildete Therapeut:innen, kein Nachschlage-Wissen), außer Vanessa
      möchte das anders.
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
- [x] **Korrektur eines eigenen Irrtums vom 24.09.:** Die ursprüngliche
      Vermutung, ab S. 157 folge kein separates Neuro-Kapitel, sondern
      direkt ein Pathologie-Teil, war falsch und ist hiermit zurückgezogen.
      Tatsächlich bestätigt: **Kapitel 7 „Neurologischer Untersuchungsgang"
      (Daniel Koch, Martin S. Fischer) beginnt exakt auf S. 157** — wie
      ursprünglich im Backlog vermerkt. Gelesen und inhaltlich bestätigt:
      7.1 Einordnung (Abgrenzung Lahmheit/Lähmung, Ziel: topische Diagnose),
      7.2 Anamnese (7.2.1 Signalement mit Rasseprädispositionen, 7.2.2
      Vorgeschichte mit 12 Leitfragen + Befund-DD-Zuordnungen), 7.3
      Bewusstsein und Verhalten, 7.4 Haltung (inkl. Schiff-Sherrington,
      Opisthotonus, Myoklonien, Tremor, Lordose/Kyphose/Skoliose,
      Kopfschiefhaltung als Befunde), 7.5 Beobachtung des Ganges (diagonale
      Gangart, Ataxie-Typen nach Lokalisation: spinal/zerebellär/vestibulär/
      kortikal, Plegie-/Paresetypologie), sowie der Anfang von 7.6
      Haltungs- und Stellreaktionen (7.6.1 Tischkantenprobe, 7.6.2
      Unterstützungsreaktion, S. 157–160) — noch **nicht als
      Wissenseinträge umgesetzt**, da dieses Kapitel bewusst erst nach
      vollständiger Lektüre (weitere Stell-/Haltungsreaktionen,
      vermutlich spinale Reflexe, Hirnnervenprüfung, Schmerzwahrnehmung)
      am Stück sauber strukturiert werden soll, statt es fragmentiert zu
      beginnen.
- [ ] **Offene Sorgfaltsnotiz zur Datei-ID-Zuordnung:** Beim Lesen der
      Kap.-7-Chunks ist mir eine Verwechslung von Drive-Datei-IDs
      unterlaufen (ein Lesevorgang, den ich für einen neuen Kap.-7-Chunk
      hielt, lieferte tatsächlich bereits bekannten Kap.-5.3-Inhalt zurück
      — Ursache: ich hatte mir die falsche fileId für „das nächste u(N)"
      gemerkt statt sie erneut aus einer frischen `search_files`-Abfrage
      zu entnehmen). Es wurde dadurch **nichts Falsches in die Datenbank
      geschrieben** — der Fehler ist rein beim Lesen passiert und wurde vor
      dem Schreiben irgendeines Eintrags bemerkt. Konsequenz für künftige
      Sessions: die bisher dokumentierte 1:1-Tabelle „u(N) = Seite X" NICHT
      blind weiterverwenden, sondern vor dem nächsten Lesevorgang erneut
      `search_files` auf den Ordner ausführen, die Zuordnung Titel→fileId
      frisch notieren, und Chunks einzeln (nicht mehrere fileIds parallel
      aus dem Gedächtnis) abrufen, bis die Zuordnung für den Rest der Datei
      neu und zuverlässig etabliert ist.
- [x] Die Datei hat ~46 Einzel-PDF-Chunks (u.pdf, u(1)–u(46), Ordner-ID
      1J3C3r71IrVdvrSUmTm8yRjMtMuyI8ZeT). Sicher verifizierte Zuordnungen
      (Seitenkopf im zurückgegebenen Text geprüft, nicht nur die
      Chunk-Nummer angenommen): u(13)=S.80–82, u(14)=S.82–83, u(15)=S.83–84,
      u(16)=S.84–98 [Kap. 5.3 komplett], u(17)=S.98–109 [Kap. 5.4 komplett],
      u(18)=S.110f. [Anfang Kap. 6], u(19)=S.111–136 [Kap. 6.2
      Hintergliedmaße komplett], u(20)=S.136–156 [Kap. 6.3 Vordergliedmaße
      komplett + Kap. 6.4 Literaturverzeichnis]. Kap. 6 ist damit
      vollständig abgedeckt. Für Kap. 7 (Neurologischer Untersuchungsgang,
      bestätigt ab S. 157) wurde Inhalt bis S. 160 (Anfang 7.6.2) bereits
      gelesen, aber die genaue u(N)-Zuordnung dafür ist wegen der oben
      genannten Verwechslung nicht mehr zweifelsfrei dokumentiert — beim
      Fortsetzen daher ab einer frischen Ordnerabfrage neu einsteigen und
      testweise mit dem Seitenkopf „S. 160" o.ä. abgleichen, um die
      richtige Stelle zuverlässig wiederzufinden, bevor mit S. 160ff.
      weitergelesen wird.

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
- [x] Das Karpalgelenk als drei Gelenketagen (Art. antebrachiocarpea,
      mediocarpea, ossis carpi accessorii) plus Metacarpus/Sesambeinchen —
      Kap. 15, S. 192.
- [ ] Rest von Kap. 13 (Ellenbogenregion) und alle anderen Regionen-Kapitel
      (Hüfte Kap. 7, Wirbelsäule Kap. 16 — teilweise schon für Quellenprüfung
      gelesen, aber nicht systematisch auf weitere Biomechanik-Fakten
      durchsucht) enthalten wahrscheinlich noch mehr ähnliche
      Gelenkmechanik-Fakten.
- [x] Kap. 9 Unterschenkelregion (ma(9).pdf) — proximales/distales
      Tibiofibulargelenk, Membrana interossea cruris, die Diskussion um das
      tatsächliche Bewegungsausmaß über die Talus-Form erklärt — S. 94f.
      (`tibiofibulargelenke`). Die Muskulatur dieser Region (Unterschenkel)
      selbst ist damit noch nicht abgedeckt, nur die Gelenkmechanik.

### BIOMECHANIK — Hohmann, Bewegungsapparat Hund (ISBN 978-3-13-245265-7)

- [ ] Kap. 2 Statik und Dynamik des Hundes (b3.pdf, teilweise bereits beim
      Lesen für ED/Bizeps überflogen)
- [ ] Kap. 3 Schwerpunkt und Unterstützungsfläche (b4.pdf)
- [ ] Kap. 4 Der Knochen (b5.pdf)
- [x] Kap. 5 Das Gelenk (b6.pdf) — Struktur-/Bauart-/Gelenktyp-Einteilung mit
      caninen Beispielen + Gelenkflächen-Inkongruenz (S. 48–50). Rest des
      Kapitels (Gelenkkapsel, Synovia, Bänder — falls noch mehr folgt) noch
      nicht gesichtet.
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
- [x] M. biceps femoris, M. semitendinosus, M. gracilis, M. sartorius,
      M. tensor fasciae latae — verifiziert gegen Hárrer Kap. 8 (Knieregion),
      S. 91–93, zusammen mit dem korrigierten `quadriceps`-Item. Noch offen:
      M. semimembranosus, M. gastrocnemius (Rest der "Hamstrings"/
      Unterschenkelmuskulatur).
- [x] M. brachialis, M. triceps brachii, M. tensor fasciae antebrachii,
      M. anconeus (komplette Ellbogenflexoren-/-extensorengruppe) —
      verifiziert gegen Hárrer Kap. 13, S. 165–178
- [x] M. supinator, M. brachioradialis, M. pronator teres,
      M. pronator quadratus sowie zwei gruppierte Items für Extensoren-/
      Flexorenmuskulatur des Karpus/der Zehen — verifiziert gegen Hárrer
      Kap. 14, S. 179–184. Damit ist die komplette Vordergliedmaße von
      Schulter bis Karpus abgedeckt.
- [ ] Kap. 15 Karpalgelenk und Zehen: einzelne Bänder/Kollateralligamente der
      Zehengelenke noch nicht als eigene Anatomie-Items, nur im
      Biomechanik-Eintrag "Karpalgelenk" mit erwähnt
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
