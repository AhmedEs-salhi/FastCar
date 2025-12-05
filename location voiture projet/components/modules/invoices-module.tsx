"use client"

import { useState } from "react"
import { Search, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import InvoiceDetail from "@/components/invoice-detail"

interface Invoice {
  id: string
  numero: string
  contrat: string
  client: string
  montant: number
  dateFin: string
  modePaiement: string
}

export default function InvoicesModule() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "1",
      numero: "FAC-2024-001",
      contrat: "LOC-2024-08921",
      client: "EL FADLI Karim",
      montant: 1050,
      dateFin: "17/04/2024",
      modePaiement: "Espèces",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.client.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Imprimer une Facture</h2>
        <p className="text-muted-foreground">Sélectionnez une facture pour l'imprimer</p>
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted">
                <th className="table-header">N° Facture</th>
                <th className="table-header">N° Contrat</th>
                <th className="table-header">Client</th>
                <th className="table-header">Montant</th>
                <th className="table-header">Mode Paiement</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-muted/50 transition-colors">
                  <td className="table-cell font-semibold text-primary">{invoice.numero}</td>
                  <td className="table-cell">{invoice.contrat}</td>
                  <td className="table-cell">{invoice.client}</td>
                  <td className="table-cell font-semibold">{invoice.montant} MAD</td>
                  <td className="table-cell">{invoice.modePaiement}</td>
                  <td className="table-cell">
                    <div className="flex gap-2">
                      <Dialog>
                        <button className="action-button" onClick={() => setSelectedInvoice(invoice)}>
                          <Eye size={18} className="text-primary" />
                        </button>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Facture {invoice.numero}</DialogTitle>
                          </DialogHeader>
                          {selectedInvoice && <InvoiceDetail invoice={selectedInvoice} />}
                        </DialogContent>
                      </Dialog>
                      <button className="action-button">
                        <Download size={18} className="text-green-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-4">
            <Search size={20} className="text-muted-foreground" />
            <Input
              placeholder="Rechercher :"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button className="bg-primary hover:bg-primary/90">Rechercher</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
