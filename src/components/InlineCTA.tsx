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
      className={`mt-16 flex flex-col items-${align === "center" ? "center" : "start"} gap-5`}
    >
      {caption && (
        <p
          className="font-body text-base md:text-lg font-medium max-w-xl"
          style={{
            color: "hsl(0 0% 96%)",
            textAlign: align,
            textShadow:
              "0 2px 12px hsl(0 0% 0% / 0.85), 0 0 28px hsl(0 0% 0% / 0.6)",
          }}
        >
          {caption}
        </p>
      )}
      <Link
        to={to}
        className="group inline-flex items-center gap-3 h-13 px-8 py-3.5 rounded-full font-display text-sm font-bold uppercase tracking-[0.22em] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
        style={{
          background: CELESTE,
          color: "hsl(0 0% 8%)",
          border: `1px solid ${CELESTE}`,
          boxShadow:
            "0 8px 28px hsl(192 49% 76% / 0.45), 0 0 60px hsl(192 49% 76% / 0.25), inset 0 1px 0 hsl(0 0% 100% / 0.4)",
        }}
      >
        <span>{label}</span>
        <ArrowRight
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={2.5}
        />
      </Link>
    </motion.div>
  );
};

export default InlineCTA;
