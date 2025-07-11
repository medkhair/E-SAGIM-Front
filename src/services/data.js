// Modules
export const modules = [
  { id: 1, name: "Algorithmique", filiereId: [1,2] },
  { id: 2, name: "Francais", filiereId: [1,2] },
  { id: 3, name: "Archithecture", filiereId: [3,4] },
  { id: 4, name: "Anglais", filiereId: [3,4] }
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
      { heure: "08:00 - 10:00", module: 1, salle: "A1" },
      { heure: "10:15 - 12:15", module: 2, salle: "B2" } 
    ]
  },
  {
    day: "Mardi",
    courses: [
      { heure: "09:00 - 11:00", module: 4, salle: "C3" } 
    ]
  },
  {
    day: "Mercredi",
    courses: [
      { heure: "08:00 - 10:00", module: 1, salle: "A1" }, 
      { heure: "13:00 - 15:00", module: 2, salle: "B2" }  
    ]
  },
  {
    day: "Jeudi",
    courses: [
      { heure: "10:00 - 12:00", module: 3, salle: "C3" } 
    ]
  },
  {
    day: "Vendredi",
    courses: [
      { heure: "08:00 - 10:00", module: 1, salle: "A1" }
    ]
  }
];

export const calendrier2 = [
  {
    day: "Lundi",
    courses: [
      { heure: "18:00 - 20:00", module: 1, salle: "A1" },
      { heure: "20:15 - 21:30", module: 2, salle: "B2" } 
    ]
  },
  {
    day: "Mardi",
    courses: [
      { heure: "18:00 - 20:00", module: 4, salle: "C3" } 
    ]
  },
  {
    day: "Mercredi",
    courses: [
      { heure: "18:00 - 20:00", module: 1, salle: "A1" }, 
      { heure: "20:15 - 21:30", module: 2, salle: "B2" }  
    ]
  },
  {
    day: "Jeudi",
    courses: [
      { heure: "20:15 - 21:30", module: 3, salle: "C3" } 
    ]
  },
  {
    day: "Vendredi",
    courses: [
      { heure: "18:00 - 20:00", module: 1, salle: "A1" }
    ]
  }
];


// Annoncements
export const annoncements = [
  {
    id: 1,
    message: "Bienvenue sur la plateforme E-SAGIM !",
    author: 1, // ID de l'utilisateur (admin)
    date: "2024-06-24"
  },
  {
    id: 2,
    message: "Le cours d'Algorithmique débutera lundi à 8h en salle A1.",
    author: 0, // ID de l'utilisateur (prof)
    date: "2024-06-23"
  },
  {
    id: 3,
    message: "N'oubliez pas de réviser pour le quizz de Francais mercredi.",
    author: 0,
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
  role: "etudiant",
  img: "../src/img/user.jpg",
  filiereId: 1
};
export const etudiant2 = {
  id: 2,
  codeAppogee: "E12345679",
  nom: "banel",
  prenom: "Mohammed",
  image: "img/user.jpg",
  email: "souiba.mohammed@example.com",
  telephone: "+213600000000",
  motPasse: "motdepasse123",
  role: "etudiant",
  img: "../src/img/user.jpg",
  filiereId: 2
};
export const etudiant3 = {
  id: 3,
  codeAppogee: "E1234567899",
  nom: "Souiba",
  prenom: "Ahmed",
  image: "img/user.jpg",
  email: "souiba.mohammed@example.com",
  telephone: "+213600000000",
  motPasse: "motdepasse123",
  role: "etudiant",
  img: "../src/img/user.jpg",
  filiereId: 4
};



// Utilisateur Prof
export const prof = {
  id: 1,
  codeProf: "P12345678",
  nom: "El Amri",
  prenom: "Ahmed",
  image: "../src/img/user.jpg",
  email: "ahmed.amri@example.com",
  telephone: "+213600000000",
  motPasse: "motdepasse123",
  role: "prof",
  img: "../src/img/user.jpg",
  modules: [1, 3],
  filieres: [1, 2]
};
export const prof2 = {
  id: 2,
  codeProf: "P123456878",
  nom: "El Amri",
  prenom: "Fatima",
  image: "../src/img/user.jpg",
  email: "ahmed.amri@example.com",
  telephone: "+213600000000",
  motPasse: "motdepasse123",
  role: "prof",
  img: "../src/img/user.jpg",
  modules: [2, 4]
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



export const studentsResults = [
  { quizzId: 1, studentName: "Ali", score: 8 },
  { quizzId: 1, studentName: "Sara", score: 10 },
  { quizzId: 2, studentName: "Yasmine", score: 7 }
];

export const users = [
  {
    id: 0,
    user: prof
  },
  {
    id: 1,
    user: admin
  },
  {
    id: 2,
    user: etudiant
  },
  {
    id: 3,
    user: etudiant2
  },
  {
    id: 3,
    user: etudiant3
  },
  {
    id: 4,
    user: prof2
  }
];


export const filieres = [
  { id: 1, name: "TSDI1-JOUR", idCalendrier: 1 },
  { id: 2, name: "TSDI1-SOIR",idCalendrier: 2 },
  { id: 3, name: "TSDI2-JOUR", idCalendrier: 1 },
  { id: 4, name: "TSDI2-SOIR", idCalendrier: 2 }
];


const calendriers = [{
  id: 1,
  name: "Calendrier TSDI1-JOUR",
  courses: calendrier
}, {
  id: 2,
  name: "Calendrier TSDI1-SOIR",
  courses: calendrier2
}]