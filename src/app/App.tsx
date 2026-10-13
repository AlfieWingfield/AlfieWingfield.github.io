import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { ChevronDown, ExternalLink } from "lucide-react";
import uooLogo from "../imports/UoO.jpg";
import jcoLogo from "../imports/jco.png";
import cdtLogo from "../imports/CDT_logo.png";
import profilePhoto from "../assets/profile/CDT_Photo_AW.jpg";
import projectWgm from "../assets/projects/wgm.jpg";
import projectTc from "../assets/projects/tc_lab.jpg";
import workLsi from "../assets/works/NatSci_Logo.png";
import workConference from "../assets/works/Scale_Up_Conference_2026_Cover_Slides.jpg";
import workDarkroom from "../assets/works/darkroom.JPG";
import workPlant from "../assets/works/plant.jpg";

const DISPLAY = "'Raleway', sans-serif";
const BODY = "'DM Sans', sans-serif";

// ── Primitives ──────────────────────────────────────────────────────────────

function FullDivider() {
  return <div className="h-px w-full bg-black" />;
}

function InsetDivider() {
  return (
    <div className="flex">
      <div className="flex-1 h-px bg-black" />
      <div className="w-10 flex-shrink-0" />
      <div className="flex-1 h-px bg-black" />
    </div>
  );
}

function ImagePlaceholder({ aspect = "aspect-video" }: { aspect?: string }) {
  return <div className={`w-full ${aspect} bg-neutral-100`} />;
}

function PageHeading({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className="text-[clamp(40px,6vw,90px)] leading-none uppercase font-light tracking-wide"
      style={{ fontFamily: DISPLAY }}
    >
      {children}
    </h1>
  );
}

function TableRow({ title, detail, year, note }: { title: string; detail?: string; year?: string | number; note?: string }) {
  return (
    <div className="py-3" style={{ fontFamily: BODY }}>
      {/* Mobile: stacked */}
      <div className="sm:hidden">
        <span className="text-sm font-medium text-[#111] block">{title}</span>
        {note && <span className="text-xs text-neutral-500 block mt-2">{note}</span>}
        <div className="flex justify-between gap-2 mt-1">
          <span className="text-xs text-neutral-400 uppercase tracking-widest">{detail ?? ""}</span>
          <span className="text-xs text-neutral-400 tabular-nums whitespace-nowrap">{year ?? ""}</span>
        </div>
      </div>
      {/* Desktop: 3-column grid */}
      <div className="hidden sm:grid items-baseline gap-x-6" style={{ gridTemplateColumns: "1fr 220px 130px" }}>
        <div>
          <span className="text-sm font-medium text-[#111]">{title}</span>
          {note && <span className="text-xs text-neutral-500 block mt-1 pb-1">{note}</span>}
        </div>
        <span className="text-xs text-neutral-400 uppercase tracking-widest">{detail ?? ""}</span>
        <span className="text-xs text-neutral-400 tabular-nums text-right whitespace-nowrap">{year ?? ""}</span>
      </div>
    </div>
  );
}

function LinkTableRow({ title, detail, year, href, note }: { title: string; detail?: string; year?: string; href: string; note?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block py-3 hover:bg-neutral-50 transition-colors group"
      style={{ fontFamily: BODY }}
    >
      {/* Mobile: stacked */}
      <div className="sm:hidden">
        <span className="text-sm font-medium text-[#111] group-hover:underline underline-offset-2 block">{title}</span>
        {note && <span className="text-xs text-neutral-500 block mt-2">{note}</span>}
        <div className="flex justify-between gap-2 mt-1">
          <span className="text-xs text-neutral-400 uppercase tracking-widest">{detail ?? ""}</span>
          <span className="text-xs text-neutral-400 tabular-nums whitespace-nowrap">{year ?? ""}</span>
        </div>
      </div>
      {/* Desktop: 3-column grid */}
      <div className="hidden sm:grid items-baseline gap-x-6" style={{ gridTemplateColumns: "1fr 220px 130px" }}>
        <div>
          <span className="text-sm font-medium text-[#111] group-hover:underline underline-offset-2">{title}</span>
          {note && <span className="text-xs text-neutral-500 block mt-1 pb-1">{note}</span>}
        </div>
        <span className="text-xs text-neutral-400 uppercase tracking-widest truncate">{detail ?? ""}</span>
        <span className="text-xs text-neutral-400 tabular-nums text-right whitespace-nowrap">{year ?? ""}</span>
      </div>
    </a>
  );
}

