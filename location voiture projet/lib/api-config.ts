// Configuration centralisée pour les URLs de l'API Django
// Votre collègue DOIT modifier cette URL selon son backend Django

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// Points d'accès aux endpoints Django
export const API_ENDPOINTS = {
  // ===== VÉHICULES =====
  vehicles: {
    list: `${API_BASE_URL}/vehicles/`,
    create: `${API_BASE_URL}/vehicles/`,
    detail: (id: string) => `${API_BASE_URL}/vehicles/${id}/`,
    update: (id: string) => `${API_BASE_URL}/vehicles/${id}/`,
    delete: (id: string) => `${API_BASE_URL}/vehicles/${id}/`,
    search: `${API_BASE_URL}/vehicles/search/`,
  },

  // ===== CLIENTS =====
  clients: {
    list: `${API_BASE_URL}/clients/`,
    create: `${API_BASE_URL}/clients/`,
    detail: (id: string) => `${API_BASE_URL}/clients/${id}/`,
    update: (id: string) => `${API_BASE_URL}/clients/${id}/`,
    delete: (id: string) => `${API_BASE_URL}/clients/${id}/`,
    search: `${API_BASE_URL}/clients/search/`,
    searchByCin: (cin: string) => `${API_BASE_URL}/clients/search/?cin=${cin}`,
  },

  // ===== AGENTS =====
  agents: {
    list: `${API_BASE_URL}/agents/`,
    create: `${API_BASE_URL}/agents/`,
    detail: (id: string) => `${API_BASE_URL}/agents/${id}/`,
    update: (id: string) => `${API_BASE_URL}/agents/${id}/`,
    delete: (id: string) => `${API_BASE_URL}/agents/${id}/`,
    search: `${API_BASE_URL}/agents/search/`,
  },

  // ===== CONTRATS =====
  contracts: {
    list: `${API_BASE_URL}/contracts/`,
    create: `${API_BASE_URL}/contracts/`,
    detail: (id: string) => `${API_BASE_URL}/contracts/${id}/`,
    update: (id: string) => `${API_BASE_URL}/contracts/${id}/`,
    delete: (id: string) => `${API_BASE_URL}/contracts/${id}/`,
    search: `${API_BASE_URL}/contracts/search/`,
  },

  // ===== FACTURES =====
  invoices: {
    list: `${API_BASE_URL}/invoices/`,
    detail: (id: string) => `${API_BASE_URL}/invoices/${id}/`,
    generate: `${API_BASE_URL}/invoices/generate/`,
    pdf: (id: string) => `${API_BASE_URL}/invoices/${id}/pdf/`,
  },
}

export default API_BASE_URL
