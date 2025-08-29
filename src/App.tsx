// src/App.tsx
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

const queryClient = new QueryClient();

function AppContent() {
  const { exercise, isInitialized } = useCrisisStore();

  useEffect(() => {
    // init si besoin
  }, []);

  return (
    <>
      {/* Si pas de session ET store initialisé, on affiche la modale de choix */}
      {!exercise && isInitialized && (
        <div className="mx-auto max-w-6xl px-4 py-6">
          <ModeSelector open={true} />
        </div>
      )}

      <Routes>
        <Route path="/" element={<CrisisLayout><HomePage /></CrisisLayout>} />
        <Route path="/journal" element={<CrisisLayout><JournalPage /></CrisisLayout>} />
        <Route path="/communications" element={<CrisisLayout><CommunicationsPage /></CrisisLayout>} />
        <Route path="*" element={<CrisisLayout><NotFound /></CrisisLayout>} />
      </Routes>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
