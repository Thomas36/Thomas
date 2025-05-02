API REST MongoDB Atlas

📋 Présentation du projet

Cette API REST permet d'accéder aux données d'une plateforme de streaming/critiques de films, en exposant des collections MongoDB Atlas via des endpoints standardisés. Elle offre un accès complet aux films, commentaires et théâtres de la base de données sample_mflix.

🔗 Liens importants

API en production : https://votre-api.vercel.app

Documentation Swagger : https://votre-api.vercel.app/api-doc

Dépôt GitHub : https://github.com/votre-username/votre-repo


🛠️ Technologies utilisées

Framework : Next.js (App Router + API Routes)

Base de données : MongoDB Atlas (cluster cloud, base sample_mflix)

Client MongoDB : mongodb (driver officiel Node.js)

Hébergement : Vercel

Documentation API : Swagger UI React


🚀 Installation et démarrage

Prérequis

Node.js (v18 ou supérieur)

Compte MongoDB Atlas avec la base sample_mflix importée

Compte GitHub et Vercel (pour le déploiement)

Installation locale
Cloner le dépôt

git clone https://github.com/votre-username/votre-repo.git
cd votre-repo

Installer les dépendances

npm install

Configurer les variables d'environnement
Créer un fichier .env.local à la racine du projet
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority

Lancer le serveur de développement

npm run dev

Accéder à l'application

API : http://localhost:3000/api/movies

Documentation Swagger : http://localhost:3000/api-doc

📚 Documentation des endpoints

Films (Movies)

Méthode	Endpoint	Description

GET	/api/movies	Récupérer tous les films

GET	/api/movies/:idMovie	Récupérer un film spécifique

POST	/api/movies/:idMovie	Créer un nouveau film

PUT	/api/movies/:idMovie	Mettre à jour un film

DELETE	/api/movies/:idMovie	Supprimer un film

Commentaires (Comments)

Méthode	Endpoint	Description

GET	/api/movies/:idMovie/comments	Récupérer tous les commentaires d'un film

GET	/api/movies/:idMovie/comments/:idComment	Récupérer un commentaire spécifique

POST	/api/movies/:idMovie/comments/:idComment	Ajouter un commentaire à un film

PUT	/api/movies/:idMovie/comments/:idComment	Mettre à jour un commentaire

DELETE	/api/movies/:idMovie/comments/:idComment	Supprimer un commentaire

Théâtres (Theaters)

Méthode	Endpoint	Description

GET	/api/theaters	Récupérer tous les théâtres

GET	/api/theaters/:idTheater	Récupérer un théâtre spécifique

POST	/api/theaters/:idTheater	Créer un nouveau théâtre

PUT	/api/theaters/:idTheater	Mettre à jour un théâtre

DELETE	/api/theaters/:idTheater	Supprimer un théâtre

📝 Exemples d'utilisation

Récupérer tous les films

curl -X GET https://votre-api.vercel.app/api/movies
Réponse :


{
  "status": 200,
  "data": [
    {
      "_id": "573a1390f29313caabcd42e8",
      "title": "The Godfather",
      "year": 1972,
      "...": "..."
    },
    "..."
  ]
}


Récupérer un film spécifique

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


Récupérer les commentaires d'un film

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


👥 Contributeurs
Thomas BOUTET / Mathieu VERMENOUZE


