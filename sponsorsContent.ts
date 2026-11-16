import type { Locale } from "./content";

export type Tier = {
  id: string;
  name: string;
  price: string;
  avail: string;
  slots: number;
  size: "xl" | "lg" | "md" | "sm";
  level: string;
  pitch: string;
  benefits: string[];
};

type SponsorCopy = {
  title: string;
  short: string;
  stats: [string, string][];
  reachTitle: string;
  reach: string[];
  beyond: string;
  whyTitle: string;
  why: [string, string][];
  wallTitle: string;
  wallIntro: string;
  slot: string;
  available: string;
  tiersTitle: string;
  perks: string;
  levelWord: string;
  ladderTitle: string;
  ladderIntro: string;
  logoWord: string;
  sizeNames: { xl: string; lg: string; md: string; sm: string };
  tiers: Tier[];
  allNamed: string;
  addonsTitle: string;
  addonsIntro: string;
  addons: [string, string, string][];
  inkindTitle: string;
  inkind: string[];
  inkindNote: string;
  approachTitle: string;
  approach: [string, string][];
  ctaTitle: string;
  ctaBody: string;
  cta: string;
  subject: string;
  homeTitle: string;
  homeBody: string;
  homeCta: string;
};

const en: SponsorCopy = {
  title: "Put your name behind clearer law",
  short: "Five packages from US$2,500 to US$20,000, plus named add-ons. Every sponsor is seen by about 250 delegates in Vancouver and by Clarity’s 650+ members in 50 countries for 12 months.",
  stats: [["~250", "delegates, fully in person"], ["650+", "Clarity members"], ["50", "countries"], ["12", "months of logo visibility"]],
  reachTitle: "Who you will reach",
  reach: ["Lawyers and private law firms", "Judges and court professionals", "Government and policy professionals", "Plain language experts, editors and translators", "Designers, researchers and accessibility specialists", "Academics, educators and community organizations"],
  beyond: "Beyond the room: Clarity’s newsletter, website and LinkedIn, plus promotion by partners including SFU Continuing Studies and Editors Canada.",
  whyTitle: "What your sponsorship brings",
  why: [
    ["Be seen at the moments that matter", "The cocktail reception, opening keynote, speaker introductions, lunches, breaks and closing session."],
    ["Stay visible for 12 months", "Your logo on the Clarity2027 website and the main Clarity website for a full year."],
    ["Take part in the program", "Depending on your package: a sponsored session, workshop, lightning talk or speaker introduction."],
    ["Meet delegates in person", "Exhibitor space, complimentary registrations including the gala dinner, and direct access to delegates."],
    ["Support access to justice", "Show your commitment to legal information people can find, understand and use."],
  ],
  wallTitle: "Our sponsors",
  wallIntro: "Your logo could be here. Spaces are allocated in order of confirmation.",
  slot: "Your logo",
  available: "available",
  tiersTitle: "Packages",
  perks: "What’s included",
  levelWord: "Level",
  ladderTitle: "Five levels of recognition",
  ladderIntro: "Higher levels get a larger logo, an earlier place in every listing and more time in front of delegates.",
  logoWord: "Logo size",
  sizeNames: { xl: "Extra large", lg: "Large", md: "Medium", sm: "Small" },
  tiers: [
    { id: "platinum", name: "Platinum", price: "US$20,000", avail: "1 sponsor", slots: 1, size: "xl", level: "Headline", pitch: "A strong presence across the conference and a clear link to the main theme or a track.", benefits: ["Top-level logo on the Clarity2027 and Clarity websites for 12 months", "Naming rights for one flagship element", "One sponsored session, subject to program rules", "Option to introduce a keynote or plenary speaker", "6 complimentary registrations, including the gala dinner", "Priority exhibitor table or booth space"] },
    { id: "cocktail", name: "Cocktail reception", price: "US$15,000", avail: "1 sponsor · Thursday 6 May", slots: 1, size: "lg", level: "Signature event", pitch: "The flagship social event: Thursday evening, before the gala dinner.", benefits: ["Exclusive naming of the cocktail reception", "Remarks from the sponsor at the reception", "Logo on posters and throughout the reception", "Speaking or workshop opportunity in the program"] },
    { id: "gold", name: "Gold", price: "US$7,000", avail: "Up to 4 sponsors", slots: 4, size: "md", level: "Major", pitch: "Strong visibility and a meaningful role in the program, without headline status.", benefits: ["Prominent logo on both websites for 12 months", "Sponsorship of one session, panel or workshop", "3 complimentary registrations, including the gala dinner", "A 15-minute introduction, lightning talk or case-study mention", "Exhibitor table or booth space"] },
    { id: "lunch", name: "Lunch or ice-breaker", price: "From US$5,000", avail: "Up to 2 sponsors", slots: 2, size: "md", level: "Hospitality", pitch: "A lunch, or the Wednesday 5 May ice-breaker reception.", benefits: ["Lunch or reception visibility", "A short 5-minute speaking opportunity", "Signage, table cards and holding slide"] },
    { id: "silver", name: "Silver", price: "US$2,500", avail: "Up to 8 sponsors", slots: 8, size: "sm", level: "Supporting", pitch: "Support the conference, be visible to delegates and show alignment with its aims.", benefits: ["Logo on both sponsor pages for 12 months", "Listing in the conference program", "Group recognition on signage", "1 complimentary registration", "Material on the Clarity table"] },
  ],
  allNamed: "All confirmed sponsors, at every level, are named in the closing remarks.",
  addonsTitle: "Named opportunities and add-ons",
  addonsIntro: "Available within packages in order of confirmation, or on their own.",
  addons: [["Lunch, per day", "US$5,000", "Signage, table cards and holding slide"], ["Delegate bag", "US$4,000", "Logo on the bag, plus an optional branded item"], ["Speaker introduction", "US$3,000", "Short introduction of a single session"], ["Refreshment break", "US$2,000", "Per break. Signage and holding slide"]],
  inkindTitle: "Other ways to support",
  inkind: ["Accessibility support, such as captioning or interpretation", "A judicial or public-interest session", "Recording or streaming of sessions", "Travel for international speakers or delegates", "A plain language research strand, for example with SFU", "A post-conference resource or report"],
  inkindNote: "Cash is preferred. In-kind offers are assessed case by case against an agreed cash value, with recognition at the matching level.",
  approachTitle: "How we work with sponsors",
  approach: [["Balance", "No single sponsor or sector may dominate the event."], ["Independence", "Sponsorship carries no influence over the program, speakers or content."], ["Consistency", "Clear prices and fair, comparable recognition."], ["Flexibility", "In-kind welcome. Named opportunities go in order of confirmation."]],
  ctaTitle: "Let’s talk about your goals",
  ctaBody: "Tell us what you would like to achieve and we will suggest the right fit.",
  cta: "Email the sponsorship team",
  subject: "Clarity2027 sponsorship inquiry",
  homeTitle: "Sponsors",
  homeBody: "Five packages from US$2,500. Be seen by about 250 delegates and 650+ members in 50 countries.",
  homeCta: "Become a sponsor",
};

