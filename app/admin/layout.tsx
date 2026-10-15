import { AppShell } from "@/components/app/app-shell";
import { requireSpace } from "@/lib/auth/guard";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  await requireSpace("admin");
  return <AppShell space="admin">{children}</AppShell>;
}
