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

const CARD_WIDTH = 360; // Larghezza card per i calcoli logici del loop, non più per la disposizione
const trackProjects = [...projects, ...projects, ...projects, ...projects];

// Angolo di curvatura totale del cilindro visibile
const CYLINDER_ARC_ANGLE = 90; // Gradi, le card copriranno -45° a +45° del cilindro
const RADIUS_Z = 600; // Profondità del cilindro. Più basso, più curvo.
const CONTAINER_WIDTH_PX = 1000; // Larghezza "virtuale" della viewport del cilindro

function ProjectCard({
  p,
  index,
  trackX,
}: {
  p: (typeof projects)[number];
  index: number;
  trackX: ReturnType<typeof useMotionValue<number>>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Calcoliamo la posizione "relativa" della card nella viewport del cilindro
  // in base allo scorrimento (trackX). Questo valore va da 0 (all'estrema sinistra) a CONTAINER_WIDTH_PX (all'estrema destra).
  const positionX = useTransform(trackX, (x) => {
    const virtualTrackWidth = trackProjects.length * CARD_WIDTH;
    const progress = (index * CARD_WIDTH + x) / virtualTrackWidth;
    // Mappiamo il progresso sul nastro "virtuale" alla larghezza visibile del contenitore cilindrico
    return (progress % 1) * CONTAINER_WIDTH_PX;
  });

  // 1. Calcoliamo l'angolo della card sul cilindro (da -45° a +45°)
  const angle = useTransform(positionX, [0, CONTAINER_WIDTH_PX], [-CYLINDER_ARC_ANGLE / 2, CYLINDER_ARC_ANGLE / 2]);

  // 2. Calcoliamo la posizione orizzontale 'x' sulla curva cilindrica (sin(angolo) * raggio)
  const x = useTransform(angle, (a) => Math.sin(a * (Math.PI / 180)) * RADIUS_Z);

  // 3. Calcoliamo la posizione verticale 'y' sulla curva (non è cilindrico se scorre in piano, ma creiamo una leggera onda per dinamismo)
  const y = useTransform(angle, (a) => Math.pow(Math.abs(a / 45), 2) * -50); 

  // 4. Calcoliamo la profondità 'z' sulla curva (cos(angolo) * raggio)
  // Al centro (angolo 0) z = RADIUS_Z, ai lati (angolo ±45°) z è più piccolo
  const z = useTransform(angle, (a) => Math.cos(a * (Math.PI / 180)) * RADIUS_Z - RADIUS_Z); // Centrato a z=0

  // 5. Calcoliamo la rotazione Y (corrisponde all'angolo sul cilindro)
  const rotateY = angle;

  // 6. Calcoliamo scala e opacità per accentuare la distanza
  const scale = useTransform(angle, (a) => 1 - Math.abs(a / 45) * 0.15); // Più piccole ai lati
  const opacity = useTransform(angle, (a) => 1 - Math.abs(a / 45) * 0.4); // Sfocano ai lati

  return (
    <motion.div
      ref={cardRef}
      style={{
        x,
        y,
        z,
        rotateY,
        scale,
        opacity,
        position: 'absolute', // POSIZIONAMENTO ASSOLUTO: fondamentale
        top: '50%', // Centrata verticalmente
        left: '50%', // Centrata orizzontalmente prima delle trasformazioni
        transformPerspective: 800, // Molto aggressivo per un effetto 3D marcato
      }}
      className="shrink-0"
    >
      <Link
        to={`/portfolio/${p.slug}`}
        draggable={false}
        className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-[4/3] block w-[320px] md:w-[340px]"
        style={{
          marginLeft: '-160px', // Metà della larghezza della card per centrarla veramente
          marginTop: '-120px', // Metà dell'altezza
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

const AUTOPLAY_SPEED = 24; // Leggermente più lento per assaporare l'effetto
const TRACK_WIDTH = CARD_WIDTH * trackProjects.length;
const LOOP_WIDTH = CARD_WIDTH * projects.length;

const PortfolioSection = () => {
  const trackX = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const isDragging = useRef(false);

  // Aggiorniamo la logica del loop perché il posizionamento è assoluto
  useAnimationFrame((_, delta) => {
    if (paused || isDragging.current) return;
    trackX.set(trackX.get() - (AUTOPLAY_SPEED * delta) / 1000);
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

      {/* Contenitore Carosello - deve avere altezza e prospettiva marcata */}
      <div
        className="relative w-full h-[600px]" // Altezza esplicita per contenere le card posizionate in assoluto
        style={{
          perspective: 800, // Effetto grandangolare molto forte
          transformStyle: "preserve-3d"
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {/* Sfumature laterali cinematografiche molto ampie */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-48 md:w-96 z-20 bg-gradient-to-r from-[hsl(0_0%_6%)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-48 md:w-96 z-20 bg-gradient-to-l from-[hsl(0_0%_6%)] to-transparent" />

        <motion.div
          className="relative w-full h-full cursor-grab active:cursor-grabbing"
          style={{
            x: 0, // Non spostiamo il track, ma solo le card al suo interno
            width: '100%',
            transformStyle: "preserve-3d",
          }}
          drag="x"
          // Il drag è più difficile da mappare sul loop virtuale, si consiglia l'autoplay per ora
          // dragConstraints={{ left: -TRACK_WIDTH, right: 0 }}
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
            <ProjectCard key={`${p.slug}-${i}`} p={p} index={i} trackX={trackX} />
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
