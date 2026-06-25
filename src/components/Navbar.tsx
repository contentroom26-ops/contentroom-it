import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import contentRoomIcon from "@/assets/contentroom-icon.png";
import contentRoomLogo from "@/assets/contentroom-logo.png";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

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
      {/* Solid background that fades in on scroll — fully opaque so it never overlaps content */}
      <motion.div
        className="absolute inset-0 border-b"
        style={{
          backgroundColor: "hsl(var(--background))",
          borderColor: "hsl(var(--border) / 0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 8px 30px hsl(0 0% 0% / 0.35)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <div className="max-w-6xl mx-auto flex items-center justify-between relative">
        <Link to="/" className="flex items-center gap-2">
          <motion.div className="flex items-center gap-2" style={{ scale: iconScale }}>
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
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {[
            { label: "Chi siamo", to: "/chisiamo" },
            { label: "Servizi", to: "/servizi" },
            { label: "Automazione AI", to: "/automazione-ai" },
            // { label: "Portfolio", to: "/portfolio" }, // Temporarily hidden — da reinserire in futuro
            { label: "Contatti", to: "/contatti" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative px-5 py-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-300 group"
            >
              <span className="relative z-10 font-bold text-sm">{item.label}</span>
              <span className="absolute inset-0 rounded-full bg-muted/0 group-hover:bg-muted/50 transition-all duration-300 scale-90 group-hover:scale-100" />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-6 h-px bg-primary transition-all duration-300" />
            </Link>
          ))}

          {/* Primary CTA */}
          <Link
            to="/contatti"
            className="ml-3 inline-flex items-center justify-center px-5 py-2.5 rounded-full font-body text-sm font-medium tracking-wide transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 shadow-[0_4px_20px_hsl(0_0%_0%_/_0.4)] hover:shadow-[0_10px_30px_hsl(0_0%_0%_/_0.5)] text-primary-foreground bg-primary border-2 border-transparent hover:border-black hover:text-black"
          >
            Prenota una call
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
