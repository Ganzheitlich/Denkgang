/**
 * Lerninhalt aus dem HTML-Prototyp (CASES, ANATOMY, MEDIALIBRARY), wortgetreu
 * uebernommen inklusive sourceStatus. Wird sowohl vom CLI-Seed-Skript
 * (prisma/seed.ts) als auch vom geschuetzten Admin-Endpunkt verwendet, der
 * gegen die Produktions-DB seedet (dort ist die Connection-String nur zur
 * Laufzeit der Netlify Function bekannt, nicht in dieser Sandbox).
 */
import type { PrismaClient } from "@/generated/prisma/client";

type HypothesisOption = {
  label: string;
  correct: boolean;
  errorCategory?: string;
  arguesAgainst?: string;
  differentiationDistractors?: string[];
};

type SimpleOption = {
  label: string;
  correct: boolean;
  errorCategory?: string;
};

type CaseSeed = {
  id: string;
  topic: string;
  species: string;
  title: string;
  learningObjective: string;
  anamnese: string;
  beobachtung: string;
  diagramLabel: string;
  palpation: string;
  hypothesisQ: string;
  hypothesisOptions: HypothesisOption[];
  expertNote: string;
  weakeningQ: string;
  weakeningOptions: SimpleOption[];
  retrievalQ: string;
  retrievalOptions: SimpleOption[];
  sourceStatus: string;
};

type AnatomySeed = {
  id: string;
  name: string;
  relatedCaseId: string;
  origin: string;
  insertion: string;
  funktion: string;
  innervation: string;
  clinicalRelevance: string;
  palpationHint: string;
  transferQ: string;
  transferOptions: SimpleOption[];
  sourceStatus: string;
};

type MediaSeed = {
  id: string;
  title: string;
  type: string;
  relatedCaseIds: string[];
  note: string;
};

