import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AutomazioneAI from "./pages/AutomazioneAI.tsx";
import ContentCreation from "./pages/ContentCreation.tsx";
import SocialMediaManagement from "./pages/SocialMediaManagement.tsx";
import GrowthMarketing from "./pages/GrowthMarketing.tsx";
import SitiDigitalizzazione from "./pages/SitiDigitalizzazione.tsx";
import ChiSiamo from "./pages/ChiSiamo.tsx";
import Portfolio from "./pages/Portfolio.tsx";
import CaseStudy from "./pages/CaseStudy.tsx";
import Contatti from "./pages/Contatti.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import CookiePolicy from "./pages/CookiePolicy.tsx";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/servizi" element={<Navigate to="/" replace />} />
          <Route path="/automazione-ai" element={<AutomazioneAI />} />
          <Route path="/content-creation" element={<ContentCreation />} />
          <Route path="/social-media-management" element={<SocialMediaManagement />} />
          <Route path="/growth-marketing" element={<GrowthMarketing />} />
          <Route path="/siti-digitalizzazione" element={<SitiDigitalizzazione />} />
          <Route path="/chisiamo" element={<ChiSiamo />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<CaseStudy />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
