import { ArrowUpRight } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          {/* Logo */}
          <div>
            <h3
              className="font-display font-bold text-foreground tracking-tight leading-none mb-3"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              content<span className="text-primary">room</span>
              <span className="text-primary">.</span>
            </h3>
            <p className="font-body text-sm text-muted-foreground">
              Creative Digital Agency
            </p>
          </div>

          {/* Social links */}
          <div className="flex gap-6">
            {["Instagram", "TikTok", "LinkedIn", "Behance"].map((social) => (
              <a
                key={social}
                href="#"
                className="font-body text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
              >
                {social}
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4 pt-8 border-t border-border/50">
          <p className="font-body text-xs text-muted-foreground/50">
            © 2025 Content Room. Tutti i diritti riservati.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-body text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-body text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
