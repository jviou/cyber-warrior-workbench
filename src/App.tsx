import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CrisisLayout } from "./components/layout/CrisisLayout";
import { ModeSelector } from "./components/modals/ModeSelector";
import { useCrisisStore } from "./hooks/useCrisisStore";
import HomePage from "./pages/HomePage";
import JournalPage from "./pages/JournalPage";
import CommunicationsPage from "./pages/CommunicationsPage";
import NotFound from "./pages/NotFound";
import ModeSwitcher from "./components/ModeSwitcher";

const queryClient = new QueryClient();

function AppContent() {
  const { exercise, isInitialized } = useCrisisStore();

  // Si ton app devait initialiser des choses au chargement, garde ce useEffect
  useEffect(() => {
    // ...initialisations si besoin
  }, []);

  return (
    <>
      <BrowserRouter>
        {/* Header global très simple + switcher visible partout */}
        <header className="w-full border-b bg-background">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <div className="font-semibold">Cyber Warrior Workbench</div>
            <ModeSwitcher />
          </div>
        </header>

        {/* Si pas encore initialisé, laisse l’écran de sélection s’afficher via le layout */}
        {!exercise && (
          <div className="mx-auto max-w-6xl px-4 py-2">
            <ModeSelector />
          </div>
        )}

        <Routes>
          <Route path="/" element={<CrisisLayout><HomePage /></CrisisLayout>} />
          <Route path="/journal" element={<CrisisLayout><JournalPage /></CrisisLayout>} />
          <Route path="/communications" element={<CrisisLayout><CommunicationsPage /></CrisisLayout>} />
          <Route path="*" element={<CrisisLayout><NotFound /></CrisisLayout>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
