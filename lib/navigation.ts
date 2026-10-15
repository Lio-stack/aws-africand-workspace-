// Navigation des trois espaces (prototype ACW, écrans 01 à 03).
// Les compteurs sont des données de démonstration tant que les services ne sont pas branchés.

export type Space = "experts" | "business" | "admin";

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

export const spaceLabels: Record<Space, string> = {
  experts: "Experts",
  business: "Business",
  admin: "Admin",
};

export const breadcrumbRoots: Record<Space, string> = {
  experts: "ACW Experts",
  business: "ACW Business",
  admin: "Administration",
};

export const navigation: Record<Space, NavGroup[]> = {
  experts: [
    {
      items: [
        { label: "Tableau de bord", href: "/experts" },
        { label: "Candidature", href: "/experts/candidature" },
        { label: "Mon dossier", href: "/experts/dossier" },
        { label: "Compétences", href: "/experts/competences" },
        { label: "Expériences et références", href: "/experts/experiences" },
        { label: "Disponibilités", href: "/experts/disponibilites" },
        { label: "Opportunités", href: "/experts/opportunites", badge: "3" },
        { label: "Introductions", href: "/experts/introductions", badge: "1" },
        { label: "Missions et livrables", href: "/experts/missions" },
        { label: "Documents", href: "/experts/documents" },
        { label: "Paiements", href: "/experts/paiements" },
      ],
    },
  ],
  business: [
    {
      items: [
        { label: "Tableau de bord", href: "/business" },
        { label: "Fiche entreprise", href: "/business/entreprise" },
        { label: "Membres et invitations", href: "/business/membres", badge: "4" },
        { label: "Besoins", href: "/business/besoins", badge: "3" },
        { label: "Explorer les profils", href: "/business/profils" },
        { label: "Shortlists", href: "/business/shortlists", badge: "2" },
        { label: "Introductions", href: "/business/introductions", badge: "1" },
        { label: "Propositions", href: "/business/propositions" },
        { label: "Missions", href: "/business/missions", badge: "1" },
        { label: "Documents et factures", href: "/business/documents" },
      ],
    },
  ],
  admin: [
    {
      title: "Pilotage",
      items: [
        { label: "Tableau de bord du pipeline", href: "/admin" },
        { label: "Reporting", href: "/admin/reporting" },
      ],
    },
    {
      title: "Validation",
      items: [
        { label: "Consultants", href: "/admin/consultants", badge: "12" },
        { label: "Entreprises", href: "/admin/entreprises", badge: "4" },
        { label: "Qualification des besoins", href: "/admin/besoins", badge: "3" },
      ],
    },
    {
      title: "Matching",
      items: [
        { label: "Matching", href: "/admin/matching" },
        { label: "Comparateur de profils", href: "/admin/comparateur" },
        { label: "Introductions", href: "/admin/introductions", badge: "2" },
      ],
    },
    {
      title: "Contractualisation",
      items: [
        { label: "Propositions", href: "/admin/propositions" },
        { label: "Contrats", href: "/admin/contrats" },
        { label: "Missions", href: "/admin/missions" },
        { label: "Facturation", href: "/admin/facturation" },
      ],
    },
    {
      title: "Système",
      items: [
        { label: "Journal d'audit", href: "/admin/audit" },
        { label: "Utilisateurs et rôles", href: "/admin/utilisateurs" },
        { label: "Paramètres", href: "/admin/parametres" },
      ],
    },
  ],
};

/** Élément actif : correspondance exacte pour la racine de l'espace, par préfixe sinon. */
export function isActive(pathname: string, href: string, spaceRoot: string): boolean {
  if (href === spaceRoot) return pathname === spaceRoot;
  return pathname === href || pathname.startsWith(`${href}/`);
}
