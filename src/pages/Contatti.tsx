import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Inserisci il tuo nome").max(100),
  email: z.string().trim().email("Email non valida").max(255),
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(1, "Scrivi un messaggio").max(1000),
});

const recessedFieldShadow = "inset 0 2px 8px hsl(0 0% 0% / 0.08)";

const Contatti = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
    const { error } = await supabase.functions.invoke("send-contact-email", {
      body: { ...result.data, source: "contatti" },
    });
    setSubmitting(false);
    if (error) {
      toast({
        title: "Invio non riuscito",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    setForm({ name: "", email: "", subject: "", message: "" });
    toast({
      title: "Messaggio inviato",
      description: "Ti ricontatteremo al più presto.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Contatti — Content Room | Prenota una call gratuita</title>
        <meta
          name="description"
          content="Contatta Content Room, agenzia specializzata in digitalizzazione delle aziende, content strategy e produzione video a Firenze. Prenota una call gratuita di 30 minuti."
        />
        <link rel="canonical" href="https://contentroom-it.lovable.app/contatti" />
        <meta property="og:title" content="Contatti — Content Room" />
        <meta property="og:description" content="Prenota una call gratuita con Content Room e parla con il nostro team della crescita del tuo brand." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://contentroom-it.lovable.app/contatti" />
      </Helmet>

      <div className="relative min-h-screen overflow-hidden">
        <Navbar />

        {/* Hero — nera */}
        <section className="section-dark pt-40 pb-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mx-auto max-w-4xl"
          >
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-12 h-px bg-brand-orange" />
              <p className="font-body text-xs font-bold tracking-[0.4em] uppercase text-brand-orange">
                Contatti
              </p>
              <div className="w-12 h-px bg-brand-orange" />
            </div>
            <h1
              className="font-display font-black tracking-tight leading-[1.02]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              Parliamo del <span className="text-primary">tuo progetto</span>
            </h1>
            <p className="font-body text-base md:text-lg max-w-2xl mx-auto mt-4 text-white/75">
              Scrivici, chiama o compila il form: ti rispondiamo in 24 ore con soluzioni per te.
            </p>
          </motion.div>
        </section>

        {/* Contenuto — beige */}
        <main className="section-light px-6 py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Info */}
              <motion.aside
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-2 lg:col-start-1 lg:row-start-1 order-2 lg:order-none"
              >
                <div className="rounded-2xl p-7 bg-white border border-[hsl(0_0%_8%/0.1)]">
                  <h2 className="font-display text-xl font-bold mb-6 text-primary">
                    Resta in contatto
                  </h2>

                  <ul className="space-y-5">
                    <li className="flex items-start gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-[hsl(192_49%_76%/0.15)]">
                        <Mail className="w-4 h-4 text-[hsl(192_35%_30%)]" />
                      </div>
                      <div>
                        <p className="font-body text-xs uppercase tracking-widest text-[hsl(0_0%_45%)] mb-1">Email</p>
                        <a href="mailto:info@contentroom.it" className="font-body text-sm text-[hsl(0_0%_10%)] hover:text-primary transition-colors">
                          info@contentroom.it
                        </a>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-[hsl(192_49%_76%/0.15)]">
                        <Phone className="w-4 h-4 text-[hsl(192_35%_30%)]" />
                      </div>
                      <div>
                        <p className="font-body text-xs uppercase tracking-widest text-[hsl(0_0%_45%)] mb-1">Telefono</p>
                        <a href="tel:+393284163053" className="font-body text-sm text-[hsl(0_0%_10%)] hover:text-primary transition-colors">
                          +39 328 416 3053
                        </a>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-[hsl(192_49%_76%/0.15)]">
                        <MapPin className="w-4 h-4 text-[hsl(192_35%_30%)]" />
                      </div>
                      <div>
                        <p className="font-body text-xs uppercase tracking-widest text-[hsl(0_0%_45%)] mb-1">Sede</p>
                        <p className="font-body text-sm text-[hsl(0_0%_10%)]">
                          Via Pietro Francavilla 11, 50142<br />Firenze, Italia
                        </p>
                      </div>
                    </li>
                  </ul>

                  <div className="border-t border-[hsl(0_0%_8%/0.1)] mt-7 pt-6">
                    <p className="font-body text-xs uppercase tracking-widest text-[hsl(0_0%_45%)] mb-3">Seguici</p>
                    <div className="flex items-center gap-3">
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full flex items-center justify-center border border-[hsl(0_0%_8%/0.15)] hover:border-primary hover:text-primary transition-all hover:-translate-y-0.5"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full flex items-center justify-center border border-[hsl(0_0%_8%/0.15)] hover:border-primary hover:text-primary transition-all hover:-translate-y-0.5"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.aside>

              {/* Orari */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-2 lg:col-start-1 lg:row-start-2 order-3 lg:order-none"
              >
                <div className="rounded-2xl p-6 bg-white border border-[hsl(0_0%_8%/0.1)]">
                  <p className="font-body text-xs uppercase tracking-widest text-[hsl(0_0%_45%)] mb-2">Orari</p>
                  <p className="font-body text-sm text-[hsl(0_0%_10%)]">Lun – Sab · 8:00 – 21:00</p>
                  <p className="font-body text-xs text-[hsl(0_0%_45%)] mt-1">Risposta entro 24 ore lavorative</p>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-3 lg:col-start-3 lg:row-start-1 lg:row-span-2 order-1 lg:order-none"
              >
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl p-5 md:p-7 space-y-3 bg-white border border-[hsl(0_0%_8%/0.1)]"
                >
                  <h2 className="font-display text-lg font-bold mb-1 text-primary">
                    Scrivici
                  </h2>
                  <p className="font-body text-sm text-[hsl(0_0%_40%)] mb-4">
                    Compila il form e ti ricontattiamo con il prossimo passo.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="Nome"
                      maxLength={100}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="h-10 rounded-2xl border-[hsl(0_0%_8%/0.15)] bg-[hsl(0_0%_8%/0.03)] px-4 text-[hsl(0_0%_10%)] placeholder:text-[hsl(0_0%_55%)] focus-visible:ring-1 focus-visible:ring-offset-0"
                      style={{ boxShadow: recessedFieldShadow }}
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      maxLength={255}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="h-10 rounded-2xl border-[hsl(0_0%_8%/0.15)] bg-[hsl(0_0%_8%/0.03)] px-4 text-[hsl(0_0%_10%)] placeholder:text-[hsl(0_0%_55%)] focus-visible:ring-1 focus-visible:ring-offset-0"
                      style={{ boxShadow: recessedFieldShadow }}
                    />
                  </div>

                  <Input
                    placeholder="Oggetto (opzionale)"
                    maxLength={150}
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="h-10 rounded-2xl border-[hsl(0_0%_8%/0.15)] bg-[hsl(0_0%_8%/0.03)] px-4 text-[hsl(0_0%_10%)] placeholder:text-[hsl(0_0%_55%)] focus-visible:ring-1 focus-visible:ring-offset-0"
                    style={{ boxShadow: recessedFieldShadow }}
                  />

                  <Textarea
                    placeholder="Raccontaci il tuo progetto"
                    maxLength={1000}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="min-h-[100px] rounded-[1.5rem] border-[hsl(0_0%_8%/0.15)] bg-[hsl(0_0%_8%/0.03)] px-4 py-3 text-[hsl(0_0%_10%)] placeholder:text-[hsl(0_0%_55%)] focus-visible:ring-1 focus-visible:ring-offset-0 resize-none"
                    style={{ boxShadow: recessedFieldShadow }}
                  />

                  <Button
                    type="submit"
                    disabled={submitting}
                    size="lg"
                    className="w-full h-11 rounded-2xl font-display font-bold text-xs uppercase tracking-[0.26em] text-[hsl(192_35%_16%)] bg-primary hover:brightness-105 transition-all duration-300"
                  >
                    {submitting ? "Invio in corso…" : "Invia messaggio"}
                  </Button>

                  <p className="font-body text-[11px] text-[hsl(0_0%_45%)] text-center pt-2">
                    Inviando il form accetti la nostra Privacy Policy.
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contatti;
