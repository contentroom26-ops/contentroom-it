import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalVideoBackground from "@/components/GlobalVideoBackground";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";

const CELESTE = "hsl(192 49% 76%)";

export type CaseCategory = "Video" | "Social" | "Web";

export interface CaseItem {
  slug: string;
  img: string;
  client: string;
  service: string;
  category: CaseCategory;
  result: string;
}

export const cases: CaseItem[] = [
  { slug: "luxe-fashion", img: portfolio1, client: "Luxe Fashion", service: "Strategy & Production", category: "Social", result: "+200k views" },
  { slug: "gusto-ristorante", img: portfolio2, client: "Gusto Ristorante", service: "Content & Social", category: "Video", result: "+150% engagement" },
  { slug: "fitpro-academy", img: portfolio3, client: "FitPro Academy", service: "Growth & Ads", category: "Social", result: "+80k followers" },
  { slug: "glow-skincare", img: portfolio4, client: "Glow Skincare", service: "E-commerce Strategy", category: "Web", result: "+300% vendite" },
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
      <GlobalVideoBackground />
      <main className="relative z-10 min-h-screen overflow-x-hidden">
        <Navbar />

        {/* Hero */}
        <section className="pt-40 pb-10 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-8 md:p-12 border"
              style={{
                background: "linear-gradient(160deg, hsl(0 0% 5% / 0.78), hsl(0 0% 3% / 0.88))",
                borderColor: "hsl(0 0% 100% / 0.08)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5)",
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px" style={{ background: CELESTE }} />
                <p className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: CELESTE }}>
                  Portfolio
                </p>
              </div>
              <h1
                className="font-display font-bold tracking-tight leading-[1.05] mb-6 text-foreground"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  textShadow: "0 2px 8px hsl(0 0% 0% / 0.85), 0 0 28px hsl(0 0% 0% / 0.6)",
                }}
              >
                Lavori,<br />
                <span style={{ color: "hsl(0 0% 75%)" }}>non promesse.</span>
              </h1>
              <p
                className="font-body text-base md:text-lg max-w-2xl"
                style={{ color: "hsl(0 0% 92%)", textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}
              >
                Una selezione di progetti che raccontano il nostro approccio: strategia, creatività ed esecuzione impeccabile.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filtri */}
        <section className="px-6 pt-8">
          <div className="max-w-6xl mx-auto">
            <div
              className="flex flex-wrap items-center gap-2 md:gap-3 mb-12 p-3 rounded-full border w-fit"
              style={{
                background: "hsl(0 0% 5% / 0.7)",
                borderColor: "hsl(0 0% 100% / 0.08)",
                backdropFilter: "blur(18px)",
              }}
            >
              {filters.map((f) => {
                const isActive = active === f;
                return (
                  <button
                    key={f}
                    onClick={() => setActive(f)}
                    className="px-5 py-2 rounded-full font-body text-xs md:text-sm tracking-wide transition-all duration-300 border"
                    style={{
                      background: isActive ? CELESTE : "hsl(0 0% 100% / 0.05)",
                      color: isActive ? "hsl(0 0% 5%)" : "hsl(0 0% 95%)",
                      borderColor: isActive ? CELESTE : "hsl(0 0% 100% / 0.12)",
                    }}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="pb-32 px-6">
          <div className="max-w-6xl mx-auto">
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
                      className="group relative block rounded-[12px] overflow-hidden cursor-pointer aspect-[4/3]"
                    >
                      <img
                        src={c.img}
                        alt={c.client}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-background/75 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6">
                        <div className="text-center">
                          <p
                            className="font-body text-[10px] tracking-[0.4em] uppercase mb-3"
                            style={{ color: CELESTE }}
                          >
                            {c.service}
                          </p>
                          <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                            {c.client}
                          </h3>
                          <p className="font-body text-xs text-muted-foreground tracking-wider uppercase">
                            Scopri il case study →
                          </p>
                        </div>
                      </div>

                      {/* Default label */}
                      <div className="absolute bottom-0 left-0 p-6 group-hover:opacity-0 transition-opacity duration-300">
                        <p
                          className="font-display font-semibold text-sm mb-1"
                          style={{ color: CELESTE }}
                        >
                          {c.result}
                        </p>
                        <h3 className="font-display font-bold text-xl text-foreground">{c.client}</h3>
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
