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
    resetExercise,
  } = useCrisisStore();

  // Contrôle d’ouverture de la modale “Configuration de la Crise”
  const [showSelector, setShowSelector] = useState(false);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Chargement...</h1>
          <p className="text-muted-foreground">
            Initialisation de l'exercice de crise
          </p>
        </div>
      </div>
    );
  }

  // Si aucune session : on laisse la page courante rendre le contenu (ex: Home + modale)
  if (!exercise) {
    return children;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CrisisSidebar />
        <div className="flex-1 flex flex-col">
          {/* Header d'origine, avec un bouton "Changer de mode" placé en haut à droite */}
          <div className="relative">
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
            <div className="absolute right-4 top-3">
              <ModeButton
                onClick={() => {
                  // On réinitialise la session et on ouvre la modale de choix
                  resetExercise();
                  setShowSelector(true);
                }}
              />
            </div>
          </div>

          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>

      {/* Modale de sélection montée uniquement quand on clique sur "Changer de mode" */}
      {showSelector && <ModeSelector open={true} />}
    </SidebarProvider>
  );
}
