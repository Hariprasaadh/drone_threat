'use client';

import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Radio, FileText, Sun, Moon } from 'lucide-react';
import StatusCard from '@/components/StatusCard';
import ThreatCard from '@/components/ThreatCard';
import RFSignalChart from '@/components/RFSignalChart';
import SecurityLogTable from '@/components/SecurityLogTable';
import ThreeDroneView from '@/components/ThreeDroneView';
import BlockchainStatus from '@/components/BlockchainStatus';
import ThreatMap from '@/components/ThreatMap';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Threat } from '@/components/ThreatCard';
import { LogEntry } from '@/components/SecurityLogTable';
import { BlockchainRecord } from '@/components/BlockchainStatus';
import { Button } from '@/components/ui/button';

const mockThreats: Threat[] = [
  { id: '1', type: 'Surveillance Drone', location: 'NE Perimeter', confidence: 87, timestamp: '08:42:15', status: 'active' },
  { id: '2', type: 'Unknown UAV', location: 'SW Quadrant', confidence: 64, timestamp: '07:18:33', status: 'monitoring' },
  { id: '3', type: 'Military Class Drone', location: 'East Sector', confidence: 92, timestamp: '09:01:05', status: 'active' },
  { id: '4', type: 'Commercial Drone', location: 'West Boundary', confidence: 45, timestamp: '06:55:12', status: 'neutralized' },
];

const mockLogs: LogEntry[] = [
  { id: '1', event: 'Intrusion Detected', severity: 'critical', source: 'Perimeter Sensor', timestamp: '09:01:05' },
  { id: '2', event: 'Signal Jamming Attempt', severity: 'warning', source: 'RF Shield', timestamp: '08:45:21' },
  { id: '3', event: 'System Scan Complete', severity: 'info', source: 'Security Module', timestamp: '08:30:00' },
];

const mockBlockchain: BlockchainRecord[] = [
  { id: '1', hash: '0x7f2c3d4e5f6...', status: 'verified', timestamp: '09:01:05', size: '1.2 MB' },
  { id: '2', hash: '0x1a2b3c4d5e6...', status: 'pending', timestamp: '08:45:21', size: '2.5 MB' },
];

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  
  return (
    <div className="p-20 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Security Dashboard</h1>
          <p className="text-muted-foreground mt-1">Live Threat Intelligence & System Status</p>
        </div>
       
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatusCard title="Active Threats" value="5" icon={<AlertTriangle className="h-5 w-5" />} description="2 critical incidents" trend={{ value: 40, isPositive: false }} />
        <StatusCard title="RF Signals" value="27" icon={<Radio className="h-5 w-5" />} description="3 unknown signatures" trend={{ value: 12, isPositive: false }} />
        <StatusCard title="System Integrity" value="98.7%" icon={<Shield className="h-5 w-5" />} description="Last scan: 10m ago" trend={{ value: 0.5, isPositive: true }} />
        <StatusCard title="Log Entries" value="124" icon={<FileText className="h-5 w-5" />} description="15 security events" trend={{ value: 8, isPositive: true }} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <ThreatMap />
        <div className="flex flex-col space-y-6">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              <TabsTrigger value="neutralized">Neutralized</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-0 space-y-4">
              {mockThreats.filter(threat => threat.status === 'active').map(threat => <ThreatCard key={threat.id} threat={threat} />)}
            </TabsContent>
            <TabsContent value="monitoring" className="mt-0 space-y-4">
              {mockThreats.filter(threat => threat.status === 'monitoring').map(threat => <ThreatCard key={threat.id} threat={threat} />)}
            </TabsContent>
            <TabsContent value="neutralized" className="mt-0 space-y-4">
              {mockThreats.filter(threat => threat.status === 'neutralized').map(threat => <ThreatCard key={threat.id} threat={threat} />)}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RFSignalChart />
        <ThreeDroneView />
        <BlockchainStatus records={mockBlockchain} />
      </div>
      
      <div className="mt-6">
        <SecurityLogTable logs={mockLogs} />
      </div>
    </div>
  );
}
