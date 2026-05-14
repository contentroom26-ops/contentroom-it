import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import InlineCTA from "./InlineCTA";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";

const CELESTE = "hsl(192 49% 76%)";
const ACCENT = CELESTE;

const projects = [
  { img: portfolio1, name: "Luxe Fashion", result: "+200k views", tag: "Strategy & Production", desc: "Strategia social completa per brand di moda con contenuti editoriali e campagne ads." },
  { img: portfolio2, name: "Gusto Ristorante", result: "+150% engagement", tag: "Content & Social", desc: "Food content creation e gestione profili social con risultati record." },
  { img: portfolio3, name: "FitPro Academy", result: "+80k followers", tag: "Growth & Ads", desc: "Crescita organica e campagne di lead generation per centro fitness." },
  { img: portfolio4, name: "Glow Skincare", result: "+300% vendite", tag: "E-commerce Strategy", desc: "E-commerce strategy e contenuti prodotto per brand skincare." },
];

const PortfolioSection = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="relative px-6 py-[50px]">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-0.5" style={{ background: CELESTE }} />
            <p className="font-body font-bold text-xs tracking-[0.4em] uppercase" style={{ color: CELESTE }}>Portfolio</p>
          </div>
          <h2
            className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-20 text-white"
            style={{ textShadow: "0 2px 20px hsl(0 0% 0% / 0.8), 0 0 40px hsl(0 0% 0% / 0.6)" }}
          >
            Progetti selezionati.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 80, scale: 0.9, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ perspective: "1000px" }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                onClick={() => setSelected(i)}
                className="relative rounded-[12px] overflow-hidden cursor-pointer group aspect-[4/3]"
              >
                <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                {/* Hover overlay with tag */}
                <div className="absolute inset-0 bg-background/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="text-center px-6">
                    <p
                      className="font-body text-[10px] tracking-[0.4em] uppercase mb-3"
                      style={{ color: ACCENT }}
                    >
                      {p.tag}
                    </p>
                    <p className="font-display font-medium text-base text-foreground/90 max-w-xs">
                      {p.desc}
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 p-6 md:p-8 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="font-display font-semibold text-sm mb-1" style={{ color: ACCENT }}>{p.result}</p>
                  <h3 className="font-display font-bold text-xl md:text-2xl text-foreground">{p.name}</h3>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Temporarily hidden — da reinserire in futuro
        <InlineCTA
          caption="Esplora tutti i nostri progetti e lasciati ispirare."
          label="Vedi il portfolio"
          to="/portfolio"
        />
        */}
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, rotateX: 10 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.85, opacity: 0, rotateX: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-2xl overflow-hidden max-w-2xl w-full"
              style={{ perspective: "1000px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <img src={projects[selected].img} alt={projects[selected].name} className="w-full h-full object-cover" />
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center text-foreground hover:bg-background transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8">
                <p className="font-display font-semibold text-lg mb-2" style={{ color: ACCENT }}>{projects[selected].result}</p>
                <h3 className="font-display font-bold text-2xl md:text-3xl mb-4">{projects[selected].name}</h3>
                <p className="text-muted-foreground font-body">{projects[selected].desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
