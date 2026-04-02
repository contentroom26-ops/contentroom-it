import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Target, Heart, Award } from "lucide-react";
import contentRoomLogo from "@/assets/contentroom-logo.png";

const values = [
  { icon: Zap, title: "Innovazione", desc: "Tecniche all'avanguardia, tool di ultima generazione, idee che rompono gli schemi." },
  { icon: Target, title: "Strategia", desc: "Ogni azione è guidata dai dati e dagli obiettivi. Zero improvvisazione." },
  { icon: Heart, title: "Passione", desc: "Amiamo quello che facciamo. Si vede nei risultati e nella cura dei dettagli." },
  { icon: Award, title: "Eccellenza", desc: "Non ci accontentiamo. Ogni progetto è un'opportunità per superare le aspettative." },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-32 md:py-40 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]"
        style={{
          background: "radial-gradient(ellipse at 100% 50%, hsl(38 90% 55%), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-24">
          {/* Left — editorial text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
              Chi siamo
            </p>
            <h2
              className="font-display font-bold text-foreground tracking-tight leading-[1.05] mb-8"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              Il tuo brand, <br />
              la nostra <span className="text-primary">visione.</span>
            </h2>
            <div className="space-y-5">
              <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed">
                Content Room è l'agenzia creativa che trasforma brand in esperienze digitali 
                memorabili. Uniamo strategia, creatività e dati per far crescere il tuo business 
                sui social e sul web.
              </p>
              <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed">
                Non crediamo nei template. Ogni progetto nasce da un ascolto profondo delle 
                esigenze del cliente e si sviluppa con un approccio sartoriale.
              </p>
            </div>

            <motion.img
              src={contentRoomLogo}
              alt="Content Room"
              className="h-14 w-auto mt-10 opacity-60"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.6 } : {}}
              transition={{ delay: 0.4 }}
            />
          </motion.div>

          {/* Right — stats */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-2 gap-8">
              {[
                { value: "50+", label: "Clienti soddisfatti" },
                { value: "500k+", label: "Views generate" },
                { value: "+300%", label: "Engagement medio" },
                { value: "98%", label: "Client retention" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center md:text-left p-6 rounded-2xl"
                  style={{
                    background: "hsl(0 0% 100% / 0.02)",
                    border: "1px solid hsl(0 0% 100% / 0.05)",
                  }}
                >
                  <span className="font-display font-bold text-3xl md:text-4xl text-primary block mb-2">
                    {stat.value}
                  </span>
                  <span className="font-body text-xs text-muted-foreground tracking-wider uppercase">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Values grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="font-body text-xs tracking-[0.4em] uppercase text-muted-foreground mb-8 text-center">
            I nostri valori
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="group rounded-2xl p-6 text-center transition-all duration-500 hover:border-primary/20"
                  style={{
                    background: "hsl(0 0% 100% / 0.02)",
                    border: "1px solid hsl(0 0% 100% / 0.05)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: "hsl(38 90% 55% / 0.08)",
                      border: "1px solid hsl(38 90% 55% / 0.15)",
                    }}
                  >
                    <Icon size={18} strokeWidth={1.5} className="text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-base mb-2 text-foreground">{val.title}</h3>
                  <p className="font-body text-xs leading-relaxed text-muted-foreground">{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
