"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Edit2, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ContractForm from "@/components/forms/contract-form"
import { contractsAPI } from "@/lib/api"

interface Contract {
  id: string
  numero: string
  client: string
  matricule: string
  dateDebut: string
  dateFin: string
  montant: number
}

export default function ContractsModule() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    fetchContracts()
  }, [])

  const fetchContracts = async () => {
    try {
      setLoading(true)
      const data = await contractsAPI.getAll()
      setContracts(data)
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredContracts = contracts.filter(
    (c) =>
      c.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.client.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddContract = async (data: Omit<Contract, "id">) => {
    try {
      const newContract = await contractsAPI.create(data as any)
      setContracts([...contracts, newContract])
      setIsFormOpen(false)
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error)
    }
  }

  const handleDeleteContract = async (id: string) => {
    try {
      await contractsAPI.delete(id)
      setContracts(contracts.filter((c) => c.id !== id))
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">LISTE DES CONTRATS ENREGISTRÉS</h2>
          <p className="text-muted-foreground">Gestion des locations</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus size={20} />
              Nouveau Contrat
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nouveau Contrat de Location</DialogTitle>
              <DialogDescription>Remplissez tous les champs requis</DialogDescription>
            </DialogHeader>
            <ContractForm onSubmit={handleAddContract} onClose={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted">
                <th className="table-header">N° Contrat</th>
                <th className="table-header">Client (CIN)</th>
                <th className="table-header">Voiture (Matricule)</th>
                <th className="table-header">Période (Début - Fin)</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-muted/50 transition-colors">
                  <td className="table-cell font-semibold text-primary">{contract.numero}</td>
                  <td className="table-cell">{contract.client}</td>
                  <td className="table-cell">{contract.matricule}</td>
                  <td className="table-cell">{`${contract.dateDebut} - ${contract.dateFin}`}</td>
                  <td className="table-cell">
                    <div className="flex gap-2">
                      <button className="action-button">
                        <Eye size={18} className="text-primary" />
                      </button>
                      <button className="action-button">
                        <Edit2 size={18} className="text-blue-600" />
                      </button>
                      <button className="action-button" onClick={() => handleDeleteContract(contract.id)}>
                        <Trash2 size={18} className="text-red-600" />
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
