import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const spaces = [
  { title: "AWS Experts", description: "Consultants seniors qualifiés." },
  { title: "AWS Business", description: "Entreprises validées." },
  { title: "AWS Administration", description: "Équipe AfriCand." },
];

// Page provisoire du socle (phase 2) : vérifie tokens, typographie et composants.
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-16 sm:px-6">
      <header className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Socle technique
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-primary">AfriCand Work Space</h1>
        <p className="max-w-prose text-base text-muted-foreground">
          Plateforme B2B privée, confidentielle et premium.
        </p>
      </header>
      <section aria-label="Espaces" className="grid gap-4 sm:grid-cols-3">
        {spaces.map((space) => (
          <Card key={space.title}>
            <CardHeader>
              <CardTitle>{space.title}</CardTitle>
              <CardDescription>{space.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-sm text-muted-foreground">Disponible prochainement</span>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