// Row that is always expanded — used for awards and news
function StaticExpandedRow({ title, detail, year, description, link }: {
  title: string; detail?: string; year?: string; description?: string;
  link?: { label: string; href: string };
}) {
  return (
    <div style={{ fontFamily: BODY }}>
      {/* Mobile: stacked */}
      <div className="sm:hidden py-3">
        <span className="text-sm font-medium text-[#111] block">{title}</span>
        <div className="flex justify-between gap-2 mt-1">
          <span className="text-xs text-neutral-400 uppercase tracking-widest">{detail ?? ""}</span>
          <span className="text-xs text-neutral-400 tabular-nums whitespace-nowrap">{year ?? ""}</span>
        </div>
        {description && <p className="text-xs text-neutral-500 leading-relaxed mt-2 pb-1">{description}</p>}
        {link && (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
          >
            {link.label}
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        )}
      </div>
      {/* Desktop: 3-column grid */}
      <div className="hidden sm:block">
        <div className="grid h-10 items-baseline gap-x-6 py-3 overflow-visible" style={{ gridTemplateColumns: "1fr 220px 130px" }}>
          <span className="text-sm font-medium text-[#111]">{title}</span>
          <span className="min-w-0 text-xs text-neutral-400 uppercase tracking-widest whitespace-normal break-words leading-tight">{detail ?? ""}</span>
          <span className="text-xs text-neutral-400 tabular-nums text-right whitespace-nowrap">{year ?? ""}</span>
        </div>
        {description && <p className="text-xs text-neutral-500 leading-relaxed pb-4">{description}</p>}
        {link && (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 text-[10px] uppercase tracking-widest text-neutral-400 hover:text-black transition-colors pb-4 ${description ? "" : "mt-5"}`}
          >
            {link.label}
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        )}
      </div>
    </div>
  );
}

// Accordion row — controlled externally
function AccordionRow({ title, detail, year, description, link, open, onClick }: {
  title: string; detail?: string; year?: string; description?: string;
  link?: { label: string; href: string }; open: boolean; onClick: () => void;
}) {
  return (
    <div className={open ? "cursor-default" : "cursor-pointer"} onClick={onClick} style={{ fontFamily: BODY }}>
      {/* Mobile: stacked */}
      <div className={`sm:hidden py-3 select-none transition-colors ${open ? "" : "hover:bg-neutral-50"}`}>
        <span className="text-sm font-medium text-[#111] block">{title}</span>
        <div className="flex justify-between gap-2 mt-1">
          <span className="text-xs text-neutral-400 uppercase tracking-widest">{detail ?? ""}</span>
          <span className="text-xs text-neutral-400 tabular-nums whitespace-nowrap">{year ?? ""}</span>
        </div>
      </div>
      {/* Desktop: 3-column grid */}
      <div
        className={`hidden sm:grid items-baseline gap-x-6 py-3 select-none transition-colors ${open ? "" : "hover:bg-neutral-50"}`}
        style={{ gridTemplateColumns: "1fr 220px 130px" }}
      >
        <span className="text-sm font-medium text-[#111]">{title}</span>
        <span className="text-xs text-neutral-400 uppercase tracking-widest truncate">{detail ?? ""}</span>
        <span className="text-xs text-neutral-400 tabular-nums text-right whitespace-nowrap">{year ?? ""}</span>
      </div>
      {open && (description || link) && (
        <div className="pb-4">
          {description && (
            <p className="text-xs text-neutral-500 leading-relaxed mb-2">{description}</p>
          )}
          {link && (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
            >
              {link.label}
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 mt-10 mb-2"
      style={{ fontFamily: BODY }}
    >
      {children}
    </p>
  );
}

function CollapsibleSection({ id, title, children }: {
  id: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-10">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((current) => !current)}
        className="mb-2 flex w-full cursor-pointer items-center justify-between text-left text-[10px] uppercase tracking-[0.25em] text-neutral-400 transition-colors hover:text-black focus-visible:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-black"
        style={{ fontFamily: BODY }}
      >
        <span>{title}</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <FullDivider />
      <div id={id} hidden={!open}>
        {open && children}
      </div>
    </section>
  );
}

// ── Navigation ───────────────────────────────────────────────────────────────

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[10px] uppercase tracking-[0.2em] transition-colors ${
      isActive ? "text-black" : "text-neutral-400 hover:text-black"
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block text-[11px] uppercase tracking-[0.2em] py-3 border-b border-neutral-100 transition-colors ${
      isActive ? "text-black" : "text-neutral-400"
    }`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white" style={{ fontFamily: BODY }}>
      <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
        <NavLink to="/" end onClick={closeMenu} className="text-[10px] uppercase tracking-[0.2em] font-medium text-black hover:text-neutral-400 transition-colors">
          Alfie Wingfield
        </NavLink>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-8">
          <NavLink to="/research" className={navLinkClass}>Research</NavLink>
          <NavLink to="/other-works" className={navLinkClass}>Other Works</NavLink>
          <NavLink to="/" end className={navLinkClass}>About</NavLink>
        </div>

        {/* Mobile burger */}
        <button
          className="sm:hidden flex flex-col justify-center gap-[5px] w-6 h-6 cursor-pointer"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block h-px bg-black transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block h-px bg-black transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px bg-black transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-white px-6 pb-4">
          <NavLink to="/" end onClick={closeMenu} className={mobileNavLinkClass}>About</NavLink>
          <NavLink to="/research" onClick={closeMenu} className={mobileNavLinkClass}>Research</NavLink>
          <NavLink to="/other-works" onClick={closeMenu} className={mobileNavLinkClass}>Other Works</NavLink>
        </div>
      )}
    </nav>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  const affiliations: { name: string; href: string; logo?: string }[] = [
    { name: "University of Oxford", href: "https://www.ox.ac.uk", logo: uooLogo },
    { name: "Engineering Biology CDT", href: "https://engbio-cdt.org", logo: cdtLogo },
    { name: "Jesus College, Oxford", href: "https://www.jesus.ox.ac.uk", logo: jcoLogo },
  ];

  return (
    <footer className="max-w-6xl mx-auto px-6" style={{ fontFamily: BODY }}>
      <FullDivider />
      <div className="py-10 flex flex-col items-center gap-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
          Affiliations &amp; Support
        </p>
        <div className="flex items-center justify-center gap-12 flex-wrap">
          {affiliations.map((a) => (
            <a
              key={a.name}
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={a.name}
              className="opacity-30 hover:opacity-70 transition-opacity duration-300"
            >
              {a.logo ? (
                <img
                  src={a.logo}
                  alt={a.name}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <div className="h-10 px-4 flex items-center justify-center border border-neutral-300">
                  <span className="text-[9px] uppercase tracking-widest text-neutral-400 text-center leading-tight">
                    {a.name}
                  </span>
                </div>
              )}
            </a>
          ))}
        </div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-300">
          &copy; {new Date().getFullYear()} Alfred Wingfield
        </p>
      </div>
    </footer>
  );
}

// ── About Page ────────────────────────────────────────────────────────────────

// ── News & Updates ────────────────────────────────────────────────────────────
// Add an entry for each news item. The most recent (index 0) is expanded by default.
// Fields: title, detail (category e.g. "Event", "Award", "Publication"), year (e.g. "Jun 2026")
// Optional: description (shown when expanded), link: { label, href }
// Example:
//   { title: "New paper published in Nature Biotechnology.", detail: "Publication", year: "Jan 2027", link: { label: "Read paper", href: "https://doi.org/..." } },
const newsItems = [
  {
    title: "I co-organised and hosted Scale Up Conference 2026 in Oxford; bringing together academia and industry to discuss the latest advances in process scale-up, biomanufacturing, chemical engineering and AI.",
    detail: "Event", year: "Jun 2026",
    link: { label: "Find out more", href: "https://sites.google.com/view/scale-up-workshop/2026-conference" },
  },
  {
    title: "I co-organised an interdisciplinary training workshop on process scale-up in biology, chemistry and materials science.",
    detail: "Event", year: "Feb 2026",
    link: { label: "Find out more", href: "https://sites.google.com/view/scale-up-workshop/2026-workshop" },
  },
];

/// ── Publications ─────────────────────────────────────────────────────────────
// Add an entry for each paper. The row is clickable and opens the DOI link.
// Fields: title (paper title), detail (journal name), year, href (DOI URL)
// Example:
//   { title: "Scalable biosynthesis pathways in engineered organisms", detail: "Nature Biotechnology", year: "2026", href: "https://doi.org/10.1038/..." },
const publications: { title: string; authors?: string; detail: string; year: string; href: string }[] = [
];

// ── Presentations ─────────────────────────────────────────────────────────────
// Add an entry for each oral presentation or invited talk.
// Fields: title, detail (conference · location), year
// Example:
//   { title: "Controlling enzyme dynamics with optical resonators", detail: "Gordon Conference · Boston, USA", year: "2027" },
const presentations = [
  {
    title: "Toward Controlled Enzymatic DNA Synthesis via Single-Molecule Detection of TdT Dynamics",
    detail: "Single-Molecule Sensors and NanoSystems International Conference · Rome, Italy",
    year: "2026",
    note: "Koji Masuda, Alfred Wingfield and Frank Vollmer. (Presented by co-author)",
  },
  {
    title: "Towards a Whispering-Gallery Mode Microreactor for De Novo DNA Synthesis",
    detail: "Society for Natural Sciences 8th Annual Student National Conference · Milton Keynes, UK",
    year: "2025",
    note: "Alfred Wingfield, Koji Masuda and Frank Vollmer.",
  },
];

// ── Posters ───────────────────────────────────────────────────────────────────
// Add an entry for each poster presentation.
// Fields: title, detail (event · location), year
// Example:
//   { title: "Optical sensing of enzyme kinetics", detail: "SynBioBeta · San Francisco, USA", year: "2027" },
const posters = [
  { title: "Investigating the Predictive Power of a Dynamic Promoter-based Dataset", detail: "EngBio CDT Summer School", year: "2026" },
];

// ── Awards ────────────────────────────────────────────────────────────────────
// Add an entry for each award or grant. Clicking expands to show the description.
// Fields: title, detail (awarding body), year, description
// Example:
//   { title: "Best Poster Prize", detail: "SynBioBeta Conference", year: "2027", description: "Awarded for outstanding poster presentation." },
const awards = [
  { title: "EPSRC & BBSRC Studentship", detail: "Engineering Biology CDT", year: "2025", description: "Fully-funded scholarship (tuition, stipend + research training support grant) to complete doctoral research." },
  { title: "College Development Disbursement Fund", detail: "Jesus College, Oxford", year: "2025", description: "Awarded funding to co-organise an interdisciplinary training workshop with international speakers." },
  { title: "Vaughan Fund", detail: "Jesus College, Oxford", year: "2025", description: "Funding for a personal photographic project." },
  { title: "Natural Sciences Prize for Outstanding MSci Graduate", detail: "University of Exeter", year: "2025", description: "Awarded to the MSci Natural Sciences student with highest overall academic performance. Graduated top of my class." },
  { title: "Wellcome Trust Biomedical Vacation Scholarship", detail: "Wellcome Trust & University of Edinburgh", year: "2024", description: "Competitive scholarship awarded to fund a two-month research internship." },
  { title: "Dean's Commendation for Exceptional Performance", detail: "University of Exeter", year: "2022, 2023, 2024, 2025", description: "Awarded for exceptional academic performance in each year of my MSci." },
];

function NewsSection() {
  return (
    <>
      <SectionLabel>News &amp; Updates</SectionLabel>
      <FullDivider />
      {newsItems.map((item, i) => (
        <div key={i}>
          <StaticExpandedRow
            title={item.title}
            detail={item.detail}
            year={item.year}
            description={(item as any).description}
            link={(item as any).link}
          />
          <FullDivider />
        </div>
      ))}
    </>
  );
}

function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12" style={{ fontFamily: BODY }}>
      {/* Header: photo + name + bio */}
      <div className="flex flex-col sm:flex-row gap-10 items-start mb-14">
        <div className="w-64 flex-shrink-0">
          <img src={profilePhoto} alt="Alfie Wingfield" className="w-full aspect-square object-cover rounded" />
        </div>
        <div className="flex flex-col">
          <h2
            className="leading-none uppercase font-light tracking-wide mb-3"
            style={{ fontFamily: DISPLAY, fontSize: "clamp(28px,4vw,52px)" }}
          >
            Alfie Wingfield
          </h2>
          <p className="text-xs text-neutral-400 uppercase tracking-widest mb-4">
            Engineering Biology DPhil Student · University of Oxford
          </p>
          <div className="text-sm text-neutral-600 leading-relaxed space-y-2">
            <p>
              I'm an Engineering Biology DPhil student at{" "}
              <a href="https://www.jesus.ox.ac.uk" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 decoration-neutral-300 hover:text-black transition-colors">Jesus College, Oxford</a>
              {" "}and the{" "}
              <a href="https://engbio-cdt.org" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 decoration-neutral-300 hover:text-black transition-colors">Engineering Biology Centre for Doctoral Training</a>.
              {" "}Before starting my DPhil, I completed an MSci in{" "}
              <a href="https://naturalsciences.exeter.ac.uk" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 decoration-neutral-300 hover:text-black transition-colors">Natural Sciences</a> at the University of Exeter 
              and interned at the{" "}
              <a href="https://biology.ed.ac.uk/mammalian-synbio" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 decoration-neutral-300 hover:text-black transition-colors">UK Centre for Mammalian Synthetic Biology</a>.
            </p>
            <p> 
              I'm also a{" "}
              <a href="https://alfiewingfield.github.io/photography-portfolio/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 decoration-neutral-300 hover:text-black transition-colors">photographer</a>, publicity officer for the{" "}
              <a href="https://www.jesuscollegemcr.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 decoration-neutral-300 hover:text-black transition-colors">Jesus College Middle Common Room</a> (MCR) and a proud member of {" "}
              <a href="https://www.93percent.club" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 decoration-neutral-300 hover:text-black transition-colors">The 93% Club</a>.
            </p>
          </div>
          <div className="flex gap-6 mt-4">
            <a
              href="https://www.linkedin.com/in/alfie-wingfield/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 hover:text-black transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/AlfieWingfield"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 hover:text-black transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Research Focus */}
      <SectionLabel>Research Focus</SectionLabel>
      <FullDivider />
      <p className="text-sm text-neutral-600 leading-relaxed py-4">
        Biomanufacturing might be our best hope for reducing the carbon footprint of chemicals and materials production and reducing 
        our dependence on petrochemical feedstocks, but despite decades of promise, large amounts of investment and an impending 
        climate catastrophe, very few biomanufacturing processes have been successfully implemented at the industrial scale needed 
        for tangible impact. This is in part due to the disparity between laboratory experimentation (where conditions are easily 
        controlled and well-mixed) and industrial scale deployment (where reactor conditions are often poorly mixed and harder to 
        control) - alongside several systems level challenges. As a result, many exciting proof-of-concept processes have failed to perform at industrial scale. My research focuses 
        on making biomanufacturing predictable across scales by developing experimental, computational and data-driven approaches that 
        account for the complex environments encountered in industrial bioreactors.
      </p>
      <FullDivider />

      {/* News & Updates */}
      <NewsSection />

      {/* Publications */}
      {publications.length > 0 && (
        <CollapsibleSection id="publications-content" title="Publications">
          {publications.map((item, i) => (
            <div key={i}>
              <LinkTableRow title={item.title} note={item.authors} detail={item.detail} year={item.year} href={item.href} />
              <FullDivider />
            </div>
          ))}
        </CollapsibleSection>
      )}

      {/* Presentations */}
      {presentations.length > 0 && (
        <CollapsibleSection id="presentations-content" title="Presentations">
          {presentations.map((item, i) => (
            <div key={i}>
              <TableRow title={item.title} detail={item.detail} year={item.year} note={item.note} />
              <FullDivider />
            </div>
          ))}
        </CollapsibleSection>
      )}

      {/* Posters */}
      {posters.length > 0 && (
        <CollapsibleSection id="posters-content" title="Posters">
          {posters.map((item, i) => (
            <div key={i}>
              <TableRow title={item.title} detail={item.detail} year={item.year} note={(item as { note?: string }).note} />
              <FullDivider />
            </div>
          ))}
        </CollapsibleSection>
      )}

      {/* Awards & Grants */}
      {awards.length > 0 && (
        <CollapsibleSection id="awards-content" title={<>Awards &amp; Grants</>}>
          {awards.map((item, i) => (
            <div key={i}>
              <StaticExpandedRow title={item.title} detail={item.detail} year={item.year} description={item.description} />
              <FullDivider />
            </div>
          ))}
        </CollapsibleSection>
      )}

      {/* Contact */}
      <SectionLabel>Contact</SectionLabel>
      <FullDivider />
      <p className="text-[10px] sm:text-sm text-neutral-500 py-4" style={{ fontFamily: BODY }}>
        alfred [dot] wingfield [at] eng [dot] ox [dot] ac [dot] uk
      </p>
      <FullDivider />
    </main>
  );
}

