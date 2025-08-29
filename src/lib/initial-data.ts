import { CrisisExercise, Phase } from '@/types/crisis';

export function createInitialExercise(): CrisisExercise {
  const now = new Date().toISOString();
  
  const phases: Phase[] = [
    {
      id: 'P1',
      title: 'Phase 1 - Détection',
      notes: '',
      injects: [
        {
          id: 'inject-1',
          title: 'Alerte Antivirus',
          description: 'Alerte déclenchée par l\'antivirus sur plusieurs postes de travail',
          plannedAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // +10 min
          phaseId: 'P1'
        }
      ],
      checklist: [
        {
          id: 'p1-1',
          text: 'Vérifier les alertes de sécurité en cours',
          status: 'todo',
          owner: 'RSSI'
        },
        {
          id: 'p1-2',
          text: 'Analyser les logs système',
          status: 'todo',
          owner: 'ITOps'
        },
        {
          id: 'p1-3',
          text: 'Identifier la source de l\'incident',
          status: 'todo',
          owner: 'RSSI'
        },
        {
          id: 'p1-4',
          text: 'Évaluer l\'ampleur de l\'incident',
          status: 'todo',
          owner: 'IncidentManager'
        },
        {
          id: 'p1-5',
          text: 'Notifier l\'équipe de crise',
          status: 'todo',
          owner: 'IncidentManager'
        }
      ]
    },
    {
      id: 'P2',
      title: 'Phase 2 - Qualification',
      notes: '',
      injects: [
        {
          id: 'inject-2',
          title: 'Confirmation Ransomware',
          description: 'Analyse confirmant la présence d\'un ransomware sur le réseau',
          plannedAt: new Date(Date.now() + 20 * 60 * 1000).toISOString(), // +20 min
          phaseId: 'P2'
        }
      ],
      checklist: [
        {
          id: 'p2-1',
          text: 'Classifier l\'incident selon la grille ANSSI',
          status: 'todo',
          owner: 'RSSI'
        },
        {
          id: 'p2-2',
          text: 'Identifier les systèmes impactés',
          status: 'todo',
          owner: 'ITOps'
        },
        {
          id: 'p2-3',
          text: 'Évaluer le niveau de criticité',
          status: 'todo',
          owner: 'IncidentManager'
        },
        {
          id: 'p2-4',
          text: 'Déterminer la stratégie de réponse',
          status: 'todo',
          owner: 'IncidentManager'
        },
        {
          id: 'p2-5',
          text: 'Activer la cellule de crise',
          status: 'todo',
          owner: 'Exec'
        }
      ]
    },
    {
      id: 'P3',
      title: 'Phase 3 - Remédiation',
      notes: '',
      injects: [
        {
          id: 'inject-3',
          title: 'Demande de Rançon',
          description: 'Réception d\'un message de demande de rançon avec menaces de publication',
          plannedAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // +30 min
          phaseId: 'P3'
        }
      ],
      checklist: [
        {
          id: 'p3-1',
          text: 'Isoler les systèmes compromis',
          status: 'todo',
          owner: 'ITOps'
        },
        {
          id: 'p3-2',
          text: 'Préserver les preuves forensiques',
          status: 'todo',
          owner: 'RSSI'
        },
        {
          id: 'p3-3',
          text: 'Activer le plan de continuité',
          status: 'todo',
          owner: 'IncidentManager'
        },
        {
          id: 'p3-4',
          text: 'Communiquer en interne',
          status: 'todo',
          owner: 'Comms'
        },
        {
          id: 'p3-5',
          text: 'Notifier les autorités (ANSSI, CNIL)',
          status: 'todo',
          owner: 'Legal'
        },
        {
          id: 'p3-6',
          text: 'Restaurer les systèmes critiques',
          status: 'todo',
          owner: 'ITOps'
        }
      ]
    },
    {
      id: 'P4',
      title: 'Phase 4 - Retour d\'Expérience',
      notes: '',
      injects: [],
      checklist: [
        {
          id: 'p4-1',
          text: 'Documenter la chronologie complète',
          status: 'todo',
          owner: 'IncidentManager'
        },
        {
          id: 'p4-2',
          text: 'Analyser les points de défaillance',
          status: 'todo',
          owner: 'RSSI'
        },
        {
          id: 'p4-3',
          text: 'Identifier les améliorations',
          status: 'todo',
          owner: 'IncidentManager'
        },
        {
          id: 'p4-4',
          text: 'Mettre à jour les procédures',
          status: 'todo',
          owner: 'RSSI'
        },
        {
          id: 'p4-5',
          text: 'Planifier les formations',
          status: 'todo',
          owner: 'Exec'
        },
        {
          id: 'p4-6',
          text: 'Communication post-incident',
          status: 'todo',
          owner: 'Comms'
        }
      ]
    }
  ];

  return {
    id: 'crisis-' + Date.now(),
    title: 'Exercice de Crise Cyber - Ransomware',
    description: 'Exercice de simulation d\'une attaque par ransomware selon les recommandations ANSSI',
    severity: 'moderate',
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
      },
      {
        id: 'resource-2',
        title: 'Procédure interne de gestion d\'incident',
        type: 'note',
        content: 'Document interne décrivant les étapes de gestion d\'incident',
        addedAt: now
      }
    ]
  };
}