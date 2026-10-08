import type { TheoryModule } from '../types'

const C6: TheoryModule = {
  theory: {
    code: 'C6',
    intro:
      'Une politique de sécurité fixe ce que l’organisation protège, pourquoi, avec quelles règles et sous la responsabilité de qui. Elle découle de l’analyse de risques, est portée par la direction et doit rester proportionnée à l’activité, aux contraintes et au budget. Elle se décline en une pyramide documentaire, du principe à la procédure.',
    sections: [
      {
        title: 'La PSSI : définition',
        points: [
          'Politique de Sécurité des Systèmes d’Information : document de référence qui formalise les enjeux, les besoins de sécurité (DICT), les principes, les règles et l’organisation.',
          'Elle couvre les volets organisationnel, humain, physique et technique.',
          'Elle découle de l’analyse de risques (EBIOS RM, ISO 27005) et est approuvée par la direction générale.',
          'Guide historique : « PSSI – Guide d’élaboration » de la DCSSI (2004), méthode en 4 phases : préalables, éléments stratégiques, sélection des principes et rédaction des règles, finalisation (validation, plan d’action, diffusion).',
        ],
      },
      {
        title: 'La pyramide documentaire',
        points: [
          '1. Politique générale : courte, stratégique, signée par la direction.',
          '2. Politiques thématiques : contrôle d’accès, cryptographie, sauvegarde, développement sécurisé, gestion des fournisseurs…',
          '3. Standards internes : exigences techniques mesurables, guides de durcissement.',
          '4. Procédures et modes opératoires : le « comment ».',
          '5. Enregistrements : les preuves d’application.',
          'Plus on descend, plus le document est détaillé et change souvent.',
        ],
      },
      {
        title: 'Ce qu’exige ISO/IEC 27001:2022',
        points: [
          'Clause 5.2 : la direction établit une politique adaptée à la mission, qui inclut des objectifs de sécurité (ou un cadre pour les fixer), l’engagement de satisfaire les exigences applicables et l’engagement d’amélioration continue.',
          'La politique est documentée, communiquée en interne et mise à disposition des parties intéressées selon le cas.',
          'Annexe A 5.1 : politique générale et politiques thématiques approuvées par la direction, communiquées, et revues à intervalles planifiés ou lors de changements importants.',
          'Clauses liées : 5.1 (leadership), 5.3 (rôles, responsabilités, autorités).',
        ],
      },
      {
        title: 'PSSI de l’État (PSSIE)',
        points: [
          'Instituée par la circulaire du Premier ministre n° 5725/SG du 17 juillet 2014 pour les administrations.',
          'Nouveau cadre de gouvernance : décret n° 2019-1088 et instruction interministérielle n° 1337/SGDSN/ANSSI du 26 octobre 2022 ; les règles de la PSSIE restent la référence.',
          'Bon modèle de structure et de règles pour une PSSI d’entreprise.',
        ],
      },
      {
        title: 'Rôles et responsabilités',
        points: [
          'Direction : approuve la politique, alloue les moyens, accepte les risques résiduels (NIS2 art. 20 la rend responsable).',
          'RSSI : pilote la sécurité, conseille et contrôle ; idéalement indépendant de la DSI.',
          'DSI : met en œuvre et exploite. DPO (RGPD art. 37 à 39) : conseille et contrôle la conformité RGPD, sans conflit d’intérêts.',
          'Propriétaires métier : expriment les besoins, classent les informations, valident les accès. Utilisateurs : respectent la charte.',
        ],
      },
      {
        title: 'Charte informatique',
        points: [
          'Règles d’usage des moyens informatiques par les utilisateurs.',
          'Seule, elle n’a pas de valeur contraignante : elle devient opposable (et peut fonder une sanction disciplinaire) lorsqu’elle est annexée au règlement intérieur.',
          'Procédure : consultation du CSE, information des salariés, transmission à l’inspection du travail. Règlement intérieur obligatoire à partir de 50 salariés.',
          'Elle respecte la proportionnalité de la surveillance (Code du travail art. L1121-1) et l’information des salariés (RGPD).',
        ],
      },
      {
        title: 'Classification de l’information',
        points: [
          'Niveaux de sensibilité selon l’impact d’une atteinte (ex. Public, Interne, Confidentiel, Secret).',
          'Chaque niveau impose des règles de marquage, stockage, chiffrement, diffusion et destruction (ISO 27001 A 5.12 et A 5.13).',
          'C’est le propriétaire de l’information qui la classe.',
          'État : depuis 2021 (IGI 1300), deux niveaux de classification, « Secret » et « Très Secret » ; « Diffusion Restreinte » est une mention de protection, pas une classification.',
        ],
      },
      {
        title: 'Justifier économiquement : ROSI',
        points: [
          'SLE (perte unitaire) = valeur de l’actif × facteur d’exposition.',
          'ALE (perte annuelle attendue) = SLE × ARO (fréquence annuelle).',
          'ROSI (ENISA) = (ALE × taux d’atténuation − coût de la mesure) / coût de la mesure. Un ROSI positif signifie une mesure rentable.',
          'Principe de proportionnalité : une mesure ne doit pas coûter plus que la perte qu’elle évite.',
        ],
      },
      {
        title: 'NIS2 : ce que la politique doit couvrir',
        points: [
          'Art. 20 : les dirigeants approuvent les mesures, supervisent leur mise en œuvre, peuvent être tenus responsables et doivent se former.',
          'Art. 21 § 2, dix mesures minimales : analyse des risques et politiques de sécurité ; gestion des incidents ; continuité (sauvegardes, crise) ; chaîne d’approvisionnement ; sécurité de l’acquisition, du développement et de la maintenance (dont gestion et divulgation des vulnérabilités) ; évaluation de l’efficacité ; cyberhygiène et formation ; cryptographie ; sécurité RH, contrôle d’accès et gestion des actifs ; MFA et communications sécurisées.',
          'Amendes : jusqu’à 10 M€ ou 2 % du CA mondial (entités essentielles), 7 M€ ou 1,4 % (entités importantes).',
        ],
      },
    ],
    takeaways: [
      'La PSSI découle de l’analyse de risques et est signée par la direction.',
      'Pyramide : politique → politiques thématiques → standards → procédures → preuves.',
      'ISO 27001 clause 5.2 : politique adaptée, objectifs, engagement de conformité et d’amélioration continue.',
      'La charte n’est opposable qu’annexée au règlement intérieur.',
      'ALE = SLE × ARO ; ROSI = (gain de réduction du risque − coût) / coût.',
    ],
    sources: [
      { label: 'ANSSI – Cadre de gouvernance de la sécurité numérique de l’État (PSSIE)', url: 'https://cyber.gouv.fr/cadre-de-gouvernance-de-la-securite-numerique-de-letat-pssie' },
      { label: 'ISMS.online – ISO 27001:2022 A 5.1 Politiques de sécurité', url: 'https://www.isms.online/iso-27001/annex-a-2022/5-1-information-security-policies-2022/' },
      { label: 'ENISA – Introduction to Return on Security Investment', url: 'https://www.enisa.europa.eu/publications/introduction-to-return-on-security-investment' },
      { label: 'NIS2 – article 21 (mesures de gestion des risques)', url: 'https://www.springlex.eu/fr/packages/nis2/nis2-directive/article-21/' },
      { label: 'OpenClassrooms – Définissez la politique de sécurité de votre entreprise', url: 'https://openclassrooms.com/fr/courses/1734201-definissez-la-politique-de-securite-de-votre-entreprise' },
    ],
  },
  questions: [
    {
      id: 't-c6-01',
      scope: 3,
      criteria: ['C6'],
      difficulty: 1,
      topic: 'PSSI',
      question: 'Qu’est-ce qu’une PSSI et qui la valide ?',
      keyPoints: [
        'Politique de Sécurité des Systèmes d’Information : enjeux, besoins de sécurité, principes, règles, organisation.',
        'Elle découle de l’analyse de risques.',
        'Elle est approuvée et portée par la direction générale.',
      ],
    },
    {
      id: 't-c6-02',
      scope: 3,
      criteria: ['C6'],
      difficulty: 1,
      topic: 'Documentation',
      question: 'Décrivez la pyramide documentaire de la sécurité.',
      keyPoints: [
        'Politique générale (stratégique) → politiques thématiques → standards techniques → procédures → enregistrements (preuves).',
        'Du plus stable et général au plus détaillé et changeant.',
      ],
    },
    {
      id: 't-c6-03',
      scope: 3,
      criteria: ['C6'],
      difficulty: 1,
      topic: 'Rôles',
      question: 'Différence entre RSSI, DSI et DPO ?',
      keyPoints: [
        'DSI : met en œuvre et exploite le système d’information.',
        'RSSI : définit et pilote la sécurité, contrôle ; idéalement indépendant de la DSI.',
        'DPO : conseille et contrôle la conformité RGPD, point de contact de la CNIL, sans conflit d’intérêts.',
      ],
    },
    {
      id: 't-c6-04',
      scope: 3,
      criteria: ['C6'],
      difficulty: 2,
      topic: 'ISO 27001',
      question: 'Que doit contenir la politique de sécurité selon ISO 27001:2022 (clause 5.2) ?',
      keyPoints: [
        'Être adaptée à la mission de l’organisation.',
        'Inclure des objectifs de sécurité ou un cadre pour les fixer.',
        'Comprendre l’engagement de satisfaire les exigences applicables.',
        'Comprendre l’engagement d’amélioration continue du SMSI.',
        'Être documentée, communiquée et disponible pour les parties intéressées.',
      ],
    },
    {
      id: 't-c6-05',
      scope: 3,
      criteria: ['C6'],
      difficulty: 2,
      topic: 'Charte',
      question: 'Une charte informatique est-elle juridiquement opposable aux salariés ?',
      keyPoints: [
        'Pas seule : elle devient opposable lorsqu’elle est annexée au règlement intérieur (ou suit la même procédure).',
        'Procédure : consultation du CSE, information des salariés, transmission à l’inspection du travail.',
        'Elle peut alors fonder une sanction disciplinaire.',
      ],
    },
    {
      id: 't-c6-06',
      scope: 3,
      criteria: ['C6'],
      difficulty: 2,
      topic: 'Classification',
      question: 'À quoi sert la classification de l’information et qui classe ?',
      keyPoints: [
        'Attribuer un niveau de sensibilité (ex. Public, Interne, Confidentiel, Secret) selon l’impact d’une atteinte.',
        'Chaque niveau impose des règles de marquage, stockage, chiffrement, diffusion et destruction.',
        'C’est le propriétaire de l’information (le métier) qui classe, pas la DSI.',
      ],
    },
    {
      id: 't-c6-07',
      scope: 3,
      criteria: ['C6'],
      difficulty: 2,
      topic: 'ROSI',
      question: 'Définissez SLE, ARO et ALE.',
      keyPoints: [
        'SLE (Single Loss Expectancy) : perte pour un incident = valeur de l’actif × facteur d’exposition.',
        'ARO (Annualized Rate of Occurrence) : nombre d’occurrences attendues par an.',
        'ALE (Annualized Loss Expectancy) = SLE × ARO.',
      ],
    },
    {
      id: 't-c6-08',
      scope: 3,
      criteria: ['C6'],
      difficulty: 3,
      topic: 'ROSI',
      question: 'Calculez : ALE = 200 000 €, la mesure réduit le risque de 80 % et coûte 40 000 € par an. Quel ROSI ?',
      keyPoints: [
        'Gain = 200 000 × 0,8 = 160 000 €.',
        'ROSI = (160 000 − 40 000) / 40 000 = 3, soit 300 %.',
        'La mesure est rentable (ROSI positif).',
      ],
    },
    {
      id: 't-c6-09',
      scope: 3,
      criteria: ['C6'],
      difficulty: 3,
      topic: 'NIS2',
      question: 'Que dit l’article 20 de NIS2 sur les dirigeants ?',
      keyPoints: [
        'Les organes de direction approuvent les mesures de gestion des risques cyber.',
        'Ils supervisent leur mise en œuvre et peuvent être tenus responsables des manquements.',
        'Ils doivent suivre une formation en cybersécurité.',
      ],
    },
    {
      id: 't-c6-10',
      scope: 3,
      criteria: ['C6'],
      difficulty: 3,
      topic: 'NIS2',
      question: 'Citez au moins six des dix mesures minimales de l’article 21 de NIS2.',
      keyPoints: [
        'Analyse des risques et politiques de sécurité ; gestion des incidents ; continuité et gestion de crise.',
        'Sécurité de la chaîne d’approvisionnement ; sécurité de l’acquisition, du développement et de la maintenance.',
        'Évaluation de l’efficacité ; cyberhygiène et formation ; cryptographie.',
        'Sécurité RH, contrôle d’accès, gestion des actifs ; MFA et communications sécurisées.',
      ],
    },
    {
      id: 't-c6-11',
      scope: 3,
      criteria: ['C6'],
      difficulty: 3,
      topic: 'Proportionnalité',
      question: 'Comment rendre une politique de sécurité « adaptée aux contraintes » de l’entreprise ?',
      keyPoints: [
        'Partir de l’analyse de risques : les règles ciblent les risques réels, pas une liste générique.',
        'Proportionnalité : coût des mesures comparé aux pertes évitées (ROSI).',
        'Prendre en compte les contraintes métier (rythme de livraison, disponibilité), réglementaires et budgétaires.',
        'Prévoir des exceptions documentées et des mesures compensatoires plutôt que des règles inapplicables.',
      ],
    },
    {
      id: 't-c6-12',
      scope: 3,
      criteria: ['C6'],
      difficulty: 4,
      topic: 'Classification',
      question: 'Quels sont les niveaux de classification de l’État depuis la réforme de 2021 ?',
      keyPoints: [
        'Deux niveaux : « Secret » et « Très Secret » (IGI 1300, arrêté du 9 août 2021).',
        '« Confidentiel Défense » a été supprimé.',
        '« Diffusion Restreinte » est une mention de protection, pas un niveau de classification.',
      ],
    },
    {
      id: 't-c6-13',
      scope: 3,
      criteria: ['C6'],
      difficulty: 4,
      topic: 'Gouvernance',
      question: 'Pourquoi rattacher le RSSI à la direction générale plutôt qu’à la DSI ?',
      keyPoints: [
        'Éviter le conflit d’intérêts : la DSI est jugée sur la disponibilité et les délais, le RSSI contrôle la sécurité de ce qu’elle opère.',
        'Donner du poids aux arbitrages risque / coût auprès de la direction.',
        'Cohérent avec NIS2, qui place la responsabilité au niveau des dirigeants.',
      ],
    },
  ],
}

export default C6
