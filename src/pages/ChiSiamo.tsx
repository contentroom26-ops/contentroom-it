import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Compass, Heart, Sparkles, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalVideoBackground from "@/components/GlobalVideoBackground";
import InlineCTA from "@/components/InlineCTA";

const CELESTE = "hsl(192 49% 76%)";
const HERO_TEXT_SHADOW =
  "0 2px 8px hsl(0 0% 0% / 0.85), 0 0 28px hsl(0 0% 0% / 0.6)";

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
        <title>Chi siamo — Content Room | Agenzia di comunicazione a Firenze</title>
        <meta
          name="description"
          content="Scopri come nasce Content Room: la storia, la vision e il metodo dell'agenzia di comunicazione e marketing di Firenze che unisce creatività e dati."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Chi siamo — Content Room" />
        <meta
          property="og:description"
          content="La storia e la vision di Content Room, agenzia di comunicazione e marketing a Firenze."
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
              "Agenzia di comunicazione e marketing a Firenze. Strategia, contenuti, social, growth e digitalizzazione.",
            areaServed: "IT",
          },
        })}</script>
      </Helmet>

      <GlobalVideoBackground />
      <main className="relative z-10 min-h-screen overflow-x-hidden">
        <Navbar />

        {/* Hero */}
        <section className="pt-40 pb-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-8 md:p-12 border"
              style={{
                background: "linear-gradient(160deg, hsl(0 0% 5% / 0.78), hsl(0 0% 3% / 0.88))",
                borderColor: "hsl(0 0% 100% / 0.08)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5)",
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px" style={{ background: CELESTE }} />
                <p
                  className="font-body text-xs tracking-[0.4em] uppercase"
                  style={{ color: CELESTE }}
                >
                  Chi siamo
                </p>
              </div>
              <h1
                className="font-display font-bold tracking-tight leading-[1.05] mb-6 text-foreground"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", textShadow: HERO_TEXT_SHADOW }}
              >
                La stanza dove<br />
                <span style={{ color: "hsl(0 0% 75%)" }}>prende forma il contenuto.</span>
              </h1>
              <p
                className="font-body text-base md:text-lg max-w-2xl"
                style={{ color: "hsl(0 0% 92%)", textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}
              >
                Content Room nasce a Firenze dall'incontro tra strateghi, creativi e
                producer con un'unica ossessione: trasformare la comunicazione in
                risultati concreti per i brand che accompagniamo.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Storia */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-15%" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-8 md:p-12 border"
              style={{
                background: "linear-gradient(160deg, hsl(0 0% 5% / 0.78), hsl(0 0% 3% / 0.88))",
                borderColor: "hsl(0 0% 100% / 0.08)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5)",
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px" style={{ background: CELESTE }} />
                <p className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: CELESTE }}>
                  La nostra storia
                </p>
              </div>
              <h2
                className="font-display font-bold tracking-tight leading-[1.05] mb-8 text-foreground"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", textShadow: HERO_TEXT_SHADOW }}
              >
                Da una stanza, a un metodo.
              </h2>
              <div
                className="space-y-5 font-body text-base md:text-lg leading-relaxed"
                style={{ color: "hsl(0 0% 90%)", textShadow: "0 1px 6px hsl(0 0% 0% / 0.6)" }}
              >
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

        {/* Vision */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-15%" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px" style={{ background: CELESTE }} />
                <p className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: CELESTE }}>
                  La nostra vision
                </p>
              </div>
              <h2
                className="font-display font-bold tracking-tight leading-[1.05] text-foreground"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", textShadow: HERO_TEXT_SHADOW }}
              >
                Creatività con metodo.<br />
                <span style={{ color: "hsl(0 0% 75%)" }}>Risultati con anima.</span>
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
                    viewport={{ once: false, margin: "-10%" }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl p-6 md:p-8 border"
                    style={{
                      background: "linear-gradient(160deg, hsl(0 0% 7% / 0.85), hsl(0 0% 4% / 0.95))",
                      borderColor: "hsl(0 0% 100% / 0.08)",
                      backdropFilter: "blur(18px)",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(192 49% 76% / 0.2), hsl(192 49% 76% / 0.05))",
                        border: "1px solid hsl(192 49% 76% / 0.3)",
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: CELESTE }} strokeWidth={1.5} />
                    </div>
                    <h3
                      className="font-display font-semibold text-xl mb-2 text-foreground"
                      style={{ textShadow: HERO_TEXT_SHADOW }}
                    >
                      {v.title}
                    </h3>
                    <p
                      className="font-body text-sm md:text-base leading-relaxed"
                      style={{ color: "hsl(0 0% 85%)" }}
                    >
                      {v.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
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
              Lavoriamo insieme?
            </h2>
            <p
              className="font-body text-base md:text-lg mb-4 max-w-xl mx-auto"
              style={{ color: "hsl(0 0% 90%)", textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}
            >
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
