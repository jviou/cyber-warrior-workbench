import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Send, Copy, Mail, MessageSquare } from "lucide-react";
import { useCrisisStore } from "@/hooks/useCrisisStore";
import { Communication, Role } from "@/types/crisis";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function CommunicationsPage() {
  const { exercise, updateExercise, addJournalEvent } = useCrisisStore();
  const [isComposing, setIsComposing] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [newComm, setNewComm] = useState({
    audience: 'Interne',
    subject: '',
    message: '',
    author: 'Comms' as Role
  });

  if (!exercise) return null;

  const communicationTemplates = {
    internal: {
      title: "Communication Interne",
      audiences: ["Interne", "Collaborateurs", "Équipe IT"],
      templates: [
        {
          name: "Alerte Incident",
          subject: "🚨 INCIDENT CYBER EN COURS - Action Requise",
          message: `Cher(e)s collègues,

Nous faisons actuellement face à un incident de cybersécurité qui nécessite votre attention immédiate.

SITUATION :
- Type d'incident : [DÉTAIL]
- Impact : [SYSTÈMES AFFECTÉS]
- Heure de détection : [HEURE]

ACTIONS REQUISES :
✅ Ne pas ouvrir d'emails suspects
✅ Signaler tout comportement anormal de votre ordinateur
✅ Ne pas utiliser les systèmes concernés : [LISTE]
✅ Contacter immédiatement le support IT : [CONTACT]

PROCHAINES ÉTAPES :
- Nous travaillons activement sur la résolution
- Mise à jour prévue dans : [DÉLAI]
- Point de situation à : [HEURE]

Pour toute question urgente, contactez la cellule de crise : [CONTACT]

Merci de votre coopération.

L'équipe de gestion de crise`
        },
        {
          name: "Mise à jour Status",
          subject: "📊 Mise à jour - Incident Cyber",
          message: `Mise à jour sur la situation en cours :

ÉTAT ACTUEL :
- Incident identifié et circonscrit
- Systèmes affectés : [LISTE]
- Progression : [%] résolu

ACTIONS COMPLÉTÉES :
✅ [ACTION 1]
✅ [ACTION 2]
✅ [ACTION 3]

EN COURS :
🔄 [ACTION EN COURS]
🔄 [ACTION EN COURS]

PROCHAINE MISE À JOUR : [HEURE]

Merci de votre patience.`
        }
      ]
    },
    direction: {
      title: "Direction",
      audiences: ["Direction", "Comité Exécutif", "Board"],
      templates: [
        {
          name: "Rapport Exécutif",
          subject: "URGENT - Incident Cybersécurité - Rapport Exécutif",
          message: `RAPPORT CONFIDENTIEL - CELLULE DE CRISE

RÉSUMÉ EXÉCUTIF :
Un incident de cybersécurité a été détecté et est actuellement en cours de traitement par notre équipe spécialisée.

IMPACT BUSINESS :
- Criticité : [NIVEAU]
- Systèmes affectés : [LISTE]
- Impact estimé : [FINANCIER/OPÉRATIONNEL]
- Temps d'arrêt estimé : [DURÉE]

ACTIONS ENGAGÉES :
• Activation de la cellule de crise
• Isolation des systèmes compromis
• Activation du plan de continuité
• Engagement des experts externes : [SI APPLICABLE]

RECOMMANDATIONS :
• [RECOMMANDATION 1]
• [RECOMMANDATION 2]
• [RECOMMANDATION 3]

COMMUNICATION :
• Préparation communication clients/partenaires
• Coordination avec les équipes juridiques
• Notification aux autorités : [STATUT]

PROCHAINS POINTS :
• Réunion de crise : [HEURE]
• Mise à jour : [FRÉQUENCE]

Disponible pour brief urgent si nécessaire.

[RESPONSABLE CRISE]`
        }
      ]
    },
    external: {
      title: "Externe",
      audiences: ["DPO", "ANSSI", "CERT", "CNIL", "Clients", "Partenaires", "Fournisseurs"],
      templates: [
        {
          name: "Notification ANSSI",
          subject: "Déclaration d'incident de cybersécurité",
          message: `Madame, Monsieur,

Conformément aux obligations réglementaires, nous vous notifions d'un incident de cybersécurité affectant nos systèmes d'information.

DÉTAILS DE L'INCIDENT :
- Date/heure de détection : [DATE/HEURE]
- Type d'incident : [CATÉGORIE]
- Vecteur d'attaque : [SI CONNU]
- Systèmes impactés : [DESCRIPTION]

ÉVALUATION PRÉLIMINAIRE :
- Criticité : [NIVEAU]
- Données potentiellement affectées : [TYPE]
- Nombre d'enregistrements : [SI APPLICABLE]

MESURES PRISES :
- Isolation des systèmes compromis
- Activation de la cellule de crise
- Engagement d'experts forensiques
- Mise en place de mesures de sauvegarde

PROCHAINES ÉTAPES :
- Investigation approfondie en cours
- Rapport détaillé sous : [DÉLAI]
- Point de situation régulier

Contact de la cellule de crise : [CONTACT]

Nous restons à votre disposition pour tout complément d'information.

Cordialement,
[RESPONSABLE]`
        },
        {
          name: "Communication Client",
          subject: "Information importante concernant la sécurité de vos données",
          message: `Cher(e) client(e),

Nous vous informons qu'un incident de sécurité informatique a été détecté sur nos systèmes.

VOTRE SÉCURITÉ EST NOTRE PRIORITÉ :
Nous avons immédiatement mis en place toutes les mesures nécessaires pour sécuriser vos données et nos systèmes.

CE QUE NOUS SAVONS :
- Incident détecté le [DATE] à [HEURE]
- Nos équipes de sécurité sont mobilisées
- Les autorités compétentes ont été informées
- Aucune donnée sensible n'a été compromise à ce jour

CE QUE NOUS FAISONS :
✅ Investigation complète en cours
✅ Renforcement des mesures de sécurité
✅ Collaboration avec les experts cybersécurité
✅ Surveillance renforcée 24h/24

CE QUE VOUS DEVEZ FAIRE :
Par précaution, nous vous recommandons de :
• Surveiller vos comptes
• Modifier vos mots de passe
• Signaler toute activité suspecte

NOTRE ENGAGEMENT :
Nous vous tiendrons informé(e) de l'évolution de la situation et prendrons toutes les mesures nécessaires pour protéger vos données.

Contact dédié : [EMAIL/TÉLÉPHONE]

Nous nous excusons pour la gêne occasionnée.

L'équipe [ENTREPRISE]`
        }
      ]
    }
  };

  const handleSendCommunication = () => {
    if (newComm.subject.trim() && newComm.message.trim()) {
      const communication: Communication = {
        id: `comm-${Date.now()}`,
        audience: newComm.audience,
        subject: newComm.subject,
        message: newComm.message,
        author: newComm.author,
        sentAt: new Date().toISOString()
      };

      const updatedComms = [...exercise.communications, communication];
      updateExercise({ communications: updatedComms });

      // Add to journal
      addJournalEvent({
        kind: 'comm',
        refId: communication.id,
        summary: `Communication envoyée à ${communication.audience}`,
        details: `Sujet: ${communication.subject}`,
        category: 'communication'
      });

      setNewComm({
        audience: 'Interne',
        subject: '',
        message: '',
        author: 'Comms'
      });
      setIsComposing(false);
      setSelectedTemplate(null);
    }
  };

  const handleUseTemplate = (template: any) => {
    setNewComm(prev => ({
      ...prev,
      subject: template.subject,
      message: template.message
    }));
    setSelectedTemplate(template.name);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Communications</h1>
          <p className="text-muted-foreground">
            Gestion des communications internes et externes
          </p>
        </div>
        
        <Dialog open={isComposing} onOpenChange={setIsComposing}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nouvelle Communication
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Composer une Communication</DialogTitle>
              <DialogDescription>
                Créer et envoyer une communication
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="compose" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="compose">Composer</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>

              <TabsContent value="compose" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="audience">Destinataire</Label>
                    <select
                      id="audience"
                      value={newComm.audience}
                      onChange={(e) => setNewComm(prev => ({ ...prev, audience: e.target.value }))}
                      className="w-full p-2 border border-input rounded-md bg-background"
                    >
                      <option value="Interne">Interne</option>
                      <option value="Direction">Direction</option>
                      <option value="DPO">DPO</option>
                      <option value="ANSSI">ANSSI</option>
                      <option value="CERT">CERT</option>
                      <option value="CNIL">CNIL</option>
                      <option value="Clients">Clients</option>
                      <option value="Partenaires">Partenaires</option>
                      <option value="Fournisseurs">Fournisseurs</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="author">Auteur</Label>
                    <select
                      id="author"
                      value={newComm.author}
                      onChange={(e) => setNewComm(prev => ({ ...prev, author: e.target.value as Role }))}
                      className="w-full p-2 border border-input rounded-md bg-background"
                    >
                      <option value="Comms">Communication</option>
                      <option value="IncidentManager">Responsable de Crise</option>
                      <option value="RSSI">RSSI</option>
                      <option value="DPO">DPO</option>
                      <option value="Legal">Juridique</option>
                      <option value="Exec">Direction</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Sujet</Label>
                  <Input
                    id="subject"
                    value={newComm.subject}
                    onChange={(e) => setNewComm(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Sujet de la communication"
                  />
                  {selectedTemplate && (
                    <Badge variant="secondary" className="mt-1">
                      Template: {selectedTemplate}
                    </Badge>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={newComm.message}
                    onChange={(e) => setNewComm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Contenu de la communication"
                    rows={12}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsComposing(false)}>
                    Annuler
                  </Button>
                  <Button 
                    onClick={handleSendCommunication}
                    disabled={!newComm.subject.trim() || !newComm.message.trim()}
                    className="gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Envoyer
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="templates" className="space-y-4">
                {Object.entries(communicationTemplates).map(([key, category]) => (
                  <Card key={key}>
                    <CardHeader>
                      <CardTitle>{category.title}</CardTitle>
                      <CardDescription>
                        Templates pour: {category.audiences.join(', ')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {category.templates.map((template, index) => (
                          <Card key={index} className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{template.name}</h4>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(template.message)}
                                  className="gap-1"
                                >
                                  <Copy className="h-3 w-3" />
                                  Copier
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleUseTemplate(template)}
                                >
                                  Utiliser
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">
                              {template.subject}
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {template.message.substring(0, 200)}...
                            </p>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{exercise.communications.length}</div>
            <p className="text-sm text-muted-foreground">Communications Envoyées</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {exercise.communications.filter(c => ['Interne', 'Collaborateurs'].includes(c.audience)).length}
            </div>
            <p className="text-sm text-muted-foreground">Internes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {exercise.communications.filter(c => ['Direction', 'Comité Exécutif'].includes(c.audience)).length}
            </div>
            <p className="text-sm text-muted-foreground">Direction</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {exercise.communications.filter(c => ['ANSSI', 'CERT', 'CNIL', 'DPO'].includes(c.audience)).length}
            </div>
            <p className="text-sm text-muted-foreground">Autorités</p>
          </CardContent>
        </Card>
      </div>

      {/* Communications History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Historique des Communications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {exercise.communications.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Aucune communication envoyée pour le moment
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {exercise.communications
                .sort((a, b) => new Date(b.sentAt || 0).getTime() - new Date(a.sentAt || 0).getTime())
                .map((comm) => (
                  <Card key={comm.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">{comm.audience}</Badge>
                          {comm.author && <Badge variant="secondary">{comm.author}</Badge>}
                        </div>
                        <h4 className="font-medium">{comm.subject}</h4>
                        {comm.sentAt && (
                          <p className="text-sm text-muted-foreground">
                            Envoyé le {format(new Date(comm.sentAt), 'dd/MM/yyyy à HH:mm', { locale: fr })}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(comm.message)}
                          className="gap-1"
                        >
                          <Copy className="h-3 w-3" />
                          Copier
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-3">
                      {comm.message}
                    </div>
                  </Card>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}