import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import InlineCTA from "./InlineCTA";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";

const ACCENT = "hsl(192 49% 76%)";

/* ⚠️ PERSONALIZZA — sostituisci con i tuoi clienti reali.
   Lo slug deve corrispondere a una voce in src/pages/Portfolio.tsx (array "cases")
   e ai relativi dettagli in src/pages/CaseStudy.tsx (oggetto "details"). */
const projects = [
  { slug: "luxe-fashion", img: portfolio1, name: "Luxe Fashion", result: "+200k views", tag: "Strategy & Production" },
  { slug: "gusto-ristorante", img: portfolio2, name: "Gusto Ristorante", result: "+150% engagement", tag: "Content & Social" },
  { slug: "fitpro-academy", img: portfolio3, name: "FitPro Academy", result: "+80k followers", tag: "Growth & Ads" },
  { slug: "glow-skincare", img: portfolio4, name: "Glow Skincare", result: "+300% vendite", tag: "E-commerce Strategy" },
];

const PortfolioSection = () => {
  return (
    <section className="section-dark relative px-6 py-20 md:py-28">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-0.5 bg-brand-orange" />
            <span className="font-body font-bold text-xs tracking-[0.4em] uppercase text-brand-orange">
              Portfolio
            </span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-white">
            Progetti <span className="text-primary">selezionati.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 80, scale: 0.9, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ perspective: "1000px" }}
            >
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.5 }}>
                <Link
                  to={`/portfolio/${p.slug}`}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-[4/3] block"
                >
                  <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="text-center px-6">
                      <p
                        className="font-body text-[10px] tracking-[0.4em] uppercase mb-3"
                        style={{ color: ACCENT }}
                      >
                        {p.tag}
                      </p>
                      <p className="font-body text-xs text-white/70 tracking-wider uppercase">
                        Scopri il case study →
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 p-6 md:p-8 group-hover:opacity-0 transition-opacity duration-300">
                    <p className="font-display font-bold text-sm mb-1" style={{ color: ACCENT }}>{p.result}</p>
                    <h3 className="font-display font-bold text-xl md:text-2xl text-white">{p.name}</h3>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <InlineCTA
          caption="Esplora tutti i nostri progetti e lasciati ispirare."
          label="Vedi il portfolio"
          to="/portfolio"
        />
      </div>
    </section>
  );
};

export default PortfolioSection;