const CASES: CaseSeed[] = [
  {
    id: "rocky",
    topic: "Orthopädie · Vordergliedmaße",
    species: "Hund, Labrador, 4 J.",
    title: "Rocky — unklares Hinken vorne rechts",
    learningObjective:
      "Bizepssehnen-Tendinopathie von häufigen Differentialdiagnosen der Vordergliedmaße abgrenzen können.",
    anamnese:
      "Rocky hinkt seit zwei Wochen intermittierend vorne rechts, stärker nach Belastung. Kein erinnerliches Trauma. Die Besitzerin bemerkt Zögern vor Treppen.",
    beobachtung:
      "Verkürzte Schrittlänge vorne rechts, dezentes Kopfnicken beim Auffußen links (kompensatorisch).",
    diagramLabel: "Belastungsschwerpunkt beim Auffußen: verlagert auf die linke Vordergliedmaße",
    palpation:
      "Schmerzreaktion bei Flexion und Extension der Schulter rechts. Deutliche Druckempfindlichkeit im Bereich der Bizepssehne.",
    hypothesisQ: "Welche Ursache ist am wahrscheinlichsten?",
    hypothesisOptions: [
      { label: "Bizepssehnen-Tendinopathie", correct: true },
      {
        label: "Ellenbogendysplasie",
        correct: false,
        errorCategory: "Differentialdiagnostik unvollständig",
        arguesAgainst:
          "Der Schmerz sitzt gezielt über der Bizepssehne, nicht diffus im Ellenbogengelenk selbst.",
        differentiationDistractors: [
          "Rocky ist vier Jahre alt — Ellenbogendysplasie tritt nur bei sehr jungen Hunden auf.",
          "Die Druckempfindlichkeit im betroffenen Bereich passt gut zu einer Gelenkerkrankung wie Ellenbogendysplasie.",
        ],
      },
      {
        label: "Karpitis",
        correct: false,
        errorCategory: "Befund übersehen",
        arguesAgainst:
          "Die Schmerzreaktion tritt bei Schulterbewegung auf, nicht bei Bewegung des Karpalgelenks.",
        differentiationDistractors: [
          "Karpitis kommt bei Hunden generell selten vor, daher ist sie unwahrscheinlich.",
          "Rocky zeigt Zögern vor Treppen, was gut zu Karpitis passt.",
        ],
      },
      {
        label: "Eingerissenes Nagelbett",
        correct: false,
        errorCategory: "vorschnelle Diagnose",
        arguesAgainst:
          "Ein Nagelbettproblem würde sich lokal an der Pfote zeigen, nicht bei Schulterflexion/-extension.",
        differentiationDistractors: [
          "Rocky hinkt seit zwei Wochen — das ist zu lange für ein Nagelbettproblem.",
          "Die Besitzerin hat kein Nagelbettproblem bemerkt, deshalb ist es unwahrscheinlich.",
        ],
      },
    ],
    expertNote:
      "Die Kombination aus Schmerz bei Schulterflexion/-extension und punktueller Druckempfindlichkeit genau über der Bizepssehne ist ein typisches Muster für eine Bizepssehnen-Tendinopathie — häufig bei aktiven, mittelalten Hunden nach wiederholter Überlastung statt nach einem singulären Trauma.",
    weakeningQ: "Welcher zusätzliche Befund würde diese Hypothese eher schwächen?",
    weakeningOptions: [
      {
        label: "Deutliche Schwellung und Krepitation direkt im Ellenbogengelenk",
        correct: true,
      },
      { label: "Schmerzreaktion bei Schulterflexion", correct: false, errorCategory: "Befund überbewertet" },
      { label: "Druckschmerz exakt über der Bizepssehne", correct: false, errorCategory: "Befund überbewertet" },
      { label: "Zögern vor dem Treppensteigen", correct: false, errorCategory: "Befund überbewertet" },
    ],
    retrievalQ: "Welcher Muskel entspringt am Tuberculum supraglenoidale der Scapula?",
    retrievalOptions: [
      { label: "M. biceps brachii", correct: true },
      { label: "M. triceps brachii", correct: false, errorCategory: "Anatomieverwechslung" },
      { label: "M. supraspinatus", correct: false, errorCategory: "Anatomieverwechslung" },
      { label: "M. deltoideus", correct: false, errorCategory: "Anatomieverwechslung" },
    ],
    sourceStatus:
      "Quellenkandidaten: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 12 (Schulterregion) und Kap. 13 (Ellenbogenregion); ergänzend Welter-Böller, Faszientherapie beim Hund (ISBN 978-3-13-245372-2), Thieme 2025, Kap. 6 (Überlastungsschäden am Tuberculum supraglenoidale). Status weiterhin DRAFT — genaue Seitenangaben und fachliche Freigabe stehen noch aus.",
  },
  {
    id: "nala",
    topic: "Verhalten × Schmerz · Wirbelsäule",
    species: "Mischling, 6 J.",
    title: "Nala — zunehmend gereizt beim Anleinen",
    learningObjective:
      "Erkennen, wann neu aufgetretenes Problemverhalten eher auf Schmerz als auf reines Trainingsdefizit hinweist.",
    anamnese:
      "Seit drei Monaten knurrt Nala beim Anlegen des Geschirrs, was vorher nie vorkam. Ein Trainer konnte das Verhalten nicht durch Übungen verändern.",
    beobachtung: "Nala vermeidet tiefes Bücken zum Napf und wirkt nach dem Aufstehen kurzzeitig steif.",
    diagramLabel: "Vermiedene Bewegung: tiefe Rückenbeugung beim Fressen und Aufstehen",
    palpation:
      "Schmerzreaktion bei Palpation des lumbosakralen Übergangs, spürbar verspannte Rückenmuskulatur in diesem Bereich.",
    hypothesisQ: "Was erklärt das Verhalten am plausibelsten?",
    hypothesisOptions: [
      { label: "Lumbosakraler Schmerz, z. B. beginnende Spondylose", correct: true },
      {
        label: "Reine Rangordnungs-/Dominanzproblematik",
        correct: false,
        errorCategory: "Faktenwissen",
        arguesAgainst:
          "Das Knurren tritt nur situativ beim Anlegen des Geschirrs auf, nicht generell gegenüber Menschen oder anderen Hunden.",
        differentiationDistractors: [
          "Nala ist bereits sechs Jahre alt — Rangordnungsprobleme entstehen meist nur bei jungen Hunden.",
          "Nala hat vorher nie geknurrt, das spricht für neu aufgetretenes Dominanzverhalten.",
        ],
      },
      {
        label: "Futtermittelunverträglichkeit",
        correct: false,
        errorCategory: "falsche Priorisierung",
        arguesAgainst:
          "Es gibt keine Verdauungssymptome, sondern gezielt eine Schmerzreaktion bei der Rückenpalpation.",
        differentiationDistractors: [
          "Futtermittelunverträglichkeiten sind bei Mischlingshunden generell selten.",
          "Nala vermeidet das Bücken zum Napf — das könnte auf ein Problem mit dem Futter hindeuten.",
        ],
      },
      {
        label: "Trennungsangst",
        correct: false,
        errorCategory: "Differentialdiagnostik unvollständig",
        arguesAgainst:
          "Trennungsangst würde sich beim Alleinsein zeigen, nicht spezifisch beim Anlegen des Geschirrs.",
        differentiationDistractors: [
          "Nala ist ein Mischling, und Trennungsangst kommt bei Mischlingen seltener vor.",
          "Das Knurren begann vor drei Monaten — das würde zu einer plötzlichen Trennungsangst passen.",
        ],
      },
    ],
    expertNote:
      "Ein neu aufgetretenes, situativ eng begrenztes Knurren (nur beim Anlegen, nicht generell aggressiv) plus Vermeidung von Rückenbeugung ist ein deutliches Warnsignal für eine körperliche statt rein verhaltensbedingte Ursache. Weitertrainieren ohne Abklärung kann hier sogar schaden, solange Schmerz die auslösende Größe bleibt.",
    weakeningQ: "Welcher Befund würde diese Hypothese eher schwächen?",
    weakeningOptions: [
      {
        label: "Schmerzfreies, uneingeschränktes Aufstehen und volle Rückenbeweglichkeit bei der Untersuchung",
        correct: true,
      },
      { label: "Schmerzreaktion bei Rückenpalpation", correct: false, errorCategory: "Befund überbewertet" },
      { label: "Vermeidung von Bücken beim Fressen", correct: false, errorCategory: "Befund überbewertet" },
      { label: "Steifheit nach dem Aufstehen", correct: false, errorCategory: "Befund überbewertet" },
    ],
    retrievalQ: "Welche Struktur wird im lumbosakralen Übergang als Schmerzquelle oft unterschätzt?",
    retrievalOptions: [
      {
        label: "Die Facettengelenke und die tiefe Rückenmuskulatur (z. B. M. multifidus)",
        correct: true,
      },
      { label: "Der M. gastrocnemius", correct: false, errorCategory: "Anatomieverwechslung" },
      { label: "Die Achillessehne", correct: false, errorCategory: "Anatomieverwechslung" },
      { label: "Der M. temporalis", correct: false, errorCategory: "Anatomieverwechslung" },
    ],
    sourceStatus:
      "Quellenkandidat: Hohmann, Bewegungsapparat Hund (ISBN 978-3-13-245265-7), Thieme 2025, Kap. 10 (Klinischer Bezug zu ideomotorischen Bewegungen) — beschreibt, wie Schmerz sich zunächst in vermiedenen Alltagsbewegungen zeigen kann statt in offensichtlicher Lahmheit. Status weiterhin DRAFT — Seitenangabe und fachliche Freigabe stehen noch aus.",
  },
  {
    id: "bruno",
    topic: "Rehabilitation · Knie postoperativ",
    species: "Border Collie, 3 J.",
    title: "Bruno — 6 Wochen nach TPLO-Operation",
    learningObjective:
      "Verstehen, warum äußerlich wirkende Fitness postoperativ nicht mit voller Belastbarkeit gleichzusetzen ist.",
    anamnese:
      "Bruno hatte vor sechs Wochen eine TPLO-Operation nach Kreuzbandriss. Er wirkt fit, die Besitzer fragen, ob er wieder frei rennen darf.",
    beobachtung:
      "Minimale Restlahmheit, sichtbar reduzierter Muskelumfang am operierten Oberschenkel im Seitenvergleich.",
    diagramLabel: "Muskelumfang operiertes Bein deutlich geringer als gegenüberliegende Seite",
    palpation:
      "Kniegelenk reizfrei, guter Bewegungsumfang, aber messbare Atrophie des M. quadriceps femoris.",
    hypothesisQ: "Was ist jetzt der richtige nächste Schritt?",
    hypothesisOptions: [
      {
        label: "Kontrollierter Belastungsaufbau mit gezieltem Muskelaufbau, noch keine freie Belastung",
        correct: true,
      },
      {
        label: "Sofort wieder normales Training und freies Rennen erlauben",
        correct: false,
        errorCategory: "vorschnelle Diagnose",
        arguesAgainst:
          "Die sichtbare Muskelatrophie zeigt, dass die bisherige Belastung noch nicht ausreichte, um den Muskel vollständig wiederaufzubauen.",
        differentiationDistractors: [
          "Bruno ist erst drei Jahre alt — junge Hunde heilen grundsätzlich schneller.",
          "Das Kniegelenk ist bereits reizfrei, das spricht dafür, dass volle Belastung schon möglich ist.",
        ],
      },
      {
        label: "Weitere sechs Wochen komplette Ruhigstellung",
        correct: false,
        errorCategory: "falsche Priorisierung",
        arguesAgainst:
          "Das Kniegelenk ist bereits reizfrei mit gutem Bewegungsumfang — vollständige Ruhigstellung würde den nötigen Muskelaufbau zusätzlich verzögern.",
        differentiationDistractors: [
          "Sechs Wochen nach der OP ist ohnehin noch zu früh für jede Form von Belastung.",
          "TPLO-Operationen benötigen grundsätzlich eine lange Ruhephase, daher ist Ruhigstellung immer richtig.",
        ],
      },
      {
        label: "Kein weiteres Training nötig, da er bereits fit wirkt",
        correct: false,
        errorCategory: "Befund übersehen",
        arguesAgainst:
          "Ein äußerlich fitter Eindruck sagt nichts über die tatsächliche muskuläre Belastbarkeit des operierten Beins aus.",
        differentiationDistractors: [
          "Bruno zeigt nur eine minimale Restlahmheit, das reicht als Zeichen vollständiger Heilung.",
          "Die Besitzer berichten, dass er wieder rennen will — das zeigt, dass er bereit ist.",
        ],
      },
    ],
    expertNote:
      "Sichtbare Fitness täuscht: Die Muskelatrophie zeigt, dass der Bewegungsapparat die volle Belastung noch nicht trägt. Der Rehabilitationszeitraum nach TPLO wird in der Praxis häufig mit etwa 12–16 Wochen angegeben — freies Rennen zu früh zuzulassen, gefährdet den Heilungserfolg trotz unauffälligem Gelenkbefund.",
    weakeningQ: "Welcher Befund würde eher dafürsprechen, dass Bruno schon voll belastbar ist?",
    weakeningOptions: [
      { label: "Symmetrischer Muskelumfang beider Oberschenkel ohne Restlahmheit", correct: true },
      { label: "Reduzierter Muskelumfang am operierten Bein", correct: false, errorCategory: "Befund überbewertet" },
      { label: "Reizfreies Kniegelenk bei der Untersuchung", correct: false, errorCategory: "Befund überbewertet" },
      { label: "Der Hund wirkt im Alltag fit", correct: false, errorCategory: "Befund überbewertet" },
    ],
    retrievalQ: "Wie lang wird der Rehabilitationszeitraum nach einer TPLO in der Praxis häufig angegeben?",
    retrievalOptions: [
      { label: "Etwa 12–16 Wochen", correct: true },
      { label: "Etwa 2 Wochen", correct: false, errorCategory: "Faktenwissen" },
      { label: "Etwa 1 Jahr", correct: false, errorCategory: "Faktenwissen" },
      {
        label: "Eine feste Zeitspanne gibt es nicht, Belastung ist immer sofort möglich",
        correct: false,
        errorCategory: "Faktenwissen",
      },
    ],
    sourceStatus:
      "Quellenkandidat: Mai, Physiotherapie und Bewegungstraining für Hunde (ISBN 978-3-13-240099-3), Thieme 2022, Kap. 5.2.1 (Postoperative Rehabilitation) — beschreibt einen gestaffelten Belastungsaufbau. Achtung: Der hier genannte Zeitraum von 12–16 Wochen ist noch NICHT anhand einer konkreten Seite verifiziert und muss gegengeprüft werden. Status weiterhin DRAFT.",
  },
  {
    id: "luna",
    topic: "Orthopädie · Hüfte (Wachstumsalter)",
    species: "Deutsche Dogge, 8 Monate",
    title: "Luna — auffälliges Gangbild bei einer jungen Dogge",
    learningObjective:
      "Hüftdysplasie von anderen häufigen Ursachen für Hintergliedmaßen-Probleme bei jungen, großwüchsigen Hunden abgrenzen können.",
    anamnese:
      'Luna ist 8 Monate alt und großwüchsig. Die Besitzer berichten ein "Hasenhopser"-Gangbild beim schnellen Laufen und Mühe beim Aufstehen nach Ruhephasen. Sie wirkt dabei nicht offensichtlich schmerzhaft.',
    beobachtung:
      "Beidseitig synchrones Vorwärtsspringen der Hintergliedmaßen beim schnellen Laufen statt alternierendem Gang, insgesamt eher schmächtige Hinterhandmuskulatur für Rasse und Alter.",
    diagramLabel:
      "Bewegungsmuster: beide Hintergliedmaßen springen beim schnellen Laufen synchron statt alternierend",
    palpation:
      "Schmerzreaktion bei Abduktion und Außenrotation beider Hüftgelenke, spürbare Laxität im Ortolani-Test, verminderter Bewegungsumfang beidseits.",
    hypothesisQ: "Welche Ursache ist am wahrscheinlichsten?",
    hypothesisOptions: [
      { label: "Hüftdysplasie", correct: true },
      {
        label: "Panostitis (wandernde Junghundelahmheit)",
        correct: false,
        errorCategory: "Differentialdiagnostik unvollständig",
        arguesAgainst:
          "Panostitis zeigt typischerweise wechselnde (wandernde) Lahmheit einzelner Gliedmaßen, hier liegt aber ein beidseitig symmetrisches Muster mit positivem Laxitätstest vor.",
        differentiationDistractors: [
          "Panostitis kommt nur bei kleinen Hunderassen vor, eine Dogge wäre untypisch.",
          "Luna ist erst acht Monate alt, das passt gut zum typischen Alter für Panostitis.",
        ],
      },
      {
        label: "Kreuzbandriss",
        correct: false,
        errorCategory: "Anatomieverwechslung",
        arguesAgainst: "Der Befund liegt im Hüftgelenk (positiver Ortolani-Test), nicht im Kniegelenk.",
        differentiationDistractors: [
          "Kreuzbandrisse treten bei jungen Hunden praktisch nie auf.",
          "Das auffällige Gangbild beim schnellen Laufen passt gut zu einem Kreuzbandriss.",
        ],
      },
      {
        label: "Patellaluxation",
        correct: false,
        errorCategory: "Anatomieverwechslung",
        arguesAgainst: "Patellaluxation betrifft das Kniegelenk — hier zeigt sich die Auffälligkeit gezielt in der Hüfte.",
        differentiationDistractors: [
          "Patellaluxation ist bei Doggen extrem selten, daher unwahrscheinlich.",
          "Das Hoppel-Gangbild passt gut zu einer Patellaluxation.",
        ],
      },
    ],
    expertNote:
      'Ein beidseitig synchrones "Hasenhopser"-Gangbild in Kombination mit positivem Laxitätszeichen (Ortolani) und Schmerz bei Hüftabduktion ist ein typisches Muster für Hüftdysplasie bei wachsenden großwüchsigen Rassen — eine der häufigsten orthopädischen Wachstumserkrankungen in dieser Gruppe.',
    weakeningQ: "Welcher Befund würde diese Hypothese eher schwächen?",
    weakeningOptions: [
      { label: "Negatives Ortolani-Zeichen und schmerzfreie, volle Hüftbeweglichkeit beidseits", correct: true },
      { label: "Bunny-hopping-Gangbild beim schnellen Laufen", correct: false, errorCategory: "Befund überbewertet" },
      { label: "Schmerzreaktion bei Hüftabduktion", correct: false, errorCategory: "Befund überbewertet" },
      { label: "Junges Alter einer großwüchsigen Rasse", correct: false, errorCategory: "Befund überbewertet" },
    ],
    retrievalQ: "Welche Untersuchungstechnik prüft gezielt die Gelenklaxität der Hüfte?",
    retrievalOptions: [
      { label: "Der Ortolani-Test", correct: true },
      { label: "Der Schubladentest", correct: false, errorCategory: "Anatomieverwechslung" },
      { label: "Der Tibiakompressionstest", correct: false, errorCategory: "Anatomieverwechslung" },
      { label: "Der Sitz-Test", correct: false, errorCategory: "Faktenwissen" },
    ],
    sourceStatus:
      "Quellenkandidat: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 7 (Hüftregion, inkl. Kollodiaphysenwinkel und PennHIP-Verfahren als Diagnostikhinweis auf Hüftdysplasie). Achtung: Der im Fall verwendete Ortolani-Test ist ein etabliertes Standardverfahren, aber noch nicht direkt an dieser Quelle verifiziert. Status weiterhin DRAFT.",
  },
  {
    id: "findus",
    topic: "Ernährung × Bewegungsapparat",
    species: "Mischling, 7 J., übergewichtig",
    title: "Findus — schleichende Bewegungsunlust",
    learningObjective:
      "Erkennen, wann Beschwerden am Bewegungsapparat primär durch Gewichts-/Ernährungsfaktoren mitverursacht werden, statt vorschnell rein orthopädisch oder neurologisch zu denken.",
    anamnese:
      'Findus ist seit Monaten zunehmend unlustig bei Spaziergängen und vermeidet Sprünge aufs Sofa. Die Besitzer dachten zunächst "er wird eben älter". Er hat im letzten Jahr rund 4 kg zugenommen, viele Extra-Leckerlis, keine Futterumstellung seit Jahren.',
    beobachtung: "Deutliches Übergewicht, steifer Gang besonders nach Ruhephasen, vorsichtiges Ablegen und Aufstehen.",
    diagramLabel: "Erhöhtes Körpergewicht erhöht die mechanische Belastung von Wirbelsäule und großen Gelenken",
    palpation:
      "Diffuse Schmerzreaktion bei Rückenpalpation ohne punktuelle Struktur, Gelenke ohne akute Entzündungszeichen, aber generalisiert reduzierte Beweglichkeit.",
    hypothesisQ: "Was ist die wahrscheinlichste Hauptursache für Findus' Beschwerden?",
    hypothesisOptions: [
      { label: "Belastungsbedingte Gelenk-/Rückenbeschwerden, verstärkt durch Übergewicht", correct: true },
      {
        label: "Reine altersbedingte Abnutzung, unabhängig vom Gewicht",
        correct: false,
        errorCategory: "Befund übersehen",
        arguesAgainst:
          "Die deutliche Gewichtszunahme über Monate ist ein relevanter, veränderbarer Faktor, der nicht ignoriert werden sollte.",
        differentiationDistractors: [
          "Findus ist erst sieben Jahre alt — das ist noch kein hohes Alter für Abnutzungserscheinungen.",
          "Der steife Gang nach Ruhephasen ist ein klassisches Alterszeichen.",
        ],
      },
      {
        label: "Akuter Bandscheibenvorfall mit Lähmungserscheinungen",
        correct: false,
        errorCategory: "vorschnelle Diagnose",
        arguesAgainst:
          "Es gibt keine neurologischen Ausfälle, sondern eine diffuse, schleichend zunehmende Schmerzhaftigkeit.",
        differentiationDistractors: [
          "Bandscheibenvorfälle kommen bei Mischlingshunden selten vor.",
          "Die Schmerzreaktion bei der Rückenpalpation passt gut zu einem Bandscheibenvorfall.",
        ],
      },
      {
        label: "Reine Verhaltensänderung ohne körperliche Ursache",
        correct: false,
        errorCategory: "Differentialdiagnostik unvollständig",
        arguesAgainst:
          "Es liegt ein klarer körperlicher Befund vor (Schmerzreaktion bei Rückenpalpation), keine rein psychische Verhaltensänderung.",
        differentiationDistractors: [
          "Findus wirkt insgesamt nur etwas unlustig, das klingt eher nach einer Stimmungssache.",
          "Die Besitzer dachten zunächst auch, er werde einfach älter — das deutet auf eine schleichende Verhaltensänderung hin.",
        ],
      },
    ],
    expertNote:
      "Diffuse, nicht punktuelle Schmerzreaktionen zusammen mit deutlichem Übergewicht und einer klaren Gewichtszunahme über Monate sprechen für belastungsbedingte Beschwerden, die durch das Körpergewicht verstärkt werden — eine häufige, aber oft übersehene Ursache für schleichende Bewegungsunlust. Eine Kombination aus Gewichtsmanagement und gezieltem Bewegungsaufbau ist hier meist wirksamer als rein symptomatische Behandlung.",
    weakeningQ: "Welcher Befund würde diese Hypothese eher schwächen?",
    weakeningOptions: [
      {
        label:
          "Plötzlich aufgetretene, hochgradige Schmerzhaftigkeit mit neurologischen Ausfällen (z. B. Schwäche der Hintergliedmaßen)",
        correct: true,
      },
      { label: "Steifer Gang nach Ruhephasen", correct: false, errorCategory: "Befund überbewertet" },
      { label: "Deutliches Übergewicht", correct: false, errorCategory: "Befund überbewertet" },
      { label: "Vorsichtiges Aufstehen", correct: false, errorCategory: "Befund überbewertet" },
    ],
    retrievalQ: "Welchen Effekt hat Übergewicht am unmittelbarsten auf den Bewegungsapparat?",
    retrievalOptions: [
      { label: "Erhöhte mechanische Belastung von Gelenken und Wirbelsäule", correct: true },
      { label: "Keinen direkten Effekt auf Gelenke", correct: false, errorCategory: "Faktenwissen" },
      {
        label: "Nur Auswirkung auf das Herz-Kreislauf-System, nicht auf Gelenke",
        correct: false,
        errorCategory: "Faktenwissen",
      },
      { label: "Ausschließlich kosmetische Bedeutung", correct: false, errorCategory: "Faktenwissen" },
    ],
    sourceStatus:
      "Quellenkandidat: Zentek, Ernährung des Hundes (ISBN 978-3-132-46109-3), Thieme 2026, Kap. 2.4 (Körperzusammensetzung/Adipositas) und Kap. 7 (Fütterungsbedingte Erkrankungen, betrifft laut Quelle u. a. den Bewegungsapparat). Status weiterhin DRAFT — Seitenangabe und fachliche Freigabe stehen noch aus.",
  },
  {
    id: "emma",
    topic: "Weichteilgewebe · Hüfte/Iliopsoas",
    species: "Border Collie, 5 J., Agility-Hund",
    title: "Emma — Zurückhaltung bei engen Wendungen",
    learningObjective:
      "Weichteilverletzungen (z. B. M. iliopsoas) von Gelenkpathologien der Hüfte anhand des Palpationsbefunds unterscheiden können.",
    anamnese:
      "Nach einem intensiven Agility-Turnier zeigt Emma seit einer Woche Zurückhaltung bei engen Wendungen und beim Absprung über Hindernisse. Das übrige Bewegungsbild wirkt unauffällig.",
    beobachtung: "Verkürzter Schritt der Hintergliedmaße beim Wenden, vermeidet vollständige Hüftstreckung beim Absprung.",
    diagramLabel: "Eingeschränkte Hüftstreckung beim Absprung, besonders bei engen Wendungen",
    palpation:
      "Schmerzreaktion bei Palpation des M. iliopsoas, Hüftgelenk selbst zeigt vollen, schmerzfreien Bewegungsumfang bei passiver Flexion/Extension.",
    hypothesisQ: "Welche Ursache ist am wahrscheinlichsten?",
    hypothesisOptions: [
      { label: "Iliopsoas-Zerrung (Weichteilverletzung)", correct: true },
      {
        label: "Hüftdysplasie",
        correct: false,
        errorCategory: "Anatomieverwechslung",
        arguesAgainst:
          "Das Hüftgelenk selbst zeigt bei der passiven Untersuchung vollen, schmerzfreien Bewegungsumfang — bei Hüftdysplasie wäre hier meist eine Einschränkung oder Schmerzreaktion zu erwarten.",
        differentiationDistractors: [
          "Emma ist erst fünf Jahre alt — Hüftdysplasie tritt nur bei sehr jungen oder sehr alten Hunden auf.",
          "Die eingeschränkte Hüftstreckung beim Absprung passt gut zu einer Hüftdysplasie.",
        ],
      },
      {
        label: "Kreuzbandriss",
        correct: false,
        errorCategory: "Differentialdiagnostik unvollständig",
        arguesAgainst: "Der Befund betrifft die Hüftregion, nicht das Kniegelenk.",
        differentiationDistractors: [
          "Kreuzbandrisse treten bei Agility-Hunden nur selten auf.",
          "Die Schmerzreaktion nach intensivem Training passt gut zu einem Kreuzbandriss.",
        ],
      },
      {
        label: "Einfache Trainingsmüdigkeit, keine Verletzung",
        correct: false,
        errorCategory: "Befund übersehen",
        arguesAgainst:
          "Eine gezielte, reproduzierbare Schmerzreaktion bei Palpation spricht gegen eine reine Ermüdung ohne strukturelle Ursache.",
        differentiationDistractors: [
          "Emma war erst kürzlich bei einem intensiven Turnier, das erklärt einfache Ermüdung ausreichend.",
          "Nach ein paar Tagen Pause dürfte sich Ermüdung von selbst bessern.",
        ],
      },
    ],
    expertNote:
      "Ein schmerzfreier, voller Bewegungsumfang bei der passiven Hüftgelenksprüfung zusammen mit gezielter Schmerzreaktion über dem M. iliopsoas spricht für eine Weichteilverletzung des Muskels statt eine Gelenkpathologie. Iliopsoas-Zerrungen sind bei sportlich aktiven Hunden nach intensiver Belastung (z. B. Agility) eine häufige, aber leicht übersehene Ursache für Einschränkungen bei engen Wendungen und Absprüngen.",
    weakeningQ: "Welcher Befund würde diese Hypothese eher schwächen?",
    weakeningOptions: [
      {
        label: "Deutlich eingeschränkter, schmerzhafter Bewegungsumfang bereits bei der passiven Hüftgelenksprüfung selbst",
        correct: true,
      },
      { label: "Schmerzreaktion bei Palpation des M. iliopsoas", correct: false, errorCategory: "Befund überbewertet" },
      {
        label: "Vermeidung vollständiger Hüftstreckung beim Absprung",
        correct: false,
        errorCategory: "Befund überbewertet",
      },
      { label: "Kürzlich intensives Agility-Training", correct: false, errorCategory: "Befund überbewertet" },
    ],
    retrievalQ: "Welche Hauptfunktion hat der M. iliopsoas?",
    retrievalOptions: [
      { label: "Flexion der Hüfte", correct: true },
      { label: "Extension der Hüfte", correct: false, errorCategory: "Anatomieverwechslung" },
      { label: "Abduktion der Hintergliedmaße", correct: false, errorCategory: "Anatomieverwechslung" },
      { label: "Flexion des Kniegelenks", correct: false, errorCategory: "Anatomieverwechslung" },
    ],
    sourceStatus:
      "Quellenkandidaten: Könneker, Osteopathie in der Kleintierpraxis (ISBN 978-3-8304-9174-3), Thieme 2010, Kap. 7 (Palpation des M. iliopsoas); ergänzend Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 7 (Hüftregion — Iliopsoas als reflektorisch häufig verspannter Muskel bei Hüftproblemen genannt). Status weiterhin DRAFT — Seitenangaben und fachliche Freigabe stehen noch aus.",
  },
  {
    id: "baer",
    topic: "Geriatrie · Wirbelsäule",
    species: "Deutscher Schäferhund, 9 J., normalgewichtig",
    title: "Bär — zunehmende Morgensteifheit",
    learningObjective:
      "Altersbedingte degenerative Wirbelsäulenveränderungen von akuten oder gewichtsbedingten Ursachen anhand des zeitlichen Verlaufs unterscheiden können.",
    anamnese:
      "Bär ist normalgewichtig und zeigt seit etwa einem Jahr langsam zunehmende Steifheit, vor allem morgens. Im Laufe des Tages bessert sich das Bild leicht.",
    beobachtung:
      "Steifer, kurzschrittiger Gang beim Aufstehen, der sich nach einigen Minuten Bewegung bessert. Keine akute Schonhaltung erkennbar.",
    diagramLabel: "Steifer, kurzschrittiger Gang beim Aufstehen, Besserung im Tagesverlauf",
    palpation:
      "Diffuse Schmerzreaktion entlang der gesamten Wirbelsäule bei Druck, keine punktuelle Struktur, verminderter Bewegungsumfang bei Rumpfrotation.",
    hypothesisQ: "Welche Ursache ist am wahrscheinlichsten?",
    hypothesisOptions: [
      { label: "Spondylose / degenerative Arthrose der Wirbelsäule (altersbedingt)", correct: true },
      {
        label: "Akuter Bandscheibenvorfall",
        correct: false,
        errorCategory: "vorschnelle Diagnose",
        arguesAgainst:
          "Der langsame, über ein Jahr zunehmende Verlauf ohne akute Verschlechterung spricht gegen einen akuten Bandscheibenvorfall.",
        differentiationDistractors: [
          "Bär ist neun Jahre alt — in diesem Alter treten Bandscheibenvorfälle nicht mehr auf.",
          "Die Schmerzreaktion bei Wirbelsäulenpalpation passt gut zu einem Bandscheibenvorfall.",
        ],
      },
      {
        label: "Übergewichtsbedingte Gelenkbelastung",
        correct: false,
        errorCategory: "Befund übersehen",
        arguesAgainst:
          "Bär ist normalgewichtig — hier fehlt der Risikofaktor, der bei übergewichtsbedingten Beschwerden ursächlich wäre.",
        differentiationDistractors: [
          "Steifer Gang nach Ruhephasen passt gut zu gewichtsbedingter Gelenkbelastung.",
          "Ältere Hunde neigen grundsätzlich zu Übergewicht, das erklärt die Symptome ausreichend.",
        ],
      },
      {
        label: "Muskelzerrung nach Überlastung",
        correct: false,
        errorCategory: "Differentialdiagnostik unvollständig",
        arguesAgainst:
          "Eine Zerrung würde sich lokal und akut zeigen, nicht als über ein Jahr langsam zunehmende, diffuse Steifheit.",
        differentiationDistractors: [
          "Bär ist ein großer, aktiver Hund — Muskelzerrungen kommen bei dieser Rasse häufig vor.",
          "Die Besserung im Tagesverlauf passt gut zu einer muskulären Verspannung.",
        ],
      },
    ],
    expertNote:
      "Ein langsam über Monate bis Jahre zunehmender, morgens betonter und sich im Tagesverlauf bessernder diffuser Wirbelsäulenschmerz bei einem älteren, normalgewichtigen Hund ist ein typisches Muster für degenerative Veränderungen wie Spondylose. Im Unterschied zu akuten oder gewichtsbedingten Ursachen ist hier der langsame, chronische Verlauf das entscheidende Unterscheidungsmerkmal — anders als bei Findus, wo das Gewicht die treibende Kraft war, ist hier tatsächlich der reine Alterungsprozess führend.",
    weakeningQ: "Welcher Befund würde diese Hypothese eher schwächen?",
    weakeningOptions: [
      {
        label: "Plötzlich aufgetretene, hochgradige Schmerzhaftigkeit mit akuter Verschlechterung innerhalb weniger Stunden",
        correct: true,
      },
      { label: "Steifheit, die vor allem morgens auftritt", correct: false, errorCategory: "Befund überbewertet" },
      { label: "Diffuse Schmerzreaktion entlang der Wirbelsäule", correct: false, errorCategory: "Befund überbewertet" },
      { label: "Verminderter Bewegungsumfang bei Rumpfrotation", correct: false, errorCategory: "Befund überbewertet" },
    ],
    retrievalQ: "Welche Aussage zu Spondylose beim Hund trifft am ehesten zu?",
    retrievalOptions: [
      {
        label: "Es handelt sich um eine meist langsam fortschreitende, degenerative Veränderung der Wirbelsäule, häufig bei älteren Hunden.",
        correct: true,
      },
      { label: "Sie tritt ausschließlich bei jungen, wachsenden Hunden auf.", correct: false, errorCategory: "Faktenwissen" },
      { label: "Sie ist immer die Folge eines akuten Traumas.", correct: false, errorCategory: "Faktenwissen" },
      { label: "Sie verursacht immer eine vollständige Lähmung.", correct: false, errorCategory: "Faktenwissen" },
    ],
    sourceStatus:
      "Fachliche Grundlage: etabliertes Wissen zu degenerativen Wirbelsäulenveränderungen (Spondylose) bei älteren Hunden. Konkrete Quellenverifizierung steht noch aus — Status: DRAFT, Quelle erforderlich.",
  },
  {
    id: "filou",
    topic: "Neurologie · Notfall-Erkennung",
    species: "Dackel, 6 J.",
    title: "Filou — plötzliche Hinterhand-Schwäche",
    learningObjective:
      "Akute neurologische Alarmsignale erkennen, bei denen sofortige tierärztliche Abklärung Vorrang vor physiotherapeutischer Behandlung hat.",
    anamnese:
      "Filou zeigte heute Morgen plötzlich eine deutliche Schwäche der Hinterhand und zieht die Hinterpfoten beim Laufen leicht nach. Gestern war er noch völlig unauffällig.",
    beobachtung: "Deutliche Ataxie der Hintergliedmaßen, unsicherer, wackeliger Gang, teilweise Schleifen der Zehenspitzen.",
    diagramLabel: "Deutliche Ataxie und unsicherer Gang der Hintergliedmaßen, akuter Beginn innerhalb eines Tages",
    palpation:
      "Schmerzreaktion bei Palpation der mittleren Brust-/Lendenwirbelsäule, deutlich reduzierte Eigenwahrnehmung an den Hintergliedmaßen.",
    hypothesisQ: "Was ist jetzt das richtige Vorgehen bzw. die wahrscheinlichste Ursache?",
    hypothesisOptions: [
      {
        label:
          "Akuter Bandscheibenvorfall (IVDD) — sofortige tierärztliche/neurologische Abklärung nötig, keine Physiotherapie als Erstmaßnahme",
        correct: true,
      },
      {
        label: "Muskelkater nach ungewohnter Belastung",
        correct: false,
        errorCategory: "Befund übersehen",
        arguesAgainst:
          "Eine plötzliche, hochgradige Ataxie mit reduzierter Eigenwahrnehmung ist durch reinen Muskelkater nicht erklärbar.",
        differentiationDistractors: [
          "Filou ist noch nicht alt — Muskelkater ist bei jüngeren Hunden wahrscheinlicher.",
          "Er zieht die Pfoten nur leicht nach, das passt zu einer harmlosen muskulären Ermüdung.",
        ],
      },
      {
        label: "Normale physiotherapeutische Mobilisation sofort beginnen",
        correct: false,
        errorCategory: "vorschnelle Diagnose",
        arguesAgainst:
          "Bei akuten neurologischen Ausfällen ist zuerst eine sofortige tierärztliche Abklärung nötig — falsches Vorgehen kann hier schaden, bevor die Ursache geklärt ist.",
        differentiationDistractors: [
          "Sanfte Bewegungsübungen helfen bei jeder Form von Steifheit.",
          "Da keine akute Verletzung erinnerlich ist, ist eine sofortige Abklärung nicht dringend.",
        ],
      },
      {
        label: "Abwarten und den Verlauf über die nächsten Tage beobachten",
        correct: false,
        errorCategory: "falsche Priorisierung",
        arguesAgainst:
          "Ein akuter, hochgradiger neurologischer Ausfall ist ein Notfall — Abwarten kann zu bleibenden Schäden führen, je länger eine mögliche Kompression besteht.",
        differentiationDistractors: [
          "Dackel neigen grundsätzlich zu vorübergehenden Rückenproblemen, die von selbst abklingen.",
          "Da er noch laufen kann, ist es kein Notfall.",
        ],
      },
    ],
    expertNote:
      "Ein plötzlich aufgetretener, deutlicher neurologischer Ausfall (Ataxie, reduzierte Eigenwahrnehmung) bei einer bandscheibengefährdeten Rasse wie dem Dackel ist ein klassisches Alarmsignal für einen akuten Bandscheibenvorfall. Das ist ein Fall für die sofortige tierärztliche/neurologische Notfallabklärung — Physiotherapie ist hier nicht der erste Schritt, sondern kommt erst nach fachtierärztlicher Diagnostik (und ggf. Operation) als Teil der Rehabilitation zum Einsatz. Zu erkennen, wann man NICHT behandelt, sondern sofort weiterverweist, ist eine der wichtigsten Kompetenzen in der Tierphysiotherapie überhaupt.",
    weakeningQ:
      "Welcher Befund würde eher für ein weniger dringliches Vorgehen sprechen (also gegen einen akuten Notfall)?",
    weakeningOptions: [
      {
        label: "Ein langsam über Wochen sich entwickelndes, mildes Ungeschicklichkeitsbild ohne Schmerzreaktion",
        correct: true,
      },
      { label: "Plötzlicher Beginn innerhalb eines Tages", correct: false, errorCategory: "Befund überbewertet" },
      { label: "Deutliche Ataxie der Hintergliedmaßen", correct: false, errorCategory: "Befund überbewertet" },
      { label: "Schmerzreaktion bei Wirbelsäulenpalpation", correct: false, errorCategory: "Befund überbewertet" },
    ],
    retrievalQ: "Welche Hunderasse gilt als besonders prädisponiert für bandscheibenbedingte Erkrankungen (IVDD)?",
    retrievalOptions: [
      { label: "Dackel", correct: true },
      { label: "Windhund", correct: false, errorCategory: "Faktenwissen" },
      { label: "Border Collie", correct: false, errorCategory: "Faktenwissen" },
      { label: "Australian Shepherd", correct: false, errorCategory: "Faktenwissen" },
    ],
    sourceStatus:
      "Fachliche Grundlage: etabliertes Wissen zu bandscheibenbedingten Erkrankungen (IVDD) bei chondrodystrophen Rassen wie dem Dackel, inkl. der Notwendigkeit sofortiger tierärztlicher Abklärung bei akuten neurologischen Ausfällen. Konkrete Quellenverifizierung steht noch aus — Status: DRAFT, Quelle erforderlich.",
  },
];

