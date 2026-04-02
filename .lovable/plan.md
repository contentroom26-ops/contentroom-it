

## Piano: Nuova palette colori per tutto il sito

### Palette definita
| Nome | RGB | HSL (approx) | Uso |
|------|-----|---------------|-----|
| Beige | 255,252,245 | 43 100% 98% | Sfondo chiaro, testi soft |
| Bianco | 255,255,255 | 0 0% 100% | Foreground, testi principali |
| Grigio | 194,194,194 | 0 0% 76% | Muted, bordi, testi secondari |
| Celeste | 161,213,226 | 192 49% 76% | Accento principale (sostituisce il vecchio cyan) |
| Nero | 0,0,0 | 0 0% 0% | Background scuro, ombre |
| Arancione | 252,66,8 | 14 97% 51% | CTA, primary buttons, dettagli luminosi |

**Non toccati**: pittogramma e logo Content Room (immagini PNG).

---

### File da modificare

**1. `src/index.css`** — CSS variables root
- `--background`: resta scuro (nero) → `0 0% 0%`
- `--foreground`: bianco → `0 0% 100%`
- `--primary`: arancione → `14 97% 51%`
- `--primary-foreground`: bianco → `0 0% 100%`
- `--accent`: celeste → `192 49% 76%`
- `--accent-foreground`: nero → `0 0% 0%`
- `--muted-foreground`: grigio → `0 0% 76%`
- `--card`: nero/antracite leggero → `0 0% 6%`
- `--card-foreground`: beige → `43 100% 98%`
- `--border`, `--input`: grigio scuro → `0 0% 20%`
- `--ring`: arancione → `14 97% 51%`
- Aggiornare anche sidebar vars di conseguenza

**2. `src/components/ServicesSection.tsx`**
- Sostituire `const CYAN = "hsl(200 80% 74%)"` → celeste `hsl(192 49% 76%)`
- Cambiare accenti arancione per hover glow e numeri

**3. `src/components/ResultsSection.tsx`**
- Sostituire CYAN con nuovo celeste
- Usare arancione per i numeri/stats in evidenza

**4. `src/components/PortfolioSection.tsx`**
- Sostituire CYAN con nuovo celeste
- Badge/overlay accenti in arancione

**5. `src/components/CTASection.tsx`**
- Sostituire CYAN con nuovo celeste
- Bottone CTA in arancione (gradient arancione, glow arancione)
- Titolo in beige/bianco, accenti celeste

**6. `src/components/ImmersiveRoom.tsx`**
- Sostituire tutti i `hsl(200 80% 74%)` con il nuovo celeste `hsl(192 49% 76%)`
- Frame e baseboard celeste aggiornati

**7. `src/components/HeroSection.tsx`**
- Gradient e linee decorative aggiornate (primary ora è arancione)
- Bottone hero usa arancione come colore primario (già via CSS var)

**8. `src/components/Navbar.tsx`**
- Glow line e hover usano le CSS vars → si aggiornano automaticamente
- Nessuna modifica manuale necessaria (usa `bg-primary`, `bg-muted`)

**9. `src/components/SplashScreen.tsx`**
- Usa `bg-background` → si aggiorna automaticamente

**10. `src/components/ui/button.tsx`**
- Varianti `hero` e `cta`: il glow shadow usa `var(--primary)` → si aggiorna automaticamente all'arancione

### Approccio
La maggior parte dei componenti usa CSS variables di Tailwind, quindi il grosso del cambio avviene in `index.css`. I file con colori hardcoded (`CYAN`, `hsl(200...)`) vengono aggiornati singolarmente. Il risultato: sfondo nero, testi bianchi/beige, accenti celeste per dettagli eleganti, arancione per CTA e elementi d'impatto.

