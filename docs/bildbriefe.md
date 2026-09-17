# Bildbriefe — Denkgang

Diese Bildbriefe entstehen nach dem Verfahren aus `docs/MASTER-PROMPT.md` (§§2–7): Claude
erkennt Bildbedarf und schreibt den fachlichen Bildbrief, die tatsächliche Bildgenerierung
übernimmt ChatGPT, die fachliche/praktische Freigabe Vanessa.

**Wichtiger Hinweis zum Status:** Alle zugrunde liegenden Fall- und Anatomiedaten stehen aktuell
selbst noch auf `sourceStatus: DRAFT` (siehe `src/lib/seedContent.ts`) — die genannten
Quellenkandidaten (Hárrer, Hohmann, Könneker, Zentek, Mai, jeweils Thieme) sind noch nicht mit
konkreter Seitenzahl fachlich verifiziert. Jeder Bildbrief unten erbt diesen Status: **DRAFT**,
solange der zugrunde liegende Fall/Anatomie-Eintrag nicht auf `REVIEW`/`APPROVED` steht. Bilder
sollten erst final produziert werden, wenn die fachliche Grundlage bestätigt ist — ansonsten
riskieren wir ein hochwertiges Bild zu einer noch nicht abgesicherten Aussage.

## Grundsatzentscheidungen "kein Bild"

Bei drei Fällen wird bewusst **kein** Befundbild vorgeschlagen, weil der Befund dynamisch
(Gangbild/Bewegung) oder rein palpatorisch ist und ein einzelnes Standbild ihn nicht ehrlich
abbilden könnte, ohne entweder nichtssagend oder irreführend zu wirken:

- **Rocky** (verkürzte Schrittlänge + kompensatorisches Kopfnicken beim Gehen)
- **Nala** (Vermeidungsverhalten beim Bücken, Steifheit nach dem Aufstehen)
- **Emma** (eingeschränkte Hüftstreckung beim Absprung/Wendung)

Hier bleibt es bei einem Einstiegsbild; der eigentliche Lernpunkt wird weiterhin über Text und das
bestehende Text-Diagramm (`diagramLabel`) vermittelt. Das entspricht §3: "Kein Bild verwenden,
wenn kein echter didaktischer Mehrwert besteht."

---

## Fall: Rocky — Bizepssehnen-Tendinopathie

### BILDBRIEF ROCKY-01

- **Asset-ID:** ROCKY-01
- **Fall:** Rocky — unklares Hinken vorne rechts
- **Bildtyp:** Einstiegsbild
- **Didaktischer Zweck:** Tier und Situation einführen, bevor die klinischen Details folgen. Kein
  Hinweis auf Diagnose oder betroffene Seite.
- **Tier:** Hund, Labrador Retriever, ca. 4 Jahre, Geschlecht nicht spezifiziert
- **Position:** Ruhiger Stand, entspannt
- **Perspektive:** Lateral oder leicht schräg-frontal
- **Darzustellender Befund:** Keiner — reines Situationsbild
- **Anatomische Vorgaben:** Normale, altersgerechte Proportionen eines Labradors; symmetrischer
  Stand
- **Marker:** Keiner
- **Nicht darstellen:** Keine Lahmheit, kein Hochhalten einer Pfote, keine Schonhaltung, keine
  Beschriftung, kein Tierarzt-/Klinik-Setting
- **Fachliche Grundlage:** Rasse-/Alterstypische Darstellung, keine spezifische Fachquelle
  erforderlich (reines Kontextbild)
- **Status:** DRAFT

*Kein Befundbild — Begründung siehe oben.*

### BILDBRIEF ANATOMIE-BICEPS-01

- **Asset-ID:** ANATOMIE-BICEPS-01
- **Fall:** Rocky (verknüpftes Anatomie-Item: M. biceps brachii)
- **Bildtyp:** Anatomiebild
- **Didaktischer Zweck:** Verlauf des M. biceps brachii von Ursprung bis Ansatz zeigen, damit die
  Lernenden nachvollziehen können, warum kombinierte Schulterextension/Ellenbogenflexion den
  Muskel dehnt bzw. belastet.
- **Tier:** Hund, generisch (keine bestimmte Rasse nötig), laterale Ganzkörper- oder
  Vordergliedmaßen-Silhouette
- **Position:** Stehend, Vordergliedmaße in neutraler Stellung; optional zweite Teilabbildung mit
  Schulterextension/Ellenbogenflexion kombiniert
