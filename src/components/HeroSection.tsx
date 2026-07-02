import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/MagneticButton";

const EASE = [0.33, 1, 0.68, 1] as const;
const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.25 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const HeroSection = ({ splashDone = false }: { splashDone?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 160]);

  return (
    <section
      ref={ref}
      className="relative h-screen overflow-hidden flex items-center"
    >
      {/* Sfondo video — invisibile finché splashDone non diventa true */}
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            splashDone ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/MODEL_FINAL_CR.mp4" type="video/mp4" />
        </video>
        {/* Overlay nero per leggibilità testo */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Gradient fade verso il basso — raccordo con sezione beige */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      </motion.div>

      {/* TESTI HERO — commentati temporaneamente, riattivare rimuovendo i tag commento */}
      {/*
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 px-6 md:px-16 max-w-3xl"
      >
        {/* Eyebrow — localizzazione agenzia *\/}
        <motion.p
          variants={item}
          className="text-brand-orange font-body text-xs md:text-sm font-bold tracking-[0.1em] uppercase mb-5"
        >
          Digital Agency — Firenze
        </motion.p>

        {/* H1 — claim principale. Keyword celeste = "macchine di contenuti" *\/}
        <motion.h1
          variants={item}
          className="font-display font-black text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-white mb-6"
        >
          Trasformiamo brand in{" "}
          <span className="text-primary">macchine di contenuti.</span>
        </motion.h1>

        {/* Subheadline — pay-off + servizi *\/}
        <motion.p
          variants={item}
          className="text-white/75 font-body text-base md:text-lg leading-relaxed max-w-xl mb-8"
        >
          E i contenuti in risultati misurabili. Content strategy, produzione
          video e growth per chi non vuole solo "essere visto".
        </motion.p>

        {/* CTA primaria — porta a /contatti *\/}
        <motion.div variants={item}>
          <MagneticButton radius={60} strength={0.35} className="inline-block">
            <Button
              asChild
              variant="hero"
              size="lg"
              className="h-14 px-10 text-base rounded-2xl font-bold text-[hsl(192_35%_16%)] bg-primary hover:brightness-105 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Link to="/contatti">Prenota una call →</Link>
            </Button>
          </MagneticButton>
        </motion.div>
      </motion.div>
      */}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: splashDone ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <motion.span
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/50 text-xs tracking-[0.2em] uppercase font-body"
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center pt-1.5"
        >
          <motion.div
            animate={{ height: ["6px", "12px", "6px"], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
