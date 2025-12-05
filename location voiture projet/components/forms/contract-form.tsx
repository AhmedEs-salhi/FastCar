"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ContractFormProps {
  onSubmit: (data: any) => void
  onClose: () => void
}

export default function ContractForm({ onSubmit, onClose }: ContractFormProps) {
  const [formData, setFormData] = useState({
    numero: "",
    dateDebut: "",
    dateFin: "",
    montant: 0,
    modePaiement: "Espèces",
    clientCin: "",
    clientNom: "",
    clientPrenom: "",
    clientTelephone: "",
    clientEmail: "",
    vehiculeMatricule: "",
    vehiculeMarque: "",
    vehiculeModele: "",
    vehiculePrixJour: 0,
    vehicleKilometrage: 0,
    agentNumero: "",
    agentNom: "",
    agentPrenom: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-primary">Contrat</h3>
        <div>
          <label className="block text-sm font-medium mb-2">N° Contrat (auto)</label>
          <Input value={formData.numero} disabled placeholder="LOC-2025-04" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Début</label>
            <Input
              type="date"
              value={formData.dateDebut}
              onChange={(e) => setFormData({ ...formData, dateDebut: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Fin</label>
            <Input
              type="date"
              value={formData.dateFin}
              onChange={(e) => setFormData({ ...formData, dateFin: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Montant total (DH)</label>
            <Input
              type="number"
              value={formData.montant}
              onChange={(e) => setFormData({ ...formData, montant: Number.parseInt(e.target.value) })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Mode de paiement</label>
            <Select
              value={formData.modePaiement}
              onValueChange={(value) => setFormData({ ...formData, modePaiement: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Espèces">Espèces</SelectItem>
                <SelectItem value="Carte">Carte</SelectItem>
                <SelectItem value="Virement">Virement</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4 border-t pt-4">
        <h3 className="font-semibold text-lg text-primary">Client</h3>
        <div>
          <label className="block text-sm font-medium mb-2">CIN</label>
          <Input
            value={formData.clientCin}
            onChange={(e) => setFormData({ ...formData, clientCin: e.target.value })}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Nom"
            value={formData.clientNom}
            onChange={(e) => setFormData({ ...formData, clientNom: e.target.value })}
            required
          />
          <Input
            placeholder="Prénom"
            value={formData.clientPrenom}
            onChange={(e) => setFormData({ ...formData, clientPrenom: e.target.value })}
            required
          />
        </div>
        <Input
          type="tel"
          placeholder="Téléphone"
          value={formData.clientTelephone}
          onChange={(e) => setFormData({ ...formData, clientTelephone: e.target.value })}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={formData.clientEmail}
          onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
          required
        />
      </div>

      <div className="space-y-4 border-t pt-4">
        <h3 className="font-semibold text-lg text-primary">Véhicule</h3>
        <Input
          placeholder="Matricule"
          value={formData.vehiculeMatricule}
          onChange={(e) => setFormData({ ...formData, vehiculeMatricule: e.target.value })}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Marque"
            value={formData.vehiculeMarque}
            onChange={(e) => setFormData({ ...formData, vehiculeMarque: e.target.value })}
            required
          />
          <Input
            placeholder="Modèle"
            value={formData.vehiculeModele}
            onChange={(e) => setFormData({ ...formData, vehiculeModele: e.target.value })}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder="Prix/jour"
            value={formData.vehiculePrixJour}
            onChange={(e) => setFormData({ ...formData, vehiculePrixJour: Number.parseInt(e.target.value) })}
            required
          />
          <Input
            type="number"
            placeholder="Kilométrage"
            value={formData.vehicleKilometrage}
            onChange={(e) => setFormData({ ...formData, vehicleKilometrage: Number.parseInt(e.target.value) })}
            required
          />
        </div>
      </div>

      <div className="space-y-4 border-t pt-4">
        <h3 className="font-semibold text-lg text-primary">Agent</h3>
        <div>
          <label className="block text-sm font-medium mb-2">N° Agent</label>
          <Input
            value={formData.agentNumero}
            onChange={(e) => setFormData({ ...formData, agentNumero: e.target.value })}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Nom"
            value={formData.agentNom}
            onChange={(e) => setFormData({ ...formData, agentNom: e.target.value })}
            required
          />
          <Input
            placeholder="Prénom"
            value={formData.agentPrenom}
            onChange={(e) => setFormData({ ...formData, agentPrenom: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Enregistrer
        </Button>
      </div>
    </form>
  )
}
