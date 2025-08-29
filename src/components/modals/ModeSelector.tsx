// src/components/modals/ModeSelector.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useCrisisStore } from "@/hooks/useCrisisStore";

export type CrisisConfig = {
  mode: "exercise" | "real";
  title: string;
  description: string;
  severity: "low" | "moderate" | "high" | "critical";
};

type Props = {
  open?: boolean;
  onSelect?: () => void; // optionnel
};

export function ModeSelector({ open = true, onSelect }: Props) {
  const navigate = useNavigate();
  const { createExercise } = useCrisisStore();

  // état d’ouverture local (pour s’assurer que la modale s’affiche)
  const [visible, setVisible] = useState(open);

  // champs du formulaire
  const [mode, setMode] = useState<CrisisConfig["mode"]>("real");
  const [title, setTitle] = useState("Gestion de Crise - Incident Réel");
  const [description, setDescription] = useState("Gestion en temps réel d'un incident de cybersécurité");
  const [severity, setSeverity] = useState<CrisisConfig["severity"]>("moderate");

  useEffect(() => setVisible(open), [open]);

  const start = () => {
    const cfg: CrisisConfig = { mode, title: title.trim(), description: description.trim(), severity };
    // >>> CREE LA SESSION <<<
    createExercise(cfg);
    // ferme la modale et retourne à l’accueil
    setVisible(false);
    onSelect?.();
    navigate("/");
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-w-3xl w-full">
        <Card>
          <CardHeader>
            <CardTitle>Configuration de la Crise</CardTitle>
            <CardDescription>
              Sélectionnez le mode de fonctionnement et configurez votre session
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {/* Colonne gauche : formulaire */}
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Mode</label>
                <Select value={mode} onValueChange={(v: any) => setMode(v)}>
                  <SelectTrigger><SelectValue placeholder="Choisir un mode" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exercise">Exercice</SelectItem>
                    <SelectItem value="real">Réel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs text-muted-foreground block mb-1">Titre de la Session</label>
                <Input value={title} onChange={e => setTitle(e.target.value)} />
              </div>

              <div>
                <label className="text-xs text-muted-foreground block mb-1">Description</label>
                <Textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} />
              </div>

              <div>
                <label className="text-xs text-muted-foreground block mb-1">Niveau de Gravité</label>
                <Select value={severity} onValueChange={(v: any) => setSeverity(v)}>
                  <SelectTrigger><SelectValue placeholder="Gravité" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Faible</SelectItem>
                    <SelectItem value="moderate">Modéré</SelectItem>
                    <SelectItem value="high">Élevé</SelectItem>
                    <SelectItem value="critical">Critique</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={() => setVisible(false)}>Retour</Button>
                <Button onClick={start}>Démarrer</Button>
              </div>
            </div>

            {/* Colonne droite : résumé du mode */}
            <div className="rounded-lg border p-4">
              <div className="font-semibold mb-2">
                Mode Sélectionné: {mode === "real" ? "Réel" : "Exercice"}
              </div>
              {mode === "real" ? (
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>Saisie manuelle d’événements</li>
                  <li>Phases personnalisables</li>
                  <li>Documentation légale</li>
                  <li>Export compliance</li>
                </ul>
              ) : (
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>Scénarios pré-définis</li>
                  <li>Timer & injects automatiques</li>
                  <li>Environnement sécurisé</li>
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ModeSelector;
