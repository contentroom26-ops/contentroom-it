import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import InlineCTA from "./InlineCTA";
import portfolioSigillo from "@/assets/portfolio-sigillo.jpg";
import portfolioSetupEvents from "@/assets/portfolio-setupevents.jpg";
import portfolioMiamo from "@/assets/portfolio-miamo.jpg";
import portfolioShade from "@/assets/portfolio-shade.jpg";
import portfolioJasonDerulo from "@/assets/portfolio-jason-derulo.jpg";
import portfolioBonsalto from "@/assets/portfolio-bonsalto.jpg";
import portfolioRighi from "@/assets/portfolio-righi.jpg";

const ACCENT = "hsl(192 49% 76%)";

const projects = [
  { slug: "bonsalto", img: portfolioBonsalto, name: "Fattoria Bonsalto", result: "Social & Content Strategy", tag: "Social Media" },
  { slug: "righi", img: portfolioRighi, name: "Righi Studio", result: "Wedding Content & Social", tag: "Social Media" },
  { slug: "sigillo", img: portfolioSigillo, name: "Sigillo", result: "Nuovo sito corporate", tag: "Sito Web & Brand" },
  { slug: "setup-events", img: portfolioSetupEvents, name: "SetupEvents", result: "Nuovo sito corporate", tag: "Sito Web" },
  { slug: "miamo", img: portfolioMiamo, name: "MIAMO", result: "Inaugurazione MIAMO Lounge", tag: "Content & Production" },
  { slug: "shade", img: portfolioShade, name: "Shade", result: "Lancio singolo \"Toxic\"", tag: "Content & Production" },
  { slug: "jason-derulo", img: portfolioJasonDerulo, name: "Jason Derulo", result: "Copertura esclusiva live", tag: "Photo & Video" },
];

const CARD_WIDTH = 260;
const CARD_HEIGHT = 346;

const DUPLICATE_COUNT = 3;

const trackItems = Array.from({ length: projects.length * DUPLICATE_COUNT }, (_, i) => ({
  ...projects[i % projects.length],
  slotIndex: i,
}));
const TOTAL_SLOTS = trackItems.length;
const HALF_SLOTS = TOTAL_SLOTS / 2;

const SLOT_PX = 200;

const OFFSET_BREAKPOINTS = [-3, -2, -1, 0, 1, 2, 3];
const SCALE_VALUES = [1.27, 1.11, 0.93, 0.82, 0.93, 1.11, 1.27];
const ROTATE_VALUES = [82, 56, 30, 0, -30, -56, -82];
const X_VALUES = [-950, -560, -260, 0, 260, 560, 950];

const OPACITY_BREAKPOINTS = [-4, -3, 3, 4];
const OPACITY_VALUES = [0, 1, 1, 0];

const CLICK_THRESHOLD_PX = 6;

function ProjectCard({ p, slotIndex, trackX }: { p: any, slotIndex: number, trackX: any }) {
  const offset = useTransform(trackX, (latestX: number) => {
    let raw = slotIndex - latestX / SLOT_PX;
    raw = (((raw + HALF_SLOTS) % TOTAL_SLOTS) + TOTAL_SLOTS) % TOTAL_SLOTS - HALF_SLOTS;
    return raw;
  });

  const x = useTransform(offset, OFFSET_BREAKPOINTS, X_VALUES);
  const scale = useTransform(offset, OFFSET_BREAKPOINTS, SCALE_VALUES);
  const rotateY = useTransform(offset, OFFSET_BREAKPOINTS, ROTATE_VALUES);
  const opacity = useTransform(offset, OPACITY_BREAKPOINTS, OPACITY_VALUES);
  const zIndex = useTransform(offset, (o) => Math.round(100 - Math.abs(o) * 10));

  return (
    <motion.div
      data-slug={p.slug}
      style={{
        x, scale, rotateY, opacity, zIndex,
        position: 'absolute',
        left: '50%', top: '50%',
        width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px`,
        marginLeft: `-${CARD_WIDTH / 2}px`, marginTop: `-${CARD_HEIGHT / 2}px`,
        transformOrigin: "50% 50%",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
      className="project-card-3d shrink-0"
    >
      <Link
        to={`/portfolio/${p.slug}`}
        draggable={false}
        className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer group block"
        style={{ transformStyle: "preserve-3d" }}
        onClick={(e) => { e.preventDefault(); }}
      >
        <img src={p.img} alt={p.name} loading="lazy" draggable={false} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
  const navigate = useNavigate();
  const trackX = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const isDragging = useRef(false);
  const startDragX = useRef(0);
  const startTrackX = useRef(0);
  const totalMove = useRef(0);
  const pendingTarget = useRef<HTMLElement | null>(null);

  useAnimationFrame((_, delta) => {
    if (paused || isDragging.current) return;
    trackX.set(trackX.get() - (AUTOPLAY_SPEED * delta) / 1000);
  });

  return (
    <section className="section-dark relative px-6 py-20 md:py-28 overflow-hidden bg-black">
      <div className="flex flex-col gap-10 md:gap-14">

        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
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
          className="relative w-full h-[420px] overflow-visible select-none"
          style={{ perspective: "1600px", transformStyle: "preserve-3d", overflow: "visible", touchAction: "pan-y" }}
          onPointerDown={(e) => {
            isDragging.current = true;
            setPaused(true);
            startDragX.current = e.clientX;
            startTrackX.current = trackX.get();
            totalMove.current = 0;
            pendingTarget.current = (e.target as HTMLElement).closest("[data-slug]") as HTMLElement | null;
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!isDragging.current) return;
            const delta = e.clientX - startDragX.current;
            totalMove.current = Math.abs(delta);
            trackX.set(startTrackX.current + delta * 1.5);
          }}
          onPointerUp={(e) => {
            isDragging.current = false;
            setPaused(false);
            (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
            if (totalMove.current < CLICK_THRESHOLD_PX && pendingTarget.current?.dataset.slug) {
              navigate(`/portfolio/${pendingTarget.current.dataset.slug}`);
            }
            pendingTarget.current = null;
          }}
          onPointerCancel={(e) => {
            isDragging.current = false;
            setPaused(false);
            pendingTarget.current = null;
            try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
          }}
        >
          <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
            {trackItems.map((p) => <ProjectCard key={p.slotIndex} p={p} slotIndex={p.slotIndex} trackX={trackX} />)}
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 w-full -mt-8 md:-mt-10">
          <InlineCTA caption="Esplora tutti i nostri progetti e lasciati ispirare." label="Vedi il portfolio" to="/portfolio" />
        </div>

      </div>
    </section>
  );
};

export default PortfolioSection;
