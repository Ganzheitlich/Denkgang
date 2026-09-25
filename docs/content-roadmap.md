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

## Stand (25.09.2026)

- Wissensbibliothek: 213 Einträge (8 Anatomie-Spiegelungen, 9 Grundlagen, 56
  Untersuchung, 73 Pathologie, 63 Biomechanik, 24 Therapie — genaue
  Aufteilung kann leicht abweichen, da manche Einträge mehrere Kategorien
  berühren). Koch/Fischer, Lahmheitsuntersuchung beim Hund
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
  diagnostischem Flexionsaufnahme-Zeichen. Details und bewusste
  Auslassungen siehe PATHOLOGIE-Backlog unten. Nächster Schritt: VetCenter
  „Wirbelsäulenerkrankungen" ab S. 30/43 fortsetzen (Wobbler-Syndrom im
  Detail, Lumbosakrale Instabilität/Stenose im Detail — siehe Backlog),
  danach ggf. Baumgartner/Wittek/Khol trotz der bekannten Einschränkungen.
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
- [x] Hüftgelenkluxation (traumatisch) + Ehmer-Schlinge — jetzt über
      Koch/Fischer Kap. 8.3.10 abgedeckt (`hueftgelenkluxation-hund`,
      24.09.2026), inkl. der hier geforderten klaren Abgrenzung zur HD
      (plötzliches Trauma vs. langsam entstandene Gelenklockerheit)
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
      **Nächster Fortsetzungspunkt:** Die Datei hat noch 43 Web-Seiten
      insgesamt, davon S. 1–29 jetzt ausgewertet. Ab S. 30 weiterlesen:
      Zervikale Spondylopathie/Wobbler-Syndrom im Detail, Lumbosakrale
      Instabilität/Stenose im Detail, Wirbelmissbildungen,
      Exostosenbildung, Tumoren der Wirbelsäule/des Rückenmarks,
      Rückenmarködem, Zysten der Rückenmarkhäute, Abszesse der
      Wirbelsäule sowie die allgemeine Prognoseskala mit Erfolgsraten
      (ohne die Medikamenten-Dosierungen).

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

- [ ] **Struktur erkundet, noch nicht als Content umgesetzt (25.09.2026).**
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
- [ ] Rest von Kap. 13 (Ellenbogenregion) sowie Wirbelsäule Kap. 16 —
      teilweise schon für Quellenprüfung gelesen, aber nicht systematisch
      auf weitere Biomechanik-Fakten durchsucht.
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
