import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CYAN = "hsl(200 80% 74%)";

const recessedFieldShadow =
  "inset 0 2px 10px hsl(0 0% 0% / 0.38), inset 0 1px 0 hsl(0 0% 100% / 0.04), 0 0 0 1px hsl(0 0% 100% / 0.03)";

const CTASection = () => {
  return (
    <section className="relative min-h-screen px-4 py-8 md:py-12 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[560px] mx-auto"
      >
        <div
          className="absolute inset-0 rounded-[2rem] pointer-events-none"
          style={{
            boxShadow:
              "inset 0 1px 0 hsl(0 0% 100% / 0.04), inset 0 -18px 30px hsl(0 0% 0% / 0.16), inset 0 0 40px hsl(0 0% 0% / 0.08)",
          }}
        />

        <div className="relative px-6 py-8 md:px-8 md:py-9">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-6"
          >
            <div
              className="mx-auto mb-4 h-px w-14"
              style={{
                background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`,
                boxShadow: `0 0 18px hsl(200 80% 74% / 0.28)`,
              }}
            />

            <p
              className="font-body text-[11px] uppercase tracking-[0.35em]"
              style={{ color: "hsl(0 0% 38%)" }}
            >
              Contattaci
            </p>

            <h2
              className="font-display font-bold tracking-tight leading-[1.02] mt-3"
              style={{
                fontSize: "clamp(1.85rem, 4.3vw, 3.4rem)",
                color: CYAN,
                textShadow:
                  "0 0 24px hsl(200 80% 74% / 0.34), 0 0 60px hsl(200 80% 74% / 0.16), 0 2px 4px hsl(0 0% 0% / 0.82)",
              }}
            >
              Raccontaci il tuo progetto
            </h2>

            <p
              className="font-body text-sm md:text-base max-w-md mx-auto mt-3"
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.85, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <Input
              placeholder="Nome"
              className="h-12 rounded-2xl border-border/40 bg-transparent px-4 text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-1 focus-visible:ring-offset-0"
              style={{ boxShadow: recessedFieldShadow }}
            />

            <Input
              type="email"
              placeholder="Email"
              className="h-12 rounded-2xl border-border/40 bg-transparent px-4 text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-1 focus-visible:ring-offset-0"
              style={{ boxShadow: recessedFieldShadow }}
            />

            <Textarea
              placeholder="Raccontaci il tuo progetto"
              className="min-h-[140px] rounded-[1.6rem] border-border/40 bg-transparent px-4 py-4 text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-1 focus-visible:ring-offset-0 resize-none"
              style={{ boxShadow: recessedFieldShadow }}
            />

            <Button
              type="submit"
              size="lg"
              className="w-full h-13 md:h-14 rounded-full font-display text-sm uppercase tracking-[0.26em]"
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
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
