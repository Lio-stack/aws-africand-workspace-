// DONNÉES DE DÉMONSTRATION — Administration (prototype ACW, écrans 36 à 51). Fictives.
// Espace interne AfriCand : les données personnelles y sont visibles (rôles habilités, accès audité).

export const adminKpis = [
  { label: "Consultants à valider", value: "12", cta: "Traiter", href: "/admin/consultants" },
  { label: "Entreprises à valider", value: "4", cta: "Traiter", href: "/admin/entreprises" },
  { label: "Besoins à qualifier", value: "3", cta: "Qualifier", href: "/admin/besoins" },
  { label: "Introductions à approuver", value: "2", cta: "Approuver", href: "/admin/introductions" },
];

export const pipelineColumns = [
  {
    title: "Qualification",
    count: 3,
    href: "/admin/besoins",
    cards: [
      { ref: "[B-035]", title: "Entrée de marché, Sénégal", who: "[Entreprise A]" },
      { ref: "[B-036]", title: "Levée de dette", who: "[Entreprise fictive SA]" },
    ],
  },
  {
    title: "Matching",
    count: 2,
    href: "/admin/matching",
    cards: [
      { ref: "[B-031]", title: "Due diligence financière", who: "[Entreprise fictive SA]" },
      { ref: "[B-033]", title: "Stratégie commerciale", who: "[Entreprise B]" },
    ],
  },
  { title: "Introduction", count: 2, href: "/admin/introductions", cards: [{ ref: "[B-028]", title: "DAF de transition", who: "[Entreprise fictive SA]" }] },
  { title: "Proposition", count: 1, href: "/admin/propositions", cards: [{ ref: "[P-012]", title: "DAF de transition, v2", who: "[Entreprise fictive SA]" }] },
  {
    title: "Mission",
    count: 4,
    href: "/admin/missions",
    cards: [
      { ref: "[M-021]", title: "DAF de transition", who: "Semaine 6 sur 16" },
      { ref: "[M-014]", title: "Stratégie de croissance", who: "Livrable 2 en retard" },
    ],
  },
];

export const adminAlerts = [
  { text: "Livrable 2 de [M-014] en retard de 3 jours", when: "Aujourd'hui", severity: "danger", href: "/admin/missions" },
  { text: "Facture [FA-2026-044] échue dans 5 jours", when: "Aujourd'hui", severity: "info", href: "/admin/facturation" },
  { text: "Besoin [B-035] en qualification depuis 6 jours", when: "Hier", severity: "info", href: "/admin/besoins" },
] as const;

export type CandidateStatus = "wait" | "itw" | "ok" | "no";

export const candidates: { id: number; name: string; place: string; date: string; dom: string; years: string; pct: number; status: CandidateStatus }[] = [
  { id: 1, name: "[Candidat 1]", place: "Abidjan", date: "[DATE]", dom: "M&A", years: "12 ans", pct: 95, status: "itw" },
  { id: 2, name: "[Candidat 2]", place: "Dakar", date: "[DATE]", dom: "Finance", years: "15 ans", pct: 88, status: "wait" },
  { id: 3, name: "[Candidat 3]", place: "Casablanca", date: "[DATE]", dom: "Stratégie", years: "9 ans", pct: 72, status: "wait" },
  { id: 4, name: "[Candidat 4]", place: "Ouagadougou", date: "[DATE]", dom: "Opérations", years: "11 ans", pct: 64, status: "wait" },
  { id: 5, name: "[Candidat 5]", place: "Lomé", date: "[DATE]", dom: "Finance", years: "6 ans", pct: 40, status: "wait" },
];

type Row = { k: string; v: string; s?: string; tone?: "success" | "info" | "neutral" };

