import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Filter, Search } from "lucide-react";
import { useCrisisStore } from "@/hooks/useCrisisStore";
import { JournalEventComponent } from "@/components/journal/JournalEvent";
import { JournalEvent, SeverityLevel } from "@/types/crisis";

export default function JournalPage() {
  const { exercise, addJournalEvent, updateExercise } = useCrisisStore();
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newEvent, setNewEvent] = useState({
    summary: '',
    details: '',
    kind: 'note' as const,
    category: 'general' as const,
    severity: 'moderate' as SeverityLevel,
    author: ''
  });

  if (!exercise) return null;

  const filteredEvents = exercise.journal.filter(event => {
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory || event.kind === filterCategory;
    const matchesSearch = searchTerm === '' || 
      event.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.details?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddEvent = () => {
    if (newEvent.summary.trim()) {
      addJournalEvent({
        ...newEvent,
        details: newEvent.details || undefined,
        author: newEvent.author || undefined
      });
      setNewEvent({
        summary: '',
        details: '',
        kind: 'note',
        category: 'general',
        severity: 'moderate',
        author: ''
      });
      setIsAddingEvent(false);
    }
  };

  const handleUpdateEvent = (updatedEvent: JournalEvent) => {
    const updatedJournal = exercise.journal.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    );
    updateExercise({ journal: updatedJournal });
  };

  const categoryStats = {
    all: exercise.journal.length,
    technical: exercise.journal.filter(e => e.category === 'technical').length,
    legal: exercise.journal.filter(e => e.category === 'legal').length,
    communication: exercise.journal.filter(e => e.category === 'communication').length,
    direction: exercise.journal.filter(e => e.category === 'direction').length,
    action: exercise.journal.filter(e => e.kind === 'action').length,
    decision: exercise.journal.filter(e => e.kind === 'decision').length,
    incident: exercise.journal.filter(e => e.kind === 'incident').length
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Journal de Crise</h1>
          <p className="text-muted-foreground">
            Chronologie complète des événements et actions
          </p>
        </div>
        
        <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un Événement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nouvel Événement</DialogTitle>
              <DialogDescription>
                Ajouter un nouvel événement au journal de crise
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="summary">Résumé de l'Événement *</Label>
                <Input
                  id="summary"
                  value={newEvent.summary}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="Description courte de l'événement"
                />
              </div>

              <div>
                <Label htmlFor="details">Détails</Label>
                <Textarea
                  id="details"
                  value={newEvent.details}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, details: e.target.value }))}
                  placeholder="Description détaillée (optionnel)"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="kind">Type d'Événement</Label>
                  <select
                    id="kind"
                    value={newEvent.kind}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, kind: e.target.value as any }))}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    <option value="note">Note</option>
                    <option value="incident">Incident</option>
                    <option value="action">Action</option>
                    <option value="decision">Décision</option>
                    <option value="comm">Communication</option>
                    <option value="technical">Technique</option>
                    <option value="legal">Juridique</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="category">Catégorie</Label>
                  <select
                    id="category"
                    value={newEvent.category}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    <option value="general">Général</option>
                    <option value="technical">Technique</option>
                    <option value="legal">Juridique</option>
                    <option value="communication">Communication</option>
                    <option value="direction">Direction</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="severity">Gravité</Label>
                  <select
                    id="severity"
                    value={newEvent.severity}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, severity: e.target.value as SeverityLevel }))}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    <option value="low">Faible</option>
                    <option value="moderate">Modéré</option>
                    <option value="high">Élevé</option>
                    <option value="critical">Critique</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="author">Auteur</Label>
                  <Input
                    id="author"
                    value={newEvent.author}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, author: e.target.value }))}
                    placeholder="Nom de l'auteur (optionnel)"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingEvent(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddEvent} disabled={!newEvent.summary.trim()}>
                  Ajouter
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres et Recherche
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Rechercher</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher dans le journal..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Filtrer par catégorie</Label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(categoryStats).map(([category, count]) => (
                  <Badge
                    key={category}
                    variant={filterCategory === category ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilterCategory(category)}
                  >
                    {category === 'all' ? 'Tous' : category} ({count})
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{exercise.journal.length}</div>
            <p className="text-sm text-muted-foreground">Total Événements</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {exercise.journal.filter(e => e.kind === 'incident').length}
            </div>
            <p className="text-sm text-muted-foreground">Incidents</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {exercise.journal.filter(e => e.kind === 'action').length}
            </div>
            <p className="text-sm text-muted-foreground">Actions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {exercise.journal.filter(e => e.kind === 'decision').length}
            </div>
            <p className="text-sm text-muted-foreground">Décisions</p>
          </CardContent>
        </Card>
      </div>

      {/* Journal Events */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          Événements {filterCategory !== 'all' && `- ${filterCategory}`}
          {searchTerm && ` - "${searchTerm}"`}
        </h2>
        
        {filteredEvents.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">
                {searchTerm || filterCategory !== 'all' 
                  ? 'Aucun événement ne correspond aux filtres sélectionnés'
                  : 'Aucun événement dans le journal pour le moment'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredEvents.map((event) => (
            <JournalEventComponent
              key={event.id}
              event={event}
              onUpdate={exercise.mode === 'real' ? handleUpdateEvent : undefined}
            />
          ))
        )}
      </div>
    </div>
  );
}