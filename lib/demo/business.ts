// DONNÉES DE DÉMONSTRATION — espace Business (prototype ACW, écrans 23 à 35). Fictives.
// Profils consultants : uniquement les données anonymisées autorisées (pays, jamais la ville).

export const demoCompany = { name: "[Entreprise fictive SA]" };

export const businessKpis = [
  { label: "Besoins actifs", value: "3", cta: "Voir les besoins", href: "/business/besoins" },
  { label: "Profils en shortlist", value: "7", cta: "Comparer", href: "/business/shortlists" },
  { label: "Introductions en cours", value: "1", cta: "Suivre", href: "/business/introductions" },
  { label: "Missions en cours", value: "1", cta: "Voir la mission", href: "/business/missions" },
];

export const needStages = ["Qualification", "Matching", "Shortlist", "Introduction", "Mission"];

export const activeNeeds = [
  { title: "Due diligence financière, acquisition cible agro", ref: "[B-031]", stage: 3 },
  { title: "Directeur financier de transition", ref: "[B-028]", stage: 4 },
  { title: "Étude d'entrée de marché, Sénégal", ref: "[B-035]", stage: 1 },
];

export const businessFeed = [
  { text: "AfriCand a qualifié votre besoin [B-035]", when: "Il y a 2 heures" },
  { text: "3 nouveaux profils proposés pour [B-031]", when: "Hier" },
  { text: "Expert B-2217 a accepté l'introduction", when: "Il y a 2 jours" },
  { text: "Proposition [P-012] reçue, version 2", when: "Il y a 3 jours" },
];

export const companyFields = [
  { label: "Raison sociale", value: "[Entreprise fictive SA]" },
  { label: "Forme juridique", value: "SA" },
  { label: "RCCM", value: "[CI-ABJ-XXXX-B-XXXXX]" },
  { label: "Compte contribuable", value: "[NCC]" },
  { label: "Secteur", value: "Agro-industrie" },
  { label: "Effectif", value: "[50 à 200]" },
  { label: "Site web", value: "[www.exemple.ci]" },
  { label: "Adresse", value: "[Adresse], Abidjan" },
];

export const companyDocuments = [
  { label: "Extrait RCCM", status: "Validé", tone: "success" },
  { label: "Pièce d'identité du dirigeant", status: "Validé", tone: "success" },
  { label: "Attestation fiscale", status: "À fournir", tone: "info" },
] as const;

export const companyMembers = [
  { ini: "KA", name: "[Prénom Nom]", email: "dg@entreprise.ci", role: "Administrateur", status: "Actif", action: "Modifier" },
  { ini: "DF", name: "[Prénom Nom]", email: "daf@entreprise.ci", role: "Finance", status: "Actif", action: "Modifier" },
  { ini: "RH", name: "[Prénom Nom]", email: "rh@entreprise.ci", role: "Contributeur", status: "Actif", action: "Modifier" },
  { ini: "?", name: "Invitation envoyée", email: "juridique@entreprise.ci", role: "Lecture seule", status: "En attente", action: "Relancer" },
];

export const memberRoles = ["Contributeur", "Administrateur", "Lecture seule", "Finance"];

export type NeedStatus = "Brouillon" | "En qualification" | "Matching" | "Pourvu";

export const needs: { ref: string; title: string; dom: string; date: string; profiles: string; status: NeedStatus }[] = [
  { ref: "[B-035]", title: "Étude d'entrée de marché, Sénégal", dom: "Stratégie", date: "[DATE]", profiles: "En attente", status: "En qualification" },
  { ref: "[B-031]", title: "Due diligence financière, acquisition cible agro", dom: "M&A", date: "[DATE]", profiles: "6 proposés, 3 en shortlist", status: "Matching" },
  { ref: "[B-028]", title: "Directeur financier de transition", dom: "Finance", date: "[DATE]", profiles: "4 proposés, 1 introduit", status: "Matching" },
  { ref: "[B-019]", title: "Optimisation de la chaîne logistique", dom: "Opérations", date: "[DATE]", profiles: "1 en mission", status: "Pourvu" },
  { ref: "[B-036]", title: "Structuration d'une levée de dette", dom: "Finance", date: "[DATE]", profiles: "Non soumis", status: "Brouillon" },
];

