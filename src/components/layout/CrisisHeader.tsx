import { useState, useEffect } from "react";
import { Clock, Play, Pause, Square, Download, AlertTriangle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SeverityLevel, CrisisMode } from "@/types/crisis";

interface CrisisHeaderProps {
  title: string;
  severity: SeverityLevel;
  mode: CrisisMode;
  onExport: () => void;
  timerState: {
    isRunning: boolean;
    startTime?: number;
    pausedDuration: number;
  };
  onTimerStart: () => void;
  onTimerPause: () => void;
  onTimerReset: () => void;
}

const severityConfig = {
  low: { label: "Faible", className: "bg-success text-success-foreground" },
  moderate: { label: "Modéré", className: "bg-warning text-warning-foreground" },
  high: { label: "Élevé", className: "bg-severity-high text-white" },
  critical: { label: "Critique", className: "bg-severity-critical text-white" }
};

export function CrisisHeader({
  title,
  severity,
  mode,
  onExport,
  timerState,
  onTimerStart,
  onTimerPause,
  onTimerReset
}: CrisisHeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      
      if (timerState.isRunning && timerState.startTime) {
        setElapsedTime(Date.now() - timerState.startTime + timerState.pausedDuration);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timerState.isRunning, timerState.startTime, timerState.pausedDuration]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      timeZone: 'Europe/Paris',
      hour12: false
    });
  };

  const formatElapsed = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
    }
    return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
  };

  const severityStyle = severityConfig[severity];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="flex items-center gap-3">
            {mode === 'real' ? (
              <Shield className="h-6 w-6 text-destructive" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-primary" />
            )}
            <h1 className="heading-crisis">{title}</h1>
            <Badge className={severityStyle.className}>
              {severityStyle.label}
            </Badge>
            <Badge variant={mode === 'real' ? 'destructive' : 'secondary'}>
              {mode === 'real' ? 'RÉEL' : 'EXERCICE'}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Current Time */}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-mono">
              {formatTime(currentTime)}
            </span>
          </div>

          {/* Timer - Exercise mode only */}
          {mode === 'exercise' && (
            <div className="flex items-center gap-3 border-l border-border pl-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Durée:</span>
                <span className="text-sm font-mono font-medium">
                  {formatElapsed(elapsedTime)}
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                {!timerState.isRunning ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onTimerStart}
                    className="h-8 w-8 p-0"
                  >
                    <Play className="h-3 w-3" />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onTimerPause}
                    className="h-8 w-8 p-0"
                  >
                    <Pause className="h-3 w-3" />
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onTimerReset}
                  className="h-8 w-8 p-0"
                >
                  <Square className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          {/* Export Button */}
          <Button
            variant="default"
            size="sm"
            onClick={onExport}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>
    </header>
  );
}