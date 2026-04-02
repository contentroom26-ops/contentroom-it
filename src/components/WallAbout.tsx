import { motion } from "framer-motion";
import { Zap, Target, Heart } from "lucide-react";
import contentRoomLogo from "@/assets/contentroom-logo.png";

const CYAN = "hsl(200 80% 74%)";

const values = [
  { icon: Zap, title: "Innovazione", desc: "Tecniche all'avanguardia per risultati che contano." },
  { icon: Target, title: "Strategia", desc: "Ogni azione è guidata dai dati e dagli obiettivi." },
  { icon: Heart, title: "Passione", desc: "Amiamo quello che facciamo, e si vede nei risultati." },
];

const stats = [
  { value: "+500k", label: "Views generate" },
  { value: "+300%", label: "Engagement medio" },
  { value: "50+", label: "Clienti gestiti" },
];

interface Props {
  isActive: boolean;
  progress: number;
}

export default function WallAbout({ isActive, progress }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-10 md:px-16 py-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <motion.div
          initial={false}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 40 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-10 h-px" style={{ background: CYAN }} />
            <p className="font-body text-[10px] tracking-[0.5em] uppercase" style={{ color: CYAN }}>About</p>
            <div className="w-10 h-px" style={{ background: CYAN }} />
          </div>
          <h2 className="font-display font-bold tracking-tight mb-6" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            Chi siamo
          </h2>

          <motion.img
            src={contentRoomLogo}
            alt="Content Room"
            className="h-16 md:h-20 w-auto mx-auto mb-6"
            initial={false}
            animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          />

          <p
            className="font-body text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
            style={{ color: "hsl(0 0% 55%)" }}
          >
            Content Room è l'agenzia creativa che trasforma brand in esperienze digitali memorabili.
            Uniamo strategia, creatività e dati per far crescere il tuo business sui social e sul web.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={false}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex justify-center gap-8 md:gap-16 mb-12"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <span
                className="font-display font-bold text-2xl md:text-3xl block mb-1"
                style={{ color: CYAN }}
              >
                {stat.value}
              </span>
              <span className="font-body text-[10px] md:text-xs tracking-wider uppercase" style={{ color: "hsl(0 0% 45%)" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {values.map((val, i) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={val.title}
                initial={false}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 40 }}
                transition={{ duration: 0.6, delay: isActive ? 0.2 + i * 0.1 : 0 }}
                className="rounded-2xl p-6 text-center"
                style={{
                  background: "hsl(0 0% 6% / 0.6)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid hsl(0 0% 100% / 0.06)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: "hsl(200 80% 74% / 0.08)",
                    border: "1px solid hsl(200 80% 74% / 0.15)",
                  }}
                >
                  <Icon size={18} strokeWidth={1.5} style={{ color: CYAN }} />
                </div>
                <h3 className="font-display font-bold text-base mb-2">{val.title}</h3>
                <p className="font-body text-xs leading-relaxed" style={{ color: "hsl(0 0% 45%)" }}>
                  {val.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
