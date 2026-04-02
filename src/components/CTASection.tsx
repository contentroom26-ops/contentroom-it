import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CYAN = "hsl(200 80% 74%)";

const CTASection = () => {
  return (
    <section className="relative px-4 py-28 md:py-40">
      {/* Fully transparent — the 3D room wall shows through */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        {/* Accent line */}
        <motion.div
          className="w-12 h-[1px] mb-10"
          style={{ background: CYAN, boxShadow: `0 0 12px ${CYAN}` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Engraved heading */}
        <motion.h2
          className="font-display font-bold tracking-tight leading-[1.05] mb-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="block"
            style={{
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              color: "hsl(0 0% 22%)",
              textShadow:
                "0 1px 0 hsl(0 0% 25%), 0 -1px 2px hsl(0 0% 3%), 1px 1px 3px hsl(0 0% 0% / 0.7)",
            }}
          >
            Vuoi crescere davvero
          </span>
          <span
            className="block mt-2"
            style={{
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              color: CYAN,
              textShadow: `0 0 30px hsl(200 80% 74% / 0.5), 0 0 80px hsl(200 80% 74% / 0.15), 0 2px 4px hsl(0 0% 0% / 0.8)`,
            }}
          >
            sui social?
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="font-body text-sm md:text-base max-w-md mx-auto mb-10"
          style={{
            color: "hsl(0 0% 40%)",
            textShadow: "0 1px 3px hsl(0 0% 0% / 0.9)",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          Prenota una call e analizziamo il tuo brand
        </motion.p>

        {/* CTA button */}
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
              boxShadow: `0 0 25px hsl(200 80% 74% / 0.1), inset 0 0 20px hsl(200 80% 74% / 0.04)`,
              textShadow: `0 0 10px hsl(200 80% 74% / 0.4)`,
            }}
          >
            <span className="relative z-10">Prenota ora</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, hsl(200 80% 74% / 0.12), transparent)`,
              }}
            />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
