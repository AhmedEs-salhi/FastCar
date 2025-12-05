"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface VehicleFormProps {
  onSubmit: (data: any) => void
  onClose: () => void
}

export default function VehicleForm({ onSubmit, onClose }: VehicleFormProps) {
  const [formData, setFormData] = useState({
    matricule: "",
    marque: "",
    modele: "",
    prixJour: 0,
    kilometrage: 0,
    etat: "Disponible",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Matricule</label>
        <Input
          value={formData.matricule}
          onChange={(e) => setFormData({ ...formData, matricule: e.target.value })}
          placeholder="ex: AB1230D"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Marque</label>
        <Input
          value={formData.marque}
          onChange={(e) => setFormData({ ...formData, marque: e.target.value })}
          placeholder="ex: Renault"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Modèle</label>
        <Input
          value={formData.modele}
          onChange={(e) => setFormData({ ...formData, modele: e.target.value })}
          placeholder="ex: Clio"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Prix par Jour (DH)</label>
        <Input
          type="number"
          value={formData.prixJour}
          onChange={(e) => setFormData({ ...formData, prixJour: Number.parseInt(e.target.value) })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Kilométrage</label>
        <Input
          type="number"
          value={formData.kilometrage}
          onChange={(e) => setFormData({ ...formData, kilometrage: Number.parseInt(e.target.value) })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">État</label>
        <Select value={formData.etat} onValueChange={(value) => setFormData({ ...formData, etat: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Disponible">Disponible</SelectItem>
            <SelectItem value="Loué">Loué</SelectItem>
            <SelectItem value="En maintenance">En maintenance</SelectItem>
          </SelectContent>
        </Select>
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
