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
    insertion: "Im Quellentext nicht genannt",
    funktion:
      "Je nach Gelenkstellung Flexion oder Extension des Schultergelenks (wie M. infraspinatus); zusätzlich innerer Kapselverstärker (medialer Stabilisator) des Schultergelenks.",
    innervation: "Im Quellentext nicht genannt",
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
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 12, S. 127f., 143. Ursprung (Fossa subscapularis), Funktion (positionsabhängige Flexion/Extension wie M. infraspinatus, medialer Kapselverstärker) sowie die fehlende Palpierbarkeit und die daraus folgende Ausschlussdiagnostik sind im Original so beschrieben. Ansatz und Innervation werden im Original nicht genannt.",
  },
  {
    id: "coracobrachialis",
    name: "M. coracobrachialis",
    relatedCaseId: "rocky",
    origin: "Processus coracoideus der Scapula",
    insertion: "Im Quellentext nicht genannt",
    funktion:
      "Je nach Gelenkstellung Flexion oder Extension des Schultergelenks (wie M. infraspinatus und M. subscapularis), zusätzlich Adduktion des Schultergelenks.",
    innervation: "Im Quellentext nicht genannt",
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
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 12, S. 127f., 143f. Ursprung (Processus coracoideus scapulae), Funktion (positionsabhängige Flexion/Extension plus zusätzliche Adduktion) sowie die differentialdiagnostische Abgrenzung über zusätzliche Abduktion sind im Original so beschrieben. Ansatz und Innervation werden im Original nicht genannt.",
  },
  {
    id: "teres-major",
    name: "M. teres major",
    relatedCaseId: "rocky",
    origin: "Angulus caudalis der Scapula",
    insertion: "Crista tuberculi minoris humeri (gemeinsame Endsehne mit M. latissimus dorsi)",
    funktion:
      "Flexion des Schultergelenks — gemeinsam mit seinem „Brudermuskel“ M. latissimus dorsi, mit dem er sich in der Endsehne verbindet und denselben Ansatz teilt.",
    innervation: "Im Quellentext nicht genannt",
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
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 12, S. 128, 144, 164. Ursprung (Angulus caudalis scapulae), Ansatz (Crista tuberculi minoris humeri, gemeinsame Endsehne mit M. latissimus dorsi), Funktion (Flexion, als „Brudermuskel“ des M. latissimus dorsi) sowie die differentialdiagnostische Abgrenzung zum M. deltoideus über zusätzliche Außenrotation sind im Original so beschrieben. Die Innervation wird im Original nicht genannt.",
  },
  {
    id: "teres-minor",
    name: "M. teres minor",
    relatedCaseId: "rocky",
    origin: "Distales Drittel des Margo caudalis der Scapula",
    insertion: "Tuberositas teres minor am Humeruskopf",
    funktion: "Flexion des Schultergelenks",
    innervation: "Im Quellentext nicht genannt",
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
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 12, S. 128, 144. Ursprung (distales Drittel Margo caudalis scapulae), Ansatz (Tuberositas teres minor am Humeruskopf, im Original explizit benannt) und Funktion (Flexion des Schultergelenks, Dehnungstest via reine Extension) sind im Original so beschrieben. Die Innervation wird im Original nicht genannt.",
  },
  {
    id: "brachialis",
    name: "M. brachialis",
    relatedCaseId: "rocky",
    origin: "Collum humeri (lateral des M. biceps brachii gelegen)",
    insertion:
      "Geteilter Ansatz: ein schmaler Schenkel zur Tuberositas radii, der zweite, kräftigere Schenkel unter der gespaltenen Ansatzsehne des M. biceps brachii hindurch zum Proc. coronoideus medialis der Ulna",
    funktion: "Flexion des Ellenbogengelenks",
    innervation: "Im Quellentext nicht genannt",
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
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 13 (Ellenbogenregion), S. 165f., 171. Ursprung (Collum humeri, lateral des Bizeps), der geteilte Ansatz (Tuberositas radii sowie Proc. coronoideus medialis der Ulna), Funktion (Flexion Ellenbogengelenk) und der Dehnungstest (Extension Ellenbogengelenk) sind im Original so beschrieben. Die Innervation wird im Original nicht genannt.",
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
    innervation: "Im Quellentext nicht genannt",
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
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 13, S. 166, 170f. Die vier Köpfe, ihre unterschiedliche Funktion/Faserzusammensetzung, die fehlende Palpierbarkeit des Caput accessorium und der unterschiedliche Dehnungstest für Caput longum vs. die anderen drei Köpfe sind im Original so beschrieben. Der Ansatz am Olecranon ist aus dem Palpationsverlauf abgeleitet (\"bis zum Olekranon\"), nicht als eigenständige Ansatz-Aussage benannt. Ursprung des Caput longum (Tuberculum infraglenoidale) stammt aus Kap. 12, S. 127. Die Innervation wird im Original nicht genannt.",
  },
  {
    id: "tensor-fasciae-antebrachii",
    name: "M. tensor fasciae antebrachii",
    relatedCaseId: "rocky",
    origin: "Abspaltung vom M. latissimus dorsi (gilt als dessen „5. Trizepskopf“)",
    insertion: "Zieht medial zum Olecranon und spannt die Unterarmfaszie",
    funktion: "Extension des Ellenbogengelenks, spannt zusätzlich die Unterarmfaszie",
    innervation: "Im Quellentext nicht genannt",
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
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 13, S. 166, 172. Herkunft als Abspaltung des M. latissimus dorsi, Funktion (Extension Ellenbogengelenk, Fasziendehnung), Lage sowie der Dehnungstest sind im Original so beschrieben. Der genaue Ansatzpunkt wird im Original nicht als eigene Ansatz-Aussage benannt, sondern aus dem Palpationsverlauf (bis zur Medialseite des Olekranons) und der Funktionsbeschreibung abgeleitet. Die Innervation wird im Original nicht genannt.",
  },
  {
    id: "anconeus",
    name: "M. anconeus",
    relatedCaseId: "rocky",
    origin: "Im Quellentext nicht genannt (Lage: lateral, distal des M. triceps brachii, zwischen den Humeruskondylen und dem Olekranon)",
    insertion: "Im Quellentext nicht genannt",
    funktion: "Extension des Ellenbogengelenks",
    innervation: "Im Quellentext nicht genannt",
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
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 13, S. 166, 172f. Faserzusammensetzung (100 % Typ I), Funktion als Antischwerkraftmuskel und Ellenbogenextensor sowie die hohe Muskelspindeldichte mit ihrer Bedeutung für die Propriozeption sind im Original so beschrieben. Ursprung, Ansatz und Innervation werden im Original nicht genannt — nur die Palpationslage.",
  },
  {
    id: "supinator",
    name: "M. supinator",
    origin: "Im Quellentext nicht genannt (Lage: lateral am Unterarm, unter M. extensor carpi radialis und M. extensor digitorum communis)",
    insertion: "Im Quellentext nicht genannt",
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
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 14 (Unterarmregion), S. 179f., 182. Funktion (Flexion/Supination Ellenbogengelenk), der Verlauf des N. radialis durch den Muskel, die fehlende direkte Palpierbarkeit sowie der Dehnungstest (Extension und Pronation) sind im Original so beschrieben. Ursprung und Ansatz werden im Original nicht genannt. WIDERSPRUCH IN DER QUELLE: Kap. 17 (Neurotension), S. 279, beschreibt denselben Mechanismus (hypertoner M. supinator komprimiert N. radialis) unter der Bezeichnung „toe out position\" statt „Toe-in\" wie hier in Kap. 14. Der Muskel-Nerv-Bezug ist in beiden Kapiteln identisch, nur die Fußstellungsbezeichnung widerspricht sich zwischen den Kapiteln. Hier wird die Darstellung aus Kap. 14 (eigenständiges Unterarm-Kapitel mit vollständiger Gegenüberstellung Toe-in/Toe-out) beibehalten — die Diskrepanz ist ungeklärt und sollte fachlich/praktisch geprüft werden, bevor sie als sicher gilt. Web-Abgleich (22.09.2026): Weder canine noch humane Fachliteratur zum Supinatortunnel-/Supinatorlogensyndrom (z. B. Springer Nature, DocCheck Flexikon, PubMed) beschreibt eine Zuordnung zu einer bestimmten Fußstellung — dort werden andere Kompressionsursachen genannt (Frohse-Arkade, raumfordernde Prozesse, repetitive Pro-/Supination). Die Toe-in/Toe-out-Zuordnung scheint eine Hárrer-eigene klinische Beobachtung zu sein, die sich nicht extern verifizieren ließ. UNGEPRÜFTE HYPOTHESE (nicht aus einer Quelle, ausdrücklich als eigene Überlegung markiert): Der Widerspruch ließe sich denkbar dadurch erklären, dass in Kap. 14 der Muskel exzentrisch überdehnt (reaktiver Hypertonus durch chronischen Zug) und in Kap. 17 derselbe Muskel konzentrisch verkürzt (struktureller Hypertonus als Fehlstellungs-Ursache) gemeint sein könnte — ein in der Physiotherapie generell bekanntes Prinzip. Der Originaltext von Kap. 14 (\"kommt der M. supinator unter Spannung\") und Kap. 17 (\"Hypertonie des M. supinator\") belegt diese Unterscheidung aber nicht wörtlich; es handelt sich um eine mögliche Erklärung, keine verifizierte Aussage.",
  },
  {
    id: "brachioradialis",
    name: "M. brachioradialis",
    origin: "Im Quellentext nicht genannt",
    insertion: "Im Quellentext nicht genannt",
    funktion: "Flexion und Supination im Ellenbogengelenk — identisch mit M. supinator",
    innervation: "Im Quellentext nicht genannt",
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
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 14, S. 180, 182. Die anatomische Inkonstanz (fehlt häufig bei Hunden), Lage und die mit M. supinator identische Funktion sowie die Differenzierung nur über die Palpationstiefe sind im Original so beschrieben. Ursprung, Ansatz und Innervation werden im Original nicht genannt.",
  },
  {
    id: "pronator-teres",
    name: "M. pronator teres",
    origin: "Medialer Epicondylus humeri",
    insertion: "Kraniomedial am oberen Drittel des Radius",
    funktion: "Flexion und Pronation des Ellenbogengelenks",
    innervation: "Im Quellentext nicht genannt",
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
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 14, S. 180, 182f. Ursprung (medialer Epicondylus humeri), Ansatz (kraniomedial am oberen Drittel des Radius), Funktion (Flexion/Pronation), die klinische Beobachtung (häufig verspannt/hypertroph) sowie der Dehnungstest (Extension mit Supination) sind im Original so beschrieben. Die Innervation wird im Original nicht genannt. WIDERSPRUCH IN DER QUELLE: Kap. 17 (Neurotension), S. 279, ordnet die dort beschriebene Kompression des N. radialis durch den M. supinator der „toe out position\" zu — nach der hier verwendeten Kap.-14-Logik (Toe-out = M. pronator teres → N. medianus) müsste die dortige Aussage eigentlich M. supinator und Toe-in betreffen. Die beiden Kapitel widersprechen sich in der Stellungsbezeichnung; die Diskrepanz ist ungeklärt und sollte fachlich/praktisch geprüft werden, bevor sie als sicher gilt. Web-Abgleich (22.09.2026): Keine externe canine oder humane Fachquelle zu Pronator-teres-/N.-medianus-Kompression gefunden, die eine Fußstellung benennt — auch dies wirkt wie eine Hárrer-eigene klinische Beobachtung ohne externe Bestätigung. UNGEPRÜFTE HYPOTHESE (eigene Überlegung, keine Quellenaussage): Denkbar wäre eine Erklärung über exzentrischen (Kap. 14, Toe-out) vs. konzentrischen Hypertonus (Kap. 17, sofern dort tatsächlich Toe-in statt Toe-out gemeint wäre) — siehe ausführlicher die entsprechende Notiz beim Anatomie-Item „supinator\". Nicht durch den Originaltext belegt.",
  },
  {
    id: "pronator-quadratus",
    name: "M. pronator quadratus",
    origin: "Im Quellentext nicht genannt",
    insertion: "Im Quellentext nicht genannt",
    funktion: "Pronation der Unterarmgelenke",
    innervation: "Im Quellentext nicht genannt",
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
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 14, S. 180, 183. Lage, Funktion (Pronation) und die fehlende Palpier-/Provozierbarkeit sind im Original so beschrieben. Ursprung, Ansatz und Innervation werden im Original nicht genannt.",
  },
  {
    id: "extensoren-karpus-zehen",
    name: "Extensorenmuskulatur des Unterarms (Karpus/Zehen)",
    origin: "Crista supracondylaris lateralis, Epicondylus lateralis humeri und das laterale Kollateralligament",
    insertion: "Im distalen Drittel gehen die Muskeln in ihre jeweiligen Endsehnen über (im Quellentext keine einzelnen Ansatzpunkte benannt)",
    funktion:
      "Extension von Karpalgelenk und Zehen. Im Einzelnen: M. extensor carpi radialis (Extension Karpus), M. extensor carpi ulnaris (Extension Karpus mit Radialabduktion), M. extensor digitorum communis und M. extensor digitorum lateralis (zusätzlich Extension der Zehen).",
    innervation: "Im Quellentext nicht genannt",
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
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 14, S. 183f. Ursprungsregion, die gemeinsame Untersuchung der vier Muskeln sowie die jeweils spezifische Zusatzbewegung zur diagnostischen Differenzierung (Carpusflexion für M. ext. carpi radialis, zusätzliche Zehenflexion für die Mm. ext. digitorum, Radialabduktion für M. ext. carpi ulnaris) sind im Original so beschrieben. Einzelne Ansatzpunkte und die Innervation werden im Original nicht genannt.",
  },
  {
    id: "flexoren-karpus-zehen",
    name: "Flexorenmuskulatur des Unterarms (Karpus/Zehen)",
    origin: "Epicondylus medialis humeri bis kaudomedial zum Olekranon",
    insertion: "Ziehen fleischig deutlich weiter nach distal als die Extensoren (im Quellentext keine einzelnen Ansatzpunkte benannt)",
    funktion:
      "Flexion von Karpalgelenk und Zehen. Im Einzelnen: M. flexor carpi radialis und M. flexor carpi ulnaris (Flexion Karpus), Mm. flexor digitorum superficialis et profundus (zusätzlich Flexion der Zehen).",
    innervation: "Im Quellentext nicht genannt",
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
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 14, S. 180, 184. Ursprungsregion, die gemeinsame Untersuchung, die Rolle als Antischwerkraftmuskeln mit den genannten Faseranteilen sowie die diagnostische Differenzierung über Zusatzbewegungen sind im Original so beschrieben. Einzelne Ansatzpunkte und die Innervation werden im Original nicht genannt.",
  },
  {
    id: "biceps-femoris",
    name: "M. biceps femoris",
    origin: "Im Quellentext nicht genannt (Lage: Hintergliedmaße, oberflächlich kaudal des M. vastus lateralis)",
    insertion: "Im Quellentext nicht genannt",
    funktion:
      "Extension und Abduktion im Hüftgelenk. Die Pars cranialis extendiert zusätzlich das Kniegelenk; die Pars caudalis wirkt in der Hangbeinphase als Kniegelenkflexor, in der Stützbeinphase dagegen als Kniegelenkextensor. Beide Anteile extendieren zusätzlich das Sprunggelenk.",
    innervation: "Im Quellentext nicht genannt",
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
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 8 (Knieregion), S. 91. Die phasenabhängige Doppelfunktion der Pars caudalis, die Funktion der Pars cranialis sowie die Hüft- und Sprunggelenkfunktion sind im Original so beschrieben. Ursprung, Ansatz und Innervation werden im Original nicht genannt.",
  },
  {
    id: "semitendinosus",
    name: "M. semitendinosus",
    origin: "Im Quellentext nicht genannt",
    insertion: "Im Quellentext nicht genannt",
    funktion: "Extension von Hüft- und Sprunggelenk; am Kniegelenk wirkt er dagegen flektierend.",
    innervation: "Im Quellentext nicht genannt",
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
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 8, S. 91, 92. Funktion, Zugehörigkeit zum Pes anserinus und die spezifische Provokationsbewegung zur Differenzierung von M. gracilis/M. sartorius sind im Original so beschrieben. Ursprung, Ansatz und Innervation werden im Original nicht genannt.",
  },
  {
    id: "gracilis",
    name: "M. gracilis",
    origin: "Im Quellentext nicht genannt",
    insertion: "Im Quellentext nicht genannt",
    funktion: "Adduktion und etwas Extension im Hüftgelenk, Flexion im Kniegelenk, Extension im Sprunggelenk.",
    innervation: "Im Quellentext nicht genannt",
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
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 8, S. 91, 92. Funktion, Zugehörigkeit zum Pes anserinus und die spezifische Provokationsbewegung sind im Original so beschrieben. Ursprung, Ansatz und Innervation werden im Original nicht genannt.",
  },
  {
    id: "sartorius",
    name: "M. sartorius",
    origin: "Im Quellentext nicht genannt",
    insertion: "Im Quellentext nicht genannt",
    funktion: "Flexion und Adduktion im Hüftgelenk, Extension im Kniegelenk.",
    innervation: "Im Quellentext nicht genannt",
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
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 8, S. 91f. Funktion, Zugehörigkeit zum Pes anserinus, die spezifische Provokationsbewegung sowie die Überlagerung des M. vastus medialis (mit der daraus folgenden Palpationstechnik) sind im Original so beschrieben. Ursprung, Ansatz und Innervation werden im Original nicht genannt.",
  },
  {
    id: "tensor-fasciae-latae",
    name: "M. tensor fasciae latae",
    origin: "Im Quellentext nicht genannt",
    insertion: "Im Quellentext nicht genannt (zieht über den Tractus iliotibialis zur Lateralseite des Knies)",
    funktion: "Abduktion und Flexion im Hüftgelenk, Extension im Kniegelenk.",
    innervation: "Im Quellentext nicht genannt",
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
      "Verifiziert: Hárrer, Manuelle Therapie beim Hund (ISBN 978-3-13-245429-3), Thieme 2025, Kap. 8, S. 91f. Funktion, die stabilisierende Rolle des Tractus iliotibialis sowie der Zusammenhang zwischen Verkürzung des Muskels und Patella-Lateralisation (insbesondere bei Patelladysplasie) sind im Original so beschrieben. Ursprung, Ansatz und Innervation werden im Original nicht genannt.",
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
