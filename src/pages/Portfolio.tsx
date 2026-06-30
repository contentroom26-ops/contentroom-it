import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolioSigillo from "@/assets/portfolio-sigillo.jpg";
import portfolioSetupEvents from "@/assets/portfolio-setupevents.jpg";

const CELESTE = "hsl(192 49% 76%)";

/*
  PROVA: stesso video/overlay di GlobalVideoBackground, ma contenuto solo
  in questa sezione (position: absolute dentro un genitore relative),
  non più fixed su tutta la viewport. Se la prova non convince, basta
  rimuovere questo componente e il suo utilizzo qui sotto — non tocca
  nessun altro file, l'effetto è isolato a questa sola sezione.
*/
const PortfolioSectionVideoBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
      src="/global-bg.mp4"
    />
    <div className="absolute inset-0" style={{ background: "hsl(43 100% 98% / 0.55)" }} />
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at center, transparent 30%, hsl(43 100% 98% / 0.7) 100%)",
      }}
    />
  </div>
);

export type CaseCategory = "Video" | "Social" | "Web";

export interface CaseItem {
  slug: string;
  img: string;
  client: string;
  service: string;
  category: CaseCategory;
  result: string;
}
/* ⚠️ PERSONALIZZA — luxe-fashion, gusto-ristorante, fitpro-academy e glow-skincare
   sono dati placeholder. Sigillo e SetupEvents sono clienti reali (dati ricavati
   dai rispettivi siti pubblici). Lo slug deve restare coerente con l'oggetto
   "details" in CaseStudy.tsx e con l'array "projects" in PortfolioSection.tsx. */
export const cases: CaseItem[] = [
  { slug: "luxe-fashion", img: portfolio1, client: "Luxe Fashion", service: "Strategy & Production", category: "Social", result: "+200k views" },
  { slug: "gusto-ristorante", img: portfolio2, client: "Gusto Ristorante", service: "Content & Social", category: "Video", result: "+150% engagement" },
  { slug: "fitpro-academy", img: portfolio3, client: "FitPro Academy", service: "Growth & Ads", category: "Social", result: "+80k followers" },
  { slug: "glow-skincare", img: portfolio4, client: "Glow Skincare", service: "E-commerce Strategy", category: "Web", result: "+300% vendite" },
  { slug: "sigillo", img: portfolioSigillo, client: "Sigillo", service: "Sito Web & Brand", category: "Web", result: "Nuovo sito corporate" },
  { slug: "setup-events", img: portfolioSetupEvents, client: "SetupEvents", service: "Sito Web", category: "Web", result: "Nuovo sito corporate" },
];

const filters = ["Tutti", "Video", "Social", "Web"] as const;
type Filter = (typeof filters)[number];

const Portfolio = () => {
  const [active, setActive] = useState<Filter>("Tutti");

  const visible = useMemo(
    () => (active === "Tutti" ? cases : cases.filter((c) => c.category === active)),
    [active]
  );

  return (
    <>
      <main className="relative z-10 min-h-screen overflow-x-hidden">
        <Navbar />

        {/* Hero — nera */}
        <section className="section-dark pt-40 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-brand-orange" />
                <p className="font-body text-xs font-bold tracking-[0.4em] uppercase text-brand-orange">
                  Portfolio
                </p>
              </div>
              <h1
                className="font-display font-black tracking-tight leading-[1.05] mb-6"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                Lavori,<br />
                <span className="text-primary">non promesse.</span>
              </h1>
              <p className="font-body text-base md:text-lg max-w-2xl text-white/75">
                Una selezione di progetti che raccontano il nostro approccio: strategia, creatività ed esecuzione impeccabile.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filtri + Grid — beige, con prova video di sfondo marmorizzato */}
        <section className="section-light relative pt-12 pb-28 px-6 overflow-hidden">
          <PortfolioSectionVideoBackground />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-12 p-3 rounded-full border w-fit bg-white border-[hsl(0_0%_8%/0.1)]">
              {filters.map((f) => {
                const isActive = active === f;
                return (
                  <button
                    key={f}
                    onClick={() => setActive(f)}
                    className="px-5 py-2 rounded-full font-body text-xs md:text-sm font-medium tracking-wide transition-all duration-300 border"
                    style={{
                      backgroundColor: isActive ? CELESTE : "transparent",
                      color: isActive ? "hsl(192 35% 16%)" : "hsl(0 0% 25%)",
                      borderColor: isActive ? CELESTE : "transparent",
                    }}
                  >
                    {f}
                  </button>
                );
              })}
            </div>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              <AnimatePresence mode="popLayout">
                {visible.map((c, i) => (
                  <motion.div
                    key={c.slug}
                    layout
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={`/portfolio/${c.slug}`}
                      className="group relative block rounded-2xl overflow-hidden cursor-pointer aspect-[4/3]"
                    >
                      <img
                        src={c.img}
                        alt={c.client}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6">
                        <div className="text-center">
                          <p
                            className="font-body text-[10px] tracking-[0.4em] uppercase mb-3"
                            style={{ color: CELESTE }}
                          >
                            {c.service}
                          </p>
                          <h3 className="font-display font-bold text-2xl text-white mb-2">
                            {c.client}
                          </h3>
                          <p className="font-body text-xs text-white/65 tracking-wider uppercase">
                            Scopri il case study →
                          </p>
                        </div>
                      </div>

                      {/* Default label */}
                      <div className="absolute bottom-0 left-0 p-6 group-hover:opacity-0 transition-opacity duration-300">
                        <p
                          className="font-display font-bold text-sm mb-1"
                          style={{ color: CELESTE }}
                        >
                          {c.result}
                        </p>
                        <h3 className="font-display font-bold text-xl text-white">{c.client}</h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Portfolio;
