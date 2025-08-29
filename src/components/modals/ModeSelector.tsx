import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Play, Shield, FileText, Users } from "lucide-react";
import { CrisisMode, SeverityLevel } from "@/types/crisis";

interface ModeSelectorProps {
  open: boolean;
  onSelect: (mode: CrisisMode, config: CrisisConfig) => void;
}

export interface CrisisConfig {
  title: string;
  description: string;
  severity: SeverityLevel;
  mode: CrisisMode;
}

export function ModeSelector({ open, onSelect }: ModeSelectorProps) {
  const [selectedMode, setSelectedMode] = useState<CrisisMode | null>(null);
  const [config, setConfig] = useState<CrisisConfig>({
    title: '',
    description: '',
    severity: 'moderate' as SeverityLevel,
    mode: 'exercise' as CrisisMode
  });

  const handleModeSelect = (mode: CrisisMode) => {
    setSelectedMode(mode);
    setConfig(prev => ({
      ...prev,
      mode,
      title: mode === 'exercise' 
        ? 'Exercice de Crise Cyber' 
        : 'Gestion de Crise - Incident Réel',
      description: mode === 'exercise'
        ? 'Simulation d\'exercice de gestion de crise cybersécurité'
        : 'Gestion en temps réel d\'un incident de cybersécurité'
    }));
  };

  const handleStart = () => {
    if (config.title.trim()) {
      onSelect(selectedMode!, config);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Configuration de la Crise</DialogTitle>
          <DialogDescription>
            Sélectionnez le mode de fonctionnement et configurez votre session
          </DialogDescription>
        </DialogHeader>

        {!selectedMode ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
            {/* Mode Exercice */}
            <Card 
              className="cursor-pointer transition-all hover:shadow-lg border-2 hover:border-primary"
              onClick={() => handleModeSelect('exercise')}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Play className="h-6 w-6 text-primary" />
                  </div>
                  Mode Exercice
                </CardTitle>
                <CardDescription>
                  Simulation contrôlée avec injects programmés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Scénarios pré-définis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Timer et injects automatiques</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Environnement sécurisé</span>
                  </div>
                  <Badge variant="secondary" className="w-fit">
                    Formation & Test
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Mode Réel */}
            <Card 
              className="cursor-pointer transition-all hover:shadow-lg border-2 hover:border-destructive"
              onClick={() => handleModeSelect('real')}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-destructive/10">
                    <Shield className="h-6 w-6 text-destructive" />
                  </div>
                  Mode Réel
                </CardTitle>
                <CardDescription>
                  Gestion d'incident en temps réel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Journal temps réel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Gestion d'équipe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Exports légaux</span>
                  </div>
                  <Badge variant="destructive" className="w-fit">
                    Incident Actif
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Titre de la Session</Label>
                  <Input
                    id="title"
                    value={config.title}
                    onChange={(e) => setConfig(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Nom de la crise ou exercice"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={config.description}
                    onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Description de l'incident ou exercice"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="severity">Niveau de Gravité</Label>
                  <select
                    id="severity"
                    value={config.severity}
                    onChange={(e) => setConfig(prev => ({ ...prev, severity: e.target.value as SeverityLevel }))}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    <option value="low">Faible</option>
                    <option value="moderate">Modéré</option>
                    <option value="high">Élevé</option>
                    <option value="critical">Critique</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">
                      Mode Sélectionné: {selectedMode === 'exercise' ? 'Exercice' : 'Réel'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedMode === 'exercise' ? (
                      <div className="space-y-2 text-sm">
                        <p>• Injects programmés automatiques</p>
                        <p>• Phases pré-définies ANSSI</p>
                        <p>• Environnement de formation</p>
                        <p>• Chronomètre d'exercice</p>
                      </div>
                    ) : (
                      <div className="space-y-2 text-sm">
                        <p>• Saisie manuelle d'événements</p>
                        <p>• Phases personnalisables</p>
                        <p>• Documentation légale</p>
                        <p>• Export compliance</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setSelectedMode(null)}
              >
                Retour
              </Button>
              <Button 
                onClick={handleStart}
                disabled={!config.title.trim()}
                className="gap-2"
              >
                <Play className="h-4 w-4" />
                Démarrer
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}