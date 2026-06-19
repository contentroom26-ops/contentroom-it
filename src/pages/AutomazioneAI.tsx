import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  MessageSquare,
  Bot,
  Workflow,
  Compass,
  Hammer,
  LineChart,
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

const problems = [
  "Quante richieste sui social restano senza risposta dopo le 18:00?",
  "Quante volte i tuoi dati passano a mano da un programma all'altro, con il rischio di errori?",
  "Quanti lead si perdono perché nessuno li ha ricontattati in tempo?",
];

const offerings = [
  {
    icon: MessageSquare,
    num: "01",
    title: "Gestione AI di Social e DM",
    before:
      "Ogni commento e messaggio diretto richiede tempo, e fuori orario nessuno risponde.",
    after:
      "Un assistente AI risponde a commenti e DM in tempo reale, qualifica chi scrive e passa al team solo i contatti davvero interessati. Il tuo social diventa un canale di vendita attivo 24/7, non solo una vetrina.",
  },
  {
    icon: Bot,
    num: "02",
    title: "Chatbot e Assistenti Virtuali",
    before:
      "I visitatori del sito hanno domande, ma se nessuno risponde subito se ne vanno.",
    after:
      "Un assistente virtuale sul sito o su WhatsApp risponde alle domande frequenti, prenota appuntamenti e raccoglie le richieste, anche quando l'ufficio è chiuso. Meno carico sul team, più contatti convertiti.",
  },
  {
    icon: Workflow,
    num: "03",
    title: "Automazione di Flussi e CRM",
    before:
      "Form, email, gestionale e fatturazione spesso non si parlano: tutto richiede copia-incolla manuale.",
    after:
      "Colleghiamo gli strumenti che la tua azienda già usa, così i dati si muovono da soli tra un sistema e l'altro. Zero lavoro ripetitivo, zero errori di trascrizione, tempo restituito a chi lo usa per far crescere il business.",
  },
];

const steps = [
  {
    icon: Compass,
    num: "01",
    name: "Analisi",
    desc: "Studiamo i tuoi processi attuali e individuiamo dove l'automazione può avere il maggiore impatto.",
  },
  {
    icon: Hammer,
    num: "02",
    name: "Implementazione",
    desc: "Costruiamo e colleghiamo gli strumenti AI agli strumenti che usi già, senza stravolgere il tuo modo di lavorare.",
  },
  {
    icon: LineChart,
    num: "03",
    name: "Ottimizzazione",
    desc: "Monitoriamo i risultati e perfezioniamo le automazioni nel tempo.",
  },
];

const faqs = [
  {
    q: "Devo avere competenze tecniche per usare questi strumenti?",
    a: "No. Progettiamo le automazioni per essere semplici da usare per te e per il tuo team, e ti accompagniamo nella fase iniziale di utilizzo.",
  },
  {
    q: "I miei dati aziendali sono al sicuro?",
    a: "Sì. Utilizziamo strumenti e infrastrutture sicure e lavoriamo nel rispetto della normativa sulla privacy.",
  },
  {
    q: "Quanto costa attivare un'automazione AI?",
    a: "Il costo dipende dagli strumenti che vuoi automatizzare e dalla complessità del progetto: prevediamo un setup iniziale su misura seguito da un canone mensile per la gestione e l'ottimizzazione continua. Richiedi una call gratuita per ricevere una valutazione sul tuo caso specifico.",
  },
];

const AutomazioneAI = () => {
  const canonical = "https://www.contentroom.it/automazione-ai";

  return (
    <>
      <Helmet>
        <title>Automazione &amp; AI per Aziende | Content Room — Firenze</title>
        <meta
          name="description"
          content="Chatbot, gestione AI di social e DM, automazione di flussi e CRM. Implementiamo strumenti di intelligenza artificiale su misura per far crescere la tua azienda."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Automazione & AI per Aziende | Content Room" />
        <meta
          property="og:description"
          content="Chatbot, gestione AI di social e DM, automazione di flussi e CRM. Strumenti di intelligenza artificiale su misura per la tua azienda."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Automazione e intelligenza artificiale per aziende",
          provider: {
            "@type": "Organization",
            name: "Content Room",
            url: "https://contentroom-it.lovable.app",
          },
          areaServed: "IT",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Automazione & AI",
            itemListElement: [
              "Gestione AI di Social e DM",
              "Chatbot e Assistenti Virtuali",
              "Automazione di Flussi e CRM",
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
                  Automazione &amp; AI
                </p>
              </div>
              <h1
                className="font-display font-bold tracking-tight leading-[1.05] mb-6 text-foreground"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", textShadow: HERO_TEXT_SHADOW }}
              >
                Mentre il tuo team dorme, la tua azienda continua a lavorare.
              </h1>
              <p
                className="font-body text-base md:text-lg max-w-2xl"
                style={{ color: "hsl(0 0% 92%)", textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}
              >
                Chatbot, automazioni e strumenti di intelligenza artificiale che eliminano il
                lavoro ripetitivo e non fanno perdere nessun cliente. Implementati su misura,
                sugli strumenti che usi già.
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
              <h2
                className="font-display font-bold tracking-tight leading-[1.05] mb-10 text-foreground"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", textShadow: HERO_TEXT_SHADOW }}
              >
                Ogni giorno la tua azienda<br />
                <span style={{ color: "hsl(0 0% 75%)" }}>lascia opportunità sul tavolo.</span>
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

              <p
                className="font-body text-base md:text-lg leading-relaxed max-w-3xl"
                style={{ color: "hsl(0 0% 92%)", textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}
              >
                Content Room implementa l'intelligenza artificiale per risolvere esattamente
                questi problemi — senza che tu debba cambiare gli strumenti che usi oggi.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 3. Servizi prima / dopo */}
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

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 rounded-2xl p-6 md:p-8 border text-center"
              style={{
                background: "linear-gradient(160deg, hsl(192 49% 76% / 0.08), hsl(0 0% 4% / 0.92))",
                borderColor: "hsl(192 49% 76% / 0.2)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5)",
              }}
            >
              <p
                className="font-body text-base md:text-lg font-medium max-w-2xl mx-auto"
                style={{ color: "hsl(0 0% 95%)", textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}
              >
                Lavoriamo con gli strumenti che hai già in azienda. Non devi cambiare nulla,
                solo lasciare che funzionino meglio.
              </p>
            </motion.div>
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
            <h2
              className="font-display font-bold tracking-tight leading-[1.05] mb-6 text-foreground"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", textShadow: HERO_TEXT_SHADOW }}
            >
              Scopri quali processi della tua azienda puoi automatizzare.
            </h2>
            <p
              className="font-body text-base md:text-lg mb-4 max-w-xl mx-auto"
              style={{ color: "hsl(0 0% 90%)", textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}
            >
              Una call gratuita di 30 minuti per analizzare la tua situazione e capire da dove
              iniziare. Nessun impegno.
            </p>
            <InlineCTA label="Prenota una call" to="/contatti" />
          </motion.div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default AutomazioneAI;
