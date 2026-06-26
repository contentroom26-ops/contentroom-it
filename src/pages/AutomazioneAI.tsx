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
import InlineCTA from "@/components/InlineCTA";

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
                  Automazione &amp; AI
                </p>
              </div>
              <h1
                className="font-display font-black tracking-tight leading-[1.05] mb-6"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                Mentre il tuo team dorme, la tua{" "}
                <span className="text-primary">azienda continua a lavorare.</span>
              </h1>
              <p className="font-body text-base md:text-lg max-w-2xl text-white/75">
                Chatbot, automazioni e strumenti di intelligenza artificiale che eliminano il
                lavoro ripetitivo e non fanno perdere nessun cliente. Implementati su misura,
                sugli strumenti che usi già.
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
              <h2
                className="font-display font-black tracking-tight leading-[1.05] mb-10"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                Ogni giorno la tua azienda<br />
                <span className="text-primary">lascia opportunità sul tavolo.</span>
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

              <p className="font-body text-base md:text-lg leading-relaxed max-w-3xl text-[hsl(0_0%_25%)]">
                Content Room implementa l'intelligenza artificiale per risolvere esattamente
                questi problemi — senza che tu debba cambiare gli strumenti che usi oggi.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 3. Servizi prima / dopo — nera */}
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

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 rounded-2xl p-6 md:p-8 text-center bg-[hsl(192_49%_76%/0.15)] border border-[hsl(192_49%_76%/0.3)]"
            >
              <p className="font-body text-base md:text-lg font-medium max-w-2xl mx-auto text-[hsl(192_35%_16%)]">
                Lavoriamo con gli strumenti che hai già in azienda. Non devi cambiare nulla,
                solo lasciare che funzionino meglio.
              </p>
            </motion.div>
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
            <h2
              className="font-display font-black tracking-tight leading-[1.05] mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Scopri quali processi della tua azienda puoi automatizzare.
            </h2>
            <p className="font-body text-base md:text-lg mb-4 max-w-xl mx-auto text-[hsl(0_0%_30%)]">
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
