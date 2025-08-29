import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CrisisSidebar } from "./CrisisSidebar";
import { CrisisHeader } from "./CrisisHeader";
import { useCrisisStore } from "@/hooks/useCrisisStore";

interface CrisisLayoutProps {
  children: ReactNode;
}

export function CrisisLayout({ children }: CrisisLayoutProps) {
  const { 
    exercise, 
    timerState, 
    startTimer, 
    pauseTimer, 
    resetTimer,
    exportData 
  } = useCrisisStore();

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Chargement...</h1>
          <p className="text-muted-foreground">Initialisation de l'exercice de crise</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CrisisSidebar />
        <div className="flex-1 flex flex-col">
          <CrisisHeader
            title={exercise.title}
            severity={exercise.severity}
            timerState={timerState}
            onTimerStart={startTimer}
            onTimerPause={pauseTimer}
            onTimerReset={resetTimer}
            onExport={exportData}
          />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}