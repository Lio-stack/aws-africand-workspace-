"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

type ButtonProps = React.ComponentProps<typeof Button>;

// Action métier non encore branchée : l'interface réagit, mais rien n'est enregistré, et le dit.
export function DemoAction({
  children,
  message,
  onClick,
  ...props
}: ButtonProps & { message?: string }) {
  return (
    <Button
      {...props}
      onClick={(event) => {
        onClick?.(event);
        toast(message ?? "Action de démonstration", {
          description: "Rien n'est enregistré tant que les services ne sont pas branchés.",
        });
      }}
    >
      {children}
    </Button>
  );
}
