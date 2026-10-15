import { redirect } from "next/navigation";

// Plateforme privée : l'entrée se fait par la connexion.
export default function Home() {
  redirect("/connexion");
}
