"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ClientFormProps {
  onSubmit: (data: any) => void
  onClose: () => void
}

export default function ClientForm({ onSubmit, onClose }: ClientFormProps) {
  const [formData, setFormData] = useState({
    cin: "",
    nom: "",
    prenom: "",
    adresse: "",
    telephone: "",
    email: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">CIN</label>
        <Input
          value={formData.cin}
          onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
          placeholder="ex: L876543"
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
      <div>
        <label className="block text-sm font-medium mb-2">Adresse</label>
        <Input
          value={formData.adresse}
          onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Téléphone</label>
        <Input
          value={formData.telephone}
          onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
          placeholder="ex: 0612345678"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
