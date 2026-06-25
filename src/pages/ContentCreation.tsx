import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Video,
  Camera,
  PenTool,
  Lightbulb,
  Clapperboard,
  Send,
  ArrowRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalVideoBackground from "@/components/GlobalVideoBackground";
import InlineCTA from "@/components/InlineCTA";

const CELESTE = "hsl(192 49% 76%)";
const HERO_TEXT_SHADOW =
  "0 2px 8px hsl(0 0% 0% / 0.85), 0 0 28px hsl(0 0% 0% / 0.6)";

/* ⚠️ PERSONALIZZA — le 3 domande/problemi del tuo cliente tipo */
const problems = [
  "Pubblichi contenuti ma non si distinguono da quelli di tutti gli altri?",
  "Ogni post richiede ore tra idea, produzione e montaggio?",
  "I tuoi video e le tue foto non rispecchiano il livello del tuo brand?",
];

/* ⚠️ PERSONALIZZA — cosa offri davvero, con before/after reali */
const offerings = [
  {
    icon: Video,
    num: "01",
    title: "Video che fermano lo scroll",
    before:
      "Video girati col telefono, senza un'idea dietro, che passano inosservati nel feed.",
    after:
      "Contenuti video pensati per la piattaforma e per il tuo pubblico: dal concept allo storyboard, dalle riprese al montaggio. Format riconoscibili che costruiscono identità e trattengono l'attenzione.",
  },
  {
    icon: Camera,
    num: "02",
    title: "Foto e shooting di prodotto",
    before:
      "Immagini di prodotto improvvisate che non rendono giustizia a ciò che vendi.",
    after:
      "Shooting curati in ogni dettaglio — luce, set, post-produzione — per mostrare i tuoi prodotti e il tuo brand al meglio, con uno stile coerente su tutti i canali.",
  },
  {
    icon: PenTool,
    num: "03",
    title: "Grafiche e identità visiva",
    before:
      "Grafiche fai-da-te, diverse ogni volta, che indeboliscono la riconoscibilità.",
    after:
      "Un sistema visivo coerente — template, palette, tipografia — che rende ogni contenuto immediatamente riconoscibile come tuo e professionale in ogni formato.",
  },
];

/* ⚠️ PERSONALIZZA — il tuo processo reale */
const steps = [
  {
    icon: Lightbulb,
    num: "01",
    name: "Concept",
    desc: "Partiamo dalla tua strategia e dal tuo pubblico per definire idee e format che funzionano.",
  },
  {
    icon: Clapperboard,
    num: "02",
    name: "Produzione",
    desc: "Realizziamo video, foto e grafiche curando ogni fase, dalla ripresa alla post-produzione.",
  },
  {
    icon: Send,
    num: "03",
    name: "Pubblicazione",
    desc: "Consegniamo contenuti ottimizzati per ogni piattaforma, pronti a performare.",
  },
];

/* ⚠️ PERSONALIZZA — domande vere che ti fanno i clienti */
const faqs = [
  {
    q: "Vi occupate anche delle riprese o solo del montaggio?",
    a: "Gestiamo l'intero processo: concept, riprese, montaggio e post-produzione. Possiamo anche lavorare su materiale che ci fornisci, se preferisci.",
  },
  {
    q: "In quanto tempo consegnate i contenuti?",
    a: "Dipende dal volume e dal tipo di produzione. Definiamo insieme un piano editoriale con tempi chiari e rispettati.",
  },
  {
    q: "Quanto costa un progetto di content creation?",
    a: "Il costo dipende dal numero di contenuti e dal tipo di produzione. Lavoriamo su pacchetti mensili o progetti singoli. Richiedi una call gratuita per una valutazione sul tuo caso.",
  },
];

