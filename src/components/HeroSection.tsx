import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import contentRoomLogo from "@/assets/contentroom-logo.png";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero-video.mov"
      />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl w-full flex flex-col items-center justify-center gap-[15px] sm:gap-5 lg:gap-0"
      >
        <motion.img
          src={contentRoomLogo}
          alt="Content Room"
          initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-auto w-[90%] max-w-xs sm:max-w-md lg:w-auto lg:max-w-none lg:h-112 lg:mb-2"
        />

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden lg:mb-4 lg:-mt-48"
        >
          <div className="flex items-center justify-center gap-4">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="w-10 h-px bg-gradient-to-r from-transparent to-primary/40 origin-right"
            />
            <p className="text-foreground font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase whitespace-nowrap">
              Content Creation · Social Media
            </p>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="w-10 h-px bg-gradient-to-l from-transparent to-primary/40 origin-left"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button variant="hero" size="lg" className="h-14 px-10 text-base rounded-full group relative overflow-hidden border-2 border-transparent hover:border-black hover:text-black hover:-translate-y-1 hover:shadow-[0_10px_30px_hsl(0_0%_0%_/_0.5)] transition-all duration-300">
            <span className="relative z-10">Prenota una call</span>
            <motion.div
              className="absolute inset-0 bg-primary/20 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </Button>
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
