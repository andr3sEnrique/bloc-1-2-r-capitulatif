import type { EscapeGame } from './types'

export const ESCAPE_LUMIO: EscapeGame = {
  id: 'lumio',
  block: 1,
  title: 'Fuite de données chez l’opticien en ligne',
  company: 'Lumio – lunettes sur ordonnance',
  pitch:
    'Un client affirme avoir reçu par erreur l’ordonnance d’un inconnu. Trouvez la faille, qualifiez le risque, priorisez la réponse et proposez la remédiation pour ouvrir le coffre.',
  stages: [
    {
      id: 'logs',
      title: 'La salle des journaux',
      narrative: [
        'Vous entrez dans le centre d’exploitation. Sur l’écran, une synthèse des accès à l’espace client de la veille.',
        'La porte ne s’ouvrira que si vous identifiez correctement la faiblesse exploitée.',
      ],
      evidence: [
        {
          label: 'Synthèse des journaux de l’espace client',
          mono: true,
          content:
            'Compte connecté : client 40117 (authentification réussie, MFA OK)\nRessource consultée : /espace/ordonnances/{numéro}\nNuméros demandés : 88 120 → 91 560 (incrément de 1)\nRéponses : 200 OK pour toutes les demandes\nOrdonnances réellement rattachées au client 40117 : 2\nAucun échec d’authentification, aucune erreur serveur',
        },
      ],
      puzzle: {
        kind: 'single',
        prompt: 'Quelle faiblesse explique ces journaux ?',
        options: [
          'Une attaque par force brute sur les mots de passe',
          'Un défaut de contrôle d’accès objet par objet (IDOR / BOLA)',
          'Une injection SQL dans le formulaire de connexion',
          'Une attaque par déni de service distribué',
        ],
        answer: 1,
      },
      hints: [
        'L’authentification a réussi et il n’y a aucun échec : le problème n’est pas le mot de passe.',
        'Le client consulte des ordonnances qui ne lui appartiennent pas, simplement en changeant le numéro.',
      ],
      success:
        'Bien vu : OWASP A01 Broken Access Control. L’utilisateur est authentifié, mais l’application ne vérifie pas que l’objet demandé lui appartient.',
      fragment: '4',
    },
    {
      id: 'dpo',
      title: 'Le bureau du DPO',
      narrative: [
        'La déléguée à la protection des données vous attend. Elle a recensé les données exposées et l’heure à laquelle l’équipe a pris connaissance de la fuite : hier à 9 h.',
      ],
      evidence: [
        {
          label: 'Note de la DPO',
          content:
            'Données exposées : nom, adresse, date de naissance, prescription optique (correction, pathologie éventuelle).\nPersonnes concernées : environ 3 400 clients.\nNature : données de santé (catégorie particulière, art. 9 RGPD).\nQuestion : sous quel délai devons-nous notifier la CNIL ?',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Dans combien d’heures au maximum, après en avoir pris connaissance, faut-il notifier la CNIL ? (nombre)',
        accept: ['72', '72h', '72 heures', '72 h'],
        placeholder: 'ex. 24',
      },
      hints: ['C’est l’article 33 du RGPD.', 'Trois jours.'],
      success:
        'Exact : 72 heures (art. 33 RGPD). Avec des données de santé, le risque est élevé : il faudra aussi informer les personnes concernées (art. 34).',
      fragment: '7',
    },
    {
      id: 'crise',
      title: 'La cellule de crise',
      narrative: [
        'La direction est réunie. Tout le monde veut agir en même temps. Le tableau blanc liste les actions, mais dans le désordre.',
      ],
      evidence: [
        {
          label: 'Tableau blanc',
          content:
            '• Notifier la CNIL\n• Confiner : bloquer l’accès vulnérable\n• Retour d’expérience et plan d’amélioration\n• Préserver les preuves (copie des journaux)\n• Informer les clients concernés\n• Évaluer l’ampleur : quelles données, combien de personnes',
        },
      ],
      puzzle: {
        kind: 'order',
        prompt: 'Remettez la réponse à incident dans le bon ordre.',
        items: [
          'Confiner : bloquer l’accès vulnérable',
          'Préserver les preuves (copie des journaux)',
          'Évaluer l’ampleur : quelles données, combien de personnes',
          'Notifier la CNIL',
          'Informer les clients concernés',
          'Retour d’expérience et plan d’amélioration',
        ],
      },
      hints: ['On arrête d’abord l’hémorragie.', 'On ne peut notifier correctement qu’après avoir évalué l’ampleur ; le retour d’expérience vient en dernier.'],
      success: 'La crise est maîtrisée : confinement, preuves, évaluation, notifications, puis retour d’expérience.',
      fragment: '2',
    },
    {
      id: 'rssi',
      title: 'Le coffre du RSSI',
      narrative: [
        'Dernière salle avant le coffre. Le RSSI doit présenter un plan de remédiation au comité de direction. Il ne veut que des mesures qui suppriment la cause ou empêchent la récidive.',
      ],
      evidence: [
        {
          label: 'Propositions reçues',
          content:
            '1. Vérifier côté serveur, à chaque requête, que l’ordonnance appartient au client connecté\n2. Ajouter des tests automatisés d’autorisation dans la CI\n3. Remplacer les numéros par des identifiants aléatoires, sans autre changement\n4. Instaurer une revue de code sécurité sur les fonctions d’accès aux données\n5. Désactiver les journaux pour éviter de nouvelles fuites\n6. Compter uniquement sur un WAF',
        },
      ],
      puzzle: {
        kind: 'multi',
        prompt: 'Sélectionnez les mesures qui corrigent la cause ou empêchent la récidive.',
        options: [
          'Contrôle d’autorisation côté serveur à chaque requête',
          'Tests automatisés d’autorisation dans la CI',
          'Identifiants aléatoires sans autre changement',
          'Revue de code sécurité sur les accès aux données',
          'Désactiver les journaux',
          'Compter uniquement sur un WAF',
        ],
        answers: [0, 1, 3],
      },
      hints: [
        'Des identifiants difficiles à deviner ne remplacent pas une vérification d’autorisation.',
        'Sans journaux, on ne détecte plus rien ; un WAF ne voit pas les failles logiques.',
      ],
      success: 'Plan solide : correction de la cause (autorisation serveur) et prévention (tests en CI, revue de code).',
      fragment: '9',
    },
  ],
  vault: {
    prompt: 'Saisissez les quatre fragments récupérés, dans l’ordre des salles.',
    code: '4729',
    debrief: [
      'Faille : défaut de contrôle d’accès (OWASP A01, API1 BOLA) : authentifié ne veut pas dire autorisé.',
      'Risque : données de santé de 3 400 personnes → notification CNIL sous 72 h et information des personnes.',
      'Réponse : confiner, préserver les preuves, évaluer, notifier, informer, tirer les leçons.',
      'Remédiation : corriger la cause côté serveur et prévenir la récidive par des tests automatisés et des revues de code.',
    ],
  },
}

export const ESCAPE_KODAMA: EscapeGame = {
  id: 'kodama',
  block: 2,
  title: 'Alerte rouge dans la chaîne de livraison',
  company: 'Kodama – application de réservation de salles',
  pitch:
    'Un vendredi soir, plusieurs alertes tombent en même temps sur la chaîne de développement. Résolvez chaque incident pour reconstituer le mot de passe du coffre.',
  stages: [
    {
      id: 'depot',
      title: 'Le dépôt de code',
      narrative: ['Première alerte : l’outil de détection de secrets a trouvé quelque chose dans un dépôt public.'],
      evidence: [
        {
          label: 'Alerte de détection de secrets',
          mono: true,
          content:
            'Type : clé « live » du prestataire de paiement\nFichier : config/prod.env\nVisibilité du dépôt : public\nExposée depuis : 2 jours\nAction du développeur : fichier supprimé dans un nouveau commit',
        },
      ],
      puzzle: {
        kind: 'single',
        prompt: 'Quelle est la toute première action à mener ?',
        options: [
          'Rendre le dépôt privé',
          'Réécrire l’historique Git pour effacer la clé',
          'Révoquer la clé et en émettre une nouvelle',
          'Rien : le fichier a été supprimé',
        ],
        answer: 2,
      },
      hints: ['La clé a pu être copiée pendant deux jours.', 'Seule une action rend la clé inutilisable pour quelqu’un qui l’aurait déjà copiée.'],
      success: 'Exact : révoquer et faire tourner la clé neutralise le secret. Nettoyer l’historique et passer le dépôt en privé viennent ensuite.',
      fragment: 'K',
    },
    {
      id: 'dependances',
      title: 'La salle des dépendances',
      narrative: ['Deuxième alerte : l’analyse des dépendances signale un paquet ajouté hier par un stagiaire.'],
      evidence: [
        {
          label: 'Extrait du rapport d’analyse des dépendances',
          mono: true,
          content:
            'Paquet ajouté : un nom qui ressemble à une bibliothèque très populaire, à une lettre près\nPublié il y a : 3 jours\nTéléchargements : 12\nMainteneur : compte créé la même semaine\nComportement : exécute un script à l’installation qui contacte un domaine inconnu',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Comment s’appelle cette technique d’attaque de la chaîne d’approvisionnement ?',
        accept: ['typosquatting', 'typo squatting', 'typo-squatting', 'typosquattage'],
        placeholder: 'un seul mot',
      },
      hints: ['Le nom du paquet joue sur une faute de frappe.', 'Le mot anglais combine « typo » et « squatting ».'],
      success: 'Exact : typosquatting. Défenses : fichiers de verrouillage, revue des nouvelles dépendances, registre interne et SCA dans la CI.',
      fragment: 'E',
    },
    {
      id: 'auth',
      title: 'Le guichet d’authentification',
      narrative: ['Troisième alerte : un audit de configuration de l’API révèle des faiblesses dans la gestion des jetons JWT.'],
      evidence: [
        {
          label: 'Constats de l’audit de configuration',
          content:
            '• Les jetons n’ont pas de date d’expiration\n• La déconnexion ne révoque pas le jeton\n• Le serveur se fie à l’algorithme annoncé dans l’en-tête du jeton au lieu d’imposer le sien',
        },
      ],
      puzzle: {
        kind: 'multi',
        prompt: 'Quelles corrections appliquez-vous ?',
        options: [
          'Imposer côté serveur une liste fermée d’algorithmes acceptés',
          'Jetons d’accès courts et jetons de rafraîchissement révocables',
          'Liste de révocation des jetons (identifiant jti)',
          'Encoder deux fois la charge utile en Base64',
          'Stocker le jeton dans le localStorage pour le protéger',
        ],
        answers: [0, 1, 2],
      },
      hints: ['Base64 n’est pas du chiffrement.', 'Le localStorage est lisible par tout script, donc exposé en cas de XSS.'],
      success: 'Correct : le serveur impose son algorithme, les jetons expirent vite et peuvent être révoqués.',
      fragment: 'Y',
    },
    {
      id: 'veille',
      title: 'La salle de veille',
      narrative: ['Dernière alerte : le flux de veille remonte quatre vulnérabilités le même soir. L’équipe d’astreinte ne peut en traiter qu’une à la fois.'],
      evidence: [
        {
          label: 'Tableau de veille',
          mono: true,
          content:
            'W – CVSS 9.1 · EPSS 0,03 · hors KEV · outil interne sans accès réseau\nX – CVSS 7.8 · EPSS 0,89 · dans le catalogue KEV · API publique\nY – CVSS 8.6 · EPSS 0,41 · hors KEV · application web publique\nZ – CVSS 4.3 · EPSS 0,01 · hors KEV · page de documentation statique',
        },
      ],
      puzzle: {
        kind: 'order',
        prompt: 'Classez du plus urgent au moins urgent.',
        items: ['X – exploitée (KEV), API publique', 'Y – probabilité notable, exposée', 'W – sévère mais isolée', 'Z – faible sur une page statique'],
      },
      hints: ['L’exploitation avérée prime sur le score CVSS.', 'Une vulnérabilité sévère sur un outil sans accès réseau est moins urgente qu’une vulnérabilité exposée sur Internet.'],
      success: 'Bonne priorisation : exploitation avérée et exposition d’abord, le CVSS seul ne suffit pas.',
      fragment: 'S',
    },
  ],
  vault: {
    prompt: 'Les fragments forment un mot de quatre lettres. Saisissez-le pour ouvrir le coffre.',
    code: 'KEYS',
    debrief: [
      'Secret exposé : révoquer d’abord, nettoyer ensuite, puis prévenir avec une détection de secrets en pre-commit et en CI.',
      'Typosquatting : vérifier toute nouvelle dépendance, verrouiller les versions, analyser les dépendances dans la CI.',
      'JWT : algorithme imposé par le serveur, expiration courte, révocation possible.',
      'Veille : prioriser par exploitation avérée (KEV), probabilité (EPSS) et exposition, pas au seul CVSS.',
    ],
  },
}
