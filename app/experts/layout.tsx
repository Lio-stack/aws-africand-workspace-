import { AppShell } from "@/components/app/app-shell";
import { requireSpace } from "@/lib/auth/guard";

export default async function ExpertsLayout({ children }: LayoutProps<"/experts">) {
  await requireSpace("experts");
  return <AppShell space="experts">{children}</AppShell>;
}
