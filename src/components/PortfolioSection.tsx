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

// PARAMETRI DEL CILINDRO ORBITALE
const RADIUS_Z = 850;       // Distanza tra l'utente (centro) e la parete del cilindro. Più è alto, più la curva è ampia.
const ANGULAR_GAP = 26;     // Spaziatura in GRADI tra una card e l'altra lungo la circonferenza.
const trackProjects = [...projects, ...projects, ...projects, ...projects, ...projects];
const TOTAL_DEGREES = trackProjects.length * ANGULAR_GAP;

function ProjectCard({
  p,
  index,
  trackX,
}: {
  p: (typeof projects)[number];
  index: number;
  trackX: ReturnType<typeof useMotionValue<number>>;
}) {
  
  // Mappiamo lo scorrimento dei pixel (trackX) in gradi di rotazione sul cilindro
  const rotateY = useTransform(trackX, (latestX) => {
    // Calcoliamo l'angolo base di questa card sul nastro circolare
    let angle = (index * ANGULAR_GAP + latestX * 0.05) % TOTAL_DEGREES;
    
    if (angle < 0) angle += TOTAL_DEGREES;
    
    // Centriamo l'angolo rispetto alla visuale frontale (spostiamo il loop in modo che orbiti davanti a noi)
    let finalAngle = angle - (TOTAL_DEGREES / 2);
    
    // Ottimizzazione: se la card finisce completamente dietro le spalle (> 90° o < -90°), la riportiamo davanti per il loop continuo
    if (finalAngle > 180) finalAngle -= 360;
    if (finalAngle < -180) finalAngle += 360;
    
    return finalAngle;
  });

  // Dissolvenza ai lati: se la card si allontana dall'angolo visivo frontale (0°), sfuma nell'oscurità
  const opacity = useTransform(rotateY, [-70, -45, 0, 45, 70], [0, 0.8, 1, 0.8, 0]);
  
  // Un leggerissimo scale di compensazione visiva per le card periferiche
  const scale = useTransform(rotateY, [-50, 0, 50], [0.92, 1, 0.92]);

  return (
    <motion.div
      style={{
        rotateY: rotateY,
        scale: scale,
        opacity: opacity,
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: '340px', // Larghezza fissa della card
        height: '453px', // Altezza proporzionata (aspect 3/4)
        marginLeft: '-170px', // Centratura esatta sull'asse di rotazione
        marginTop: '-226px',
        
        // IL SEGRETO GEOMETRICO: Muove il perno di rotazione indietro di RADIUS_Z pixel.
        // La card non ruota più su se stessa, ma orbita sulla superficie del cilindro attorno a te.
        transformOrigin: `center center -${RADIUS_Z}px`,
        transformStyle: "preserve-3d",
      }}
      className="shrink-0"
    >
      <Link
        to={`/portfolio/${p.slug}`}
        draggable={false}
        className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer group block"
        style={{ transformStyle: "preserve-3d" }}
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

const AUTOPLAY_SPEED = 30; 

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
    trackX.set(startTrackX.current + deltaX * 1.5); 
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

      {/* Contenitore Palcoscenico Cilindrico */}
      <div
        className="relative w-full h-[550px] overflow-visible select-none"
        style={{
          perspective: 1100, // Regola la forza tridimensionale complessiva dello schermo curvo
          transformStyle: "preserve-3d"
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Sfumature per nascondere i lati che vanno verso lo sfondo */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-48 z-20 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-48 z-20 bg-gradient-to-l from-black to-transparent" />

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
