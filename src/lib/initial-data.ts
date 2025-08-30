import { CrisisExercise, Phase, CrisisMode } from '@/types/crisis';
import { CrisisConfig } from '@/components/modals/ModeSelector';

export function createInitialExercise(config?: CrisisConfig): CrisisExercise {
  const now = new Date().toISOString();
  
  const phases: Phase[] = [
    {
      id: 'P1',
      title: 'Phase 1 - Détection',
      order: 1,
      notes: '',
      injects: config?.mode === 'real' ? [] : [
        {
          id: 'inject-1',
          title: 'Alerte Antivirus',
          description: 'Alerte déclenchée par l\'antivirus sur plusieurs postes de travail',
          plannedAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
          phaseId: 'P1'
        }
      ],
      checklist: [
        { id: 'p1-1', text: 'Vérifier les alertes de sécurité en cours', category: 'operational', status: 'todo', owner: 'RSSI', attachments: [] },
        { id: 'p1-2', text: 'Analyser les logs système', category: 'operational', status: 'todo', owner: 'ITOps', attachments: [] },
        { id: 'p1-3', text: 'Identifier la source de l\'incident', category: 'operational', status: 'todo', owner: 'RSSI', attachments: [] },
        { id: 'p1-4', text: 'Évaluer l\'ampleur de l\'incident', category: 'strategic', status: 'todo', owner: 'IncidentManager', attachments: [] },
        { id: 'p1-5', text: 'Notifier l\'équipe de crise', category: 'strategic', status: 'todo', owner: 'IncidentManager', attachments: [] }
      ]
    },
    {
      id: 'P2',
      title: 'Phase 2 - Qualification',
      order: 2,
      notes: '',
      injects: config?.mode === 'real' ? [] : [
        {
          id: 'inject-2',
          title: 'Confirmation Ransomware',
          description: 'Analyse confirmant la présence d\'un ransomware sur le réseau',
          plannedAt: new Date(Date.now() + 20 * 60 * 1000).toISOString(),
          phaseId: 'P2'
        }
      ],
      checklist: [
        { id: 'p2-1', text: 'Classifier l\'incident selon la grille ANSSI', category: 'operational', status: 'todo', owner: 'RSSI', attachments: [] },
        { id: 'p2-2', text: 'Identifier les systèmes impactés', category: 'operational', status: 'todo', owner: 'ITOps', attachments: [] },
        { id: 'p2-3', text: 'Évaluer le niveau de criticité', category: 'strategic', status: 'todo', owner: 'IncidentManager', attachments: [] },
        { id: 'p2-4', text: 'Déterminer la stratégie de réponse', category: 'strategic', status: 'todo', owner: 'IncidentManager', attachments: [] },
        { id: 'p2-5', text: 'Activer la cellule de crise', category: 'strategic', status: 'todo', owner: 'Exec', attachments: [] }
      ]
    },
    {
      id: 'P3',
      title: 'Phase 3 - Remédiation',
      order: 3,
      notes: '',
      injects: config?.mode === 'real' ? [] : [
        {
          id: 'inject-3',
          title: 'Demande de Rançon',
          description: 'Réception d\'un message de demande de rançon avec menaces de publication',
          plannedAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          phaseId: 'P3'
        }
      ],
      checklist: [
        { id: 'p3-1', text: 'Isoler les systèmes compromis', category: 'operational', status: 'todo', owner: 'ITOps', attachments: [] },
        { id: 'p3-2', text: 'Préserver les preuves forensiques', category: 'operational', status: 'todo', owner: 'RSSI', attachments: [] },
        { id: 'p3-3', text: 'Activer le plan de continuité', category: 'strategic', status: 'todo', owner: 'IncidentManager', attachments: [] },
        { id: 'p3-4', text: 'Communiquer en interne', category: 'strategic', status: 'todo', owner: 'Comms', attachments: [] },
        { id: 'p3-5', text: 'Notifier les autorités (ANSSI, CNIL)', category: 'strategic', status: 'todo', owner: 'Legal', attachments: [] },
        { id: 'p3-6', text: 'Restaurer les systèmes critiques', category: 'operational', status: 'todo', owner: 'ITOps', attachments: [] }
      ]
    },
    {
      id: 'P4',
      title: 'Phase 4 - Retour d\'Expérience',
      order: 4,
      notes: '',
      injects: [],
      checklist: [
        { id: 'p4-1', text: 'Documenter la chronologie complète', category: 'strategic', status: 'todo', owner: 'IncidentManager', attachments: [] },
        { id: 'p4-2', text: 'Analyser les points de défaillance', category: 'operational', status: 'todo', owner: 'RSSI', attachments: [] },
        { id: 'p4-3', text: 'Identifier les améliorations', category: 'strategic', status: 'todo', owner: 'IncidentManager', attachments: [] },
        { id: 'p4-4', text: 'Mettre à jour les procédures', category: 'operational', status: 'todo', owner: 'RSSI', attachments: [] },
        { id: 'p4-5', text: 'Planifier les formations', category: 'strategic', status: 'todo', owner: 'Exec', attachments: [] },
        { id: 'p4-6', text: 'Communication post-incident', category: 'strategic', status: 'todo', owner: 'Comms', attachments: [] }
      ]
    }
  ];

  return {
    id: 'crisis-' + Date.now(),
    title: config?.title || 'Exercice de Crise Cyber - Ransomware',
    description: config?.description || 'Exercice de simulation d\'une attaque par ransomware selon les recommandations ANSSI',
    mode: config?.mode || 'exercise',
    severity: config?.severity || 'moderate',
    objectives: [
      'Tester la réactivité de l\'équipe de crise',
      'Valider les procédures de gestion d\'incident',
      'Évaluer la communication interne et externe',
      'Vérifier l\'efficacité du plan de continuité'
    ],
    rules: [
      'Respecter la chronologie des injects',
      'Documenter toutes les décisions prises',
      'Communiquer de manière transparente',
      'Privilégier la sécurité des données'
    ],
    keyContacts: [
      { role: 'RSSI', name: 'Jean Dupont', contact: 'jean.dupont@entreprise.fr' },
      { role: 'IT Ops Manager', name: 'Marie Martin', contact: 'marie.martin@entreprise.fr' },
      { role: 'DPO', name: 'Pierre Durand', contact: 'pierre.durand@entreprise.fr' },
      { role: 'Directeur Général', name: 'Sophie Leblanc', contact: 'sophie.leblanc@entreprise.fr' }
    ],
    phases,
    actions: [],
    decisions: [],
    communications: [],
    journal: [
      {
        id: 'journal-init',
        kind: 'note',
        at: now,
        summary: 'Exercice de crise initialisé',
        details: 'Configuration initiale de l\'exercice de gestion de crise cyber'
      }
    ],
    resources: [
      {
        id: 'resource-1',
        title: 'Guide ANSSI - Gestion de crise cyber',
        type: 'link',
        url: 'https://www.ssi.gouv.fr/',
        addedAt: now
      }
    ],
    users: [
      {
        id: 'user-1',
        name: 'Jean Dupont',
        email: 'jean.dupont@entreprise.fr',
        role: 'RSSI',
        active: true
      }
    ],
    settings: {
      encryptData: false,
      autoSave: true,
      notificationsEnabled: true,
      timezone: 'Europe/Paris',
      customPhases: false
    }
  };
}