// Tous les écrans du prototype ACW implémentés (numéros entre parenthèses).
export const accessRoutes = [
  "/connexion", // 04
  "/connexion/code", // 05
  "/connexion/mfa", // 06
  "/inscription/consultant", // 07
  "/inscription/entreprise", // 08
  "/compte/attente", // 09
  "/compte", // 10
  "/acces-refuse", // 11 (403)
];

export const expertsRoutes = [
  "/experts", // 12
  "/experts/candidature",
  "/experts/dossier",
  "/experts/competences",
  "/experts/experiences",
  "/experts/disponibilites",
  "/experts/opportunites",
  "/experts/introductions",
  "/experts/missions",
  "/experts/documents",
  "/experts/paiements", // 22
];

export const businessRoutes = [
  "/business", // 23
  "/business/entreprise",
  "/business/membres",
  "/business/besoins",
  "/business/besoins/nouveau",
  "/business/besoins/b-031",
  "/business/profils",
  "/business/profils/a-1042",
  "/business/shortlists",
  "/business/introductions",
  "/business/propositions",
  "/business/missions",
  "/business/documents", // 35
];

export const adminRoutes = [
  "/admin", // 36
  "/admin/consultants",
  "/admin/consultants/c-1",
  "/admin/entreprises",
  "/admin/besoins",
  "/admin/matching",
  "/admin/comparateur",
  "/admin/introductions",
  "/admin/propositions",
  "/admin/contrats",
  "/admin/missions",
  "/admin/facturation",
  "/admin/reporting",
  "/admin/audit",
  "/admin/utilisateurs",
  "/admin/parametres", // 51
];

export const allRoutes = [...accessRoutes, ...expertsRoutes, ...businessRoutes, ...adminRoutes];
