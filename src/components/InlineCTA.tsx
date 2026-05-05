import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
        className="btn-glow group relative inline-flex items-center justify-center h-14 px-10 text-base rounded-full overflow-hidden border-2 border-transparent bg-primary text-primary-foreground font-display font-semibold tracking-wide shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:border-black hover:text-black hover:-translate-y-1 transition-all duration-300"
      >
        <span className="relative z-10">{label}</span>
        <motion.div
          className="absolute inset-0 bg-primary/20 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </Link>
    </motion.div>
  );
};

export default InlineCTA;