const fr: SponsorCopy = {
  title: "Associez votre nom à un droit plus clair",
  short: "Cinq forfaits de 2 500 $ US à 20 000 $ US, ainsi que des options nommées. Chaque commanditaire est vu par environ 250 délégués à Vancouver et par les 650 membres et plus de Clarity dans 50 pays pendant 12 mois.",
  stats: [["~250", "délégués, entièrement en personne"], ["650+", "membres de Clarity"], ["50", "pays"], ["12", "mois de visibilité du logo"]],
  reachTitle: "Qui vous rejoindrez",
  reach: ["Avocats et cabinets", "Juges et personnel judiciaire", "Professionnels du gouvernement et des politiques", "Spécialistes du langage clair, réviseurs et traducteurs", "Designers, chercheurs et spécialistes de l’accessibilité", "Universitaires, éducateurs et organismes communautaires"],
  beyond: "Au-delà de la salle : l’infolettre, le site et LinkedIn de Clarity, et la promotion par des partenaires dont SFU Continuing Studies et Réviseurs Canada.",
  whyTitle: "Ce que votre commandite apporte",
  why: [
    ["Être vu aux moments clés", "Le cocktail, la conférence d’ouverture, les présentations de conférenciers, les dîners, les pauses et la clôture."],
    ["Visibilité pendant 12 mois", "Votre logo sur le site de Clarity2027 et sur le site principal de Clarity pendant un an."],
    ["Participer au programme", "Selon le forfait : séance commanditée, atelier, présentation éclair ou présentation d’un conférencier."],
    ["Rencontrer les délégués", "Espace d’exposition, inscriptions gratuites incluant le gala et accès direct aux délégués."],
    ["Soutenir l’accès à la justice", "Affirmez votre engagement envers une information juridique que les gens peuvent trouver, comprendre et utiliser."],
  ],
  wallTitle: "Nos commanditaires",
  wallIntro: "Votre logo pourrait être ici. Les places sont attribuées par ordre de confirmation.",
  slot: "Votre logo",
  available: "disponible(s)",
  tiersTitle: "Forfaits",
  perks: "Ce qui est inclus",
  levelWord: "Niveau",
  ladderTitle: "Cinq niveaux de reconnaissance",
  ladderIntro: "Plus le niveau est élevé, plus le logo est grand, plus il apparaît tôt dans chaque liste et plus vous êtes visible auprès des délégués.",
  logoWord: "Taille du logo",
  sizeNames: { xl: "Très grand", lg: "Grand", md: "Moyen", sm: "Petit" },
  tiers: [
    { id: "platinum", name: "Platine", price: "20 000 $ US", avail: "1 commanditaire", slots: 1, size: "xl", level: "Principal", pitch: "Une forte présence pendant toute la conférence et un lien clair avec le thème principal ou un volet.", benefits: ["Logo de premier plan sur les sites de Clarity2027 et de Clarity pendant 12 mois", "Droit d’appellation d’un élément phare", "Une séance commanditée, selon les règles du programme", "Possibilité de présenter un conférencier principal", "6 inscriptions gratuites, gala inclus", "Table ou kiosque d’exposition prioritaire"] },
    { id: "cocktail", name: "Cocktail", price: "15 000 $ US", avail: "1 commanditaire · jeudi 6 mai", slots: 1, size: "lg", level: "Événement phare", pitch: "L’événement social phare : jeudi soir, avant le gala.", benefits: ["Appellation exclusive du cocktail", "Allocution du commanditaire pendant le cocktail", "Logo sur les affiches et partout pendant le cocktail", "Occasion de présentation ou d’atelier au programme"] },
    { id: "gold", name: "Or", price: "7 000 $ US", avail: "Jusqu’à 4 commanditaires", slots: 4, size: "md", level: "Majeur", pitch: "Une forte visibilité et un rôle significatif au programme, sans statut principal.", benefits: ["Logo bien en vue sur les deux sites pendant 12 mois", "Commandite d’une séance, d’un panel ou d’un atelier", "3 inscriptions gratuites, gala inclus", "Présentation de 15 minutes, éclair ou étude de cas", "Table ou kiosque d’exposition"] },
    { id: "lunch", name: "Dîner ou cocktail d’accueil", price: "À partir de 5 000 $ US", avail: "Jusqu’à 2 commanditaires", slots: 2, size: "md", level: "Accueil", pitch: "Un dîner, ou le cocktail d’accueil du mercredi 5 mai.", benefits: ["Visibilité pendant le dîner ou le cocktail", "Courte allocution de 5 minutes", "Affichage, cartes de table et diapositive"] },
    { id: "silver", name: "Argent", price: "2 500 $ US", avail: "Jusqu’à 8 commanditaires", slots: 8, size: "sm", level: "Soutien", pitch: "Soutenir la conférence, être vu des délégués et affirmer votre adhésion à ses objectifs.", benefits: ["Logo sur les deux pages des commanditaires pendant 12 mois", "Mention dans le programme", "Reconnaissance collective sur l’affichage", "1 inscription gratuite", "Documentation sur la table de Clarity"] },
  ],
  allNamed: "Tous les commanditaires confirmés, à tous les niveaux, sont nommés lors de la clôture.",
  addonsTitle: "Occasions nommées et options",
  addonsIntro: "Offertes dans les forfaits par ordre de confirmation, ou séparément.",
  addons: [["Dîner, par jour", "5 000 $ US", "Affichage, cartes de table et diapositive"], ["Sac des délégués", "4 000 $ US", "Logo sur le sac, et un article promotionnel facultatif"], ["Présentation d’un conférencier", "3 000 $ US", "Courte présentation d’une séance"], ["Pause-café", "2 000 $ US", "Par pause. Affichage et diapositive"]],
  inkindTitle: "Autres façons de soutenir",
  inkind: ["Soutien à l’accessibilité, comme le sous-titrage ou l’interprétation", "Une séance judiciaire ou d’intérêt public", "Enregistrement ou diffusion des séances", "Déplacements de conférenciers ou délégués internationaux", "Un volet de recherche en langage clair, par exemple avec SFU", "Une ressource ou un rapport post-conférence"],
  inkindNote: "Les contributions en argent sont privilégiées. Les offres en nature sont évaluées au cas par cas selon une valeur convenue, avec une reconnaissance équivalente.",
  approachTitle: "Notre façon de travailler",
  approach: [["Équilibre", "Aucun commanditaire ni secteur ne peut dominer l’événement."], ["Indépendance", "La commandite n’influence ni le programme, ni les conférenciers, ni le contenu."], ["Cohérence", "Des prix clairs et une reconnaissance juste et comparable."], ["Souplesse", "Contributions en nature bienvenues. Occasions attribuées par ordre de confirmation."]],
  ctaTitle: "Parlons de vos objectifs",
  ctaBody: "Dites-nous ce que vous souhaitez accomplir et nous vous proposerons la formule idéale.",
  cta: "Écrire à l’équipe de commandite",
  subject: "Demande de commandite Clarity2027",
  homeTitle: "Commanditaires",
  homeBody: "Cinq forfaits à partir de 2 500 $ US. Soyez vu par environ 250 délégués et plus de 650 membres dans 50 pays.",
  homeCta: "Devenir commanditaire",
};

export const SPONSORS: Record<Locale, SponsorCopy> = { en, fr };