- **Perspektive:** Lateral
- **Darzustellender Befund:** Kein klinischer Befund — anatomischer Verlauf
- **Anatomische Vorgaben:**
  - Ursprung: Tuberculum supraglenoidale der Scapula
  - Verlauf: kranial über das Schultergelenk, dann distal über den Ellenbogen
  - Ansatz: Tuberositas radii, mit Ansatzschleife auch an der proximalen Ulna
  - Muskelbauch klar von Nachbarstrukturen (M. triceps brachii, M. supraspinatus) abgegrenzt
- **Marker:** Dezente Beschriftung von Ursprung/Ansatz erlaubt (Lernbild, keine Fallauflösung)
- **Nicht darstellen:** Keine Pathologie/Entzündung/Riss einzeichnen — reine Normalanatomie
- **Fachliche Grundlage:** Quellenkandidat Hárrer, *Manuelle Therapie beim Hund*
  (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 12 — **NICHT VERIFIZIERT** (Seitenzahl/Abbildung noch
  nicht geprüft)
- **Status:** DRAFT

---

## Fall: Nala — lumbosakraler Schmerz

### BILDBRIEF NALA-01

- **Asset-ID:** NALA-01
- **Fall:** Nala — zunehmend gereizt beim Anleinen
- **Bildtyp:** Einstiegsbild
- **Didaktischer Zweck:** Situation einführen (Hund + Halsband/Geschirr-Kontext), ohne Schmerz oder
  Knurren zu zeigen.
- **Tier:** Hund, Mischling, ca. 6 Jahre, mittelgroß
- **Position:** Ruhiger Stand oder Sitz
- **Perspektive:** Frontal oder leicht lateral
- **Darzustellender Befund:** Keiner — reines Situationsbild
- **Anatomische Vorgaben:** Normale Proportionen, entspannte Körperhaltung
- **Marker:** Keiner
- **Nicht darstellen:** Kein Knurren, keine Zähne, kein Anlegen des Geschirrs im Bild (würde die
  Auslösesituation vorwegnehmen), keine Schmerzmimik
- **Fachliche Grundlage:** Kontextbild, keine Fachquelle erforderlich
- **Status:** DRAFT

*Kein Befundbild — Begründung siehe oben.*

### BILDBRIEF ANATOMIE-FACETTENGELENKE-01

- **Asset-ID:** ANATOMIE-FACETTENGELENKE-01
- **Fall:** Nala (verknüpftes Anatomie-Item: Facettengelenke, lumbosakraler Übergang)
- **Bildtyp:** Anatomiebild
- **Didaktischer Zweck:** Lage der Facettengelenke im lumbosakralen Übergang zeigen, um die
  Palpationsregion aus dem Fall nachvollziehbar zu machen.
- **Tier:** Hund, generisch, Wirbelsäulen-Ausschnitt (keine Rasse nötig)
- **Position:** Neutrale Wirbelsäulenstellung
- **Perspektive:** Lateral oder dorsolateral, Ausschnitt lumbosakraler Übergang
- **Darzustellender Befund:** Kein klinischer Befund — anatomischer Übersichtsschnitt
- **Anatomische Vorgaben:**
  - Verbindungen zwischen den Wirbelbögen benachbarter Lendenwirbel klar erkennbar
  - Übergang zum Os sacrum eindeutig markiert
  - Keine Verwechslung mit Bandscheibe/Nucleus pulposus (das ist eine andere Struktur, siehe Bär)
- **Marker:** Dezente Beschriftung "Facettengelenke" und "lumbosakraler Übergang" erlaubt
- **Nicht darstellen:** Keine Arthrose-/Entzündungszeichen — reine Normalanatomie
- **Fachliche Grundlage:** Quellenkandidat Hárrer, *Manuelle Therapie beim Hund*
  (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 16 — **NICHT VERIFIZIERT**
- **Status:** DRAFT

---

## Fall: Bruno — 6 Wochen nach TPLO-Operation

*(Das Beispiel aus `docs/MASTER-PROMPT.md` §17 — hier in Bildbrief-Form ausformuliert.)*

### BILDBRIEF BRUNO-01

- **Asset-ID:** BRUNO-01
- **Fall:** Bruno — 6 Wochen nach TPLO-Operation
- **Bildtyp:** Einstiegsbild
- **Didaktischer Zweck:** Tier und "wirkt eigentlich fit"-Eindruck vermitteln, der die
  Fallpointe (äußerlich fit ≠ voll belastbar) later kontrastiert.
- **Tier:** Hund, Border Collie, ca. 3 Jahre
- **Position:** Aufmerksamer, aktiv wirkender Stand
- **Perspektive:** Lateral oder dreiviertel-frontal
- **Darzustellender Befund:** Keiner — bewusst unauffälliges, fittes Erscheinungsbild
- **Anatomische Vorgaben:** Normale Rasseproportionen; keine sichtbare Atrophie in dieser
  Perspektive nötig (das kommt erst in BRUNO-02)
- **Marker:** Keiner
- **Nicht darstellen:** Keine OP-Narbe, kein Verband, keine Schonhaltung
- **Fachliche Grundlage:** Kontextbild, keine Fachquelle erforderlich
- **Status:** DRAFT

### BILDBRIEF BRUNO-02

- **Asset-ID:** BRUNO-02
- **Fall:** Bruno — 6 Wochen nach TPLO-Operation
- **Bildtyp:** Befundbild
- **Didaktischer Zweck:** Den Seitenunterschied im Oberschenkelumfang erkennbar machen, den die
  Lernenden im Fall selbst herleiten sollen (Atrophie des M. quadriceps femoris auf der operierten
  Seite).
- **Tier:** Hund, Border Collie, ca. 3 Jahre (wie BRUNO-01)
- **Position:** Stand, Gewicht gleichmäßig verteilt
- **Perspektive:** Von hinten (kaudal), auf Höhe der Oberschenkel, sodass beide Hintergliedmaßen im
  Bildausschnitt sind
- **Darzustellender Befund:** Sichtbar reduzierter Muskelumfang am operierten Oberschenkel im
  Seitenvergleich zur nicht operierten Seite — genau der im Fall beschriebene Befund, nicht mehr
  und nicht weniger
- **Anatomische Vorgaben:** Der Umfangsunterschied muss an der Oberschenkelmuskulatur
  (M. quadriceps femoris-Region) sitzen, nicht am Unterschenkel oder an der Pfote
- **Marker:** Dezenter, neutraler Marker zulässig, um zu zeigen, welches Bein operiert wurde (z. B.
  ein kleiner geschorener Fellbereich oder eine dezente Farbe am Halsband-/Leinen-Zubehör) — **kein**
  Pfeil, keine Textbeschriftung "Atrophie"
- **Nicht darstellen:** Keine Beschriftung, die die Diagnose vorwegnimmt; kein sichtbarer
  OP-Schnitt/Narbe (das wäre ein zusätzlicher, im Fall nicht erwähnter Befund); operierte Seite
  ≠ automatisch die "Antwort" — der Seitenunterschied selbst ist der Lerninhalt, nicht welche Seite
  operiert wurde
- **Fachliche Grundlage:** Klinische Beschreibung direkt aus dem Fall (`beobachtung`/`palpation` in
  `seedContent.ts`); keine zusätzliche externe Quelle nötig für die reine Bildkomposition
- **Status:** DRAFT

### BILDBRIEF ANATOMIE-QUADRICEPS-01

- **Asset-ID:** ANATOMIE-QUADRICEPS-01 (= BRUNO-03)
- **Fall:** Bruno (verknüpftes Anatomie-Item: M. quadriceps femoris)
- **Bildtyp:** Anatomiebild
- **Didaktischer Zweck:** Die vier Köpfe des M. quadriceps femoris und seinen Verlauf zur
  Tuberositas tibiae zeigen, damit klar wird, warum dieser Muskel nach Knie-OPs das zentrale
  Rehabilitationsziel ist.
- **Tier:** Hund, generisch, Hintergliedmaßen-Ausschnitt
- **Position:** Lateral, Hintergliedmaße in neutraler Stellung
- **Perspektive:** Lateral, ggf. mit einer zweiten Teilansicht von kranial für die vier Köpfe
- **Darzustellender Befund:** Kein klinischer Befund — anatomischer Verlauf
- **Anatomische Vorgaben:**
  - Vier Köpfe erkennbar: u. a. Ursprung am Os ilium (M. rectus femoris) und am Femur (Vasti)
  - Gemeinsamer Ansatz über die Patella und das Ligamentum patellae an der Tuberositas tibiae
  - Funktion (Extension des Kniegelenks) muss aus der Darstellung nachvollziehbar sein
- **Marker:** Dezente Beschriftung der vier Köpfe und des Ansatzes erlaubt
- **Nicht darstellen:** Keine Atrophie/Pathologie — reine Normalanatomie (die Atrophie ist Inhalt
  von BRUNO-02, nicht dieses Bildes)
- **Fachliche Grundlage:** Quellenkandidat Hohmann, *Bewegungsapparat Hund*
  (ISBN 978-3-13-245265-7), Thieme 2025, Kap. 9 — **NICHT VERIFIZIERT** (genaue Seite noch offen)
- **Status:** DRAFT

---

## Fall: Luna — Hüftdysplasie im Wachstumsalter

### BILDBRIEF LUNA-01

- **Asset-ID:** LUNA-01
- **Fall:** Luna — auffälliges Gangbild bei einer jungen Dogge
- **Bildtyp:** Einstiegsbild
- **Didaktischer Zweck:** Tier und Wachstumsalter/Größe vermitteln, ohne Gangbild oder Muskelbau zu
  zeigen.
- **Tier:** Hund, Deutsche Dogge, ca. 8 Monate (jugendlich-großwüchsig, noch nicht ausgewachsen
  wirkend)
- **Position:** Ruhiger Stand
- **Perspektive:** Lateral, Ganzkörper, damit die Größe/das jugendliche Erscheinungsbild sichtbar
  wird
- **Darzustellender Befund:** Keiner
- **Anatomische Vorgaben:** Jugendlich-großwüchsige Proportionen (noch etwas unproportioniert wirken
  darf, wie bei jungen großen Rassen üblich)
- **Marker:** Keiner
- **Nicht darstellen:** Kein Hoppel-/Bunny-Hopping-Gangbild, keine Schmerzanzeichen
- **Fachliche Grundlage:** Kontextbild, keine Fachquelle erforderlich
- **Status:** DRAFT

### BILDBRIEF LUNA-02

- **Asset-ID:** LUNA-02
- **Fall:** Luna — auffälliges Gangbild bei einer jungen Dogge
- **Bildtyp:** Befundbild
- **Didaktischer Zweck:** Die im Fall beschriebene "eher schmächtige Hinterhandmuskulatur für Rasse
  und Alter" erkennbar machen — ein statischer, direkt beobachtbarer Befund (im Unterschied zum
  dynamischen Hoppel-Gangbild, das hier bewusst nicht dargestellt wird).
- **Tier:** Deutsche Dogge, ca. 8 Monate (wie LUNA-01)
- **Position:** Stand
- **Perspektive:** Von hinten (kaudal) oder seitlich-kaudal, Fokus auf die Hinterhand im Vergleich
  zur Vorderhand
- **Darzustellender Befund:** Vergleichsweise schmächtig wirkende Hinterhandmuskulatur im Verhältnis
  zu Rasse und Alter — kein einseitiger Seitenunterschied (die Symptomatik ist beidseitig), sondern
  eine insgesamt unterentwickelt wirkende Muskulatur
- **Anatomische Vorgaben:** Beidseitig symmetrisch schmächtig, keine einseitige Betonung
- **Marker:** Keiner nötig
- **Nicht darstellen:** Kein Ortolani-Test/Manipulation am Gelenk, keine Beschriftung "Hüftdysplasie"
- **Fachliche Grundlage:** Klinische Beschreibung direkt aus dem Fall (`beobachtung` in
  `seedContent.ts`)
- **Status:** DRAFT

### BILDBRIEF ANATOMIE-HUEFTE-01

- **Asset-ID:** ANATOMIE-HUEFTE-01
- **Fall:** Luna (verknüpftes Anatomie-Item: Articulatio coxae — Kapsel-Band-Apparat)
- **Bildtyp:** Anatomiebild
- **Didaktischer Zweck:** Kapsel-Band-Apparat des Hüftgelenks zeigen, um zu verdeutlichen, was beim
  Ortolani-Test (Laxitätsprüfung) tatsächlich geprüft wird.
- **Tier:** Hund, generisch, Beckenregion-Ausschnitt
- **Position:** Neutrale Gelenkstellung
- **Perspektive:** Ventral oder lateral, ggf. mit Schnittdarstellung des Gelenks
- **Darzustellender Befund:** Kein klinischer Befund — Normalanatomie des Gelenks, optional mit
  einer zweiten, dezent angedeuteten Vergleichsdarstellung "erhöhte Laxität" (ohne diese als
  "Diagnose Hüftdysplasie" zu betiteln)
- **Anatomische Vorgaben:**
  - Femurkopf und Hüftpfanne (Acetabulum) korrekt kongruent dargestellt
  - Ligamentum capitis femoris und Gelenkkapsel erkennbar
- **Marker:** Dezente Beschriftung der Strukturen erlaubt
- **Nicht darstellen:** Keine radiologische Aufnahme vortäuschen, keine expliziten
  Arthrose-Endstadien
- **Fachliche Grundlage:** Quellenkandidat Hárrer, *Manuelle Therapie beim Hund*
  (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 7 — **NICHT VERIFIZIERT**
- **Status:** DRAFT

---

## Fall: Findus — belastungsbedingte Beschwerden durch Übergewicht

### BILDBRIEF FINDUS-01

- **Asset-ID:** FINDUS-01
- **Fall:** Findus — schleichende Bewegungsunlust
- **Bildtyp:** Einstiegsbild
- **Didaktischer Zweck:** Tier und Alltagssituation (Spaziergang) einführen.
- **Tier:** Hund, Mischling, ca. 7 Jahre
- **Position:** Stand oder gemütliches Gehen, entspannt
- **Perspektive:** Lateral
- **Darzustellender Befund:** Keiner (Übergewicht folgt erst in FINDUS-02, hier neutraler
  Alltagskontext)
- **Anatomische Vorgaben:** Keine besonderen Vorgaben
- **Marker:** Keiner
- **Nicht darstellen:** Keine übertrieben dramatische "adipöse" Karikatur
- **Fachliche Grundlage:** Kontextbild, keine Fachquelle erforderlich
- **Status:** DRAFT

### BILDBRIEF FINDUS-02

- **Asset-ID:** FINDUS-02
- **Fall:** Findus — schleichende Bewegungsunlust
- **Bildtyp:** Befundbild
- **Didaktischer Zweck:** Sichtbares Übergewicht als objektiven, direkt beobachtbaren Befund zeigen
  — Grundlage für die spätere Bewertung des Body Condition Scores durch die Lernenden.
- **Tier:** Hund, Mischling, ca. 7 Jahre (wie FINDUS-01)
- **Position:** Stand, seitlich, Rumpf vollständig sichtbar
- **Perspektive:** Lateral, Taille/Rippenregion gut einsehbar
- **Darzustellender Befund:** Deutliches Übergewicht (keine sichtbare Taille, keine tastbaren Rippen
  erkennbar) — realistisch, nicht karikaturhaft übertrieben
- **Anatomische Vorgaben:** Proportionen bleiben anatomisch plausibel; kein unrealistisch
  überzeichneter "Cartoon-Fettleibigkeit"-Look
- **Marker:** Keiner
- **Nicht darstellen:** Keine Textbeschriftung "übergewichtig", keine BCS-Skala im Bild
- **Fachliche Grundlage:** Klinische Beschreibung direkt aus dem Fall (`beobachtung` in
  `seedContent.ts`); allgemeines Konzept Body Condition Score — Quellenkandidat Zentek,
  *Ernährung des Hundes* (ISBN 978-3-132-46109-3), Thieme 2026, Kap. 2.4 — **NICHT VERIFIZIERT**
- **Status:** DRAFT

*Kein Anatomiebild — Findus hat bewusst kein verknüpftes Anatomie-Item (diffuse,
gewichtsbedingte Belastung ohne punktuelle Struktur), siehe `seedContent.ts`.*

---

## Fall: Emma — Iliopsoas-Zerrung

### BILDBRIEF EMMA-01

- **Asset-ID:** EMMA-01
- **Fall:** Emma — Zurückhaltung bei engen Wendungen
- **Bildtyp:** Einstiegsbild
- **Didaktischer Zweck:** Tier und sportlichen Kontext (Agility) einführen, ohne die
  Bewegungseinschränkung selbst zu zeigen.
- **Tier:** Hund, Border Collie, ca. 5 Jahre, sportlich-athletischer Körperbau
- **Position:** Aufmerksamer, aktiver Stand
- **Perspektive:** Lateral oder dreiviertel-frontal
- **Darzustellender Befund:** Keiner
- **Anatomische Vorgaben:** Athletische, gut bemuskelte Proportionen (kein Hinweis auf Verletzung)
- **Marker:** Keiner
- **Nicht darstellen:** Kein Agility-Hindernis/Sprung in Aktion (das würde die spätere
  Bewegungseinschränkung vorwegnehmen), keine Schonhaltung
- **Fachliche Grundlage:** Kontextbild, keine Fachquelle erforderlich
- **Status:** DRAFT

*Kein Befundbild — Begründung siehe oben (dynamischer Befund bei Wendung/Absprung).*

### BILDBRIEF ANATOMIE-ILIOPSOAS-01

- **Asset-ID:** ANATOMIE-ILIOPSOAS-01
- **Fall:** Emma (verknüpftes Anatomie-Item: M. iliopsoas)
- **Bildtyp:** Anatomiebild
- **Didaktischer Zweck:** Lage und Verlauf des M. iliopsoas zeigen, um zu erklären, warum sein
  Palpationsbefund von einer Hüftgelenkpathologie unterschieden werden kann.
- **Tier:** Hund, generisch, Rumpf-/Beckenausschnitt (ventral)
- **Position:** Neutrale Stellung
- **Perspektive:** Ventral, Bauchraum/Becken-Übergang
- **Darzustellender Befund:** Kein klinischer Befund — anatomischer Verlauf
- **Anatomische Vorgaben:**
  - M. psoas major: Ursprung an den Wirbelkörpern der letzten Brust-/Lendenwirbel
  - M. iliacus: Ursprung an der Facies iliaca des Os ilium
  - Gemeinsamer Ansatz am Trochanter minor des Femur
  - Lage ventral der Hüfte, getrennt vom Hüftgelenk selbst erkennbar
- **Marker:** Dezente Beschriftung erlaubt
- **Nicht darstellen:** Keine Zerrung/Entzündung — reine Normalanatomie
- **Fachliche Grundlage:** Quellenkandidat Könneker, *Osteopathie in der Kleintierpraxis*
  (ISBN 978-3-8304-9174-3), Thieme 2010, Kap. 7 — **NICHT VERIFIZIERT**
- **Status:** DRAFT

---

## Fall: Bär — Spondylose

### BILDBRIEF BAER-01

- **Asset-ID:** BAER-01
- **Fall:** Bär — zunehmende Morgensteifheit
- **Bildtyp:** Einstiegsbild
- **Didaktischer Zweck:** Tier und Alter einführen, ruhiger Seniorenhund-Eindruck.
- **Tier:** Hund, Deutscher Schäferhund, ca. 9 Jahre, normalgewichtig
- **Position:** Ruhiger Stand
- **Perspektive:** Lateral
- **Darzustellender Befund:** Keiner
- **Anatomische Vorgaben:** Altersgerechte, normalgewichtige Proportionen (angedeutet reifer/älterer
  Ausdruck ist erlaubt, keine übertriebene Gebrechlichkeit)
- **Marker:** Keiner
- **Nicht darstellen:** Keine Steifheit, keine Schonhaltung
- **Fachliche Grundlage:** Kontextbild, keine Fachquelle erforderlich
- **Status:** DRAFT

### BILDBRIEF BAER-02

- **Asset-ID:** BAER-02
- **Fall:** Bär — zunehmende Morgensteifheit
- **Bildtyp:** Befundbild
- **Didaktischer Zweck:** Den im Fall beschriebenen "steifen, kurzschrittigen Gang beim Aufstehen"
  als beobachtbaren Moment zeigen — bewusst der Zeitpunkt des Aufstehens, nicht des freien Gehens
  (das wäre wieder dynamisch/Gangbild).
- **Tier:** Deutscher Schäferhund, ca. 9 Jahre (wie BAER-01)
- **Position:** Im Übergang vom Liegen zum Stehen erfasst (Vorderkörper bereits aufgerichtet,
  Hinterhand noch am Boden oder in stiff wirkender Zwischenposition)
- **Perspektive:** Lateral
- **Darzustellender Befund:** Sichtbar zögerliche, steif wirkende Aufstehbewegung — kein Schmerzausdruck
  im Gesicht, keine übertriebene Dramatik
- **Anatomische Vorgaben:** Anatomisch plausible Zwischenposition beim Aufstehen
- **Marker:** Keiner
- **Nicht darstellen:** Keine Wirbelsäulen-Röntgenaufnahme, keine Beschriftung "Spondylose"
- **Fachliche Grundlage:** Klinische Beschreibung direkt aus dem Fall (`beobachtung` in
  `seedContent.ts`)
- **Status:** DRAFT

### BILDBRIEF ANATOMIE-DISCUS-01

- **Asset-ID:** ANATOMIE-DISCUS-01
- **Fall:** Bär (verknüpftes Anatomie-Item: Discus intervertebralis)
- **Bildtyp:** Anatomiebild
- **Didaktischer Zweck:** Aufbau der Bandscheibe (Nucleus pulposus, Anulus fibrosus) zeigen, um den
  altersbedingten Elastizitätsverlust vom akuten Bandscheibenvorfall (Fall Filou) begrifflich
  abzugrenzen.
- **Tier:** Hund, generisch, Wirbelsäulen-Ausschnitt im Schnitt
- **Position:** Neutrale Wirbelsäulenstellung
- **Perspektive:** Sagittaler Schnitt durch zwei benachbarte Wirbelkörper
- **Darzustellender Befund:** Zwei Varianten sinnvoll: (a) normale, elastische Bandscheibe, (b)
  altersbedingt an Elastizität verlierende Bandscheibe — **beide nicht als "Vorfall" darstellen**,
  das ist eine andere Pathologie
- **Anatomische Vorgaben:**
  - Nucleus pulposus zentral, Anulus fibrosus als umgebender Faserring klar erkennbar
  - Lage zwischen den Wirbelkörpern korrekt
- **Marker:** Dezente Beschriftung "Nucleus pulposus" / "Anulus fibrosus" erlaubt
- **Nicht darstellen:** Kein Bandscheibenvorfall (Prolaps), keine Rückenmarkskompression — das
  würde den Fall Bär mit dem Fall Filou verwechselbar machen
- **Fachliche Grundlage:** Etabliertes Grundlagenwissen zu degenerativen
  Bandscheibenveränderungen — **NICHT VERIFIZIERT** (konkrete Fachquelle noch zu benennen)
- **Status:** DRAFT

---

## Fall: Filou — akuter Bandscheibenvorfall (Notfall)

### BILDBRIEF FILOU-01

- **Asset-ID:** FILOU-01
- **Fall:** Filou — plötzliche Hinterhand-Schwäche
- **Bildtyp:** Einstiegsbild
- **Didaktischer Zweck:** Tier einführen, bewusst im unauffälligen Zustand ("gestern noch völlig
  unauffällig") — der Kontrast zur akuten Befundlage entsteht im Text, nicht im Bild.
- **Tier:** Hund, Dackel (Rauhhaar oder Kurzhaar, nicht spezifiziert), ca. 6 Jahre
- **Position:** Normaler, unauffälliger Stand
- **Perspektive:** Lateral
- **Darzustellender Befund:** Keiner — bewusst unauffällig
- **Anatomische Vorgaben:** Rassetypisch langer Rücken, kurze Beine, aber normale Haltung
- **Marker:** Keiner
- **Nicht darstellen:** Keine Ataxie, keine Schwäche, keine Notfall-/Klinikszene
- **Fachliche Grundlage:** Kontextbild, keine Fachquelle erforderlich
- **Status:** DRAFT

### BILDBRIEF FILOU-02

- **Asset-ID:** FILOU-02
- **Fall:** Filou — plötzliche Hinterhand-Schwäche
- **Bildtyp:** Befundbild
- **Didaktischer Zweck:** Das im Fall genannte "Schleifen der Zehenspitzen" als konkret erkennbares,
  statisches Zeichen zeigen (Pfote wird nicht mehr korrekt aufgesetzt) — ein klassisches, lehrbares
  Warnzeichen für Studierende, ohne die volle Notfall-Dramatik zu inszenieren.
- **Tier:** Dackel, ca. 6 Jahre (wie FILOU-01)
- **Position:** Im Gehen erfasst, Moment des Aufsetzens einer Hinterpfote
- **Perspektive:** Nah, lateral, Fokus auf die Hinterpfote/den Zehenrücken
- **Darzustellender Befund:** Pfote wird mit dem Zehenrücken statt der Fußsohle aufgesetzt
  ("Knöcheln"/Schleifen der Zehenspitzen) — nur dieses eine Zeichen, keine weiteren Ausfälle
  hinzuerfinden
- **Anatomische Vorgaben:** Anatomisch korrekte Pfotenstellung im "geknöchelten" Zustand
- **Marker:** Keiner
- **Nicht darstellen:** Keine Klinikszene, kein OP-Kontext, kein Tierarzt im Bild, keine
  übertriebene Schmerz-/Leidensdarstellung (widerspricht §7: keine künstlich dramatischen
  Krankheitsszenarien)
- **Fachliche Grundlage:** Klinische Beschreibung direkt aus dem Fall (`beobachtung` in
  `seedContent.ts`)
- **Status:** DRAFT

### BILDBRIEF ANATOMIE-RUECKENMARK-01

- **Asset-ID:** ANATOMIE-RUECKENMARK-01
- **Fall:** Filou (verknüpftes Anatomie-Item: Rückenmark und Propriozeption)
- **Bildtyp:** Anatomiebild — **Sonderfall: eher schematisch/diagrammatisch als photorealistisch**
- **Didaktischer Zweck:** Den propriozeptiven Test (Pfote umdrehen, Beobachten der
  Rückstellzeit) als Funktionsprinzip erklären — hier steht die Funktion im Vordergrund, nicht die
  gross-anatomische Struktur, daher eignet sich ein einfaches Schema/eine Illustration besser als
  ein realistisches Foto.
- **Tier:** Hund, generisch, Hinterpfote + schematische Nervenbahn-Andeutung
- **Position:** Test-Sequenz: (1) Pfote wird umgedreht, (2) normale schnelle Rückstellung vs.
  (3) verzögerte/ausbleibende Rückstellung
- **Perspektive:** Nah an der Pfote, mit schematischer Andeutung des Signalwegs (nicht anatomisch
  exakter Nervenverlauf nötig, eher konzeptionelles Schema)
- **Darzustellender Befund:** Kein einzelner Fall-Befund — Darstellung des Testprinzips selbst
- **Anatomische Vorgaben:** Grundsätzlich korrekte Pfotenanatomie; beim Signalweg-Schema reicht eine
  vereinfachte, konzeptionelle Darstellung (kein Anspruch auf neuroanatomische Detailtreue)
- **Marker:** Beschriftung "normal" vs. "verzögert" erlaubt
- **Nicht darstellen:** Keine Verwechslung mit einer bestimmten Diagnose (Test-Prinzip ist
  unabhängig von der Ursache einer Beeinträchtigung)
- **Fachliche Grundlage:** Etabliertes neurologisches Grundlagenwissen zur Propriozeptionsprüfung
  — **NICHT VERIFIZIERT** (konkrete Fachquelle noch zu benennen)
- **Status:** DRAFT

---

## Zusammenfassung / nächste Schritte

| Fall | Einstieg | Befund | Anatomie | Bemerkung |
|---|---|---|---|---|
| Rocky | ✅ | — | ✅ Biceps | Befundbild bewusst weggelassen (dynamisch) |
| Nala | ✅ | — | ✅ Facettengelenke | Befundbild bewusst weggelassen (Verhalten/dynamisch) |
| Bruno | ✅ | ✅ | ✅ Quadriceps | Master-Prompt-Beispiel, 1:1 übernommen |
| Luna | ✅ | ✅ | ✅ Hüfte | |
| Findus | ✅ | ✅ | — | Kein Anatomie-Item verknüpft (diffuse Ursache) |
| Emma | ✅ | — | ✅ Iliopsoas | Befundbild bewusst weggelassen (dynamisch) |
| Bär | ✅ | ✅ | ✅ Discus | |
| Filou | ✅ | ✅ | ✅ Rückenmark (schematisch) | Neuro-Item eher Diagramm als Foto |

**20 Bildbriefe insgesamt** (8 Einstieg, 5 Befund, 7 Anatomie), 3 begründete "kein Bild"-Entscheidungen.

Nächste Schritte:

1. Vanessa prüft/ergänzt die als "NICHT VERIFIZIERT" markierten Quellenangaben (idealerweise mit
   Seitenzahl aus den genannten Thieme-Werken) — erst danach sollten die zugehörigen Bilder
   final produziert werden, insbesondere die Anatomiebilder.
2. Bildbriefe gehen an ChatGPT zur eigentlichen Bildgenerierung.
3. Fertige Bilder werden unter `public/cases/<asset-id>.<ext>` abgelegt und über
   `MediaAsset.storageUrl` (+ neue Verknüpfung zum jeweiligen `Case`/`AnatomyItem`) eingebunden —
   das Datenmodell dafür existiert bereits (`MediaAsset`, `MediaCaseLink`), es fehlt nur die
   Verknüpfung auf Anatomie-Item-Ebene, die ich ergänze, sobald die ersten echten Bilder vorliegen.
4. Jedes eingebundene Bild durchläuft vor Veröffentlichung die Qualitätsprüfung aus
   `docs/MASTER-PROMPT.md` §20 (fachlich/didaktisch/visuell) und erhält denselben
   Content-Status-Workflow (DRAFT → REVIEW → APPROVED) wie der zugehörige Fall.
