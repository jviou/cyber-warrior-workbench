import { Button } from "@/components/ui/button";
import { useCrisisStore } from "@/hooks/useCrisisStore";
import { useNavigate } from "react-router-dom";

export default function ModeButton({ onClick }: { onClick?: () => void }) {
  const navigate = useNavigate();
  const { exercise, resetExercise } = useCrisisStore();

  // si tu veux masquer quand pas de session, décommente :
  // if (!exercise) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        if (onClick) return onClick();
        resetExercise();
        navigate("/");
      }}
      title="Revenir à la configuration et changer de mode"
    >
      Changer de mode
    </Button>
  );
}
