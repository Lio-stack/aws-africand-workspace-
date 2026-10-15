// DONNÉES DE DÉMONSTRATION — espace Experts (prototype ACW, écrans 12 à 22). Fictives.

export const expertProfile = {
  initials: "AO",
  name: "[Prénom Nom]",
  title: "Consultant senior M&A, 12 ans d'expérience",
  location: "Abidjan, Côte d'Ivoire · Français, anglais",
  completion: 65,
  publicCode: "Expert A-1042",
  publicTitle: "Conseil M&A senior, 12 ans",
  publicCountry: "Côte d'Ivoire",
  publicTags: ["M&A", "Private equity", "Agro-industrie"],
};

export const expertKpis = [
  { label: "Opportunités ouvertes", value: "3", cta: "Voir les opportunités", href: "/experts/opportunites" },
  { label: "Introductions en attente", value: "1", cta: "Répondre", href: "/experts/introductions" },
  { label: "Missions en cours", value: "1", cta: "Voir les livrables", href: "/experts/missions" },
  { label: "Paiements à venir", value: "[MONTANT]", cta: "Voir les paiements", href: "/experts/paiements" },
];

export const dashboardOpportunities = [
  {
    title: "Étude de stratégie de croissance",
    desc: "Accompagner une entreprise dans la définition de sa stratégie sur un marché ouest-africain.",
    tags: ["Stratégie", "Analyse de marché", "Afrique de l'Ouest"],
    when: "Il y a 2 jours",
  },
  {
    title: "Due diligence financière",
    desc: "Conduire une due diligence financière pour une acquisition potentielle.",
    tags: ["Due diligence", "M&A", "Finance"],
    when: "Il y a 4 jours",
  },
  {
    title: "Amélioration opérationnelle",
    desc: "Identifier et mettre en œuvre des gains d'efficacité opérationnelle.",
    tags: ["Opérations", "Process"],
    when: "Il y a 1 semaine",
  },
];

export const nextActions = [
  { label: "Répondre à une demande d'introduction", sub: "Expire dans 3 jours", href: "/experts/introductions" },
  { label: "Déposer le livrable n° 2", sub: "Mission [M-014], échéance [DATE]", href: "/experts/missions" },
  { label: "Mettre à jour vos disponibilités", sub: "Dernière mise à jour il y a 30 jours", href: "/experts/disponibilites" },
];

export const applicationSteps = [
  {
    name: "Identité",
    intro: "Les informations de base de votre profil.",
    tip: "Ces informations restent confidentielles jusqu'à l'approbation d'une introduction.",
    fields: [
      { label: "Titre professionnel", placeholder: "Ex. Consultant senior M&A", full: true },
      { label: "Ville", placeholder: "Abidjan" },
      { label: "Pays", placeholder: "Côte d'Ivoire" },
      { label: "Langues", placeholder: "Français, anglais", full: true },
    ],
  },
  {
    name: "Expertise",
    intro: "Vos domaines, secteurs et niveaux d'intervention.",
    tip: "Le matching s'appuie surtout sur cette étape. Soyez précis.",
    fields: [
      { label: "Domaine principal", placeholder: "Ex. Finance d'entreprise" },
      { label: "Domaines secondaires", placeholder: "Ex. Due diligence, modélisation" },
      { label: "Secteurs", placeholder: "Ex. Agro-industrie, énergie", full: true },
      { label: "Années d'expérience", placeholder: "Ex. 12" },
      { label: "Taux journalier indicatif", placeholder: "[TJM]" },
    ],
  },
  {
    name: "Expériences",
    intro: "Vos missions et postes les plus représentatifs.",
    tip: "Trois expériences détaillées suffisent pour une première validation.",
    fields: [
      { label: "Intitulé du poste ou de la mission", placeholder: "", full: true },
      { label: "Organisation", placeholder: "" },
      { label: "Période", placeholder: "Ex. 2021 à 2024" },
      { label: "Résultats obtenus", placeholder: "Chiffrez si possible", full: true },
    ],
  },
  {
    name: "Références",
    intro: "Des personnes qui peuvent confirmer votre travail.",
    tip: "AfriCand contacte vos références uniquement avec votre accord.",
    fields: [
      { label: "Nom de la référence", placeholder: "" },
      { label: "Fonction", placeholder: "" },
      { label: "Organisation", placeholder: "" },
      { label: "E-mail", placeholder: "" },
    ],
  },
  {
    name: "Documents",
    intro: "CV, diplômes et attestations.",
    tip: "Formats acceptés : PDF, DOCX. Taille maximale : [TAILLE] Mo.",
    fields: [
      { label: "CV (PDF)", placeholder: "Glissez un fichier ou parcourez", full: true },
      { label: "Diplômes", placeholder: "Facultatif" },
      { label: "Attestations", placeholder: "Facultatif" },
    ],
  },
  {
    name: "Envoi",
    intro: "Relisez votre candidature avant de l'envoyer à l'équipe AfriCand.",
    tip: "Après l'envoi, un entretien de qualification vous sera proposé.",
    fields: [
      { label: "Comment avez-vous connu AfriCand ?", placeholder: "", full: true },
      { label: "Code de parrainage", placeholder: "Facultatif", full: true },
    ],
  },
];

