import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Clock } from "lucide-react";
import { useCrisisStore } from "@/hooks/useCrisisStore";
import { ModeSelector } from "@/components/modals/ModeSelector";

export default function HomePage() {
  const { exercise } = useCrisisStore();

  // Aucune session : ouvrir la modale de configuration
  if (!exercise) {
    return <ModeSelector open={true} />;
  }

  // ---------- MODE RÉEL : vue épurée orientée incident ----------
  if (exercise.mode === "real") {
    return (
      <div className="container mx-auto p-6 space-y-6">
        {/* En-tête incident */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h1 className="heading-crisis text-3xl">{exercise.title}</h1>
            <p className="text-lg text-muted-foreground">{exercise.description}</p>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="destructive">
                Gravité : {exercise.severity === "critical" ? "Critique" :
                exercise.severity === "high" ? "Élevée" :
                exercise.severity === "moderate" ? "Modérée" : "Faible"}
              </Badge>
              <span>•</span>
              <Badge>Statut : En cours</Badge>
              <span>•</span>
              <Clock className="h-4 w-4" />
              <span>Temps écoulé : 00:00:00</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Nouvelle action</Button>
            <Button variant="outline">Ajouter événement</Button>
            <Button>Exporter</Button>
          </div>
        </div>

        {/* KPI rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">00:00:00</div>
            <p className="text-sm text-muted-foreground">Temps écoulé</p>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{exercise.actions.length}</div>
            <p className="text-sm text-muted-foreground">Actions ouvertes</p>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{exercise.communications?.length ?? 0}</div>
            <p className="text-sm text-muted-foreground">Comms envoyées</p>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{exercise.phases.length}</div>
            <p className="text-sm text-muted-foreground">Phases</p>
          </CardContent></Card>
        </div>

        {/* Vue d’ensemble */}
        <Card>
          <CardHeader>
            <CardTitle>Vue d’ensemble</CardTitle>
            <CardDescription>Résumé, services impactés, équipe</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="text-sm">
                Saisis ici le résumé de l’incident (ce qu’on sait / hypothèses / prochaines étapes).
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4" />
                <span className="font-medium text-sm">Équipe & rôles</span>
              </div>
              <div className="space-y-1 text-sm">
                <div>Incident Manager — (à définir)</div>
                <div>RSSI — (à définir)</div>
                <div>Communication — (à définir)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Placeholders vers les pages dédiées */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-2">
            <CardHeader><CardTitle>Journal (Timeline)</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Saisie rapide + liste d’événements (voir page Journal)
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Kanban À faire / En cours / Fait (voir page Actions)
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ---------- MODE EXERCICE : on garde tes cartes, sans l'Import PowerPoint ----------
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <div className="text-center space-y-2">
        <h1 className="heading-crisis text-3xl">{exercise.title}</h1>
        <p className="text-lg text-muted-foreground">{exercise.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Objectifs */}
        <Card>
          <CardHeader>
            <CardTitle>Objectifs de l'Exercice</CardTitle>
            <CardDescription>Les objectifs principaux de cette simulation de crise</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {exercise.objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5 text-xs">{index + 1}</Badge>
                  <span className="text-sm">{objective}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Règles */}
        <Card>
          <CardHeader>
            <CardTitle>Règles du Jeu</CardTitle>
            <CardDescription>Directives à suivre pendant l'exercice</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {exercise.rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5 text-xs">{index + 1}</Badge>
                  <span className="text-sm">{rule}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Contacts */}
        <Card>
          <CardHeader>
            <CardTitle>Contacts Clés</CardTitle>
            <CardDescription>Personnes ressources pour l'exercice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {exercise.keyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.role}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">{contact.contact}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{exercise.phases.length}</div>
          <p className="text-sm text-muted-foreground">Phases</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {exercise.phases.reduce((acc, phase) => acc + phase.checklist.length, 0)}
          </div>
          <p className="text-sm text-muted-foreground">Items de Checklist</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {exercise.phases.reduce((acc, phase) => acc + phase.injects.length, 0)}
          </div>
          <p className="text-sm text-muted-foreground">Injects Programmés</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{exercise.actions.length}</div>
          <p className="text-sm text-muted-foreground">Actions en Cours</p>
        </CardContent></Card>
      </div>
    </div>
  );
}
