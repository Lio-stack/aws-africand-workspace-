import { Toaster } from "@/components/ui/sonner";
import { requireDemo } from "@/lib/demo/guard";

export default function CompteLayout({ children }: LayoutProps<"/compte">) {
  requireDemo();
  return (
    <>
      {children}
      <Toaster position="bottom-right" />
    </>
  );
}