export const consultantFile: { header: { ini: string; name: string; title: string; contact: string }; tabs: Record<"Profil" | "Vérifications" | "Historique", Row[]> } = {
  header: {
    ini: "C1",
    name: "[Candidat 1]",
    title: "Conseil M&A senior, 12 ans · Abidjan, Côte d'Ivoire",
    contact: "candidat1@exemple.com · +225 [NUMÉRO] · Code public : Expert A-1042",
  },
  tabs: {
    Profil: [
      { k: "Domaine principal", v: "M&A, due diligence financière" },
      { k: "Secteurs", v: "Agro-industrie, services financiers, énergie" },
      { k: "Langues", v: "Français, anglais" },
      { k: "TJM indiqué", v: "[TJM] FCFA" },
      { k: "Disponibilité", v: "8 jours par mois" },
    ],
    Vérifications: [
      { k: "Pièce d'identité", v: "Vérifiée le [DATE]", s: "Conforme", tone: "success" },
      { k: "Diplôme principal", v: "Master, [établissement]", s: "Conforme", tone: "success" },
      { k: "Référence 1", v: "[Associé, organisation]", s: "Confirmée", tone: "success" },
      { k: "Référence 2", v: "[DAF, organisation]", s: "En cours", tone: "info" },
      { k: "Entretien de qualification", v: "Prévu le [DATE] avec [Consultant AfriCand]", s: "Planifié", tone: "info" },
      { k: "Conflits d'intérêts", v: "Déclaration signée", s: "Conforme", tone: "success" },
    ],
    Historique: [
      { k: "Candidature déposée", v: "[DATE]" },
      { k: "Dossier complété à 95 %", v: "[DATE]" },
      { k: "Entretien planifié", v: "[DATE] par [Consultant AfriCand]" },
    ],
  },
};

export const companiesToValidate = [
  {
    id: 1,
    ini: "A",
    name: "[Entreprise A]",
    meta: "Distribution · Dakar, Sénégal · inscrite le [DATE]",
    checks: [
      { label: "RCCM", ok: true },
      { label: "Identité du dirigeant", ok: true },
      { label: "Attestation fiscale", ok: true },
      { label: "Listes de sanctions", ok: true },
    ],
  },
  {
    id: 2,
    ini: "B",
    name: "[Entreprise B]",
    meta: "Fonds d'investissement · Abidjan · inscrite le [DATE]",
    checks: [
      { label: "RCCM", ok: true },
      { label: "Identité du dirigeant", ok: true },
      { label: "Attestation fiscale", ok: false },
      { label: "Listes de sanctions", ok: true },
    ],
  },
  {
    id: 3,
    ini: "C",
    name: "[Entreprise C]",
    meta: "Industrie · Ouagadougou · inscrite le [DATE]",
    checks: [
      { label: "RCCM", ok: false },
      { label: "Identité du dirigeant", ok: true },
      { label: "Attestation fiscale", ok: false },
      { label: "Listes de sanctions", ok: true },
    ],
  },
];

export const needsToQualify = [
  {
    ref: "[B-035]",
    age: "il y a 6 jours",
    title: "Étude d'entrée de marché, Sénégal",
    client: "[Entreprise A]",
    anon: "Une entreprise de distribution recherche un consultant pour analyser l'entrée sur le marché sénégalais : taille de marché, concurrence, canaux, recommandations. 15 jours sur 5 semaines, à distance.",
  },
  {
    ref: "[B-036]",
    age: "il y a 2 jours",
    title: "Structuration d'une levée de dette",
    client: "[Entreprise fictive SA]",
    anon: "Une PME agro-industrielle recherche un expert en financement structuré pour préparer une levée de dette auprès de banques régionales et de DFI.",
  },
  {
    ref: "[B-037]",
    age: "aujourd'hui",
    title: "Audit organisationnel RH",
    client: "[Entreprise C]",
    anon: "Un industriel recherche un expert pour un audit de l'organisation et des processus RH. Mission sur site.",
  },
];

