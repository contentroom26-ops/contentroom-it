import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Come funziona il processo creativo?",
    a: "Iniziamo con una call conoscitiva gratuita per capire i tuoi obiettivi, il tuo brand e il tuo pubblico. Definiamo insieme la strategia, produciamo i contenuti e li pubblichiamo rispettando un piano editoriale condiviso. Hai sempre visibilità su ogni fase del lavoro.",
  },
  {
    q: "Quali sono i tempi di consegna?",
    a: "Dipende dal progetto. Per i contenuti social il ciclo è settimanale. Per campagne più articulate o siti web i tempi variano dalle 2 alle 4 settimane. Ti forniamo sempre una roadmap dettagliata prima di iniziare.",
  },
  {
    q: "Lavorate con brand di qualsiasi settore?",
    a: "Sì, abbiamo esperienza in diversi settori: moda, food & beverage, real estate, professioni e retail. Ogni progetto riceve un approccio personalizzato.",
  },
  {
    q: "Quanto costa un progetto con Content Room?",
    a: "I nostri pacchetti partono da una tariffa personalizzata in base ai servizi inclusi e alla frequenza di pubblicazione. Richiedi una call gratuita per un preventivo su misura.",
    /* ⚠️ PERSONALIZZA — risposta senza ancoraggio numerico, segnalato in audit CRO.
       Serve una fascia di prezzo reale o un "a partire da" da Content Room prima
       di poter rendere questa risposta più concreta. */
  },
  {
    q: "Vi occupate anche della gestione dei profili social?",
    a: "Sì, offriamo la gestione completa dei profili: dalla creazione dei contenuti alla pubblicazione, dalla risposta ai commenti all'analisi mensile delle performance.",
  },
  {
    q: "Come iniziamo a lavorare insieme?",
    a: "Prenota una call gratuita di 30 minuti tramite il pulsante su questa pagina. In quella chiamata analizziamo insieme le tue esigenze e ti presentiamo la soluzione più adatta.",
  },
];

const FAQSection = () => {
  return (
    <section className="section-light relative py-20 md:py-28 px-6">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        })}</script>
      </Helmet>
      <div className="max-w-3xl mx-auto relative z-10">
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
            className="w-full rounded-2xl px-6 md:px-8 bg-white border border-[hsl(0_0%_8%/0.1)]"
          >
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-[hsl(0_0%_8%/0.1)] last:border-b-0"
              >
                <AccordionTrigger className="font-display text-left text-base md:text-lg font-bold hover:no-underline hover:text-primary transition-colors py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm md:text-base text-[hsl(0_0%_35%)] leading-relaxed pb-6 pr-8">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
