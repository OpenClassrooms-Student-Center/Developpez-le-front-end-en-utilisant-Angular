
# 🅿️2️⃣Développez le front-end en utilisant Angular 

### Résumé du projet Jeux Olympiques

📖 Contexte:

✍🏼Vous travaillez chez DelivWeb, une ESN spécialisée dans le développement web.
Votre manager, Jeanette, vous confie un nouveau projet pour TéléSport.
Le but est de créer une application web interactive pour accompagner les reportages sur les Jeux Olympiques.
Mission:

✍🏼Développer le front-end d'un dashboard permettant de visualiser les informations des précédents Jeux Olympiques (médailles par pays, etc.).
L'application doit être responsive (mobile et ordinateur).
Respecter les bonnes pratiques d'Angular (services HTTP, RxJS, observables, désabonnement, typage).
Ressources:

✍🏼Starter code GitHub avec données et interface de récupération
Maquettes des interfaces UX par Omar
Cahier des charges
Vidéo explicative de Jeanette
Délivrables:

✍🏼Code du front-end
README expliquant le lancement de l'application
Dépôt public GitHub du projet (code et README)
Réunion avec Jeanette:

✍🏼Présentation du travail et explications techniques
Validation de la qualité avant publication
Points clés:

✍🏼Respecter les délais serrés avant les Jeux Olympiques
Communication régulière avec Jeanette
Dupliquer et partager le projet GitHub
Suivre les bonnes pratiques d'Angular


## Architecture du projet Jeux Olympiques


### Ce projet est une application web Angular structurée et organisée pour une meilleure lisibilité et maintenabilité. Voici un aperçu de sa structure :

#### Racine du projet :

- favicon.ico: L'icône de la page web affichée dans l'onglet du navigateur.
- index.html: Le point d'entrée principal de l'application.
- main.ts: Le point d'entrée principal de l'application Angular.
- polyfills.ts: Fournit des polyfills pour les navigateurs plus anciens, garantissant une compatibilité accrue.
- styles.scss: Contient les styles CSS globaux de l'application.
- test.ts: Peut contenir un script de test unitaire initial.


####  Dossier app:

- app-routing.module.ts: Définit les routes de l'application et comment les composants sont chargés.
- app.component.html, app.component.scss, app.component.spec.ts, et app.component.ts: Représentent le composant principal de l'application.
- app.module.ts: Le module principal d'Angular, important pour le démarrage de l'application.

####  Dossier app/components:

Ce dossier peut accueillir des composants réutilisables dans l'application. Un exemple illustré ici est medal-country-chart.

#### Dossier app/core:

- guards: Contient des gardes de route, des classes qui peuvent contrôler l'accès à certaines routes de l'application (exemple : country-exists.guard.ts).
- models: Contient les interfaces et les structures de données utilisées par l'application (exemples : MedalData.ts, Olympic.ts).
- services: Contient les services, des classes qui encapsulent la logique métier et interagissent avec les API ou des sources de données externes (exemple : olympic.service.ts).

#### Dossier app/pages:

Ce dossier contient des composants représentant des pages distinctes de l'application. Quelques exemples illustrés ici sont country-details, home et not-found.

#### Dossier assets:

- assets: Peut contenir des ressources statiques de l'application comme des images ou des polices de caractères.
- .gitkeep: Un fichier vide pour empêcher ce dossier d'être supprimé par Git.

#### Dossier mock:

- olympic.json: Peut contenir des données fictives utilisées pour le développement et les tests (exemples de données olympiques).


## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```

## ➡️ Installation et exécution du projet Jeux Olympiques

#### Prérequis:

Assurez-vous d'avoir Node.js et npm installés sur votre système. Vous pouvez les télécharger et les installer depuis leurs sites web officiels :

- Node.js: https://nodejs.org/en/download/
- npm: https://www.npmjs.com/

#### Installation des dépendances:

Clonez le dépôt du projet dans votre répertoire de travail local.

Ouvrez un terminal dans le répertoire du projet cloné.

Exécutez la commande suivante pour installer les dépendances du projet :
```
npm install --force
```

#### Exécution du projet:

Pour lancer le serveur de développement et exécuter l'application, entrez la commande suivante dans le terminal :
```
ng serve
```

Accédez à l'application dans votre navigateur web à l'adresse suivante :
```
http://localhost:4200/
```

#### Fonctionnement du serveur de développement:

Le serveur de développement surveille les modifications apportées aux fichiers source du projet.

Si une modification est détectée, le serveur de développement recharge automatiquement l'application dans votre navigateur web.

Cela vous permet de travailler sur le projet et de visualiser les modifications instantanément sans avoir à redémarrer manuellement le serveur.
Notes:

L'utilisation de npm install --force permet de forcer la réinstallation des dépendances, ce qui peut résoudre les problèmes de version incompatibles.

Assurez-vous d'exécuter les commandes dans le répertoire racine du projet.

Si vous rencontrez des problèmes lors de l'installation ou de l'exécution du projet, consultez la documentation officielle d'Angular ou recherchez des solutions sur des forums en ligne.

#### Conseils:

Pour une meilleure expérience de développement, vous pouvez utiliser un éditeur de code avec prise en charge d'Angular, comme Visual Studio Code avec l'extension Angular CLI.
Vous pouvez également utiliser des outils de développement de navigateur pour déboguer et inspecter l'application pendant son exécution.

#### 📲 N'hésitez pas à me contacter si vous avez des questions ou rencontrez des difficultés lors de l'installation ou de l'exécution du projet.


## 🙌🏼 Deployment

Ce projet a été déployée afin d'avoir une visibilité direct dessus sans avoir besoin de charger le projet sur votre machine.

Lien du déploiement :

https://developpez-le-front-end-en-utilisant-angular-rho.vercel.app/





## Documentation

[Documentation JScompoDoc du PRojet ](https://wolfsilver0509.github.io/Documentation_P2/)

Documentation générée par JScompoDoc heberger sur un repo github qui crée une page github. 

## Badges

<p align="left"> <a href="https://angular.io" target="_blank" rel="noreferrer"> <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="angular" width="40" height="40"/> </a> </p>


