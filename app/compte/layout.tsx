import { Toaster } from "@/components/ui/sonner";
import { requireSpace } from "@/lib/auth/guard";

export default async function CompteLayout({ children }: LayoutProps<"/compte">) {
  await requireSpace("experts");
  return (
    <>
      {children}
      <Toaster position="bottom-right" />
    </>
  );
}
