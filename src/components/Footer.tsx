import contentRoomLogo from "@/assets/contentroom-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 border-t border-border/30 bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Top row: brand + columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src={contentRoomLogo} alt="Content Room" className="h-16 w-auto" />
            <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed">
              Agenzia creativa specializzata in content strategy, produzione video e social media management.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-widest mb-4">
              Navigazione
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Servizi", href: "/servizi" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Contatti", href: "/contatti" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-widest mb-4">
              Contatti
            </h4>
            <ul className="space-y-3 font-body text-sm text-muted-foreground">
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
              <li className="text-muted-foreground/80">
                Via Pietro Francavilla 11, Firenze (FI), Italia
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-widest mb-4">
              Social
            </h4>
            <ul className="space-y-3 font-body text-sm text-muted-foreground">
              {[
                { label: "Instagram", href: "https://instagram.com/[handle]" },
                { label: "LinkedIn", href: "https://linkedin.com/company/[handle]" },
                { label: "TikTok", href: "https://tiktok.com/@[handle]" },
              ].map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground">
            © {currentYear} Content Room — Tutti i diritti riservati
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a
              href="/privacy-policy"
              className="font-body text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/cookie-policy"
              className="font-body text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Cookie Policy
            </a>
            <span className="font-body text-xs text-muted-foreground">
              P.IVA [00000000000]
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
