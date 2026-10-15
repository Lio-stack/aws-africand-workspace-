import { AppShell } from "@/components/app/app-shell";
import { requireDemo } from "@/lib/demo/guard";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  requireDemo();
  return <AppShell space="admin">{children}</AppShell>;
}
