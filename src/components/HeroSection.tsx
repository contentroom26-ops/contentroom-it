import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/MagneticButton";
import contentRoomLogo from "@/assets/contentroom-logo.png";

const EASE = [0.33, 1, 0.68, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.25 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.8, ease: EASE },
  },
};

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  // Parallax: background slower than foreground
  const { scrollY } = useScroll();
  // Parallax only on background (foreground stays in place per user preference)
  const yBg = useTransform(scrollY, [0, 800], [0, 160]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* Parallax video background */}
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-[120%] object-cover"
          src="/hero-video.mov"
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute inset-0 hero-mesh-gradient pointer-events-none mix-blend-screen opacity-80" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(0_0%_0%/0.55)_100%)]" />
      </motion.div>

      {/* Orchestrated foreground content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        <motion.img
          variants={item}
          src={contentRoomLogo}
          alt="Content Room"
          className="h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-112 w-auto mx-auto mb-2"
        />

        <motion.div
          variants={item}
          className="overflow-hidden mb-4 -mt-8 sm:-mt-16 md:-mt-24 lg:-mt-32 xl:-mt-40"
        >
          <div className="flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-gradient-to-r from-transparent to-primary/40" />
            <p className="text-foreground font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase whitespace-nowrap">
              Content Creation · Social Media
            </p>
            <span className="w-10 h-px bg-gradient-to-l from-transparent to-primary/40" />
          </div>
        </motion.div>

        <motion.div variants={item}>
          <MagneticButton radius={60} strength={0.35} className="inline-block">
            <Button asChild variant="hero" size="lg" className="btn-glow h-14 px-10 text-base rounded-full group relative overflow-hidden border-2 border-transparent hover:border-black hover:text-black hover:-translate-y-1 transition-all duration-300">
              <Link to="/contatti">
                <span className="relative z-10">Prenota una call</span>
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </Link>
            </Button>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <motion.span
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-muted-foreground/50 text-xs tracking-[0.2em] uppercase font-body"
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5"
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
