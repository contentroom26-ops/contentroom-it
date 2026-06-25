import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import contentRoomIcon from "@/assets/contentroom-icon.png";
import contentRoomLogo from "@/assets/contentroom-logo.png";

const serviceItems = [
  { label: "Content Creation", to: "/content-creation" },
  { label: "Social Media Management", to: "/social-media-management" },
  { label: "Growth & Marketing", to: "/growth-marketing" },
  { label: "Siti & Digitalizzazione", to: "/siti-digitalizzazione" },
  { label: "Automazione & AI", to: "/automazione-ai" },
];

const navItems = [
  { label: "Chi siamo", to: "/chisiamo" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Contatti", to: "/contatti" },
];

const Navbar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  // Blocca lo scroll del body quando il menu mobile è aperto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navPadding = useTransform(scrollY, [0, 100], [20, 10]);
  const iconScale = useTransform(scrollY, [0, 100], [1, 0.85]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

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
        animate={{ opacity: scrolled || mobileOpen ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <div className="max-w-6xl mx-auto flex items-center justify-between relative">
        <Link to="/" className="flex items-center gap-2" onClick={closeMobile}>
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
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-2">
          {/* Servizi — dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
              className="relative px-5 py-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-300 group flex items-center gap-1.5"
            >
              <span className="relative z-10 font-bold text-sm">Servizi</span>
              <ChevronDown
                className="w-3.5 h-3.5 relative z-10 transition-transform duration-300"
                style={{ transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
              <span className="absolute inset-0 rounded-full bg-muted/0 group-hover:bg-muted/50 transition-all duration-300 scale-90 group-hover:scale-100" />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64"
                >
                  <div
                    className="rounded-2xl border overflow-hidden py-2"
                    style={{
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border) / 0.6)",
                      boxShadow: "0 20px 50px hsl(0 0% 0% / 0.5)",
                    }}
                  >
                    {serviceItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setServicesOpen(false)}
                        className="block px-5 py-3 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navItems.map((item) => (
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

        {/* Hamburger — solo mobile */}
        <button
          type="button"
          aria-label="Apri menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden relative z-50 flex items-center justify-center w-11 h-11 text-foreground"
        >
          {mobileOpen ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer a tutta pagina */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-40 flex flex-col overflow-y-auto"
            style={{ backgroundColor: "hsl(var(--background))" }}
          >
            <div className="flex flex-col items-center justify-center flex-1 gap-6 px-6 py-28">
              {/* Servizi — accordion mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex flex-col items-center w-full"
              >
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  aria-expanded={mobileServicesOpen}
                  className="flex items-center gap-2 text-3xl font-bold text-foreground hover:text-primary transition-colors duration-300"
                >
                  Servizi
                  <ChevronDown
                    className="w-6 h-6 transition-transform duration-300"
                    style={{ transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col items-center gap-4 overflow-hidden mt-5 w-full"
                    >
                      {serviceItems.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={closeMobile}
                          className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {navItems.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.18 + i * 0.08 }}
                >
                  <Link
                    to={item.to}
                    onClick={closeMobile}
                    className="text-3xl font-bold text-foreground hover:text-primary transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.18 + navItems.length * 0.08 }}
                className="pt-6 w-full max-w-xs"
              >
                <Link
                  to="/contatti"
                  onClick={closeMobile}
                  className="flex items-center justify-center w-full px-6 py-4 rounded-full font-body text-base font-semibold text-primary-foreground bg-primary shadow-[0_4px_20px_hsl(0_0%_0%_/_0.4)] transition-all duration-300 active:scale-95"
                >
                  Prenota una call
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
