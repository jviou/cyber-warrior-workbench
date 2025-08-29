import { Button } from "@/components/ui/button";
import { useCrisisStore } from "@/hooks/useCrisisStore";

type Props = {
  onClick?: () => void;
};

export default function ModeButton({ onClick }: Props) {
  const { exercise } = useCrisisStore();

  // Si tu veux le bouton seulement quand une session existe, décommente :
  // if (!exercise) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      title="Revenir à la configuration et changer de mode"
    >
      Changer de mode
    </Button>
  );
}
