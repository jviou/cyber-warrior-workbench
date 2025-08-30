import { useState, useEffect } from "react";
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
  const { exercise, isInitialized, createExercise } = useCrisisStore();
  const [showModeSelector, setShowModeSelector] = useState(false);

  useEffect(() => {
    if (isInitialized && !exercise) {
      setShowModeSelector(true);
    }
  }, [isInitialized, exercise]);

  const handleModeSelect = (mode: any, config: any) => {
    createExercise(config);
    setShowModeSelector(false);
  };

  return (
    <>
      <ModeSelector 
        open={showModeSelector} 
        onSelect={handleModeSelect}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CrisisLayout><HomePage /></CrisisLayout>} />
          <Route path="/journal" element={<CrisisLayout><JournalPage /></CrisisLayout>} />
          <Route path="/communications" element={<CrisisLayout><CommunicationsPage /></CrisisLayout>} />
          <Route path="/actions" element={<CrisisLayout><div className="p-6"><h1>Actions - En développement</h1></div></CrisisLayout>} />
          <Route path="/decisions" element={<CrisisLayout><div className="p-6"><h1>Décisions - En développement</h1></div></CrisisLayout>} />
          <Route path="/indicators" element={<CrisisLayout><div className="p-6"><h1>Indicateurs - En développement</h1></div></CrisisLayout>} />
          <Route path="/resources" element={<CrisisLayout><div className="p-6"><h1>Ressources - En développement</h1></div></CrisisLayout>} />
          <Route path="/phase/:phaseId" element={<CrisisLayout><div className="p-6"><h1>Phase - En développement</h1></div></CrisisLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
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
