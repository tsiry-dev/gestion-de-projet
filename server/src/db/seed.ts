import "dotenv/config";
import mongoose from "mongoose";

import { config } from "@/config/app.config";
import ProjectModel, { ProjectStatus } from "@/models/project.model";
import TaskModel, { TaskStatus } from "@/models/task.model";

const projects = [
  {
    title: "Site E-commerce",
    description:
      "Développement complet d'une plateforme e-commerce moderne avec gestion des commandes, paiements et tableau de bord administrateur.",
    status: ProjectStatus.IN_PROGRESS,
  },
  {
    title: "Application Mobile Banking",
    description:
      "Application bancaire sécurisée permettant les virements, consultations de comptes et paiements mobiles.",
    status: ProjectStatus.NOT_STARTED,
  },
  {
    title: "CRM Entreprise",
    description:
      "Solution de gestion des clients, prospects et opportunités commerciales.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Plateforme E-learning",
    description:
      "Plateforme de formation en ligne avec vidéos, quiz et suivi des étudiants.",
    status: ProjectStatus.IN_PROGRESS,
  },
  {
    title: "Application Livraison",
    description:
      "Gestion des commandes, des livreurs et suivi GPS des livraisons.",
    status: ProjectStatus.NOT_STARTED,
  },
  {
    title: "Gestion Hôtel",
    description:
      "Réservation des chambres, facturation et gestion des clients.",
    status: ProjectStatus.IN_PROGRESS,
  },
  {
    title: "ERP PME",
    description:
      "Gestion complète des ventes, achats, ressources humaines et comptabilité.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Marketplace Locale",
    description:
      "Plateforme permettant aux particuliers de vendre leurs produits.",
    status: ProjectStatus.IN_PROGRESS,
  },
  {
    title: "Application Fitness",
    description:
      "Programmes sportifs, statistiques et suivi des performances.",
    status: ProjectStatus.NOT_STARTED,
  },
  {
    title: "Gestion Cabinet Médical",
    description:
      "Gestion des patients, rendez-vous et dossiers médicaux.",
    status: ProjectStatus.IN_PROGRESS,
  },
  {
    title: "Réseau Social",
    description:
      "Création d'un réseau social avec publications, commentaires et messagerie.",
    status: ProjectStatus.NOT_STARTED,
  },
  {
    title: "Application Taxi",
    description:
      "Réservation de courses en temps réel avec géolocalisation.",
    status: ProjectStatus.IN_PROGRESS,
  },
  {
    title: "Gestion Stock",
    description:
      "Suivi des stocks, fournisseurs et inventaires.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Blog Professionnel",
    description:
      "Publication, gestion des articles et optimisation SEO.",
    status: ProjectStatus.IN_PROGRESS,
  },
  {
    title: "Application Restaurant",
    description:
      "Commandes en ligne, réservations et gestion des menus.",
    status: ProjectStatus.NOT_STARTED,
  },
  {
    title: "Gestion Immobilier",
    description:
      "Gestion des biens, annonces, visites et locations.",
    status: ProjectStatus.IN_PROGRESS,
  },
  {
    title: "Plateforme Freelance",
    description:
      "Mise en relation entre entreprises et freelances.",
    status: ProjectStatus.COMPLETED,
  },
  {
    title: "Application Transport",
    description:
      "Gestion des véhicules, chauffeurs et itinéraires.",
    status: ProjectStatus.IN_PROGRESS,
  },
  {
    title: "Gestion Association",
    description:
      "Gestion des membres, cotisations et événements.",
    status: ProjectStatus.NOT_STARTED,
  },
  {
    title: "Dashboard Analytics",
    description:
      "Visualisation avancée des données et statistiques.",
    status: ProjectStatus.COMPLETED,
  },
];