const ANATOMY: AnatomySeed[] = [
  {
    id: "biceps",
    name: "M. biceps brachii",
    relatedCaseId: "rocky",
    origin: "Tuberculum supraglenoidale der Scapula",
    insertion: "Tuberositas radii, über eine Ansatzschleife auch an der proximalen Ulna",
    funktion: "Flexion des Ellenbogengelenks, Extension des Schultergelenks",
    innervation: "N. musculocutaneus",
    clinicalRelevance:
      "Häufiger Sitz von Tendinopathien bei aktiven Hunden, insbesondere nach wiederholter Überlastung der Schulter.",
    palpationHint: "Verlauf entlang der kranialen Schulter, Druckschmerz oft nahe dem Ursprung auslösbar.",
    transferQ: "Welche Bewegung würde bei einer Bizepssehnen-Tendinopathie am ehesten Schmerzen auslösen?",
    transferOptions: [
      { label: "Kombinierte Flexion des Ellenbogens mit Extension der Schulter", correct: true },
      { label: "Nur Extension des Ellenbogens, unabhängig von der Schulter", correct: false },
      { label: "Flexion der Schulter bei gleichzeitiger Extension des Ellenbogens", correct: false },
      { label: "Ausschließlich Bewegung im Karpalgelenk, unabhängig von Ellenbogen und Schulter", correct: false },
    ],
    sourceStatus:
      "Quellenkandidat: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 12 (Schulterregion). Status weiterhin DRAFT — Seitenangabe und fachliche Freigabe stehen noch aus.",
  },
  {
    id: "iliopsoas",
    name: "M. iliopsoas",
    relatedCaseId: "emma",
    origin: "Wirbelkörper der letzten Brust-/Lendenwirbel (M. psoas major) und Facies iliaca des Os ilium (M. iliacus)",
    insertion: "Trochanter minor des Femur",
    funktion: "Flexion und Außenrotation des Hüftgelenks",
    innervation: "Äste des Plexus lumbalis",
    clinicalRelevance:
      "Klassische Überlastungsverletzung bei sportlich aktiven Hunden, wird häufig mit einer Hüftgelenkpathologie verwechselt.",
    palpationHint: "Ventral der Hüfte tastbar; Schmerzreaktion typischerweise bei Palpation, nicht bei passiver Gelenkbewegung.",
    transferQ: "Welcher Befund spricht eher für eine Muskelverletzung als für eine Gelenkpathologie der Hüfte?",
    transferOptions: [
      { label: "Schmerzfreie, volle passive Beweglichkeit des Hüftgelenks bei gleichzeitigem Muskel-Druckschmerz", correct: true },
      { label: "Schmerzhafte passive Beweglichkeit in alle Richtungen", correct: false },
      { label: "Positives Ortolani-Zeichen", correct: false },
      { label: "Krepitation im Gelenk", correct: false },
    ],
    sourceStatus:
      "Quellenkandidat: Könneker, Osteopathie in der Kleintierpraxis (ISBN 978-3-8304-9174-3), Thieme 2010, Kap. 7. Status weiterhin DRAFT — Seitenangabe und fachliche Freigabe stehen noch aus.",
  },
  {
    id: "quadriceps",
    name: "M. quadriceps femoris",
    relatedCaseId: "bruno",
    origin: "Vier Köpfe: u. a. Os ilium (M. rectus femoris) und Femur (Vasti)",
    insertion: "Über Patella und Ligamentum patellae an der Tuberositas tibiae",
    funktion: "Extension des Kniegelenks; zentraler Stabilisator nach Kreuzbandverletzungen/TPLO",
    innervation: "N. femoralis",
    clinicalRelevance:
      "Zentrale Zielstruktur im Rehabilitationstraining nach Kniegelenkseingriffen — Atrophie ist ein Frühzeichen unzureichender Belastung.",
    palpationHint: "Seitenvergleich des Muskelumfangs am Oberschenkel ist ein einfacher klinischer Indikator für den Rehabilitationsfortschritt.",
    transferQ:
      'Warum ist reduzierter Muskelumfang am Oberschenkel nach einer Knie-OP klinisch relevant, auch wenn der Hund "fit" wirkt?',
    transferOptions: [
      {
        label: "Er zeigt, dass die Belastung des operierten Beins im Alltag noch nicht ausreicht, um den Muskel vollständig aufzubauen",
        correct: true,
      },
      { label: "Er ist ohne klinische Bedeutung, solange keine Schmerzen bestehen", correct: false },
      { label: "Er deutet immer auf einen erneuten Kreuzbandriss hin", correct: false },
      { label: "Er hat nur kosmetische Bedeutung", correct: false },
    ],
    sourceStatus:
      "Quellenkandidat: Hohmann, Bewegungsapparat Hund (ISBN 978-3-13-245265-7), Thieme 2025, Kap. 9 (Muskeln in Bewegung) behandelt die Muskulatur systematisch; genaue Seite für M. quadriceps femoris noch zu identifizieren. Status weiterhin DRAFT.",
  },
  {
    id: "facettengelenke",
    name: "Facettengelenke, lumbosakraler Übergang",
    relatedCaseId: "nala",
    origin: "Verbindungen zwischen den Wirbelbögen benachbarter Lendenwirbel",
    insertion: "—",
    funktion: "Führung und Begrenzung der Wirbelsäulenbewegung, v. a. Rotation, Flexion/Extension",
    innervation: "Rr. dorsales der Spinalnerven",
    clinicalRelevance:
      "Häufig unterschätzte Schmerzquelle im lumbosakralen Übergang — zeigt sich oft eher durch unspezifische Verhaltensänderung als durch eindeutige Lahmheit.",
    palpationHint: "Gezielte Palpation paravertebral im Übergangsbereich, meist in Kombination mit Bewegungstests.",
    transferQ: "Warum kann Schmerz in diesem Bereich zunächst eher als Verhaltensproblem statt als orthopädisches Problem auffallen?",
    transferOptions: [
      {
        label:
          "Weil die Schmerzreaktion oft situativ ausgelöst wird (z. B. beim Anlegen des Geschirrs) statt als durchgehende Lahmheit sichtbar zu sein",
        correct: true,
      },
      { label: "Weil Wirbelsäulenschmerz beim Hund grundsätzlich nicht schmerzhaft ist", correct: false },
      { label: "Weil diese Struktur keine Nervenversorgung besitzt", correct: false },
      { label: "Weil Verhalten und Körper beim Hund unabhängig voneinander sind", correct: false },
    ],
    sourceStatus:
      "Quellenkandidaten: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 16 (Die Wirbelsäule); der Verhaltensbezug ergänzend über Hohmann, Bewegungsapparat Hund (ISBN 978-3-13-245265-7), Thieme 2025, Kap. 10. Status weiterhin DRAFT.",
  },
  {
    id: "huefte",
    name: "Articulatio coxae — Kapsel-Band-Apparat",
    relatedCaseId: "luna",
    origin: "—",
    insertion: "—",
    funktion: "Ligamentum capitis femoris und Gelenkkapsel sichern die Kongruenz von Femurkopf und Hüftpfanne",
    innervation: "Äste des N. femoralis und N. ischiadicus versorgen die Gelenkkapsel",
    clinicalRelevance:
      "Bei Hüftdysplasie liegt eine Laxität dieses Kapsel-Band-Apparats vor, die sich im Wachstumsalter durch Gangbildveränderungen zeigt, oft bevor radiologisch sichtbare Veränderungen entstehen.",
    palpationHint: "Der Ortolani-Test prüft gezielt die Laxität dieses Kapsel-Band-Apparats.",
    transferQ: "Was zeigt ein positives Ortolani-Zeichen an?",
    transferOptions: [
      { label: "Eine Laxität im Kapsel-Band-Apparat der Hüfte, typisch für Hüftdysplasie", correct: true },
      { label: "Eine bereits eingetretene, irreversible Arthrose der Hüfte", correct: false },
      { label: "Eine Muskelverkürzung der hüftumgreifenden Muskulatur, unabhängig vom Gelenk selbst", correct: false },
      { label: "Eine normale Gelenkvariante ohne klinische Bedeutung", correct: false },
    ],
    sourceStatus:
      "Quellenkandidat: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 7 (Hüftregion — Anatomie Art. coxae). Status weiterhin DRAFT — Seitenangabe und fachliche Freigabe stehen noch aus.",
  },
  {
    id: "discus",
    name: "Discus intervertebralis (Bandscheibe)",
    relatedCaseId: "baer",
    origin: "—",
    insertion: "—",
    funktion:
      "Stoßdämpfung und Beweglichkeit zwischen benachbarten Wirbelkörpern durch den elastischen Nucleus pulposus und den umgebenden Anulus fibrosus.",
    innervation: "Sensible Versorgung des äußeren Anulus fibrosus über den N. sinuvertebralis.",
    clinicalRelevance:
      "Mit zunehmendem Alter verliert die Bandscheibe an Elastizität, was zu degenerativen Veränderungen der Wirbelsäule (Spondylose) beitragen kann — meist ein langsamer, chronischer Prozess statt eines akuten Ereignisses.",
    palpationHint:
      "Nicht direkt palpierbar; indirekt über Schmerzreaktion bei Druck auf die umliegende Wirbelsäule und über den Bewegungsumfang bei Rumpfrotation einschätzbar.",
    transferQ:
      "Was unterscheidet den chronischen, altersbedingten Elastizitätsverlust der Bandscheibe am ehesten von einem akuten Bandscheibenvorfall?",
    transferOptions: [
      { label: "Der langsame, über Monate bis Jahre fortschreitende Verlauf ohne plötzliche Verschlechterung", correct: true },
      { label: "Das Vorhandensein von Rückenschmerzen überhaupt", correct: false },
      { label: "Das Alter des Hundes allein, unabhängig vom zeitlichen Verlauf", correct: false },
      { label: "Das vollständige Fehlen jeglicher Schmerzreaktion bei der Untersuchung", correct: false },
    ],
    sourceStatus:
      "Fachliche Grundlage: etabliertes Wissen zu altersbedingten degenerativen Bandscheiben-/Wirbelsäulenveränderungen beim Hund. Konkrete Quellenverifizierung steht noch aus — Status: DRAFT, Quelle erforderlich.",
  },
  {
    id: "rueckenmark",
    name: "Rückenmark und Propriozeption der Hintergliedmaßen",
    relatedCaseId: "filou",
    origin: "—",
    insertion: "—",
    funktion:
      "Leitung motorischer und sensibler Signale zwischen Gehirn und Hintergliedmaßen; die Propriozeption (Eigenwahrnehmung der Gliedmaßenposition) ist ein empfindlicher, früher Indikator für die Funktion des Rückenmarks.",
    innervation: "Teil des zentralen Nervensystems — keine periphere Innervation im eigentlichen Sinne.",
    clinicalRelevance:
      "Eine reduzierte Propriozeption (z. B. verzögertes Zurückstellen einer umgedrehten Pfote) ist oft das früheste erkennbare Zeichen einer Rückenmarksbeeinträchtigung — meist noch vor einer sichtbaren Lähmung.",
    palpationHint:
      "Wird nicht palpiert, sondern über einfache Funktionstests geprüft, z. B. das Umdrehen einer Pfote und Beobachten, wie schnell der Hund sie zurückstellt.",
    transferQ:
      "Warum ist eine verzögerte Propriozeption ein wichtigeres Warnsignal als die reine Beobachtung, ob der Hund noch laufen kann?",
    transferOptions: [
      {
        label:
          "Weil Propriozeptionsstörungen oft auftreten, bevor eine deutliche Lähmung sichtbar wird — sie zeigen das Problem frühzeitig an",
        correct: true,
      },
      { label: "Weil gehfähige Hunde grundsätzlich keine neurologischen Probleme haben können", correct: false },
      { label: "Weil Propriozeption nur bei sehr alten Hunden eine Rolle spielt", correct: false },
      { label: "Weil die Gehfähigkeit ohnehin nichts über die Wirbelsäule aussagt", correct: false },
    ],
    sourceStatus:
      "Fachliche Grundlage: etabliertes neurologisches Grundlagenwissen zur Propriozeptionsprüfung als frühem Indikator für Rückenmarksbeeinträchtigungen beim Hund. Konkrete Quellenverifizierung steht noch aus — Status: DRAFT, Quelle erforderlich.",
  },
];

