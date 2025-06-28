// Modules
export const modules = [
  { id: 1, name: "Algorithmique" },
  { id: 2, name: "Francais" },
  { id: 3, name: "Archithecture" },
  { id: 4, name: "Anglais" }
];

// Cours (each course links to a module by moduleId)
export const cours = [
  { id: 1, moduleId: 1, title: "Chapitre 1: Introduction à l'algorithmique" },
  { id: 2, moduleId: 1, title: "Chapitre 2: Variables et Types" },
  { id: 3, moduleId: 1, title: "Chapitre 3: Structures de contrôle" },

  { id: 4, moduleId: 2, title: "Chapitre 1: Grammaire de base" },
  { id: 5, moduleId: 2, title: "Chapitre 2: Conjugaison" },

  { id: 6, moduleId: 3, title: "Chapitre 1: Introduction à l'architecture" },
  { id: 7, moduleId: 3, title: "Chapitre 2: Composants matériels" }
];

// Quizzs (each quizz links to a module by moduleId)
export const quizzs = [
  {
    id: 1,
    moduleId: 1,
    title: "Quizz Algorithmique - Chapitre 1",
    questions: [
      {
        question: "Qu'est-ce qu'un algorithme ?",
        choices: [
          "Un langage de programmation",
          "Une suite d'instructions pour résoudre un problème",
          "Un ordinateur",
          "Un type de variable"
        ],
        answer: 1
      },
      {
        question: "Quel symbole utilise-t-on pour l'affectation en pseudo-code ?",
        choices: [
          "=",
          "<-",
          "==",
          ":="
        ],
        answer: 1
      }
    ]
  },
  {
    id: 2,
    moduleId: 2,
    title: "Quizz Francais - Chapitre 1",
    questions: [
      {
        question: "Quel est le sujet dans la phrase : 'Le chat dort' ?",
        choices: [
          "chat",
          "dort",
          "Le chat",
          "Le"
        ],
        answer: 2
      },
      {
        question: "Quel est le verbe dans la phrase : 'Marie lit un livre' ?",
        choices: [
          "Marie",
          "lit",
          "un livre",
          "livre"
        ],
        answer: 1
      }
    ]
  },
  {
    id: 3,
    moduleId: 3,
    title: "Quizz Archithecture - Chapitre 1",
    questions: [
      {
        question: "Qu'est-ce qu'un processeur ?",
        choices: [
          "Un périphérique d'entrée",
          "Le cerveau de l'ordinateur",
          "Un logiciel",
          "Une mémoire"
        ],
        answer: 1
      },
      {
        question: "Quel composant stocke les données temporairement ?",
        choices: [
          "Disque dur",
          "RAM",
          "Carte graphique",
          "Processeur"
        ],
        answer: 1
      }
    ]
  }
];


// Calendrier des cours dans la semaine (module = id du module)
export const calendrier = [
  {
    day: "Lundi",
    courses: [
      { heure: "08:00 - 10:00", module: 1, salle: "A1" }, // Algorithmique
      { heure: "10:15 - 12:15", module: 2, salle: "B2" }   // Francais
    ]
  },
  {
    day: "Mardi",
    courses: [
      { heure: "09:00 - 11:00", module: 3, salle: "C3" }   // Archithecture
    ]
  },
  {
    day: "Mercredi",
    courses: [
      { heure: "08:00 - 10:00", module: 1, salle: "A1" },  // Algorithmique
      { heure: "13:00 - 15:00", module: 2, salle: "B2" }   // Francais
    ]
  },
  {
    day: "Jeudi",
    courses: [
      { heure: "10:00 - 12:00", module: 3, salle: "C3" }   // Archithecture
    ]
  },
  {
    day: "Vendredi",
    courses: [
      { heure: "08:00 - 10:00", module: 1, salle: "A1" }   // Algorithmique
    ]
  }
];


// Annoncements
export const annoncements = [
  {
    id: 1,
    message: "Bienvenue sur la plateforme E-SAGIM !",
    author: { role: "admin", name: "Administrateur" },
    date: "2024-06-24"
  },
  {
    id: 2,
    message: "Le cours d'Algorithmique débutera lundi à 8h en salle A1.",
    author: { role: "prof", name: "M. Benali" },
    date: "2024-06-23"
  },
  {
    id: 3,
    message: "N'oubliez pas de réviser pour le quizz de Francais mercredi.",
    author: { role: "prof", name: "Mme Dupont" },
    date: "2024-06-22"
  },
  {
    id: 4,
    message: "Bienvenue sur la plateforme E-SAGIM !",
    author: { role: "admin", name: "Administrateur" },
    date: "2024-06-24"
  },
  {
    id: 5,
    message: "Le cours d'Algorithmique débutera lundi à 8h en salle A1.",
    author: { role: "prof", name: "M. Benali" },
    date: "2024-06-23"
  },
  {
    id: 6,
    message: "N'oubliez pas de réviser pour le quizz de Francais mercredi.",
    author: { role: "prof", name: "Mme Dupont" },
    date: "2024-06-22"
  },
  {
    id: 7,
    message: "Bienvenue sur la plateforme E-SAGIM !",
    author: { role: "admin", name: "Administrateur" },
    date: "2024-06-24"
  },
  {
    id: 8,
    message: "Le cours d'Algorithmique débutera lundi à 8h en salle A1.",
    author: { role: "prof", name: "M. Benali" },
    date: "2024-06-23"
  },
  {
    id: 9,
    message: "N'oubliez pas de réviser pour le quizz de Francais mercredi.",
    author: { role: "prof", name: "Mme Dupont" },
    date: "2024-06-22"
  }
];

// Utilisateur Etudiant
export const etudiant = {
  id: 1,
  codeAppogee: "E12345678",
  nom: "Souiba",
  prenom: "Mohammed",
  image: "img/user.jpg",
  email: "souiba.mohammed@example.com",
  telephone: "+213600000000",
  motPasse: "motdepasse123",
  role: "prof",
  img: "../src/img/user.jpg"
};

// Utilisateur Prof
export const prof = {
  id: 1,
  codeProf: "P12345678",
  nom: "El Amri",
  prenom: "Ahmed",
  image: "img/user.jpg",
  email: "ahmed.amri@example.com",
  telephone: "+213600000000",
  motPasse: "motdepasse123",
  role: "prof",
  img: "../src/img/user.jpg"
};

// Utilisateur Admin
export const admin = {
  id: 1,
  codeAdmin: "A12345678",
  nom: "Nakkach",
  prenom: "Saida",
  image: "img/user.jpg",
  email: "Nakkach.saida@example.com",
  telephone: "+213600000000",
  motPasse: "motdepasse123",
  role: "admin",
  img: "../src/img/user.jpg"
};