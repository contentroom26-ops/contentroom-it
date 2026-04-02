import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Aperture, Share2, Rocket, ArrowUpRight } from "lucide-react";

const services = [
  {
    num: "001",
    icon: Aperture,
    title: "Content Creation",
    desc: "Produciamo video, foto e grafiche che catturano l'attenzione e raccontano il tuo brand con uno stile unico e riconoscibile.",
    tags: ["Video", "Foto", "Grafiche", "Reels", "Stories"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
  },
  {
    num: "002",
    icon: Share2,
    title: "Social Media Marketing",
    desc: "Gestione strategica dei tuoi canali social con piano editoriale su misura, community management e advertising.",
    tags: ["Instagram", "TikTok", "LinkedIn", "Strategy", "Ads"],
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80",
  },
  {
    num: "003",
    icon: Rocket,
    title: "Web Design & Digital",
    desc: "Design e sviluppo di esperienze digitali memorabili che convertono visitatori in clienti fedeli.",
    tags: ["UI/UX", "Web Dev", "E-commerce", "SEO", "Branding"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="servizi" ref={ref} className="relative py-32 md:py-40">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
              (3) Servizi
            </p>
            <h2
              className="font-display font-bold text-foreground tracking-tight leading-[1.05]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Cosa facciamo<span className="text-primary">.</span>
            </h2>
          </div>
          <p className="font-body text-muted-foreground text-sm md:text-base max-w-sm leading-relaxed">
            Strategie creative su misura per brand che vogliono distinguersi nel panorama digitale.
          </p>
        </motion.div>
      </div>

      {/* Service cards — editorial style */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {services.map((svc, i) => {
          const Icon = svc.icon;
          const isHovered = hoveredIndex === i;

          return (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative border-t border-border py-10 md:py-14 cursor-pointer transition-colors duration-500"
              style={{
                borderColor: isHovered ? "hsl(38 90% 55% / 0.3)" : undefined,
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                {/* Number */}
                <span className="font-body text-[10px] tracking-[0.3em] text-muted-foreground/50 md:w-16">
                  ({svc.num})
                </span>

                {/* Icon + Title */}
                <div className="flex items-center gap-4 md:w-80">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500"
                    style={{
                      background: isHovered ? "hsl(38 90% 55% / 0.12)" : "hsl(0 0% 100% / 0.03)",
                      border: `1px solid ${isHovered ? "hsl(38 90% 55% / 0.25)" : "hsl(0 0% 100% / 0.06)"}`,
                    }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.5}
                      className="transition-colors duration-500"
                      style={{ color: isHovered ? "hsl(38 90% 55%)" : "hsl(0 0% 45%)" }}
                    />
                  </div>
                  <h3
                    className="font-display font-bold text-xl md:text-2xl tracking-tight transition-colors duration-500"
                    style={{ color: isHovered ? "hsl(0 0% 96%)" : "hsl(0 0% 60%)" }}
                  >
                    {svc.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1 max-w-md">
                  {svc.desc}
                </p>

                {/* Tags */}
                <div className="hidden lg:flex flex-wrap gap-2 max-w-[200px]">
                  {svc.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-body tracking-wider uppercase px-3 py-1 rounded-full transition-all duration-500"
                      style={{
                        background: isHovered ? "hsl(38 90% 55% / 0.08)" : "hsl(0 0% 100% / 0.03)",
                        color: isHovered ? "hsl(38 90% 55%)" : "hsl(0 0% 40%)",
                        border: `1px solid ${isHovered ? "hsl(38 90% 55% / 0.15)" : "hsl(0 0% 100% / 0.05)"}`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex"
                  animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight size={24} className="text-primary" />
                </motion.div>
              </div>

              {/* Hover reveal image */}
              <motion.div
                className="absolute right-20 top-1/2 -translate-y-1/2 w-64 h-44 rounded-xl overflow-hidden pointer-events-none z-10 hidden lg:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0.8,
                  rotate: isHovered ? -2 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.8) saturate(1.1)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, transparent 50%, hsl(0 0% 3% / 0.6) 100%)" }}
                />
              </motion.div>
            </motion.div>
          );
        })}
        {/* Bottom border */}
        <div className="border-t border-border" />
      </div>
    </section>
  );
}