// ── Research Page ─────────────────────────────────────────────────────────────

const previousProjects = [
  {
    title: "Single-molecule Sensing of Terminal Deoxynucleotidyl Transferase for Advanced De Novo DNA Synthesis",
    period: "2024 – 2025",
    image: projectWgm,
    description:
      "During my master's I worked at the Living Systems Institute, in the Vollmer Lab (Nano and Quantum Biosensing). My research focused on the application of whispering-gallery mode optical sensing to study the dynamics of terminal deoxynucleotidyl transferase (TdT), the enzyme of choice for an array of emerging enzymatic DNA synthesis platforms. Supervised by Dr. Koji Masuda and Prof. Frank Vollmer.",
    labs: [
      { name: "Vollmer Lab", href: "https://www.vollmerlab.com" },
      { name: "Living Systems Institute", href: "https://www.exeter.ac.uk/research/institutes/livingsystems/" },
    ],
  },
  {
    title: "Synthetic Biology for Safe Gene Therapies for Cancer",
    period: "2024",
    image: projectTc,
    description:
      "Funded by a Wellcome Trust Biomedical Vacation Scholarship, I undertook an 8-week summer internship at the University of Edinburgh. Working in Prof. Susan Rosser's lab, my internship focused on the development of new genetic engineering tools that capitalise on alternative RNA splicing events in mammalian tissues. Supervised by Dr. Adam Mol and Prof. Susan Rosser.",
    labs: [
      { name: "Rosser Lab", href: "https://rosser.bio.ed.ac.uk" },
      { name: "UK Centre for Mammalian Synthetic Biology", href: "https://biology.ed.ac.uk/mammalian-synbio" },
    ],
  },
];

