"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SettingsModule() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Paramètres</h2>
        <p className="text-muted-foreground">Configurez l'application</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de l'Agence</CardTitle>
          <CardDescription>Détails de votre agence de location</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nom de l'agence</label>
            <Input defaultValue="FastCar Location" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Adresse</label>
            <Input defaultValue="Bd Mohammed V, Casablanca" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Téléphone</label>
              <Input defaultValue="05 22 33 44 55" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input defaultValue="info@fastcar.ma" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">RC</label>
              <Input defaultValue="123456" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Patente</label>
              <Input defaultValue="78901234" />
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary/90">Enregistrer</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>À propos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            FastCar Location v1.0 - Système de Gestion des Contrats de Location de Voitures
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            Développé pour optimiser la gestion de votre agence de location automobile.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
