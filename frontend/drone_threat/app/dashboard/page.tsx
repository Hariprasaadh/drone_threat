"use client"
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { 
  User, MapPin, Plane, Database, ListVideo, Plus, 
  Battery, Signal, CloudCog, Clock, Cpu, Router, 
  ArrowUpRight, Target, Navigation, Wind, Thermometer,
  Compass, RadioTower, Waves
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const DroneDashboard = () => {
  // Fetch user information from Clerk
  const { user } = useUser();

  // State for managing feeds
  const [feeds, setFeeds] = useState<Array<{ id: string; videoURL: string; name: string }>>([]);
  const [selectedFeed, setSelectedFeed] = useState<{ id: string; videoURL: string; name: string; } | null>(null);
  const [selectedDrone, setSelectedDrone] = useState({
    id: 'DR-001',
    status: 'Active',
    battery: 85,
    speed: 12.5,
    altitude: 120,
    signal: 92,
    temperature: 28,
    flightTime: 45,
    windSpeed: 3.2,
    humidity: 45,
    trajectory: [
      { lat: 37.7749, lng: -122.4194 },
      { lat: 37.7850, lng: -122.4074 },
      { lat: 37.7920, lng: -122.4030 }
    ],
    currentLocation: { lat: 37.7749, lng: -122.4194 }
  });

  // Optional: Update drone location periodically (simulated)
  useEffect(() => {
    const locationUpdateInterval = setInterval(() => {
      // Simulate slight movement of drone
      setSelectedDrone(prev => ({
        ...prev,
        currentLocation: {
          lat: prev.currentLocation.lat + (Math.random() - 0.5) * 0.01,
          lng: prev.currentLocation.lng + (Math.random() - 0.5) * 0.01
        }
      }));
    }, 5000);

    return () => clearInterval(locationUpdateInterval);
  }, []);

  // Handle creating a new feed
  const handleCreateNewFeed = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      const newFeed = {
        id: `Feed-${feeds.length + 1}`,
        videoURL: URL.createObjectURL(file),
        name: file.name
      };
      setFeeds([...feeds, newFeed]);
      // Automatically select the new feed
      setSelectedFeed(newFeed);
    } else {
      alert('Please select a valid video file');
    }
  };

  // Get username, defaulting to a placeholder if not available
  const username = user?.fullName || user?.username || 'User';

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen flex">
      {/* Sidebar */}
      <div className="w-96 bg-gray-800/70 backdrop-blur-sm flex flex-col border-r border-gray-700 shadow-2xl">
        {/* Product Name */}
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Router className="mr-2 text-blue-400" />
            DroneTrack Pro
          </h1>
          <span className="text-sm bg-green-600 px-2 py-1 rounded">v1.2</span>
        </div>

        {/* Create New Feed Section */}
        <div className="p-6 border-b border-gray-700">
          <input 
            type="file" 
            id="feedUpload" 
            accept="video/*" 
            className="hidden" 
            onChange={handleCreateNewFeed}
          />
          <label 
            htmlFor="feedUpload" 
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-3 rounded-lg flex items-center cursor-pointer justify-center shadow-lg"
          >
            <Plus size={20} className="mr-2" />
            Create New Feed
          </label>
        </div>

        {/* Feeds List */}
        <div className="flex-grow overflow-y-auto p-4">
          <div className="mb-4">
            <div className="flex items-center mb-4">
              <ListVideo className="mr-2 text-blue-500" />
              <h2 className="text-lg font-semibold">Recent Feeds</h2>
            </div>
            {feeds.length === 0 ? (
              <div className="text-gray-400 text-center py-6 border border-dashed border-gray-600 rounded-lg">
                <p>No feeds uploaded yet</p>
                <p className="text-sm mt-2">Upload a video to get started</p>
              </div>
            ) : (
              feeds.map((feed) => (
                <div 
                  key={feed.id} 
                  className={`mb-3 p-3 rounded-lg cursor-pointer flex items-center transition-all duration-200 ${
                    selectedFeed?.id === feed.id 
                    ? 'bg-blue-700 scale-105' 
                    : 'hover:bg-gray-700 hover:scale-[1.02]'
                  }`}
                  onClick={() => setSelectedFeed(feed)}
                >
                  <div className="w-16 h-12 bg-gray-700 rounded-md mr-3 overflow-hidden">
                    {/* Placeholder for video thumbnail */}
                  </div>
                  <div className="flex-grow">
                    <span className="truncate block font-medium">{feed.name}</span>
                    <span className="text-xs text-gray-400">Recently Added</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* User Section */}
        <div className="p-6 border-t border-gray-700 flex items-center">
          {user?.imageUrl ? (
            <img 
              src={user.imageUrl} 
              alt="User profile" 
              className="w-12 h-12 rounded-full mr-4 border-2 border-blue-500"
            />
          ) : (
            <User className="text-gray-400 hover:text-white cursor-pointer mr-4 w-12 h-12" />
          )}
          <div>
            <span className="block text-sm font-semibold">{username}</span>
            <span className="text-xs text-gray-400">Drone Operator</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow bg-transparent p-6 flex flex-col">
        {/* Selected Feed Preview */}
        {selectedFeed && (
          <div className="mb-6 bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-xl">
            <div className="flex items-center mb-4">
              <Plane className="mr-2 text-green-500" />
              <h2 className="text-xl font-semibold">Selected Feed</h2>
            </div>
            <video 
              src={selectedFeed.videoURL} 
              controls 
              className="w-full max-h-[500px] object-cover rounded-lg border-2 border-gray-700"
            />
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Drone Location Map */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 col-span-2 shadow-xl">
            <div className="flex items-center mb-4">
              <MapPin className="mr-2 text-green-500" />
              <h2 className="text-xl font-semibold">Drone Location</h2>
            </div>
            <div className="h-[500px] bg-gray-700 rounded-lg overflow-hidden">
              {typeof window !== 'undefined' && (
                <MapContainer 
                  center={[selectedDrone.currentLocation.lat, selectedDrone.currentLocation.lng]} 
                  zoom={13} 
                  scrollWheelZoom={false}
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[selectedDrone.currentLocation.lat, selectedDrone.currentLocation.lng]}>
                    <Popup>
                      Drone Location<br />
                      Lat: {selectedDrone.currentLocation.lat.toFixed(4)}<br />
                      Lng: {selectedDrone.currentLocation.lng.toFixed(4)}
                    </Popup>
                  </Marker>
                </MapContainer>
              )}
            </div>
          </div>

          {/* Drone Statistics */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-xl flex flex-col">
            <div className="flex items-center mb-4">
              <Database className="mr-2 text-purple-500" />
              <h2 className="text-xl font-semibold">Drone Metrics</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 rounded-lg p-4 flex flex-col items-center">
                <Battery className="text-blue-400 mb-2" />
                <span className="text-sm text-gray-400">Battery</span>
                <span className="font-bold text-lg">{selectedDrone.battery}%</span>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 flex flex-col items-center">
                <Signal className="text-green-400 mb-2" />
                <span className="text-sm text-gray-400">Signal</span>
                <span className="font-bold text-lg">{selectedDrone.signal}%</span>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 flex flex-col items-center">
                <Cpu className="text-red-400 mb-2" />
                <span className="text-sm text-gray-400">Speed</span>
                <span className="font-bold text-lg">{selectedDrone.speed} m/s</span>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 flex flex-col items-center">
                <Wind className="text-yellow-400 mb-2" />
                <span className="text-sm text-gray-400">Altitude</span>
                <span className="font-bold text-lg">{selectedDrone.altitude} m</span>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 flex flex-col items-center">
                <Thermometer className="text-orange-400 mb-2" />
                <span className="text-sm text-gray-400">Temp</span>
                <span className="font-bold text-lg">{selectedDrone.temperature}°C</span>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 flex flex-col items-center">
                <Waves className="text-cyan-400 mb-2" />
                <span className="text-sm text-gray-400">Wind</span>
                <span className="font-bold text-lg">{selectedDrone.windSpeed} m/s</span>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 flex flex-col items-center col-span-2">
                <Navigation className="text-indigo-400 mb-2" />
                <span className="text-sm text-gray-400">Flight Time</span>
                <span className="font-bold text-lg">{selectedDrone.flightTime} min</span>
              </div>
            </div>
          </div>

          {/* Trajectory and Additional Stats */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 col-span-2 shadow-xl">
            <div className="flex items-center mb-4">
              <Target className="mr-2 text-blue-500" />
              <h2 className="text-xl font-semibold">Flight Trajectory</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center">
                Trajectory Visualization
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-4 flex flex-col justify-center">
                  <span className="text-sm text-gray-400">Avg. Speed</span>
                  <span className="font-bold text-lg flex items-center">
                    12.3 m/s 
                    <ArrowUpRight className="text-green-500 ml-2" size={16} />
                  </span>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 flex flex-col justify-center">
                  <span className="text-sm text-gray-400">Humidity</span>
                  <span className="font-bold text-lg">{selectedDrone.humidity}%</span>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 flex flex-col justify-center col-span-2">
                  <span className="text-sm text-gray-400">Total Distance</span>
                  <span className="font-bold text-lg">3.5 km</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DroneDashboard;