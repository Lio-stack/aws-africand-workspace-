import { Toaster } from "@/components/ui/sonner";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      {children}
      <Toaster position="bottom-right" />
    </>
  );
}
