import { motion } from "framer-motion";

const Navbar = () => (
  <motion.nav
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.1 }}
    className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
  >
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <span className="font-display font-bold text-xl text-foreground tracking-tight">STUDIO</span>
      <div className="hidden md:flex items-center gap-8 text-sm font-body text-muted-foreground">
        <a href="#servizi" className="hover:text-foreground transition-colors duration-300">Servizi</a>
        <a href="#portfolio" className="hover:text-foreground transition-colors duration-300">Portfolio</a>
        <a href="#contatti" className="hover:text-foreground transition-colors duration-300">Contatti</a>
      </div>
    </div>
  </motion.nav>
);

export default Navbar;
