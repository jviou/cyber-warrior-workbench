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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const queryClient = new QueryClient();

function Landing() {
  // Page d’atterrissage quand aucune session n’est chargée
  return (
    <div className="mx-auto max-w-2xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurer une session</CardTitle>
          <CardDescription>
            Choisis le mode <strong>Exercice</strong> ou <strong>Réel</strong> pour démarrer.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-3">
          <ModeSelector open={true} onSelect={() => { /* le composant se charge d’appeler createExercise */ }} />
          <div className="text-sm text-muted-foreground">
            Si la fenêtre ne s’ouvre pas, clique sur le bouton ci-dessous.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AppContent() {
  const { exercise, isInitialized } = useCrisisStore();

  useEffect(() => {
    // init éventuelles
  }, []);

  return (
    <>
      <BrowserRouter>
        {/* Header global */}
        <header className="w-full border-b bg-background">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <div className="font-semibold">Cyber Warrior Workbench</div>
            {/* Ne s’affiche que si exercise existe */}
            <ModeSwitcher />
          </div>
        </header>

        {/* Sécurité : si pas de session, affiche TOUJOURS une landing + le sélecteur */}
        {!exercise && isInitialized && (
          <div className="mx-auto max-w-6xl px-4 py-6">
            {/* Le ModeSelector est contrôlé en interne ; on le rend monté pour forcer l’ouverture */}
            <ModeSelector open={true} onSelect={() => { /* createExercise est appelé dans le composant */ }} />
            <Landing />
          </div>
        )}

        <Routes>
          {/* Si pas de session, on laisse quand même / afficher la landing (via le bloc ci-dessus) */}
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
