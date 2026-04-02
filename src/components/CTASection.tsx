import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CYAN = "hsl(200 80% 74%)";

const CTASection = () => {
  return (
    <section className="relative px-4 py-28 md:py-40">
      {/* No background at all — pure transparency to show the 3D room wall */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        {/* Engraved heading — carved into concrete */}
        <motion.h2
          className="font-display font-bold tracking-tight leading-[1.05] mb-5"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="block"
            style={{
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              color: "hsl(0 0% 15%)",
              textShadow:
                "0 2px 3px hsl(0 0% 25% / 0.6), 0 -1px 1px hsl(0 0% 0% / 0.9), inset 0 0 0 transparent",
              WebkitTextStroke: "0.5px hsl(0 0% 20%)",
              mixBlendMode: "luminosity",
            }}
          >
            Vuoi crescere davvero
          </span>
          <span
            className="block mt-2"
            style={{
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              color: CYAN,
              textShadow: `0 0 40px hsl(200 80% 74% / 0.5), 0 0 100px hsl(200 80% 74% / 0.2), 0 2px 4px hsl(0 0% 0% / 0.9), 0 -1px 1px hsl(0 0% 25% / 0.3)`,
              mixBlendMode: "screen",
            }}
          >
            sui social?
          </span>
        </motion.h2>

        {/* Etched subtitle */}
        <motion.p
          className="font-body text-sm md:text-base max-w-md mx-auto mb-12"
          style={{
            color: "hsl(0 0% 32%)",
            textShadow: "0 1px 2px hsl(0 0% 25% / 0.4), 0 -1px 1px hsl(0 0% 0% / 0.8)",
            mixBlendMode: "luminosity",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Prenota una call e analizziamo il tuo brand
        </motion.p>

        {/* CTA button — engraved/recessed into wall */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button
            variant="outline"
            size="lg"
            className="h-14 px-10 rounded-full text-sm font-display tracking-widest uppercase bg-transparent hover:bg-transparent relative overflow-hidden group"
            style={{
              color: CYAN,
              borderColor: "hsl(200 80% 74% / 0.25)",
              boxShadow: `inset 0 2px 4px hsl(0 0% 0% / 0.5), inset 0 -1px 2px hsl(0 0% 25% / 0.3), 0 0 30px hsl(200 80% 74% / 0.08)`,
              textShadow: `0 0 15px hsl(200 80% 74% / 0.5)`,
            }}
          >
            <span className="relative z-10">Prenota ora</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(ellipse at center, hsl(200 80% 74% / 0.08), transparent 70%)`,
              }}
            />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
