"use client"

import { useState } from "react"
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
import AgentForm from "@/components/forms/agent-form"

interface Agent {
  id: string
  numero: string
  nom: string
  prenom: string
}

export default function AgentsModule() {
  const [agents, setAgents] = useState<Agent[]>([{ id: "1", numero: "AG-205", nom: "BENSAID", prenom: "Amina" }])

  const [searchTerm, setSearchTerm] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)

  const filteredAgents = agents.filter(
    (a) =>
      a.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.prenom.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddAgent = (data: Omit<Agent, "id">) => {
    setAgents([...agents, { ...data, id: Date.now().toString() }])
    setIsFormOpen(false)
  }

  const handleDeleteAgent = (id: string) => {
    setAgents(agents.filter((a) => a.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Gérer les Agents</h2>
          <p className="text-muted-foreground">Liste des agents de l'agence</p>
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
              <DialogTitle>Ajouter un Agent</DialogTitle>
              <DialogDescription>Remplissez les informations de l'agent</DialogDescription>
            </DialogHeader>
            <AgentForm onSubmit={handleAddAgent} onClose={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted">
                <th className="table-header">N° Agent</th>
                <th className="table-header">Nom</th>
                <th className="table-header">Prénom</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAgents.map((agent) => (
                <tr key={agent.id} className="hover:bg-muted/50 transition-colors">
                  <td className="table-cell font-semibold text-primary">{agent.numero}</td>
                  <td className="table-cell">{agent.nom}</td>
                  <td className="table-cell">{agent.prenom}</td>
                  <td className="table-cell">
                    <div className="flex gap-2">
                      <button className="action-button">
                        <Eye size={18} className="text-primary" />
                      </button>
                      <button className="action-button">
                        <Edit2 size={18} className="text-blue-600" />
                      </button>
                      <button className="action-button" onClick={() => handleDeleteAgent(agent.id)}>
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
