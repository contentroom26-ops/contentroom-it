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
import InlineCTA from "@/components/InlineCTA";

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

      <main className="relative z-10 min-h-screen overflow-x-hidden">
        <Navbar />

        {/* 1. Hero — nera */}
        <section className="section-dark pt-40 pb-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-brand-orange" />
                <p className="font-body text-xs font-bold tracking-[0.4em] uppercase text-brand-orange">
                  Content Creation
                </p>
              </div>
              {/* ⚠️ PERSONALIZZA — headline principale */}
              <h1
                className="font-display font-black tracking-tight leading-[1.05] mb-6"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                Contenuti che <span className="text-primary">fermano lo scroll</span> e raccontano chi sei.
              </h1>
              {/* ⚠️ PERSONALIZZA — sottotitolo */}
              <p className="font-body text-base md:text-lg max-w-2xl text-white/75">
                Video, foto e grafiche prodotti dal concept alla pubblicazione. Contenuti
                originali, coerenti e ottimizzati per ogni piattaforma, pensati per
                distinguere il tuo brand.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2. Problema — beige */}
        <section className="section-light py-20 md:py-28 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-brand-orange" />
                <p className="font-body text-xs font-bold tracking-[0.4em] uppercase text-brand-orange">
                  Il problema
                </p>
              </div>
              {/* ⚠️ PERSONALIZZA — titolo sezione problema */}
              <h2
                className="font-display font-black tracking-tight leading-[1.05] mb-10"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                Creare contenuti che funzionano<br />
                <span className="text-primary">richiede tempo e metodo.</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                {problems.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl p-6 md:p-7 bg-white border border-[hsl(0_0%_8%/0.1)]"
                  >
                    <span
                      className="font-display font-light block mb-4 leading-none"
                      style={{
                        fontSize: "2.4rem",
                        WebkitTextStroke: "1px hsl(0 0% 25%)",
                        color: "transparent",
                      }}
                    >
                      0{i + 1}
                    </span>
                    <p className="font-body text-base md:text-lg leading-relaxed text-[hsl(0_0%_15%)]">
                      {p}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* ⚠️ PERSONALIZZA — frase ponte */}
              <p className="font-body text-base md:text-lg leading-relaxed max-w-3xl text-[hsl(0_0%_25%)]">
                Content Room produce contenuti con metodo: dall'idea alla pubblicazione,
                pensati per distinguere il tuo brand e performare su ogni canale.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 3. Cosa facciamo (prima / dopo) — nera */}
        <section className="section-dark py-20 md:py-28 px-6">
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
                  className="rounded-2xl p-8 md:p-12 bg-[hsl(0_0%_10%)] border border-white/10"
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                      reverse ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    {/* Heading side */}
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-[hsl(192_49%_76%/0.12)]">
                          <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                        </div>
                        <span
                          className="font-display font-light leading-none"
                          style={{
                            fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                            WebkitTextStroke: "1.5px hsl(192 49% 76%)",
                            color: "transparent",
                          }}
                        >
                          {o.num}
                        </span>
                      </div>
                      <h2
                        className="font-display font-bold tracking-tight leading-[1.05]"
                        style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)" }}
                      >
                        {o.title}
                      </h2>
                    </div>

                    {/* Before / After side */}
                    <div className="space-y-5">
                      <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
                        <p className="font-body text-[10px] font-bold tracking-[0.4em] uppercase mb-3 text-white/40">
                          Prima
                        </p>
                        <p className="font-body text-sm md:text-base leading-relaxed text-white/65">
                          {o.before}
                        </p>
                      </div>

                      <div className="flex justify-center">
                        <ArrowRight
                          className="w-6 h-6 rotate-90 lg:rotate-0 text-primary"
                          strokeWidth={1.8}
                        />
                      </div>

                      <div className="rounded-2xl p-6 bg-[hsl(192_49%_76%/0.12)] border border-[hsl(192_49%_76%/0.3)]">
                        <p className="font-body text-[10px] font-bold tracking-[0.4em] uppercase mb-3 text-primary">
                          Dopo
                        </p>
                        <p className="font-body text-sm md:text-base leading-relaxed text-white/90">
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

        {/* 4. Come lavoriamo — beige */}
        <section className="section-light py-20 md:py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-brand-orange" />
                <p className="font-body text-xs font-bold tracking-[0.4em] uppercase text-brand-orange">
                  Il nostro metodo
                </p>
              </div>
              <h2
                className="font-display font-black tracking-tight leading-[1.05]"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                Come<br />
                <span className="text-primary">lavoriamo.</span>
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
                    className="relative rounded-2xl p-7 md:p-8 h-full bg-white border border-[hsl(0_0%_8%/0.1)]"
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[hsl(192_49%_76%/0.12)]">
                        <Icon className="w-5 h-5 text-primary" strokeWidth={1.6} />
                      </div>
                      <span
                        className="font-display font-light leading-none"
                        style={{
                          fontSize: "2.4rem",
                          WebkitTextStroke: "1px hsl(192 35% 30%)",
                          color: "transparent",
                        }}
                      >
                        {s.num}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl mb-2">
                      {s.name}
                    </h3>
                    <p className="font-body text-sm md:text-base leading-relaxed text-[hsl(0_0%_30%)]">
                      {s.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Micro-FAQ — nera */}
        <section className="section-dark py-20 md:py-28 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-16"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-0.5 bg-brand-orange" />
                <span className="font-body font-bold text-xs tracking-[0.4em] uppercase text-brand-orange">
                  FAQ
                </span>
              </div>
              <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight">
                Domande <span className="text-primary">frequenti.</span>
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
                className="w-full rounded-2xl px-6 md:px-8 bg-[hsl(0_0%_10%)] border border-white/10"
              >
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/10 last:border-b-0">
                    <AccordionTrigger className="font-display text-left text-base md:text-lg font-bold hover:no-underline hover:text-primary transition-colors py-6">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-sm md:text-base text-white/65 leading-relaxed pb-6 pr-8">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* 6. CTA finale — beige */}
        <section className="section-light py-20 md:py-28 px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* ⚠️ PERSONALIZZA — titolo e testo CTA finale */}
            <h2
              className="font-display font-black tracking-tight leading-[1.05] mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Diamo un volto al tuo brand.
            </h2>
            <p className="font-body text-base md:text-lg mb-4 max-w-xl mx-auto text-[hsl(0_0%_30%)]">
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