function ProjectRow({ left, right }: { left: typeof previousProjects[0]; right?: typeof previousProjects[0] }) {
  const cell = (project: typeof previousProjects[0] | undefined, col: number) => {
    if (!project) return null;
    return (
      <>
        {/* image */}
        <div style={{ gridColumn: col, gridRow: 1, padding: "2rem 2rem 1rem" }}>
          <img src={project.image} alt={project.title} className="w-full aspect-video object-cover" />
        </div>
        {/* title + period */}
        <div style={{ gridColumn: col, gridRow: 2, padding: "0 2rem" }} className="flex items-baseline justify-between gap-4">
          <p className="text-xs font-medium uppercase tracking-widest text-[#111]" style={{ fontFamily: BODY }}>
            {project.title}
          </p>
          <span className="text-xs text-neutral-400 tabular-nums flex-shrink-0">{project.period}</span>
        </div>
        {/* description */}
        <div style={{ gridColumn: col, gridRow: 3, padding: "0.5rem 2rem 0" }}>
          <p className="text-xs text-neutral-500 leading-relaxed">{project.description}</p>
        </div>
        {/* labs */}
        <div style={{ gridColumn: col, gridRow: 4, padding: "0.75rem 2rem 2rem" }} className="flex flex-wrap gap-3">
          {project.labs.map((lab) => (
            <a
              key={lab.name}
              href={lab.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
            >
              {lab.name}
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          ))}
        </div>
      </>
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1px 1fr",
        gridTemplateRows: "auto auto 1fr auto",
      }}
    >
      {cell(left, 1)}
      {/* vertical divider spanning all rows */}
      <div style={{ gridColumn: 2, gridRow: "1 / -1", background: "black" }} />
      {cell(right, 3)}
    </div>
  );
}

