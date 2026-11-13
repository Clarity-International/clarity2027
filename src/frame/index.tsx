import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Handshake,
  Download,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Copy,
  FileText,
  Mail,
  MapPin,
  Menu,
  Mic,
  Plane,
  Ticket,
  X,
  Linkedin,
} from "lucide-react";
import { FrameRoot } from "@dust/frame";
import { useFile, triggerUserFileDownload } from "@dust/react-hooks";
import { theme, highContrast } from "./theme";
import { CONTENT, LINKS } from "./content";
import { EXTRA } from "./learnings";
import { JULIE_IMG, TEAM, type Member } from "./portraits";
import { VANCOUVER_IMG } from "./vancouverImage";
import { SPONSORS } from "./sponsorsContent";
import { LOGO_C, LOGO_MOON, LOGO_LETTERS, LOGO_VARIANTS, logoSvg } from "./logo";
import type { Tier } from "./sponsorsContent";
import type { Content, Locale, PageId } from "./content";

const DEADLINE = new Date("2026-12-15T23:59:00-08:00").getTime();
const PRIMARY_NAV: PageId[] = ["programme", "speakers", "travel", "cfp"];

type Prefs = { size: number; contrast: boolean; spacing: boolean; motion: boolean };
const DEFAULT_PREFS: Prefs = { size: 1, contrast: false, spacing: false, motion: false };

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Manrope:wght@300;400;500;600&display=swap');
.c27 *:focus-visible { outline: 3px solid #111111; outline-offset: 2px; box-shadow: 0 0 0 5px #FFFFFF; border-radius: 2px; }
.c27 p a, .c27 li a:not([class*="inline-flex"]):not([class*="flex "]), .c27 figcaption a, .c27 dd a { text-decoration: underline; text-decoration-thickness: 2px; }
.c27-cta { box-shadow: inset 0 -4px 0 rgba(0,0,0,0.32); }
.c27-cta:hover { box-shadow: inset 0 -4px 0 rgba(0,0,0,0.45); }
.c27 ::selection { background: var(--marker); color: #13202C; }
.c27-spacing p, .c27-spacing li, .c27-spacing dd { line-height: 1.9 !important; letter-spacing: 0.03em; word-spacing: 0.12em; }
.c27 a { text-underline-offset: 0.2em; }
.c27-topo path { vector-effect: non-scaling-stroke; }
`;

const PAGE_IDS = Object.keys(CONTENT.en.nav) as PageId[];
function pageFromHash(): PageId {
  try {
    const h = window.location.hash.replace("#", "") as PageId;
    return PAGE_IDS.includes(h) ? h : "home";
  } catch {
    return "home";
  }
}

function Ext({ href, children, className, label }: { href: string; children: ReactNode; className?: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
      <span className="sr-only"> {label}</span>
    </a>
  );
}

function Topo({ className }: { className?: string }) {
  const lines = Array.from({ length: 11 }, (_, i) => i);
  return (
    <svg viewBox="0 0 600 320" preserveAspectRatio="none" className={`c27-topo ${className ?? ""}`} aria-hidden="true">
      {lines.map((i) => {
        const y = 300 - i * 18;
        const a = 40 + i * 9;
        return (
          <path
            key={i}
            d={`M0 ${y} C 80 ${y - a * 0.4}, 140 ${y - a}, 210 ${y - a * 1.2} S 330 ${y - a * 0.3}, 380 ${y - a * 1.5} S 500 ${y - a * 0.5}, 600 ${y - a * 0.9}`}
            fill="none"
            stroke={i === 6 ? "var(--secondary)" : "currentColor"}
            strokeWidth={i === 6 ? 2 : 1}
            opacity={i === 6 ? 1 : 0.35}
          />
        );
      })}
    </svg>
  );
}

function VancouverImage({ alt, className }: { alt: string; className?: string }) {
  return <img src={VANCOUVER_IMG} alt={alt} className={`block w-full object-cover ${className ?? ""}`} />;
}

function ClarityLogo({ fg = "var(--primary)", moon = "var(--secondary)", className = "h-6 w-auto", title = "Clarity" }: { fg?: string; moon?: string; className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 361 62" className={className} role="img" aria-label={title}>
      <path d={LOGO_C} fill={fg} />
      <path d={LOGO_MOON} fill={moon} />
      {LOGO_LETTERS.map((d) => <path key={d} d={d} fill={fg} fillRule="evenodd" />)}
    </svg>
  );
}

/* Universal access symbol (person with open arms in a circle), widely used for accessibility settings */
function UniversalAccess({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10.2" />
      <circle cx="12" cy="6.9" r="1.4" fill="currentColor" stroke="none" />
      <path d="M6.6 9.6c3.6.9 7.2.9 10.8 0" />
      <path d="M12 10.4v3.6" />
      <path d="M12 14l-2.4 4.4M12 14l2.4 4.4" />
    </svg>
  );
}

function LogoSlot({ size, label }: { size: Tier["size"]; label: string }) {
  const h = { xl: "h-40", lg: "h-32", md: "h-24", sm: "h-16" }[size];
  return (
    <li className={`flex ${h} items-center justify-center border border-dashed border-border bg-card text-xs uppercase text-muted-foreground`} style={{ borderRadius: "var(--radius)", letterSpacing: "0.18em" }}>
      {label}
    </li>
  );
}

function Portrait({ src, initials, alt, className }: { src: string; initials: string; alt: string; className: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <span className={`flex items-center justify-center bg-accent font-serif text-accent-foreground ${className}`} role="img" aria-label={alt}>{initials}</span>;
  }
  return <img src={src} alt={alt} onError={() => setFailed(true)} className={`object-cover ${className}`} style={{ objectPosition: "50% 22%" }} loading="lazy" />;
}

function MemberName({ m, lang, nw }: { m: Member; lang: "en" | "fr"; nw: string }) {
  const label = `${m.name} (${m.country[lang]})`;
  if (!m.linkedin && m.web) {
    return (
      <a href={m.web.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-bold text-primary underline decoration-2 underline-offset-4" aria-label={`${label}, ${m.web.site} ${nw}`}>
        {label}<ArrowUpRight size={15} aria-hidden="true" />
      </a>
    );
  }
  if (!m.linkedin) return <span className="font-bold text-primary">{label}</span>;
  return (
    <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-bold text-primary underline decoration-2 underline-offset-4" aria-label={`${label}, LinkedIn ${nw}`}>
      {label}<Linkedin size={15} aria-hidden="true" />
    </a>
  );
}

function LevelBadge({ n, light = false }: { n: number; light?: boolean }) {
  return (
    <span className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-serif text-sm font-bold ${light ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"}`} aria-hidden="true">{n}</span>
  );
}

const LOGO_BAR: Record<Tier["size"], string> = { xl: "100%", lg: "78%", md: "52%", sm: "30%" };

function TierLadder({ tiers, levelWord, logoWord, sizeNames }: { tiers: Tier[]; levelWord: string; logoWord: string; sizeNames: Record<Tier["size"], string> }) {
  return (
    <ol className="divide-y divide-border border-y border-border">
      {tiers.map((t, k) => (
        <li key={t.id} className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4">
          <div className="flex items-center gap-3" style={{ flex: "1 1 240px" }}>
            <LevelBadge n={k + 1} />
            <div>
              <p className="font-bold text-primary"><span className="sr-only">{levelWord} {k + 1}: </span>{t.name}</p>
              <p className="text-xs uppercase text-muted-foreground" style={{ letterSpacing: "0.16em" }}>{t.level} · {t.avail}</p>
            </div>
          </div>
          <div className="min-w-0" style={{ flex: "2 1 220px" }}>
            <div className="h-3 w-full rounded-full bg-muted" aria-hidden="true">
              <div className="h-3 rounded-full bg-primary" style={{ width: LOGO_BAR[t.size] }} />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{logoWord}: {sizeNames[t.size]}</p>
          </div>
          <p className="w-40 text-right font-serif text-xl text-foreground">{t.price}</p>
        </li>
      ))}
    </ol>
  );
}

