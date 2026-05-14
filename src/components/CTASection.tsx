import { motion } from "framer-motion";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const CELESTE = "hsl(192 49% 76%)";

const homeContactSchema = z.object({
  name: z.string().trim().min(1, "Inserisci il tuo nome").max(100),
  email: z.string().trim().email("Email non valida").max(255),
  message: z.string().trim().min(1, "Scrivi un messaggio").max(2000),
});
const ACCENT = CELESTE;

const recessedFieldShadow =
  "inset 0 2px 10px hsl(0 0% 0% / 0.38), inset 0 1px 0 hsl(0 0% 100% / 0.04), 0 0 0 1px hsl(0 0% 100% / 0.03)";

const CTASection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = homeContactSchema.safeParse(form);
    if (!result.success) {
      toast({
        title: "Controlla i campi",
        description: result.error.errors[0]?.message ?? "Dati non validi",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.functions.invoke("send-contact-email", {
      body: { ...result.data, source: "home" },
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Invio non riuscito", description: error.message, variant: "destructive" });
      return;
    }
    setForm({ name: "", email: "", message: "" });
    toast({ title: "Messaggio inviato", description: "Ti ricontatteremo al più presto." });
  };

  return (
    <section className="relative min-h-[calc(100vh-5rem)] px-4 pt-16 pb-6 md:pt-20 md:pb-8 flex items-center justify-center py-[50px]">
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
            background: "hsl(0 0% 8% / 0.92)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "inset 0 1px 0 hsl(0 0% 100% / 0.08), 0 8px 40px hsl(0 0% 0% / 0.5)",
            border: "1px solid hsl(0 0% 100% / 0.1)",
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
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="w-12 h-0.5" style={{ background: CELESTE }} />
              <p
                className="font-body text-xs font-bold uppercase tracking-[0.4em]"
                style={{ color: CELESTE }}
              >
                Contattaci
              </p>
              <div className="w-12 h-0.5" style={{ background: CELESTE }} />
            </div>

            <h2
              className="font-display font-bold tracking-tight leading-[1.02] mt-2"
              style={{
                fontSize: "clamp(1.6rem, 3.9vw, 2.8rem)",
                color: ACCENT,
                textShadow:
                  "0 0 22px hsl(192 49% 76% / 0.32), 0 0 48px hsl(192 49% 76% / 0.2), 0 2px 4px hsl(0 0% 0% / 0.82)",
              }}
            >
              Raccontaci il tuo progetto
            </h2>

            <p
              className="font-body text-sm md:text-base font-normal max-w-md mx-auto mt-2"
              style={{
                color: "hsl(0 0% 76%)",
                textShadow: "0 1px 2px hsl(0 0% 0% / 0.5)",
              }}
            >
              Obiettivi, visione e tempistiche: ti ricontattiamo con il prossimo step giusto.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                placeholder="Nome"
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-11 rounded-2xl border-border/60 bg-white/5 px-4 text-white placeholder:text-white/50 focus-visible:ring-1 focus-visible:ring-offset-0"
                style={{ boxShadow: recessedFieldShadow }}
              />

              <Input
                type="email"
                placeholder="Email"
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="h-11 rounded-2xl border-border/60 bg-white/5 px-4 text-white placeholder:text-white/50 focus-visible:ring-1 focus-visible:ring-offset-0"
                style={{ boxShadow: recessedFieldShadow }}
              />
            </div>

            <Textarea
              placeholder="Raccontaci il tuo progetto"
              maxLength={2000}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="min-h-[120px] rounded-[1.5rem] border-border/60 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus-visible:ring-1 focus-visible:ring-offset-0 resize-none"
              style={{ boxShadow: recessedFieldShadow }}
            />

            <Button
              type="submit"
              disabled={submitting}
              size="lg"
              className="w-full h-12 rounded-full font-display text-xs uppercase tracking-[0.26em]"
              style={{
                background: `linear-gradient(135deg, hsl(192 49% 76% / 0.2), hsl(192 49% 76% / 0.1))`,
                color: ACCENT,
                border: "1px solid hsl(192 49% 76% / 0.35)",
                boxShadow:
                  "inset 0 1px 0 hsl(0 0% 100% / 0.06), 0 0 24px hsl(192 49% 76% / 0.2)",
              }}
            >
              {submitting ? "Invio in corso…" : "Invia messaggio"}
            </Button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
