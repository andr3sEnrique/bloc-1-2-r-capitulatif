import type { TheoryModule } from '../types'

const C3: TheoryModule = {
  theory: {
    code: 'C3',
    intro:
      'Analyser les mesures existantes, c’est comparer ce qui est réellement en place à ce qu’un référentiel ou l’analyse de risques attend, puis mesurer l’écart. Une mesure ne compte que si elle existe, qu’elle est efficace et qu’on peut le prouver. Les référentiels de mesures (ISO 27002, guide d’hygiène ANSSI, CIS Controls, NIST CSF) servent d’étalon.',
    sections: [
      {
        title: 'Méthode d’analyse d’écarts',
        points: [
          '1. Choisir le référentiel des mesures attendues (ISO 27002, guide d’hygiène, CIS, exigences réglementaires, résultats de l’analyse de risques).',
          '2. Inventorier les mesures existantes (entretiens, documents, observations, tests techniques).',
          '3. Coter chaque mesure (conformité ou niveau de maturité) et mesurer l’écart.',
          '4. Prioriser les écarts selon le risque et construire le plan d’action.',
        ],
      },
      {
        title: 'Existante, efficace, prouvée',
        points: [
          'Existante : documentée et déployée.',
          'Efficace : elle atteint réellement son objectif de réduction du risque (ISO 27001 §9.1 : évaluer la performance ; la CSPN évalue les fonctions « en conformité et en efficacité »).',
          'Prouvée : appuyée sur des preuves vérifiables (enregistrements, journaux, résultats de tests).',
          'Distinguer conformité (respect d’un référentiel) et sécurité (résistance réelle à un attaquant). Cette grille est pédagogique, pas un vocabulaire normalisé.',
        ],
      },
      {
        title: 'ISO/IEC 27002:2022',
        points: [
          '93 mesures (114 dans la version 2013) en 4 thèmes : organisationnelles (37), liées aux personnes (8), physiques (14), technologiques (34).',
          '11 nouvelles mesures, dont : renseignement sur les menaces (5.7), sécurité du cloud (5.23), continuité des TIC (5.30), gestion des configurations (8.9), masquage des données (8.11), prévention des fuites (8.12), filtrage web (8.23) et codage sécurisé (8.28).',
          'Attributs de chaque mesure : type (préventive, détective, corrective), propriétés C/I/D, concepts de cybersécurité, capacités opérationnelles, domaines de sécurité.',
          'Ces 93 mesures forment l’annexe A d’ISO 27001:2022.',
        ],
      },
      {
        title: 'Guide d’hygiène informatique de l’ANSSI',
        points: [
          '« Renforcer la sécurité de son système d’information en 42 mesures » (version 2.0, 2017 ; première version 2013).',
          '10 chapitres : sensibiliser et former ; connaître le SI ; authentifier et contrôler les accès ; sécuriser les postes ; sécuriser le réseau ; sécuriser l’administration ; gérer le nomadisme ; maintenir le SI à jour ; superviser, auditer, réagir ; pour aller plus loin.',
          'Deux niveaux : standard puis renforcé, avec un outil de suivi pour faire l’état des lieux.',
        ],
      },
      {
        title: 'CIS Critical Security Controls et NIST CSF',
        points: [
          'CIS Controls v8.1 (2024) : 18 contrôles et 153 mesures (safeguards), dont le contrôle 16 « sécurité des logiciels applicatifs ».',
          'Implementation Groups : IG1 (56 mesures, hygiène de base), IG2, IG3 (ensemble complet).',
          'NIST CSF 2.0 (février 2024) : 6 fonctions — Govern (nouvelle), Identify, Protect, Detect, Respond, Recover.',
          'Le CSF compare un profil actuel à un profil cible : c’est une analyse d’écarts formalisée. 4 niveaux (Tiers) : Partial, Risk Informed, Repeatable, Adaptive.',
        ],
      },
      {
        title: 'Échelles de maturité',
        points: [
          'Méthode « Maturité SSI » de l’ANSSI (2007), inspirée d’ISO/IEC 21827 : 0 inexistant, 1 informel, 2 répétable et suivi, 3 défini, 4 contrôlé (indicateurs), 5 optimisé en continu. Les niveaux sont cumulatifs.',
          'CMMI : 1 Initial, 2 Managed, 3 Defined, 4 Quantitatively Managed, 5 Optimizing.',
          'Un radar par domaine visualise l’écart entre maturité actuelle et cible.',
        ],
      },
      {
        title: 'Défense en profondeur',
        points: [
          'Principe (mémento DCSSI, 2004) : plusieurs lignes de défense indépendantes, chacune devant affaiblir, retarder ou neutraliser l’attaque.',
          'Fiche ANSSI 2026 « Les essentiels – Défense en profondeur » : tout composant peut être faillible ; mesures multiples, robustes et indépendantes.',
          '4 piliers : gouvernance (piloter), protection (prévenir et bloquer), défense (détecter et réagir), résilience (résister et restaurer).',
          'Analyser l’existant, c’est vérifier que chaque pilier est couvert et que les couches ne dépendent pas d’un même point de défaillance.',
        ],
      },
    ],
    takeaways: [
      'Analyse d’écarts : référentiel attendu → inventaire de l’existant → cotation → écart → priorisation.',
      'Une mesure compte si elle est existante, efficace et prouvée.',
      'ISO 27002:2022 : 93 mesures, 4 thèmes (37 / 8 / 14 / 34) ; 8.28 = codage sécurisé.',
      'Guide d’hygiène ANSSI : 42 mesures, 10 chapitres, niveaux standard et renforcé.',
      'NIST CSF 2.0 : Govern, Identify, Protect, Detect, Respond, Recover.',
    ],
    sources: [
      { label: 'ANSSI – Guide d’hygiène informatique', url: 'https://messervices.cyber.gouv.fr/guides/guide-dhygiene-informatique' },
      { label: 'SGS – Principaux changements d’ISO/IEC 27002:2022', url: 'https://www.sgs.com/news/2022/07/key-changes-in-iso-iec-27002-2022' },
      { label: 'CIS Critical Security Controls v8.1', url: 'https://www.cisecurity.org/controls/v8-1' },
      { label: 'NIST Cybersecurity Framework 2.0', url: 'https://www.nist.gov/cyberframework' },
      { label: 'ANSSI – Méthode Maturité SSI (2007)', url: 'https://messervices.cyber.gouv.fr/documents-guides/maturitessi-methode-2007-11-02.pdf' },
      { label: 'ANSSI – Les essentiels : défense en profondeur', url: 'https://messervices.cyber.gouv.fr/documents-guides/anssi_essentiels_defense_profondeur_methodologie_1.0.pdf' },
    ],
  },
  questions: [
    {
      id: 't-c3-01',
      scope: 3,
      criteria: ['C3'],
      difficulty: 1,
      topic: 'Méthode',
      question: 'Quelles sont les étapes d’une analyse d’écarts ?',
      keyPoints: [
        'Choisir le référentiel des mesures attendues.',
        'Inventorier les mesures existantes.',
        'Coter chaque mesure et mesurer l’écart.',
        'Prioriser selon le risque et en déduire le plan d’action.',
      ],
    },
    {
      id: 't-c3-02',
      scope: 3,
      criteria: ['C3'],
      difficulty: 1,
      topic: 'Principes',
      question: 'Qu’est-ce que la défense en profondeur ?',
      keyPoints: [
        'Superposer plusieurs lignes de défense indépendantes.',
        'Chacune doit ralentir, gêner ou bloquer l’attaque, pour qu’une seule défaillance ne suffise pas.',
        'Elle couvre gouvernance, protection, détection-réaction et résilience.',
      ],
    },
    {
      id: 't-c3-03',
      scope: 3,
      criteria: ['C3'],
      difficulty: 1,
      topic: 'Guide d’hygiène',
      question: 'Combien de mesures compte le guide d’hygiène informatique de l’ANSSI ?',
      keyPoints: [
        '42 mesures, réparties en 10 chapitres.',
        'Deux niveaux : standard et renforcé.',
      ],
    },
    {
      id: 't-c3-04',
      scope: 3,
      criteria: ['C3'],
      difficulty: 2,
      topic: 'ISO 27002',
      question: 'Combien de mesures compte ISO 27002:2022 et comment sont-elles regroupées ?',
      keyPoints: [
        '93 mesures (contre 114 en 2013).',
        '4 thèmes : organisationnelles (37), liées aux personnes (8), physiques (14), technologiques (34).',
        '11 mesures nouvelles, dont le codage sécurisé (8.28).',
      ],
    },
    {
      id: 't-c3-05',
      scope: 3,
      criteria: ['C3'],
      difficulty: 2,
      topic: 'Efficacité',
      question: 'Pourquoi une mesure « existante » ne suffit-elle pas ?',
      keyPoints: [
        'Elle peut être mal configurée, contournable ou ne pas couvrir le risque visé : il faut vérifier son efficacité.',
        'Il faut aussi pouvoir le prouver (journaux, résultats de tests, enregistrements).',
        'Exemple : un pare-feu présent ne protège pas d’une injection SQL qui passe par le flux HTTPS autorisé.',
      ],
    },
    {
      id: 't-c3-06',
      scope: 3,
      criteria: ['C3'],
      difficulty: 2,
      topic: 'NIST CSF',
      question: 'Quelles sont les 6 fonctions du NIST CSF 2.0 ?',
      keyPoints: [
        'Govern (nouvelle en 2.0), Identify, Protect, Detect, Respond, Recover.',
        'Le CSF compare un profil actuel à un profil cible pour bâtir un plan d’action.',
      ],
    },
    {
      id: 't-c3-07',
      scope: 3,
      criteria: ['C3'],
      difficulty: 2,
      topic: 'Maturité',
      question: 'Décrivez une échelle de maturité de 0 à 5.',
      keyPoints: [
        '0 inexistant ; 1 informel ; 2 répétable et suivi ; 3 défini (processus documenté).',
        '4 contrôlé (piloté par des indicateurs) ; 5 optimisé en continu.',
        'Méthode Maturité SSI de l’ANSSI, inspirée d’ISO/IEC 21827 ; les niveaux sont cumulatifs.',
      ],
    },
    {
      id: 't-c3-08',
      scope: 3,
      criteria: ['C3'],
      difficulty: 2,
      topic: 'CIS',
      question: 'Que sont les CIS Controls et les Implementation Groups ?',
      keyPoints: [
        '18 contrôles de sécurité priorisés (v8.1, 2024), déclinés en 153 mesures.',
        'IG1 : hygiène de base (56 mesures) ; IG2 et IG3 : niveaux supplémentaires pour des organisations plus exposées.',
        'Le contrôle 16 porte sur la sécurité des logiciels applicatifs.',
      ],
    },
    {
      id: 't-c3-09',
      scope: 3,
      criteria: ['C3'],
      difficulty: 3,
      topic: 'ISO 27002',
      question: 'Citez quatre mesures nouvelles d’ISO 27002:2022 utiles à un développeur.',
      keyPoints: [
        '8.28 Codage sécurisé.',
        '8.9 Gestion des configurations ; 8.11 Masquage des données ; 8.12 Prévention des fuites de données.',
        '5.7 Renseignement sur les menaces ; 5.23 Sécurité de l’usage du cloud.',
      ],
    },
    {
      id: 't-c3-10',
      scope: 3,
      criteria: ['C3'],
      difficulty: 3,
      topic: 'Conformité',
      question: 'Quelle différence entre conformité et sécurité ?',
      keyPoints: [
        'Conformité : respecter les exigences d’un référentiel (on coche des cases).',
        'Sécurité : résister réellement à un attaquant dans le contexte de l’organisation.',
        'On peut être conforme et vulnérable : d’où la combinaison approche par conformité + approche par scénarios.',
      ],
    },
    {
      id: 't-c3-11',
      scope: 3,
      criteria: ['C3'],
      difficulty: 3,
      topic: 'ISO 27002',
      question: 'Quels attributs ISO 27002:2022 associe-t-elle à chaque mesure ?',
      keyPoints: [
        'Type de mesure : préventive, détective, corrective.',
        'Propriétés de sécurité : confidentialité, intégrité, disponibilité.',
        'Concepts de cybersécurité (identifier, protéger, détecter, répondre, récupérer), capacités opérationnelles, domaines de sécurité.',
      ],
    },
    {
      id: 't-c3-12',
      scope: 3,
      criteria: ['C3'],
      difficulty: 4,
      topic: 'Défense en profondeur',
      question: 'Quels sont les 4 piliers de la défense en profondeur selon l’ANSSI (2026) ?',
      keyPoints: [
        'Gouvernance : piloter et cadrer.',
        'Protection : prévenir et bloquer.',
        'Défense : détecter et réagir.',
        'Résilience : résister et restaurer.',
        'Mesures multiples, robustes et indépendantes ; ils correspondent aux domaines de sécurité d’ISO 27002.',
      ],
    },
    {
      id: 't-c3-13',
      scope: 3,
      criteria: ['C3'],
      difficulty: 4,
      topic: 'Référentiels',
      question: 'Quel référentiel choisir pour une analyse d’écarts, et pourquoi ?',
      keyPoints: [
        'Guide d’hygiène ANSSI : socle français simple, adapté aux PME et à un premier état des lieux.',
        'ISO 27002 : référentiel complet, cohérent avec une démarche ISO 27001.',
        'CIS Controls : priorisé et très opérationnel ; NIST CSF : vision par fonctions et profils cible.',
        'Le choix dépend du contexte, des obligations (NIS2, secteur) et de l’objectif (certification, maturité).',
      ],
    },
  ],
}

export default C3
