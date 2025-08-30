import { Button } from "@/components/ui/button";
import { useCrisisStore } from "@/hooks/useCrisisStore";
import { useNavigate } from "react-router-dom";

export default function ModeButton({ onClick }: { onClick?: () => void }) {
  const navigate = useNavigate();
  const { resetExercise } = useCrisisStore();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        resetExercise();      // remet la session à zéro
        onClick?.();          // ouvre la modale (layout)
        navigate("/");        // revient à la page d'accueil
      }}
      title="Revenir à la configuration et changer de mode"
    >
      Changer de mode
    </Button>
  );
}
