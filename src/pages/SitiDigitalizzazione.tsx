import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Globe,
  Workflow,
  Cpu,
  Layers,
  Code2,
  Rocket,
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
  "Il tuo sito è lento, vecchio o non genera contatti?",
  "Continui a perdere tempo su processi che potrebbero essere automatici?",
  "Vorresti digitalizzare l'azienda ma non sai da dove iniziare?",
];

/* ⚠️ PERSONALIZZA — cosa offri davvero, con before/after reali */
const offerings = [
  {
    icon: Globe,
    num: "01",
    title: "Siti web ad alte prestazioni",
    before:
      "Un sito lento, datato, che non rappresenta il livello del tuo business e non converte visitatori in clienti.",
    after:
      "Progettiamo e sviluppiamo siti web rapidi, moderni e pensati per convertire: design su misura, performance tecniche solide e contenuti orientati all'obiettivo.",
  },
  {
    icon: Layers,
    num: "02",
    title: "Funnel di acquisizione",
    before:
      "Visitatori che arrivano sul sito ma se ne vanno senza lasciare un contatto.",
    after:
      "Costruiamo percorsi pensati per guidare il visitatore verso l'azione: dalla prima visita al contatto, ogni passaggio è progettato per convertire.",
  },
  {
    icon: Cpu,
    num: "03",
    title: "Automazioni intelligenti",
    before:
      "Processi manuali e ripetitivi che rallentano il lavoro del team.",
    after:
      "Implementiamo automazioni, con e senza intelligenza artificiale, che semplificano i processi aziendali e restituiscono tempo da investire altrove.",
  },
];

/* ⚠️ PERSONALIZZA — il tuo processo reale */
const steps = [
  {
    icon: Workflow,
    num: "01",
    name: "Analisi e progettazione",
    desc: "Studiamo i tuoi obiettivi e i tuoi processi per disegnare la soluzione digitale più adatta.",
  },
  {
    icon: Code2,
    num: "02",
    name: "Sviluppo",
    desc: "Costruiamo il sito o l'automazione, uniendo strategia, tecnologia e design.",
  },
  {
    icon: Rocket,
    num: "03",
    name: "Lancio e crescita",
    desc: "Pubblichiamo la soluzione e la affiniamo nel tempo in base ai risultati reali.",
  },
];

/* ⚠️ PERSONALIZZA — domande vere che ti fanno i clienti */
const faqs = [
  {
    q: "Realizzate anche e-commerce?",
    a: "Sì, progettiamo soluzioni digitali su misura in base alle esigenze del tuo business, inclusi e-commerce e piattaforme di vendita online.",
  },
  {
    q: "Quanto tempo richiede la realizzazione di un sito?",
    a: "Dipende dalla complessità del progetto. Dopo un'analisi iniziale ti forniamo una tempistica chiara e un piano di lavoro condiviso.",
  },
  {
    q: "Quanto costa un progetto di digitalizzazione?",
    a: "Il costo varia in base alla complessità della soluzione richiesta, sito, funnel o automazione. Richiedi una call gratuita per ricevere una valutazione sul tuo progetto specifico.",
  },
];

const SitiDigitalizzazione = () => {
  const canonical = "https://www.contentroom.it/siti-digitalizzazione";

  return (
    <>
      <Helmet>
        {/* ⚠️ PERSONALIZZA — title e description per la SEO */}
        <title>Siti Web e Digitalizzazione Aziende | Content Room — Firenze</title>
        <meta
          name="description"
          content="Siti web ad alte prestazioni, funnel di acquisizione e automazioni intelligenti per far crescere la tua azienda. Strategia, tecnologia e design uniti."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Siti & Digitalizzazione | Content Room" />
        <meta
          property="og:description"
          content="Siti web ad alte prestazioni, funnel di acquisizione e automazioni intelligenti per la tua azienda."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Siti web e digitalizzazione aziendale",
          provider: {
            "@type": "Organization",
            name: "Content Room",
            url: "https://www.contentroom.it",
          },
          areaServed: "IT",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Siti & Digitalizzazione",
            itemListElement: [
              "Siti web",
              "Funnel di acquisizione",
              "Automazioni",
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
                  Siti & Digitalizzazione
                </p>
              </div>
              {/* ⚠️ PERSONALIZZA — headline principale */}
              <h1
                className="font-display font-bold tracking-tight leading-[1.05] mb-6 text-foreground"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", textShadow: HERO_TEXT_SHADOW }}
              >
                Da idea a risultato concreto: il tuo business, digitale.
              </h1>
              {/* ⚠️ PERSONALIZZA — sottotitolo */}
              <p
                className="font-body text-base md:text-lg max-w-2xl"
                style={{ color: "hsl(0 0% 92%)", textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}
              >
                Siti web ad alte prestazioni, funnel di acquisizione e automazioni
                intelligenti, con e senza AI, per semplificare i processi e aumentare la
                produttività.
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
                Un'azienda digitale<br />
                <span style={{ color: "hsl(0 0% 75%)" }}>non è solo un sito web.</span>
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
                Content Room unisce strategia, tecnologia e design per trasformare le
                tue idee in soluzioni digitali concrete.
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
              Portiamo la tua azienda nel digitale, sul serio.
            </h2>
            <p
              className="font-body text-base md:text-lg mb-4 max-w-xl mx-auto"
              style={{ color: "hsl(0 0% 90%)", textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}
            >
              Una call gratuita di 30 minuti per capire di quale soluzione digitale ha
              bisogno la tua azienda. Nessun impegno.
            </p>
            <InlineCTA label="Prenota una call" to="/contatti" />
          </motion.div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default SitiDigitalizzazione;