export const needSteps = [
  {
    name: "Contexte",
    intro: "Décrivez la situation et l'objectif de la mission.",
    tip: "Ces informations restent confidentielles. Les experts voient une version anonymisée validée par AfriCand.",
    fields: [
      { label: "Intitulé du besoin", placeholder: "Ex. Due diligence financière d'une cible", full: true },
      { label: "Objectif principal", placeholder: "Ex. Sécuriser une acquisition", full: true },
      { label: "Domaine", placeholder: "Ex. M&A" },
      { label: "Secteur concerné", placeholder: "Ex. Agro-industrie" },
    ],
  },
  {
    name: "Profil recherché",
    intro: "Les compétences et l'expérience attendues.",
    tip: "Trois à cinq compétences clés suffisent pour un matching précis.",
    fields: [
      { label: "Compétences clés", placeholder: "Ex. Due diligence, modélisation", full: true },
      { label: "Séniorité minimale", placeholder: "Ex. 10 ans" },
      { label: "Langues", placeholder: "Français, anglais" },
      { label: "Expérience sectorielle souhaitée", placeholder: "Facultatif", full: true },
    ],
  },
  {
    name: "Modalités",
    intro: "Où, quand et comment la mission se déroule.",
    tip: "Une date de démarrage réaliste améliore le taux de réponse des experts.",
    fields: [
      { label: "Pays d'intervention", placeholder: "Côte d'Ivoire" },
      { label: "Mode", placeholder: "À distance, sur site, mixte" },
      { label: "Date de démarrage souhaitée", placeholder: "[DATE]" },
      { label: "Durée ou volume", placeholder: "Ex. 20 jours sur 6 semaines" },
    ],
  },
  {
    name: "Budget",
    intro: "Une fourchette indicative pour orienter la sélection.",
    tip: "Le budget n'est jamais affiché aux experts sans votre accord.",
    fields: [
      { label: "Budget indicatif (FCFA)", placeholder: "[FOURCHETTE]" },
      { label: "Mode de facturation", placeholder: "Forfait ou jours" },
      { label: "Conditions particulières", placeholder: "Facultatif", full: true },
    ],
  },
  {
    name: "Validation",
    intro: "Relisez avant d'envoyer à l'équipe AfriCand pour qualification.",
    tip: "Après l'envoi, un consultant AfriCand vous contacte pour affiner le besoin.",
    fields: [
      { label: "Interlocuteur pour ce besoin", placeholder: "[Prénom Nom]" },
      { label: "Membres à notifier", placeholder: "Facultatif" },
    ],
  },
];

export const needDetail = {
  ref: "[B-031]",
  title: "Due diligence financière, acquisition cible agro",
  stages: [
    { label: "Soumis", date: "[DATE]" },
    { label: "Qualifié", date: "[DATE]" },
    { label: "Matching", date: "En cours" },
    { label: "Introduction", date: "" },
    { label: "Mission", date: "" },
  ],
  current: 2,
  blocks: [
    {
      title: "Contexte",
      rows: [
        { k: "Objectif", v: "Sécuriser l'acquisition d'une PME de transformation agricole" },
        { k: "Domaine", v: "M&A, due diligence financière" },
        { k: "Secteur", v: "Agro-industrie" },
      ],
    },
    {
      title: "Profil recherché",
      rows: [
        { k: "Compétences", v: "Due diligence, modélisation, valorisation" },
        { k: "Séniorité", v: "10 ans minimum" },
        { k: "Langues", v: "Français, anglais" },
      ],
    },
    {
      title: "Modalités",
      rows: [
        { k: "Lieu", v: "Abidjan, mixte" },
        { k: "Démarrage", v: "[DATE]" },
        { k: "Volume", v: "20 jours sur 6 semaines" },
        { k: "Budget indicatif", v: "[FOURCHETTE] FCFA" },
      ],
    },
  ],
  note: "Besoin confirmé avec le DG le [DATE]. Priorité à une expérience transactionnelle dans l'agro-industrie UEMOA.",
  proposed: [
    { code: "Expert A-1042", title: "Conseil M&A senior, 12 ans", score: 91 },
    { code: "Expert D-1156", title: "Analyste due diligence, 7 ans", score: 81 },
    { code: "Expert B-2217", title: "DAF de transition, 15 ans", score: 79 },
  ],
};