// ADR-003 / ADR-010 : 8 critères pondérés (total 100), réglables en settings.
export const matchingCriteria = [
  { label: "Compétences clés", short: "Compétences", max: 30 },
  { label: "Expérience (missions comparables)", short: "Expérience", max: 20 },
  { label: "Expérience sectorielle", short: "Secteur", max: 12 },
  { label: "Disponibilité", short: "Dispo.", max: 12 },
  { label: "Langues", short: "Langues", max: 8 },
  { label: "Budget", short: "Budget", max: 8 },
  { label: "Certifications", short: "Certifs", max: 5 },
  { label: "Localisation", short: "Localisation", max: 5 },
];

export const matchingCandidates = [
  { id: 1, name: "[Candidat 1]", code: "A-1042", title: "M&A senior", pts: [28, 18, 11, 10, 8, 7, 5, 4], selected: true },
  { id: 2, name: "[Candidat 2]", code: "B-2217", title: "DAF de transition", pts: [25, 16, 10, 8, 7, 6, 4, 3], selected: true },
  { id: 3, name: "[Candidat 6]", code: "G-3310", title: "Transaction services", pts: [26, 14, 9, 11, 6, 5, 3, 4], selected: false },
  { id: 4, name: "[Candidat 7]", code: "D-1156", title: "Due diligence", pts: [27, 15, 11, 12, 8, 5, 1, 2], selected: true },
  { id: 5, name: "[Candidat 8]", code: "H-0472", title: "Audit financier", pts: [24, 12, 8, 12, 7, 5, 4, 3], selected: false },
];

export const comparatorCandidates = [
  { name: "[Candidat 1]", code: "A-1042", score: 91 },
  { name: "[Candidat 7]", code: "D-1156", score: 81 },
  { name: "[Candidat 2]", code: "B-2217", score: 79 },
];

export const comparatorRows: { label: string; values: string[]; best: number }[] = [
  { label: "Compétences clés", values: ["28 / 30", "27 / 30", "25 / 30"], best: 0 },
  { label: "Expérience", values: ["18 / 20", "15 / 20", "16 / 20"], best: 0 },
  { label: "Expérience sectorielle", values: ["11 / 12", "11 / 12", "10 / 12"], best: 0 },
  { label: "Disponibilité", values: ["10 / 12", "12 / 12", "8 / 12"], best: 1 },
  { label: "Langues", values: ["8 / 8", "8 / 8", "7 / 8"], best: 0 },
  { label: "Budget", values: ["7 / 8", "5 / 8", "6 / 8"], best: 0 },
  { label: "Certifications", values: ["5 / 5", "1 / 5", "4 / 5"], best: 0 },
  { label: "Localisation", values: ["4 / 5", "2 / 5", "3 / 5"], best: 0 },
  { label: "TJM indicatif", values: ["[TJM A]", "[TJM D]", "[TJM B]"], best: -1 },
  { label: "Références vérifiées", values: ["2 sur 3", "3 sur 3", "2 sur 2"], best: 1 },
  { label: "Missions ACW réalisées", values: ["1", "0", "2"], best: 2 },
];

export const introductionsToApprove = [
  {
    id: 1,
    company: "[Entreprise fictive SA]",
    expert: "[Candidat 1], A-1042",
    need: "Due diligence [B-031]",
    checks: [
      { label: "Aucun conflit d'intérêts déclaré", ok: true },
      { label: "NDA entreprise signé", ok: true },
      { label: "Expert disponible sur la période", ok: true },
    ],
  },
  {
    id: 2,
    company: "[Entreprise fictive SA]",
    expert: "[Candidat 7], D-1156",
    need: "Due diligence [B-031]",
    checks: [
      { label: "Aucun conflit d'intérêts déclaré", ok: true },
      { label: "NDA entreprise signé", ok: true },
      { label: "Disponibilité à confirmer", ok: false },
    ],
  },
  {
    id: 3,
    company: "[Entreprise B]",
    expert: "[Candidat 3], C-0381",
    need: "Stratégie commerciale [B-033]",
    checks: [
      { label: "Ancien employeur de l'expert : à vérifier", ok: false },
      { label: "NDA entreprise signé", ok: true },
    ],
  },
];

