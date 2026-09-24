/**
 * Lerninhalt aus dem HTML-Prototyp (CASES, ANATOMY, MEDIALIBRARY), wortgetreu
 * uebernommen inklusive sourceStatus. Wird sowohl vom CLI-Seed-Skript
 * (prisma/seed.ts) als auch vom geschuetzten Admin-Endpunkt verwendet, der
 * gegen die Produktions-DB seedet (dort ist die Connection-String nur zur
 * Laufzeit der Netlify Function bekannt, nicht in dieser Sandbox).
 */
import type { PrismaClient } from "@/generated/prisma/client";
import type { KnowledgeBlock } from "@/lib/knowledgeBlocks";

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
  einstiegsbildUrl?: string;
  befundbildUrl?: string;
};

type AnatomySeed = {
  id: string;
  name: string;
  relatedCaseId?: string;
  origin: string;
  insertion: string;
  funktion: string;
  innervation: string;
  clinicalRelevance: string;
  palpationHint: string;
  transferQ: string;
  transferOptions: SimpleOption[];
  sourceStatus: string;
  bildUrl?: string;
};

type MediaSeed = {
  id: string;
  title: string;
  type: string;
  relatedCaseIds: string[];
  note: string;
};

type KnowledgeCategory =
  | "ANATOMIE"
  | "BIOMECHANIK"
  | "PATHOLOGIE"
  | "UNTERSUCHUNG"
  | "THERAPIE"
  | "GRUNDLAGEN";

type KnowledgeSeed = {
  id: string;
  category: KnowledgeCategory;
  title: string;
  teaser: string;
  sections: KnowledgeBlock[];
  errorTags: string[];
  sourceStatus: string;
  relatedCaseIds: string[];
  relatedAnatomyIds: string[];
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
      "Teilverifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 12 (Schulterregion), S. 127–132 — Anatomie und Untersuchung der Bizepssehnenproblematik dort bestätigt (siehe Anatomie-Item „biceps\"). Kap. 13 (Ellenbogenregion) bestätigt Ellenbogendysplasie als real existierende Differenzialdiagnose (Distraktor-Option in hypothesisOptions), ergänzt aber sonst nichts zur Bizepssehnen-Aussage. Welter-Böller, Faszientherapie beim Hund (ISBN 978-3-13-245372-2), Thieme 2025, Kap. 6, S. 53 — bestätigt wörtlich, dass das Tuberculum supraglenoidale ein Knochenhöcker oberhalb der Gelenkpfanne der Scapula ist, an dem die Bizepssehne entspringt (deckt retrievalQ vollständig ab). ACHTUNG: Der dort beschriebene Schadensmechanismus betrifft explizit die Wachstumsphase vor Verschmelzung des Höckers mit der Scapula (bis 5. Lebensmonat, dann Apophysenausriss bei Überbeanspruchung) — nicht die im Fall beschriebene Bizepssehnen-Tendinopathie bei einem 4-jährigen, ausgewachsenen Hund. Die klinische Diagnose „Bizepssehnen-Tendinopathie“ beim erwachsenen Hund ist etabliertes Wissen, aber durch diese Quelle NICHT VERIFIZIERT — nur der anatomische Ursprung der Bizepssehne am Tuberculum supraglenoidale ist damit belegt.",
    einstiegsbildUrl: "/cases/rocky-01.png",
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
    einstiegsbildUrl: "/cases/nala-01.png",
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
    einstiegsbildUrl: "/cases/bruno-01.png",
    befundbildUrl: "/cases/bruno-02.png",
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
      "Teilverifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 7 (Hüftregion), S. 43–48 — der im Fall verwendete Ortolani-Test ist dort exakt so beschrieben (longitudinaler Druck, Subluxation, Reposition mit Klick). Kollodiaphysenwinkel und PennHIP-Verfahren werden in diesem Kapitel nicht erwähnt — dieser Teil bleibt NICHT VERIFIZIERT.",
    einstiegsbildUrl: "/cases/luna-01.png",
    befundbildUrl: "/cases/luna-02.png",
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
      "Verifiziert: Zentek, Ernährung des Hundes (ISBN 978-3-132-46109-3), Thieme 2026, Kap. 7.10 (Erkrankungen des Bewegungsapparates), S. 311 — „Bei älteren Hunden stellt Überernährung in Verbindung mit Übergewicht einen wichtigen Risikofaktor für Erkrankungen des Bewegungsapparats dar\" (wortnahes Zitat). Die konkrete Mechanik „erhöhte mechanische Belastung von Gelenken/Wirbelsäule\" ist eine plausible eigene Erklärung dieses Zusammenhangs, nicht wortgleich aus dieser Quelle zitiert. Kap. 2.4 wurde in dieser Prüfung nicht gesondert eingesehen.",
    einstiegsbildUrl: "/cases/findus-01.png",
    befundbildUrl: "/cases/findus-02.png",
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
      "Verifiziert: Könneker, Osteopathie in der Kleintierpraxis (ISBN 978-3-8304-9174-3), Thieme 2010, Kap. 7 (Osteoartikuläre Techniken, Tabelle Beckengliedmaße) — Ursprung/Ansatz/Funktion des M. iliopsoas bestätigt (Ursprung M. iliacus: Facies sacropelvina ossis ilii, nicht „Facies iliaca\" wie zuvor angegeben — korrigiert). Ergänzend Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 7, S. 47f. — „reflektorisch häufig verspannt bei Hüftproblemen sind der M. iliopsoas\" wortnah bestätigt.",
    einstiegsbildUrl: "/cases/emma-01.png",
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
    einstiegsbildUrl: "/cases/baer-01.png",
    befundbildUrl: "/cases/baer-02.png",
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
    einstiegsbildUrl: "/cases/filou-01.png",
    befundbildUrl: "/cases/filou-02.png",
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
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 12 (Schulterregion und skapulothorakales Gleitlager), S. 127–132. Ursprung (Tuberculum supraglenoidale der Scapula), Ansatz (Tuberositas radii sowie ein Schenkel zur Ulna) und Funktion (Flexion/Supination Ellenbogen, Extension Schulter, Stabilisation in der Stemmphase) im Original bestätigt. Die im Fall beschriebene Untersuchungstechnik fasst zwei im Original getrennte Tests vereinfacht zusammen (Rupturtest über Bewegungsausmaß bei kombinierter Schulterflexion/Ellenbogenextension; separater Palpationsschmerztest der Sehne im Sulcus intertubercularis).",
    bildUrl: "/cases/biceps-01.png",
  },
  {
    id: "iliopsoas",
    name: "M. iliopsoas",
    relatedCaseId: "emma",
    origin: "Wirbelkörper der letzten Brust-/Lendenwirbel (M. psoas major) und Facies sacropelvina des Os ilium (M. iliacus)",
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
      "Verifiziert: Könneker, Osteopathie in der Kleintierpraxis (ISBN 978-3-8304-9174-3), Thieme 2010, Kap. 7, Tabelle Beckengliedmaße — Ursprung (M. iliacus: Facies sacropelvina ossis ilii), Ansatz (Trochanter minor) und Funktion (Flexion, Außenrotation Hüfte, Stabilisation LWS) bestätigt. Die Differenzierung Muskel- vs. Gelenkschmerz (Tabelle in Denkgang) ist eigene Synthese aus allgemeinen Untersuchungsprinzipien, nicht wortgleich aus dieser Quelle übernommen.",
    bildUrl: "/cases/iliopsoas-01.png",
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
      "Zentrale Zielstruktur im Rehabilitationstraining nach Kniegelenkseingriffen — Atrophie ist ein Frühzeichen unzureichender Belastung. Eine Verkürzung des Muskels erhöht zusätzlich den Kompressionsdruck der Patella auf den Femur — ein weiterer Grund, warum reines Muskelaufbautraining ohne begleitende Dehnung nicht ausreicht.",
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
      "Teilverifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 8 (Knieregion), S. 91–93. Funktion (stärkster Strecker des Kniegelenks; über M. rectus femoris zusätzlich Hüftgelenkflexion) und Ansatz (Endsehne über Ligamentum patellae an der Tuberositas tibiae, mit der Patella als Hypomochlion eingelagert) sind hier explizit bestätigt — und lösen damit die zuvor bei Hohmann (Kap. 9, technisch nicht vollständig extrahierbares Kapitel) offene Verifizierung ein. Die genauen knöchernen Ursprungspunkte der drei Vasti-Anteile werden in diesem Kapitel nicht benannt, nur ihre Lagebeziehung zueinander (M. vastus lateralis oberflächig zwischen M. biceps femoris und M. sartorius; M. vastus medialis komplett vom M. sartorius überlagert; M. vastus intermedius am tiefsten, dem Femur direkt aufliegend) — „Femur\" als Ursprungsknochen der Vasti bleibt etabliertes Wissen, NICHT wörtlich in dieser Quelle benannt. Die Innervation (N. femoralis) wird im Original ebenfalls nicht genannt. Ergänzend bestätigt: Eine Verkürzung des Muskels erhöht den Kompressionsdruck der Patella auf den Femur.",
    bildUrl: "/cases/quadriceps-01.png",
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
      "Teilverifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 16 (Die Wirbelsäule), ab S. 202 — Facettengelenke als Struktur und ihre Rolle bei der Bewegungsführung/-hemmung im Original bestätigt. Der Begriff „lumbosakraler Übergang\" kommt in diesem Kapitel wörtlich nicht vor (allgemein anerkannte anatomische Region, hier aber nicht direkt durch diese Quelle belegt). Der Verhaltensbezug (Hohmann, Kap. 10) ist noch NICHT VERIFIZIERT — Quelle erforderlich.",
    bildUrl: "/cases/facettengelenke-01.png",
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
      "Teilverifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 7 (Hüftregion), S. 43–48 — der Ortolani-Test (longitudinaler Druck zum Femur, Subluxation nach dorsal, Reposition mit hörbarem Klick bei Abduktion) ist dort exakt bestätigt. ACHTUNG: „Ligamentum capitis femoris\" und „Hüftdysplasie\" werden in diesem Kapitel nicht erwähnt — dieser Teil der Aussage ist etabliertes veterinärmedizinisches Wissen, aber NICHT VERIFIZIERT gegen diese spezifische Quelle.",
    bildUrl: "/cases/huefte-01.png",
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
    bildUrl: "/cases/discus-01.png",
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
    bildUrl: "/cases/rueckenmark-01.png",
  },
  {
    id: "supraspinatus",
    name: "M. supraspinatus",
    relatedCaseId: "rocky",
    origin: "Fossa supraspinata der Scapula",
    insertion: "Tuberculum majus humeri",
    funktion: "Extension des Schultergelenks",
    innervation: "N. suprascapularis",
    clinicalRelevance:
      "Sehr aktive Hunde können eine traumatisch bedingte Kontraktur des M. supraspinatus entwickeln; die Therapie (Resektion der Ansatzsehne) kann zu erheblichen Stabilitätsproblemen im Schultergelenk führen.",
    palpationHint:
      "Wird vom M. trapezius (Pars cervicis) und M. omotransversarius bedeckt — Palpation mit etwas mehr Druck von der Fossa supraspinata aus über die Lateralseite Richtung kaudoventral.",
    transferQ:
      "Welche Bewegung würde eine schmerzhafte Verkürzung des M. supraspinatus (Test in Dehnposition) am ehesten provozieren?",
    transferOptions: [
      { label: "Flexion im Schultergelenk bei fixierter Skapula", correct: true },
      { label: "Extension im Schultergelenk", correct: false },
      { label: "Abduktion im Ellenbogengelenk", correct: false },
      { label: "Flexion im Karpalgelenk", correct: false },
    ],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 12 (Schulterregion und skapulothorakales Gleitlager), S. 127–142. Ursprung (Fossa supraspinata), Funktion als Extensor des Schultergelenks, Innervation (N. suprascapularis, zieht durch die Incisura scapulae zu den Muskeln der Fossa supra-/infraspinata) sowie der Dehnungstest (Flexion bei fixierter Skapula) und die Kontraktur-Komplikation sind im Original so beschrieben. Der Ansatzpunkt Tuberculum majus humeri wird im Text nicht explizit für den M. supraspinatus genannt (nur für M. infraspinatus direkt bestätigt) — als etabliertes Wissen ergänzt, NICHT VERIFIZIERT gegen diese spezifische Quelle.",
  },
  {
    id: "infraspinatus",
    name: "M. infraspinatus",
    relatedCaseId: "rocky",
    origin: "Fossa infraspinata der Scapula",
    insertion: "Tuberculum majus humeri",
    funktion:
      "Je nach Gelenkstellung Flexion oder Extension des Schultergelenks — die Sehne verläuft abhängig von der Gelenkstellung vor oder hinter der Rotationsachse. Zusätzlich äußerer Kapselverstärker (lateraler Stabilisator) des Schultergelenks.",
    innervation: "N. suprascapularis",
    clinicalRelevance:
      "Stabilisiert das Schultergelenk von lateral — bei vergrößertem lateralem Gelenkspiel (positive laterale Aufklappbarkeit) muss die Behandlung auf Stabilisation dieses Muskels zielen, nicht auf Mobilisation. Eine Kontraktur des M. infraspinatus zeigt sich typischerweise nach Jagdeinsätzen mit einer charakteristischen Gliedmaßenfehlhaltung.",
    palpationHint:
      "Liegt lateral, wird vom M. deltoideus bedeckt — Palpation von der Fossa infraspinata Richtung kaudoventral zum Tuberculum majus.",
    transferQ: "Warum lässt sich die Dehnposition des M. infraspinatus nicht mit einer einzigen Bewegungsrichtung testen?",
    transferOptions: [
      {
        label:
          "Weil seine Sehne je nach Gelenkstellung vor oder hinter der Rotationsachse verläuft und der Muskel dadurch sowohl flektieren als auch extendieren kann",
        correct: true,
      },
      { label: "Weil der Muskel gar nicht am Schultergelenk beteiligt ist", correct: false },
      { label: "Weil er ausschließlich das Ellenbogengelenk bewegt", correct: false },
      { label: "Weil er nur bei voller Streckung überhaupt aktiv wird", correct: false },
    ],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 12, S. 127–143. Ursprung (Fossa infraspinata), Ansatz (Tuberculum majus, im Palpationsverlauf explizit genannt), die positionsabhängige Flexions-/Extensionsfunktion, die Rolle als lateraler Kapselverstärker/Stabilisator sowie die Kontraktur als klinisches Bild sind im Original so beschrieben. Die Innervation (N. suprascapularis) ist über die gemeinsame Nervenversorgung der Muskulatur an Fossa supraspinata/infraspinata hergeleitet (siehe Anatomie-Item „supraspinatus\").",
  },
  {
    id: "deltoideus",
    name: "M. deltoideus",
    relatedCaseId: "rocky",
    origin: "Spina scapulae und Akromion (Processus hamatus, Pars acromialis)",
    insertion: "Tuberositas deltoidea humeri",
    funktion:
      "Flexion des Schultergelenks — ausschließlich, im Unterschied zu M. infraspinatus, M. subscapularis und M. coracobrachialis, die je nach Gelenkstellung auch extendieren können.",
    innervation: "N. axillaris",
    clinicalRelevance:
      "Oberflächlich und gut abgrenzbar auf der Lateralseite der Scapula gelegen. Differentialdiagnostisch lässt er sich von M. infraspinatus, M. subscapularis und M. coracobrachialis dadurch unterscheiden, dass er ausschließlich flektiert, während die anderen je nach Gelenkstellung auch extendieren.",
    palpationHint:
      "Liegt oberflächlich auf der Lateralseite der Scapula — Palpation von der Spina scapulae und dem Akromion im Faserverlauf bis zur gut tastbaren Tuberositas deltoidea.",
    transferQ:
      "Woran lässt sich der M. deltoideus von M. infraspinatus, M. subscapularis und M. coracobrachialis unterscheiden, wenn alle vier bei Dehnung schmerzhaft reagieren?",
    transferOptions: [
      {
        label: "Der M. deltoideus flektiert ausschließlich, die anderen drei können je nach Gelenkstellung auch extendieren",
        correct: true,
      },
      { label: "Der M. deltoideus ist der einzige der vier, der am Ellenbogen ansetzt", correct: false },
      { label: "Der M. deltoideus ist der einzige, der beim Hund verkümmert ist", correct: false },
      { label: "Der M. deltoideus reagiert nie schmerzhaft auf Dehnung", correct: false },
    ],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 12, S. 127f., 143f. Ursprung (Spina scapulae, Akromion/Processus hamatus, Pars acromialis), Ansatz (Tuberositas deltoidea), die reine Flexorfunktion sowie die differentialdiagnostische Abgrenzung zu M. infraspinatus/M. subscapularis/M. coracobrachialis sind im Original so beschrieben. Die Innervation (N. axillaris) wird im Original nicht genannt — als etabliertes veterinärmedizinisches Wissen ergänzt, NICHT VERIFIZIERT gegen diese spezifische Quelle.",
  },
  {
    id: "subscapularis",
    name: "M. subscapularis",
    relatedCaseId: "rocky",
    origin: "Fossa subscapularis der Scapula",
    insertion: "Tuberculum minus humeri (kleiner Rollhügel des Humerus)",
    funktion:
      "Je nach Gelenkstellung Flexion oder Extension des Schultergelenks (wie M. infraspinatus); zusätzlich innerer Kapselverstärker (medialer Stabilisator) des Schultergelenks.",
    innervation: "N. subscapularis (meist mit kranialem und kaudalem Ast)",
    clinicalRelevance:
      "Liegt auf der Medialseite der Skapula und ist daher nicht direkt tastbar. Ist das Schultergelenk in Extension oder Flexion eingeschränkt, ohne dass lateral eine Gewebeveränderung oder Schmerzhaftigkeit feststellbar ist, kann die Ursache auf der Medialseite im M. subscapularis liegen — eine Diagnose per Ausschluss statt direkter Palpation.",
    palpationHint:
      "Nicht palpierbar — der Muskel liegt zu weit medial. Beurteilung nur indirekt über Bewegungseinschränkung und Ausschlussdiagnostik möglich.",
    transferQ: "Warum lässt sich eine Schmerzhaftigkeit des M. subscapularis nicht durch direkte Palpation feststellen?",
    transferOptions: [
      {
        label: "Weil der Muskel auf der Medialseite der Skapula liegt und von dort aus nicht direkt zugänglich ist",
        correct: true,
      },
      { label: "Weil der Muskel beim Hund funktionslos ist", correct: false },
      { label: "Weil der Muskel zu klein ist, um überhaupt Schmerzen zu verursachen", correct: false },
      { label: "Weil der Muskel nur bei Welpen vorhanden ist", correct: false },
    ],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 12, S. 127f., 143. Ursprung (Fossa subscapularis), Funktion (positionsabhängige Flexion/Extension wie M. infraspinatus, medialer Kapselverstärker) sowie die fehlende Palpierbarkeit und die daraus folgende Ausschlussdiagnostik sind im Original so beschrieben. Ansatz und Innervation werden im Original nicht genannt. Ergänzt per Web-Recherche (23.09.2026) aus konvergenten veterinäranatomischen Fachquellen (u. a. IMAIOS vet-Anatomy, WikiVet): Ansatz (Tuberculum minus humeri) und Innervation (N. subscapularis). WICHTIGE EINSCHRÄNKUNG: WebFetch war in dieser Arbeitsumgebung technisch blockiert; die Ergänzung stammt aus konvergenten Websuche-Zusammenfassungen mehrerer veterinäranatomischer Quellen, nicht aus eigener Volltextprüfung eines Standardwerks (z. B. Evans & de Lahunta, Miller's Anatomy of the Dog).",
  },
  {
    id: "coracobrachialis",
    name: "M. coracobrachialis",
    relatedCaseId: "rocky",
    origin: "Processus coracoideus der Scapula",
    insertion: "Crista tuberculi minoris humeri",
    funktion:
      "Je nach Gelenkstellung Flexion oder Extension des Schultergelenks (wie M. infraspinatus und M. subscapularis), zusätzlich Adduktion des Schultergelenks.",
    innervation: "N. musculocutaneus",
    clinicalRelevance:
      "Liegt medial und ist daher wie M. subscapularis nicht direkt palpierbar. Von M. infraspinatus und M. subscapularis lässt er sich dadurch abgrenzen, dass zusätzliche Abduktion des Schultergelenks bei der Schmerzprovokation gezielt ihn stärker belastet.",
    palpationHint:
      "Nicht palpierbar — liegt medial. Differenzierung zu M. infraspinatus/M. subscapularis über zusätzliche Abduktionsbewegung bei der Provokation.",
    transferQ:
      "Wie lässt sich ein schmerzhafter M. coracobrachialis von M. infraspinatus und M. subscapularis unterscheiden, wenn alle drei bei Flexion oder Extension des Schultergelenks reagieren?",
    transferOptions: [
      {
        label: "Zusätzliche Abduktion des Schultergelenks verstärkt die Reaktion gezielt beim M. coracobrachialis",
        correct: true,
      },
      { label: "Nur der M. coracobrachialis reagiert überhaupt auf Palpation", correct: false },
      { label: "Zusätzliche Innenrotation des Karpalgelenks verstärkt die Reaktion", correct: false },
      { label: "M. coracobrachialis lässt sich gar nicht von den anderen beiden unterscheiden", correct: false },
    ],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 12, S. 127f., 143f. Ursprung (Processus coracoideus scapulae), Funktion (positionsabhängige Flexion/Extension plus zusätzliche Adduktion) sowie die differentialdiagnostische Abgrenzung über zusätzliche Abduktion sind im Original so beschrieben. Ansatz und Innervation werden im Original nicht genannt. Ergänzt per Web-Recherche (23.09.2026) aus konvergenten veterinäranatomischen Fachquellen (u. a. IMAIOS vet-Anatomy, ScienceDirect Veterinary Science Topics): Ansatz (Crista tuberculi minoris humeri) und Innervation (N. musculocutaneus). WICHTIGE EINSCHRÄNKUNG: WebFetch war in dieser Arbeitsumgebung technisch blockiert; die Ergänzung stammt aus konvergenten Websuche-Zusammenfassungen, nicht aus eigener Volltextprüfung eines Standardwerks.",
  },
  {
    id: "teres-major",
    name: "M. teres major",
    relatedCaseId: "rocky",
    origin: "Angulus caudalis der Scapula",
    insertion: "Crista tuberculi minoris humeri (gemeinsame Endsehne mit M. latissimus dorsi)",
    funktion:
      "Flexion des Schultergelenks — gemeinsam mit seinem „Brudermuskel“ M. latissimus dorsi, mit dem er sich in der Endsehne verbindet und denselben Ansatz teilt.",
    innervation: "N. axillaris",
    clinicalRelevance:
      "Liegt unter M. deltoideus und M. infraspinatus und wird zusätzlich vom M. latissimus dorsi bedeckt — daher nur in der Tiefe zu palpieren. Da beide Muskeln denselben Verlauf und dieselbe Funktion haben, betrifft eine Problematik oft beide gemeinsam.",
    palpationHint:
      "In der Tiefe zu palpieren. Differenzierung zum M. deltoideus über zusätzliche Außenrotation der Vordergliedmaße, die gezielt mehr Spannung auf den M. teres major bringt.",
    transferQ:
      "Sowohl M. deltoideus als auch M. teres major werden durch Extension des Schultergelenks in Dehnposition gebracht. Womit lässt sich gezielt mehr Spannung auf den M. teres major bringen, um ihn vom M. deltoideus zu unterscheiden?",
    transferOptions: [
      { label: "Zusätzliche Außenrotation der Vordergliedmaße", correct: true },
      { label: "Zusätzliche Adduktion der Vordergliedmaße", correct: false },
      { label: "Zusätzliche Flexion des Ellenbogengelenks", correct: false },
      { label: "Zusätzliche Pronation des Unterarms", correct: false },
    ],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 12, S. 128, 144, 164. Ursprung (Angulus caudalis scapulae), Ansatz (Crista tuberculi minoris humeri, gemeinsame Endsehne mit M. latissimus dorsi), Funktion (Flexion, als „Brudermuskel“ des M. latissimus dorsi) sowie die differentialdiagnostische Abgrenzung zum M. deltoideus über zusätzliche Außenrotation sind im Original so beschrieben. Die Innervation wird im Original nicht genannt. Ergänzt per Web-Recherche (23.09.2026) aus konvergenten veterinäranatomischen Fachquellen (u. a. IMAIOS vet-Anatomy, veterinärmedizinische Nerven-Übersichten): Innervation (N. axillaris). WICHTIGE EINSCHRÄNKUNG: WebFetch war in dieser Arbeitsumgebung technisch blockiert; die Ergänzung stammt aus konvergenten Websuche-Zusammenfassungen, nicht aus eigener Volltextprüfung eines Standardwerks.",
  },
  {
    id: "teres-minor",
    name: "M. teres minor",
    relatedCaseId: "rocky",
    origin: "Distales Drittel des Margo caudalis der Scapula",
    insertion: "Tuberositas teres minor am Humeruskopf",
    funktion: "Flexion des Schultergelenks",
    innervation: "N. axillaris",
    clinicalRelevance:
      "Kleiner, vom M. deltoideus bedeckter Muskel am Margo caudalis der Skapula — als einer von mehreren Schulterflexoren bei der Lokalisation von Schulterschmerzen mitzudenken.",
    palpationHint:
      "Vom M. deltoideus bedeckt — Palpation vom distalen Drittel des Margo caudalis scapulae nach lateral in Richtung ventrokranial bis zur Tuberositas teres minor am Humeruskopf.",
    transferQ: "Welche Bewegung würde eine schmerzhafte Dehnung des M. teres minor am ehesten hervorrufen?",
    transferOptions: [
      { label: "Extension des Schultergelenks bei fixierter Skapula", correct: true },
      { label: "Flexion des Schultergelenks", correct: false },
      { label: "Abduktion des Ellenbogengelenks", correct: false },
      { label: "Innenrotation des Karpalgelenks", correct: false },
    ],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 12, S. 128, 144. Ursprung (distales Drittel Margo caudalis scapulae), Ansatz (Tuberositas teres minor am Humeruskopf, im Original explizit benannt) und Funktion (Flexion des Schultergelenks, Dehnungstest via reine Extension) sind im Original so beschrieben. Die Innervation wird im Original nicht genannt. Ergänzt per Web-Recherche (23.09.2026) aus konvergenten veterinäranatomischen Fachquellen: Innervation (N. axillaris). WICHTIGE EINSCHRÄNKUNG: WebFetch war in dieser Arbeitsumgebung technisch blockiert; die Ergänzung stammt aus konvergenten Websuche-Zusammenfassungen, nicht aus eigener Volltextprüfung eines Standardwerks.",
  },
  {
    id: "brachialis",
    name: "M. brachialis",
    relatedCaseId: "rocky",
    origin: "Collum humeri (lateral des M. biceps brachii gelegen)",
    insertion:
      "Geteilter Ansatz: ein schmaler Schenkel zur Tuberositas radii, der zweite, kräftigere Schenkel unter der gespaltenen Ansatzsehne des M. biceps brachii hindurch zum Proc. coronoideus medialis der Ulna",
    funktion: "Flexion des Ellenbogengelenks",
    innervation: "N. musculocutaneus",
    clinicalRelevance:
      "Liegt lateral des M. biceps brachii und enthält wie dieser einen hohen Anteil ermüdungsresistenter Typ-I-Fasern (ca. 50 %) — funktionell eng mit dem Bizeps verwandt, beide werden in der Praxis häufig gemeinsam behandelt.",
    palpationHint: "Palpation auf der kaudolateralen Seite des Humerus vom Collum humeri bis hin zu Radius und Ulna.",
    transferQ: "Welche Bewegung würde eine schmerzhafte Dehnung des M. brachialis am ehesten hervorrufen?",
    transferOptions: [
      { label: "Extension im Ellenbogengelenk", correct: true },
      { label: "Flexion im Ellenbogengelenk", correct: false },
      { label: "Extension im Schultergelenk allein, bei gebeugtem Ellenbogen", correct: false },
      { label: "Abduktion im Karpalgelenk", correct: false },
    ],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 13 (Ellenbogenregion), S. 165f., 171. Ursprung (Collum humeri, lateral des Bizeps), der geteilte Ansatz (Tuberositas radii sowie Proc. coronoideus medialis der Ulna), Funktion (Flexion Ellenbogengelenk) und der Dehnungstest (Extension Ellenbogengelenk) sind im Original so beschrieben. Die Innervation wird im Original nicht genannt. Ergänzt per Web-Recherche (23.09.2026) aus konvergenten veterinäranatomischen Fachquellen: Innervation (N. musculocutaneus). WICHTIGE EINSCHRÄNKUNG: WebFetch war in dieser Arbeitsumgebung technisch blockiert; die Ergänzung stammt aus konvergenten Websuche-Zusammenfassungen, nicht aus eigener Volltextprüfung eines Standardwerks.",
  },
  {
    id: "triceps-brachii",
    name: "M. triceps brachii",
    relatedCaseId: "rocky",
    origin:
      "Vierköpfiger Muskel: Caput longum vom Tuberculum infraglenoidale der Scapula (kaudaler Skapularand), Caput laterale, Caput mediale sowie Caput accessorium vom Humerus",
    insertion: "Olecranon der Ulna",
    funktion:
      "Extension des Ellenbogengelenks; das Caput longum zusätzlich Flexion des Schultergelenks im Hangbein. In der Stützbeinphase verhindert der Muskel als Antischwerkraftmuskel das Einknicken der Gliedmaße.",
    innervation: "N. radialis",
    clinicalRelevance:
      "Einziger der vier Köpfe mit Einfluss auf die Schulter ist das Caput longum, das über das Schultergelenk zum Kaudalrand der Skapula zieht. Caput longum, laterale und mediale bestehen überwiegend aus Typ-II-Fasern (dynamische Bremsfunktion), während das tief liegende Caput accessorium überwiegend aus ermüdungsresistenten Typ-I-Fasern besteht.",
    palpationHint:
      "Palpation des gesamten Bereichs kaudal des Humerus vom kaudalen Skapularand bis zum Olekranon. Das Caput accessorium ist von den anderen drei Anteilen bedeckt und nicht direkt palpierbar.",
    transferQ:
      "Warum unterscheidet sich der Dehnungstest für das Caput longum von dem der anderen drei Muskelköpfe des M. triceps brachii?",
    transferOptions: [
      {
        label: "Weil nur das Caput longum über das Schultergelenk zieht und daher zusätzlich eine Schulterextension zur Dehnung braucht",
        correct: true,
      },
      { label: "Weil das Caput longum der einzige Kopf ist, der überhaupt gedehnt werden kann", correct: false },
      { label: "Weil die anderen drei Köpfe nicht am Ellenbogengelenk beteiligt sind", correct: false },
      { label: "Weil das Caput longum ausschließlich aus Typ-I-Fasern besteht", correct: false },
    ],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 13, S. 166, 170f. Die vier Köpfe, ihre unterschiedliche Funktion/Faserzusammensetzung, die fehlende Palpierbarkeit des Caput accessorium und der unterschiedliche Dehnungstest für Caput longum vs. die anderen drei Köpfe sind im Original so beschrieben. Der Ansatz am Olecranon ist aus dem Palpationsverlauf abgeleitet (\"bis zum Olekranon\"), nicht als eigenständige Ansatz-Aussage benannt. Ursprung des Caput longum (Tuberculum infraglenoidale) stammt aus Kap. 12, S. 127. Die Innervation wird im Original nicht genannt. Ergänzt per Web-Recherche (23.09.2026) aus konvergenten veterinäranatomischen Fachquellen: Innervation (N. radialis). WICHTIGE EINSCHRÄNKUNG: WebFetch war in dieser Arbeitsumgebung technisch blockiert; die Ergänzung stammt aus konvergenten Websuche-Zusammenfassungen, nicht aus eigener Volltextprüfung eines Standardwerks.",
  },
  {
    id: "tensor-fasciae-antebrachii",
    name: "M. tensor fasciae antebrachii",
    relatedCaseId: "rocky",
    origin: "Abspaltung vom M. latissimus dorsi (gilt als dessen „5. Trizepskopf“)",
    insertion: "Zieht medial zum Olecranon und spannt die Unterarmfaszie",
    funktion: "Extension des Ellenbogengelenks, spannt zusätzlich die Unterarmfaszie",
    innervation: "N. radialis",
    clinicalRelevance:
      "Liegt medial des M. triceps brachii und bildet den mediokaudalsten Muskel der hinteren Achselfalte. Bei großen Hunden kann er bis zu ca. 2 mm dick sein.",
    palpationHint: "Palpation vom M. latissimus dorsi aus über die Lateralseite des Oberarms bis zur Medialseite des Olekranons.",
    transferQ: "Welche Bewegungskombination würde eine schmerzhafte Dehnung des M. tensor fasciae antebrachii am ehesten hervorrufen?",
    transferOptions: [
      { label: "Flexion im Ellenbogengelenk mit zusätzlichem Kaudalschub am M. latissimus dorsi", correct: true },
      { label: "Extension im Ellenbogengelenk allein", correct: false },
      { label: "Abduktion im Schultergelenk allein", correct: false },
      { label: "Innenrotation im Karpalgelenk", correct: false },
    ],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 13, S. 166, 172. Herkunft als Abspaltung des M. latissimus dorsi, Funktion (Extension Ellenbogengelenk, Fasziendehnung), Lage sowie der Dehnungstest sind im Original so beschrieben. Der genaue Ansatzpunkt wird im Original nicht als eigene Ansatz-Aussage benannt, sondern aus dem Palpationsverlauf (bis zur Medialseite des Olekranons) und der Funktionsbeschreibung abgeleitet. Die Innervation wird im Original nicht genannt. Ergänzt per Web-Recherche (23.09.2026) aus konvergenten veterinäranatomischen Fachquellen: Innervation (N. radialis). WICHTIGE EINSCHRÄNKUNG: WebFetch war in dieser Arbeitsumgebung technisch blockiert; die Ergänzung stammt aus konvergenten Websuche-Zusammenfassungen, nicht aus eigener Volltextprüfung eines Standardwerks.",
  },
  {
    id: "anconeus",
    name: "M. anconeus",
    relatedCaseId: "rocky",
    origin: "Epicondylus lateralis humeri (laterale Epikondylenleiste) sowie Anteile der Fossa olecrani",
    insertion: "Laterale Fläche des proximalen Olecranon der Ulna",
    funktion: "Extension des Ellenbogengelenks",
    innervation: "N. radialis",
    clinicalRelevance:
      "Besteht zu 100 % aus ermüdungsresistenten Typ-I-Fasern und zählt zu den Antischwerkraftmuskeln — er kann ausdauernd arbeiten, ohne zu ermüden. Ihm wurde außerdem eine hohe Dichte an Muskelspindeln nachgewiesen, weshalb er eine wichtige Rolle bei der Aufnahme propriozeptiver Informationen über das Ellenbogengelenk spielt.",
    palpationHint:
      "Mit spitzen Fingern auf der Lateralseite distal des M. triceps brachii zu palpieren, kaudal des Humerus, zwischen den Humeruskondylen und dem Olekranon.",
    transferQ: "Warum ist der M. anconeus für die Propriozeption des Ellenbogengelenks besonders relevant?",
    transferOptions: [
      { label: "Weil ihm eine hohe Dichte an Muskelspindeln nachgewiesen wurde", correct: true },
      { label: "Weil er der größte Muskel am Ellenbogengelenk ist", correct: false },
      { label: "Weil er als einziger Muskel am Ellenbogengelenk innerviert wird", correct: false },
      { label: "Weil er ausschließlich aus schnell ermüdenden Typ-II-Fasern besteht", correct: false },
    ],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 13, S. 166, 172f. Faserzusammensetzung (100 % Typ I), Funktion als Antischwerkraftmuskel und Ellenbogenextensor sowie die hohe Muskelspindeldichte mit ihrer Bedeutung für die Propriozeption sind im Original so beschrieben. Ursprung, Ansatz und Innervation werden im Original nicht genannt — nur die Palpationslage. Ergänzt per Web-Recherche (23.09.2026) aus konvergenten veterinäranatomischen Fachquellen (u. a. IMAIOS vet-Anatomy, ScienceDirect Veterinary Science Topics): Ursprung (Epicondylus lateralis humeri, Fossa olecrani), Ansatz (laterale Fläche des proximalen Olecranon) und Innervation (N. radialis). WICHTIGE EINSCHRÄNKUNG: WebFetch war in dieser Arbeitsumgebung technisch blockiert; die Ergänzung stammt aus konvergenten Websuche-Zusammenfassungen, nicht aus eigener Volltextprüfung eines Standardwerks.",
  },
  {
    id: "supinator",
    name: "M. supinator",
    origin: "Epicondylus lateralis humeri (Lage: lateral am Unterarm, unter M. extensor carpi radialis und M. extensor digitorum communis)",
    insertion: "Proximaler Radius, medialseitig oberhalb des Ansatzes des M. pronator teres",
    funktion: "Flexion und Supination im Ellenbogengelenk",
    innervation: "Der N. radialis zieht durch den Muskel hindurch",
    clinicalRelevance:
      "Bei vermehrter Toe-in-Stellung des Hundes gerät der M. supinator unter Spannung und kann dadurch den hindurchziehenden N. radialis reizen (Mechanosensitivität, Leitungsprobleme) — mögliche Folgen sind Schleifen der Vorderpfote oder Beknabbern des Versorgungsgebiets des N. radialis (siehe Wissenseintrag „Toe-in/Toe-out“).",
    palpationHint:
      "Liegt in der Tiefe, bedeckt vom M. extensor carpi radialis und M. extensor digitorum communis — nicht direkt auf Konsistenzveränderung prüfbar. Schmerzhaftigkeit lässt sich nur im Seitenvergleich unter Zuhilfenahme der Dehnposition untersuchen. Der M. brachioradialis liegt oberflächlicher an derselben Stelle mit identischer Funktion — beide lassen sich nur über die Palpationstiefe unterscheiden.",
    transferQ: "Welche Bewegungskombination würde eine schmerzhafte Dehnung des M. supinator am ehesten hervorrufen?",
    transferOptions: [
      { label: "Extension und Pronation im Ellenbogengelenk", correct: true },
      { label: "Flexion und Supination im Ellenbogengelenk", correct: false },
      { label: "Nur Flexion im Karpalgelenk", correct: false },
      { label: "Abduktion im Schultergelenk", correct: false },
    ],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 14 (Unterarmregion), S. 179f., 182. Funktion (Flexion/Supination Ellenbogengelenk), der Verlauf des N. radialis durch den Muskel, die fehlende direkte Palpierbarkeit sowie der Dehnungstest (Extension und Pronation) sind im Original so beschrieben. Ursprung und Ansatz werden im Original nicht genannt — ergänzt per Web-Recherche (23.09.2026) aus konvergenten veterinäranatomischen Fachquellen: Ursprung (Epicondylus lateralis humeri), Ansatz (proximaler Radius, medialseitig). WICHTIGE EINSCHRÄNKUNG: WebFetch war in dieser Arbeitsumgebung technisch blockiert; die Ergänzung stammt aus konvergenten Websuche-Zusammenfassungen, nicht aus eigener Volltextprüfung eines Standardwerks. WIDERSPRUCH IN DER QUELLE: Kap. 17 (Neurotension), S. 279, beschreibt denselben Mechanismus (hypertoner M. supinator komprimiert N. radialis) unter der Bezeichnung „toe out position\" statt „Toe-in\" wie hier in Kap. 14. Der Muskel-Nerv-Bezug ist in beiden Kapiteln identisch, nur die Fußstellungsbezeichnung widerspricht sich zwischen den Kapiteln. Hier wird die Darstellung aus Kap. 14 (eigenständiges Unterarm-Kapitel mit vollständiger Gegenüberstellung Toe-in/Toe-out) beibehalten — die Diskrepanz ist ungeklärt und sollte fachlich/praktisch geprüft werden, bevor sie als sicher gilt. Web-Abgleich (22.09.2026): Weder canine noch humane Fachliteratur zum Supinatortunnel-/Supinatorlogensyndrom (z. B. Springer Nature, DocCheck Flexikon, PubMed) beschreibt eine Zuordnung zu einer bestimmten Fußstellung — dort werden andere Kompressionsursachen genannt (Frohse-Arkade, raumfordernde Prozesse, repetitive Pro-/Supination). Die Toe-in/Toe-out-Zuordnung scheint eine Hárrer-eigene klinische Beobachtung zu sein, die sich nicht extern verifizieren ließ. UNGEPRÜFTE HYPOTHESE (nicht aus einer Quelle, ausdrücklich als eigene Überlegung markiert): Der Widerspruch ließe sich denkbar dadurch erklären, dass in Kap. 14 der Muskel exzentrisch überdehnt (reaktiver Hypertonus durch chronischen Zug) und in Kap. 17 derselbe Muskel konzentrisch verkürzt (struktureller Hypertonus als Fehlstellungs-Ursache) gemeint sein könnte — ein in der Physiotherapie generell bekanntes Prinzip. Der Originaltext von Kap. 14 (\"kommt der M. supinator unter Spannung\") und Kap. 17 (\"Hypertonie des M. supinator\") belegt diese Unterscheidung aber nicht wörtlich; es handelt sich um eine mögliche Erklärung, keine verifizierte Aussage.",
  },
  {
    id: "brachioradialis",
    name: "M. brachioradialis",
    origin: "Epicondylus lateralis humeri",
    insertion: "Distales Drittel des Radius, medialseitig (nahe des Proc. styloideus radii)",
    funktion: "Flexion und Supination im Ellenbogengelenk — identisch mit M. supinator",
    innervation: "N. radialis",
    clinicalRelevance:
      "Ein anatomisch inkonstanter Muskel — er fehlt bei Hunden häufig. Ist er vorhanden, liegt er lateral am Ellenbogen zwischen oberflächiger und tiefer Unterarmfaszie, auf dem M. extensor carpi radialis.",
    palpationHint:
      "Liegt oberflächlicher als der M. supinator an derselben Stelle. Da beide dieselbe Funktion haben, lassen sie sich nur über die Palpationstiefe voneinander unterscheiden.",
    transferQ: "Warum lässt sich der M. brachioradialis palpatorisch nur schwer vom M. supinator unterscheiden?",
    transferOptions: [
      { label: "Weil beide an derselben Stelle liegen und exakt dieselbe Funktion haben", correct: true },
      { label: "Weil der M. brachioradialis bei jedem Hund fehlt", correct: false },
      { label: "Weil beide Muskeln unterschiedliche Gelenke bewegen", correct: false },
      { label: "Weil nur der M. supinator überhaupt existiert", correct: false },
    ],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 14, S. 180, 182. Die anatomische Inkonstanz (fehlt häufig bei Hunden), Lage und die mit M. supinator identische Funktion sowie die Differenzierung nur über die Palpationstiefe sind im Original so beschrieben. Ursprung, Ansatz und Innervation werden im Original nicht genannt. Ergänzt per Web-Recherche (23.09.2026) aus konvergenten veterinäranatomischen Fachquellen: Ursprung (Epicondylus lateralis humeri), Ansatz (distales Radiusdrittel, medialseitig) und Innervation (N. radialis) — Werte gelten für den Fall, dass der Muskel beim jeweiligen Hund überhaupt angelegt ist. WICHTIGE EINSCHRÄNKUNG: WebFetch war in dieser Arbeitsumgebung technisch blockiert; die Ergänzung stammt aus konvergenten Websuche-Zusammenfassungen, nicht aus eigener Volltextprüfung eines Standardwerks.",
  },
  {
    id: "pronator-teres",
    name: "M. pronator teres",
    origin: "Medialer Epicondylus humeri",
    insertion: "Kraniomedial am oberen Drittel des Radius",
    funktion: "Flexion und Pronation des Ellenbogengelenks",
    innervation: "N. medianus",
    clinicalRelevance:
      "Gut ausgebildeter, gut palpierbarer Muskel auf der Medialseite des Ellenbogengelenks, der häufig sehr verspannt und hypertroph ist. Bei vermehrter Toe-out-Stellung des Hundes gerät er unter Spannung und kann den N. medianus reizen — mögliche Folge ist Beknabbern der distalen Zehen (siehe Wissenseintrag „Toe-in/Toe-out“).",
    palpationHint:
      "Palpation vom medialen Epicondylus humeri, kranial des M. flexor carpi radialis, bis zum Ansatz kraniomedial am oberen Drittel des Radius.",
    transferQ: "Welche Bewegungskombination würde eine schmerzhafte Dehnung des M. pronator teres am ehesten hervorrufen?",
    transferOptions: [
      { label: "Extension des Ellenbogengelenks mit Supination des Unterarms", correct: true },
      { label: "Flexion des Ellenbogengelenks mit Pronation des Unterarms", correct: false },
      { label: "Nur Extension im Karpalgelenk", correct: false },
      { label: "Adduktion im Schultergelenk", correct: false },
    ],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 14, S. 180, 182f. Ursprung (medialer Epicondylus humeri), Ansatz (kraniomedial am oberen Drittel des Radius), Funktion (Flexion/Pronation), die klinische Beobachtung (häufig verspannt/hypertroph) sowie der Dehnungstest (Extension mit Supination) sind im Original so beschrieben. Die Innervation wird im Original nicht genannt — ergänzt per Web-Recherche (23.09.2026) aus konvergenten veterinäranatomischen Fachquellen: Innervation (N. medianus). WICHTIGE EINSCHRÄNKUNG: WebFetch war in dieser Arbeitsumgebung technisch blockiert; die Ergänzung stammt aus konvergenten Websuche-Zusammenfassungen, nicht aus eigener Volltextprüfung eines Standardwerks. WIDERSPRUCH IN DER QUELLE: Kap. 17 (Neurotension), S. 279, ordnet die dort beschriebene Kompression des N. radialis durch den M. supinator der „toe out position\" zu — nach der hier verwendeten Kap.-14-Logik (Toe-out = M. pronator teres → N. medianus) müsste die dortige Aussage eigentlich M. supinator und Toe-in betreffen. Die beiden Kapitel widersprechen sich in der Stellungsbezeichnung; die Diskrepanz ist ungeklärt und sollte fachlich/praktisch geprüft werden, bevor sie als sicher gilt. Web-Abgleich (22.09.2026): Keine externe canine oder humane Fachquelle zu Pronator-teres-/N.-medianus-Kompression gefunden, die eine Fußstellung benennt — auch dies wirkt wie eine Hárrer-eigene klinische Beobachtung ohne externe Bestätigung. UNGEPRÜFTE HYPOTHESE (eigene Überlegung, keine Quellenaussage): Denkbar wäre eine Erklärung über exzentrischen (Kap. 14, Toe-out) vs. konzentrischen Hypertonus (Kap. 17, sofern dort tatsächlich Toe-in statt Toe-out gemeint wäre) — siehe ausführlicher die entsprechende Notiz beim Anatomie-Item „supinator\". Nicht durch den Originaltext belegt.",
  },
  {
    id: "pronator-quadratus",
    name: "M. pronator quadratus",
    origin: "Palmare (volare) Fläche des Radius sowie die Membrana interossea antebrachii",
    insertion: "Margo interosseus der Ulna",
    funktion: "Pronation der Unterarmgelenke",
    innervation: "N. medianus",
    clinicalRelevance:
      "Liegt in der Tiefe, ausgespannt zwischen Radius und Ulna, der Membrana interossea aufliegend und vom M. flexor digitorum profundus bedeckt — ein Beispiel dafür, dass nicht jeder funktionell wichtige Muskel für die manuelle Untersuchung zugänglich ist.",
    palpationHint: "Nicht palpierbar und nicht provozierbar — liegt zu tief und ist vollständig bedeckt.",
    transferQ: "Warum lässt sich der M. pronator quadratus in der manuellen Untersuchung weder palpieren noch provozieren?",
    transferOptions: [
      {
        label: "Weil er in der Tiefe liegt, der Membrana interossea aufliegt und vom M. flexor digitorum profundus bedeckt wird",
        correct: true,
      },
      { label: "Weil er beim Hund funktionslos ist", correct: false },
      { label: "Weil er nur bei Katzen vorkommt", correct: false },
      { label: "Weil er sich außerhalb des Unterarms befindet", correct: false },
    ],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 14, S. 180, 183. Lage, Funktion (Pronation) und die fehlende Palpier-/Provozierbarkeit sind im Original so beschrieben. Ursprung, Ansatz und Innervation werden im Original nicht genannt. Ergänzt per Web-Recherche (23.09.2026) aus konvergenten veterinäranatomischen Fachquellen: Ursprung (palmare Radiusfläche, Membrana interossea), Ansatz (Margo interosseus ulnae) und Innervation (N. medianus). WICHTIGE EINSCHRÄNKUNG: WebFetch war in dieser Arbeitsumgebung technisch blockiert; die Ergänzung stammt aus konvergenten Websuche-Zusammenfassungen, nicht aus eigener Volltextprüfung eines Standardwerks.",
  },
  {
    id: "extensoren-karpus-zehen",
    name: "Extensorenmuskulatur des Unterarms (Karpus/Zehen)",
    origin: "Crista supracondylaris lateralis, Epicondylus lateralis humeri und das laterale Kollateralligament",
    insertion: "Im distalen Drittel gehen die Muskeln in ihre jeweiligen Endsehnen über (im Quellentext keine einzelnen Ansatzpunkte benannt)",
    funktion:
      "Extension von Karpalgelenk und Zehen. Im Einzelnen: M. extensor carpi radialis (Extension Karpus), M. extensor carpi ulnaris (Extension Karpus mit Radialabduktion), M. extensor digitorum communis und M. extensor digitorum lateralis (zusätzlich Extension der Zehen).",
    innervation: "N. radialis (Ramus profundus) — versorgt alle vier Muskeln dieser Gruppe",
    clinicalRelevance:
      "Die vier Muskeln — M. extensor carpi radialis, M. extensor carpi ulnaris, M. extensor digitorum communis und M. extensor digitorum lateralis — werden in der Untersuchung gemeinsam betrachtet, da sie denselben Verlauf und dieselbe Region teilen. Erst eine gezielte Zusatzbewegung (z. B. Zehenflexion oder Radialabduktion) trennt sie diagnostisch voneinander.",
    palpationHint:
      "Palpation von der Crista supracondylaris lateralis, dem Epicondylus lateralis humeri und dem lateralen Kollateralligament nach distal, so weit sich Muskulatur tasten lässt.",
    transferQ: "Wie lässt sich der M. extensor carpi ulnaris gezielt von den übrigen Extensoren des Unterarms unterscheiden?",
    transferOptions: [
      { label: "Durch zusätzliche Radialabduktion mit Extension im Karpus bei der Schmerzprovokation", correct: true },
      { label: "Er ist der einzige Extensor, der überhaupt schmerzhaft werden kann", correct: false },
      { label: "Durch zusätzliche Flexion im Ellenbogengelenk", correct: false },
      { label: "Er lässt sich gar nicht von den anderen unterscheiden", correct: false },
    ],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 14, S. 183f. Ursprungsregion, die gemeinsame Untersuchung der vier Muskeln sowie die jeweils spezifische Zusatzbewegung zur diagnostischen Differenzierung (Carpusflexion für M. ext. carpi radialis, zusätzliche Zehenflexion für die Mm. ext. digitorum, Radialabduktion für M. ext. carpi ulnaris) sind im Original so beschrieben. Einzelne Ansatzpunkte und die Innervation werden im Original nicht genannt. Ergänzt per Web-Recherche (23.09.2026) aus konvergenten veterinäranatomischen Fachquellen: Innervation (N. radialis, Ramus profundus, für alle vier Muskeln dieser Gruppe). WICHTIGE EINSCHRÄNKUNG: WebFetch war in dieser Arbeitsumgebung technisch blockiert; die Ergänzung stammt aus konvergenten Websuche-Zusammenfassungen, nicht aus eigener Volltextprüfung eines Standardwerks.",
  },
  {
    id: "flexoren-karpus-zehen",
    name: "Flexorenmuskulatur des Unterarms (Karpus/Zehen)",
    origin: "Epicondylus medialis humeri bis kaudomedial zum Olekranon",
    insertion: "Ziehen fleischig deutlich weiter nach distal als die Extensoren (im Quellentext keine einzelnen Ansatzpunkte benannt)",
    funktion:
      "Flexion von Karpalgelenk und Zehen. Im Einzelnen: M. flexor carpi radialis und M. flexor carpi ulnaris (Flexion Karpus), Mm. flexor digitorum superficialis et profundus (zusätzlich Flexion der Zehen).",
    innervation:
      "Gemischt, je nach Einzelmuskel: M. flexor carpi radialis und M. flexor digitorum superficialis über den N. medianus; M. flexor carpi ulnaris über den N. ulnaris; M. flexor digitorum profundus gemischt (medialer Kopf N. ulnaris, lateraler Kopf N. medianus).",
    clinicalRelevance:
      "M. flexor carpi radialis und M. flexor carpi ulnaris gelten als Antischwerkraftmuskeln: Ersterer besteht zu 60 % aus ermüdungsresistenten Typ-I-Fasern, die beiden Köpfe des M. flexor carpi ulnaris sogar zu 50–80 %.",
    palpationHint:
      "Palpation vom Epicondylus medialis humeri bis zum Olekranon und von dort nach distal, so weit sich Muskulatur tasten lässt — am oben oder unten liegenden Bein möglich.",
    transferQ: "Warum gelten M. flexor carpi radialis und M. flexor carpi ulnaris als Antischwerkraftmuskeln?",
    transferOptions: [
      { label: "Weil sie einen hohen Anteil ermüdungsresistenter Typ-I-Fasern besitzen (60 % bzw. 50–80 %)", correct: true },
      { label: "Weil sie ausschließlich im Liegen aktiv sind", correct: false },
      { label: "Weil sie keine Sehnen besitzen", correct: false },
      { label: "Weil sie nur bei jungen Hunden vorhanden sind", correct: false },
    ],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 14, S. 180, 184. Ursprungsregion, die gemeinsame Untersuchung, die Rolle als Antischwerkraftmuskeln mit den genannten Faseranteilen sowie die diagnostische Differenzierung über Zusatzbewegungen sind im Original so beschrieben. Einzelne Ansatzpunkte und die Innervation werden im Original nicht genannt. Ergänzt per Web-Recherche (23.09.2026) aus konvergenten veterinäranatomischen Fachquellen: die gemischte Innervation der vier Einzelmuskeln (N. medianus für M. flexor carpi radialis/M. flexor digitorum superficialis, N. ulnaris für M. flexor carpi ulnaris, gemischt für M. flexor digitorum profundus). WICHTIGE EINSCHRÄNKUNG: WebFetch war in dieser Arbeitsumgebung technisch blockiert; die Ergänzung stammt aus konvergenten Websuche-Zusammenfassungen, nicht aus eigener Volltextprüfung eines Standardwerks.",
  },
  {
    id: "biceps-femoris",
    name: "M. biceps femoris",
    origin: "Tuber ischiadicum (Sitzbeinhöcker, lateraler Rand) sowie kaudoventrale Anteile des Lig. sacrotuberale (Lage: Hintergliedmaße, oberflächlich kaudal des M. vastus lateralis)",
    insertion:
      "Zweigeteilt: Pars cranialis strahlt in die Fascia lata/Patellaregion ein, Pars caudalis zieht zur Tuberositas tibiae/Crista tibiae und über die Fersenbeinsehne selbstständig zum Tuber calcanei (Fersensehnenstrang)",
    funktion:
      "Extension und Abduktion im Hüftgelenk. Die Pars cranialis extendiert zusätzlich das Kniegelenk; die Pars caudalis wirkt in der Hangbeinphase als Kniegelenkflexor, in der Stützbeinphase dagegen als Kniegelenkextensor. Beide Anteile extendieren zusätzlich das Sprunggelenk.",
    innervation: "N. ischiadicus — Pars cranialis über den Ramus peroneus (fibularis) communis, Pars caudalis über den Ramus tibialis",
    clinicalRelevance:
      "Ein gutes Beispiel dafür, dass ein Muskel je nach Belastungsphase genau gegenteilige Funktionen am selben Gelenk übernehmen kann — die Pars caudalis beugt das Knie beim Vorführen des Beins, streckt es aber, sobald das Bein Gewicht trägt.",
    palpationHint: "Liegt oberflächlich kaudal des M. vastus lateralis am Oberschenkel.",
    transferQ: "Warum kann die Pars caudalis des M. biceps femoris das Kniegelenk sowohl beugen als auch strecken?",
    transferOptions: [
      {
        label: "Weil ihre Funktion von der Belastungsphase abhängt — Flexion in der Hangbeinphase, Extension in der Stützbeinphase",
        correct: true,
      },
      { label: "Weil der Muskel bei jedem Schritt zufällig unterschiedlich reagiert", correct: false },
      { label: "Weil nur die Pars cranialis überhaupt eine Funktion am Kniegelenk hat", correct: false },
      { label: "Weil der Muskel ausschließlich das Hüftgelenk bewegt", correct: false },
    ],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 8 (Knieregion), S. 91. Die phasenabhängige Doppelfunktion der Pars caudalis, die Funktion der Pars cranialis sowie die Hüft- und Sprunggelenkfunktion sind im Original so beschrieben. Ursprung, Ansatz und Innervation werden im Original nicht genannt. Ergänzt per Web-Recherche (23.09.2026) aus konvergenten veterinäranatomischen Fachquellen (u. a. IMAIOS vet-Anatomy, PetMassage Institute): Ursprung (Tuber ischiadicum, Lig. sacrotuberale), Ansatz (Pars cranialis: Fascia lata/Patella; Pars caudalis: Tuberositas tibiae/Tuber calcanei) und Innervation (N. ischiadicus mit getrennten Ästen für Pars cranialis/caudalis). Die Ansatzangabe zur Pars caudalis am Tuber calcanei stimmt mit der unabhängig gelesenen Beschreibung bei Koch/Fischer, Lahmheitsuntersuchung beim Hund, Kap. 5.3.2 (S. 88), überein — dort wird die \"Fersenbeinsehne des M. biceps femoris\" mit selbstständigem Ansatz am Tuber calcanei beschrieben, was diese Web-Ergänzung zusätzlich stützt. WICHTIGE EINSCHRÄNKUNG: WebFetch war in dieser Arbeitsumgebung technisch blockiert; die Ergänzung stammt aus konvergenten Websuche-Zusammenfassungen, nicht aus eigener Volltextprüfung eines Standardwerks.",
  },
  {
    id: "semitendinosus",
    name: "M. semitendinosus",
    origin: "Tuber ischiadicum (lateraler Rand), zwischen M. biceps femoris und M. semimembranosus",
    insertion:
      "Medialfläche der Tibia kranial der Flexorenmuskulatur sowie gemeinsam mit dem M. biceps femoris am Tuber calcanei (Fersensehnenstrang)",
    funktion: "Extension von Hüft- und Sprunggelenk; am Kniegelenk wirkt er dagegen flektierend.",
    innervation: "N. tibialis (Ast des N. ischiadicus)",
    clinicalRelevance:
      "Einer von drei Muskeln, die gemeinsam den Pes anserinus bilden (mit M. gracilis und M. sartorius) — bei schmerzhafter Druckpalpation an der medialen Kniegelenkseite müssen diese drei Muskeln gezielt voneinander differenziert werden, um den tatsächlich betroffenen Muskel zu behandeln.",
    palpationHint:
      "Differenzierung von M. gracilis und M. sartorius über eine gezielte Kombination aus Gelenkstellungen: Extension im Knie kombiniert mit Flexion der Hüfte und Flexion im Sprunggelenk provoziert gezielt den M. semitendinosus.",
    transferQ: "Welche Bewegungskombination provoziert gezielt den M. semitendinosus, ohne M. gracilis oder M. sartorius stark mitzubelasten?",
    transferOptions: [
      { label: "Extension im Kniegelenk mit Flexion der Hüfte und Flexion im Sprunggelenk", correct: true },
      { label: "Extension im Kniegelenk mit Abduktion der Hüfte", correct: false },
      { label: "Flexion im Kniegelenk mit Extension der Hüfte", correct: false },
      { label: "Reine Adduktion der Hüfte", correct: false },
    ],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 8, S. 91, 92. Funktion, Zugehörigkeit zum Pes anserinus und die spezifische Provokationsbewegung zur Differenzierung von M. gracilis/M. sartorius sind im Original so beschrieben. Ursprung, Ansatz und Innervation werden im Original nicht genannt. Ergänzt per Web-Recherche (23.09.2026) aus konvergenten veterinäranatomischen Fachquellen: Ursprung (Tuber ischiadicum), Ansatz (Medialfläche Tibia, gemeinsam mit M. biceps femoris am Tuber calcanei) und Innervation (N. tibialis). Der gemeinsame Ansatz am Tuber calcanei deckt sich mit der unabhängig gelesenen Beschreibung bei Koch/Fischer, Lahmheitsuntersuchung beim Hund, Kap. 5.3.2 (S. 88), wo der M. semitendinosus als Verstärkungsanteil des Fersensehnenstrangs beschrieben wird. WICHTIGE EINSCHRÄNKUNG: WebFetch war in dieser Arbeitsumgebung technisch blockiert; die Ergänzung stammt aus konvergenten Websuche-Zusammenfassungen, nicht aus eigener Volltextprüfung eines Standardwerks.",
  },
  {
    id: "gracilis",
    name: "M. gracilis",
    origin: "Symphysis pelvina (Beckensymphyse) über die Sehnenplatte (Tendo symphysialis)",
    insertion:
      "Kranialer Tibiarand sowie gemeinsam mit dem M. semitendinosus am Tuber calcanei (Fersensehnenstrang)",
    funktion: "Adduktion und etwas Extension im Hüftgelenk, Flexion im Kniegelenk, Extension im Sprunggelenk.",
    innervation: "N. obturatorius",
    clinicalRelevance:
      "Wie M. sartorius und M. semitendinosus einer der drei Muskeln des Pes anserinus an der Medialseite des Knies — differenziert wird er von den beiden anderen über eine gezielte Kombination aus Knie- und Hüftgelenkstellung.",
    palpationHint: "Provokation durch Extension im Kniegelenk kombiniert mit Abduktion der Hüfte.",
    transferQ: "Welche Bewegungskombination provoziert gezielt den M. gracilis?",
    transferOptions: [
      { label: "Extension im Kniegelenk mit Abduktion der Hüfte", correct: true },
      { label: "Flexion im Kniegelenk mit Extension der Hüfte", correct: false },
      { label: "Extension im Kniegelenk mit Flexion der Hüfte und Flexion im Sprunggelenk", correct: false },
      { label: "Innenrotation der Hüfte allein", correct: false },
    ],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 8, S. 91, 92. Funktion, Zugehörigkeit zum Pes anserinus und die spezifische Provokationsbewegung sind im Original so beschrieben. Ursprung, Ansatz und Innervation werden im Original nicht genannt. Ergänzt per Web-Recherche (23.09.2026) aus konvergenten veterinäranatomischen Fachquellen: Ursprung (Symphysis pelvina), Ansatz (kranialer Tibiarand, gemeinsam mit M. semitendinosus am Tuber calcanei) und Innervation (N. obturatorius). Der gemeinsame Ansatz am Tuber calcanei deckt sich mit der unabhängig gelesenen Beschreibung bei Koch/Fischer, Lahmheitsuntersuchung beim Hund, Kap. 5.3.2 (S. 88), wo der M. gracilis als Verstärkungsband des Fersensehnenstrangs beschrieben wird. WICHTIGE EINSCHRÄNKUNG: WebFetch war in dieser Arbeitsumgebung technisch blockiert; die Ergänzung stammt aus konvergenten Websuche-Zusammenfassungen, nicht aus eigener Volltextprüfung eines Standardwerks.",
  },
  {
    id: "sartorius",
    name: "M. sartorius",
    origin:
      "Zweigeteilt: Pars cranialis von der Spina iliaca ventrocranialis, Pars caudalis von der Crista iliaca zwischen den beiden kranialen Darmbeinstacheln",
    insertion: "Pars cranialis: Patella und mediale Kniefaszie nahe der Patella; Pars caudalis: kranialer Tibiarand",
    funktion: "Flexion und Adduktion im Hüftgelenk, Extension im Kniegelenk.",
    innervation: "N. femoralis",
    clinicalRelevance:
      "Dritter Muskel des Pes anserinus. Überlagert den M. vastus medialis vollständig — bei dessen Palpation muss die Hüfte etwas flektiert werden, um den M. sartorius zu entspannen und nicht mitzupalpieren.",
    palpationHint: "Provokation durch Flexion im Kniegelenk kombiniert mit Extension der Hüfte.",
    transferQ: "Warum muss die Hüfte bei der Palpation des M. vastus medialis leicht flektiert werden?",
    transferOptions: [
      { label: "Weil der M. sartorius den M. vastus medialis vollständig überlagert und durch Hüftflexion entspannt wird", correct: true },
      { label: "Weil der M. vastus medialis sonst reißen könnte", correct: false },
      { label: "Weil die Hüftflexion den M. vastus medialis direkt anspannt", correct: false },
      { label: "Weil dies keinen Einfluss auf die Palpation hat", correct: false },
    ],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 8, S. 91f. Funktion, Zugehörigkeit zum Pes anserinus, die spezifische Provokationsbewegung sowie die Überlagerung des M. vastus medialis (mit der daraus folgenden Palpationstechnik) sind im Original so beschrieben. Ursprung, Ansatz und Innervation werden im Original nicht genannt. Ergänzt per Web-Recherche (23.09.2026) aus konvergenten veterinäranatomischen Fachquellen: der zweigeteilte Ursprung (Pars cranialis/caudalis), die getrennten Ansätze und die Innervation (N. femoralis). HINWEIS zur Funktion: Die Web-Quellen beschreiben eine gegenläufige Funktion der beiden Anteile am Kniegelenk (Pars cranialis streckt, Pars caudalis beugt das Knie), während Hárrer nur eine einheitliche Funktion (\"Extension im Kniegelenk\") angibt, ohne nach Anteilen zu differenzieren — die hier übernommene Funktionsangabe folgt weiterhin Hárrer, die genauere Web-Differenzierung ist nicht eingearbeitet, um keine unbelegte Vermischung zweier Quellen zu erzeugen. WICHTIGE EINSCHRÄNKUNG: WebFetch war in dieser Arbeitsumgebung technisch blockiert; die Ergänzung stammt aus konvergenten Websuche-Zusammenfassungen, nicht aus eigener Volltextprüfung eines Standardwerks.",
  },
  {
    id: "tensor-fasciae-latae",
    name: "M. tensor fasciae latae",
    origin: "Tuber coxae",
    insertion:
      "Fascia lata, die weiter zur Patella und zum Lig. patellae zieht (entspricht dem Tractus iliotibialis zur Lateralseite des Knies)",
    funktion: "Abduktion und Flexion im Hüftgelenk, Extension im Kniegelenk.",
    innervation: "N. gluteus cranialis",
    clinicalRelevance:
      "Der Tractus iliotibialis, in den der Muskel einstrahlt, stabilisiert das Kniegelenk von lateral. Ist der M. tensor fasciae latae verkürzt — was häufig vorkommt —, lateralisiert er die Patella. Das macht ihn besonders bei Patelladysplasie zu einer wichtigen Struktur, die gezielt mitbeurteilt werden sollte.",
    palpationHint: "Liegt proximal am lateralen Oberschenkel; der M. vastus lateralis zieht distal von ihm weiter zur Patella.",
    transferQ: "Warum lohnt sich bei Patelladysplasie ein gezielter Blick auf den M. tensor fasciae latae?",
    transferOptions: [
      { label: "Weil ein verkürzter M. tensor fasciae latae die Patella nach lateral zieht", correct: true },
      { label: "Weil der Muskel bei Patelladysplasie immer gerissen ist", correct: false },
      { label: "Weil er keinerlei Verbindung zum Kniegelenk hat", correct: false },
      { label: "Weil er ausschließlich das Sprunggelenk beeinflusst", correct: false },
    ],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 8, S. 91f. Funktion, die stabilisierende Rolle des Tractus iliotibialis sowie der Zusammenhang zwischen Verkürzung des Muskels und Patella-Lateralisation (insbesondere bei Patelladysplasie) sind im Original so beschrieben. Ursprung, Ansatz und Innervation werden im Original nicht genannt. Ergänzt per Web-Recherche (23.09.2026) aus konvergenten veterinäranatomischen Fachquellen: Ursprung (Tuber coxae), Ansatz (Fascia lata, darüber Patella/Lig. patellae) und Innervation (N. gluteus cranialis). WICHTIGE EINSCHRÄNKUNG: WebFetch war in dieser Arbeitsumgebung technisch blockiert; die Ergänzung stammt aus konvergenten Websuche-Zusammenfassungen, nicht aus eigener Volltextprüfung eines Standardwerks.",
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

const KNOWLEDGE: KnowledgeSeed[] = [
  {
    id: "quadriceps",
    category: "ANATOMIE",
    title: "Warum Muskelatrophie nach einer Knie-OP mehr sagt als das äußere Erscheinungsbild",
    teaser:
      "Der M. quadriceps femoris als früher, objektiver Indikator für den Reha-Fortschritt nach Kreuzbandchirurgie.",
    sections: [
      {
        type: "text",
        heading: "Die Beobachtung",
        text: "Ein Hund kann wenige Wochen nach einer TPLO-Operation äußerlich fit wirken — gutes Gangbild, kein sichtbares Schonen, reizfreies Gelenk. Trotzdem kann der M. quadriceps femoris am operierten Bein deutlich weniger Muskelvolumen zeigen als auf der gesunden Seite.",
      },
      {
        type: "table",
        heading: "M. quadriceps femoris im Überblick",
        columns: ["Merkmal", "Angabe"],
        rows: [
          ["Ursprung", "vier Köpfe, u. a. Os ilium und Femur"],
          ["Ansatz", "über Patella und Ligamentum patellae an der Tuberositas tibiae"],
          ["Funktion", "Extension des Kniegelenks"],
          ["Klinische Rolle", "zentraler muskulärer Stabilisator nach Kreuzbandverletzung/TPLO"],
        ],
      },
      {
        type: "text",
        heading: "Warum das zählt",
        text: "Wird das operierte Bein im Alltag zu wenig belastet, baut sich dieser Muskel schneller ab, als es das äußere Gangbild vermuten lässt. Ein Seitenvergleich des Oberschenkelumfangs per Palpation ist deshalb ein einfacher, objektiver Indikator dafür, ob die tatsächliche Belastung im Alltag ausreicht — unabhängig davon, wie „fit“ der Hund wirkt.\n\nKlinisch bedeutet das: Muskelatrophie am operierten Bein ist kein Zeichen für einen neuen Kreuzbandriss und keine rein kosmetische Randnotiz, sondern ein Hinweis darauf, dass der Rehabilitationsplan die Belastung gezielt steigern muss — meist über ein strukturiertes Aufbautraining, nicht über Schonung.",
      },
    ],
    errorTags: ["Befund überbewertet", "Faktenwissen"],
    sourceStatus:
      "Teilverifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 8 (Knieregion), S. 91–93. Funktion und Ansatz (Ligamentum patellae an der Tuberositas tibiae) sind dort explizit bestätigt (siehe Anatomie-Item „quadriceps\" für Details). Die genauen Ursprungspunkte der Vasti-Anteile und die Innervation (N. femoralis) werden im Original nicht benannt.",
    relatedCaseIds: ["bruno"],
    relatedAnatomyIds: ["quadriceps"],
  },
  {
    id: "biceps",
    category: "ANATOMIE",
    title: "Bizepssehnen-Tendinopathie: warum ein Muskel über zwei Gelenke zum Problem wird",
    teaser:
      "Der M. biceps brachii zieht über Schulter und Ellenbogen — genau das macht ihn empfindlich für Überlastung bei aktiven Hunden.",
    sections: [
      {
        type: "text",
        heading: "Zwei Gelenke, ein Muskel",
        text: "Der M. biceps brachii entspringt am Tuberculum supraglenoidale der Scapula und setzt an der Tuberositas radii an, mit einer Ansatzschleife auch an der proximalen Ulna. Damit wirkt er auf zwei Gelenke gleichzeitig: Er beugt den Ellenbogen und streckt gleichzeitig die Schulter.\n\nGenau diese zweigelenkige Funktion macht ihn bei aktiven, sportlich geforderten Hunden zu einem häufigen Sitz von Tendinopathien — vor allem nach wiederholter Überlastung der Schulter, etwa durch Sprünge, abruptes Abbremsen oder repetitive Belastung.",
      },
      {
        type: "table",
        heading: "Untersuchung im Überblick",
        columns: ["Aspekt", "Befund"],
        rows: [
          ["Palpationsort", "kraniale Schulter, Druckschmerz typischerweise nahe dem Ursprung"],
          [
            "Auslösender Test",
            "kombinierte Bewegung: Flexion Ellenbogen + Extension Schulter löst den stärksten Schmerz aus",
          ],
          ["Häufige Verwechslung", "M. triceps brachii, M. supraspinatus, M. deltoideus"],
        ],
      },
      {
        type: "text",
        heading: "Fazit",
        text: "Wer den M. biceps brachii mit benachbarten Strukturen verwechselt, wählt in der Untersuchung die falschen Provokationstests und übersieht so leicht die eigentliche Ursache.",
      },
    ],
    errorTags: ["Anatomieverwechslung", "Befund überbewertet"],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 12 (Schulterregion und skapulothorakales Gleitlager), S. 127–132. Ursprung, Ansatz und Funktion im Original bestätigt; die beschriebene Untersuchungstechnik fasst zwei im Original getrennte Tests vereinfacht zusammen.",
    relatedCaseIds: ["rocky"],
    relatedAnatomyIds: ["biceps"],
  },
  {
    id: "iliopsoas",
    category: "ANATOMIE",
    title: "M. iliopsoas: wenn ein Muskelproblem wie eine Hüftgelenkerkrankung aussieht",
    teaser:
      "Eine der häufigsten Verwechslungen in der Diagnostik sportlich aktiver Hunde — und wie man sie sicher auflöst.",
    sections: [
      {
        type: "text",
        heading: "Aufbau und Funktion",
        text: "Der M. iliopsoas setzt sich aus zwei Anteilen zusammen: dem M. psoas major, der an den Wirbelkörpern der letzten Brust-/Lendenwirbel entspringt, und dem M. iliacus, der von der Facies sacropelvina des Os ilium ausgeht. Beide vereinen sich und setzen gemeinsam am Trochanter minor des Femur an. Ihre Funktion ist die Flexion und Außenrotation des Hüftgelenks.\n\nWeil der Muskel direkt über das Hüftgelenk zieht, wird eine Überlastung dieses Muskels — eine klassische Verletzung bei sportlich aktiven Hunden, etwa im Agility — in der Untersuchung häufig mit einer echten Hüftgelenkpathologie verwechselt.",
      },
      {
        type: "table",
        heading: "Muskelverletzung vs. Gelenkpathologie",
        columns: ["Befund", "M.-iliopsoas-Überlastung", "Echte Hüftgelenkpathologie"],
        rows: [
          ["Passive Beweglichkeit der Hüfte", "schmerzfrei, voller Umfang", "schmerzhaft in alle Richtungen"],
          ["Palpation ventral der Hüfte", "schmerzhaft", "meist unauffällig"],
          ["Ortolani-Zeichen", "negativ", "kann positiv sein"],
          ["Krepitation", "nein", "möglich"],
        ],
      },
      {
        type: "text",
        heading: "Fazit",
        text: "Wer diesen Unterschied nicht gezielt prüft, läuft Gefahr, eine gut behandelbare Muskelüberlastung als Gelenkerkrankung fehlzudeuten — mit entsprechend falscher Therapieausrichtung.",
      },
    ],
    errorTags: ["Anatomieverwechslung", "Befund überbewertet"],
    sourceStatus:
      "Verifiziert: Könneker, Osteopathie in der Kleintierpraxis (ISBN 978-3-8304-9174-3), Thieme 2010, Kap. 7, Tabelle Beckengliedmaße — Ursprung (M. iliacus: Facies sacropelvina ossis ilii), Ansatz (Trochanter minor) und Funktion (Flexion, Außenrotation Hüfte, Stabilisation LWS) bestätigt. Die Differenzierung Muskel- vs. Gelenkschmerz (Tabelle in Denkgang) ist eigene Synthese aus allgemeinen Untersuchungsprinzipien, nicht wortgleich aus dieser Quelle übernommen.",
    relatedCaseIds: ["emma"],
    relatedAnatomyIds: ["iliopsoas"],
  },
  {
    id: "facettengelenke",
    category: "ANATOMIE",
    title: "Wenn Rückenschmerz zuerst wie ein Verhaltensproblem aussieht",
    teaser: "Die Facettengelenke im lumbosakralen Übergang — eine oft unterschätzte, situativ auftretende Schmerzquelle.",
    sections: [
      {
        type: "text",
        heading: "Aufbau und Funktion",
        text: "Die Facettengelenke verbinden die Wirbelbögen benachbarter Lendenwirbel und führen und begrenzen die Bewegung der Wirbelsäule, vor allem Rotation sowie Flexion und Extension. Versorgt werden sie sensibel über die Rr. dorsales der Spinalnerven.\n\nSchmerzen im lumbosakralen Übergang gehören zu den häufig unterschätzten Schmerzquellen beim Hund — nicht, weil sie selten sind, sondern weil sie sich oft anders zeigen als erwartet: nicht als durchgehende, klar sichtbare Lahmheit, sondern als situative Verhaltensänderung, etwa Zögern oder Abwehrverhalten beim Anlegen des Geschirrs.",
      },
      {
        type: "table",
        heading: "Beobachtung und Einordnung",
        columns: ["Beobachtung", "Einordnung"],
        rows: [
          ["Zögern/Abwehr beim Anlegen des Geschirrs", "situativer Schmerz bei bestimmter Bewegungsrichtung"],
          ["Keine durchgehende Lahmheit", "schließt Facettengelenkschmerz nicht aus"],
          ["Paravertebraler Druckschmerz im Übergang", "spricht für die Facettengelenke als Ursache"],
        ],
      },
      {
        type: "text",
        heading: "Untersuchung",
        text: "In der Untersuchung hilft die gezielte paravertebrale Palpation im Übergangsbereich, meist kombiniert mit Bewegungstests, um diese Schmerzquelle von einem primären Verhaltensproblem zu unterscheiden.",
      },
    ],
    errorTags: ["Anatomieverwechslung", "Befund überbewertet"],
    sourceStatus:
      "Teilverifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 16 (Die Wirbelsäule), ab S. 202 — Facettengelenke als Struktur bestätigt, „lumbosakraler Übergang\" als Begriff dort nicht wörtlich belegt. Der Verhaltensbezug (Hohmann, Kap. 10) ist noch NICHT VERIFIZIERT.",
    relatedCaseIds: ["nala"],
    relatedAnatomyIds: ["facettengelenke"],
  },
  {
    id: "huefte",
    category: "ANATOMIE",
    title: "Der Ortolani-Test: was er wirklich zeigt — und was nicht",
    teaser: "Kapsel-Band-Apparat der Hüfte, Laxität und warum ein positives Zeichen keine fertige Diagnose ist.",
    sections: [
      {
        type: "text",
        heading: "Kapsel-Band-Apparat der Hüfte",
        text: "Die Kongruenz von Femurkopf und Hüftpfanne wird maßgeblich durch das Ligamentum capitis femoris und die Gelenkkapsel gesichert — den Kapsel-Band-Apparat der Articulatio coxae. Innerviert wird die Gelenkkapsel über Äste des N. femoralis und N. ischiadicus.",
      },
      {
        type: "text",
        heading: "Hüftdysplasie: Laxität vor dem Röntgenbild",
        text: "Bei einer Hüftdysplasie liegt eine Laxität dieses Kapsel-Band-Apparats vor. Diese Laxität zeigt sich im Wachstumsalter häufig schon durch Veränderungen im Gangbild — oft bevor auf einem Röntgenbild überhaupt sichtbare knöcherne Veränderungen zu erkennen sind. Der Ortolani-Test prüft gezielt genau diese Laxität.",
      },
      {
        type: "table",
        heading: "Was ein positives Ortolani-Zeichen NICHT zeigt",
        columns: ["Häufige Fehlannahme", "Richtig ist"],
        rows: [
          ["Beweis für bereits eingetretene Arthrose", "zeigt Laxität, keine Gelenkabnutzung"],
          ["Aussage über Muskelverkürzung", "betrifft den Kapsel-Band-Apparat, nicht die Muskulatur"],
          ["Normale, bedeutungslose Gelenkvariante", "klinisch relevanter Hinweis auf Hüftdysplasie"],
          ["Test für das Kniegelenk", "prüft die Hüfte, nicht Schublade- oder Tibiakompressionstest"],
        ],
      },
    ],
    errorTags: ["Anatomieverwechslung", "Befund überbewertet"],
    sourceStatus:
      "Teilverifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 7 (Hüftregion), S. 43–48 — der Ortolani-Test (longitudinaler Druck zum Femur, Subluxation nach dorsal, Reposition mit hörbarem Klick bei Abduktion) ist dort exakt bestätigt. ACHTUNG: „Ligamentum capitis femoris\" und „Hüftdysplasie\" werden in diesem Kapitel nicht erwähnt — dieser Teil der Aussage ist etabliertes veterinärmedizinisches Wissen, aber NICHT VERIFIZIERT gegen diese spezifische Quelle.",
    relatedCaseIds: ["luna"],
    relatedAnatomyIds: ["huefte"],
  },
  {
    id: "discus",
    category: "ANATOMIE",
    title: "Bandscheibenverschleiß ist kein Ereignis, sondern ein Verlauf",
    teaser: "Wie man den langsamen, altersbedingten Elastizitätsverlust der Bandscheibe von einem akuten Vorfall unterscheidet.",
    sections: [
      {
        type: "text",
        heading: "Aufbau und Funktion",
        text: "Der Discus intervertebralis sorgt über den elastischen Nucleus pulposus und den umgebenden Anulus fibrosus für Stoßdämpfung und Beweglichkeit zwischen benachbarten Wirbelkörpern. Sensibel versorgt wird nur der äußere Anulus fibrosus, über den N. sinuvertebralis — direkt palpieren lässt sich die Bandscheibe daher nicht.",
      },
      {
        type: "text",
        heading: "Ein Verlauf, kein Ereignis",
        text: "Mit zunehmendem Alter verliert die Bandscheibe an Elastizität. Das kann zu degenerativen Veränderungen der Wirbelsäule wie einer Spondylose beitragen — typischerweise als langsamer, über Monate bis Jahre fortschreitender Prozess, nicht als plötzliches Ereignis.",
      },
      {
        type: "table",
        heading: "Chronischer Verschleiß vs. akuter Vorfall",
        columns: ["Merkmal", "Chronischer Elastizitätsverlust", "Akuter Bandscheibenvorfall"],
        rows: [
          ["Zeitlicher Verlauf", "Monate bis Jahre, schleichend", "plötzlich, akute Verschlechterung"],
          ["Rückenschmerz allein", "kein Unterscheidungsmerkmal", "kein Unterscheidungsmerkmal"],
          ["Alter allein", "kein Unterscheidungsmerkmal", "kein Unterscheidungsmerkmal"],
        ],
      },
      {
        type: "text",
        heading: "Untersuchung",
        text: "In der Untersuchung lässt sich die Bandscheibe nur indirekt einschätzen — über die Schmerzreaktion bei Druck auf die umliegende Wirbelsäule und über den Bewegungsumfang bei Rumpfrotation. Eine plötzliche, deutliche Verschlechterung ist dagegen immer ein Alarmsignal für ein akutes Geschehen und gehört zeitnah in tierärztliche Abklärung.",
      },
    ],
    errorTags: ["Befund überbewertet", "Faktenwissen"],
    sourceStatus:
      "Fachliche Grundlage: etabliertes Wissen zu altersbedingten degenerativen Bandscheiben-/Wirbelsäulenveränderungen beim Hund. Konkrete Quellenverifizierung steht noch aus — Status: DRAFT, Quelle erforderlich.",
    relatedCaseIds: ["baer"],
    relatedAnatomyIds: ["discus"],
  },
  {
    id: "rueckenmark",
    category: "ANATOMIE",
    title: "Propriozeption: das früheste Warnsignal, bevor die Lähmung sichtbar wird",
    teaser: "Warum ein gehfähiger Hund trotzdem ein ernstzunehmendes neurologisches Problem haben kann.",
    sections: [
      {
        type: "text",
        heading: "Rückenmark und Propriozeption",
        text: "Das Rückenmark leitet motorische und sensible Signale zwischen Gehirn und Hintergliedmaßen. Die Propriozeption — die Eigenwahrnehmung der Gliedmaßenposition — ist dabei ein besonders empfindlicher, früher Indikator für die Funktion des Rückenmarks. Als Teil des zentralen Nervensystems hat das Rückenmark keine periphere Innervation im eigentlichen Sinne.",
      },
      {
        type: "text",
        heading: 'Das Warnsignal: "Knuckling"',
        text: 'Eine reduzierte Propriozeption zeigt sich klinisch zum Beispiel als verzögertes Zurückstellen einer umgedrehten Pfote ("Knuckling") — der Hund merkt die falsche Position der Pfote nicht sofort und lässt sie kurz auf dem behaarten Pfotenrücken statt auf den Ballen stehen.',
      },
      {
        type: "table",
        heading: "Prüfung im Überblick",
        columns: ["Test", "Durchführung", "Auffälliger Befund"],
        rows: [
          [
            "Propriozeptionstest",
            "Pfote vorsichtig umdrehen, Rückstellzeit beobachten",
            'verzögertes oder ausbleibendes Zurückstellen ("Knuckling")',
          ],
          [
            "Gehfähigkeit allein",
            "Beobachtung des normalen Gangs",
            "kann trotz beginnender Rückenmarksbeeinträchtigung unauffällig wirken",
          ],
        ],
      },
      {
        type: "text",
        heading: "Warum das ernst genommen werden muss",
        text: "Propriozeptionsstörungen treten häufig auf, bevor eine deutliche Lähmung sichtbar wird. Gerade weil dieses Zeichen so früh auftritt und leicht übersehen wird, sollte ein auffälliger Propriozeptionstest immer ernst genommen und zeitnah tierärztlich-neurologisch abgeklärt werden — unabhängig vom Alter des Hundes.",
      },
    ],
    errorTags: ["Befund überbewertet", "Faktenwissen"],
    sourceStatus:
      "Fachliche Grundlage: etabliertes neurologisches Grundlagenwissen zur Propriozeptionsprüfung als frühem Indikator für Rückenmarksbeeinträchtigungen beim Hund. Konkrete Quellenverifizierung steht noch aus — Status: DRAFT, Quelle erforderlich.",
    relatedCaseIds: ["filou"],
    relatedAnatomyIds: ["rueckenmark"],
  },
  {
    id: "klinische-denkkette",
    category: "GRUNDLAGEN",
    title: "Die Denkstruktur hinter jedem Fall",
    teaser:
      "Anamnese, Beobachtung, Befund, Interpretation, Hypothese — warum Denkgang jeden Fall in diese Schritte zerlegt.",
    sections: [
      {
        type: "text",
        text: "Ein Fall in Denkgang fragt nicht einfach „was hat der Hund?“, sondern führt durch eine feste Denkkette — dieselbe, die auch in der Praxis Schritt für Schritt durchlaufen wird, auch wenn das oft unbewusst passiert.",
      },
      {
        type: "list",
        heading: "Die Denkkette in zehn Schritten",
        items: [
          "Anamnese",
          "Beobachtung",
          "Befunde",
          "Interpretation",
          "Hypothese",
          "Differentialdiagnosen",
          "gezielte Untersuchung",
          "Interpretation der Untersuchung",
          "Therapieplanung",
          "Reevaluation",
        ],
      },
      {
        type: "table",
        heading: "Vier oft verwechselte Begriffe",
        columns: ["Begriff", "Bedeutung"],
        rows: [
          ["Beobachtung", "Was sehe ich tatsächlich? (reine Wahrnehmung, noch ohne Bewertung)"],
          ["Befund", "Was wurde objektiv festgestellt? (z. B. per Palpation oder Test)"],
          ["Interpretation", "Was könnte dieser Befund bedeuten?"],
          ["Hypothese", "Welche Erklärung erscheint aufgrund der bisherigen Informationen plausibel?"],
        ],
      },
      {
        type: "text",
        heading: "Warum die Reihenfolge zählt",
        text: "Wer direkt von der Beobachtung zur Hypothese springt, ohne den Befund sauber vom Sehen zu trennen und ohne Interpretation als eigenen Schritt zu behandeln, überspringt genau die Stellen, an denen Denkfehler entstehen — etwa wenn ein Befund überbewertet oder eine Diagnose vorschnell gestellt wird.",
      },
    ],
    errorTags: ["Befund übersehen", "Befund überbewertet"],
    sourceStatus:
      "Fachliche Grundlage: Denkgang-eigenes Lernkonzept, siehe docs/MASTER-PROMPT.md, Abschnitt 12 (Klinisches Denken).",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "differentialdiagnosen",
    category: "GRUNDLAGEN",
    title: "Warum die zweite Möglichkeit genauso zählt wie die erste",
    teaser: "Differentialdiagnosen sind kein Nebenschauplatz, sondern Teil der eigentlichen Diagnosefindung.",
    sections: [
      {
        type: "text",
        text: "Eine Differentialdiagnose ist eine andere plausible Erklärung für dieselben Beobachtungen und Befunde — eine Möglichkeit, die ausgeschlossen oder aktiv gegen die favorisierte Hypothese abgewogen werden muss, bevor eine Diagnose als gesichert gilt.",
      },
      {
        type: "table",
        heading: "Zwei verwandte, aber unterschiedliche Denkfehler",
        columns: ["Denkfehler", "Was passiert"],
        rows: [
          [
            "Vorschnelle Diagnose",
            "Die erste plausible Erklärung wird übernommen, ohne andere Möglichkeiten überhaupt zu prüfen.",
          ],
          [
            "Differentialdiagnostik unvollständig",
            "Andere Möglichkeiten wurden zwar in Betracht gezogen, aber nicht konsequent gegen die Befundlage geprüft.",
          ],
        ],
      },
      {
        type: "text",
        heading: "Warum das mehr als eine Formalität ist",
        text: "Eine Hypothese, die keiner ernsthaften Alternative gegenübergestellt wurde, ist keine geprüfte Diagnose, sondern eine Vermutung. Erst der gezielte Vergleich — was spricht dafür, was spricht dagegen — macht aus einer Vermutung eine belastbare Einschätzung.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "vorschnelle Diagnose"],
    sourceStatus:
      "Fachliche Grundlage: Denkgang-eigenes Lernkonzept, siehe docs/MASTER-PROMPT.md, Abschnitt 12 (Klinisches Denken) und Abschnitt 14 (Fehleranalyse).",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "konfidenz-kalibrierung",
    category: "GRUNDLAGEN",
    title: "Sicher sein und richtig liegen sind zwei verschiedene Dinge",
    teaser: "Warum Denkgang nicht nur fragt, was du denkst, sondern auch, wie sicher du dir bist.",
    sections: [
      {
        type: "text",
        text: "Konfidenz-Kalibrierung bedeutet, die eigene Sicherheit mit der tatsächlichen Trefferquote abzugleichen. Vor der Auflösung eines Falls fragt Denkgang deshalb: „Wie sicher bist du dir?“ — und vergleicht diese Angabe anschließend mit dem tatsächlichen Ergebnis.",
      },
      {
        type: "table",
        heading: "Vier Kombinationen aus Sicherheit und Ergebnis",
        columns: ["Situation", "Was das bedeutet"],
        rows: [
          ["Sicher und richtig", "gute Kalibrierung — Selbsteinschätzung passt zum tatsächlichen Wissen"],
          [
            "Unsicher, aber richtig",
            "Unterkonfidenz — das Wissen war da, das Zutrauen fehlte",
          ],
          [
            "Sicher, aber falsch",
            "Überkonfidenz — besonders wichtig zu hinterfragen, da diese Fehleinschätzung im Alltag am leichtesten unbemerkt bleibt",
          ],
          [
            "Unsicher und falsch",
            "konsistent — die Unsicherheit war begründet",
          ],
        ],
      },
      {
        type: "text",
        heading: "Warum das trainierbar ist",
        text: "Kalibrierung ist keine feste Eigenschaft, sondern verbessert sich mit Übung und ehrlichem Feedback. Ziel ist nicht, immer sehr sicher zu sein, sondern dass die eigene Sicherheit zuverlässig anzeigt, wie belastbar eine Einschätzung tatsächlich ist — gerade Überkonfidenz bei falschen Einschätzungen ist der Punkt, der sich am meisten lohnt zu hinterfragen.",
      },
    ],
    errorTags: ["Überkonfidenz", "Unterkonfidenz"],
    sourceStatus:
      "Fachliche Grundlage: Denkgang-eigenes Lernkonzept, siehe docs/MASTER-PROMPT.md, Abschnitt 13 (Lernmechanik, Confidence Calibration); Kalibrierungs-Feedback ist bereits in der Fall-Auswertung umgesetzt.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "priorisierung-vs-wissen",
    category: "GRUNDLAGEN",
    title: "Wenn die richtige Antwort dabei war, aber nicht an erster Stelle",
    teaser: "Warum ein Priorisierungsfehler etwas anderes ist als ein Wissensfehler — und warum die Unterscheidung wichtig ist.",
    sections: [
      {
        type: "text",
        text: "Nicht jeder falsche erste Eindruck ist ein Wissenslücke. Wenn die richtige Ursache als zweite, alternative Möglichkeit erkannt, aber nicht als wahrscheinlichste eingestuft wurde, liegt kein Wissensfehler vor — sondern ein Priorisierungsfehler.",
      },
      {
        type: "table",
        heading: "Zwei Fehlerarten im Vergleich",
        columns: ["Fehlerart", "Was fehlt"],
        rows: [
          ["Wissensfehler", "Die richtige Ursache wurde gar nicht in Betracht gezogen."],
          [
            "Priorisierungsfehler",
            "Die richtige Ursache wurde erkannt, aber nicht als wahrscheinlichste gewichtet.",
          ],
        ],
      },
      {
        type: "text",
        heading: "Warum das für das Lernen wichtig ist",
        text: "Ein Priorisierungsfehler braucht ein anderes Training als ein Wissensfehler: Nicht mehr Fakten sind nötig, sondern mehr Übung darin, vorhandene Informationen richtig zu gewichten — etwa, welcher Befund am stärksten für eine Ursache spricht.",
      },
    ],
    errorTags: ["falsche Priorisierung"],
    sourceStatus:
      "Fachliche Grundlage: Denkgang-eigenes Lernkonzept, siehe docs/MASTER-PROMPT.md, Abschnitt 14 (Fehleranalyse); die Unterscheidung ist bereits in der Fall-Auswertungslogik umgesetzt (richtige Ursache erkannt, aber nicht priorisiert).",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "untersuchungsreihenfolge",
    category: "GRUNDLAGEN",
    title: "Warum die Reihenfolge der Untersuchung das Ergebnis beeinflusst",
    teaser: "Erst beobachten, dann anfassen: eine einfache Regel mit klinischer Konsequenz.",
    sections: [
      {
        type: "table",
        heading: "Reihenfolge und ihr Risiko",
        columns: ["Zuerst", "Risiko"],
        rows: [
          [
            "Palpation zuerst",
            "Kann das natürliche Bewegungs- und Schonverhalten verändern, bevor es unverfälscht beobachtet wurde.",
          ],
          [
            "Beobachtung zuerst",
            "Das Bewegungsbild bleibt unverfälscht; die Palpation ergänzt anschließend gezielt.",
          ],
        ],
      },
      {
        type: "text",
        heading: "Warum das mehr als eine Formalität ist",
        text: "Berührung kann Schon- oder Abwehrverhalten auslösen oder verändern, das vorher noch nicht sichtbar war. Wird zuerst palpiert, ist das ursprüngliche, unverfälschte Bewegungsbild danach nicht mehr zuverlässig zu beobachten.",
      },
      {
        type: "text",
        heading: "Und bildgebende Diagnostik?",
        text: "Aus demselben Grund gilt: Bildgebung ist meist teuer, belastend und wenig zielführend, bevor die Basisuntersuchung (Beobachtung, Palpation) abgeschlossen ist — sie liefert oft erst dann wertvolle Zusatzinformation, wenn bereits eine konkrete Verdachtsdiagnose steht.",
      },
    ],
    errorTags: ["falsche Priorisierung"],
    sourceStatus:
      "Fachliche Grundlage: bereits in der Denkgang-Falllogik hinterlegtes Prinzip (siehe src/components/CaseFlow.tsx, Feedback zur Untersuchungsreihenfolge) sowie allgemeines Prinzip der klinischen Untersuchung (Beobachtung vor Palpation, Basisuntersuchung vor Bildgebung).",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "beobachtung-vs-palpation",
    category: "UNTERSUCHUNG",
    title: "Was Beobachtung zeigt, was Palpation zeigt",
    teaser:
      "Zwei Untersuchungsschritte, zwei unterschiedliche Informationen — anhand von fünf realen Denkgang-Fällen im Vergleich.",
    sections: [
      {
        type: "text",
        text: "Beobachtung und Palpation liefern selten dieselbe Information zweimal. Die Beobachtung zeigt meist, dass und wo etwas auffällt; die Palpation liefert oft erst die Information, die eine Struktur von einer anderen unterscheidet.",
      },
      {
        type: "table",
        heading: "Fünf Fälle im Vergleich",
        columns: ["Fall", "Beobachtung zeigte", "Palpation zeigte zusätzlich"],
        rows: [
          [
            "Rocky",
            "verkürzte Schrittlänge vorne rechts, kompensatorisches Kopfnicken",
            "Druckempfindlichkeit gezielt über der Bizepssehne — lokalisiert die Ursache",
          ],
          [
            "Nala",
            "vermeidet tiefes Bücken, kurzzeitig steif nach dem Aufstehen",
            "Schmerz und Verspannung gezielt im lumbosakralen Übergang — bestätigt die Region",
          ],
          [
            "Emma",
            "verkürzter Schritt beim Wenden, vermeidet volle Hüftstreckung",
            "Schmerz bei Palpation des M. iliopsoas, Hüftgelenk selbst schmerzfrei beweglich — grenzt Muskel von Gelenk ab",
          ],
          [
            "Bruno",
            "sichtbar reduzierter Muskelumfang im Seitenvergleich",
            "messbare Atrophie bestätigt, Kniegelenk reizfrei — Belastungsdefizit statt Gelenkproblem",
          ],
          [
            "Findus",
            "steifer Gang nach Ruhephasen, vorsichtiges Aufstehen",
            "diffuse, nicht punktuelle Schmerzreaktion — spricht gegen eine einzelne betroffene Struktur",
          ],
        ],
      },
      {
        type: "text",
        heading: "Diffus oder punktuell — ein wichtiger Unterschied",
        text: "Ein punktueller Druckschmerz (wie bei Rocky oder Nala) spricht meist für eine einzelne, lokal begrenzte Struktur als Ursache. Eine diffuse, nicht punktuelle Schmerzreaktion (wie bei Findus) spricht dagegen eher gegen eine einzelne Struktur und für eine generalisierte, oft belastungsbedingte Ursache. Wer diesen Unterschied bei der Palpation nicht bewusst wahrnimmt, läuft Gefahr, einen diffusen Befund wie einen punktuellen zu behandeln — und damit die falsche Struktur in den Fokus zu rücken.",
      },
    ],
    errorTags: ["Befund übersehen", "Befund überbewertet"],
    sourceStatus:
      "Fachliche Grundlage: Synthese aus den bereits vorhandenen Fallbeschreibungen (Beobachtungs- und Palpationsbefunde) in Denkgang — kein neues tiermedizinisches Faktenwissen, sondern eine Querschnittsbetrachtung bereits vorhandener, fallspezifischer Inhalte.",
    relatedCaseIds: ["findus", "rocky", "nala", "emma", "bruno"],
    relatedAnatomyIds: [],
  },
  {
    id: "ganganalyse-gangbild",
    category: "UNTERSUCHUNG",
    title: "Ganganalyse – was das Gangbild verrät",
    teaser:
      "Wie man aus Trab, Standphase und Kopfbewegung die betroffene Gliedmaße erkennt, noch bevor überhaupt palpiert wird.",
    sections: [
      {
        type: "text",
        text: "Die Ganganalyse ist der erste Schritt jeder orthopädischen Untersuchung, noch vor der Palpation. Sie prüft, ob die Angaben aus der Anamnese zutreffen, identifiziert die betroffene Gliedmaße und liefert erste Hinweise auf die Art des Problems. Am aussagekräftigsten ist dabei der Trab: Er zeigt auch diskrete Lahmheiten am deutlichsten, deshalb beginnt die Ganganalyse meist mit dieser Gangart.",
      },
      {
        type: "list",
        heading: "Worauf geachtet wird",
        items: [
          "Vorführen im Schritt, Trab und Galopp — auf ebenem Untergrund, unebenem Gelände (z. B. Kies), Treppen und wenn möglich im Freien ohne Ablenkung.",
          "Beurteilung von vorne, von hinten und von der Seite, idealerweise auf einem Dreieckkurs.",
          "Der erste Eindruck beim Aufstehen, z. B. direkt nach der Anamnese-Erhebung — Anlauflahmheiten zeigen sich in den ersten Schritten oft deutlicher als später in der Ganganalyse.",
          "Verhalten beim Treppensteigen (Gewichtsverlagerung nach vorn bergab, nach hinten bergauf) und beim Springen, z. B. ins Auto.",
        ],
      },
      {
        type: "text",
        heading: "Stützbeinlahmheit erkennen",
        text: "Bei Schmerzen oder Funktionsstörungen wird die betroffene Gliedmaße weniger lang belastet als die gesunde — das Gewicht verlagert sich auf die gesunde Seite. Erkennbar ist das an einer deutlich längeren Standphase der gesunden Gliedmaße und, bei Vordergliedmaßenproblemen, an einer Kopfbewegung in Richtung des gesunden Beines. Man spricht von einer Stützbeinlahmheit. Deutlich seltener, aber leicht zu erkennen, ist die Hangbeinlahmheit: Hier wird die betroffene Gliedmaße zeitweise oder gar nicht mehr aufgesetzt.",
      },
      {
        type: "table",
        heading: "Lahmheitsgrade nach Brunnberg (zitiert nach Koch/Fischer)",
        columns: ["Grad", "Beschreibung"],
        rows: [
          ["1", "kaum gestört"],
          ["2", "gestört, aber stetig belastend"],
          ["3", "gestört, nicht stetig belastend"],
          ["4", "gestört, keine Belastung"],
        ],
      },
      {
        type: "text",
        heading: "Proximal vs. distal — eine Faustregel",
        text: "Distale Probleme (z. B. an Zehen, Pfote, Sprunggelenk) führen tendenziell zu deutlicherer Lahmheit, teils sogar zur Hangbeinlahmheit. Proximale Probleme (z. B. Hüfte, Schulter) fallen dagegen oft weniger stark auf, weil die kräftige Muskulatur um diese Gelenke stabilisierend wirkt — Ausnahmen sind starke Schmerzen (z. B. bei Knochentumoren) oder neurologische Ausfälle. Dieselbe Faustregel erklärt, warum sich eine Lahmheit auf unebenem Terrain verstärkt, wenn sie distal liegt: Bleibt sie auf unterschiedlichem Untergrund gleich ausgeprägt, spricht das eher für eine proximalere Ursache.",
      },
      {
        type: "table",
        heading: "Einzelne Beobachtungen und ihre Bedeutung (Beispiele)",
        columns: ["Beobachtung", "Möglicher Hinweis"],
        rows: [
          ["Hüpfen mit einer Hintergliedmaße", "Patellaluxation"],
          [
            "Komplette Entlastung eines Beins",
            "Trauma, Panosteitis, Neoplasie oder Kreuzbandriss mit Meniskusschaden",
          ],
          ["Kurze Schrittlänge der Hinterbeine", "Gelenkproblem, häufig Hüftgelenk betroffen"],
          [
            "Sprungverweigerung oder reduzierte Sprunghöhe",
            "eher Hüfte, Becken, Wirbelsäule oder neuromuskuläre Ursache als ein distales Gelenkproblem",
          ],
        ],
      },
      {
        type: "text",
        heading: "Wichtig für die klinische Denkkette",
        text: "Die Ganganalyse liefert Hinweise, keine Diagnose. Jede der genannten Beobachtungen kann mehrere Ursachen haben — sie engt die Differentialdiagnosen ein, ersetzt aber nicht die anschließende gezielte Palpation und ggf. Bildgebung.",
      },
    ],
    errorTags: ["Befund übersehen", "vorschnelle Diagnose", "Differentialdiagnostik unvollständig"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund – Funktionelle Anatomie, Diagnostik und Therapie (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 4 (Adspektion und Ganganalyse), S. 80–82. Untersuchungsablauf, Stützbein-/Hangbeinlahmheit, Lahmheitsgrade und die zitierten Beispiel-Beobachtungen sind im Original so beschrieben. Die Lahmheitsgrade werden dort selbst als „nach Brunnberg\" zitiert — Brunnbergs Originalpublikation wurde nicht separat geprüft, sondern als Sekundärzitat aus Koch/Fischer übernommen.",
    relatedCaseIds: ["rocky"],
    relatedAnatomyIds: [],
  },
  {
    id: "neuro-screening-orthopaedie",
    category: "UNTERSUCHUNG",
    title: "Warum jede Lahmheitsuntersuchung auch neurologisch prüft",
    teaser:
      "Ein kurzer neurologischer Check gehört in jeden orthopädischen Untersuchungsgang — Lahmheiten lassen sich nicht automatisch einem orthopädischen Leiden zuordnen.",
    sections: [
      {
        type: "text",
        text: "Vor der eigentlichen orthopädischen Untersuchung steht eine kurze Allgemeinuntersuchung: Atmung, Puls, Temperatur, kapilläre Füllungszeit, Schleimhautfarbe, Lymphknoten, Herzauskultation, Haut und allgemeine Körperkontur. Auffälligkeiten hier können bereits Hinweise liefern — etwa eine erhöhte Körpertemperatur bei hypertropher Osteodystrophie, Panosteitis oder einem akuten Schub einer Polyarthritis, oder ein regional vergrößerter Lymphknoten bei Neoplasie, Verletzung oder Infektion.",
      },
      {
        type: "text",
        heading: "Der neurologische Kurz-Check",
        text: "Lahmheiten lassen sich nicht von vornherein einem orthopädischen Leiden zuordnen — sie können ebenso neurologisch bedingt sein. Deshalb gehört ein kurzer neurologischer Untersuchungsgang in jede orthopädische Untersuchung, bevor man sich auf eine Gliedmaße oder ein Gelenk festlegt.",
      },
      {
        type: "list",
        heading: "Bestandteile des kurzen neurologischen Checks",
        items: [
          "tiefe Palpation der gesamten Wirbelsäule",
          "Drehen des Kopfes in alle Richtungen",
          "Überkötungsreaktionen der Zehen",
          "kurze Prüfung der Kopfnervenfunktionen",
          "Prüfung der Reflexantworten der wichtigsten Gliedmaßennerven",
        ],
      },
      {
        type: "text",
        heading: "Konsequenz bei Auffälligkeiten",
        text: "Zeigt dieser kurze Check Abweichungen von der Norm, reicht er nicht mehr aus — dann muss ein vollständiger neurologischer Untersuchungsgang angeschlossen werden, bevor die orthopädische Einordnung weitergeht.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "vorschnelle Diagnose", "Befund übersehen"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 5 (Untersuchung des stehenden Hundes), Abschnitt 5.1 (Voruntersuchungen), S. 82. Allgemeinuntersuchung, neurologischer Kurz-Check und die genannten Beispiel-Hinweise sind im Original so beschrieben.",
    relatedCaseIds: ["nala"],
    relatedAnatomyIds: [],
  },
  {
    id: "bizepssehnenerkrankungen",
    category: "PATHOLOGIE",
    title: "Erkrankungen der Bizepssehne — mehr als nur Tendinopathie",
    teaser:
      "Tendinitis, Tendovaginitis, Teilruptur oder Luxation — und ein einzelner Überstreckungstest, der bei einer Teilruptur oft die entscheidende Zusatzinformation liefert.",
    sections: [
      {
        type: "text",
        text: "Erkrankungen der Ursprungssehne des M. biceps brachii sind ein Sammelbegriff für mehrere verwandte, aber unterschiedliche Probleme: Tendinitis (Sehnenentzündung), Tendovaginitis (Sehnenscheidenentzündung) und Teil- oder Vollruptur der Sehne. Seltener kommt es zur Ruptur des Lig. transversum intertuberculare, wodurch die Sehne aus ihrem knöchernen Sulcus nach medial herausspringen kann — eine Bizepssehnenluxation.",
      },
      {
        type: "list",
        heading: "Mögliche Ursachen",
        items: [
          "vorangegangene Traumata",
          "Corpora libera (freie Gelenkkörper, z. B. bei Osteochondrosis dissecans), die die Sehne fortlaufend reizen",
          "knöcherne Zubildungen im Sulcus intertubercularis des Humerus",
          "degenerative Veränderungen der Sehne selbst — dann reißt sie schon bei normaler Belastung oder einem Bagatelltrauma. Die Ruptur liegt dabei meist am knöchernen Ansatz, am Tuberculum supraglenoidale.",
        ],
      },
      {
        type: "text",
        heading: "Wer ist betroffen",
        text: "Vor allem mittelgroße bis großwüchsige Hunderassen im Alter zwischen 3 und 11 Jahren, Rüden und Hündinnen gleichermaßen, meist einseitig. Bei Reizung durch Corpora libera kann es auch früher auftreten.",
      },
      {
        type: "text",
        heading: "Ein pathognomonischer Test",
        text: "Bei Teilruptur ist die Überstreckbarkeit des Ellbogengelenks bei gleichzeitiger Flexion der Schulter ein für diese Verletzung typisches (pathognomonisches) Zeichen. Zusätzlich zeigt sich oft ein tiefhängender Schultergürtel mit gebeugtem Karpal- und gestrecktem Ellbogengelenk sowie Schmerz bei Schulterstreckung und -beugung, der sich durch gleichzeitige Streckung des Ellbogens verstärkt. Bei der selteneren Sehnenluxation lässt sich das Herausspringen der Sehne aus dem Sulcus bei Streckung und anschließender Beugung der Schulter palpieren.",
      },
      {
        type: "table",
        heading: "Differentialdiagnosen nach Alter",
        columns: ["Alter", "Wichtigste Differentialdiagnose"],
        rows: [
          ["Junger Hund", "Osteochondrosis dissecans (OCD) des Schultergelenks"],
          ["Älterer Hund", "andere Bizepssehnenerkrankungen, persistierendes Tuberculum infraglenoidale"],
        ],
      },
      {
        type: "text",
        heading: "Diagnosesicherung und Therapie",
        text: "Im Röntgenbild (mediolateraler Strahlengang) zeigen sich bei einer Ruptur ein erweiterter Gelenkspalt und Verkalkungen am Sehnenansatz. Ultraschall stellt Sehnentextur und Tendovaginopathien dar, kann bei Rupturen am knöchernen Ansatz aber durch Schallauslöschung erschwert sein — in Zweifelsfällen hilft die Magnetresonanztomografie. Tendovaginopathien werden zunächst konservativ behandelt (Ruhighaltung, nichtsteroidale Antiphlogistika); bei chronischem Verlauf oder Teilruptur kommt eine Tenotomie der Bizepssehne infrage, bei Luxation die operative Rekonstruktion des gerissenen Bandes. Bei adäquater Therapie ist die Prognose günstig.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Befund übersehen", "vorschnelle Diagnose"],
    sourceStatus:
      "Verifiziert: VetCenter (Thieme), Hundekrankheiten kompakt — Erkrankungen des Bewegungsapparates, Kapitel „Erkrankungen der Ursprungssehne des Musculus biceps brachii beim Hund\" (vetcenter.thieme.de, eBook cs_8469468). Definition, Ursachen, Vorkommen, Symptome (inkl. des pathognomonischen Überstreckungstests), Differentialdiagnosen nach Alter sowie das diagnostische und therapeutische Vorgehen sind im Original so beschrieben. Die Rupturlokalisation am Tuberculum supraglenoidale deckt sich mit dem bereits verifizierten Befund aus Welter-Böller (siehe Fall „Rocky\"). Hinweis: Diese Kapitel-Datei stammt direkt von der VetCenter-Onlineplattform ohne eigenes Titelblatt — Autor/Auflage/ISBN der Printausgabe von „Hundekrankheiten kompakt\" wurden nicht separat verifiziert.",
    relatedCaseIds: ["rocky"],
    relatedAnatomyIds: ["biceps"],
  },
  {
    id: "ellbogengelenkdysplasie",
    category: "PATHOLOGIE",
    title: "Ellbogengelenkdysplasie — vier Erkrankungen unter einem Namen",
    teaser:
      "IPA, FPC, OCD und Gelenkinkongruenz: Warum „Ellbogendysplasie“ kein einzelnes Krankheitsbild ist, sondern ein Sammelbegriff mit vier sehr unterschiedlichen Ursachen.",
    sections: [
      {
        type: "text",
        text: "„Ellbogengelenkdysplasie“ (ED) ist kein einzelnes Krankheitsbild, sondern ein Oberbegriff für mehrere entwicklungsbedingte Erkrankungen des Ellbogengelenks, die einzeln oder gemeinsam auftreten können. Allen gemeinsam ist eine gestörte enchondrale Ossifikation des Epiphysenfugen- oder Gelenkknorpels, meist multifaktoriell bedingt (genetisch, mechanisch, hormonell, ernährungsphysiologisch, metabolisch).",
      },
      {
        type: "table",
        heading: "Die vier zugrunde liegenden Erkrankungen",
        columns: ["Erkrankung", "Was passiert", "Typische Rasseprädisposition"],
        rows: [
          [
            "Isolierter Processus anconaeus (IPA)",
            "Der Processus anconeus verschmilzt nicht mit der Ulna (normale Fusion zwischen der 16. und 20. Lebenswoche)",
            "Deutscher Schäferhund; auch American/Belgian Shepherd, Weimaraner, Mastiff, Bassett, Bernhardiner, Mastino, Deutsche Dogge",
          ],
          [
            "Fragmentierter Processus coronoideus medialis der Ulna (FPC)",
            "Der Processus coronoideus medialis der Ulna fragmentiert, meist durch Inkongruenz im medialen Gelenkkompartiment",
            "Rottweiler, Golden/Labrador Retriever, Berner Sennenhund, Deutscher Schäferhund, Boxer, American Staffordshire Terrier, Neufundländer",
          ],
          [
            "Osteochondrosis dissecans der Trochlea humeri (OCD)",
            "Störung der enchondralen Ossifikation am medialen Condylus humeri, mit Bildung einer Knorpelschuppe",
            "Golden und Labrador Retriever; oft gemeinsam mit FPC",
          ],
          [
            "Stufenbildung zwischen Radius und Ulna / Gelenkinkongruenz",
            "Ungleiches Längenwachstum von Radius und Ulna führt zu inkongruenten Gelenkflächen und begünstigt FPC bzw. IPA",
            "keine spezifische Rasseangabe im Original",
          ],
        ],
      },
      {
        type: "text",
        heading: "Gemeinsame Merkmale",
        text: "Betroffen sind überwiegend männliche, mittelgroße bis großwüchsige Hunde. Die Symptome beginnen meist ab dem 4. Lebensmonat, oft ein- oder beidseitig — bei beidseitigem Befall ist die Lahmheit häufig undeutlicher ausgeprägt, weil kein gesundes Bein zum Vergleich da ist.",
      },
      {
        type: "text",
        heading: "Ein kleiner, aber nützlicher Unterschied in der Standhaltung",
        text: "Bei FPC und OCD steht das Ellbogengelenk im Stand oft leicht adduziert, bei IPA eher abduziert — ein feiner, aber praktisch nützlicher Unterschied bereits bei der ersten Adspektion, lange bevor eine Diagnose feststeht.",
      },
      {
        type: "text",
        heading: "Warum die genaue Unterscheidung wichtig ist",
        text: "Welche der vier Formen vorliegt, lässt sich klinisch oft nicht sicher unterscheiden — dafür braucht es Röntgen in mindestens zwei Ebenen, bei FPC häufig zusätzlich eine Computertomografie, weil das Fragment meist mitten im Gelenk liegt und im Röntgenbild leicht übersehen wird. Unbehandelt führen alle vier Formen zu einer sekundären Arthrose; die Prognose hängt stark davon ab, wie früh Diagnose und Behandlung erfolgen.",
      },
    ],
    errorTags: ["Anatomieverwechslung", "Differentialdiagnostik unvollständig", "Faktenwissen"],
    sourceStatus:
      "Verifiziert: VetCenter (Thieme), Hundekrankheiten kompakt — Erkrankungen des Bewegungsapparates, Kapitel „Ellbogengelenkdysplasie beim Hund\" mit den Unterkapiteln zu IPA, FPC und OCD der Trochlea humeri (vetcenter.thieme.de, eBook cs_8469468). Definition, die vier Einzelerkrankungen, Rasseprädispositionen, der Standhaltungs-Unterschied (FPC/OCD adduziert vs. IPA abduziert) und das diagnostische Vorgehen sind im Original so beschrieben. Ergänzt den bereits verifizierten Befund aus Hárrer Kap. 13 (siehe Fall „Rocky\"), der Ellenbogendysplasie nur als real existierende Diagnose bestätigt hatte, ohne auf die Unterformen einzugehen. Hinweis: Diese Kapitel-Datei stammt direkt von der VetCenter-Onlineplattform ohne eigenes Titelblatt — Autor/Auflage/ISBN der Printausgabe von „Hundekrankheiten kompakt\" wurden nicht separat verifiziert.",
    relatedCaseIds: ["rocky"],
    relatedAnatomyIds: [],
  },
  {
    id: "gelenktypen-klassifikation",
    category: "BIOMECHANIK",
    title: "Gelenktypen beim Hund — warum nicht jedes Gelenk gleich beweglich ist",
    teaser:
      "Kugelgelenk, Scharniergelenk, Zapfengelenk: Die Form der Gelenkflächen bestimmt direkt, welche Bewegungen überhaupt möglich sind — und erklärt, warum die Hüfte anders instabil wird als ein Facettengelenk der Wirbelsäule.",
    sections: [
      {
        type: "text",
        text: "Gelenke werden nach mehreren, unabhängigen Kriterien eingeteilt: nach ihrer Struktur (mit oder ohne Gelenkspalt), nach ihrer Bauart (wie viele Knochen beteiligt sind) und nach ihrem Gelenktyp — also der Form der Gelenkflächen, die direkt bestimmt, um wie viele Achsen sich ein Gelenk überhaupt bewegen kann.",
      },
      {
        type: "table",
        heading: "Einteilung nach Struktur",
        columns: ["Gruppe", "Merkmal", "Beispiel"],
        rows: [
          ["Diarthrose (echtes Gelenk)", "hat einen Gelenkspalt (Synovialgelenk)", "die meisten Extremitätengelenke"],
          ["Synarthrose — Syndesmose", "unechtes Gelenk, Verbindung durch Bindegewebe", "—"],
          ["Synarthrose — Synchondrose", "unechtes Gelenk, Verbindung durch Knorpel", "—"],
          ["Synarthrose — Synostose", "unechtes Gelenk, Verbindung durch Knochen", "—"],
        ],
      },
      {
        type: "table",
        heading: "Gelenktypen und ihre Bewegungsfreiheit beim Hund",
        columns: ["Gelenktyp", "Mögliche Bewegung", "Beispiel beim Hund"],
        rows: [
          ["Kugelgelenk (Art. spheroidea)", "Bewegung nach allen Richtungen", "Hüftgelenk"],
          [
            "Eigelenk (Art. ellipsoidea)",
            "nur 2 Hauptachsen: Flexion/Extension und Abduktion/Adduktion",
            "Art. atlantooccipitalis (Kopfgelenk)",
          ],
          [
            "Sattelgelenk (Art. sellaris)",
            "ebenfalls nur 2 Hauptachsen: Flexion/Extension und Abduktion/Adduktion",
            "2. und 3. Zehengelenk",
          ],
          [
            "bikondyläres Gelenk (Art. condylaris)",
            "Bewegung nur in eine Richtung",
            "Kniekehlgelenk (Sonderform: Spiralgelenk)",
          ],
          [
            "Scharniergelenk (Ginglymus)",
            "nur Flexion und Extension — deshalb auch „Wechselgelenk“ genannt",
            "Art. humeroulnaris (Ellbogengelenk)",
          ],
          [
            "Zapfen-/Radgelenk (Art. trochoidea)",
            "Rotation um einen feststehenden Zapfen",
            "Atlantoaxialgelenk, Radioulnargelenk",
          ],
          [
            "ebenes Gelenk (Art. plana, „Schiebegelenk“)",
            "Bewegung in mehrere Richtungen, aber jeweils nur geringfügig",
            "Wirbelbogengelenke (Facettengelenke)",
          ],
          [
            "straffes Gelenk (Amphiarthrose)",
            "nur minimale Bewegung, keine ausgeprägte Bewegungsrichtung",
            "Sakroiliakalgelenk",
          ],
        ],
      },
      {
        type: "text",
        heading: "Warum Gelenkflächen nie perfekt zueinander passen",
        text: "Gelenkflächen sind nie vollständig kongruent — im entlasteten Zustand passen sie nicht exakt aufeinander. Das ist kein Konstruktionsfehler, sondern funktional sinnvoll: Unter Belastung verformt sich der Gelenkknorpel, die Kontaktfläche vergrößert sich dadurch, und der Druck verteilt sich gleichmäßiger auf den Gelenkknochen. Zu Beginn der Belastung trägt vor allem der Gelenkrand, deshalb ist der Knorpel dort dicker als in der Gelenkmitte. Diese Inkongruenz verbessert außerdem die Ernährung des Gelenkknorpels und die Gelenkschmierung.",
      },
      {
        type: "text",
        heading: "Verknüpfung zur Praxis",
        text: "Die Gelenktyp-Einteilung erklärt, warum sich Probleme an verschiedenen Gelenken so unterschiedlich äußern. Die Hüfte ist ein Kugelgelenk mit Bewegung in alle Richtungen — das macht sie beweglich, aber auch anfällig für Instabilität und Subluxation, wie sie der Ortolani-Test prüft. Die Wirbelbogengelenke (Facettengelenke) sind dagegen ebene Gelenke mit von Natur aus nur geringer Beweglichkeit in mehrere Richtungen — Schmerzen dort äußern sich seltener als Instabilität, sondern eher als schmerzhafte Bewegungseinschränkung.",
      },
    ],
    errorTags: ["Anatomieverwechslung", "Faktenwissen"],
    sourceStatus:
      "Verifiziert: Hohmann, Bewegungsapparat Hund (ISBN 978-3-13-245265-7), Thieme, 3. Auflage 2025, Kap. 5 (Das Gelenk), S. 48–50. Die drei Einteilungskriterien, alle acht Gelenktypen mit ihren caninen Beispielen sowie das Konzept der Gelenkflächen-Inkongruenz (unter Verweis im Original auf Bullough 1981 und Greenwald 1991, dort nicht separat nachgeprüft) sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: ["huefte", "facettengelenke"],
  },
  {
    id: "belastungssteuerung-nach-verletzung",
    category: "THERAPIE",
    title: "Warum kontrollierte Bewegung besser ist als komplette Ruhigstellung",
    teaser:
      "Ein komplett ruhiggestelltes Gelenk beginnt binnen Wochen zu schädigen — dosierte, kontrollierte Bewegung wirkt genau umgekehrt. Warum „Schonung“ in der Rehabilitation die falsche Standardantwort ist.",
    sections: [
      {
        type: "text",
        text: "Nach Operationen oder Verletzungen ist die intuitive Reaktion oft: das betroffene Gelenk möglichst ruhigstellen. Genau das schadet dem Gelenkknorpel aber messbar — und schneller, als man erwarten würde.",
      },
      {
        type: "list",
        heading: "Was komplette Ruhigstellung mit dem Gelenk macht",
        items: [
          "Bänder und Sehnen beginnen bereits innerhalb von 4 Wochen zu degenerieren — ihre Umsatzrate liegt bei 300–500 Tagen, sie erneuern sich also extrem langsam.",
          "Wird das Gelenk in Extension fixiert, kommt es zu Muskelkontrakturen an den Streckern und zu Knorpelschäden an den Kontaktflächen — diese Schäden sind kaum reversibel.",
          "Wird das Gelenk in Flexion fixiert, treten erste Knorpelschäden (in Richtung Atrophie) schon nach 3 Wochen auf — hier aber ohne Arthrosezeichen: nach 3-wöchigem kontrolliertem Training ist der Knorpel wieder normal dick.",
        ],
      },
      {
        type: "text",
        heading: "Auch Medikamente spielen eine Rolle",
        text: "Prednisolon reduziert die Produktion von Glykosaminoglykanen in fixierten Gelenken um das Dreifache. Aspirin hemmt die Knorpelsynthese, sodass die Remobilisierung unter Aspirin deutliche Knorpelschäden zeigt. Hyaluronsäure — ob ins Gelenk, intravenös oder peroral verabreicht — zeigt dagegen deutlich weniger Knorpelschäden und eine bessere Remobilisierung.",
      },
      {
        type: "text",
        heading: "Die Dosis macht's — in beide Richtungen",
        text: "Auch zu viel Bewegung schadet: Übertrainierte Tiere zeigen bereits nach 3 Wochen Knorpelschäden — diesmal aber in Richtung Degeneration, also irreversibel. Der Zielkorridor liegt dazwischen: Wünschenswert ist eine Gelenkimmobilisierung mit geringgradiger Restbeweglichkeit von etwa 10°, praktisch umsetzbar z. B. mit einer Schlinge. Diese knappe Bewegungsfreiheit reicht aus, um Knorpelschäden möglichst gering zu halten, ohne auf die Vorteile der Ruhigstellung ganz zu verzichten.",
      },
      {
        type: "text",
        heading: "Für die Praxis",
        text: "Die Konsequenz für die Rehabilitationsplanung: „Schonung“ als Standardantwort greift zu kurz. Entscheidend ist eine kontrollierte, langsam gesteigerte Belastung — weder komplette Ruhigstellung noch zu frühes Übertraining.",
      },
    ],
    errorTags: ["Faktenwissen", "falsche Priorisierung"],
    sourceStatus:
      "Verifiziert: Mai, Sabine, Physiotherapie und Bewegungstraining für Hunde – Rehabilitation, Massage und Hundesport (ISBN 978-3-13-240099-3), Thieme, 5. unveränderte Auflage 2022, Kap. 4.3 (Hundesport), S. 62. Alle genannten Zahlen (Zeiträume, Prednisolon-Faktor, 10°-Restbeweglichkeit) sind im Original so angegeben. Die dort abgebildete Grafik „Crosslinks“ verweist im Original auf van den Berg/Cabri, Angewandte Physiologie (Thieme 2022) — diese Sekundärquelle wurde nicht separat geprüft.",
    relatedCaseIds: ["bruno"],
    relatedAnatomyIds: [],
  },
  {
    id: "aufwaermen-abkuehlen-hund",
    category: "THERAPIE",
    title: "Aufwärmen und Abkühlen — warum Hunde keine Zufallsathleten sein sollten",
    teaser:
      "Kein Skirennläufer startet unaufgewärmt — trotzdem springen viele Hunde direkt aus dem kalten Auto in den vollen Trainingsparcours. Was beim Auf- und Abwärmen physiologisch passiert und warum es die Verletzungsgefahr senkt.",
    sections: [
      {
        type: "text",
        text: "Wenn ein Hund ruht, läuft der Muskelstoffwechsel auf Sparflamme: Die Muskulatur wird schlechter durchblutet, der Reibungswiderstand zwischen Muskelfasern und in den Gelenken ist relativ hoch, der Hund ist leicht steif. Aufwärmen bereitet den Organismus schrittweise auf die bevorstehende Anstrengung vor: Die Sauerstoffversorgung der Muskulatur nimmt zu, die Muskulatur wird weich, die Energiegewinnung für die Muskelarbeit läuft an, und die Synovia in Gelenken und Sehnenscheiden wird durch Bewegung gut verteilt und neu produziert.",
      },
      {
        type: "text",
        heading: "Warum das die Verletzungsgefahr senkt",
        text: "Diese Vorbereitung reduziert die Verletzungsgefahr durch Überdehnen oder Zerren von Muskulatur und Bandapparat erheblich. Durch die Aktivierung der Rumpfmuskulatur wird zusätzlich die Wirbelsäule stabilisiert, wodurch auch die Gefahr von Wirbelblockaden und Rückenschmerzen abnimmt.",
      },
      {
        type: "list",
        heading: "Ein praktischer Ablauf",
        items: [
          "den Hund sich nach dem Aussteigen erst in Ruhe strecken lassen",
          "kurze, schnelle Massage zum Anwärmen: großflächige, feste Streichungen mit der flachen Hand über den ganzen Körper, Klopfmassage am Rumpf, zirkuläre sanfte Streichungen an den Beinen — Verhärtungen oder Verspannungen lassen sich mit leichten, kreisförmigen Massagegriffen lösen",
          "danach die eigentliche Aufwärmrunde: etwa 10 Minuten Schritt und leichtes Joggen geradeaus, dann einige Tempowechsel und Wendungen für Beweglichkeit und Koordination",
          "zum Abschluss ein paar Gehorsamsübungen zur Steigerung der Konzentration, dann Dehnung von Schulter- und Beckengliedmaßen",
        ],
      },
      {
        type: "text",
        heading: "Hyperaktive Hunde und die Winterregel",
        text: "Hyperaktive oder sehr nervöse Hunde werden erst etwas länger im ruhigen Tempo bewegt, bis sie selbst ruhiger werden — Spiel oder Sport beginnt erst danach. Im Winter brauchen Hunde generell eine längere Aufwärmphase: mindestens 10–15 Minuten im Schritt. Wichtig: Ist der Hund einmal aufgewärmt, sollte er in Bewegung bleiben — kühlt er in einer Pause wieder ab, muss die gesamte Aufwärmphase von vorn beginnen.",
      },
      {
        type: "text",
        heading: "Abkühlen nicht vergessen",
        text: "Auch das abrupte Ablegen oder Absetzen nach intensiver Bewegung ist ungünstig: Bei zu raschem Abfall der Pulsfrequenz kann sich das periphere Blutvolumen in den weit geöffneten Gefäßen sammeln. Deshalb nach der Arbeit noch 5–10 Minuten ruhige, lockere Bewegung einplanen — zuerst langsames Joggen, dann eine Runde im Schritt —, bevor der Hund ins Auto oder in die Box kommt.",
      },
    ],
    errorTags: ["Faktenwissen", "falsche Priorisierung"],
    sourceStatus:
      "Verifiziert: Mai, Sabine, Physiotherapie und Bewegungstraining für Hunde (ISBN 978-3-13-240099-3), Thieme, 5. Auflage 2022, Kap. 4.3.5–4.3.6 (Aufwärmen, Abkühlen), S. 65–67. Physiologische Begründung, der beschriebene Ablauf (Strecken, Massage, Aufwärmrunde, Dehnung) sowie die Winterregel (10–15 Minuten) und die Abkühl-Empfehlung (5–10 Minuten) sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "ziele-bewegungstherapie",
    category: "THERAPIE",
    title: "Bewegungstherapie — mehr als „Laufen lassen“",
    teaser:
      "Bewegungstherapie in der Rehabilitation ist kein zufälliges Auslaufen, sondern gezielte Übung nach Trainingsplan unter Aufsicht — mit neun klar benennbaren Zielen.",
    sections: [
      {
        type: "text",
        text: "Bewegungstherapie kommt vor allem in der Rehabilitationsmedizin zum Einsatz — nach Verletzungen, orthopädischen Operationen oder bei nervalen Ausfällen. Sie besteht nur in den seltensten Fällen aus einfachem „Laufen lassen“: Stattdessen handelt es sich um verschiedene therapeutische Übungen, die kontrollierte, oft physiologische Bewegungsabläufe darstellen. Die Tiere arbeiten nach einem speziellen Trainingsplan unter Supervision.",
      },
      {
        type: "list",
        heading: "Ziele der therapeutischen Übungen",
        items: [
          "Wiederbenutzung der betroffenen Extremität",
          "Vergrößerung des schmerzfreien Bewegungsausmaßes der betroffenen Gelenke",
          "Reduzierung der Lahmheit",
          "Wiedererlangung gestörter Ausscheidungsfunktionen",
          "Verbesserung der Propriozeption",
          "Schulung der Koordination",
          "Aufbau von Muskelmasse und Kraft",
          "Remobilisierung fixierter Gelenke",
          "Prävention weiterer Verletzungen",
        ],
      },
      {
        type: "text",
        heading: "Warum früh beginnen so wichtig ist",
        text: "Je früher geeignete therapeutische Übungen nach einem orthopädischen Trauma einsetzen, desto eher lässt sich eine ungestörte, mühelose Bewegung wiedererlangen. Der Grund liegt vor allem in zwei Begriffen: Koordination und Propriozeption — beide verschlechtern sich durch Schonhaltung und Inaktivität weiter, je länger sie andauern.",
      },
      {
        type: "text",
        heading: "Verknüpfung zur Praxis",
        text: "Die Anpassung der jeweiligen Übungen an den individuellen Patienten und die strenge Kontrolle der korrekten Ausführung gehören zu den wichtigsten Aufgaben der Rehabilitationsmedizin — beides lässt sich nicht pauschal vorgeben. Das ergänzt das Prinzip aus „Warum kontrollierte Bewegung besser ist als komplette Ruhigstellung“: Kontrollierte Bewegung ist nicht nur das kleinere Übel gegenüber Ruhigstellung, sondern hat eigene positive Wirkungen, die eine Ruhigstellung gar nicht erst herstellen kann.",
      },
    ],
    errorTags: ["Faktenwissen", "falsche Priorisierung"],
    sourceStatus:
      "Verifiziert: Mai, Sabine, Physiotherapie und Bewegungstraining für Hunde (ISBN 978-3-13-240099-3), Thieme, 5. Auflage 2022, Kap. 5.4 (Bewegungstherapie), S. 100f. Definition, Einsatzgebiete und alle neun genannten Ziele sind im Original so aufgeführt.",
    relatedCaseIds: ["bruno"],
    relatedAnatomyIds: [],
  },
  {
    id: "bewegungstherapie-arthrose",
    category: "THERAPIE",
    title: "Bewegungstherapie bei Arthrose — worauf es ankommt",
    teaser:
      "Bei Arthrose zählt nicht die Menge an Bewegung, sondern wie sie dosiert wird: kurze, kontrollierte Einheiten mit viel Entlastung statt langer Belastung.",
    sections: [
      {
        type: "text",
        text: "Die therapeutischen Übungen bei Arthrose bestehen anfangs aus leichter, kontrollierter Arbeit zum Muskelaufbau mit möglichst geringer Gewichtsbelastung. Die Bewegungsphasen sollen kurz sein und von vielen Pausen unterbrochen werden.",
      },
      {
        type: "list",
        heading: "Praktische Bausteine",
        items: [
          "Gewichtsreduktion steht bei den meisten Patienten an erster Stelle des Trainings.",
          "Die Gewichtsbelastung der Gelenke lässt sich z. B. mittels einer Schlinge auf dem Laufband oder durch Arbeit im Unterwasserlaufband gut reduzieren.",
          "Die Gelenke sollen dabei in möglichst großem Bewegungsausmaß bewegt werden, damit die durch die Arthrose geschädigten Propriozeptoren wieder Informationen über das physiologische Bewegungsausmaß erhalten.",
          "Gelenkbeugung und -streckung lassen sich über Übungen am Physioball, mit Therabändern, im Koordinationsparcours oder beim Bergaufgehen erreichen.",
        ],
      },
      {
        type: "text",
        heading: "Aufwärmen ist bei Arthrose besonders wichtig",
        text: "Sorgfältiges Aufwärmen mit passiven ROM-Übungen (das Gelenk wird vom Therapeuten bewegt, ohne Eigenaktivität des Hundes) und Stretching ist gerade für Arthrose-Patienten wichtig. Hunde, die im kalten Wasser schwimmen, müssen danach besonders sorgfältig getrocknet werden.",
      },
      {
        type: "text",
        heading: "Der richtige Untergrund",
        text: "Hunde mit Arthrose bewegen sich lieber auf ebenem, weichem Boden — kurz geschnittene Wiesen oder ein Laufband mit federnder Oberfläche sind optimal.",
      },
    ],
    errorTags: ["Faktenwissen", "falsche Priorisierung"],
    sourceStatus:
      "Verifiziert: Mai, Sabine, Physiotherapie und Bewegungstraining für Hunde (ISBN 978-3-13-240099-3), Thieme, 5. Auflage 2022, Kap. 5.3 (Mobilisationstechniken, Einleitung vor 5.3.1), S. 85. Die genannten Prinzipien (kurze Bewegungsphasen mit vielen Pausen, Gewichtsreduktion an erster Stelle, Gewichtsentlastung via Schlinge/Unterwasserlaufband, großes Bewegungsausmaß wegen geschädigter Propriozeptoren, geeignete Übungsformen, Aufwärmen, bevorzugter Untergrund) sind im Original so beschrieben.",
    relatedCaseIds: ["findus"],
    relatedAnatomyIds: [],
  },
  {
    id: "ellenbogengelenk-teilgelenke",
    category: "BIOMECHANIK",
    title: "Das Ellenbogengelenk — drei Gelenke in einem",
    teaser:
      "Warum normales Gassigehen nicht ausreicht, um das Ellenbogengelenk in seinem vollen Bewegungsumfang zu halten — und wie eine Überlastung dort mit einem Problem ganz woanders beginnen kann.",
    sections: [
      {
        type: "text",
        text: "Das Ellenbogengelenk (Art. cubiti) ist anatomisch einfach, funktionell aber ein zusammengesetztes Gelenk aus drei Teilgelenken, die sich gegenseitig in ihrer Bewegung beeinflussen.",
      },
      {
        type: "table",
        heading: "Die drei Teilgelenke",
        columns: ["Teilgelenk", "Gelenktyp", "Bewegung"],
        rows: [
          [
            "Art. humeroulnaris",
            "zweiachsiges Sattelgelenk",
            "Flexion/Extension und Ab-/Adduktion — sehr kongruente Gelenkflächen mit wenig Roll-, aber viel Gleitbewegung",
          ],
          [
            "Art. humeroradialis",
            "dreiachsiges Kugelgelenk",
            "Flexion/Extension; Ab-/Adduktion wird durch die Kollateralbänder begrenzt; das Radiusköpfchen bewegt sich bei Pro- und Supination mit",
          ],
          [
            "Art. radioulnaris proximalis",
            "Teil des proximalen Radioulnargelenks",
            "gehört anatomisch zum Ellenbogen, funktionell aber zum Unterarm — daher gemeinsam mit den Unterarmgelenken betrachtet",
          ],
        ],
      },
      {
        type: "text",
        heading: "Bewegungsausmaß",
        text: "Physiologisch lässt sich das Ellenbogengelenk passiv um etwa 30–36° flektieren und um etwa 160–166° extendieren; dazu kommen etwa 20° passive Pronation und etwa 50° passive Supination.",
      },
      {
        type: "text",
        heading: "Warum Gassigehen nicht reicht",
        text: "Eine im Original zitierte Studie (die „Jena-Studie“) zeigt: Obwohl das Ellenbogengelenk insgesamt eine Beweglichkeit von rund 135° hat, nutzen Hunde während der normalen Fortbewegung tatsächlich nur etwa 20° davon. Reines Spazierengehen bewegt das Gelenk also nur durch einen kleinen Ausschnitt seines möglichen Bewegungsumfangs — für die Gesunderhaltung des Gelenkknorpels braucht es zusätzlich gezielte endgradige Bewegungsmobilisation und unterschiedliche Belastungsreize, nicht nur Spaziergänge.",
      },
      {
        type: "text",
        heading: "Eine Überlastungskette, die woanders beginnt",
        text: "Verlagert ein Hund wegen Problemen an der Hintergliedmaße dauerhaft mehr Gewicht nach vorne, wird das Ellenbogen- und Schultergelenk zusätzlich belastet. Über die Zeit kann das zu verspannter Schultergürtelmuskulatur führen, wodurch sich die Beweglichkeit der Skapula auf dem Thorax einschränkt. Das schränkt wiederum die horizontale Auslenkung der Vordergliedmaße ein — Schulter- und Ellenbogengelenk werden dadurch noch stärker belastet, obwohl sie dafür nicht ausgerichtet sind. Knorpeldegeneration und Lahmheit können die Folge sein — eine Kette, die mit einem Problem an ganz anderer Stelle beginnt.",
      },
    ],
    errorTags: ["Befund übersehen", "Differentialdiagnostik unvollständig", "Faktenwissen"],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 13 (Ellenbogenregion), S. 165. Die drei Teilgelenke, ihre Gelenktypen/Bewegungen, die genannten ROM-Werte sowie die Überlastungskette (Hintergliedmaßen-Problem → Gewichtsverlagerung nach vorn → Schultergürtel-Verspannung → Skapulaeinschränkung → Schulter-/Ellenbogen-Überlastung) sind im Original so beschrieben. Die „Jena-Studie“ wird im Original nur namentlich zitiert, ohne vollständige bibliografische Angabe — als Sekundärzitat übernommen, nicht eigenständig verifiziert.",
    relatedCaseIds: ["rocky"],
    relatedAnatomyIds: ["biceps"],
  },
  {
    id: "toe-in-toe-out-nervenkompression",
    category: "PATHOLOGIE",
    title: "Toe-in/Toe-out — wenn eine Fußstellung einen Nerv einklemmt",
    teaser:
      "Eine unscheinbare Zehenstellung kann über einen angespannten Muskel einen peripheren Nerv reizen — mit direkten Folgen fürs Gangbild.",
    sections: [
      {
        type: "text",
        text: "Steht ein Hund dauerhaft in Toe-in- oder Toe-out-Position, ist das mehr als eine kosmetische Fußstellung: Toe-in entspricht einer Pronationsstellung des Unterarms, Toe-out einer Supinationsstellung. Beides verändert die Belastung von Karpus und Zehen (Mehrbelastung des medialen oder lateralen Strahls) und wirkt sich über die Statik bis in Schultergelenk und Wirbelsäule aus.",
      },
      {
        type: "text",
        heading: "Toe-in: M. supinator unter Spannung",
        text: "Bei vermehrter Toe-in-Stellung gerät der M. supinator unter Spannung. Der N. radialis zieht durch diesen Muskel hindurch und kann dadurch gereizt werden (Mechanosensitivität, Leitungsprobleme). Mögliche Folgen: Der Hund schleift die Vorderpfote oder beknabbert das Versorgungsgebiet des N. radialis (medial am Karpus), weil dort Hyperästhesien auftreten.",
      },
      {
        type: "text",
        heading: "Toe-out: M. pronator teres unter Spannung",
        text: "Bei vermehrter Toe-out-Stellung gerät stattdessen der M. pronator teres unter Spannung und kann den N. medianus reizen. Das Versorgungsgebiet des N. medianus liegt an den distalen Zehen — dort beknabbert sich das Tier möglicherweise.",
      },
      {
        type: "text",
        heading: "Warum das klinisch wichtig ist",
        text: "Behandelt man den betroffenen Muskel (M. supinator bzw. M. pronator teres), die angrenzenden Extensoren und den Nerv selbst, verändert sich das Gangbild häufig unmittelbar — das Schleifen der Pfote lässt spürbar nach, weil der Nerv wieder besser leiten kann. Voraussetzung ist, dass die Kompression den Nerv noch nicht dauerhaft geschädigt hat und das Überköten tatsächlich durch dieses Entrapment verursacht wird und nicht durch eine andere Ursache.",
      },
      {
        type: "text",
        heading: "Verknüpfung zur Praxis",
        text: "Eine unauffällige Fußfehlstellung lohnt sich also genauer anzuschauen, bevor man ein Schleifen der Pfote vorschnell einer orthopädischen oder neurologischen Ursache an ganz anderer Stelle zuschreibt.",
      },
      {
        type: "text",
        heading: "Wichtiger Hinweis zur Quellenlage",
        text: "Hárrers eigenes Kapitel zur Neurotension (Kap. 17, S. 279) nennt in einer allgemeinen Ursachenliste für Nervenkompressionen denselben Mechanismus (hypertoner M. supinator komprimiert N. radialis) — aber unter der Bezeichnung „toe out position\" statt „Toe-in\" wie hier in Kap. 14. Der Muskel-Nerv-Bezug ist in beiden Kapiteln identisch, nur die Fußstellungsbezeichnung widerspricht sich. Diese Seite folgt der ausführlicheren Darstellung aus Kap. 14, die beide Stellungen einander gegenüberstellt; die Diskrepanz zwischen den Kapiteln ist damit aber nicht aufgelöst, sondern lediglich dokumentiert. Ein Abgleich mit externer Fachliteratur zum Supinatortunnel-/Supinatorlogensyndrom (humanmedizinisch, u. a. Springer Nature, PubMed, DocCheck) ergab keine Bestätigung für eine Fußstellungs-Zuordnung — dort werden andere Kompressionsursachen genannt. Die Zuordnung scheint eine Hárrer-eigene klinische Beobachtung zu sein. Vor einer praktischen Anwendung sollte sie fachlich bzw. durch klinische Erfahrung zusätzlich geprüft werden.",
      },
      {
        type: "text",
        heading: "Eine mögliche, aber unbelegte Erklärung",
        text: "Denkbar wäre, dass Kap. 14 einen exzentrisch überdehnten (reaktiv hypertonen) und Kap. 17 einen konzentrisch verkürzten (strukturell hypertonen) M. supinator meint — zwei unterschiedliche, in der Physiotherapie durchaus bekannte Mechanismen, die zur selben Kompression führen könnten. Das ist ausdrücklich eine eigene Überlegung und keine Aussage aus Hárrers Buch: Weder Kap. 14 (\"kommt der M. supinator unter Spannung\") noch Kap. 17 (\"Hypertonie des M. supinator\") differenzieren im Originaltext zwischen exzentrischem und konzentrischem Hypertonus. Bis eine echte Quelle das bestätigt, bleibt es eine Hypothese.",
      },
    ],
    errorTags: ["Befund übersehen", "Differentialdiagnostik unvollständig", "vorschnelle Diagnose"],
    sourceStatus:
      "Teilverifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 14 (Unterarmregion), S. 179. Der Zusammenhang zwischen Toe-in/-out-Stellung, Pro-/Supinationsstellung des Unterarms, der jeweils betroffenen Muskulatur (M. supinator bzw. M. pronator teres), den betroffenen Nerven (N. radialis bzw. N. medianus) und den beschriebenen Symptomen (Pfotenschleifen, Beknabbern) ist im Original so beschrieben. WIDERSPRUCH IN DER QUELLE: Kap. 17 (Neurotension), S. 279, beschreibt denselben M. supinator/N. radialis-Bezug unter umgekehrter Stellungsbezeichnung (siehe Abschnitt „Wichtiger Hinweis zur Quellenlage\" oben) — noch ungeklärt, deshalb nur teilverifiziert statt vollständig verifiziert. Web-Abgleich (22.09.2026) brachte keine externe Bestätigung für eine Fußstellungs-Zuordnung bei Supinator-/Pronator-teres-Kompression, weder canin noch human.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "unterarm-rotationsgelenke",
    category: "BIOMECHANIK",
    title: "Die Unterarm-Rotationsgelenke — wie Pronation und Supination entstehen",
    teaser:
      "Der Radius dreht sich um eine fast unbewegliche Ulna — zwei anatomisch getrennte Gelenke plus eine straffe Bindegewebsverbindung machen die Drehbewegung des Unterarms möglich.",
    sections: [
      {
        type: "text",
        text: "Das Unterarmgelenk des Hundes besteht aus dem proximalen und dem distalen Radioulnargelenk. Funktionell bilden beide eine Einheit — anatomisch sind es jedoch zwei getrennte Gelenke, ergänzt durch eine straffe bindegewebige Verbindung dazwischen.",
      },
      {
        type: "table",
        heading: "Die drei Verbindungen zwischen Radius und Ulna",
        columns: ["Verbindung", "Bauart", "Bewegung"],
        rows: [
          [
            "Art. radioulnaris proximalis",
            "anatomisch und mechanisch einfaches Radgelenk (konkav: Incisura radialis ulnae; konvex: Circumferentia articularis radii)",
            "ca. 20° Pronation, ca. 50° Supination — der Radius dreht sich um die fast unbewegliche Ulna",
          ],
          [
            "Art. radioulnaris distalis",
            "ebenfalls ein einfaches Radgelenk (konkav: Incisura ulnaris radii; konvex: Circumferentia articularis ulnae)",
            "ebenfalls ca. 20° Pronation, ca. 50° Supination",
          ],
          [
            "Membrana interossea antebrachii",
            "straffe bindegewebige Verbindung zwischen den Margines interossei von Radius und Ulna",
            "fixiert beide Knochen aneinander und unterteilt den Unterarm in eine Beuger- und eine Streckerloge",
          ],
        ],
      },
      {
        type: "text",
        heading: "Wer trägt die Last",
        text: "Im distalen Unterarm ist der Radius der Hauptlastträger und dementsprechend breiter und kräftiger ausgebildet. Über die Membrana interossea wird die Last weiter auf die Ulna übertragen, die sie im proximalen Unterarm über das Olekranon an den Oberarm weiterleitet.",
      },
      {
        type: "text",
        heading: "Ein diagnostischer Hinweis über Endgefühle",
        text: "Pronation endet hart-elastisch, weil der Radius dabei auf die Ulna trifft und stoppt. Supination endet dagegen fest-elastisch durch einen Bandstopp (Lig. annulare radii). Ist das Ellenbogengelenk stark in Extension oder Flexion eingeschränkt, zeigt sich meist auch eine Einschränkung von Pronation und Supination — ein Hinweis, der zum Beispiel bei Ellenbogendysplasie zu erwarten ist.",
      },
      {
        type: "text",
        heading: "Wenn das Wachstum aus dem Takt gerät",
        text: "Die Membrana interossea ist eine straffe Verbindung. Schließt sich die Wachstumsfuge der Ulna zu früh, kann sich der Radius dadurch nicht mehr ungehindert mitentwickeln und krümmt sich — mit Valgusstellung als Folge (Radiuskurvensyndrom).",
      },
    ],
    errorTags: ["Faktenwissen", "Anatomieverwechslung"],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 14 (Unterarmregion), S. 179. Die drei Verbindungen zwischen Radius und Ulna mit Gelenktyp, konkaven/konvexen Gelenkflächen und Bewegungsausmaß, die Lastverteilung, die Endgefühle sowie das Radiuskurvensyndrom als Folge eines frühzeitigen Epiphysenschlusses der Ulna sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "karpalgelenk-gelenketagen",
    category: "BIOMECHANIK",
    title: "Das Karpalgelenk — mehrere Gelenketagen in einem",
    teaser:
      "Das Handgelenk des Hundes ist kein einzelnes Gelenk, sondern ein Stapel aus mehreren Etagen mit unterschiedlicher Beweglichkeit — plus zwei kleine Sesambeinchen, die überraschend viel Ärger machen können.",
    sections: [
      {
        type: "text",
        text: "Das Karpalgelenk ist ein zusammengesetztes Gelenk aus mehreren Gelenketagen. Beteiligt sind der distale Teil von Ulna und Radius, zwei Reihen von Handwurzelknochen sowie die proximalen Anteile des Metacarpus. Hauptbewegung ist die Flexion (20–35°) und die Extension (bis 200°); dazu kommen Ab- (10–20°) und Adduktionsbewegungen (5–15°). Alle Endgefühle sind fest-elastisch, das Kapselmuster ist Flexion–Extension.",
      },
      {
        type: "table",
        heading: "Die drei Gelenketagen",
        columns: ["Gelenketage", "Gelenktyp / Bewegungsausmaß", "Gelenkflächen"],
        rows: [
          [
            "Art. antebrachiocarpea",
            "Scharniergelenk (Ellipsoid), mit 90° die am stärksten beteiligte Etage; die weite Kapsel umschließt auch das distale Radioulnargelenk",
            "konvex: Os carpi radiale/Os carpi ulnare/Os carpi accessorium; konkav: Radius/Ulna",
          ],
          [
            "Art. mediocarpea",
            "Scharniergelenk, ca. 45° Bewegungsumfang",
            "konvex: Ossa carpalia I–IV; konkav: Os carpi ulnare/Os carpi radiale",
          ],
          [
            "Art. ossis carpi accessorii",
            "eingelagert in die Sehne der Mm. flexor et extensor carpi ulnaris (Stabilisation)",
            "Os carpi accessorium artikuliert mit dem Os carpi ulnare",
          ],
        ],
      },
      {
        type: "text",
        heading: "Der Metacarpus — kräftigste Strahlen tragen die Last",
        text: "Die Ossa metacarpalia sind Röhrenknochen mit konkaver Basis, Schaft und konvexem Köpfchen. Wie an der Hintergliedmaße sind auch hier der III. und IV. Strahl am kräftigsten ausgebildet, weil sie die Hauptlast tragen — entsprechend zeigen sich arthrotische Veränderungen dort besonders häufig. Das Os metacarpale I kann fehlen oder zweigeteilt sein; fehlt es, ist die proximale Phalanx direkt mit dem Os carpale I verschmolzen.",
      },
      {
        type: "text",
        heading: "Kleine Sesambeinchen, große Wirkung",
        text: "Auf der palmaren Seite der Metakarpalköpfchen liegen paarige Sesambeinchen. Sie können unerhört viele Probleme verursachen — betroffene Hunde laufen dann deutlich schlechter, vor allem auf unebenem Untergrund.",
      },
    ],
    errorTags: ["Faktenwissen", "Befund übersehen"],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 15 (Karpalgelenk und Zehen), S. 192. Die drei Gelenketagen mit ihren Gelenktypen, Bewegungsausmaßen und Gelenkflächen, die Metacarpus-Anatomie (inkl. der besonderen Belastung von Strahl III/IV) sowie die klinische Bedeutung der palmaren Sesambeinchen sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "zehen-beknabbern-differentialdiagnosen",
    category: "PATHOLOGIE",
    title: "Warum Hunde ihre Zehen beknabbern — drei Differentialdiagnosen",
    teaser:
      "Beknabberte Zehen sind nicht automatisch eine Allergie. Neben Allergie und Arthrose lohnt sich auch ein Blick auf die Nerven, die genau dort verlaufen.",
    sections: [
      {
        type: "text",
        text: "Umfangsvermehrungen, Verdickungen, Rötungen oder Leckekzeme an den Zehen sind ein häufiger Untersuchungsbefund — ebenso wie Hunde, die ihre Zehen oder Zehenzwischenräume beknabbern. Es lohnt sich, hier nicht vorschnell auf eine einzelne Ursache zu schließen.",
      },
      {
        type: "list",
        heading: "Drei Ursachen, die dasselbe Bild erzeugen können",
        items: [
          "Allergische Reaktionen",
          "Arthrosen — insbesondere an den stärker belasteten Zehen III und IV, die wie am Metacarpus auch die Hauptlast tragen",
          "Hyperästhesien durch Nervenreizung — die Area nervina von N. radialis, N. medianus, N. musculocutaneus (medial am Unterarm) und N. ulnaris liegen an Pfote und Unterarm. Ein gereizter Nerv erzeugt ein unangenehmes Kribbeln, auf das der Hund mit Lecken oder Knabbern reagiert.",
        ],
      },
      {
        type: "text",
        heading: "Verknüpfung zur Praxis",
        text: "Diese dritte Möglichkeit wird leicht übersehen, weil beknabberte Zehen zunächst nach Haut- oder Gelenkproblem aussehen. Sie passt aber genau zu den Nervenkompressionen, die auch bei Toe-in- (N. radialis über M. supinator) und Toe-out-Stellung (N. medianus über M. pronator teres) auftreten können — ein Grund mehr, bei Zehenproblemen auch die Statik der gesamten Gliedmaße mitzudenken, statt nur lokal an der Pfote zu untersuchen.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "vorschnelle Diagnose", "Befund übersehen"],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 15 (Karpalgelenk und Zehen), S. 193. Die drei genannten Ursachen (Allergie, Arthrose, Hyperästhesie durch Nervenreizung) und die betroffenen Nervenareale sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "kreuzband-meniskus-tests",
    category: "UNTERSUCHUNG",
    title: "Kreuzbandriss und Meniskusschaden erkennen — die wichtigsten Tests",
    teaser:
      "Lachmann-Test, Tibiakompressionstest, McMurray- und Apley-Test — vier Handgriffe mit jeweils eigenem Fokus, und warum keiner davon allein verrät, welcher Meniskus betroffen ist.",
    sections: [
      {
        type: "text",
        text: "Bei Verdacht auf einen Kreuzbandriss oder Meniskusschaden helfen mehrere spezifische Tests — jeder mit einem eigenen Wirkprinzip.",
      },
      {
        type: "table",
        heading: "Tests auf das vordere Kreuzband",
        columns: ["Test", "Ausführung", "Prinzip"],
        rows: [
          [
            "Lachmann-Test",
            "Kniegelenk in maximaler Extension; das Tibiaplateau wird nach kranial geschoben",
            "Direkter Test der vorderen Schublade — prüft das Lig. cruciatum craniale",
          ],
          [
            "Tibiakompressionstest",
            "Kniegelenk maximal extendiert, das Sprunggelenk wird passiv maximal flektiert",
            "Ist das Kreuzband rupturiert, ziehen die Gastrocnemiusköpfe den Femur nach kaudal — die Tibia „kommt dem Untersucher entgegen“, ohne dass er selbst zieht",
          ],
        ],
      },
      {
        type: "text",
        heading: "Warum der Tibiakompressionstest so wertvoll ist",
        text: "Anders als beim Lachmann-Test erzeugt der Untersucher hier keine eigene Zugkraft — die vordere Schublade entsteht rein durch den muskulären Zug der Gastrocnemiusköpfe am Femur, sobald das Sprunggelenk gebeugt wird. Das macht den Test weniger anfällig für zu vorsichtiges oder zu kräftiges Ziehen von Untersucherseite.",
      },
      {
        type: "table",
        heading: "Tests auf Meniskusschäden",
        columns: ["Test", "Ausführung", "Besonderheit"],
        rows: [
          [
            "Apley-Test",
            "Knie 90° flektiert, Sprunggelenk maximal flektiert (verriegelt); Kompression ins Kniegelenk mit Innen- oder Außenrotation",
            "Kann nicht unterscheiden, welcher Meniskus betroffen ist — dafür bräuchte man eine Schmerzangabe des Patienten, die beim Tier fehlt",
          ],
          [
            "McMurray-Test",
            "Kniegelenk maximal flektiert und innen- bzw. außenrotiert, dann unter Beibehaltung der Rotation mit zusätzlichem Valgus- oder Varusstress gestreckt",
            "Deutlich provokanter als der Apley-Test, da zusätzlich eine Zug-/Kompressionsbelastung auf die Menisken wirkt",
          ],
        ],
      },
      {
        type: "text",
        heading: "Eine ehrliche Grenze dieser Tests",
        text: "Weder der Apley- noch der McMurray-Test verraten beim Tier zuverlässig, ob der mediale oder der laterale Meniskus betroffen ist — anders als beim Menschen kann der Hund die schmerzende Seite nicht benennen. Diese Differenzierung bleibt der Bildgebung oder der direkten arthroskopischen Beurteilung vorbehalten.",
      },
      {
        type: "text",
        heading: "Bandstabilität separat prüfen",
        text: "Ein Varus- oder Valgusstress bei leichter Knieflexion prüft die Kollateralbänder (Aufklaffen bzw. Gapping medial oder lateral). Derselbe Stress bei gestrecktem statt gebeugtem Knie prüft stattdessen die seitlichen Kapselanteile.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Befund überbewertet", "Faktenwissen"],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 8 (Knieregion), S. 85–87. Lachmann-Test, Tibiakompressionstest, Apley-Test, McMurray-Test sowie die Band-/Kapselprovokation über Varus-/Valgusstress sind im Original mit Ausführung und Indikation so beschrieben, einschließlich des expliziten Hinweises, dass Apley- und McMurray-Test ohne Schmerzangabe des Patienten keine Aussage über die betroffene Meniskusseite erlauben.",
    relatedCaseIds: ["bruno"],
    relatedAnatomyIds: [],
  },
  {
    id: "tibiofibulargelenke",
    category: "BIOMECHANIK",
    title: "Die Tibiofibulargelenke — kaum Bewegung, aber nicht bedeutungslos",
    teaser:
      "Zwischen Tibia und Fibula bewegt sich beim Hund fast nichts — trotzdem muss die Malleolengabel bei jedem Schritt minimal nachgeben, damit das Sprunggelenk frei arbeiten kann.",
    sections: [
      {
        type: "text",
        text: "Der Unterschenkel des Hundes besteht aus Tibia, Fibula und der dazwischen ausgespannten Membrana interossea cruris. Es gibt drei Knochenverbindungen: das proximale Tibiofibulargelenk, die Membrana interossea cruris (auch Syndesmosis tibiofibularis genannt) und das distale Tibiofibulargelenk. Für Untersuchung und Behandlung sind vor allem die beiden Gelenke wichtig.",
      },
      {
        type: "table",
        heading: "Proximales und distales Tibiofibulargelenk im Vergleich",
        columns: ["Gelenk", "Gelenkflächen", "Besonderheit"],
        rows: [
          [
            "Proximales Tibiofibulargelenk",
            "konkav: Caput fibulae; konvex: Facies articularis fibularis des Condylus lateralis tibiae",
            "einfaches, straffes Gelenk (Amphiarthrose) mit schwacher Gelenkkapsel, verstärkt durch die Ligg. capitis fibularia cranialis et caudalis; gehört anatomisch zum Kniegelenk (von dessen Kapsel umschlossen), funktionell aber zu den Unterschenkelgelenken",
          ],
          [
            "Distales Tibiofibulargelenk",
            "konvex: Malleolus lateralis; kommuniziert mit dem konkaven Talus und der Tibia",
            "Kapsel kommuniziert mit der Kapsel der Art. tarsocruralis; stabilisiert durch die Ligg. tibiofibularia cranialis et caudalis",
          ],
        ],
      },
      {
        type: "text",
        heading: "Warum sich hier trotzdem etwas bewegen muss",
        text: "In der Literatur ist umstritten, ob in den Unterschenkelgelenken überhaupt Bewegung stattfindet. Der Talus des Sprunggelenks ist auf seiner Dorsalseite etwas breiter als auf der plantaren Seite. Bei Flexion des Sprunggelenks gleitet der breitere Teil des Talus zwischen die Malleolengabel — diese muss dafür minimal auseinanderweichen. Es muss also zumindest eine winzige Bewegung im proximalen Tibiofibulargelenk stattfinden, damit das Sprunggelenk frei flektieren kann.",
      },
      {
        type: "text",
        heading: "Für die Praxis",
        text: "Beide Endgefühle sind fest-elastisch. Eine isolierte Bewegungspalpation ist im proximalen Tibiofibulargelenk nicht möglich — im Joint play ist eher ein federndes Endgefühl als eine tatsächliche Bewegung zu erwarten.",
      },
    ],
    errorTags: ["Faktenwissen", "Anatomieverwechslung"],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 9 (Unterschenkelregion), S. 94f. Die drei Knochenverbindungen, die Gelenkflächen und Bänder beider Tibiofibulargelenke, die Diskussion um das tatsächliche Bewegungsausmaß sowie die Erklärung über die Talus-Form sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "nervenkompression-druck-dehnungsschwellen",
    category: "BIOMECHANIK",
    title: "Ab wann wird Nervenkompression kritisch? — Druck- und Dehnungsschwellen",
    teaser:
      "Ein eingeklemmter Nerv fällt nicht sofort aus — aber schon lange vor einer echten Schädigung ist seine Durchblutung gestört. Konkrete Schwellenwerte helfen einzuordnen, wie ernst ein Befund ist.",
    sections: [
      {
        type: "text",
        text: "Nervengewebe muss sich jeder Bewegung des Körpers anpassen können — es muss gleiten und sich minimal dehnen lassen. Beim Übergang von Streckung zu Beugung der Wirbelsäule verlängert sich der Wirbelkanal, und die Rückenmarkshäute (Dura) müssen sich entsprechend entfalten bzw. Falten werfen. Gelingt diese Anpassung nicht mehr — etwa durch Kompression, Einblutung oder ein kleines Trauma —, entsteht eine Ischämie: Die Ver- und Entsorgung des Nervs ist gestört, zunächst mit Hypersensibilität als Folge, später möglicherweise mit Hyposensibilität und echter Pathologie.",
      },
      {
        type: "table",
        heading: "Schwellenwerte für Dehnung und Kompression (Humanstudien)",
        columns: ["Reiz", "Effekt auf den Nerv"],
        rows: [
          ["Verlängerung um mehr als 15 % der möglichen Dehnung", "Totaler Stopp des intraneuralen Blutstroms"],
          ["Verlängerung um 7–8 % der möglichen Dehnung", "Blutzirkulation bereits beeinträchtigt"],
          ["Kompression mit 70 mmHg", "Kompletter Stopp des intraneuralen Blutstroms (Lundborg & Rydevik 1973; Ogata & Naito 1985)"],
          ["Kompression mit 30 mmHg", "Blutzirkulation beeinträchtigt, axonaler Transport blockiert, intraneurale Ödeme entstehen"],
        ],
      },
      {
        type: "text",
        heading: "Wichtige Einschränkung",
        text: "Diese Zahlenwerte stammen aus Untersuchungen am Menschen. Ob und ab welchem exakten Wert sie beim Hund gelten, ist NICHT VERIFIZIERT — die Quelle geht lediglich davon aus, dass Hund und Mensch als Säugetiere eine ähnliche Situation zeigen, ohne dies caninen-spezifisch belegen zu können. Die Werte sind daher als Orientierung zu verstehen, nicht als exakte Grenzwerte für den Hund.",
      },
      {
        type: "text",
        heading: "Klinische Konsequenz",
        text: "Sobald Druck oder Dehnung auf den Nerv aufgehoben werden, erholt sich die Durchblutung wieder — die Veränderungen sind zunächst reversibel. Unter pathologischen Umständen (z. B. bereits vorgeschädigter Nerv) werden diese Schwellen jedoch früher erreicht als beim gesunden Gewebe.",
      },
      {
        type: "list",
        heading: "Mögliche Ursachen einer erhöhten Mechanosensitivität",
        items: [
          "Verkürzte bzw. hypertone Muskulatur, durch die ein Nerv hindurchzieht oder an der er entlangläuft",
          "Direktes Trauma: Tritt, Schlag, Bluterguss, Autounfall",
          "Stenosierung des Foramen intervertebrale — der Nerv scheuert an der Wirbelsäule",
          "Immobilität — der Nerv verliert seine Anpassungsfähigkeit (Adaptation)",
          "Narbengewebe nach Operationen (z. B. Bandscheiben-OP), an das die Dura anwächst",
          "Überdehnung, etwa durch Sturz oder Misshandlung",
          "Wiederkehrende Gelenkdysfunktionen an den Anhaftungspunkten der Dura im Rückenmark",
        ],
      },
      {
        type: "list",
        heading: "Symptome erhöhter Mechanosensitivität eines Nervs",
        items: [
          "Angepasste Schonhaltung, um die Spannung herauszunehmen (z. B. ipsilaterale Seitneige, Knieflexion)",
          "Schmerz, steife Wirbelsäule, Kopf-Tiefhaltung",
          "Parästhesien — äußern sich beim Hund z. B. als Knabbern oder Lecken einer Körperstelle",
          "Abnorme Reaktion bei der gezielten Untersuchung der Neuralstrukturen (herabgesetzte Gleitfähigkeit)",
          "Schmerzhafte Druckpalpation entlang des Nervenverlaufs",
          "Veränderte Bewegungsqualität und -quantität, aktiv wie passiv",
        ],
      },
      {
        type: "text",
        heading: "Wichtige Abgrenzung",
        text: "Eine erhöhte Mechanosensitivität zeigt sich ausdrücklich OHNE neurologische Defizite — also ohne veränderte segmentale Reflexe oder Muskelatrophie. Genau das unterscheidet sie von einer tatsächlichen neurologischen Schädigung und ist differentialdiagnostisch wichtig: Parästhesien und Schonhaltung allein rechtfertigen noch nicht den Verdacht auf eine strukturelle Nervenläsion.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Befund übersehen", "Befund überbewertet", "Faktenwissen"],
    sourceStatus:
      "Teilverifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 17 (Neurotension), S. 277–279. Die Dehnungs-/Kompressionsschwellen, die Ursachenliste für mechanosensitive Veränderungen sowie die Symptomliste (inkl. der expliziten Abgrenzung „keine neurologischen Defizite\") sind im Original so beschrieben. Die Zahlenwerte selbst stammen aus zitierten Humanstudien (Breig 1978; Louis 1981; Lundborg & Rydevik 1973; Ogata & Naito 1985) — ihre Übertragbarkeit auf den Hund wird von der Autorin nur als plausible Annahme dargestellt, nicht als canines Studienergebnis. Bewusst NICHT übernommen: die konkreten „Spannungspunkte\" (C6/7, Th6–9, L4, Ellenbogenbeuge, Kniekehle), da die Autorin selbst ausdrücklich schreibt, deren Übertragbarkeit auf den Hund entziehe sich ihrer Kenntnis und könne mangels Schmerzaussage des Patienten nicht überprüft werden.",
    relatedCaseIds: [],
    relatedAnatomyIds: ["supinator", "pronator-teres"],
  },
  {
    id: "kreuzbandriss-krankheitsbild",
    category: "PATHOLOGIE",
    title: "Kreuzbandriss beim Hund — Krankheitsbild, Risikofaktoren und Verlauf",
    teaser:
      "Anders als beim Menschen ist ein Kreuzbandriss beim Hund selten ein reiner Unfall — meist steckt eine schleichende, mehrfaktorielle Degeneration des Bandes dahinter.",
    sections: [
      {
        type: "text",
        text: "Die Ruptur des vorderen (kranialen) Kreuzbandes (Ligamentum cruciatum craniale) ist beim Hund in den meisten Fällen keine akute Verletzung eines zuvor gesunden Bandes, sondern das Endstadium eines chronisch-degenerativen Prozesses (\"Cranial Cruciate Ligament Disease\"). Das Band verliert Fibroblasten, die Kollagenmatrix baut sich ab, verbliebene Zellen wandeln sich in knorpelähnliche Zellen um — ein Vorgang, der bei großen Rassen tendenziell früher einsetzt als bei kleinen.",
      },
      {
        type: "list",
        heading: "Bekannte Risikofaktoren (mehrfaktoriell, keine Einzelursache)",
        items: [
          "Rasse — bestimmte Rassen (u. a. Rottweiler) sind in mehreren Studien überrepräsentiert",
          "Mittleres bis höheres Alter",
          "Übergewicht",
          "Kastration/Sterilisation — Zusammenhang wird diskutiert, möglicherweise vermittelt über Gewichtszunahme und Hormonveränderungen nach dem Eingriff",
          "Steile Tibiaplateauneigung (Tibia Plateau Angle) — als konformativer Risikofaktor beschrieben, die Stärke des Zusammenhangs ist zwischen Studien allerdings umstritten: manche Hunde mit steilem Winkel entwickeln nie eine Kreuzbandproblematik",
          "Genetische, entzündliche und immunvermittelte Faktoren werden zusätzlich diskutiert",
        ],
      },
      {
        type: "text",
        heading: "Partial- und Komplettruptur",
        text: "Eine Teilruptur betrifft nahezu immer zuerst das kraniomediale Bündel des Bandes. Sie schreitet typischerweise innerhalb von Wochen bis Monaten zur Komplettruptur fort. Eine rein konservative Behandlung mit entzündungshemmenden Medikamenten lindert zwar die Symptome, verhindert aber weder das Fortschreiten der Bandschädigung noch die Entwicklung einer Arthrose.",
      },
      {
        type: "text",
        heading: "Meniskusbeteiligung",
        text: "Der mediale Meniskus wird häufig gemeinsam mit dem Kreuzband geschädigt. Bei fortgeschrittener Instabilität kann insbesondere das Hinterhorn des medialen Meniskus zwischen Femurkondylus und Tibiaplateau eingequetscht werden — ein Grund, warum bei jedem Kreuzbandverdacht gezielt auch auf Meniskuszeichen geprüft werden sollte (siehe Wissenseintrag zu den klinischen Kreuzband-/Meniskustests).",
      },
      {
        type: "table",
        heading: "Therapieansätze im Überblick",
        columns: ["Ansatz", "Prinzip", "Besonderheit"],
        rows: [
          [
            "Konservativ (Gewichtsmanagement, kontrollierte Bewegung, Physiotherapie, ggf. Schmerzmittel)",
            "Kein chirurgischer Ausgleich der Instabilität",
            "Stabilisiert das Kniegelenk nicht mechanisch — Arthrose schreitet in der Regel fort; am ehesten für kleine, leichte Hunde eine Option",
          ],
          [
            "TPLO (Tibial Plateau Leveling Osteotomy)",
            "Verändert die Tibiaplateauneigung, sodass das Knie auch ohne intaktes Kreuzband dynamisch stabil ist",
            "Häufigste Standardoperation bei mittelgroßen bis großen Hunden — auch die Operation im Fall Bruno",
          ],
          [
            "TTA (Tibial Tuberosity Advancement)",
            "Verlagert die Tuberositas tibiae nach vorne, um die Zugrichtung der Patellasehne zu verändern",
            "Alternative zur TPLO mit vergleichbarem Wirkprinzip, anderer operativer Zugang",
          ],
          [
            "Extrakapsuläre Naht (\"Bandersatz\")",
            "Künstliches Band außerhalb des Gelenks stabilisiert die Kniescheibenführung passiv",
            "Eher bei kleineren, leichteren Hunden eingesetzt als bei großen, aktiven Tieren",
          ],
        ],
      },
      {
        type: "text",
        heading: "Prognose",
        text: "Sowohl konservative als auch chirurgische Behandlung erreichen in Übersichtsarbeiten häufig gute bis exzellente funktionelle Ergebnisse. Bei mittelgroßen bis großen und aktiven Hunden zeigt eine chirurgische Stabilisierung (v. a. TPLO) jedoch tendenziell eine bessere Langzeit-Gelenkstabilität, eine schnellere Rückkehr zur Belastbarkeit und ein geringeres Risiko einer fortschreitenden Arthrose als eine rein konservative Behandlung.",
      },
      {
        type: "text",
        heading: "Verknüpfung zu Fall Bruno",
        text: "Brunos minimale Restlahmheit und die Quadrizepsatrophie sechs Wochen nach TPLO passen zum erwarteten Reha-Verlauf nach dieser Standardoperation — die knöcherne und muskuläre Anpassung braucht Zeit, auch wenn das operierte Knie selbst schon reizfrei und beweglich ist.",
      },
    ],
    errorTags: ["Faktenwissen", "Differentialdiagnostik unvollständig", "falsche Priorisierung"],
    sourceStatus:
      "Verifiziert per Web-Recherche (22.09.2026), konvergent aus mehreren unabhängigen, etablierten veterinärmedizinischen Fachquellen: peer-reviewte Übersichtsarbeiten über PubMed/PMC (u. a. eine systematische Übersicht mit Metaanalyse zu TPLO/TTA sowie ein Scoping Review zur Ätiopathogenese der caninen Kreuzbanderkrankung), ergänzt durch die Fachportale ACVS (American College of Veterinary Surgeons) und VCA Animal Hospitals. WICHTIGE EINSCHRÄNKUNG: Der direkte Volltextzugriff (WebFetch) auf diese Quellen war in dieser Arbeitsumgebung technisch blockiert (Netzwerk-Egress-Beschränkung); die hier verwendeten Aussagen stammen aus den von der Websuche gelieferten, mehrfach konvergenten Kernaussagen dieser Artikel, nicht aus eigener Volltextprüfung jedes einzelnen Papers. Konkrete Prozentzahlen zu Erfolgsraten (85–95 % gute/exzellente Ergebnisse, ~93 % Funktionsrückkehr nach einem Jahr in einer 2013er-Studie) stammen teilweise aus sekundären Zusammenfassungen (u. a. veterinärmedizinische Fachblogs, die sich ihrerseits auf Studien berufen) und sind daher als Größenordnung, nicht als exakt geprüfte Einzelzahl zu verstehen. Der Zusammenhang zwischen steiler Tibiaplateauneigung und Kreuzbandriss wird in der Literatur selbst als nicht abschließend geklärt beschrieben — das ist hier bewusst mit übernommen, nicht geglättet.",
    relatedCaseIds: ["bruno"],
    relatedAnatomyIds: [],
  },
  {
    id: "tonische-phasische-muskulatur-dysbalance",
    category: "BIOMECHANIK",
    title: "Tonische und phasische Muskulatur — warum sich Dysbalancen selbst verstärken",
    teaser:
      "Nicht jeder Muskel reagiert gleich auf Überlastung: Die einen neigen zur Verkürzung, die anderen zur Abschwächung — und genau das treibt einen Teufelskreis aus Fehlstellung und Kompensation an.",
    sections: [
      {
        type: "text",
        text: "Skelettmuskulatur lässt sich grob in zwei funktionelle Gruppen einteilen: tonische Muskulatur (Typ-I-Fasern, „slow twitch\") und phasische Muskulatur (Typ-II-Fasern, „fast twitch\"). Diese Einteilung ist mehr als eine Fasertyp-Klassifikation — sie erklärt, warum bestimmte Muskeln bei Überlastung eher verkürzen und andere eher abschwächen.",
      },
      {
        type: "table",
        heading: "Tonische vs. phasische Muskulatur im Vergleich",
        columns: ["Merkmal", "Tonische Muskulatur (Typ I)", "Phasische Muskulatur (Typ II)"],
        rows: [
          ["Hauptaufgabe", "Haltearbeit, Ausdauer", "Bewegung, Kraft"],
          ["Stoffwechsel", "Überwiegend aerob (oxidativ), viele Mitochondrien", "Überwiegend anaerob (glykolytisch), wenig Mitochondrien"],
          ["Ermüdung/Kontraktion", "Langsam", "Schnell"],
          ["Tendenz bei Überlastung", "Neigung zum Verkürzen", "Neigung zur Atrophie"],
          ["Beispielmuskeln", "M. trapezius, Mm. adductores", "M. gastrocnemius, M. biceps brachii"],
        ],
      },
      {
        type: "text",
        heading: "Der Circulus vitiosus der muskulären Dysbalance",
        text: "Wird die tonische Muskulatur überaktiv, kann sie ihre phasischen Antagonisten auf spinaler Ebene hemmen (inhibieren) — die Gegenspieler werden dadurch zusätzlich abgeschwächt. Die Folge kann eine Gelenkfehlstellung sein, die über das propriozeptive Feedback die Dysbalance weiter verstärkt. Die geschwächte Muskulatur setzt zur Kompensation vermehrt Synergisten ein, die die fehlerhafte Gelenkstellung ihrerseits verstärken können — besonders wenn diese Kompensation über längere Zeit bestehen bleibt.",
      },
      {
        type: "list",
        heading: "Mögliche Auslöser muskulärer Dysbalancen",
        items: [
          "Koordinationsstörungen",
          "Reflektorische Schonhaltungen",
          "Eine Läsion im Steuerungssystem auf segmentaler Ebene",
          "Eine Läsion im limbischen System",
        ],
      },
      {
        type: "text",
        heading: "Klinische Bedeutung",
        text: "Dieses Modell liefert eine Erklärung dafür, warum eine anhaltende Schonhaltung nicht folgenlos bleibt: Sie ist kein neutraler Zustand, sondern kann über die spinale Hemmung der Gegenspieler aktiv eine dauerhafte Fehlstellung mit aufbauen — ein Grund, Schonhaltungen frühzeitig und nicht erst bei sichtbarer Atrophie ernst zu nehmen.",
      },
    ],
    errorTags: ["Faktenwissen", "Befund übersehen", "Differentialdiagnostik unvollständig"],
    sourceStatus:
      "Verifiziert: Hohmann, Bewegungsapparat Hund (ISBN 978-3-13-245265-7), Thieme 2025, Kap. 6.1 (Anatomie der Muskulatur), S. 170f. (Tab. 6.1). Die Faserklassifikation, die Tabelleninhalte sowie der beschriebene Circulus-vitiosus-Mechanismus und seine möglichen Auslöser sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: ["biceps"],
  },
  {
    id: "offene-geschlossene-muskelkette",
    category: "BIOMECHANIK",
    title: "Offene und geschlossene Muskelkette beim Hund",
    teaser:
      "Ob ein Muskel gerade dynamisch bewegt oder stabilisierend hält, hängt davon ab, ob die Gliedmaße frei im Raum ist oder Bodenkontakt hat — ein Unterschied mit direkten Folgen für Training und Rehabilitation.",
    sections: [
      {
        type: "text",
        text: "Eine Muskelkette besteht aus mehreren Muskeln, die eine funktionelle Einheit bilden. Man unterscheidet — ein aus der Humananatomie/Neurophysiologie übertragenes Konzept — eine offene von einer geschlossenen kinematischen Kette.",
      },
      {
        type: "text",
        heading: "Offene Muskelkette",
        text: "Bei einer offenen kinematischen Kette werden die agonistischen Muskeln beansprucht, während sich die antagonistischen Muskeln der Muskellänge der Agonisten anpassen. Das passiert bei einer distalen dynamischen Bewegung der Gliedmaße bei gleichzeitiger proximaler Stabilisation — die Gliedmaße bewegt sich frei im Raum, z. B. beim Anheben der Pfote. Das Zusammenspiel kann konzentrisch sein (Anheben der Pfote) oder exzentrisch (Senken der Pfote). Die Bewegung ist meist dynamisch (z. B. Pfötchen geben), kann aber auch isometrisch/statisch sein, etwa beim Halten der Vordergliedmaße beim Vorstehen.",
      },
      {
        type: "text",
        heading: "Geschlossene Muskelkette",
        text: "Bei einer geschlossenen kinematischen Kette kontrahieren Agonisten und Antagonisten gleichzeitig — unabhängig davon, ob konzentrisch oder exzentrisch, etwa bei Gewichtsbelastung der Gliedmaße. Haben zwei Gliedmaßen Bodenkontakt und wird der dazwischenliegende Bereich muskulär stabilisiert, sodass sowohl die kranialen als auch die kaudalen Muskelketten gleichermaßen aktiv sind, spricht man von einer geschlossenen Muskelkette. Die Halte- und Stützarbeit ist hier größer als in der offenen Kette — die geschlossene Kette hat vor allem stabilisierende, die offene vor allem dynamisch-bewegende Funktion.",
      },
      {
        type: "table",
        heading: "Belegte Muskelketten während der Stemmphase (Mitte der Standbeinphase)",
        columns: ["Gliedmaße", "Beteiligte Muskeln", "Funktion"],
        rows: [
          [
            "Vordergliedmaße",
            "M. supraspinatus, M. triceps brachii, M. flexor carpi ulnaris, M. flexor digitorum superficialis",
            "Verhindern als Antischwerkraftmuskeln das Zusammenklappen der Gelenke und stabilisieren die Gliedmaße",
          ],
          [
            "Hintergliedmaße",
            "M. gluteus medius, M. gluteus superficialis, M. vastus lateralis, M. gastrocnemius",
            "Stabilisieren die Gliedmaße im Zusammenspiel während der Belastungsphase",
          ],
        ],
      },
      {
        type: "text",
        heading: "Wichtige Einschränkung",
        text: "Welche Muskeln beim Hund eine geschlossene Muskelkette bilden, ist bislang nur für einige Muskeln an Vorder- und Hintergliedmaße während der Stemmphase (Mitte der Standbeinphase) nachgewiesen — nicht für den gesamten Bewegungszyklus. Welche Muskeln z. B. beim Anheben der Pfote (offene Kette) beteiligt sind, war zum Zeitpunkt der Quelle noch nicht untersucht.",
      },
    ],
    errorTags: ["Faktenwissen", "Differentialdiagnostik unvollständig"],
    sourceStatus:
      "Verifiziert: Hohmann, Bewegungsapparat Hund (ISBN 978-3-13-245265-7), Thieme 2025, Kap. 6.5 (Die Muskelkette), S. 180ff. Die Definition von offener und geschlossener kinematischer Kette, die genannten Beispiele (Pfötchen geben, Harnabsatz) sowie die beiden belegten Muskelketten während der Stemmphase samt der ausdrücklichen Einschränkung, dass dies bisher nur für diese Muskeln nachgewiesen ist, sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "neurotensionsbehandlung-wirkprinzip-kontraindikationen",
    category: "THERAPIE",
    title: "Neurotensionsbehandlung — Wirkprinzip, Timing und Kontraindikationen",
    teaser:
      "Warum Bewegung bei einer Nervenreizung hilft statt zu schaden — und in welchen Fällen genau diese Bewegungstherapie tabu ist.",
    sections: [
      {
        type: "text",
        heading: "Der Teufelskreis, den die Behandlung durchbrechen soll",
        text: "Ein mechanisches Problem am Nerv (z. B. Kompression) zerstört zunächst Gewebe, wodurch eine Entzündung entsteht. Schmerz durch diese mechanosensitive Veränderung und der gleichzeitige Mangel an physiologischer Bewegung führen zu einer venösen Stase (Stau) und in der Folge zu einer Ischämie. Daraus resultieren Hypoxie, mehr Schmerz und eine weitere Bewegungseinschränkung — ein sich selbst verstärkender Kreislauf. Klingt die Entzündung ab, lassen automatisch auch die Schmerzen nach.",
      },
      {
        type: "text",
        heading: "Wirkprinzip der Behandlung",
        text: "Aktive und passive Bewegung um die (hoffentlich reversible) Stase herum soll die normale Physiologie wiederherstellen: Durch die Bewegung und die damit verbundene Muskelpumpe werden die intraneurale Mikrozirkulation und die Drainage des intraneuralen Ödems gefördert — das Ödem wird kleiner, wodurch weniger Ischämie im Nerv entsteht. Zusätzlich kann die Neurotensionsbehandlung den axonalen Transport (der für Heilung und Regeneration zuständige, langsame Transportweg von Proteinen und Reparaturstoffen) auf das 2- bis 4-Fache beschleunigen und die Gleitfähigkeit des Nervs verbessern, sodass er Druck besser ausweichen kann.",
      },
      {
        type: "text",
        heading: "Wichtiger Timing-Hinweis nach Wirbelsäulen-OP",
        text: "Eine Neurodynamik-Behandlung sollte so früh wie möglich nach einer Wirbelsäulen-OP beginnen. Ist die Proliferationsphase der Wundheilung erst abgeschlossen, haben sich bereits Cross-Links (Gewebequervernetzungen) gebildet, die der Therapeut bei späterem Behandlungsbeginn erst aufbrechen muss — das führt zunächst zu Entzündung, Schmerz und einer vorübergehenden Verschlechterung nach der Therapie. Rechtzeitige, adäquate Behandlung vermeidet das.",
      },
      {
        type: "list",
        heading: "Kontraindikationen für die Neurotensionsbehandlung",
        items: [
          "Intraneurale Störung (z. B. eine Blutung im Spinalganglion) — durch Manuelle Therapie nicht beeinflussbar",
          "Akute Rückenmarkläsionen",
          "Nichtreversible Störungen (bösartige/maligne Prozesse)",
          "Frakturen",
          "Frische Traumen",
          "Verschlimmerung der Symptome durch die Behandlung selbst",
          "Entzündungen im ZNS bzw. im Behandlungsgebiet (relative Kontraindikation)",
        ],
      },
      {
        type: "text",
        heading: "Zwei Untersuchungswege zur Mechanosensitivität",
        text: "Die Mechanosensitivität peripherer Nerven wird im Seitenvergleich auf zwei Wegen untersucht: über longitudinale Nerventests (Zug am Nerv, wobei nicht die Nervenspannung selbst, sondern die dabei ausgelöste muskuläre Reaktion beurteilt wird) und über die Nervendruckpalpation. Bei positivem Befund erfolgt entweder eine direkte Behandlung des peripheren Nervs oder eine Neurotension des entsprechenden Nervs.",
      },
      {
        type: "list",
        heading: "Hinweiszeichen bei den longitudinalen Tests",
        items: [
          "Druckschmerzhaftigkeit des peripheren Nervs",
          "Schlechte seitliche Verschiebbarkeit des Nervs",
          "Schwellung des Nervs",
          "Segmental unter Umständen kein Befund",
          "Eine veränderte Neurotension (herabgesetzte Gleitfähigkeit)",
        ],
      },
    ],
    errorTags: ["Faktenwissen", "falsche Priorisierung", "Befund übersehen"],
    sourceStatus:
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 17 (Neurotension), S. 279–281 (Abschnitte 17.3 Wirkungsweise der Neurotensionsbehandlung, 17.4 Kontraindikation, 17.5.1 Nervenleitung, 17.5.2 Mechanosensitivität der peripheren Nerven). Das Ischämie-Modell, das Wirkprinzip der Behandlung (Muskelpumpe, axonaler Transport 2- bis 4-fach beschleunigt, verbesserte Gleitfähigkeit), der Timing-Hinweis zu Cross-Links nach Wirbelsäulen-OP, die Kontraindikationsliste sowie die beiden Untersuchungswege mit ihren Hinweiszeichen sind im Original so beschrieben. Bewusst NICHT übernommen: die konkreten Behandlungstechniken (z. B. Duramobilisation mit genauer ASTE/Griff/Ausführung) — diese sind praktische Handgriffe für ausgebildete Therapeut:innen, kein Nachschlage-Wissen für die Wissensbibliothek.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "patellaluxation-krankheitsbild",
    category: "PATHOLOGIE",
    title: "Patellaluxation beim Hund — keine isolierte Kniescheiben-Erkrankung",
    teaser:
      "Eine luxierende Patella ist meist nur das sichtbarste Symptom einer Fehlausrichtung des gesamten Streckapparates der Hintergliedmaße — nicht das eigentliche Problem selbst.",
    sections: [
      {
        type: "text",
        text: "Die Kniescheibe (Patella) liegt in der Endsehne des M. quadriceps femoris und lenkt dessen Zugrichtung über die Trochlea des Femurs um — sie vergrößert dadurch den Hebelarm für die Kniestreckung. Eine Patellaluxation entsteht in den meisten Fällen nicht durch ein isoliertes Problem der Kniescheibe selbst, sondern durch eine angeborene oder im Wachstum erworbene Fehlausrichtung des gesamten Streckapparates gegenüber der Trochlea — mit entsprechender Fehlführung (\"Maltracking\") der Patella als Folge.",
      },
      {
        type: "table",
        heading: "Schweregrade nach Putnam (1968), heute Standard in der Klinik",
        columns: ["Grad", "Befund"],
        rows: [
          ["I", "Patella lässt sich manuell luxieren, springt bei Loslassen von selbst in die Normalposition zurück"],
          ["II", "Patella luxiert bei Kniebeugung oder manueller Manipulation und bleibt luxiert, bis Streckung oder manuelle Reposition erfolgt"],
          ["III", "Patella ist dauerhaft luxiert, lässt sich manuell reponieren, springt aber nach Nachlassen des Drucks spontan wieder heraus"],
          ["IV", "Patella ist dauerhaft luxiert und lässt sich nicht mehr reponieren"],
        ],
      },
      {
        type: "text",
        heading: "Medial häufiger als lateral — mit unterschiedlichen zugrunde liegenden Deformitäten",
        text: "Die mediale Patellaluxation ist deutlich häufiger als die laterale und betrifft überwiegend kleine Rassen. Zugrunde liegende Deformitäten sind hier meist ein Femurvarus (Achsabweichung), eine Außentorsion des Femurs und eine Hypoplasie (Unterentwicklung) der Trochlea-Rinne. Die seltenere laterale Patellaluxation betrifft eher große Rassen; hier finden sich häufiger eine Coxa valga und eine vermehrte Antetorsion des Femurhalses, die zu einer Innenrotation mit lateraler Torsion und Valgusstellung des distalen Femurs führen und dadurch den Streckapparat samt Patella nach lateral verlagern.",
      },
      {
        type: "text",
        heading: "Cross-Check mit deutscher Fachliteratur: dieselbe Zugmechanik",
        text: "Genau dieses Prinzip — dass eine Achsenabweichung von Femur und Tibia die Zugrichtung der Quadrizepsmuskulatur verändert und dadurch die Kniescheibe aus ihrer Führung zieht — findet sich unabhängig davon auch in einem deutschen Fachbuch zur Pathophysiologie des Bewegungsapparates beschrieben, mit dem Zusatz, dass die Patellaluxation dort ausdrücklich als Beispiel für eine angeboren/genetisch fixierte Achsenabweichung eingeordnet wird (im Gegensatz zu im Wachstum oder im Erwachsenenalter erworbenen Achsenabweichungen, z. B. durch schlecht verheilte Frakturen).",
      },
      {
        type: "text",
        heading: "Prävalenz und Grad-Symptom-Zusammenhang",
        text: "Schätzungen zufolge kommt bei etwa 7 % aller Welpen ein gewisser Grad einer Patellaluxation vor. Grad-I-Fälle sind meist symptomlos und bleiben es häufig auch dauerhaft — die Korrelation zwischen Luxationsgrad und tatsächlicher klinischer Symptomatik ist insgesamt nicht stark. Eine Therapieentscheidung sollte sich deshalb nicht allein am geröntgten oder palpierten Grad orientieren, sondern am tatsächlichen klinischen Bild.",
      },
      {
        type: "text",
        heading: "Differentialdiagnostische Falle: „Läuse und Flöhe zugleich\"",
        text: "Ein Hund kann mehrere orthopädische bzw. internistische Probleme gleichzeitig haben — eine gefundene Patellaluxation schließt eine zweite, unabhängige Ursache der Lahmheit nicht aus (im Quellenbeispiel wird explizit die Kombination aus Patellaluxation und Borreliose genannt). Eine Diagnose zu früh als \"erklärt\" zu betrachten, sobald ein plausibler Befund gefunden ist, ist ein klassischer Denkfehler.",
      },
      {
        type: "text",
        heading: "Therapie",
        text: "Milde, asymptomatische Fälle (v. a. Grad I) werden häufig konservativ begleitet. Bei mittelschweren bis schweren Fällen (Grad II–IV), deutlicher Lahmheit oder fortschreitender Symptomatik wird meist chirurgisch korrigiert — etwa durch Versetzen der Tuberositas tibiae (TTT) zur Neuausrichtung des Streckapparates, Vertiefung der Trochlea-Rinne (Trochleaplastik) oder, bei zugrunde liegendem Femurvarus, eine korrigierende distale Femurosteotomie.",
      },
    ],
    errorTags: ["Anatomieverwechslung", "Befund überbewertet", "Differentialdiagnostik unvollständig", "falsche Priorisierung"],
    sourceStatus:
      "Verifiziert per Kombination aus Buch- und Web-Quelle (22.09.2026). Buchquelle: Alexander/Baatz/Jaggy/Kathmann, „Pathophysiologie des Bewegungsapparates\" (aus: Physikalische Therapie für Kleintiere, VetCenter/Thieme) — Abschnitt „Achsenabweichung\": das Konzept der angeboren/genetisch fixierten Achsenabweichung mit Patellaluxation als Beispiel, die schematische Zugrichtung der Quadrizepsmuskulatur bei medialer Luxation sowie der Differentialdiagnose-Hinweis (\"Patellaluxation und Borreliose gleichzeitig\") sind im Original so beschrieben. Diese digitale Quelle enthält keine Seitenzahlen (Kapitelansicht ohne Paginierung) — daher Zitat nach Abschnittsüberschrift statt Seitenzahl. Web-Quelle (Grading, Prävalenz, Deformitäten, Therapie): konvergente Websuche-Zusammenfassungen aus mehreren etablierten veterinärmedizinischen Fachquellen (ACVS, Merck Veterinary Manual, OFA, peer-reviewte Arbeiten via PubMed/PMC, vettimes, Today's Veterinary Practice) zur Putnam-Klassifikation (1968), medialer vs. lateraler Luxation und deren Deformitäten sowie Prävalenz/Therapie. WICHTIGE EINSCHRÄNKUNG: Direkter Volltextzugriff (WebFetch) war in dieser Arbeitsumgebung technisch blockiert — die Web-Aussagen stammen aus Websuche-Synthesen, nicht aus eigener Volltextprüfung. Die Prävalenzangabe (~7 % der Welpen) stammt aus einer sekundären Quelle und ist als Größenordnung, nicht als exakt geprüfte Zahl zu verstehen.",
    relatedCaseIds: [],
    relatedAnatomyIds: ["quadriceps"],
  },
  {
    id: "muskulaere-weichteilbefunde-differenzieren",
    category: "PATHOLOGIE",
    title: "Myogelose, Muskelhartspann & Co. — ähnliche Weichteilbefunde unterscheiden",
    teaser:
      "„Der Muskel ist verspannt\" kann sehr Unterschiedliches bedeuten — und die Unterscheidung entscheidet über Prognose und Behandlung.",
    sections: [
      {
        type: "text",
        text: "Tastbare Muskelverhärtungen und Verspannungen werden in der Praxis leicht über einen Kamm geschoren. Tatsächlich verbergen sich dahinter unterschiedliche Gewebeveränderungen mit unterschiedlicher Entstehung, Prognose und Behandlung.",
      },
      {
        type: "table",
        heading: "Sechs Erscheinungsformen im Vergleich",
        columns: ["Befund", "Charakteristik"],
        rows: [
          [
            "Myogelose (frisch)",
            "Stecknadelkopf- bis erbsengroß, weiche Konsistenz — therapeutisch z. B. mit Gelotripsie (Massagetechnik) sprengbar",
          ],
          [
            "Myogelose (alt)",
            "Derb, bindegewebig verkapselt, mit deutlichem Hypertonus der umgebenden Muskulatur — therapieresistent; der umgebende Hypertonus lässt sich aber durch dosierte Friktionen bessern. Differentialdiagnostisch kommen Tumoren in Betracht",
          ],
          [
            "Muskelhartspann",
            "Langanhaltende Verspannung als Reaktion auf lokalen/übertragenen Schmerz (muskuläre Schutzspannung) oder als intrinsischer Muskelspasmus durch Durchblutungs-/Stoffwechselstörung bei Dauerkontraktion. Kann auch reflektorisch durch entzündliche Organveränderungen entstehen — akut, chronisch oder rezidivierend",
          ],
          [
            "Muskelkontraktur",
            "Beginnt als reversible Verkürzung durch Bewegungseinschränkung/-mangel, führt über Adhäsionen zum Bindegewebsumbau — die Verkürzung wird dadurch konserviert und irreversibel",
          ],
          [
            "Muskeltrauma (Ruptur)",
            "Riss im Muskelbauch oder am Muskel-Sehnen-Übergang, akut oder als spontane Ruptur durch schleichende Mikrotraumatisierung. Ödem/Hämatom in der Umgebung, danach Neubildung von Muskelfasern oder — bei größeren Defekten — Narbengewebe. Geringfügige Rupturen: konservativ (Ruhigstellung, bis zu mehreren Wochen); größere Rupturen: operativ",
          ],
          [
            "Muskelzerrung",
            "Überwiegend bindegewebige Verletzung mit kleinsten Muskelrissen am Muskel-Sehnen-Übergang — konservativ mit Ruhigstellung therapiert",
          ],
        ],
      },
      {
        type: "text",
        heading: "Weichteilrheumatismus als Sonderfall",
        text: "Ein wahrscheinlich erblich mitbedingtes, multifaktorielles Schmerzgeschehen mit symmetrisch auftretenden „Tenderpoints\" (maximalen Schmerzpunkten in der Muskulatur). In der Mehrzahl der Fälle sind Rheumafaktoren im Blut nachweisbar, ähnlich wie bei der rheumatoiden Arthritis — ein Hinweis darauf, dass nicht jede diffuse Muskelschmerzhaftigkeit rein lokal-mechanisch erklärbar sein muss.",
      },
      {
        type: "text",
        heading: "Klinische Bedeutung",
        text: "Diese Differenzierung ist mehr als Begriffskosmetik: Eine alte Myogelose mit Tumor zu verwechseln (oder umgekehrt), eine Kontraktur für eine akut lösbare Verspannung zu halten, oder eine Ruptur mit reiner Ruhigstellung statt operativer Versorgung zu behandeln, hat jeweils unmittelbare Konsequenzen für Prognose und Therapieerfolg.",
      },
    ],
    errorTags: ["Anatomieverwechslung", "Befund überbewertet", "Differentialdiagnostik unvollständig", "falsche Priorisierung"],
    sourceStatus:
      "Verifiziert: Alexander/Baatz/Jaggy/Kathmann, „Pathophysiologie des Bewegungsapparates\" (aus: Physikalische Therapie für Kleintiere, VetCenter/Thieme), Abschnitt „Muskulatur\" (C.-S. Alexander). Alle sechs Erscheinungsformen samt ihrer beschriebenen Charakteristika, Entstehung und Therapieempfehlung sowie der Weichteilrheumatismus-Absatz sind im Original so beschrieben. Diese digitale Quelle enthält keine Seitenzahlen (Kapitelansicht ohne Paginierung) — daher Zitat nach Abschnittsüberschrift statt Seitenzahl.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "arthrose-pathogenese-circulus-vitiosus",
    category: "PATHOLOGIE",
    title: "Arthrose vs. Arthritis — Begriffe und der Circulus vitiosus der Knorpelzerstörung",
    teaser:
      "Warum eine Arthrose sich meist selbst am Leben hält, sobald sie einmal begonnen hat — unabhängig davon, was sie ursprünglich ausgelöst hat.",
    sections: [
      {
        type: "text",
        heading: "Begriffsklärung",
        text: "Arthritis bezeichnet eine floride (akute) Entzündung mit den klassischen Entzündungszeichen Rubor, Dolor, Calor, Tumor und Functio laesa; je nach Anzahl betroffener Gelenke spricht man von Mono-, Oligo- oder Polyarthritis. Arthrose bezeichnet dagegen eine degenerative Gelenkerkrankung, die aus einem Missverhältnis zwischen Belastung und Beschaffenheit des Gelenks resultiert. Bei primärer Arthrose lässt sich keine eindeutige Ursache nachweisen, bei sekundärer Arthrose schon. Die Übergänge zwischen beiden Begriffen sind fließend: Eine Arthrose kann aus einer Arthritis entstehen und wieder in eine floride Arthritis übergehen. Wegen der zunehmenden Mitreaktion des angrenzenden Knochens ist auch der Begriff Osteoarthrose/Osteoarthritis (OA) gebräuchlich.",
      },
      {
        type: "list",
        heading: "Schutzmechanismen des gesunden Gelenkknorpels",
        items: [
          "Größtmögliche anatomische Kongruenz der Gelenkflächen, auch mithilfe von Menisken",
          "Passive Stabilisierung der Gelenkflächen-Position durch umgebende Bänder und Faszien",
          "Aktive Stabilisierung durch Muskelkontraktion, exakt zeitlich auf den Bewegungsablauf abgestimmt (neuromuskuläre Steuerung)",
          "Hohe Stoßelastizität des hyalinen Knorpels durch hygroskopische Aggrecane und Wassergehalt",
          "Hohe Scherkraftresistenz durch ein fest verankertes Netzwerk kollagener Fasern",
          "Gute Ernährung des Knorpels über die Synovia",
        ],
      },
      {
        type: "text",
        heading: "Die Pathogenese-Kaskade",
        text: "Eine mechanische Überlastung provoziert die Chondrozyten zunächst zu vermehrter, aber qualitativ mangelhafter Kollagensynthese — die Fasern sind kurzkettiger und schlechter vernetzt. Der Knorpel quillt dadurch vorübergehend sogar stärker auf (er erscheint zu Beginn dicker), wird dabei aber weicher und mechanisch weniger belastbar. Im weiteren Verlauf senden die Chondrozyten Botenstoffe an die Synovialmembran, die daraufhin Mediatoren bildet — vor allem Interleukin-1 (IL-1) und Tumor-Nekrose-Faktor-α (TNF-α). Diese Mediatoren induzieren in den Chondrozyten wiederum vermehrten Matrixabbau und verminderte Proteoglykan-Synthese. Ob der Prozess ursprünglich rein mechanisch begann oder umgekehrt eine Arthritis über eine veränderte Synovia die Chondrozyten-Ernährung verschlechtert hat, spielt für den weiteren Verlauf keine Rolle mehr — spätestens ab diesem Punkt ist der Krankheitsprozess selbsterhaltend.",
      },
      {
        type: "text",
        heading: "Der Schmerz-Schonhaltungs-Kreislauf",
        text: "Entzündungsmediatoren und mechanische Reizung stimulieren Nozizeptoren in Gelenkkapsel, Periost und subchondralem Knochen; die Schmerzinformation läuft über schnelle Aδ- und langsame C-Fasern zum ZNS. Die Folge ist eine (oft unbewusste) Schonhaltung mit eingeschränktem Bewegungsradius. Das wiederum verschlechtert die Knorpelernährung (die „Schwammfunktion\" durch wechselnde Be- und Entlastung fällt aus), belastet andere Gelenkareale dauerhaft stärker, lässt die Muskulatur atrophieren — wodurch sie weniger zur Stabilisation beitragen kann — oder überlastet sie durch anhaltende Kontraktur. All das beschleunigt die Arthrose weiter und kann im Lauf der Zeit sogar Nachbargelenke oder andere Gliedmaßen einbeziehen (z. B. eine Vorderhandlahmheit als Folge einer Hüftgelenkdysplasie).",
      },
      {
        type: "text",
        heading: "Grenzen der Physiotherapie",
        text: "Die anatomisch oder biochemisch bereits nachweisbare Arthrose im Gelenk selbst kann durch Physiotherapie nicht rückgängig gemacht werden. Realistisches Ziel ist der Stillstand des Fortschreitens und klinische Symptomlosigkeit — erreicht, indem ungünstige Bewegungsmuster unterbunden und die peripheren Folgen der Arthrose (Schonhaltung, Dysbalancen, Atrophie) ausgeglichen werden.",
      },
    ],
    errorTags: ["Faktenwissen", "Befund überbewertet", "falsche Priorisierung"],
    sourceStatus:
      "Verifiziert: Alexander/Baatz/Jaggy/Kathmann, „Pathophysiologie des Bewegungsapparates\" (aus: Physikalische Therapie für Kleintiere, VetCenter/Thieme), Abschnitt „Pathologie der Gelenke\" (G. Baatz), Unterabschnitte „Allgemeines, Begriffsbestimmung\" und „Pathogenese der Knorpelschäden\" (nach Pschyrembel 2001 zitiert). Die Begriffsklärung, die Schutzmechanismen des gesunden Knorpels, die Pathogenese-Kaskade inklusive IL-1/TNF-α, der Schmerz-Schonhaltungs-Kreislauf sowie die ausdrückliche Aussage zu den Grenzen der Physiotherapie sind im Original so beschrieben. Diese digitale Quelle enthält keine Seitenzahlen (Kapitelansicht ohne Paginierung) — daher Zitat nach Abschnittsüberschrift statt Seitenzahl.",
    relatedCaseIds: ["bruno", "luna"],
    relatedAnatomyIds: [],
  },
  {
    id: "arthrose-mechanische-hauptursachen",
    category: "PATHOLOGIE",
    title: "Die vier mechanischen Hauptursachen der Arthrose",
    teaser:
      "Inkongruenz, Achsenabweichung, Instabilität und neuromuskuläre Imbalance — vier Wege, wie aus gesundem Knorpel eine Arthrose wird, oft in Kombination.",
    sections: [
      {
        type: "text",
        text: "Gesunder Knorpel und gesunde Synovia können durch unphysiologische Belastung dennoch geschädigt werden (\"normaler Knorpel — pathologische Last\"). Vier mechanische Ursachen führen zu einer solchen pathologischen Belastung, häufig in Kombination.",
      },
      {
        type: "table",
        heading: "Die vier Ursachen mit je einem angeborenen und einem erworbenen Beispiel",
        columns: ["Ursache", "Angeboren/genetisch fixiert", "Erworben"],
        rows: [
          [
            "Inkongruenz der Gelenkflächen",
            "Hüftgelenkdysplasie (HD), Ellbogengelenkdysplasie (Distractio cubiti, loser Proc. anconaeus/coronoideus medialis u. a.)",
            "Postoperativer Zustand nach suboptimal versorgten Gelenkfrakturen, Luxationen oder Bänderrissen; eingeklemmte Corpora libera (Gelenkmäuse)",
          ],
          [
            "Achsenabweichung",
            "Varus-/Valgusstellung durch inkongruentes Epiphysenwachstum, Patellaluxation (siehe eigener Wissenseintrag)",
            "Suboptimal verheilte Epiphysenfrakturen (Salter-Harris I–V), Röhrenknochenfrakturen mit Winkelung oder Rotation der Fragmente",
          ],
          [
            "Instabilität",
            "Angeborene Bindegewebsschwäche (z. B. Ehlers-Danlos-Syndrom)",
            "Bänderrisse, z. B. Ruptur des kranialen Kreuzbandes (siehe eigener Wissenseintrag)",
          ],
          [
            "Neuromuskuläre Imbalance",
            "Zerebellare Ataxie",
            "Zustand nach Bandscheibenvorfall, Polyneuropathie, Quadrizepskontraktur",
          ],
        ],
      },
      {
        type: "text",
        heading: "Hüftgelenkdysplasie als Paradebeispiel",
        text: "Der hyaline Knorpel eines an HD erkrankten Welpen ist ursprünglich völlig gesund. Durch die Inkongruenz von Kopf und Pfanne entstehen aber unphysiologisch hohe Drücke am Pfannenrand und starke Zugkräfte an den Kapselansätzen. Das schädigt zunächst diese Strukturen, setzt Entzündungsmediatoren frei und verändert dadurch die Synovia — jetzt wird der Knorpel auch biochemisch zerstört und hält der Belastung noch weniger stand. Adipositas oder hohe Bewegungsbeschleunigung beschleunigen diesen Prozess zusätzlich.",
      },
      {
        type: "text",
        heading: "Verknüpfung",
        text: "Dieses Vier-Ursachen-Schema ordnet bereits einzeln behandelte Krankheitsbilder in einen gemeinsamen kausalen Rahmen ein: Ellbogengelenkdysplasie und Hüftgelenkluxation gehören zur Inkongruenz, die Patellaluxation zur Achsenabweichung, der Kreuzbandriss zur Instabilität. Der eigentliche Gewebeschaden — der Circulus vitiosus der Knorpelzerstörung — läuft danach bei allen vier Ursachen nach demselben Muster ab (siehe Wissenseintrag „Arthrose vs. Arthritis\").",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Anatomieverwechslung", "Faktenwissen"],
    sourceStatus:
      "Verifiziert: Alexander/Baatz/Jaggy/Kathmann, „Pathophysiologie des Bewegungsapparates\" (aus: Physikalische Therapie für Kleintiere, VetCenter/Thieme), Abschnitt „Pathologie der Gelenke\" (G. Baatz), Unterabschnitt „Normaler Knorpel – Pathologische Last\" inkl. der Unterabschnitte zu Inkongruenz. Das Vier-Ursachen-Schema mit den angeboren/erworben-Beispielen sowie die HD-Kausalkette sind im Original so beschrieben. Diese digitale Quelle enthält keine Seitenzahlen (Kapitelansicht ohne Paginierung) — daher Zitat nach Abschnittsüberschrift statt Seitenzahl.",
    relatedCaseIds: ["bruno", "luna"],
    relatedAnatomyIds: [],
  },
  {
    id: "laehmung-ataxie-dysmetrie-grundbegriffe",
    category: "GRUNDLAGEN",
    title: "Lähmung, Ataxie und Dysmetrie — neurologische Grundbegriffe sauber trennen",
    teaser:
      "Bevor man eine neurologische Störung lokalisieren kann, muss man erst einmal genau benennen können, was man tatsächlich beobachtet.",
    sections: [
      {
        type: "text",
        text: "Neurologische Störungen des Bewegungsapparates können sich als Propriozeptionsausfälle, Lähmungserscheinungen, Kreisbewegungen, Ataxie und/oder Dysmetrie zeigen. Ein propriozeptives Defizit äußert sich z. B. als ständiges oder intermittierendes unphysiologisches Auffußen oder Überköten der Gliedmaße.",
      },
      {
        type: "table",
        heading: "Lähmungsgrade nach Anzahl der betroffenen Gliedmaßen",
        columns: ["Begriff", "Bedeutung"],
        rows: [
          ["Monoparese", "Lähmung einer Gliedmaße"],
          ["Paraparese", "Lähmung beider Hintergliedmaßen"],
          ["Tetraparese", "Lähmung aller vier Gliedmaßen"],
          ["Hemiparese", "Lähmung eines ipsilateralen Gliedmaßenpaares (eine Vorder- und die gleichseitige Hintergliedmaße)"],
          ["Plegie", "Vollständige Lähmung (z. B. Monoplegie, Paraplegie) — im Unterschied zur Parese, bei der die Muskelkraft nur reduziert, aber nicht vollständig aufgehoben ist"],
        ],
      },
      {
        type: "text",
        heading: "Spastisch vs. schlaff",
        text: "Je nach Spannungszustand der betroffenen Muskulatur unterscheidet man eine spastische Lähmung (erhöhter Tonus) von einer schlaffen Lähmung (erniedrigter Tonus). Die Lähmung selbst beruht auf dem Ausfall der motorischen Funktion eines Nervs oder seines Erfolgsorgans (z. B. des Muskels) und kann zentral (Gehirn/Rückenmark), peripher (Nerven) oder myogen (im Muskel selbst) verursacht sein.",
      },
      {
        type: "text",
        heading: "Ataxie",
        text: "Eine Ataxie ist eine Störung der Bewegungskoordination und des geordneten Zusammenwirkens von Muskelgruppen — sie kann, muss aber nicht, von Spastizität, Parese oder unwillkürlichen Bewegungen begleitet sein. Je nach Lokalisation der zugrunde liegenden Läsion unterscheidet man eine periphere, spinale, zerebelläre, vestibuläre und zerebrale Ataxie.",
      },
      {
        type: "text",
        heading: "Dysmetrie",
        text: "Eine Dysmetrie zeigt sich entweder als zu große Schrittlänge (Hypermetrie) oder als zu kleine Schrittlänge (Hypometrie).",
      },
    ],
    errorTags: ["Faktenwissen", "Anatomieverwechslung", "Befund übersehen"],
    sourceStatus:
      "Verifiziert: Alexander/Baatz/Jaggy/Kathmann, „Pathophysiologie des Bewegungsapparates\" (aus: Physikalische Therapie für Kleintiere, VetCenter/Thieme), Abschnitt „Nervensystem\" (A. Jaggy/I. Kathmann), Einleitung und Unterabschnitt „Motorische Ausfälle (Lähmung/Ataxie)\". Die Begriffsdefinitionen (Mono-/Para-/Tetra-/Hemiparese, Plegie, spastisch/schlaff, Ataxie-Lokalisationen, Hyper-/Hypometrie) sind im Original so beschrieben. Diese digitale Quelle enthält keine Seitenzahlen (Kapitelansicht ohne Paginierung) — daher Zitat nach Abschnittsüberschrift statt Seitenzahl.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "umn-omn-laesionslokalisation",
    category: "PATHOLOGIE",
    title: "Oberes und unteres motorisches Neuron unterscheiden — wo liegt die Läsion?",
    teaser:
      "Dieselbe Lähmung kann durch eine Schädigung an ganz unterschiedlichen Stellen des Nervensystems entstehen — die Reflexe verraten, wo.",
    sections: [
      {
        type: "text",
        text: "Anhand der spinalen Reflexe lässt sich unterscheiden, ob eine Läsion im zentralen oder im peripheren Nervensystem liegt (erstes Lokalisations-Postulat). Die Beurteilung der Kopfnerven (zweites Postulat) erlaubt zusätzlich die Unterscheidung zwischen einer intrakraniellen und einer extrakraniellen Läsion. Zusammen mit Haltungs- und Stellreaktionen wird die Läsion so einem der Rückenmarkssegmente zugeordnet.",
      },
      {
        type: "text",
        heading: "Wichtige Warnung zur Abkürzung „UMN\"",
        text: "In diesem Quellentext steht „UMN\" für unteres motorisches Neuron (also das, was im internationalen/englischsprachigen Sprachgebrauch als \"LMN\" — lower motor neuron — bezeichnet wird), und „OMN\" für oberes motorisches Neuron (international \"UMN\" — upper motor neuron). Diese deutsche Abkürzungslogik ist mit der international gebräuchlichen Abkürzung „UMN\" NICHT identisch und sogar gegensätzlich belegt — eine Verwechslungsgefahr, die bei Konsultation englischsprachiger Fachliteratur unbedingt im Kopf behalten werden muss.",
      },
      {
        type: "table",
        heading: "Unteres (\"UMN\" im Quellentext) vs. oberes (\"OMN\") motorisches Neuronensystem",
        columns: ["Merkmal", "Unteres System (Reflexbogen selbst)", "Oberes System (absteigende Bahnen)"],
        rows: [
          [
            "Reflexauswirkung bei Läsion",
            "Hyporeflexie (herabgesetzt) bis Areflexie (fehlend)",
            "Hyperreflexie (gesteigert), evtl. mit Klonus — Reflexe können bei OMN-Läsionen aber auch normal sein",
          ],
          [
            "Besteht aus",
            "α-Motoneurone (graue Substanz des Rückenmarks), zugehörige Nervenwurzeln, periphere Nerven, neuromuskuläre Endplatten, Muskeln",
            "Pyramidales und extrapyramidales System — absteigende Bahnen vom motorischen Großhirnkortex über den Hirnstamm bis zum Rückenmark",
          ],
          [
            "Warum die Reflexveränderung entsteht",
            "Der Reflexbogen selbst ist unterbrochen",
            "Der hemmende Einfluss auf die Vorderhornzellen fällt weg — Überreaktion auf Reflexstimulation. Gesteigerte Reflexe treten v. a. bei Läsionen der Extrapyramidalbahnen auf",
          ],
          [
            "Beispielkrankheiten",
            "Diskushernie auf Höhe einer Lumbalschwellung, Neurofibrom einer Nervenwurzel, Polyneuropathie bei Hypothyreose, Myasthenia gravis (neuromuskuläre Endplatte)",
            "Degenerative Myelopathie (Rückenmark), granulomatöse Meningoenzephalitis (Hirnstamm), Infarkt des motorischen Großhirnkortex",
          ],
        ],
      },
      {
        type: "text",
        heading: "Klonus",
        text: "Eine klonische Reaktion ist eine repetitive Kontraktion und Relaxation eines Muskels als Antwort auf einen einzigen Reizstimulus — sie wird vor allem im Zusammenhang mit chronischer Schädigung der absteigenden, hemmenden Bahnen (oberes System) beobachtet.",
      },
    ],
    errorTags: ["Anatomieverwechslung", "Faktenwissen", "Befund überbewertet"],
    sourceStatus:
      "Verifiziert: Alexander/Baatz/Jaggy/Kathmann, „Pathophysiologie des Bewegungsapparates\" (aus: Physikalische Therapie für Kleintiere, VetCenter/Thieme), Abschnitt „Nervensystem\" (A. Jaggy/I. Kathmann), Unterabschnitt „Unteres motorisches Neuron (UMN) und oberes motorisches Neuron (OMN)\". Die Lokalisations-Postulate, die Definitionen und Beispielkrankheiten beider Systeme sowie die Klonus-Definition sind im Original so beschrieben. Der Hinweis zur international abweichenden UMN/LMN-Abkürzungskonvention ist eine eigene, sachlich begründete Ergänzung zur Fehlervermeidung — im Original selbst nicht thematisiert. Diese digitale Quelle enthält keine Seitenzahlen (Kapitelansicht ohne Paginierung) — daher Zitat nach Abschnittsüberschrift statt Seitenzahl.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "mono-polyneuropathie-lokalisation",
    category: "PATHOLOGIE",
    title: "Mono- und Polyneuropathien im peripheren Nervensystem lokalisieren",
    teaser:
      "Betrifft die Störung nur einen Nerv oder gleich mehrere — und liegt das Problem im Nerven selbst oder in seiner Umgebung?",
    sections: [
      {
        type: "text",
        text: "Periphere Neuropathien werden anhand ihres klinischen Erscheinungsbildes in zwei Gruppen eingeteilt. Mononeuropathien sind Läsionen eines einzelnen peripheren Spinalnervs (z. B. eine Radialislähmung) oder eines einzelnen Kopfnervs (z. B. eine idiopathische Trigeminusneuritis). Polyneuropathien betreffen dagegen mehrere spinale Nerven und/oder auch Kopfnerven (z. B. metabolisch bedingte Neuropathien). Charakteristisch für viele Polyneuropathien: Die Ausfälle beginnen häufig zuerst in den Hintergliedmaßen, breiten sich später auf die Vordergliedmaßen und schließlich auf die Kopfnerven aus.",
      },
      {
        type: "text",
        heading: "Wo genau liegt das Problem?",
        text: "Pathologische Prozesse betreffen entweder das Interstitium — bestehend aus Bindegewebe (z. B. bei neoplastischer Infiltration) und Gefäßen (z. B. bei einer Vaskulitis) — oder die Nervenfaser selbst, bestehend aus Axon und Myelinscheide.",
      },
      {
        type: "text",
        heading: "Zwei Schädigungsmuster der Nervenfaser",
        text: "Je nach Angriffspunkt der schädigenden Noxe kommt es entweder zur neuro-axonalen Degeneration (das Axon selbst wird geschädigt) oder zur Demyelinisierung (nur die Myelinscheide wird abgebaut, das Axon bleibt zunächst erhalten). Am häufigsten kommen Mischformen vor — eine eindeutige Klassifizierung als vorwiegend neuro-axonal oder vorwiegend demyelinisierend ist nur mittels Elektrodiagnostik sowie Muskel- und Nervenbiopsie möglich. Typischer elektrophysiologischer Befund bei Demyelinisierung ist eine deutlich verminderte Nervenleitgeschwindigkeit, die bis zum vollständigen Leitungsblock reichen kann.",
      },
      {
        type: "text",
        heading: "Diagnostisches Vorgehen",
        text: "Die Lokalisation einer peripheren Nervenläsion gelingt häufig bereits durch eine genaue klinisch-neurologische Untersuchung mit hoher Genauigkeit — wichtig ist die Analyse der sensiblen, motorischen und vegetativen Ausfälle sowie die Suche nach neurogenen Reizzeichen (Schmerzlokalisation und -provokation). Bei klinisch unsicherer Lokalisation ist die Elektrodiagnostik die naheliegende erste Zusatzuntersuchung, eine neuroradiologische Untersuchung kommt erst in zweiter Linie infrage.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Anatomieverwechslung", "Befund übersehen"],
    sourceStatus:
      "Verifiziert: Alexander/Baatz/Jaggy/Kathmann, „Pathophysiologie des Bewegungsapparates\" (aus: Physikalische Therapie für Kleintiere, VetCenter/Thieme), Abschnitt „Nervensystem\" (A. Jaggy/I. Kathmann), Unterabschnitt „Lokalisation: Peripheres Nervensystem (PNS)\". Die Mono-/Polyneuropathie-Definitionen samt Beispielen, die Unterscheidung Interstitium/Nervenfaser, die beiden Schädigungsmuster sowie das diagnostische Stufenschema sind im Original so beschrieben. Bewusst NICHT übernommen: die im Original anschließend besprochenen spezifischen Einzelkrankheiten (z. B. feline Aortenthrombose, Coonhound-Paralyse, diabetische Polyneuropathie) — diese sind entweder katzen- oder seltenheitsspezifisch und passen eher in eine spätere, gezielte Ergänzung als in diesen Grundlagen-Eintrag. Diese digitale Quelle enthält keine Seitenzahlen (Kapitelansicht ohne Paginierung) — daher Zitat nach Abschnittsüberschrift statt Seitenzahl.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "seddon-klassifikation-nervenverletzungen",
    category: "PATHOLOGIE",
    title: "Neurapraxie, Axonotmesis, Neuronotmesis — Nervenverletzungen nach Seddon einordnen",
    teaser:
      "Nicht jede traumatische Nervenschädigung ist gleich schwer — die Seddon-Klassifikation entscheidet zwischen Tagen und Jahren Erholungszeit.",
    sections: [
      {
        type: "text",
        text: "Der häufigste Grund für eine Monoparese/Monoplegie ist die traumatische Schädigung eines Nervenplexus oder eines peripheren Nervs. Periphere Nervenläsionen werden nach Seddon in drei Schädigungsgrade eingeteilt, die sich in Struktur, Prognose und Erholungszeit deutlich unterscheiden.",
      },
      {
        type: "table",
        heading: "Die drei Schädigungsgrade nach Seddon",
        columns: ["Grad", "Strukturelle Schädigung", "Prognose und Erholung"],
        rows: [
          [
            "Neurapraxie",
            "Vorübergehender Leitungsblock/Funktionsverlust ohne Schädigung von Neuron oder Perineurium (Beeinträchtigung der Membran-Erregbarkeit oder der Myelinscheide)",
            "Günstige Prognose — Erholung zwischen Tagen und Wochen nach Beseitigung der Ursache",
          ],
          [
            "Axonotmesis",
            "Das Neuron (Axon) ist durchtrennt, das Perineurium bleibt intakt. Das distale Ende unterliegt der Waller-Degeneration",
            "Prognostisch nicht ungünstig, wenn die Ursache gefunden und beseitigt wird. Erholung hängt vom Abstand der Axonstümpfe ab — langsame Regeneration (Faserwachstum 1–3 mm/Tag), kann Monate bis Jahre dauern. Meist konservative Therapie, ggf. chirurgische Exploration",
          ],
          [
            "Neuronotmesis",
            "Totale Durchtrennung des Nervs inklusive Perineurium, z. B. durch scharfen Schnitt oder schwere Traktionstraumen/Weichteilwunden",
            "Prognostisch schlecht — ohne chirurgische Intervention ist die Regeneration extrem langsam und endet als funktionell unvollständiges, schlecht organisiertes Gewebe",
          ],
        ],
      },
      {
        type: "text",
        heading: "Was nach der Durchtrennung im Nerv passiert",
        text: "Nach einer Axondurchtrennung entstehen zwei ungleichwertige Abschnitte: Der distale Stumpf (vom Zellkörper getrennt) degeneriert vollständig (Waller-Degeneration), der proximale Stumpf degeneriert nur über wenige Millimeter (retrograde Degeneration). Nach etwa einer Woche beginnt die Regeneration: Die Schwann-Zellen bleiben distal intakt und proliferieren zu einem Führungsrohr, durch das das wachsende Axon seinen Weg zum Muskel sucht. Mehrere Axonsprossen versuchen dabei gleichzeitig, den Muskel zu erreichen — sobald der schnellste Spross ankommt, degenerieren die übrigen. Der Erfolg der Regeneration hängt vom Abstand zwischen Verletzungsort und Zielmuskel, vom Abstand der beiden Nervenstümpfe sowie vom Ausmaß der Narbenbildung ab, die zur Bildung eines Neuroms (abnormal wachsendes Nervengewebe) führen kann.",
      },
      {
        type: "text",
        heading: "Verknüpfung zu bereits vorhandenem Wissen",
        text: "Diese Klassifikation ergänzt die bereits behandelten Wissenseinträge zur Nervenkompression und Neurotensionsbehandlung um die strukturelle Verletzungsebene: Dort ging es um Druck-/Dehnungsschwellen und Mechanosensitivität bei (noch) intaktem Nerv — die Seddon-Klassifikation beschreibt dagegen, was passiert, sobald der Nerv strukturell tatsächlich geschädigt wird, und warum die Erholungszeit dabei von Tagen bis zu Jahren reichen kann.",
      },
    ],
    errorTags: ["Faktenwissen", "Befund überbewertet", "falsche Priorisierung", "Differentialdiagnostik unvollständig"],
    sourceStatus:
      "Verifiziert: Alexander/Baatz/Jaggy/Kathmann, „Pathophysiologie des Bewegungsapparates\" (aus: Physikalische Therapie für Kleintiere, VetCenter/Thieme), Abschnitt „Nervensystem\" (A. Jaggy/I. Kathmann), Unterabschnitt „Spinalnervenschädigung durch Trauma\". Die Seddon-Klassifikation mit allen drei Schädigungsgraden, deren struktureller Definition und Prognose sowie der Regenerationsmechanismus (Waller-Degeneration, retrograde Degeneration, Schwann-Zell-Führungsrohr, Neurombildung) sind im Original so beschrieben. Diese digitale Quelle enthält keine Seitenzahlen (Kapitelansicht ohne Paginierung) — daher Zitat nach Abschnittsüberschrift statt Seitenzahl.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "zehen-mittelfuss-sprunggelenk-untersuchung",
    category: "UNTERSUCHUNG",
    title: "Zehen, Mittelfuß und Sprunggelenk am stehenden Hund untersuchen",
    teaser:
      "Fünf gezielte Handgriffe von distal nach proximal — jeder mit einer eigenen Liste möglicher Differentialdiagnosen.",
    sections: [
      {
        type: "text",
        heading: "Allgemeine Prinzipien der Untersuchung des stehenden Hundes",
        text: "Die Untersuchung erfolgt grundsätzlich mit beiden Händen gleichzeitig an der linken und rechten Gliedmaße, synchron, damit Seitenunterschiede erfassbar sind — der Hund soll dabei möglichst identisch auf beiden Beinen stehen. Untersucht wird von distal nach proximal, erfasst werden dabei: Symmetrie (Kontur von Knochen, Muskeln, Gelenken), Wärme, Füllung der Gelenke, Vorkommen und Art von Umfangsvermehrungen sowie Schmerz.",
      },
      {
        type: "text",
        heading: "Standsymmetrie",
        text: "Der Untersucher steht hinter dem Hund und umfasst beide Metatarsi. Durch beidseitigen, gleich starken Zug nach kaudal wird geprüft, ob die Zehen dem Zug gleich stark widerstehen, ohne dabei vom Tisch abgehoben zu werden. Befund: Ein im Seitenvergleich zu leichtes Zurückziehen deutet auf eine generelle Schwäche des betroffenen Beines hin.",
      },
      {
        type: "text",
        heading: "Drucktest der distalen Gliedmaße",
        text: "Beide Metatarsi werden fest umfasst und auf den Tisch gedrückt, während auf Schmerzreaktionen geachtet wird. Schmerzäußerung oder Hochheben der Pfote deutet auf ein Problem in den distalen Gliedmaßenanteilen hin — z. B. Gelenkschwellung der Zehen, Fraktur der Zehen oder Metatarsi, oder ein tarsales Problem. Eine Dorsoflexion der Zehen unter Druck spricht für eine (seltene) Ruptur der Zehenflexoren.",
      },
      {
        type: "text",
        heading: "Tarsalknochen",
        text: "Die Knochen von Metatarsus und Tarsus werden im Seitenvergleich palpiert. Da die tarsometatarsalen und intertarsalen Gelenke straff und praktisch starr sind, produzieren sie auch bei Verletzungen kaum zusätzliche Synovia und sind daher nicht als Schwellung ertastbar. Achsabweichungen sprechen für eine Fraktur der intertarsalen Knochen/Bänder oder eine Calcaneusfraktur. Eine Konturstörung (Schwellung) auf der plantaren Seite deutet auf eine alte Verletzung, eine pathologische Calcaneusfraktur oder eine Spontanruptur der intertarsalen Bänder hin — Letztere v. a. bei alten Hunden, Collies oder ähnlichen Rassen.",
      },
      {
        type: "text",
        heading: "Sprunggelenk (Tarsalgelenk)",
        text: "Das Tarsalgelenk besteht aus vier Gelenketagen: dem oberen Sprunggelenk (Art. talocruralis), den proximalen Intertarsalgelenken, den distalen Intertarsalgelenken und den Artt. tarsometatarseae. Orientierungspunkte für die Palpation sind Malleolus medialis und lateralis — das Gelenk lässt sich sichelförmig kranial, distal und kaudal davon ertasten, im physiologischen Zustand nur als schmaler Saum. Füllung, Wärme und/oder Schmerzhaftigkeit sprechen für Talusfraktur, Osteochondrose, Polyarthritis, Seitenbandruptur oder Malleolusfraktur. Eine Achsabweichung nach medial oder lateral deutet auf eine Seitenbandruptur oder eine Fehlstellung der Tibia hin.",
      },
      {
        type: "text",
        heading: "Fersensehnenstrang",
        text: "Wichtige Anatomie-Klarstellung: Der Tendo calcaneus communis (Fersensehnenstrang) des Hundes entspricht NICHT der menschlichen Achillessehne — der M. soleus fehlt beim Hund vollständig. Der Strang wird stattdessen von den Mm. gastrocnemii (Hauptanteil), einer kaudalen Abspaltung des M. biceps femoris sowie Verstärkungsanteilen von M. semitendinosus und M. gracilis gebildet. Geprüft werden der distale Verlauf (muss beim stehenden Hund deutlich gespannt sein) und der feste Sitz der Fersenkappe (M. flexor digitorum superficialis) auf dem Calcaneus. Berührt der Calcaneus die Tischplatte, spricht das für einen Riss des Fersensehnenstrangs, einen Ausriss des M. gastrocnemius am Femur oder eine Calcaneusfraktur. Eine harte Schwellung am Ansatz deutet auf einen Teilriss hin, eine Hypermobilität der Fersenkappe auf deren Luxation (v. a. nach lateral, typisch beim Sheltie).",
      },
    ],
    errorTags: ["Befund übersehen", "Differentialdiagnostik unvollständig", "Anatomieverwechslung"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 5 (Untersuchung des stehenden Hundes), Abschnitte 5.2 (Spezifische Bemerkung) und 5.3.1–5.3.2 (Zehen/Metatarsus/Tarsalknochen, Sprunggelenk), S. 83–88. Alle beschriebenen Tests, Befunde/DD-Zuordnungen sowie die anatomische Klarstellung zum Fersensehnenstrang (keine Achillessehne, fehlender M. soleus, Zusammensetzung aus Mm. gastrocnemii/M. biceps femoris/M. semitendinosus/M. gracilis) sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "unterschenkel-knie-stehender-hund-untersuchung",
    category: "UNTERSUCHUNG",
    title: "Unterschenkel und Kniegelenk am stehenden Hund untersuchen",
    teaser:
      "Am Knie entscheidet sich oft, ob ein Kreuzbandriss, eine Meniskusverletzung oder eine Patellaluxation vorliegt — drei gezielte Handgriffe grenzen die Möglichkeiten ein.",
    sections: [
      {
        type: "text",
        heading: "Unterschenkelregion",
        text: "Tibia und Fibula werden von distal nach proximal palpiert (distal der Malleolus lateralis und der Fibulakopf proximal, medial das gesamte Planum cutaneum der Tibia). Die Muskulatur wird auf Druck und Schwellung geprüft, besonders im lateralen Kompartiment (M. tibialis cranialis), wo traumatische Schwellungen entstehen können. Schwellung spricht für Neoplasie, Hämatom oder ein Kompartimentsyndrom; Krepitation für eine Fraktur; eine Achsabweichung für Fraktur oder Fehlstellung; Schmerz für Fraktur, Neoplasie, Panosteitis oder Kompartimentsyndrom.",
      },
      {
        type: "text",
        heading: "Kniegelenk-Palpation",
        text: "Mit beiden Händen gleichzeitig prüfen Daumen und Zeigefinger das Kniegelenk zwischen Patella und Tibiaplateau, leicht kaudal des Patellaligaments, auf erhöhte Füllung, Druckschmerz und Wärme. Beim gesunden Hund lässt sich das Patellaligament gut vom dahinterliegenden Gelenkanteil abgrenzen. Schwellung, Wärme und/oder Schmerz sprechen für einen (partiellen) Kreuzbandriss, eine Meniskusverletzung, einen Abriss des M. extensor digitorum lateralis, eine Neoplasie, eine Patellaluxation oder eine Osteochondrose. Fluktuation deutet auf ein akutes Trauma oder eine Gelenkfraktur hin.",
      },
      {
        type: "text",
        heading: "Knochenkonturen und Osteophyten",
        text: "Tibia, Patella und distales Femur werden entlang des Gelenkrandes auf Druckschmerz und Osteophyten untersucht. Eine Konturstörung des Knochens spricht für ein Osteosarkom (distales Femur oder proximale Tibia) oder eine ausgeprägte Arthrose.",
      },
      {
        type: "text",
        heading: "Patellaposition",
        text: "Die Patella soll stabil in der Mitte des distalen Femurs in ihrem Sulcus liegen. Mit Daumen und Zeigefinger wird versucht, sie nach medial bzw. lateral zu luxieren — die Spannung des M. quadriceps femoris kann dabei durch Entlastung des Beines reduziert werden. Eine Hypermobilität der Patella spricht für eine Patellaluxation nach medial oder lateral (siehe Wissenseintrag „Patellaluxation beim Hund\" für Grading und Hintergrund), eine Hypomobilität dagegen für eine Kontraktur des M. quadriceps femoris. Schmerz bei Palpation von Patella und Patellaligament deutet auf Knorpelabrasion, Polyarthritis oder eine Traktionsosteochondritis am Ansatz des Patellaligaments hin.",
      },
      {
        type: "text",
        heading: "Kurz zur Bandfunktion",
        text: "Während der Streckung verhindern die gespannten Seitenbänder Rotationsbewegungen im Kniegelenk; bei Beugung wird durch das entspannte laterale Seitenband eine Innenrotation möglich, der die Kreuzbänder entgegenwirken. Eine Außenrotation wird ausschließlich durch das laterale Seitenband verhindert.",
      },
    ],
    errorTags: ["Befund übersehen", "Differentialdiagnostik unvollständig", "vorschnelle Diagnose"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 5, Abschnitte 5.3.3–5.3.4 (Unterschenkelregion, Knieregion), S. 89–93. Alle beschriebenen Tests, Befunde/DD-Zuordnungen sowie die Bandfunktions-Kurzbeschreibung sind im Original so beschrieben. Bewusst nicht 1:1 übernommen: die vollständige Auflistung aller Kniegelenksbänder mit lateinischen Einzelnamen — hier auf die für die Untersuchungslogik relevante Funktionsbeschreibung reduziert, um keine reine Nomenklaturliste ohne didaktischen Mehrwert zu erzeugen.",
    relatedCaseIds: ["bruno"],
    relatedAnatomyIds: ["quadriceps"],
  },
  {
    id: "oberschenkel-huefte-stehender-hund-untersuchung",
    category: "UNTERSUCHUNG",
    title: "Oberschenkel und Hüfte am stehenden Hund untersuchen",
    teaser:
      "Vom Muskelumfang bis zum Iliopsoas-Dehntest — vier Handgriffe, die zwischen Hüftgelenkproblem, Muskelverletzung und einem ganz woanders liegenden Problem unterscheiden helfen.",
    sections: [
      {
        type: "text",
        heading: "Oberschenkelmuskulatur",
        text: "Die Muskeln werden von distal nach proximal auf Position, Verlauf, Umfang und Schmerzhaftigkeit palpiert. Der Gesamtumfang wird reproduzierbar am proximalen Ende, auf Höhe der Leistengrube, gemessen (Maßband, Schnur oder Hände). Schmerzhafte, hypomobile Muskelstränge in der kaudalen Oberschenkelmuskulatur sprechen für eine Fibrose der ischiokruralen Muskulatur (\"hamstring muscles\": M. biceps femoris, M. semitendinosus, M. semimembranosus). Ein im Seitenvergleich reduzierter Umfang deutet auf eine chronische Minderbelastung hin — das eigentliche Problem kann dabei im Bein selbst oder seitlich in der Wirbelsäulenregion liegen. Ein schmerzhafter, geschwollener M. quadriceps femoris spricht für eine Kontraktur dieses Muskels, ein schmerzhafter M. pectineus für eine Hüftgelenkdysplasie oder -arthrose.",
      },
      {
        type: "text",
        heading: "Hüftgelenkposition",
        text: "Tuber ischiadicum, Trochanter major und Crista iliaca werden mit drei Fingern palpiert — im Seitenvergleich sollen sie gleichgeformte Dreiecke bilden. Steht der Trochanter major nicht in physiologischer Position oder ist er nicht palpierbar, spricht das für eine Hüftgelenkluxation (kraniodorsal, kaudoventral oder kranioventral).",
      },
      {
        type: "text",
        heading: "Manipulation des Hüftgelenks",
        text: "Mit einer Hand am distalen Femur und der anderen über dem Trochanter major wird das Hüftgelenk gestreckt, gebeugt und abduziert, sodass der Hund kurzzeitig nur auf dem kontralateralen Bein steht — das Femur soll dabei jeweils in eine horizontale Lage gebracht werden können. Ein allgemein reduzierter Bewegungsumfang spricht für Hüftgelenkarthrose, Hüftgelenkdysplasie, Hüftgelenkluxation oder Neoplasie. Schmerz nur bei Streckung deutet auf Hüftgelenkarthrose, Hüftgelenkdysplasie, eine Cauda-equina-Kompression, Spondylose oder einen Bandscheibenvorfall hin — Krepitation mit Schmerz auf Hüftgelenkarthrose oder Neoplasie.",
      },
      {
        type: "text",
        heading: "Prüfung des M. iliopsoas",
        text: "Bei voller Streckung des Hüftgelenks wird das Femur zusätzlich innenrotiert, wodurch der M. iliopsoas maximal gedehnt wird. Direkter Druck auf den kranialen/mittleren Muskelanteil ist ventral der Wirbelsäule von lateral möglich; bei Hunden unter ca. 25 kg gelingt zusätzlich eine rektale Palpation kranial des Os ilium. Schmerz, der erst bei der Kombination aus voller Streckung und Innenrotation auftritt, spricht für eine Zerrung des M. iliopsoas oder eine Hüftgelenkarthrose. Schmerz bereits bei direktem Druck auf den Muskel spricht eher für die Zerrung allein.",
      },
    ],
    errorTags: ["Befund übersehen", "Differentialdiagnostik unvollständig", "Anatomieverwechslung", "falsche Priorisierung"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 5, Abschnitte 5.3.5–5.3.6 (Oberschenkelregion, Hüftregion), S. 93–96. Alle beschriebenen Tests und Befunde/DD-Zuordnungen sind im Original so beschrieben.",
    relatedCaseIds: ["luna"],
    relatedAnatomyIds: ["iliopsoas", "huefte", "quadriceps", "biceps-femoris", "semitendinosus"],
  },
  {
    id: "hintergliedmasse-differenzialdiagnosen-kompass",
    category: "UNTERSUCHUNG",
    title: "Differentialdiagnosen-Kompass: Untersuchung der Hintergliedmaße am stehenden Hund",
    teaser:
      "Ein knapper Überblick, welche Erkrankungen in welcher Region der Hintergliedmaße am häufigsten hinter einem auffälligen Befund stecken.",
    sections: [
      {
        type: "text",
        text: "Diese Übersicht fasst die wichtigsten Differentialdiagnosen der systematischen Untersuchung des stehenden Hundes nach Region zusammen — als schnelle Orientierung, nicht als Ersatz für die ausführlichen Befund-DD-Zuordnungen in den jeweiligen Wissenseinträgen zu den einzelnen Regionen.",
      },
      {
        type: "table",
        heading: "Region und ihre wichtigsten Differentialdiagnosen",
        columns: ["Region", "Wichtigste Differentialdiagnosen"],
        rows: [
          ["Zehen, Metatarsus und Tarsalknochen", "Polyarthritis, Frakturen, Neoplasien"],
          ["Sprunggelenksregion", "Instabilitäten, Osteochondrose des Talus, Riss/Teilriss des Fersensehnenstrangs"],
          ["Unterschenkel", "Panosteitis, Neoplasie"],
          ["Knie", "Kreuzbandriss, partieller Kreuzbandriss, Patellaluxation"],
          ["Oberschenkel", "Neoplasie, Panosteitis, Muskelverhärtung/-fibrose"],
          ["Hüfte", "Hüftgelenkdysplasie/-arthrose, Hüftgelenkluxation, Morbus Legg-Perthes"],
        ],
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "falsche Priorisierung"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 5.3.7 (Übersicht häufiger, möglicher Differenzialdiagnosen), Tab. 5.1, S. 97. Die Tabelleninhalte sind im Original so aufgeführt.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "zehen-karpus-vordergliedmasse-untersuchung",
    category: "UNTERSUCHUNG",
    title: "Zehen, Metacarpus und Karpalgelenk an der Vordergliedmaße untersuchen",
    teaser:
      "Dieselbe Untersuchungslogik wie an der Hintergliedmaße, aber mit eigener Anatomie — vom Karpaltunnel bis zum Radiuskurvensyndrom.",
    sections: [
      {
        type: "text",
        heading: "Standsymmetrie und Drucktest",
        text: "Der Untersucher steht vor dem Hund und umfasst beide Carpi auf Höhe der Ossa carpi accessoria, um sie mit gleicher Kraft nach kranial zu ziehen — ein zu leichtes Zurückziehen im Seitenvergleich spricht für eine generelle Schwäche des Beines. Beim Drucktest werden beide Beine proximal des Carpus umfasst und auf den Tisch gedrückt: Schmerzäußerung oder Hochheben der Pfote deutet auf ein distales Problem hin (Gelenkschwellung der Zehen, Fraktur der Zehen oder Metakarpalknochen, ein karpales Problem), eine Dorsoflexion der Zehen auf eine Ruptur der Zehenflexoren.",
      },
      {
        type: "text",
        heading: "Karpaltunnel — wichtige Anatomie",
        text: "Der Karpaltunnel wird vom Retinaculum flexorum (einer Verstärkung der tiefen karpalen Faszie) und vom palmaren Anteil der Gelenkkapsel gebildet. Durch ihn verlaufen die Endsehnen des M. flexor digitorum profundus, Arterien und Venen sowie der N. ulnaris und der N. medianus — eine für die Differentialdiagnose relevante Engstelle.",
      },
      {
        type: "text",
        heading: "Karpalknochen",
        text: "Metacarpus und Carpus werden vergleichend palpiert, inklusive der Position des Os carpi accessorium am kaudalen lateralen Rand. Achsabweichungen oder Durchtrittigkeit sprechen für eine Fraktur karpaler/metakarpaler Knochen oder Bänder (v. a. palmar), eine Fraktur des Os carpi accessorium oder einen Riss der Kollateralbänder. Eine Konturstörung (Schwellung) palmar deutet auf eine alte Verletzung oder ein akutes Hyperextensionstrauma hin. Krepitation oder Dislokation des Os carpi accessorium spricht für dessen Fraktur oder einen Band-/Sehnenriss der karpalen Flexoren.",
      },
      {
        type: "text",
        heading: "Karpalgelenk",
        text: "Der kraniale Anteil des Antebrachiokarpalgelenks ist zwischen den beiden Processus styloidei palpierbar; im physiologischen Zustand hat das Gelenk kaum Füllung. Füllung, Wärme und/oder Schmerzhaftigkeit sprechen für Polyarthritis, eine Seitenbandruptur, eine Gelenkfraktur oder eine Neoplasie des distalen Radius. Eine Valgusfehlstellung deutet auf eine mediale Seitenbandruptur oder einen Radius curvus hin, eine Konturstörung am medialen Gelenkanteil auf einen chronischen Bandschaden oder eine Tendovaginitis des M. abductor pollicis longus. Der physiologische Hyperextensionswinkel beträgt etwa 25° ± 10°, die Valgusstellung bis 15°.",
      },
    ],
    errorTags: ["Befund übersehen", "Differentialdiagnostik unvollständig", "Anatomieverwechslung"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 5.4.1–5.4.2 (Zehen/Metacarpus/Karpalknochen, Karpalgelenk), S. 98–101. Alle beschriebenen Tests, Befund-DD-Zuordnungen sowie die Karpaltunnel-Anatomie und die Winkelangaben sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "unterarm-ellbogen-vordergliedmasse-untersuchung",
    category: "UNTERSUCHUNG",
    title: "Unterarm und Ellbogengelenk an der Vordergliedmaße untersuchen",
    teaser:
      "Der Radius curvus, die Seitenbandprüfung per Pro-/Supination und die Frage, ob ein nichtvereinigter Processus anconaeus dahintersteckt.",
    sections: [
      {
        type: "text",
        heading: "Unterarmregion",
        text: "Radius und Ulna werden, soweit unter der Haut palpierbar, von distal nach proximal ertastet — mit besonderer Aufmerksamkeit für die beiden Processus styloidei, den Radiuskopf und das Olecranon. Eine Krümmung des Radius nach kranial mit Valgusstellung und Außenrotation des Antebrachiums (Radius curvus) spricht für einen vorzeitigen Fugenschluss der distalen Ulnafuge (und ggf. der distalen Radiusfuge) mit resultierender Fehlstellung. Schmerz im distalen Radiusdrittel deutet auf eine Neoplasie hin, Schmerz entlang der Diaphyse/im Olecranon auf Panosteitis oder Fraktur. Schwellung der lateralen Extensoren- bzw. medialen Flexorenmuskelgruppe spricht für ein Kompartimentsyndrom, Schwellung/Wärme/Schmerz des gesamten distalen Antebrachiums für eine hypertrophe Osteodystrophie.",
      },
      {
        type: "text",
        heading: "Ellbogengelenk-Palpation",
        text: "Die Gelenkkapsel lässt sich in einem Halbkreis distal des medialen und lateralen Epicondylus humeri ertasten, nach kaudoproximal bis zum Processus anconaeus. Füllung und Wärme sprechen für Ellbogendysplasie oder -arthrose; ein stark gefülltes laterales Ellbogenkompartiment für eine Fraktur oder einen nichtvereinigten Processus anconaeus. Die Art. humeroulnaris und Art. humeroradialis bilden zusammen ein physiologisch inkongruentes Scharniergelenk — die größte Belastung der Ulna tritt an der Medialseite der Incisura trochlearis zwischen Proc. anconaeus und Proc. coronoideus medialis auf, wo bei großen und Riesenrassen häufig eine Reduktion des Gelenkknorpels zu finden ist.",
      },
      {
        type: "text",
        heading: "Seitenbänder des Ellbogens",
        text: "Mediales und laterales Seitenband sollen straff zwischen Humerus und Radiuskopf (lateral) bzw. Humerus und Ulna (medial) verlaufen. Die Stabilität wird zusätzlich durch Ad-/Abduktion sowie Pro-/Supination bei gebeugtem und gestrecktem Ellbogen geprüft. Eine Abduktion um mehr als 30° spricht für einen medialen Seitenbandriss; ein nach lateral versetzter Radiuskopf für eine laterale Ellbogenluxation. Erhöhte Supination deutet auf eine laterale, erhöhte Pronation auf eine mediale Instabilität hin — eine einprägsame Eselsbrücke, da sich Test und betroffene Seite hier über Kreuz verhalten.",
      },
    ],
    errorTags: ["Befund übersehen", "Differentialdiagnostik unvollständig", "Anatomieverwechslung"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 5.4.3–5.4.4 (Unterarmregion, Ellbogenregion), S. 102–104. Alle beschriebenen Tests und Befund-DD-Zuordnungen sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: ["supinator", "brachioradialis", "pronator-teres"],
  },
  {
    id: "oberarm-schulter-vordergliedmasse-untersuchung",
    category: "UNTERSUCHUNG",
    title: "Oberarm, Schultergelenk und Schulterblatt untersuchen",
    teaser:
      "Das Schultergelenk ist tief unter der Muskulatur versteckt und wird stattdessen über seine \"dynamischen Bänder\" — die Endsehnen der umgebenden Muskulatur — stabilisiert und geprüft.",
    sections: [
      {
        type: "text",
        heading: "Oberarmbereich",
        text: "Die Muskelbäuche werden von distal nach proximal palpiert. Besondere Aufmerksamkeit gilt der Insertion des M. biceps brachii am Radius (unter Zug nach kaudal auf Schmerz prüfen) sowie Verlauf und Ansatz des M. triceps brachii am Humerus. Ein dolenter M. biceps brachii spricht für eine Bizepstendinitis (siehe Wissenseintrag zur Bizepssehnen-Tendinopathie); eine Schwellung am Trizepsansatz für einen Teil- oder Komplettriss des M. triceps brachii oder eine Olecranonfraktur; Schmerz am Humerus für eine Neoplasie. Der M. biceps brachii windet sich von seinem Ursprung am Tuberculum supraglenoidale um den Humerusschaft und inseriert an der Tuberositas radii sowie distal des Proc. coronoideus medialis ulnae.",
      },
      {
        type: "text",
        heading: "Schultergelenk-Palpation",
        text: "Das Schultergelenk liegt tief unter der Muskulatur des Schultergürtels und ist nur von kraniomedial direkt zu ertasten, dort wo der M. biceps brachii durch das Gelenk läuft. Schmerz und Wärme sprechen für Osteochondrose, eine Bizepsentzündung oder Schulterinstabilität; Krepitation für einen chronischen Osteochondrose-Verlauf, eine Gelenkfraktur, Schulterluxation, Neoplasie oder einen Abriss des M. biceps am Tuberculum supraglenoidale.",
      },
      {
        type: "text",
        heading: "Schultergelenkstabilität",
        text: "Bei vollständiger Streckung von Ellbogen- und Schultergelenk wird das Bein abduziert. Eine Abduktion um mehr als 20° spricht für eine mediale Schulterluxation oder eine Infraspinatuskontraktur; Schmerz bei Manipulation für Osteochondrose, Bizepsentzündung, eine kraniale/laterale Luxation oder Infraspinatuskontraktur; erhöhte Beweglichkeit für eine kraniale/laterale Luxation oder Schultergelenkdysplasie. Das Schultergelenk wird nicht primär durch mechanische Bänder, sondern durch einen Adhäsion-Kohäsion-Mechanismus und eine muskuläre \"Schultermanschette\" stabilisiert: Auf der Medialseite strahlen Anteile der Endsehne des M. subscapularis ein, auf der Lateralseite Anteile von M. infraspinatus, M. supraspinatus und M. teres minor — diese Form der Stabilisierung wird auch als \"dynamische Bänder\" bezeichnet.",
      },
      {
        type: "text",
        heading: "Schulterblattregion",
        text: "Die Scapula wird an ihren Rändern abgetastet, Acromion und Spina scapulae auf korrekte Lage und Schmerz geprüft. Die Muskelgruppen kranial und kaudal der Spina scapulae werden im Umfang seitenvergleichend erfasst — ein reduzierter Umfang spricht für eine chronische Minderbelastung der Vordergliedmaße, wobei das eigentliche Problem im Bein selbst oder seitlich in der Halsregion liegen kann. Schmerz bei Palpation der Scapula deutet auf Fraktur oder Neoplasie hin. Funktionell entspricht die Scapula dem Femur und leistet den größten Beitrag zur Schrittlänge der Vordergliedmaße; ihr Drehpunkt liegt im oberen Drittel.",
      },
    ],
    errorTags: ["Befund übersehen", "Differentialdiagnostik unvollständig", "Anatomieverwechslung", "falsche Priorisierung"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 5.4.5–5.4.7 (Oberarmbereich, Schultergelenkregion, Schulterblattregion), S. 105–108. Alle beschriebenen Tests, Befund-DD-Zuordnungen sowie die Beschreibung der muskulären \"Schultermanschette\" sind im Original so beschrieben.",
    relatedCaseIds: ["rocky"],
    relatedAnatomyIds: ["biceps", "subscapularis", "supraspinatus", "infraspinatus", "teres-minor"],
  },
  {
    id: "vordergliedmasse-differenzialdiagnosen-kompass",
    category: "UNTERSUCHUNG",
    title: "Differentialdiagnosen-Kompass: Untersuchung der Vordergliedmaße am stehenden Hund",
    teaser:
      "Der Gegenpart zum Hintergliedmaßen-Kompass — welche Region welche Verdachtsdiagnosen am wahrscheinlichsten macht.",
    sections: [
      {
        type: "text",
        text: "Diese Übersicht fasst die wichtigsten Differentialdiagnosen der systematischen Untersuchung der Vordergliedmaße am stehenden Hund nach Region zusammen — als schnelle Orientierung, nicht als Ersatz für die ausführlichen Befund-DD-Zuordnungen in den jeweiligen Wissenseinträgen zu den einzelnen Regionen.",
      },
      {
        type: "table",
        heading: "Region und ihre wichtigsten Differentialdiagnosen",
        columns: ["Region", "Wichtigste Differentialdiagnosen"],
        rows: [
          ["Zehen, Metacarpus und Karpalknochen", "Polyarthritis, Frakturen, Sesamoid-Erkrankung"],
          ["Karpalgelenkregion", "Hyperextensionstrauma, Tendovaginitis des M. abductor pollicis longus, Polyarthritis"],
          ["Unterarm", "Neoplasie, Panosteitis, Radius-curvus-Phänomen"],
          ["Ellbogen", "Ellbogendysplasie/-arthrose, Ellbogenluxation"],
          ["Oberarm", "Neoplasie, Panosteitis, Bizepstendovaginitis"],
          ["Schulter", "Osteochondrose, mediale Instabilität, Kontraktur"],
        ],
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "falsche Priorisierung"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 5.4.8 (Übersicht häufiger, möglicher Differenzialdiagnosen), Tab. 5.2, S. 109. Die Tabelleninhalte sind im Original so aufgeführt.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "liegender-hund-untersuchungsprinzipien",
    category: "UNTERSUCHUNG",
    title: "Untersuchung des liegenden Hundes — allgemeine Prinzipien",
    teaser:
      "Auch wenn die betroffene Gliedmaße längst bekannt scheint: Sie wird als Letzte untersucht — und manchmal ist sie gar nicht allein betroffen.",
    sections: [
      {
        type: "text",
        heading: "Aufbau der Untersuchung",
        text: "Der Hund wird in Seitenlage verbracht. Eine Hilfsperson fixiert die beiden auf dem Tisch liegenden Gliedmaßen jeweils proximal des Carpus und des Tarsus und kann über den eigenen Ellbogen zusätzlich Kopfbewegungen des Hundes kontrollieren — der Hund soll dabei aber weiterhin Abwehr- und Schmerzreaktionen zeigen können. Der Besitzer hält sich mit Vorteil in Kopfnähe auf.",
      },
      {
        type: "text",
        heading: "Warum trotzdem alle vier Gliedmaßen untersucht werden",
        text: "Das Ziel dieser Untersuchungsstufe ist das Stellen einer klinischen Diagnose. Obwohl die betroffene Körperregion meist schon aus Ganganalyse und Untersuchung des stehenden Hundes bekannt ist, werden dennoch alle Gliedmaßen untersucht — die betroffene Gliedmaße zuletzt. So lassen sich geringe Abweichungen von der Norm überhaupt erst im Seitenvergleich erkennen. Außerdem kann durchaus mehr als eine Gliedmaße oder Körperregion betroffen sein, etwa bei Panosteitis, Polyarthritis, den meisten Dysplasieformen oder Kreuzbandrissen — ein wichtiger Grund, die Untersuchung nicht vorzeitig beim ersten auffälligen Befund abzubrechen.",
      },
      {
        type: "list",
        heading: "Am liegenden Hund erfasste Befundkategorien",
        items: [
          "Konturstörungen bzw. Schwellung",
          "Wärme und/oder Schmerz",
          "Hypomobilität",
          "Hypermobilität",
          "Krepitation",
          "Luxationen",
          "Instabilität",
        ],
      },
    ],
    errorTags: ["vorschnelle Diagnose", "Differentialdiagnostik unvollständig", "falsche Priorisierung"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 6.1 (Spezifische Bemerkung zur Untersuchung des liegenden Hundes), S. 110. Der Untersuchungsaufbau, die Begründung für die Untersuchung aller vier Gliedmaßen sowie die Liste der Befundkategorien sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "zehen-tarsus-sprunggelenk-liegender-hund-untersuchung",
    category: "UNTERSUCHUNG",
    title: "Zehen, Tarsalknochen und Sprunggelenk am liegenden Hund untersuchen",
    teaser:
      "Am liegenden Hund lässt sich jedes Zehengelenk einzeln durchbewegen und der Fersensehnenstrang gezielt auf seine Integrität prüfen — Handgriffe, die im Stehen so nicht möglich sind.",
    sections: [
      {
        type: "text",
        heading: "Summarischer Test der Pfote",
        text: "Haut und Zwischenzehenbereich werden inspiziert, die Zehenballen palpiert. Zehen und Metatarsi werden umfasst und seitlich zusammengepresst, um Schmerzreaktionen zu provozieren, und auf Konturstörungen untersucht. Eine Hautrötung im Zwischenzehenbereich spricht für Allergie; eine Konturstörung für Neoplasie; Schmerz und Wärme können Neoplasie, Fraktur, Luxation oder einen Fremdkörper anzeigen.",
      },
      {
        type: "text",
        heading: "Zehengelenke einzeln durchbewegen",
        text: "Jedes Zehengelenk wird einzeln gebeugt, gestreckt, adduziert und abduziert, während die andere Hand gleichzeitig auf Wärme, Füllung, Krepitation, Achsabweichung, Hypo- und Hypermobilität sowie Schmerzäußerung prüft. Eine Hyperextension der Zehengrundgelenke (Metatarsophalangealgelenke) testet zusätzlich die dort liegenden Sesambeine der Flexorensehnen auf Schmerz. Krepitation spricht für eine Gelenkfraktur, Wärme für Polyarthritis oder Allergie, Hypomobilität für eine Sesambeinerkrankung oder ein chronisches Gelenkleiden, Hypermobilität für einen Flexoren-/Extensorenriss, Kapselriss oder eine Nervenläsion.",
      },
      {
        type: "text",
        heading: "Tarsalknochen",
        text: "Die tarsalen Knochen sind im Normalfall untereinander nicht beweglich. Sie werden palpiert und ihre kurzen Bänder durch Extension, Flexion, Abduktion und Adduktion geprüft. Hypermobilität spricht für Luxation oder Fraktur, eine ventrale Konturstörung am Calcaneus für eine pathologische Fraktur, Schwellung mit Ausfluss für die metatarsale Fistulierung des Deutschen Schäferhundes.",
      },
      {
        type: "text",
        heading: "Talokruralgelenk (Sprunggelenk)",
        text: "Bei Flexion und Extension wird auf Krepitation, Wärme, Schmerz und Fluktuation geprüft; das Gelenk ist distal der beiden Processus styloidei halbmondförmig tastbar. Die Seitenbänder werden bei gestrecktem (ca. 5–8° Abduktion/Adduktion physiologisch) und bei gebeugtem Gelenk (ca. 8–12°) getestet. Bei flexiertem Gelenk prüfen zusätzliche Rotationsbewegungen die kurzen Bandanteile — eine dabei auftretende Instabilität spricht für eine Ruptur des kurzen kaudalen Anteils des lateralen Kollateralbandes. Hypermobilität bei Abduktion/Adduktion spricht für Seitenbandruptur oder Luxation, bei Flexion/Extension für eine gelenknahe Fraktur oder Luxation; Hypomobilität für eine posttraumatische Arthrose, Osteochondrose des Talusrollkamms oder Neoplasie.",
      },
      {
        type: "text",
        heading: "Fersensehnenstrang",
        text: "Der Fersensehnenstrang wird von seinem Ansatz am Calcaneus nach proximal auf Konturstörungen oder abgerissene Stümpfe abgetastet; seine Integrität wird bei gestrecktem Kniegelenk und gebeugtem Talokruralgelenk geprüft. Eine Konturstörung am distalen Ende spricht für einen partiellen Riss, ein nicht spürbarer Strang oder fehlende Spannung für einen kompletten Riss, einen Abriss des M. gastrocnemius am Femur, eine Calcaneusfraktur/intertarsale Luxation oder eine Talokruralgelenkluxation. Ein Anteil der Sehne, der M. flexor digitorum superficialis, verläuft über den Calcaneus und kann — vor allem bei Shelties — nach lateral luxieren; sanfter Daumendruck auf die Fersenkappe prüft diese Hypermobilität gezielt.",
      },
    ],
    errorTags: ["Befund übersehen", "Anatomieverwechslung", "Differentialdiagnostik unvollständig"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 6.2.1–6.2.2 (Zehen/Metatarsus/Tarsalknochen, Sprunggelenk am liegenden Hund), S. 111–117. Alle beschriebenen Tests, Winkelangaben und Befund-DD-Zuordnungen sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "unterschenkel-femur-liegender-hund-untersuchung",
    category: "UNTERSUCHUNG",
    title: "Unterschenkel und Femur am liegenden Hund untersuchen",
    teaser:
      "Zwischen Knie und Sprunggelenk verstecken sich vor allem wachstumsbedingte und muskuläre Probleme — hier zählt vor allem, wo genau am Knochen der Schmerz sitzt.",
    sections: [
      {
        type: "text",
        heading: "Unterschenkelregion",
        text: "Beide Unterschenkel werden von distal nach proximal palpiert, insbesondere die Muskelbäuche des lateralen Kompartiments (M. tibialis cranialis, M. extensor digitorum lateralis) lassen sich gut verfolgen. Von der Fibula sind Malleolus und Fibulakopf tastbar, von der Tibia das gesamte Planum cutaneum. Schmerz in der distalen Physe spricht für eine Malleolar- oder Wachstumszonenfraktur bzw. eine Wachstumsstörung wie hypertrophe Osteodystrophie; Schmerz in der Diaphyse für Fraktur, Neoplasie oder Panosteitis; Schmerz in der proximalen Physe zusätzlich für Osgood-Schlatter (Abriss der Tuberositas tibiae bei großen, jungen Hunden) oder Neoplasie; Schmerz im Muskelbauch selbst für ein Kompartmentsyndrom.",
      },
      {
        type: "text",
        heading: "Femur",
        text: "Das Femur wird von distal nach proximal palpiert und ist distal/medial gut, proximal am großen Trochanter (lateral) tastbar. M. quadriceps femoris und Ischiokruralmuskulatur werden auf Verhärtungen und Schmerz untersucht. Schmerz mit Krepitation spricht für Fraktur oder Neoplasie, isolierter Schmerz für Panosteitis oder hypertrophe Osteodystrophie. Verhärtete Muskeln sprechen für eine posttraumatische Kontraktur, eine Fibrose der Ischiokruralmuskeln (besonders häufig beim Deutschen Schäferhund) oder ein Kompartmentsyndrom.",
      },
    ],
    errorTags: ["Befund übersehen", "Differentialdiagnostik unvollständig", "falsche Priorisierung"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 6.2.3 und 6.2.5 (Unterschenkelregion, Femur am liegenden Hund), S. 118–120 und 128–129. Alle beschriebenen Befund-DD-Zuordnungen sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: ["quadriceps", "biceps-femoris", "semitendinosus"],
  },
  {
    id: "knie-liegender-hund-spezialtests",
    category: "UNTERSUCHUNG",
    title: "Kniegelenk am liegenden Hund — die klassischen Spezialtests im Detail",
    teaser:
      "Patellaluxationsgrad, Schublade, Tibia-Kompression, Meniskus-Klicken: vier eng verwandte Handgriffe, die am liegenden Hund präziser durchführbar sind als im Stehen.",
    sections: [
      {
        type: "text",
        heading: "Beugung und Streckung",
        text: "Tuberositas tibiae, Patellaligament und Patella werden aufgesucht, dann wird das Kniegelenk gebeugt und gestreckt, während Daumen und Zeigefinger einer Hand von vorn Wärme, Fluktuation, Schwellung und Krepitation erfassen. Schmerz bei einer Gelenkpathologie zeigt sich meist erst bei maximaler Extension. Praktisch alle Kniepathologien führen zu einer deutlichen Schwellung — die Ausnahme können tiefere Grade einer Patellaluxation sein, die trotz vorliegendem Problem kaum sichtbare Schwellung verursachen.",
      },
      {
        type: "text",
        heading: "Seitenbandtest",
        text: "Bei gestrecktem Kniegelenk wird die Tibia gegenüber dem Femur abduziert, adduziert und rotiert; physiologisch sind 5–10° Gelenkbeweglichkeit möglich. Mediale Hypermobilität spricht für einen medialen Seitenbandriss (Ausriss meist am Femur; bei kleinen Hunden kann auch ein kranialer Kreuzbandriss eine erhöhte mediale Instabilität verursachen), laterale Hypermobilität für einen lateralen Seitenbandriss oder eine Fibulakopffraktur.",
      },
      {
        type: "text",
        heading: "Patellaluxation auslösen und beurteilen",
        text: "Der Untersucher führt mit einer Hand am Tarsus alle Beuge-, Streck- und Rotationsstellungen des Beins, während die andere Hand auf der Patella liegt. Zunächst wird die spontane Lage der Patella festgestellt. Aufgrund der Anatomie lässt sich eine mediale Luxation am leichtesten bei gestrecktem Hüft- und Kniegelenk mit Endorotation der Tibia auslösen, eine laterale Luxation am leichtesten bei gebeugtem Hüft- und Kniegelenk mit Exorotation der Tibia. Wichtig für eine korrekte Befunderhebung: Der Hund wird in allen physiologischen Stellungen (stehend und liegend) geprüft, es wird nur physiologische Kraft angewendet, es zählt der schlechteste festgestellte Befund, eine reitende Patella wird als „0“ notiert, und es muss sowohl auf mediale als auch auf laterale Luxation geprüft werden.",
      },
      {
        type: "table",
        heading: "Koch-Klassifikation des Untersuchungsbefundes (PL 0–4)",
        columns: ["Befund", "Position der Patella", "Reposition"],
        rows: [
          ["PL 0", "in der Trochlea, nicht auslösbar", "nicht möglich (keine Luxation)"],
          ["PL 1", "in der Trochlea, luxierbar", "spontane Reposition der Patella"],
          [
            "PL 2",
            "in der Trochlea, luxierbar",
            "springt bei Manipulation (Rotation der Tibia, Beugen/Strecken) in die Trochlea zurück",
          ],
          [
            "PL 3",
            "außerhalb der Trochlea",
            "nur durch aktive Luxation nach medial/lateral durch den Untersucher; bleibt bei Manipulation luxiert, nur die Untersucherhand kann sie zurückzwingen",
          ],
          [
            "PL 4",
            "außerhalb der Trochlea, bereits luxiert",
            "weder Manipulation noch manueller Repositionsversuch bringen die Patella zurück in die Trochlea",
          ],
        ],
      },
      {
        type: "text",
        heading: "Einordnung: PL 0–4 ist nicht die Putnam-Skala",
        text: "Diese vierstufige PL-0–4-Einteilung stammt direkt aus Kochs eigener Publikation zur Patellaluxationsdiagnostik (Koch et al. 1998) und beschreibt den Untersuchungsbefund während der Manipulation. Sie ist nicht identisch mit der an anderer Stelle in dieser Bibliothek beschriebenen Putnam-Grad-I–IV-Klassifikation (Krankheitsbild-Schweregrad inkl. Achsendeformität, siehe Wissenseintrag zur Patellaluxation) — beide Systeme beschreiben verwandte, aber unterschiedliche Dinge und sollten nicht synonym verwendet werden.",
      },
      {
        type: "text",
        heading: "Schubladentest",
        text: "Eine Hand fasst mit dem Zeigefinger die Patella und mit dem Daumen die Region um das laterale Sesambein des M. gastrocnemius, die andere Hand hält Tuberositas tibiae bzw. Fibulakopf. Der Test wird bewusst nicht in voller Extension, sondern bei leichter Beugung von 5–15° durchgeführt, ohne dabei selbst Flexion/Extension auszulösen; dann wird die Tibia nach kranial geführt. Ein weicher Anschlag nach kranial spricht für einen kranialen Kreuzbandriss, ein harter Anschlag für einen kaudalen Kreuzbandriss; Schmerz ohne Instabilität bei leichter Innenrotation der Tibia für einen partiellen oder kompletten kranialen Kreuzbandriss mit eingeklemmtem Meniskus. Hinweis zur Terminologie: Die bereits vorhandene, nach Hárrer benannte Bibliotheksseite zu Kreuzband-/Meniskustests beschreibt einen ähnlichen, dort „Lachmann-Test“ genannten Test in maximaler Extension — ob es sich um denselben Test mit unterschiedlicher Winkelkonvention oder zwei unterschiedliche Tests handelt, bleibt zwischen den beiden Quellen uneindeutig; hier wird bewusst Koch/Fischers eigene Bezeichnung und Winkelangabe übernommen.",
      },
      {
        type: "text",
        heading: "Tibia-Kompressionstest",
        text: "Eine Hand drückt mit der Innenseite auf die Patella (Zeigefingerspitze auf dem Margo cranialis tibiae), die andere fasst die Metatarsi. Knie- und Tarsalgelenk werden vollständig gestreckt, dann wird gezielt nur das Tarsalgelenk gebeugt. Die selektive Flexion bringt über den Spannsägenmechanismus der kranialen und kaudalen Unterschenkelmuskeln die Tibia unter Kompression: Ist das vordere Kreuzband gerissen, weicht die proximale Tibia dabei spürbar nach kranial aus. Kein Ausweichen spricht für ein normales Knie, einen partiellen oder kaudalen Kreuzbandriss, einen kranialen Kreuzbandriss mit eingeklemmtem Meniskus oder eine starke Kapselfibrose.",
      },
      {
        type: "text",
        heading: "Meniskustest",
        text: "Durch tiefe mediale Palpation zwischen Tibia und Femur kann eine Meniskusläsion aufgedeckt werden. Ein umgeklapptes oder gequetschtes kaudales Horn des medialen Meniskus verursacht bei Beugung und Streckung wiederholt an derselben Gelenkwinkelung Krepitation und Schmerzäußerung („Meniskus-Klicken“). Fehlt dieses typische Klicken, bedeutet das nicht automatisch einen gesunden Meniskus — der Test schließt eine Meniskusläsion nicht sicher aus. Diese direkte Palpationstechnik ist eine andere Herangehensweise als die bereits vorhandenen, nach Hárrer benannten Apley- und McMurray-Tests (beide arbeiten mit Rotationsstress statt direkter Palpation) — die drei Tests ergänzen sich, statt sich zu widersprechen.",
      },
    ],
    errorTags: ["Befund übersehen", "Differentialdiagnostik unvollständig", "vorschnelle Diagnose", "Untersuchung falsch gewählt"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 6.2.4 (Kniegelenk am liegenden Hund), S. 120–127, inkl. der dort zitierten Originalquelle [91] Koch DA, Grundmann S, Savoldelli D et al., Die Diagnostik der Patellaluxation des Kleintieres, Schw Arch Tierheilk 1998; 371–374, für die PL-0–4-Klassifikation. Alle beschriebenen Tests, Winkelangaben, die PL-Tabelle und Befund-DD-Zuordnungen sind im Original so beschrieben. Die Einordnung gegenüber der Putnam-Skala sowie der Terminologie-Hinweis zu Schubladen-/Lachmann-Test und den Meniskustests sind eigene, transparent gekennzeichnete Einordnungen zur Abgrenzung von bereits vorhandenem Hárrer-Content.",
    relatedCaseIds: ["bruno"],
    relatedAnatomyIds: ["quadriceps"],
  },
  {
    id: "huefte-liegender-hund-spezialtests",
    category: "UNTERSUCHUNG",
    title: "Hüftgelenk am liegenden Hund — Ortolani- und Bardens-Test im Detail",
    teaser:
      "Ortolani-Test bei Erwachsenen, Bardens-Test bei Welpen unter fünf Monaten — zwei Techniken für dieselbe Frage: Ist das Hüftgelenk instabil?",
    sections: [
      {
        type: "text",
        heading: "Beugung und Streckung",
        text: "Mit einer Hand über dem Hüftgelenk und der anderen am distalen Femur wird das Hüftgelenk in alle Richtungen bewegt; bei gesunden Hunden sind Streckung und Beugung bis nahezu zur Parallelität von Femur und Wirbelsäule möglich. Gleichzeitig wird der M. pectineus palpiert — eine sekundär zu Hüftarthrose oder -dysplasie entstandene Kontraktur dieses Muskels führt zu Bewegungseinschränkung und Schmerz bei direkter Palpation. Hypomobilität mit Schmerz kann neben Hüftgelenkdysplasie, Morbus Legg-Perthes, Luxation und Neoplasie auch von einer Myositis des M. iliopsoas oder einem Cauda-equina-Kompressionssyndrom bzw. Bandscheibenvorfall der Lendenwirbelsäule stammen — die Hüfte ist hier bewusst nicht die einzige Differentialdiagnose.",
      },
      {
        type: "text",
        heading: "Rotation des Femurs",
        text: "Bei einer 90°-Winkelung zwischen Beckenlängsachse und Femurschaft wird das Femur bis zu 45° innenrotiert und bis zu 90° außenrotiert; zudem soll eine Abduktion des Femurs bis ca. 90° gegenüber der Tischplatte möglich sein. Reduzierte Rotation spricht für Hüftgelenkarthrose, Legg-Perthes oder Neoplasie, erhöhte Rotation für eine Hüftgelenkluxation oder Femurkopffraktur.",
      },
      {
        type: "text",
        heading: "Luxationstest",
        text: "Der Daumen des Untersuchers wird in die kleine Grube zwischen Trochanter major und Tuber ischiadicum gedrückt, dann wird das Femur außenrotiert. Bei nichtluxiertem Hüftgelenk nähern sich die Knochenvorsprünge an und klemmen den Daumen ein; bei einer Hüftgelenkluxation nach kraniodorsal weicht der Femurkopf nach kranial aus, und der Daumen verspürt keinen Druck.",
      },
      {
        type: "text",
        heading: "Ortolani-Test",
        text: "Femur und Beckenlängsachse werden in eine relative 90°-Winkelung gebracht; ein Daumen liegt auf dem Trochanter major, die andere Hand umfasst und steuert das Femur am Kniegelenk. Das Femur wird vollständig adduziert, dann wird durch Druck auf das Knie eine mögliche Luxation des Femurkopfes nach dorsal provoziert. Ohne den axialen Druck zu reduzieren, wird das Femur langsam abduziert, bis der Femurkopf aus einer möglichen Subluxationsstellung zurück ins Acetabulum springt — spürbar am Trochanter. Keine Repositionsbewegung mit normalem Bewegungsumfang spricht für ein normales Hüftgelenk, eine spürbare Repositionsbewegung für eine Hüftgelenkdysplasie. Da der Test den dorsalen Acetabulumrand stark beansprucht, ist er bei Hunden unter fünf Monaten wegen des noch fragilen Gelenkrandes nicht indiziert.",
      },
      {
        type: "text",
        heading: "Bardens-Test als Alternative bei jungen Welpen",
        text: "Bei Hunden unter fünf Monaten wird statt des Ortolani-Tests der Bardens-Test verwendet. Die Ausgangsstellung ist gleich (Femur und Beckenlängsachse in ca. 90°-Position), doch nun umfassen beide Hände die Oberschenkelmuskulatur im proximalen Drittel und versuchen mit vertikal gerichteten Hebelbewegungen, den Femurkopf senkrecht aus dem Acetabulum zu ziehen. Eine spürbare Luxationsbewegung spricht für eine Hüftgelenkdysplasie, keine spürbare Bewegung für ein normales oder allenfalls geringgradig dysplastisches Hüftgelenk.",
      },
    ],
    errorTags: ["Befund übersehen", "Differentialdiagnostik unvollständig", "Untersuchung falsch gewählt", "falsche Priorisierung"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 6.2.6 (Hüftgelenk am liegenden Hund), S. 130–136. Alle beschriebenen Tests, Winkelangaben und Befund-DD-Zuordnungen sind im Original so beschrieben. Ergänzt die bereits vorhandene, über Hárrer verifizierte Kurzerwähnung des Ortolani-Tests um die vollständige Technik sowie den zusätzlichen Bardens-Test für junge Welpen.",
    relatedCaseIds: ["luna"],
    relatedAnatomyIds: ["huefte", "iliopsoas"],
  },
  {
    id: "zehen-karpus-liegender-hund-untersuchung",
    category: "UNTERSUCHUNG",
    title: "Zehen, Metacarpus und Karpalgelenk am liegenden Hund untersuchen",
    teaser:
      "Am Karpus verrät ein Finkelstein-artiger Test eine der häufig übersehenen Sehnenscheidenentzündungen — direkt neben dem eigentlichen Karpalgelenk.",
    sections: [
      {
        type: "text",
        heading: "Zehen, Metacarpus und Karpalknochen",
        text: "Wie an der Hintergliedmaße werden Haut und Zwischenzehenbereich inspiziert, Zehen und Metacarpi seitlich zusammengepresst und die Zehengelenke einzeln durchbewegt (Wärme, Füllung, Krepitation, Achsabweichung, Hypo-/Hypermobilität, Schmerz); eine Hyperextension der Zehengrundgelenke prüft auch hier die Sesambeine. Die interkarpalen Knochen sind normalerweise nicht gegeneinander beweglich und werden samt ihrer kurzen Bänder durch Extension, Flexion, Abduktion und Adduktion geprüft. Schmerz mit Instabilität am Os carpi accessorium spricht gezielt für eine Fraktur dieses Knochens; Hypomobilität der Zehengelenke eher für eine Sesambeinfragmentierung als für die an der Hintergliedmaße genannte Sesambeinerkrankung.",
      },
      {
        type: "text",
        heading: "Karpoantebrachialgelenk",
        text: "Die kurzen lateralen Bänder werden in Extensionsstellung geprüft (physiologisch 8–12° Abduktion/Adduktion), dann wird das Gelenk in maximale Flexion bzw. Extension verbracht. Ein kleines schräges Band verbindet das Styloid des Radius mit dem palmaren Aspekt des Os carpi radiale und wird analog zum Kniegelenk mit einem Schubladentest geprüft — bei gesunden Hunden ist dabei keine Schublade auslösbar, ein positiver Test spricht für einen Riss dieses schrägen medialen Radiokarpalbandes. Hypermobilität allgemein spricht für Seitenbandriss, eine Fraktur (Processus styloideus, karpometakarpal oder interkarpal) oder eine Instabilität nach Hyperextensionstrauma.",
      },
      {
        type: "text",
        heading: "Sehne des M. abductor pollicis longus",
        text: "Die Endsehne dieses Muskels verläuft auf der kraniomedialen Radiusseite in einer eigenen Sehnenscheide und kreuzt das Radiokarpalgelenk direkt unter dem Seitenband; sie wird per direkter Palpation auf Wärme, Schwellung und Schmerz geprüft. Analog zum humanmedizinischen Finkelstein-Test lässt sich die Sehne durch gleichzeitige maximale Flexion und Abduktion des Carpus maximal spannen, was bei einer Erkrankung eine Schmerzreaktion provoziert. Schmerz, Wärme und Schwellung im distalen medialen Radiusviertel sprechen für eine Tendovaginitis dieses Muskels oder — differentialdiagnostisch ernst zu nehmen — für ein Osteosarkom des distalen Radius.",
      },
    ],
    errorTags: ["Befund übersehen", "Anatomieverwechslung", "Differentialdiagnostik unvollständig"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 6.3.1–6.3.2 (Zehen/Metacarpus/Karpalknochen, Karpalgelenk am liegenden Hund), S. 136–142. Alle beschriebenen Tests und Befund-DD-Zuordnungen sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "unterarm-ellbogen-liegender-hund-untersuchung",
    category: "UNTERSUCHUNG",
    title: "Unterarm und Ellbogengelenk am liegenden Hund untersuchen",
    teaser:
      "Zwei der drei häufigsten Ellbogendysplasie-Formen liegen im medialen Kompartiment — ein gezielter Innenrotationstest deckt genau diesen Bereich auf.",
    sections: [
      {
        type: "text",
        heading: "Radius und Ulna",
        text: "Der Radius ist mediodistal als Styloid und proximal am lateralen Radiuskopf tastbar, die Ulna distolateral als Styloid und proximal als Olecranon; beide werden auf Druck, Schmerz und Krepitation geprüft, Rotationsbewegungen am Antebrachium testen ihre relative Beweglichkeit zueinander. Druckschmerz im distalen Drittel spricht für Osteosarkom, hypertrophe Osteodystrophie oder retinierte Knorpelzapfen; in der Diaphyse für Panosteitis, eine Wachstumsstörung oder hypertrophe Osteopathie; im proximalen Drittel für Panosteitis oder Ellbogendysplasie. Valgusstellung mit Exorotation und konvexer Radiuskurvatur spricht für einen Radius curvus nach verfrühtem distalem Fugenschluss.",
      },
      {
        type: "text",
        heading: "Ellbogengelenk: Beugung und Streckung",
        text: "Das Gelenk wird in volle Extension und Flexion verbracht, während die andere Hand Veränderungen am und im Gelenk registriert; Schmerz ist bei maximaler Extension meist intensiver auszulösen als bei Flexion. Der Processus anconaeus ist erst bei maximaler Flexion von lateral tastbar. Ein massiver Erguss im lateralen Kompartiment spricht für einen losgelösten Processus anconaeus oder eine Fraktur des Epicondylus lateralis (Salter-Harris-Typ-4-Fraktur).",
      },
      {
        type: "text",
        heading: "Seitenbandtest",
        text: "Geprüft wird bei gestrecktem (Abduktion/Adduktion physiologisch nicht über 10°) und bei gebeugtem Ellbogen — dort kreuzen sich Radius und Ulna, sodass die Außenrotation durch die medialen und die Innenrotation durch die lateralen Seitenbänder begrenzt wird. In den meisten Fällen ist das mediale Seitenband betroffen. Erhöhte Außenrotation bei gebeugtem bzw. Valgusstellung bei gestrecktem Ellbogen spricht für eine mediale Seitenbandruptur; erhöhte Innenrotation bzw. Varusstellung für die selten Auftretende laterale Seitenbandruptur; ein nach lateral verlagerter, tastbarer Radiuskopf mit reduziertem Bewegungsumfang und Krepitation für eine Ellbogenluxation nach lateral.",
      },
      {
        type: "text",
        heading: "Mediales Kompartiment gezielt prüfen",
        text: "Zwei der drei häufigen Ellbogendysplasie-Formen — fragmentierter Processus coronoideus medialis und Osteochondrose des medialen Humeruscondylus — sowie deren Folgeprobleme liegen im medialen Kompartiment und werden zusammenfassend als mediales Kompartimentsyndrom bezeichnet. Ein Finger wird direkt auf den Processus coronoideus medialis gelegt, um ihn auf Druckschmerz zu prüfen; anschließend werden Radius und Ulna bei gestrecktem Ellbogen innenrotiert, wodurch das mediale Coronoid bei intaktem medialem Seitenband in direkten Kontakt mit dem Humeruscondylus kommt und so zusätzlich auf Druckschmerz geprüft werden kann.",
      },
    ],
    errorTags: ["Befund übersehen", "Differentialdiagnostik unvollständig", "Anatomieverwechslung"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 6.3.3–6.3.4 (Radius/Ulna, Ellbogengelenk am liegenden Hund), S. 142–148. Alle beschriebenen Tests und Befund-DD-Zuordnungen sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: ["supinator", "brachioradialis", "pronator-teres"],
  },
  {
    id: "oberarm-schulter-liegender-hund-untersuchung",
    category: "UNTERSUCHUNG",
    title: "Oberarm, Schultergelenk und Schulterblatt am liegenden Hund untersuchen",
    teaser:
      "Eine Außenrotation bei leichter Extension bringt den Humeruskopf dorthin, wo eine Osteochondroseläsion überhaupt erst tastbar wird — unter mehreren Muskelschichten liegt hier fast alles versteckt.",
    sections: [
      {
        type: "text",
        heading: "Humerus",
        text: "Der Humerus wird von distal nach proximal palpiert; er ist direkt nur an seinem distalen Ende gut zugänglich. Auf der lateralen Seite kreuzt ihn der N. radialis. Proximal sind Tuberculum majus und das proximale Schaftende tastbar. Schmerz bei Palpation spricht für Fraktur, eine proximale Neoplasie, Panosteitis oder eine Verletzung des N. radialis; Krepitation für eine Fraktur.",
      },
      {
        type: "text",
        heading: "Schultergelenk",
        text: "Das Schultergelenk liegt unter vielen Muskeln und ist nur am Kranialrand medial der Bizepssehne zu palpieren; Gelenkfüllungen sind kaum spürbar. Das Gelenk wird gestreckt und gebeugt und dabei auf Schmerz geprüft. Eine mögliche Osteochondroseläsion im kaudalen Humeruskopf wird aufgedeckt, indem der Humerus bei leichter Extension außenrotiert wird — das bringt den Humeruskopf nach lateral, wo er unter den Muskelschichten indirekt geprüft werden kann; Druckschmerz am kaudalen Humeruskopf in dieser Stellung spricht für genau diese Läsion. Schwellung und Schmerz im kranialen Gelenkanteil sprechen für Bizepsabriss, Bizepstendinitis, eine Fraktur des Tuberculum supraglenoidale, eine Subluxation oder eine proximale Humerus-Neoplasie. Steht das Tuberculum majus deutlich ventral des Acromions, spricht das für eine Schulterluxation nach medial; eine Valgusstellung des Schultergelenks für eine Infra-/Supraspinatuskontraktur.",
      },
      {
        type: "text",
        heading: "Bizepssehnentest",
        text: "Die Bizepssehne ist direkt zwischen Tuberculum majus und minus unter dem intertuberkulären Ligament sowie proximal davon im Schultergelenk und distal davon im Sulcus tastbar. Sie wird maximal gespannt, indem das Schultergelenk gebeugt und das Ellbogengelenk gestreckt wird, während die andere Hand auf den schultergelenknahen Sehnenanteil drückt. Schmerz bei direktem Druck spricht für eine Bizepssehnenentzündung oder — seltener — einen Abriss der Sehne im Schultergelenk.",
      },
      {
        type: "text",
        heading: "Schulterblatt und Plexus brachialis",
        text: "Das Schulterblatt wird entlang seiner knöchernen Begrenzung palpiert, Spina scapulae und Acromion werden auf Stabilität geprüft; kaudal und kranial der Spina scapulae lässt sich zudem das Ausmaß einer Muskelhypotrophie bestimmen. Schmerz mit Krepitation spricht für eine Fraktur, Schmerz mit Schwellung für Neoplasie, eine Achsabweichung für eine verheilte Fraktur, harte und schmerzhafte Muskeln für eine Kontraktur. Der Plexus brachialis liegt direkt unter der Scapula und ist von kranial mit den Fingerspitzen erreichbar — Schmerz bei dieser subskapulären Palpation spricht für ein Plexustrauma oder einen Plexustumor.",
      },
    ],
    errorTags: ["Befund übersehen", "Differentialdiagnostik unvollständig", "Anatomieverwechslung"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 6.3.5–6.3.7 (Humerus, Schulterregion, Schulterblattregion am liegenden Hund), S. 148–156. Alle beschriebenen Tests und Befund-DD-Zuordnungen sind im Original so beschrieben.",
    relatedCaseIds: ["rocky"],
    relatedAnatomyIds: ["biceps", "subscapularis", "supraspinatus", "infraspinatus", "teres-minor"],
  },
  {
    id: "neurologische-untersuchung-anamnese-einordnung",
    category: "UNTERSUCHUNG",
    title: "Neurologischer Untersuchungsgang — Einordnung und Anamnese",
    teaser:
      "Bevor die erste Hand am Hund liegt: Rasse und zwölf gezielte Leitfragen grenzen schon vor der körperlichen Untersuchung ein, wo im Nervensystem das Problem liegen könnte.",
    sections: [
      {
        type: "text",
        heading: "Ziel: Lahmheit von Lähmung unterscheiden",
        text: "Der neurologische Untersuchungsgang dient der topischen Diagnose — er soll die Läsion im zentralen oder peripheren Nervensystem lokalisieren, um eine Lahmheit von einer Lähmung abzugrenzen. Eine genauere Lokalisation gelingt oft schon rein klinisch; in vielen Fällen muss die Untersuchung aber durch Bildgebung (Röntgen, CT, MRT) oder elektrische Funktionstests ergänzt werden. Wichtige Rahmenbedingungen: die Tests immer in derselben Reihenfolge durchführen, den Hund in ruhiger Umgebung untersuchen, bei ängstlichen Patienten wiederholen statt fehlzuinterpretieren (v. a. bei Drohreaktion und Schmerzproben), und nur bei kooperativen, unsedierten Hunden beurteilen. Befunde werden schriftlich festgehalten.",
      },
      {
        type: "table",
        heading: "Rasseprädispositionen aus dem Signalement",
        columns: ["Population", "Prädisposition"],
        rows: [
          ["Chondrodystrophe und ältere Rassen", "Bandscheibenschwäche"],
          ["Dobermann Pinscher, Deutsche Dogge", "Zervikale Spondylopathie/Instabilität"],
          ["Schäferhunde", "Degenerative lumbosakrale Stenose (DLSS), degenerative Myelopathie (DM)"],
          ["Zwerghunde", "Atlantoaxiale Subluxation, Hydrozephalus, Liquorabflussstörung"],
          ["Rhodesian Ridgeback", "Dermoid-Sinus"],
          ["American Staffordshire Terrier", "Zerebelläre kortikale Abiotrophie"],
          ["Bulldoggen, Mops", "Subarachnoidale Divertikel, degenerative/kongenitale Wirbelkanalstenosen"],
        ],
      },
      {
        type: "list",
        heading: "Zwölf Leitfragen zur Vorgeschichte",
        items: [
          "Verlauf der Erkrankung (akut, chronisch, progressiv, rezidivierend)",
          "Schilderung von Bewegung, Treppenlaufen, Zehenschleifen",
          "Haltung von Hals und Rute, Formveränderung des Körpers (v. a. der Rückenlinie)",
          "Verletzungen und Unfälle",
          "Verhalten gegenüber Menschen und Tieren, Verhaltensänderung, Aggressivität, Lernschwäche",
          "Reaktion auf normale Reize, Orientierungsvermögen auf bekanntem/unbekanntem Terrain oder im Dunkeln",
          "Futteraufnahme vom Boden, Herausfallen von Futter aus dem Fang",
          "Kotabsatzverhalten",
          "Frühere und bestehende Erkrankungen",
          "Erkrankungen der Wurfgeschwister",
          "Reaktion auf verabreichte Medikamente",
          "Impfstatus und Reaktion auf Impfungen",
        ],
      },
      {
        type: "text",
        heading: "Was einzelne Antworten schon andeuten",
        text: "Perakutes Auftreten bei einem mittelgroßen Hund ohne Trauma spricht für einen Rückenmarksinfarkt. Akutes Auftreten mit Hinterhandlähmung und Schmerz spricht für Bandscheibenvorfall, eine andere extradurale Kompression oder eine Wirbelsäulenverletzung. Tiefe Rutenhaltung mit Kotabsatz beim Gehen und Kotinkontinenz spricht für DLSS oder andere chronische kompressive Myelopathien. Mühe beim Fressen vom Boden spricht für Bandscheibenvorfall, Wobbler-Syndrom oder atlantoaxiale Subluxation. Eine Wesensveränderung spricht für eine Gehirnläsion.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "falsche Priorisierung", "vorschnelle Diagnose"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 7.1–7.2 (Einordnung, Anamnese), S. 157. Rasseprädispositionen, Leitfragen und Befund-Hinweise sind im Original so beschrieben.",
    relatedCaseIds: ["filou"],
    relatedAnatomyIds: [],
  },
  {
    id: "bewusstsein-haltung-gang-neurologisch",
    category: "UNTERSUCHUNG",
    title: "Bewusstsein, Haltung und Gang in der neurologischen Untersuchung",
    teaser:
      "Schon bevor der Hund berührt wird, verraten Körperhaltung und Gangbild, ob eher das Großhirn, das Kleinhirn, der Vestibularapparat oder das Rückenmark betroffen sein könnte.",
    sections: [
      {
        type: "text",
        heading: "Bewusstsein und Verhalten",
        text: "Der Hund wird in ruhiger Umgebung ohne störende Einflüsse beobachtet. Normal ist ein Bewusstseinszustand, in dem der Hund gezielt auf äußere Reize (Zurufen, Befehle, Klatschen, Kneifen) reagiert. Aggressivität, Unruhe, Orientierungsverlust und stereotype Bewegungen sprechen für neoplastische oder degenerative Enzephalopathien, Stoffwechselstörungen (z. B. Hepatoenzephalopathie) oder kompulsiv-obsessive Verhaltensstörungen. Apathie, Stupor oder Koma sprechen für Trauma, Tumor oder Infektion im Gehirn oder eine Stoffwechselstörung.",
      },
      {
        type: "text",
        heading: "Haltung",
        text: "Gliedmaßen, Rumpf, Hals und Hals-Kopf-Achse sollten aufeinander abgestimmt sein; die Muskulatur wird auf Hypo-/Hypertrophie und Dolenz durchpalpiert, die Beweglichkeit der Hals-Kopf-Achse passiv geprüft. Auffällige Haltungsmuster: Schiff-Sherrington (spastisch gestreckte Vorderbeine, meist schlaffe Hinterbeine) spricht für ein tiefes thorakolumbales Rückenmarkstrauma; Opisthotonus für Mittelhirnläsionen; Myoklonien für Staupe oder andere Enzephalomyelitiden; Tremor für Kleinhirnläsionen, Intoxikationen oder Stoffwechselstörungen wie Hypokalzämie; Lordose/Kyphose/Skoliose für Wirbelmissbildungen, Bandscheibenvorfälle oder Syringomyelie; Kopfschiefhaltung für periphere oder zentrale vestibuläre Probleme.",
      },
      {
        type: "text",
        heading: "Beobachtung des Ganges",
        text: "Der Hund wird im Schritt, Trab und Galopp vorgeführt. Physiologisch ist eine diagonale Gangart (Flexion einer Hintergliedmaße gleichzeitig mit der kontralateralen Vordergliedmaße, gefolgt von Extension des diagonalen Beinpaares) — Abweichungen davon werden als Inkoordination oder Ataxie bezeichnet. Je nach Lokalisation unterscheidet man spinale, zerebelläre, vestibuläre oder kortikale Ataxie, je nach Ausmaß leicht-, mittel- oder hochgradig. Stolpern, Überköten, Zehenschleifen und Schwanken der Hinterhand sprechen für spinale Ataxie (z. B. degenerative Myelopathie, kompressive Myelopathien Th3–L3); breitbeinige Stellung, spastische Gliedmaßen, Hypermetrie und Kopftremor für zerebelläre Ataxie; Kopfschiefhaltung, Kreislaufen und Gleichgewichtsverlust für vestibuläre Ataxie. Ein völliger Verlust der Bewegungsfähigkeit heißt Plegie/Paralyse, eine Herabsetzung Parese — beide werden je nach betroffenen Gliedmaßen als Mono-, Hemi-, Para- oder Tetraplegie/-parese bezeichnet. Zwangsbewegungen wie Kreisdrehen oder Wandentlanglaufen sprechen für fokale oder diffuse Großhirnveränderungen; ein Passgang hat dagegen meist keine pathologische Bedeutung und ist oft physiologisch.",
      },
    ],
    errorTags: ["Befund übersehen", "Differentialdiagnostik unvollständig", "Anatomieverwechslung"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 7.3–7.5 (Bewusstsein und Verhalten, Haltung, Beobachtung des Ganges), S. 157–159. Alle beschriebenen Befunde und ihre Zuordnung sind im Original so beschrieben.",
    relatedCaseIds: ["filou"],
    relatedAnatomyIds: ["rueckenmark"],
  },
  {
    id: "haltungs-und-stellreaktionen-hund",
    category: "UNTERSUCHUNG",
    title: "Haltungs- und Stellreaktionen prüfen",
    teaser:
      "Sieben Handgriffe, die subtile Koordinations- und Propriozeptionsstörungen sichtbar machen, lange bevor eine offensichtliche Lähmung zu sehen ist.",
    sections: [
      {
        type: "text",
        heading: "Wozu Haltungs- und Stellreaktionen dienen",
        text: "Diese Tests erfassen subtile Bewegungsstörungen, helfen das Niveau einer Leitungsunterbrechung abzugrenzen und decken Seitenunterschiede auf. Mit Ausnahme der Korrekturreaktion setzen sie ein mittleres Körpermaß und eine gewisse Kooperationsbereitschaft des Hundes voraus.",
      },
      {
        type: "text",
        heading: "Tischkantenprobe und Unterstützungsreaktion",
        text: "Bei der Tischkantenprobe wird der hochgehobene Hund einer Tischkante oder Mauer angenähert (optische Variante mit offenen Augen, taktile Variante mit verbundenen Augen und leichtem Pfotenkontakt) — normal ist ein Aufsetzen der sich nähernden Gliedmaße. Fehlende oder stark verzögerte Reaktion spricht für eine Läsion der sensorischen Bahnen, eine Mittelhirnläsion oder Blindheit. Bei der Unterstützungsreaktion wird der Hund mit frei hängenden Gliedmaßen dem Boden angenähert; normal ist Streckung, Steifhaltung und Auffußen beim Bodenkontakt. Fehlende oder verzögerte Reaktion spricht für eine Rückenmarksläsion, eine fokale zerebrale Läsion (kontralateraler Ausfall) oder eine vestibuläre Läsion (ipsilateraler Ausfall).",
      },
      {
        type: "text",
        heading: "Korrekturreaktion",
        text: "Eine Gliedmaße des stehenden Hundes wird passiv überkötet (auf die dorsale Fläche des Fußes aufgesetzt). Normal ist ein schnelles Korrigieren in die physiologische Stellung. Eine verzögerte Korrekturreaktion kann durch eine Läsion in Kortex, Kleinhirn, Hirnstamm, Pons, Medulla oblongata, Rückenmark, peripheren Nerven oder Muskeln verursacht sein — dieser Test lokalisiert also nicht sehr spezifisch, ist aber besonders sensibel für subtile Propriozeptionsdefizite.",
      },
      {
        type: "text",
        heading: "Aufrichtreaktion",
        text: "Der am Boden mit dem Kopf nach unten gehaltene Hund wird vorsichtig hinuntergelassen. Normal richtet sich zuerst der Kopf auf, dann folgen Halsflexion nach dorsal und Ausstrecken der Vorderbeine. Eine Flexion des Kopfes nach ventral bei diesem Manöver spricht für eine vestibuläre Störung.",
      },
      {
        type: "text",
        heading: "Hemiwalking und Hüpfreaktion",
        text: "Beim Hemiwalking werden beide Gliedmaßen einer Körperhälfte angehoben, der Körper wird passiv seitwärts verschoben und die Koordination der stützenden Gliedmaßen im Seitenvergleich beurteilt — ein Koordinationsproblem spricht für eine Kortexläsion. Bei der Hüpfreaktion werden drei Gliedmaßen angehoben und das Tier in verschiedene Richtungen verschoben; normal ist eine koordinierte hüpfende Bewegung mit Auffangen des Körpergewichts auf der verbliebenen Gliedmaße. Stolpern, Schwäche, Kollabieren oder unpassend große/kleine Schritte sprechen für eine Läsion oder Schwäche in Großhirn, Hirnstamm, Kleinhirn oder Rückenmark.",
      },
      {
        type: "text",
        heading: "Schubkarrentest",
        text: "Die Hinterbeine werden sanft angehoben und der Hund leicht nach vorwärts gestoßen; er sollte koordiniert auf den Vorderbeinen laufen. Zusätzliches leichtes Flektieren des Halses (nimmt visuelle Information weg) kann subtilere Ausfälle provozieren. Ein tief gehaltener Kopf spricht für ein zervikales Problem, Hypermetrie für eine Läsion im kaudalen Hirnstamm oder Kleinhirn, unsicheres Gehen mit Umfallen/Einsinken/Ataxie für ein zervikales Problem oder eine Läsion des Plexus brachialis.",
      },
    ],
    errorTags: ["Befund übersehen", "Untersuchung falsch gewählt", "Differentialdiagnostik unvollständig"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 7.6 (Haltungs- und Stellreaktionen), S. 160–163. Alle beschriebenen Tests und Befund-DD-Zuordnungen sind im Original so beschrieben.",
    relatedCaseIds: ["filou"],
    relatedAnatomyIds: ["rueckenmark"],
  },
  {
    id: "spinale-reflexe-hund",
    category: "UNTERSUCHUNG",
    title: "Spinale Reflexe prüfen und segmental zuordnen",
    teaser:
      "Jeder Reflex hat sein eigenes Rückenmarksegment — gesteigerte und abgeschwächte Reflexe zeigen in entgegengesetzte Richtungen und lokalisieren die Läsion damit sehr präzise.",
    sections: [
      {
        type: "text",
        heading: "Drei Reflextypen",
        text: "Die Funktion spinaler Reflexe hängt von der Intaktheit der motorischen und sensiblen Nerven, der Muskeln und der grauen Substanz des jeweiligen Rückenmarksegments ab. Bei Muskelstreckreflexen wird der Muskel (und seine neuromuskuläre Spindel) passiv gedehnt, was reflektorisch zur Kontraktion desselben Muskels führt. Beim Oberflächenreflex löst eine Hautstimulation eine Muskelkontraktion aus. Der Flexorreflex ist eine reflektorische Beugung der ganzen Gliedmaße nach Druck auf Fußballen oder Zwischenzehen.",
      },
      {
        type: "table",
        heading: "Reflexe der Hintergliedmaße",
        columns: ["Reflex", "Rückenmarksegment", "Auslösung", "Normale Antwort"],
        rows: [
          [
            "Patellareflex",
            "L2–L6",
            "Beklopfen des Patellarligaments mit dem Reflexhammer",
            "Kontraktion des M. quadriceps, Streckung von Knie- und Tarsalgelenk",
          ],
          [
            "M.-tibialis-cranialis-Reflex",
            "L6–S2",
            "Beklopfen des Muskels distal des Fibulakopfes",
            "Beugung des Sprunggelenks",
          ],
          [
            "Flexorreflex der Hintergliedmaße",
            "L4–S3",
            "Kneifen von Zehen, Fußballen oder Zwischenzehenhaut",
            "Ruckartiges Anziehen der ganzen Gliedmaße",
          ],
        ],
      },
      {
        type: "table",
        heading: "Reflexe der Vordergliedmaße und des Rumpfes",
        columns: ["Reflex", "Rückenmarksegment", "Auslösung", "Normale Antwort"],
        rows: [
          [
            "M.-extensor-carpi-radialis-Reflex",
            "C7–Th1",
            "Beklopfen des Muskels unterhalb des Ellbogens",
            "Leichte Streckung des Carpus",
          ],
          [
            "Flexorreflex der Vordergliedmaße",
            "C6–Th2",
            "Kneifen von Zehen, Fußballen oder Zwischenzehenhaut",
            "Ruckartiges Anziehen der Gliedmaße",
          ],
          [
            "Perinealreflex",
            "S1–S3",
            "Berühren/sanftes Kneifen der perinealen Region",
            "Kontraktion des Analsphincters, Niederdrücken des Schwanzes",
          ],
          [
            "Panniculusreflex",
            "Bis C8/Th2 (Reflexzentrum), Testbeginn kaudal auf Höhe L6",
            "Stimulation/Klemmen der Rückenhaut",
            "Kontraktion der Hautmuskulatur (Panniculus)",
          ],
        ],
      },
      {
        type: "text",
        heading: "Gesteigert oder reduziert — zwei entgegengesetzte Aussagen",
        text: "Eine gesteigerte Reflexantwort spricht für eine Läsion des oberen Motoneurons kranial des geprüften Segments. Eine reduzierte oder abwesende Antwort spricht für eine Läsion des unteren Motoneurons genau in diesem Segment (Nervenwurzel, Plexus, peripherer Nerv) oder für eine Muskelverletzung. Ein reduzierter Panniculusreflex zeigt zusätzlich eine Rückenmarksläsion kranial der getesteten Region an. Zur Erfassung von Seitenunterschieden werden die Reflexe grundsätzlich an allen vier Gliedmaßen im Vergleich geprüft.",
      },
    ],
    errorTags: ["Befund übersehen", "Anatomieverwechslung", "Differentialdiagnostik unvollständig"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 7.7 (Spinale Reflexe), S. 164–167. Alle Reflexe, Segmentzuordnungen und Befund-Interpretationen sind im Original so beschrieben.",
    relatedCaseIds: ["filou"],
    relatedAnatomyIds: ["rueckenmark"],
  },
  {
    id: "kopfnervenpruefung-hund",
    category: "UNTERSUCHUNG",
    title: "Kopfnerven systematisch prüfen",
    teaser:
      "Zwölf Kopfnerven, ein Untersuchungsgang — ein auffälliger Befund reicht, um eine Läsion sicher ins Gehirn statt ins Rückenmark zu verorten.",
    sections: [
      {
        type: "text",
        heading: "Warum die Kopfnervenprüfung so aussagekräftig ist",
        text: "Mit Ausnahme der ersten beiden Kopfnerven liegen die Kernzentren in Mittelhirn, Pons und Medulla oblongata — bei Hirnstammläsionen kann es deshalb zu einem oder mehreren Kopfnervenausfällen gleichzeitig kommen. Die Prüfung findet am besten auf dem Untersuchungstisch statt, bei verängstigten Hunden sollte sie wiederholt werden, da vor allem der Drohreflex sonst falsch interpretiert wird.",
      },
      {
        type: "table",
        heading: "Kopfnerventests im Überblick",
        columns: ["Test", "Geprüfte(r) Kopfnerv(en)", "Auslösung", "Normale Antwort"],
        rows: [
          ["Palpebralreflex", "N. trigeminus (V), N. facialis (VII)", "Berühren der Kopfhaut um die Augen", "Schließen der Augenlider"],
          [
            "Drohreflex",
            "N. opticus (II), N. facialis (VII)",
            "Plötzliche Handbewegung Richtung Auge",
            "Schließen der Augenlider; kein Lidschluss spricht für Blindheit",
          ],
          ["Wattebauschtest", "N. opticus (II), Hirnrinde", "Wattebäuschchen im Gesichtsfeld fallen lassen", "Kopf- oder Augenbewegung zum Wattebäuschchen"],
          [
            "Sensibilität im Kopfbereich",
            "N. trigeminus (V), N. vagus (X, Ohrmuschel)",
            "Leichtes Berühren/Beklopfen von Kopf bzw. Ohrmuschel",
            "Abwehrbewegung",
          ],
          [
            "Kiefertonus / Zungenmotorik",
            "N. trigeminus (V), N. hypoglossus (XII)",
            "Forciertes Öffnen des Kiefers, Beobachtung des Zungenspiels",
            "Spürbarer Widerstand beim Öffnen; symmetrisches, koordiniertes Zungenspiel",
          ],
          ["Schluckreflex", "N. glossopharyngeus (IX), N. vagus (X)", "Palpation/leichter Druck auf den Pharynx", "Schluckbewegung"],
          [
            "Gesichtsmimik",
            "N. facialis (VII)",
            "Beobachtung der allgemeinen Kopfform und Palpation der Gesichtsmuskeln",
            "Symmetrische Stellung von Augenlidern, Nasenflügeln, Ohren",
          ],
          [
            "Augenbewegung / Nystagmus",
            "N. oculomotorius (III), N. trochlearis (IV), N. abducens (VI), N. vestibulocochlearis (VIII)",
            "Kopf seitlich hin- und herbewegen",
            "Physiologischer horizontaler Nystagmus, symmetrische Augenstellung",
          ],
          [
            "Pupillarreflex",
            "N. opticus (II) afferent, N. oculomotorius (III) efferent",
            "Licht ins Auge fallen lassen",
            "Verengung der Pupille im belichteten (direkt) und im gegenseitigen Auge (indirekt)",
          ],
        ],
      },
      {
        type: "text",
        heading: "Strabismus lokalisiert den betroffenen Augennerv",
        text: "Ein ventrolateraler Strabismus spricht für eine Lähmung des 3. Kopfnervs (N. oculomotorius), ein medialer Strabismus für eine Lähmung des 6. Kopfnervs (N. abducens), eine Rotation des Augapfels für eine Lähmung des 4. Kopfnervs (N. trochlearis). Mydriasis zusammen mit ventrolateralem Strabismus und Ptosis spricht für eine Lähmung des 3. Kopfnervs oder eine Verletzung im Auge, in der Orbita oder im Mittelhirn.",
      },
      {
        type: "text",
        heading: "Horner-Syndrom als Muster erkennen",
        text: "Ptosis, Miosis, Enophthalmus und Vorfall des dritten Augenlids treten gemeinsam als Horner-Syndrom auf und sprechen für eine Schädigung der sympathischen Versorgung — mögliche Lokalisationen sind eine Hypothalamusläsion, ein Trauma an den Nervenwurzeln T1–T3 oder eine Mittelohrläsion; die genaue Ursache lässt sich aus dem Muster allein nicht ableiten, sondern nur die betroffene Bahn.",
      },
      {
        type: "text",
        heading: "Hinweis zu einer Ungenauigkeit im Quellentext",
        text: "Im ausgewerteten Kapitelabschnitt trägt der Drohreflex die Überschrift „(II, VIII)“, die zugehörige Fließtextbeschreibung nennt als Reflexbogen jedoch eindeutig N. opticus, Kortex, Kleinhirn, Hirnstamm und N. facialis — also II und VII, nicht VIII. Das ist vermutlich ein Erkennungsfehler bei der Texterfassung der Quelle. Da der Fließtext eindeutig ist, wird hier II/VII übernommen.",
      },
    ],
    errorTags: ["Befund übersehen", "Anatomieverwechslung", "Differentialdiagnostik unvollständig"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 7.8 (Kopfnerven), S. 168–173. Alle Tests, Nervenzuordnungen und Befunde sind im Original so beschrieben, mit einer transparent gekennzeichneten Ausnahme: die Kopfnervenangabe des Drohreflexes wurde wegen eines wahrscheinlichen Texterfassungsfehlers anhand der eindeutigen Fließtextbeschreibung korrigiert übernommen (siehe eigener Abschnitt).",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "schmerzausloesung-neurologische-warnzeichen",
    category: "UNTERSUCHUNG",
    title: "Schmerzauslösung in der neurologischen Untersuchung",
    teaser:
      "Nicht jede Schmerzreaktion bedeutet dasselbe: fehlende, übersteigerte und fehlgeleitete Schmerzantworten zeigen jeweils in eine andere diagnostische Richtung.",
    sections: [
      {
        type: "text",
        heading: "Durchführung",
        text: "Rücken und Hals werden palpiert und in verschiedene Richtungen bewegt: Schmerzprüfung an Thorakal- und Lendenwirbelsäule, an den Nervenwurzeln der Halswirbelsäule, bei Halsbiegebewegungen zur Seite sowie nach oben/unten, und im lumbosakralen Bereich durch Überstreckung. Ein schmerzhafter Stimulus wird über aufsteigende Rückenmarksbahnen zum Thalamus und von dort zum Großhirn geleitet, wo er bewusst als Schmerz wahrgenommen wird — das äußert sich in einer Abwehrreaktion und einem Zucken im entsprechenden Dermatom; meist dreht der Hund den Kopf bewusst zur schmerzhaften Stelle und versucht zu beißen.",
      },
      {
        type: "text",
        heading: "Drei unterschiedliche Auffälligkeiten",
        text: "Eine abwesende Reaktion (Analgesie/Anästhesie) spricht für eine schwere Läsion peripherer Nerven oder des Rückenmarks. Eine gesteigerte oder überempfindliche Reaktion (Hyperalgesie/Hyperästhesie) spricht für eine Nervenirritation (entzündlicher oder neuropathischer Schmerz) oder eine Meningenreizung, z. B. bei einem Bandscheibenvorfall. Automutilation, übermäßiges Kratzen oder Schlecken einer bestimmten Stelle (Parästhesie) sprechen für Nervenverletzungen (kompressiv, entzündlich, neoplastisch) oder ZNS-Läsionen mit Wahrnehmungsstörungen wie Syringomyelie.",
      },
    ],
    errorTags: ["Befund übersehen", "vorschnelle Diagnose", "Differentialdiagnostik unvollständig"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 7.9 (Schmerzauslösung), S. 174. Durchführung und Befund-DD-Zuordnungen sind im Original so beschrieben.",
    relatedCaseIds: ["filou", "baer"],
    relatedAnatomyIds: ["discus"],
  },
  {
    id: "neurologische-lokalisationslogik-algorithmus",
    category: "UNTERSUCHUNG",
    title: "Vom Befund zur Lokalisation: der neurologische Entscheidungsalgorithmus",
    teaser:
      "Zwei einfache Ja/Nein-Fragen — sind die spinalen Reflexe generell reduziert, gibt es Kopfnervenausfälle — reichen, um eine neurologische Läsion grob zu verorten, bevor überhaupt an Bildgebung gedacht wird.",
    sections: [
      {
        type: "text",
        heading: "Der Algorithmus in zwei Fragen",
        text: "Erste Frage: Sind die spinalen Reflexe generell reduziert? Wenn ja, liegt ein generelles Problem im peripheren Nervensystem (PNS) vor; wenn nein, liegt das Problem im zentralen Nervensystem (ZNS). Zweite Frage (nur bei ZNS-Verdacht): Bestehen ein oder mehrere Kopfnervenausfälle? Ist schon nur eine Antwort auffällig, liegt die Läsion im Gehirn — die weitere Unterscheidung (Großhirn, Kleinhirn, Hirnstamm, Vestibulärapparat) erfolgt anhand von Gangbild, Haltungs-/Stellreaktionen und Art der Kopfnervenausfälle. Sind die Kopfnerven unauffällig, liegt die Läsion im Rückenmark und wird anhand des Reflexmusters weiter segmental zugeordnet.",
      },
      {
        type: "table",
        heading: "Segmentales Reflexmuster bei Rückenmarksläsionen",
        columns: ["Segment der Läsion", "Vordergliedmaße", "Hintergliedmaße"],
        rows: [
          ["C1–C5", "Oberes Motoneuron (OMN): gesteigerte Reflexe, Spastizität", "Oberes Motoneuron (OMN): gesteigerte Reflexe, Spastizität"],
          [
            "C6–Th1 (Intumeszenz)",
            "Unteres Motoneuron (UMN): reduzierte bis abwesende Reflexe, Schlaffheit",
            "Oberes Motoneuron (OMN); Ausnahme: bei tiefer akuter Läsion kann das Schiff-Sherrington-Zeichen auftreten",
          ],
          ["Th2–L3", "Normal", "Oberes Motoneuron (OMN)"],
          ["L4–S3 (Intumeszenz)", "Normal", "Unteres Motoneuron (UMN): reduzierte bis abwesende Reflexe"],
        ],
      },
      {
        type: "list",
        heading: "Gradierung extraduraler Kompressionen (z. B. Bandscheibenvorfall)",
        items: [
          "Grad 1: nur Schmerz",
          "Grad 2: Tetra-/Paraparese, Ataxie — der Hund kann noch laufen",
          "Grad 3: Tetra-/Paraparese mit Verlust der Motorik",
          "Grad 4: Tetra-/Paraplegie mit Verlust des Oberflächenschmerzempfindens an den Gliedmaßen",
          "Grad 5: Tetra-/Paraplegie mit zusätzlichem Verlust des Tiefenschmerzempfindens an den Gliedmaßen",
        ],
      },
      {
        type: "text",
        heading: "Grenzen der Gradierung",
        text: "Diese Abfolge gilt typischerweise für extradurale Kompressionen wie Bandscheibenvorfälle, bei denen sich die Prognose mit steigendem Grad verschlechtert. Intradurale Läsionen wie Infarkte, Blutungen oder Neoplasien folgen dieser Ausfallskaskade nicht zuverlässig — die Gradierung darf hier nicht unkritisch auf die Prognose übertragen werden.",
      },
      {
        type: "text",
        heading: "Kurzcharakteristik der großen Lokalisationen",
        text: "Großhirn: Bewusstsein normal bis komatös, Verhalten aggressiv/ängstlich/verblödet, spinale Reflexe normal, reduzierter Drohreflex, gestörte Pupillenreaktion, evtl. Schmerz zervikal/im Kopfbereich. Kleinhirn: breitbeinige Haltung, Ataxie mit Spastizität und Hypermetrie im Gang, bei diffusen Läsionen generalisiert reduzierte, bei fokalen Läsionen nur kontralateral reduzierte Haltungs-/Stellreaktionen, Blindheit bei erhaltener Pupillenreaktion. Vestibulärapparat: Kopfschiefhaltung mit Falltendenz; peripher zeigt normale, zentral verzögerte Überkötungsreaktionen sowie zusätzliche Kopfnervenausfälle außer Fazialis/Sympathikus. Hirnstamm: Bewusstsein apathisch bis komatös, spastische Parese aller Gliedmaßen, vestibuläre Ataxie mit Kreiswandern/Seitenzwang, seitenbetonte Haltungs-/Stellreaktions-Defizite, normale bis gesteigerte spinale Reflexe, häufig mehrere gleichzeitige Kopfnervenausfälle (III, IV, VI, VIII, V, VII, IX, X, XII).",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "vorschnelle Diagnose", "falsche Priorisierung"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 7.10.1–7.10.2 (Lokalisation der Läsion, Übersicht wichtiger Erkrankungen — allgemeiner einleitender Teil ohne die konkreten Einzeldiagnosen), S. 175–178, nach den Empfehlungen von Jaggy [92]. Algorithmus, Segmenttabelle und Gradierung sind im Original so beschrieben.",
    relatedCaseIds: ["filou"],
    relatedAnatomyIds: ["rueckenmark"],
  },
  {
    id: "neurologische-erkrankungen-gehirn-vestibulaer-hirnstamm",
    category: "PATHOLOGIE",
    title: "Neurologische Erkrankungen: Großhirn, Kleinhirn, Vestibulärapparat, Hirnstamm",
    teaser:
      "Vom Epilepsie-Anfall bis zum geriatrischen Vestibulärsyndrom — welche Erkrankung hinter welchem Lokalisationsmuster typischerweise steckt.",
    sections: [
      {
        type: "table",
        heading: "Lokalisation Großhirn (Cerebrum)",
        columns: ["Diagnose", "Typischer Befund", "Häufigkeit"],
        rows: [
          [
            "Epilepsie",
            "Anfälle: generalisiert tonisch-klonische Krämpfe oder fokal mit kurzem Bewusstseinsverlust und kurzzeitigen Zwangsbewegungen",
            "++",
          ],
          [
            "Neoplasien (Meningiome, Gliome, mesenchymale Tumoren, Ependymome, Sarkome)",
            "Klinik abhängig von der genauen Lokalisation, im Gehirn kein einheitliches Bild",
            "++",
          ],
          ["Hirninfarkt", "Anfälle; Gangstörung mit Kreiswandern; Sehstörungen", "+"],
          ["Hydrozephalus", "Veränderte Kopfform; Lernschwierigkeiten; ventrolateraler Strabismus, Seh- oder Hörstörungen", "+"],
          ["Meningoenzephalitis", "Verhaltensstörungen, Krämpfe; Gehstörungen; Schmerzen", "+"],
        ],
      },
      {
        type: "table",
        heading: "Lokalisation Kleinhirn",
        columns: ["Diagnose", "Typischer Befund", "Häufigkeit"],
        rows: [
          ["Neoplasie", "Klinik abhängig von der genauen Lokalisation, im Kleinhirn kein einheitliches Bild", "+"],
          [
            "Tremor-Syndrom / White Dog Shaker Syndrom",
            "Betrifft v. a. weiße Hunde (West Highland White Terrier, Malteser); Verschlimmerung bei Aufregung, Spontanremission möglich",
            "+",
          ],
          ["Zerebelläre Abiotrophie", "Rassedisposition; Opisthotonus; progressive Ataxie, Tremor; reduzierte Drohreflexe", "+"],
        ],
      },
      {
        type: "table",
        heading: "Lokalisation Vestibulärapparat",
        columns: ["Diagnose", "Typischer Befund", "Häufigkeit"],
        rows: [
          [
            "Otitis media/interna",
            "Schmerzen im Ohrbereich; periphere Vestibulärsymptomatik mit Kopfschiefhaltung und Kopfschütteln; Fazialislähmung, Horner-Syndrom",
            "++",
          ],
          [
            "Ototoxische Medikamente (systemische Aminoglykoside sowie topische Präparate)",
            "Periphere vestibuläre Symptome, Taubheit",
            "+",
          ],
          [
            "Idiopathisches geriatrisches Vestibulärsyndrom",
            "Hunde über 9 Jahre; akute, leicht- bis schwergradige periphere Vestibulärdefizite ohne Horner-Syndrom und ohne Fazialislähmung",
            "+",
          ],
        ],
      },
      {
        type: "table",
        heading: "Lokalisation Hirnstamm",
        columns: ["Diagnose", "Typischer Befund", "Häufigkeit"],
        rows: [
          [
            "Läsion im Hirnstamm (allgemein)",
            "Apathisch bis komatös; spastische Parese aller Gliedmaßen, vestibuläre Ataxie, Kreiswandern, Seitenzwang; seitenbetonte Defizite bei Haltungs-/Stellreaktionen; spinale Reflexe normal bis gesteigert; Kopfnervenausfälle III/IV/VI/VIII (Schielen, Anisokorie, Nystagmus), Unterkieferlähmung, reduzierte Sensibilität im Kopfbereich (V), hängende Gesichtshälfte, fehlender Drohreflex (VII), Gleichgewichtsstörungen (VIII), Schluckstörungen/Stimmveränderung/Stridor (IX/X), Zungenlähmung (XII)",
            "+",
          ],
        ],
      },
      {
        type: "text",
        heading: "Einordnung",
        text: "Diese vier Lokalisationen liegen alle „oberhalb“ des Rückenmarks (intrakraniell bzw. im Vestibularapparat) und werden über die Kopfnervenprüfung sowie das charakteristische Gangbild von Rückenmarks- und peripheren Läsionen unterschieden (siehe Wissenseintrag zum Lokalisationsalgorithmus).",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Faktenwissen", "vorschnelle Diagnose"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 7.10.2, Tab. 7.1–7.4 (Übersicht wichtiger Erkrankungen des Nervensystems: Cerebrum, Kleinhirn, Vestibulärapparat, Hirnstamm), S. 176–177. Diagnosen, Befunde und Häufigkeitsangaben (+/++) sind im Original so aufgeführt.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "neurologische-erkrankungen-rueckenmark-periphere-nerven",
    category: "PATHOLOGIE",
    title: "Neurologische Erkrankungen: Rückenmark und periphere Nerven",
    teaser:
      "Bandscheibenvorfall, Wobbler-Syndrom, Cauda-equina-Syndrom und Co. — geordnet danach, ob die Kompression von außen kommt oder das Rückenmark selbst betroffen ist.",
    sections: [
      {
        type: "table",
        heading: "Rückenmark — nicht kompressive Erkrankungen",
        columns: ["Diagnose", "Typischer Befund", "Häufigkeit"],
        rows: [
          [
            "Fibrokartilaginäre Embolie / Rückenmarksinfarkt",
            "Junge bis mittelalte Hunde großer Rassen; initial Schmerz, dann schmerzlos; perakute Gehstörung bis Paralyse; oft Lateralisierung bei Haltungs-/Stellreaktionen",
            "++",
          ],
          [
            "Degenerative Myelopathie",
            "Berner Sennenhund, Deutscher Schäferhund; progressive Ataxie, Schwäche und Parese der Hintergliedmaße; Muskelreflexe der Hintergliedmaße normal bis leicht gesteigert, gekreuzter Extensorreflex, OMN-Zeichen",
            "++",
          ],
          [
            "Steril eitrige Meningitis-Arteritis",
            "Fieber, Leukozytose; steifer Gang, in chronischer Form Ataxie und Parese; zervikale Schmerzen",
            "+",
          ],
        ],
      },
      {
        type: "table",
        heading: "Rückenmark — kompressive Erkrankungen",
        columns: ["Diagnose", "Typischer Befund", "Häufigkeit"],
        rows: [
          [
            "Thorakolumbaler Bandscheibenvorfall",
            "Palpationsschmerz an der Vorfallstelle; aufgekrümmter Rücken; je nach Kompressionsausmaß Ataxie bis Paralyse; spinale Reflexe an Vordergliedmaße normal, an Hintergliedmaße gesteigert; Blase schwer ausdrückbar; Halsbiegeschmerz",
            "+++",
          ],
          [
            "Zervikaler Bandscheibenvorfall (C1–C5)",
            "Unruhiges Verhalten; tiefe Kopfhaltung; je nach Kompressionsausmaß Ataxie bis Paralyse (bei geringen Vorfällen manchmal nur Ausfälle an den Hintergliedmaßen); spinale Reflexe an Vorder- und Hintergliedmaße gesteigert",
            "++",
          ],
          [
            "Atlantoaxiale Subluxation",
            "Zwerghunde, Auftreten nach geringem Trauma; Tetraparese/Ataxie; gesteigerte spinale Reflexe",
            "+",
          ],
          [
            "Kaudale zervikale Spondylomyelopathie (Wobbler-Syndrom)",
            "Ataxie der Hintergliedmaße, spastisch-hypometrische Vorhand („two-engine gait“), Probleme beim Aufstehen; eingeschränkte, manchmal schmerzhafte Beweglichkeit der Halswirbelsäule",
            "+",
          ],
        ],
      },
      {
        type: "table",
        heading: "Periphere Nerven",
        columns: ["Diagnose", "Typischer Befund", "Häufigkeit"],
        rows: [
          [
            "Degenerative lumbosakrale Stenose (Cauda-equina-Syndrom)",
            "Muskelatrophie; Tiefhalten der Rute; Schwäche der Hintergliedmaße, ein- oder beidseitige Lahmheit; spinale Reflexe von N. ischiadicus, N. pudendus, Nn. pelvini und Nn. caudales in fortgeschrittenen Stadien reduziert; Schmerz im Lumbosakralbereich",
            "+++",
          ],
          [
            "Akute idiopathische Polyradikuloneuritis",
            "Schmerzen bei Aufstehen/Springen und bei Lordose, beginnende Harn-/Kotinkontinenz; normaler Kot-/Harnabsatz sonst; akute Tetraparesen; schwache bis abwesende spinale Reflexe; reduzierter Droh- und Palpebralreflex; Schmerzempfinden bleibt erhalten",
            "+",
          ],
          [
            "Neoplasien peripherer Nerven (v. a. Nervenscheidentumoren)",
            "Schmerz am Ort des Tumors; deutliche neurogene Muskelhypotrophie; reduzierte Reflexantwort",
            "+",
          ],
          [
            "Plexus-brachialis-Läsion",
            "Monoplegie einer Vordergliedmaße, Abrasion von Zehen und Pfotenrücken, tief hängender Ellbogen, evtl. „Kusshandstellung“; reduzierte bis abwesende spinale Reflexe; Horner-Syndrom; Verlust von Oberflächen- und Tiefenschmerz in den betroffenen Dermatomen",
            "+",
          ],
        ],
      },
      {
        type: "text",
        heading: "Einordnung",
        text: "Nicht kompressive und kompressive Rückenmarkserkrankungen unterscheiden sich vor allem im zeitlichen Verlauf und im Schmerzniveau (siehe auch Wissenseintrag zur Gradierung extraduraler Kompressionen); periphere Nervenerkrankungen zeigen dagegen meist normal bis reduzierte statt gesteigerte spinale Reflexe, da hier das untere statt das obere Motoneuron betroffen ist.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Faktenwissen", "vorschnelle Diagnose"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 7.10.2, Tab. 7.5–7.7 (Übersicht wichtiger Erkrankungen des Nervensystems: Rückenmark nicht kompressiv/kompressiv, periphere Nerven), S. 177–179. Diagnosen, Befunde und Häufigkeitsangaben (+/++/+++) sind im Original so aufgeführt.",
    relatedCaseIds: ["baer", "filou"],
    relatedAnatomyIds: ["discus", "rueckenmark"],
  },
  {
    id: "gelenkerkrankungen-haeufigkeit-und-ursachen",
    category: "PATHOLOGIE",
    title: "Warum so viele junge, sportliche Hunde Gelenkprobleme haben",
    teaser:
      "Rund 70 % aller Lahmheiten sitzen in der Hintergliedmaße, die Hälfte davon im Knie — und die Ursache liegt oft schon in der Welpenzeit, nicht im vermeintlichen Unfall.",
    sections: [
      {
        type: "text",
        heading: "Wo Lahmheiten typischerweise sitzen",
        text: "Rund 70 % aller Lahmheiten beim Hund sind in den Hintergliedmaßen lokalisiert, rund 50 % im Kniegelenk. Die meisten zugrunde liegenden Erkrankungen gehören zu den Dysplasieformen und ihren Folgeproblemen (Hüftgelenkdysplasie und -arthrose, Ellbogendysplasie und -arthrose, Patellaluxation) sowie zum großen Problemkreis der Kreuzbandrisserkrankung.",
      },
      {
        type: "text",
        heading: "Warum auch junge, sportliche und schlanke Hunde so oft betroffen sind",
        text: "Ein wichtiger Faktor ist die moderne Hundezucht: Im Streben nach körperlicher Perfektion und Standardmaßen wurde die Funktionalität vieler Rassen zugunsten reiner Ästhetik zurückgestuft, natürliche Selektion und freie Partnerwahl entfallen komplett. Die meisten Gelenkprobleme entstehen zudem bereits in der Welpenzeit, wenn ein zu hohes Gewicht bzw. ein zu massiger Körper auf einen noch juvenilen, zarten Gelenkknorpel trifft und ihn innerhalb kurzer Zeit schädigt. Für korrigierende Eingriffe über Futtermenge, Medikamente oder Operationen ist es oft zu spät, weil Hunden nur wenige Wochen für die Skelettentwicklung zur Verfügung stehen.",
      },
      {
        type: "text",
        heading: "Kreuzbandriss neu gedacht: Dysplasie statt Unfall",
        text: "Auch beim Kreuzbandriss dominieren in den Krankengeschichten große und übergewichtige Hunde — nur selten wird von einer großen Krafteinwirkung auf das Kniegelenk berichtet. Der Kreuzbandriss beim Hund gehört deshalb eher zu den Dysplasieformen bzw. Fehlentwicklungen des Skeletts als zu den Unfällen. Die therapeutische Konsequenz: Ein simpler Ersatz des gerissenen Bandes löst das zugrunde liegende Problem nicht — erst eine Biomechanikänderung oder ein kompletter Gelenkersatz hilft nachhaltig. Umstellungsosteotomien an Ellbogen, Hüfte oder Knie leiten die fehlgerichteten Muskelkräfte um und führen zu dauerhafteren Therapieerfolgen als ein reiner Bandersatz.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "vorschnelle Diagnose", "falsche Priorisierung"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.1.1 (Allgemeine Informationen, Häufigkeiten), S. 182. Häufigkeitsangaben und die Einordnung des Kreuzbandrisses sind im Original so beschrieben.",
    relatedCaseIds: ["bruno"],
    relatedAnatomyIds: [],
  },
  {
    id: "allgemeine-therapieprinzipien-gelenkerkrankungen",
    category: "THERAPIE",
    title: "Allgemeine Therapieprinzipien bei Gelenkerkrankungen",
    teaser:
      "Zwischen Schmerzmittel und Skalpell liegt ein ganzes Bündel an Maßnahmen — Bewegungssteuerung, Gewichtsreduktion und Physiotherapie tragen oft mehr zum Ergebnis bei als das einzelne Medikament.",
    sections: [
      {
        type: "text",
        heading: "Medikamentöse Optionen im Überblick",
        text: "Nichtsteroidale Entzündungshemmer (NSAIDs) wirken am Effektororgan mit einer Wirkdauer von meist 12–24 Stunden; bei Langzeitgebrauch müssen Nieren- und Leberfunktion kontrolliert werden. Opioide/Opiate wirken zentral im Gehirn, werden meist injiziert oder über die Haut abgegeben, mit sehr unterschiedlicher Wirkdauer je nach Substanz. Als Schmerzmittel eingesetzte Steroide (z. B. Prednisolon, Dexamethason) müssen wegen bedeutender gastrointestinaler und endokrinologischer Nebenwirkungen mit Vorsicht verschrieben werden. Konkrete Dosierungen sind hier bewusst nicht aufgeführt — die Verordnung ist tierärztliche Entscheidung, nicht Teil des physiotherapeutischen Aufgabenbereichs.",
      },
      {
        type: "text",
        heading: "Knorpelschutzpräparate",
        text: "Orale Präparate mit Chondroitin und Glukosamin (gewonnen aus Haifischknorpel und Rindertrachea) werden wegen ihres hohen Molekulargewichts nur zu rund 10 % resorbiert; ihre Wirkung gilt als umstritten, sie sollen mindestens 2 Monate lang und in hoher Reinheit verabreicht werden, um therapeutische Spiegel zu erreichen. Grünlippmuschel-Extrakte wirken primär schmerzlindernd und nur wenig knorpelerhaltend. Injizierbare Knorpelbestandteile (Hyaluronsäure, Pentosanpolysulfat) umgehen den Verdauungsprozess und erreichen dadurch höhere Wirkspiegel im Gelenk.",
      },
      {
        type: "text",
        heading: "Bewegungssteuerung statt Ruhigstellung",
        text: "Hunde mit Gelenk-, Knochen- oder Muskelleiden sollten vor einer geplanten oder nach einer erfolgten Operation bzw. im Rahmen einer konservativen Therapie nur kurzzeitig, dafür aber oft spazieren geführt werden. Dieser Bewegungsplan aktiviert die Muskulatur und vermeidet gleichzeitig, dass Ermüdungsphänomene die Gelenke unphysiologisch belasten. Die Bewegung sollte keinesfalls zu stark reduziert werden, da gut ausgebildete Muskulatur gerade auf proximale Gelenke wie Hüfte und Schulter eine wichtige stabilisierende Funktion hat.",
      },
      {
        type: "text",
        heading: "Gewichtsreduktion",
        text: "Da rund 60 % des Körpergewichts auf den Vorderbeinen lasten, ist eine Gewichtsreduktion vor allem bei Erkrankungen der Vordergliedmaße sinnvoll — der Effekt der Belastungsreduktion auf den geschädigten Gelenkknorpel kann je nach Erkrankung kaum hoch genug eingeschätzt werden.",
      },
      {
        type: "text",
        heading: "Rolle der Physiotherapie und Zusammenarbeit mit dem Tierarzt",
        text: "Die generellen Ziele der Physiotherapie bei konservativer oder postoperativer Behandlung sind die rasche Rückkehr zu normalem Bewegungsablauf, Erhalt und Aufbau von Muskulatur, Erhöhung des Bewegungsumfangs verletzter oder arthrotischer Gelenke, das Abführen von Wundsekreten und gestauter Lymphe sowie die Korrektur von Fehlbelastungen durch chronische Gelenkleiden. Die Zusammenarbeit zwischen Tierarzt und Physiotherapie beginnt im Idealfall schon vor einem geplanten chirurgischen Eingriff, mit gemeinsam festgelegten Zielen; mit der postoperativen Physiotherapie wird so rasch wie möglich begonnen — nach einer Femurkopfresektion z. B. bereits nach 5 Tagen, bei Kreuzbandrissen etwas später.",
      },
    ],
    errorTags: ["Faktenwissen", "falsche Priorisierung", "Differentialdiagnostik unvollständig"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.1.2 (Allgemeine Therapieempfehlungen), S. 182f. Wirkprinzipien und Therapieziele sind im Original so beschrieben; konkrete Medikamenten-Dosierungen aus der Quelle wurden bewusst nicht übernommen (siehe Hinweis im Text) — die App richtet sich an Tierphysiotherapeut:innen, nicht an verschreibende Tierärzt:innen.",
    relatedCaseIds: ["bruno"],
    relatedAnatomyIds: [],
  },
  {
    id: "osteochondrose-hund",
    category: "PATHOLOGIE",
    title: "Osteochondrose (OC) — wenn wachsender Knorpel sich vom Knochen löst",
    teaser:
      "Vier typische Lokalisationen, vier Schweregrade — und ein Mechanismus, der erklärt, warum ausgerechnet die zentralen Gelenkanteile schnell wachsender, großer Hunde betroffen sind.",
    sections: [
      {
        type: "text",
        heading: "Was passiert",
        text: "Die Osteochondrose (OC) ist eine Entwicklungsstörung des Hundewelpen: Der Gelenkknorpel degeneriert und kalzifiziert nicht planmäßig, sondern hypertrophiert stattdessen — es entsteht eine zunehmend verdickte Knorpelschicht, die nur durch Diffusion aus der Synovia ernährt wird und deren tiefere Zonen dadurch nekrotisieren können. Als vermutete Ursachen gelten rasches Wachstum, ungenügende Ernährung, Kalzium-Überversorgung, Genetik, Übergewicht und starke Gelenkbeanspruchung — eine einheitliche Ätiologie ist nicht gesichert. Das Ergebnis ist eine weiche Knorpelschicht, die sich vom subchondralen Knochen ablösen und als frei bewegliches Dissekat im Gelenk selbständig machen kann. OC wird in vier Grade eingeteilt: Grad-IV-Defekte sind schmerzhaft und werden meist operativ behandelt, geringere Grade können spontan heilen oder bleiben symptomlos.",
      },
      {
        type: "table",
        heading: "Vier typische Lokalisationen",
        columns: ["Gelenk", "Betroffene Struktur", "Anteil aller OC-Fälle"],
        rows: [
          ["Schultergelenk", "Zentraler/kaudozentraler Humeruskopf", "74 %"],
          ["Ellbogengelenk", "Medialer Humeruscondylus", "13 %"],
          ["Sprunggelenk (Tarsus)", "Talusrollkamm (75 % medial, 25 % lateral)", "9 %"],
          ["Kniegelenk", "Lateraler (selten medialer) Femurcondylus", "4 %"],
        ],
      },
      {
        type: "text",
        heading: "Klinik je nach Gelenk",
        text: "Erste Symptome treten meist im Alter von 4–7 Monaten auf, betroffen sind vor allem frohwüchsige, große und männliche Hunde, häufig bilateral. Am Tarsus zeigt sich eine deutliche Klinik mit Anlauflahmheit, steil stehenden Hintergliedmaßen und ausgeprägter Gelenkfüllung. Am Knie ist ein Kniegelenkerguss mit Druckdolenz am lateralen Femurcondylus tastbar. Am Ellbogen ist die Klinik von einer medialen Coronoiderkrankung kaum zu unterscheiden. An der Schulter ist die Lahmheit meist diskret, mit Druckschmerz am zentralen/kaudalen Humeruskopf bei Innenrotation.",
      },
      {
        type: "text",
        heading: "Therapie",
        text: "Eine konservative Therapie (Dauertherapie mit Schmerzmitteln, Knorpelschutzpräparate, Gewichtsreduktion, häufige kurze Spaziergänge, Physiotherapie) ist indiziert bei intermittierender Lahmheit, kaum sichtbaren Röntgenveränderungen und bei erwachsenen Hunden mit bereits fortgeschrittenen degenerativen Veränderungen. Deutlich sichtbare Läsionen bei jungen Hunden mit akuter Lahmheit werden dagegen meist chirurgisch (Kürettage, Debridement, Entfernung freier Fragmente) behandelt — je jünger der Hund, desto besser die Prognose. Schulter-OC hat die beste, tarsale OC die schlechteste Prognose.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Faktenwissen", "vorschnelle Diagnose"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.2.1 (Osteochondrose), S. 183–186. Ätiologie, Lokalisationsverteilung, Klinik und Therapie sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "panosteitis-hypertrophe-osteodystrophie-knorpelzapfen",
    category: "PATHOLOGIE",
    title: "Drei Wachstumserkrankungen der langen Röhrenknochen unterscheiden",
    teaser:
      "Panosteitis, hypertrophe Osteodystrophie und retinierte Knorpelzapfen betreffen alle junge, große Hunde — aber mit unterschiedlichem Verlauf, unterschiedlicher Lokalisation und sehr unterschiedlicher Prognose.",
    sections: [
      {
        type: "text",
        heading: "Panosteitis — die wandernde, selbstlimitierende Knochenschmerz-Erkrankung",
        text: "Panosteitis betrifft praktisch ausschließlich juvenile Hunde großer Rassen (5–18 Monate, überwiegend männlich), selten bis zum Alter von 3 Jahren. Die Ursache ist unbekannt; gesichert ist nur, dass sie mit einem Fettzelluntergang im Bereich des Foramen nutritium langer Röhrenknochen beginnt, gefolgt von einer sehr schmerzhaften Phase und einem Reparaturprozess, der nach 6–12 Wochen abgeschlossen ist. Am häufigsten betroffen ist die Ulna (rund 42 %), gefolgt von Radius, Humerus, Femur und Tibia. Typisch ist eine spontan beginnende Lahmheit, die zwischen Tagen und 3–6 Wochen dauert, sich nicht durch Aufwärmen bessert und oft von Bein zu Bein wechselt — der Schmerz kann so stark sein, dass das Bein gar nicht belastet wird. Panosteitis ist selbstlimitierend und hinterlässt keine Folgeschäden; die Therapie ist rein unterstützend (Schmerzmittel, reduzierte Fütterung, da Überfütterung als möglicher Faktor gilt).",
      },
      {
        type: "text",
        heading: "Hypertrophe Osteodystrophie — akut, schmerzhaft, mit möglichem Radius-curvus-Folgeschaden",
        text: "Auch als Moeller-Barlow-Erkrankung oder metaphysäre Osteopathie bezeichnet, mit unbekannter Ätiologie (diätetische Hypothesen wie Vitamin-C-Mangel oder Vitamin-D-Überversorgung gelten als widerlegt). Sie betrifft den metaphysären Knochen von Welpen im Alter von 3–5 Monaten, meist beidseits an den distalen Vordergliedmaßen, mit dolenter Schwellung, oft begleitet von Fieber, Anorexie, Schwäche und Dehydration — Todesfälle sind möglich. Nach Befall der distalen Ulna kann der vorzeitige Fugenschluss zum Radius-curvus-Phänomen führen (Krümmung des Radius, Valgusfehlstellung, Außenrotation), da die Ulna dann wie eine bremsende Spange wirkt, während der Radius weiterwächst. Milde Fälle werden mit Schmerzmitteln und Ruhigstellung behandelt, schwere Fälle benötigen intensivere Betreuung; drohenden starken Fehlstellungen kann frühzeitig mit einer Ulnaosteotomie begegnet werden.",
      },
      {
        type: "text",
        heading: "Retinierte Knorpelzapfen — dieselbe Folge, anderer Mechanismus",
        text: "Hierbei handelt es sich um eine verzögerte Knochenbildung der Wachstumsfuge, meist an der distalen Ulna — möglicherweise eine spezielle Form der Osteochondrose. Sie tritt im Alter von 3–4 Monaten bei großen Rassen auf, beginnt mit milder Lahmheit und führt — wie die hypertrophe Osteodystrophie — über eine Wachstumsbremsung der Ulna zum Radius-curvus-Phänomen, allerdings sind die betroffenen Tiere ansonsten gesund (kein Fieber, keine Allgemeinsymptome). Die Therapie richtet sich nach dem Ausmaß der Achsabweichung, von palliativer Schmerzbekämpfung bis zur Korrekturosteotomie.",
      },
      {
        type: "text",
        heading: "Warum die Abgrenzung wichtig ist",
        text: "Alle drei Erkrankungen betreffen junge, große Hunde und können lahmheitsauslösend sein — aber Panosteitis heilt folgenlos aus, während hypertrophe Osteodystrophie und retinierte Knorpelzapfen beide über eine gestörte distale Ulnafuge zu einer bleibenden Fehlstellung (Radius curvus) führen können. Die Unterscheidung entscheidet also direkt darüber, ob abgewartet werden darf oder frühzeitig eine Korrektur erwogen werden muss.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Anatomieverwechslung", "vorschnelle Diagnose"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.2.2–8.2.4 (Panosteitis, Hypertrophe Osteodystrophie, Retinierte Knorpelzapfen), S. 186–189. Ätiologie, Klinik und Therapie sind im Original so beschrieben; konkrete Medikamenten-Dosierungen wurden bewusst nicht übernommen.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "polyarthritis-hund",
    category: "PATHOLOGIE",
    title: "Polyarthritis — wenn mehrere Gelenke gleichzeitig betroffen sind",
    teaser:
      "Steifes Gangbild, Fieber unklarer Ursache und zuerst die distalen Gelenke betroffen — die idiopathische Polyarthritis gehört in jede Differentialdiagnoseliste bei unerklärt hoher Körpertemperatur.",
    sections: [
      {
        type: "table",
        heading: "Einteilung der Arthritiden",
        columns: ["Hauptgruppe", "Untergruppen"],
        rows: [
          ["Nichtentzündlich", "Degenerativ, kongenital, traumatisch, neoplastisch, hämophil"],
          ["Entzündlich, infektiös", "Bakterien, Mykoplasmen, Protozoen"],
          [
            "Entzündlich, nichtinfektiös",
            "Kristallinduziert; immuninduziert (erosive Formen wie rheumatoide Arthritis oder Polyarthritis bei Greyhounds; nichterosive Formen wie idiopathische Polyarthritis, systemischer Lupus erythematodes, Impfreaktion, Polyarthritis nach Meningitis)",
          ],
        ],
      },
      {
        type: "text",
        heading: "Die häufigste Form: idiopathische Polyarthritis",
        text: "Die bei Weitem häufigste Polyarthritis-Form beim Hund ist die idiopathische Polyarthritis aus der immuninduzierten, nichterosiven Gruppe. Immuninduzierte Formen können auch als Folge systemischer neoplastischer, infektiöser, parasitärer oder anderer schwerer Erkrankungen auftreten, ausgelöst durch Antigen-Antikörper-Komplexe und Entzündungsprodukte, die in und neben den Gelenken abgelagert werden. Die seltenere erosive Form zeigt zusätzlich chondrodestruktive Kollagenasen und Proteasen und damit deutlichere Knorpel-/Knochenzerstörung.",
      },
      {
        type: "text",
        heading: "Klinisches Bild",
        text: "Hunde werden meist vorgestellt, weil sie ungern und steif laufen; die Lahmheitsgrade variieren stark, häufig besteht Fieber. Typischerweise sind zuerst die distalen Gelenke (Zehen, Karpal-/Tarsalgelenke) geschwollen, warm und dolent, weiter proximale Gelenke sind seltener betroffen — das Gangbild verschlechtert sich charakteristischerweise auf unebenem Gelände. Arthrotische Zubildungen finden sich erst im chronischen Verlauf.",
      },
      {
        type: "text",
        heading: "Diagnostik und Therapie",
        text: "Die Diagnostik ist aufwendig: Röntgen der am stärksten betroffenen Gelenke zum Ausschluss eines primär degenerativen/traumatischen Geschehens, komplettes Blutbild, Gelenkpunktate mit zytologischer Untersuchung, serologische Tests auf Primärerreger (z. B. Ehrlichien, Toxoplasmen, Borrelien). Ein zytologischer Befund einer eitrigen Synovitis ohne Bakteriennachweis bei negativen Infektions-/Primärerkrankungs-Tests führt zur Diagnose immuninduzierte Polyarthritis. Erosive Formen benötigen zusätzlich eine Gelenkkapselbiopsie zur Diagnosesicherung. Therapeutisch werden Kortikosteroide eingesetzt (bei erosiven Formen zusätzlich zytotoxische Medikation); die Behandlung muss immer auch die zugrunde liegende Erkrankung mit einschließen. Die Prognose der erosiven Polyarthritis ist wegen bleibender Gelenkschäden vorsichtig zu stellen; immuninduzierte Formen lassen sich dagegen oft gut kontrollieren, teils sogar mit späterem Absetzen der Medikation.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Faktenwissen", "vorschnelle Diagnose"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.2.5 (Polyarthritis), S. 188–190, inkl. Tab. 8.1 (Arthritis-Einteilung, zitiert nach [111]). Klassifikation, Klinik, Diagnostik und Therapieprinzip sind im Original so beschrieben; konkrete Medikamenten-Dosierungen wurden bewusst nicht übernommen.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "osteomyelitis-hund",
    category: "PATHOLOGIE",
    title: "Osteomyelitis — Knocheninfektion nach Trauma, OP oder Streuung",
    teaser:
      "Eine Infektion, die im Röntgenbild erst nach Wochen sichtbar wird — und bei der ein zunächst unauffälliger Heilungsverlauf nach einer Operation eine beginnende Osteomyelitis leicht verdecken kann.",
    sections: [
      {
        type: "text",
        heading: "Ursachen und Entstehung",
        text: "Die meisten Knocheninfektionen sind bakteriell (rund 70 % Aerobier, oft Staphylokokken; daneben Streptokokken, E. coli, Pasteurellen, Klebsiellen, Serratien, Proteus; bei Bissverletzungen/Darmrupturen auch Anaerobier wie Bacteroides, Fusobacterium, Clostridien). Typische Eintrittspforten sind offene Frakturen, Knochensequester, Bissverletzungen, Streuinfektionen aus anderen Körperregionen oder iatrogene Wundinfektionen durch unsteriles Arbeiten oder wiederholte chirurgische Eingriffe. Der Knochen selbst ist eigentlich relativ infektionsresistent — erst traumatisch oder iatrogen geschädigtes Weichgewebe, gestörte Blutzufuhr, Implantate, systemische Erkrankungen oder Mangelzustände schwächen die Abwehr so weit, dass eine Bakterienbesiedlung gelingt. Bei Neonaten/Welpen ist zusätzlich eine hämatogene Streuung aus dem Nabel möglich, mit potenziell dramatischen Folgen, da die stark durchblutete Wachstumszone rasch irreversibel zerstört werden kann. (Die beim Deutschen Schäferhund bekannten metatarsalen Fistulierungen haben dagegen keinen ossären Ursprung und sollen nicht mit klassischer Osteomyelitis verwechselt werden.)",
      },
      {
        type: "text",
        heading: "Klinisches Bild",
        text: "Hämatogen streuende Infektionen gehen praktisch immer mit Fieber und Zeichen eines septischen Geschehens einher, betroffene junge Hunde fressen kaum und zeigen Lahmheit bei infizierten Knochen. Exogen verursachte Osteomyelitiden verlaufen dagegen unspezifischer: die Region ist warm und schmerzhaft, die Muskulatur bildet sich zurück, die Lahmheit ist eher leicht. Nach vorausgegangenen orthopädischen Eingriffen lässt sich eine beginnende Osteomyelitis kaum von einem normalen, leicht verzögerten Heilungsverlauf unterscheiden — Fistelkanäle zeigen sich erst im chronischen Verlauf und schließen sich unter Antibiose, um nach deren Absetzen erneut aufzubrechen.",
      },
      {
        type: "text",
        heading: "Diagnostik und Therapie",
        text: "Eine akute Osteomyelitis zeigt im Röntgenbild proliferative periostale Reaktionen, Osteolyse der Kompakta und diffuse Weichteilschwellung; bei chronischem Verlauf einen sklerotischen Randsaum, ggf. einen Sequester. Schnittbildverfahren wie CT sind zur Sequester-Detektion sensitiver als das Röntgenbild. Für eine sichere Erregerbestimmung muss eine Knochenkultur entnommen werden (Fistelkanal-Abstriche sind nicht diagnostisch verwertbar), idealerweise nach mindestens 48 Stunden ohne vorherige Antibiotikagabe. Lokal begrenzte Fälle ohne Beeinträchtigung des Allgemeinbefindens können antibiotisch behandelt werden; ausgedehntere Fälle benötigen zusätzlich ein chirurgisches Debridement mit Entfernung nekrotischer Knochenstücke und ggf. Implantatentfernung. Bei septischen Gelenken sind ausgiebige Spülung und lange Antibiose nötig — Gelenkprothesen können nach einer Infektion in der Regel nicht mehr eingesetzt werden, da Bakterien praktisch nie vollständig aus dem Knochen zu entfernen sind.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Befund übersehen", "Faktenwissen"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.2.6 (Osteomyelitis), S. 190–192. Ätiologie, Klinik, Diagnostik und Therapieprinzip sind im Original so beschrieben; konkrete Medikamenten-Dosierungen wurden bewusst nicht übernommen.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "knochentumoren-gelenktumoren-hund",
    category: "PATHOLOGIE",
    title: "Osteosarkom und Synovialzellsarkom — die wichtigsten Knochen- und Gelenktumoren",
    teaser:
      "Ein Osteosarkom am Kniegelenk kann klinisch wie ein Kreuzbandriss aussehen — und ein Synovialzellsarkom kann sogar einen echten Kreuzbandriss auslösen. Zwei Tumoren, bei denen Bildgebung unverzichtbar ist.",
    sections: [
      {
        type: "text",
        heading: "Osteosarkom — der weitaus häufigste Skeletttumor",
        text: "Mit rund 80 % ist das Osteosarkom der häufigste Knochentumor des Hundes, betrifft (anders als beim Menschen) meist ältere, große Hunde und bevorzugt die Prädilektionsstellen distaler Radius, proximaler Humerus, distales Femur und proximale Tibia (jeweils ellbogenfern bzw. knienah). Typischer Patient: groß, 7–8 Jahre alt, mit progredienter, auf Schmerzmittel nicht ansprechender Lahmheit ohne Besserung nach Aufwärmen; oft starker Muskelschwund der betroffenen Gliedmaße. Mikrofrakturen im Tumorbereich können zu einer akuten Lahmheit oder sogar zu einer pathologischen Fraktur ohne adäquates Trauma führen — meist am Femur. Tumoren am proximalen Humerus können klinisch eine N.-radialis-Lähmung vortäuschen (Carpus/Ellbogen in Flexion, kein Auffußen); Tumoren am distalen Femur können mit einem Kreuzbandriss verwechselt werden, zumal ein Osteosarkom hier sogar sekundär einen echten Kreuzbandriss auslösen kann. Zum Diagnosezeitpunkt haben bereits rund 99 % der Hunde Lungenmikrometastasen. Da meist schon Fernmetastasen vorliegen, ist die Behandlung überwiegend palliativ (Amputation, ggf. mit Chemotherapie oder gliedmaßenerhaltender Tumorresektion).",
      },
      {
        type: "text",
        heading: "Synovialzellsarkom — der häufigste Gelenktumor",
        text: "Gelenktumoren sind insgesamt selten, aber maligne; der häufigste ist das Synovialzellsarkom, das aus undifferenzierten mesenchymalen Zellen in Gelenknähe entsteht und sich der Gelenkkapsel außen anheftet oder ins Gelenk hineinwächst. Im fortgeschrittenen Stadium ist die Destruktion beider am Gelenk beteiligten Knochen charakteristisch — im Unterschied zum monoossär destruktiven Osteosarkom. Da viele dieser Tumoren am Kniegelenk auftreten, wird klinisch zunächst oft ein partieller oder kompletter Kreuzbandriss vermutet: diffus geschwollenes, bei Extension und Schubladentest dolentes Knie, aber ohne Krepitation, mit progressivem statt akutem Verlauf. Die lokale Tumorresektion führt meist innerhalb von 1–24 Monaten zum Rückfall; eine Amputation verlängert das Leben im Mittel um rund 17 Monate, histologisch aggressive Formen sollten zusätzlich Chemotherapie erhalten.",
      },
      {
        type: "text",
        heading: "Warum Bildgebung hier unverzichtbar ist",
        text: "Beide Tumoren können sich klinisch als „gewöhnliches“ orthopädisches Problem tarnen (N.-radialis-Lähmung, Kreuzbandriss) — der rein orthopädische Untersuchungsgang allein reicht zur Diagnose nicht aus. Erst Röntgenbilder (unregelmäßige Knochenauflösung und periostale Zubildung beim Osteosarkom vs. periphere, unregelmäßige Gelenkschwellung mit Knochendestruktion beim Synovialzellsarkom) und Biopsien liefern die entscheidende Unterscheidung.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "vorschnelle Diagnose", "Befund überbewertet"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.2.7–8.2.8 (Knochentumoren, Gelenktumoren), S. 192–194. Ätiologie, Klinik, Diagnostik und Prognoseangaben sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "hypertrophe-osteopathie-marie-bamberger",
    category: "PATHOLOGIE",
    title: "Hypertrophe Osteopathie (Marie-Bamberger-Syndrom) als Alarmsignal",
    teaser:
      "Schmerzhafte Schwellungen an allen vier distalen Gliedmaßen sind selten harmlos — meistens steckt ein Tumor oder Abszess in Brust- oder Bauchhöhle dahinter.",
    sections: [
      {
        type: "text",
        heading: "Mechanismus",
        text: "Der hypertrophen Osteopathie (auch hypertrophe Osteoarthropathie oder Marie-Bamberger-Syndrom genannt) geht immer eine große Raumforderung voraus — meist ein Tumor oder Abszess im Thorax oder Abdomen. Man vermutet, dass neurovaskuläre Reflexe im Zusammenhang mit dieser Grunderkrankung periphere Shunts, dadurch lokale Knochenhypoxie und schließlich eine reaktive Knochenneubildung auslösen. Die dabei entstehenden perlschnurartigen periostalen Veränderungen finden sich nur an den Röhrenknochen, nicht an den Gelenken selbst — und können sich bei erfolgreicher Behandlung der Grunderkrankung zurückbilden.",
      },
      {
        type: "text",
        heading: "Klinik, Diagnostik und Prognose",
        text: "Die Erkrankung ist selten und betrifft meist ältere, oft großrassige Hunde mit einer meist tumorbedingten Primärmasse. Palpierbare, dolente und ödematöse Schwellungen beginnen typischerweise an den distalen Vordergliedmaßen, im weiteren Verlauf kommt eine milde Lahmheit hinzu. Im Röntgenbild zeigen sich charakteristische regelmäßige Periostzubildungen, zunächst entlang der Metacarpi/Metatarsi, dann entlang der langen Röhrenknochen — zur Diagnosesicherung gehört zwingend die Suche nach dem Primärproblem in Thorax oder Abdomen. Da es sich dabei meist um einen Lungentumor handelt, ist die Prognose trotz der grundsätzlich regressiven Knochenveränderungen insgesamt als ungünstig einzustufen.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Befund übersehen", "Faktenwissen"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.2.9 (Hypertrophe Osteopathie), S. 194f. Mechanismus, Klinik und Diagnostik sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "tarsus-erkrankungen-hund",
    category: "PATHOLOGIE",
    title: "Vier Erkrankungen rund um Sprunggelenk und Fersensehnenstrang",
    teaser:
      "Ein plantigrader Gang kann drei völlig verschiedene Ursachen haben — Sehnenriss, Spontanfraktur oder Fersenkappenluxation. Die Unterscheidung entscheidet direkt über die Therapie.",
    sections: [
      {
        type: "text",
        heading: "Traumatische Instabilität des Tarsus",
        text: "Die kleinen Tarsalknochen bestehen zu großen Teilen aus kortikalem Gewebe, sind durch kurze straffe Ligamente verbunden und nur schwach durchblutet. Instabilitäten werden palpatorisch und mittels gehaltener Röntgenaufnahmen (seitliche Stressaufnahmen, Hyperextensions-/Hyperflexionsaufnahmen) diagnostiziert. Bei Welpen unter 6 Monaten heilen intertarsale Rupturen/Luxationen oft schon mit Ruhigstellung und Schienung innerhalb von 6–8 Wochen aus; bei älteren Hunden sind aufwendigere Rekonstruktionen nötig, häufig mit dem Endpunkt einer Teil- oder Panarthrodese.",
      },
      {
        type: "text",
        heading: "Spontanfraktur des Calcaneus",
        text: "Die Ursache ist unbekannt; prädisponiert sind collieartige und übergewichtige Hunde. Typisch ist das Fehlen jeder Traumaanamnese bei ein- oder beidseitig teilweise oder komplett plantigradem Gang, oft mit Druckstellen über dem Calcaneus — der Fersensehnenstrang selbst bleibt dabei intakt, was die wichtige Abgrenzung zum echten Sehnenriss ermöglicht. Eine konservative Versorgung mit Schiene oder Orthese ist hier aussichtslos (Drucknekrosen, starke Muskelzugkräfte behindern die Heilung); nötig ist eine korrekt durchgeführte Arthrodese über mindestens 6 Monate.",
      },
      {
        type: "text",
        heading: "Riss des Fersensehnenstrangs",
        text: "Der Fersensehnenstrang (Tendo calcaneus communis) besteht beim Hund aus drei Anteilen: der Sehne des M. gastrocnemius (Hauptanteil), der Sehne des M. flexor digitorum superficialis (bildet die Fersenkappe) und der gemeinsamen Endsehne von M. biceps femoris, M. gracilis und M. semitendinosus — anders als beim Menschen ist das also keine reine Wadenmuskel-Sehne. Auslöser für Risse sind stumpfe/spitze Traumata oder eine durch chronische Kortikosteroidgabe geschwächte Bindegewebsstruktur (Spontanriss); betroffene Hunde zeigen einen plantigraden Gang mit calcaneusnah tastbaren Sehnenstümpfen. Die Therapie besteht aus einer Einzelnaht der Sehnenenden (z. B. Locking-Loop- oder Three-Loop-Pulley-Naht) mit anschließender Immobilisation über 4–6 Wochen.",
      },
      {
        type: "text",
        heading: "Fersenkappenluxation",
        text: "Ein seitliches, praktisch ausschließlich beim Sheltie beobachtetes Luxieren der Fersenkappe (Teil des M. flexor digitorum superficialis) nach lateral, verursacht durch einen zu flach ausgebildeten Sulcus am Calcaneus. Das Gangbild ähnelt dem einer Patellaluxation. Je nach Schweregrad wird die Sehne mit nicht-resorbierbaren Fäden fixiert, mittels Drahtschlinge zur korrekten Führung gezwungen oder der Sulcus operativ vertieft — die Prognose ist gut.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Anatomieverwechslung", "Befund übersehen"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.3.3 (Instabilität des Tarsus, Spontanfraktur Calcaneus, Riss des Fersensehnenstranges, Fersenkappenluxation), S. 195–199. Ätiologie, Klinik und Therapieprinzipien sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "kreuzbandriss-biomechanik-und-therapie",
    category: "PATHOLOGIE",
    title: "Kreuzbandriss beim Hund: die biomechanische Erklärung",
    teaser:
      "Der Quadrizeps zieht bei jedem Schritt permanent nach kranial am vorderen Kreuzband — bei großen, steilen oder übergewichtigen Hunden reicht diese Dauerbelastung allein, um es Stück für Stück reißen zu lassen.",
    sections: [
      {
        type: "text",
        heading: "Warum die alte „Sportverletzung“-Erklärung nicht passt",
        text: "Beim Menschen entsteht ein Kreuzbandriss meist durch eine äußere Einwirkung (z. B. beim Fußball oder Skifahren). Beim Hund sprechen mehrere Fakten gegen eine analoge Unfall-Ursache: Entfernte Kreuzbandreste zeigen Zeichen längerer Degeneration, meist entsteht zuerst ein Teilriss und erst später ein Totalriss, eine massive Krafteinwirkung wird praktisch nie beobachtet, und je schwerer ein Hund ist, desto häufiger tritt ein Riss auf (besonders bei Rottweiler, Neufundländer, Staffordshire Terrier). Ist ein Knie betroffen, reißt nicht selten auch das andere. Auf Röntgenbildern vermeintlich „akuter“ Risse ist oft schon Arthrose sichtbar — ein weiteres Indiz für einen länger andauernden Prozess statt eines einmaligen Ereignisses.",
      },
      {
        type: "text",
        heading: "Die biomechanische Erklärung: cranial tibial thrust",
        text: "Der M. quadriceps femoris ist der Hauptkraftgeber des Kniegelenks. Vektoranalytisch zerlegt zieht ein Teil seiner Kraft senkrecht zum Tibiaplateau (Gelenkkompressionskraft), während sein nach kranial gerichteter Anteil — die Scherkraft, „cranial tibial thrust“ (CTT) — permanent am vorderen Kreuzband zieht. Diese Scherkraft ist umso stärker, je größer und übergewichtiger der Hund ist, je steiler seine Hinterhand steht, je aktiver er ist, je schmaler die proximale Tibia ausgebildet ist und je steiler das Tibiaplateau abfällt. Unter dieser Dauerbelastung erleidet das vordere Kreuzband zunächst einen Teilriss, später einen Totalriss. Meniskusschäden betreffen meist das mediale kaudale Meniskushorn, das wegen seiner Fixierung am medialen Kollateralband wenig mobil ist und dadurch bei den Rotationsbewegungen der Fußungsphase besonders vorgeschädigt wird.",
      },
      {
        type: "text",
        heading: "Vorderer vs. hinterer Kreuzbandriss unterscheiden",
        text: "Hintere Kreuzbandrisse sind extrem selten und meist traumatisch bedingt. Die Unterscheidung gelingt über das Gefühl am Ende der Kranialverschiebung der Tibia beim Schubladentest: Ein harter, abrupter Stopp spricht für einen hinteren Kreuzbandriss (das noch intakte vordere Kreuzband limitiert die Bewegung), ein eher weicher Stopp (nur durch die Gelenkkapsel begrenzt) für einen vorderen Kreuzbandriss. Eine mediale Patellaluxation kann in fortgeschrittenem Alter einen vorderen Kreuzbandriss begünstigen, weil die dabei erhöhte Innenrotation der Tibia das vordere Kreuzband zusätzlich schwächt.",
      },
      {
        type: "text",
        heading: "Therapieoptionen im Überblick",
        text: "Kleine Hunde kompensieren die Instabilität oft gut über Kapselfibrose und muskuläre Kompensation, sodass eine Operation nicht zwingend nötig ist. Bei Hunden über 5 kg wird eine operative Versorgung empfohlen, da ein unbehandelter Riss rasch zu massiver Arthrose führt. Klassische Optionen sind der Bandersatz mit Muskelfaszien/Sehnenplatten oder ein extrakapsulärer Fadenersatz außerhalb des Gelenks. Moderne Verfahren (Tibia Plateau Levelling Osteotomy, TPLO; Tibial Tuberosity Advancement, TTA) verändern stattdessen die Kniebiomechanik so, dass die Scherkraft auf ein rekonstruiertes Kreuzband praktisch entfällt — bei schweren Hunden und starker Arthrose gelten sie heute als Methode der Wahl, mit einfacherer Nachsorge und einer Erholungszeit von rund 3 Monaten. Nachbehandlung umfasst in jedem Fall Physiotherapie, Gewichtskontrolle und maßvolle Bewegung.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Faktenwissen", "Untersuchung falsch gewählt"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.3.4 (Kreuzbandriss), S. 199–202. Ätiologie, Biomechanik und Therapieoptionen sind im Original so beschrieben. Ergänzt die bereits vorhandene, webbasierte Übersicht `kreuzbandriss-krankheitsbild` um die buchbasierte biomechanische Herleitung und konkrete Operationsverfahren.",
    relatedCaseIds: ["bruno"],
    relatedAnatomyIds: ["quadriceps"],
  },
  {
    id: "patellaluxation-grad-und-therapieoptionen",
    category: "PATHOLOGIE",
    title: "Patellaluxation: Gradeinteilung und Operationsprinzipien im Detail",
    teaser:
      "Warum die typische Lahmheit bei Patellaluxation kommt und geht — und weshalb bei dieser Diagnose ausnahmsweise die klinische Untersuchung wichtiger ist als jedes Röntgenbild.",
    sections: [
      {
        type: "text",
        heading: "Warum kleine Rassen besonders betroffen sind",
        text: "Die genauen Ursachen der Patellaluxation (PL) sind nicht abschließend geklärt; der Trend zur Miniaturisierung begünstigt aber offenbar die mediale Luxation (deutlich häufiger als die laterale). Betroffene kleine Rassen sind unter anderem Französische Bulldogge, Mops, Pudel, Pekinese, Jack Russell Terrier, Chihuahua, Zwergspitz, Malteser, Papillon und Bolonka Zwetna; bei großen Rassen sind es u. a. Flat Coated Retriever, Appenzeller, Neufundländer und American Cocker Spaniel. Für den Kooikerhund wurde eine Heritabilität von rund 27 % berechnet. Die Patella luxiert meist bereits im ersten Lebensjahr.",
      },
      {
        type: "text",
        heading: "Warum die Lahmheit typischerweise intermittierend ist",
        text: "Die Erstluxation verursacht Gelenkerguss, Schmerz und akute Lahmheit. Folgeluxationen sind meist weniger schmerzhaft, nutzen aber über Monate bis Jahre den retropatellären und femoralen Gelenkknorpel ab, bis ein irreversibler Knorpelschaden mit abgeflachtem Sulcus femoris entsteht. Solange die funktionelle Einheit aus Tuberositas tibiae, Patellaligament, Patella und M. quadriceps femoris luxiert ist, kann sie das Knie beim Auffußen nicht vor dem Einknicken schützen — der Hund hält das Bein gebeugt. Durch Schüttel- oder Drehbewegungen kann die Patella spontan in ihre physiologische Position zurückspringen, worauf der normale Gang fortgesetzt wird. Genau dieser Wechsel erklärt die für die PL typische, pathognomonische intermittierende Lahmheit mit Phasen normalen Gangs und Laufen auf drei Beinen.",
      },
      {
        type: "table",
        heading: "Gradeinteilung nach amerikanischem Standard",
        columns: ["Grad", "Patellaposition vor Manipulation", "Reposition"],
        rows: [
          ["Grad 1", "Immer im Sulcus femoris", "Springt nach Luxation spontan zurück"],
          ["Grad 2", "Im Sulcus femoris, luxierbar", "Durch Manipulation des Beins (Beugen, Strecken, Rotation)"],
          ["Grad 3", "Medial oder lateral des Sulcus", "Nur mit dem Finger des Untersuchers"],
          ["Grad 4", "Dauerhaft luxiert", "Nicht mehr in die physiologische Stellung zu bringen"],
        ],
      },
      {
        type: "text",
        heading: "Einordnung dieser Skala",
        text: "Diese Grad-1–4-Einteilung nach amerikanischem Standard entspricht inhaltlich der bereits vorhandenen Putnam-Skala im Eintrag zum Patellaluxations-Krankheitsbild — eine unabhängige Bestätigung aus einer zweiten Quelle, keine widersprüchliche Zweitklassifikation. Sie ist aber nicht zu verwechseln mit der andernorts dokumentierten Koch-eigenen PL-0–4-Klassifikation aus Kap. 6.2.4 (Untersuchungsbefund während der Kniemanipulation am liegenden Hund) — beide Systeme heißen ähnlich, beschreiben aber unterschiedliche Dinge.",
      },
      {
        type: "text",
        heading: "Untersuchungsprinzip: der schlechteste Befund zählt",
        text: "Zur Gradbestimmung wird der Hund stehend und liegend sowie in allen physiologisch möglichen Rotations-, Beuge- und Streckstellungen untersucht — es gilt jeweils der schlechteste festgestellte Befund. Luxiert die Patella beim stehenden Hund bereits spontan, gilt Grad 3, selbst wenn sie in liegender Position durch Manipulation wieder in den Sulcus zurückspringt. Die Diagnose ist rein klinisch: Röntgen, CT und MRT liefern kein standardisiertes, wiederholt auswertbares Verfahren zur Gradbestimmung, sodass ein erhebliches Maß an Untersucher-Subjektivität bestehen bleibt — anders als bei den meisten anderen orthopädischen Diagnosen dieses Buches.",
      },
      {
        type: "text",
        heading: "Operative Prinzipien",
        text: "Ziel jeder Operation ist die Wiederherstellung der korrekten relativen Position von Patella und Femur: meist durch Versetzen des Tuberositas-tibiae-Ansatzes nach medial oder lateral kombiniert mit einer Vertiefung des Sulcus femoris (Sulkoplastik, keilförmig oder als Block), ergänzt durch Weichteilstraffung. Bei starker Knorpelerosion oder sehr flachem Sulcus femoris kann alternativ eine Halbprothese („patellar groove“) direkt unter die Patella geschraubt werden, ohne die Tuberositas tibiae zu versetzen.",
      },
    ],
    errorTags: ["Untersuchung falsch gewählt", "Befund überbewertet", "Differentialdiagnostik unvollständig"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.3.5 (Patellaluxation), S. 202–206. Rasseprädispositionen, Gradeinteilung, Untersuchungsprinzip und Operationsverfahren sind im Original so beschrieben. Ergänzt die bereits vorhandene, webbasierte Übersicht `patellaluxation-krankheitsbild`.",
    relatedCaseIds: ["bruno"],
    relatedAnatomyIds: ["quadriceps"],
  },
  {
    id: "weitere-knieerkrankungen-hund",
    category: "PATHOLOGIE",
    title: "Zwei seltenere Knieerkrankungen: Sehnenabriss und Osgood-Schlatter",
    teaser:
      "Eine dauerhaft überstreckte Zehenhaltung nach einer Kreuzband- oder Patella-OP kann an einer ganz anderen Sehne liegen als vermutet.",
    sections: [
      {
        type: "text",
        heading: "Avulsion des M. extensor digitorum longus",
        text: "Die Sehne dieses Muskels entspringt der Fossa extensoria des lateralen Femurcondylus. Sie kann bei unvorsichtiger Eröffnung des Kniegelenks von lateral durchtrennt oder bei Osteotomien zur Behandlung von Kreuzbandriss oder Patellaluxation versehentlich verletzt werden (iatrogen); bei jungen Hunden entstehen Abrisse auch traumatisch, meist mit einem kleinen mitausgerissenen Stück des Femurcondylus. Klinisch zeigt sich eine Hyperflexion der Zehen mit moderater Lahmheit (2/4) bei stabilem, aber gefülltem und dolentem Kniegelenk. Unbehandelt bleibt die Hyperflexion der Zehen dauerhaft bestehen — teils durch Physiotherapie kompensierbar, meist wird die Sehne aber am Femur oder, bei chronischem Verlauf mit starker Sehnenverkürzung, an der proximalen Tibia refixiert.",
      },
      {
        type: "text",
        heading: "Osgood-Schlatter-Erkrankung",
        text: "Ein verzögertes Anwachsen oder ein partieller Ausriss der Tuberositas tibiae entlang des Zugs des M. quadriceps femoris („traction osteochondritis“). Bei Menschen (übergewichtige oder sportlich sehr aktive Kinder) und beim Hund vorwiegend bei Riesenrassen (v. a. Doggen) beobachtet, mit unspezifischer Lahmheit und Schwellung entlang der Patellasehne. Der Begriff ist beim Hund eigentlich unpassend — treffender wäre „Avulsion der Tuberositas tibiae“. Nach der Quelle heilten alle beobachteten Fälle konservativ (Schonung, Futterreduktion, Schmerzmittel) folgenlos aus.",
      },
    ],
    errorTags: ["Anatomieverwechslung", "Differentialdiagnostik unvollständig", "Befund übersehen"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.3.6 (Andere Knieerkrankungen: Avulsion des M. extensor digitorum longus, Osgood-Schlatter-Erkrankung), S. 206–208. Ätiologie, Klinik und Therapie sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: ["quadriceps"],
  },
  {
    id: "hamstringfibrose-deutscher-schaeferhund",
    category: "PATHOLOGIE",
    title: "Hamstringfibrose — eine rassespezifische, unheilbare Muskelerkrankung",
    teaser:
      "Fast ausschließlich beim Deutschen Schäferhund: eine Muskelfibrose, bei der selbst die komplette chirurgische Entfernung der betroffenen Muskeln keine dauerhafte Lösung bringt.",
    sections: [
      {
        type: "text",
        heading: "Betroffene Muskeln und Rasse",
        text: "Betroffen sind M. gracilis und M. semitendinosus, die vom kaudalen Becken kaudal des Femurs zur medialen Tibia ziehen. Die Ursache der Fibrosierung ist unbekannt; praktisch ausschließlich Deutsche Schäferhunde und deren Mischlinge sind betroffen. Die für die Rasse typische abfallende Rückenlinie mit starker Flexionshaltung von Knie und Hüfte könnte die Entstehung begünstigen, eine immunologische Beteiligung wird ebenfalls vermutet. Typische Patienten sind 8 Monate bis 8 Jahre alt, sehr aktiv, mit sportlicher Vorgeschichte und multiplen, zerrungsartigen Muskelverletzungen durch Springen und Sprinten — diese führen zu lokaler Entzündung, Ödemen, Blutungen und schließlich zur Fibrose.",
      },
      {
        type: "text",
        heading: "Ein pathognomonisches Gangbild",
        text: "Wegen der zunehmend desorientierten, weniger aktiven Muskelfasern wird in der Vorführphase des Hinterbeins das Knie nach innen und der Tarsus nach außen gezogen; der Schritt ist auffällig kurz, die Muskulatur generell reduziert, oft beidseitig betroffen. Bei der Palpation fühlen sich die Muskelgruppen derb, höckrig und dolent an, die Streckung der Hintergliedmaße ist eingeschränkt.",
      },
      {
        type: "text",
        heading: "Warum die Prognose so reserviert ist",
        text: "Röntgenbilder bringen außer dem Ausschluss von Hüft-/Rückenproblemen keinen Zusatznutzen; Ultraschall, MRT und Biopsie objektivieren das Ausmaß der Fibrose, sind für die Therapieplanung aber nicht nötig. Einzig die Physiotherapie hat sich bewährt — mit dem Ziel, die noch verbliebenen Muskelstränge möglichst lange kontraktil zu erhalten. Weder systemische noch lokale Kortison-/Immunsuppressivagaben noch die komplette chirurgische Entfernung der fibrosierten Muskelstränge bringen mehr als vorübergehende Erleichterung — die hemmenden Bindegewebsstränge wachsen sogar nach vollständiger Muskelentfernung wieder nach. Eine Heilung ist nicht möglich.",
      },
    ],
    errorTags: ["Anatomieverwechslung", "Differentialdiagnostik unvollständig", "Befund überbewertet"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.3.7 (Hamstringfibrose), S. 207–209. Ätiologie, Klinik und Therapieprinzip sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: ["semitendinosus", "gracilis"],
  },
  {
    id: "legg-perthes-erkrankung",
    category: "PATHOLOGIE",
    title: "Legg-Perthes-Erkrankung — Femurkopfnekrose beim kleinen Hund",
    teaser:
      "Eine Durchblutungsbesonderheit kleiner Rassen erklärt, warum ausgerechnet sie von einer Femurkopfnekrose betroffen sind, die bei großen Hunden praktisch nicht vorkommt.",
    sections: [
      {
        type: "text",
        heading: "Was passiert",
        text: "Die Legg-Perthes-Erkrankung (aseptische Femurkopfnekrose) betrifft beim Hund vor allem kleine Rassen wie West Highland White Terrier, Cairn Terrier, Pudel und Rehpinscher; die Ursache ist unbekannt, vermutet werden Gefäßstörungen des jungen Hundes. Ein wichtiger Unterschied zu großen Rassen: Bei großen Hunden reicht die endosteale Blutversorgung des Femurkopfes bis in den subchondralen Bereich, bei kleinen Hunden wird die Epiphyse dagegen größtenteils aus dem gelenknahen Bereich durchblutet — das macht sie anfälliger für Hypovaskularisationsschäden nach Trauma. Die Erkrankung tritt meist einseitig auf, was zur Theorie passt, dass die Gewichtsverlagerung auf die gesunde Gegenseite dort die Durchblutung verbessert. Pathophysiologisch entsteht ein Infarkt des epiphysären/metaphysären Knochens, gefolgt von fibrösen Umbauvorgängen, die auf die Wachstumszone übergreifen; der Gelenkknorpel verdickt sich und bekommt Risse, die schlecht durchblutete epiphysäre Region kollabiert zusehends, und der Femurkopf verformt sich.",
      },
      {
        type: "text",
        heading: "Klinik und Diagnostik",
        text: "Erste Lahmheitsanzeichen zeigen sich bei 4–10 Monate alten Tieren, meist als moderate Lahmheit (2/4) ohne weitere Verschlechterung nach der akuten Phase. Im Untersuchungsgang fallen Muskelhypotrophie und Schmerz bei Manipulation auf, besonders bei Streckung des Hüftgelenks; Krepitus ist selten auslösbar. Wichtige Differentialdiagnosen sind Hüftgelenkdysplasie, Neoplasie, Arthrose nach verheilter Femurkopffraktur und Patellaluxation. Radiologisch zeigt sich ein unregelmäßig geformter Femurkopf mit lytischen Defekten, Abflachung und degenerativen Umbauten an Femurkopf, Acetabulum und Femurhals — bei unklaren Fällen mit nur leichten Veränderungen lohnt sich eine Verlaufskontrolle nach 4–6 Wochen. Meist liegt nur ein einseitiges Geschehen vor.",
      },
      {
        type: "text",
        heading: "Therapie",
        text: "Eine konservative Therapie (Entzündungshemmer, Physiotherapie, ggf. extrakorporale Schockwellen zur Anregung neuer Blutgefäße) gelingt nur selten und nur bei Früherkennung. Die chirurgische Standardlösung ist die Femurkopfresektion mit ausgezeichneter Prognose — gerade weil die betroffenen Patienten klein sind, kann das neu gebildete Bindegewebe das entstehende Pseudogelenk gut stabil halten. Eine frühe physiotherapeutische Begleitung ist entscheidend, um die Muskulatur rasch wieder aufzubauen und den Bewegungsumfang des Hüftgelenks zu erhalten.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Faktenwissen", "vorschnelle Diagnose"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.3.8 (Legg-Perthes), S. 208–210. Ätiologie, Klinik, Diagnostik und Therapie sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: ["huefte"],
  },
  {
    id: "hueftgelenkdysplasie-und-coxarthrose",
    category: "PATHOLOGIE",
    title: "Hüftgelenkdysplasie und Coxarthrose — vom lockeren Gelenk zur Arthrose",
    teaser:
      "Warum ein radiologisch eindeutig dysplastischer Hund trotzdem völlig unauffällig laufen kann — und was das über die Rolle der Muskulatur beim Zusammenhalt des Hüftgelenks verrät.",
    sections: [
      {
        type: "text",
        heading: "Was Dysplasie bedeutet",
        text: "„Dysplasie“ kommt aus dem Griechischen und bedeutet schlechte („dys“) Passform („plassein“). Hüftgelenkdysplasie (HD) ist eine primäre Lockerheit des Hüftgelenks bei jungen Hunden, die zu sekundären degenerativen Veränderungen führt — diese werden als Coxarthrose zusammengefasst.",
      },
      {
        type: "text",
        heading: "Genetik und Rasseunterschiede",
        text: "Dysplastische Hunde zeugen vermehrt dysplastische Nachkommen, was auf eine genetische Grundlage hinweist (über 20 beteiligte Gene, Heritabilitätsschätzungen zwischen 25 % und 60 % je nach Studie). Trotz jahrzehntelanger, flächendeckender Zuchtprüfung bleibt die Inzidenz bei manchen Rassen sehr hoch (Bernhardiner, English Setter, Gordon Setter über 60 %; Deutsche Schäferhunde, Neufundländer, Retriever bei 30–50 %), während Siberian Huskies, Collies und Belgische Schäferhunde kaum HD zeigen. Das legt nahe, dass eine an Leistungszielen statt rein an Optik orientierte Selektion bessere Hüftgelenke fördern würde.",
      },
      {
        type: "text",
        heading: "Warum nicht jedes dysplastische Hüftgelenk lahmt",
        text: "Größenentwicklung, Fütterung und Aufzucht in den ersten Lebensmonaten haben entscheidenden Einfluss darauf, ob ein Hund mit HD tatsächlich lahmt. Zu kalziumreiche Diäten führen zu unregelmäßig geformten Gelenken; knapp gefütterte Hunde wachsen langsamer, belasten ihre Gelenke dabei weniger und erreichen trotzdem die genetisch vorgegebene Widerristhöhe — mit stabileren Hüftgelenken als Ergebnis. Im kritischen Zeitfenster vom 3. bis 5. (bei großen Rassen bis 6.) Lebensmonat finden die stärksten Skelett-Umbauvorgänge statt. Hunde mit von Natur aus kräftiger Hinterhandmuskulatur (Bulldoggen, Mops, viele sogenannte Kampfhunde) bleiben trotz radiologisch eindeutiger HD oft symptomfrei, weil die zunehmende Kruppen- und Oberschenkelmuskulatur den Femurkopf wieder stärker ins Acetabulum zwingt.",
      },
      {
        type: "text",
        heading: "Vom instabilen Gelenk zur Coxarthrose",
        text: "Bei starker Gelenkinkongruenz und schwacher Muskulatur entwickelt sich aus der HD eine Coxarthrose: Die Gelenkkapsel verdickt sich, Knochen wird zugebildet, M. pectineus und M. iliopsoas nehmen kompensatorisch an Umfang zu (da sie zur Hüftstabilität beitragen), was Abduktion und Extension zunehmend schmerzhaft einschränkt. Die fortschreitende Instabilität mit wiederholten Subluxationen führt zu Knorpelabbau am Femurkopf und am Acetabulumrand, der subchondrale Knochen wird freigelegt, es bildet sich eine neue, flache Gelenkpfanne mit Osteophyten am Femurkopf. HD und Coxarthrose betreffen meist beide Hüftgelenke etwa gleich stark — auffällige Seitenunterschiede in der Arthroseausprägung sprechen eher für eine andere Ursache (Trauma, Hüftgelenkluxation, Legg-Perthes, Infektion) als für eine reine HD.",
      },
      {
        type: "text",
        heading: "Klinisches Bild je nach Alter",
        text: "Beim jungen Hund kann ein wackeliger Gang mit spontaner Femurkopfluxation und Phasen kompletter Beinentlastung (Lahmheitsgrad 4/4) auftreten; ein positiver Ortolani-Test spricht für eine hochgradige HD, bei jungen Hunden mit noch fragilem Acetabulumrand sollte stattdessen nur der Bardens-Test angewendet werden. Beim erwachsenen Hund dominiert das Bild der Coxarthrose: verstärkte Belastung und Bemuskelung der Vordergliedmaße (mit möglichen Sekundärproblemen an Schulter, Ellbogen, Carpus), keine volle Extension mehr möglich (Kapsel, Osteophyten, kontrahierter M. iliopsoas), keine volle Abduktion (kontrahierter M. pectineus), bei Manipulation eher Krepitation als Subluxation. Wichtige Differentialdiagnosen sind Cauda-equina-Syndrom, Legg-Perthes, Iliopsoaszerrung sowie Neoplasien an Becken oder Femurkopf.",
      },
      {
        type: "list",
        heading: "Typische radiologische HD-Zeichen",
        items: [
          "Inkongruenz des Gelenkspaltes",
          "Norbergwinkel kleiner als 105°",
          "Abrundung des kranialen Acetabulumrandes",
          "Subluxation des Femurkopfes",
          "Deformation des Femurkopfes",
          "Erste Anzeichen von Arthrose (bei Coxarthrose zusätzlich: Osteophyten, Acetabulum-Abflachung, verdickter Femurhals, freie Gelenkkörper)",
        ],
      },
      {
        type: "text",
        heading: "Therapie der HD",
        text: "Bei Früherkennung ist eine konservative Therapie möglich: knappe, ausgewogene Fütterung, häufige kurze Spaziergänge, Knorpelschutzpräparate, Schmerzmittel und Physiotherapie. Chirurgisch nimmt die Beckenschwenkosteotomie (Triple/Double Pelvic Osteotomy, TPO/DPO) bei 6–10 Monate alten Hunden ohne oder mit nur geringer Arthrose eine besondere, weitgehend präventive Rolle ein — sie verbessert die Überdachung des Femurkopfes. Ab dem 10. Lebensmonat kommt bei schwerer HD oder beginnender Arthrose eine (zementlose) Hüftprothese infrage, bei Hunden unter 15 kg alternativ eine Femurkopfresektion. Die „juvenile pubic symphysiodesis“ (JPS) bei 3–4 Monate alten Hunden ist kritisch zu bewerten: In diesem Alter lässt sich die Diagnose HD noch nicht immer sicher stellen, sodass Hunde operiert werden könnten, die den Eingriff gar nicht benötigt hätten — ohne gleichzeitige Kastration umgeht das Verfahren zudem die züchterische Kontrolle der HD.",
      },
      {
        type: "text",
        heading: "Therapie der Coxarthrose",
        text: "Grundlage sind Gewichtskontrolle und mäßige, regelmäßige Bewegung (z. B. Schwimmen, Joggen) zur Kräftigung der gelenkumgebenden Muskulatur. Bei der medikamentösen Schmerztherapie sind NSAIDs Kortison vorzuziehen — Kortison wirkt zwar gut, baut aber rasch Gewebe ab und verursacht Heißhunger, Polydipsie und Polyurie. Chondroitinsulfat wirkt zusätzlich schmerzlindernd. Reichen konservative Maßnahmen bei hochgradiger Coxarthrose nicht mehr aus, kommen chirurgische Optionen infrage: die modifizierte Pektineusmyektomie mit Iliopsoastenotomie und Neurektomie der Gelenkkapsel (PIN) bei mäßiger Arthrose mit eingeschränkter Beweglichkeit (Wirkung hält Monate bis Jahre), Femurkopfresektion bei Hunden unter 15 kg, oder als definitive Lösung eine zementlose Hüftprothese — die Lahmheit verschwindet dabei meist innerhalb von 4–6 Wochen. Bei beidseitiger Dysplasie ist nicht automatisch ein beidseitiger Eingriff nötig, da die operierte Seite anschließend oft bevorzugt belastet wird.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Faktenwissen", "falsche Priorisierung"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.3.9 (Hüftgelenkdysplasie und Coxarthrose), S. 209–216. Ätiologie, Genetik, Klinik, radiologische Zeichen und Therapieoptionen sind im Original so beschrieben.",
    relatedCaseIds: ["luna"],
    relatedAnatomyIds: ["huefte", "iliopsoas"],
  },
  {
    id: "hueftgelenkluxation-hund",
    category: "PATHOLOGIE",
    title: "Hüftgelenkluxation von Hüftgelenkdysplasie abgrenzen",
    teaser:
      "Ein plötzlich verkürztes, außenrotiertes Bein nach einem Autounfall ist etwas grundlegend anderes als eine langsam entstandene Hüftgelenkdysplasie — auch wenn beide dieselbe Region betreffen.",
    sections: [
      {
        type: "text",
        heading: "Ursache und Luxationsrichtung",
        text: "Die weitaus häufigste Ursache einer Hüftgelenkluxation ist ein Autounfall; auch Stürze aus großer Höhe, Bisse oder eine spontane Luxation bei vorbestehender Hüftgelenkdysplasie kommen vor. Kraniodorsale Luxationen sind mit rund 80 % die häufigsten — erklärbar durch ein beim Aufprall außenrotiertes Hinterbein und den starken Zug der Glutealmuskeln am Trochanter major, wobei Gelenkkapsel und Lig. capitis femoris reißen. Bei sehr jungen Hunden führt die Traumaenergie oft eher zu einer Avulsion des Lig. capitis femoris (mit kleinem Knochenstück) oder zu einer Epiphysiolyse. Ventrale und ventrodorsale Luxationen ins Foramen obturatum entstehen meist durch Innenrotation des Beines beim Sturz.",
      },
      {
        type: "text",
        heading: "Klinisches Bild und die wichtige Abgrenzung zur HD",
        text: "Bei kraniodorsaler Luxation erscheint das Bein verkürzt, außenrotiert und adduziert; bei ventraler Luxation dagegen verlängert, mit leichter Innenrotation und Adduktion. Palpatorisch finden sich Schwellung, Schmerz und Krepitation; das Dreieck zwischen Trochanter major, Tuber sacrale und Tuber ischiadicum ist im Seitenvergleich verändert. Bei der häufigen kraniodorsalen Luxation ist der Abstand zwischen Tuber ischiadicum und Trochanter vergrößert — ein in diese Grube gepresster Daumen wird bei Außenrotation des Femurs nicht herausgedrückt, wenn die Hüfte luxiert ist. Variable Ausfälle des N. ischiadicus mit Überköten der Gliedmaße sind möglich. Anders als die HD (langsam entstehende primäre Gelenklockerheit ohne Trauma) ist die Luxation ein plötzliches, meist traumatisches Ereignis — diese Unterscheidung ist entscheidend, weil sich die Therapieprinzipien grundlegend unterscheiden.",
      },
      {
        type: "text",
        heading: "Therapie",
        text: "Eine unblutige (geschlossene) Reposition ist indiziert bei frischer Verletzung, intaktem Acetabulumrand, guter Gelenktiefe ohne Arthrosezeichen und ohne Gelenkfragmente; anschließend wird das Bein für 10 Tage in einer Ehmerschlinge ruhiggestellt. Eine offene Reposition ist nötig bei chronischem Verlauf, gescheiterter unblutiger Reposition oder vorhandenen Knochenfragmenten, meist kombiniert mit einer inneren Stabilisierung (z. B. Toggle-Pin-Technik, Slocum-Schlinge). Bei vorbestehender hochgradiger Dysplasie oder starker Coxarthrose kann bei Hunden unter 15–20 kg eine Femurkopfresektion, bei schwereren Hunden eine Hüftprothese die bessere Option sein.",
      },
    ],
    errorTags: ["Anatomieverwechslung", "Differentialdiagnostik unvollständig", "Untersuchung falsch gewählt"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.3.10 (Hüftgelenkluxation), S. 216–218. Ätiologie, Klinik und Therapie sind im Original so beschrieben.",
    relatedCaseIds: ["luna"],
    relatedAnatomyIds: ["huefte"],
  },
  {
    id: "iliopsoaszerrung-hund",
    category: "PATHOLOGIE",
    title: "Iliopsoaszerrung — wenn nicht die Hüfte, sondern ihr Beuger schmerzt",
    teaser:
      "Das Gangbild sieht aus wie Hüftgelenkdysplasie — ein gezielter Dehntest und die rektale Palpation verraten aber, dass der M. iliopsoas selbst das Problem ist.",
    sections: [
      {
        type: "text",
        heading: "Mechanismus und Prädisposition",
        text: "Der M. iliopsoas — einer der Hüftbeuger — besteht aus dem muskulären M. iliacus und dem sehnigen M. psoas, entspringt am Trochanter minor und inseriert am Ventralrand der Lendenwirbelkörper. Bei sportlichen Hunden ohne geeignetes Aufwärmtraining kann dieser Muskel Zerrungen erleiden; prädisponierte Rassen sind Border Collie und Belgischer Schäferhund.",
      },
      {
        type: "text",
        heading: "Abgrenzung von Hüftgelenkproblemen",
        text: "Das Gangbild bei einer Iliopsoaszerrung ähnelt dem bei Hüftgelenkdysplasie oder Coxarthrose — beide sind entsprechend die wichtigsten Differentialdiagnosen. Im orthopädischen Untersuchungsgang lässt sich der Muskel gezielt prüfen: Hüftstreckung mit anschließender Innenrotation bringt ihn in maximale Länge und provoziert bei einer Zerrung gezielt Schmerz. Zusätzlich ist eine direkte rektale Palpation des Muskels kranial des Beckens (bei kleinen bis mittelgroßen Hunden) sowie von lateral über die Haut möglich.",
      },
      {
        type: "text",
        heading: "Diagnostik und Therapie",
        text: "Röntgenbilder dienen primär dem Ausschluss der Differentialdiagnosen; eine Verkalkung der Ursprungssehne ist nur in chronischen Fällen sichtbar. Ultraschall und MRT können Zerrung, Blutung oder Kontinuitätstrennung des Muskels sichtbar machen. Die Behandlung braucht Geduld: Bewegungseinschränkung, Entzündungshemmer und gezielte Physiotherapie sind Mittel der Wahl; prädisponierte Rassen sollten künftig vor jedem Sporttraining aufgewärmt werden. Eine chirurgische Entfernung des Muskels ist nur bei chronischem Verlauf mit verkalkter Sehne indiziert.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Anatomieverwechslung", "Untersuchung falsch gewählt"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.3.11 (Iliopsoaszerrung), S. 218f. Ätiologie, Klinik, Diagnostik und Therapie sind im Original so beschrieben.",
    relatedCaseIds: ["emma"],
    relatedAnatomyIds: ["iliopsoas"],
  },
  {
    id: "sesambeinfragmentierung-vordergliedmasse",
    category: "PATHOLOGIE",
    title: "Sesambeinfragmentierung — kleine Knochen unter großer Dauerlast",
    teaser:
      "Zwei von acht Sesambeinen pro Vorderpfote tragen den Großteil der Zugkraft der Zehenbeuger — kein Zufall, dass genau sie am häufigsten fragmentieren.",
    sections: [
      {
        type: "text",
        heading: "Warum ausgerechnet Sesambein II und VII",
        text: "In jeder der vier Hauptzehen liegt ein Paar Sesambeine auf der palmaren/plantaren Fläche des Zehengrundgelenks, von medial nach lateral als I–VIII durchnummeriert. Die Sehnen der oberflächlichen und tiefen Zehenbeuger verteilen sich bei der 3. und 4. Zehe gleichmäßig auf beide Sesambeine, bei der 2. und 5. Zehe dagegen fast ausschließlich auf die innen liegenden Sesambeine II und VII — sie tragen dadurch bei starker Belastung oder hohem Körpergewicht deutlich mehr Stress als die übrigen. Akute Frakturen nach Trauma oder Ermüdung betreffen vor allem Rennhunde wie Greyhounds; die degenerative Sesambeinfragmentierung bei jungen großen Hunden wird dagegen auf kongenitale Ossifikationsstörungen zurückgeführt und tritt gehäuft bei Rottweilern, Boxern und Labrador Retrievern auf. Sie wird mit rund 80 % deutlich häufiger an der Vorder- als an der Hintergliedmaße beobachtet — vermutlich wegen der dort höheren Belastung.",
      },
      {
        type: "text",
        heading: "Klinik, Diagnostik und Therapie",
        text: "Die Lahmheit ist meist mild (1/4) und tritt vor allem nach starker Belastung auf; die Region um das betroffene Sesambein ist verdickt, die Überstreckung des Zehengrundgelenks dolent und die Flexion eingeschränkt. Die Diagnose gelingt am zuverlässigsten mit einer Röntgenaufnahme im dorsopalmaren/plantaren Strahlengang bei gespreizten Zehen — im mediolateralen Strahlengang projizieren sich die Sesambeine übereinander. Wichtig ist die Abgrenzung von einer physiologischen, harmlosen Zweiteilung (bipartites Sesambein). Milde Fälle werden konservativ (Ruhigstellung, Antiphlogistika) behandelt; ansonsten wird das betroffene Sesambein chirurgisch entfernt, was meist innerhalb von 6 Wochen zu einem lahmheitsfreien Gang führt — allerdings läuft die Beugesehne danach ohne Sesambeinschutz über das Gelenk, was langfristig zu Hyperflexion führen kann. Eine Alternative ist die Zehenamputation.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Befund übersehen", "Anatomieverwechslung"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.4.1 (Sesamoid-Erkrankung, Vordergliedmaße), S. 219f. Ätiologie, Klinik, Diagnostik und Therapie sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "hyperextensionstrauma-carpus",
    category: "PATHOLOGIE",
    title: "Hyperextensionstrauma des Carpus nach Sturz oder Sprung",
    teaser:
      "Ein Sturz aus großer Höhe reißt oft nicht nur ein Band — die Anzahl der betroffenen Bandstrukturen entscheidet direkt darüber, ob eine Naht reicht oder eine Arthrodese nötig wird.",
    sections: [
      {
        type: "text",
        heading: "Mechanismus",
        text: "Sprünge und Stürze aus großer Höhe (seltener Autounfälle) verletzen die palmaren Strukturen des Carpus — kurze Bänder zwischen den Karpalknochen und Sehnenplatten — mit unterschiedlichen Hyperextensionsgraden als Folge; oft sind beide Karpalgelenke betroffen. Wegen der physiologischen leichten Valgusstellung des Carpus werden mediale Bandstrukturen stärker belastet als laterale, weshalb das Hyperextensionstrauma gelegentlich mit einem medialen Seitenbandriss vergesellschaftet ist.",
      },
      {
        type: "text",
        heading: "Klinik und Diagnostik",
        text: "Nach dem Unfall kann die Vordergliedmaße kaum Gewicht aufnehmen, beim Auffußen ist die Hyperextension augenfällig und der Carpus deutlich geschwollen. Die Verdachtsdiagnose bestätigt sich, wenn die Extension des Carpus bei gleichzeitig gestrecktem Ellbogen mehr als 10–15° erreicht. Röntgenbilder im dorsopalmaren Strahlengang sowie gehaltene Aufnahmen (Abduktion/Adduktion zur Prüfung des Bandapparats, laterolaterale Aufnahme in Hyperextension) bestimmen Instabilitätsniveau und betroffene Bänder.",
      },
      {
        type: "text",
        heading: "Therapie richtet sich nach Alter und Ausmaß",
        text: "Nur bei Hunden unter 6 Monaten ist eine konservative Schienung erfolgversprechend, da die kurzen Bänder hier rasch fibrös und stabil verheilen. Rupturen der geraden/schrägen radiokarpalen Bänder können primär genäht werden. Interkarpale Instabilitäten benötigen dagegen meist eine partielle Arthrodese (üblicherweise vom Os carpi radiale bis zu den Metacarpalia), ausgedehnte Bandrupturen mit Beteiligung des Antebrachiokarpalgelenks, Rezidive nach Bandnaht oder starke Karpalgelenkarthrose eine Panarthrodese. Nach beiden Verfahren ist eine Ruhigstellung von 6–12 Wochen nötig, die Knochenfusion selbst dauert 4–8 Monate; das Gangbild bleibt danach in der Regel unauffällig, nur das Springen über Hindernisse kann erschwert sein, weil der Carpus nicht mehr flektiert werden kann.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Untersuchung falsch gewählt", "Befund übersehen"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.4.2 (Hyperextensionstrauma Carpus), S. 219–221. Ätiologie, Klinik und Therapie sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "tendovaginitis-abductor-pollicis-longus",
    category: "PATHOLOGIE",
    title: "Tendovaginitis des M. abductor pollicis longus — die „Daumensehne“ des Hundes",
    teaser:
      "Eine feste, kaum schmerzhafte Schwellung medial am Carpus, die man leicht für einen Tumor halten könnte — das Röntgenbild verrät den Unterschied.",
    sections: [
      {
        type: "text",
        heading: "Anatomie und Mechanismus",
        text: "Der M. abductor pollicis longus entspringt lateral am proximalen Radius, seine Endsehne verläuft in einer eigenen Sehnenscheide, kreuzt am distalen Radius den M. extensor carpi radialis, verläuft unter dem medialen Kollateralband und inseriert an der Basis des ersten Metacarpus — sie hat also eine gelenkstabilisierende Funktion und enthält auf Höhe des Antebrachiokarpalgelenks ein Sesambein. Die genaue Ursache der Entzündung ist unklar; vermutet wird — analog zur menschlichen de-Quervain-Erkrankung — eine Überbeanspruchung, die eine chronische Entzündung mit zunehmender Einengung der Sehne in ihrer Scheide auslöst und unterhält; bei chronischem Verlauf verdickt sich die Sehnenscheide und kann teilweise verknöchern.",
      },
      {
        type: "text",
        heading: "Klinisches Bild",
        text: "Betroffen sind meist große, über 2 Jahre alte Hunde mit anfangs sehr milder Lahmheit (1/4), die sich vor allem nach intensiver Bewegung und kurzer Ruhephase zeigt. Typisch ist eine derbe, fast runde Schwellung medial am distalen Radius; einfacher Druckschmerz ist nicht immer auslösbar, dafür aber Schmerz bei Beugung und Abduktion des Carpus mit zunehmend eingeschränkter Flexion. Bilaterale Entzündungen sind möglich, wobei das Schwellungsausmaß nicht mit Lahmheit oder Schmerz korrelieren muss.",
      },
      {
        type: "text",
        heading: "Diagnostik: Abgrenzung zur Neoplasie",
        text: "Radiologisch zeigen sich in fast allen Fällen Knochenzubildungen medial und dorsal am distalen Radius, das mediale Styloid kann verbreitert erscheinen, das Radiokarpalgelenk selbst bleibt weitgehend unauffällig. Die wichtigste Differentialdiagnose ist eine Neoplasie des distalen Radius — im Unterschied dazu zeigt die Tendovaginitis aber keine lytischen Zonen, die Proliferationen sind homogen dicht und auf den medialen/distalen Radius begrenzt. In unklaren Fällen ist ein CT indiziert.",
      },
      {
        type: "text",
        heading: "Dreistufige Therapie",
        text: "Milde, akute Fälle reagieren gut auf Ruhigstellung und Antiphlogistika. Anhaltende Lahmheit erfordert eine Depotsteroid-Injektion unter Narkose in die Sehnenscheide (nach 3 Wochen wiederholbar) mit begleitender Ruhigstellung. Starke Proliferationen oder Therapieversager nach Steroidinjektion werden chirurgisch versorgt: Die Sehnenscheide wird eröffnet und fibrosiertes/verknöchertes Gewebe so weit wie möglich abgetragen — von einer Durchtrennung der Sehne selbst wird abgeraten, da sie Seitenbandfunktion hat. Die Resultate nach chirurgischem Debridement sind in der Regel gut.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Befund überbewertet", "Anatomieverwechslung"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.4.3 (Tendovaginitis des M. abductor pollicis longus), S. 221f. Anatomie, Klinik, Diagnostik und Therapie sind im Original so beschrieben. Ergänzt den bereits vorhandenen Untersuchungs-Eintrag zum Finkelstein-analogen Test dieses Muskels (`zehen-karpus-liegender-hund-untersuchung`) um das vollständige Krankheitsbild.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
  {
    id: "ellbogendysplasie-pathogenese-und-therapie",
    category: "PATHOLOGIE",
    title: "Ellbogendysplasie: Pathogenese-Hypothesen und die vollständige Therapiepalette",
    teaser:
      "Warum das mediale Coronoid so viel häufiger betroffen ist als das laterale — und weshalb moderne Forschung eher von druckbedingter Abrasion statt einer klassischen Fissur spricht.",
    sections: [
      {
        type: "text",
        heading: "Ein Sammelbegriff für vier Erkrankungen — hier mit Koch/Fischers eigener Terminologie",
        text: "Auch diese Quelle bestätigt: Ellbogendysplasie (ED) ist kein einzelnes Krankheitsbild, sondern fasst vier radiologisch ähnlich endende, aber pathogenetisch unterschiedliche Erkrankungen zusammen — fragmentierter Processus coronoideus medialis (FPCM), nichtvereinigter Processus anconaeus (UAP — entspricht dem bereits im Eintrag `ellbogengelenkdysplasie` verwendeten Begriff „isolierter Processus anconaeus“, IPA; beide Bezeichnungen meinen dieselbe Erkrankung), Osteochondrose am medialen Humeruscondylus (OC) und Inkongruenz des Ellbogengelenks (INC). Eine genetische Beteiligung gilt als gesichert (Heritabilitätsindex 0,27–0,77); Ernährung und Management im Welpenalter — insbesondere Übergewicht bis zum 7. Lebensmonat, der Phase des höchsten Knochenumbaus — können ein subklinisches Geschehen in ein klinisches überführen.",
      },
      {
        type: "text",
        heading: "Warum gerade das mediale Coronoid so stark betroffen ist",
        text: "Eine verbreitete Erklärung für FPCM und UAP ist eine Malformation der Incisura semilunaris: Da diese in der Wachstumsphase deutlich mehr Knochen/Knorpel ansetzen muss als der Humeruscondylus, um die Gelenkkongruenz zu erhalten, kann sie ellipsoid statt kreisförmig geformt werden — mit hoher Belastung auf Processus coronoideus oder Processus anconaeus als Folge. Da die Kraftübertragung im Ellbogen vorwiegend medial verläuft, ist das mediale Coronoid ohnehin größer und stärker belastet als das laterale. Neuere Forschung spricht deshalb zunehmend von medialer Coronoiderkrankung (medial coronoid disease, MCD) statt von einer klassischen Fissur, weil eher druckbedingte Abrasionen als Risse zu beobachten sind. In seltenen Fällen führt ungleiches Längenwachstum von Radius und Ulna („short radius“-Syndrom) zur selben Überlastung des medialen Coronoids. Prädisponiert für FPCM/OC sind v. a. Retriever, Berner Sennenhunde, Rottweiler und andere schnellwüchsige Rassen.",
      },
      {
        type: "text",
        heading: "Klinik und die Grenzen der Bildgebung",
        text: "Typisch sind ein Auftreten zwischen 4 und 8 Monaten bei großen, schnellwachsenden Hunden, leicht progressiver Verlauf, Anlauflahmheit, eine kompensatorische Valgushaltung zur Entlastung des medialen Kompartiments, häufig beidseitiger Befall sowie Schmerz bei Streckung/Rotation des Ellbogens und Druckdolenz über dem medialen Coronoid. UAP verursacht die deutlichste Lahmheit aller ED-Formen, FPCM tritt am häufigsten auf. Radiologisch ist UAP am einfachsten zu diagnostizieren (der Processus anconaeus sollte normalerweise mit 4–5 Monaten mit dem Olecranon verwachsen sein); FPCM/MCD ist dagegen selbst mit optimierter Röntgentechnik oft nur unscharf darstellbar — Fissurlinien sind kaum sichtbar und häufig Artefakte, und ihr Fehlen schließt eine ED nicht aus. Bei unklaren klinischen und radiologischen Befunden sind Arthroskopie und CT die Methoden der Wahl. Eine Gelenkinkongruenz lässt sich radiologisch erst ab etwa 4 mm Stufenbildung sicher erkennen.",
      },
      {
        type: "text",
        heading: "Konservative und chirurgische Therapie im Überblick",
        text: "Konservative Maßnahmen (Gewichtsreduktion, kurze häufige Spaziergänge, Physiotherapie, Knorpelschutzpräparate, Entzündungshemmer) eignen sich für milde/unklare Fälle, bei bereits fortgeschrittener Arthrose und als postoperatives Protokoll. Chirurgisch wird UAP meist durch Exzision des nicht fusionierten Fragments behandelt (bei großen Fragmenten alternativ Schraubenfixation mit Entlastungsosteotomie der Ulna, mit vorsichtiger Prognose). Osteochondroseläsionen werden kürettiert, damit subchondraler Knochen den Defekt mit Faserknorpel auffüllen kann. Die klassische FPCM-Therapie ist die weiträumige operative Entfernung des medialen Coronoids; bei zusätzlicher deutlicher Gelenkstufe kann bei Hunden unter 8–10 Monaten eine Ulnaostektomie den Druck auf das Coronoid senken. Neuere Verfahren zielen gezielt auf die Druckreduktion im medialen Kompartiment ab: Teiltenotomie des M. biceps brachii an der Ulna (BURP), Korrekturosteotomie von Humerus oder Ulna — mittelfristig wird auch ein Teil- oder Totalgelenkersatz verfügbar sein.",
      },
    ],
    errorTags: ["Anatomieverwechslung", "Differentialdiagnostik unvollständig", "Faktenwissen"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.4.4 (Ellbogendysplasie), S. 222–226. Pathogenese-Hypothesen, Klinik, Diagnostik und Therapieoptionen sind im Original so beschrieben. Ergänzt den bereits vorhandenen Eintrag `ellbogengelenkdysplasie` (VetCenter) um Pathogenese-Mechanismen, Genetik und die vollständige Therapiepalette; die Terminologie „UAP“ (diese Quelle) und „IPA“ (VetCenter) bezeichnen dieselbe Erkrankung, siehe Hinweis im Text.",
    relatedCaseIds: ["rocky"],
    relatedAnatomyIds: [],
  },
  {
    id: "bizepssehnenentzuendung-therapieoptionen",
    category: "PATHOLOGIE",
    title: "Bizepssehnenentzündung: Anatomie des Sehnenverlaufs und Therapieoptionen",
    teaser:
      "Drei unterschiedliche chirurgische Techniken lösen dasselbe Problem — jede mit einem anderen Kompromiss zwischen Funktionserhalt und OP-Aufwand.",
    sections: [
      {
        type: "text",
        heading: "Sehnenverlauf und Entzündungsort",
        text: "Der M. biceps brachii entspringt am Tuberculum supraglenoidale der Scapula mit einer langen Ursprungssehne, die durch das kraniomediale Schultergelenk und anschließend durch die Fossa intertubercularis des proximalen Humerus zieht (dort durch ein transverses Band gehalten) — Sehnenscheide und Schultergelenkkapsel bilden hier einen gemeinsamen Raum. Die Entzündung betrifft typischerweise genau diesen proximalen Sehnenabschnitt und seine Sehnenscheide. Mögliche Ursachen sind direktes/indirektes Trauma, wandernde Gelenkmäuse nach Osteochondrose, Folgen einer degenerativen Schultergelenkserkrankung oder eine starke Gewichtsverlagerung auf die Vordergliedmaßen. Betroffen sind meist mittelgroße bis große Hunde.",
      },
      {
        type: "text",
        heading: "Ein subtiler klinischer Befund",
        text: "Die Diagnose ist oft nicht einfach: Die Lahmheit ist meist wenig ausgeprägt und zeigt sich mitunter nur ganz zu Beginn der Bewegung oder erst am Ende längerer Spaziergänge. Diagnostisch wegweisend ist Druckschmerz auf die Sehne über dem Humerus, ausgelöst durch gleichzeitige Beugung des Schultergelenks und Streckung des Ellbogengelenks (dadurch wird die Sehne über der Schulter maximal gespannt) — sie lässt sich dabei mit dem Daumen medial des Tuberculum majus gut palpieren.",
      },
      {
        type: "text",
        heading: "Bildgebung: Sonografie als Methode der Wahl",
        text: "Röntgenbilder liefern nur in eindeutigen Fällen verwertbare Informationen (arthrotische Veränderungen am Kaudalrand des Humeruskopfes, freie Gelenkmäuse, Osteolyse am Tuberculum supraglenoidale, Verschattungen im Sulcus intertubercularis). Kontraströntgen liefert zusätzliche Informationen zur Sehnenscheide, doch die eigentliche Methode der Wahl ist die Sonografie: Sie stellt den gesamten Sehnenverlauf dar und erlaubt Aussagen zur Qualität der Ursprungssehne im Schultergelenk.",
      },
      {
        type: "text",
        heading: "Konservative Therapie zuerst, drei chirurgische Optionen danach",
        text: "Zunächst wird konservativ behandelt: nichtsteroidale Entzündungshemmer und 6 Wochen Ruhigstellung reichen oft aus, ansonsten eine Kortisoninjektion ins Gelenk oder in die Sehnenscheide mit anschließender 10-tägiger Ruhigstellung in einer Velpeau-Schlinge. Bleibt der Erfolg auch nach wiederholter Injektion aus, wird der schmerzhafte proximale Sehnenanteil chirurgisch aus dem Gelenkbereich entfernt — dafür gibt es drei Techniken: Durchtrennung am Ursprung mit distalem Zurückgleiten und Vernarbung am Humerus (auch arthroskopisch möglich); Fixierung des Sehnenstumpfes am Humerus mit Schraube und Unterlegscheibe; oder Umleitung der vom Schulterblatt gelösten Sehne durch einen Tunnel im proximalen Humerus bis zum M. supraspinatus, mit dem sie vernäht wird — dabei bleibt dem M. biceps seine Funktion wenigstens teilweise erhalten. In chronischen Fällen kann die Sehne so stark mit Binde- und später Knochengewebe eingeschlossen werden, dass eine chirurgische Befreiung nötig wird.",
      },
    ],
    errorTags: ["Untersuchung falsch gewählt", "Befund übersehen", "Differentialdiagnostik unvollständig"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.4.5 (Bizepssehnenentzündung), S. 226–228. Anatomie, Klinik, Diagnostik und Therapieoptionen sind im Original so beschrieben. Ergänzt den bereits vorhandenen Eintrag `bizepssehnenerkrankungen` (VetCenter) um den detaillierten Sehnenverlauf, den sonografischen Diagnostikschwerpunkt und die drei chirurgischen Techniken.",
    relatedCaseIds: ["rocky"],
    relatedAnatomyIds: ["biceps"],
  },
  {
    id: "schultergelenkluxation-hund",
    category: "PATHOLOGIE",
    title: "Instabilität und Luxation des Schultergelenks",
    teaser:
      "Kongenital oder traumatisch, medial oder lateral — die Luxationsrichtung allein verrät oft schon, welche Ursache dahintersteckt.",
    sections: [
      {
        type: "text",
        heading: "Ursache und Richtung",
        text: "Schulterluxationen sind selten. Kongenitale Luxationen werden mit einer medialen Bandlaxizität und einer Deformation der Gelenkpfanne (Glenoid) erklärt, während traumatische Luxationen meist nach lateral, seltener in andere Richtungen erfolgen.",
      },
      {
        type: "text",
        heading: "Klinik und Diagnostik",
        text: "Betroffene Hunde können die Vordergliedmaße meist nicht zur Fortbewegung einsetzen — Ausnahmen sind chronische, kongenitale oder subluxierte Fälle. Bei lateraler Luxation wird das Bein in Innenrotation getragen, bei medialer Luxation in Außenrotation; die relativen Positionen von Tuberculum majus und Acromion verraten die Richtung. Da der Plexus brachialis direkt medial des Schulterblatts liegt, können variable periphere Nervenausfälle hinzukommen. Röntgenaufnahmen im mediolateralen und anterioposterioren Strahlengang klären die Luxationsrichtung und decken Absprengfrakturen an Glenoid, Humeruskopf oder Acromion auf; bei chronischen/kongenitalen Luxationen findet sich meist ein abgenutztes mediales Glenoid bei nur minimaler Arthrose.",
      },
      {
        type: "text",
        heading: "Therapie",
        text: "Akute mediale traumatische Luxationen ohne Knochenabsplitterung können unter Narkose reponiert und anschließend 10 Tage in einer Velpeau-Schlinge ruhiggestellt werden; bei akuten lateralen Luxationen folgt auf die Reposition ein Spica-Schienenverband. Bei chronischem Verlauf erzielt eine Versetzung der Bizepssehne nach medial (bei medialer Luxation) bzw. lateral (bei lateraler Luxation) die besten Resultate — die transponierte Sehne wirkt einer erneuten Luxation entgegen. Verstärkungen des Bandapparats mit Netzen oder Fadenprothesen sind nur bei kleinen Hunden erfolgversprechend; stark dysplastische oder arthrotische Schultergelenke sollten versteift werden.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Anatomieverwechslung", "Untersuchung falsch gewählt"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 8.4.6 (Instabilität des Schultergelenks), S. 228f. Ätiologie, Klinik und Therapie sind im Original so beschrieben. Kap. 8.4.7 (Osteochondrose des Schultergelenks) verweist im Original nur auf die bereits an anderer Stelle behandelten allgemeinen Osteochondrose-Informationen; Kap. 8 endet danach mit dem Literaturverzeichnis (8.5).",
    relatedCaseIds: ["rocky"],
    relatedAnatomyIds: ["biceps"],
  },
  {
    id: "lahmheit-laehmung-abgrenzung",
    category: "PATHOLOGIE",
    title: "Lahmheit oder Lähmung? Warum Becken- und Halsregion diagnostisch tückisch sind",
    teaser:
      "Rückenschmerz beim tiefen Rückendruck kann Cauda-equina-Kompression, Hüftarthrose oder eine Iliopsoaszerrung bedeuten — erst gezielte Bildgebung trennt die Möglichkeiten.",
    sections: [
      {
        type: "text",
        heading: "Warum diese beiden Regionen besonders schwierig sind",
        text: "Eine gründliche orthopädische bzw. neurologische Untersuchung (Gangbeobachtung, Gelenkpalpation samt Füllung/Stabilität, Knochenpalpation, Haltungs- und Stellreaktionen, spinale Reflexe) führt meist zu einer eindeutigen Zuordnung. Zwei anatomische Regionen erschweren das aber gezielt: die kaudale Wirbelsäule mit Cauda equina und Becken, sowie die tiefe Halswirbelsäule mit dem Plexus brachialis an der Vordergliedmaße. Hier liegen orthopädische und neurologische Strukturen so eng beieinander, dass ein und derselbe Untersuchungsbefund — z. B. Schmerz bei tiefer Rückenpalpation und eingeschränkte, dolente Hüftextension — mehrere völlig unterschiedliche Diagnosen erklären kann.",
      },
      {
        type: "list",
        heading: "Differentialdiagnosen bei Schmerz/Befund im Becken-Rücken-Bereich",
        items: [
          "Lumbosakrale Bandscheibenvorfälle",
          "Kompression der Cauda equina (z. B. DLSS)",
          "Intramedulläre Erkrankungen",
          "Zerrung des M. iliopsoas",
          "Hüftgelenkdysplasie und Hüftgelenkarthrose",
          "Becken-, Wirbelsäulen- oder Schwanzfrakturen",
          "Neoplasien des Skeletts oder umliegender Weichgewebe",
          "Prostataerkrankungen",
          "Kreuzbandriss",
        ],
      },
      {
        type: "text",
        heading: "Die gleiche Falle an der Vordergliedmaße",
        text: "An der Vordergliedmaße stellt sich das analoge Problem im Bereich der tiefen Halswirbelsäule und des Plexus brachialis: Unklare Lahmheiten älterer Hunde können ebenso gut Ellbogen- oder Schulterarthrose bzw. Bizepstendinitis sein wie Muskeltraumata, eine Plexus-brachialis-Schädigung, ein Bandscheibenvorfall oder eine Instabilität der Halswirbelsäule.",
      },
      {
        type: "text",
        heading: "Konsequenz für die Bildgebung",
        text: "Eine voreilige Schlussfolgerung allein aus Palpationsbefunden kann zu falscher Therapie führen. Auch der erfahrene Kliniker kommt hier meist nicht ohne weiterführende Bildgebung aus: konventionelles Röntgen bei Verdacht auf ein orthopädisches Leiden, ergänzt durch Schnittbildverfahren. Bei Verdacht auf eine neurologische Ursache ist die Magnetresonanztomografie das Mittel der Wahl, da die meisten relevanten Strukturen im Weichgewebe liegen; die Computertomografie kommt erst in zweiter Linie zum Einsatz, da sie vor allem knöcherne Strukturen abbildet.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "vorschnelle Diagnose", "Anatomieverwechslung", "Befund überbewertet"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 9.1 (Abgrenzung zwischen Lahmheit und Lähmung), S. 230. Differentialdiagnosenlisten und Bildgebungsempfehlung sind im Original so beschrieben.",
    relatedCaseIds: [],
    relatedAnatomyIds: ["iliopsoas", "huefte", "rueckenmark"],
  },
  {
    id: "degenerative-lumbosakrale-stenose-cauda-equina",
    category: "PATHOLOGIE",
    title: "Degenerative lumbosakrale Stenose (DLSS) und Cauda-equina-Syndrom",
    teaser:
      "Aufstehschwierigkeiten, Zehenschleifen, tiefgehaltene Rute beim älteren Schäferhund — die DLSS entwickelt sich über Monate und lähmt die Hintergliedmaßen dabei nie vollständig.",
    sections: [
      {
        type: "text",
        heading: "Ätiologie und Pathogenese",
        text: "Im Zentrum der DLSS steht die Degeneration und Protrusion der lumbosakralen Bandscheibe. Die dadurch veränderte Bewegung des Lumbosakralgelenks führt zur sekundären Degeneration von Weichteilen (Lig. flavum, Facettengelenkkapseln) sowie zu knöchernen Zubildungen an den Wirbelgelenken und ventral/lateral von L7 und S1 — meist eine dynamische Verengung von Wirbelkanal und Foramina intervertebralia zwischen L7 und S1. Die daraus resultierende statische und dynamische Kompression der Nervenwurzeln L6, L7 und der sakralen Nerven ist strukturell eine kompressive Radikulopathie, die sich klinisch als Cauda-equina-Syndrom zeigt. Prädisponierend sind lumbosakrale Übergangswirbel, Osteochondrosen der Endplatte des Os sacrum, Diskospondylitiden, Traumata der Region sowie angeborene, primäre Stenosen. Deutsche Schäferhunde und Hunde ab dem 7. Lebensjahr sind übervertreten.",
      },
      {
        type: "list",
        heading: "Klinisches Bild",
        items: [
          "Entwickelt sich meist über Monate, in unterschiedlicher Ausprägung",
          "Aufstehschwierigkeiten, Lahmheit, Zittern einer oder beider Hintergliedmaßen, Mühe beim Treppensteigen, Zehenschleifen",
          "Abfallende Rückenlinie, motorische Schwäche der Rute",
          "Kotabsatz in mehreren Portionen oder Fallenlassen der Kotballen beim Weggehen",
          "Dorsoflexion der Rute und Lordose der Lendenwirbelsäule schmerzhaft (Extension reduziert dynamisch den Nervenkanaldurchmesser)",
          "Druckpalpation der kaudalen Lendenwirbelsäule schmerzhaft",
          "Fortgeschritten: deutliche Muskelreduktion, Harn- und Kotinkontinenz, komplette Rutenlähmung",
          "Vollständige Lähmung der Hintergliedmaßen tritt bei DLSS nicht auf",
        ],
      },
      {
        type: "text",
        heading: "Reflexbefunde: Pseudohyperreflexie als Falle",
        text: "Die neurologischen Ausfälle sind meist Folge einer Kompression des unteren motorischen Neurons: verzögerte Überkötungsreaktion, reduzierter Flexor- und M.-tibialis-cranialis-Reflex. Auffällig ist eine nicht selten leicht gesteigerte Patellareflexantwort, obwohl der Reflexbogen selbst nicht betroffen ist — durch den Wegfall der antagonistischen Wirkung des Ischiadicusmyotoms auf den Agonisten (Femoralismyotom, M. quadriceps) entsteht eine verstärkte Reflexantwort (Pseudohyperreflexie), die fälschlich als Zeichen des oberen Motoneurons missverstanden werden kann. Analtonus und Perinealreflexe sind erst in fortgeschrittenen Stadien reduziert.",
      },
      {
        type: "text",
        heading: "Bildgebung und Therapie",
        text: "Konventionelles Röntgen dient nur der Übersicht (Neoplasien, Traumata) — Spondylosen allein beweisen keine DLSS. Diagnostikum der Wahl ist die Magnetresonanztomografie, mit Abstrichen die Computertomografie; Schnittbildverengungen korrelieren nicht immer mit der Klinik, verlässlicher sind sichtbare Veränderungen an den Cauda-equina-Nervenwurzeln selbst. Ohne Harn-/Kotinkontinenz kann konservativ behandelt werden: Gewichtsreduktion, Bewegungseinschränkung, Physiotherapie zur Muskellockerung und Nervkonduktionsverbesserung, Schmerzstillung (NSAID oder Gabapentin; systemische Kortikosteroide wegen umstrittener Wirksamkeit und Nebenwirkungen eher meiden, epidurale/paravertebrale Depotsteroid-Injektionen zeigen einzelne positive Hinweise). Bei Therapieversagen oder Progression folgt die chirurgische Dekompression (dorsale Laminektomie L7/S1, Annulektomie, laterale Foraminotomie, ggf. Pedikelschrauben-Stabilisierung). Die Prognose ist bei einer Erfolgsrate von 67–95 % in der Regel gut, abhängig vom präoperativen Schweregrad.",
      },
    ],
    errorTags: ["Befund überbewertet", "Anatomieverwechslung", "vorschnelle Diagnose", "Differentialdiagnostik unvollständig"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 9.2 (Degenerative lumbosakrale Stenose und Cauda equina-Syndrom), S. 230–232. Ätiologie, Klinik, Bildgebung und Therapie sind im Original so beschrieben. Ergänzt und vertieft den bereits vorhandenen Übersichtseintrag zu Rückenmark/peripheren Nerven (Tab. 7.6, Kap. 7.10.2) um die volle klinische Tiefe aus Kapitel 9. Konkrete Medikamentendosierungen aus dem Original bewusst nicht übernommen (Zielgruppe Physiotherapeuten, keine Verschreibungsbefugnis).",
    relatedCaseIds: [],
    relatedAnatomyIds: ["rueckenmark", "discus"],
  },
  {
    id: "degenerative-myelopathie-hund",
    category: "PATHOLOGIE",
    title: "Degenerative Myelopathie (DM): der SOD1-Gentest als Zuchtinstrument",
    teaser:
      "Schmerzlose, langsam fortschreitende Hinterhandschwäche beim älteren Schäferhund — genetisch testbar, aber medikamentös nicht behandelbar.",
    sections: [
      {
        type: "text",
        heading: "Ätiologie und Pathogenese",
        text: "Die degenerative Myelopathie (DM) ist eine Axonerkrankung mit Nekrose in den lateralen und dorsalen Anteilen des thorakolumbalen Rückenmarks — betroffen ist primär die weiße Rückenmarksubstanz. Durch die Demyelinisierung degenerieren die Axone, die Kommunikation zwischen Gehirn und Gliedmaßen geht fortschreitend verloren. Ursache ist eine Mutation des SOD1-Gens: homozygote Träger erkranken mit sehr hoher Wahrscheinlichkeit, bei heterozygoten Trägern entwickelt sich die Krankheit kaum und wurde nur bei wenigen sehr alten Hunden beobachtet. Deutsche Schäferhunde sind übervertreten, DM kommt aber auch bei Boxern, Hovawarten und Pembroke Welsh Corgis vor. Betroffene Hunde sind mittelalt bis alt. Der Gentest wird von mehreren Rasseclubs bereits zur züchterischen Kontrolle eingesetzt.",
      },
      {
        type: "text",
        heading: "Klinisches Bild",
        text: "Langsamer, progressiver Verlauf mit Ataxie der Hintergliedmaßen, Schwäche und Parese; die Hintergliedmaßen können dabei gekreuzt stehen bleiben. Rückenschmerz fehlt meist. Die Reflexe der Hinterhand sind normal bis gesteigert (Ausdruck eines oberen Motoneuron-Ausfalls), wobei der Patellareflex manchmal auch ganz ausfallen kann. In späten Stadien werden die Hunde harn- und kotinkontinent, bei langem Verlauf ist auch die Vordergliedmaßenfunktion betroffen.",
      },
      {
        type: "text",
        heading: "Diagnostik und Therapie",
        text: "Da DM eine Ausschlussdiagnose ist, dienen Röntgen und MRT der Wirbelsäule/des Nervengewebes dem Ausschluss der wichtigen Differentialdiagnosen chronische intervertebrale Erkrankung, Neoplasie und Meningomyelitis; eine Liquoruntersuchung schließt Infektionen aus. Die Diagnose wird im Ausschlussverfahren gestellt, insbesondere bei positivem SOD1-Gentest. Eine medikamentöse Behandlung existiert nicht — zu erwarten ist ein sich schubweise verschlechternder Verlauf über Monate bis maximal wenige Jahre, wonach die Euthanasie erfolgen muss. Intensive, gezielte Physiotherapie kann die Gehfähigkeit verlängern.",
      },
      {
        type: "text",
        heading: "Abgrenzung von der DLSS",
        text: "DM und DLSS überschneiden sich klinisch (beide: langsam progrediente Hinterhandschwäche beim älteren, oft großen Hund), unterscheiden sich aber deutlich: DLSS zeigt Rückenschmerz und Reflexbefunde des unteren Motoneurons (Cauda-equina-Kompression), DM ist meist schmerzlos mit Reflexbefunden des oberen Motoneurons (intramedulläre Axondegeneration). Diese Unterscheidung ist klinisch relevant, weil DLSS operativ dekomprimiert werden kann, DM dagegen nicht.",
      },
    ],
    errorTags: ["Anatomieverwechslung", "Faktenwissen", "Differentialdiagnostik unvollständig", "Befund überbewertet"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 9.3 (Degenerative Myelopathie), S. 232. Ätiologie, Klinik, Diagnostik und Therapie sind im Original so beschrieben. Ergänzt den bereits vorhandenen Übersichtseintrag zu Rückenmark/peripheren Nerven (Tab. 7.5, Kap. 7.10.2) um die volle klinische Tiefe aus Kapitel 9.",
    relatedCaseIds: [],
    relatedAnatomyIds: ["rueckenmark"],
  },
  {
    id: "rueckenmarksinfarkt-fibrokartilaginoese-embolie",
    category: "PATHOLOGIE",
    title: "Rückenmarksinfarkt (fibrokartilaginöse Embolie): perakut und meist schmerzlos",
    teaser:
      "Ein junger, großer Hund kollabiert beim Spielen ohne erkennbares Trauma — die fehlende Ausfallskaskade und der fehlende Rückenschmerz unterscheiden den Infarkt von der Kompression.",
    sections: [
      {
        type: "text",
        heading: "Ätiologie und Pathogenese",
        text: "Fibrokartilaginöses Material aus dem Nucleus pulposus kann über venöse Sinus der Wirbelkörper ins spinale Gefäßsystem abgeschwemmt werden. Der Embolus löst dort eine ischämische oder blutige Infarzierung des Neuroparenchyms aus; die Nervenzellen nekrotisieren, die Axone schwellen an, eine begleitende Schwellung schädigt umliegendes Rückenmarkgewebe zusätzlich lokal. Betroffen sind vor allem mittelgroße bis große, jungadulte Hunde. Die meisten Infarkte liegen an den Intumeszenzen lumbosakral oder zervikothorakal.",
      },
      {
        type: "text",
        heading: "Klinisches Bild: keine logische Ausfallskaskade",
        text: "Die Symptomatik ist meist perakut, oft während des Spielens und ohne beobachtetes Trauma; nach einer initialen Phase ändert sie sich kaum noch. Die neurologischen Zeichen sind Ausdruck der intramedullären Schädigung und können asymmetrisch sein. Anders als bei extramedullärer Kompression (Rückenschmerz → Ataxie → Lokomotionsstörung → Ausfall des Oberflächenschmerzes → Ausfall des Tiefenschmerzes) findet sich beim Rückenmarksinfarkt keine solche logische Ausfallskaskade — Rückenschmerz fehlt meist ganz. Viele Patienten zeigen mehr oder weniger starke Paresen.",
      },
      {
        type: "text",
        heading: "Bildgebung",
        text: "Röntgenbilder und Schnittbilder der Wirbelsäule dienen dem Ausschluss anderer Ursachen (kompressive/nicht kompressive Bandscheibenerkrankungen, Neoplasien, Traumata, Meningomyelitis). Im MRT zeigt sich der Infarkt als fokale, T2-hyperintense, intramedulläre Läsion. Die Liquoruntersuchung ist meist normal, gelegentlich mit geringer Proteinerhöhung. Eine definitive Diagnose gelingt nur post mortem histopathologisch.",
      },
      {
        type: "text",
        heading: "Therapie und Prognose",
        text: "Kortikosteroide sind nicht indiziert — sie beeinflussen weder Verlauf noch Prognose. Wichtig sind Dekubitusprophylaxe (weiche Lagerung), Urinabführung alle 8 Stunden sowie Physiotherapie zum Erhalt der Muskelmasse und zur Durchblutungsförderung. Die Prognose hängt stark von Ausmaß und Lokalisation ab: Infarkte außerhalb der Reflexzentren sind prognostisch günstig, Läsionen innerhalb der Zervikal- oder Lumbalintumeszenz erholen sich unvollständiger und langsamer. Bleibt über 2 Wochen ein sichtbarer Fortschritt aus oder fehlt der Tiefenschmerz, muss eine Euthanasie in Betracht gezogen werden.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Befund überbewertet", "vorschnelle Diagnose"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 9.4 (Rückenmarksinfarkt), S. 232f. Ätiologie, Klinik, Bildgebung und Therapie sind im Original so beschrieben. Ergänzt den bereits vorhandenen Übersichtseintrag zu Rückenmark/peripheren Nerven (Tab. 7.5, Kap. 7.10.2, dort als „Fibrokartilaginäre Embolie / Rückenmarksinfarkt“) um die volle klinische Tiefe aus Kapitel 9.",
    relatedCaseIds: [],
    relatedAnatomyIds: ["rueckenmark"],
  },
  {
    id: "thorakolumbaler-bandscheibenvorfall-therapie",
    category: "PATHOLOGIE",
    title: "Thorakolumbaler Bandscheibenvorfall: Fünf-Grade-Skala und Schiff-Sherrington-Phänomen",
    teaser:
      "Vom Rückenschmerz bis zum Verlust des Tiefenschmerzes — der Schweregrad des thorakolumbalen Bandscheibenvorfalls bestimmt direkt Therapieplan und Prognose.",
    sections: [
      {
        type: "text",
        heading: "Ätiologie und Pathogenese",
        text: "Der thorakolumbale Bandscheibenvorfall ist die häufigste spinale Erkrankung des Hundes. Die akute Herniation des metaplasierenden Nucleus pulposus durch den ebenfalls degenerierten Anulus fibrosus (Diskusextrusion) führt zu den klassischen Bandscheibenproblemen mittelalter Hunde zwischen Th10 und L6 (70 % davon zwischen Th12 und L2) und komprimiert das Rückenmark direkt extradural mit begleitender Folgeschwellung. Chondrodystrophe Rassen (Dackel, Pekinese, Beagle, Pudel) sind prädisponiert. Bei nicht-chondrodystrophen, größeren Rassen entsteht histologisch ebenfalls eine chondroide Metaplasie des Nucleus pulposus, der Vorfall äußert sich hier aber eher als Diskusprotrusion (Vorwölbung von Anulusfasern) mit chronisch-progressivem Charakter statt einem akuten Ereignis.",
      },
      {
        type: "list",
        heading: "Fünf Schweregrade der extraduralen Kompression",
        items: [
          "1. Rückenschmerzen",
          "2. Propriozeptionsausfälle und Ataxie",
          "3. Verlust der Motorik der Hintergliedmaßen mit spastisch gehaltenen Beinen",
          "4. Verlust des Oberflächenschmerzes beim Kneifen der Haut der Hintergliedmaße",
          "5. Verlust des Tiefenschmerzes bei Druck auf die Zehenknochen der Hintergliedmaße",
        ],
      },
      {
        type: "text",
        heading: "Reflexbefunde und das Schiff-Sherrington-Phänomen",
        text: "Die Kompression des oberen Motoneurons im thorakolumbalen Bereich bedingt eine partielle bis komplette Enthemmung der Reflexe der Hintergliedmaße durch das Gehirn: Patellareflex, M.-tibialis-cranialis-Reflex und Blasensphinktertonus sind gesteigert, die Reflexe der Vordergliedmaße bleiben normal. Die Blasenentleerung gelingt bei der oft prall gefüllten Blase nur mühsam. Eine sehr tiefe Läsion im Segment T3–L3 kann durch Ausschalten eines weiteren Hemmzentrums eine starke Erhöhung des Muskeltonus der Vordergliedmaße auslösen — das Schiff-Sherrington-Phänomen.",
      },
      {
        type: "text",
        heading: "Bildgebung und Therapie",
        text: "Diagnostikum der Wahl ist die Magnetresonanztomografie, in zweiter Linie die Computertomografie — beide vor allem dann, wenn eine dekompressive Chirurgie infrage kommt. Konventionelles Röntgen hat nur limitierte Aussagekraft. Bei Rückenschmerzen und Propriozeptionsausfällen kann konservativ behandelt werden (Schmerzmittel, Physiotherapie, kontrollierte Bewegung, Ruhe; der Nutzen von Kortikosteroiden ist umstritten und ein abschwellender Effekt am komprimierten Rückenmark nicht belegt). Bei Rezidiven oder beginnendem Motorikverlust ist die dekompressive Chirurgie indiziert (Hemilaminektomie, Mini-Hemilaminektomie, Pedikulektomie oder dorsale Laminektomie), ggf. ergänzt durch präventive Fenestration des Anulus fibrosus zur Senkung des Reherniationsrisikos. Nach erfolgreicher Dekompression ist intensive Nachsorge (Schmerzmittel, Physiotherapie, Umlagerungen, Blasenentleerungskontrollen) entscheidend für das Ergebnis; die Prognose hängt von Vorfallausmaß, Zeitpunkt der Dekompression, chirurgischer Technik und postoperativer Betreuung ab.",
      },
    ],
    errorTags: ["Befund überbewertet", "Differentialdiagnostik unvollständig", "Untersuchung falsch gewählt", "vorschnelle Diagnose"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 9.5 (Thorakolumbaler Bandscheibenvorfall), S. 233f. Ätiologie, Gradierung, Reflexbefunde, Bildgebung und Therapie sind im Original so beschrieben. Ergänzt den bereits vorhandenen Übersichtseintrag zu Rückenmark/peripheren Nerven (Tab. 7.6, Kap. 7.10.2) sowie den Lokalisationsalgorithmus-Eintrag (Kap. 7.10.1, dort bereits mit der gleichen Fünf-Grade-Skala) um die krankheitsspezifische klinische Tiefe aus Kapitel 9.",
    relatedCaseIds: ["filou"],
    relatedAnatomyIds: ["discus", "rueckenmark"],
  },
  {
    id: "zervikaler-bandscheibenvorfall-hund",
    category: "PATHOLOGIE",
    title: "Zervikaler Bandscheibenvorfall: steifer Gang mit tief gehaltenem Kopf",
    teaser:
      "Weil die Halswirbelsäule dem Rückenmark mehr Platz lässt, fallen zervikale Bandscheibenvorfälle oft erst spät auf — die Prognose ist dafür meist besser als thorakolumbal.",
    sections: [
      {
        type: "text",
        heading: "Ätiologie und Pathogenese",
        text: "Rund 15 % aller Bandscheibenvorfälle betreffen die zervikale Halswirbelsäule, mit Prädilektionsstellen zwischen C2/C3 bzw. C3/C4 bei kleinen Hunderassen; bei großen Rassen sind eher die tiefzervikalen Segmente C5–C7 betroffen. Vorwiegend chondrodystrophe Rassen sind betroffen, aber auch der Dobermann Pinscher ist übervertreten. Beim Beagle werden mehr zervikale als thorakolumbale Bandscheibenvorfälle beobachtet.",
      },
      {
        type: "text",
        heading: "Klinisches Bild",
        text: "Weil die zervikale Wirbelsäule dem Rückenmark mehr Platz lässt als weiter kaudal, werden klinische Symptome erst bei großvolumigen Vorfällen bemerkt. Typisch ist ein steifer Gang mit tief gehaltenem Kopf; die Manipulation der Halswirbelsäule ist sehr schmerzhaft. Da die kortikospinalen Bahnen zu den Hintergliedmaßen im Rückenmark exponierter liegen, führen manche zervikale Bandscheibenvorfälle zunächst zu Paresen der Hinterhand, bevor auch Defizite an der Vorhand nachweisbar werden — ein Befund, der leicht fälschlich als rein thorakolumbales Problem fehlgedeutet werden kann.",
      },
      {
        type: "text",
        heading: "Bildgebung und Therapie",
        text: "Auch hier wird auf Schnittbildverfahren zurückgegriffen, Myelografien werden kaum noch durchgeführt. Bei Halsbeugeschmerz ohne weitere neurologische Ausfälle gilt die gleiche konservative Therapie wie beim thorakolumbalen Bandscheibenvorfall. Repetitive Halsbeugeschmerzen und Paresen sind Indikation für eine von ventral oder lateral erfolgende Dekompression (anatomisch anspruchsvoller Zugang wegen vaskulärer und neuraler Strukturen). Weil der weite Wirbelkanal mehr Schwellung erträgt, besteht weniger zeitlicher Druck als beim thorakolumbalen Vorfall — entsprechend gut ist die Prognose: Nach ventraler Korpektomie (ventral slot) erholen sich über 90 % der behandelten Hunde sehr gut. Die Nachbehandlung besteht aus Physiotherapie, Schmerzmitteln und Ruhigstellung.",
      },
    ],
    errorTags: ["Anatomieverwechslung", "Differentialdiagnostik unvollständig", "Befund übersehen"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 9.6 (Zervikaler Bandscheibenvorfall), S. 234. Ätiologie, Klinik, Bildgebung und Therapie sind im Original so beschrieben. Ergänzt den bereits vorhandenen Übersichtseintrag zu Rückenmark/peripheren Nerven (Tab. 7.6, Kap. 7.10.2) um die krankheitsspezifische klinische Tiefe aus Kapitel 9.",
    relatedCaseIds: [],
    relatedAnatomyIds: ["discus", "rueckenmark"],
  },
  {
    id: "plexusschaden-vordergliedmasse",
    category: "PATHOLOGIE",
    title: "Plexus-brachialis-Schaden: Physiotherapie statt Nervennaht",
    teaser:
      "Nach Zug- oder Sturztrauma bleibt die „Kusshandstellung“ oft das einzig sicher Sichtbare — Reposition und Naht gelingen bei Plexusschäden praktisch nur im Experiment.",
    sections: [
      {
        type: "text",
        heading: "Mechanismus und klinisches Bild",
        text: "Traumata oder Stürze aus großer Höhe von kranial oder lateral können zu Dehnungen oder Abrissen der Wurzeln des Plexus brachialis oder seiner abgehenden Nerven (z. B. N. radialis) führen. Es resultiert eine Monoplegie eines Beines mit Zeichen des unteren Motoneurons — schlaffe Lähmung, reduzierte bis abwesende Reflexantworten. Die den geschädigten Nerven entsprechenden Dermatome zeigen bei Reizung keine oder eine verzögerte Reaktion.",
      },
      {
        type: "list",
        heading: "Wichtige Differentialdiagnosen",
        items: [
          "Traumatische, platzfordernde Hämatome",
          "Seitlich dominierende zervikale Bandscheibenvorfälle",
          "Nervenscheidentumoren",
          "Nervenentzündungen (seltener)",
        ],
      },
      {
        type: "text",
        heading: "Diagnostik",
        text: "Die Diagnose wird im Ausschlussverfahren gestellt — über Schnittbildverfahren und schlussendlich eine Elektromyografie. Getrennte Nerven selbst sind nur sehr schwierig darzustellen und zu finden.",
      },
      {
        type: "text",
        heading: "Therapie: Physiotherapie statt operativer Nervenwiederherstellung",
        text: "Reposition, Naht und Funktionswiederherstellung durchtrennter Nerven gelingen praktisch nur im experimentellen Rahmen. Bei verletzten Hunden wird deshalb in erster Linie auf Physiotherapie gesetzt: Sie verbessert die Nervenkonduktion und fördert muskuläre Kompensationsmechanismen. Zudem soll die Muskulatur möglichst erhalten werden, bis eine allfällige Reinnervation durch Nachwachsen verletzter Nervenfasern eintritt. Nach 6–12 Monaten ist keine weitere Spontanerholung mehr zu erwarten. Bleibt die proximale Gliedmaße halbwegs funktionsfähig und stehen nur Carpus und Zehen in Flexion, kann eine Orthese verschrieben oder eine Arthrodese des Carpus versucht werden; bei drohender Automutilation muss die Amputation der Gliedmaße in Betracht gezogen werden.",
      },
      {
        type: "text",
        heading: "Verknüpfung zur Seddon-Klassifikation",
        text: "Die hier beschriebenen klinischen Konsequenzen (lange Regenerationszeit, oft schlechte Prognose bei kompletter Durchtrennung) entsprechen dem, was die Seddon-Klassifikation strukturell als Axonotmesis bzw. Neuronotmesis beschreibt (siehe entsprechender Wissenseintrag) — ein Plexusabriss betrifft in der Regel eine oder mehrere Nervenwurzeln auf dieser strukturell schweren Ebene, nicht die leichtere, rasch reversible Neurapraxie.",
      },
    ],
    errorTags: ["Differentialdiagnostik unvollständig", "Befund überbewertet", "falsche Priorisierung", "Untersuchung falsch gewählt"],
    sourceStatus:
      "Verifiziert: Koch, Daniel; Fischer, Martin S. (unter Mitarbeit von Britta Dobenecker), Lahmheitsuntersuchung beim Hund (ISBN 978-3-13-242101-1), Thieme, 2. Auflage 2019, Kap. 9.7 (Plexusschaden an der Vordergliedmaße), S. 234–236. Klinik, Differentialdiagnosen, Diagnostik und Therapie sind im Original so beschrieben. Kap. 9 endet danach mit dem Literaturverzeichnis (9.8). Ergänzt den bereits vorhandenen Übersichtseintrag zu Rückenmark/peripheren Nerven (Tab. 7.7, Kap. 7.10.2) sowie den Seddon-Klassifikations-Eintrag (VetCenter-Quelle) um die krankheitsspezifische klinische Tiefe aus Kapitel 9.",
    relatedCaseIds: [],
    relatedAnatomyIds: [],
  },
];

export async function seedContent(prisma: PrismaClient) {
  const caseIdBySlug = new Map<string, string>();

  for (const c of CASES) {
    const created = await prisma.case.upsert({
      where: { slug: c.id },
      update: {
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
        einstiegsbildUrl: c.einstiegsbildUrl ?? null,
        befundbildUrl: c.befundbildUrl ?? null,
      },
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
        einstiegsbildUrl: c.einstiegsbildUrl,
        befundbildUrl: c.befundbildUrl,
        status: "DRAFT",
      },
    });
    caseIdBySlug.set(c.id, created.id);

    await prisma.caseHypothesisOption.deleteMany({ where: { caseId: created.id } });
    await prisma.caseWeakeningOption.deleteMany({ where: { caseId: created.id } });
    await prisma.caseRetrievalOption.deleteMany({ where: { caseId: created.id } });

    await prisma.caseHypothesisOption.createMany({
      data: c.hypothesisOptions.map((o, i) => ({
        caseId: created.id,
        sortOrder: i,
        label: o.label,
        isCorrect: o.correct,
        errorCategory: o.errorCategory,
        arguesAgainst: o.arguesAgainst,
        differentiationDistractors: o.differentiationDistractors ?? [],
      })),
    });
    await prisma.caseWeakeningOption.createMany({
      data: c.weakeningOptions.map((o, i) => ({
        caseId: created.id,
        sortOrder: i,
        label: o.label,
        isCorrect: o.correct,
        errorCategory: o.errorCategory,
      })),
    });
    await prisma.caseRetrievalOption.createMany({
      data: c.retrievalOptions.map((o, i) => ({
        caseId: created.id,
        sortOrder: i,
        label: o.label,
        isCorrect: o.correct,
        errorCategory: o.errorCategory,
      })),
    });
  }

  const anatomyIdBySlug = new Map<string, string>();

  for (const a of ANATOMY) {
    const createdAnatomy = await prisma.anatomyItem.upsert({
      where: { slug: a.id },
      update: {
        name: a.name,
        relatedCaseId: a.relatedCaseId ? caseIdBySlug.get(a.relatedCaseId) : null,
        origin: a.origin,
        insertion: a.insertion,
        funktion: a.funktion,
        innervation: a.innervation,
        clinicalRelevance: a.clinicalRelevance,
        palpationHint: a.palpationHint,
        transferQ: a.transferQ,
        sourceStatus: a.sourceStatus,
        bildUrl: a.bildUrl ?? null,
      },
      create: {
        slug: a.id,
        name: a.name,
        status: "DRAFT",
        relatedCaseId: a.relatedCaseId ? caseIdBySlug.get(a.relatedCaseId) : undefined,
        origin: a.origin,
        insertion: a.insertion,
        funktion: a.funktion,
        innervation: a.innervation,
        clinicalRelevance: a.clinicalRelevance,
        palpationHint: a.palpationHint,
        transferQ: a.transferQ,
        sourceStatus: a.sourceStatus,
        bildUrl: a.bildUrl,
      },
    });
    anatomyIdBySlug.set(a.id, createdAnatomy.id);

    await prisma.anatomyTransferOption.deleteMany({ where: { anatomyId: createdAnatomy.id } });
    await prisma.anatomyTransferOption.createMany({
      data: a.transferOptions.map((o, i) => ({
        anatomyId: createdAnatomy.id,
        sortOrder: i,
        label: o.label,
        isCorrect: o.correct,
      })),
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

  for (const k of KNOWLEDGE) {
    const createdKnowledge = await prisma.knowledgeEntry.upsert({
      where: { slug: k.id },
      update: {
        category: k.category,
        title: k.title,
        teaser: k.teaser,
        sections: k.sections,
        errorTags: k.errorTags,
        sourceStatus: k.sourceStatus,
      },
      create: {
        slug: k.id,
        category: k.category,
        title: k.title,
        teaser: k.teaser,
        sections: k.sections,
        status: "DRAFT",
        errorTags: k.errorTags,
        sourceStatus: k.sourceStatus,
      },
    });

    await prisma.knowledgeCaseLink.deleteMany({ where: { knowledgeId: createdKnowledge.id } });
    await prisma.knowledgeAnatomyLink.deleteMany({ where: { knowledgeId: createdKnowledge.id } });

    if (k.relatedCaseIds.length > 0) {
      await prisma.knowledgeCaseLink.createMany({
        data: k.relatedCaseIds.map((cid) => ({
          knowledgeId: createdKnowledge.id,
          caseId: caseIdBySlug.get(cid)!,
        })),
        skipDuplicates: true,
      });
    }
    if (k.relatedAnatomyIds.length > 0) {
      await prisma.knowledgeAnatomyLink.createMany({
        data: k.relatedAnatomyIds.map((aid) => ({
          knowledgeId: createdKnowledge.id,
          anatomyId: anatomyIdBySlug.get(aid)!,
        })),
        skipDuplicates: true,
      });
    }
  }

  const result = {
    cases: CASES.length,
    anatomyItems: ANATOMY.length,
    mediaAssets: MEDIALIBRARY.length,
    knowledgeEntries: KNOWLEDGE.length,
  };
  console.log(
    `Seed abgeschlossen: ${result.cases} Fälle, ${result.anatomyItems} Anatomie-Items, ${result.mediaAssets} Medien, ${result.knowledgeEntries} Wissenseinträge.`,
  );
  return result;
}