function ProjectGrid({ projects }: { projects: typeof previousProjects }) {
  const rows: (typeof previousProjects)[] = [];
  for (let i = 0; i < projects.length; i += 2) {
    rows.push(projects.slice(i, i + 2));
  }
  return (
    <div>
      {/* Mobile: single column stack */}
      <div className="sm:hidden">
        {projects.map((project, i) => (
          <div key={i}>
            <div className="py-6">
              <img src={project.image} alt={project.title} className="w-full aspect-video object-cover" />
              <div className="flex items-baseline justify-between gap-4 mt-3">
                <p className="text-xs font-medium uppercase tracking-widest text-[#111]">{project.title}</p>
                <span className="text-xs text-neutral-400 tabular-nums flex-shrink-0">{project.period}</span>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed mt-2">{project.description}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                {project.labs.map((lab) => (
                  <a key={lab.name} href={lab.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-neutral-400 hover:text-black transition-colors">
                    {lab.name}<ExternalLink className="w-2.5 h-2.5" />
                  </a>
                ))}
              </div>
            </div>
            {i < projects.length - 1 && <FullDivider />}
          </div>
        ))}
      </div>
      {/* Desktop: side-by-side with vertical divider */}
      <div className="hidden sm:block">
      {rows.map((row, ri) => (
        <div key={ri}>
          <ProjectRow left={row[0]} right={row[1]} />
          {ri < rows.length - 1 && <InsetDivider />}
        </div>
      ))}
      </div>
    </div>
  );
}

function ResearchPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12" style={{ fontFamily: BODY }}>
      <PageHeading>Research</PageHeading>
      <div className="mt-2 mb-6"><FullDivider /></div>
      <p className="text-sm text-neutral-500 leading-relaxed mb-8">
        Details about my current research will be shared soon. In the meantime, you can explore my previous projects below.
      </p>
      <SectionLabel>Previous Projects</SectionLabel>
      <FullDivider />
      <ProjectGrid projects={previousProjects} />
    </main>
  );
}

// ── Other Works Page ──────────────────────────────────────────────────────────

interface WorkEntry {
  title: string;
  description: string;
  links: { label: string; href: string }[];
}

interface WorkSection {
  section: string;
  entries: WorkEntry[];
}

interface WorkEntryWithImage extends WorkEntry {
  image?: string;
}

interface WorkSectionWithImages extends WorkSection {
  entries: WorkEntryWithImage[];
}

const otherWorksSections: WorkSectionWithImages[] = [
  {
    section: "Science Community",
    entries: [
      {
        title: "Scale Up Conference & Workshop",
        image: workConference,
        description:
          "I'm co-organising Scale Up Conference 2026 — a meeting for those working at the cutting edge of process scale-up and those rethinking how we do things. The event is hosted at Jesus College, Oxford and is supported by the college's Major Research Grants Fund. Previously, I also co-organised a successful pilot workshop with the same focus, funded by the college's Development Disbursement Fund, bringing in speakers from across Europe.",
        links: [
          { label: "Website", href: "https://sites.google.com/view/scale-up-workshop/2026-conference" },
          { label: "Workshop recap", href: "https://www.youtube.com/watch?v=Yi1gWjatjec" },
        ],
      },
      {
        title: "Natural Sciences Community @ Exeter",
        image: workLsi,
        description:
          "During my time at Exeter, I played an active role in the Natural Sciences community — serving as treasurer for the society and representing the department at university open days. I also represented Exeter Natural Sciences at the Society for Natural Sciences 8th annual student conference, where I gave a talk on my master's research.",
        links: [],
      },
    ],
  },
  {
    section: "Misc",
    entries: [
      {
        title: "Photography",
        image: workDarkroom,
        description:
          "Outside of science I'm a photographer. I particularly focus on street and documentary work and almost exclusively shoot on 35mm film. Some of my work can be explored below.",
        links: [
          { label: "Portfolio", href: "https://alfiewingfield.github.io/photography-portfolio" },
        ],
      },
    ],
  },
];

