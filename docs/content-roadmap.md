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

- Wissensbibliothek: 75 Einträge (7 Anatomie-Spiegelungen, 6 Grundlagen, 27
  Untersuchung, 24 Pathologie, 9 Biomechanik, 6 Therapie — genaue Aufteilung
  kann leicht abweichen, da manche Einträge mehrere Kategorien berühren). Die
  24 neuen seit dem 21.09. sind Koch/Fischer Kap. 6.2/6.3 (liegender Hund, 7
  Einträge), Kap. 7 (Neurologischer Untersuchungsgang, 9 Einträge) und
  Kap. 8.1–8.2 (Allgemeine Informationen + Generalisierte Skeletterkrankungen,
  8 Einträge, siehe Backlog unten) — damit sind Kap. 6 und Kap. 7 des Buches
  vollständig abgedeckt, Kap. 8 erst teilweise (8.1–8.2 von vermutlich
  mehreren Unterkapiteln bis S. 229).
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
- [x] Osteomyelitis (Kapitelanfang, S. 1 ff.) — inhaltlich abgedeckt über
      Koch/Fischer Kap. 8.2.6 (`osteomyelitis-hund`, 24.09.2026) statt aus
      dieser Quelle separat gelesen; VetCenters eigene Version bleibt
      ungelesen, gilt aber als nicht mehr prioritär
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
- [x] Generalisierte Skeletterkrankungen: Osteochondrose (OC), Panostitis,
      hypertrophe Osteodystrophie — inhaltlich abgedeckt über Koch/Fischer
      Kap. 8.2.1–8.2.4 (24.09.2026, siehe eigener Abschnitt oben) statt aus
      VetCenters eigenem Kapitel 8.2 separat gelesen
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
