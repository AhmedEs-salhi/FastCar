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
import ClientForm from "@/components/forms/client-form"
import { clientsAPI } from "@/lib/api"

interface Client {
  id: string
  cin: string
  nom: string
  prenom: string
  adresse: string
  telephone: string
  email: string
}

export default function ClientsModule() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      setLoading(true)
      const data = await clientsAPI.getAll()
      setClients(data)
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredClients = clients.filter(
    (c) =>
      c.cin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.prenom.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddClient = async (data: Omit<Client, "id">) => {
    try {
      const newClient = await clientsAPI.create(data)
      setClients([...clients, newClient])
      setIsFormOpen(false)
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error)
    }
  }

  const handleDeleteClient = async (id: string) => {
    try {
      await clientsAPI.delete(id)
      setClients(clients.filter((c) => c.id !== id))
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Gérer les Clients</h2>
          <p className="text-muted-foreground">Liste complète des clients</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus size={20} />
              L'Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un Client</DialogTitle>
              <DialogDescription>Remplissez les informations du client</DialogDescription>
            </DialogHeader>
            <ClientForm onSubmit={handleAddClient} onClose={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted">
                <th className="table-header">CIN</th>
                <th className="table-header">Nom</th>
                <th className="table-header">Prénom</th>
                <th className="table-header">Téléphone</th>
                <th className="table-header">Email</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-muted/50 transition-colors">
                  <td className="table-cell font-semibold text-primary">{client.cin}</td>
                  <td className="table-cell">{client.nom}</td>
                  <td className="table-cell">{client.prenom}</td>
                  <td className="table-cell">{client.telephone}</td>
                  <td className="table-cell text-sm">{client.email}</td>
                  <td className="table-cell">
                    <div className="flex gap-2">
                      <button className="action-button">
                        <Eye size={18} className="text-primary" />
                      </button>
                      <button className="action-button">
                        <Edit2 size={18} className="text-blue-600" />
                      </button>
                      <button className="action-button" onClick={() => handleDeleteClient(client.id)}>
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
