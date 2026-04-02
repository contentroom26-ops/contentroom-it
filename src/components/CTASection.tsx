import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CELESTE = "hsl(192 49% 76%)";
const ACCENT = CELESTE;

const recessedFieldShadow =
  "inset 0 2px 10px hsl(0 0% 0% / 0.38), inset 0 1px 0 hsl(0 0% 100% / 0.04), 0 0 0 1px hsl(0 0% 100% / 0.03)";

const CTASection = () => {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] px-4 pt-16 pb-6 md:pt-20 md:pb-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[620px] mx-auto"
      >
        <div
          className="absolute inset-0 rounded-[1.75rem] pointer-events-none"
          style={{
            boxShadow:
              "inset 0 1px 0 hsl(0 0% 100% / 0.04), inset 0 -18px 30px hsl(0 0% 0% / 0.14), inset 0 0 36px hsl(0 0% 0% / 0.08)",
            border: "1px solid hsl(0 0% 100% / 0.04)",
          }}
        />

        <div className="relative px-5 py-6 md:px-7 md:py-7">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-5"
          >
            <div
              className="mx-auto mb-3 h-px w-12"
              style={{
                background: `linear-gradient(90deg, transparent, ${CELESTE}, transparent)`,
                boxShadow: `0 0 18px hsl(192 49% 76% / 0.26)`,
              }}
            />

            <p
              className="font-body text-[10px] uppercase tracking-[0.35em]"
              style={{ color: "hsl(0 0% 38%)" }}
            >
              Contattaci
            </p>

            <h2
              className="font-display font-bold tracking-tight leading-[1.02] mt-2"
              style={{
                fontSize: "clamp(1.6rem, 3.9vw, 2.8rem)",
                color: ARANCIONE,
                textShadow:
                  "0 0 22px hsl(192 49% 76% / 0.32), 0 0 48px hsl(14 97% 51% / 0.2), 0 2px 4px hsl(0 0% 0% / 0.82)",
              }}
            >
              Raccontaci il tuo progetto
            </h2>

            <p
              className="font-body text-xs md:text-sm max-w-md mx-auto mt-2"
              style={{
                color: "hsl(0 0% 34%)",
                textShadow: "0 1px 2px hsl(0 0% 0% / 0.65)",
              }}
            >
              Obiettivi, visione e tempistiche: ti ricontattiamo con il prossimo step giusto.
            </p>
          </motion.div>

          <motion.form
            onSubmit={(event) => event.preventDefault()}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                placeholder="Nome"
                className="h-11 rounded-2xl border-border/40 bg-transparent px-4 text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-1 focus-visible:ring-offset-0"
                style={{ boxShadow: recessedFieldShadow }}
              />

              <Input
                type="email"
                placeholder="Email"
                className="h-11 rounded-2xl border-border/40 bg-transparent px-4 text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-1 focus-visible:ring-offset-0"
                style={{ boxShadow: recessedFieldShadow }}
              />
            </div>

            <Textarea
              placeholder="Raccontaci il tuo progetto"
              className="min-h-[120px] rounded-[1.5rem] border-border/40 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-1 focus-visible:ring-offset-0 resize-none"
              style={{ boxShadow: recessedFieldShadow }}
            />

            <Button
              type="submit"
              size="lg"
              className="w-full h-12 rounded-full font-display text-xs uppercase tracking-[0.26em]"
              style={{
                background: `linear-gradient(135deg, hsl(14 97% 51% / 0.2), hsl(14 97% 51% / 0.1))`,
                color: ARANCIONE,
                border: "1px solid hsl(14 97% 51% / 0.35)",
                boxShadow:
                  "inset 0 1px 0 hsl(0 0% 100% / 0.06), 0 0 24px hsl(14 97% 51% / 0.2)",
              }}
            >
              Prenota una call
            </Button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
