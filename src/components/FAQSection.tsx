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
    a: "Partiamo da un brief approfondito per comprendere il tuo brand, gli obiettivi e il pubblico. Sviluppiamo poi una strategia su misura, seguita da produzione, revisioni condivise e pubblicazione. Ogni fase è collaborativa e trasparente.",
  },
  {
    q: "Quali sono i tempi di consegna?",
    a: "Dipende dalla complessità del progetto: un singolo contenuto richiede generalmente 5-10 giorni lavorativi, mentre una campagna o una strategia social completa può richiedere 3-6 settimane. Concordiamo sempre tempistiche chiare in fase di kick-off.",
  },
  {
    q: "Lavorate con brand di qualsiasi settore?",
    a: "Sì, collaboriamo con brand di vari settori: moda, food & beverage, wellness, beauty, lifestyle, hospitality. La nostra metodologia si adatta al tono e ai valori di ogni cliente.",
  },
  {
    q: "Quanto costa un progetto con Content Room?",
    a: "Ogni progetto è personalizzato. Dopo una prima call conoscitiva ti inviamo un preventivo dettagliato basato su obiettivi, deliverable e tempistiche. Non lavoriamo con pacchetti preconfezionati.",
  },
  {
    q: "Vi occupate anche della gestione dei profili social?",
    a: "Sì. Offriamo social media management completo: piano editoriale, produzione contenuti, copywriting, pubblicazione, community management e reportistica mensile sui risultati.",
  },
  {
    q: "Come iniziamo a lavorare insieme?",
    a: "Contattaci dal form qui sopra o scrivici a info@contentroom.it. Fissiamo una call gratuita di 30 minuti per capire le tue esigenze e proporti il percorso più adatto.",
  },
];

const FAQSection = () => {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px" style={{ background: CELESTE }} />
            <p className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: CELESTE }}>
              FAQ
            </p>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-16">
            Domande frequenti.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Accordion type="single" collapsible className="w-full">
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
