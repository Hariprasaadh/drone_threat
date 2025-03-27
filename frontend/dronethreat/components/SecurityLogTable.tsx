
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

export interface LogEntry {
  id: string;
  event: string;
  severity: 'critical' | 'warning' | 'info';
  source: string;
  timestamp: string;
}

interface SecurityLogTableProps {
  logs: LogEntry[];
}

const SecurityLogTable: React.FC<SecurityLogTableProps> = ({ logs }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive/20 text-destructive border-destructive/50';
      case 'warning':
        return 'bg-warning/20 text-warning border-warning/50';
      case 'info':
        return 'bg-primary/20 text-primary border-primary/50';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Security Events</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto max-h-[240px]">
          <Table>
            <TableHeader className="bg-muted/50 sticky top-0">
              <TableRow>
                <TableHead className="w-[30%]">Event</TableHead>
                <TableHead className="w-[15%]">Severity</TableHead>
                <TableHead className="w-[25%]">Source</TableHead>
                <TableHead className="w-[30%] text-right">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id} className="hover:bg-muted/40 animate-fade-in">
                  <TableCell className="font-medium text-sm py-2">{log.event}</TableCell>
                  <TableCell className="py-2">
                    <Badge variant="outline" className={cn("uppercase text-[10px]", getSeverityColor(log.severity))}>
                      {log.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm py-2">{log.source}</TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground py-2">{log.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityLogTable;
