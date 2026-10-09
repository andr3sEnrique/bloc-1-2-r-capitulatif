import type { Mission } from './types'

export const MISSION_BLOC1: Mission = {
  id: 'agglo-val-dorge',
  block: 1,
  title: 'Audit d’une collectivité sous menace de rançongiciel',
  company: 'Agglomération du Val-d’Orge',
  role: 'Auditeur·rice d’un cabinet de conseil',
  pitch:
    'Portail citoyen (état civil, paiement de la cantine), GED, données sociales du CCAS : la collectivité veut connaître son niveau de sécurité avant une démarche de certification. Vos décisions orientent l’audit.',
  start: 'a1',
  nodes: [
    // ───────── Étape 1 : actifs et menaces ─────────
    {
      id: 'a1',
      stage: 'actifs',
      kind: 'choice',
      title: 'Premier jour de mission',
      narrative: [
        'Le directeur général des services (DGS) vous accueille : « Une commune voisine a été paralysée trois semaines par un rançongiciel. Nos élus veulent des réponses rapides. »',
        'Vous disposez d’un schéma réseau de 2022, de la liste des applications et d’un accès au bâtiment. Aucun document contractuel n’est encore signé.',
      ],
      question: 'Par quoi commencez-vous ?',
      choices: [
        {
          label: 'Faire signer la convention d’audit (périmètre, règles d’engagement, autorisations), puis organiser un atelier de cadrage sur les valeurs métier',
          feedback:
            'Excellent réflexe. Sans autorisation écrite, tout test serait un accès frauduleux (Code pénal, art. 323-1). Le cadrage fixe le périmètre et les objectifs : c’est l’atelier 1 d’EBIOS RM et le plan d’audit du référentiel PASSI.',
          points: 30,
          next: 'a2',
          best: true,
        },
        {
          label: 'Brancher votre portable et lancer immédiatement un scan complet du réseau pour gagner du temps',
          feedback:
            'Vous n’avez ni convention ni fiche d’autorisation. Pire : le scan sature un vieux serveur d’impression de l’état civil, et les agents ne peuvent plus imprimer les actes.',
          points: -20,
          next: 'a1b',
        },
        {
          label: 'Demander uniquement les configurations des pare-feu et les analyser à distance',
          feedback:
            'Utile, mais trop étroit : vous ignorez encore ce que la collectivité doit protéger. Une analyse de configuration n’a de sens qu’une fois le périmètre et les enjeux définis.',
          points: 5,
          next: 'a2',
        },
      ],
    },
    {
      id: 'a1b',
      stage: 'actifs',
      kind: 'choice',
      title: 'Convocation chez le DGS',
      narrative: [
        'Le DSI a coupé votre accès réseau. Le DGS, agacé : « Qui vous a autorisé à toucher à notre production ? »',
      ],
      question: 'Comment réagissez-vous ?',
      choices: [
        {
          label: 'Reconnaître l’erreur, rédiger avec eux la convention et les règles d’engagement (horaires, exclusions, contacts d’urgence), puis reprendre par le cadrage',
          feedback:
            'Bonne récupération. Vous ajoutez dans les règles d’engagement l’exclusion des équipements fragiles des scans actifs et une fenêtre de tests hors heures d’ouverture.',
          points: 15,
          next: 'a2',
        },
        {
          label: 'Expliquer qu’un audit sans scan n’est pas un vrai audit et demander qu’on rétablisse l’accès',
          feedback:
            'Le dialogue se tend. Un audit n’est pas un scan : le référentiel PASSI ne considère même pas un scan automatisé comme une activité d’audit. Vous perdez la confiance du commanditaire.',
          points: -10,
          next: 'a2',
        },
      ],
    },
    {
      id: 'a2',
      stage: 'actifs',
      kind: 'multi',
      title: 'Atelier de cadrage',
      narrative: [
        'En atelier avec les directions métier, vous recensez ce qui compte pour la mission de service public. Il faut distinguer les valeurs métier (ce qu’on protège) des biens supports et des parties prenantes.',
      ],
      question: 'Sélectionnez uniquement les valeurs métier.',
      pointsPerOption: 6,
      options: [
        { label: 'Délivrance des actes d’état civil', correct: true, why: 'Processus métier essentiel au service public : valeur métier.' },
        { label: 'Paiement en ligne de la cantine', correct: true, why: 'Service rendu aux familles, avec des données de paiement : valeur métier.' },
        { label: 'Serveur de gestion électronique des documents (GED)', correct: false, why: 'C’est un bien support : il héberge des valeurs métier.' },
        { label: 'Dossiers sociaux des bénéficiaires du CCAS', correct: true, why: 'Information sensible (situation sociale) : valeur métier.' },
        { label: 'Pare-feu périmétrique', correct: false, why: 'Bien support (ou mesure de sécurité), pas une valeur métier.' },
        { label: 'Instruction des permis de construire', correct: true, why: 'Processus métier : valeur métier.' },
        { label: 'Prestataire d’infogérance', correct: false, why: 'Partie prenante : la collectivité n’en est pas responsable, elle fait partie de l’écosystème.' },
      ],
      next: 'a3',
    },
    {
      id: 'a3',
      stage: 'actifs',
      kind: 'choice',
      title: 'Sources de risque',
      narrative: [
        'Le CERT-FR a signalé une vague de rançongiciels visant les collectivités. Une association locale conteste par ailleurs un projet d’urbanisme et menace de « faire tomber le site ».',
      ],
      question: 'Quel couple source de risque / objectif visé retenez-vous en priorité ?',
      choices: [
        {
          label: 'Groupe cybercriminel / gain financier par rançongiciel avec double extorsion',
          feedback:
            'C’est le couple le plus pertinent : motivation forte, ressources élevées, activité avérée sur le secteur. Le hacktivisme reste un couple secondaire à surveiller.',
          points: 20,
          next: 'r1',
          best: true,
        },
        {
          label: 'Militants locaux / déni de service du portail',
          feedback:
            'Couple plausible mais secondaire : l’impact (indisponibilité temporaire du portail) est moindre et les ressources limitées. À garder en surveillance.',
          points: 8,
          next: 'r1',
        },
        {
          label: 'Service de renseignement étranger / espionnage des délibérations',
          feedback:
            'Peu pertinent ici : faible attrait stratégique pour un État, aucune activité observée. Ce couple serait écarté en atelier 2.',
          points: 0,
          next: 'r1',
        },
      ],
    },

    // ───────── Étape 2 : vulnérabilités et risques ─────────
    {
      id: 'r1',
      stage: 'risques',
      kind: 'choice',
      title: 'Une anomalie dans les journaux',
      narrative: ['En analysant les journaux du portail citoyen, vous relevez un comportement inhabituel.'],
      evidence: [
        {
          label: 'Synthèse du journal d’accès – portail citoyen',
          mono: true,
          content:
            'Compte authentifié : usager n°58213 (un seul compte)\nRessource : /mes-factures/document/{numéro}\nNuméros consultés : 10432, 10433, 10434 … 12731 (séquentiels)\nVolume : 2 300 documents en 40 minutes\nRéponses serveur : 200 OK pour 100 % des requêtes\nRemarque : l’usager n°58213 ne possède que 6 factures',
        },
      ],
      question: 'Comment qualifiez-vous ce constat ?',
      choices: [
        {
          label: 'Défaut de contrôle d’accès (IDOR / BOLA) : l’application ne vérifie pas que la facture appartient à l’usager connecté',
          feedback:
            'Exact : OWASP A01 Broken Access Control (API1 BOLA). Le compte est légitime, l’authentification fonctionne, mais l’autorisation n’est pas vérifiée objet par objet. Et l’exploitation semble déjà avoir eu lieu.',
          points: 25,
          next: 'r2',
          best: true,
        },
        {
          label: 'Une attaque par force brute sur les mots de passe',
          feedback:
            'Non : il n’y a qu’un seul compte, déjà connecté, et aucun échec d’authentification. Le problème est l’autorisation, pas l’authentification.',
          points: 0,
          next: 'r1b',
        },
        {
          label: 'Un faux positif lié à un robot d’indexation, à ignorer',
          feedback: 'Les réponses 200 OK sur des factures d’autres usagers ne sont pas un faux positif : ce sont des données personnelles exposées.',
          points: -10,
          next: 'r1b',
        },
      ],
    },
    {
      id: 'r1b',
      stage: 'risques',
      kind: 'choice',
      title: 'Trois semaines plus tard…',
      narrative: [
        'La presse locale publie des captures de factures de familles du Val-d’Orge, avec noms et adresses. Le DGS vous appelle à 7 h du matin.',
      ],
      question: 'Que recommandez-vous ?',
      choices: [
        {
          label: 'Requalifier le constat en défaut de contrôle d’accès, déclencher la gestion d’incident (confinement, preuves, notification CNIL sous 72 h)',
          feedback:
            'C’est la bonne démarche, même tardive : une violation de données personnelles impose la notification à la CNIL dans les 72 heures, et l’information des personnes si le risque est élevé.',
          points: 10,
          next: 'r2',
        },
        {
          label: 'Attendre la fin de l’audit pour tout traiter dans le rapport',
          feedback: 'Inacceptable : l’incident est en cours et le délai de notification court déjà. Un auditeur alerte immédiatement le commanditaire d’un risque critique.',
          points: -15,
          next: 'r2',
        },
      ],
    },
    {
      id: 'r2',
      stage: 'risques',
      kind: 'order',
      title: 'Prioriser les constats',
      narrative: ['Votre tableau de constats compte maintenant quatre lignes. Le DGS veut savoir par où commencer.'],
      evidence: [
        {
          label: 'Constats retenus',
          content:
            '• Défaut de contrôle d’accès sur les factures du portail (exposé sur Internet, données personnelles, déjà exploité)\n• Comptes d’administration de la GED partagés entre 4 agents, sans MFA\n• Serveur interne Windows Server 2012 hors support, hébergeant l’application RH\n• Version exacte du serveur web affichée dans les en-têtes HTTP',
        },
      ],
      question: 'Classez les constats du plus prioritaire au moins prioritaire.',
      items: [
        'Défaut de contrôle d’accès sur les factures du portail',
        'Comptes d’administration GED partagés sans MFA',
        'Serveur Windows Server 2012 hors support',
        'Version du serveur web affichée dans les en-têtes',
      ],
      why: 'Exposition Internet + données personnelles + exploitation avérée placent l’IDOR en tête. Les comptes admin partagés sans MFA sont la porte royale d’un rançongiciel. Le serveur hors support est grave mais interne (mesures compensatoires possibles). La bannière de version est une simple fuite d’information.',
      points: 30,
      next: 'r3',
    },
    {
      id: 'r3',
      stage: 'risques',
      kind: 'choice',
      title: 'Coter la gravité',
      narrative: ['Vous utilisez l’échelle de gravité d’EBIOS RM pour l’événement redouté « divulgation des factures et données des familles ».'],
      question: 'Quelle gravité retenez-vous ?',
      choices: [
        {
          label: 'G3 – Grave',
          feedback:
            'Cohérent : atteinte à la confidentialité de données personnelles de milliers de familles, obligations RGPD, forte atteinte à l’image, sans arrêt du service public.',
          points: 15,
          next: 'm1',
          best: true,
        },
        {
          label: 'G4 – Critique',
          feedback:
            'Défendable si des données sociales sensibles étaient exposées, mais ici la collectivité continue de fonctionner. G4 correspond à une incapacité d’assurer tout ou partie de l’activité.',
          points: 8,
          next: 'm1',
        },
        {
          label: 'G1 – Mineure',
          feedback: 'Sous-estimé : une fuite de données personnelles à grande échelle n’est jamais mineure.',
          points: -5,
          next: 'm1',
        },
      ],
    },

    // ───────── Étape 3 : mesures ─────────
    {
      id: 'm1',
      stage: 'mesures',
      kind: 'budget',
      title: 'Arbitrage budgétaire',
      narrative: [
        'Le conseil communautaire vote une enveloppe de 60 k€ pour l’année. Vous devez construire un plan d’action réaliste.',
        'Chaque mesure a un coût. Vous ne pouvez pas dépasser l’enveloppe.',
      ],
      question: 'Composez votre plan de remédiation.',
      budget: 60,
      unit: 'k€',
      options: [
        { id: 'authz', label: 'Corriger le contrôle d’autorisation côté serveur (+ tests automatisés)', cost: 8, points: 30, comment: 'Corrige la cause racine de la fuite : indispensable.' },
        { id: 'waf', label: 'Règle WAF en patch virtuel le temps de la correction', cost: 6, points: 10, comment: 'Bonne mesure compensatoire temporaire, pas une correction.' },
        { id: 'mfa', label: 'Comptes d’administration nominatifs + MFA + bastion', cost: 12, points: 25, comment: 'Ferme la voie d’entrée favorite des rançongiciels.' },
        { id: 'backup', label: 'Sauvegardes hors ligne / immuables + test de restauration', cost: 14, points: 25, comment: 'Dernière ligne de défense face au rançongiciel.' },
        { id: 'edr', label: 'EDR sur les serveurs', cost: 18, points: 15, comment: 'Améliore la détection, utile mais coûteux.' },
        { id: 'migration', label: 'Migrer le serveur Windows 2012', cost: 25, points: 12, comment: 'Nécessaire à terme ; peut être compensé en attendant par l’isolement réseau.' },
        { id: 'uuid', label: 'Remplacer les numéros de facture par des UUID (sans autre changement)', cost: 4, points: -10, comment: 'Piège : rend les identifiants difficiles à deviner mais ne corrige pas le contrôle d’accès.' },
        { id: 'insurance', label: 'Souscrire une cyber-assurance', cost: 12, points: 3, comment: 'Transfère une partie du coût, pas le risque ni la responsabilité.' },
        { id: 'posters', label: 'Campagne d’affiches de sensibilisation', cost: 5, points: 2, comment: 'Faible effet seule ; préférer des exercices et formations ciblés.' },
      ],
      branches: [
        { requires: ['authz', 'backup'], next: 'm2' },
        { requires: ['authz'], next: 'm2c' },
      ],
      fallback: 'm2b',
    },
    {
      id: 'm2',
      stage: 'mesures',
      kind: 'choice',
      title: 'Vérifier les corrections',
      narrative: ['Les corrections sont livrées par l’éditeur du portail. Il faut prouver qu’elles fonctionnent, sans perturber le service aux usagers.'],
      question: 'Comment organisez-vous le re-test ?',
      choices: [
        {
          label: 'Re-test en préproduction avec deux comptes de test, puis vérification ciblée en production en heures creuses, avec accord écrit et plan de retour arrière',
          feedback:
            'Parfait : le re-test fournit la preuve de correction attendue pour la certification, et l’organisation limite l’impact sur le service public.',
          points: 20,
          next: 'j1',
          best: true,
        },
        {
          label: 'Faire confiance à l’éditeur qui affirme avoir corrigé',
          feedback: 'Sans re-test, aucune preuve : un auditeur vérifie. Le jury vous reprochera l’absence d’indicateur de clôture.',
          points: -5,
          next: 'j1',
        },
      ],
    },
    {
      id: 'm2b',
      stage: 'mesures',
      kind: 'choice',
      title: 'La faille est toujours ouverte',
      narrative: [
        'Votre plan ne corrige pas le contrôle d’accès. Un mois plus tard, un nouveau téléchargement massif de factures est détecté.',
      ],
      question: 'Que faites-vous ?',
      choices: [
        {
          label: 'Réviser le plan : correction immédiate de l’autorisation côté serveur, WAF en patch virtuel en attendant, re-test',
          feedback: 'Vous corrigez le tir. Leçon : un plan d’action commence par supprimer la cause racine des risques exploités.',
          points: 10,
          next: 'j1b',
        },
        {
          label: 'Ajouter des UUID et attendre l’an prochain',
          feedback: 'Les UUID ne remplacent pas un contrôle d’autorisation. Le risque reste élevé et non accepté formellement.',
          points: -15,
          next: 'j1b',
        },
      ],
    },
    {
      id: 'm2c',
      stage: 'mesures',
      kind: 'choice',
      title: 'Exercice de crise rançongiciel',
      narrative: [
        'Lors d’un exercice, vous découvrez que les sauvegardes sont sur un partage réseau accessible depuis les postes : un rançongiciel les chiffrerait aussi.',
      ],
      question: 'Quelle recommandation ajoutez-vous ?',
      choices: [
        {
          label: 'Copie hors ligne ou immuable (règle 3-2-1) et test de restauration trimestriel, financés au prochain budget',
          feedback: 'Bonne réponse : une sauvegarde non isolée et non testée n’est pas une sauvegarde.',
          points: 10,
          next: 'j1',
        },
        {
          label: 'Rien : les sauvegardes existent déjà',
          feedback: 'Elles existent mais ne résisteraient pas à l’attaque redoutée. C’est exactement l’écart entre mesure existante et mesure efficace.',
          points: -10,
          next: 'j1',
        },
      ],
    },

    // ───────── Étape 4 : jury ─────────
    {
      id: 'j1',
      stage: 'jury',
      kind: 'open',
      title: 'Question du jury',
      narrative: ['Le jury vous interroge sur votre plan : « Pourquoi avoir financé la correction du code plutôt que de tout miser sur un WAF, plus rapide à déployer ? »'],
      question: 'Justifiez votre décision comme à l’oral.',
      points: 40,
      open: {
        keywords: [
          { label: 'Cause racine / correction du code', any: ['cause', 'racine', 'code', 'correct'] },
          { label: 'WAF = mesure temporaire ou compensatoire', any: ['tempor', 'compens', 'patch virtuel', 'transitoire'] },
          { label: 'Failles logiques non détectées par un WAF', any: ['logique', 'autoris', 'controle d acces', 'idor', 'bola', 'contourn'] },
          { label: 'Données personnelles / RGPD', any: ['rgpd', 'donnees personnelles', 'cnil', 'familles'] },
          { label: 'Vérification par re-test', any: ['re-test', 'retest', 'test', 'verif', 'preuve'] },
        ],
        model:
          'Le WAF est une mesure compensatoire temporaire : il ne voit pas les failles logiques comme ce défaut de contrôle d’accès, où chaque requête est légitime en apparence. J’ai donc financé la correction de la cause racine côté serveur, vérifiée par un re-test, en gardant le WAF comme patch virtuel le temps de la livraison. Il s’agit de données personnelles de familles : le RGPD impose des mesures de sécurité appropriées, pas un pansement.',
      },
      next: 'j2',
    },
    {
      id: 'j1b',
      stage: 'jury',
      kind: 'open',
      title: 'Question du jury',
      narrative: ['Le jury est sévère : « Votre premier plan laissait une faille exploitée ouverte pendant un mois. Comment le justifiez-vous ? »'],
      question: 'Répondez avec honnêteté et méthode.',
      points: 30,
      open: {
        keywords: [
          { label: 'Reconnaître l’erreur de priorisation', any: ['erreur', 'reconna', 'aurais du', 'mauvaise priorisation'] },
          { label: 'Correction immédiate de la cause', any: ['correct', 'immediat', 'cause', 'autoris'] },
          { label: 'Notification CNIL / gestion d’incident', any: ['cnil', '72', 'notifi', 'incident'] },
          { label: 'Retour d’expérience / amélioration', any: ['retour d experience', 'retex', 'amelior', 'lecon'] },
        ],
        model:
          'C’était une erreur de priorisation : un risque exploité, exposé sur Internet et portant sur des données personnelles devait être traité en premier. J’ai immédiatement réorienté le plan vers la correction de l’autorisation côté serveur, avec un WAF en attendant, et déclenché la gestion d’incident avec notification à la CNIL sous 72 heures. J’en tire une règle : prioriser par l’exploitation et l’exposition, pas par le coût.',
      },
      next: 'j2',
    },
    {
      id: 'j2',
      stage: 'jury',
      kind: 'choice',
      title: 'Dernière question',
      narrative: ['Le président du jury conclut : « Après votre plan, pouvez-vous garantir au DGS qu’il n’y aura plus de fuite ? »'],
      question: 'Votre réponse ?',
      choices: [
        {
          label: 'Non : je réduis le risque à un niveau résiduel accepté par la direction, suivi par des indicateurs, des tests réguliers et l’amélioration continue',
          feedback: 'Réponse de niveau 7 : un audit est une photographie, la sécurité est un processus. Le risque résiduel est accepté formellement par la direction.',
          points: 20,
          next: 'end',
          best: true,
        },
        {
          label: 'Oui, toutes les vulnérabilités identifiées sont corrigées',
          feedback: 'Le jury sourit : l’absence de vulnérabilité connue n’est pas la preuve de l’absence de vulnérabilité.',
          points: -10,
          next: 'end',
        },
      ],
    },
    {
      id: 'end',
      stage: 'jury',
      kind: 'end',
      title: 'Ce qu’il fallait retenir',
      narrative: [
        'Cadrer avant de tester : convention, autorisation écrite, règles d’engagement (C1).',
        'Distinguer valeurs métier, biens supports et parties prenantes ; retenir les couples SR/OV réalistes (C2).',
        'Qualifier un constat à partir de preuves, et le prioriser par l’exposition, les données et l’exploitation avérée (C3/C4).',
        'Corriger la cause racine, utiliser les mesures compensatoires comme pont, prouver les corrections par re-test (C4/C5).',
        'Devant le jury : parler en risques résiduels, jamais en garanties absolues.',
      ],
    },
  ],
}
