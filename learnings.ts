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
  numbers: [["1983", "Clarity founded"], ["650+", "members"], ["50", "countries"], ["~250", "delegates in Vancouver"], ["4", "tracks"]],
  glanceKicker: "The format",
  glanceTitle: "Four days at a glance",
  glanceNote: "Draft outline. The full schedule follows the proposal review.",
  days: [
    { day: "Wednesday", date: "5 May", theme: "Welcome", items: "Evening ice-breaker reception" },
    { day: "Thursday", date: "6 May", theme: "Open", items: "Opening keynote, parallel sessions, cocktail reception and gala dinner" },
    { day: "Friday", date: "7 May", theme: "Deepen", items: "Keynote and parallel sessions across the four tracks" },
    { day: "Saturday", date: "8 May", theme: "Close", items: "Half day and closing session" },
  ],
  approvalKicker: "Get approval",
  approvalTitle: "Make the case to your organization",
  approvalLead: "Most delegates need a manager’s sign-off. Here are the arguments, and an email you can adapt in two minutes.",
  reasons: [
    ["Practical skills", "Workshops and case studies on writing, designing and testing legal and public information people can use."],
    ["Peers from 50 countries", "Meet lawyers, judges, public servants, designers and plain language experts in one place."],
    ["Four focused tracks", "Law, policy and standards; equity and access to justice; legal design; and a judicial track."],
    ["Bilingual and accessible", "English, with some breakout sessions in French. Accessibility needs are planned for from the start."],
  ],
  emailTitle: "Ready-made email",
  emailHint: "Replace the parts in square brackets, then copy or download.",
  email: `Subject: Request to attend Clarity2027, Vancouver, 5 to 8 May 2027

Hi [manager’s name],

I would like to attend Clarity2027, the international plain language conference, at SFU Harbour Centre in Vancouver from 5 to 8 May 2027.

Clarity has brought together people working on clear legal and public communication since 1983. The 2027 conference has four tracks: law, policy and standards; equity, inclusion and access to justice; legal design and multimodal communication; and a judicial track.

What I would bring back:
- practical methods to make our [documents / forms / letters / website] clearer
- examples from peers in about 50 countries
- contacts with experts we could call on later

The early bird rate ends 15 December 2026. Rates are listed at https://clarity.wildapricot.org/event-6854605

Estimated costs: registration [amount], travel [amount], accommodation [amount].

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
  numbers: [["1983", "fondation de Clarity"], ["650+", "membres"], ["50", "pays"], ["~250", "délégués à Vancouver"], ["4", "volets"]],
  glanceKicker: "Le format",
  glanceTitle: "Quatre jours en un coup d’œil",
  glanceNote: "Plan provisoire. L’horaire complet suivra l’évaluation des propositions.",
  days: [
    { day: "Mercredi", date: "5 mai", theme: "Accueillir", items: "Cocktail d’accueil en soirée" },
    { day: "Jeudi", date: "6 mai", theme: "Ouvrir", items: "Conférence d’ouverture, séances simultanées, cocktail et gala" },
    { day: "Vendredi", date: "7 mai", theme: "Approfondir", items: "Conférence principale et séances dans les quatre volets" },
    { day: "Samedi", date: "8 mai", theme: "Conclure", items: "Demi-journée et séance de clôture" },
  ],
  approvalKicker: "Obtenir l’approbation",
  approvalTitle: "Convaincre votre organisation",
  approvalLead: "La plupart des délégués ont besoin de l’accord d’un gestionnaire. Voici les arguments, et un courriel à adapter en deux minutes.",
  reasons: [
    ["Des compétences pratiques", "Ateliers et études de cas pour rédiger, concevoir et tester une information juridique et publique utilisable."],
    ["Des pairs de 50 pays", "Rencontrez juristes, juges, fonctionnaires, designers et spécialistes du langage clair au même endroit."],
    ["Quatre volets ciblés", "Droit, politiques et normes; équité et accès à la justice; design juridique; et un volet judiciaire."],
    ["Bilingue et accessible", "En anglais, avec certaines séances en français. Les besoins d’accessibilité sont prévus dès le départ."],
  ],
  emailTitle: "Courriel prêt à envoyer",
  emailHint: "Remplacez les parties entre crochets, puis copiez ou téléchargez.",
  email: `Objet : Demande de participation à Clarity2027, Vancouver, du 5 au 8 mai 2027

Bonjour [nom du gestionnaire],

J’aimerais participer à Clarity2027, la conférence internationale sur le langage clair, à SFU Harbour Centre à Vancouver, du 5 au 8 mai 2027.

Depuis 1983, Clarity réunit les personnes qui travaillent à une communication juridique et publique claire. La conférence 2027 comporte quatre volets : droit, politiques et normes; équité, inclusion et accès à la justice; design juridique et communication multimodale; et un volet judiciaire.

Ce que je rapporterais :
- des méthodes concrètes pour rendre nos [documents / formulaires / lettres / site Web] plus clairs
- des exemples de pairs d’environ 50 pays
- des contacts avec des experts que nous pourrions consulter

Le tarif hâtif prend fin le 15 décembre 2026. Les tarifs sont indiqués à https://clarity.wildapricot.org/event-6854605

Coûts estimés : inscription [montant], transport [montant], hébergement [montant].

Je pourrai présenter un court résumé à l’équipe à mon retour.

Merci,
[votre nom]`,
  copyEmail: "Copier le courriel",
  downloadEmail: "Télécharger (.txt)",
  copiedEmail: "Courriel copié",
  homeApproval: "Besoin d’une approbation? Obtenez le courriel",
};

export const EXTRA: Record<Locale, Extra> = { en, fr };
