import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const inputClass =
    "w-full bg-transparent rounded-xl px-5 py-4 font-body text-sm outline-none transition-all duration-500 text-foreground placeholder:text-muted-foreground/40";
  const inputStyle = {
    border: "1px solid hsl(0 0% 100% / 0.08)",
  };

  return (
    <section
      id="contatti"
      ref={ref}
      className="relative py-32 md:py-40"
      style={{
        background: "linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(0 0% 5%) 50%, hsl(0 0% 3%) 100%)",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Left — CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
              Contatti
            </p>
            <h2
              className="font-display font-bold text-foreground tracking-tight leading-[1.05] mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              Parliamo del tuo <span className="text-primary">progetto.</span>
            </h2>
            <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed mb-10">
              Raccontaci la tua idea. Ti rispondiamo entro 24 ore con una proposta su misura per il tuo brand.
            </p>

            {/* Contact info */}
            <div className="space-y-4">
              {[
                { label: "Email", value: "hello@contentroom.it" },
                { label: "Instagram", value: "@contentroom" },
                { label: "Telefono", value: "+39 333 123 4567" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 group cursor-pointer">
                  <span className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground w-20">
                    {item.label}
                  </span>
                  <span className="font-body text-sm text-foreground/80 group-hover:text-primary transition-colors">
                    {item.value}
                  </span>
                  <ArrowUpRight size={12} className="text-muted-foreground/30 group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="block font-body text-[10px] tracking-[0.2em] uppercase mb-2 text-muted-foreground">
                Nome
              </label>
              <input
                type="text"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "hsl(38 90% 55% / 0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "hsl(0 0% 100% / 0.08)")}
                placeholder="Il tuo nome"
              />
            </div>

            <div>
              <label className="block font-body text-[10px] tracking-[0.2em] uppercase mb-2 text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                required
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "hsl(38 90% 55% / 0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "hsl(0 0% 100% / 0.08)")}
                placeholder="email@esempio.com"
              />
            </div>

            <div>
              <label className="block font-body text-[10px] tracking-[0.2em] uppercase mb-2 text-muted-foreground">
                Messaggio
              </label>
              <textarea
                required
                maxLength={1000}
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "hsl(38 90% 55% / 0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "hsl(0 0% 100% / 0.08)")}
                placeholder="Parlaci del tuo progetto..."
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-xl py-4 font-display font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 transition-all duration-500"
              style={{
                background: sent
                  ? "hsl(140 60% 45%)"
                  : "hsl(38 90% 55%)",
                color: "hsl(0 0% 3%)",
                boxShadow: "0 0 40px hsl(38 90% 55% / 0.2)",
              }}
            >
              {sent ? (
                <>Messaggio inviato! ✓</>
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
    </section>
  );
}
