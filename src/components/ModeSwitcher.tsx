import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCrisisStore } from "@/hooks/useCrisisStore";
import { useNavigate } from "react-router-dom";

export default function ModeSwitcher() {
  const navigate = useNavigate();
  const { exercise, setMode, resetExercise } = useCrisisStore();

  // Sécurité : si pas d'exercice en mémoire, rien à afficher
  if (!exercise) return null;

  const isReal = exercise.mode === "real";

  return (
    <div className="flex items-center gap-2">
      <Badge variant={isReal ? "destructive" : "secondary"}>
        {isReal ? "Mode Réel" : "Mode Exercice"}
      </Badge>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setMode(isReal ? "exercise" : "real")}
        title="Basculer entre Exercice et Réel"
      >
        Passer en {isReal ? "Exercice" : "Réel"}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          // remet l’état à zéro et renvoie à l’écran de sélection
          resetExercise();
          navigate("/");
        }}
        title="Revenir à l’écran de choix"
      >
        Reconfigurer la session
      </Button>
    </div>
  );
}
