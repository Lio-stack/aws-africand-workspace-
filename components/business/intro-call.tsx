"use client";

import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";

// Écran 53 · Appel d'introduction (Figma) : créneau, format, participants, confirmation.
const STEPS = ["Expert proposé par AfriCand", "Demande d'appel envoyée", "Créneau confirmé par AfriCand", "Appel réalisé"];
const DAYS: { label: string; slots: string[] }[] = [
  { label: "Lun. 19 oct.", slots: ["14:00", "16:30"] },
  { label: "Mar. 20 oct.", slots: ["09:00", "10:00", "15:00"] },
  { label: "Mer. 21 oct.", slots: ["11:00", "17:00"] },
  { label: "Jeu. 22 oct.", slots: ["09:30", "14:30", "16:00"] },
];
const PEOPLE = [
  { ini: "KA", name: "[Prénom Nom], DG" },
  { ini: "AD", name: "[Prénom Nom], DAF" },
  { ini: "MT", name: "[Prénom Nom], RH" },
];
const QUESTIONS = [
  "Missions comparables menées par le consultant pour AfriCand",
  "Approche proposée pour les 30 premiers jours",
  "Disponibilité réelle et date de démarrage possible",
  "Modalités : présence sur site, outils, reporting",
];
const DOCS = [
  { ext: "PDF", name: "Fiche besoin B-028", meta: "Partagée avec l'expert" },
  { ext: "PDF", name: "Accord de confidentialité", meta: "Signé par les deux parties" },
  { ext: "DOC", name: "Présentation entreprise", meta: "2 pages" },
];

function Chip({ on, children, onClick, label }: { on: boolean; children: React.ReactNode; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      aria-label={label}
      className={cn(
        "flex h-[42px] items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold outline-none focus-visible:ring-3 focus-visible:ring-ref-blue/30",
        on ? "border-ref-blue bg-ref-blue text-white" : "border-[#DCE1E8] bg-white text-ref-ink hover:border-ref-blue",
      )}
    >
      {children}
    </button>
  );
}

