"use client"

import { Car, Users, FileText, Settings, Wrench, User } from "lucide-react"

interface SidebarProps {
  activeModule: string
  setActiveModule: (module: any) => void
}

export default function Sidebar({ activeModule, setActiveModule }: SidebarProps) {
  const menuItems = [
    { id: "vehicles", label: "Gérer les Véhicules", icon: Car },
    { id: "clients", label: "Gérer les Clients", icon: Users },
    { id: "agents", label: "Gérer les Agents", icon: User },
    { id: "contracts", label: "Gérer les Contrats", icon: FileText },
    { id: "invoices", label: "Imprimer une Facture", icon: Wrench },
    { id: "settings", label: "Paramètres", icon: Settings },
  ]

  return (
    <aside className="w-64 bg-card border-r border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-primary">FastCar</h1>
        <p className="text-sm text-muted-foreground">Location - Gestion Centrale</p>
      </div>

      <nav className="p-4 space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-2">MENU PRINCIPAL</p>
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeModule === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full sidebar-nav-item ${isActive ? "active" : ""}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="absolute bottom-6 left-4 right-4 border-t border-border pt-6">
        <div className="text-xs text-muted-foreground space-y-1">
          <p className="font-semibold">Siège social :</p>
          <p>Bd Mohammed V, Casablanca</p>
          <p className="mt-2">Tel : 05 22 33 44 55</p>
          <p>RC : 123456</p>
          <p>Patente : 78901234</p>
        </div>
      </div>
    </aside>
  )
}
