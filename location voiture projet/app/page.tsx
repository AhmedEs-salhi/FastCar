"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import VehiclesModule from "@/components/modules/vehicles-module"
import ClientsModule from "@/components/modules/clients-module"
import AgentsModule from "@/components/modules/agents-module"
import ContractsModule from "@/components/modules/contracts-module"
import InvoicesModule from "@/components/modules/invoices-module"
import SettingsModule from "@/components/modules/settings-module"

type ModuleType = "vehicles" | "clients" | "agents" | "contracts" | "invoices" | "settings"

export default function Dashboard() {
  const [activeModule, setActiveModule] = useState<ModuleType>("contracts")

  const renderModule = () => {
    switch (activeModule) {
      case "vehicles":
        return <VehiclesModule />
      case "clients":
        return <ClientsModule />
      case "agents":
        return <AgentsModule />
      case "contracts":
        return <ContractsModule />
      case "invoices":
        return <InvoicesModule />
      case "settings":
        return <SettingsModule />
      default:
        return <ContractsModule />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <main className="flex-1 overflow-auto bg-muted/30">
        <div className="p-6">{renderModule()}</div>
      </main>
    </div>
  )
}
