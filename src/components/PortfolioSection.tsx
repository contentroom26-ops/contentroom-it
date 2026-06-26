import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
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

// PARAMETRI DI DISTRIBUZIONE E CURVA
const CARD_WIDTH = 420; // Aumentato a 420px per dare ampio spazio (gap) tra una card e l'altra
const trackProjects = [...projects, ...projects, ...projects, ...projects, ...projects]; // Più copie per coprire schermi larghi
const TOTAL_TRACK_WIDTH = trackProjects.length * CARD_WIDTH;

function ProjectCard({
  p,
  index,
  trackX,
}: {
  p: (typeof projects)[number];
  index: number;
  trackX: ReturnType<typeof useMotionValue<number>>;
}) {
  
  // Calcoliamo il centro dello schermo dello user
  const viewportCenter = typeof window !== "undefined" ? window.innerWidth / 2 : 700;

  // Calcolo della posizione X reale e lineare di ogni card nello spazio (con supporto al loop infinito)
  const x = useTransform(trackX, (latestX) => {
    // Posizione base teorica della card sul nastro continuo
    let currentX = (index * CARD_WIDTH + latestX) % TOTAL_TRACK_WIDTH;
    
    // Se il valore è negativo, lo riportiamo nel range positivo del loop
    if (currentX < 0) currentX += TOTAL_TRACK_WIDTH;
    
    // Centriamo il sistema di coordinate rispetto allo schermo dello user
    return currentX - (TOTAL_TRACK_WIDTH / 2) + viewportCenter;
  });

  // ROTAZIONE E PROFONDITÀ IN BASE ALLA DISTANZA DAL CENTRO DELLO SCHERMO
  // Calcoliamo quanto la card dista dal centro esatto dello schermo dello user
  const distanceFromCenter = useTransform(x, (currentX) => {
    return currentX - viewportCenter;
  });

  // 1. ROTATE Y (Inversione Concava): 
  // Al centro (0px di distanza) la rotazione è 0. Ai lati (oltre i 400px di distanza) ruota verso l'interno.
  const rotateY = useTransform(distanceFromCenter, [-800, -400, 0, 400, 800], [-45, -30, 0, 30, 45]);

  // 2. TRANSLATE Z (Cilindro IMAX):
  // Al centro la card è a Z = 0 (vicina). Ai lati (distante) la spingiamo leggermente in avanti su Z 
  // o indietro a seconda di quanta distorsione vogliamo. Per il cilindro concavo di CloudCube, 
  // le card laterali avanzano verso l'utente (Z positivo) o restano stabili mentre il centro arretra.
  // Qui teniamo il centro pulito a 0 e facciamo piegare i lati leggermente in avanti (+80) per l'effetto avvolgente.
  const z = useTransform(distanceFromCenter, [-600, 0, 600], [80, 0, 80]);

  // 3. SCALE (Mantiene le card laterali proporzionate senza ammassarle)
  const scale = useTransform(distanceFromCenter, [-600, 0, 600], [0.9, 1, 0.9]);

  return (
    <motion.div
      style={{
        x,
        z,
        rotateY,
        scale,
        position: 'absolute',
        top: '50%',
        left: 0, // Lasciamo che sia il transform X a gestire la posizione orizzontale
        transformPerspective: 1200, 
        transformStyle: "preserve-3d"
      }}
      className="shrink-0"
    >
      <Link
        to={`/portfolio/${p.slug}`}
        draggable={false}
        className="relative rounded-2xl overflow-hidden cursor-pointer group block w-[300px] md:w-[340px] aspect-[3/4]"
        style={{
          marginTop: '-226px',  // Centratura verticale (metà altezza di un aspect 3/4)
        }}
        onClick={(e) => {
          if (Math.abs(trackX.getVelocity()) > 50) e.preventDefault();
        }}
      >
        <img
          src={p.img}
          alt={p.name}
          loading="lazy"
          draggable={false}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
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

const AUTOPLAY_SPEED = 40; 

const PortfolioSection = () => {
  const trackX = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const isDragging = useRef(false);
  const startDragX = useRef(0);
  const startTrackX = useRef(0);

  useAnimationFrame((_, delta) => {
    if (paused || isDragging.current) return;
    const next = trackX.get() - (AUTOPLAY_SPEED * delta) / 1000;
    trackX.set(next);
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    setPaused(true);
    startDragX.current = e.clientX;
    startTrackX.current = trackX.get();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startDragX.current;
    trackX.set(startTrackX.current + deltaX * 1.2); 
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    setPaused(false);
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <section className="section-dark relative px-6 py-20 md:py-28 overflow-hidden bg-black">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 px-0"
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

      {/* Contenitore Scena 3D largo e spazioso */}
      <div
        className="relative w-full h-[550px] overflow-visible select-none"
        style={{
          perspective: 1000,
          transformStyle: "preserve-3d"
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Sfumature per nascondere le card solo sui bordi estremi dello schermo */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 z-20 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 z-20 bg-gradient-to-l from-black to-transparent" />

        <div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {trackProjects.map((p, i) => (
            <ProjectCard key={`${p.slug}-${i}`} p={p} index={i} trackX={trackX} />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 mt-6">
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
