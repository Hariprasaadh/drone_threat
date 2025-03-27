
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BlockchainRecord {
  id: string;
  hash: string;
  status: 'verified' | 'pending' | 'failed';
  timestamp: string;
  size: string;
}

interface BlockchainStatusProps {
  records: BlockchainRecord[];
}

const BlockchainStatus: React.FC<BlockchainStatusProps> = ({ records }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Blockchain Storage</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {records.map((record) => (
            <div 
              key={record.id}
              className="p-3 bg-card border border-border rounded-md flex items-center justify-between animate-fade-in"
            >
              <div className="flex items-center space-x-3">
                {getStatusIcon(record.status)}
                <div>
                  <p className="text-xs font-medium truncate max-w-[150px]">{record.hash}</p>
                  <p className="text-xs text-muted-foreground">{record.timestamp}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{record.size}</p>
                <p className={cn(
                  "text-xs font-medium",
                  record.status === 'verified' && "text-success",
                  record.status === 'pending' && "text-warning",
                  record.status === 'failed' && "text-destructive"
                )}>
                  {record.status}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Consensus level</span>
          <span className="font-medium">98.3%</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlockchainStatus;