export const proposalDiff = [
  { k: "Périmètre", a: "Intérim DAF : clôture, trésorerie, banques", b: "Intérim DAF : clôture, trésorerie, banques" },
  { k: "Livrables", a: "Plan de trésorerie, clôture, passation", b: "Plan de trésorerie 13 semaines, clôture, recrutement du DAF permanent, passation" },
  { k: "Calendrier", a: "3 mois, 3 jours par semaine", b: "4 mois, 3 jours par semaine" },
  { k: "Honoraires", a: "[MONTANT] FCFA HT, fin de mission", b: "[MONTANT] FCFA HT, mensuels" },
  { k: "Commission AfriCand", a: "[TAUX] %", b: "[TAUX] %" },
];

// ADR-004 : double contrat (AfriCand ↔ entreprise, AfriCand ↔ expert), pas de contrat direct.
export const contracts = [
  { id: 1, ref: "[C-021-A1]", obj: "Avenant DAF de transition", party: "Entreprise", signed: [false, false], },
  { id: 2, ref: "[C-024-E]", obj: "Due diligence financière [B-031]", party: "Entreprise", signed: [true, false] },
  { id: 3, ref: "[C-024-X]", obj: "Due diligence financière [B-031]", party: "Expert", signed: [true, false] },
  { id: 4, ref: "[C-021-E]", obj: "DAF de transition", party: "Entreprise", signed: [true, true] },
  { id: 5, ref: "[C-021-X]", obj: "DAF de transition", party: "Expert", signed: [true, true] },
];

export type MissionHealth = "À l'heure" | "À risque" | "En retard";

export const adminMissions: { ref: string; title: string; co: string; ex: string; pct: number; next: string; health: MissionHealth }[] = [
  { ref: "[M-021]", title: "DAF de transition", co: "[Entreprise fictive SA]", ex: "[Candidat 2]", pct: 38, next: "Livrable le [DATE]", health: "À l'heure" },
  { ref: "[M-014]", title: "Stratégie de croissance", co: "[Entreprise D]", ex: "[Expert O.]", pct: 30, next: "Livrable 2, dépassé de 3 jours", health: "En retard" },
  { ref: "[M-018]", title: "Business plan expansion", co: "[Entreprise E]", ex: "[Expert K.]", pct: 65, next: "Comité le [DATE]", health: "À risque" },
  { ref: "[M-019]", title: "Audit des processus", co: "[Entreprise C]", ex: "[Expert M.]", pct: 82, next: "Restitution le [DATE]", health: "À l'heure" },
];

export const billingSummary = [
  { label: "Facturé ce trimestre", value: "[MONTANT]" },
  { label: "Encaissé", value: "[MONTANT]" },
  { label: "En retard", value: "[MONTANT]" },
  { label: "Commissions AfriCand", value: "[MONTANT]" },
];

export type InvoiceStatus = "due" | "late" | "paid";

export const invoices: Record<"Factures clients" | "Reversements experts", { id: string; ref: string; who: string; m: string; due: string; status: InvoiceStatus }[]> = {
  "Factures clients": [
    { id: "c1", ref: "[FA-2026-044]", who: "[Entreprise fictive SA]", m: "[M-021]", due: "[DATE]", status: "due" },
    { id: "c2", ref: "[FA-2026-039]", who: "[Entreprise D]", m: "[M-014]", due: "[DATE]", status: "late" },
    { id: "c3", ref: "[FA-2026-037]", who: "[Entreprise fictive SA]", m: "[M-021]", due: "[DATE]", status: "paid" },
  ],
  "Reversements experts": [
    { id: "e1", ref: "[RV-2026-031]", who: "[Candidat 2]", m: "[M-021]", due: "[DATE]", status: "due" },
    { id: "e2", ref: "[RV-2026-028]", who: "[Expert M.]", m: "[M-019]", due: "[DATE]", status: "paid" },
  ],
};

export const funnel = [
  { label: "Besoins soumis", v: 12 },
  { label: "Besoins qualifiés", v: 10 },
  { label: "Shortlists publiées", v: 8 },
  { label: "Introductions acceptées", v: 6 },
  { label: "Missions signées", v: 4 },
];