function SponsorWall({ tiers, slotLabel, compact = false }: { tiers: Tier[]; slotLabel: string; compact?: boolean }) {
  const min = { xl: "100%", lg: "100%", md: "200px", sm: "140px" };
  return (
    <div className="space-y-8">
      {tiers.map((t, n) => (
        <div key={t.id}>
          <div className="flex items-center justify-between gap-4 border-b-2 border-primary pb-2">
            <h3 className="flex items-center gap-3 font-serif text-sm font-semibold uppercase text-primary" style={{ letterSpacing: "0.2em" }}><LevelBadge n={n + 1} />{t.name}<span className="font-sans text-xs font-normal normal-case tracking-normal text-muted-foreground">{t.level}</span></h3>
            {!compact && <span className="text-sm text-muted-foreground">{t.avail}</span>}
          </div>
          <ul className="mt-4 grid gap-3" style={{ gridTemplateColumns: t.size === "xl" || t.size === "lg" ? "1fr" : `repeat(auto-fill, minmax(min(100%, ${min[t.size]}), 1fr))` }} aria-label={`${t.name}: ${t.slots}`}>
            {Array.from({ length: t.slots }).map((_, k) => <LogoSlot key={k} size={compact && t.size === "xl" ? "lg" : t.size} label={slotLabel} />)}
          </ul>
        </div>
      ))}
    </div>
  );
}

function PageHead({ kicker, title, short, c, h1Ref }: { kicker: string; title: string; short: string; c: Content; h1Ref: React.MutableRefObject<HTMLHeadingElement | null> }) {
  return (
    <header className="relative overflow-hidden border-b border-border">
      
      <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-14 lg:px-8 lg:pb-20 lg:pt-20">
        <p className="text-sm font-bold uppercase tracking-widest text-secondary">{kicker}</p>
        <h1 ref={h1Ref} tabIndex={-1} className="mt-4 max-w-4xl font-serif text-5xl font-light leading-none tracking-tight text-primary outline-none sm:text-6xl">
          {title}
        </h1>
        <aside className="mt-10 max-w-3xl border-l-4 border-secondary bg-card p-5 sm:p-6" aria-label={c.meta.inShort}>
          <p className="text-xs font-bold uppercase tracking-widest text-secondary">{c.meta.inShort}</p>
          <p className="mt-2 text-lg leading-8 text-foreground">{short}</p>
        </aside>
      </div>
    </header>
  );
}

function Section({ children, tone = "bg", className = "" }: { children: ReactNode; tone?: "bg" | "card" | "muted" | "primary" | "accent"; className?: string }) {
  const tones = {
    bg: "bg-background",
    card: "bg-card",
    muted: "bg-muted",
    primary: "bg-primary text-primary-foreground",
    accent: "bg-accent text-accent-foreground",
  };
  return (
    <section className={`${tones[tone]} border-b border-border`}>
      <div className={`mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20 ${className}`}>{children}</div>
    </section>
  );
}

function H2({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <h2 className={`font-serif font-light text-3xl leading-tight tracking-tight sm:text-4xl ${light ? "text-primary-foreground" : "text-primary"}`}>{children}</h2>;
}

function BtnPrimary({ children, onClick, href, label }: { children: ReactNode; onClick?: () => void; href?: string; label?: string }) {
  const cls = "c27-cta inline-flex min-h-12 items-center gap-3 rounded-md bg-secondary px-7 py-3 text-sm font-bold uppercase tracking-widest text-secondary-foreground underline-offset-4 transition-colors hover:underline";
  if (href) return <Ext href={href} className={cls} label={label ?? ""}>{children}</Ext>;
  return <button onClick={onClick} className={cls}>{children}<ArrowRight size={16} aria-hidden="true" /></button>;
}
function BtnGhost({ children, onClick, href, label, light = false }: { children: ReactNode; onClick?: () => void; href?: string; label?: string; light?: boolean }) {
  const cls = `inline-flex min-h-12 items-center gap-3 rounded-md border px-7 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${light ? "border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"}`;
  if (href) return <Ext href={href} className={cls} label={label ?? ""}>{children}</Ext>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}

function SfuLogo({ alt }: { alt: string }) {
  const file = useFile("./assets/sfu-continuing-studies.jpg");
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!file) return;
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);
  if (!url) return <p className="text-lg font-bold text-secondary">SFU Continuing Studies</p>;
  return <img src={url} alt={alt} className="h-12 w-auto object-contain" />;
}

