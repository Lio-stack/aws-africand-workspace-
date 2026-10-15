import type { Metadata } from "next";

import { DataTable } from "@/components/app/data-table";
import { DemoAction } from "@/components/app/demo-action";
import { PageHeader } from "@/components/app/page-header";
import { KpiCard, Panel } from "@/components/app/panel";
import { StatusBadge } from "@/components/app/status-badge";
import { paymentHistory, paymentSummary } from "@/lib/demo/experts";

export const metadata: Metadata = { title: "Experts · Paiements" };

type Payment = (typeof paymentHistory)[number];

// Écran 22 · Experts · Paiements (suivi seulement : pas de paiement en ligne au MVP).
export default function PaiementsPage() {
  return (
    <>
      <PageHeader
        breadcrumb={["ACW Experts", "Paiements"]}
        title="Paiements"
        description="Versements de votre part par AfriCand, par mission. Vous ne facturez pas le client. Montants en FCFA."
        actions={
          <DemoAction variant="outline" className="h-10 rounded-[10px] border-field-border px-4">
            Coordonnées de paiement
          </DemoAction>
        }
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {paymentSummary.map((item) => (
          <KpiCard key={item.label} {...item} />
        ))}
      </div>
      <Panel title="Historique" action={<DemoAction variant="outline" className="h-9 rounded-[10px] border-field-border px-3.5">Exporter</DemoAction>}>
        <DataTable<Payment>
          caption="Historique des paiements"
          rows={[...paymentHistory]}
          rowKey={(row) => row.ref}
          columns={[
            { header: "Référence", cell: (row) => <span className="font-semibold">{row.ref}</span>, primary: true },
            { header: "Mission", cell: (row) => row.mission },
            { header: "Date", cell: (row) => row.date },
            { header: "Montant", cell: (row) => row.amount },
            { header: "Statut", cell: (row) => <StatusBadge tone={row.tone}>{row.status}</StatusBadge> },
          ]}
        />
      </Panel>
    </>
  );
}
