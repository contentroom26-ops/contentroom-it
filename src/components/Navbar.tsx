import { motion } from "framer-motion";
import contentRoomIcon from "@/assets/contentroom-icon.png";
import contentRoomLogo from "@/assets/contentroom-logo.png";

const Navbar = () => (
  <motion.nav
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.1 }}
    className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-background/70 border-b border-border/30"
  >
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-2">
        <motion.img
          src={contentRoomIcon}
          alt="Content Room"
          className="h-26 w-auto"
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
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-body text-muted-foreground">
        <a href="#servizi" className="hover:text-foreground transition-colors duration-300">Servizi</a>
        <a href="#portfolio" className="hover:text-foreground transition-colors duration-300">Portfolio</a>
        <a href="#contatti" className="hover:text-foreground transition-colors duration-300">Contatti</a>
      </div>
    </div>
  </motion.nav>
);

export default Navbar;