function WorkSubEntry({ entry }: { entry: WorkEntryWithImage }) {
  return (
    <div className="flex flex-col sm:flex-row gap-8 py-6 items-start">
      {/* text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#111] mb-2">{entry.title}</p>
        <p className="text-xs text-neutral-500 leading-relaxed mb-3">{entry.description}</p>
        {entry.links.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {entry.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
              >
                {link.label}
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            ))}
          </div>
        )}
      </div>
      {/* smaller image */}
      <div className="w-full sm:w-96 flex-shrink-0">
        {entry.image && <img src={entry.image} alt={entry.title} className="w-full aspect-video object-cover" />}
      </div>
    </div>
  );
}

function OtherWorksPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12" style={{ fontFamily: BODY }}>
      <PageHeading>Other Works</PageHeading>
      <div className="mt-2"><FullDivider /></div>

      {otherWorksSections.map((section, si) => (
        <div key={si}>
          {/* Section heading — styled like current entry title */}
          <p className="text-sm font-semibold text-[#111] uppercase tracking-widest mt-10 mb-0">
            {section.section}
          </p>
          <FullDivider />
          {section.entries.map((entry, ei) => (
            <div key={ei}>
              <WorkSubEntry entry={entry} />
              {ei < section.entries.length - 1 && <FullDivider />}
            </div>
          ))}
          <FullDivider />
        </div>
      ))}
    </main>
  );
}

// ── App Root ──────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-[#111] flex flex-col">
        <Nav />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<AboutPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/other-works" element={<OtherWorksPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