const ContentCreation = () => {
  const canonical = "https://www.contentroom.it/content-creation";

  return (
    <>
      <Helmet>
        {/* ⚠️ PERSONALIZZA — title e description per la SEO */}
        <title>Content Creation: Video, Foto e Grafiche | Content Room — Firenze</title>
        <meta
          name="description"
          content="Produzione di video, foto e grafiche che catturano l'attenzione e raccontano il tuo brand. Dal concept alla pubblicazione, contenuti originali ottimizzati per ogni piattaforma."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Content Creation | Content Room" />
        <meta
          property="og:description"
          content="Video, foto e grafiche che catturano l'attenzione e raccontano il tuo brand. Dal concept alla pubblicazione."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Content creation: video, foto e grafiche",
          provider: {
            "@type": "Organization",
            name: "Content Room",
            url: "https://www.contentroom.it",
          },
          areaServed: "IT",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Content Creation",
            itemListElement: [
              "Produzione video",
              "Fotografia e shooting di prodotto",
              "Grafiche e identità visiva",
            ].map((name) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name },
            })),
          },
        })}</script>
      </Helmet>

      <GlobalVideoBackground />
      <main className="relative z-10 min-h-screen overflow-x-hidden">
        <Navbar />

        {/* 1. Hero */}
        <section className="relative pt-40 pb-20 px-6 min-h-[90vh] flex flex-col">
          <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-8 md:p-12 border"
              style={{
                background: "linear-gradient(160deg, rgba(10,10,10,0.7), hsl(0 0% 3% / 0.88))",
                borderColor: "hsl(0 0% 100% / 0.08)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5)",
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px" style={{ background: CELESTE }} />
                <p className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: CELESTE }}>
                  Content Creation
                </p>
              </div>
              {/* ⚠️ PERSONALIZZA — headline principale */}
              <h1
                className="font-display font-bold tracking-tight leading-[1.05] mb-6 text-foreground"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", textShadow: HERO_TEXT_SHADOW }}
              >
                Contenuti che fermano lo scroll e raccontano chi sei.
              </h1>
              {/* ⚠️ PERSONALIZZA — sottotitolo */}
              <p
                className="font-body text-base md:text-lg max-w-2xl"
                style={{ color: "hsl(0 0% 92%)", textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}
              >
                Video, foto e grafiche prodotti dal concept alla pubblicazione. Contenuti
                originali, coerenti e ottimizzati per ogni piattaforma, pensati per
                distinguere il tuo brand.
              </p>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col items-center gap-3 mt-8 mb-4"
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

        {/* 2. Problema */}
        <section className="py-[50px] px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-8 md:p-12 border"
              style={{
                background: "linear-gradient(160deg, rgba(10,10,10,0.7), hsl(0 0% 3% / 0.88))",
                borderColor: "hsl(0 0% 100% / 0.08)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5)",
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px" style={{ background: CELESTE }} />
                <p className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: CELESTE }}>
                  Il problema
                </p>
              </div>
              {/* ⚠️ PERSONALIZZA — titolo sezione problema */}
              <h2
                className="font-display font-bold tracking-tight leading-[1.05] mb-10 text-foreground"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", textShadow: HERO_TEXT_SHADOW }}
              >
                Creare contenuti che funzionano<br />
                <span style={{ color: "hsl(0 0% 75%)" }}>richiede tempo e metodo.</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                {problems.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl p-6 md:p-7 border"
                    style={{
                      background: "linear-gradient(160deg, hsl(0 0% 7% / 0.85), hsl(0 0% 4% / 0.95))",
                      borderColor: "hsl(0 0% 100% / 0.08)",
                      backdropFilter: "blur(18px)",
                    }}
                  >
                    <span
                      className="font-display font-light block mb-4 leading-none"
                      style={{
                        fontSize: "2.4rem",
                        WebkitTextStroke: `1px ${CELESTE}`,
                        color: "transparent",
                      }}
                    >
                      0{i + 1}
                    </span>
                    <p
                      className="font-body text-base md:text-lg leading-relaxed"
                      style={{ color: "hsl(0 0% 90%)", textShadow: "0 1px 4px hsl(0 0% 0% / 0.6)" }}
                    >
                      {p}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* ⚠️ PERSONALIZZA — frase ponte */}
              <p
                className="font-body text-base md:text-lg leading-relaxed max-w-3xl"
                style={{ color: "hsl(0 0% 92%)", textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}
              >
                Content Room produce contenuti con metodo: dall'idea alla pubblicazione,
                pensati per distinguere il tuo brand e performare su ogni canale.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 3. Cosa facciamo (prima / dopo) */}
        <section className="py-[50px] px-6">
          <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
            {offerings.map((o, i) => {
              const Icon = o.icon;
              const reverse = i % 2 === 1;
              return (
                <motion.div
                  key={o.num}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-3xl p-8 md:p-12 border"
                  style={{
                    background: "linear-gradient(160deg, rgba(10,10,10,0.7), hsl(0 0% 3% / 0.88))",
                    borderColor: "hsl(0 0% 100% / 0.08)",
                    backdropFilter: "blur(18px)",
                    boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5)",
                  }}
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                      reverse ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    {/* Heading side */}
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                          style={{
                            background:
                              "linear-gradient(135deg, hsl(192 49% 76% / 0.22), hsl(192 49% 76% / 0.06))",
                            border: "1px solid hsl(192 49% 76% / 0.4)",
                            boxShadow: "0 0 24px hsl(192 49% 76% / 0.25)",
                          }}
                        >
                          <Icon className="w-6 h-6" style={{ color: CELESTE }} strokeWidth={1.5} />
                        </div>
                        <span
                          className="font-display font-light leading-none"
                          style={{
                            fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                            WebkitTextStroke: `1.5px ${CELESTE}`,
                            color: "transparent",
                          }}
                        >
                          {o.num}
                        </span>
                      </div>
                      <h2
                        className="font-display font-bold tracking-tight leading-[1.05] text-foreground"
                        style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", textShadow: HERO_TEXT_SHADOW }}
                      >
                        {o.title}
                      </h2>
                    </div>

                    {/* Before / After side */}
                    <div className="space-y-5">
                      <div
                        className="rounded-2xl p-6 border"
                        style={{
                          background: "hsl(0 0% 7% / 0.7)",
                          borderColor: "hsl(0 0% 100% / 0.08)",
                          backdropFilter: "blur(16px)",
                        }}
                      >
                        <p
                          className="font-body text-[10px] tracking-[0.4em] uppercase mb-3"
                          style={{ color: "hsl(0 0% 55%)" }}
                        >
                          Prima
                        </p>
                        <p
                          className="font-body text-sm md:text-base leading-relaxed"
                          style={{ color: "hsl(0 0% 80%)" }}
                        >
                          {o.before}
                        </p>
                      </div>

                      <div className="flex justify-center">
                        <ArrowRight
                          className="w-6 h-6 rotate-90 lg:rotate-0"
                          style={{ color: CELESTE }}
                          strokeWidth={1.8}
                        />
                      </div>

                      <div
                        className="rounded-2xl p-6 border"
                        style={{
                          background: "linear-gradient(160deg, hsl(192 49% 76% / 0.08), hsl(0 0% 4% / 0.9))",
                          borderColor: "hsl(192 49% 76% / 0.2)",
                          backdropFilter: "blur(16px)",
                          boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.05)",
                        }}
                      >
                        <p
                          className="font-body text-[10px] tracking-[0.4em] uppercase mb-3"
                          style={{ color: CELESTE }}
                        >
                          Dopo
                        </p>
                        <p
                          className="font-body text-sm md:text-base leading-relaxed"
                          style={{ color: "hsl(0 0% 92%)" }}
                        >
                          {o.after}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 4. Come lavoriamo */}
        <section className="py-[50px] px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-8 md:p-10 mb-10 border inline-block"
              style={{
                background: "linear-gradient(160deg, rgba(10,10,10,0.7), hsl(0 0% 3% / 0.88))",
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.num}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-2xl p-7 md:p-8 border overflow-hidden h-full"
                    style={{
                      background: "linear-gradient(160deg, hsl(0 0% 7% / 0.85), hsl(0 0% 4% / 0.95))",
                      borderColor: "hsl(0 0% 100% / 0.08)",
                      backdropFilter: "blur(18px)",
                      boxShadow: "0 15px 40px hsl(0 0% 0% / 0.4)",
                    }}
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, hsl(192 49% 76% / 0.2), hsl(192 49% 76% / 0.05))",
                          border: "1px solid hsl(192 49% 76% / 0.3)",
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: CELESTE }} strokeWidth={1.6} />
                      </div>
                      <span
                        className="font-display font-light leading-none"
                        style={{
                          fontSize: "2.4rem",
                          WebkitTextStroke: `1px ${CELESTE}`,
                          color: "transparent",
                        }}
                      >
                        {s.num}
                      </span>
                    </div>
                    <h3
                      className="font-display font-semibold text-xl mb-2 text-foreground"
                      style={{ textShadow: HERO_TEXT_SHADOW }}
                    >
                      {s.name}
                    </h3>
                    <p
                      className="font-body text-sm md:text-base leading-relaxed"
                      style={{ color: "hsl(0 0% 88%)", textShadow: "0 1px 4px hsl(0 0% 0% / 0.6)" }}
                    >
                      {s.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Micro-FAQ */}
        <section className="py-[50px] px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mb-16 p-8 md:p-10"
              style={{
                background: "linear-gradient(160deg, rgba(10,10,10,0.7), hsl(0 0% 3% / 0.88))",
                border: "1px solid hsl(0 0% 100% / 0.08)",
                backdropFilter: "blur(18px)",
                borderRadius: "24px",
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-0.5" style={{ background: CELESTE }} />
                <span
                  className="font-body font-bold text-xs tracking-[0.4em] uppercase"
                  style={{
                    color: CELESTE,
                    textShadow:
                      "0 1px 3px hsl(0 0% 0% / 0.95), 0 2px 12px hsl(0 0% 0% / 0.85), 0 0 24px hsl(0 0% 0% / 0.7)",
                  }}
                >
                  FAQ
                </span>
              </div>
              <h2
                className="font-display font-bold text-4xl md:text-5xl tracking-tight text-white"
                style={{ textShadow: "0 2px 20px hsl(0 0% 0% / 0.8), 0 0 40px hsl(0 0% 0% / 0.6)" }}
              >
                Domande frequenti.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Accordion
                type="single"
                collapsible
                defaultValue="item-0"
                className="w-full rounded-2xl px-6 md:px-8"
                style={{
                  background: "hsl(0 0% 6% / 0.7)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid hsl(0 0% 100% / 0.08)",
                }}
              >
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b border-border/30">
                    <AccordionTrigger className="font-display text-left text-base md:text-lg font-medium text-foreground hover:no-underline hover:text-primary transition-colors py-6">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-sm md:text-base text-muted-foreground leading-relaxed pb-6 pr-8">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* 6. CTA finale */}
        <section className="py-[50px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center rounded-3xl p-10 md:p-14 border"
            style={{
              background: "linear-gradient(160deg, hsl(0 0% 5% / 0.82), hsl(0 0% 3% / 0.92))",
              borderColor: "hsl(0 0% 100% / 0.08)",
              backdropFilter: "blur(18px)",
              boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5)",
            }}
          >
            {/* ⚠️ PERSONALIZZA — titolo e testo CTA finale */}
            <h2
              className="font-display font-bold tracking-tight leading-[1.05] mb-6 text-foreground"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", textShadow: HERO_TEXT_SHADOW }}
            >
              Diamo un volto al tuo brand.
            </h2>
            <p
              className="font-body text-base md:text-lg mb-4 max-w-xl mx-auto"
              style={{ color: "hsl(0 0% 90%)", textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}
            >
              Una call gratuita di 30 minuti per capire di quali contenuti hai bisogno e
              come possiamo realizzarli. Nessun impegno.
            </p>
            <InlineCTA label="Prenota una call" to="/contatti" />
          </motion.div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default ContentCreation;
