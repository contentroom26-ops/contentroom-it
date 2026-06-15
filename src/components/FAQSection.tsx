import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CELESTE = "hsl(192 49% 76%)";

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
    <section className="relative py-[80px] px-6">
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-0.5" style={{ background: CELESTE }} />
            <span
              className="font-body font-bold text-xs tracking-[0.4em] uppercase"
              style={{
                color: CELESTE,
                textShadow: "0 1px 3px hsl(0 0% 0% / 0.95), 0 2px 12px hsl(0 0% 0% / 0.85), 0 0 24px hsl(0 0% 0% / 0.7)",
              }}
            >
              FAQ
            </span>
          </div>
          <h2
            className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-16 text-white"
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
          <Accordion type="single" collapsible className="w-full rounded-2xl px-6 md:px-8" style={{ background: "hsl(0 0% 6% / 0.7)", backdropFilter: "blur(16px)", border: "1px solid hsl(0 0% 100% / 0.08)" }}>
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-border/30"
              >
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
  );
};

export default FAQSection;
