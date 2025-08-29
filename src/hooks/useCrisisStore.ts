import { useState, useEffect, useCallback } from 'react';
import { CrisisExercise, TimerState, JournalEvent } from '@/types/crisis';
import { crisisStorage } from '@/lib/storage';
import { createInitialExercise } from '@/lib/initial-data';
import { CrisisConfig } from '@/components/modals/ModeSelector';
type Mode = "exercise" | "real";

export function useCrisisStore() {
  const [exercise, setExercise] = useState<CrisisExercise | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    pausedDuration: 0,
    currentTime: Date.now()
  });

  // Initialize exercise data
  useEffect(() => {
    const savedData = crisisStorage.load();
    if (savedData) {
      setExercise(savedData);
      setIsInitialized(true);
    } else {
      setIsInitialized(true);
    }
  }, []);

  // Auto-save when exercise changes
  useEffect(() => {
    if (exercise) {
      crisisStorage.startAutoSave(() => exercise);
    }
    return () => crisisStorage.stopAutoSave();
  }, [exercise]);

  // Timer functions
  const startTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isRunning: true,
      startTime: Date.now() - prev.pausedDuration
    }));
  }, []);

  const pauseTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isRunning: false,
      pausedDuration: prev.startTime ? Date.now() - prev.startTime + prev.pausedDuration : prev.pausedDuration
    }));
  }, []);

  const resetTimer = useCallback(() => {
    setTimerState({
      isRunning: false,
      pausedDuration: 0,
      currentTime: Date.now()
    });
  }, []);

  // Journal functions
  const addJournalEvent = useCallback((event: Omit<JournalEvent, 'id' | 'at'>) => {
    if (!exercise) return;

    const newEvent: JournalEvent = {
      ...event,
      id: `journal-${Date.now()}`,
      at: new Date().toISOString()
    };

    setExercise(prev => prev ? {
      ...prev,
      journal: [newEvent, ...prev.journal]
    } : null);
  }, [exercise]);

  // Create new exercise
  const createExercise = useCallback((config: CrisisConfig) => {
    const newExercise = createInitialExercise(config);
    setExercise(newExercise);
    crisisStorage.save(newExercise);
  }, []);

  // Update functions
  const updateExercise = useCallback((updates: Partial<CrisisExercise>) => {
    setExercise(prev => prev ? { ...prev, ...updates } : null);
  }, []);

  // Export functions
  const exportData = useCallback(() => {
    if (!exercise) return;
    
    const dataStr = crisisStorage.exportToJSON();
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `crisis-exercise-${exercise.id}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }, [exercise]);

// Permet de basculer de mode à chaud
const setMode = (mode: Mode) => {
  setExercise((prev) => (prev ? { ...prev, mode } : prev));
};

// Réinitialise la session et (si dispo) efface le stockage local
const resetExercise = () => {
  setExercise(null);
  if (crisisStorage?.clear) {
    try { crisisStorage.clear(); } catch { /* ignore */ }
  }
};

  
  return {
    exercise,
    isInitialized,
    timerState,
    startTimer,
    pauseTimer,
    resetTimer,
    addJournalEvent,
    createExercise,
    updateExercise,
    exportData,
    setMode,
    resetExercise,
    setExercise
  };
}
