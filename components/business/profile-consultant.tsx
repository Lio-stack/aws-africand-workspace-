"use client";

import { GraduationCap, Mail, MoreHorizontal, Phone, UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { VerifiedBadge } from "@/components/app/acw-symbol";
import { Meter } from "@/components/app/panel";
import { profileDetail } from "@/lib/demo/business";
import { expertSkills } from "@/lib/demo/experts";
import { cn } from "@/lib/utils";

// Écran 52 · Profil consultant complet (Figma) dans le shell ACW.
// Identité révélée après introduction + rappel matching (ADR-003).
const LOGOS = [
  { ini: "CC", bg: "bg-ref-blue" },
  { ini: "FA", bg: "bg-ref-deep" },
  { ini: "BR", bg: "bg-[#3A4D7A]" },
];
const PLACES = ["Abidjan, Côte d'Ivoire", "Casablanca, Maroc", "Dakar, Sénégal"];
const EDU = [
  { degree: "[Master en finance]", school: "[Établissement]", year: "[Année]" },
  { degree: "[Certification professionnelle]", school: "[Organisme]", year: "[Année]" },
];
const CLIENTS = ["C1", "C2", "C3", "C4", "C5", "C6"];

function ContactRow({ icon: Icon, label, value, href }: { icon: typeof Phone; label: string; value: string; href: string }) {
  return (
    <a href={href} className="flex items-center gap-3 text-ref-ink">
      <span aria-hidden className="flex size-10 items-center justify-center rounded-full bg-ref-ice">
        <Icon className="size-[18px] text-ref-blue" strokeWidth={2} />
      </span>
      <span className="flex flex-col">
        <span className="text-[13px] text-ref-muted">{label}</span>
        <span className="text-[15px] font-semibold">{value}</span>
      </span>
    </a>
  );
}

export function ProfileConsultant({ anonymous = false }: { anonymous?: boolean }) {
  const [inShortlist, setInShortlist] = useState(false);
  const displayName = anonymous ? profileDetail.code : "[Prénom Nom]";
  const displayMeta = anonymous
    ? "Côte d'Ivoire · 12 ans d'expérience · Français, anglais"
    : "Abidjan, Côte d'Ivoire · 12 ans d'expérience · Français, anglais";
  return (
    <>
      <nav aria-label="Fil d'Ariane">
        <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-ref-muted">
          <li>ACW Business</li>
          <li aria-hidden>›</li>
          <li>Explorer les profils</li>
          <li aria-hidden>›</li>
          <li aria-current="page" className="text-ref-ink">
            {anonymous ? profileDetail.code : displayName}
          </li>
        </ol>
      </nav>

      <section aria-label="Carte de profil" className="overflow-hidden rounded-2xl border border-ref-line bg-white">
        <div className="relative h-[220px] overflow-hidden bg-[linear-gradient(120deg,#1D5FFD_0%,#0749D7_40%,#003EAE_75%,#002C74_100%)]">
          <svg viewBox="0 0 1100 220" preserveAspectRatio="xMidYMid slice" aria-hidden className="absolute inset-0 h-full w-full">
            <path d="M0 170 C 220 120, 380 210, 600 150 S 960 80, 1100 120" fill="none" stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="2" />
            <path d="M0 200 C 260 150, 420 230, 640 180 S 980 110, 1100 150" fill="none" stroke="#FFFFFF" strokeOpacity="0.1" strokeWidth="2" />
            <path d="M0 120 C 200 80, 400 150, 620 100 S 940 40, 1100 70" fill="none" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="2" />
          </svg>
          <span className="absolute top-5 left-6 rounded-full bg-white/16 px-3 py-1.5 text-[13px] font-semibold text-white">
            [Photo de couverture]
          </span>
        </div>
        <div className="flex flex-wrap items-end gap-5 px-6 pb-7 sm:px-8">
          <span role="img" aria-label="Photo de profil" className="relative -mt-[74px] flex size-[148px] items-center justify-center rounded-full border-[5px] border-white bg-[#E8EDF5]">
            <UserRound aria-hidden className="size-16 text-ref-muted" strokeWidth={1.6} />
          </span>
          <div className="flex min-w-0 flex-1 basis-80 flex-col gap-1 pt-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-[30px] leading-tight font-bold tracking-[-0.02em] text-ref-ink">{displayName}</h1>
              <VerifiedBadge />
            </div>
            <p className="text-[17px] text-ref-ink">Consultant senior M&amp;A, due diligence et financement structuré</p>
            <p className="text-[15px] text-ref-muted">{displayMeta}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-ref-success-bg px-2.5 py-1 text-[13px] font-semibold text-ref-success">Profil validé par AfriCand</span>
              <span className="rounded-full bg-ref-warn-bg px-2.5 py-1 text-[13px] font-semibold text-ref-warn">Disponible 8 jours par mois</span>
              {anonymous ? (
                <span className="rounded-full bg-ref-chip px-2.5 py-1 text-[13px] text-ref-ink">Consultant indépendant AfriCand</span>
              ) : (
                <span className="rounded-full bg-ref-chip px-2.5 py-1 text-[13px] text-ref-ink">Identité partagée le [DATE]</span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {anonymous ? (
              <>
                <Link href="/business/introductions/appel" className="flex h-[46px] items-center gap-2 rounded-xl bg-ref-blue px-[18px] text-[15px] font-semibold text-white hover:bg-ref-blue-hover">
                  <Phone aria-hidden className="size-[18px]" /> Demander un appel via AfriCand
                </Link>
                <a href="mailto:contact@africand.com" className="flex h-[46px] items-center gap-2 rounded-xl border border-ref-blue bg-white px-[18px] text-[15px] font-semibold text-ref-blue hover:bg-ref-tint">
                  <Mail aria-hidden className="size-[18px]" /> Écrire à AfriCand
                </a>
              </>
            ) : (
              // ADR-013 : identité révélée (nom, photo, parcours) mais coordonnées
              // personnelles JAMAIS montrées — contact uniquement via AfriCand.
              <>
                <Link href="/business/introductions/appel" className="flex h-[46px] items-center gap-2 rounded-xl bg-ref-blue px-[18px] text-[15px] font-semibold text-white hover:bg-ref-blue-hover">
                  <Phone aria-hidden className="size-[18px]" /> Appeler AfriCand
                </Link>
                <a href="mailto:contact@africand.com" className="flex h-[46px] items-center gap-2 rounded-xl border border-ref-blue bg-white px-[18px] text-[15px] font-semibold text-ref-blue hover:bg-ref-tint">
                  <Mail aria-hidden className="size-[18px]" /> Écrire à AfriCand
                </a>
              </>
            )}
            <button
              type="button"
              aria-pressed={inShortlist}
              onClick={() => setInShortlist((v) => !v)}
              className={cn(
                "h-[46px] rounded-xl border px-[18px] text-[15px] font-semibold outline-none focus-visible:ring-3 focus-visible:ring-ref-blue/30",
                inShortlist ? "border-ref-blue bg-ref-tint text-ref-ink" : "border-[#DCE1E8] bg-white text-ref-ink",
              )}
            >
              {inShortlist ? "Dans la shortlist" : "Ajouter à la shortlist"}
            </button>
            <button type="button" aria-label="Plus d'actions" className="flex size-[46px] items-center justify-center rounded-xl border border-[#DCE1E8] bg-white outline-none hover:bg-ref-chip focus-visible:ring-3 focus-visible:ring-ref-blue/30">
              <MoreHorizontal aria-hidden className="size-5 text-ref-ink" />
            </button>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-start gap-5">
        <div className="flex min-w-0 flex-[3_1_520px] flex-col gap-5">
          <section aria-label="À propos" className="flex flex-col gap-3 rounded-2xl border border-ref-line bg-white p-6">
            <h2 className="text-xl font-bold text-ref-ink">À propos</h2>
            <p className="text-base leading-[1.65] text-ref-ink">
              [Présentation rédigée par le consultant : ce qu&apos;il fait, pour quels clients, sur quels types d&apos;opérations.
              Par exemple : accompagne PME et fonds d&apos;investissement dans leurs acquisitions en Afrique de l&apos;Ouest,
              de la due diligence financière au closing, avec une spécialisation agro-industrie.]
            </p>
            <div className="mt-1 flex flex-wrap gap-2">
              {expertSkills.slice(0, 6).map((s) => (
                <span key={s.name} className="rounded-full bg-ref-chip px-3 py-1.5 text-sm text-ref-ink">{s.name}</span>
              ))}
            </div>
          </section>

          <section aria-label="Expériences" className="flex flex-col rounded-2xl border border-ref-line bg-white px-6 pt-6 pb-2">
            <div className="flex items-center justify-between pb-2">
              <h2 className="text-xl font-bold text-ref-ink">Expériences</h2>
              <span className="text-sm text-ref-muted tabular-nums">{profileDetail.experiences.length} postes</span>
            </div>
            {profileDetail.experiences.map((e, i) => (
              <div key={e.role} className="flex gap-4 border-t border-ref-chip py-[18px]">
                <span aria-hidden className={cn("flex size-[52px] shrink-0 items-center justify-center rounded-full text-[15px] font-bold text-white", LOGOS[i % LOGOS.length].bg)}>
                  {anonymous ? ["CC", "FA", "BR"][i % 3] : LOGOS[i % LOGOS.length].ini}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
                  <div className="flex flex-wrap justify-between gap-2">
                    <span className="text-[17px] font-semibold text-ref-ink">{e.role}</span>
                    <span className="text-sm text-ref-muted">{e.period}</span>
                  </div>
                  <span className="text-[15px] font-medium text-ref-ink">{e.org}</span>
                  <span className="text-sm text-ref-muted">{PLACES[i % PLACES.length]}</span>
                </div>
              </div>
            ))}
          </section>

          <section aria-label="Formation" className="flex flex-col rounded-2xl border border-ref-line bg-white px-6 pt-6 pb-2">
            <h2 className="pb-2 text-xl font-bold text-ref-ink">Formation</h2>
            {EDU.map((d) => (
              <div key={d.degree} className="flex gap-4 border-t border-ref-chip py-4">
                <span aria-hidden className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-[#E8EDF5]">
                  <GraduationCap className="size-6 text-ref-deep" strokeWidth={1.8} />
                </span>
                <div className="flex flex-col gap-[3px]">
                  <span className="text-base font-semibold text-ref-ink">{d.degree}</span>
                  <span className="text-[15px] text-ref-ink">{d.school}</span>
                  <span className="text-sm text-ref-muted">{d.year}</span>
                </div>
              </div>
            ))}
          </section>
        </div>

        <aside className="flex min-w-0 flex-[1_1_300px] flex-col gap-5">
          <section aria-label="Coordonnées" className="flex flex-col gap-3 rounded-2xl border border-ref-line bg-white p-6">
            <h2 className="text-lg font-bold text-ref-ink">Votre contact AfriCand</h2>
            <div className="flex items-center gap-3">
              <span aria-hidden className="flex size-12 items-center justify-center rounded-full bg-ref-blue text-[15px] font-bold text-white">AC</span>
              <span className="flex flex-col">
                <span className="text-[15px] font-semibold text-ref-ink">[Prénom Nom]</span>
                <span className="text-[13px] text-ref-muted">Chargé de compte AfriCand</span>
              </span>
            </div>
            <ContactRow icon={Phone} label="Téléphone AfriCand" value="+225 [NUMÉRO]" href="tel:+225" />
            <ContactRow icon={Mail} label="E-mail AfriCand" value="[e-mail AfriCand]" href="mailto:contact@africand.com" />
            <p className="text-[13px] leading-relaxed text-ref-muted">
              {anonymous
                ? "Ce consultant intervient comme indépendant pour AfriCand. Toute prise de contact, tout appel et toute mission passent par AfriCand, votre interlocuteur unique."
                : "Identité révélée après double accord et validation AfriCand. Les coordonnées personnelles du consultant ne sont jamais partagées : contactez votre chargé de compte."}
            </p>
          </section>

          <section aria-label="En bref" className="flex flex-col gap-3 rounded-2xl border border-ref-line bg-white p-6">
            <h2 className="text-lg font-bold text-ref-ink">En bref</h2>
            {[
              { k: "Domaine", v: "M&A, finance" },
              { k: "Secteurs", v: "Agro-industrie, énergie" },
              { k: "Missions ACW", v: "1 réalisée" },
              { k: "Références vérifiées", v: "2 sur 3" },
              { k: "Mode", v: "À distance, sur site" },
            ].map((f) => (
              <div key={f.k} className="flex justify-between gap-3 text-[15px]">
                <span className="text-ref-muted">{f.k}</span>
                <span className="text-right font-semibold text-ref-ink">{f.v}</span>
              </div>
            ))}
          </section>

          <section aria-label="Matching" className="flex flex-col gap-3 rounded-2xl border border-ref-line bg-white p-6">
            <h2 className="text-lg font-bold text-ref-ink">Matching {profileDetail.need}</h2>
            <p className="text-4xl font-bold text-ref-ink tabular-nums">
              {profileDetail.score} <span className="text-base font-medium text-ref-muted">/ 100</span>
            </p>
            {profileDetail.criteria.slice(0, 3).map((c) => (
              <div key={c.label} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-ref-ink">{c.label}</span>
                  <span className="font-semibold text-ref-ink tabular-nums">{c.pts} / {c.max}</span>
                </div>
                <Meter value={Math.round((c.pts / c.max) * 100)} label={`${c.label} : ${c.pts} sur ${c.max}`} />
              </div>
            ))}
          </section>

          <section aria-label="Entreprises accompagnées" className="flex flex-col gap-3 rounded-2xl border border-ref-line bg-white p-6">
            <h2 className="text-lg font-bold text-ref-ink">Entreprises accompagnées</h2>
            <div className="flex flex-wrap gap-2.5">
              {CLIENTS.map((c) => (
                <span key={c} className="flex size-[52px] items-center justify-center rounded-full bg-ref-chip text-[13px] font-bold text-ref-ink">{c}</span>
              ))}
            </div>
            <span className="text-[13px] text-ref-muted">Logos des employeurs et clients, sous réserve de leur accord.</span>
          </section>
        </aside>
      </div>
    </>
  );
}
