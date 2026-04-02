import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CYAN = "hsl(200 80% 74%)";

const fieldInsetShadow =
  "inset 0 2px 10px hsl(0 0% 0% / 0.34), inset 0 1px 0 hsl(0 0% 100% / 0.04), 0 0 0 1px hsl(0 0% 100% / 0.03)";

const CTASection = () => {
  return (
    <section className="relative min-h-[115vh] md:min-h-[120vh] px-4 py-24 md:py-32 flex items-center">
      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2rem] px-6 py-8 md:px-10 md:py-10"
          style={{
            background:
              "linear-gradient(180deg, hsl(0 0% 8% / 0.08), hsl(0 0% 8% / 0.16), hsl(0 0% 5% / 0.08))",
            boxShadow:
              "inset 0 1px 0 hsl(0 0% 100% / 0.05), inset 0 -24px 40px hsl(0 0% 0% / 0.18), 0 0 60px hsl(0 0% 0% / 0.08)",
            backdropFilter: "blur(2px)",
          }}
        >
          <div
            className="absolute inset-0 rounded-[2rem] pointer-events-none"
            style={{
              border: "1px solid hsl(0 0% 100% / 0.05)",
              boxShadow:
                "inset 0 0 0 1px hsl(0 0% 0% / 0.22), inset 0 18px 40px hsl(0 0% 100% / 0.02)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-8 md:mb-10"
          >
            <div
              className="mx-auto mb-6 h-px w-16"
              style={{
                background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`,
                boxShadow: `0 0 18px hsl(200 80% 74% / 0.35)`,
              }}
            />

            <p
              className="font-display font-bold tracking-tight leading-[0.95]"
              style={{
                fontSize: "clamp(2.2rem, 5.8vw, 4.8rem)",
                color: "hsl(0 0% 16%)",
                textShadow:
                  "0 2px 2px hsl(0 0% 100% / 0.04), 0 -2px 3px hsl(0 0% 0% / 0.75), 0 10px 30px hsl(0 0% 0% / 0.22)",
                WebkitTextStroke: "0.6px hsl(0 0% 20%)",
              }}
            >
              Contattaci
            </p>

            <h2
              className="font-display font-bold tracking-tight leading-[1.02] mt-2"
              style={{
                fontSize: "clamp(1.9rem, 5vw, 4rem)",
                color: CYAN,
                textShadow:
                  "0 0 28px hsl(200 80% 74% / 0.36), 0 0 60px hsl(200 80% 74% / 0.18), 0 2px 4px hsl(0 0% 0% / 0.85)",
              }}
            >
              Raccontaci il tuo progetto
            </h2>

            <p
              className="font-body text-sm md:text-base max-w-xl mx-auto mt-4"
              style={{
                color: "hsl(0 0% 38%)",
                textShadow: "0 1px 2px hsl(0 0% 0% / 0.65)",
              }}
            >
              Scrivici cosa vuoi costruire, dove vuoi arrivare e ti ricontattiamo con una direzione chiara.
            </p>
          </motion.div>

          <motion.form
            onSubmit={(event) => event.preventDefault()}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <label className="block font-body text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                Nome
              </label>
              <Input
                placeholder="Il tuo nome"
                className="h-14 rounded-2xl border-border/40 bg-transparent px-4 text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-1 focus-visible:ring-offset-0"
                style={{ boxShadow: fieldInsetShadow }}
              />
            </div>

            <div className="space-y-2">
              <label className="block font-body text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                Email
              </label>
              <Input
                type="email"
                placeholder="nome@brand.com"
                className="h-14 rounded-2xl border-border/40 bg-transparent px-4 text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-1 focus-visible:ring-offset-0"
                style={{ boxShadow: fieldInsetShadow }}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block font-body text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                Brand o azienda
              </label>
              <Input
                placeholder="Come si chiama il tuo progetto?"
                className="h-14 rounded-2xl border-border/40 bg-transparent px-4 text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-1 focus-visible:ring-offset-0"
                style={{ boxShadow: fieldInsetShadow }}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block font-body text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                Raccontaci il tuo progetto
              </label>
              <Textarea
                placeholder="Obiettivi, servizi che ti interessano, timing, budget indicativo..."
                className="min-h-[180px] rounded-[1.75rem] border-border/40 bg-transparent px-4 py-4 text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-1 focus-visible:ring-offset-0 resize-none"
                style={{ boxShadow: fieldInsetShadow }}
              />
            </div>

            <div className="md:col-span-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-3">
              <p
                className="font-body text-sm max-w-md"
                style={{ color: "hsl(0 0% 42%)" }}
              >
                Ti rispondiamo con una proposta concreta e il prossimo step migliore per partire.
              </p>

              <Button
                type="submit"
                size="lg"
                className="h-14 rounded-full px-8 font-display text-sm uppercase tracking-[0.24em]"
                style={{
                  background: `linear-gradient(135deg, hsl(200 80% 74% / 0.16), hsl(200 80% 74% / 0.08))`,
                  color: CYAN,
                  border: "1px solid hsl(200 80% 74% / 0.24)",
                  boxShadow:
                    "inset 0 1px 0 hsl(0 0% 100% / 0.06), 0 0 24px hsl(200 80% 74% / 0.14)",
                }}
              >
                Prenota una call
              </Button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