export const dossierRows = [
  { label: "Compétences", sub: "8 compétences, 3 secteurs", done: true, href: "/experts/competences" },
  { label: "Expériences", sub: "4 expériences renseignées", done: true, href: "/experts/experiences" },
  { label: "Références", sub: "1 vérifiée sur 3 recommandées", done: false, href: "/experts/experiences" },
  { label: "Disponibilités", sub: "Partiellement disponible", done: true, href: "/experts/disponibilites" },
  { label: "Documents", sub: "CV déposé, diplômes manquants", done: false, href: "/experts/documents" },
];

export const hiddenUntilIntroduction = ["Nom et photo", "Coordonnées", "Noms des employeurs et clients", "Références"];

export type SkillLevel = "Intermédiaire" | "Avancé" | "Expert";

export const expertSkills: { name: string; years: string; level: SkillLevel }[] = [
  { name: "M&A buy-side et sell-side", years: "10 ans", level: "Expert" },
  { name: "Due diligence financière", years: "8 ans", level: "Expert" },
  { name: "Modélisation financière", years: "12 ans", level: "Expert" },
  { name: "Valorisation d'entreprise", years: "9 ans", level: "Avancé" },
  { name: "Levée de fonds", years: "6 ans", level: "Avancé" },
  { name: "Structuration de dette", years: "4 ans", level: "Intermédiaire" },
  { name: "Stratégie de croissance", years: "7 ans", level: "Avancé" },
  { name: "Gouvernance", years: "3 ans", level: "Intermédiaire" },
];

export const expertSectors = [
  { name: "Agro-industrie", selected: true },
  { name: "Services financiers", selected: true },
  { name: "Énergie", selected: true },
  { name: "Santé", selected: false },
  { name: "Télécoms", selected: false },
  { name: "Immobilier", selected: false },
];

export const expertLanguages = [
  { name: "Français", level: "Langue maternelle" },
  { name: "Anglais", level: "Courant, professionnel" },
];

export const expertExperiences = [
  {
    role: "Directeur M&A",
    org: "[Cabinet de conseil fictif]",
    period: "2021 à aujourd'hui",
    desc: "Pilotage de 9 opérations sell-side et buy-side en Afrique de l'Ouest, de la préparation au closing.",
    anon: "Cabinet de conseil, Afrique de l'Ouest",
  },
  {
    role: "Manager Transaction Services",
    org: "[Firme d'audit fictive]",
    period: "2017 à 2021",
    desc: "Due diligences financières pour fonds de private equity et industriels.",
    anon: "Firme d'audit internationale",
  },
  {
    role: "Analyste financement structuré",
    org: "[Banque fictive]",
    period: "2014 à 2017",
    desc: "Structuration de financements d'acquisition et de projets.",
    anon: "Banque régionale, UEMOA",
  },
];

export const expertReferences = [
  { ini: "R1", name: "[Nom de la référence]", role: "Associé, [organisation]", status: "Vérifiée", tone: "success", action: "Voir" },
  { ini: "R2", name: "[Nom de la référence]", role: "Directeur financier, [organisation]", status: "Contact en cours", tone: "info", action: "Relancer" },
  { ini: "R3", name: "Référence à ajouter", role: "Recommandé : 3 références", status: "Manquante", tone: "neutral", action: "Ajouter" },
] as const;

export const availabilityStatuses = [
  { label: "Disponible", sub: "Ouvert à de nouvelles missions", color: "bg-action" },
  { label: "Partiellement disponible", sub: "Quelques jours par mois", color: "bg-nav-indicator" },
  { label: "Indisponible", sub: "Masqué des recherches", color: "bg-[#9aa0a6]" },
] as const;

export const availabilityCalendar = {
  month: "Novembre 2026",
  offset: 6, // 1er novembre 2026 : dimanche
  days: 30,
  busy: [5, 6, 12, 13],
  available: [3, 4, 10, 11, 17, 18, 24, 25],
  modes: ["À distance", "Sur site, Abidjan", "Déplacements UEMOA"],
};

