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
  { slug: "placeholder-5", img: portfolio1, name: "Progetto 5", result: "+XXk risultati", tag: "Da personalizzare" },
  { slug: "placeholder-6", img: portfolio2, name: "Progetto 6", result: "+XXk risultati", tag: "Da personalizzare" },
  { slug: "placeholder-7", img: portfolio3, name: "Progetto 7", result: "+XXk risultati", tag: "Da personalizzare" },
];

// PARAMETRI GEOMETRICI (Configurati per effetto IMAX concavo)
const RADIUS = 1400;        // Distanza focale dell'arco
const ANGULAR_GAP = 30;     // Spaziatura tra le card
const CARD_WIDTH = 260;     // Larghezza card ridotta
const CARD_HEIGHT = 346;    // Altezza card proporzionata
const trackProjects = [...projects, ...projects, ...projects, ...projects, ...projects];
const TOTAL_DEGREES = trackProjects.length * ANGULAR_GAP;

function ProjectCard({ p, index, trackX }: { p: any, index: number, trackX: any }) {
  const angle = useTransform(trackX, (latestX: number) => {
    let a = (index * ANGULAR_GAP + latestX * 0.05) % TOTAL_DEGREES;
    if (a < 0) a += TOTAL_DEGREES;
    let finalAngle = a - (TOTAL_DEGREES / 2);
    if (finalAngle > 180) finalAngle -= 360;
    if (finalAngle < -180) finalAngle += 360;
    return finalAngle;
  });

  // GEOMETRIA IMAX: X = seno, Z = (1-coseno) per far avanzare le laterali verso l'utente
  const x = useTransform(angle, (a) => Math.sin(a * (Math.PI / 180)) * RADIUS);
  const z = useTransform(angle, (a) => (1 - Math.cos(a * (Math.PI / 180))) * RADIUS);
  const rotateY = useTransform(angle, (a) => -a);

  const scale = useTransform(angle, [-45, 0, 45], [0.95, 1, 0.95]);
  const opacity = useTransform(angle, [-60, -30, 0, 30, 60], [0, 0.8, 1, 0.8, 0]);

  return (
    <motion.div
      style={{
        x,
        z,
        rotateY,
        scale,
        opacity,
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: `${CARD_WIDTH}px`,
        height: `${CARD_HEIGHT}px`,
        marginLeft: `-${CARD_WIDTH / 2}px`,
        marginTop: `-${CARD_HEIGHT / 2}px`,
        transformStyle: "preserve-3d",
      }}
      className="shrink-0"
    >
      <Link
        to={`/portfolio/${p.slug}`}
        draggable={false}
        className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer group block"
        style={{ transformStyle: "preserve-3d" }}
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
            <p className="font-body text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: ACCENT }}>{p.tag}</p>
            <p className="font-body text-xs text-white/70 tracking-wider uppercase">Scopri il case study →</p>
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
    trackX.set(trackX.get() - (AUTOPLAY_SPEED * delta) / 1000);
  });

  return (
    <section className="section-dark relative px-6 py-20 md:py-28 overflow-hidden bg-black">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-0.5 bg-brand-orange" />
            <span className="font-body font-bold text-xs tracking-[0.4em] uppercase text-brand-orange">Portfolio</span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-white">
            Progetti <span className="text-primary">selezionati.</span>
          </h2>
        </motion.div>
      </div>

      <div
        className="relative w-full h-[550px] overflow-visible select-none"
        style={{ perspective: 1200, transformStyle: "preserve-3d" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPointerDown={(e) => { isDragging.current = true; setPaused(true); startDragX.current = e.clientX; startTrackX.current = trackX.get(); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); }}
        onPointerMove={(e) => { if (!isDragging.current) return; trackX.set(startTrackX.current + (e.clientX - startDragX.current) * 1.5); }}
        onPointerUp={(e) => { isDragging.current = false; setPaused(false); (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-48 z-20 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-48 z-20 bg-gradient-to-l from-black to-transparent" />
        <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
          {trackProjects.map((p, i) => <ProjectCard key={`${p.slug}-${i}`} p={p} index={i} trackX={trackX} />)}
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 mt-6">
        <InlineCTA caption="Esplora tutti i nostri progetti e lasciati ispirare." label="Vedi il portfolio" to="/portfolio" />
      </div>
    </section>
  );
};

export default PortfolioSection;
