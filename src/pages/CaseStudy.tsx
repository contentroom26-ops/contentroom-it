import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
import jasonDerulo1 from "@/assets/jason-derulo-1.jpg";
import jasonDerulo2 from "@/assets/jason-derulo-2.jpg";
import jasonDerulo3 from "@/assets/jason-derulo-3.jpg";
import bonsaltoVideo1 from "@/assets/bonsalto-1.mp4";
import bonsaltoImg2 from "@/assets/bonsalto-2.jpg";
import bonsaltoVideo3 from "@/assets/bonsalto-3.mp4";
import righiVideo1 from "@/assets/righi-1.mp4";
import righiVideo2 from "@/assets/righi-2.mp4";
import righiVideo3 from "@/assets/righi-3.mp4";

const CELESTE = "hsl(192 49% 76%)";

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
  smallMetrics?: boolean; // true quando i valori sono parole, non numeri brevi
  gallery?: GalleryItem[];
  syncVideos?: boolean;
  // ⚠️ true per progetti Social: mostra metriche E gallery nella stessa
  // sezione beige (metriche sopra, gallery sotto). Per Video: solo gallery.
  // Per Web: solo metriche. Default: false.
  showBoth?: boolean;
}

const details: Record<string, CaseDetail> = {
  "bonsalto": {
    goal: "Costruire una presenza digitale autentica per una fattoria vinicola toscana nata negli anni Settanta, trasmettendo sui social lo spirito tradizionale della famiglia Paci senza tradirne l'identità.",
    solution: "Abbiamo preso in mano l'account Instagram appena dopo l'apertura, definendo una palette cromatica coerente e un tono di voce in linea con i valori della fattoria. Shooting fotografici dedicati, piano editoriale a lungo termine e cura dei dettagli visivi per raccontare il vino, la terra e le persone dietro ogni bottiglia.",
    // ⚠️ PERSONALIZZA: metriche oscurate in attesa di dati reali dal cliente
    metrics: [],
    gallery: [
      { video: bonsaltoVideo1 },
      { img: bonsaltoImg2 },
      { video: bonsaltoVideo3 },
    ],
  },
  "righi": {
    goal: "Raccontare sui social lo studio fotografico di matrimoni più storico di Firenze, trasferendo online la stessa cura artigianale che porta alla realizzazione dei book fotografici, senza perdere il calore di un marchio nato nel 1954.",
    solution: "Content strategy dedicata a Instagram e produzione di video su misura che raccontano il dietro le quinte degli shooting di nozze, valorizzando sia il lavoro fotografico sia la manifattura degli album fine art che da tre generazioni accompagnano gli sposi Righi.",
    // ⚠️ PERSONALIZZA: metriche heritage (1954 / 70 anni / 3 generazioni) oscurate su richiesta
    metrics: [],
    gallery: [
      { video: righiVideo1 },
      { video: righiVideo2 },
      { video: righiVideo3 },
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
  "jason-derulo": {
    goal: "Documentare in modo esclusivo la presenza di Jason Derulo al Central Club di Firenze il 1 giugno 2026, con accesso privilegiato prima, durante e dopo l'evento.",
    solution: "Copertura fotografica completa dell'artista — nei momenti privati prima del palco, sul palco durante l'esibizione e nel backstage a evento concluso — per restituire un racconto visivo autentico e non disponibile nei canali ufficiali.",
    metrics: [],
    gallery: [
      { img: jasonDerulo1 },
      { img: jasonDerulo2 },
      { img: jasonDerulo3 },
    ],
  },
};

// Componente gallery riutilizzato sia nella sezione "solo gallery" che in "showBoth"
function GalleryGrid({ gallery, caseItem, videoRefs, syncVideos }: {
  gallery: GalleryItem[];
  caseItem: any;
  videoRefs: React.RefObject<HTMLVideoElement>[];
  syncVideos?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
      {gallery.map((g, i) => (
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
              autoPlay={!syncVideos}
              loop={!syncVideos}
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              onEnded={syncVideos ? (e) => { e.currentTarget.currentTime = 0; e.currentTarget.play().catch(() => {}); } : undefined}
            />
          ) : g.img ? (
            <>
              <img src={g.img} alt={g.caption ?? caseItem.client} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/15 pointer-events-none" />
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
  );
}

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
  const hasGallery = !!detail.gallery && detail.gallery.length > 0;
  const hasMetrics = detail.metrics.length > 0;
  const showBoth = !!detail.showBoth && hasGallery && hasMetrics;

  return (
    <>
      <main className="relative z-10 min-h-screen overflow-x-hidden">
        <Navbar />

        {/* Hero — nera */}
        <section className="section-dark pt-40 pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="mb-8">
              <Link to="/portfolio" className="inline-flex items-center gap-2 font-body text-xs tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors">
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
                  <h1 className="font-display font-black tracking-tight leading-[1.05] text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
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
                    <p className="font-body text-[10px] font-bold tracking-[0.4em] uppercase text-brand-orange">Obiettivo</p>
                  </div>
                  <p className="font-display text-lg md:text-xl leading-[1.45] text-white">{detail.goal}</p>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-px bg-brand-orange" />
                    <p className="font-body text-[10px] font-bold tracking-[0.4em] uppercase text-brand-orange">Soluzione</p>
                  </div>
                  <p className="font-display text-lg md:text-xl leading-[1.45] text-white">{detail.solution}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sezione beige — metriche e/o gallery secondo il tipo di progetto:
            - Web:    solo metriche
            - Video:  solo gallery
            - Social: entrambe (showBoth=true) — metriche sopra, gallery sotto */}
        <section className="section-light py-20 md:py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Titolo sezione */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-px bg-brand-orange" />
                  <p className="font-body text-xs font-bold tracking-[0.4em] uppercase text-brand-orange">
                    {showBoth ? "Risultati" : hasGallery ? "Produzione" : "Risultati"}
                  </p>
                </div>
                <h2 className="font-display font-black tracking-tight leading-[1.05]" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
                  {showBoth || !hasGallery ? (
                    <>Numeri <span className="text-primary">che parlano.</span></>
                  ) : (
                    <>Contenuti <span className="text-primary">realizzati.</span></>
                  )}
                </h2>
              </div>

              {/* Metriche — sempre visibili se hasMetrics (Web e Social) */}
              {hasMetrics && (
                <div className="grid md:grid-cols-3 gap-8 md:gap-6 mb-16">
                  {detail.metrics.map((m, i) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, y: 60, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      className="text-center md:text-left"
                    >
                      <span className="font-display font-black block leading-none mb-4 text-primary" style={{ fontSize: detail.smallMetrics ? "clamp(1.8rem, 3vw, 2.5rem)" : "clamp(3.5rem, 8vw, 6rem)" }}>
                        {m.value}
                      </span>
                      <p className="font-body text-sm md:text-base text-[hsl(0_0%_30%)]">{m.label}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Gallery — visibile se showBoth (Social) o solo gallery (Video) */}
              {hasGallery && (showBoth || !hasMetrics) && (
                <>
                  {showBoth && (
                    <div className="mb-10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-px bg-brand-orange" />
                        <p className="font-body text-xs font-bold tracking-[0.4em] uppercase text-brand-orange">Produzione</p>
                      </div>
                      <h3 className="font-display font-black tracking-tight leading-[1.05]" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
                        Contenuti <span className="text-primary">realizzati.</span>
                      </h3>
                    </div>
                  )}
                  <GalleryGrid
                    gallery={detail.gallery!}
                    caseItem={caseItem}
                    videoRefs={videoRefs}
                    syncVideos={detail.syncVideos}
                  />
                </>
              )}
            </motion.div>
          </div>
        </section>

        {/* Next case + CTA — nera */}
        <section className="section-dark py-20 md:py-28 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <Link to={`/portfolio/${next.slug}`} className="group relative block rounded-2xl overflow-hidden aspect-[4/3]">
              <img src={next.img} alt={next.client} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/55 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <p className="font-body text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: CELESTE }}>Prossimo progetto</p>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-white">{next.client}</h3>
              </div>
            </Link>

            <div className="flex flex-col items-start justify-center p-8 md:p-10 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/10">
              <h3 className="font-display font-black tracking-tight leading-[1.05] mb-6 text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
                Vuoi risultati simili?
              </h3>
              <p className="font-body text-base mb-8 text-white/65">Raccontaci il tuo progetto. Ti ricontattiamo entro 24h.</p>
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