export const anonymizedProfiles = [
  { code: "Expert A-1042", slug: "a-1042", title: "Conseil M&A senior, 12 ans d'expérience", country: "Côte d'Ivoire", tags: ["M&A", "Private equity", "Agro-industrie"], score: 91, cat: "M&A" },
  { code: "Expert B-2217", slug: "b-2217", title: "Directeur financier de transition, 15 ans", country: "Sénégal", tags: ["Finance", "Restructuration", "UEMOA"], score: 89, cat: "Finance" },
  { code: "Expert C-0381", slug: "c-0381", title: "Consultant stratégie et entrée de marché, 9 ans", country: "Maroc", tags: ["Stratégie", "Market entry", "Distribution"], score: 86, cat: "Stratégie" },
  { code: "Expert D-1156", slug: "d-1156", title: "Analyste due diligence financière, 7 ans", country: "Côte d'Ivoire", tags: ["Due diligence", "M&A", "Modélisation"], score: 82, cat: "M&A" },
  { code: "Expert E-0904", slug: "e-0904", title: "Expert excellence opérationnelle, 11 ans", country: "Burkina Faso", tags: ["Opérations", "Process", "Industrie"], score: 78, cat: "Opérations" },
  { code: "Expert F-1720", slug: "f-1720", title: "Spécialiste financement structuré, 10 ans", country: "Togo", tags: ["Finance", "Dette", "DFI"], score: 75, cat: "Finance" },
];

export const profileDetail = {
  code: "Expert A-1042",
  title: "Conseil M&A senior, 12 ans d'expérience",
  meta: "Côte d'Ivoire · Français, anglais · Partiellement disponible",
  score: 91,
  need: "[B-031]",
  criteria: [
    { label: "Compétences clés", pts: 28, max: 30 },
    { label: "Expérience", pts: 18, max: 20 },
    { label: "Expérience sectorielle", pts: 11, max: 12 },
    { label: "Disponibilité", pts: 10, max: 12 },
    { label: "Langues", pts: 8, max: 8 },
    { label: "Budget", pts: 7, max: 8 },
    { label: "Certifications", pts: 5, max: 5 },
    { label: "Localisation", pts: 4, max: 5 },
  ],
  pros: [
    "9 opérations M&A conduites en Afrique de l'Ouest, dont 4 dans l'agro-industrie",
    "Due diligence financière pratiquée pour des fonds de private equity",
    "Références vérifiées par AfriCand",
  ],
  cons: ["Disponibilité partielle : 8 jours par mois, à confirmer pour 20 jours sur 6 semaines"],
  experiences: [
    { role: "Directeur M&A", org: "Cabinet de conseil, Afrique de l'Ouest", period: "2021 à aujourd'hui" },
    { role: "Manager Transaction Services", org: "Firme d'audit internationale", period: "2017 à 2021" },
    { role: "Analyste financement structuré", org: "Banque régionale, UEMOA", period: "2014 à 2017" },
  ],
};

type ShortlistCard = { code: string; title: string; score: number; rows: { k: string; v: string }[] };
const rows = (seniority: string, sector: string, availability: string, country: string) => [
  { k: "Séniorité", v: seniority },
  { k: "Secteur", v: sector },
  { k: "Disponibilité", v: availability },
  { k: "Pays", v: country },
];

export const shortlists: { id: string; label: string; cards: ShortlistCard[] }[] = [
  {
    id: "B-031",
    label: "Due diligence financière [B-031]",
    cards: [
      { code: "Expert A-1042", title: "Conseil M&A senior", score: 91, rows: rows("12 ans", "Agro-industrie", "8 j / mois", "Côte d'Ivoire") },
      { code: "Expert D-1156", title: "Analyste due diligence", score: 81, rows: rows("7 ans", "Services financiers", "Disponible", "Côte d'Ivoire") },
      { code: "Expert B-2217", title: "DAF de transition", score: 79, rows: rows("15 ans", "Industrie", "4 j / mois", "Sénégal") },
    ],
  },
  {
    id: "B-028",
    label: "DAF de transition [B-028]",
    cards: [
      { code: "Expert B-2217", title: "DAF de transition", score: 79, rows: rows("15 ans", "Industrie", "4 j / mois", "Sénégal") },
      { code: "Expert F-1720", title: "Financement structuré", score: 77, rows: rows("10 ans", "Énergie", "Disponible", "Togo") },
    ],
  },
];

export const introductionSteps = ["Demandée", "Approuvée par AfriCand", "Acceptée par l'expert", "Appel planifié"];

// Identité révélée uniquement après double accord + validation AfriCand (B-2217 ici).
export const businessIntroductions = [
  { id: "b2", ini: "B2", revealed: true, who: "[Prénom Nom], ex-Expert B-2217", need: "DAF de transition [B-028]", stage: 3 },
  { id: "a1", ini: "A1", revealed: false, who: "Expert A-1042", need: "Due diligence financière [B-031]", stage: 2 },
  { id: "d1", ini: "D1", revealed: false, who: "Expert D-1156", need: "Due diligence financière [B-031]", stage: 1 },
];

