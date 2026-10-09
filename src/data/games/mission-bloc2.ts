import type { Mission } from './types'

export const MISSION_BLOC2: Mission = {
  id: 'pikoli',
  block: 2,
  title: 'Sécuriser une scale-up qui livre deux fois par semaine',
  company: 'Pikoli – logiciel de facturation pour artisans',
  role: 'Responsable sécurité applicative',
  pitch:
    '60 développeurs (Web, Mobile, API), deux mises en production par semaine, un budget serré et une clé de paiement qui vient de fuiter. Vous devez bâtir la politique et le plan de formation.',
  start: 'a1',
  nodes: [
    // ───────── Étape 1 : actifs et menaces ─────────
    {
      id: 'a1',
      stage: 'actifs',
      kind: 'multi',
      title: 'Ce que Pikoli doit protéger',
      narrative: [
        'Pikoli édite une application web et mobile qui permet aux artisans d’émettre des factures et d’encaisser leurs clients. La plateforme est reliée à un prestataire de paiement.',
        'Pour fixer les priorités de la politique de sécurité, vous recensez les informations les plus sensibles.',
      ],
      question: 'Sélectionnez les actifs à protéger en priorité.',
      pointsPerOption: 6,
      options: [
        { label: 'IBAN et coordonnées bancaires des artisans', correct: true, why: 'Données financières : fraude et usurpation possibles.' },
        { label: 'Factures et données des clients des artisans', correct: true, why: 'Données personnelles et commerciales : RGPD et secret des affaires.' },
        { label: 'Identifiants de connexion et jetons de session', correct: true, why: 'Leur vol donne accès à tout le reste.' },
        { label: 'Feuille de style de la page d’accueil', correct: false, why: 'Information publique, sans enjeu de confidentialité.' },
        { label: 'Clés API du prestataire de paiement', correct: true, why: 'Secret critique : permet d’émettre des opérations au nom de Pikoli.' },
        { label: 'Documentation publique de l’API', correct: false, why: 'Volontairement publique ; son intégrité compte, pas sa confidentialité.' },
      ],
      next: 'a2',
    },
    {
      id: 'a2',
      stage: 'actifs',
      kind: 'choice',
      title: 'Qui menace Pikoli ?',
      narrative: [
        'Un outil de détection de secrets vient d’alerter : une clé du prestataire de paiement a été publiée dans un dépôt public il y a trois jours.',
      ],
      question: 'Quelle menace est la plus probable à court terme ?',
      choices: [
        {
          label: 'Des robots automatisés qui parcourent en continu les dépôts publics à la recherche de secrets',
          feedback:
            'Exact : les secrets publiés sur des dépôts publics sont collectés en quelques minutes par des robots. C’est une menace opportuniste, massive et immédiate.',
          points: 20,
          next: 'r1',
          best: true,
        },
        {
          label: 'Un groupe soutenu par un État qui cible spécifiquement Pikoli',
          feedback: 'Peu vraisemblable pour une scale-up de facturation : ni motivation stratégique ni activité observée.',
          points: 0,
          next: 'r1',
        },
        {
          label: 'Un développeur malveillant en interne',
          feedback: 'Le risque interne existe, mais la fuite est accidentelle et c’est l’exposition publique qui crée l’urgence.',
          points: 5,
          next: 'r1',
        },
      ],
    },

    // ───────── Étape 2 : vulnérabilités et risques ─────────
    {
      id: 'r1',
      stage: 'risques',
      kind: 'choice',
      title: 'La clé exposée',
      narrative: ['Le développeur concerné a déjà poussé un nouveau commit qui supprime le fichier de configuration.'],
      evidence: [
        {
          label: 'Alerte de l’outil de détection de secrets',
          mono: true,
          content:
            'Type : clé API « live » du prestataire de paiement\nFichier : config/prod.env\nDépôt : public\nPremière exposition : il y a 3 jours\nStatut : fichier supprimé dans le dernier commit (toujours présent dans l’historique)',
        },
      ],
      question: 'Quelle est votre première action ?',
      choices: [
        {
          label: 'Révoquer et faire tourner la clé immédiatement, puis analyser les journaux du prestataire depuis l’exposition',
          feedback:
            'Bonne priorité : seule la révocation neutralise le secret. Ensuite on cherche un usage frauduleux, on nettoie l’historique et on ajoute un contrôle pre-commit.',
          points: 30,
          next: 'r2',
          best: true,
        },
        {
          label: 'Réécrire l’historique Git pour effacer la clé',
          feedback: 'Utile mais insuffisant : la clé a pu être copiée pendant trois jours. Tant qu’elle n’est pas révoquée, elle reste valide.',
          points: 5,
          next: 'r1b',
        },
        {
          label: 'Rien : le fichier a déjà été supprimé',
          feedback: 'Erreur classique : le secret reste dans l’historique et a pu être cloné. Il est toujours actif.',
          points: -20,
          next: 'r1b',
        },
      ],
    },
    {
      id: 'r1b',
      stage: 'risques',
      kind: 'choice',
      title: '48 heures plus tard',
      narrative: ['Le prestataire de paiement signale des remboursements frauduleux émis avec la clé de Pikoli.'],
      question: 'Que faites-vous maintenant ?',
      choices: [
        {
          label: 'Révoquer la clé, bloquer les opérations suspectes, analyser l’impact et lancer la procédure de violation de données si des données personnelles sont touchées',
          feedback: 'La réponse arrive tard mais elle est complète. Leçon : la révocation est toujours la première action après une fuite de secret.',
          points: 10,
          next: 'r2',
        },
        {
          label: 'Attendre que le prestataire mène son enquête',
          feedback: 'Pikoli reste responsable de ses secrets. Attendre laisse la fraude continuer.',
          points: -15,
          next: 'r2',
        },
      ],
    },
    {
      id: 'r2',
      stage: 'risques',
      kind: 'order',
      title: 'Prioriser les vulnérabilités des dépendances',
      narrative: ['L’analyse des dépendances (SCA) remonte quatre vulnérabilités. Vous ne pouvez pas tout corriger cette semaine.'],
      evidence: [
        {
          label: 'Rapport SCA',
          mono: true,
          content:
            'A – CVSS 9.8 · EPSS 0,01 · hors catalogue KEV · bibliothèque utilisée uniquement dans les tests, non livrée\nB – CVSS 7.5 · EPSS 0,92 · dans le catalogue KEV · API exposée sur Internet\nC – CVSS 8.1 · EPSS 0,30 · hors KEV · back-office interne avec MFA\nD – CVSS 5.3 · EPSS 0,02 · hors KEV · application web publique',
        },
      ],
      question: 'Classez de la plus urgente à la moins urgente.',
      items: ['B – exploitée (KEV), exposée sur Internet', 'C – EPSS élevé, back-office interne', 'D – exposée mais faible sévérité et probabilité', 'A – CVSS critique mais non livrée en production'],
      why: 'On combine exploitation avérée (KEV), probabilité (EPSS), exposition et contexte. B est activement exploitée sur un service exposé. A a le CVSS le plus élevé, mais la bibliothèque n’est pas livrée : le risque réel est faible. Prioriser au seul CVSS aurait mis A en tête.',
      points: 30,
      next: 'r3',
    },
    {
      id: 'r3',
      stage: 'risques',
      kind: 'choice',
      title: 'Ce que disent les équipes',
      narrative: ['Votre enquête de compétences est revenue. Le SAST, lui, détecte en moyenne 40 failles XSS par mois dans le code de l’équipe Web.'],
      evidence: [
        {
          label: 'Auto-évaluation (60 répondants)',
          content: '80 % se déclarent « autonomes » sur les failles web\nÉquipe Web : 90 % « autonomes »\nÉquipe Mobile : 55 % « autonomes »',
        },
      ],
      question: 'Que concluez-vous ?',
      choices: [
        {
          label: 'L’auto-évaluation est biaisée (effet Dunning-Kruger) : je la croise avec des tests pratiques et les résultats des outils avant de bâtir les parcours',
          feedback: 'Exact : l’écart entre déclaratif et réalité (40 XSS par mois) révèle un biais. On triangule : enquête, test pratique, indicateurs d’outils.',
          points: 20,
          next: 'm1',
          best: true,
        },
        {
          label: 'L’équipe Web est autonome : je concentre la formation sur le Mobile',
          feedback: 'Vous faites confiance à un déclaratif contredit par les données. L’équipe Web a pourtant le plus gros problème mesuré.',
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
      title: 'Construire la chaîne outillée',
      narrative: [
        'La direction pose une condition : le pipeline ne doit pas s’allonger de plus de 10 minutes, sinon les deux mises en production hebdomadaires sont menacées.',
        'Chaque outil ajouté au pipeline coûte des minutes. Les contrôles planifiés la nuit ne comptent pas.',
      ],
      question: 'Choisissez les contrôles à intégrer.',
      budget: 10,
      unit: 'min',
      options: [
        { id: 'secrets', label: 'Détection de secrets en pre-commit et dans la CI', cost: 1, points: 25, comment: 'Empêche la répétition de l’incident de clé exposée.' },
        { id: 'sca', label: 'Analyse des dépendances (SCA) avec blocage des vulnérabilités KEV', cost: 2, points: 25, comment: 'Traite le risque de composants vulnérables.' },
        { id: 'sast', label: 'SAST incrémental sur le diff de la pull request', cost: 3, points: 20, comment: 'Retour immédiat au développeur, sans analyser tout le dépôt.' },
        { id: 'sbom', label: 'Génération du SBOM à chaque build', cost: 1, points: 10, comment: 'Inventaire indispensable pour réagir aux nouvelles CVE.' },
        { id: 'dastnight', label: 'DAST en préproduction chaque nuit (hors pipeline)', cost: 0, points: 15, comment: 'Ne ralentit pas les livraisons.' },
        { id: 'container', label: 'Scan des images de conteneurs', cost: 2, points: 10, comment: 'Couvre les vulnérabilités du système de base.' },
        { id: 'fullsast', label: 'SAST complet de tout le monodépôt à chaque commit', cost: 8, points: 5, comment: 'Lent et bruyant : mieux vaut l’analyse incrémentale.' },
        { id: 'manual', label: 'Revue manuelle de chaque pull request par le RSSI', cost: 6, points: -5, comment: 'Goulot d’étranglement : ne passe pas à l’échelle. Préférer les Security Champions.' },
      ],
      branches: [{ requires: ['secrets', 'sca'], next: 'm2' }],
      fallback: 'm2b',
    },
    {
      id: 'm2b',
      stage: 'mesures',
      kind: 'choice',
      title: 'Deux semaines plus tard',
      narrative: ['Sans détection de secrets ni analyse des dépendances, un jeton d’accès au cloud est de nouveau publié, et une dépendance exploitée part en production.'],
      question: 'Comment ajustez-vous la chaîne ?',
      choices: [
        {
          label: 'Ajouter immédiatement détection de secrets et SCA, quitte à retirer un contrôle plus lent et moins rentable',
          feedback: 'Bonne correction : on traite d’abord les causes des incidents réels, avec les contrôles au meilleur rapport efficacité / temps.',
          points: 10,
          next: 'm2',
        },
        {
          label: 'Ne rien changer pour ne pas ralentir le pipeline',
          feedback: 'Les deux contrôles coûtent 3 minutes au total : refuser par principe n’est pas une gestion du risque.',
          points: -10,
          next: 'm2',
        },
      ],
    },
    {
      id: 'm2',
      stage: 'mesures',
      kind: 'choice',
      title: 'Le plan de formation',
      narrative: ['Les niveaux sont hétérogènes : des débutants côté Mobile, des référents expérimentés côté API.'],
      question: 'Quel dispositif de formation proposez-vous ?',
      choices: [
        {
          label: 'Parcours différenciés par niveau et par équipe, ateliers pratiques sur le code de Pikoli, Security Champions, rappels espacés et mesure avec Kirkpatrick',
          feedback: 'C’est une démarche d’adulte à adulte : pratique, contextualisée, répétée et évaluée sur les comportements et les résultats.',
          points: 25,
          next: 'j1',
          best: true,
        },
        {
          label: 'Une journée de conférence obligatoire pour les 60 développeurs',
          feedback: 'Coûteux en temps de production, peu adapté aux niveaux et vite oublié (courbe de l’oubli).',
          points: 0,
          next: 'j1',
        },
        {
          label: 'Des vidéos en ligne à regarder librement',
          feedback: 'Pratique et accessible si sous-titré, mais sans pratique ni suivi l’impact reste faible.',
          points: 5,
          next: 'j1',
        },
      ],
    },

    // ───────── Étape 4 : jury ─────────
    {
      id: 'j1',
      stage: 'jury',
      kind: 'open',
      title: 'Le CEO veut des chiffres',
      narrative: [
        'Le CEO vous interpelle : « Votre programme coûte 25 000 € par an. Qu’est-ce que ça rapporte ? »',
        'Vous estimez la perte annuelle attendue (ALE) liée à la fraude et aux fuites à 120 000 €, et la réduction du risque apportée par le programme à 70 %.',
      ],
      question: 'Calculez et défendez le ROSI.',
      points: 40,
      open: {
        keywords: [
          { label: 'Notion de ROSI / retour sur investissement', any: ['rosi', 'retour sur investissement', 'roi'] },
          { label: 'Gain = 84 000 €', any: ['84 000', '84000', '84 k', '84k'] },
          { label: 'Résultat ≈ 236 % (2,36)', any: ['236', '2,36', '2.36'] },
          { label: 'Perte annuelle attendue (ALE)', any: ['ale', 'perte annuelle', 'perte attendue'] },
          { label: 'Bénéfices non financiers (RGPD, confiance)', any: ['rgpd', 'amende', 'confiance', 'image', 'reputation'] },
        ],
        model:
          'Le gain attendu vaut l’ALE multipliée par la réduction du risque : 120 000 × 0,7 = 84 000 € par an. ROSI = (84 000 − 25 000) / 25 000 = 2,36, soit 236 % : chaque euro investi en évite plus de trois de pertes. À cela s’ajoutent des bénéfices difficiles à chiffrer : éviter les amendes RGPD, garder la confiance du prestataire de paiement et des artisans.',
      },
      next: 'j2',
    },
    {
      id: 'j2',
      stage: 'jury',
      kind: 'choice',
      title: 'Une nouvelle recrue',
      narrative: ['Une développeuse malvoyante rejoint l’équipe Mobile. Votre CTF de fin de parcours repose sur des captures d’écran sans texte et un temps limité.'],
      question: 'Que faites-vous ?',
      choices: [
        {
          label: 'Rendre le CTF accessible pour tous (textes alternatifs, navigation clavier, compatibilité lecteur d’écran), proposer du temps majoré et recueillir ses besoins en toute confidentialité',
          feedback: 'C’est la conception universelle de l’apprentissage plus l’aménagement raisonnable : l’activité devient accessible à tous, et les besoins individuels sont traités discrètement.',
          points: 20,
          next: 'end',
          best: true,
        },
        {
          label: 'La dispenser du CTF pour lui éviter des difficultés',
          feedback: 'L’exclure la prive de la formation : c’est contraire à l’obligation d’aménagement raisonnable.',
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
        'Partir des actifs réellement sensibles pour fixer la politique de sécurité (C6).',
        'Après une fuite de secret : révoquer d’abord, analyser ensuite ; puis prévenir par la chaîne outillée (C7).',
        'Prioriser les vulnérabilités avec KEV, EPSS, l’exposition et le contexte, pas au seul CVSS (C8).',
        'Ne jamais se fier à la seule auto-évaluation : trianguler (C9).',
        'Former par la pratique, de façon différenciée et répétée, et prouver la valeur par le ROSI (C10, C6).',
        'Concevoir des formations accessibles par défaut (C11).',
      ],
    },
  ],
}
