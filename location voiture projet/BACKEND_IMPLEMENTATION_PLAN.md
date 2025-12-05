# Plan d'Implémentation - Backend Django
## Projet: FastCar Location - Système de Gestion de Location de Voitures

---

## 📋 TABLE DES MATIÈRES
1. Architecture Générale
2. Structure Django
3. Models de Base de Données
4. Endpoints API
5. Ordre d'Implémentation
6. Logique Métier
7. Intégration Frontend

---

## 1️⃣ ARCHITECTURE GÉNÉRALE

### Stack Technologique
- **Framework**: Django 4.2+
- **REST API**: Django REST Framework (DRF)
- **Base de Données**: MySQL/PostgreSQL
- **Authentification**: JWT (djangorestframework-simplejwt)
- **Documentation API**: Swagger/Drf-yasg
- **Environnement**: Python 3.10+

### Architecture en Couches
\`\`\`
┌─────────────────────────────────────┐
│      Frontend (React/TypeScript)     │
├─────────────────────────────────────┤
│    API REST (Django REST Framework)  │
├─────────────────────────────────────┤
│  Business Logic (Serializers, Views) │
├─────────────────────────────────────┤
│    Models (Database Layer)            │
├─────────────────────────────────────┤
│    MySQL Database                     │
└─────────────────────────────────────┘
\`\`\`

---

## 2️⃣ STRUCTURE DJANGO

### Organisation des Fichiers
\`\`\`
fastcar_backend/
├── manage.py
├── requirements.txt
├── fastcar_project/
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── core/
│   ├── migrations/
│   ├── models.py          # Tous les modèles
│   ├── serializers.py     # Sérialisateurs DRF
│   ├── views.py           # ViewSets et Views
│   ├── urls.py            # Routes API
│   ├── permissions.py     # Autorisations personnalisées
│   ├── filters.py         # Filtrage avancé
│   └── admin.py
├── api/
│   └── authentication.py  # Endpoints d'authentification
├── utils/
│   └── validators.py      # Validateurs personnalisés
└── tests/
    └── test_*.py
\`\`\`

---

## 3️⃣ MODELS DE BASE DE DONNÉES

### Diagramme ER Simplifié
\`\`\`
┌──────────────┐         ┌──────────────┐
│   CLIENTS    │◄────┐   │   AGENTS     │
├──────────────┤     │   ├──────────────┤
│ CIN (PK)     │     │   │ num_agent    │
│ nom          │     │   │ nom          │
│ prénom       │     └───│ prénom       │
│ adresse      │         └──────────────┘
│ téléphone    │
│ email        │
└──────────────┘
       │
       │ (1:N)
       │
┌──────────────────────┐      ┌────────────────┐
│  CONTRATS_LOCATION   │◄─────│   VEHICULES    │
├──────────────────────┤      ├────────────────┤
│ num_contrat (PK)     │      │ matricule (PK) │
│ date_debut           │      │ marque         │
│ date_fin             │      │ modèle         │
│ montant_total        │      │ prix_journalier│
│ mode_paiement        │      │ état           │
│ CIN_client (FK)      │      │ kilométrage    │
│ matricule_auto (FK)  │      └────────────────┘
│ num_agent (FK)       │
│ assurance            │
└──────────────────────┘
       │
       │ (1:N)
       │
┌──────────────────┐
│    FACTURES      │
├──────────────────┤
│ num_facture (PK) │
│ date_emission    │
│ num_contrat (FK) │
│ montant_total    │
│ montant_payé     │
│ statut_paiement  │
└──────────────────┘

┌──────────────────────┐
│  DEGATS_AMENDES      │
├──────────────────────┤
│ id (PK)              │
│ num_contrat (FK)     │
│ description          │
│ montant_amende       │
│ date_signalement     │
└──────────────────────┘
\`\`\`

### Models Django Détaillés

#### Model: Client
\`\`\`python
from django.db import models
from django.core.validators import RegexValidator

class Client(models.Model):
    CIN = models.CharField(
        max_length=10, 
        unique=True, 
        primary_key=True,
        validators=[RegexValidator(r'^[A-Z0-9]{8,10}$', 
                   'Format CIN invalide')]
    )
    nom = models.CharField(max_length=50)
    prénom = models.CharField(max_length=50)
    adresse = models.TextField()
    téléphone = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    date_création = models.DateTimeField(auto_now_add=True)
    date_modification = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Client"
        verbose_name_plural = "Clients"
        ordering = ['-date_création']
    
    def __str__(self):
        return f"{self.nom} {self.prénom} ({self.CIN})"
\`\`\`

#### Model: Agent
\`\`\`python
class Agent(models.Model):
    num_agent = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=50)
    prénom = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    téléphone = models.CharField(max_length=15)
    date_embauche = models.DateField()
    actif = models.BooleanField(default=True)
    date_création = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Agent"
        verbose_name_plural = "Agents"
        ordering = ['num_agent']
    
    def __str__(self):
        return f"{self.nom} {self.prénom} (Ag-{self.num_agent})"
\`\`\`

#### Model: Véhicule
\`\`\`python
class Véhicule(models.Model):
    ÉTATS_CHOICES = [
        ('disponible', 'Disponible'),
        ('louée', 'Louée'),
        ('maintenance', 'En Maintenance'),
    ]
    
    matricule = models.CharField(
        max_length=15, 
        unique=True, 
        primary_key=True
    )
    marque = models.CharField(max_length=50)
    modèle = models.CharField(max_length=50)
    année = models.IntegerField()
    prix_journalier = models.DecimalField(
        max_digits=10, 
        decimal_places=2
    )
    état = models.CharField(
        max_length=20, 
        choices=ÉTATS_CHOICES, 
        default='disponible'
    )
    kilométrage = models.IntegerField()
    kilométrage_initial = models.IntegerField()
    immatriculation = models.CharField(max_length=20, unique=True)
    couleur = models.CharField(max_length=30)
    nombre_places = models.IntegerField(default=5)
    type_carburant = models.CharField(max_length=20)
    transmission = models.CharField(max_length=20)
    date_création = models.DateTimeField(auto_now_add=True)
    date_modification = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Véhicule"
        verbose_name_plural = "Véhicules"
        ordering = ['-date_création']
    
    def __str__(self):
        return f"{self.marque} {self.modèle} ({self.matricule})"
    
    @property
    def est_disponible(self):
        return self.état == 'disponible'
\`\`\`

#### Model: Contrat de Location
\`\`\`python
class ContratLocation(models.Model):
    MODES_PAIEMENT = [
        ('espèce', 'Espèce'),
        ('carte', 'Carte Bancaire'),
        ('virement', 'Virement'),
    ]
    
    STATUTS = [
        ('en_cours', 'En Cours'),
        ('complété', 'Complété'),
        ('annulé', 'Annulé'),
    ]
    
    num_contrat = models.AutoField(primary_key=True)
    client = models.ForeignKey(
        Client, 
        on_delete=models.PROTECT,
        related_name='contrats'
    )
    véhicule = models.ForeignKey(
        Véhicule, 
        on_delete=models.PROTECT,
        related_name='locations'
    )
    agent = models.ForeignKey(
        Agent, 
        on_delete=models.PROTECT,
        related_name='contrats_gérés'
    )
    date_début = models.DateField()
    date_fin = models.DateField()
    date_récupération_réelle = models.DateField(null=True, blank=True)
    kilométrage_début = models.IntegerField()
    kilométrage_fin = models.IntegerField(null=True, blank=True)
    montant_total = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        editable=False
    )
    mode_paiement = models.CharField(
        max_length=20, 
        choices=MODES_PAIEMENT
    )
    assurance = models.BooleanField(default=False)
    montant_assurance = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        default=0
    )
    statut = models.CharField(
        max_length=20, 
        choices=STATUTS, 
        default='en_cours'
    )
    notes = models.TextField(blank=True)
    date_création = models.DateTimeField(auto_now_add=True)
    date_modification = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Contrat de Location"
        verbose_name_plural = "Contrats de Location"
        ordering = ['-date_création']
    
    def __str__(self):
        return f"Contrat #{self.num_contrat} - {self.client}"
    
    def save(self, *args, **kwargs):
        # Calcul automatique du montant total
        self.montant_total = self.calculer_montant_total()
        super().save(*args, **kwargs)
        # Mettre à jour l'état du véhicule
        self.véhicule.état = 'louée'
        self.véhicule.save()
    
    def calculer_montant_total(self):
        """Calcule le montant total de la location"""
        jours = (self.date_fin - self.date_début).days
        montant = self.véhicule.prix_journalier * max(jours, 1)
        if self.assurance:
            montant += self.montant_assurance
        return montant
    
    def terminer_location(self, kilométrage_fin):
        """Termine la location et retourne le véhicule"""
        self.kilométrage_fin = kilométrage_fin
        self.date_récupération_réelle = timezone.now().date()
        self.statut = 'complété'
        self.véhicule.kilométrage = kilométrage_fin
        self.véhicule.état = 'disponible'
        self.véhicule.save()
        self.save()
\`\`\`

#### Model: Facture
\`\`\`python
class Facture(models.Model):
    STATUTS_PAIEMENT = [
        ('non_payée', 'Non Payée'),
        ('partiellement_payée', 'Partiellement Payée'),
        ('payée', 'Payée'),
    ]
    
    num_facture = models.AutoField(primary_key=True)
    contrat = models.OneToOneField(
        ContratLocation, 
        on_delete=models.PROTECT,
        related_name='facture'
    )
    date_émission = models.DateTimeField(auto_now_add=True)
    date_échéance = models.DateField()
    montant_total = models.DecimalField(max_digits=10, decimal_places=2)
    montant_payé = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        default=0
    )
    statut_paiement = models.CharField(
        max_length=30, 
        choices=STATUTS_PAIEMENT, 
        default='non_payée'
    )
    notes = models.TextField(blank=True)
    
    class Meta:
        verbose_name = "Facture"
        verbose_name_plural = "Factures"
        ordering = ['-date_émission']
    
    def __str__(self):
        return f"Facture #{self.num_facture} - {self.contrat.client}"
    
    @property
    def montant_dû(self):
        return self.montant_total - self.montant_payé
    
    def effectuer_paiement(self, montant):
        """Enregistre un paiement partiel ou total"""
        self.montant_payé += montant
        if self.montant_payé >= self.montant_total:
            self.statut_paiement = 'payée'
        else:
            self.statut_paiement = 'partiellement_payée'
        self.save()
\`\`\`

#### Model: Dégâts/Amendes
\`\`\`python
class DégâtAmende(models.Model):
    id = models.AutoField(primary_key=True)
    contrat = models.ForeignKey(
        ContratLocation, 
        on_delete=models.CASCADE,
        related_name='dégâts'
    )
    description = models.TextField()
    montant_amende = models.DecimalField(max_digits=10, decimal_places=2)
    date_signalement = models.DateTimeField(auto_now_add=True)
    photo_dégât = models.ImageField(
        upload_to='dégâts/', 
        null=True, 
        blank=True
    )
    
    class Meta:
        verbose_name = "Dégât/Amende"
        verbose_name_plural = "Dégâts/Amendes"
    
    def __str__(self):
        return f"Dégât - Contrat #{self.contrat.num_contrat}"
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Mettre à jour le montant du contrat
        facture = self.contrat.facture
        facture.montant_total += self.montant_amende
        facture.save()
\`\`\`

---

## 4️⃣ ENDPOINTS API REST

### Base URL: `/api/v1/`

#### 1. AUTHENTIFICATION

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/register/` | Inscription agent |
| POST | `/auth/login/` | Connexion agent |
| POST | `/auth/logout/` | Déconnexion |
| POST | `/auth/refresh/` | Rafraîchir token |
| POST | `/auth/change-password/` | Changer mot de passe |

