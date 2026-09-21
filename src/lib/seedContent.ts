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
      "Quellenkandidat: Hohmann, Bewegungsapparat Hund (ISBN 978-3-13-245265-7), Thieme 2025, Kap. 9 (Muskeln in Bewegung) behandelt die Muskulatur systematisch; genaue Seite für M. quadriceps femoris noch zu identifizieren. Status weiterhin DRAFT.",
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
];

export async function seedContent(prisma: PrismaClient) {
  const caseIdBySlug = new Map<string, string>();

  for (const c of CASES) {
    const created = await prisma.case.upsert({
      where: { slug: c.id },
      update: {
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

  const anatomyIdBySlug = new Map<string, string>();

  for (const a of ANATOMY) {
    const createdAnatomy = await prisma.anatomyItem.upsert({
      where: { slug: a.id },
      update: {
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
        transferOptions: {
          create: a.transferOptions.map((o, i) => ({
            sortOrder: i,
            label: o.label,
            isCorrect: o.correct,
          })),
        },
      },
    });
    anatomyIdBySlug.set(a.id, createdAnatomy.id);
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
