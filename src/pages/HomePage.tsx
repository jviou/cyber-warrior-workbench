import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Users, FileText, Upload, Clock } from "lucide-react";
import { useCrisisStore } from "@/hooks/useCrisisStore";

export default function HomePage() {
  const { exercise } = useCrisisStore();

  if (!exercise) return null;

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
              <Target className="h-5 w-5 text-primary" />
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
              <FileText className="h-5 w-5 text-primary" />
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
              <Users className="h-5 w-5 text-primary" />
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
              <Upload className="h-5 w-5 text-primary" />
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
              <Upload className="mr-2 h-4 w-4" />
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