import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Eye, TrendingUp, Users } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";

const CYAN = "hsl(200 80% 74%)";

const projects = [
  { img: portfolio1, name: "Luxe Fashion", result: "+200k views", icon: Eye, desc: "Strategia social completa per brand di moda con contenuti editoriali." },
  { img: portfolio2, name: "Gusto Ristorante", result: "+150% engagement", icon: TrendingUp, desc: "Food content creation e gestione profili social con risultati record." },
  { img: portfolio3, name: "FitPro Academy", result: "+80k followers", icon: Users, desc: "Crescita organica e campagne di lead generation per centro fitness." },
  { img: portfolio4, name: "Glow Skincare", result: "+300% vendite", icon: TrendingUp, desc: "E-commerce strategy e contenuti prodotto per brand skincare." },
];

interface Props {
  isActive: boolean;
  progress: number;
}

export default function WallPortfolio({ isActive, progress }: Props) {
  const activeProject = isActive ? Math.min(3, Math.floor(progress * 4)) : -1;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-8 md:px-12">
      {/* Title */}
      <motion.div
        initial={false}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 40 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 md:mb-12 text-center"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-10 h-px" style={{ background: CYAN }} />
          <p className="font-body text-[10px] tracking-[0.5em] uppercase" style={{ color: CYAN }}>Portfolio</p>
          <div className="w-10 h-px" style={{ background: CYAN }} />
        </div>
        <h2 className="font-display font-bold tracking-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
          I nostri lavori
        </h2>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 md:gap-5 w-full max-w-4xl">
        {projects.map((proj, i) => {
          const isCardActive = activeProject === i;
          const Icon = proj.icon;

          return (
            <motion.div
              key={proj.name}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                y: isActive ? 0 : 50,
                scale: isCardActive ? 1.04 : 1,
              }}
              transition={{
                duration: 0.6,
                delay: isActive ? i * 0.08 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              style={{
                aspectRatio: "4/3",
                border: `1px solid ${isCardActive ? "hsl(200 80% 74% / 0.5)" : "hsl(0 0% 100% / 0.06)"}`,
                boxShadow: isCardActive
                  ? "0 0 50px hsl(200 80% 74% / 0.15), 0 20px 40px -10px rgba(0,0,0,0.5)"
                  : "0 8px 24px rgba(0,0,0,0.3)",
                transition: "border 0.5s, box-shadow 0.5s",
              }}
            >
              {/* Image */}
              <img
                src={proj.img}
                alt={proj.name}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                style={{
                  filter: isCardActive ? "brightness(0.8) saturate(1.2)" : "brightness(0.3) saturate(0.4)",
                  transform: isCardActive ? "scale(1.08)" : "scale(1)",
                }}
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 transition-all duration-700"
                style={{
                  background: isCardActive
                    ? "linear-gradient(180deg, transparent 30%, hsl(0 0% 4% / 0.85) 100%)"
                    : "linear-gradient(180deg, hsl(0 0% 4% / 0.3) 0%, hsl(0 0% 4% / 0.7) 100%)",
                }}
              />

              {/* Active glow top line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-600"
                style={{
                  background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`,
                  opacity: isCardActive ? 1 : 0,
                  transform: `scaleX(${isCardActive ? 1 : 0})`,
                  transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                {/* Result badge */}
                <div
                  className="flex items-center gap-2 mb-2 transition-all duration-500"
                  style={{ opacity: isCardActive ? 1 : 0.4 }}
                >
                  <Icon size={14} style={{ color: CYAN }} />
                  <span className="font-display font-bold text-sm" style={{ color: CYAN }}>
                    {proj.result}
                  </span>
                </div>

                <h3
                  className="font-display font-bold text-lg md:text-xl tracking-tight mb-1 transition-colors duration-500"
                  style={{ color: isCardActive ? "hsl(40 20% 92%)" : "hsl(0 0% 50%)" }}
                >
                  {proj.name}
                </h3>

                <p
                  className="font-body text-xs leading-relaxed transition-all duration-500 max-w-[280px]"
                  style={{
                    color: "hsl(0 0% 50%)",
                    opacity: isCardActive ? 1 : 0,
                    maxHeight: isCardActive ? "60px" : "0",
                    overflow: "hidden",
                  }}
                >
                  {proj.desc}
                </p>

                {/* View CTA */}
                <div
                  className="flex items-center gap-1.5 mt-3 transition-all duration-500"
                  style={{ opacity: isCardActive ? 1 : 0, transform: isCardActive ? "translateY(0)" : "translateY(10px)" }}
                >
                  <span className="font-body text-[10px] tracking-[0.2em] uppercase" style={{ color: CYAN }}>Vedi progetto</span>
                  <ArrowUpRight size={12} style={{ color: CYAN }} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
