import { motion } from "framer-motion";
import { useState } from "react";
import { Send, ArrowRight } from "lucide-react";

const CYAN = "hsl(200 80% 74%)";

interface Props {
  isActive: boolean;
  progress: number;
}

export default function WallContact({ isActive, progress }: Props) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center px-12 md:px-20 py-10" style={{ transform: "scale(0.82)", transformOrigin: "center center" }}>
      <div className="max-w-xl w-full">
        {/* Header */}
        <motion.div
          initial={false}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 40 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-10 h-px" style={{ background: CYAN }} />
            <p className="font-body text-[10px] tracking-[0.5em] uppercase" style={{ color: CYAN }}>Contatti</p>
            <div className="w-10 h-px" style={{ background: CYAN }} />
          </div>
          <h2 className="font-display font-bold tracking-tight mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            Parliamo del tuo progetto
          </h2>
          <p className="font-body text-sm" style={{ color: "hsl(0 0% 50%)" }}>
            Raccontaci la tua idea, ti rispondiamo entro 24h.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={false}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Name */}
          <div>
            <label className="block font-body text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: "hsl(0 0% 45%)" }}>
              Nome
            </label>
            <input
              type="text"
              required
              maxLength={100}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-transparent rounded-xl px-5 py-3.5 font-body text-sm outline-none transition-all duration-500 placeholder:text-[hsl(0_0%_30%)]"
              style={{
                border: "1px solid hsl(0 0% 100% / 0.08)",
                color: "hsl(40 20% 92%)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "hsl(200 80% 74% / 0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "hsl(0 0% 100% / 0.08)")}
              placeholder="Il tuo nome"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-body text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: "hsl(0 0% 45%)" }}>
              Email
            </label>
            <input
              type="email"
              required
              maxLength={255}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-transparent rounded-xl px-5 py-3.5 font-body text-sm outline-none transition-all duration-500 placeholder:text-[hsl(0_0%_30%)]"
              style={{
                border: "1px solid hsl(0 0% 100% / 0.08)",
                color: "hsl(40 20% 92%)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "hsl(200 80% 74% / 0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "hsl(0 0% 100% / 0.08)")}
              placeholder="email@esempio.com"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block font-body text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: "hsl(0 0% 45%)" }}>
              Messaggio
            </label>
            <textarea
              required
              maxLength={1000}
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-transparent rounded-xl px-5 py-3.5 font-body text-sm outline-none transition-all duration-500 resize-none placeholder:text-[hsl(0_0%_30%)]"
              style={{
                border: "1px solid hsl(0 0% 100% / 0.08)",
                color: "hsl(40 20% 92%)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "hsl(200 80% 74% / 0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "hsl(0 0% 100% / 0.08)")}
              placeholder="Parlaci del tuo progetto..."
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-xl py-4 font-display font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 transition-all duration-500"
            style={{
              background: sent
                ? "hsl(140 60% 45%)"
                : "linear-gradient(135deg, hsl(200 80% 74%), hsl(200 60% 55%))",
              color: "hsl(0 0% 5%)",
              boxShadow: "0 0 30px hsl(200 80% 74% / 0.2)",
            }}
          >
            {sent ? (
              <>Messaggio inviato!</>
            ) : (
              <>
                Invia messaggio
                <Send size={16} />
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
