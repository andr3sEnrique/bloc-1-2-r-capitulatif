import type { TheoryModule } from '../types'

const C9: TheoryModule = {
  theory: {
    code: 'C9',
    intro:
      'Analyser les compétences consiste à comparer les compétences requises par les objectifs (ici, développer de façon sécurisée) aux compétences réellement détenues, pour cibler la formation là où l’écart et le risque sont les plus forts. L’enquête est l’outil de départ, mais elle doit être croisée avec des mesures objectives et s’inscrire dans le cadre légal de la formation professionnelle.',
    sections: [
      {
        title: 'La démarche d’analyse des besoins de formation',
        points: [
          'Partir des objectifs stratégiques et des risques (ex. vulnérabilités récurrentes, exigences du cycle de développement).',
          'Définir les compétences requises (référentiel), mesurer les compétences détenues, calculer l’écart (requis − détenu).',
          'Prioriser selon la criticité et l’urgence, construire le plan, puis évaluer les effets.',
          'Trois niveaux de besoin : organisationnel, collectif (équipe), individuel.',
          'Un écart ne se règle pas toujours par la formation : il peut venir d’un outil, d’un processus ou d’un recrutement.',
        ],
      },
      {
        title: 'Référentiel et matrice de compétences',
        points: [
          'Matrice : personnes en lignes, compétences en colonnes, niveau requis et niveau constaté dans chaque case.',
          'Elle produit une carte des écarts (heat map) et révèle les compétences rares détenues par une seule personne.',
          'On distingue savoirs, savoir-faire et savoir-être ; le NICE Framework parle de Tasks, Knowledge, Skills (TKS).',
        ],
      },
      {
        title: 'Méthodes de recueil',
        points: [
          'Questionnaire ou enquête (auto-évaluation, échelles de Likert) : peu coûteux et large, mais déclaratif.',
          'Entretien individuel ou managérial : qualitatif, permet d’approfondir.',
          'Tests pratiques : QCM technique, exercice de revue de code, mini-CTF — mesure objective.',
          'Observation et indicateurs : vulnérabilités récurrentes dans les scans SAST/DAST, constats de tests d’intrusion, incidents.',
          'Bonne pratique : trianguler au moins deux méthodes. RGPD : finalité annoncée, information des salariés, résultats collectifs anonymisés.',
        ],
      },
      {
        title: 'Biais de l’auto-évaluation',
        points: [
          'Effet Dunning-Kruger (1999) : les moins compétents surestiment leur niveau ; les plus compétents se sous-estiment légèrement.',
          'Autres biais : désirabilité sociale, effet de halo, tendance centrale.',
          'Remèdes : descripteurs de niveau observables, croisement avec un test et l’avis du manager, anonymat des enquêtes collectives.',
        ],
      },
      {
        title: 'Échelles de niveau et objectifs pédagogiques',
        points: [
          'Modèle de Dreyfus (1980), 5 niveaux : novice, débutant avancé, compétent, performant, expert.',
          'Taxonomie de Bloom révisée (Anderson et Krathwohl, 2001), 6 niveaux : se souvenir, comprendre, appliquer, analyser, évaluer, créer.',
          'Bloom sert à écrire des objectifs mesurables avec des verbes d’action (ex. « analyser un rapport SAST et classer les failles selon l’OWASP Top 10 »).',
        ],
      },
      {
        title: 'Évaluer la formation : Kirkpatrick et Phillips',
        points: [
          'Kirkpatrick, 4 niveaux : 1 réaction (satisfaction), 2 apprentissage (acquis), 3 comportement (transfert au travail), 4 résultats (impact, ex. baisse des vulnérabilités en production).',
          'Phillips ajoute un 5e niveau, le ROI : (bénéfices nets − coûts) / coûts × 100.',
          'Modèle 70-20-10 : 70 % d’apprentissage par l’expérience, 20 % par les autres (mentorat, revue de code), 10 % par la formation formelle — heuristique, pas une loi scientifique.',
        ],
      },
      {
        title: 'Cadre légal français',
        points: [
          'Loi « Avenir professionnel » du 5 septembre 2018 : le plan de formation devient le plan de développement des compétences (formations obligatoires / non obligatoires), création de l’AFEST (formation en situation de travail).',
          'GEPP (ex-GPEC, ordonnances de 2017) : négociation obligatoire tous les 3 ans dans les entreprises de 300 salariés et plus.',
          'Loi n° 2025-989 du 24 octobre 2025 : l’entretien professionnel devient l’« entretien de parcours professionnel » — un premier dans la 1re année, puis tous les 4 ans, avec un état des lieux récapitulatif tous les 8 ans.',
        ],
      },
      {
        title: 'Référentiels de compétences cyber',
        points: [
          'NICE Framework (NIST SP 800-181 rev. 1) : Tasks, Knowledge, Skills, Work Roles ; composants v2.0 (2025) avec 41 rôles et 11 domaines de compétence.',
          'ECSF de l’ENISA (2022) : 12 profils (RSSI, auditeur, architecte, analyste CTI, pentester, formateur cyber…).',
          'ANSSI – Panorama des métiers de la cybersécurité (2020) : 26 fiches métiers.',
          'Utiles pour construire la colonne « compétences requises » de la matrice.',
        ],
      },
    ],
    takeaways: [
      'Besoin de formation = compétences requises − compétences détenues, priorisé par le risque.',
      'Une auto-évaluation seule est biaisée (Dunning-Kruger) : la croiser avec des tests et des indicateurs.',
      'Kirkpatrick : réaction, apprentissage, comportement, résultats (+ ROI de Phillips).',
      'Bloom révisé : se souvenir, comprendre, appliquer, analyser, évaluer, créer.',
      'Depuis octobre 2025 : entretien de parcours professionnel tous les 4 ans.',
    ],
    sources: [
      { label: 'Legisocial – Réforme de l’entretien professionnel (2025)', url: 'https://www.legisocial.fr/actualites-sociales/7608-reforme-entretien-professionnel-nouvel-entretien-parcours-professionnel.html' },
      { label: 'Centre Inffo – Entretien de parcours professionnel', url: 'https://www.centre-inffo.fr/chapitre/entretien-de-parcours-professionnel' },
      { label: 'NIST – NICE Framework Components v2.1.0', url: 'https://www.nist.gov/news-events/news/2025/12/nice-releases-nice-framework-components-v210' },
      { label: 'ENISA – European Cybersecurity Skills Framework', url: 'https://www.enisa.europa.eu/publications/european-cybersecurity-skills-framework-ecsf' },
      { label: 'ANSSI – Panorama des métiers de la cybersécurité (2020)', url: 'https://cyber.gouv.fr/sites/default/files/2021/10/anssi-panorama_metiers_cybersecurite-2020.pdf' },
    ],
  },
  questions: [
    {
      id: 't-c9-01',
      scope: 3,
      criteria: ['C9'],
      difficulty: 1,
      topic: 'Démarche',
      question: 'Quelles sont les étapes d’une analyse des besoins de formation ?',
      keyPoints: [
        'Partir des objectifs et des risques.',
        'Définir les compétences requises, mesurer les compétences détenues.',
        'Calculer et prioriser les écarts.',
        'Construire le plan de formation puis en évaluer les effets.',
      ],
    },
    {
      id: 't-c9-02',
      scope: 3,
      criteria: ['C9'],
      difficulty: 1,
      topic: 'Recueil',
      question: 'Citez quatre méthodes pour recueillir le niveau de compétence d’une équipe.',
      keyPoints: [
        'Questionnaire d’auto-évaluation.',
        'Entretien individuel ou managérial.',
        'Tests pratiques (QCM, revue de code, mini-CTF).',
        'Observation et indicateurs (résultats d’outils, constats d’audit, incidents).',
      ],
    },
    {
      id: 't-c9-03',
      scope: 3,
      criteria: ['C9'],
      difficulty: 1,
      topic: 'Kirkpatrick',
      question: 'Quels sont les quatre niveaux du modèle de Kirkpatrick ?',
      keyPoints: [
        '1. Réaction : satisfaction des participants.',
        '2. Apprentissage : acquis mesurés.',
        '3. Comportement : transfert des acquis au travail.',
        '4. Résultats : impact sur l’organisation.',
      ],
    },
    {
      id: 't-c9-04',
      scope: 3,
      criteria: ['C9'],
      difficulty: 2,
      topic: 'Biais',
      question: 'Qu’est-ce que l’effet Dunning-Kruger et comment le neutraliser dans une enquête ?',
      keyPoints: [
        'Les personnes peu compétentes surestiment leur niveau ; les plus compétentes se sous-estiment légèrement.',
        'Neutraliser : descripteurs de niveau concrets et observables, croisement avec un test pratique et l’avis du manager.',
        'Mesurer à nouveau après la formation avec les mêmes outils.',
      ],
    },
    {
      id: 't-c9-05',
      scope: 3,
      criteria: ['C9'],
      difficulty: 2,
      topic: 'Bloom',
      question: 'Citez les six niveaux de la taxonomie de Bloom révisée et donnez un usage.',
      keyPoints: [
        'Se souvenir, comprendre, appliquer, analyser, évaluer, créer.',
        'Usage : rédiger des objectifs pédagogiques mesurables avec un verbe d’action, et aligner l’évaluation sur le niveau visé.',
      ],
    },
    {
      id: 't-c9-06',
      scope: 3,
      criteria: ['C9'],
      difficulty: 2,
      topic: 'Échelles',
      question: 'Quels sont les cinq niveaux du modèle de Dreyfus ?',
      keyPoints: [
        'Novice, débutant avancé, compétent, performant, expert.',
        'Ils décrivent l’autonomie croissante, de l’application de règles à l’intuition experte.',
      ],
    },
    {
      id: 't-c9-07',
      scope: 3,
      criteria: ['C9'],
      difficulty: 2,
      topic: 'Matrice',
      question: 'À quoi sert une matrice de compétences ?',
      keyPoints: [
        'Croiser personnes et compétences, avec niveau requis et niveau constaté.',
        'Visualiser les écarts (heat map) et les compétences rares (une seule personne).',
        'Prioriser la formation et organiser le partage de connaissances.',
      ],
    },
    {
      id: 't-c9-08',
      scope: 3,
      criteria: ['C9'],
      difficulty: 2,
      topic: '70-20-10',
      question: 'Que dit le modèle 70-20-10 et qu’en déduire pour un plan de formation ?',
      keyPoints: [
        '70 % de l’apprentissage par l’expérience, 20 % par les interactions, 10 % par la formation formelle.',
        'Conséquence : compléter les sessions par du pair programming, du mentorat, des revues de code et des missions concrètes.',
        'C’est une heuristique, discutée scientifiquement.',
      ],
    },
    {
      id: 't-c9-09',
      scope: 3,
      criteria: ['C9'],
      difficulty: 3,
      topic: 'Cadre légal',
      question: 'Qu’a changé la loi du 24 octobre 2025 pour l’entretien professionnel ?',
      keyPoints: [
        'Il devient l’« entretien de parcours professionnel ».',
        'Un premier entretien dans la 1re année suivant l’embauche, puis un tous les 4 ans (au lieu de 2).',
        'Un état des lieux récapitulatif tous les 8 ans (au lieu de 6).',
        'Il porte sur les compétences, les besoins de formation et les souhaits d’évolution.',
      ],
      trap: 'Beaucoup de supports indiquent encore « tous les 2 ans, bilan à 6 ans » : c’est l’ancien régime.',
    },
    {
      id: 't-c9-10',
      scope: 3,
      criteria: ['C9'],
      difficulty: 3,
      topic: 'Cadre légal',
      question: 'Qu’est-ce que le plan de développement des compétences ?',
      keyPoints: [
        'Créé par la loi « Avenir professionnel » de 2018 en remplacement du plan de formation (depuis le 1er janvier 2019).',
        'Il distingue formations obligatoires (sur le temps de travail) et non obligatoires.',
        'Il reconnaît l’AFEST, la formation en situation de travail.',
      ],
    },
    {
      id: 't-c9-11',
      scope: 3,
      criteria: ['C9'],
      difficulty: 3,
      topic: 'Référentiels',
      question: 'Quels référentiels de compétences cyber pouvez-vous utiliser pour définir les compétences requises ?',
      keyPoints: [
        'NICE Framework du NIST (tâches, connaissances, savoir-faire, rôles).',
        'ECSF de l’ENISA : 12 profils européens.',
        'Panorama des métiers de la cybersécurité de l’ANSSI (26 fiches).',
        'Pour les développeurs : exigences OWASP ASVS et pratiques SAMM converties en compétences.',
      ],
    },
    {
      id: 't-c9-12',
      scope: 3,
      criteria: ['C9'],
      difficulty: 3,
      topic: 'ROI',
      question: 'Comment Phillips complète-t-il Kirkpatrick ?',
      keyPoints: [
        'Il ajoute un 5e niveau : le retour sur investissement.',
        'ROI (%) = (bénéfices nets du programme − coûts) / coûts × 100.',
        'Il faut isoler l’effet de la formation et convertir les résultats en valeur monétaire (ex. incidents évités, temps de correction gagné).',
      ],
    },
    {
      id: 't-c9-13',
      scope: 3,
      criteria: ['C9'],
      difficulty: 4,
      topic: 'RGPD',
      question: 'Quelles précautions RGPD prendre pour une enquête de compétences auprès des salariés ?',
      keyPoints: [
        'Annoncer la finalité (plan de formation) et informer les salariés.',
        'Minimiser les données collectées ; anonymiser ou agréger les résultats collectifs.',
        'Ne pas réutiliser les réponses à d’autres fins (évaluation disciplinaire).',
        'Limiter l’accès et la durée de conservation.',
      ],
    },
  ],
}

export default C9
