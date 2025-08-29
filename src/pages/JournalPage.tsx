import { useMemo, useState } from "react";
import { useCrisisStore } from "@/hooks/useCrisisStore";
import { JournalEvent } from "@/types/crisis";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

const CATEGORIES = [
  { value: "detection", label: "Détection" },
  { value: "containment", label: "Containment" },
  { value: "eradication", label: "Éradication" },
  { value: "recovery", label: "Récupération" },
  { value: "communication", label: "Communication" },
  { value: "decision", label: "Décision" },
] as const;

function categoryLabel(value: string) {
  return CATEGORIES.find(c => c.value === value)?.label ?? value;
}

function categoryBadgeVariant(value: string): "default" | "secondary" | "outline" | "destructive" {
  switch (value) {
    case "detection": return "secondary";
    case "containment": return "default";
    case "eradication": return "destructive";
    case "recovery": return "secondary";
    case "communication": return "outline";
    case "decision": return "default";
    default: return "outline";
  }
}

export default function JournalPage() {
  const { exercise, addJournalEvent } = useCrisisStore();

  // Form state
  const [category, setCategory] = useState<string>("detection");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [by, setBy] = useState("");

  // Filters
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

  if (!exercise) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Aucun incident en cours</CardTitle>
            <CardDescription>Sélectionne un mode et crée une session pour accéder au journal.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const events = exercise.journal ?? [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events
      .filter(ev => (filterCategory === "all" ? true : ev.category === filterCategory))
      .filter(ev => {
        if (!q) return true;
        const text = `${ev.title ?? ""} ${ev.details ?? ""} ${ev.by ?? ""}`.toLowerCase();
        return text.includes(q);
      })
      .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
  }, [events, filterCategory, query]);

  const onAdd = () => {
    if (!title.trim()) {
      toast({ title: "Titre requis", description: "Ajoute un titre à l'événement.", variant: "destructive" });
      return;
    }
    const payload: Omit<JournalEvent, "id" | "at"> = {
      category,
      title: title.trim(),
      details: details.trim() || undefined,
      by: by.trim() || undefined,
    } as any; // on s'aligne sur ton type JournalEvent
    addJournalEvent(payload);
    setTitle("");
    setDetails("");
    setBy("");
    setCategory("detection");
    toast({ title: "Événement ajouté", description: "L'entrée a été insérée dans le journal." });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-semibold">Journal (Timeline)</h1>
          <p className="text-muted-foreground text-sm">Consigne chaque événement de l’incident en temps réel.</p>
        </div>
        <div className="text-sm text-muted-foreground">
          {exercise.title ? <span>Incident : <span className="font-medium">{exercise.title}</span></span> : null}
        </div>
      </div>

      {/* Formulaire rapide */}
      <Card>
        <CardHeader>
          <CardTitle>Ajouter un événement</CardTitle>
          <CardDescription>Catégorise et décris brièvement ce qui s’est produit.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-4">
          <div className="md:col-span-1">
            <label className="text-xs text-muted-foreground block mb-1">Catégorie</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir..." />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(c => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-3">
            <label className="text-xs text-muted-foreground block mb-1">Titre</label>
            <Input
              placeholder="Ex: Chiffrement détecté sur files01, antivirus déclenche une alerte"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="md:col-span-3">
            <label className="text-xs text-muted-foreground block mb-1">Détails (optionnel)</label>
            <Textarea
              placeholder="Contexte, logs, actions effectuées, prochain pas..."
              value={details}
              onChange={e => setDetails(e.target.value)}
              rows={3}
            />
          </div>

          <div className="md:col-span-1">
            <label className="text-xs text-muted-foreground block mb-1">Par (optionnel)</label>
            <Input
              placeholder="Nom / équipe"
              value={by}
              onChange={e => setBy(e.target.value)}
            />
          </div>

          <div className="md:col-span-4 flex justify-end">
            <Button onClick={onAdd}>Ajouter à la timeline</Button>
          </div>
        </CardContent>
      </Card>

      {/* Filtres */}
      <Card>
        <CardHeader>
          <CardTitle>Filtrer</CardTitle>
          <CardDescription>Affiner l’affichage pour retrouver rapidement une information.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-4">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Catégorie</label>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                {CATEGORIES.map(c => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-3">
            <label className="text-xs text-muted-foreground block mb-1">Recherche</label>
            <Input
              placeholder="Tape un mot-clé (titre, détail, auteur)"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Liste des événements */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Événements</CardTitle>
            <CardDescription>{filtered.length} élément(s)</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-sm text-muted-foreground">Aucun événement pour l’instant.</div>
          ) : (
            filtered.map(ev => (
              <div key={ev.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={categoryBadgeVariant(ev.category)}>{categoryLabel(ev.category)}</Badge>
                    <div className="font-medium">{ev.title}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(ev.at).toLocaleString()}
                  </div>
                </div>
                {ev.details ? (
                  <>
                    <Separator className="my-2" />
                    <div className="text-sm whitespace-pre-wrap">{ev.details}</div>
                  </>
                ) : null}
                <div className="mt-2 text-xs text-muted-foreground">
                  {ev.by ? <>Par <span className="font-medium">{ev.by}</span></> : null}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
