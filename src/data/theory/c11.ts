import type { TheoryModule } from '../types'

const C11: TheoryModule = {
  theory: {
    code: 'C11',
    intro:
      'Intégrer l’accessibilité dans un plan de formation, c’est garantir que chaque collaborateur, y compris en situation de handicap, peut suivre et réussir la formation. Cela repose sur des référentiels techniques (RGAA, WCAG), un cadre légal (loi de 2005, directive européenne, obligations d’emploi) et une démarche de conception universelle plutôt que des adaptations au cas par cas.',
    sections: [
      {
        title: 'Le RGAA',
        points: [
          'Référentiel Général d’Amélioration de l’Accessibilité, version 4.1.2 en vigueur (RGAA 5 annoncé pour fin 2026, pas encore publié en octobre 2026).',
          '106 critères répartis en 13 thématiques : images, cadres, couleurs, multimédia, tableaux, liens, scripts, éléments obligatoires, structuration, présentation, formulaires, navigation, consultation.',
          'Aligné sur les WCAG 2.1 niveaux A et AA ; méthode de test par critère.',
          'États de conformité : totale (100 %), partielle (au moins 50 %), non conforme (moins de 50 %).',
        ],
      },
      {
        title: 'Obligations liées au RGAA',
        points: [
          'Déclaration d’accessibilité : état de conformité, contenus non accessibles, contact, recours au Défenseur des droits ; valable 3 ans.',
          'Schéma pluriannuel de mise en accessibilité sur 3 ans, décliné en plans d’action annuels ; mention de l’état de conformité en page d’accueil.',
          'Échantillon d’audit : pages obligatoires (accueil, contact, mentions légales…), pages représentatives, processus complets et pages tirées au hasard.',
        ],
      },
      {
        title: 'Les WCAG',
        points: [
          'Quatre principes « POUR » : Perceptible, Utilisable (Operable), Compréhensible, Robuste.',
          'Trois niveaux : A, AA (cible réglementaire), AAA.',
          'WCAG 2.2 (octobre 2023) : 9 nouveaux critères dont 2.5.8 taille des cibles (24 × 24 px) et 3.3.8 authentification accessible (pas de test cognitif sans alternative, copier-coller et gestionnaires de mots de passe autorisés) ; suppression de 4.1.1 Parsing.',
          'Les WCAG 2.2 sont devenues la norme ISO/IEC 40500:2025.',
        ],
      },
      {
        title: 'Cadre légal du numérique',
        points: [
          'Loi n° 2005-102 du 11 février 2005, article 47 : accessibilité des services de communication en ligne.',
          'Décret n° 2019-768 : organismes publics, délégataires de service public et grandes entreprises.',
          'Ordonnance de 2023 : contrôle par l’Arcom ; sanction jusqu’à 50 000 € pour défaut d’accessibilité et 25 000 € pour les obligations de déclaration.',
          'European Accessibility Act (directive 2019/882), applicable depuis le 28 juin 2025 : e-commerce, banque, transport, livres numériques… Microentreprises de services exemptées. Norme technique : EN 301 549.',
        ],
      },
      {
        title: 'Handicap au travail',
        points: [
          'Obligation d’emploi des travailleurs handicapés (OETH) : 6 % de l’effectif dans les entreprises de 20 salariés et plus, sinon contribution versée à l’Agefiph.',
          'Référent handicap obligatoire dans les entreprises de 250 salariés et plus (loi de 2018).',
          'Aménagement raisonnable (Code du travail art. L5213-6) : adapter poste, horaires et accès à la formation, sauf charge disproportionnée ; un refus peut être une discrimination.',
          'RQTH (reconnaissance de la qualité de travailleur handicapé) délivrée par la MDPH ; Agefiph (privé) et FIPHFP (public) financent les aides.',
          'Chiffre souvent cité : environ 80 % des handicaps sont invisibles (maladies chroniques, troubles dys, troubles psychiques…).',
        ],
      },
      {
        title: 'Conception universelle de l’apprentissage',
        points: [
          'CAST (années 1990), 3 principes : plusieurs moyens d’engagement (le pourquoi), de représentation (le quoi), d’action et d’expression (le comment).',
          'UDL Guidelines 3.0 (2024) : l’objectif devient l’autonomie de l’apprenant (« learner agency »).',
          'On conçoit accessible par défaut, puis on ajoute des aménagements individuels sur demande, sans exiger de justificatif.',
        ],
      },
      {
        title: 'Formats de formation accessibles',
        points: [
          'Vidéos sous-titrées, transcriptions, audiodescription si l’information est visuelle.',
          'Supports structurés (titres, textes alternatifs, contrastes WCAG), PDF balisés ou HTML ; plateforme d’e-learning conforme RGAA.',
          'Interprète en LSF ou vélotypie ; temps majoré pour les évaluations ; laboratoires et CTF utilisables au clavier et avec lecteur d’écran.',
          'FALC (Facile à lire et à comprendre) : phrases courtes, un message par phrase, illustrations, relecture par les personnes concernées.',
          'Recueil confidentiel des besoins en amont, en lien avec le référent handicap.',
        ],
      },
    ],
    takeaways: [
      'RGAA 4.1.2 : 106 critères, 13 thématiques, basé sur WCAG 2.1 AA.',
      'WCAG : Perceptible, Utilisable, Compréhensible, Robuste ; niveaux A, AA, AAA.',
      'European Accessibility Act applicable depuis le 28 juin 2025.',
      'OETH 6 % dès 20 salariés ; référent handicap dès 250 salariés.',
      'Concevoir accessible par défaut (conception universelle), puis aménager sur demande.',
    ],
    sources: [
      { label: 'DINUM – Accessibilité numérique (RGAA)', url: 'https://accessibilite.numerique.gouv.fr/' },
      { label: 'DINUM – Déclaration d’accessibilité', url: 'https://accessibilite.numerique.gouv.fr/obligations/declaration-accessibilite/' },
      { label: 'W3C – WCAG 2.2 devient ISO/IEC 40500:2025', url: 'https://www.w3.org/WAI/news/2025-10-21/wcag22-iso' },
      { label: 'Arcom – Accessibilité des sites et services numériques', url: 'https://www.arcom.fr/en/we-know/our-missions/ensuring-relationship-of-plurality-and-social-cohesion/the-rights-of-handicapped-people/accessibility-of-digital-sites-and-services' },
      { label: 'Agefiph – Le référent handicap en entreprise', url: 'https://www.agefiph.fr/sites/default/files/medias/fichiers/2021-04/AGEFIPH_FICHE_RRH-Referent-handicap-en-entreprise.pdf' },
      { label: 'UDL Guidelines 3.0', url: 'https://ucdenver.edu/tips/resources/blog/TIPS-blog-recently-updated--universal-design-for-learning--udl--guidelines-3-0' },
    ],
  },
  questions: [
    {
      id: 't-c11-01',
      scope: 3,
      criteria: ['C11'],
      difficulty: 1,
      topic: 'WCAG',
      question: 'Quels sont les quatre principes des WCAG ?',
      keyPoints: [
        'Perceptible : l’information est présentée de façon perceptible par tous (alternatives, sous-titres, contrastes).',
        'Utilisable : l’interface est utilisable (clavier, temps suffisant).',
        'Compréhensible : contenu et fonctionnement compréhensibles.',
        'Robuste : compatible avec les technologies d’assistance.',
      ],
    },
    {
      id: 't-c11-02',
      scope: 3,
      criteria: ['C11'],
      difficulty: 1,
      topic: 'RGAA',
      question: 'Combien de critères et de thématiques compte le RGAA 4.1 ?',
      keyPoints: [
        '106 critères répartis en 13 thématiques.',
        'Fondé sur les WCAG 2.1 niveaux A et AA.',
      ],
    },
    {
      id: 't-c11-03',
      scope: 3,
      criteria: ['C11'],
      difficulty: 1,
      topic: 'Handicap au travail',
      question: 'Qu’est-ce que l’OETH ?',
      keyPoints: [
        'Obligation d’emploi des travailleurs handicapés : 6 % de l’effectif.',
        'Concerne les entreprises de 20 salariés et plus.',
        'À défaut, contribution annuelle versée à l’Agefiph.',
      ],
    },
    {
      id: 't-c11-04',
      scope: 3,
      criteria: ['C11'],
      difficulty: 2,
      topic: 'RGAA',
      question: 'Quels sont les trois états de conformité RGAA ?',
      keyPoints: [
        'Totalement conforme : 100 % des critères applicables respectés.',
        'Partiellement conforme : au moins 50 %.',
        'Non conforme : moins de 50 %, ou absence d’audit valide.',
      ],
    },
    {
      id: 't-c11-05',
      scope: 3,
      criteria: ['C11'],
      difficulty: 2,
      topic: 'Obligations',
      question: 'Que doit contenir une déclaration d’accessibilité ?',
      keyPoints: [
        'État de conformité et taux, contenus non accessibles (non-conformités, dérogations, contenus hors champ).',
        'Moyen de contact et droit de saisir le Défenseur des droits.',
        'Environnement de test et pages auditées. Validité de 3 ans.',
      ],
    },
    {
      id: 't-c11-06',
      scope: 3,
      criteria: ['C11'],
      difficulty: 2,
      topic: 'Cadre légal',
      question: 'Qu’est-ce que l’European Accessibility Act ?',
      keyPoints: [
        'Directive (UE) 2019/882, applicable depuis le 28 juin 2025.',
        'Couvre des produits et services privés : e-commerce, banque, transport, livres numériques, communications.',
        'Microentreprises de services exemptées ; norme technique EN 301 549.',
      ],
    },
    {
      id: 't-c11-07',
      scope: 3,
      criteria: ['C11'],
      difficulty: 2,
      topic: 'Handicap au travail',
      question: 'Qu’est-ce que l’aménagement raisonnable et à quoi oblige-t-il pour la formation ?',
      keyPoints: [
        'Obligation de l’employeur (Code du travail art. L5213-6) de prendre les mesures appropriées pour un travailleur handicapé.',
        'Inclut l’accès à la formation : formats, horaires, outils, temps majoré.',
        'Seule limite : une charge disproportionnée ; un refus injustifié peut être une discrimination.',
      ],
    },
    {
      id: 't-c11-08',
      scope: 3,
      criteria: ['C11'],
      difficulty: 2,
      topic: 'Formats',
      question: 'Donnez cinq adaptations concrètes pour rendre une formation accessible.',
      keyPoints: [
        'Sous-titres et transcriptions des vidéos.',
        'Supports structurés avec textes alternatifs et contrastes suffisants.',
        'Navigation clavier et compatibilité lecteur d’écran de la plateforme et des laboratoires.',
        'Temps majoré et pauses pour les évaluations ; formats asynchrones.',
        'Interprète LSF ou vélotypie si nécessaire ; documents en FALC.',
      ],
    },
    {
      id: 't-c11-09',
      scope: 3,
      criteria: ['C11'],
      difficulty: 3,
      topic: 'Conception universelle',
      question: 'Quels sont les trois principes de la conception universelle de l’apprentissage (CUA / UDL) ?',
      keyPoints: [
        'Offrir plusieurs moyens d’engagement (motiver : le pourquoi).',
        'Offrir plusieurs moyens de représentation (présenter : le quoi).',
        'Offrir plusieurs moyens d’action et d’expression (agir et montrer ses acquis : le comment).',
      ],
    },
    {
      id: 't-c11-10',
      scope: 3,
      criteria: ['C11'],
      difficulty: 3,
      topic: 'Sanctions',
      question: 'Qui contrôle l’accessibilité numérique en France et quelles sont les sanctions ?',
      keyPoints: [
        'L’Arcom (depuis l’ordonnance de 2023).',
        'Jusqu’à 50 000 € pour non-respect de l’obligation d’accessibilité.',
        'Jusqu’à 25 000 € pour les obligations complémentaires (déclaration, schéma pluriannuel, mention en page d’accueil).',
      ],
    },
    {
      id: 't-c11-11',
      scope: 3,
      criteria: ['C11'],
      difficulty: 3,
      topic: 'WCAG 2.2',
      question: 'Citez trois critères ajoutés par les WCAG 2.2.',
      keyPoints: [
        '2.4.11 Focus non masqué (AA).',
        '2.5.7 Mouvements de glissement et 2.5.8 Taille des cibles, 24 × 24 px (AA).',
        '3.2.6 Aide cohérente, 3.3.7 Saisie redondante (A), 3.3.8 Authentification accessible (AA).',
      ],
    },
    {
      id: 't-c11-12',
      scope: 3,
      criteria: ['C11'],
      difficulty: 4,
      topic: 'Sécurité et accessibilité',
      question: 'Que dit le critère WCAG 3.3.8 et quel lien avec la sécurité ?',
      keyPoints: [
        'Authentification accessible : pas de test cognitif (mémoriser, retranscrire, résoudre une énigme) sans alternative.',
        'Il faut autoriser le copier-coller et les gestionnaires de mots de passe.',
        'Rejoint la CNIL (ne pas bloquer le collage) et favorise les passkeys / WebAuthn, à la fois accessibles et résistants au phishing.',
      ],
    },
    {
      id: 't-c11-13',
      scope: 3,
      criteria: ['C11'],
      difficulty: 4,
      topic: 'Handicaps invisibles',
      question: 'Pourquoi ne pas conditionner les adaptations à une déclaration de handicap ?',
      keyPoints: [
        'Une grande partie des handicaps est invisible (environ 80 % selon les chiffres couramment cités) et beaucoup de personnes ne les déclarent pas.',
        'Concevoir accessible par défaut (conception universelle) profite à tous sans exiger de justification.',
        'Les aménagements individuels restent proposés sur demande, de façon confidentielle, avec le référent handicap.',
      ],
    },
  ],
}

export default C11
