import Link from "next/link";

import { AcwLogo, BackLink } from "./access-layout";

// Écrans 07 et 08 : panneau bleu nuit de présentation, formulaire à droite.
export function SignupLayout({
  eyebrow,
  title,
  description,
  aside,
  heading,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  aside: React.ReactNode;
  heading: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <aside className="flex flex-col gap-4 bg-primary px-6 py-7 text-white sm:gap-6 sm:px-14 sm:py-10 lg:w-[420px] lg:shrink-0 lg:py-16">
        <AcwLogo inverted />
        <div className="flex flex-col gap-4">
          <p className="text-[13px] font-semibold tracking-[0.08em] text-nav-indicator uppercase">{eyebrow}</p>
          <p className="text-2xl leading-[1.15] font-bold tracking-tight sm:text-[36px]">{title}</p>
          <p className="hidden text-base leading-relaxed text-white/75 sm:block">{description}</p>
        </div>
        <div className="hidden sm:block">{aside}</div>
      </aside>
      <main className="flex flex-1 justify-center px-6 py-10 sm:py-14">
        <div className="flex w-full max-w-[560px] flex-col gap-5">
          <BackLink href="/connexion" />
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[30px] leading-tight font-bold tracking-tight">{heading}</h1>
            <p className="text-base text-muted-foreground">{intro}</p>
          </div>
          {children}
          <p className="text-center text-[15px] text-label">
            Vous avez déjà un compte ?{" "}
            <Link href="/connexion" className="text-foreground">
              Se connecter
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
