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
import InlineCTA from "@/components/InlineCTA";

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
                  Siti & Digitalizzazione
                </p>
              </div>
              {/* ⚠️ PERSONALIZZA — headline principale */}
              <h1
                className="font-display font-black tracking-tight leading-[1.05] mb-6"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                Da idea a risultato concreto: <span className="text-primary">il tuo business, digitale.</span>
              </h1>
              {/* ⚠️ PERSONALIZZA — sottotitolo */}
              <p className="font-body text-base md:text-lg max-w-2xl text-white/75">
                Siti web ad alte prestazioni, funnel di acquisizione e automazioni
                intelligenti, con e senza AI, per semplificare i processi e aumentare la
                produttività.
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
                Un'azienda digitale<br />
                <span className="text-primary">non è solo un sito web.</span>
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
                Content Room unisce strategia, tecnologia e design per trasformare le
                tue idee in soluzioni digitali concrete.
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
              Portiamo la tua azienda nel digitale, sul serio.
            </h2>
            <p className="font-body text-base md:text-lg mb-4 max-w-xl mx-auto text-[hsl(0_0%_30%)]">
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
