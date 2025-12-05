"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AgentFormProps {
  onSubmit: (data: any) => void
  onClose: () => void
}

export default function AgentForm({ onSubmit, onClose }: AgentFormProps) {
  const [formData, setFormData] = useState({
    numero: "",
    nom: "",
    prenom: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">N° Agent</label>
        <Input
          value={formData.numero}
          onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
          placeholder="ex: AG-205"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Nom</label>
        <Input value={formData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })} required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Prénom</label>
        <Input
          value={formData.prenom}
          onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
          required
        />
      </div>
      <div className="flex gap-3 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Ajouter
        </Button>
      </div>
    </form>
  )
}
