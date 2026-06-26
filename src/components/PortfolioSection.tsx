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

const CARD_WIDTH = 380; // Spaziatura logica sul nastro virtuale
const trackProjects = [...projects, ...projects, ...projects, ...projects];

// PARAMETRI DEL CILINDRO CONCAVO (IMAX EFFECT)
const RADIUS_Z = 900;       // Il raggio del cilindro. Più è alto, più la curva è ampia e pulita.
const ARC_ANGLE = 75;       // Angolo totale visibile dell'arco di cerchio (in gradi)
const VIEWPORT_WIDTH = 1200; // Larghezza virtuale entro cui calcoliamo la curva

function ProjectCard({
  p,
  index,
  trackX,
}: {
  p: (typeof projects)[number];
  index: number;
  trackX: ReturnType<typeof useMotionValue<number>>;
}) {
  
  // Calcoliamo la posizione normalizzata della card lungo lo schermo (da 0 a VIEWPORT_WIDTH)
  const positionX = useTransform(trackX, (x) => {
    const virtualTrackWidth = trackProjects.length * CARD_WIDTH;
    const currentX = (index * CARD_WIDTH + x) % virtualTrackWidth;
    // Gestione del modulo per i numeri negativi (fondamentale per il loop infinito)
    const positiveX = currentX < 0 ? currentX + virtualTrackWidth : currentX;
    
    // Mappiamo la posizione reale sulla larghezza dello schermo virtuale
    return (positiveX / virtualTrackWidth) * VIEWPORT_WIDTH;
  });

  // 1. Angolo sul cilindro (da -37.5° a +37.5°)
  const angle = useTransform(positionX, [0, VIEWPORT_WIDTH], [-ARC_ANGLE / 2, ARC_ANGLE / 2]);

  // 2. Coordinata X sulla curva reale (Seno dell'angolo)
  const x = useTransform(angle, (a) => Math.sin(a * (Math.PI / 180)) * RADIUS_Z);

  // 3. Coordinata Z per Cilindro CONCAVO (Coseno dell'angolo)
  // Al centro (angolo 0) la card è alla massima profondità (Z negativa).
  // Ai lati (angolo max) il coseno diminuisce, portando la card in avanti (Z vicino a 0 o positiva).
  const z = useTransform(angle, (a) => {
    const cosValue = Math.cos(a * (Math.PI / 180));
    return (cosValue - 1) * RADIUS_Z; 
  });

  // 4. Rotazione Y speculare: le card a sinistra guardano a destra e viceversa
  const rotateY = useTransform(angle, (a) => a);

  // 5. Scala minima per compensare la vicinanza prospettica ai lati (opzionale, mantiene l'ordine visivo)
  const scale = useTransform(angle, (a) => {
    const distance = Math.abs(a / (ARC_ANGLE / 2));
    return 1 - distance * 0.05;
  });

  return (
    <motion.div
      style={{
        x,
        z,
        rotateY,
        scale,
        position: 'absolute',
        left: '50%',
        top: '50%',
        transformPerspective: 1200, // Prospettiva bilanciata per non distorcere le immagini piatte
      }}
      className="shrink-0"
    >
      <Link
        to={`/portfolio/${p.slug}`}
        draggable={false}
        className="relative rounded-2xl overflow-hidden cursor-pointer group block w-[280px] sm:w-[320px] md:w-[340px] aspect-[3/4]"
        style={{
          marginLeft: '-170px', // Perfettamente centrata sull'asse X dell'ancora
          marginTop: '-226px',  // Perfettamente centrata sull'asse Y (per aspect ratio 3/4)
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
const TRACK_WIDTH = CARD_WIDTH * trackProjects.length;

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

  // Gestore drag manuale custom per ovviare ai limiti del drag nativo sul cerchio virtuale
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
    trackX.set(startTrackX.current + deltaX * 1.5); // 1.5 aumenta la reattività del drag
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

      {/* Spazio del teatro 3D */}
      <div
        className="relative w-full h-[550px] overflow-visible select-none"
        style={{
          perspective: 1200,
          transformStyle: "preserve-3d"
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Ombreggiature sfumate ai bordi dello schermo */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-40 z-20 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-40 z-20 bg-gradient-to-l from-black to-transparent" />

        <div
          className="relative w-full h-full cursor-grab active:cursor-grabbing"
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
