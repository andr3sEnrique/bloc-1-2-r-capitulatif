import type { Block } from './types'

export const BLOCKS: Block[] = [
  {
    id: 1,
    code: 'Bloc 1',
    title: "Auditer la sécurité des applications d'un SI",
    shortTitle: 'Audit',
    exam: {
      preparation: '4 heures de préparation',
      oral: '30 minutes d’oral : 20 min de présentation + 10 min de questions du jury',
      mission:
        'Préparer une organisation à la certification CSPN de l’ANSSI au moyen d’une analyse de risques.',
      timePlan: [
        '0:00 – 0:20 · Lecture complète du sujet et des annexes, surligner chaque signalement brut.',
        '0:20 – 1:15 · Partie A : inventaire des faiblesses (composant, gain pour l’attaquant, détection/outils, priorité).',
        '1:15 – 2:00 · Partie B : protocole de confirmation de ≥ 3 constats + démarche réseau + tests sans impact patient.',
        '2:00 – 2:45 · Partie C : tableau de remédiation (mesure, délai, responsable) + sécurisation des échanges + amélioration continue.',
        '2:45 – 3:30 · Partie D : note de synthèse direction (2 pages max, langage métier).',
        '3:30 – 4:00 · Relecture, cohérence, slides / schémas, préparation des réponses aux questions pièges.',
      ],
      pitchPlan: [
        '1 min · Contexte, périmètre, hypothèses (« aucun test n’a été réalisé »).',
        '2 min · Méthodologie : référentiels (OWASP, EBIOS RM, guide d’hygiène ANSSI), critères de priorisation.',
        '6 min · Constats priorisés : composant → vulnérabilité → impact DICT → gravité.',
        '4 min · Qualification : comment confirmer chaque constat sans perturber les soins.',
        '5 min · Plan d’action (quick wins / court / moyen / long terme) et sécurisation des échanges.',
        '2 min · Message à la direction : risques majeurs, décisions attendues, feuille de route vers la CSPN.',
      ],
    },
    criteria: [
      {
        code: 'C1',
        title: 'Définir le plan d’audit',
        summary:
          'Définir le plan d’audit, les ressources, la méthodologie et identifier les vulnérabilités.',
        juryExpects: [
          'Un périmètre clair (DPI, portail, passerelle API, bases, réseau, site distant) et des objectifs.',
          'Le type d’audit choisi (organisationnel, architecture, configuration, code, test d’intrusion) et justifié.',
          'Les ressources : équipe, compétences, outils (Burp, ZAP, sqlmap, Nmap, Nessus/OpenVAS…), durée.',
          'Un cadre juridique : convention / lettre de mission, autorisation écrite, règles d’engagement.',
          'Pour chaque catégorie de faille : technique de détection + outil adapté.',
        ],
        pitfalls: [
          'Lancer des scans actifs sur le VLAN biomédical sans précaution (risque vital).',
          'Oublier que les signalements sont « bruts et non qualifiés » : il faut les confirmer.',
          'Citer des outils sans dire ce qu’on en attend (résultat attendu).',
        ],
      },
      {
        code: 'C2',
        title: 'Analyser les risques',
        summary:
          'Mener une analyse de risques (ex. méthode EBIOS RM) pour identifier causes et menaces, en recensant les contraintes juridiques et techniques.',
        juryExpects: [
          'Les 5 ateliers EBIOS RM, appliqués au cas (valeurs métier, biens supports, événements redoutés).',
          'Des couples sources de risque / objectifs visés réalistes (cybercriminels → rançongiciel).',
          'Les contraintes juridiques : RGPD (art. 9 données de santé), HDS, secret médical, NIS2, PGSSI-S.',
          'Les contraintes techniques : Windows 7, disponibilité 24/7, dispositifs médicaux certifiés, prestataires.',
          'Une échelle gravité × vraisemblance et une cartographie des risques.',
        ],
        pitfalls: [
          'Réciter EBIOS RM sans l’appliquer au CHU.',
          'Confondre vulnérabilité, menace et risque.',
          'Ignorer la dimension « sécurité des patients » (atteinte à la vie).',
        ],
      },
      {
        code: 'C3',
        title: 'Analyser les mesures existantes',
        summary: 'Analyser les mesures de sécurité existantes par rapport aux mesures attendues.',
        juryExpects: [
          'Une analyse d’écarts (gap analysis) : existant vs référentiel (guide d’hygiène ANSSI, ISO 27002, OWASP ASVS).',
          'Une lecture critique de l’architecture : Wi-Fi invités dans le VLAN utilisateurs, DPI en DMZ, IDS limité à la DMZ.',
          'Expliquer pourquoi deux pare-feu ne protègent pas d’une injection SQL ou d’un IDOR.',
        ],
        pitfalls: [
          'Considérer une mesure présente comme efficace sans la vérifier.',
          'Ne pas exploiter le schéma d’architecture (il contient des failles).',
        ],
      },
      {
        code: 'C4',
        title: 'Établir le plan d’action',
        summary:
          'Établir un plan d’action correctif et préventif selon les bonnes pratiques (OWASP).',
        juryExpects: [
          'Un tableau : constat → mesure corrective → délai → responsable → indicateur de vérification.',
          'Un mapping OWASP Top 10 / OWASP API Security Top 10.',
          'Des quick wins (mots de passe d’usine, comptes nominatifs) et des chantiers structurants (segmentation, SOC).',
          'La sécurisation des échanges : mTLS, OAuth 2.0 par partenaire, scopes FHIR, passerelle d’API.',
          'Le préventif : SDLC sécurisé, revues de code, tests réguliers, supervision.',
        ],
        pitfalls: [
          'Proposer un WAF comme unique correction.',
          'Prioriser au seul score CVSS sans contexte métier.',
          'Ne pas donner de délais réalistes ni de mesures compensatoires (Windows 7).',
        ],
      },
      {
        code: 'C5',
        title: 'Préparer la certification',
        summary:
          'Préparer l’entreprise à la certification en fournissant les preuves nécessaires.',
        juryExpects: [
          'Savoir ce qu’est la CSPN (ANSSI, CESTI, cible de sécurité, évaluation en temps contraint).',
          'La liste des preuves : cible de sécurité, documentation, rapports d’audit, plans de remédiation suivis, re-tests, journaux, PSSI, AIPD.',
          'Une note de synthèse direction compréhensible (risques, priorités, budget, décisions).',
          'La gestion d’incident et les obligations de notification (CNIL, ARS / CERT Santé, ANSSI).',
        ],
        pitfalls: [
          'Oublier que la CSPN certifie un produit, pas une organisation.',
          'Jargon technique dans la note au directeur général.',
        ],
      },
    ],
    scenario: {
      name: 'CHU de Val-de-Loire',
      role: 'Auditeur·rice dans un cabinet de conseil en cybersécurité, missionné·e par le RSSI du CHU.',
      summary:
        'Le CHU vise une évaluation de type CSPN auprès de l’ANSSI et veut connaître son niveau de sécurité. Contexte tendu : un établissement voisin a été paralysé une semaine par un rançongiciel ; la direction doit rendre compte à l’ARS. Aucun test n’a encore été réalisé : on raisonne sur des vulnérabilités potentielles.',
      keyRisks: [
        'Injection SQL dans la recherche patient du DPI (erreur technique avec « O’Brien »).',
        'IDOR : en modifiant le numéro dans l’URL de téléchargement, un patient obtient le compte rendu d’un autre.',
        'XSS stocké dans la messagerie du portail patients (« fenêtres étranges »).',
        'API de plannings sans jeton anti-CSRF (mais authentifiée par jeton Bearer → à challenger).',
        'Clé API partagée entre laboratoires, qui expose le dossier complet du patient.',
        'Mot de passe d’usine jamais changé sur les pompes à perfusion (maintenance à distance).',
        'Équipements biomédicaux sous Windows 7.',
        'Comptes d’administration du DPI partagés entre 3 administrateurs.',
        'Wi-Fi invités situé dans le VLAN utilisateurs avec les postes soignants.',
        'IDS uniquement sur la DMZ ; emplacement de la base publique « non précisé » ; DPI hébergé en DMZ.',
      ],
      annexes: [
        {
          title: 'Document 1 · Architecture (3 zones, 2 pare-feu)',
          items: [
            'Internet : patients, partenaires (labos, médecins, Assurance maladie), centre de consultation distant (VPN IPsec).',
            'Pare-feu périmétrique → DMZ : reverse proxy, portail patients, passerelle API (FHIR), serveur DPI, relais messagerie.',
            'Pare-feu interne → réseau interne : VLAN utilisateurs (postes soignants + Wi-Fi invités), VLAN serveurs (base de santé, annuaire, messagerie), VLAN biomédical (pompes, moniteurs, PACS).',
            'Base de données publique (annuaire praticiens, horaires, actualités) : emplacement non précisé.',
            'Équipements biomédicaux en partie sous Windows 7, maintenus à distance par les constructeurs.',
            'Centre distant : 12 postes de consultation et secrétariat, via VPN IPsec.',
            'Une sonde de détection d’intrusion analyse le trafic de la DMZ ; comptes admin DPI partagés.',
          ],
        },
        {
          title: 'Document 2 · Remontées du terrain (brutes, non qualifiées)',
          items: [
            'Secrétariat : apostrophe dans la recherche patient → erreur technique mentionnant la base.',
            'Patient : changer le numéro en fin d’URL de téléchargement donne le compte rendu d’un autre.',
            'Secrétariat : certains messages du portail ouvrent des fenêtres étranges à l’affichage.',
            'Éditeur planning : API REST authentifiée par jeton Bearer, sans jeton anti-CSRF.',
            'Laboratoire : même clé d’accès pour tous les labos, l’API renvoie le dossier complet.',
            'Biomédical : le constructeur des pompes se connecte avec le mot de passe d’usine.',
          ],
        },
      ],
      deliverable: [
        {
          title: 'Partie A – Repérer les faiblesses',
          items: [
            'Recenser faiblesses et points sensibles : composant concerné + gain pour l’attaquant.',
            'Techniques de détection et outils par catégorie de faiblesse.',
            'Classement par priorité avec critères justifiés.',
            'Facultatif : tests complémentaires sur les systèmes vitaux.',
          ],
        },
        {
          title: 'Partie B – Qualifier les vulnérabilités',
          items: [
            'Pour ≥ 3 constats : confirmation technique (outils, étapes, résultat attendu).',
            'Démarche d’évaluation du réseau : cloisonnement, flux entre zones, liaison site distant.',
            'Organisation des tests sans perturber la prise en charge des patients.',
          ],
        },
        {
          title: 'Partie C – Remédier',
          items: [
            'Tableau : mesure corrective + délai pour chaque constat.',
            'Sécurisation des échanges internes et avec les partenaires.',
            'Éviter la réapparition et surveiller dans la durée.',
          ],
        },
        {
          title: 'Partie D – Note de synthèse à la direction',
          items: [
            '2 pages max pour le directeur général : risques majeurs, priorités, recommandations stratégiques (référentiels, organisation, politiques internes).',
          ],
        },
      ],
    },
  },
  {
    id: 2,
    code: 'Bloc 2',
    title: 'Mettre en place une politique de sécurisation des applications',
    shortTitle: 'Politique',
    exam: {
      preparation: '4 heures de préparation',
      oral: '30 minutes d’oral : 20 min de présentation + 10 min de questions du jury',
      mission:
        'Former les développeurs au travers d’ateliers « Security by Design » en s’appuyant sur les résultats d’audits et sur l’évaluation des compétences.',
      timePlan: [
        '0:00 – 0:20 · Lecture du sujet et des 3 annexes ; chiffrer l’annexe 1 (% par niveau et par équipe).',
        '0:20 – 0:50 · Enjeux et objectifs de sécurité propres à l’entreprise (données perso, géolocalisation, paiements).',
        '0:50 – 1:20 · Bonnes pratiques adossées à des référentiels (OWASP ASVS, MASVS, Top 10, cheat sheets, ANSSI).',
        '1:20 – 2:30 · Analyse de chaque vulnérabilité : explication, exploitation, correction, vérification.',
        '2:30 – 3:05 · Chaîne outillée du code à l’exploitation (open source, sans ralentir les MEP).',
        '3:05 – 3:40 · Calendrier d’ateliers sur 6 mois : thème, public, objectif, format (+ accessibilité).',
        '3:40 – 4:00 · Schémas, tableau récapitulatif, relecture, anticipation des questions.',
      ],
      pitchPlan: [
        '1 min · Contexte et lecture des annexes (chiffres clés de l’auto-évaluation).',
        '3 min · Enjeux : données personnelles, géolocalisation, paiements, RGPD, confiance.',
        '6 min · Vulnérabilités V1 → V6 : explication, exploitation, correction, vérification.',
        '4 min · Chaîne DevSecOps outillée (schéma) et gouvernance (Security Champions).',
        '4 min · Parcours de formation sur 6 mois différencié par niveau et équipe + accessibilité.',
        '2 min · Indicateurs de réussite (KPI), budget, ROI / ROSI, conclusion.',
      ],
    },
    criteria: [
      {
        code: 'C6',
        title: 'Définir la politique de sécurité',
        summary:
          'Définir une politique de sécurité adaptée à l’activité et aux contraintes de l’entreprise.',
        juryExpects: [
          'Des enjeux propres au métier (covoiturage/livraison : géolocalisation, paiements, profils).',
          'Une prise en compte des contraintes : 1 MEP/semaine, budget limité, croissance rapide.',
          'Des règles concrètes : gestion des secrets, authentification/sessions, dépendances, journalisation, revue de code.',
          'Une justification économique (ROI / ROSI, coût d’un incident, amendes RGPD).',
        ],
        pitfalls: [
          'Une PSSI générique copiée-collée.',
          'Une politique qui bloque les mises en production sans alternative.',
        ],
      },
      {
        code: 'C7',
        title: 'Créer un référentiel développeur sécurité',
        summary:
          'Créer un référentiel « développeur sécurité » fondé sur le Security by Design.',
        juryExpects: [
          'Des référentiels reconnus : OWASP Top 10, ASVS, MASVS/MASTG, Cheat Sheet Series, CWE Top 25, guides ANSSI.',
          'Les principes du Security by Design (moindre privilège, défense en profondeur, valeurs par défaut sûres…).',
          'Une chaîne outillée : pre-commit, SAST, SCA, secrets, DAST, conteneurs, supervision.',
          'Une checklist de revue de code et une Definition of Done incluant la sécurité.',
        ],
        pitfalls: [
          'Lister des outils sans les placer dans le cycle de développement.',
          'Oublier le mobile (MASVS) alors qu’une équipe mobile existe.',
        ],
      },
      {
        code: 'C8',
        title: 'Organiser la veille',
        summary:
          'Organiser une veille technologique, juridique et réglementaire priorisée.',
        juryExpects: [
          'Des sources : CERT-FR, ANSSI, CNIL, OWASP, NVD, CISA KEV, GitHub Advisories, OSV, éditeurs.',
          'Une priorisation : pertinence pour la stack (SBOM), criticité, exploitation active (KEV, EPSS).',
          'Une organisation : responsable, outil d’agrégation, fréquence, diffusion, capitalisation.',
          'Le volet juridique : RGPD, NIS2, Cyber Resilience Act, PCI DSS, accessibilité (EAA, RGAA).',
        ],
        pitfalls: ['Une liste de sources sans processus ni priorisation.'],
      },
      {
        code: 'C9',
        title: 'Analyser les compétences',
        summary:
          'Analyser les compétences des équipes au moyen d’enquêtes pour planifier la formation.',
        juryExpects: [
          'Une lecture chiffrée de l’auto-évaluation (40 % Découverte, 44 % Autonome, 16 % Référent).',
          'Des parcours différenciés par niveau et par équipe (Web et Mobile majoritairement en Découverte).',
          'La critique de l’auto-évaluation (biais déclaratif) et des mesures objectives complémentaires.',
          'Des indicateurs de progression et une ré-évaluation à 6 mois.',
        ],
        pitfalls: ['Former tout le monde de la même façon.'],
      },
      {
        code: 'C10',
        title: 'Sensibiliser et former',
        summary:
          'Sensibiliser et former les équipes (identité, SSL/TLS, cryptographie, OWASP) en adaptant le message.',
        juryExpects: [
          'Un calendrier sur 6 mois : thème, public, objectif, format pour chaque atelier.',
          'Des formats variés : ateliers pratiques, lunch & learn, CTF, pair programming, e-learning.',
          'Des contenus techniques justes : hachage des mots de passe, TLS, JWT, OAuth 2.0 / OIDC, OWASP.',
          'Un message adapté : développeurs (code), management (risque et argent), référents (animation).',
        ],
        pitfalls: [
          'Des sessions magistrales uniquement.',
          'Des erreurs techniques (« chiffrer les mots de passe », « le JWT est chiffré »).',
        ],
      },
      {
        code: 'C11',
        title: 'Intégrer l’accessibilité',
        summary:
          'Intégrer l’accessibilité (RGAA) et les adaptations pour les personnes en situation de handicap dans les plans de formation.',
        juryExpects: [
          'Le RGAA (fondé sur les WCAG) appliqué à la plateforme d’e-learning et aux supports.',
          'Des adaptations concrètes : sous-titres, transcriptions, contrastes, navigation clavier, temps majoré.',
          'Un recueil confidentiel des besoins en amont et le lien avec le référent handicap.',
        ],
        pitfalls: ['Évoquer l’accessibilité en une phrase en fin de présentation.'],
      },
    ],
    scenario: {
      name: 'Start-up OuiOuiGo',
      role: 'Responsable sécurité applicative récemment recruté·e.',
      summary:
        'Start-up de 80 salariés éditant une plateforme web et mobile de covoiturage et de livraison entre particuliers. Passée de 5 à 45 développeurs en 3 ans (équipes Web, Mobile, Back-end/Plateforme), au détriment de la sécurité. Une clé cloud a fuité dans un dépôt public ; un test d’intrusion a été commandé. Mission : concevoir un parcours de sensibilisation et de montée en compétences.',
      keyRisks: [
        'V1 (Critique) · Secrets dans le code source : clés API du prestataire de paiement et identifiants BDD en clair dans Git.',
        'V2 (Haute) · XSS stocké dans le champ « commentaire sur le conducteur ».',
        'V3 (Haute) · JWT sans expiration, non révoqués à la déconnexion, algorithme non vérifié.',
        'V4 (Moyenne) · 14 dépendances avec CVE publiques, dont 2 critiques.',
        'V5 (Moyenne) · Jeton de session et historique des trajets stockés en clair sur le téléphone.',
        'V6 (Faible) · Aucune trace des échecs de connexion ; numéros de téléphone en clair dans les journaux.',
      ],
      annexes: [
        {
          title: 'Annexe 1 · Auto-évaluation (20 questions, 45 développeurs)',
          items: [
            'Web (15) : 8 Découverte · 6 Autonome · 1 Référent.',
            'Mobile (12) : 7 Découverte · 4 Autonome · 1 Référent.',
            'Back-end / Plateforme (18) : 3 Découverte · 10 Autonome · 5 Référents.',
            'Total : 18 Découverte (40 %) · 20 Autonome (44 %) · 7 Référents (16 %).',
            '70 % ne vérifient jamais les vulnérabilités des bibliothèques ajoutées.',
            'L’équipe Mobile ignore majoritairement les risques du stockage local.',
            'Aucun développeur ne sait où sont stockés les secrets en production.',
            'Les référents (surtout Back-end) veulent participer à la diffusion des bonnes pratiques.',
          ],
        },
        {
          title: 'Annexe 2 · Test d’intrusion (boîte grise, 2 semaines, préproduction)',
          items: [
            'V1 à V6 (voir risques clés).',
            'Conclusion de l’auditeur : causes principalement organisationnelles — pas de revue de code sécurité, pas de gestion centralisée des secrets, aucun contrôle automatique avant mise en production.',
          ],
        },
        {
          title: 'Annexe 3 · Cartographie des applications et des flux',
          items: [
            'OuiOuiGo Web (Web) : V2, V4 · OuiOuiGo Mobile (Mobile) : V5.',
            'API Core (Back-end) : V1, V3, V6 · Back-office (Back-end) : V4 · Service Paiement (Back-end) : V1.',
            'Web et Mobile → API Core (authentification par jeton) ; API Core → Service Paiement → prestataire externe.',
            'Back-office → API Core (consultation des profils et signalements par le support).',
            'Déploiement automatique depuis la branche principale, sans contrôle de sécurité.',
            'Contraintes : 1 mise en production par semaine à ne pas ralentir ; budget outillage limité (open source / gratuit).',
          ],
        },
      ],
      deliverable: [
        {
          title: 'Support de formation – parties minimales',
          items: [
            'Enjeux et objectifs de sécurité propres à l’entreprise (données personnelles, géolocalisation, paiements).',
            'Bonnes pratiques de développement sécurisé appuyées sur un ou plusieurs référentiels reconnus.',
            'Analyse de chaque vulnérabilité : explication, exemple d’exploitation, correction, moyen de vérifier la correction.',
            'Chaîne outillée de détection automatique, de l’écriture du code jusqu’à l’exploitation.',
            'Calendrier d’ateliers sur 6 mois : thème, public visé, objectif, format.',
            'Support synthétique, argumenté (technique + organisationnel), adapté (3 équipes, web + mobile, niveaux hétérogènes). Schémas et tableaux encouragés.',
          ],
        },
      ],
    },
  },
]

export const getBlock = (id: 1 | 2) => BLOCKS.find((b) => b.id === id)!
