import type { QuizQuestion } from './types'

export const QUIZ_BLOC1: QuizQuestion[] = [
  // ───────────── C1 – Plan d’audit, méthodologie, détection ─────────────
  {
    id: 'q1-01',
    type: 'single',
    block: 1,
    criteria: ['C1'],
    difficulty: 1,
    prompt:
      'Le RSSI du CHU vous remet le schéma d’architecture et deux comptes patients de test pour le portail, mais pas le code source. Quel type de test allez-vous mener ?',
    options: [
      'Un test en boîte blanche',
      'Un test en boîte noire',
      'Un exercice Red Team',
      'Un test en boîte grise',
    ],
    answer: 3,
    explanation:
      'Boîte grise = informations partielles (architecture) et privilèges d’un utilisateur légitime. La boîte noire ne fournit que les cibles (IP, URL, domaine), la blanche donne tout (code, configurations) ; un Red Team simule un attaquant réel dans la durée et teste aussi la détection.',
  },
  {
    id: 'q1-02',
    type: 'truefalse',
    block: 1,
    criteria: ['C1'],
    difficulty: 1,
    prompt:
      'Un auditeur qui lance un test d’intrusion sans autorisation écrite du commanditaire commet le délit d’accès frauduleux à un STAD (art. 323-1 du Code pénal), même s’il ne modifie aucune donnée.',
    answer: true,
    explanation:
      'Le simple accès ou maintien frauduleux est puni de 3 ans et 100 000 € ; la modification de données aggrave la peine (5 ans et 150 000 €). D’où la convention signée et la fiche d’autorisation, émises par un commanditaire qui détient lui-même les droits sur le périmètre ou l’accord des tiers.',
  },
  {
    id: 'q1-03',
    type: 'single',
    block: 1,
    criteria: ['C1', 'C4'],
    difficulty: 2,
    prompt:
      'Connecté avec le compte de test du patient A, un auditeur observe dans le journal du portail : `GET /comptes-rendus/1043 → 200`, puis `GET /comptes-rendus/1044 → 200`. Le document 1044 appartient au patient B. Comment qualifiez-vous ce constat ?',
    options: [
      'Une injection (A05:2025) : le paramètre numérique est interprété par la base de données',
      'Une mauvaise configuration (A02:2025) : le serveur liste le contenu du répertoire',
      'Une IDOR, qui relève de Broken Access Control (A01) et de BOLA (API1:2023)',
      'Une défaillance d’authentification (A07:2025) : la session du patient A est mal protégée',
    ],
    answer: 2,
    explanation:
      'Le serveur renvoie un objet sans vérifier qu’il appartient à l’utilisateur authentifié : c’est une IDOR, catégorie A01 Broken Access Control (BOLA côté API). L’authentification fonctionne, c’est l’autorisation qui manque. Confirmation : rejouer la requête avec deux comptes de test (Burp, Autorize) ; 403 attendu, 200 obtenu.',
  },
  {
    id: 'q1-04',
    type: 'multi',
    block: 1,
    criteria: ['C1'],
    difficulty: 2,
    prompt:
      'Vous devez confirmer l’injection SQL suspectée dans la recherche patient du DPI (erreur technique avec « O’Brien »). Le DPI fonctionne 24 h/24. Quelles actions sont appropriées ?',
    options: [
      'Reproduire l’erreur en préproduction et tester des charges booléennes ou temporelles avec Burp Repeater',
      'Lancer sqlmap en production avec --risk=3 --level=5 pendant la nuit pour gagner du temps',
      'Relire le code de la recherche pour repérer une concaténation de chaînes dans la requête',
      'Extraire quelques dossiers patients réels pour démontrer l’impact au directeur',
      'Utiliser sqlmap en mode prudent (--risk=1), en lecture seule, pour énumérer la structure sans extraire de données',
    ],
    answers: [0, 2, 4],
    explanation:
      'On confirme sans nuire : préproduction, charges non destructives, revue de code, sqlmap en mode prudent. Un sqlmap agressif en production peut altérer des données ou dégrader le service, et extraire de vraies données de santé est disproportionné : énumérer la structure suffit à prouver l’injection.',
  },
  {
    id: 'q1-05',
    type: 'order',
    block: 1,
    criteria: ['C1'],
    difficulty: 2,
    prompt: 'Remettez dans l’ordre les étapes d’une mission d’audit selon le référentiel PASSI.',
    items: [
      'Signature de la convention de service (périmètre, objectifs, livrables, confidentialité, risques sur la disponibilité)',
      'Préparation : note de cadrage, fiche d’autorisation des tests, plan d’audit, réunion d’ouverture',
      'Exécution des travaux selon une approche par les risques',
      'Restitution des résultats dès la fin des travaux',
      'Remise du rapport d’audit',
      'Clôture : destruction ou restitution des données collectées',
    ],
    explanation:
      'Le cadre contractuel précède tout acte technique ; la restitution a lieu dès la fin des travaux, sans attendre le rapport ; la clôture règle le sort des données sensibles collectées. En amont de la convention, le prestataire vérifie sa capacité à réaliser la mission.',
  },
  {
    id: 'q1-06',
    type: 'truefalse',
    block: 1,
    criteria: ['C1'],
    difficulty: 1,
    prompt:
      'Un scan Nessus entièrement automatisé de la DMZ constitue, à lui seul, une activité d’audit au sens du référentiel PASSI.',
    answer: false,
    explanation:
      'Le référentiel PASSI ne reconnaît pas une activité entièrement automatisée comme un audit. Le scan produit des faux positifs et ignore les failles logiques (IDOR, clé partagée) : l’auditeur doit analyser, confirmer et prouver. Le scan reste un outil utile au sein de l’audit.',
  },
  {
    id: 'q1-07',
    type: 'single',
    block: 1,
    criteria: ['C1'],
    difficulty: 3,
    prompt:
      'Le plan d’audit inclut le VLAN biomédical du CHU (pompes à perfusion, moniteurs, une partie sous Windows 7), en production permanente. Quelle approche retenez-vous ?',
    options: [
      'Analyse passive (copie de trafic par port mirroring, inventaire, documentation constructeur) ; tests actifs seulement sur un équipement de rechange, avec le biomédical et le constructeur',
      'Un scan Nmap agressif (-T4 -A) de nuit, quand l’activité des services est plus faible',
      'Un scan Nessus authentifié, sur simple accord oral du chef de service',
      'L’exclusion du VLAN du périmètre : les dispositifs médicaux certifiés ne relèvent pas de l’audit',
    ],
    answer: 0,
    explanation:
      'Un scan actif peut faire planter un équipement embarqué ou ancien : le risque devient vital. L’analyse passive préserve la prise en charge des patients ; un test actif exige un équipement hors service et un accord écrit. Exclure ce VLAN serait une faute : c’est une cible de choix pour un rançongiciel.',
  },
  {
    id: 'q1-08',
    type: 'open',
    block: 1,
    criteria: ['C1'],
    difficulty: 3,
    prompt:
      'Le directeur général veut que vos tests d’intrusion commencent dès lundi « pour aller vite ». Que doit-on avoir réglé avant le premier test ?',
    open: {
      keywords: [
        {
          label: 'Convention et autorisation écrite',
          any: ['autoris', 'convention', 'lettre de mission', 'ecrit', 'signe', 'contrat'],
        },
        {
          label: 'Périmètre et objectifs',
          any: ['perimetre', 'cible', 'objectif', 'adresses ip', 'scope'],
        },
        {
          label: 'Règles d’engagement',
          any: ['regles d engagement', 'regle d engagement', 'horaire', 'criteres d arret', 'critere d arret', 'arret', 'interdit', 'fenetre', 'non destructi'],
        },
        {
          label: 'Contacts d’urgence et coordination',
          any: ['contact', 'urgence', 'astreinte', 'coordin', 'supervision', 'prevenir le', 'informer le'],
        },
        {
          label: 'Droits des tiers et précautions',
          any: ['tiers', 'hebergeur', 'cloud', 'editeur', 'constructeur', 'sauvegarde', 'retour arriere', 'preproduction', 'pre-production'],
        },
      ],
      model:
        'Aucun test sans convention signée et autorisation écrite : sinon, c’est un accès frauduleux à un STAD (art. 323-1 du Code pénal). Il faut fixer le périmètre et les objectifs, les règles d’engagement (horaires, actions interdites, tests non destructifs, critères d’arrêt) et les contacts d’urgence, et prévenir le SOC. Le CHU doit détenir les droits sur le périmètre ou obtenir l’accord des tiers (hébergeur, éditeurs, constructeurs). Enfin, on prend des précautions : sauvegardes vérifiées, préproduction quand c’est possible, plan de retour arrière.',
    },
    explanation:
      'La rapidité ne dispense pas du cadre : le plan d’audit, la convention et la fiche d’autorisation protègent à la fois l’auditeur, le commanditaire et les patients.',
  },

  // ───────────── C2 – Analyse de risques, contraintes juridiques et techniques ─────────────
  {
    id: 'q1-09',
    type: 'order',
    block: 1,
    criteria: ['C2'],
    difficulty: 1,
    prompt: 'Remettez dans l’ordre les ateliers de la méthode EBIOS Risk Manager.',
    items: [
      'Cadrage et socle de sécurité (valeurs métier, biens supports, événements redoutés)',
      'Sources de risque (couples SR/OV)',
      'Scénarios stratégiques (chemins d’attaque via l’écosystème)',
      'Scénarios opérationnels (modes opératoires, vraisemblance)',
      'Traitement du risque (plan de traitement, risques résiduels)',
    ],
    explanation:
      'On part du métier (atelier 1), on identifie qui attaque et pourquoi (2), par où dans l’écosystème (3), comment techniquement (4), puis on décide du traitement (5). La gravité s’estime au niveau stratégique, la vraisemblance au niveau opérationnel.',
  },
  {
    id: 'q1-10',
    type: 'single',
    block: 1,
    criteria: ['C2'],
    difficulty: 1,
    prompt:
      'Pour le CHU, on relève : (a) une injection SQL dans la recherche patient ; (b) un groupe cybercriminel qui cible les hôpitaux ; (c) l’exfiltration des dossiers suivie d’un chantage. Que désignent respectivement (a), (b) et (c) ?',
    options: [
      'Menace, vulnérabilité, risque',
      'Vulnérabilité, menace (source de risque), risque',
      'Vulnérabilité, risque, événement redouté',
      'Risque, menace, vulnérabilité',
    ],
    answer: 1,
    explanation:
      'La vulnérabilité est la faiblesse exploitable, la menace est celui qui a l’intention de nuire, le risque est le scénario qui les combine et dont on estime gravité et vraisemblance. Confondre ces trois notions est un écueil explicitement relevé par le jury.',
  },
  {
    id: 'q1-11',
    type: 'single',
    block: 1,
    criteria: ['C5'],
    difficulty: 2,
    prompt:
      'L’éditeur du DPI a obtenu la CSPN pour la version 5.2. Le directeur du CHU déclare : « Notre DPI est certifié, donc notre SI est homologué, et il le restera pour les versions suivantes. » Que lui répondez-vous ?',
    options: [
      'C’est exact : la CSPN vaut homologation pendant 3 ans, toutes versions confondues',
      'C’est exact pour l’homologation, mais il faudra un audit PASSI pour couvrir les versions suivantes',
      'C’est faux uniquement parce qu’une CSPN n’est valable qu’un an',
      'C’est faux : la certification porte sur une version donnée d’un produit, tandis que l’homologation est une décision interne d’accepter les risques résiduels du SI, que la CSPN ne fait qu’alimenter',
    ],
    answer: 3,
    explanation:
      'La CSPN certifie un produit dans une version donnée, pour 3 ans, et ne se transfère pas aux versions suivantes. L’homologation est une décision d’une autorité de l’organisation qui accepte les risques résiduels d’un SI : un produit certifié est une pièce du dossier, pas l’homologation elle-même.',
  },
  {
    id: 'q1-12',
    type: 'multi',
    block: 1,
    criteria: ['C2'],
    difficulty: 2,
    prompt:
      'Lors de l’atelier 1 d’EBIOS RM pour le CHU, vous recensez les contraintes juridiques. Lesquelles sont pertinentes ?',
    options: [
      'RGPD : données de santé (art. 9), AIPD (art. 35), notification des violations (art. 33 et 34)',
      'DORA, applicable depuis le 17 janvier 2025',
      'Hébergement de données de santé (HDS) et secret médical',
      'NIS2 : la santé est un secteur hautement critique, à anticiper tant que la transposition française n’est pas promulguée',
      'Le Cyber Resilience Act, qui impose au CHU de faire certifier son SI',
    ],
    answers: [0, 2, 3],
    explanation:
      'RGPD, HDS, secret médical et NIS2 encadrent directement un établissement de santé. DORA vise le secteur financier ; le Cyber Resilience Act s’adresse aux fabricants de produits comportant des éléments numériques et ne certifie pas le SI d’un utilisateur.',
  },
  {
    id: 'q1-13',
    type: 'truefalse',
    block: 1,
    criteria: ['C2'],
    difficulty: 2,
    prompt:
      'En souscrivant une cyber-assurance qui couvre les fuites de données, le CHU transfère à l’assureur sa responsabilité de responsable de traitement au sens du RGPD.',
    answer: false,
    explanation:
      'Transférer (partager) un risque déplace une partie de ses conséquences financières, pas la responsabilité légale. Le CHU reste responsable de traitement : il doit toujours notifier la CNIL et répondre de la sécurité du traitement (art. 32).',
  },
  {
    id: 'q1-14',
    type: 'single',
    block: 1,
    criteria: ['C2'],
    difficulty: 4,
    prompt:
      'Le constructeur des pompes à perfusion se connecte à distance pour la maintenance, avec le mot de passe d’usine. Dans EBIOS RM, comment le traitez-vous ?',
    options: [
      'Comme un bien support, puisque le fonctionnement des pompes repose sur lui',
      'Comme une valeur métier, car la maintenance est indispensable aux soins',
      'Comme une partie prenante de l’écosystème, cotée sur l’exposition (dépendance, pénétration) et la fiabilité cyber (maturité, confiance) ; elle est probablement critique',
      'Comme une source de risque, associée à l’objectif visé « sabotage »',
    ],
    answer: 2,
    explanation:
      'Le CHU n’est pas responsable du constructeur : c’est une partie prenante, pas un bien support (règle EBIOS RM). Sa forte pénétration (accès distant au VLAN biomédical) et sa faible maturité (mot de passe d’usine) en font un vecteur d’attaque privilégié en atelier 3. Ce n’est pas une source de risque : il n’a pas d’intention hostile, il sert de rebond.',
  },
  {
    id: 'q1-15',
    type: 'open',
    block: 1,
    criteria: ['C2'],
    difficulty: 3,
    prompt:
      'Décrivez un scénario stratégique EBIOS RM de rançongiciel passant par l’écosystème du CHU, et les mesures qui en découlent.',
    open: {
      keywords: [
        {
          label: 'Source de risque et objectif visé',
          any: ['cybercrimin', 'criminel', 'mafi', 'gain financier', 'financ', 'argent', 'lucratif', 'extorsion'],
        },
        {
          label: 'Partie prenante comme vecteur',
          any: ['constructeur', 'prestataire', 'fournisseur', 'maintenance', 'editeur', 'partie prenante', 'tiers', 'sous-traitant', 'centre distant', 'vpn'],
        },
        {
          label: 'Propagation latérale',
          any: ['lateral', 'propag', 'pivot', 'rebond', 'vlan', 'mouvement'],
        },
        {
          label: 'Événement redouté',
          any: ['indisponib', 'chiffr', 'paralys', 'fuite', 'exfiltr', 'double extorsion', 'urgences'],
        },
        {
          label: 'Mesures sur l’écosystème et le SI',
          any: ['bastion', 'segment', 'cloison', 'sauvegarde', 'edr', 'mfa', 'authentification forte', 'mot de passe', 'exercice de crise', 'clause'],
        },
      ],
      model:
        'Source de risque : un groupe cybercriminel ; objectif visé : le gain financier. Chemin d’attaque : compromission de l’accès de maintenance du constructeur des pompes (mot de passe d’usine), entrée dans le VLAN biomédical, propagation latérale jusqu’au VLAN serveurs, exfiltration puis chiffrement du DPI et de la base de santé. Événements redoutés : indisponibilité du SI (urgences paralysées) et fuite de données de santé (double extorsion), de gravité critique. Mesures : bastion avec MFA pour les tiers, changement du mot de passe d’usine, clauses de sécurité, segmentation, EDR, sauvegardes hors ligne testées, exercices de crise.',
    },
    explanation:
      'Au niveau stratégique (atelier 3), on décrit le chemin par l’écosystème et on estime la gravité ; le détail technique et la vraisemblance relèvent de l’atelier 4. Les mesures sur l’écosystème (exigences contractuelles, bastion) sont un livrable de l’atelier 3.',
  },
  {
    id: 'q1-16',
    type: 'truefalse',
    block: 1,
    criteria: ['C2'],
    difficulty: 4,
    prompt:
      'Dans EBIOS RM v1.5 (septembre 2024), le « PACS » des versions précédentes est renommé « plan de traitement du risque » et l’« entité responsable » devient le « propriétaire ».',
    answer: true,
    explanation:
      'La v1.5, pleinement conforme à ISO/IEC 27005:2022, aligne son vocabulaire sur la norme. Attention à ne pas confondre ce PACS d’EBIOS RM avec la qualification PACS de l’ANSSI, qui concerne des prestataires.',
  },

  // ───────────── C3 – Mesures existantes vs attendues ─────────────
  {
    id: 'q1-17',
    type: 'single',
    block: 1,
    criteria: ['C3'],
    difficulty: 1,
    prompt:
      '« Nous avons deux pare-feu et une sonde de détection : l’injection SQL du portail ne peut pas nous atteindre. » Que répondez-vous au DSI ?',
    options: [
      'Il a raison si les pare-feu sont de nouvelle génération et à jour',
      'Il a tort : les pare-feu laissent passer le flux HTTPS légitime qui porte l’injection, et la sonde détecte sans bloquer, en ne voyant que la DMZ',
      'Il a raison, à condition que la sonde soit placée en coupure',
      'Il a tort uniquement parce que le chiffrement HTTPS désactive les pare-feu',
    ],
    answer: 1,
    explanation:
      'Un pare-feu filtre des flux réseau : l’injection voyage dans une requête HTTPS autorisée vers le portail. La sonde (IDS) alerte sans bloquer et ne couvre ici que la DMZ. Une mesure présente n’est pas une mesure efficace : la protection passe par le code (requêtes paramétrées) et la défense en profondeur.',
  },
  {
    id: 'q1-18',
    type: 'truefalse',
    block: 1,
    criteria: ['C3', 'C5'],
    difficulty: 1,
    prompt:
      'Dans une analyse d’écarts, une mesure n’est jugée satisfaisante que si elle est à la fois existante, efficace et prouvée par des éléments vérifiables.',
    answer: true,
    explanation:
      'Existante = documentée et déployée ; efficace = elle réduit réellement le risque ; prouvée = journaux, enregistrements, résultats de tests. Un pare-feu mal configuré ou une procédure jamais appliquée reste un écart, et sans preuve l’évaluateur ne peut rien valider.',
  },
  {
    id: 'q1-19',
    type: 'multi',
    block: 1,
    criteria: ['C3'],
    difficulty: 2,
    prompt:
      'En relisant le schéma d’architecture du CHU, quels points relevez-vous comme écarts par rapport à l’attendu ?',
    options: [
      'Le Wi-Fi invités est dans le VLAN utilisateurs, avec les postes soignants',
      'Un reverse proxy est placé en DMZ devant le portail patients',
      'La sonde de détection n’analyse que le trafic de la DMZ',
      'Le DPI, application interne des soignants, est hébergé en DMZ',
      'Le centre de consultation distant est relié par un VPN IPsec',
      'L’emplacement de la base de données publique n’est pas précisé',
    ],
    answers: [0, 2, 3, 5],
    explanation:
      'Wi-Fi invités mêlé aux postes métier, IDS limité à la DMZ, DPI interne exposé en DMZ et cartographie incomplète sont des écarts que le jury attend sans qu’ils figurent dans les signalements. Un reverse proxy en DMZ et un VPN IPsec sont des choix normaux : on en vérifie la configuration (IKEv2, certificats, filtrage), ce ne sont pas des écarts en soi.',
  },
  {
    id: 'q1-20',
    type: 'single',
    block: 1,
    criteria: ['C3'],
    difficulty: 2,
    prompt:
      'Vous menez l’analyse d’écarts avec ISO/IEC 27002:2022 comme référentiel. Le constat « la recherche patient concatène la saisie dans la requête SQL » se rattache d’abord à quelle mesure ?',
    options: [
      '5.7 Renseignement sur les menaces',
      '8.12 Prévention des fuites de données',
      '5.23 Sécurité de l’utilisation des services cloud',
      '8.28 Codage sécurisé',
    ],
    answer: 3,
    explanation:
      'La mesure 8.28 Codage sécurisé, nouvelle en 2022, couvre les pratiques de développement qui évitent les injections. ISO 27002:2022 compte 93 mesures en 4 thèmes (37 organisationnelles, 8 liées aux personnes, 14 physiques, 34 technologiques) ; 8.12 vise l’exfiltration, pas la cause du défaut.',
  },
  {
    id: 'q1-21',
    type: 'multi',
    block: 1,
    criteria: ['C5'],
    difficulty: 2,
    prompt:
      'Le CHU prépare l’évaluation de type CSPN de son portail et une future certification ISO 27001. Quels éléments sont des preuves recevables dans le dossier ?',
    options: [
      'La cible de sécurité et la documentation d’architecture',
      'Les rapports de re-test prouvant la correction des constats',
      'Une attestation orale du DSI affirmant que les correctifs sont appliqués',
      'Les journaux et les comptes rendus de tests de restauration des sauvegardes',
      'Une capture d’un tableur « 100 % conforme », non datée et sans source',
      'La déclaration d’applicabilité justifiant l’inclusion ou l’exclusion de chaque mesure de l’annexe A',
    ],
    answers: [0, 1, 3, 5],
    explanation:
      'Une preuve d’audit est une information vérifiable (ISO 19011) : document, enregistrement, observation ou résultat de test. Une affirmation orale ou un tableau non daté ne prouve rien ; c’est le rapport de re-test qui démontre qu’une correction est efficace.',
  },
  {
    id: 'q1-22',
    type: 'order',
    block: 1,
    criteria: ['C3'],
    difficulty: 3,
    prompt:
      'Remettez dans l’ordre les étapes d’une analyse d’écarts entre mesures existantes et mesures attendues.',
    items: [
      'Choisir le référentiel des mesures attendues (guide d’hygiène ANSSI, ISO 27002, OWASP ASVS, résultats de l’analyse de risques)',
      'Inventorier les mesures existantes (entretiens, documents, observations, tests techniques)',
      'Coter chaque mesure (conformité ou niveau de maturité) et mesurer l’écart',
      'Prioriser les écarts selon le risque',
      'Construire le plan d’action et le suivre par des indicateurs',
    ],
    explanation:
      'On ne mesure un écart qu’après avoir fixé l’étalon et constaté l’existant ; la priorisation par le risque transforme ensuite les écarts en plan d’action. Restitution typique : tableau ou radar de maturité par domaine, actuel contre cible.',
  },
  {
    id: 'q1-23',
    type: 'open',
    block: 1,
    criteria: ['C3'],
    difficulty: 4,
    prompt:
      'Le DSI affirme : « Notre sonde de détection d’intrusion nous préviendra si un rançongiciel entre dans le réseau. » Analysez cette mesure existante et dites ce que vous attendez.',
    open: {
      keywords: [
        {
          label: 'Couverture limitée à la DMZ',
          any: ['dmz', 'couverture', 'ne voit pas', 'ne voit que', 'reseau interne', 'zone interne'],
        },
        {
          label: 'Propagation latérale invisible',
          any: ['lateral', 'propag', 'vlan', 'mouvement', 'pivot'],
        },
        {
          label: 'Détecter n’est pas bloquer',
          any: ['ne bloque', 'bloque pas', 'bloquer', 'ips', 'reponse', 'reagir', 'reaction'],
        },
        {
          label: 'Moyens de détection attendus',
          any: ['edr', 'siem', 'sonde interne', 'sondes internes', 'centralis', 'pdis', 'supervision', 'centre operationnel'],
        },
        {
          label: 'Défense en profondeur',
          any: ['profondeur', 'sauvegarde', 'segment', 'cloison', 'couche'],
        },
      ],
      model:
        'La mesure existe mais son efficacité est limitée : la sonde n’analyse que la DMZ, alors qu’un rançongiciel entré par hameçonnage ou par un tiers se propage latéralement dans les VLAN internes qu’elle ne voit pas. Une sonde détecte sans bloquer (IDS ≠ IPS) : sans équipe capable de réagir, l’alerte ne sert à rien. J’attends des sondes internes, un EDR sur les postes et serveurs, la centralisation des journaux dans un SIEM et un SOC interne ou externalisé, éventuellement auprès d’un prestataire qualifié PDIS. La détection s’inscrit dans une défense en profondeur, avec segmentation et sauvegardes hors ligne.',
    },
    explanation:
      'Analyser une mesure existante, c’est vérifier sa couverture et son efficacité, pas seulement sa présence. Le pilier « défense » (détecter et réagir) suppose une capacité de réponse.',
  },

  // ───────────── C4 – Plan d’action correctif et préventif (OWASP) ─────────────
  {
    id: 'q1-24',
    type: 'truefalse',
    block: 1,
    criteria: ['C4'],
    difficulty: 2,
    prompt:
      'Remplacer les identifiants numériques des comptes rendus (`/comptes-rendus/1043`) par des UUID aléatoires suffit à corriger l’IDOR.',
    answer: false,
    explanation:
      'Un UUID rend l’énumération plus difficile mais ne vérifie rien : un identifiant divulgué (journal, partage, historique) reste exploitable. La correction est un contrôle d’autorisation côté serveur à chaque requête ; l’UUID n’est qu’une défense en profondeur.',
  },
  {
    id: 'q1-25',
    type: 'single',
    block: 1,
    criteria: ['C4', 'C1'],
    difficulty: 3,
    prompt:
      'Un audit précédent signale : « API de plannings sans jeton anti-CSRF : criticité élevée. » Cette API est authentifiée uniquement par un jeton Bearer dans l’en-tête Authorization. Quelle est votre position ?',
    options: [
      'Reprendre le constat tel quel et exiger un jeton anti-CSRF sous une semaine',
      'Challenger le constat : le navigateur n’ajoute pas ce jeton automatiquement, donc pas de CSRF classique, sauf si le jeton est stocké dans un cookie ou si l’API accepte aussi une session par cookie, ce qu’il faut vérifier',
      'Considérer que la configuration CORS de l’API suffit à écarter tout risque',
      'Placer un WAF devant l’API pour bloquer les requêtes intersites',
    ],
    answer: 1,
    explanation:
      'La CSRF repose sur l’envoi automatique des cookies par le navigateur ; un en-tête Authorization n’est jamais ajouté automatiquement. Le constat est un faux positif probable, à vérifier techniquement. CORS ne protège pas une API (il assouplit la Same-Origin Policy) et un WAF ne règle pas une question de conception.',
  },
  {
    id: 'q1-26',
    type: 'single',
    block: 1,
    criteria: ['C4'],
    difficulty: 3,
    prompt:
      'Deux vulnérabilités à traiter. CVE-A : CVSS 9,8, EPSS 0,2 %, sur un serveur interne isolé sans données sensibles. CVE-B : CVSS 7,5, inscrite au catalogue CISA KEV, sur le reverse proxy exposé à Internet devant le portail patients. Laquelle traitez-vous en premier ?',
    options: [
      'CVE-A, car son score CVSS est critique (≥ 9,0)',
      'Les deux en même temps, car toutes deux dépassent 7,0',
      'CVE-B : exploitation avérée (KEV), exposition à Internet et criticité de l’actif priment sur le seul score de base',
      'Aucune avant d’avoir recalculé les deux scores en CVSS v4.0',
    ],
    answer: 2,
    explanation:
      'Le CVSS de base mesure une sévérité théorique, sans contexte. Une vulnérabilité activement exploitée sur un actif exposé et critique passe avant une vulnérabilité critique peu probable (EPSS faible) sur un serveur isolé. Bonne pratique : CVSS + KEV + EPSS + criticité et exposition de l’actif, ou un arbre de décision comme SSVC.',
  },
  {
    id: 'q1-27',
    type: 'multi',
    block: 1,
    criteria: ['C4'],
    difficulty: 3,
    prompt:
      'Pour l’injection SQL de la recherche patient, quelles mesures font partie de la remédiation durable (et non d’un palliatif ou d’une fausse solution) ?',
    options: [
      'Requêtes paramétrées (ou ORM correctement utilisé)',
      'Règle WAF bloquant les motifs d’injection connus',
      'Compte de base de données à moindre privilège pour l’application',
      'Liste noire de mots-clés (SELECT, UNION, --) dans le champ de recherche',
      'Messages d’erreur génériques côté utilisateur, détail dans les journaux serveur',
      'Suppression des apostrophes saisies par l’utilisateur',
    ],
    answers: [0, 2, 4],
    explanation:
      'La requête paramétrée supprime la cause (la saisie n’est jamais interprétée comme du code), le moindre privilège limite l’impact et l’erreur générique supprime la fuite d’information (CWE-209). Le WAF est un patch virtuel temporaire ; listes noires et suppression des apostrophes sont contournables et empêchent de chercher « O’Brien ».',
  },
  {
    id: 'q1-28',
    type: 'order',
    block: 1,
    criteria: ['C4'],
    difficulty: 3,
    prompt:
      'Classez ces actions du tableau de remédiation du CHU de la plus urgente à la moins urgente, selon les horizons habituels (immédiat, court, moyen, long terme).',
    items: [
      'Changer le mot de passe d’usine des pompes à perfusion, en coordination avec le constructeur',
      'Remplacer la concaténation par des requêtes paramétrées dans la recherche patient',
      'Isoler le Wi-Fi invités dans un SSID et un VLAN dédiés, avec accès Internet uniquement',
      'Remplacer les équipements biomédicaux sous Windows 7 via un plan d’achats intégrant des exigences de sécurité',
    ],
    explanation:
      'Mot de passe d’usine : quick win immédiat (moins d’une semaine) à enjeu vital. Requêtes paramétrées : court terme (moins d’un mois), avec un patch virtuel WAF en attendant. Wi-Fi invités : chantier réseau à moyen terme (3 à 6 mois). Windows 7 : long terme (6 à 18 mois), couvert d’ici là par des mesures compensatoires (micro-segmentation, liste blanche de flux).',
  },
  {
    id: 'q1-29',
    type: 'open',
    block: 1,
    criteria: ['C4'],
    difficulty: 4,
    prompt:
      'Rédigez la ligne complète du plan d’action pour le constat suivant : en changeant le numéro dans l’URL de téléchargement, un patient obtient le compte rendu d’un autre patient.',
    open: {
      keywords: [
        {
          label: 'Référence OWASP / CWE',
          any: ['a01', 'broken access', 'bola', 'api1', 'cwe', 'owasp'],
        },
        {
          label: 'Contrôle d’autorisation côté serveur',
          any: ['cote serveur', 'appartien', 'proprietaire du document', 'autorisation', 'controle d acces', 'controle des droits'],
        },
        {
          label: 'Priorité et échéance',
          any: ['immediat', 'urgent', 'semaine', 'echeance', 'delai', 'priorit', 'critique'],
        },
        {
          label: 'Responsable',
          any: ['responsable', 'editeur', 'porteur', 'pilote', 'equipe de dev', 'developpeur'],
        },
        {
          label: 'Vérification et préventif',
          any: ['re-test', 'retest', 'non-regression', 'non regression', 'test automatis', 'asvs', 'critere de cloture', 'indicateur'],
        },
      ],
      model:
        'Constat : IDOR sur le téléchargement des comptes rendus (OWASP A01 Broken Access Control, API1:2023 BOLA), données de santé exposées à tout patient, gravité critique. Mesure corrective : vérifier côté serveur, à chaque requête, que le document appartient à l’utilisateur authentifié et journaliser les refus. Priorité immédiate (moins d’une semaine), responsable : l’éditeur du portail, piloté par le RSSI, coût faible. Critère de clôture : re-test avec deux comptes (403 attendu) et test automatisé de non-régression ; mesure préventive : exigences ASVS de contrôle d’accès intégrées aux recettes.',
    },
    explanation:
      'Une ligne de plan d’action relie constat, référence, mesure, priorité, responsable, échéance, coût et critère de clôture. L’ASVS fournit le critère de vérification ; un UUID ou un WAF ne remplacent pas le contrôle d’autorisation.',
  },

  // ───────────── C5 – Préparation à la certification ─────────────
  {
    id: 'q1-30',
    type: 'single',
    block: 1,
    criteria: ['C5'],
    difficulty: 3,
    prompt:
      'Le directeur annonce à l’ARS : « Le CHU vise la CSPN pour l’ensemble de son système d’information. » Comment reformulez-vous ?',
    options: [
      'La CSPN certifie un produit dans une version donnée selon une cible de sécurité : le CHU peut viser une évaluation de type CSPN d’un produit (DPI, portail) ; pour l’organisation, on parle d’ISO 27001, d’homologation ou de conformité NIS2',
      'C’est possible si l’évaluation est confiée à un prestataire qualifié PASSI',
      'C’est possible, à condition de rédiger une cible de sécurité couvrant les trois zones réseau',
      'C’est possible, mais il faut d’abord obtenir la certification HDS, qui en est le prérequis',
    ],
    answer: 0,
    explanation:
      'La CSPN certifie un produit (logiciel ou matériel) dans une version donnée, après évaluation par un CESTI agréé et validation par l’ANSSI. Elle ne certifie jamais une organisation ni un SI entier. PASSI (audit) et HDS (hébergement) n’ont aucun lien avec la portée de la CSPN.',
  },
  {
    id: 'q1-31',
    type: 'multi',
    block: 1,
    criteria: ['C5'],
    difficulty: 1,
    prompt: 'Quels acteurs interviennent dans une certification CSPN, et avec quel rôle ?',
    options: [
      'Le CESTI agréé, qui évalue le produit et rédige le rapport technique',
      'La CNIL, qui valide la cible de sécurité',
      'Le commanditaire, qui fournit le produit, la cible de sécurité et la documentation',
      'Un prestataire PASSI, qui délivre le certificat',
      'Le centre de certification de l’ANSSI, qui valide l’évaluation et délivre le certificat',
    ],
    answers: [0, 2, 4],
    explanation:
      'Le commanditaire fournit produit, cible et documentation ; le CESTI agréé évalue (conformité puis résistance) et rédige le rapport technique ; le centre de certification de l’ANSSI valide et délivre le certificat, valable 3 ans. La CNIL et les prestataires PASSI n’interviennent pas dans ce schéma.',
  },
  {
    id: 'q1-32',
    type: 'open',
    block: 1,
    criteria: ['C5'],
    difficulty: 4,
    prompt:
      'Les journaux montrent que l’injection SQL du DPI a déjà été exploitée et que des dossiers patients ont été exfiltrés. Qui devez-vous notifier, et dans quels délais ?',
    open: {
      keywords: [
        {
          label: 'CNIL sous 72 h',
          any: ['cnil', 'autorite de controle', 'art. 33', 'article 33'],
        },
        {
          label: 'Information des patients concernés',
          any: ['personnes concernees', 'informer les patients', 'information des patients', 'prevenir les patients', 'avertir les patients', 'notifier les patients', 'art. 34', 'article 34'],
        },
        {
          label: 'ARS et CERT Santé',
          any: ['l ars', 'ars et', 'ars,', 'agence regionale', 'cert sante', 'cert-sante'],
        },
        {
          label: 'ANSSI au titre de NIS2',
          any: ['anssi', 'cert-fr', 'cert fr', 'nis2', 'nis 2', '24 h', '24h'],
        },
        {
          label: 'Dépôt de plainte',
          any: ['plainte', 'police', 'gendarmerie', 'parquet', 'procureur'],
        },
      ],
      model:
        'D’abord confiner et préserver les preuves (copie des journaux), puis inscrire la violation au registre interne. Notifier la CNIL sous 72 h après en avoir pris connaissance (art. 33 RGPD) et informer les patients concernés dans les meilleurs délais, le risque étant élevé pour des données de santé (art. 34). Signaler l’incident grave à l’ARS et au CERT Santé, et à l’ANSSI au titre de NIS2 (alerte précoce 24 h, notification 72 h, rapport final 1 mois), en tenant compte d’une transposition française encore en cours. Déposer plainte et prévenir l’assureur ainsi que les partenaires interconnectés.',
    },
    explanation:
      'Chaque destinataire a sa logique : la CNIL protège les personnes, l’ARS et le CERT Santé le secteur, l’ANSSI la sécurité nationale. Côté assurance, la loi LOPMI conditionne l’indemnisation à un dépôt de plainte sous 72 h.',
  },
]
