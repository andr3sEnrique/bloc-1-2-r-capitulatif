import type { TheoryModule } from '../types'

const C5: TheoryModule = {
  theory: {
    code: 'C5',
    intro:
      'Préparer une certification, c’est savoir ce que l’on fait certifier (un produit, un système de management, un prestataire), selon quel schéma, par qui, et quelles preuves fournir. Il faut distinguer certification, qualification et homologation, et constituer un dossier de preuves vérifiables avant l’évaluation.',
    sections: [
      {
        title: 'Certification, qualification, homologation',
        points: [
          'Certification : un tiers atteste qu’un produit dans une version donnée (CSPN, Critères Communs) ou un système de management (ISO 27001) respecte un référentiel. Elle ne se transfère pas aux versions suivantes.',
          'Qualification ANSSI : recommandation de l’État portant sur un produit ou un prestataire (PASSI, PRIS, PDIS, PACS, SecNumCloud), valable environ 2 à 3 ans.',
          'Homologation : décision interne d’une autorité de l’organisation qui accepte les risques résiduels d’un système d’information donné.',
          'Elles s’emboîtent : produits certifiés et audits PASSI alimentent le dossier d’homologation.',
        ],
      },
      {
        title: 'La CSPN',
        points: [
          'Certification de Sécurité de Premier Niveau, délivrée par l’ANSSI ; procédure ANSSI-CSPN-CER-P-01 v7.0 (mai 2026).',
          'Acteurs : le commanditaire (fournit produit, cible de sécurité, documentation), le CESTI agréé (évalue et rédige le rapport technique), le centre de certification de l’ANSSI (valide et délivre le certificat).',
          'Charge de référence : 25 hommes-jours sur 8 semaines, + 10 si des fonctions reposent sur la cryptographie (entre 15 et 60 hommes-jours).',
          'Phases : analyse de la cible, installation, analyse de la documentation, conformité des fonctions, analyse de résistance (vulnérabilités et tests de pénétration).',
          'Validité : 3 ans. En cas d’échec, réévaluation possible sous 4 mois. Catalogue des produits certifiés publié par l’ANSSI. Reconnaissance mutuelle avec la BSZ allemande.',
        ],
      },
      {
        title: 'La cible de sécurité CSPN',
        points: [
          'Identification du produit et de sa version, usage prévu, environnement technique et organisationnel.',
          'Biens sensibles à protéger, attaquants (local, distant), scénarios de menace.',
          'Fonctions évaluées (en conformité et en efficacité), fonctions non évaluées et fonctions désactivées.',
          'Liste des composants tiers (commerciaux et open source) avec leurs versions.',
        ],
      },
      {
        title: 'Les Critères Communs (ISO/IEC 15408)',
        points: [
          'Profil de protection (PP) : besoins génériques d’une catégorie de produits ; Security Target (ST) : cible propre au produit évalué (la TOE).',
          'EAL1 à EAL7 : de « testé fonctionnellement » à « conception vérifiée formellement ». Un EAL mesure la profondeur de l’évaluation, pas le niveau de sécurité du produit.',
          'Reconnaissance : CCRA (jusqu’à EAL2), SOG-IS (fin des nouveaux certificats en février 2026), remplacé en Europe par le schéma EUCC (applicable depuis février 2025, niveaux « substantiel » et « élevé », certificats de 5 ans maximum).',
        ],
      },
      {
        title: 'La certification ISO/IEC 27001:2022',
        points: [
          'Étape 1 : revue documentaire (périmètre, analyse de risques, déclaration d’applicabilité, clauses 4 à 10).',
          'Étape 2 : évaluation de la mise en œuvre et de l’efficacité du SMSI.',
          'Cycle de 3 ans : audits de surveillance annuels, puis renouvellement.',
          'Déclaration d’applicabilité (SoA) : liste les mesures de l’annexe A (93), justifie leur inclusion ou exclusion et leur état de mise en œuvre.',
          'Transition : les certificats ISO 27001:2013 ont expiré le 31 octobre 2025.',
        ],
      },
      {
        title: 'Preuves et non-conformités',
        points: [
          'Preuve d’audit (ISO 19011) : enregistrements, faits ou informations vérifiables, issus de documents, d’observations, d’entretiens ou de tests.',
          'Non-conformité majeure : affecte la capacité du système à atteindre ses résultats ; elle bloque la certification jusqu’à correction vérifiée. Mineure : n’affecte pas cette capacité.',
          'Dossier de preuves type : politique de sécurité, analyse de risques, déclaration d’applicabilité, plan de traitement, audits internes, revues de direction, indicateurs, journaux, rapports de tests et de re-tests.',
        ],
      },
      {
        title: 'L’homologation de sécurité',
        points: [
          'Base légale : RGS (décret 2010-112) pour les administrations ; LPM pour les SIIV des OIV.',
          'Nouveau guide ANSSI / DINUM (avril 2025) : homologation en 4 étapes — comité d’homologation, niveau de démarche et dossier, évaluation et avis, commission d’homologation.',
          '3 niveaux de démarche : simplifié, intermédiaire, renforcé ; fin des homologations provisoires.',
          'Durée recommandée : 3 ans au plus, sans renouvellement automatique.',
        ],
      },
    ],
    takeaways: [
      'Certification = tiers sur un produit ou un système ; qualification = recommandation de l’État ; homologation = décision interne d’accepter les risques.',
      'CSPN : ANSSI + CESTI, cible de sécurité, 25 h·j de référence, valable 3 ans.',
      'Critères Communs : EAL1 à EAL7 ; EUCC remplace SOG-IS en Europe.',
      'ISO 27001 : étape 1 documentaire, étape 2 efficacité, cycle de 3 ans avec surveillance annuelle.',
      'Une non-conformité majeure ouverte bloque la certification.',
    ],
    sources: [
      { label: 'ANSSI – Procédure CSPN (CER-P-01 v7.0)', url: 'https://cyber.gouv.fr/documents/51/ANSSI-CSPN-CER-P-01_Certification_de_securite_de_premier_niveau_v7.0.pdf' },
      { label: 'ANSSI – Critères d’évaluation CSPN (CER-P-02 v5.0)', url: 'https://cyber.gouv.fr/documents/770/ANSSI-CSPN-CER-P-02_Criteres_pour_evaluation_en_vue_dune_CSPN_v5.0.pdf' },
      { label: 'ANSSI – FAQ qualification et certification', url: 'https://cyber.gouv.fr/offre-de-service/solutions-certifiees-et-qualifiees/comprendre-levaluation-de-securite/faq-qualification-certification/' },
      { label: 'ANSSI – Accords de reconnaissance Critères Communs', url: 'https://cyber.gouv.fr/offre-de-service/solutions-certifiees-et-qualifiees/comprendre-levaluation-de-securite/certification-de-produits/accords-de-reconnaissance-criteres-communs/' },
      { label: 'ANSSI / DINUM – Guide de l’homologation de sécurité (2025)', url: 'https://messervices.cyber.gouv.fr/documents-guides/guide-homologation-securite-web-04-2025.pdf' },
      { label: 'LRQA – Transition ISO 27001:2022', url: 'https://www.lrqa.com/en/insights/articles/preparing-for-iso-270012022-transition-by-october-2025/' },
    ],
  },
  questions: [
    {
      id: 't-c5-01',
      scope: 3,
      criteria: ['C5'],
      difficulty: 1,
      topic: 'Notions',
      question: 'Différence entre certification, qualification et homologation ?',
      keyPoints: [
        'Certification : un tiers atteste la conformité d’un produit ou d’un système de management à un référentiel.',
        'Qualification : recommandation de l’ANSSI pour un produit ou un prestataire de confiance.',
        'Homologation : décision interne d’une autorité qui accepte les risques résiduels d’un SI.',
      ],
    },
    {
      id: 't-c5-02',
      scope: 3,
      criteria: ['C5'],
      difficulty: 1,
      topic: 'CSPN',
      question: 'Qui intervient dans une certification CSPN ?',
      keyPoints: [
        'Le commanditaire : fournit le produit, la cible de sécurité et la documentation.',
        'Le CESTI agréé : réalise l’évaluation et rédige le rapport technique.',
        'Le centre de certification de l’ANSSI : valide et délivre le certificat.',
      ],
    },
    {
      id: 't-c5-03',
      scope: 3,
      criteria: ['C5'],
      difficulty: 2,
      topic: 'CSPN',
      question: 'Que contient une cible de sécurité CSPN ?',
      keyPoints: [
        'Produit et version, usage prévu, environnement d’utilisation.',
        'Biens sensibles, attaquants, scénarios de menace.',
        'Fonctions évaluées, non évaluées et désactivées ; composants tiers et leurs versions.',
      ],
    },
    {
      id: 't-c5-04',
      scope: 3,
      criteria: ['C5'],
      difficulty: 2,
      topic: 'CSPN',
      question: 'Quelle est la charge et la durée de validité d’une CSPN ?',
      keyPoints: [
        'Référence : 25 hommes-jours sur 8 semaines, + 10 si cryptographie (de 15 à 60 hommes-jours).',
        'Validité : 3 ans.',
        'Évaluation en temps contraint, en conformité et en résistance.',
      ],
    },
    {
      id: 't-c5-05',
      scope: 3,
      criteria: ['C5'],
      difficulty: 2,
      topic: 'ISO 27001',
      question: 'Décrivez le cycle de certification ISO 27001.',
      keyPoints: [
        'Étape 1 : revue documentaire et de préparation.',
        'Étape 2 : audit de la mise en œuvre et de l’efficacité du SMSI.',
        'Certificat valable 3 ans avec audits de surveillance annuels, puis renouvellement.',
      ],
    },
    {
      id: 't-c5-06',
      scope: 3,
      criteria: ['C5'],
      difficulty: 2,
      topic: 'ISO 27001',
      question: 'Qu’est-ce que la Déclaration d’applicabilité (SoA) ?',
      keyPoints: [
        'Document exigé par ISO 27001 (6.1.3 d).',
        'Liste les mesures de l’annexe A (93 en 2022) retenues, justifie leur inclusion ou leur exclusion.',
        'Indique si chaque mesure est mise en œuvre ; c’est une pièce centrale de l’audit.',
      ],
    },
    {
      id: 't-c5-07',
      scope: 3,
      criteria: ['C5'],
      difficulty: 2,
      topic: 'Preuves',
      question: 'Qu’est-ce qu’une preuve d’audit ? Donnez des exemples.',
      keyPoints: [
        'Une information vérifiable et pertinente au regard des critères d’audit (ISO 19011).',
        'Exemples : politique signée, registre des risques, journaux, comptes rendus de revue de direction, rapports de tests et de re-tests, captures de configuration.',
      ],
    },
    {
      id: 't-c5-08',
      scope: 3,
      criteria: ['C5'],
      difficulty: 3,
      topic: 'Non-conformités',
      question: 'Différence entre non-conformité majeure et mineure ?',
      keyPoints: [
        'Majeure : affecte la capacité du système de management à atteindre ses résultats ; bloque la certification jusqu’à correction vérifiée.',
        'Mineure : écart ponctuel qui n’affecte pas cette capacité ; plan d’action à fournir.',
        'Plusieurs mineures sur une même exigence peuvent constituer une majeure.',
      ],
    },
    {
      id: 't-c5-09',
      scope: 3,
      criteria: ['C5'],
      difficulty: 3,
      topic: 'Critères Communs',
      question: 'Que mesure un niveau EAL des Critères Communs ?',
      keyPoints: [
        'La profondeur et la rigueur de l’évaluation (EAL1 testé fonctionnellement → EAL7 conception vérifiée formellement).',
        'Pas le niveau de sécurité du produit en soi : la cible de sécurité définit ce qui est évalué.',
      ],
      trap: 'Dire « EAL4 est plus sécurisé que EAL2 » sans parler de la cible de sécurité est une erreur classique.',
    },
    {
      id: 't-c5-10',
      scope: 3,
      criteria: ['C5'],
      difficulty: 3,
      topic: 'Critères Communs',
      question: 'CSPN ou Critères Communs : comment choisir ?',
      keyPoints: [
        'CSPN : schéma français, rapide et moins coûteux, en temps contraint ; reconnu en France (et en Allemagne via la BSZ).',
        'Critères Communs : reconnaissance internationale, niveaux EAL, plus longs et coûteux.',
        'Choix selon le marché visé, les exigences des clients et le budget ; la CSPN est souvent une première étape.',
      ],
    },
    {
      id: 't-c5-11',
      scope: 3,
      criteria: ['C5'],
      difficulty: 3,
      topic: 'Homologation',
      question: 'Comment se déroule une homologation de sécurité selon le guide ANSSI de 2025 ?',
      keyPoints: [
        '4 étapes : constituer le comité, déterminer le niveau de démarche et le dossier, évaluer et émettre un avis, tenir la commission d’homologation.',
        '3 niveaux de démarche : simplifié, intermédiaire, renforcé.',
        'Durée recommandée de 3 ans au plus, sans renouvellement automatique ; plus d’homologation provisoire.',
      ],
    },
    {
      id: 't-c5-12',
      scope: 3,
      criteria: ['C5'],
      difficulty: 4,
      topic: 'EUCC',
      question: 'Qu’est-ce que le schéma EUCC ?',
      keyPoints: [
        'Schéma européen de certification fondé sur les Critères Communs (règlement d’exécution 2024/482).',
        'Applicable depuis février 2025 ; il remplace l’accord SOG-IS (plus de nouveaux certificats SOG-IS depuis février 2026).',
        'Deux niveaux d’assurance : « substantiel » et « élevé » ; certificats valables 5 ans au plus.',
      ],
    },
    {
      id: 't-c5-13',
      scope: 3,
      criteria: ['C5'],
      difficulty: 4,
      topic: 'Préparation',
      question: 'Quel dossier de preuves préparez-vous avant un audit de certification ISO 27001 ?',
      keyPoints: [
        'Périmètre, politique de sécurité, analyse et plan de traitement des risques, Déclaration d’applicabilité.',
        'Procédures et enregistrements : gestion des accès, des incidents, des changements, des fournisseurs.',
        'Audits internes, revues de direction, indicateurs et actions correctives.',
        'Rapports de tests techniques et de re-tests prouvant l’efficacité des mesures.',
      ],
    },
  ],
}

export default C5
