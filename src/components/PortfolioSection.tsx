import { motion, useMotionValue, useTransform, animate, useAnimationFrame } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
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

// Duplichiamo la lista per ottenere un nastro visivamente continuo. Con poche
// card placeholder (4) ne servono più copie per riempire schermi larghi anche
// durante il drag manuale; quando i progetti reali saranno di più, si può
// scendere a 2-3 copie.
const CARD_WIDTH = 360; // larghezza card + gap, usata per i calcoli di rotazione
const trackProjects = [...projects, ...projects, ...projects, ...projects];

function ProjectCard({
  p,
  index,
  trackX,
}: {
  p: (typeof projects)[number];
  index: number;
  trackX: ReturnType<typeof useMotionValue<number>>;
}) {
  // Rotazione 3D in base alla distanza della card dal centro della viewport:
  // più la card è lontana dal centro, più si inclina (effetto coverflow).
  // La posizione della card nel mondo è index * CARD_WIDTH; sommando trackX
  // (che è negativo quando il nastro scorre a sinistra) otteniamo la sua
  // posizione attuale sullo schermo rispetto al centro.
  const rotateY = useTransform(trackX, (x) => {
    const cardCenter = index * CARD_WIDTH + x;
    const viewportCenter =
      typeof window !== "undefined" ? window.innerWidth / 2 : 700;
    const distance = cardCenter - viewportCenter + CARD_WIDTH / 2;
    const clamped = Math.max(-1, Math.min(1, distance / 380));
    return clamped * -42; // fino a 42° di inclinazione ai lati
  });

  const scale = useTransform(trackX, (x) => {
    const cardCenter = index * CARD_WIDTH + x;
    const viewportCenter =
      typeof window !== "undefined" ? window.innerWidth / 2 : 700;
    const distance = Math.abs(cardCenter - viewportCenter + CARD_WIDTH / 2);
    const clamped = Math.min(1, distance / 380);
    return 1 - clamped * 0.22; // le card laterali si rimpiccioliscono di più, accentua la profondità
  });

  return (
    <motion.div
      style={{ rotateY, scale, transformPerspective: 1200 }}
      className="shrink-0"
    >
      <Link
        to={`/portfolio/${p.slug}`}
        draggable={false}
        className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-[4/3] block w-[320px] md:w-[340px]"
        onClick={(e) => {
          // Evita che un drag accidentale venga interpretato come click sul link
          if (Math.abs(trackX.getVelocity()) > 50) e.preventDefault();
        }}
      >
        <img
          src={p.img}
          alt={p.name}
          loading="lazy"
          draggable={false}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="text-center px-6">
            <p className="font-body text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: ACCENT }}>
              {p.tag}
            </p>
            <p className="font-body text-xs text-white/70 tracking-wider uppercase">
              Scopri il case study →
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 p-6 group-hover:opacity-0 transition-opacity duration-300">
          <p className="font-display font-bold text-sm mb-1" style={{ color: ACCENT }}>{p.result}</p>
          <h3 className="font-display font-bold text-xl text-white">{p.name}</h3>
        </div>
      </Link>
    </motion.div>
  );
}

const AUTOPLAY_SPEED = 32; // px al secondo, scorrimento verso sinistra
const TRACK_WIDTH = CARD_WIDTH * trackProjects.length;
const LOOP_WIDTH = CARD_WIDTH * projects.length; // larghezza di una singola copia, per il wrap del loop

const PortfolioSection = () => {
  const trackX = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const isDragging = useRef(false);

  // Autoplay continuo via requestAnimationFrame, così convive bene col drag
  // manuale: si ferma quando paused=true (hover, touch, o durante il drag) e
  // riprende da dove era rimasto quando paused torna false.
  useAnimationFrame((_, delta) => {
    if (paused || isDragging.current) return;
    const next = trackX.get() - (AUTOPLAY_SPEED * delta) / 1000;
    // Wrap del loop: quando abbiamo scorso una copia intera verso sinistra,
    // saltiamo avanti di una copia così il nastro appare infinito senza che
    // l'utente se ne accorga (le copie sono identiche).
    trackX.set(next <= -LOOP_WIDTH ? next + LOOP_WIDTH : next);
  });

  return (
    <section className="section-dark relative px-6 py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-20 px-0"
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
      </div>

      {/* Carosello — esce dal contenitore max-w per occupare tutta la larghezza disponibile.
          Autoplay continuo (requestAnimationFrame) + drag manuale (Framer Motion drag)
          + rotazione 3D per ogni card in base alla distanza dal centro viewport. */}
      <div
        className="relative w-full"
        style={{ perspective: 1200 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 z-10 bg-gradient-to-r from-[hsl(0_0%_6%)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 z-10 bg-gradient-to-l from-[hsl(0_0%_6%)] to-transparent" />

        <motion.div
          className="flex gap-0 cursor-grab active:cursor-grabbing"
          style={{ x: trackX, width: TRACK_WIDTH }}
          drag="x"
          dragConstraints={{ left: -TRACK_WIDTH + CARD_WIDTH, right: CARD_WIDTH }}
          dragElastic={0.08}
          dragMomentum={true}
          onDragStart={() => {
            isDragging.current = true;
            setPaused(true);
          }}
          onDragEnd={() => {
            isDragging.current = false;
            setPaused(false);
          }}
        >
          {trackProjects.map((p, i) => (
            <div key={`${p.slug}-${i}`} style={{ width: CARD_WIDTH }} className="flex items-center justify-center px-3">
              <ProjectCard p={p} index={i} trackX={trackX} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
