'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, Search, Plane, AlertOctagon, Shield, Circle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import StatusCard from '@/components/StatusCard';
import { Button } from '@/components/ui/button';

// Define types for protected zones and drone path
interface ProtectedZone {
  id: number;
  coordinates: [number, number][];
  name: string;
}

interface DroneStatus {
  battery: number;
  speed: number;
  altitude: number;
}

export default function DroneNavigationSystem() {
  const [position, setPosition] = useState([13.0837, 80.2707]); // Default to Chennai
  const [dronePath, setDronePath] = useState<[number, number][]>([]);
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [droneStatus, setDroneStatus] = useState<DroneStatus>({
    battery: 100,
    speed: 0,
    altitude: 0
  });
  const [protectedZones, setProtectedZones] = useState<ProtectedZone[]>([
    {
      id: 1,
      name: "Airport Restricted Zone",
      coordinates: [
        [13.0900, 80.2650],
        [13.0950, 80.2650],
        [13.0950, 80.2750],
        [13.0900, 80.2750]
      ]
    },
    {
      id: 2,
      name: "Government Complex",
      coordinates: [
        [13.0750, 80.2800],
        [13.0800, 80.2800],
        [13.0800, 80.2850],
        [13.0750, 80.2850]
      ]
    }
  ]);

  // Create custom drone icon
  const droneIcon = L.icon({
    iconUrl: '/drone.png',
    iconSize: [25, 25], // Size of the icon
    iconAnchor: [25, 25], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -25] // Point from which the popup should open relative to the iconAnchor
  });

  // Advanced path generation with more realistic constraints
  const generateAdvancedPath = useCallback(() => {
    const startPoint: [number, number] = [position[0], position[1]];
    const path: [number, number][] = [startPoint];
    const pathLength = 10; // Increased path segments
    const maxDistanceBetweenPoints = 0.02; // Maximum distance between points
    const maxElevationChange = 50; // Maximum altitude change (meters)

    for (let i = 0; i < pathLength; i++) {
      const lastPoint = path[path.length - 1];
      
      // More controlled random offset
      const latOffset = (Math.random() - 0.5) * maxDistanceBetweenPoints * 2;
      const lonOffset = (Math.random() - 0.5) * maxDistanceBetweenPoints * 2;

      const newPoint: [number, number] = [
        lastPoint[0] + latOffset,
        lastPoint[1] + lonOffset
      ];

      // Advanced collision detection
      const isInProtectedZone = protectedZones.some(zone => 
        isPointInPolygon(newPoint, zone.coordinates)
      );

      if (!isInProtectedZone) {
        path.push(newPoint);
      } else {
        // Intelligent rerouting
        const alternatePoint: [number, number] = [
          newPoint[0] + (Math.random() - 0.5) * 0.01,
          newPoint[1] + (Math.random() - 0.5) * 0.01
        ];
        
        if (!protectedZones.some(zone => isPointInPolygon(alternatePoint, zone.coordinates))) {
          path.push(alternatePoint);
        } else {
          i--; // Retry generating a point
        }
      }
    }

    setDronePath(path);
    setCurrentPathIndex(0);
    setIsNavigating(false);
    
    // Reset drone status
    setDroneStatus({
      battery: 100,
      speed: 0,
      altitude: 0
    });
  }, [position, protectedZones]);

  // Simulated drone movement
  useEffect(() => {
    if (!isNavigating || currentPathIndex >= dronePath.length - 1) return;

    const movementInterval = setInterval(() => {
      if (currentPathIndex < dronePath.length - 1) {
        const currentPoint = dronePath[currentPathIndex];
        const nextPoint = dronePath[currentPathIndex + 1];

        // Interpolate position
        const interpolationFactor = 0.1;
        const newPosition: [number, number] = [
          currentPoint[0] + (nextPoint[0] - currentPoint[0]) * interpolationFactor,
          currentPoint[1] + (nextPoint[1] - currentPoint[1]) * interpolationFactor
        ];

        setPosition(newPosition);
        setCurrentPathIndex(prev => prev + 1);

        // Update drone status dynamically
        setDroneStatus(prev => ({
          battery: Math.max(0, prev.battery - 1),
          speed: Math.round(Math.random() * 20 + 10), // Random speed between 10-30
          altitude: Math.round(Math.random() * 100) // Random altitude between 0-100m
        }));
      } else {
        setIsNavigating(false);
      }
    }, 500); // Adjust speed of movement

    return () => clearInterval(movementInterval);
  }, [isNavigating, currentPathIndex, dronePath]);

  // Point-in-polygon algorithm (unchanged)
  const isPointInPolygon = (point: [number, number], polygon: [number, number][]) => {
    let inside = false;
    const x = point[0], y = point[1];
    
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0], yi = polygon[i][1];
      const xj = polygon[j][0], yj = polygon[j][1];
      
      const intersect = ((yi > y) !== (yj > y)) &&
        (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      
      if (intersect) inside = !inside;
    }
    
    return inside;
  };

  return (
    <div className="p-20 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Advanced Drone Navigation System</h1>
          <p className="text-muted-foreground mt-1">Intelligent Path Planning & Real-time Tracking</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatusCard 
          title="Drone Location" 
          value={`${position[0].toFixed(4)}, ${position[1].toFixed(4)}`} 
          icon={<Plane className="h-5 w-5" />} 
          description="Current Coordinates" 
          trend={{ value: 0.5, isPositive: true }} 
        />
        <StatusCard 
          title="Battery" 
          value={`${droneStatus.battery}%`} 
          icon={<Circle className="h-5 w-5" />} 
          description="Remaining Power" 
          trend={{ 
            value: droneStatus.battery, 
            isPositive: droneStatus.battery > 50 
          }} 
        />
        <StatusCard 
          title="Speed" 
          value={`${droneStatus.speed} km/h`} 
          icon={<AlertOctagon className="h-5 w-5" />} 
          description="Current Velocity" 
          trend={{ value: droneStatus.speed, isPositive: true }} 
        />
        <StatusCard 
          title="Altitude" 
          value={`${droneStatus.altitude} m`} 
          icon={<MapPin className="h-5 w-5" />} 
          description="Elevation" 
          trend={{ value: droneStatus.altitude, isPositive: true }} 
        />
      </div>
      
      <div className="flex justify-center mb-6 space-x-4">
        <Button 
          onClick={generateAdvancedPath} 
          className="w-auto"
          variant="outline"
        >
          Generate New Path
        </Button>
        <Button 
          onClick={() => setIsNavigating(true)} 
          disabled={dronePath.length === 0 || isNavigating}
          className="w-auto"
        >
          Start Navigation
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Drone Navigation Map */}
        <div className="bg-muted rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Drone Navigation Map</h3>
          <div className="w-full h-[400px]">
            <MapContainer 
              center={position} 
              zoom={13} 
              scrollWheelZoom={false} 
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {/* Marker for current drone position with custom icon */}
              <Marker 
                position={position} 
                icon={droneIcon}
              >
                <Popup>Current Drone Position</Popup>
              </Marker>

              {/* Protected Zones */}
              {protectedZones.map((zone) => (
                <Polygon 
                  key={zone.id}
                  positions={zone.coordinates} 
                  color="red" 
                  fillColor="red"
                  fillOpacity={0.2}
                >
                  <Popup>{zone.name}</Popup>
                </Polygon>
              ))}

              {/* Drone Path */}
              {dronePath.length > 1 && (
                <Polyline 
                  positions={dronePath} 
                  color="blue" 
                  weight={3}
                  dashArray="10, 10"
                />
              )}
            </MapContainer>
          </div>
        </div>

        {/* Protected Zones List */}
        <div className="bg-muted rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Protected Zones</h3>
          <div className="space-y-2">
            {protectedZones.map((zone) => (
              <div 
                key={zone.id} 
                className="bg-background border rounded-lg p-3 flex items-center"
              >
                <Shield className="mr-2 h-5 w-5 text-red-500" />
                <span className="text-sm">{zone.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}