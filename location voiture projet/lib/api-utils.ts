// Fonctions utilitaires pour les appels API
import { API_ENDPOINTS } from "./api-config"

export async function fetchVehicles() {
  try {
    const response = await fetch(API_ENDPOINTS.vehicles.list)
    if (!response.ok) throw new Error("Erreur lors du chargement des véhicules")
    return await response.json()
  } catch (error) {
    console.error("Erreur API Véhicules:", error)
    throw error
  }
}

export async function createVehicle(data: any) {
  try {
    const response = await fetch(API_ENDPOINTS.vehicles.create, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Erreur lors de la création")
    return await response.json()
  } catch (error) {
    console.error("Erreur création véhicule:", error)
    throw error
  }
}

export async function deleteVehicle(id: string) {
  try {
    const response = await fetch(API_ENDPOINTS.vehicles.delete(id), {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Erreur lors de la suppression")
    return true
  } catch (error) {
    console.error("Erreur suppression véhicule:", error)
    throw error
  }
}

export async function fetchClients() {
  try {
    const response = await fetch(API_ENDPOINTS.clients.list)
    if (!response.ok) throw new Error("Erreur lors du chargement des clients")
    return await response.json()
  } catch (error) {
    console.error("Erreur API Clients:", error)
    throw error
  }
}

export async function createClient(data: any) {
  try {
    const response = await fetch(API_ENDPOINTS.clients.create, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Erreur lors de la création")
    return await response.json()
  } catch (error) {
    console.error("Erreur création client:", error)
    throw error
  }
}

export async function deleteClient(id: string) {
  try {
    const response = await fetch(API_ENDPOINTS.clients.delete(id), {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Erreur lors de la suppression")
    return true
  } catch (error) {
    console.error("Erreur suppression client:", error)
    throw error
  }
}

export async function fetchAgents() {
  try {
    const response = await fetch(API_ENDPOINTS.agents.list)
    if (!response.ok) throw new Error("Erreur lors du chargement des agents")
    return await response.json()
  } catch (error) {
    console.error("Erreur API Agents:", error)
    throw error
  }
}

export async function createAgent(data: any) {
  try {
    const response = await fetch(API_ENDPOINTS.agents.create, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Erreur lors de la création")
    return await response.json()
  } catch (error) {
    console.error("Erreur création agent:", error)
    throw error
  }
}

export async function fetchContracts() {
  try {
    const response = await fetch(API_ENDPOINTS.contracts.list)
    if (!response.ok) throw new Error("Erreur lors du chargement des contrats")
    return await response.json()
  } catch (error) {
    console.error("Erreur API Contrats:", error)
    throw error
  }
}

export async function createContract(data: any) {
  try {
    const response = await fetch(API_ENDPOINTS.contracts.create, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Erreur lors de la création")
    return await response.json()
  } catch (error) {
    console.error("Erreur création contrat:", error)
    throw error
  }
}

export async function fetchInvoices() {
  try {
    const response = await fetch(API_ENDPOINTS.invoices.list)
    if (!response.ok) throw new Error("Erreur lors du chargement des factures")
    return await response.json()
  } catch (error) {
    console.error("Erreur API Factures:", error)
    throw error
  }
}

export async function generateInvoicePDF(contractId: string) {
  try {
    const response = await fetch(API_ENDPOINTS.invoices.pdf(contractId))
    if (!response.ok) throw new Error("Erreur lors de la génération du PDF")
    return await response.blob()
  } catch (error) {
    console.error("Erreur génération PDF:", error)
    throw error
  }
}
