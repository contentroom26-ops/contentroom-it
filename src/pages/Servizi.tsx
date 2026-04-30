import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { Aperture, Share2, Rocket, Code2, Check, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalVideoBackground from "@/components/GlobalVideoBackground";
import InlineCTA from "@/components/InlineCTA";

const HERO_TEXT_SHADOW =
  "0 2px 8px hsl(0 0% 0% / 0.85), 0 0 28px hsl(0 0% 0% / 0.6)";

const CELESTE = "hsl(192 49% 76%)";

const services = [
  {
    icon: Aperture,
    num: "01",
    title: "Content Creation",
    desc: "Trasformiamo idee in contenuti visivi ad alto impatto. Video, foto e grafiche pensate per emozionare, convertire e raccontare il tuo brand con un linguaggio coerente e riconoscibile su ogni piattaforma.",
    includes: [
      "Video editoriali e brand video",
      "Shooting fotografici professionali",
      "Reels e contenuti short-form",
      "Motion graphics e animazioni",
      "Copywriting e storytelling",
    ],
  },
  {
    icon: Share2,
    num: "02",
    title: "Social Media Management",
    desc: "Gestiamo i tuoi canali social con un approccio strategico ed editoriale. Creiamo piani su misura, presidiamo la community e analizziamo i dati per far crescere la tua presenza online in modo sostenibile.",
    includes: [
      "Piano editoriale mensile",
      "Pubblicazione e scheduling",
      "Community management",
      "Reportistica mensile dettagliata",
      "Brand identity sui social",
    ],
  },
  {
    icon: Rocket,
    num: "03",
    title: "Growth & Marketing",
    desc: "Strategie data-driven per scalare il tuo business. Costruiamo funnel di acquisizione, gestiamo campagne ads multi-piattaforma e ottimizziamo ogni euro investito per generare risultati concreti e misurabili.",
    includes: [
      "Meta Ads, TikTok Ads, Google Ads",
      "Funnel di acquisizione e lead gen",
      "Email marketing e automation",
      "A/B testing e ottimizzazione CRO",
      "Analytics e dashboard custom",
    ],
  },
  {
    icon: Code2,
    num: "04",
    title: "Siti & Digitalizzazione",
    desc: "Progettiamo e sviluppiamo siti web ed esperienze digitali che convertono. Dal design alla performance, ogni dettaglio è curato per offrire un'esperienza fluida, veloce e perfettamente in linea con il tuo brand.",
    includes: [
      "Siti vetrina e landing page",
      "E-commerce e Shopify custom",
      "UX/UI design e prototipazione",
      "SEO tecnica e on-page",
      "Manutenzione e hosting",
    ],
  },
];

const method = [
  { step: "01", name: "Discovery", desc: "Analizziamo brand, mercato e obiettivi per costruire fondamenta solide." },
  { step: "02", name: "Strategia", desc: "Definiamo positioning, tone of voice e roadmap operativa." },
  { step: "03", name: "Produzione", desc: "Creiamo contenuti e attiviamo i canali con esecuzione impeccabile." },
  { step: "04", name: "Analisi", desc: "Misuriamo, ottimizziamo e iteriamo per massimizzare i risultati." },
];

const Servizi = () => {
  return (
    <>
      <GlobalVideoBackground />
      <main className="relative z-10 min-h-screen overflow-x-hidden">
        <Navbar />

        {/* Hero */}
        <section className="pt-40 pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-8 md:p-12 border"
              style={{
                background: "linear-gradient(160deg, hsl(0 0% 5% / 0.78), hsl(0 0% 3% / 0.88))",
                borderColor: "hsl(0 0% 100% / 0.08)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5)",
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px" style={{ background: CELESTE }} />
                <p className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: CELESTE }}>
                  Servizi
                </p>
              </div>
              <h1
                className="font-display font-bold tracking-tight leading-[1.05] mb-6 text-foreground"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", textShadow: HERO_TEXT_SHADOW }}
              >
                Quattro pilastri.<br />
                <span style={{ color: "hsl(0 0% 75%)" }}>Un unico obiettivo.</span>
              </h1>
              <p
                className="font-body text-base md:text-lg max-w-2xl"
                style={{ color: "hsl(0 0% 92%)", textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}
              >
                Dalla strategia alla produzione, dalla crescita alla digitalizzazione. Tutto sotto lo stesso tetto, con un metodo chiaro e risultati misurabili.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto space-y-24 md:space-y-32">
            {services.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="grid md:grid-cols-12 gap-8 md:gap-12 items-start rounded-3xl p-8 md:p-10 border"
                style={{
                  background: "linear-gradient(160deg, hsl(0 0% 5% / 0.78), hsl(0 0% 3% / 0.88))",
                  borderColor: "hsl(0 0% 100% / 0.08)",
                  backdropFilter: "blur(18px)",
                  boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5)",
                }}
              >
                {/* Left: number + icon */}
                <div className="md:col-span-4">
                  <div className="sticky top-32">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{
                        background: "linear-gradient(135deg, hsl(192 49% 76% / 0.22), hsl(192 49% 76% / 0.06))",
                        border: "1px solid hsl(192 49% 76% / 0.4)",
                        boxShadow: "0 0 24px hsl(192 49% 76% / 0.25)",
                      }}
                    >
                      <s.icon className="w-7 h-7" style={{ color: CELESTE }} strokeWidth={1.5} />
                    </div>
                    <span
                      className="font-display font-light"
                      style={{
                        fontSize: "clamp(4rem, 9vw, 7rem)",
                        lineHeight: 0.85,
                        WebkitTextStroke: `1.5px ${CELESTE}`,
                        color: "transparent",
                        textShadow: "0 0 30px hsl(192 49% 76% / 0.4)",
                      }}
                    >
                      {s.num}
                    </span>
                  </div>
                </div>

                {/* Right: content */}
                <div className="md:col-span-8">
                  <h2
                    className="font-display font-bold tracking-tight mb-5 leading-[1.05] text-foreground"
                    style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.8rem)", textShadow: HERO_TEXT_SHADOW }}
                  >
                    {s.title}
                  </h2>
                  <p
                    className="font-body text-base md:text-lg leading-relaxed mb-8"
                    style={{ color: "hsl(0 0% 92%)", textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}
                  >
                    {s.desc}
                  </p>

                  <div
                    className="rounded-2xl p-6 md:p-8 border"
                    style={{
                      background: "hsl(0 0% 7% / 0.6)",
                      borderColor: "hsl(0 0% 100% / 0.08)",
                      backdropFilter: "blur(20px)",
                    }}
                  >
                    <p
                      className="font-body text-[10px] tracking-[0.4em] uppercase mb-5"
                      style={{ color: CELESTE }}
                    >
                      Cosa include
                    </p>
                    <ul className="space-y-3">
                      {s.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Check className="w-4 h-4 mt-1 shrink-0" style={{ color: CELESTE }} strokeWidth={2} />
                          <span className="font-body text-sm md:text-base text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Metodo */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-8 md:p-10 mb-10 border inline-block"
              style={{
                background: "linear-gradient(160deg, hsl(0 0% 5% / 0.78), hsl(0 0% 3% / 0.88))",
                borderColor: "hsl(0 0% 100% / 0.08)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5)",
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px" style={{ background: CELESTE }} />
                <p className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: CELESTE }}>
                  Il nostro metodo
                </p>
              </div>
              <h2
                className="font-display font-bold tracking-tight leading-[1.05] text-foreground"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)", textShadow: HERO_TEXT_SHADOW }}
              >
                Come<br />
                <span style={{ color: "hsl(0 0% 75%)" }}>lavoriamo.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {method.map((m, i) => (
                <motion.div
                  key={m.step}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative p-7 rounded-2xl border"
                  style={{
                    background: "linear-gradient(160deg, hsl(0 0% 7% / 0.85), hsl(0 0% 4% / 0.95))",
                    borderColor: "hsl(0 0% 100% / 0.08)",
                    backdropFilter: "blur(18px)",
                  }}
                >
                  <span
                    className="font-display font-light block mb-6"
                    style={{
                      fontSize: "2.8rem",
                      lineHeight: 1,
                      WebkitTextStroke: `1px ${CELESTE}`,
                      color: "transparent",
                    }}
                  >
                    {m.step}
                  </span>
                  <h3 className="font-display font-semibold text-xl mb-2">{m.name}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center rounded-3xl p-10 md:p-14 border"
            style={{
              background: "linear-gradient(160deg, hsl(0 0% 5% / 0.82), hsl(0 0% 3% / 0.92))",
              borderColor: "hsl(0 0% 100% / 0.08)",
              backdropFilter: "blur(18px)",
              boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5)",
            }}
          >
            <h2
              className="font-display font-bold tracking-tight leading-[1.05] mb-6 text-foreground"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", textShadow: HERO_TEXT_SHADOW }}
            >
              Pronto a iniziare?
            </h2>
            <p
              className="font-body text-base md:text-lg mb-4 max-w-xl mx-auto"
              style={{ color: "hsl(0 0% 90%)", textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}
            >
              Raccontaci il tuo progetto. Ti ricontattiamo entro 24h con il prossimo step giusto per te.
            </p>
            <InlineCTA label="Prenota una call" to="/contatti" />
          </motion.div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Servizi;
