import { motion, AnimatePresence } from "framer-motion";
import { Aperture, Share2, Rocket, Code2, ArrowRight } from "lucide-react";

const CYAN = "hsl(200 80% 74%)";

const services = [
  {
    icon: Aperture,
    title: "Content Creation",
    desc: "Produciamo video, foto e grafiche che catturano l'attenzione e raccontano il tuo brand con uno stile unico.",
    tags: ["Video", "Foto", "Grafiche", "Reels"],
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    desc: "Gestione strategica dei tuoi canali social con un piano editoriale su misura per massimizzare reach e engagement.",
    tags: ["Instagram", "TikTok", "LinkedIn", "Strategy"],
  },
  {
    icon: Rocket,
    title: "Web Design & Digital",
    desc: "Design e sviluppo di esperienze digitali che convertono visitatori in clienti.",
    tags: ["UI/UX", "Web Dev", "E-commerce", "SEO"],
  },
];

interface Props {
  isActive: boolean;
  progress: number;
}

export default function WallServices({ isActive, progress }: Props) {
  const activeCard = isActive ? Math.min(2, Math.floor(progress * 3)) : -1;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-10 md:px-16 py-8">
      {/* Title */}
      <motion.div
        initial={false}
        animate={{
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 40,
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 md:mb-14 text-center"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-10 h-px" style={{ background: CYAN }} />
          <p className="font-body text-[10px] tracking-[0.5em] uppercase" style={{ color: CYAN }}>
            Servizi
          </p>
          <div className="w-10 h-px" style={{ background: CYAN }} />
        </div>
        <h2
          className="font-display font-bold tracking-tight"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
        >
          Cosa facciamo
        </h2>
      </motion.div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-5 md:gap-6 w-full max-w-5xl">
        {services.map((svc, i) => {
          const isCardActive = activeCard === i;
          const Icon = svc.icon;

          return (
            <motion.div
              key={svc.title}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                y: isActive ? 0 : 60,
                scale: isCardActive ? 1.03 : 1,
              }}
              transition={{
                duration: 0.7,
                delay: isActive ? i * 0.1 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex-1 relative group cursor-pointer"
            >
              <div
                className="relative rounded-2xl p-6 md:p-8 h-full overflow-hidden transition-all duration-700"
                style={{
                  background: isCardActive
                    ? "hsl(0 0% 8% / 0.85)"
                    : "hsl(0 0% 6% / 0.6)",
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${isCardActive ? "hsl(200 80% 74% / 0.4)" : "hsl(0 0% 100% / 0.06)"}`,
                  boxShadow: isCardActive
                    ? "0 0 60px hsl(200 80% 74% / 0.12), 0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 hsl(200 80% 74% / 0.1)"
                    : "0 8px 32px rgba(0,0,0,0.3)",
                }}
              >
                {/* Glow effect */}
                <div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full transition-opacity duration-700"
                  style={{
                    background: "radial-gradient(circle, hsl(200 80% 74% / 0.12), transparent 70%)",
                    opacity: isCardActive ? 1 : 0,
                  }}
                />

                {/* Active line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-700"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`,
                    opacity: isCardActive ? 1 : 0,
                    transform: `scaleX(${isCardActive ? 1 : 0})`,
                  }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-500"
                  style={{
                    background: isCardActive ? "hsl(200 80% 74% / 0.12)" : "hsl(0 0% 100% / 0.04)",
                    border: `1px solid ${isCardActive ? "hsl(200 80% 74% / 0.3)" : "hsl(0 0% 100% / 0.06)"}`,
                    transform: isCardActive ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  <Icon
                    size={22}
                    strokeWidth={1.5}
                    style={{
                      color: isCardActive ? CYAN : "hsl(0 0% 60%)",
                      transition: "color 0.5s ease",
                    }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-display font-bold text-lg md:text-xl tracking-tight mb-3 transition-colors duration-500"
                  style={{ color: isCardActive ? "hsl(40 20% 92%)" : "hsl(0 0% 60%)" }}
                >
                  {svc.title}
                </h3>

                {/* Description */}
                <p
                  className="font-body text-sm leading-relaxed mb-5 transition-colors duration-500"
                  style={{ color: isCardActive ? "hsl(0 0% 55%)" : "hsl(0 0% 35%)" }}
                >
                  {svc.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {svc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-body tracking-wider uppercase px-3 py-1 rounded-full transition-all duration-500"
                      style={{
                        background: isCardActive ? "hsl(200 80% 74% / 0.08)" : "hsl(0 0% 100% / 0.03)",
                        color: isCardActive ? CYAN : "hsl(0 0% 40%)",
                        border: `1px solid ${isCardActive ? "hsl(200 80% 74% / 0.15)" : "hsl(0 0% 100% / 0.05)"}`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 transition-all duration-500" style={{ opacity: isCardActive ? 1 : 0.3 }}>
                  <span className="font-body text-xs tracking-[0.2em] uppercase" style={{ color: CYAN }}>
                    Scopri
                  </span>
                  <ArrowRight size={14} style={{ color: CYAN }} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
