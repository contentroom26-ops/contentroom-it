import { Link } from "react-router-dom";
import contentRoomLogo from "@/assets/contentroom-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="section-dark relative z-20 border-t border-[hsl(0_0%_100%/0.08)]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Top row: brand + columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <img src={contentRoomLogo} alt="Content Room" className="h-16 w-auto" />
            <p className="font-body text-sm text-white/60 mt-3 leading-relaxed max-w-xs">
              Agenzia specializzata in digitalizzazione delle aziende, content strategy e produzione video.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest mb-4 text-brand-orange">
              Navigazione
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Chi siamo", href: "/chisiamo" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Contatti", href: "/contatti" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-white/60 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest mb-4 text-brand-orange">
              Contatti
            </h4>
            <ul className="space-y-3 font-body text-sm text-white/60">
              <li>
                <a
                  href="mailto:info@contentroom.it"
                  className="hover:text-primary transition-colors"
                >
                  info@contentroom.it
                </a>
              </li>
              <li>
                <a
                  href="tel:+393284163053"
                  className="hover:text-primary transition-colors"
                >
                  +39 328 416 3053
                </a>
              </li>
              <li className="text-white/45">
                Via Pietro Francavilla 11, 50142,<br />Firenze (FI), Italia
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[hsl(0_0%_100%/0.1)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/45">
            © {currentYear} Content Room — Tutti i diritti riservati
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              to="/privacy-policy"
              className="font-body text-xs text-white/45 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/cookie-policy"
              className="font-body text-xs text-white/45 hover:text-primary transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
