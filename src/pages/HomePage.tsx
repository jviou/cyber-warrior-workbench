import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Clock } from "lucide-react";
import { useCrisisStore } from "@/hooks/useCrisisStore";

export default function HomePage() {
  const { exercise } = useCrisisStore();
  if (!exercise) return null;

  // ----- MODE RÉEL : page épurée, orientée gestion d'incident -----
  if (exercise.mode === "real") {
    return (
      <div className="container mx-auto p-6 space-y-6">
        {/* En-tête incident */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h1 className="heading-crisis text-3xl">{exercise.title}</h1>
            <p className="text-lg text-muted-foreground">{exercise.description}</p>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="destructive">Gravité : Critique</Badge>
              <span>•</span>
              <Badge>Statut : En cours</Badge>
              <span>•</span>
              <Clock className="h-4 w-4" />
              <span>Temps écoulé : 00:42:18</span>
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
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">00:42:18</div>
              <p className="text-sm text-muted-foreground">Temps écoulé</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{exercise.actions.length}</div>
              <p className="text-sm text-muted-foreground">Actions ouvertes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{exercise.communications.length}</div>
              <p className="text-sm text-muted-foreground">Comms envoyées</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {/* Placeholder services impactés si tu ajoutes ce champ plus tard */}
                {exercise.phases.length}
              </div>
              <p className="text-sm text-muted-foreground">Indicateur global</p>
            </CardContent>
          </Card>
        </div>

        {/* Vue d’ensemble */}
        <Card>
          <CardHeader>
            <CardTitle>Vue d’ensemble</CardTitle>
            <CardDescription>Résumé, services impactés et équipe</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="text-sm">
                Chiffrement détecté sur \\files01. Containment en cours. (Texte éditable plus tard)
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4" />
                <span className="font-medium text-sm">Équipe & rôles</span>
              </div>
              <div className="space-y-1 text-sm">
                <div>Responsable de crise — Toi</div>
                <div>RSSI — (à définir)</div>
                <div>Comms — (à définir)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Placeholders pour les prochaines features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-2">
            <CardHeader><CardTitle>Journal (Timeline)</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Saisie rapide + liste d’événements (à venir)
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Kanban À faire / En cours / Fait (à venir)
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle>Communications</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Modèles + historique (à venir)
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Preuves & pièces jointes</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Upload/lien + métadonnées (à venir)
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ----- MODE EXERCICE : on garde l’affichage existant -----
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <div className="text-center space-y-2">
        <h1 className="heading-crisis text-3xl">{exercise.title}</h1>
        <p className="text-lg text-muted-foreground">{exercise.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Objectives */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Objectifs de l'Exercice
            </CardTitle>
            <CardDescription>
              Les objectifs principaux de cette simulation de crise
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {exercise.objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5 text-xs">
                    {index + 1}
                  </Badge>
                  <span className="text-sm">{objective}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Règles du Jeu
            </CardTitle>
            <CardDescription>
              Directives à suivre pendant l'exercice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {exercise.rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5 text-xs">
                    {index + 1}
                  </Badge>
                  <span className="text-sm">{rule}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Key Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Contacts Clés
            </CardTitle>
            <CardDescription>
              Personnes ressources pour l'exercice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {exercise.keyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.role}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {contact.contact}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Import PowerPoint */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Import de Contenu
            </CardTitle>
            <CardDescription>
              Importer le contenu depuis un fichier PowerPoint
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Glissez-déposez votre fichier PowerPoint pour automatiquement peupler les phases et checklists.
            </p>
            <Button variant="outline" className="w-full" disabled>
              Importer le PowerPoint
              <Badge variant="secondary" className="ml-2">Bientôt</Badge>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{exercise.phases.length}</div>
            <p className="text-sm text-muted-foreground">Phases</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {exercise.phases.reduce((acc, phase) => acc + phase.checklist.length, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Items de Checklist</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {exercise.phases.reduce((acc, phase) => acc + phase.injects.length, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Injects Programmés</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{exercise.actions.length}</div>
            <p className="text-sm text-muted-foreground">Actions en Cours</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
