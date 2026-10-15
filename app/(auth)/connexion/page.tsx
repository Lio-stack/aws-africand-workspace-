import type { Metadata } from "next";

import { LoginForm } from "@/modules/auth/components/login-form";

export const metadata: Metadata = { title: "Connexion" };

// Écran 04 du prototype ACW : connexion par e-mail et code à usage unique.
export default function ConnexionPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-background px-6 py-12">
      <LoginForm />
    </main>
  );
}
