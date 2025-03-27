
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

export interface Threat {
  id: string;
  type: string;
  location: string;
  confidence: number;
  timestamp: string;
  status: 'active' | 'neutralized' | 'monitoring';
}

interface ThreatCardProps {
  threat: Threat;
}

const ThreatCard: React.FC<ThreatCardProps> = ({ threat }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-destructive text-destructive-foreground';
      case 'neutralized':
        return 'bg-success text-success-foreground';
      case 'monitoring':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-destructive';
    if (confidence >= 50) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200 animate-fade-in">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">{threat.type}</CardTitle>
        <Badge className={cn("uppercase text-[10px] font-medium", getStatusColor(threat.status))}>
          {threat.status}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Location</span>
            <span className="text-xs font-medium">{threat.location}</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Confidence</span>
              <span className={cn("text-xs font-medium", getConfidenceColor(threat.confidence))}>
                {threat.confidence}%
              </span>
            </div>
            <Progress value={threat.confidence} className="h-1" />
          </div>
          <div className="pt-1 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Detected</span>
            <span className="text-xs">{threat.timestamp}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatCard;
