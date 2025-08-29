// src/components/ModeSwitcher.tsx
import { Button } from "@/components/ui/button";
import { useCrisisStore } from "@/hooks/useCrisisStore";
import { useNavigate } from "react-router-dom";

export default function ModeSwitcher() {
  const navigate = useNavigate();
  const { exercise, resetExercise } = useCrisisStore();

  // s'il n'y a pas de session, ne rien afficher
  if (!exercise) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        resetExercise();  // remet à zéro
        navigate("/");   // retourne à la page de base (écran de choix)
      }}
      title="Revenir à la configuration et changer de mode"
    >
      Changer de mode
    </Button>
  );
}