export const averageDelays = [
  { k: "Soumission à qualification", v: "3 jours" },
  { k: "Qualification à shortlist", v: "5 jours" },
  { k: "Shortlist à introduction", v: "4 jours" },
  { k: "Introduction à signature", v: "9 jours" },
];

export const missionsByDomain = [
  { k: "Finance", v: 5 },
  { k: "M&A", v: 4 },
  { k: "Stratégie", v: 3 },
  { k: "Opérations", v: 2 },
];

export const auditEntries = [
  { t: "[DATE] 10:42:18", who: "JN (admin)", cat: "Validation", act: "Consultant validé", obj: "[Candidat 1], A-1042" },
  { t: "[DATE] 10:31:05", who: "JN (admin)", cat: "Introduction", act: "Introduction approuvée", obj: "[Entreprise fictive SA] et A-1042" },
  { t: "[DATE] 09:58:40", who: "[Candidat 2]", cat: "Introduction", act: "Consentement donné, identité partagée", obj: "Introduction [I-019]" },
  { t: "[DATE] 09:12:11", who: "VM (admin)", cat: "Contrat", act: "Contrat contresigné", obj: "[C-021]" },
  { t: "[DATE] 08:47:02", who: "JN (admin)", cat: "Accès", act: "Connexion réussie, MFA vérifié", obj: "Session [S-8812]" },
  { t: "[DATE] 18:20:55", who: "Système", cat: "Accès", act: "Tentative de connexion refusée (code OTP invalide)", obj: "Compte [utilisateur]" },
  { t: "[DATE] 16:03:37", who: "VM (admin)", cat: "Validation", act: "Pièce demandée à l'entreprise", obj: "[Entreprise B]" },
  { t: "[DATE] 15:41:09", who: "JN (admin)", cat: "Contrat", act: "Proposition v2 envoyée", obj: "[P-012]" },
];

export const adminUsers = [
  { id: 1, ini: "JN", name: "[Membre AfriCand 1]", email: "[e-mail]", role: "Super administrateur", mfa: true, last: "Aujourd'hui" },
  { id: 2, ini: "VM", name: "[Membre AfriCand 2]", email: "[e-mail]", role: "Chargé de matching", mfa: true, last: "Aujourd'hui" },
  { id: 3, ini: "HO", name: "[Membre AfriCand 3]", email: "[e-mail]", role: "Administrateur technique", mfa: true, last: "Hier" },
  { id: 4, ini: "NM", name: "[Nouveau membre]", email: "[e-mail]", role: "Lecture seule", mfa: false, last: "Jamais" },
];

export const roleNames = ["Super admin", "Matching", "Technique", "Lecture seule"];

export const permissionMatrix: { label: string; allowed: boolean[] }[] = [
  { label: "Valider consultants et entreprises", allowed: [true, true, false, false] },
  { label: "Qualifier les besoins", allowed: [true, true, false, false] },
  { label: "Approuver les introductions", allowed: [true, true, false, false] },
  { label: "Signer contrats et propositions", allowed: [true, false, false, false] },
  { label: "Voir la facturation", allowed: [true, false, false, true] },
  { label: "Gérer utilisateurs et paramètres", allowed: [true, false, true, false] },
  { label: "Consulter le journal d'audit", allowed: [true, true, true, true] },
];

export const securityToggles = [
  { key: "mfa", label: "MFA obligatoire pour l'équipe AfriCand", sub: "Application d'authentification exigée à chaque session", on: true },
  { key: "anon", label: "Anonymisation stricte des profils", sub: "Noms, photos et employeurs masqués jusqu'à l'introduction", on: true },
  { key: "consent", label: "Consentement explicite de l'expert", sub: "Aucune identité partagée sans accord horodaté", on: true },
  { key: "ip", label: "Restriction d'accès admin par adresse IP", sub: "Limiter l'administration aux réseaux autorisés", on: false },
];
