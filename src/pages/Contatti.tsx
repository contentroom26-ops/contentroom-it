import { motion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImmersiveRoom from "@/components/ImmersiveRoom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const CELESTE = "hsl(192 49% 76%)";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Inserisci il tuo nome").max(100),
  email: z.string().trim().email("Email non valida").max(255),
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(1, "Scrivi un messaggio").max(1000),
});

const recessedFieldShadow =
  "inset 0 2px 10px hsl(0 0% 0% / 0.38), inset 0 1px 0 hsl(0 0% 100% / 0.04), 0 0 0 1px hsl(0 0% 100% / 0.03)";

const Contatti = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast({
        title: "Controlla i campi",
        description: result.error.errors[0]?.message ?? "Dati non validi",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast({
        title: "Messaggio inviato",
        description: "Ti ricontatteremo al più presto.",
      });
    }, 600);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <ImmersiveRoom />
      <Navbar />

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <p
              className="font-body text-[11px] font-medium uppercase tracking-[0.35em] mb-3"
              style={{ color: "hsl(0 0% 76%)" }}
            >
              Contatti
            </p>
            <h1
              className="font-display font-bold tracking-tight leading-[1.02]"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                color: CELESTE,
                textShadow:
                  "0 0 22px hsl(192 49% 76% / 0.32), 0 0 48px hsl(192 49% 76% / 0.2), 0 2px 4px hsl(0 0% 0% / 0.82)",
              }}
            >
              Parliamo del tuo progetto
            </h1>
            <p className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
              Scrivici, chiama o compila il form: ti rispondiamo in 24 ore con soluzioni per te.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Info */}
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2 space-y-6"
            >
              <div
                className="rounded-3xl p-7"
                style={{
                  background: "hsl(0 0% 8% / 0.92)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid hsl(0 0% 100% / 0.1)",
                  boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.08), 0 8px 40px hsl(0 0% 0% / 0.5)",
                }}
              >
                <h2 className="font-display text-xl font-semibold mb-6" style={{ color: CELESTE }}>
                  Resta in contatto
                </h2>

                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "hsl(192 49% 76% / 0.12)", border: "1px solid hsl(192 49% 76% / 0.3)" }}>
                      <Mail className="w-4 h-4" style={{ color: CELESTE }} />
                    </div>
                    <div>
                      <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-1">Email</p>
                      <a href="mailto:info@contentroom.it" className="font-body text-sm text-foreground hover:text-primary transition-colors">
                        info@contentroom.it
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "hsl(192 49% 76% / 0.12)", border: "1px solid hsl(192 49% 76% / 0.3)" }}>
                      <Phone className="w-4 h-4" style={{ color: CELESTE }} />
                    </div>
                    <div>
                      <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-1">Telefono</p>
                      <a href="tel:+390000000000" className="font-body text-sm text-foreground hover:text-primary transition-colors">
                        +39 000 000 0000
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "hsl(192 49% 76% / 0.12)", border: "1px solid hsl(192 49% 76% / 0.3)" }}>
                      <MapPin className="w-4 h-4" style={{ color: CELESTE }} />
                    </div>
                    <div>
                      <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-1">Sede</p>
                      <p className="font-body text-sm text-foreground">
                        Via [Indirizzo], [CAP]<br />[Città], Italia
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="border-t border-border/30 mt-7 pt-6">
                  <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3">Seguici</p>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center border border-border/50 hover:border-primary hover:text-primary transition-all hover:-translate-y-0.5"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center border border-border/50 hover:border-primary hover:text-primary transition-all hover:-translate-y-0.5"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="rounded-3xl p-6"
                style={{
                  background: "hsl(0 0% 8% / 0.7)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid hsl(0 0% 100% / 0.08)",
                }}
              >
                <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">Orari</p>
                <p className="font-body text-sm text-foreground">Lun – Ven · 9:30 – 18:30</p>
                <p className="font-body text-xs text-muted-foreground mt-1">Risposta entro 24 ore lavorative</p>
              </div>
            </motion.aside>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3"
            >
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl p-7 md:p-9 space-y-4"
                style={{
                  background: "hsl(0 0% 8% / 0.92)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid hsl(0 0% 100% / 0.1)",
                  boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.08), 0 8px 40px hsl(0 0% 0% / 0.5)",
                }}
              >
                <h2 className="font-display text-xl font-semibold mb-2" style={{ color: CELESTE }}>
                  Scrivici
                </h2>
                <p className="font-body text-sm text-muted-foreground mb-6">
                  Compila il form e ti ricontattiamo con il prossimo passo.
                </p>

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

                <Input
                  placeholder="Oggetto (opzionale)"
                  maxLength={150}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="h-11 rounded-2xl border-border/60 bg-white/5 px-4 text-white placeholder:text-white/50 focus-visible:ring-1 focus-visible:ring-offset-0"
                  style={{ boxShadow: recessedFieldShadow }}
                />

                <Textarea
                  placeholder="Raccontaci il tuo progetto"
                  maxLength={1000}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="min-h-[160px] rounded-[1.5rem] border-border/60 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus-visible:ring-1 focus-visible:ring-offset-0 resize-none"
                  style={{ boxShadow: recessedFieldShadow }}
                />

                <Button
                  type="submit"
                  disabled={submitting}
                  size="lg"
                  className="w-full h-12 rounded-full font-display text-xs uppercase tracking-[0.26em]"
                  style={{
                    background: `linear-gradient(135deg, hsl(192 49% 76% / 0.2), hsl(192 49% 76% / 0.1))`,
                    color: CELESTE,
                    border: "1px solid hsl(192 49% 76% / 0.35)",
                    boxShadow:
                      "inset 0 1px 0 hsl(0 0% 100% / 0.06), 0 0 24px hsl(192 49% 76% / 0.2)",
                  }}
                >
                  {submitting ? "Invio in corso…" : "Invia messaggio"}
                </Button>

                <p className="font-body text-[11px] text-muted-foreground text-center pt-2">
                  Inviando il form accetti la nostra Privacy Policy.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contatti;