export function IntroCall() {
  const [slot, setSlot] = useState("Mar. 20 oct.|10:00");
  const [format, setFormat] = useState<"Visio" | "Téléphone">("Visio");
  const [who, setWho] = useState<Record<string, boolean>>({ KA: true, AD: true, MT: false });
  const [confirmed, setConfirmed] = useState(false);
  const done = confirmed ? 2 : 1;
  const [day, time] = slot.split("|");
  const nb = Object.values(who).filter(Boolean).length;
  const slotLabel = `${day} à ${time.replace(":00", " h").replace(":", " h ")}`;
  const formatLabel = `${format === "Visio" ? "Visio ACW" : "Téléphone"}, animé par AfriCand`;

  return (
    <>
      <div className="flex flex-col gap-1.5">
        <nav aria-label="Fil d'Ariane">
          <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-ref-muted">
            <li>ACW Business</li>
            <li aria-hidden>›</li>
            <li><Link href="/business/introductions" className="hover:underline">Introductions</Link></li>
            <li aria-hidden>›</li>
            <li aria-current="page" className="text-ref-ink">Appel d&apos;introduction</li>
          </ol>
        </nav>
        <h1 className="text-[30px] leading-tight font-bold tracking-[-0.01em] text-ref-ink">Appel d&apos;introduction</h1>
        <p className="max-w-3xl text-[15px] text-ref-muted">
          Vous ne contactez pas l&apos;expert directement : vous demandez l&apos;appel à AfriCand, qui mobilise son consultant
          indépendant, anime l&apos;échange et reste votre interlocuteur unique.
        </p>
      </div>

      <section aria-label="Expert concerné" className="flex flex-col gap-[18px] rounded-2xl border border-ref-line bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span role="img" aria-label="Photo de profil" className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#E8EDF5] text-lg font-bold text-ref-muted">B2</span>
            <span className="flex flex-col gap-[3px]">
              <span className="text-[19px] font-bold text-ref-ink">[Prénom Nom]</span>
              <span className="text-sm text-ref-ink">Consultant senior M&amp;A, due diligence et financement structuré</span>
              <span className="text-[13px] text-ref-muted">Consultant indépendant AfriCand · Besoin : DAF de transition [B-028]</span>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Link href="/business/profils/a-1042" className="flex h-[42px] items-center rounded-[10px] border border-[#DCE1E8] bg-white px-4 text-sm font-semibold text-ref-ink hover:border-ref-blue">
              Voir le profil
            </Link>
            <span className={cn(
              "flex h-[42px] items-center rounded-full px-4 text-sm font-semibold",
              confirmed ? "bg-ref-blue text-white" : "bg-ref-tint text-ref-blue",
            )}>
              {confirmed ? "Demande envoyée" : "Proposé par AfriCand"}
            </span>
          </div>
        </div>
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Progression de l'introduction">
          {STEPS.map((label, i) => (
            <li key={label} className="flex flex-col gap-1.5">
              <span aria-hidden className={cn("block h-1.5 rounded-full", i < done ? "bg-ref-blue" : "bg-[#DCE1E8]")} />
              <span className={cn("text-[13px]", i < done ? "font-semibold text-ref-ink" : "text-ref-muted")}>
                {i < done ? <span className="sr-only">Fait : </span> : null}{label}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <div className="flex flex-wrap items-start gap-5">
        <div className="flex min-w-0 flex-[2_1_560px] flex-col gap-5">
          {confirmed ? (
            <section aria-label="Demande envoyée" className="flex flex-col gap-4 rounded-2xl bg-[linear-gradient(135deg,#0B5CFF_0%,#0848C7_55%,#0A1838_100%)] p-6 text-white">
              <p className="text-[13px] font-semibold tracking-wide opacity-85">DEMANDE ENVOYÉE À AFRICAND</p>
              <div className="flex flex-wrap items-baseline gap-3">
                <p className="text-[28px] font-bold">{slotLabel}</p>
                <p className="text-base opacity-85">30 min · {formatLabel}</p>
              </div>
              <p className="text-sm opacity-85">
                Votre chargé de compte AfriCand confirme ce créneau avec l&apos;expert sous 24 h, puis envoie l&apos;invitation
                à tous les participants. L&apos;appel est animé par AfriCand.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <a href="tel:+225" className="flex h-[46px] items-center gap-2 rounded-xl bg-white px-5 text-[15px] font-bold text-ref-blue">
                  <Phone aria-hidden className="size-[18px]" /> Appeler AfriCand
                </a>
                <button type="button" className="h-[46px] rounded-xl border border-white/50 bg-transparent px-[18px] text-[15px] font-semibold text-white">
                  Ajouter au calendrier (provisoire)
                </button>
                <button type="button" onClick={() => setConfirmed(false)} className="h-[46px] rounded-xl border border-white/50 bg-transparent px-[18px] text-[15px] font-semibold text-white">
                  Modifier la demande
                </button>
              </div>
            </section>
          ) : (
            <section aria-label="Planifier l'appel" className="flex flex-col gap-5 rounded-2xl border border-ref-line bg-white p-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-ref-ink">Planifier l&apos;appel</h2>
                <p className="text-sm text-ref-muted">Choisissez votre créneau préféré. AfriCand le confirme avec son consultant (heure d&apos;Abidjan, GMT).</p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="group" aria-label="Créneaux">
                {DAYS.map((d) => (
                  <div key={d.label} className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-ref-ink">{d.label}</span>
                    {d.slots.map((t) => {
                      const on = slot === `${d.label}|${t}`;
                      return <Chip key={t} on={on} onClick={() => setSlot(`${d.label}|${t}`)} label={`${d.label} ${t}`}>{t}</Chip>;
                    })}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2.5">
                <span id="format-label" className="text-sm font-semibold text-ref-ink">Format</span>
                <div role="group" aria-labelledby="format-label" className="flex flex-wrap gap-2.5">
                  {(["Visio", "Téléphone"] as const).map((f) => (
                    <Chip key={f} on={format === f} onClick={() => setFormat(f)} label={f}>{f}</Chip>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="text-sm font-semibold text-ref-ink">Participants</span>
                <div className="flex flex-wrap gap-2.5">
                  <span className="flex h-[42px] items-center gap-2 rounded-[10px] bg-ref-tint px-3.5 text-sm font-semibold text-ref-blue">
                    <span aria-hidden className="flex size-[26px] items-center justify-center rounded-full bg-ref-blue text-[11px] font-bold text-white">AC</span>
                    [Prénom Nom], AfriCand (animateur)
                  </span>
                  <span className="flex h-[42px] items-center gap-2 rounded-[10px] bg-ref-tint px-3.5 text-sm font-semibold text-ref-blue">
                    <span aria-hidden className="flex size-[26px] items-center justify-center rounded-full bg-ref-blue text-[11px] font-bold text-white">B2</span>
                    [Prénom Nom], consultant AfriCand
                  </span>
                </div>
                <span className="text-[13px] text-ref-muted">Côté entreprise, sélectionnez les personnes à inviter :</span>
                <div className="flex flex-wrap gap-2.5">
                  {PEOPLE.map((m) => {
                    const on = !!who[m.ini];
                    return (
                      <button
                        key={m.ini}
                        type="button"
                        onClick={() => setWho((w) => ({ ...w, [m.ini]: !w[m.ini] }))}
                        aria-pressed={on}
                        className={cn(
                          "flex h-[42px] items-center gap-2 rounded-[10px] border px-3.5 text-sm font-semibold outline-none focus-visible:ring-3 focus-visible:ring-ref-blue/30",
                          on ? "border-ref-blue bg-ref-blue text-white" : "border-[#DCE1E8] bg-white text-ref-ink hover:border-ref-blue",
                        )}
                      >
                        <span aria-hidden className={cn(
                          "flex size-[26px] items-center justify-center rounded-full text-[11px] font-bold",
                          on ? "bg-white text-ref-blue" : "bg-ref-tint text-ref-blue",
                        )}>
                          {m.ini}
                        </span>
                        {m.name}
                      </button>
                    );
                  })}
                </div>
              </div>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-ref-ink">Ordre du jour</span>
                <textarea
                  rows={3}
                  defaultValue="Présentation du contexte et du besoin, expérience de l'expert sur des missions comparables, disponibilité et modalités de démarrage."
                  className="resize-y rounded-xl border border-[#DCE1E8] px-3.5 py-3 text-[15px] text-ref-ink outline-none placeholder:text-ref-faint focus-visible:border-ref-blue focus-visible:ring-3 focus-visible:ring-ref-blue/20"
                />
              </label>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ref-chip pt-4">
                <p className="text-sm text-ref-muted">
                  {slotLabel} · 30 min · {format} · {nb} participant{nb > 1 ? "s" : ""} + AfriCand et son consultant
                </p>
                <button
                  type="button"
                  disabled={!nb}
                  onClick={() => setConfirmed(true)}
                  className={cn(
                    "h-[46px] rounded-xl px-[22px] text-[15px] font-semibold text-white",
                    nb ? "bg-ref-blue hover:bg-ref-blue-hover" : "cursor-not-allowed bg-[#B8C2D3]",
                  )}
                >
                  Envoyer la demande à AfriCand
                </button>
              </div>
            </section>
          )}

          <section aria-label="Historique des appels" className="flex flex-col rounded-2xl border border-ref-line bg-white p-6">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xl font-bold text-ref-ink">Historique des appels</h2>
              <Link href="/business/introductions" className="text-[13px] text-ref-muted">Toutes les introductions</Link>
            </div>
            {[
              { ini: "B2", who: "[Prénom Nom], consultant AfriCand", need: "DAF de transition [B-028]", when: confirmed ? slotLabel : "À planifier", status: confirmed ? "En confirmation" : "À planifier", live: true },
              { ini: "C4", who: "[Prénom Nom], consultant AfriCand", need: "Audit de conformité [B-019]", when: "Jeu. 8 oct. à 15 h", status: "Réalisé", live: false },
              { ini: "E7", who: "[Prénom Nom], consultant AfriCand", need: "Stratégie export [B-012]", when: "Lun. 28 sept. à 11 h", status: "Sans suite", live: false },
            ].map((h) => (
              <div key={h.ini + h.need} className="flex flex-wrap items-center gap-3.5 border-t border-ref-chip py-3.5">
                <span aria-hidden className="flex size-11 items-center justify-center rounded-full bg-ref-deep text-[13px] font-semibold text-white">{h.ini}</span>
                <span className="flex min-w-52 flex-1 flex-col gap-0.5">
                  <span className="text-[15px] font-semibold text-ref-ink">{h.who}</span>
                  <span className="text-[13px] text-ref-muted">{h.need}</span>
                </span>
                <span className="min-w-36 text-sm text-ref-ink">{h.when}</span>
                <span className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-semibold",
                  h.status === "Réalisé" ? "bg-ref-blue text-white" : h.live ? "bg-ref-tint text-ref-blue" : "bg-ref-chip text-ref-muted",
                )}>
                  {h.status}
                </span>
                <Link href="/business/documents" className="text-sm font-semibold text-ref-ink hover:underline">
                  {h.status === "À planifier" ? "Voir le profil" : "Compte rendu AfriCand"}
                </Link>
              </div>
            ))}
          </section>
        </div>

        <aside className="flex min-w-0 flex-[1_1_300px] flex-col gap-5">
          <section aria-label="Votre contact AfriCand" className="flex flex-col gap-3.5 rounded-2xl border border-ref-line bg-white p-[22px]">
            <h2 className="text-lg font-bold text-ref-ink">Votre contact AfriCand</h2>
            <div className="flex items-center gap-3">
              <span aria-hidden className="flex size-12 items-center justify-center rounded-full bg-ref-blue text-[15px] font-bold text-white">AC</span>
              <span className="flex flex-col">
                <span className="text-[15px] font-semibold text-ref-ink">[Prénom Nom]</span>
                <span className="text-[13px] text-ref-muted">Chargé de compte AfriCand</span>
              </span>
            </div>
            <a href="tel:+225" className="flex h-[46px] items-center justify-center gap-2 rounded-xl bg-ref-blue text-[15px] font-semibold text-white hover:bg-ref-blue-hover">
              <Phone aria-hidden className="size-[18px]" /> Appeler AfriCand
            </a>
            <a href="mailto:contact@africand.com" className="flex h-[46px] items-center justify-center gap-2 rounded-xl border border-ref-blue bg-white text-[15px] font-semibold text-ref-blue hover:bg-ref-tint">
              <Mail aria-hidden className="size-[18px]" /> Écrire à AfriCand
            </a>
            <p className="text-[13px] leading-relaxed text-ref-muted">
              L&apos;expert travaille comme consultant indépendant pour AfriCand. Ses coordonnées personnelles ne sont pas partagées.
            </p>
          </section>

          <section aria-label="Préparer l'appel" className="flex flex-col gap-3 rounded-2xl border border-ref-line bg-white p-[22px]">
            <h2 className="text-lg font-bold text-ref-ink">Préparer l&apos;appel</h2>
            {QUESTIONS.map((q, i) => (
              <div key={q} className="flex gap-2.5 text-sm leading-relaxed text-ref-ink">
                <span aria-hidden className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-ref-tint text-xs font-bold text-ref-blue">{i + 1}</span>
                {q}
              </div>
            ))}
          </section>

          <section aria-label="Documents partagés" className="flex flex-col gap-3 rounded-2xl border border-ref-line bg-white p-[22px]">
            <h2 className="text-lg font-bold text-ref-ink">Documents partagés</h2>
            {DOCS.map((x) => (
              <Link key={x.name} href="/business/documents" className="flex items-center gap-3 text-ref-ink">
                <span aria-hidden className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-ref-tint text-[11px] font-bold text-ref-blue">{x.ext}</span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold">{x.name}</span>
                  <span className="text-xs text-ref-muted">{x.meta}</span>
                </span>
              </Link>
            ))}
          </section>

          <section aria-label="Après l'appel" className="flex flex-col gap-2 rounded-2xl bg-ref-tint p-5">
            <p className="text-[15px] font-bold text-ref-blue">Après l&apos;appel</p>
            <p className="text-sm leading-relaxed text-ref-ink">
              Indiquez si vous souhaitez poursuivre. AfriCand prépare alors la proposition commerciale et le contrat.
            </p>
            <Link href="/business/propositions" className="mt-1.5 flex h-[42px] items-center justify-center rounded-[10px] bg-ref-blue text-sm font-semibold text-white hover:bg-ref-blue-hover">
              Demander une proposition
            </Link>
          </section>
        </aside>
      </div>
    </>
  );
}
