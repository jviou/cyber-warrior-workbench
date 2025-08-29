import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ChevronDown, 
  ChevronRight, 
  FileText, 
  Shield, 
  MessageSquare, 
  Target, 
  AlertTriangle,
  Paperclip,
  Upload,
  X
} from "lucide-react";
import { JournalEvent as JournalEventType, FileAttachment, SeverityLevel } from "@/types/crisis";

interface JournalEventProps {
  event: JournalEventType;
  onUpdate?: (event: JournalEventType) => void;
}

const eventIcons = {
  action: Target,
  decision: Shield,
  comm: MessageSquare,
  inject: FileText,
  note: FileText,
  incident: AlertTriangle,
  technical: Shield,
  legal: FileText
};

const eventColors = {
  action: "bg-blue-100 text-blue-700 border-blue-200",
  decision: "bg-green-100 text-green-700 border-green-200",
  comm: "bg-purple-100 text-purple-700 border-purple-200",
  inject: "bg-orange-100 text-orange-700 border-orange-200",
  note: "bg-gray-100 text-gray-700 border-gray-200",
  incident: "bg-red-100 text-red-700 border-red-200",
  technical: "bg-blue-100 text-blue-700 border-blue-200",
  legal: "bg-yellow-100 text-yellow-700 border-yellow-200"
};

export function JournalEventComponent({ event, onUpdate }: JournalEventProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    summary: event.summary,
    details: event.details || '',
    category: (event.category || 'general') as 'technical' | 'legal' | 'communication' | 'direction' | 'general',
    severity: (event.severity || 'moderate') as SeverityLevel
  });
  const [attachments, setAttachments] = useState<FileAttachment[]>(event.attachments || []);

  const Icon = eventIcons[event.kind] || FileText;
  const colorClass = eventColors[event.kind] || eventColors.note;

  const handleSave = () => {
    if (onUpdate) {
      onUpdate({
        ...event,
        summary: editForm.summary,
        details: editForm.details,
        category: editForm.category as any,
        severity: editForm.severity as any,
        attachments
      });
    }
    setIsEditing(false);
  };

  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const attachment: FileAttachment = {
          id: `att-${Date.now()}-${Math.random()}`,
          name: file.name,
          type: file.type,
          size: file.size,
          content: e.target?.result as string,
          uploadedAt: new Date().toISOString()
        };
        setAttachments(prev => [...prev, attachment]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  return (
    <Card className="mb-4">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CardHeader className="pb-3">
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg border ${colorClass}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{event.summary}</h4>
                    {event.attachments && event.attachments.length > 0 && (
                      <Paperclip className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>
                      {format(new Date(event.at), 'dd/MM/yyyy à HH:mm', { locale: fr })}
                    </span>
                    {event.author && (
                      <>
                        <span>•</span>
                        <span>{event.author}</span>
                      </>
                    )}
                    {event.category && (
                      <>
                        <span>•</span>
                        <Badge variant="secondary" className="text-xs">
                          {event.category}
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {event.kind}
                </Badge>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </div>
          </CollapsibleTrigger>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="pt-0">
            {event.details && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {event.details}
                </p>
              </div>
            )}

            {event.attachments && event.attachments.length > 0 && (
              <div className="mb-4">
                <h5 className="text-sm font-medium mb-2">Pièces jointes:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {event.attachments.map(att => (
                    <div key={att.id} className="flex items-center gap-2 p-2 border rounded-md">
                      <Paperclip className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm flex-1 truncate">{att.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {(att.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {onUpdate && (
              <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Modifier
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Modifier l'Événement</DialogTitle>
                    <DialogDescription>
                      Modifiez les détails de cet événement du journal
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="summary">Résumé</Label>
                      <Input
                        id="summary"
                        value={editForm.summary}
                        onChange={(e) => setEditForm(prev => ({ ...prev, summary: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="details">Détails</Label>
                      <Textarea
                        id="details"
                        value={editForm.details}
                        onChange={(e) => setEditForm(prev => ({ ...prev, details: e.target.value }))}
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Catégorie</Label>
                        <select
                          id="category"
                          value={editForm.category}
                          onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value as any }))}
                          className="w-full p-2 border border-input rounded-md bg-background"
                        >
                          <option value="general">Général</option>
                          <option value="technical">Technique</option>
                          <option value="legal">Juridique</option>
                          <option value="communication">Communication</option>
                          <option value="direction">Direction</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="severity">Gravité</Label>
                        <select
                          id="severity"
                          value={editForm.severity}
                          onChange={(e) => setEditForm(prev => ({ ...prev, severity: e.target.value as SeverityLevel }))}
                          className="w-full p-2 border border-input rounded-md bg-background"
                        >
                          <option value="low">Faible</option>
                          <option value="moderate">Modéré</option>
                          <option value="high">Élevé</option>
                          <option value="critical">Critique</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label>Pièces jointes</Label>
                      <div className="mt-2">
                        <div className="flex items-center gap-2 mb-4">
                          <input
                            type="file"
                            multiple
                            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                            className="hidden"
                            id="file-upload"
                          />
                          <label
                            htmlFor="file-upload"
                            className="flex items-center gap-2 px-3 py-2 border border-input rounded-md cursor-pointer hover:bg-accent"
                          >
                            <Upload className="h-4 w-4" />
                            Ajouter des fichiers
                          </label>
                        </div>

                        {attachments.length > 0 && (
                          <div className="space-y-2">
                            {attachments.map(att => (
                              <div key={att.id} className="flex items-center gap-2 p-2 border rounded-md">
                                <Paperclip className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm flex-1 truncate">{att.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {(att.size / 1024).toFixed(1)} KB
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeAttachment(att.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleSave}>
                        Sauvegarder
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}