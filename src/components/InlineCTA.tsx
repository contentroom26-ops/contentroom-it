import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const CELESTE = "hsl(192 49% 76%)";

interface InlineCTAProps {
  label?: string;
  caption?: string;
  to?: string;
  align?: "left" | "center";
}

const InlineCTA = ({
  label = "Prenota una call",
  caption,
  to = "/contatti",
  align = "center",
}: InlineCTAProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`mt-16 flex flex-col items-${align === "center" ? "center" : "start"} gap-4`}
    >
      {caption && (
        <p
          className="font-body text-sm md:text-base text-muted-foreground max-w-xl"
          style={{
            textAlign: align,
            textShadow: "0 1px 4px hsl(0 0% 0% / 0.6)",
          }}
        >
          {caption}
        </p>
      )}
      <Link
        to={to}
        className="group inline-flex items-center gap-3 h-12 px-7 rounded-full font-display text-xs uppercase tracking-[0.26em] transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: `linear-gradient(135deg, hsl(192 49% 76% / 0.18), hsl(192 49% 76% / 0.08))`,
          color: CELESTE,
          border: `1px solid hsl(192 49% 76% / 0.4)`,
          boxShadow:
            "inset 0 1px 0 hsl(0 0% 100% / 0.06), 0 0 24px hsl(192 49% 76% / 0.18)",
        }}
      >
        <span>{label}</span>
        <ArrowRight
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={1.5}
        />
      </Link>
    </motion.div>
  );
};

export default InlineCTA;
