import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cases } from "./Portfolio";
import miamoVideo1 from "@/assets/miamo-1.mp4";
import miamoPoster1 from "@/assets/miamo-1-poster.jpg";
import miamoVideo2 from "@/assets/miamo-2.mp4";
import miamoPoster2 from "@/assets/miamo-2-poster.jpg";
import miamoVideo3 from "@/assets/miamo-3.mp4";
import miamoPoster3 from "@/assets/miamo-3-poster.jpg";
import shadeVideo1 from "@/assets/shade-1.mp4";
import shadePoster1 from "@/assets/shade-1-poster.jpg";
import shadeVideo2 from "@/assets/shade-2.mp4";
import shadePoster2 from "@/assets/shade-2-poster.jpg";
import shadeVideo3 from "@/assets/shade-3.mp4";
import shadePoster3 from "@/assets/shade-3-poster.jpg";

const CELESTE = "hsl(192 49% 76%)";

/* Sincronizza N elementi <video> indipendenti che derivano dallo stesso
   piano sequenza (es. crop sinistra/centro/destra di un video largo).
   IMPORTANTE: l'effect dipende SOLO da "enabled" (booleano primitivo),
   MAI dall'array di ref — un array literal è un nuovo riferimento a ogni
   render, e usarlo come dipendenza farebbe rilanciare l'effect di
   continuo, resettando i video a currentTime=0 ad ogni render (bug
   precedente: i video sembravano "fermi" perché ripartivano da zero
   decine di volte al secondo). Gli oggetti ref di useRef sono già
   stabili tra i render, non serve includerli nelle dipendenze. */
function useSyncedVideos(refs: React.RefObject<HTMLVideoElement>[], enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const videos = refs.map((r) => r.current).filter(Boolean) as HTMLVideoElement[];
    if (videos.length < 2) return;

    let started = false;
    const tryStart = () => {
      if (started) return;
      if (videos.every((v) => v.readyState >= 3)) {
        started = true;
        videos.forEach((v) => { v.currentTime = 0; v.play().catch(() => {}); });
      }
    };
    videos.forEach((v) => v.addEventListener("canplay", tryStart));
    tryStart();

    const resync = setInterval(() => {
      if (!started) return;
      const lead = videos[0];
      videos.slice(1).forEach((v) => {
        if (Math.abs(v.currentTime - lead.currentTime) > 0.15) {
          v.currentTime = lead.currentTime;
        }
      });
    }, 2000);

    return () => {
      clearInterval(resync);
      videos.forEach((v) => v.removeEventListener("canplay", tryStart));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);
}

interface GalleryItem {
  video?: string;
  poster?: string;
  img?: string;
  caption?: string;
}

