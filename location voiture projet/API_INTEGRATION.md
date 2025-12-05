# Guide d'Intégration API - FastCar Location

## Instructions pour votre collègue Backend (Django)

### 1. Configuration de l'URL du Backend

Modifiez le fichier `lib/api.ts` ligne 7:

\`\`\`typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
\`\`\`

Ou créez un fichier `.env.local` à la racine du projet:

\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:8000/api
\`\`\`

### 2. Endpoints Requis du Backend Django

Votre collègue doit créer ces endpoints REST API dans Django:

#### VÉHICULES
- `GET /api/vehicles/` - Liste tous les véhicules
- `GET /api/vehicles/{id}/` - Récupère un véhicule spécifique
- `POST /api/vehicles/` - Crée un nouveau véhicule
- `PUT /api/vehicles/{id}/` - Modifie un véhicule
- `DELETE /api/vehicles/{id}/` - Supprime un véhicule

#### CLIENTS
- `GET /api/clients/` - Liste tous les clients
- `GET /api/clients/{id}/` - Récupère un client spécifique
- `POST /api/clients/` - Crée un nouveau client
- `PUT /api/clients/{id}/` - Modifie un client
- `DELETE /api/clients/{id}/` - Supprime un client

#### AGENTS
- `GET /api/agents/` - Liste tous les agents
- `GET /api/agents/{id}/` - Récupère un agent spécifique
- `POST /api/agents/` - Crée un nouvel agent
- `PUT /api/agents/{id}/` - Modifie un agent
- `DELETE /api/agents/{id}/` - Supprime un agent

#### CONTRATS
- `GET /api/contracts/` - Liste tous les contrats
- `GET /api/contracts/{id}/` - Récupère un contrat spécifique
- `POST /api/contracts/` - Crée un nouveau contrat
- `PUT /api/contracts/{id}/` - Modifie un contrat
- `DELETE /api/contracts/{id}/` - Supprime un contrat

#### FACTURES
- `GET /api/invoices/` - Liste toutes les factures
- `GET /api/invoices/{id}/` - Récupère une facture spécifique
- `POST /api/invoices/generate/` - Génère une facture à partir d'un contrat

### 3. Format des Données

Le backend doit retourner les données dans les formats suivants:

**Véhicule:**
\`\`\`json
{
  "id": "1",
  "matricule": "AB1230D",
  "marque": "Renault",
  "modele": "Clio",
  "prixJour": 200,
  "kilometrage": 32850,
  "etat": "Disponible"
}
\`\`\`

**Client:**
\`\`\`json
{
  "id": "1",
  "cin": "L876543",
  "nom": "EL FADLI",
  "prenom": "Karim",
  "adresse": "24, Av. Hassan II, Casablanca",
  "telephone": "0612345678",
  "email": "karim.elfadli@gmail.com"
}
\`\`\`

**Agent:**
\`\`\`json
{
  "id": "1",
  "numero": "AG-205",
  "nom": "BENSAID",
  "prenom": "Amina"
}
\`\`\`

**Contrat:**
\`\`\`json
{
  "id": "1",
  "numero": "LOC-2025-01",
  "dateDebut": "01/04",
  "dateFin": "05/04",
  "montant": 1050,
  "modePaiement": "Espèces",
  "clientId": "1",
  "vehiculeId": "1",
  "agentId": "1"
}
\`\`\`

### 4. Configuration CORS

Pour que le frontend puisse communiquer avec le backend Django, configurez CORS dans Django:

\`\`\`python
# settings.py
INSTALLED_APPS = [
    # ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Frontend React
    "http://127.0.0.1:3000",
]
\`\`\`

### 5. Gestion des Erreurs

Votre backend doit retourner les codes HTTP appropriés:
- `200` - Succès
- `201` - Créé avec succès
- `400` - Erreur de validation
- `404` - Non trouvé
- `500` - Erreur serveur

### 6. Points d'Intégration dans le Code Frontend

Tous les appels API sont centralisés dans `lib/api.ts`:

- **Véhicules Module**: `components/modules/vehicles-module.tsx`
  - `vehiclesAPI.getAll()` - Ligne ~40
  - `vehiclesAPI.create()` - Ligne ~60
  - `vehiclesAPI.delete()` - Ligne ~70

- **Clients Module**: `components/modules/clients-module.tsx`
  - `clientsAPI.getAll()` - Ligne ~40
  - `clientsAPI.create()` - Ligne ~60
  - `clientsAPI.delete()` - Ligne ~70

- **Contrats Module**: `components/modules/contracts-module.tsx`
  - `contractsAPI.getAll()` - Ligne ~40
  - `contractsAPI.create()` - Ligne ~60
  - `contractsAPI.delete()` - Ligne ~70
