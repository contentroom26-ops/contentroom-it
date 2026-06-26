import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cases } from "./Portfolio";

const CELESTE = "hsl(192 49% 76%)";

interface CaseDetail {
  goal: string;
  solution: string;
  metrics: { value: string; label: string }[];
}
/* ⚠️ PERSONALIZZA — obiettivo, soluzione e metriche placeholder.
   Sostituisci con i dati reali di ogni cliente prima di rendere pubblico il portfolio. */
const details: Record<string, CaseDetail> = {
  "luxe-fashion": {
    goal: "Aumentare la brand awareness e posizionare il marchio nel segmento luxury fashion italiano, intercettando un pubblico premium su Instagram e TikTok.",
    solution: "Abbiamo costruito una strategia editoriale full-funnel: shooting mensili curati, format video ricorrenti e una campagna ads sempre-on segmentata per interesse e lookalike.",
    metrics: [
      { value: "+200k", label: "Visualizzazioni organiche" },
      { value: "+85%", label: "Crescita follower" },
      { value: "4.2x", label: "ROAS campagne ads" },
    ],
  },
  "gusto-ristorante": {
    goal: "Trasformare un ristorante locale in un punto di riferimento sui social, generando prenotazioni dirette dal mondo digitale.",
    solution: "Food content quotidiano, reels virali sui piatti signature e una community management proattivo che ha trasformato gli ospiti in ambassador.",
    metrics: [
      { value: "+150%", label: "Engagement medio" },
      { value: "+60%", label: "Prenotazioni online" },
      { value: "1.2M", label: "Visualizzazioni totali" },
    ],
  },
  "fitpro-academy": {
    goal: "Generare lead qualificati per i nuovi corsi e ampliare la community di un centro fitness premium.",
    solution: "Strategia di growth organica unita a campagne di lead generation Meta Ads, supportate da landing page ottimizzate e funnel email automation.",
    metrics: [
      { value: "+80k", label: "Nuovi follower" },
      { value: "1.8k", label: "Lead generati" },
      { value: "-40%", label: "Costo per lead" },
    ],
  },
  "glow-skincare": {
    goal: "Lanciare un nuovo e-commerce skincare e raggiungere il break-even sulle campagne ads entro i primi 90 giorni.",
    solution: "Restyling completo dello shop Shopify, contenuti prodotto ad alta conversione e funnel pubblicitario multi-step con creatività testate settimanalmente.",
    metrics: [
      { value: "+300%", label: "Vendite mensili" },
      { value: "3.8x", label: "ROAS medio" },
      { value: "+45%", label: "Conversion rate sito" },
    ],
  },
};

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseItem = cases.find((c) => c.slug === slug);
  const detail = slug ? details[slug] : undefined;

  if (!caseItem || !detail) return <Navigate to="/portfolio" replace />;

  const idx = cases.findIndex((c) => c.slug === slug);
  const next = cases[(idx + 1) % cases.length];

  return (
    <>
      <main className="relative z-10 min-h-screen overflow-x-hidden">
        <Navbar />

        {/* Hero image — nera */}
        <section className="section-dark pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 font-body text-xs tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Tutti i progetti
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl overflow-hidden aspect-[16/9]"
            >
              <img src={caseItem.img} alt={caseItem.client} className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12"
            >
              <p className="font-body text-[10px] font-bold tracking-[0.4em] uppercase mb-4 text-brand-orange">
                {caseItem.service} · {caseItem.category}
              </p>
              <h1
                className="font-display font-black tracking-tight leading-[1.05]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                {caseItem.client}
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Obiettivo & Soluzione — beige */}
        <section className="section-light py-20 md:py-28 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
            {[
              { label: "Obiettivo", text: detail.goal, delay: 0 },
              { label: "Soluzione", text: detail.solution, delay: 0.15 },
            ].map((block) => (
              <motion.div
                key={block.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: block.delay, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-8 md:p-10 h-full bg-white border border-[hsl(0_0%_8%/0.1)]"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-10 h-px bg-brand-orange" />
                  <p className="font-body text-[10px] font-bold tracking-[0.4em] uppercase text-brand-orange">
                    {block.label}
                  </p>
                </div>
                <p className="font-display text-xl md:text-2xl leading-[1.45] text-[hsl(0_0%_10%)]">
                  {block.text}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Risultati — nera */}
        <section className="section-dark py-20 md:py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-px bg-brand-orange" />
                  <p className="font-body text-xs font-bold tracking-[0.4em] uppercase text-brand-orange">
                    Risultati
                  </p>
                </div>
                <h2
                  className="font-display font-black tracking-tight leading-[1.05]"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                >
                  Numeri <span className="text-primary">che parlano.</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8 md:gap-6">
                {detail.metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 60, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center md:text-left"
                  >
                    <span
                      className="font-display font-black block leading-none mb-4 text-primary"
                      style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}
                    >
                      {m.value}
                    </span>
                    <p className="font-body text-sm md:text-base text-white/70">
                      {m.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Next case + CTA — beige */}
        <section className="section-light py-20 md:py-28 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <Link
              to={`/portfolio/${next.slug}`}
              className="group relative block rounded-2xl overflow-hidden aspect-[4/3]"
            >
              <img src={next.img} alt={next.client} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/55 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <p className="font-body text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: CELESTE }}>
                  Prossimo progetto
                </p>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-white">{next.client}</h3>
              </div>
            </Link>

            <div className="flex flex-col items-start justify-center p-8 md:p-10 rounded-2xl bg-white border border-[hsl(0_0%_8%/0.1)]">
              <h3
                className="font-display font-black tracking-tight leading-[1.05] mb-6"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
              >
                Vuoi risultati simili?
              </h3>
              <p className="font-body text-base mb-8 text-[hsl(0_0%_30%)]">
                Raccontaci il tuo progetto. Ti ricontattiamo entro 24h.
              </p>
              <Link
                to="/contatti"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-body text-sm font-bold tracking-wide transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 text-[hsl(192_35%_16%)] bg-primary hover:brightness-105"
              >
                Prenota una call
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default CaseStudy;
