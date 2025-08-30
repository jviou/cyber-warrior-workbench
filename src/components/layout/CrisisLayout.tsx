import { ReactNode, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CrisisSidebar } from "./CrisisSidebar";
import { CrisisHeader } from "./CrisisHeader";
import { useCrisisStore } from "@/hooks/useCrisisStore";
import ModeButton from "@/components/ModeButton";
import { ModeSelector } from "@/components/modals/ModeSelector";

interface CrisisLayoutProps {
  children: ReactNode;
}

export function CrisisLayout({ children }: CrisisLayoutProps) {
  const {
    exercise,
    isInitialized,
    timerState,
    startTimer,
    pauseTimer,
    resetTimer,
    exportData,
  } = useCrisisStore();

  // contrôle d’ouverture de la modale “Configuration de la Crise”
  const [showSelector, setShowSelector] = useState(false);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Chargement...</h1>
          <p className="text-muted-foreground">Initialisation de la session</p>
        </div>
      </div>
    );
  }

  // S'il n'y a pas encore de session, on laisse la page gérer (Home affiche la modale)
  if (!exercise) return children;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CrisisSidebar />
        <div className="flex-1 flex flex-col">
          {/* Header existant */}
          <CrisisHeader
            title={exercise.title}
            severity={exercise.severity}
            mode={exercise.mode}
            timerState={timerState}
            onTimerStart={startTimer}
            onTimerPause={pauseTimer}
            onTimerReset={resetTimer}
            onExport={exportData}
          />

          {/* Bouton FIXE en haut à droite, visible partout */}
          <div className="fixed top-3 right-4 z-50">
            <ModeButton onClick={() => setShowSelector(true)} />
          </div>

          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>

      {/* Modale de sélection montée au clic */}
      {showSelector && <ModeSelector open={true} />}
    </SidebarProvider>
  );
}
