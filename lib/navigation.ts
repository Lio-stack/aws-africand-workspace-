// Navigation des trois espaces (prototype ACW, écrans 01 à 03).
// Les compteurs sont des données de démonstration tant que les services ne sont pas branchés.

import {
  BarChart3,
  Bookmark,
  Briefcase,
  Building2,
  CalendarCheck,
  FileCheck2,
  FileSignature,
  FileText,
  Files,
  FolderOpen,
  Inbox,
  LayoutDashboard,
  PhoneCall,
  Receipt,
  Rocket,
  ScrollText,
  Search,
  Settings,
  Shuffle,
  Sparkles,
  Scale,
  UserCheck,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type Space = "experts" | "business" | "admin";

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  icon: LucideIcon;
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
        { label: "Tableau de bord", href: "/experts", icon: LayoutDashboard },
        { label: "Candidature", href: "/experts/candidature", icon: FileText },
        { label: "Mon dossier", href: "/experts/dossier", icon: FolderOpen },
        { label: "Compétences", href: "/experts/competences", icon: Sparkles },
        { label: "Expériences et références", href: "/experts/experiences", icon: Briefcase },
        { label: "Disponibilités", href: "/experts/disponibilites", icon: CalendarCheck },
        { label: "Opportunités", href: "/experts/opportunites", badge: "3", icon: Inbox },
        { label: "Introductions", href: "/experts/introductions", badge: "1", icon: PhoneCall },
        { label: "Missions et livrables", href: "/experts/missions", icon: Rocket },
        { label: "Documents", href: "/experts/documents", icon: Files },
        { label: "Paiements", href: "/experts/paiements", icon: Wallet },
      ],
    },
  ],
  business: [
    {
      items: [
        { label: "Tableau de bord", href: "/business", icon: LayoutDashboard },
        { label: "Fiche entreprise", href: "/business/entreprise", icon: Building2 },
        { label: "Membres et invitations", href: "/business/membres", badge: "4", icon: Users },
        { label: "Besoins", href: "/business/besoins", badge: "3", icon: FileCheck2 },
        { label: "Explorer les profils", href: "/business/profils", icon: Search },
        { label: "Shortlists", href: "/business/shortlists", badge: "2", icon: Bookmark },
        { label: "Introductions", href: "/business/introductions", badge: "1", icon: PhoneCall },
        { label: "Propositions", href: "/business/propositions", icon: FileText },
        { label: "Missions", href: "/business/missions", badge: "1", icon: Rocket },
        { label: "Documents et factures", href: "/business/documents", icon: Receipt },
      ],
    },
  ],
  admin: [
    {
      title: "Pilotage",
      items: [
        { label: "Tableau de bord du pipeline", href: "/admin", icon: LayoutDashboard },
        { label: "Reporting", href: "/admin/reporting", icon: BarChart3 },
      ],
    },
    {
      title: "Validation",
      items: [
        { label: "Consultants", href: "/admin/consultants", badge: "12", icon: UserCheck },
        { label: "Entreprises", href: "/admin/entreprises", badge: "4", icon: Building2 },
        { label: "Qualification des besoins", href: "/admin/besoins", badge: "3", icon: FileCheck2 },
      ],
    },
    {
      title: "Matching",
      items: [
        { label: "Matching", href: "/admin/matching", icon: Shuffle },
        { label: "Comparateur de profils", href: "/admin/comparateur", icon: Scale },
        { label: "Introductions", href: "/admin/introductions", badge: "2", icon: PhoneCall },
      ],
    },
    {
      title: "Contractualisation",
      items: [
        { label: "Propositions", href: "/admin/propositions", icon: FileText },
        { label: "Contrats", href: "/admin/contrats", icon: FileSignature },
        { label: "Missions", href: "/admin/missions", icon: Rocket },
        { label: "Facturation", href: "/admin/facturation", icon: Receipt },
      ],
    },
    {
      title: "Système",
      items: [
        { label: "Journal d'audit", href: "/admin/audit", icon: ScrollText },
        { label: "Utilisateurs et rôles", href: "/admin/utilisateurs", icon: Users },
        { label: "Paramètres", href: "/admin/parametres", icon: Settings },
      ],
    },
  ],
};

/** Élément actif : correspondance exacte pour la racine de l'espace, par préfixe sinon. */
export function isActive(pathname: string, href: string, spaceRoot: string): boolean {
  if (href === spaceRoot) return pathname === spaceRoot;
  return pathname === href || pathname.startsWith(`${href}/`);
}