interface CaseDetail {
  goal: string;
  solution: string;
  metrics: { value: string; label: string }[];
  gallery?: GalleryItem[];
  syncVideos?: boolean;
}
/* ⚠️ PERSONALIZZA — luxe-fashion, gusto-ristorante, fitpro-academy e glow-skincare
   sono dati placeholder. Sostituisci con dati reali prima di rendere pubblico il portfolio.
   sigillo, setup-events, miamo e shade sono clienti reali. */
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
  "sigillo": {
    goal: "Dare a una manifattura artigiana attiva da oltre 40 anni in private-label per maison di lusso una presenza digitale all'altezza del proprio savoir-faire, nel rispetto della riservatezza richiesta dal settore.",
    solution: "Abbiamo progettato un sito editoriale strutturato per capitoli, che racconta la filiera Made in Italy, la concia vegetale e il know-how artigianale senza mai esporre i nomi dei brand serviti.",
    metrics: [
      { value: "40", label: "Anni di esperienza artigiana" },
      { value: "30+", label: "Maison di lusso servite" },
      { value: "3", label: "Continenti raggiunti" },
    ],
  },
  "setup-events": {
    goal: "Dotare un'agenzia di organizzazione eventi aziendali a Firenze di un sito vetrina capace di comunicare credibilità verso le aziende e generare richieste di preventivo.",
    solution: "Sito web realizzato da zero con focus sui servizi offerti (hostess, steward, promoter, allestimenti su misura) e un percorso chiaro verso la richiesta di preventivo gratuito.",
    metrics: [
      { value: "—", label: "⚠️ PERSONALIZZA: inserisci una metrica reale" },
      { value: "—", label: "⚠️ PERSONALIZZA: inserisci una metrica reale" },
      { value: "—", label: "⚠️ PERSONALIZZA: inserisci una metrica reale" },
    ],
  },
  "miamo": {
    goal: "Raccontare l'apertura della nuova MIAMO Lounge all'interno dell'Helvetia & Bristol di Firenze, trasformando l'inaugurazione in contenuti capaci di comunicare l'esperienza del brand oltre la serata stessa.",
    solution: "Riprese sul campo durante l'evento — backstage, ospiti, ambientazione dell'hotel — montate in formati verticali pensati per Instagram e TikTok.",
    metrics: [],
    gallery: [
      { video: miamoVideo1, poster: miamoPoster1 },
      { video: miamoVideo2, poster: miamoPoster2 },
      { video: miamoVideo3, poster: miamoPoster3 },
    ],
  },
  "shade": {
    goal: "Accompagnare l'uscita del brano \"Toxic\" di Shade con un racconto visivo capace di rafforzarne l'identità, curando sia le foto ufficiali che i contenuti dietro le quinte.",
    solution: "Shooting fotografico dedicato e riprese BTS durante la produzione del brano, pensati per alimentare i canali social dell'artista nelle settimane di lancio.",
    metrics: [],
    syncVideos: true,
    gallery: [
      { video: shadeVideo1, poster: shadePoster1 },
      { video: shadeVideo2, poster: shadePoster2 },
      { video: shadeVideo3, poster: shadePoster3 },
    ],
  },
};

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseItem = cases.find((c) => c.slug === slug);
  const detail = slug ? details[slug] : undefined;

  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoRef3 = useRef<HTMLVideoElement>(null);
  const videoRefs = [videoRef1, videoRef2, videoRef3];
  useSyncedVideos(videoRefs, !!detail?.syncVideos);

  if (!caseItem || !detail) return <Navigate to="/portfolio" replace />;

  const idx = cases.findIndex((c) => c.slug === slug);
  const next = cases[(idx + 1) % cases.length];
  const hasGallery = detail.gallery && detail.gallery.length > 0;

  return (
    <>
      <main className="relative z-10 min-h-screen overflow-x-hidden">
        <Navbar />

        {/* Panoramica progetto — nera, immagine + testo affiancati */}
        <section className="section-dark pt-40 pb-20 px-6">
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

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-stretch">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto"
              >
                <img src={caseItem.img} alt={caseItem.client} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                  <p className="font-body text-[10px] font-bold tracking-[0.4em] uppercase mb-3 text-brand-orange">
                    {caseItem.service} · {caseItem.category}
                  </p>
                  <h1
                    className="font-display font-black tracking-tight leading-[1.05] text-white"
                    style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
                  >
                    {caseItem.client}
                  </h1>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-7 md:p-9 bg-[hsl(0_0%_12%)] border border-white/10 flex flex-col justify-center gap-7"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-px bg-brand-orange" />
                    <p className="font-body text-[10px] font-bold tracking-[0.4em] uppercase text-brand-orange">
                      Obiettivo
                    </p>
                  </div>
                  <p className="font-display text-lg md:text-xl leading-[1.45] text-white">
                    {detail.goal}
                  </p>
                </div>

                <div className="h-px bg-white/10" />

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-px bg-brand-orange" />
                    <p className="font-body text-[10px] font-bold tracking-[0.4em] uppercase text-brand-orange">
                      Soluzione
                    </p>
                  </div>
                  <p className="font-display text-lg md:text-xl leading-[1.45] text-white">
                    {detail.solution}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section-light py-20 md:py-28 px-6">
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
                    {hasGallery ? "Produzione" : "Risultati"}
                  </p>
                </div>
                <h2
                  className="font-display font-black tracking-tight leading-[1.05]"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                >
                  {hasGallery ? (
                    <>Contenuti <span className="text-primary">realizzati.</span></>
                  ) : (
                    <>Numeri <span className="text-primary">che parlano.</span></>
                  )}
                </h2>
              </div>

              {hasGallery ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                  {detail.gallery!.map((g, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 40, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="relative rounded-2xl overflow-hidden aspect-[9/16] bg-black"
                    >
                      {g.video ? (
                        <video
                          ref={videoRefs[i]}
                          src={g.video}
                          poster={g.poster}
                          autoPlay={!detail.syncVideos}
                          loop={!detail.syncVideos}
                          muted
                          playsInline
                          preload="auto"
                          className="absolute inset-0 w-full h-full object-cover"
                          onEnded={detail.syncVideos ? (e) => { e.currentTarget.currentTime = 0; e.currentTarget.play().catch(() => {}); } : undefined}
                        />
                      ) : g.img ? (
                        <>
                          <img src={g.img} alt={g.caption ?? caseItem.client} className="absolute inset-0 w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-14 h-14 rounded-full bg-black/40 border border-white/40 flex items-center justify-center">
                              <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                            </div>
                          </div>
                          {g.caption && (
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                              <p className="font-body text-xs text-white/90 text-center">{g.caption}</p>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="font-body text-xs text-white/40 text-center px-4">⚠️ PERSONALIZZA: contenuto in arrivo</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
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
                      <p className="font-body text-sm md:text-base text-[hsl(0_0%_30%)]">
                        {m.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        <section className="section-dark py-20 md:py-28 px-6">
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

            <div className="flex flex-col items-start justify-center p-8 md:p-10 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/10">
              <h3
                className="font-display font-black tracking-tight leading-[1.05] mb-6 text-white"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
              >
                Vuoi risultati simili?
              </h3>
              <p className="font-body text-base mb-8 text-white/65">
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
