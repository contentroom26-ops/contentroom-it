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

const recessedFieldShadow = "inset 0 2px 8px hsl(0 0% 0% / 0.3)";

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
    <section className="section-dark relative px-4 py-20 md:py-28 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[620px] mx-auto rounded-[1.75rem] overflow-hidden"
        style={{ backgroundColor: "hsl(0 0% 10%)", border: "1px solid hsl(0 0% 100% / 0.1)" }}
      >
        <div className="relative px-5 py-7 md:px-8 md:py-9">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-5"
          >
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="w-12 h-0.5 bg-brand-orange" />
              <p className="font-body text-xs font-bold uppercase tracking-[0.4em] text-brand-orange">
                Contattaci
              </p>
              <div className="w-12 h-0.5 bg-brand-orange" />
            </div>

            <h2
              className="font-display font-black tracking-tight leading-[1.02] mt-2"
              style={{ fontSize: "clamp(1.6rem, 3.9vw, 2.8rem)", color: CELESTE }}
            >
              Raccontaci il tuo progetto
            </h2>

            <p className="font-body text-sm md:text-base font-normal max-w-md mx-auto mt-2 text-white/70">
              Obiettivi, visione e tempistiche: ti ricontattiamo con il prossimo step giusto.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                placeholder="Nome"
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-11 rounded-2xl border-white/10 bg-white/5 px-4 text-white placeholder:text-white/40 focus-visible:ring-1 focus-visible:ring-offset-0"
                style={{ boxShadow: recessedFieldShadow }}
              />

              <Input
                type="email"
                placeholder="Email"
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="h-11 rounded-2xl border-white/10 bg-white/5 px-4 text-white placeholder:text-white/40 focus-visible:ring-1 focus-visible:ring-offset-0"
                style={{ boxShadow: recessedFieldShadow }}
              />
            </div>

            <Textarea
              placeholder="Raccontaci il tuo progetto"
              maxLength={2000}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="min-h-[120px] rounded-[1.5rem] border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus-visible:ring-1 focus-visible:ring-offset-0 resize-none"
              style={{ boxShadow: recessedFieldShadow }}
            />

            <Button
              type="submit"
              disabled={submitting}
              size="lg"
              className="w-full h-12 rounded-2xl font-display font-bold text-xs uppercase tracking-[0.26em] text-[hsl(192_35%_16%)] bg-primary hover:brightness-105 transition-all duration-300"
            >
              {submitting ? "Invio in corso…" : "Invia messaggio"}
            </Button>

            <p className="text-center text-xs text-white/45 font-body pt-1">
              Rispondiamo entro 24h. Nessun impegno.
            </p>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
