import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import contentRoomIcon from "@/assets/contentroom-icon.png";
import contentRoomLogo from "@/assets/contentroom-logo.png";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.4]);
  const blur = useTransform(scrollY, [0, 100], [0, 20]);
  const navPadding = useTransform(scrollY, [0, 100], [20, 10]);
  const iconScale = useTransform(scrollY, [0, 100], [1, 0.85]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 px-6"
      style={{
        paddingTop: navPadding,
        paddingBottom: navPadding,
      }}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 border-b"
        style={{
          backgroundColor: `hsl(var(--background) / ${bgOpacity.get()})`,
          borderColor: `hsl(var(--border) / ${borderOpacity.get()})`,
          backdropFilter: `blur(${blur.get()}px)`,
        }}
        animate={{
          backgroundColor: scrolled ? "hsl(var(--background) / 0.85)" : "hsl(var(--background) / 0)",
          borderColor: scrolled ? "hsl(var(--border) / 0.4)" : "hsl(var(--border) / 0)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Glow line on scroll */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)",
        }}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <div className="max-w-6xl mx-auto flex items-center justify-between relative">
        <motion.div
          className="flex items-center gap-2"
          style={{ scale: iconScale }}
        >
          <motion.img
            src={contentRoomIcon}
            alt="Content Room"
            className="h-16 w-auto"
            animate={{
              rotate: [0, 8, -8, 5, -5, 0],
              scale: [1, 1.05, 1, 1.03, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <img src={contentRoomLogo} alt="Content Room" className="h-24 w-auto" />
        </motion.div>

        <div className="hidden md:flex items-center gap-1">
          {[
            { label: "Servizi", href: "#servizi" },
            { label: "Portfolio", href: "#portfolio" },
            { label: "Contatti", href: "#contatti" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative px-5 py-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-300 group"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute inset-0 rounded-full bg-muted/0 group-hover:bg-muted/50 transition-all duration-300 scale-90 group-hover:scale-100" />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-6 h-px bg-primary transition-all duration-300" />
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