const taskTitles = [
  "Analyse complète des besoins fonctionnels et rédaction des spécifications détaillées du projet",
  "Création du cahier des charges technique avec toutes les contraintes métier et les règles de gestion",
  "Conception de l'interface utilisateur responsive en respectant les maquettes Figma validées",
  "Création des maquettes haute fidélité pour les versions Desktop, Tablette et Mobile",
  "Développement complet de l'API Backend avec Express, TypeScript, MongoDB et architecture DDD",
  "Développement de l'application Frontend avec React, TypeScript, Tailwind CSS et React Query",
  "Implémentation de l'authentification JWT avec Refresh Token, vérification email et réinitialisation du mot de passe",
  "Création du système de gestion des utilisateurs, rôles, permissions et contrôle d'accès sécurisé",
  "Développement du tableau de bord administrateur avec statistiques, graphiques et filtres avancés",
  "Configuration complète de MongoDB Atlas avec indexation, optimisation des performances et sauvegardes",
  "Migration de la base de données vers Prisma ORM avec optimisation des requêtes SQL",
  "Containerisation complète du projet avec Docker Compose pour les environnements de développement",
  "Déploiement de l'application sur AWS EC2 avec configuration Nginx, SSL et variables d'environnement",
  "Écriture des tests unitaires et des tests d'intégration afin de garantir la stabilité de l'application",
  "Correction des anomalies détectées lors des tests fonctionnels et amélioration de la qualité du code",
  "Validation complète des règles métier avec vérification des cas limites et gestion des erreurs",
  "Optimisation du référencement naturel SEO ainsi que des performances Lighthouse de l'application",
  "Rédaction de la documentation technique Swagger pour toutes les routes de l'API REST",
  "Organisation d'une réunion de validation avec le client afin de présenter les nouvelles fonctionnalités",
  "Refactoring des composants React afin de réduire la duplication du code et améliorer la maintenabilité",
  "Ajout d'un système complet de notifications en temps réel avec WebSocket et gestion des événements",
  "Développement du système d'upload d'images avec compression automatique et stockage sécurisé",
  "Création des middlewares de validation, authentification, autorisation et gestion centralisée des erreurs",
  "Configuration d'une pipeline CI/CD GitHub Actions avec tests automatiques et déploiement continu",
  "Implémentation d'un moteur de recherche avancé avec pagination, filtres dynamiques et tri multicritères",
  "Développement du module de gestion des tâches avec glisser-déposer entre plusieurs colonnes Kanban",
  "Création d'un historique complet des modifications permettant de suivre toutes les actions des utilisateurs",
  "Optimisation des performances de chargement grâce au Lazy Loading, Code Splitting et mise en cache",
  "Mise en place du système de journalisation des événements afin de faciliter le débogage et la maintenance",
  "Développement du module d'exportation des données aux formats PDF, Excel et CSV avec filtres personnalisés",
];

const descriptionsCourtes = [
  "Implémenter cette fonctionnalité.",
  "Corriger les anomalies détectées.",
  "Tester le fonctionnement.",
  "Préparer la mise en production.",
  "Valider avec le client.",
  "Documenter le module.",
  "Mettre à jour les dépendances.",
];

const descriptionsLongues = [
  "Cette tâche consiste à développer l'ensemble des fonctionnalités prévues tout en respectant les bonnes pratiques de développement, les conventions de l'équipe ainsi que les contraintes techniques du projet.",

  "Une attention particulière devra être portée aux performances, à la sécurité, à la qualité du code ainsi qu'à la rédaction de tests permettant d'assurer la stabilité des fonctionnalités développées.",

  "Le développement devra être réalisé en suivant l'architecture du projet, en documentant les parties importantes et en effectuant plusieurs validations afin de garantir un fonctionnement optimal avant la mise en production.",

  "Cette fonctionnalité devra être entièrement intégrée avec les autres modules de l'application. Les validations métiers, les tests unitaires et les vérifications fonctionnelles devront être effectués avant la livraison.",

  "Le code devra être maintenable, facilement évolutif et respecter les conventions établies dans le projet afin de faciliter les futures évolutions de l'application.",
];

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomStatus() {
  const statuses = [
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.IN_REVIEW,
    TaskStatus.DONE,
    TaskStatus.CANCELLED,
  ];

  return statuses[random(0, statuses.length - 1)];
}

function randomDescription() {
  return Math.random() > 0.5
    ? descriptionsLongues[random(0, descriptionsLongues.length - 1)]
    : descriptionsCourtes[random(0, descriptionsCourtes.length - 1)];
}

async function seed() {
  try {
    await mongoose.connect(config.MONGODB_URI);

    console.log("🟢 MongoDB connecté");

    await TaskModel.deleteMany({});
    await ProjectModel.deleteMany({});

    console.log("🗑 Anciennes données supprimées");

    const createdProjects = await ProjectModel.insertMany(projects);

    const tasks = [];

    for (const project of createdProjects) {
       const numberOfTasks = random(50, 80);

      for (let i = 0; i < numberOfTasks; i++) {
        const start = new Date();
        start.setDate(start.getDate() + random(-10, 20));

        const end = new Date(start);
        end.setDate(end.getDate() + random(1, 10));

        tasks.push({
          projectId: project._id,

          title: `${taskTitles[random(0, taskTitles.length - 1)]} #${i + 1}`,

          description: randomDescription(),

          status: randomStatus(),

          startDate: start,

          endDate: end,
        });
      }
    }

    await TaskModel.insertMany(tasks);

    console.log(`✅ ${createdProjects.length} projets créés`);
    console.log(`✅ ${tasks.length} tâches créées`);
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Déconnecté");
  }
}

seed();