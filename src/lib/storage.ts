import { CrisisExercise } from '@/types/crisis';

const STORAGE_KEY = 'crisis-exercise-data';
const AUTO_SAVE_INTERVAL = 5000; // 5 seconds

class CrisisStorage {
  private autoSaveTimer: NodeJS.Timeout | null = null;
  private listeners: ((data: CrisisExercise | null) => void)[] = [];

  save(data: CrisisExercise): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      this.notifyListeners(data);
    } catch (error) {
      console.error('Failed to save crisis data:', error);
    }
  }

  load(): CrisisExercise | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Failed to load crisis data:', error);
    }
    return null;
  }

  startAutoSave(getData: () => CrisisExercise): void {
    this.stopAutoSave();
    this.autoSaveTimer = setInterval(() => {
      this.save(getData());
    }, AUTO_SAVE_INTERVAL);
  }

  stopAutoSave(): void {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
  }

  exportToJSON(): string {
    const data = this.load();
    return JSON.stringify(data, null, 2);
  }

  importFromJSON(jsonString: string): CrisisExercise {
    try {
      const data = JSON.parse(jsonString);
      this.save(data);
      return data;
    } catch (error) {
      throw new Error('Invalid JSON format');
    }
  }

  subscribe(listener: (data: CrisisExercise | null) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(data: CrisisExercise | null): void {
    this.listeners.forEach(listener => listener(data));
  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.notifyListeners(null);
  }
}

export const crisisStorage = new CrisisStorage();