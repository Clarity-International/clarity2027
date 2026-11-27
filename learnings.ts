import type { Locale } from "./content";

type Extra = {
  numbersLabel: string;
  numbers: [string, string][];
  glanceKicker: string;
  glanceTitle: string;
  glanceNote: string;
  days: { day: string; date: string; theme: string; items: string }[];
  approvalKicker: string;
  approvalTitle: string;
  approvalLead: string;
  reasons: [string, string][];
  emailTitle: string;
  emailHint: string;
  email: string;
  copyEmail: string;
  downloadEmail: string;
  copiedEmail: string;
  homeApproval: string;
};

const en: Extra = {
  numbersLabel: "Clarity2027 in numbers",
  numbers: [["1983", "Clarity founded"], ["250+", "members"], ["30+", "countries"], ["~250", "delegates in Vancouver"], ["4", "tracks"]],
  glanceKicker: "The format",
  glanceTitle: "Two and a half days at a glance",
  glanceNote: "Draft outline. A Wednesday evening welcome event is still being planned. The conference runs from Thursday morning through Saturday noon.",
  days: [
    { day: "Wednesday", date: "5 May", theme: "Welcome", items: "Evening welcome event, details to come" },
    { day: "Thursday", date: "6 May", theme: "Open", items: "Registration and coffee from 8:00, opening keynote, track breakouts, long lunch, plenary and gala reception from 5 to 8 pm" },
    { day: "Friday", date: "7 May", theme: "Deepen", items: "Coffee from 8:30, keynote, track breakouts, long lunch and plenary" },
    { day: "Saturday", date: "8 May", theme: "Close", items: "Morning program ends at 12:30; membership general assemblies and association activities in the afternoon" },
  ],
  approvalKicker: "Get approval",
  approvalTitle: "Make the case to your organization",
  approvalLead: "Most delegates need a manager’s sign-off. Here are the arguments, and an email you can adapt in two minutes.",
  reasons: [
    ["Practical skills", "Workshops and case studies on writing, designing and testing legal and public information people can use."],
    ["Peers from 30+ countries", "Meet lawyers, judges, public servants, designers and plain language experts in one place."],
    ["Four focused tracks", "Law, policy and standards; equity and access to justice; legal design; and a judicial track."],
    ["Bilingual and accessible", "English, with some breakout sessions in French. Accessibility needs are planned for from the start."],
  ],
  emailTitle: "Ready-made email",
  emailHint: "Replace the parts in square brackets, then copy or download.",
  email: `Subject: Request to attend Clarity2027, Vancouver, 5 to 8 May 2027

Hi [manager’s name],

I would like to attend Clarity2027, the international plain language conference, at SFU Harbour Centre in Vancouver from Thursday morning, 6 May, through Saturday noon, 8 May 2027. A Wednesday evening welcome event is still being planned.

Clarity has brought together people working on clear legal and public communication since 1983. The 2027 conference has four tracks: law, policy and standards; equity, inclusion and access to justice; legal design and multimodal communication; and a judicial track.

What I would bring back:
- practical methods to make our [documents / forms / letters / website] clearer
- examples from peers in 30+ countries
- contacts with experts we could call on later

The early bird rate ends 15 December 2026. Rates are listed at https://clarity.wildapricot.org/event-6854605

Estimated costs: registration USD$ 325 early bird or USD$ 449 regular for members (USD$ 375 / USD$ 499 for non-members), gala reception ticket USD$ 75 (coffee breaks, pastries, light lunches, and afternoon snacks on Thursday and Friday are included in registration), travel [amount], accommodation [amount].

I am happy to share a short summary with the team when I return.

Thank you,
[your name]`,
  copyEmail: "Copy email",
  downloadEmail: "Download (.txt)",
  copiedEmail: "Email copied",
  homeApproval: "Need approval? Get the email",
};

