# Guide d'Intégration Frontend-Backend

## Configuration de l'URL du Backend Django

### Pour votre collègue backend:

Voici comment configurer l'URL du backend dans le projet React:

### Option 1: Variable d'Environnement (RECOMMANDÉ)

1. Créez un fichier `.env.local` à la racine du projet:

\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:8000/api
\`\`\`

2. En production, utilisez:
\`\`\`
NEXT_PUBLIC_API_URL=https://votre-backend.com/api
\`\`\`

### Option 2: Modification Directe (Développement)

Si vous modifiez directement le fichier `lib/api-config.ts` ligne 4:

\`\`\`typescript
// AVANT:
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// APRÈS (par exemple):
const API_BASE_URL = "http://192.168.1.100:8000/api" // Adresse IP de votre collègue
\`\`\`

---

## Endpoints API Utilisés

Le frontend utilise ces endpoints Django. Votre collègue DOIT créer:

### Véhicules
- `GET /api/vehicles/` - Liste tous les véhicules
- `POST /api/vehicles/` - Crée un véhicule
- `GET /api/vehicles/{id}/` - Détails d'un véhicule
- `PUT /api/vehicles/{id}/` - Met à jour un véhicule
- `DELETE /api/vehicles/{id}/` - Supprime un véhicule
- `GET /api/vehicles/search/` - Recherche des véhicules

### Clients
- `GET /api/clients/` - Liste tous les clients
- `POST /api/clients/` - Crée un client
- `GET /api/clients/{id}/` - Détails d'un client
- `PUT /api/clients/{id}/` - Met à jour un client
- `DELETE /api/clients/{id}/` - Supprime un client
- `GET /api/clients/search/` - Recherche des clients

### Agents
- `GET /api/agents/` - Liste tous les agents
- `POST /api/agents/` - Crée un agent
- `GET /api/agents/{id}/` - Détails d'un agent
- `PUT /api/agents/{id}/` - Met à jour un agent
- `DELETE /api/agents/{id}/` - Supprime un agent

### Contrats
- `GET /api/contracts/` - Liste tous les contrats
- `POST /api/contracts/` - Crée un contrat
- `GET /api/contracts/{id}/` - Détails d'un contrat
- `DELETE /api/contracts/{id}/` - Supprime un contrat

### Factures
- `GET /api/invoices/` - Liste toutes les factures
- `GET /api/invoices/{id}/` - Détails d'une facture
- `GET /api/invoices/{id}/pdf/` - Génère un PDF de la facture

---

## Fichiers à Modifier pour l'Intégration

### 1. `lib/api-config.ts` (Ligne 4)
\`\`\`typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
\`\`\`

Remplacer `"http://localhost:8000/api"` par l'URL réelle du backend.

---

### 2. Modules à Mettre à Jour

#### `components/modules/vehicles-module.tsx`
- Ligne 47-54: Remplacer les données mock par `fetchVehicles()`
- Ligne 60: Remplacer `handleAddVehicle` pour utiliser `createVehicle()`
- Ligne 64: Remplacer `handleDeleteVehicle` pour utiliser `deleteVehicle()`

#### `components/modules/clients-module.tsx`
- Ligne 35-42: Remplacer les données mock par `fetchClients()`
- Ligne 52: Remplacer `handleAddClient` pour utiliser `createClient()`
- Ligne 56: Remplacer `handleDeleteClient` pour utiliser `deleteClient()`

#### `components/modules/contracts-module.tsx`
- Ligne 36-50: Remplacer les données mock par `fetchContracts()`
- Ligne 62: Remplacer `handleAddContract` pour utiliser `createContract()`
- Ligne 66: Remplacer `handleDeleteContract` pour utiliser `deleteContract()`

#### `components/modules/agents-module.tsx`
- Remplacer les données mock par `fetchAgents()`
- Remplacer les handlers pour utiliser `createAgent()` et `deleteAgent()`

#### `components/modules/invoices-module.tsx`
- Remplacer les données mock par `fetchInvoices()`
- Utiliser `generateInvoicePDF()` pour la génération des factures

---

## Format des Données Attendues

### Client
\`\`\`json
{
  "id": 1,
  "cin": "L876543",
  "nom": "EL FADLI",
  "prenom": "Karim",
  "adresse": "24, Av. Hassan II, Casablanca",
  "telephone": "0612345678",
  "email": "karim.elfadli@gmail.com"
}
\`\`\`

### Véhicule
\`\`\`json
{
  "id": 1,
  "matricule": "AB1230D",
  "marque": "Renault",
  "modele": "Clio",
  "prixJour": 200,
  "kilometrage": 32850,
  "etat": "Disponible"
}
\`\`\`

### Agent
\`\`\`json
{
  "id": 1,
  "numero": "AG-205",
  "nom": "BENSAID",
  "prenom": "Amina"
}
\`\`\`

### Contrat
\`\`\`json
{
  "id": 1,
  "numero": "LOC-2025-01",
  "client": "EL FADLI",
  "matricule": "AB1230D",
  "dateDebut": "01/04",
  "dateFin": "05/04",
  "montant": 1050
}
\`\`\`

---

## Dépannage

Si vous voyez une erreur CORS, votre collègue backend doit ajouter dans Django:

\`\`\`python
# settings.py
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:8000",
]
\`\`\`

---

## Contact

Pour toute question sur l'intégration frontend-backend, consultez ce guide.
