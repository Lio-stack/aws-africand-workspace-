import { AppShell } from "@/components/app/app-shell";
import { requireDemo } from "@/lib/demo/guard";

export default function ExpertsLayout({ children }: LayoutProps<"/experts">) {
  requireDemo();
  return <AppShell space="experts">{children}</AppShell>;
}