**Exemple: POST /api/v1/auth/login/**
\`\`\`json
{
  "email": "agent@fastcar.com",
  "password": "password123"
}

Response:
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "num_agent": 1,
    "nom": "Dupont",
    "prénom": "Jean"
  }
}
\`\`\`

#### 2. GESTION DES CLIENTS

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/clients/` | Lister tous les clients |
| POST | `/clients/` | Créer un nouveau client |
| GET | `/clients/{CIN}/` | Récupérer détails client |
| PUT | `/clients/{CIN}/` | Mettre à jour client |
| DELETE | `/clients/{CIN}/` | Supprimer client |
| GET | `/clients/{CIN}/contrats/` | Historique locations client |
| GET | `/clients/search/?q=terme` | Rechercher client |

**Exemple: POST /api/v1/clients/**
\`\`\`json
{
  "CIN": "AB123456",
  "nom": "Alami",
  "prénom": "Mohamed",
  "adresse": "123 Rue de Marrakech",
  "téléphone": "+212612345678",
  "email": "alami@email.com"
}
\`\`\`

#### 3. GESTION DES VÉHICULES

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/véhicules/` | Lister tous véhicules |
| POST | `/véhicules/` | Ajouter nouveau véhicule |
| GET | `/véhicules/{matricule}/` | Détails véhicule |
| PUT | `/véhicules/{matricule}/` | Mettre à jour véhicule |
| DELETE | `/véhicules/{matricule}/` | Supprimer véhicule |
| GET | `/véhicules/disponibles/` | Lister véhicules disponibles |
| GET | `/véhicules/search/?marque=X&modèle=Y` | Recherche avancée |
| GET | `/véhicules/{matricule}/historique/` | Historique locations |

**Exemple: GET /api/v1/véhicules/disponibles/**
\`\`\`json
[
  {
    "matricule": "MAR-2024-001",
    "marque": "Toyota",
    "modèle": "Corolla",
    "année": 2024,
    "prix_journalier": 50.00,
    "état": "disponible",
    "kilométrage": 15000
  }
]
\`\`\`

#### 4. GESTION DES CONTRATS DE LOCATION

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/contrats/` | Lister tous contrats |
| POST | `/contrats/` | Créer nouveau contrat |
| GET | `/contrats/{num_contrat}/` | Détails contrat |
| PUT | `/contrats/{num_contrat}/` | Mettre à jour contrat |
| DELETE | `/contrats/{num_contrat}/` | Annuler contrat |
| POST | `/contrats/{num_contrat}/terminer/` | Terminer location |
| GET | `/contrats/client/{CIN}/` | Contrats d'un client |
| GET | `/contrats/recherche/?date_début=X&date_fin=Y` | Recherche par dates |
| GET | `/contrats/actifs/` | Locations en cours |

**Exemple: POST /api/v1/contrats/**
\`\`\`json
{
  "client": "AB123456",
  "véhicule": "MAR-2024-001",
  "agent": 1,
  "date_début": "2024-12-05",
  "date_fin": "2024-12-10",
  "kilométrage_début": 15000,
  "mode_paiement": "carte",
  "assurance": true,
  "montant_assurance": 50.00
}

Response:
{
  "num_contrat": 1,
  "montant_total": 300.00,
  "statut": "en_cours",
  "date_création": "2024-12-04T10:30:00Z"
}
\`\`\`

**Exemple: POST /api/v1/contrats/1/terminer/**
\`\`\`json
{
  "kilométrage_fin": 15250
}

Response:
{
  "statut": "complété",
  "kilométrage_final": 15250,
  "facture_créée": true
}
\`\`\`

#### 5. GESTION DES FACTURES

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/factures/` | Lister factures |
| POST | `/factures/` | Créer facture (auto via contrat) |
| GET | `/factures/{num_facture}/` | Détails facture |
| PUT | `/factures/{num_facture}/` | Mettre à jour |
| POST | `/factures/{num_facture}/paiement/` | Enregistrer paiement |
| GET | `/factures/client/{CIN}/` | Factures client |
| GET | `/factures/statistiques/` | Statistiques paiements |

**Exemple: POST /api/v1/factures/1/paiement/**
\`\`\`json
{
  "montant": 150.00,
  "date_paiement": "2024-12-04",
  "mode_paiement": "carte"
}

Response:
{
  "montant_payé": 150.00,
  "montant_dû": 150.00,
  "statut_paiement": "partiellement_payée"
}
\`\`\`

#### 6. GESTION DES DÉGÂTS/AMENDES

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/dégâts/` | Lister dégâts |
| POST | `/dégâts/` | Signaler dégât |
| GET | `/dégâts/{id}/` | Détails dégât |
| PUT | `/dégâts/{id}/` | Mettre à jour |
| DELETE | `/dégâts/{id}/` | Supprimer |
| GET | `/dégâts/contrat/{num_contrat}/` | Dégâts d'un contrat |

**Exemple: POST /api/v1/dégâts/**
\`\`\`json
{
  "contrat": 1,
  "description": "Rayure sur le côté avant droit",
  "montant_amende": 200.00
}
\`\`\`

#### 7. GESTION DES AGENTS (Admin)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/agents/` | Lister agents |
| POST | `/agents/` | Créer agent |
| GET | `/agents/{num_agent}/` | Détails agent |
| PUT | `/agents/{num_agent}/` | Mettre à jour |
| GET | `/agents/{num_agent}/statistiques/` | Stats agent |

#### 8. RECHERCHE ET FILTRAGE

**Filtres disponibles pour les véhicules:**
\`\`\`
GET /api/v1/véhicules/?marque=Toyota&prix_max=100&état=disponible&année_min=2023
\`\`\`

**Filtres disponibles pour les contrats:**
\`\`\`
GET /api/v1/contrats/?date_début_depuis=2024-01-01&client=AB123456&statut=en_cours
\`\`\`

#### 9. PAGINATION

Tous les endpoints list supportent:
\`\`\`
GET /api/v1/clients/?page=1&page_size=20
\`\`\`

#### 10. STATISTIQUES ET RAPPORTS

| Endpoint | Description |
|----------|-------------|
| GET `/statistiques/revenus/?depuis=2024-01-01&jusqu_à=2024-12-31` | Revenus période |
| GET `/statistiques/locations-par-agent/` | Locations par agent |
| GET `/statistiques/véhicules-populaires/` | Top véhicules loués |
| GET `/statistiques/clients-fidèles/` | Meilleurs clients |

---

## 5️⃣ ORDRE D'IMPLÉMENTATION (Phase par Phase)

### PHASE 1: Configuration et Authentification (Semaine 1)
**Dépendances: Frontend**
- [ ] Setup Django + DRF + MySQL
- [ ] Configurer settings.py (DB, CORS, JWT)
- [ ] Créer app `core`
- [ ] Implémenter modèles: `Agent`
- [ ] Endpoints d'authentification
- [ ] Tests authentification

### PHASE 2: Gestion des Clients (Semaine 1-2)
**Dépendances: Phase 1**
- [ ] Model `Client`
- [ ] Sérializeurs Client
- [ ] ViewSet Client (CRUD complet)
- [ ] Filtres et recherche
- [ ] Tests endpoints

### PHASE 3: Gestion des Véhicules (Semaine 2)
**Dépendances: Phase 1**
- [ ] Model `Véhicule`
- [ ] Sérializeurs Véhicule
- [ ] ViewSet Véhicule (CRUD complet)
- [ ] Endpoint "disponibles"
- [ ] Filtres avancés
- [ ] Tests endpoints

### PHASE 4: Gestion des Contrats (Semaine 3)
**Dépendances: Phase 2, 3**
- [ ] Model `ContratLocation`
- [ ] Sérializeurs Contrat
- [ ] Logique métier (calcul montant, validation dates)
- [ ] ViewSet Contrat
- [ ] Endpoint "terminer location"
- [ ] Vérifications (véhicule disponible, dates valides)
- [ ] Tests complets

### PHASE 5: Gestion des Factures (Semaine 4)
**Dépendances: Phase 4**
- [ ] Model `Facture`
- [ ] Création auto facture après contrat
- [ ] Sérializeurs Facture
- [ ] ViewSet Facture
- [ ] Endpoint paiement
- [ ] Calcul montant dû
- [ ] Tests

### PHASE 6: Dégâts et Amendes (Semaine 4)
**Dépendances: Phase 4, 5**
- [ ] Model `DégâtAmende`
- [ ] Sérializeurs
- [ ] ViewSet
- [ ] Upload images
- [ ] Mise à jour facture automatique
- [ ] Tests

### PHASE 7: Rapports et Statistiques (Semaine 5)
**Dépendances: Phase 4, 5, 6**
- [ ] Endpoints statistiques
- [ ] Rapports revenus
- [ ] Analyses perfor agents
- [ ] Graphiques données

### PHASE 8: Déploiement et Documentation (Semaine 5)
**Dépendances: Toutes phases**
- [ ] Documentation Swagger
- [ ] Tests couverture 80%+
- [ ] Optimisations perfor
- [ ] Setup déploiement

---

## 6️⃣ LOGIQUE MÉTIER COMPLEXE

### 1. Validation de Création de Contrat
\`\`\`python
def valider_creation_contrat(client_cin, matricule_véhicule, date_début, date_fin):
    """
    Règles à vérifier:
    1. Véhicule doit être disponible
    2. Dates doivent être cohérentes (fin > début)
    3. Client ne peut avoir 2 contrats chevauchants
    4. Récupérer automatiquement les prix
    """
    # Vérifier véhicule
    auto = Véhicule.objects.get(matricule=matricule_véhicule)
    if auto.état != 'disponible':
        raise ValidationError("Véhicule non disponible")
    
    # Vérifier dates
    if date_fin <= date_début:
        raise ValidationError("Dates invalides")
    
    # Vérifier chevauchement
    contrats_chevauchants = ContratLocation.objects.filter(
        client_id=client_cin,
        statut='en_cours',
        date_début__lt=date_fin,
        date_fin__gt=date_début
    )
    if contrats_chevauchants.exists():
        raise ValidationError("Client a déjà une location chevauchante")
    
    return True
\`\`\`

### 2. Calcul Montant Total
\`\`\`python
def calculer_montant_location(matricule, date_début, date_fin, assurance=False):
    """
    Formule:
    montant = (nombre_jours * prix_journalier) + assurance
    """
    auto = Véhicule.objects.get(matricule=matricule)
    jours = (date_fin - date_début).days
    montant = auto.prix_journalier * max(jours, 1)
    
    if assurance:
        montant += 50  # Exemple: 50 par jour
    
    return montant
\`\`\`

### 3. Terminer une Location
\`\`\`python
def terminer_location(num_contrat, kilométrage_fin):
    """
    Étapes:
    1. Valider kilométrage
    2. Calculer suppléments (km supplémentaires)
    3. Créer facture
    4. Marquer véhicule comme disponible
    5. Enregistrer historique
    """
    contrat = ContratLocation.objects.get(num_contrat=num_contrat)
    
    # Validation
    if contrat.statut != 'en_cours':
        raise ValidationError("Contrat ne peut pas être terminé")
    
    # Vérifier km
    if kilométrage_fin < contrat.kilométrage_début:
        raise ValidationError("Kilométrage invalide")
    
    # Calculer suppléments éventuels
    km_supplémentaires = max(0, kilométrage_fin - (
        contrat.kilométrage_début + 200  # Exemple: 200km inclus
    ))
    supplément_km = km_supplémentaires * 0.5  # 0.50 par km
    
    # Mettre à jour contrat
    contrat.kilométrage_fin = kilométrage_fin
    contrat.statut = 'complété'
    contrat.date_récupération_réelle = timezone.now().date()
    
    # Mettre à jour véhicule
    contrat.véhicule.kilométrage = kilométrage_fin
    contrat.véhicule.état = 'disponible'
    contrat.véhicule.save()
    
    contrat.save()
    
    # Créer ou mettre à jour facture
    facture, created = Facture.objects.get_or_create(contrat=contrat)
    facture.montant_total += supplément_km
    facture.save()
    
    return {
        'contrat': num_contrat,
        'km_supplémentaires': km_supplémentaires,
        'supplément_km': supplément_km,
        'montant_total_facture': facture.montant_total
    }
\`\`\`

### 4. Système d'Alertes
\`\`\`python
def vérifier_véhicules_maintenance():
    """
    Alerter si:
    - Kilométrage > 100,000 km
    - Pas de location depuis 30 jours
    - Plus de 2 dégâts signalés
    """
    pass

def vérifier_paiements_factures():
    """
    Alerter si:
    - Facture > 15 jours non payée
    - Client avait defaults précédents
    """
    pass
\`\`\`

---

## 7️⃣ GUIDE D'INTÉGRATION FRONTEND

### Flux de Données Frontend ↔ Backend

#### 1. Créer une Réservation
\`\`\`javascript
// Frontend React
const creerReservation = async (données) => {
  const response = await fetch('/api/v1/contrats/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      client: données.clientCIN,
      véhicule: données.vehiculeMatricule,
      date_début: données.dateDebut,
      date_fin: données.dateFin,
      kilométrage_début: données.kilomedrageDebut,
      mode_paiement: données.modePaiement,
      assurance: données.assurance
    })
  });
  
  const contrat = await response.json();
  return contrat; // Contient num_contrat, montant_total, etc.
};
\`\`\`

#### 2. Rechercher Véhicules Disponibles
\`\`\`javascript
const rechercherVehicules = async (filters) => {
  const params = new URLSearchParams({
    marque: filters.marque || '',
    prix_max: filters.prixMax || '',
    état: 'disponible'
  });
  
  const response = await fetch(`/api/v1/véhicules/?${params}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  return response.json();
};
\`\`\`

#### 3. Enregistrer un Paiement
\`\`\`javascript
const effectuerPaiement = async (numFacture, montant) => {
  const response = await fetch(`/api/v1/factures/${numFacture}/paiement/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ montant })
  });
  
  return response.json();
};
\`\`\`

---

## 8️⃣ CONFIGURATION DJANGO

### settings.py - Configuration Essentielle
\`\`\`python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'django_filters',
    'drf_yasg',
    'core',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # ...
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'fastcar_db',
        'USER': 'root',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
\`\`\`

### requirements.txt
\`\`\`
Django==4.2.7
djangorestframework==3.14.0
djangorestframework-simplejwt==5.3.2
django-cors-headers==4.3.1
django-filter==23.5
drf-yasg==1.21.7
PyMySQL==1.1.0
Pillow==10.1.0
python-dotenv==1.0.0
\`\`\`

---

## 9️⃣ POINTS CLÉS DE SÉCURITÉ

✅ **À implémenter:**
- Authentification JWT pour tous les endpoints
- Permissions basées sur les rôles (Admin, Agent)
- Validation des entrées utilisateur
- Rate limiting pour API
- HTTPS en production
- Chiffrement des données sensibles
- Logs d'audit pour modifications

✅ **Recommandations:**
- Utiliser env variables pour secrets
- Implémenter CSRF protection
- SQL injection prevention (Django ORM)
- Limiter les uploads fichiers

---

## 🔟 TESTS UNITAIRES

### Exemple Test: Création Contrat
\`\`\`python
from django.test import TestCase
from core.models import Client, Véhicule, Agent, ContratLocation

class ContratLocationTestCase(TestCase):
    def setUp(self):
        self.client_obj = Client.objects.create(
            CIN='AB123456',
            nom='Test',
            prénom='Client',
            email='test@test.com',
            téléphone='0612345678',
            adresse='Test'
        )
        self.véhicule = Véhicule.objects.create(
            matricule='MAR-2024-001',
            marque='Toyota',
            modèle='Corolla',
            prix_journalier=50.00,
            état='disponible',
            kilométrage=0
        )
        self.agent = Agent.objects.create(
            nom='Agent',
            prénom='Test',
            email='agent@test.com'
        )
    
    def test_creer_contrat_valide(self):
        from datetime import date, timedelta
        
        contrat = ContratLocation.objects.create(
            client=self.client_obj,
            véhicule=self.véhicule,
            agent=self.agent,
            date_début=date.today(),
            date_fin=date.today() + timedelta(days=5),
            kilométrage_début=0,
            mode_paiement='carte'
        )
        
        self.assertEqual(contrat.montant_total, 250.00)  # 5 jours * 50
        self.assertEqual(self.véhicule.état, 'louée')
\`\`\`

---

## ⚡ OPTIMISATIONS RECOMMANDÉES

1. **Indexation BD:** Indexer CIN, matricule, email
2. **Caching:** Utiliser Redis pour véhicules disponibles
3. **Pagination:** Implémenter pagination pour gros résultats
4. **Queries:** Utiliser select_related() et prefetch_related()
5. **Compression:** Gzip responses
6. **CDN:** Servir images depuis CDN

---

## 📞 POINTS DE SYNCHRONISATION FRONTEND-BACKEND

| Élément | Frontend | Backend |
|---------|----------|---------|
| Authentification | Stockage JWT | Validation JWT |
| Formats Dates | ISO 8601 | ISO 8601 |
| Erreurs | Affichage messages | Codes erreur HTTP |
| Pagination | Page+size | DRF pagination |
| Filtres | Query params | DjangoFilter |
| Upload images | FormData | Pillow |
| Devises | € EUR | Decimal DB |

---

## 🎯 CHECKLIST FINAL

- [ ] Tous models implémentés
- [ ] API endpoints testés
- [ ] Authentification sécurisée
- [ ] Validations métier complètes
- [ ] Documentation API (Swagger)
- [ ] Tests unitaires (80%+)
- [ ] Logs d'audit
- [ ] Performance optimisée
- [ ] CORS configuré correctement
- [ ] Deployment ready

---

**Créé pour le projet FastCar Location**
**Équipe: Frontend (React) + Backend (Django)**
**Date: Décembre 2024**