export const expertOpportunities = [
  { id: "o1", cat: "Stratégie", title: "Étude de stratégie de croissance", desc: "Accompagner une entreprise dans la définition de sa stratégie sur un marché ouest-africain.", meta: "Côte d'Ivoire · 6 semaines · À distance et sur site", tags: ["Stratégie", "Analyse de marché", "Afrique de l'Ouest"], when: "Il y a 2 jours" },
  { id: "o2", cat: "Finance", title: "Due diligence financière", desc: "Conduire une due diligence financière pour une acquisition potentielle.", meta: "Sénégal · 4 semaines · Sur site", tags: ["Due diligence", "M&A", "Finance"], when: "Il y a 4 jours" },
  { id: "o3", cat: "Opérations", title: "Amélioration opérationnelle", desc: "Identifier et mettre en œuvre des gains d'efficacité opérationnelle.", meta: "Burkina Faso · 3 mois · Temps partiel", tags: ["Opérations", "Process", "Performance"], when: "Il y a 1 semaine" },
  { id: "o4", cat: "Stratégie", title: "Élaboration d'un business plan", desc: "Construire le business plan d'un projet d'expansion en Afrique.", meta: "Côte d'Ivoire · 5 semaines · À distance", tags: ["Business plan", "Stratégie", "Afrique"], when: "Il y a 1 semaine" },
  { id: "o5", cat: "Stratégie", title: "Analyse d'entrée de marché", desc: "Analyser les opportunités d'entrée sur un marché africain précis.", meta: "Guinée · 4 semaines · À distance", tags: ["Analyse de marché", "Stratégie", "Expansion"], when: "Il y a 2 semaines" },
];

// L'entreprise reste anonyme pour le consultant jusqu'au double accord (docs/architecture-fonctionnelle.md §10).
export const expertIntroductions = [
  { id: "i1", title: "Due diligence financière", sub: "Entreprise anonyme, secteur agro-industriel, Sénégal", status: "À traiter", pending: true },
  { id: "i2", title: "Étude de stratégie de croissance", sub: "Appel prévu le [DATE]", status: "Acceptée", pending: false },
  { id: "i3", title: "Analyse d'entrée de marché", sub: "Besoin pourvu par un autre expert", status: "Clôturée", pending: false },
];

export const sharedOnConsent = [
  { label: "Nom et photo", checked: true },
  { label: "Adresse e-mail professionnelle", checked: true },
  { label: "CV complet", checked: true },
  { label: "Numéro de téléphone", checked: false },
];

export const currentMission = {
  ref: "[M-014]",
  title: "Étude de stratégie de croissance",
  facts: [
    { label: "Client", value: "[Entreprise fictive]" },
    { label: "Période", value: "[DÉBUT] au [FIN]" },
    { label: "Volume", value: "24 jours" },
    { label: "Référent AfriCand", value: "[Nom du référent]" },
  ],
  progress: 30,
  deliverables: [
    { id: 1, name: "Note de cadrage", due: "[DATE 1]", status: "ok" },
    { id: 2, name: "Diagnostic de marché", due: "[DATE 2]", status: "todo" },
    { id: 3, name: "Options stratégiques", due: "[DATE 3]", status: "later" },
    { id: 4, name: "Rapport final et restitution", due: "[DATE 4]", status: "later" },
  ] as { id: number; name: string; due: string; status: "ok" | "todo" | "review" | "later" }[],
};

export const expertDocuments = [
  { ext: "PDF", name: "CV, version octobre 2026", cat: "Dossier", date: "[DATE]", status: "Validé", tone: "success", action: "Télécharger" },
  { ext: "PDF", name: "Accord de confidentialité AfriCand", cat: "Contrats", date: "[DATE]", status: "Signé", tone: "success", action: "Télécharger" },
  { ext: "PDF", name: "Contrat de mission [M-014]", cat: "Contrats", date: "[DATE]", status: "À signer", tone: "info", action: "Signer" },
  { ext: "DOCX", name: "Note de cadrage [M-014]", cat: "Missions", date: "[DATE]", status: "Validé", tone: "success", action: "Ouvrir" },
  { ext: "PDF", name: "Facture [F-2026-031]", cat: "Factures", date: "[DATE]", status: "Payée", tone: "success", action: "Télécharger" },
  { ext: "PDF", name: "Diplôme principal", cat: "Dossier", date: "—", status: "Manquant", tone: "neutral", action: "Déposer" },
] as const;

export const paymentSummary = [
  { label: "Reçu en 2026", value: "[MONTANT]", sub: "3 paiements" },
  { label: "En attente", value: "[MONTANT]", sub: "1 facture en validation" },
  { label: "Prochain versement prévu", value: "[DATE]", sub: "Après validation du livrable n° 2" },
];

export const paymentHistory = [
  { ref: "[F-2026-034]", mission: "Étude de stratégie de croissance", date: "[DATE]", amount: "[MONTANT]", status: "En validation", tone: "info" },
  { ref: "[F-2026-031]", mission: "Étude de stratégie de croissance", date: "[DATE]", amount: "[MONTANT]", status: "Payé", tone: "success" },
  { ref: "[F-2026-022]", mission: "Due diligence financière", date: "[DATE]", amount: "[MONTANT]", status: "Payé", tone: "success" },
  { ref: "[F-2026-015]", mission: "Analyse d'entrée de marché", date: "[DATE]", amount: "[MONTANT]", status: "Payé", tone: "success" },
] as const;
