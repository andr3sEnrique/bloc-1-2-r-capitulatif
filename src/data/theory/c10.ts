import type { TheoryModule } from '../types'

const C10: TheoryModule = {
  theory: {
    code: 'C10',
    intro:
      'Sensibiliser et former, c’est transmettre des contenus techniques justes (identité, TLS, cryptographie, OWASP) avec une pédagogie adaptée à des adultes et à chaque public. Ce critère exige donc deux choses : maîtriser le fond, et savoir le faire passer et le faire durer.',
    sections: [
      {
        title: 'Pédagogie pour adultes',
        points: [
          'Andragogie (Malcolm Knowles, 1973) : l’adulte a besoin de savoir pourquoi il apprend, veut de l’autonomie, mobilise son expérience, apprend ce qui sert son rôle, est orienté vers des problèmes réels et surtout motivé de l’intérieur.',
          'Conséquences : pédagogie active, cas réels issus du code de l’équipe, laboratoires vulnérables (OWASP Juice Shop, WebGoat), CTF et gamification, micro-learning de 3 à 10 minutes.',
          'Courbe de l’oubli (Ebbinghaus, 1885) : on oublie vite sans réactivation → répétition espacée (J+1, J+7, J+30) et campagnes récurrentes plutôt qu’une session annuelle.',
          'Adapter le message : développeurs (code, exemples de failles), managers (risque, coût, conformité), utilisateurs (gestes simples).',
          'Ressources : kit de sensibilisation de Cybermalveillance.gouv.fr ; MOOC SecNumacadémie de l’ANSSI (fermé depuis février 2026 pour refonte).',
        ],
      },
      {
        title: 'Identité : notions de base',
        points: [
          'Identification (je dis qui je suis), authentification (je le prouve), autorisation (ce que j’ai le droit de faire).',
          'Facteurs : connaissance, possession, inhérence. Le MFA combine des facteurs de catégories différentes.',
          'IAM : cycle de vie des identités (arrivée, mobilité, départ), habilitations, revues de droits. Modèles RBAC (rôles) et ABAC (attributs).',
        ],
      },
      {
        title: 'Mots de passe : ANSSI, CNIL, NIST',
        points: [
          'ANSSI (recommandations MFA et mots de passe, 2021, 42 recommandations) : privilégier le MFA ; ne pas utiliser le SMS ; longueur de 9 à 11 caractères pour une sensibilité faible à moyenne, 12 à 14 pour moyenne à forte, au moins 15 pour forte à très forte ; pas d’expiration imposée par défaut sauf comptes à privilèges ; stockage avec sel et fonction memory-hard.',
          'CNIL (délibération 2022-100) : 80 bits d’entropie pour un mot de passe seul, soit 12 caractères avec 4 types, ou 14 caractères sans caractère spécial, ou une phrase de 7 mots ; plus de renouvellement périodique imposé à tous ; ne pas bloquer le copier-coller ; sel d’au moins 128 bits.',
          'NIST SP 800-63B-4 (2025) : au moins 15 caractères pour un mot de passe seul (8 s’il fait partie d’un MFA) ; interdiction des règles de composition et du changement périodique ; vérification contre les listes de mots de passe compromis.',
        ],
      },
      {
        title: 'Protocoles d’identité',
        points: [
          'OAuth 2.0 (RFC 6749) : délégation d’autorisation, pas d’authentification. PKCE (RFC 7636) protège le code d’autorisation. RFC 9700 (2025) : bonnes pratiques, flux implicite et mot de passe proscrits. OAuth 2.1 reste un brouillon.',
          'OpenID Connect : couche d’authentification au-dessus d’OAuth 2.0 (ID Token au format JWT).',
          'SAML 2.0 : assertions XML pour le SSO d’entreprise.',
          'FIDO2 = WebAuthn (W3C) + CTAP : clé publique liée à l’origine, donc résistante au phishing ; les passkeys sont des identifiants FIDO éventuellement synchronisés.',
        ],
      },
      {
        title: 'SSL/TLS',
        points: [
          'SSL 2.0 et 3.0 retirés (POODLE, 2014). TLS 1.0 (1999), 1.1 (2006), 1.2 (2008), 1.3 (RFC 8446, 2018). TLS 1.0 et 1.1 dépréciés par la RFC 8996 (2021).',
          'TLS 1.3 : poignée de main en 1 aller-retour (0-RTT optionnel mais rejouable), échange (EC)DHE obligatoire donc confidentialité persistante, suites AEAD uniquement, suppression de RSA key transport, CBC, RC4, SHA-1.',
          'ANSSI (recommandations TLS, 2020) : TLS 1.2 minimum, TLS 1.3 à privilégier, ne pas supporter TLS 1.0 et 1.1, suites AEAD avec ECDHE.',
          'Certificats X.509 et chaîne de confiance (feuille → intermédiaire → racine) ; révocation par CRL ou OCSP (Let’s Encrypt a arrêté OCSP en 2025).',
          'HSTS (RFC 6797) force le HTTPS ; Certificate Transparency publie les certificats émis.',
          'CA/B Forum (2025) : durée maximale des certificats ramenée à 200 jours (mars 2026), 100 jours (mars 2027) puis 47 jours (mars 2029) → automatisation par ACME obligatoire.',
        ],
      },
      {
        title: 'Cryptographie',
        points: [
          'Symétrique : AES (clés de 128, 192 ou 256 bits), ChaCha20-Poly1305. Modes : GCM (chiffrement authentifié, nonce unique impératif), CBC (à compléter par un MAC), ECB proscrit.',
          'Asymétrique : RSA, courbes elliptiques (P-256, Curve25519). Hachage : SHA-2, SHA-3 ; MD5 et SHA-1 cassés.',
          'HMAC : intégrité et authenticité avec une clé partagée. Signature (RSA-PSS, ECDSA, EdDSA) : intégrité, authenticité, non-répudiation. ECDHE : échange de clés éphémère.',
          'Mots de passe (OWASP) : Argon2id en premier choix (19 MiB, 2 itérations, parallélisme 1) ; scrypt ; bcrypt (coût ≥ 10, entrée limitée à 72 octets) ; PBKDF2-HMAC-SHA256 à 600 000 itérations si FIPS est exigé.',
          'ANSSI (guide des mécanismes cryptographiques v3.00, mars 2026) : clés symétriques ≥ 128 bits (192 recommandés face au quantique), empreintes ≥ 256 bits, RSA ≥ 2048 bits jusqu’à fin 2030 puis ≥ 3072 bits.',
        ],
      },
      {
        title: 'Cryptographie post-quantique',
        points: [
          'NIST, août 2024 : FIPS 203 ML-KEM (ex-Kyber, encapsulation de clé), FIPS 204 ML-DSA (ex-Dilithium, signature), FIPS 205 SLH-DSA (ex-SPHINCS+, signature par hachage).',
          'Position de l’ANSSI : hybridation (algorithme classique + post-quantique), sauf pour les signatures fondées sur le hachage ; ML-KEM-768 préféré.',
          'Menace « store now, decrypt later » : protéger dès maintenant les données à longue durée de vie. Exemple : X25519MLKEM768 dans TLS 1.3.',
        ],
      },
      {
        title: 'OWASP pour la formation',
        points: [
          'Top 10 2025 comme fil conducteur de sensibilisation (Broken Access Control, Security Misconfiguration, Software Supply Chain Failures…).',
          'Cheat Sheet Series pour des fiches pratiques (stockage des mots de passe, sessions, TLS…).',
          'ASVS pour transformer la formation en exigences vérifiables ; Juice Shop et WebGoat pour la pratique.',
        ],
      },
    ],
    takeaways: [
      'Knowles : l’adulte apprend par l’expérience et le concret ; Ebbinghaus : répéter de façon espacée.',
      'Mots de passe : longueur plutôt que complexité, pas de rotation forcée, MFA, hachage Argon2id.',
      'OAuth 2.0 = autorisation ; OpenID Connect = authentification ; FIDO2 = résistant au phishing.',
      'TLS 1.2 minimum, TLS 1.3 privilégié ; TLS 1.3 impose la confidentialité persistante.',
      'Post-quantique : ML-KEM, ML-DSA, SLH-DSA ; l’ANSSI recommande l’hybridation.',
    ],
    sources: [
      { label: 'ANSSI – Recommandations relatives à l’authentification multifacteur et aux mots de passe', url: 'https://cyber.gouv.fr/publications/recommandations-relatives-lauthentification-multifacteur-et-aux-mots-de-passe' },
      { label: 'CNIL – Délibération 2022-100 sur les mots de passe', url: 'https://www.cnil.fr/sites/cnil/files/atoms/files/deliberation-2022-100-du-21-juillet-2022_recommandation-aux-mots-de-passe.pdf' },
      { label: 'NIST SP 800-63B-4', url: 'https://pages.nist.gov/800-63-4/sp800-63b.html' },
      { label: 'ANSSI – Guide des mécanismes cryptographiques v3.00', url: 'https://messervices.cyber.gouv.fr/documents-guides/anssi-guide-mecanismes-crypto-3.00.pdf' },
      { label: 'ANSSI – FAQ cryptographie post-quantique', url: 'https://cyber.gouv.fr/enjeux-technologiques/cryptographie-post-quantique/faq-pqc/' },
      { label: 'OWASP – Password Storage Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html' },
      { label: 'Let’s Encrypt – Fin d’OCSP', url: 'https://letsencrypt.org/2024/12/05/ending-ocsp/' },
      { label: 'IETF – OAuth 2.1 (brouillon)', url: 'https://www.ietf.org/archive/id/draft-ietf-oauth-v2-1-15.html' },
    ],
  },
  questions: [
    {
      id: 't-c10-01',
      scope: 3,
      criteria: ['C10'],
      difficulty: 1,
      topic: 'Identité',
      question: 'Quels sont les trois facteurs d’authentification ? Qu’est-ce qu’un vrai MFA ?',
      keyPoints: [
        'Connaissance (ce que je sais), possession (ce que j’ai), inhérence (ce que je suis).',
        'Un MFA combine au moins deux facteurs de catégories différentes.',
      ],
    },
    {
      id: 't-c10-02',
      scope: 3,
      criteria: ['C10'],
      difficulty: 1,
      topic: 'TLS',
      question: 'Quelles versions de SSL/TLS sont acceptables aujourd’hui ?',
      keyPoints: [
        'TLS 1.2 au minimum, TLS 1.3 à privilégier.',
        'SSL 2.0, SSL 3.0, TLS 1.0 et 1.1 ne doivent plus être supportés (RFC 8996, recommandations ANSSI).',
      ],
    },
    {
      id: 't-c10-03',
      scope: 3,
      criteria: ['C10'],
      difficulty: 1,
      topic: 'Pédagogie',
      question: 'Qu’est-ce que la courbe de l’oubli et quelle conséquence pour une campagne de sensibilisation ?',
      keyPoints: [
        'Ebbinghaus (1885) : on oublie rapidement ce qu’on a appris si on ne le réactive pas.',
        'Conséquence : répétition espacée (J+1, J+7, J+30), rappels courts, campagnes récurrentes plutôt qu’une session annuelle unique.',
      ],
    },
    {
      id: 't-c10-04',
      scope: 3,
      criteria: ['C10'],
      difficulty: 2,
      topic: 'Pédagogie',
      question: 'Quels sont les principes de l’andragogie de Knowles et comment les appliquer à des développeurs ?',
      keyPoints: [
        'Besoin de savoir pourquoi, autonomie, appui sur l’expérience, apprentissage lié au rôle, orientation vers des problèmes réels, motivation intrinsèque.',
        'Application : partir des vulnérabilités de leur propre code, ateliers pratiques, laboratoires vulnérables, CTF, choix de parcours.',
      ],
    },
    {
      id: 't-c10-05',
      scope: 3,
      criteria: ['C10'],
      difficulty: 2,
      topic: 'Mots de passe',
      question: 'Que recommande la CNIL (2022) pour un mot de passe utilisé seul ?',
      keyPoints: [
        'Au moins 80 bits d’entropie.',
        'Exemples : 12 caractères avec majuscules, minuscules, chiffres et caractères spéciaux ; ou 14 caractères sans caractère spécial ; ou une phrase de passe de 7 mots.',
        'Pas de renouvellement périodique imposé à tous ; ne pas bloquer le copier-coller.',
      ],
    },
    {
      id: 't-c10-06',
      scope: 3,
      criteria: ['C10'],
      difficulty: 2,
      topic: 'Mots de passe',
      question: 'Quelles longueurs minimales l’ANSSI recommande-t-elle selon la sensibilité ?',
      keyPoints: [
        'Faible à moyenne : 9 à 11 caractères (environ 65 bits).',
        'Moyenne à forte : 12 à 14 caractères (environ 85 bits).',
        'Forte à très forte : au moins 15 caractères (100 bits ou plus) ; plus de 20 pour des mots de passe générés et stockés dans un coffre-fort.',
      ],
    },
    {
      id: 't-c10-07',
      scope: 3,
      criteria: ['C10'],
      difficulty: 2,
      topic: 'Crypto',
      question: 'Quel algorithme utiliser pour stocker des mots de passe, avec quels paramètres ?',
      keyPoints: [
        'Argon2id en premier choix (OWASP : 19 MiB de mémoire, 2 itérations, parallélisme 1).',
        'Sinon scrypt, bcrypt (coût ≥ 10, limité à 72 octets) ou PBKDF2-HMAC-SHA256 à 600 000 itérations si FIPS est exigé.',
        'Sel unique par mot de passe ; poivre éventuel stocké hors de la base.',
      ],
    },
    {
      id: 't-c10-08',
      scope: 3,
      criteria: ['C10'],
      difficulty: 2,
      topic: 'Identité',
      question: 'OAuth 2.0 est-il un protocole d’authentification ?',
      keyPoints: [
        'Non : c’est un protocole de délégation d’autorisation (obtenir un jeton d’accès à une API).',
        'L’authentification de l’utilisateur est apportée par OpenID Connect, qui ajoute l’ID Token.',
      ],
      trap: 'Confondre OAuth et authentification est une erreur classique relevée par les jurys.',
    },
    {
      id: 't-c10-09',
      scope: 3,
      criteria: ['C10'],
      difficulty: 3,
      topic: 'TLS',
      question: 'Qu’apporte TLS 1.3 par rapport à TLS 1.2 ?',
      keyPoints: [
        'Poignée de main en un aller-retour (0-RTT optionnel, mais rejouable).',
        'Échange de clés (EC)DHE obligatoire : confidentialité persistante systématique.',
        'Suites AEAD uniquement ; suppression de RSA key transport, CBC, RC4, SHA-1 et compression.',
      ],
    },
    {
      id: 't-c10-10',
      scope: 3,
      criteria: ['C10'],
      difficulty: 3,
      topic: 'Mots de passe',
      question: 'Que changent les recommandations NIST SP 800-63B-4 (2025) ?',
      keyPoints: [
        'Au moins 15 caractères pour un mot de passe seul (8 dans un MFA), accepter au moins 64 caractères.',
        'Interdiction des règles de composition et du changement périodique (changement seulement en cas de compromission).',
        'Liste noire obligatoire (mots de passe compromis, dictionnaire) ; SMS classé « restreint ».',
      ],
    },
    {
      id: 't-c10-11',
      scope: 3,
      criteria: ['C10'],
      difficulty: 3,
      topic: 'Crypto',
      question: 'Différence entre HMAC et signature numérique ?',
      keyPoints: [
        'HMAC : clé secrète partagée ; garantit intégrité et authenticité entre les détenteurs de la clé.',
        'Signature : clé privée pour signer, clé publique pour vérifier ; garantit en plus la non-répudiation.',
      ],
    },
    {
      id: 't-c10-12',
      scope: 3,
      criteria: ['C10'],
      difficulty: 3,
      topic: 'PKI',
      question: 'Pourquoi les durées de vie des certificats TLS diminuent-elles, et jusqu’où ?',
      keyPoints: [
        'Vote du CA/B Forum (2025) : 200 jours en mars 2026, 100 jours en mars 2027, 47 jours en mars 2029.',
        'Objectif : limiter l’impact d’une clé compromise et la dépendance à une révocation peu fiable.',
        'Conséquence : renouvellement automatisé obligatoire (protocole ACME).',
      ],
    },
    {
      id: 't-c10-13',
      scope: 3,
      criteria: ['C10'],
      difficulty: 3,
      topic: 'Crypto',
      question: 'Quelles tailles de clés l’ANSSI recommande-t-elle (guide 2026) ?',
      keyPoints: [
        'Symétrique : au moins 128 bits, 192 bits recommandés pour la résistance quantique.',
        'Empreintes de hachage : au moins 256 bits.',
        'RSA : au moins 2048 bits jusqu’à fin 2030, au moins 3072 bits ensuite (3072 recommandés dès maintenant).',
      ],
    },
    {
      id: 't-c10-14',
      scope: 3,
      criteria: ['C10'],
      difficulty: 4,
      topic: 'Post-quantique',
      question: 'Quels algorithmes post-quantiques le NIST a-t-il normalisés, et quelle est la position de l’ANSSI ?',
      keyPoints: [
        'Août 2024 : FIPS 203 ML-KEM (encapsulation de clé), FIPS 204 ML-DSA et FIPS 205 SLH-DSA (signatures).',
        'ANSSI : hybridation obligatoire (classique + post-quantique), sauf signatures fondées sur le hachage ; ML-KEM-768 préféré.',
        'Risque « store now, decrypt later » : prioriser les données à longue durée de vie.',
      ],
    },
    {
      id: 't-c10-15',
      scope: 3,
      criteria: ['C10'],
      difficulty: 4,
      topic: 'Identité',
      question: 'Pourquoi FIDO2 / passkeys résistent-ils au phishing, contrairement au TOTP ?',
      keyPoints: [
        'L’identifiant est une paire de clés liée à l’origine (le domaine) : le navigateur refuse de signer pour un faux site.',
        'Rien de rejouable n’est saisi par l’utilisateur, contrairement à un code TOTP qu’un proxy de phishing peut relayer.',
        'Aucun secret partagé n’est stocké côté serveur (seulement la clé publique).',
      ],
    },
  ],
}

export default C10