export default function App() {
  const [lang, setLang] = useState<Locale>("en");
  const [page, setPage] = useState<PageId>(() => pageFromHash());
  const [menu, setMenu] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [toast, setToast] = useState<string | null>(null);
  const [announce, setAnnounce] = useState("");
  const [checked, setChecked] = useState<number[]>([]);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [track, setTrack] = useState(0);
  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const first = useRef(true);
  const systemReduce = useReducedMotion();
  const reduce = Boolean(systemReduce) || prefs.motion;
  const c = CONTENT[lang];
  const sp = SPONSORS[lang];

  const daysLeft = useMemo(() => Math.ceil((DEADLINE - Date.now()) / 86400000), []);

  const go = (p: PageId) => {
    setPage(p);
    setMenu(false);
    try {
      window.history.pushState(null, "", p === "home" ? window.location.pathname + window.location.search : `#${p}`);
    } catch {
      /* history unavailable (sandboxed preview) */
    }
  };

  useEffect(() => {
    const onNav = () => {
      const h = window.location.hash.replace("#", "");
      if (h === "" || PAGE_IDS.includes(h as PageId)) setPage(pageFromHash());
    };
    window.addEventListener("popstate", onNav);
    window.addEventListener("hashchange", onNav);
    return () => {
      window.removeEventListener("popstate", onNav);
      window.removeEventListener("hashchange", onNav);
    };
  }, []);

  useEffect(() => {
    try {
      document.documentElement.lang = lang === "fr" ? "fr-CA" : "en-CA";
      document.title = page === "home" ? (lang === "fr" ? "Clarity2027 · Vancouver, 5 au 8 mai 2027" : "Clarity2027 · Vancouver, May 5–8, 2027") : `${c.nav[page]} · Clarity2027`;
    } catch {
      /* ignore */
    }
  }, [lang, page]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    h1Ref.current?.focus({ preventScroll: true });
    setAnnounce(`${c.meta.pageChanged} ${c.nav[page]}`);
  }, [page]);

  const flash = (m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(null), 2600);
  };
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      flash(`${c.meta.copied}: ${text}`);
    } catch {
      flash(c.meta.copyFail);
    }
  };

  const nw = c.meta.opensNew;
  const x = EXTRA[lang];
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(x.email);
      flash(x.copiedEmail);
    } catch {
      flash(c.meta.copyFail);
    }
  };
  const goApproval = () => {
    go("register");
    window.setTimeout(() => document.getElementById("approval")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }), 400);
  };
  const fadeUp = reduce
    ? {}
    : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45 } };

  const activeTheme = prefs.contrast ? { ...theme, ...highContrast } : theme;

  /* ---------- PAGES ---------- */

  const Home = (
    <>
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-stretch gap-12 px-5 pb-16 pt-14 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="flex min-w-0 flex-col justify-between" style={{ flex: "1.15 1 420px" }}>
            <div>
              <p className="text-xs font-bold uppercase text-secondary" style={{ letterSpacing: "0.28em" }}>{c.home.eyebrow}</p>
              <h1 ref={h1Ref} tabIndex={-1} className="mt-8 font-serif font-light leading-none text-primary outline-none" style={{ fontSize: "clamp(3rem, 7.5vw, 6rem)", letterSpacing: "-0.03em" }}>
                {c.home.title1}
                <br />
                <span className="text-muted-foreground">{c.home.title2}</span>
              </h1>
              <p className="mt-10 max-w-lg text-lg leading-8 text-muted-foreground">{c.home.lead}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <BtnPrimary href={LINKS.register} label={nw}>{c.home.register} <ArrowUpRight size={16} aria-hidden="true" /></BtnPrimary>
                <BtnGhost onClick={() => go("cfp")}>{c.home.propose}</BtnGhost>
              </div>
            </div>
            <dl className="mt-14 grid border-t border-border pt-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1.5rem" }}>
              <div><dt className="text-xs uppercase text-muted-foreground" style={{ letterSpacing: "0.2em" }}>{lang === "fr" ? "Dates" : "Dates"}</dt><dd className="mt-2 font-serif text-lg text-primary">{c.facts.dates}</dd></div>
              <div><dt className="text-xs uppercase text-muted-foreground" style={{ letterSpacing: "0.2em" }}>{lang === "fr" ? "Lieu" : "Place"}</dt><dd className="mt-2 font-serif text-lg text-primary">{c.facts.city}</dd></div>
              <div><dt className="text-xs uppercase text-muted-foreground" style={{ letterSpacing: "0.2em" }}>{lang === "fr" ? "Propositions" : "Proposals"}</dt><dd className="mt-2 font-serif text-lg text-primary">{daysLeft > 0 ? `${daysLeft} ${lang === "fr" ? "jours restants" : "days left"}` : c.home.countdownClosed}</dd></div>
            </dl>
          </div>
          <figure className="relative min-w-0" style={{ flex: "1 1 340px" }}>
            <VancouverImage alt={lang === "fr" ? "Vancouver par un matin ensoleillé de mai : cerisiers en fleurs, le port, Place du Canada, les tours du centre-ville et les montagnes de la rive nord" : "Vancouver on a sunny May morning: cherry blossoms, the harbor, Canada Place, downtown towers and the North Shore mountains"} className="h-full" />
            <figcaption className="absolute bottom-0 left-0 bg-background px-4 py-3 text-xs uppercase text-muted-foreground" style={{ letterSpacing: "0.22em" }}>Vancouver · 49.28° N</figcaption>
          </figure>
        </div>
      </section>

      <section className="border-y border-border bg-background" aria-label={x.numbersLabel}>
        <dl className="mx-auto grid max-w-6xl px-5 py-8 lg:px-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "1.25rem" }}>
          {x.numbers.map(([n, l]) => (
            <div key={l} className="border-l-2 border-secondary pl-4">
              <dt className="sr-only">{l}</dt>
              <dd><span className="block font-serif text-3xl font-semibold text-primary">{n}</span><span className="mt-1 block text-sm text-muted-foreground">{l}</span></dd>
            </div>
          ))}
        </dl>
      </section>

      <Section tone="card">
        <H2>{c.home.pathsTitle}</H2>
        <div className="mt-10 grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}>
          {c.home.paths.map((p, k) => {
            const icons = [Ticket, Mic, Handshake, Plane];
            const Icon = icons[k];
            return (
              <motion.button
                key={p.id}
                {...fadeUp}
                onClick={() => go(p.id as PageId)}
                className="group flex min-h-64 flex-col border border-border bg-background p-6 text-left transition-colors hover:border-primary hover:bg-accent"
                style={{ borderRadius: "var(--radius)" }}
              >
                <Icon size={26} className="text-secondary" aria-hidden="true" />
                <span className="mt-8 font-serif text-2xl text-primary">{p.title}</span>
                <span className="mt-3 flex-1 text-base leading-7 text-muted-foreground">{p.body}</span>
                <span className="mt-6 inline-flex items-center gap-2 font-bold text-primary">
                  {p.cta} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </motion.button>
            );
          })}
        </div>
      </Section>

      <Section>
        <p className="text-xs font-bold uppercase text-secondary" style={{ letterSpacing: "0.24em" }}>{x.glanceKicker}</p>
        <H2>{x.glanceTitle}</H2>
        <ol className="mt-8 grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))" }}>
          {x.days.map((d, k) => (
            <li key={d.day} className={`flex flex-col border p-6 ${k === 1 ? "border-2 border-primary bg-accent text-accent-foreground" : "border-border bg-card"}`} style={{ borderRadius: "var(--radius)" }}>
              <p className="text-xs font-bold uppercase text-muted-foreground" style={{ letterSpacing: "0.2em" }}>{d.day}</p>
              <p className="mt-1 font-serif text-3xl font-semibold text-primary">{d.date}</p>
              <p className="mt-4 font-serif text-lg text-secondary">{d.theme}</p>
              <p className="mt-2 text-base leading-7 text-foreground">{d.items}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted-foreground">{x.glanceNote}</p>
      </Section>

      <Section tone="primary">
        <div className="flex flex-wrap gap-12">
          <div className="min-w-0" style={{ flex: "1 1 300px" }}>
            <p className="text-sm font-bold uppercase tracking-widest text-accent">{c.programme.mainLabel}</p>
            <H2 light>{c.home.themesTitle}</H2>
            <p className="mt-6 font-serif text-2xl font-medium leading-snug">“{c.home.themesLead}”</p>
            <div className="mt-8"><BtnGhost light onClick={() => go("programme")}>{c.home.themesCta} <ArrowRight size={18} aria-hidden="true" /></BtnGhost></div>
          </div>
          <ol className="grid gap-px bg-primary-foreground min-w-0" style={{ flex: "1.4 1 420px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {c.programme.tracks.map((t) => (
              <li key={t.code} className="bg-primary p-6">
                <span className="font-serif text-4xl text-accent">{t.code}</span>
                <p className="mt-4 text-lg font-bold">{t.title}</p>
                <p className="mt-2 text-base leading-7 text-primary-foreground">{t.q}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap gap-12">
          <figure className="min-w-0" style={{ flex: "1.4 1 420px" }}>
            <p className="text-sm font-bold uppercase tracking-widest text-secondary">{c.home.welcomeKicker}</p>
            <blockquote className="mt-6 font-serif text-3xl leading-snug text-primary sm:text-4xl">“{c.home.welcomeQuote}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-4 text-base"><Portrait src={JULIE_IMG} initials="JC" alt="" className="h-14 w-14 shrink-0 rounded-full border-2 border-secondary text-lg" /><span><span className="font-bold text-foreground">{c.home.welcomeBy}</span><span className="text-muted-foreground"> · {c.home.welcomeRole}</span></span></figcaption>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">{c.home.welcomeBody}</p>
          </figure>
          <div className="min-w-0" style={{ flex: "1 1 300px" }}>
            <h2 className="font-serif text-2xl text-primary">{c.home.datesTitle}</h2>
            <ol className="mt-6 border-l-2 border-border">
              {c.home.dates.map((d, k) => (
                <li key={d.when} className="relative pb-7 pl-6 last:pb-0">
                  <span style={{ left: "-9px" }} className={`absolute top-1 h-3.5 w-3.5 rounded-full border-2 ${k === 1 ? "border-secondary bg-secondary" : "border-primary bg-background"}`} aria-hidden="true" />
                  <p className={`text-sm font-bold uppercase tracking-wider ${k === 1 ? "text-secondary" : "text-muted-foreground"}`}>{d.when}</p>
                  <p className="mt-1 text-lg text-foreground">{d.what}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase text-secondary" style={{ letterSpacing: "0.24em" }}>{c.team.kicker}</p>
            <H2>{c.team.title}</H2>
            <p className="mt-3 text-lg leading-8 text-muted-foreground">{c.team.short}</p>
          </div>
          <BtnGhost onClick={() => go("team")}>{lang === "fr" ? "Rencontrer l’équipe" : "Meet the team"} <ArrowRight size={16} aria-hidden="true" /></BtnGhost>
        </div>
        <div className="mt-10 flex flex-wrap gap-5">
          <article className="flex min-w-0 flex-col justify-between border border-border bg-card p-6" style={{ flex: "1 1 260px", borderRadius: "var(--radius)" }}>
            <ClarityLogo className="h-7 w-auto self-start" />
            <p className="mt-6 text-base leading-7 text-muted-foreground">{c.team.clarityBody}</p>
          </article>
          <article className="min-w-0 border border-border bg-card p-6" style={{ flex: "2 1 520px", borderRadius: "var(--radius)" }}>
            <ul className="grid gap-x-6 gap-y-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))" }}>
              {TEAM.map((m) => (
                <li key={m.name} className="flex items-center gap-4">
                  {m.img ? <Portrait src={m.img} initials={m.initials} alt="" className="h-16 w-16 shrink-0 rounded-full border-2 border-primary text-lg" /> : <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent font-serif text-lg text-accent-foreground" aria-hidden="true">{m.initials}</span>}
                  <span className="min-w-0"><span className="block"><MemberName m={m} lang={lang} nw={nw} /></span><span className="block text-sm text-muted-foreground">{m.role ? m.role[lang] : c.team.tbcRole}</span></span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Section>

      <Section tone="card">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{c.home.hostTitle}</p>
            <div className="mt-4"><SfuLogo alt="SFU Continuing Studies" /></div>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{c.home.hostBody}</p>
          </div>
          <div className="max-w-md">
            <H2>{c.home.finalTitle}</H2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{c.home.finalBody}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <BtnPrimary href={LINKS.register} label={nw}>{c.home.register} <ArrowUpRight size={18} aria-hidden="true" /></BtnPrimary>
            </div>
            <button onClick={goApproval} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary underline decoration-2 underline-offset-4"><FileText size={16} aria-hidden="true" />{x.homeApproval}</button>
          </div>
        </div>
      </Section>
    </>
  );

  const Programme = (
    <>
      <PageHead kicker={c.programme.kicker} title={c.programme.title} short={c.programme.short} c={c} h1Ref={h1Ref} />
      <Section tone="primary">
        <p className="text-sm font-bold uppercase tracking-widest text-accent">{c.programme.mainLabel}</p>
        <H2 light>{c.programme.mainTitle}</H2>
        <p className="mt-6 max-w-4xl font-serif text-2xl font-medium leading-snug sm:text-3xl">“{c.programme.mainQ}”</p>
        <p className="mt-6 max-w-3xl text-lg leading-8">{c.programme.mainBody}</p>
      </Section>
      <Section>
        <H2>{c.programme.tracksTitle}</H2>
        <div className="mt-8 flex flex-wrap gap-6">
          <div className="flex flex-col gap-2 min-w-0" style={{ flex: "1 1 300px" }} role="tablist" aria-label={c.programme.tracksTitle}>
            {c.programme.tracks.map((t, k) => (
              <button
                key={t.code}
                role="tab"
                aria-selected={track === k}
                aria-controls="track-panel"
                onClick={() => setTrack(k)}
                className={`flex items-center gap-4 border p-4 text-left transition-colors ${track === k ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary"}`}
              >
                <span className={`font-serif text-3xl ${track === k ? "text-accent" : "text-secondary"}`}>{t.code}</span>
                <span className="text-lg font-bold">{t.title}</span>
              </button>
            ))}
          </div>
          <div id="track-panel" role="tabpanel" className="border border-border bg-card p-8 min-w-0" style={{ flex: "1.4 1 420px" }}>
            <p className="font-serif text-6xl text-secondary">{c.programme.tracks[track].code}</p>
            <h3 className="mt-4 text-2xl font-bold text-primary">{c.programme.tracks[track].title}</h3>
            <p className="mt-4 font-serif text-2xl font-medium leading-snug text-foreground">{c.programme.tracks[track].q}</p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">{c.programme.tracks[track].body}</p>
          </div>
        </div>
      </Section>
      <Section tone="card">
        <H2>{c.programme.formatsTitle}</H2>
        <dl className="mt-8 grid gap-px border border-border bg-border" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          {c.programme.formats.map(([n, d]) => (
            <div key={n} className="bg-card p-6">
              <dt className="text-lg font-bold text-primary">{n}</dt>
              <dd className="mt-2 text-base leading-7 text-muted-foreground">{d}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}>
          <div className="bg-accent p-6 text-accent-foreground">
            <h3 className="text-lg font-bold">{c.programme.languageTitle}</h3>
            <p className="mt-2 text-base leading-7">{c.programme.languageBody}</p>
          </div>
          <div className="border border-border p-6">
            <h3 className="text-lg font-bold text-primary">{c.programme.scheduleTitle}</h3>
            <p className="mt-2 text-base leading-7 text-muted-foreground">{c.programme.scheduleBody}</p>
            <div className="mt-4"><BtnPrimary href={LINKS.register} label={nw}>{c.home.register}</BtnPrimary></div>
          </div>
        </div>
      </Section>
    </>
  );

  const Speakers = (
    <>
      <PageHead kicker={c.speakers.kicker} title={c.speakers.title} short={c.speakers.short} c={c} h1Ref={h1Ref} />
      <Section>
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          {Array.from({ length: 6 }).map((_, k) => (
            <div key={k} className="border border-border bg-card p-5" aria-hidden="true">
              <div className="flex h-40 items-center justify-center bg-muted">
                <Mic size={28} className="text-muted-foreground" />
              </div>
              <p className="mt-4 text-sm font-bold text-muted-foreground">{c.speakers.slot}</p>
            </div>
          ))}
        </div>
        <p className="sr-only">{c.speakers.slot}</p>
      </Section>
      <Section tone="card">
        <div className="grid gap-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}>
          <div>
            <H2>{c.speakers.lookingTitle}</H2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {c.speakers.looking.map((l) => (
                <li key={l} className="border border-border bg-background px-4 py-2 text-base text-foreground">{l}</li>
              ))}
            </ul>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">{c.speakers.firstTime}</p>
          </div>
          <div className="flex flex-col items-start justify-center gap-4">
            <BtnPrimary onClick={() => go("cfp")}><Mic size={18} aria-hidden="true" /> {c.home.propose}</BtnPrimary>
            <a className="inline-flex items-center gap-2 font-bold text-primary underline" href={`mailto:${lang === "fr" ? LINKS.bonjour : LINKS.hello}?subject=${encodeURIComponent(c.speakers.notifySubject)}`}>
              <Mail size={18} aria-hidden="true" /> {c.speakers.notify}
            </a>
          </div>
        </div>
      </Section>
    </>
  );

  const Cfp = (
    <>
      <PageHead kicker={c.cfp.kicker} title={c.cfp.title} short={c.cfp.short} c={c} h1Ref={h1Ref} />
      <Section tone="primary">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-accent">{c.cfp.deadline}</p>
            <p className="mt-2 font-serif text-5xl">{c.cfp.deadlineValue}</p>
            {daysLeft > 0 && <p className="mt-2 text-base">{daysLeft} {c.home.countdownLabel}</p>}
          </div>
          <BtnPrimary href={LINKS.cfp} label={nw}>{c.cfp.submit} <ArrowUpRight size={18} aria-hidden="true" /></BtnPrimary>
        </div>
      </Section>
      <Section>
        <div className="grid gap-12" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}>
          <div>
            <H2>{c.cfp.why}</H2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">{c.cfp.whyBody}</p>
            <h2 className="mt-10 font-serif text-3xl text-primary">{c.cfp.who}</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">{c.cfp.whoBody}</p>
            <h2 className="mt-10 font-serif text-3xl text-primary">{c.cfp.tipsTitle}</h2>
            <ol className="mt-4 space-y-3">
              {c.cfp.tips.map((t, k) => (
                <li key={t} className="flex gap-4 text-lg leading-7 text-foreground"><span className="font-serif text-2xl text-secondary">{k + 1}</span>{t}</li>
              ))}
            </ol>
          </div>
          <div className="border border-border bg-card p-6 sm:p-8">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-serif text-2xl text-primary">{c.cfp.checklistTitle}</h2>
              <p className="text-sm font-bold text-secondary" aria-live="polite">{checked.length}/{c.cfp.checklist.length} {c.cfp.ready}</p>
            </div>
            <div className="mt-3 h-2 bg-muted" aria-hidden="true">
              <div className="h-2 bg-secondary transition-all" style={{ width: `${(checked.length / c.cfp.checklist.length) * 100}%` }} />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{c.cfp.checklistHint}</p>
            <ul className="mt-5 space-y-1">
              {c.cfp.checklist.map((item, k) => {
                const on = checked.includes(k);
                return (
                  <li key={item}>
                    <label className="flex cursor-pointer items-center gap-3 p-2 hover:bg-muted">
                      <input type="checkbox" className="sr-only" checked={on} onChange={() => setChecked(on ? checked.filter((x) => x !== k) : [...checked, k])} />
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center border-2 ${on ? "border-secondary bg-secondary text-secondary-foreground" : "border-primary"}`} aria-hidden="true">{on && <Check size={14} />}</span>
                      <span className={`text-base ${on ? "text-muted-foreground line-through" : "text-foreground"}`}>{item}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6"><BtnPrimary href={LINKS.cfp} label={nw}>{c.cfp.submit} <ArrowUpRight size={18} aria-hidden="true" /></BtnPrimary></div>
          </div>
        </div>
      </Section>
      <Section tone="card">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <H2>{c.cfp.reviewTitle}</H2>
          <p className="max-w-md text-base text-muted-foreground">{lang === "fr" ? "Un comité évalue chaque proposition selon trois dimensions." : "A review committee looks at every proposal through three lenses."}</p>
        </div>
        <ol className="mt-8 grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}>
          {(lang === "fr"
            ? [["Pertinence", [0, 1]], ["Perspectives", [2, 3, 4]], ["Substance", [5, 6]]]
            : [["Relevance", [0, 1]], ["Perspectives", [2, 3, 4]], ["Substance", [5, 6]]]
          ).map(([title, idx], g) => (
            <li key={title as string} className="flex flex-col border border-border bg-background p-6" style={{ borderRadius: "var(--radius)" }}>
              <div className="flex items-baseline gap-3 border-b border-border pb-4">
                <span className="font-serif text-3xl font-light text-secondary">0{g + 1}</span>
                <h3 className="font-serif text-xl font-semibold text-primary">{title as string}</h3>
              </div>
              <ul className="mt-4 space-y-3">
                {(idx as number[]).map((i) => (
                  <li key={i} className="flex gap-3 text-base leading-7 text-foreground"><Check size={18} className="mt-1 shrink-0 text-secondary" aria-hidden="true" />{c.cfp.review[i]}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <div className="mt-10 grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}>
          <div className="bg-accent p-6 text-accent-foreground"><p className="text-base leading-7">{c.cfp.languageNote}</p></div>
          <div className="border border-border p-6">
            <h3 className="text-lg font-bold text-primary">{c.cfp.sponsoredTitle}</h3>
            <p className="mt-2 text-base leading-7 text-muted-foreground">{c.cfp.sponsoredBody}</p>
          </div>
        </div>
        <p className="mt-8 text-base text-muted-foreground">{c.cfp.questions} <a className="font-bold text-primary underline" href={`mailto:${lang === "fr" ? LINKS.bonjour : LINKS.hello}`}>{lang === "fr" ? LINKS.bonjour : LINKS.hello}</a></p>
      </Section>
    </>
  );

  const Register = (
    <>
      <PageHead kicker={c.register.kicker} title={c.register.title} short={c.register.short} c={c} h1Ref={h1Ref} />
      <Section tone="primary">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="inline-block bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">{c.register.early}</p>
            <p className="mt-4 font-serif text-4xl">{c.facts.dates}</p>
            <p className="mt-1 text-lg">{c.facts.city}</p>
          </div>
          <BtnPrimary href={LINKS.register} label={nw}><Ticket size={18} aria-hidden="true" /> {c.register.cta}</BtnPrimary>
        </div>
      </Section>
      <Section>
        <H2>{c.register.stepsTitle}</H2>
        <ol className="mt-8 grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}>
          {c.register.steps.map(([t, d], k) => (
            <li key={t} className="border-t-4 border-secondary bg-card p-6">
              <span className="font-serif text-5xl text-secondary">{k + 1}</span>
              <h3 className="mt-4 text-xl font-bold text-primary">{t}</h3>
              <p className="mt-2 text-base leading-7 text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </Section>
      <section id="approval" className="bg-card" aria-labelledby="approval-title" style={{ scrollMarginTop: "6rem" }}>
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
          <p className="text-xs font-bold uppercase text-secondary" style={{ letterSpacing: "0.24em" }}>{x.approvalKicker}</p>
          <h2 id="approval-title" className="mt-3 font-serif text-3xl font-semibold text-primary sm:text-4xl">{x.approvalTitle}</h2>
          <p className="mt-3 max-w-2xl text-lg leading-8 text-muted-foreground">{x.approvalLead}</p>
          <div className="mt-10 flex flex-wrap gap-10">
            <dl className="min-w-0 space-y-5" style={{ flex: "1 1 300px" }}>
              {x.reasons.map(([t, d]) => (
                <div key={t} className="border-l-2 border-secondary pl-4"><dt className="font-bold text-primary">{t}</dt><dd className="mt-1 text-base leading-7 text-muted-foreground">{d}</dd></div>
              ))}
            </dl>
            <div className="min-w-0 border border-border bg-background p-6" style={{ flex: "1.4 1 380px", borderRadius: "var(--radius)" }}>
              <h3 className="flex items-center gap-2 font-serif text-xl font-semibold text-primary"><Mail size={18} aria-hidden="true" />{x.emailTitle}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{x.emailHint}</p>
              <pre className="mt-4 max-h-80 overflow-y-auto whitespace-pre-wrap border-l-4 border-primary bg-card p-4 font-sans text-sm leading-6 text-foreground" tabIndex={0} aria-label={x.emailTitle}>{x.email}</pre>
              <div className="mt-4 flex flex-wrap gap-3">
                <button onClick={copyEmail} className="c27-cta inline-flex min-h-11 items-center gap-2 bg-primary px-5 py-2 text-sm font-bold text-primary-foreground" style={{ borderRadius: "var(--radius)" }}><Copy size={16} aria-hidden="true" />{x.copyEmail}</button>
                <button onClick={() => triggerUserFileDownload({ content: new Blob([x.email], { type: "text/plain" }), filename: lang === "fr" ? "Clarity2027-demande-approbation.txt" : "Clarity2027-approval-request.txt" })} className="inline-flex min-h-11 items-center gap-2 border-2 border-primary px-5 py-2 text-sm font-bold text-primary" style={{ borderRadius: "var(--radius)" }}><Download size={16} aria-hidden="true" />{x.downloadEmail}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Section tone="card">
        <H2>{c.register.faqTitle}</H2>
        <div className="mt-8 border-t border-border">
          {c.register.faq.map(([q, a], k) => {
            const open = faqOpen === k;
            return (
              <div key={q} className="border-b border-border">
                <h3>
                  <button className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-bold text-primary" aria-expanded={open} onClick={() => setFaqOpen(open ? null : k)}>
                    {q}
                    <ChevronDown size={20} className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                </h3>
                {open && <p className="pb-6 text-lg leading-8 text-muted-foreground">{a}</p>}
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );

  const Travel = (
    <>
      <PageHead kicker={c.travel.kicker} title={c.travel.title} short={c.travel.short} c={c} h1Ref={h1Ref} />
      <Section>
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {c.travel.cards.map(([t, d], k) => {
            const icons = [Plane, MapPin, Check, CalendarDays];
            const Icon = icons[k];
            return (
              <div key={t} className="border border-border bg-card p-6">
                <Icon size={24} className="text-secondary" aria-hidden="true" />
                <h2 className="mt-5 text-xl font-bold text-primary">{t}</h2>
                <p className="mt-2 text-base leading-7 text-muted-foreground">{d}</p>
              </div>
            );
          })}
        </div>
      </Section>
      <Section tone="card">
        <div className="flex flex-wrap items-center gap-10">
          <figure className="min-w-0" style={{ flex: "1 1 340px" }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Vancouver_%28BC%2C_Canada%29%2C_Harbour_Centre_--_2022_--_1860.jpg/960px-Vancouver_%28BC%2C_Canada%29%2C_Harbour_Centre_--_2022_--_1860.jpg" alt={lang === "fr" ? "La tour Harbour Centre et son observatoire, au centre-ville de Vancouver" : "Harbour Centre tower and its lookout, downtown Vancouver"} className="block h-96 w-full object-cover" style={{ borderRadius: "var(--radius)" }} loading="lazy" referrerPolicy="no-referrer" />
            <figcaption className="mt-2 text-xs text-muted-foreground">Photo: Dietmar Rabich, <a className="underline" href="https://commons.wikimedia.org/wiki/File:Vancouver_(BC,_Canada),_Harbour_Centre_--_2022_--_1860.jpg" target="_blank" rel="noreferrer">Wikimedia Commons</a>, CC BY-SA 4.0</figcaption>
          </figure>
          <div className="min-w-0" style={{ flex: "1 1 320px" }}>
            <p className="text-xs font-bold uppercase text-secondary" style={{ letterSpacing: "0.24em" }}>{lang === "fr" ? "Le lieu" : "The venue"}</p>
            <H2>SFU Harbour Centre</H2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">{lang === "fr" ? "Au cœur du centre-ville, à quelques pas de Waterfront Station (SkyTrain, SeaBus et West Coast Express), du port et de Gastown." : "In the heart of downtown, steps from Waterfront Station (SkyTrain, SeaBus and West Coast Express), the harbor and Gastown."}</p>
            <p className="mt-4 font-bold text-primary">515 West Hastings Street, Vancouver, BC</p>
          </div>
        </div>
      </Section>

      <Section tone="card">
        <div className="grid gap-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}>
          <div>
            <h2 className="font-serif text-3xl text-primary">{lang === "fr" ? "Liens utiles" : "Useful links"}</h2>
            <ul className="mt-6 border-t border-border">
              {c.travel.links.map(([label, key]) => (
                <li key={label} className="border-b border-border">
                  <Ext href={LINKS[key as keyof typeof LINKS]} label={nw} className="flex items-center justify-between py-4 text-lg font-bold text-primary hover:text-secondary">
                    {label} <ArrowUpRight size={18} aria-hidden="true" />
                  </Ext>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-muted p-6">
            <h2 className="font-serif text-3xl text-primary">{c.travel.comingTitle}</h2>
            <ul className="mt-4 space-y-3">
              {c.travel.coming.map((x) => <li key={x} className="flex gap-3 text-lg text-foreground"><span className="mt-3 h-1.5 w-4 shrink-0 bg-secondary" aria-hidden="true" />{x}</li>)}
            </ul>
          </div>
        </div>
      </Section>
      <Section tone="accent">
        <p className="max-w-4xl font-serif text-2xl leading-snug">{c.travel.land}</p>
      </Section>
    </>
  );

  const Sponsors = (
    <>
      <PageHead kicker={c.sponsors.kicker} title={sp.title} short={sp.short} c={c} h1Ref={h1Ref} />
      <section className="border-b border-border bg-primary text-primary-foreground">
        <dl className="mx-auto grid max-w-6xl px-5 py-10 lg:px-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1.5rem" }}>
          {sp.stats.map(([n, l]) => (
            <div key={l}><dt className="sr-only">{l}</dt><dd><span className="block font-serif text-5xl font-light">{n}</span><span className="mt-1 block text-sm">{l}</span></dd></div>
          ))}
        </dl>
      </section>
      <Section>
        <div className="flex flex-wrap gap-12">
          <div className="min-w-0" style={{ flex: "1 1 360px" }}>
            <H2>{sp.reachTitle}</H2>
            <ul className="mt-6 space-y-3">{sp.reach.map((r) => <li key={r} className="flex gap-3 text-lg text-foreground"><Check size={18} className="mt-1 shrink-0 text-secondary" aria-hidden="true" />{r}</li>)}</ul>
            <p className="mt-6 text-base leading-7 text-muted-foreground">{sp.beyond}</p>
          </div>
          <div className="min-w-0" style={{ flex: "1.2 1 400px" }}>
            <H2>{sp.whyTitle}</H2>
            <dl className="mt-6 space-y-5">{sp.why.map(([t, d]) => <div key={t} className="border-l-2 border-secondary pl-4"><dt className="font-bold text-primary">{t}</dt><dd className="mt-1 text-base leading-7 text-muted-foreground">{d}</dd></div>)}</dl>
          </div>
        </div>
      </Section>
      <Section tone="card">
        <H2>{sp.ladderTitle}</H2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">{sp.ladderIntro}</p>
        <div className="mt-6"><TierLadder tiers={sp.tiers} levelWord={sp.levelWord} logoWord={sp.logoWord} sizeNames={sp.sizeNames} /></div>
        <h3 className="mt-14 font-serif text-2xl font-semibold text-primary">{sp.tiersTitle}</h3>
        <div className="mt-6 grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))" }}>
          {sp.tiers.map((t, k) => (
            <article key={t.id} className={`flex flex-col p-6 ${k === 0 ? "border-2 border-primary bg-primary text-primary-foreground" : k === 1 ? "border-2 border-primary bg-accent text-accent-foreground" : k === 4 ? "border border-dashed border-border bg-background" : "border border-border bg-background"}`} style={{ borderRadius: "var(--radius)", gridColumn: k < 2 ? "1 / -1" : undefined }}>
              <p className={`mb-3 flex items-center gap-2 text-xs font-bold uppercase ${k === 0 ? "" : "text-primary"}`} style={{ letterSpacing: "0.16em" }}><LevelBadge n={k + 1} light={k === 0} />{sp.levelWord} {k + 1} · {t.level}</p>
              <p className={`text-xs uppercase ${k === 0 ? "text-accent" : "text-secondary"}`} style={{ letterSpacing: "0.2em" }}>{t.avail}</p>
              <h3 className={`mt-3 font-serif font-semibold ${k < 2 ? "text-4xl" : "text-2xl"} ${k === 0 ? "" : "text-primary"}`}>{t.name}</h3>
              <p className={`mt-1 font-serif font-light ${k < 2 ? "text-4xl" : "text-3xl"}`}>{t.price}</p>
              <p className={`mt-4 text-base leading-7 ${k === 0 ? "" : "text-muted-foreground"}`}>{t.pitch}</p>
              <p className={`mt-5 text-xs font-bold uppercase ${k === 0 ? "text-accent" : "text-muted-foreground"}`} style={{ letterSpacing: "0.18em" }}>{sp.perks}</p>
              <ul className={`mt-3 flex-1 gap-x-8 gap-y-2 ${k < 2 ? "grid" : "space-y-2"}`} style={k < 2 ? { gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))" } : undefined}>{t.benefits.map((b) => <li key={b} className="flex gap-2 text-sm leading-6"><Check size={16} className={`mt-1 shrink-0 ${k === 0 ? "text-accent" : "text-secondary"}`} aria-hidden="true" />{b}</li>)}</ul>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">{sp.allNamed}</p>
      </Section>
      <Section>
        <div className="flex flex-wrap gap-12">
          <div className="min-w-0" style={{ flex: "1.2 1 400px" }}>
            <H2>{sp.addonsTitle}</H2>
            <p className="mt-3 text-base text-muted-foreground">{sp.addonsIntro}</p>
            <table className="mt-6 w-full text-left text-base">
              <caption className="sr-only">{sp.addonsTitle}</caption>
              <tbody>{sp.addons.map(([n, pr, d]) => <tr key={n} className="border-b border-border"><th scope="row" className="py-4 pr-4 align-top font-bold text-primary">{n}<span className="mt-1 block text-sm font-normal text-muted-foreground">{d}</span></th><td className="whitespace-nowrap py-4 text-right align-top font-serif text-lg">{pr}</td></tr>)}</tbody>
            </table>
          </div>
          <div className="min-w-0 bg-accent p-6 text-accent-foreground" style={{ flex: "1 1 320px", borderRadius: "var(--radius)" }}>
            <h3 className="font-serif text-xl font-semibold">{sp.inkindTitle}</h3>
            <ul className="mt-4 space-y-2">{sp.inkind.map((x) => <li key={x} className="text-base leading-7">· {x}</li>)}</ul>
            <p className="mt-4 text-sm leading-6">{sp.inkindNote}</p>
          </div>
        </div>
      </Section>
      <Section tone="card">
        <H2>{sp.wallTitle}</H2>
        <p className="mt-3 text-base text-muted-foreground">{sp.wallIntro}</p>
        <div className="mt-8"><SponsorWall tiers={sp.tiers} slotLabel={sp.slot} /></div>
      </Section>
      <Section>
        <H2>{sp.approachTitle}</H2>
        <dl className="mt-8 grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>{sp.approach.map(([t, d]) => <div key={t}><dt className="font-serif text-xl font-semibold text-primary">{t}</dt><dd className="mt-2 text-base leading-7 text-muted-foreground">{d}</dd></div>)}</dl>
      </Section>
      <Section tone="primary">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div><H2 light>{sp.ctaTitle}</H2><p className="mt-3 text-lg">{sp.ctaBody}</p></div>
          <a href={`mailto:${LINKS.sponsor}?subject=${encodeURIComponent(sp.subject)}`} className="inline-flex min-h-12 items-center gap-3 bg-primary-foreground px-7 py-3 text-sm font-bold uppercase tracking-widest text-primary" style={{ borderRadius: "var(--radius)" }}><Mail size={16} aria-hidden="true" />{sp.cta}</a>
        </div>
      </Section>
    </>
  );

  const Team = (
    <>
      <PageHead kicker={c.team.kicker} title={c.team.title} short={c.team.short} c={c} h1Ref={h1Ref} />
      <Section>
        <div className="flex flex-wrap gap-6">
          <div className="min-w-0 self-start bg-primary p-8 text-primary-foreground" style={{ flex: "1 1 260px", borderRadius: "var(--radius)" }}>
            <ClarityLogo fg="var(--primary-foreground)" moon="var(--marker)" className="h-8 w-auto" />
            <p className="mt-5 text-lg leading-8">{c.team.clarityBody}</p>
          </div>
          <ul className="grid min-w-0 gap-4" style={{ flex: "2 1 520px", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))" }}>
            {TEAM.map((m) => (
              <li key={m.name} className="border border-border bg-card p-5" style={{ borderRadius: "var(--radius)" }}>
                {m.img ? <Portrait src={m.img} initials={m.initials} alt={lang === "fr" ? `Portrait de ${m.name}` : `Portrait of ${m.name}`} className="block aspect-square w-full text-5xl" /> : <div className="flex aspect-square w-full items-center justify-center bg-accent font-serif text-5xl text-accent-foreground" aria-hidden="true">{m.initials}</div>}
                <p className="mt-4 text-lg"><MemberName m={m} lang={lang} nw={nw} /></p>
                <p className="text-base text-muted-foreground">{m.role ? m.role[lang] : c.team.tbcRole}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <Section tone="accent">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-2xl">{c.team.volunteer}</p>
          <BtnGhost href={`mailto:${lang === "fr" ? LINKS.bonjour : LINKS.hello}?subject=${encodeURIComponent(c.team.volunteerSubject)}`} label="">{c.team.volunteerCta}</BtnGhost>
        </div>
      </Section>
    </>
  );

  const Contact = (
    <>
      <PageHead kicker={c.contact.kicker} title={c.contact.title} short={c.contact.short} c={c} h1Ref={h1Ref} />
      <Section>
        <ul className="border-t border-border">
          {c.contact.rows.map(([label, key]) => {
            const email = LINKS[key as keyof typeof LINKS];
            return (
              <li key={key} className="flex flex-col gap-3 border-b border-border py-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
                  <a className="mt-1 block font-serif text-2xl text-primary underline sm:text-3xl" href={`mailto:${email}`}>{email}</a>
                </div>
                <button onClick={() => copy(email)} className="inline-flex min-h-11 items-center gap-2 border border-border px-4 font-bold text-primary hover:bg-muted">
                  <Copy size={16} aria-hidden="true" /> {c.meta.copy}
                </button>
              </li>
            );
          })}
        </ul>
      </Section>
      <Section tone="card">
        <H2>{lang === "fr" ? "Trousse média : logo Clarity" : "Media kit: Clarity logo"}</H2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">{lang === "fr" ? "Fichiers SVG vectoriels à fond transparent. Laissez un espace libre égal à la hauteur de la lune autour du logo." : "Vector SVG files with transparent backgrounds. Keep clear space equal to the height of the moon around the logo."}</p>
        <ul className="mt-8 grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))" }}>
          {LOGO_VARIANTS.map((v) => (
            <li key={v.id} className="border border-border" style={{ borderRadius: "var(--radius)" }}>
              <div className={`flex h-28 items-center justify-center p-6 ${v.dark ? "bg-primary" : "bg-background"}`} style={{ borderTopLeftRadius: "var(--radius)", borderTopRightRadius: "var(--radius)" }}>
                {v.mark ? (
                  <svg viewBox="0 0 62 62" className="h-12 w-12" role="img" aria-label={v.label}><path d={LOGO_C} fill={v.fg} /><path d={LOGO_MOON} fill={v.moon} /></svg>
                ) : (
                  <ClarityLogo fg={v.fg} moon={v.moon} className="h-7 w-auto" title={v.label} />
                )}
              </div>
              <button onClick={() => triggerUserFileDownload({ content: new Blob([logoSvg(v.fg, v.moon, v.mark)], { type: "image/svg+xml" }), filename: `${v.id}.svg` })} className="flex w-full items-center justify-between px-4 py-3 text-sm font-bold text-primary hover:bg-muted">
                {v.label} · SVG <Download size={16} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );

  const A11y = (
    <>
      <PageHead kicker={c.accessibility.kicker} title={c.accessibility.title} short={c.accessibility.short} c={c} h1Ref={h1Ref} />
      <Section>
        <H2>{c.accessibility.featuresTitle}</H2>
        <dl className="mt-8 grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {c.accessibility.features.map(([t, d]) => (
            <div key={t} className="border-t-4 border-secondary bg-card p-6">
              <dt className="text-xl font-bold text-primary">{t}</dt>
              <dd className="mt-2 text-base leading-7 text-muted-foreground">{d}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <BtnPrimary onClick={() => setPrefsOpen(true)}><UniversalAccess size={18} /> {c.meta.prefs}</BtnPrimary>
          <p className="text-base text-muted-foreground">{c.accessibility.feedback} <a className="font-bold text-primary underline" href={`mailto:${lang === "fr" ? LINKS.bonjour : LINKS.hello}`}>{lang === "fr" ? LINKS.bonjour : LINKS.hello}</a></p>
        </div>
      </Section>
    </>
  );

  const pages: Record<PageId, ReactNode> = {
    home: Home,
    programme: Programme,
    speakers: Speakers,
    cfp: Cfp,
    register: Register,
    travel: Travel,
    sponsors: Sponsors,
    team: Team,
    contact: Contact,
    accessibility: A11y,
  };

  const NavLink = ({ id }: { id: PageId }) => (
    <button
      onClick={() => go(id)}
      aria-current={page === id ? "page" : undefined}
      className={`relative py-2 text-base font-bold transition-colors ${page === id ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
    >
      {c.nav[id]}
      {page === id && <span className="absolute inset-x-0 -bottom-1 h-1 rounded-full bg-primary" aria-hidden="true" />}
    </button>
  );

  return (
    <FrameRoot theme={activeTheme} className={`c27 min-h-screen bg-background font-sans text-foreground ${prefs.spacing ? "c27-spacing" : ""}`}>
      <style>{GLOBAL_CSS}</style>
      <div lang={lang} style={{ zoom: prefs.size }}>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground">{c.meta.skip}</a>
        <p className="sr-only" aria-live="polite">{announce}</p>

        {/* Announcement */}
        <div className="bg-primary px-5 py-2.5 text-center text-sm text-primary-foreground">
          <span>{c.banner.text}</span>{" "}
          <button onClick={() => go("cfp")} className="font-bold underline">{c.banner.cta}</button>
        </div>

        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border bg-background">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
            <button onClick={() => go("home")} className="flex items-center gap-2.5 text-left" aria-label={`Clarity2027, ${c.nav.home}`}>
              <ClarityLogo className="h-6 w-auto" title="" />
              <span className="font-serif text-xl font-light text-primary" aria-hidden="true" style={{ letterSpacing: "0.06em" }}>2027</span>
            </button>
            <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
              {PRIMARY_NAV.map((id) => <NavLink key={id} id={id} />)}
            </nav>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang(lang === "en" ? "fr" : "en")}
                className="min-h-11 px-3 text-sm font-bold text-primary underline"
                lang={lang === "en" ? "fr" : "en"}
                aria-label={c.meta.langSwitch}
              >
                {lang === "en" ? "FR" : "EN"}
              </button>
              <button
                onClick={() => setPrefsOpen(!prefsOpen)}
                aria-expanded={prefsOpen}
                aria-controls="prefs"
                className={`inline-flex h-11 items-center justify-center gap-2 rounded-md border px-3 ${prefsOpen ? "border-primary bg-primary text-primary-foreground" : "border-border text-primary hover:bg-muted"}`}
                aria-label={c.meta.prefs}
                title={c.meta.prefs}
              >
                <UniversalAccess size={22} />
                <span className="hidden text-sm font-bold xl:inline">{lang === "fr" ? "Affichage" : "Display"}</span>
              </button>
              <button onClick={() => go("register")} className="c27-cta hidden min-h-11 items-center gap-2 rounded-md bg-secondary px-5 text-sm font-bold uppercase tracking-widest text-secondary-foreground sm:inline-flex">
                {c.nav.register} <ArrowRight size={14} aria-hidden="true" />
              </button>
              <button onClick={() => setMenu(!menu)} className="inline-flex h-11 w-11 items-center justify-center border border-border text-primary lg:hidden" aria-expanded={menu} aria-label={menu ? c.meta.close : c.meta.menu}>
                {menu ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {prefsOpen && (
            <div id="prefs" className="border-t border-border bg-card">
              <div className="mx-auto max-w-6xl px-5 py-6 lg:px-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-primary">{c.meta.prefs}</h2>
                    <p className="text-sm text-muted-foreground">{c.meta.prefsIntro}</p>
                  </div>
                  <button onClick={() => setPrefsOpen(false)} className="inline-flex h-10 w-10 items-center justify-center text-primary" aria-label={c.meta.close}><X size={18} /></button>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-6">
                  <div role="group" aria-label={c.meta.textSize} className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{c.meta.textSize}</span>
                    {[1, 1.15, 1.3].map((s, k) => (
                      <button key={s} onClick={() => setPrefs({ ...prefs, size: s })} aria-pressed={prefs.size === s} className={`h-10 w-12 border font-bold ${prefs.size === s ? "border-primary bg-primary text-primary-foreground" : "border-border text-primary"}`} style={{ fontSize: `${0.85 + k * 0.2}rem` }}>
                        A
                      </button>
                    ))}
                  </div>
                  {([["contrast", c.meta.contrast], ["spacing", c.meta.spacing], ["motion", c.meta.motion]] as const).map(([key, label]) => (
                    <button key={key} role="switch" aria-checked={prefs[key]} onClick={() => setPrefs({ ...prefs, [key]: !prefs[key] })} className="flex items-center gap-3 text-sm font-bold text-foreground">
                      <span className={`relative h-6 w-11 rounded-full border-2 transition-colors ${prefs[key] ? "border-primary bg-primary" : "border-muted-foreground bg-card"}`} aria-hidden="true">
                        <span className={`absolute top-0.5 h-4 w-4 rounded-full transition-all ${prefs[key] ? "left-5 bg-primary-foreground" : "left-0.5 bg-muted-foreground"}`} />
                      </span>
                      {label}
                    </button>
                  ))}
                  <button onClick={() => setPrefs(DEFAULT_PREFS)} className="text-sm font-bold text-secondary underline">{c.meta.reset}</button>
                </div>
              </div>
            </div>
          )}

          {menu && (
            <nav className="border-t border-border bg-background lg:hidden" aria-label="Mobile">
              <ul className="mx-auto max-w-6xl px-5 py-3">
                {(["home", "programme", "speakers", "travel", "cfp", "register", "sponsors", "team", "contact"] as PageId[]).map((id) => (
                  <li key={id}>
                    <button onClick={() => go(id)} aria-current={page === id ? "page" : undefined} className={`flex w-full items-center justify-between border-b border-border py-4 text-left text-lg font-bold ${page === id ? "text-secondary" : "text-primary"}`}>
                      {c.nav[id]} <ArrowRight size={18} aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </header>

        <main id="main" className="pb-20 sm:pb-0">
          <AnimatePresence mode="wait">
            <motion.div key={page + lang} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.25 }}>
              {pages[page]}
            </motion.div>
          </AnimatePresence>
          {page !== "sponsors" && (
            <section className="border-t border-border bg-card" aria-labelledby="sponsor-strip">
              <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h2 id="sponsor-strip" className="text-xs font-bold uppercase text-muted-foreground" style={{ letterSpacing: "0.24em" }}>{lang === "fr" ? "Merci à nos commanditaires" : "Thank you to our sponsors"}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{sp.wallIntro}</p>
                  </div>
                  <button onClick={() => go("sponsors")} className="inline-flex items-center gap-2 text-sm font-bold text-secondary underline decoration-2 underline-offset-4">{sp.homeCta} <ArrowRight size={14} aria-hidden="true" /></button>
                </div>
                <div className="mt-6 space-y-3" aria-label={sp.wallTitle} role="list">
                  {sp.tiers.map((t, n) => (
                    <div key={t.id} role="listitem" className="flex flex-wrap items-center gap-4 border-t border-border pt-3">
                      <p className="flex w-48 shrink-0 items-center gap-2"><LevelBadge n={n + 1} /><span><span className="block text-sm font-bold text-primary">{t.name}</span><span className="block text-xs text-muted-foreground">{t.level}</span></span></p>
                      <ul className="grid min-w-0 flex-1 gap-3" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${{ xl: "100%", lg: "70%", md: "170px", sm: "110px" }[t.size]}), 1fr))` }} aria-label={t.name}>
                        {Array.from({ length: t.slots }).map((_, k) => (
                          <li key={k} className={`flex items-center justify-center border border-dashed border-border bg-background ${{ xl: "h-20", lg: "h-16", md: "h-12", sm: "h-10" }[t.size]}`} style={{ borderRadius: "var(--radius)" }}>
                            <span className={`uppercase text-muted-foreground ${t.size === "xl" ? "text-sm" : "text-xs"}`} style={{ letterSpacing: "0.16em" }}>{sp.slot}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
            <div className="grid gap-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
              <div>
                <p className="flex items-center gap-3"><ClarityLogo fg="var(--primary-foreground)" moon="var(--marker)" className="h-7 w-auto" /><span className="font-serif text-2xl font-light" style={{ letterSpacing: "0.06em" }}>2027</span></p>
                <p className="mt-3 font-serif text-lg">{c.footer.tagline}</p>
                <p className="mt-4 text-sm">{c.facts.dates}<br />{c.facts.city}</p>
              </div>
              {([[c.footer.explore, ["home", "programme", "speakers", "travel"]], [c.footer.take, ["register", "cfp", "sponsors", "team"]], [c.footer.help, ["contact", "accessibility"]]] as [string, PageId[]][]).map(([title, ids]) => (
                <nav key={title} aria-label={title}>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-accent">{title}</h2>
                  <ul className="mt-4 space-y-2">
                    {ids.map((id) => <li key={id}><button onClick={() => go(id)} className="text-base hover:underline">{c.nav[id]}</button></li>)}
                    {title === c.footer.help && (
                      <li><button onClick={() => setLang(lang === "en" ? "fr" : "en")} className="text-base hover:underline" lang={lang === "en" ? "fr" : "en"}>{c.meta.langName}</button></li>
                    )}
                  </ul>
                </nav>
              ))}
            </div>
            <p className="mt-12 border-t border-primary-foreground pt-6 text-sm">{c.footer.rights}</p>
          </div>
        </footer>

        {/* Mobile sticky CTA */}
        <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-border bg-background p-3 sm:hidden">
          <Ext href={LINKS.register} label={nw} className="c27-cta flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md bg-secondary font-bold text-secondary-foreground"><Ticket size={16} aria-hidden="true" />{c.nav.register}</Ext>
          <button onClick={() => go("cfp")} className="flex min-h-12 flex-1 items-center justify-center gap-2 border-2 border-primary font-bold text-primary"><Mic size={16} aria-hidden="true" />{lang === "fr" ? "Proposer" : "Propose"}</button>
        </div>

        {toast && (
          <div role="status" className="fixed bottom-20 left-1/2 z-40 -translate-x-1/2 bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-xl sm:bottom-6">{toast}</div>
        )}
      </div>
    </FrameRoot>
  );
}
