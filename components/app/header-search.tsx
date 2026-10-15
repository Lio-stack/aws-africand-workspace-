"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

// Recherche d'en-tête : renvoie vers la liste principale de l'espace, filtrée par le terme saisi.
export function HeaderSearch({ placeholder, target }: { placeholder: string; target: string }) {
  const router = useRouter();

  return (
    <form
      role="search"
      className="hidden h-11 max-w-[560px] flex-1 items-center gap-2.5 rounded-[10px] bg-secondary px-3.5 focus-within:ring-3 focus-within:ring-action/15 md:flex"
      onSubmit={(event) => {
        event.preventDefault();
        const q = new FormData(event.currentTarget).get("q")?.toString().trim() ?? "";
        router.push(q ? `${target}?q=${encodeURIComponent(q)}` : target);
      }}
    >
      <Search aria-hidden className="size-[18px] shrink-0 text-muted-foreground" />
      <input
        name="q"
        type="search"
        aria-label="Rechercher"
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-placeholder"
      />
    </form>
  );
}
