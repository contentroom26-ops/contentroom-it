import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Compass, Heart, Sparkles, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InlineCTA from "@/components/InlineCTA";

const values = [
  {
    icon: Compass,
    title: "Visione",
    desc: "Trasformare la comunicazione in un asset misurabile, dove creatività e dati parlano la stessa lingua.",
  },
  {
    icon: Heart,
    title: "Cultura",
    desc: "Un team curioso e ossessionato dal dettaglio, che mette al centro persone e brand prima del processo.",
  },
  {
    icon: Sparkles,
    title: "Creatività",
    desc: "Idee che nascono dall'ascolto e prendono forma in contenuti, design e storie capaci di emozionare.",
  },
  {
    icon: Target,
    title: "Metodo",
    desc: "Strategia, produzione e distribuzione integrate. Ogni progetto è guidato da obiettivi chiari e KPI condivisi.",
  },
];

const ChiSiamo = () => {
  const canonical = "https://contentroom-it.lovable.app/chisiamo";

  return (
    <>
      <Helmet>
        <title>Chi siamo — Content Room | Digitalizzazione e content a Firenze</title>
        <meta
          name="description"
          content="Scopri come nasce Content Room: la storia, la vision e il metodo dell'agenzia specializzata in digitalizzazione delle aziende, content strategy e produzione video a Firenze."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Chi siamo — Content Room" />
        <meta
          property="og:description"
          content="La storia e la vision di Content Room, agenzia specializzata in digitalizzazione delle aziende, content strategy e produzione video a Firenze."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Chi siamo — Content Room",
          url: canonical,
          about: {
            "@type": "Organization",
            name: "Content Room",
            url: "https://contentroom-it.lovable.app",
            email: "info@contentroom.it",
            description:
              "Agenzia specializzata in digitalizzazione delle aziende, content strategy e produzione video, con base a Firenze.",
            areaServed: "IT",
          },
        })}</script>
      </Helmet>

      <main className="relative z-10 min-h-screen overflow-x-hidden">
        <Navbar />

        {/* Hero — nera */}
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
                  Chi siamo
                </p>
              </div>
              <h1
                className="font-display font-black tracking-tight leading-[1.05] mb-6"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                La stanza dove<br />
                <span className="text-primary">prende forma il contenuto.</span>
              </h1>
              <p className="font-body text-base md:text-lg max-w-2xl text-white/75">
                Content Room nasce a Firenze dall'incontro tra strateghi, creativi e
                producer con un'unica ossessione: trasformare la comunicazione in
                risultati concreti per i brand che accompagniamo.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Storia — beige */}
        <section className="section-light py-20 md:py-28 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-brand-orange" />
                <p className="font-body text-xs font-bold tracking-[0.4em] uppercase text-brand-orange">
                  La nostra storia
                </p>
              </div>
              <h2
                className="font-display font-black tracking-tight leading-[1.05] mb-8"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
              >
                Da una stanza, <span className="text-primary">a un metodo.</span>
              </h2>
              <div className="space-y-5 font-body text-base md:text-lg leading-relaxed text-[hsl(0_0%_20%)]">
                <p>
                  Tutto comincia in una stanza. Una di quelle in cui si respira ancora
                  l'odore della carta dei moodboard e si discute fino a tardi sull'ultimo
                  frame di un video. È da quell'energia che nasce <strong>Content Room</strong>:
                  uno studio in cui idea, immagine e dato convivono nello stesso spazio.
                </p>
                <p>
                  Siamo nati per dare ai brand uno spazio dedicato, dove la creatività
                  non sia mai scollegata dagli obiettivi di business. Per questo abbiamo
                  costruito un team che mette insieme strategia, content production,
                  social media management, growth marketing e sviluppo digitale.
                </p>
                <p>
                  Lavoriamo con realtà che vogliono crescere — startup, PMI e brand
                  consolidati — accompagnandole in ogni passaggio: dall'analisi al
                  posizionamento, dalla produzione di contenuti alla distribuzione e
                  all'ottimizzazione continua.
                </p>
              </div>
            </motion.article>
          </div>
        </section>

        {/* Vision — nera */}
        <section className="section-dark py-20 md:py-28 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-brand-orange" />
                <p className="font-body text-xs font-bold tracking-[0.4em] uppercase text-brand-orange">
                  La nostra vision
                </p>
              </div>
              <h2
                className="font-display font-black tracking-tight leading-[1.05]"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                Creatività con metodo.<br />
                <span className="text-primary">Risultati con anima.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl p-6 md:p-8 border"
                    style={{
                      backgroundColor: "hsl(0 0% 12%)",
                      borderColor: "hsl(0 0% 100% / 0.1)",
                    }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-[hsl(192_49%_76%/0.12)]">
                      <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-2 text-white">
                      {v.title}
                    </h3>
                    <p className="font-body text-sm md:text-base leading-relaxed text-white/65">
                      {v.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA — beige */}
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
              Lavoriamo insieme?
            </h2>
            <p className="font-body text-base md:text-lg mb-4 max-w-xl mx-auto text-[hsl(0_0%_30%)]">
              Raccontaci il tuo progetto: ti rispondiamo entro 24h con un primo punto di vista.
            </p>
            <InlineCTA label="Prenota una call" to="/contatti" />
          </motion.div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default ChiSiamo;