const MEDIALIBRARY: MediaSeed[] = [
  {
    id: "gangbild-huefte",
    title: "Gangbildanalyse: Hüftregion",
    type: "Video (Platzhalter)",
    relatedCaseIds: ["luna", "emma"],
    note: "Zeigt den Unterschied zwischen gelenkbedingtem und muskelbedingtem Schongang — relevant für zwei unterschiedliche Fälle.",
  },
  {
    id: "palpation-ruecken",
    title: "Palpationstechnik: Lumbosakraler Übergang",
    type: "Video (Platzhalter)",
    relatedCaseIds: ["nala"],
    note: "Demonstriert die Handgrifftechnik aus dem Fall.",
  },
  {
    id: "muskelaufbau-knie",
    title: "Reha-Übungen: Quadrizeps-Aufbau",
    type: "Bildserie (Platzhalter)",
    relatedCaseIds: ["bruno"],
    note: "Übungsprogression für den Belastungsaufbau nach Knie-OP.",
  },
];

export async function seedContent(prisma: PrismaClient) {
  const caseIdBySlug = new Map<string, string>();

  for (const c of CASES) {
    const created = await prisma.case.upsert({
      where: { slug: c.id },
      update: {},
      create: {
        slug: c.id,
        topic: c.topic,
        species: c.species,
        title: c.title,
        learningObjective: c.learningObjective,
        anamnese: c.anamnese,
        beobachtung: c.beobachtung,
        diagramLabel: c.diagramLabel,
        palpation: c.palpation,
        hypothesisQ: c.hypothesisQ,
        expertNote: c.expertNote,
        weakeningQ: c.weakeningQ,
        retrievalQ: c.retrievalQ,
        sourceStatus: c.sourceStatus,
        status: "DRAFT",
        hypothesisOptions: {
          create: c.hypothesisOptions.map((o, i) => ({
            sortOrder: i,
            label: o.label,
            isCorrect: o.correct,
            errorCategory: o.errorCategory,
            arguesAgainst: o.arguesAgainst,
            differentiationDistractors: o.differentiationDistractors ?? [],
          })),
        },
        weakeningOptions: {
          create: c.weakeningOptions.map((o, i) => ({
            sortOrder: i,
            label: o.label,
            isCorrect: o.correct,
            errorCategory: o.errorCategory,
          })),
        },
        retrievalOptions: {
          create: c.retrievalOptions.map((o, i) => ({
            sortOrder: i,
            label: o.label,
            isCorrect: o.correct,
            errorCategory: o.errorCategory,
          })),
        },
      },
    });
    caseIdBySlug.set(c.id, created.id);
  }

  for (const a of ANATOMY) {
    await prisma.anatomyItem.upsert({
      where: { slug: a.id },
      update: {},
      create: {
        slug: a.id,
        name: a.name,
        status: "DRAFT",
        relatedCaseId: caseIdBySlug.get(a.relatedCaseId),
        origin: a.origin,
        insertion: a.insertion,
        funktion: a.funktion,
        innervation: a.innervation,
        clinicalRelevance: a.clinicalRelevance,
        palpationHint: a.palpationHint,
        transferQ: a.transferQ,
        sourceStatus: a.sourceStatus,
        transferOptions: {
          create: a.transferOptions.map((o, i) => ({
            sortOrder: i,
            label: o.label,
            isCorrect: o.correct,
          })),
        },
      },
    });
  }

  for (const m of MEDIALIBRARY) {
    await prisma.mediaAsset.upsert({
      where: { id: m.id },
      update: {},
      create: {
        id: m.id,
        title: m.title,
        type: m.type,
        status: "DRAFT",
        note: m.note,
        caseLinks: {
          create: m.relatedCaseIds.map((cid) => ({
            caseId: caseIdBySlug.get(cid)!,
          })),
        },
      },
    });
  }

  const result = {
    cases: CASES.length,
    anatomyItems: ANATOMY.length,
    mediaAssets: MEDIALIBRARY.length,
  };
  console.log(`Seed abgeschlossen: ${result.cases} Fälle, ${result.anatomyItems} Anatomie-Items, ${result.mediaAssets} Medien.`);
  return result;
}
