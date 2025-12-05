"use client"

import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"

interface Invoice {
  id: string
  numero: string
  contrat: string
  client: string
  montant: number
  dateFin: string
  modePaiement: string
}

interface InvoiceDetailProps {
  invoice: Invoice
}

export default function InvoiceDetail({ invoice }: InvoiceDetailProps) {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white border border-border rounded-lg">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">FACTURE DE LOCATION</h1>
        <p className="text-muted-foreground">AGENCE AUTO-LOC MAROC</p>
      </div>

      <div className="space-y-6">
        <div className="border-t border-b border-border py-4">
          <h2 className="font-semibold mb-3">CONTRAT</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">N° Contrat</p>
              <p className="font-semibold">{invoice.contrat}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Montant total</p>
              <p className="font-semibold">{invoice.montant},00 MAD</p>
            </div>
            <div>
              <p className="text-muted-foreground">Mode de paiement</p>
              <p className="font-semibold">{invoice.modePaiement}</p>
            </div>
          </div>
        </div>

        <div className="border-b border-border py-4">
          <h2 className="font-semibold mb-3">CLIENT</h2>
          <p className="text-sm">{invoice.client}</p>
        </div>

        <div className="space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>Siège social : Bd Mohammed V, Casablanca</p>
            <p>Tél : 05 22 33 44 55 | RC : 123456 | Patente : 78901234</p>
          </div>
          <p className="text-center font-semibold">Merci de votre confiance !</p>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <Button onClick={() => window.print()} className="gap-2 bg-primary hover:bg-primary/90 mx-auto">
          <Printer size={20} />
          Imprimer
        </Button>
      </div>
    </div>
  )
}
