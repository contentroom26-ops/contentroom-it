import { motion, useMotionValue, useTransform, animate, useAnimationFrame } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import InlineCTA from "./InlineCTA";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";

const ACCENT = "hsl(192 49% 76%)";

const projects = [
  { slug: "luxe-fashion", img: portfolio1, name: "Luxe Fashion", result: "+200k views", tag: "Strategy & Production" },
  { slug: "gusto-ristorante", img: portfolio2, name: "Gusto Ristorante", result: "+150% engagement", tag: "Content & Social" },
  { slug: "fitpro-academy", img: portfolio3, name: "FitPro Academy", result: "+80k followers", tag: "Growth & Ads" },
  { slug: "glow-skincare", img: portfolio4, name: "Glow Skincare", result: "+300% vendite", tag: "E-commerce Strategy" },
];

const CARD_WIDTH = 360; 
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
  
  // 1. ROTATION Y (Cilindrica): 
  // Calcoliamo la rotazione in base alla distanza dal centro della viewport.
  // Più è lontana, più l'angolo si accentua (fino a ~45°).
  const rotateY = useTransform(trackX, (x) => {
    const cardCenter = index * CARD_WIDTH + x;
    const viewportCenter = typeof window !== "undefined" ? window.innerWidth / 2 : 700;
    const distance = cardCenter - viewportCenter + CARD_WIDTH / 2;
    
    // Mappiamo una distanza di 450px a un'inclinazione massima di -45° o 45°
    const clamped = Math.max(-1, Math.min(1, distance / 450));
    return clamped * -45; 
  });

  // 2. TRANSLATE Z (Profondità del cilindro):
  // Questa è la chiave per l'effetto cilindrico. Al centro z = 0 (o leggermente positivo).
  // Man mano che la card si allontana, assume un valore Z fortemente negativo, curvando dietro lo schermo.
  const z = useTransform(trackX, (x) => {
    const cardCenter = index * CARD_WIDTH + x;
    const viewportCenter = typeof window !== "undefined" ? window.innerWidth / 2 : 700;
    const distance = Math.abs(cardCenter - viewportCenter + CARD_WIDTH / 2);
    
    const clamped = Math.min(1, distance / 500);
    // Usiamo una curva quadratica (clamped^2) per rendere l'affondamento più morbido al centro e drastico ai lati
    return Math.pow(clamped, 2) * -280; 
  });

  // 3. SCALE & OPACITY:
  // Poiché l'asse Z rimpicciolisce già naturalmente la card, riduciamo lo scale artificiale 
  // e abbassiamo leggermente l'opacità ai lati per simulare la penombra del cilindro.
  const scale = useTransform(trackX, (x) => {
    const cardCenter = index * CARD_WIDTH + x;
    const viewportCenter = typeof window !== "undefined" ? window.innerWidth / 2 : 700;
    const distance = Math.abs(cardCenter - viewportCenter + CARD_WIDTH / 2);
    const clamped = Math.min(1, distance / 450);
    return 1 - clamped * 0.08; 
  });

  const opacity = useTransform(trackX, (x) => {
    const cardCenter = index * CARD_WIDTH + x;
    const viewportCenter = typeof window !== "undefined" ? window.innerWidth / 2 : 700;
    const distance = Math.abs(cardCenter - viewportCenter + CARD_WIDTH / 2);
    const clamped = Math.min(1, distance / 500);
    return 1 - clamped * 0.35; // Le card esterne sfumano al 65% di opacità
  });

  return (
    <motion.div
      style={{ 
        rotateY, 
        scale, 
        z, 
        opacity,
        transformPerspective: 1000 // Ridotto da 1200 a 1000 per rendere l'effetto 3D più immersivo
      }}
      className="shrink-0"
    >
      <Link
        to={`/portfolio/${p.slug}`}
        draggable={false}
        className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-[4/3] block w-[320px] md:w-[340px]"
        onClick={(e) => {
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

const AUTOPLAY_SPEED = 32; 
const TRACK_WIDTH = CARD_WIDTH * trackProjects.length;
const LOOP_WIDTH = CARD_WIDTH * projects.length; 

const PortfolioSection = () => {
  const trackX = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const isDragging = useRef(false);

  useAnimationFrame((_, delta) => {
    if (paused || isDragging.current) return;
    const next = trackX.get() - (AUTOPLAY_SPEED * delta) / 1000;
    trackX.set(next <= -LOOP_WIDTH ? next + LOOP_WIDTH : next);
  });

  return (
    <section className="section-dark relative px-6 py-20 md:py-28 overflow-hidden bg-[hsl(0_0%_6%)]">
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

      {/* Contenitore Carosello */}
      <div
        className="relative w-full overflow-visible py-12"
        style={{ 
          perspective: 1000,          // Mantiene la prospettiva globale coerente
          transformStyle: "preserve-3d" // Dice al browser di renderizzare i figli nello spazio 3D vero
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {/* Sfumature laterali cinematografiche */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-48 z-20 bg-gradient-to-r from-[hsl(0_0%_6%)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-48 z-20 bg-gradient-to-l from-[hsl(0_0%_6%)] to-transparent" />

        <motion.div
          className="flex gap-0 cursor-grab active:cursor-grabbing"
          style={{ 
            x: trackX, 
            width: TRACK_WIDTH,
            transformStyle: "preserve-3d" // Cruciale sul track per trasmettere il 3D alle card
          }}
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
            <div 
              key={`${p.slug}-${i}`} 
              style={{ 
                width: CARD_WIDTH,
                transformStyle: "preserve-3d" 
              }} 
              className="flex items-center justify-center px-3"
            >
              <ProjectCard p={p} index={i} trackX={trackX} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 mt-12">
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
