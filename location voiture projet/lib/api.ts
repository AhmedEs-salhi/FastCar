/**
 * API Configuration & Services for FastCar Location
 * ====================================================
 *
 * INSTRUCTIONS POUR VOTRE COLLÈGUE BACKEND (Django):
 *
 * 1. Modifiez la ligne 8 avec l'URL de votre serveur Django:
 *    const API_BASE_URL = "http://localhost:8000/api"
 *
 * 2. Assurez-vous que votre backend Django répond aux endpoints listés ci-dessous
 *
 * 3. Les données doivent être retournées en JSON avec la même structure
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// Données de fallback pour le développement local
const FALLBACK_DATA = {
  vehicles: [
    {
      id: "1",
      matricule: "AB1230D",
      marque: "Renault",
      modele: "Clio",
      prixJour: 200,
      kilometrage: 32850,
      etat: "Disponible",
    },
    {
      id: "2",
      matricule: "XY789ZT",
      marque: "Peugeot",
      modele: "308",
      prixJour: 250,
      kilometrage: 45200,
      etat: "Loué",
    },
  ],
  clients: [
    {
      id: "1",
      cin: "L876543",
      nom: "EL FADLI",
      prenom: "Karim",
      adresse: "24, Av. Hassan II, Casablanca",
      telephone: "0612345678",
      email: "karim.elfadli@gmail.com",
    },
     {
      id: "2",
      cin: "YT10839",
      nom: "Jaabari",
      prenom: "Rida",
      adresse: "21,sidi abbad , Marrakech ",
      telephone: "0649602021",
      email: "ridajaabari.18@gmail.com",
    },
  ],
  agents: [
    {
      id: "1",
      numero: "AG-205",
      nom: "BENSAID",
      prenom: "Amina",
    },
  ],
  contracts: [
    {
      id: "1",
      numero: "LOC-2025-01",
      client: "EL FADLI",
      matricule: "AB1230D",
      dateDebut: "01/04",
      dateFin: "05/04",
      montant: 1050,
    },
  ],
}

// ============== VÉHICULES ==============
export const vehiclesAPI = {
  // GET: http://localhost:8000/api/vehicles/
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/vehicles/`)
      if (!response.ok) throw new Error("Erreur backend")
      return response.json()
    } catch (error) {
      console.warn("Backend indisponible, utilisation des données locales")
      return FALLBACK_DATA.vehicles
    }
  },

  // GET: http://localhost:8000/api/vehicles/{id}/
  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/vehicles/${id}/`)
    if (!response.ok) throw new Error("Erreur lors de la récupération du véhicule")
    return response.json()
  },

  // POST: http://localhost:8000/api/vehicles/
  create: async (data: {
    matricule: string
    marque: string
    modele: string
    prixJour: number
    kilometrage: number
    etat: string
  }) => {
    const response = await fetch(`${API_BASE_URL}/vehicles/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Erreur lors de la création du véhicule")
    return response.json()
  },

  // PUT: http://localhost:8000/api/vehicles/{id}/
  update: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/vehicles/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Erreur lors de la mise à jour du véhicule")
    return response.json()
  },

  // DELETE: http://localhost:8000/api/vehicles/{id}/
  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/vehicles/${id}/`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Erreur lors de la suppression du véhicule")
  },
}

// ============== CLIENTS ==============
export const clientsAPI = {
  // GET: http://localhost:8000/api/clients/
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/clients/`)
      if (!response.ok) throw new Error("Erreur backend")
      return response.json()
    } catch (error) {
      console.warn("Backend indisponible, utilisation des données locales")
      return FALLBACK_DATA.clients
    }
  },

  // GET: http://localhost:8000/api/clients/{id}/
  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/clients/${id}/`)
    if (!response.ok) throw new Error("Erreur lors de la récupération du client")
    return response.json()
  },

  // POST: http://localhost:8000/api/clients/
  create: async (data: {
    cin: string
    nom: string
    prenom: string
    adresse: string
    telephone: string
    email: string
  }) => {
    const response = await fetch(`${API_BASE_URL}/clients/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Erreur lors de la création du client")
    return response.json()
  },

  // PUT: http://localhost:8000/api/clients/{id}/
  update: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/clients/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Erreur lors de la mise à jour du client")
    return response.json()
  },

  // DELETE: http://localhost:8000/api/clients/{id}/
  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/clients/${id}/`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Erreur lors de la suppression du client")
  },
}

// ============== AGENTS ==============
export const agentsAPI = {
  // GET: http://localhost:8000/api/agents/
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/agents/`)
      if (!response.ok) throw new Error("Erreur backend")
      return response.json()
    } catch (error) {
      console.warn("Backend indisponible, utilisation des données locales")
      return FALLBACK_DATA.agents
    }
  },

  // GET: http://localhost:8000/api/agents/{id}/
  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/agents/${id}/`)
    if (!response.ok) throw new Error("Erreur lors de la récupération de l'agent")
    return response.json()
  },

  // POST: http://localhost:8000/api/agents/
  create: async (data: {
    numero: string
    nom: string
    prenom: string
  }) => {
    const response = await fetch(`${API_BASE_URL}/agents/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Erreur lors de la création de l'agent")
    return response.json()
  },

  // PUT: http://localhost:8000/api/agents/{id}/
  update: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/agents/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Erreur lors de la mise à jour de l'agent")
    return response.json()
  },

  // DELETE: http://localhost:8000/api/agents/{id}/
  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/agents/${id}/`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Erreur lors de la suppression de l'agent")
  },
}

// ============== CONTRATS ==============
export const contractsAPI = {
  // GET: http://localhost:8000/api/contracts/
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/contracts/`)
      if (!response.ok) throw new Error("Erreur backend")
      return response.json()
    } catch (error) {
      console.warn("Backend indisponible, utilisation des données locales")
      return FALLBACK_DATA.contracts
    }
  },

  // GET: http://localhost:8000/api/contracts/{id}/
  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/contracts/${id}/`)
    if (!response.ok) throw new Error("Erreur lors de la récupération du contrat")
    return response.json()
  },

  // POST: http://localhost:8000/api/contracts/
  create: async (data: {
    numero: string
    dateDebut: string
    dateFin: string
    montant: number
    modePaiement: string
    clientId: string
    vehiculeId: string
    agentId: string
  }) => {
    const response = await fetch(`${API_BASE_URL}/contracts/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Erreur lors de la création du contrat")
    return response.json()
  },

  // PUT: http://localhost:8000/api/contracts/{id}/
  update: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/contracts/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Erreur lors de la mise à jour du contrat")
    return response.json()
  },

  // DELETE: http://localhost:8000/api/contracts/{id}/
  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/contracts/${id}/`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Erreur lors de la suppression du contrat")
  },
}

// ============== FACTURES ==============
export const invoicesAPI = {
  // GET: http://localhost:8000/api/invoices/
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/invoices/`)
      if (!response.ok) throw new Error("Erreur backend")
      return response.json()
    } catch (error) {
      console.warn("Backend indisponible, utilisation des données locales")
      return []
    }
  },

  // GET: http://localhost:8000/api/invoices/{id}/
  getById: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/invoices/${id}/`)
      if (!response.ok) throw new Error("Erreur backend")
      return response.json()
    } catch (error) {
      console.warn("Backend indisponible")
      return null
    }
  },

  // POST: http://localhost:8000/api/invoices/ (générer facture à partir d'un contrat)
  generateFromContract: async (contractId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/invoices/generate/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractId }),
      })
      if (!response.ok) throw new Error("Erreur backend")
      return response.json()
    } catch (error) {
      console.warn("Backend indisponible")
      return null
    }
  },
}
