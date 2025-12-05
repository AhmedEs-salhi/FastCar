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
import VehicleForm from "@/components/forms/vehicle-form"
import { vehiclesAPI } from "@/lib/api"

interface Vehicle {
  id: string
  matricule: string
  marque: string
  modele: string
  prixJour: number
  kilometrage: number
  etat: "Disponible" | "Loué" | "En maintenance"
}

export default function VehiclesModule() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      setLoading(true)
      const data = await vehiclesAPI.getAll()
      setVehicles(data)
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.marque.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.modele.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddVehicle = async (data: Omit<Vehicle, "id">) => {
    try {
      const newVehicle = await vehiclesAPI.create(data)
      setVehicles([...vehicles, newVehicle])
      setIsFormOpen(false)
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error)
    }
  }

  const handleDeleteVehicle = async (id: string) => {
    try {
      await vehiclesAPI.delete(id)
      setVehicles(vehicles.filter((v) => v.id !== id))
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Module LISTE DES VOITURES</h2>
          <p className="text-muted-foreground">ZONE DE CONTENU</p>
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
              <DialogTitle>Ajouter un Véhicule</DialogTitle>
              <DialogDescription>Remplissez les informations du véhicule</DialogDescription>
            </DialogHeader>
            <VehicleForm onSubmit={handleAddVehicle} onClose={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted">
                <th className="table-header">Matricule</th>
                <th className="table-header">Marque</th>
                <th className="table-header">Prix/Jour</th>
                <th className="table-header">État</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-muted/50 transition-colors">
                  <td className="table-cell font-semibold text-primary">{vehicle.matricule}</td>
                  <td className="table-cell">{vehicle.marque}</td>
                  <td className="table-cell">{vehicle.prixJour} DH</td>
                  <td className="table-cell">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        vehicle.etat === "Disponible"
                          ? "bg-green-100 text-green-800"
                          : vehicle.etat === "Loué"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {vehicle.etat}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex gap-2">
                      <button className="action-button" title="Voir">
                        <Eye size={18} className="text-primary" />
                      </button>
                      <button className="action-button" title="Modifier">
                        <Edit2 size={18} className="text-blue-600" />
                      </button>
                      <button
                        className="action-button"
                        title="Supprimer"
                        onClick={() => handleDeleteVehicle(vehicle.id)}
                      >
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
