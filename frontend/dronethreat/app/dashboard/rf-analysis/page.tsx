'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Radio, AlertTriangle, FileText, Wifi } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatusCard from '@/components/StatusCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

// Extend NetworkData with calculated distance
interface NetworkData {
  ssid: string;
  rssi: number;
  channel: number;
  encryption: string;
  distance: number;
  x: number;
  y: number;
}

// Threat-like interface for network risks
interface NetworkThreat {
  id: string;
  type: string;
  location: string;
  confidence: number;
  timestamp: string;
  status: 'active' | 'monitoring' | 'neutralized';
}

export default function CyberSecurityNetworkScanner() {
  const [networks, setNetworks] = useState<NetworkData[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanTime, setScanTime] = useState<string | null>(null);

  // Calculate network positioning and distance
  const calculateNetworkPositioning = (networks: Omit<NetworkData, 'x' | 'y' | 'distance'>[]): NetworkData[] => {
    return networks.map((network, index) => {
      // Calculate distance based on signal strength (RSSI)
      // Closer networks (stronger signal) will have lower distance values
      const distance = Math.abs(network.rssi) / 10;
      
      // Calculate x and y positions in a circular pattern
      const angle = (index / networks.length) * 2 * Math.PI;
      const radius = distance; // Use distance as radius
      
      return {
        ...network,
        distance,
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle)
      };
    });
  };

  // Simulate network threats based on scanned networks
  const generateNetworkThreats = (networks: NetworkData[]): NetworkThreat[] => {
    return networks.map((network, index) => ({
      id: `net-${index + 1}`,
      type: network.encryption === 'Open' ? 'Unsecured Network' : 
             network.encryption === 'WEP' ? 'Weak Encryption' : 
             'Potential Network',
      location: network.ssid,
      confidence: Math.floor(Math.random() * 100),
      timestamp: new Date().toLocaleTimeString(),
      status: network.encryption === 'Open' ? 'active' : 
              network.encryption === 'WEP' ? 'monitoring' : 
              'neutralized'
    }));
  };

  // Scan networks from ESP32
  const scanNetworks = async () => {
    setIsScanning(true);
    setError(null);

    try {
      // Adjust the IP address to match your ESP32's IP
      const response = await fetch('http://172.16.45.38/scan', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(10000)
      });

      if (!response.ok) {
        throw new Error('Network scan failed');
      }

      const data = await response.json();
      
      // Validate and transform network data
      const validNetworks = calculateNetworkPositioning(
        data.networks.map((network: any) => ({
          ssid: network.ssid || 'Unknown Network',
          rssi: network.rssi || 0,
          channel: network.channel || 0,
          encryption: network.encryption || 'Unknown'
        }))
      );

      setNetworks(validNetworks);
      setScanTime(new Date().toLocaleString());
    } catch (err) {
      console.error('Network scan error:', err);
      setError('Network scan failed. Check ESP32 connection and network settings.');
    } finally {
      setIsScanning(false);
    }
  };

  // Generate network threats based on scanned networks
  const networkThreats = generateNetworkThreats(networks);

  return (
    <div className="p-20 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Network Reconnaissance</h1>
          <p className="text-muted-foreground mt-1">Wireless Network Intelligence</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatusCard 
          title="Scanned Networks" 
          value={networks.length.toString()} 
          icon={<Radio className="h-5 w-5" />} 
          description={`${networks.filter(n => n.encryption === 'Open').length} unsecured`} 
          trend={{ value: networks.length, isPositive: networks.length > 0 }} 
        />
        <StatusCard 
          title="Network Threats" 
          value={networkThreats.filter(t => t.status === 'active').length.toString()} 
          icon={<AlertTriangle className="h-5 w-5" />} 
          description="Potential security risks" 
          trend={{ value: networkThreats.filter(t => t.status === 'active').length, isPositive: false }} 
        />
        <StatusCard 
          title="Last Scan" 
          value={scanTime ? new Date(scanTime).toLocaleTimeString() : 'N/A'} 
          icon={<Shield className="h-5 w-5" />} 
          description="Scan timestamp" 
          trend={{ value: 0.5, isPositive: true }} 
        />
        <StatusCard 
          title="Scan History" 
          value="4" 
          icon={<FileText className="h-5 w-5" />} 
          description="Total network scans" 
          trend={{ value: 2, isPositive: true }} 
        />
      </div>
      
      <div className="flex justify-center mb-6">
        <Button 
          onClick={scanNetworks} 
          disabled={isScanning}
          className="w-full max-w-md"
        >
          {isScanning ? 'Scanning Networks...' : 'Initiate Network Scan'}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6 text-center">
          {error}
        </div>
      )}

      {networks.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Network Information Grid */}
          <div className="bg-muted rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Detailed Network Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {networks.map((network, index) => (
                <div key={index} className="bg-background border rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Wifi className="mr-2 h-5 w-5 text-blue-500" />
                    <h4 className="font-semibold">{network.ssid}</h4>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Channel:</span> {network.channel}
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Signal:</span> {network.rssi} dBm
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Encryption:</span> {network.encryption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2D Network Positioning Visualization */}
          <div className="bg-muted rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Network Spatial Distribution</h3>
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid />
                  <XAxis type="number" dataKey="x" name="X Position" />
                  <YAxis type="number" dataKey="y" name="Y Position" />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-background border rounded-lg p-4 shadow-lg">
                            <p className="font-bold">{data.ssid}</p>
                            <p>Signal: {data.rssi} dBm</p>
                            <p>Channel: {data.channel}</p>
                            <p>Encryption: {data.encryption}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter 
                    name="Networks" 
                    data={networks} 
                    fill="#8884d8"
                    // Adjust dot size based on signal strength
                    shape={(props: { x?: number; y?: number; payload?: NetworkData }) => {
                      const size = Math.max(10, 30 - Math.abs(props.payload?.rssi || 0));
                      return (
                        <circle 
                          cx={props.x} 
                          cy={props.y} 
                          r={size / 3} 
                          fill={
                            props.payload?.encryption === 'Open' ? 'red' : 
                            props.payload?.encryption === 'WEP' ? 'orange' : 
                            'green'
                          }
                          opacity={0.7}
                        />
                      );
                    }}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}