const fr: Extra = {
  numbersLabel: "Clarity2027 en chiffres",
  numbers: [["1983", "fondation de Clarity"], ["250+", "membres"], ["30+", "pays"], ["~250", "délégués à Vancouver"], ["4", "volets"]],
  glanceKicker: "Le format",
  glanceTitle: "Quatre jours en un coup d’œil",
  glanceNote: "Plan provisoire. L’horaire complet suivra l’évaluation des propositions.",
  days: [
    { day: "Mercredi", date: "5 mai", theme: "Accueillir", items: "Événement d’accueil en soirée, détails à venir" },
    { day: "Jeudi", date: "6 mai", theme: "Ouvrir", items: "Inscription et café dès 8 h, conférence d’ouverture, séances par volet, long dîner, plénière et cocktail gala de 17 h à 20 h" },
    { day: "Vendredi", date: "7 mai", theme: "Approfondir", items: "Café dès 8 h 30, conférence principale, séances par volet, long dîner et plénière" },
    { day: "Samedi", date: "8 mai", theme: "Conclure", items: "Le programme du matin se termine à 12 h 30; assemblées générales et activités associatives l’après-midi" },
  ],
  approvalKicker: "Obtenir l’approbation",
  approvalTitle: "Convaincre votre organisation",
  approvalLead: "La plupart des délégués ont besoin de l’accord d’un gestionnaire. Voici les arguments, et un courriel à adapter en deux minutes.",
  reasons: [
    ["Des compétences pratiques", "Ateliers et études de cas pour rédiger, concevoir et tester une information juridique et publique utilisable."],
    ["Des pairs de 30+ pays", "Rencontrez juristes, juges, fonctionnaires, designers et spécialistes du langage clair au même endroit."],
    ["Quatre volets ciblés", "Droit, politiques et normes; équité et accès à la justice; design juridique; et un volet judiciaire."],
    ["Bilingue et accessible", "En anglais, avec certaines séances en français. Les besoins d’accessibilité sont prévus dès le départ."],
  ],
  emailTitle: "Courriel prêt à envoyer",
  emailHint: "Remplacez les parties entre crochets, puis copiez ou téléchargez.",
  email: `Objet : Demande de participation à Clarity2027, Vancouver, du 5 au 8 mai 2027

Bonjour [nom du gestionnaire],

J’aimerais participer à Clarity2027, la conférence internationale sur le langage clair, à SFU Harbour Centre à Vancouver, du jeudi matin 6 mai au samedi midi 8 mai 2027. Un événement d’accueil est encore en préparation pour le mercredi soir.

Depuis 1983, Clarity réunit les personnes qui travaillent à une communication juridique et publique claire. La conférence 2027 comporte quatre volets : droit, politiques et normes; équité, inclusion et accès à la justice; design juridique et communication multimodale; et un volet judiciaire.

Ce que je rapporterais :
- des méthodes concrètes pour rendre nos [documents / formulaires / lettres / site Web] plus clairs
- des exemples de pairs de 30+ pays
- des contacts avec des experts que nous pourrions consulter

Le tarif hâtif prend fin le 15 décembre 2026. Les tarifs sont indiqués à https://clarity.wildapricot.org/event-6854605

Coûts estimés : inscription 325 $ USD au tarif hâtif ou 449 $ USD au tarif régulier pour les membres (375 $ USD / 499 $ USD pour les non-membres), billet pour le cocktail gala 75 $ USD (pauses café, viennoiseries, dîners légers et collations du jeudi et du vendredi inclus dans l’inscription), transport [montant], hébergement [montant].

Je pourrai présenter un court résumé à l’équipe à mon retour.

Merci,
[votre nom]`,
  copyEmail: "Copier le courriel",
  downloadEmail: "Télécharger (.txt)",
  copiedEmail: "Courriel copié",
  homeApproval: "Besoin d’une approbation? Obtenez le courriel",
};

export const EXTRA: Record<Locale, Extra> = { en, fr };
