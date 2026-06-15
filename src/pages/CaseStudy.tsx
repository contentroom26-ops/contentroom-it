import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalVideoBackground from "@/components/GlobalVideoBackground";
import { cases } from "./Portfolio";

const CELESTE = "hsl(192 49% 76%)";

interface CaseDetail {
  goal: string;
  solution: string;
  metrics: { value: string; label: string }[];
}

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
      <GlobalVideoBackground />
      <main className="relative z-10 min-h-screen overflow-x-hidden">
        <Navbar />

        {/* Hero image */}
        <section className="pt-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 font-body text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors"
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
              className="mt-12 rounded-3xl p-8 md:p-10 border"
              style={{
                background: "linear-gradient(160deg, hsl(0 0% 5% / 0.78), hsl(0 0% 3% / 0.88))",
                borderColor: "hsl(0 0% 100% / 0.08)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5)",
              }}
            >
              <p
                className="font-body text-[10px] tracking-[0.4em] uppercase mb-4"
                style={{ color: CELESTE }}
              >
                {caseItem.service} · {caseItem.category}
              </p>
              <h1
                className="font-display font-bold tracking-tight leading-[1.05] text-foreground"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  textShadow: "0 2px 8px hsl(0 0% 0% / 0.85), 0 0 28px hsl(0 0% 0% / 0.6)",
                }}
              >
                {caseItem.client}
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Obiettivo & Soluzione */}
        <section className="py-[50px] px-6">
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
                className="rounded-3xl p-8 md:p-10 border h-full"
                style={{
                  background: "linear-gradient(160deg, hsl(0 0% 5% / 0.78), hsl(0 0% 3% / 0.88))",
                  borderColor: "hsl(0 0% 100% / 0.08)",
                  backdropFilter: "blur(18px)",
                  boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5)",
                }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-10 h-px" style={{ background: CELESTE }} />
                  <p className="font-body text-[10px] tracking-[0.4em] uppercase" style={{ color: CELESTE }}>
                    {block.label}
                  </p>
                </div>
                <p
                  className="font-display text-xl md:text-2xl leading-[1.45] text-foreground"
                  style={{ textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}
                >
                  {block.text}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Risultati */}
        <section className="py-[50px] px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-8 md:p-12 border"
              style={{
                background: "linear-gradient(160deg, hsl(0 0% 5% / 0.78), hsl(0 0% 3% / 0.88))",
                borderColor: "hsl(0 0% 100% / 0.08)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5)",
              }}
            >
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-px" style={{ background: CELESTE }} />
                  <p className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: CELESTE }}>
                    Risultati
                  </p>
                </div>
                <h2
                  className="font-display font-bold tracking-tight leading-[1.05] text-foreground"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    textShadow: "0 2px 8px hsl(0 0% 0% / 0.85)",
                  }}
                >
                  Numeri che parlano.
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
                      className="font-display font-bold block leading-none mb-4"
                      style={{
                        fontSize: "clamp(3.5rem, 8vw, 6rem)",
                        color: CELESTE,
                        textShadow: "0 0 30px hsl(192 49% 76% / 0.4), 0 2px 10px hsl(0 0% 0% / 0.7)",
                      }}
                    >
                      {m.value}
                    </span>
                    <p
                      className="font-body text-sm md:text-base"
                      style={{ color: "hsl(0 0% 88%)", textShadow: "0 1px 4px hsl(0 0% 0% / 0.7)" }}
                    >
                      {m.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Next case + CTA */}
        <section className="py-[50px] px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <Link
              to={`/portfolio/${next.slug}`}
              className="group relative block rounded-2xl overflow-hidden aspect-[4/3]"
            >
              <img src={next.img} alt={next.client} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-background/60 group-hover:bg-background/40 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <p className="font-body text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: CELESTE }}>
                  Prossimo progetto
                </p>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground">{next.client}</h3>
              </div>
            </Link>

            <div
              className="flex flex-col items-start justify-center p-8 md:p-10 rounded-2xl border"
              style={{
                background: "linear-gradient(160deg, hsl(0 0% 5% / 0.78), hsl(0 0% 3% / 0.88))",
                borderColor: "hsl(0 0% 100% / 0.08)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5)",
              }}
            >
              <h3
                className="font-display font-bold tracking-tight leading-[1.05] mb-6 text-foreground"
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  textShadow: "0 2px 8px hsl(0 0% 0% / 0.85)",
                }}
              >
                Vuoi risultati simili?
              </h3>
              <p
                className="font-body text-base mb-8"
                style={{ color: "hsl(0 0% 88%)", textShadow: "0 1px 4px hsl(0 0% 0% / 0.7)" }}
              >
                Raccontaci il tuo progetto. Ti ricontattiamo entro 24h.
              </p>
              <Link
                to="/contatti"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-body text-sm font-medium tracking-wide transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 shadow-[0_4px_20px_hsl(0_0%_0%_/_0.4)] hover:shadow-[0_10px_30px_hsl(0_0%_0%_/_0.5)] text-primary-foreground bg-primary border-2 border-transparent hover:border-black hover:text-black"
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
