import type { QuizQuestion } from './types'

export const QUIZ_BLOC2: QuizQuestion[] = [
  // ───────────── QCM à réponse unique ─────────────
  {
    id: 'q2-01',
    type: 'single',
    block: 2,
    criteria: ['C6'],
    difficulty: 2,
    prompt:
      'Calculez le ROSI : le risque de fraude au paiement représente une ALE de 150 000 €. Un coffre-fort de secrets avec rotation réduirait ce risque de 60 % pour un coût annuel de 30 000 €.',
    options: ['100 %', '200 %', '300 %', '− 40 %'],
    answer: 1,
    explanation:
      'Gain = 150 000 × 0,6 = 90 000 € ; ROSI = (90 000 − 30 000) / 30 000 = 2, soit 200 % : la mesure est rentable. 300 % correspond à l’erreur classique qui oublie de soustraire le coût de la mesure (90 000 / 30 000).',
  },
  {
    id: 'q2-02',
    type: 'single',
    block: 2,
    criteria: ['C10'],
    difficulty: 1,
    prompt:
      'Après la journée annuelle de sensibilisation, les développeurs ont oublié l’essentiel des bonnes pratiques en quelques semaines. Quelle réponse pédagogique est la plus adaptée ?',
    options: [
      'Allonger la session annuelle à deux jours pour couvrir plus de contenu',
      'Envoyer le support complet en PDF à relire avant l’audit',
      'Remplacer la formation par une charte à signer',
      'Réactiver les acquis par une répétition espacée (J+1, J+7, J+30) avec des rappels courts et des campagnes récurrentes',
    ],
    answer: 3,
    explanation:
      'La courbe de l’oubli d’Ebbinghaus montre qu’on oublie vite sans réactivation : la répétition espacée et le micro-learning récurrent sont plus efficaces qu’une session unique, même plus longue. Une charte ou un PDF n’entraînent aucun apprentissage actif.',
  },
  {
    id: 'q2-03',
    type: 'single',
    block: 2,
    criteria: ['C6'],
    difficulty: 3,
    prompt:
      'OuiOuiGo (80 salariés) veut pouvoir sanctionner un développeur qui stocke des secrets sur un dépôt personnel. Que faut-il pour que la charte informatique soit opposable ?',
    options: [
      'La faire signer individuellement par chaque salarié, ce qui suffit à la rendre contraignante',
      'La publier sur l’intranet et l’envoyer par e-mail à tous',
      'L’annexer au règlement intérieur : consultation du CSE, information des salariés, transmission à l’inspection du travail',
      'La faire valider par le RSSI et le DPO',
    ],
    answer: 2,
    explanation:
      'Seule, une charte n’a pas de valeur contraignante : annexée au règlement intérieur (obligatoire dès 50 salariés) selon sa procédure, elle devient opposable et peut fonder une sanction disciplinaire. La signature individuelle ou la diffusion ne remplacent pas cette procédure.',
  },
  {
    id: 'q2-04',
    type: 'single',
    block: 2,
    criteria: ['C7'],
    difficulty: 1,
    prompt:
      'Lors d’un atelier STRIDE, l’équipe constate qu’un utilisateur peut modifier le prix d’un trajet dans la requête envoyée à l’API. Quelle catégorie de menace et quelle propriété sont en jeu ?',
    options: [
      'Tampering ↔ intégrité',
      'Spoofing ↔ authentification',
      'Repudiation ↔ non-répudiation',
      'Elevation of privilege ↔ autorisation',
    ],
    answer: 0,
    explanation:
      'Modifier une donnée en transit ou au repos relève de l’altération (Tampering), qui s’oppose à l’intégrité. Spoofing concerne l’usurpation d’identité ; l’élévation de privilèges, l’accès à des fonctions non autorisées.',
  },
  {
    id: 'q2-05',
    type: 'single',
    block: 2,
    criteria: ['C7'],
    difficulty: 3,
    prompt:
      'Dans l’API, tout nouvel endpoint est accessible tant qu’aucune règle ne l’interdit explicitement. Quel principe de Saltzer et Schroeder est violé ?',
    options: [
      'Economy of mechanism',
      'Open design',
      'Psychological acceptability',
      'Fail-safe defaults',
    ],
    answer: 3,
    explanation:
      'Fail-safe defaults impose de refuser par défaut : l’accès doit être accordé explicitement, pas retiré après coup. Open design rejette la sécurité par l’obscurité, Economy of mechanism prône la simplicité : ni l’un ni l’autre ne traite du comportement par défaut.',
  },
  {
    id: 'q2-06',
    type: 'single',
    block: 2,
    criteria: ['C8'],
    difficulty: 3,
    prompt:
      'Deux CVE touchent des composants présents dans votre SBOM, sur des services exposés à Internet. CVE A : CVSS 9.8, EPSS 0,02. CVE B : CVSS 7.5, inscrite au catalogue CISA KEV. Laquelle traitez-vous en premier ?',
    options: [
      'La CVE A, car son score CVSS est le plus élevé',
      'Aucune tant que le CERT-FR n’a pas publié d’alerte',
      'La CVE B, car son exploitation dans la nature est avérée',
      'Les deux dans le prochain cycle de mise à jour mensuel',
    ],
    answer: 2,
    explanation:
      'CVSS mesure la sévérité théorique, EPSS la probabilité d’exploitation, KEV l’exploitation avérée : une vulnérabilité KEV sur un actif exposé est un risque concret et immédiat. La CVE A reste à traiter rapidement, mais le CVSS seul n’est pas un critère de priorisation suffisant.',
  },
  {
    id: 'q2-07',
    type: 'single',
    block: 2,
    criteria: ['C8'],
    difficulty: 2,
    prompt:
      'Un CERT sectoriel vous transmet un rapport de menace que vous pouvez partager au sein de votre organisation, mais ni avec vos clients ni avec vos prestataires. Quel marquage TLP v2.0 porte-t-il ?',
    options: ['TLP:AMBER', 'TLP:AMBER+STRICT', 'TLP:GREEN', 'TLP:RED'],
    answer: 1,
    explanation:
      'AMBER+STRICT limite la diffusion à l’organisation du destinataire. AMBER autorise aussi ses clients selon le besoin d’en connaître, GREEN la communauté (pas publiquement), RED les seuls destinataires nommés.',
  },
  {
    id: 'q2-08',
    type: 'single',
    block: 2,
    criteria: ['C9'],
    difficulty: 1,
    prompt:
      'Trois mois après les ateliers, vous mesurez la part des pull requests revues avec la checklist sécurité. Quel niveau du modèle de Kirkpatrick évaluez-vous ?',
    options: [
      'Niveau 1 : réaction',
      'Niveau 2 : apprentissage',
      'Niveau 3 : comportement',
      'Niveau 4 : résultats',
    ],
    answer: 2,
    explanation:
      'Le niveau 3 mesure le transfert des acquis dans les pratiques de travail. Le niveau 2 porte sur les acquis mesurés en fin de formation (quiz), le niveau 4 sur l’impact pour l’organisation (baisse des vulnérabilités en production).',
  },
  {
    id: 'q2-09',
    type: 'single',
    block: 2,
    criteria: ['C10'],
    difficulty: 1,
    prompt: 'Un développeur demande comment stocker les mots de passe des utilisateurs. Que lui répondez-vous ?',
    options: [
      'Les hacher avec Argon2id et un sel unique par mot de passe',
      'Les chiffrer en AES-256-GCM avec une clé stockée dans un coffre-fort',
      'Les hacher en SHA-256 avec un sel commun',
      'Les encoder en Base64 avant de les enregistrer',
    ],
    answer: 0,
    explanation:
      'On ne chiffre pas un mot de passe (réversible) : on le hache avec une fonction lente et dédiée, Argon2id en premier choix selon l’OWASP, avec un sel unique. SHA-256 est trop rapide et Base64 n’est qu’un encodage.',
  },
  {
    id: 'q2-10',
    type: 'single',
    block: 2,
    criteria: ['C10'],
    difficulty: 3,
    prompt: 'Qu’apporte TLS 1.3 de façon systématique, contrairement à TLS 1.2 ?',
    options: [
      'Un chiffrement post-quantique obligatoire (ML-KEM)',
      'Un mode 0-RTT protégé contre le rejeu',
      'Le retour des suites CBC pour la compatibilité',
      'La confidentialité persistante, car l’échange de clés (EC)DHE est obligatoire',
    ],
    answer: 3,
    explanation:
      'TLS 1.3 supprime le transport de clé RSA : l’échange (EC)DHE éphémère est imposé, donc la confidentialité persistante est systématique, avec des suites AEAD uniquement. Le 0-RTT est optionnel et rejouable, et l’hybridation post-quantique (X25519MLKEM768) reste une option.',
  },
  {
    id: 'q2-11',
    type: 'single',
    block: 2,
    criteria: ['C11'],
    difficulty: 1,
    prompt: 'Quelle description du RGAA en vigueur en octobre 2026 est exacte ?',
    options: [
      'RGAA 5 : 80 critères fondés sur les WCAG 2.2 niveau AAA',
      'RGAA 4.1.2 : 106 critères en 13 thématiques, aligné sur les WCAG 2.1 niveaux A et AA',
      'RGAA 4.1.2 : 50 critères réservés aux sites des administrations',
      'RGAA 3 : une simple liste de bonnes pratiques sans méthode de test',
    ],
    answer: 1,
    explanation:
      'Le RGAA 4.1.2 compte 106 critères répartis en 13 thématiques, avec une méthode de test par critère, et s’aligne sur les WCAG 2.1 A et AA. Le RGAA 5 est annoncé mais pas encore publié en octobre 2026.',
  },

  // ───────────── QCM à réponses multiples ─────────────
  {
    id: 'q2-12',
    type: 'multi',
    block: 2,
    criteria: ['C6'],
    difficulty: 3,
    prompt:
      'Parmi ces éléments, lesquels figurent dans les dix mesures minimales de l’article 21 § 2 de NIS2 que la politique de sécurité doit couvrir ?',
    options: [
      'Gestion des incidents',
      'Certification ISO 27001 obligatoire',
      'Sécurité de la chaîne d’approvisionnement',
      'Recours obligatoire à un prestataire d’audit qualifié (PASSI) chaque année',
      'Cyberhygiène et formation à la cybersécurité',
      'Authentification multifacteur et communications sécurisées',
    ],
    answers: [0, 2, 4, 5],
    explanation:
      'L’article 21 liste notamment la gestion des incidents, la chaîne d’approvisionnement, la cyberhygiène et la formation, le MFA, la cryptographie ou la continuité. NIS2 n’impose ni certification ISO 27001 ni audit PASSI annuel : elle fixe des objectifs de moyens, pas un référentiel de certification.',
  },
  {
    id: 'q2-13',
    type: 'multi',
    block: 2,
    criteria: ['C7', 'C10'],
    difficulty: 3,
    prompt:
      'Les JWT de l’API n’expirent jamais, ne sont pas révoqués à la déconnexion et l’algorithme de l’en-tête n’est pas vérifié. Quelles corrections retenez-vous ?',
    options: [
      'Imposer une liste blanche d’algorithmes côté serveur (refus de « alg: none »)',
      'Encoder le payload en Base64 pour le rendre illisible',
      'Vérifier exp, iss et aud à chaque requête',
      'Jeton d’accès court (5 à 15 min) et jeton de rafraîchissement révocable avec rotation',
      'Stocker le jeton dans le localStorage pour faciliter la déconnexion',
    ],
    answers: [0, 2, 3],
    explanation:
      'Une liste blanche d’algorithmes bloque « alg: none » et la confusion RS256 → HS256 ; la vérification des claims et des durées courtes bornent l’usage d’un jeton volé. Le payload est déjà en Base64URL, lisible par tous, et le localStorage expose le jeton à tout script en cas de XSS.',
  },
  {
    id: 'q2-14',
    type: 'multi',
    block: 2,
    criteria: ['C7'],
    difficulty: 2,
    prompt:
      'L’application mobile stocke le jeton de session et l’historique des trajets en clair dans SharedPreferences. Quelles mesures sont conformes à MASVS-STORAGE ?',
    options: [
      'Protéger les secrets avec l’Android Keystore et le Keychain iOS',
      'Garder le stockage actuel, puisque les téléphones modernes sont chiffrés par défaut',
      'Ne conserver localement que les données nécessaires et les effacer à la déconnexion',
      'Embarquer la clé secrète du prestataire de paiement en l’obfusquant',
      'Exclure les données sensibles des sauvegardes de l’appareil',
    ],
    answers: [0, 2, 4],
    explanation:
      'Keystore / Keychain, minimisation et exclusion des sauvegardes répondent au risque d’extraction (appareil rooté, sauvegarde, adb). Le chiffrement de l’appareil ne protège surtout qu’un téléphone verrouillé, et toute clé embarquée dans une application est récupérable par décompilation, même obfusquée.',
  },
  {
    id: 'q2-15',
    type: 'multi',
    block: 2,
    criteria: ['C8'],
    difficulty: 4,
    prompt:
      'Vous mettez à jour le registre de veille réglementaire en octobre 2026. Quelles affirmations sont exactes ?',
    options: [
      'Le Cyber Resilience Act impose le signalement des vulnérabilités activement exploitées depuis le 11 septembre 2026',
      'Les obligations de l’AI Act pour les systèmes à haut risque s’appliquent depuis le 2 août 2026',
      'L’European Accessibility Act est applicable depuis le 28 juin 2025',
      'NIS2 est transposée en France par la loi « Résilience », promulguée fin 2024',
      'DORA s’applique au secteur financier depuis le 17 janvier 2025',
    ],
    answers: [0, 2, 4],
    explanation:
      'L’omnibus numérique de 2026 a reporté les obligations « haut risque » de l’AI Act au 2 décembre 2027 et au 2 août 2028 ; la loi Résilience n’est toujours pas promulguée en octobre 2026. C’est l’intérêt de la veille : une date apprise en formation peut être périmée.',
  },
  {
    id: 'q2-16',
    type: 'multi',
    block: 2,
    criteria: ['C9'],
    difficulty: 2,
    prompt:
      'Votre analyse des compétences repose sur une auto-évaluation. Quelles mesures objectives permettent de la compléter ?',
    options: [
      'Un exercice de revue de code sur un extrait vulnérable',
      'Un questionnaire d’auto-évaluation plus long, avec davantage d’échelles de Likert',
      'Un mini-CTF de diagnostic',
      'Les résultats des outils SAST / SCA et du test d’intrusion par équipe',
      'La note de satisfaction de la dernière formation',
    ],
    answers: [0, 2, 3],
    explanation:
      'L’auto-évaluation est déclarative et biaisée (effet Dunning-Kruger) : on la triangule avec des tests pratiques et des indicateurs issus des outils. Un questionnaire plus long reste déclaratif, et la satisfaction (Kirkpatrick niveau 1) ne mesure pas la compétence.',
  },
  {
    id: 'q2-17',
    type: 'multi',
    block: 2,
    criteria: ['C11'],
    difficulty: 2,
    prompt:
      'Vous organisez un CTF et des modules d’e-learning pour les 45 développeurs. Quelles mesures relèvent d’une démarche accessible ?',
    options: [
      'Sous-titres et transcriptions pour toutes les vidéos',
      'Exiger un justificatif de la MDPH avant tout aménagement',
      'Temps majoré et rôles variés dans les équipes du CTF',
      'Signaler les drapeaux validés uniquement par un passage du rouge au vert',
      'Autoriser le copier-coller et les gestionnaires de mots de passe sur la plateforme (WCAG 2.2, critère 3.3.8)',
    ],
    answers: [0, 2, 4],
    explanation:
      'Sous-titres, temps majoré et authentification accessible relèvent d’une conception accessible par défaut. Une information portée uniquement par la couleur exclut notamment les daltoniens, et les aménagements se demandent sans justificatif, via un recueil confidentiel des besoins.',
  },

  // ───────────── Vrai / faux ─────────────
  {
    id: 'q2-18',
    type: 'truefalse',
    block: 2,
    criteria: ['C7', 'C10'],
    difficulty: 1,
    prompt:
      'Un JWT signé (JWS) est chiffré : on peut donc y placer le numéro de téléphone de l’utilisateur sans risque.',
    answer: false,
    explanation:
      'Un JWS est signé, et son contenu est seulement encodé en Base64URL : n’importe qui peut lire le payload. La signature garantit l’intégrité et l’authenticité, pas la confidentialité (le chiffrement passe par JWE, rarement utilisé).',
  },
  {
    id: 'q2-19',
    type: 'truefalse',
    block: 2,
    criteria: ['C7', 'C10'],
    difficulty: 2,
    prompt: 'Le front-end est développé avec React, qui échappe les données affichées : le XSS y est donc impossible.',
    answer: false,
    explanation:
      'React protège par défaut, mais pas avec dangerouslySetInnerHTML, des liens « javascript: », des manipulations directes du DOM ou des bibliothèques tierces. Le back-office et les WebViews peuvent aussi afficher le même contenu : CSP et revue de code restent nécessaires.',
  },
  {
    id: 'q2-20',
    type: 'truefalse',
    block: 2,
    criteria: ['C10'],
    difficulty: 1,
    prompt:
      'Les recommandations actuelles du NIST et de la CNIL demandent d’imposer à tous les utilisateurs un changement de mot de passe tous les 90 jours.',
    answer: false,
    explanation:
      'Le NIST SP 800-63B-4 interdit le changement périodique et la CNIL ne l’impose plus à tous : il pousse à des mots de passe prévisibles. On change en cas de compromission et l’on privilégie la longueur, la vérification contre les mots de passe compromis et le MFA.',
  },
  {
    id: 'q2-21',
    type: 'truefalse',
    block: 2,
    criteria: ['C6'],
    difficulty: 2,
    prompt:
      'Selon l’article 20 de NIS2, les dirigeants approuvent les mesures de gestion des risques cyber, supervisent leur mise en œuvre, peuvent être tenus responsables et doivent se former.',
    answer: true,
    explanation:
      'NIS2 place la responsabilité de la cybersécurité au niveau de la direction, qui doit aussi suivre une formation. C’est un argument fort pour que la PSSI soit portée et signée par la direction, et non par la seule DSI.',
  },
  {
    id: 'q2-22',
    type: 'truefalse',
    block: 2,
    criteria: ['C9'],
    difficulty: 3,
    prompt:
      'Depuis la loi du 24 octobre 2025, l’entretien professionnel devient l’« entretien de parcours professionnel » : un premier dans l’année suivant l’embauche, puis un tous les 4 ans, avec un état des lieux récapitulatif tous les 8 ans.',
    answer: true,
    explanation:
      'La réforme remplace l’ancien rythme (tous les 2 ans, bilan à 6 ans) que beaucoup de supports citent encore. L’entretien porte sur les compétences, les besoins de formation et les souhaits d’évolution : c’est une source pour l’analyse des besoins.',
  },
  {
    id: 'q2-23',
    type: 'truefalse',
    block: 2,
    criteria: ['C11'],
    difficulty: 4,
    prompt:
      'Avec 80 salariés, OuiOuiGo est soumise à l’obligation d’emploi de travailleurs handicapés (6 %), mais n’est pas légalement tenue de désigner un référent handicap.',
    answer: true,
    explanation:
      'L’OETH s’applique dès 20 salariés, alors que le référent handicap n’est obligatoire qu’à partir de 250 salariés. En désigner un reste une bonne pratique pour recueillir confidentiellement les besoins d’aménagement des formations.',
  },

  // ───────────── Remise en ordre ─────────────
  {
    id: 'q2-24',
    type: 'order',
    block: 2,
    criteria: ['C7', 'C10'],
    difficulty: 2,
    prompt:
      'Un vendredi soir, un développeur pousse un fichier .env contenant la clé du prestataire de paiement sur un dépôt GitHub public. Remettez la réponse dans l’ordre.',
    items: [
      'Le développeur signale immédiatement l’incident, sans crainte d’être blâmé',
      'Révoquer la clé et la remplacer par une nouvelle, stockée dans un coffre-fort',
      'Analyser les journaux du prestataire depuis la date d’exposition pour détecter un usage frauduleux',
      'Retour d’expérience : gitleaks en pre-commit et dans la CI, push protection activée',
    ],
    explanation:
      'La révocation vient avant tout le reste : supprimer le fichier par un nouveau commit ne suffit pas, le secret reste dans l’historique et a pu être cloné. On cherche ensuite un usage malveillant, puis on corrige la chaîne pour que l’erreur ne se reproduise pas.',
  },
  {
    id: 'q2-25',
    type: 'order',
    block: 2,
    criteria: ['C8'],
    difficulty: 1,
    prompt: 'Remettez dans l’ordre les étapes du cycle de veille.',
    items: [
      'Expression des besoins et ciblage',
      'Sourcing et collecte',
      'Traitement et analyse',
      'Diffusion',
      'Capitalisation et exploitation',
      'Retour d’expérience et réajustement des besoins',
    ],
    explanation:
      'La veille part de besoins explicites (périmètre, technologies, obligations), sinon elle devient une accumulation d’informations. L’analyse précède la diffusion, et le retour d’expérience relance le cycle.',
  },
  {
    id: 'q2-26',
    type: 'order',
    block: 2,
    criteria: ['C9'],
    difficulty: 2,
    prompt:
      'Classez les niveaux de la taxonomie de Bloom révisée, du plus simple au plus complexe, pour rédiger les objectifs des parcours Découverte → Référent.',
    items: ['Se souvenir', 'Comprendre', 'Appliquer', 'Analyser', 'Évaluer', 'Créer'],
    explanation:
      'Bloom révisé (Anderson et Krathwohl, 2001) va de la mémorisation à la création. Un parcours Découverte vise « reconnaître une faille », un parcours Référent « évaluer une revue de code » ou « concevoir un atelier ».',
  },
  {
    id: 'q2-27',
    type: 'order',
    block: 2,
    criteria: ['C7'],
    difficulty: 2,
    prompt: 'Placez les contrôles de la chaîne DevSecOps dans l’ordre du cycle, de l’écriture du code à l’exploitation.',
    items: [
      'IDE : SAST léger (SonarLint, Semgrep)',
      'Pre-commit : détection de secrets (gitleaks)',
      'Pull request : SAST et SCA, revue par un pair',
      'Build : génération du SBOM et scan des images de conteneurs',
      'Préproduction : DAST (OWASP ZAP)',
      'Production : supervision, SIEM et alertes',
    ],
    explanation:
      'Shift left : chaque contrôle est placé au plus tôt, là où corriger coûte le moins cher. Le DAST a besoin d’une application en fonctionnement, donc après le build, et la supervision couvre l’exploitation.',
  },

  // ───────────── Questions ouvertes ─────────────
  {
    id: 'q2-28',
    type: 'open',
    block: 2,
    criteria: ['C6'],
    difficulty: 4,
    prompt:
      'La direction propose de reprendre une PSSI type trouvée en ligne. Expliquez comment vous construisez une politique adaptée à OuiOuiGo (une mise en production par semaine, budget limité, croissance rapide).',
    open: {
      keywords: [
        { label: 'Partir de l’analyse de risques', any: ['risque', 'ebios', '27005', 'menace'] },
        { label: 'Proportionnalité et ROSI', any: ['proportion', 'rosi', 'retour sur invest', 'cout', 'rentab', 'budget'] },
        {
          label: 'Contraintes métier (MEP, rythme de livraison)',
          any: ['mise en production', 'mep', 'livraison', 'contrainte', 'time to market', 'metier', 'hebdo'],
        },
        {
          label: 'Exceptions documentées et mesures compensatoires',
          any: ['exception', 'derogation', 'compensatoire', 'residuel', 'acceptation'],
        },
        { label: 'Portage par la direction et revue', any: ['direction', 'dirigeant', 'approuv', 'signe', 'revue', 'amelioration continue'] },
      ],
      model:
        'Une PSSI générique ne cible pas les risques réels : je pars de l’analyse de risques d’OuiOuiGo (paiements, géolocalisation, secrets, dépendances). Chaque règle est proportionnée, son coût comparé à la perte évitée (ROSI), et compatible avec une mise en production hebdomadaire grâce à des contrôles automatisés. Les cas où une règle ne peut pas s’appliquer passent par des exceptions documentées avec mesures compensatoires et acceptation du risque résiduel. La politique est approuvée par la direction, comme l’exige NIS2, puis revue à intervalles planifiés.',
    },
    explanation:
      'Le jury pénalise la PSSI copiée-collée : il attend un lien explicite entre risques, contraintes de l’entreprise, coût des mesures et engagement de la direction.',
  },
  {
    id: 'q2-29',
    type: 'open',
    block: 2,
    criteria: ['C7', 'C6'],
    difficulty: 4,
    prompt:
      'Le pipeline doit rester sous 10 minutes et la direction refuse de ralentir les mises en production. Faut-il bloquer le pipeline à chaque vulnérabilité détectée ? Justifiez votre stratégie.',
    open: {
      keywords: [
        { label: 'Bloquer uniquement le critique (quality gates progressifs)', any: ['critique', 'bloqu', 'quality gate', 'seuil', 'progressi'] },
        { label: 'Nouvelles vulnérabilités seulement, dette en référence', any: ['nouvelle', 'baseline', 'reference', 'dette', 'existant'] },
        {
          label: 'Scans rapides : incrémentaux et parallèles',
          any: ['parallel', 'incremental', 'diff', 'rapide', 'minute', 'nightly', 'nuit', 'asynchrone'],
        },
        { label: 'Réduire les faux positifs', any: ['faux positif', 'reglage', 'regler', 'tuning', 'ajust', 'bruit'] },
        {
          label: 'Avertissements, backlog et exception documentée',
          any: ['exception', 'avertissement', 'warning', 'backlog', 'ticket', 'delai'],
        },
      ],
      model:
        'Non : je mets en place des quality gates progressifs qui ne bloquent que les nouvelles vulnérabilités critiques ou hautes et les secrets. Les autres résultats remontent en avertissement dans la pull request et alimentent le backlog avec un délai par sévérité, tandis que la dette existante est mise en référence et résorbée par lots. Les scans sont incrémentaux sur le diff et exécutés en parallèle pour tenir les 10 minutes, et les règles sont réglées pour limiter les faux positifs. Une procédure d’exception validée par un référent couvre les urgences.',
    },
    explanation:
      'Bloquer sur tout pousse les développeurs à contourner l’outil ; ne rien bloquer le rend inutile. La réponse attendue concilie sécurité et Time to Market.',
  },
  {
    id: 'q2-30',
    type: 'open',
    block: 2,
    criteria: ['C10'],
    difficulty: 4,
    prompt:
      'Un développeur mobile affirme : « On utilise OAuth 2.0, donc l’authentification est réglée. » Corrigez-le et expliquez quel flux utiliser pour l’application mobile, et pourquoi.',
    open: {
      keywords: [
        { label: 'OAuth 2.0 = délégation d’autorisation', any: ['autoris', 'delegat', 'access token', 'jeton d acces'] },
        { label: 'OpenID Connect et ID Token pour l’authentification', any: ['openid', 'oidc', 'id token', 'id_token', 'jeton d identite'] },
        { label: 'Authorization Code + PKCE', any: ['pkce', 'authorization code', 'code d autorisation'] },
        { label: 'code_verifier / code_challenge', any: ['verifier', 'challenge', 'empreinte', 'hach', 'sha'] },
        {
          label: 'Client public : pas de secret, code interceptable',
          any: ['intercept', 'secret client', 'client public', 'pas de secret', 'garder un secret', 'decompil', 'navigateur systeme'],
        },
      ],
      model:
        'OAuth 2.0 est un protocole de délégation d’autorisation : il fournit un jeton d’accès à une API, pas une preuve d’identité. L’authentification est apportée par OpenID Connect, qui ajoute un ID Token au format JWT. Sur mobile, on utilise le flux Authorization Code avec PKCE via le navigateur système : l’application génère un code_verifier aléatoire et envoie son empreinte (code_challenge), puis doit présenter le code_verifier pour échanger le code. Une application mobile ne peut pas garder de secret client et son code de redirection peut être intercepté : PKCE rend ce code inutilisable, et les flux implicite et mot de passe sont proscrits (RFC 9700).',
    },
    explanation:
      'Confondre OAuth et authentification est une erreur relevée par les jurys ; la réponse doit distinguer autorisation (OAuth) et identité (OIDC), puis justifier PKCE par l’absence de secret côté client.',
  },
  {
    id: 'q2-31',
    type: 'open',
    block: 2,
    criteria: ['C9'],
    difficulty: 3,
    prompt:
      'L’auto-évaluation donne 40 % Découverte, 44 % Autonome et 16 % Référent, avec Web et Mobile majoritairement en Découverte. Comment transformez-vous ces résultats en analyse fiable des besoins de formation ?',
    open: {
      keywords: [
        { label: 'Écart entre compétences requises et détenues', any: ['ecart', 'requis', 'attendu', 'gap', 'matrice', 'cible'] },
        { label: 'Biais de l’auto-évaluation', any: ['biais', 'dunning', 'kruger', 'surestim', 'sous-estim', 'declaratif', 'subjectif'] },
        {
          label: 'Mesures objectives croisées',
          any: ['test', 'ctf', 'revue de code', 'qcm', 'sast', 'objecti', 'crois', 'triangul', 'intrusion'],
        },
        { label: 'Priorisation par risque et par équipe', any: ['priori', 'mobile', 'web', 'critique', 'urgence'] },
        { label: 'RGPD, anonymat et réévaluation', any: ['anonym', 'rgpd', 'agreg', 'reevalu', 're-evalu', 'mois', 'confidenti'] },
      ],
      model:
        'Je compare les compétences requises par le référentiel développeur aux compétences constatées pour mesurer l’écart, dans une matrice personnes × compétences. Comme l’auto-évaluation est déclarative et sujette à l’effet Dunning-Kruger, je la croise avec des mesures objectives : exercice de revue de code, mini-CTF, résultats SAST / SCA et du test d’intrusion par équipe. Je priorise les écarts selon le risque, donc d’abord Web et Mobile et les thèmes liés aux vulnérabilités constatées. Les résultats collectifs sont anonymisés (RGPD) et une réévaluation est prévue à 3 et 6 mois.',
    },
    explanation:
      'Le jury attend une lecture chiffrée, la critique de l’auto-évaluation et des mesures objectives complémentaires, pas une formation identique pour tous.',
  },
  {
    id: 'q2-32',
    type: 'open',
    block: 2,
    criteria: ['C11'],
    difficulty: 3,
    prompt:
      'Comment intégrez-vous l’accessibilité dans le plan de formation sécurité (e-learning, ateliers, CTF) plutôt que de l’évoquer en une phrase ?',
    open: {
      keywords: [
        { label: 'Référentiels RGAA / WCAG', any: ['rgaa', 'wcag', 'en 301 549'] },
        {
          label: 'Conception universelle, accessible par défaut',
          any: ['conception universelle', 'udl', 'cua', 'par defaut', 'des la conception', 'universel'],
        },
        { label: 'Recueil confidentiel des besoins, référent handicap', any: ['referent', 'confidenti', 'recueil', 'en amont'] },
        {
          label: 'Supports accessibles',
          any: ['sous-titr', 'sous titr', 'transcri', 'clavier', 'lecteur d ecran', 'contraste', 'falc', 'lsf', 'texte alternatif'],
        },
        { label: 'Aménagements des évaluations', any: ['temps major', 'tiers temps', 'amenagement', 'pause', 'asynchrone', 'adapt'] },
      ],
      model:
        'Je conçois les formations accessibles par défaut selon la conception universelle de l’apprentissage, puis j’ajoute des aménagements individuels sur demande. La plateforme d’e-learning et les supports respectent le RGAA (WCAG 2.1 AA) : sous-titres, transcriptions, contrastes, navigation clavier et compatibilité avec les lecteurs d’écran. Les besoins sont recueillis en amont et de façon confidentielle, en lien avec le référent handicap. Pour les CTF et simulations, je prévois un temps majoré, des pauses, des rôles variés et une participation asynchrone possible.',
    },
    explanation:
      'Environ 80 % des handicaps sont invisibles : on ne peut pas attendre qu’une personne se signale pour rendre la formation accessible. Le jury attend le RGAA, des adaptations concrètes et le lien avec le référent handicap.',
  },
]
