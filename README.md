# API REST MongoDB Atlas

## 📋 Présentation du projet

Cette API REST permet d'accéder aux données d'une plateforme de films, en exposant des collections MongoDB Atlas via des endpoints standardisés.

## 🔗 Liens importants

- API en production : https://votre-api.vercel.app
- Documentation Swagger : https://votre-api.vercel.app/api-doc
- Dépôt GitHub : https://github.com/votre-username/votre-repo


## 🛠️ Technologies utilisées

- Framework : Next.js (App Router + API Routes)
- Base de données : MongoDB Atlas (cluster cloud, base sample_mflix)
- Client MongoDB : mongodb (driver officiel Node.js)
- Hébergement : Vercel
- Documentation API : Swagger UI React


## 🚀 Installation et démarrage

### Prérequis :

- Node.js (v18 ou supérieur)
- Compte MongoDB Atlas avec la base sample_mflix importé
- Compte GitHub et Vercel (pour le déploiement)

### Installation locale
1. Cloner le dépôt

git clone https://github.com/votre-username/votre-repo.git
cd votre-repo

2. Installer les dépendances

npm install

3. Configurer les variables d'environnement
- Créer un fichier .env.local à la racine du projet
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database> retryWrites=true&w=majority

4. Lancer le serveur de développement

npm run dev

5. Accéder à l'application

- API : http://localhost:3000/api/movies
- Documentation Swagger : http://localhost:3000/api-doc

## 📚 Documentation des endpoints

**Films (Movies)**

Méthode	Endpoint	Description

GET	/api/movies	_Récupérer tous les films_

GET	/api/movies/:idMovie	_Récupérer un film spécifique_

POST	/api/movies/:idMovie	_Créer un nouveau film_

PUT	/api/movies/:idMovie	_Mettre à jour un film_

DELETE	/api/movies/:idMovie	_Supprimer un film_

**Commentaires (Comments)**

Méthode	Endpoint	Description

GET	/api/movies/:idMovie/comments	_Récupérer tous les commentaires d'un film_

GET	/api/movies/:idMovie/comments/:idComment	_Récupérer un commentaire spécifique_

POST	/api/movies/:idMovie/comments/:idComment	_Ajouter un commentaire à un film_

PUT	/api/movies/:idMovie/comments/:idComment	_Mettre à jour un commentaire_

DELETE	/api/movies/:idMovie/comments/:idComment	_Supprimer un commentaire_

**Théâtres (Theaters)**

Méthode	Endpoint	Description

GET	/api/theaters	_Récupérer tous les théâtres_

GET	/api/theaters/:idTheater	_Récupérer un théâtre spécifique_

POST	/api/theaters/:idTheater	_Créer un nouveau théâtre_

PUT	/api/theaters/:idTheater	_Mettre à jour un théâtre_

DELETE	/api/theaters/:idTheater	_Supprimer un théâtre_

## 📝 Exemples d'utilisation

**Récupérer tous les films**

curl -X GET https://votre-api.vercel.app/api/movies

Réponse :


 { 
  "status": 200, '
  "data": [ '
     { '
      "_id": "573a1390f29313caabcd42e8",
      "title": "The Godfather",
      "year": 1972,
      "...": "..."
    },
    "..."
  ]
 }


**Récupérer un film spécifique**

curl -X GET https://votre-api.vercel.app/api/movies/573a1390f29313caabcd42e8

Réponse :


{
  "status": 200,
  "data": {
    "movie": {
      "_id": "573a1390f29313caabcd42e8",
      "title": "The Godfather",
      "year": 1972,
      "...": "..."
    }
  }
}


**Récupérer les commentaires d'un film**

curl -X GET https://votre-api.vercel.app/api/movies/573a1390f29313caabcd42e8/comments

Réponse :


{
  "status": 200,
  "data": {
    "comments": [
      {
        "_id": "5a9427648b0beebeb69579cc",
        "name": "John Doe",
        "text": "Great movie!",
        "...": "..."
      },
      "..."
    ]
  }
}


## 👥 Contributeurs
Thomas BOUTET / Mathieu VERMENOUZE


