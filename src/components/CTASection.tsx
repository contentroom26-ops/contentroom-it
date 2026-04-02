import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import textureWall from "@/assets/texture-wall.jpg";

const CYAN = "hsl(200 80% 74%)";

const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.2, 0.6], [60, 0]);

  return (
    <section ref={ref} className="relative px-4 py-20 md:py-32">
      <motion.div
        style={{ scale, opacity }}
        className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden"
      >
        {/* Wall texture background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${textureWall})`,
            backgroundSize: "400px 400px",
            backgroundRepeat: "repeat",
            filter: "brightness(0.35)",
          }}
        />

        {/* Subtle vignette on the wall */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, hsl(0 0% 3% / 0.7) 100%)",
          }}
        />

        {/* Engraved content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 md:py-36">
          {/* Chisel line accent */}
          <motion.div
            style={{ y: textY }}
            className="w-16 h-[2px] mb-10 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            style2={{}}
          >
            <div
              className="w-full h-full"
              style={{ background: CYAN, boxShadow: `0 0 12px ${CYAN}` }}
            />
          </motion.div>

          {/* Main engraved heading */}
          <motion.h2
            style={{ y: textY }}
            className="font-display font-bold tracking-tight leading-[1.05] mb-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="block"
              style={{
                fontSize: "clamp(2rem, 6vw, 4.5rem)",
                color: "transparent",
                WebkitTextStroke: "1px hsl(0 0% 30%)",
                textShadow:
                  "0 1px 0 hsl(0 0% 18%), 0 -1px 0 hsl(0 0% 6%), 0 0 10px hsl(0 0% 0% / 0.5)",
                filter: "drop-shadow(0 2px 4px hsl(0 0% 0% / 0.6))",
              }}
            >
              Vuoi crescere davvero
            </span>
            <span
              className="block mt-2"
              style={{
                fontSize: "clamp(2rem, 6vw, 4.5rem)",
                color: CYAN,
                textShadow: `0 0 30px hsl(200 80% 74% / 0.4), 0 0 60px hsl(200 80% 74% / 0.15), 0 2px 0 hsl(0 0% 5%)`,
                filter: `drop-shadow(0 0 20px hsl(200 80% 74% / 0.3))`,
              }}
            >
              sui social?
            </span>
          </motion.h2>

          {/* Subtitle — lightly etched */}
          <motion.p
            className="font-body text-sm md:text-base max-w-md mx-auto mb-10"
            style={{
              color: "hsl(0 0% 45%)",
              textShadow: "0 1px 2px hsl(0 0% 0% / 0.8)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            Prenota una call e analizziamo il tuo brand
          </motion.p>

          {/* CTA button — glowing on the wall */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-10 rounded-full text-sm font-display tracking-widest uppercase border-border/30 bg-transparent hover:bg-transparent relative overflow-hidden group"
              style={{
                color: CYAN,
                borderColor: "hsl(200 80% 74% / 0.3)",
                boxShadow: `0 0 20px hsl(200 80% 74% / 0.08), inset 0 0 20px hsl(200 80% 74% / 0.03)`,
              }}
            >
              <span className="relative z-10">Prenota ora</span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, hsl(200 80% 74% / 0.1), transparent)`,
                }}
              />
            </Button>
          </motion.div>
        </div>

        {/* Engraved border effect — inset shadow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{
            boxShadow:
              "inset 0 2px 8px hsl(0 0% 0% / 0.6), inset 0 -2px 8px hsl(0 0% 0% / 0.6), inset 2px 0 8px hsl(0 0% 0% / 0.4), inset -2px 0 8px hsl(0 0% 0% / 0.4)",
            border: "1px solid hsl(0 0% 15%)",
          }}
        />
      </motion.div>
    </section>
  );
};

export default CTASection;