export const proposal = {
  ref: "[P-012]",
  title: "Proposition : DAF de transition",
  context: "Préparée par AfriCand avec [Prénom Nom], ex-Expert B-2217 · Besoin [B-028]",
  versions: [
    { n: 2, label: "Version 2", sub: "Reçue le [DATE], en cours" },
    { n: 1, label: "Version 1", sub: "Reçue le [DATE], remplacée" },
  ],
  sections: (v2: boolean) => [
    { title: "Périmètre", text: "Intérim de la direction financière : clôture annuelle, trésorerie, relation bancaire et structuration de l'équipe finance.", changed: false },
    {
      title: "Livrables",
      text: v2
        ? "Plan de trésorerie à 13 semaines, clôture annuelle, note de recrutement du DAF permanent, rapport de passation."
        : "Plan de trésorerie, clôture annuelle, rapport de passation.",
      changed: v2,
    },
    { title: "Calendrier", text: v2 ? "4 mois à partir du [DATE], 3 jours par semaine." : "3 mois à partir du [DATE], 3 jours par semaine.", changed: v2 },
    { title: "Honoraires", text: v2 ? "[MONTANT] FCFA HT, facturés mensuellement." : "[MONTANT] FCFA HT, facturés à la fin de la mission.", changed: v2 },
  ],
};

export const businessMission = {
  title: "DAF de transition",
  meta: "[M-021] · [Prénom Nom] · [DÉBUT] au [FIN]",
  progressLabel: "En cours · semaine 6 sur 16",
  progress: 38,
  deliverables: [
    { id: 1, name: "Plan de trésorerie à 13 semaines", sub: "Déposé le [DATE]", status: "review" },
    { id: 2, name: "Rapport de clôture mensuelle", sub: "Déposé le [DATE]", status: "ok" },
    { id: 3, name: "Note de recrutement du DAF permanent", sub: "Échéance [DATE]", status: "later" },
  ] as { id: number; name: string; sub: string; status: "review" | "ok" | "fix" | "later" }[],
  finished: [{ title: "Optimisation de la chaîne logistique", meta: "[M-009] · terminée le [DATE]" }],
};

export const businessDocsSummary = [
  { label: "À payer", value: "[MONTANT]", sub: "1 facture, échéance [DATE]" },
  { label: "Payé en 2026", value: "[MONTANT]", sub: "4 factures" },
  { label: "Documents à signer", value: "1", sub: "Avenant au contrat [M-021]" },
];

type DocRow = { ref: string; obj: string; date: string; amount: string; status: string; tone: "success" | "info" | "neutral"; action: string };

export const businessDocuments: Record<"Factures" | "Contrats" | "Livrables", DocRow[]> = {
  Factures: [
    { ref: "[FA-2026-044]", obj: "Mission [M-021], mois 2", date: "[DATE]", amount: "[MONTANT]", status: "À payer", tone: "info", action: "Télécharger" },
    { ref: "[FA-2026-037]", obj: "Mission [M-021], mois 1", date: "[DATE]", amount: "[MONTANT]", status: "Payée", tone: "success", action: "Télécharger" },
    { ref: "[FA-2026-021]", obj: "Mission [M-009], solde", date: "[DATE]", amount: "[MONTANT]", status: "Payée", tone: "success", action: "Télécharger" },
  ],
  Contrats: [
    { ref: "[C-021]", obj: "Contrat de mission DAF de transition", date: "[DATE]", amount: "—", status: "Signé", tone: "success", action: "Télécharger" },
    { ref: "[C-021-A1]", obj: "Avenant : extension à 4 mois", date: "[DATE]", amount: "—", status: "À signer", tone: "info", action: "Signer" },
    { ref: "[NDA-004]", obj: "Accord de confidentialité AfriCand", date: "[DATE]", amount: "—", status: "Signé", tone: "success", action: "Télécharger" },
  ],
  Livrables: [
    { ref: "[L-021-1]", obj: "Plan de trésorerie à 13 semaines", date: "[DATE]", amount: "—", status: "À valider", tone: "info", action: "Ouvrir" },
    { ref: "[L-021-2]", obj: "Rapport de clôture mensuelle", date: "[DATE]", amount: "—", status: "Validé", tone: "success", action: "Ouvrir" },
    { ref: "[L-009-4]", obj: "Rapport final logistique", date: "[DATE]", amount: "—", status: "Archivé", tone: "neutral", action: "Ouvrir" },
  ],
};
