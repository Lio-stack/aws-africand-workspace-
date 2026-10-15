import { notFound, redirect } from "next/navigation";

import { canAccessSpace, type Space } from "@/modules/auth/roles";
import { demoEnabled } from "@/lib/demo/guard";
import { getAppSession } from "./session";

/**
 * Garde d'espace (layouts) : démo OU session + rôle.
 * Phase 3 : remplace requireDemo(). Jamais de query directe sans ce filtre.
 */
export async function requireSpace(space: Space): Promise<void> {
  if (demoEnabled()) return;
  const session = await getAppSession();
  if (!session) redirect("/connexion");
  if (!canAccessSpace(session.roles, space)) notFound();
}
