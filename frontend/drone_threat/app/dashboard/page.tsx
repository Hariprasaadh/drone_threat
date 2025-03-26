"use client"
import React, { useState } from 'react';
import { User, MapPin, Plane, Database, Play } from 'lucide-react';

const DroneDashboard = () => {
  // Mock data - you'll replace this with actual drone data
  const [selectedDrone, setSelectedDrone] = useState({
    id: 'DR-001',
    status: 'Active',
    battery: 85,
    speed: 12.5,
    altitude: 120,
    trajectory: [
      { lat: 37.7749, lng: -122.4194 },
      { lat: 37.7850, lng: -122.4074 },
      { lat: 37.7920, lng: -122.4030 }
    ]
  });

  return (
    <div className="bg-black text-white min-h-screen p-4 flex">
      {/* Sidebar */}
      <div className="w-16 bg-gray-900 flex flex-col items-center py-4">
        <div className="mb-4">
          <User className="text-gray-400 hover:text-white cursor-pointer" />
        </div>
        <div>
          <span className="text-xs text-gray-500 transform -rotate-90">John Doe</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col ml-4">
        {/* Top Section - Product Name */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-white">DroneTrack Pro</h1>
        </div>

        {/* Feed and Create New Feed */}
        <div className="mb-4 flex items-center">
          <span className="mr-4 text-gray-400">Live Feed</span>
          <button className="bg-blue-600 text-white px-3 py-1 rounded flex items-center">
            <Play size={16} className="mr-2" />
            Create New Feed
          </button>
        </div>

        {/* Center Content */}
        <div className="flex-grow grid grid-cols-2 gap-4">
          {/* Google Maps Placeholder */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <MapPin className="mr-2 text-green-500" />
              <h2 className="text-lg">Drone Location</h2>
            </div>
            <div className="h-96 bg-gray-700 flex items-center justify-center">
              Google Maps Placeholder
            </div>
          </div>

          {/* Drone Data and Trajectory */}
          <div className="flex flex-col">
            {/* Drone Trajectory */}
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex items-center mb-2">
                <Plane className="mr-2 text-blue-500" />
                <h2 className="text-lg">Drone Trajectory</h2>
              </div>
              <div className="h-48 bg-gray-700 rounded flex items-center justify-center">
                Trajectory Visualization
              </div>
            </div>

            {/* Drone Details */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Database className="mr-2 text-purple-500" />
                <h2 className="text-lg">Drone Details</h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-gray-400">Drone ID</p>
                  <p>{selectedDrone.id}</p>
                </div>
                <div>
                  <p className="text-gray-400">Status</p>
                  <p className="text-green-500">{selectedDrone.status}</p>
                </div>
                <div>
                  <p className="text-gray-400">Battery</p>
                  <p>{selectedDrone.battery}%</p>
                </div>
                <div>
                  <p className="text-gray-400">Speed</p>
                  <p>{selectedDrone.speed} m/s</p>
                </div>
                <div>
                  <p className="text-gray-400">Altitude</p>
                  <p>{selectedDrone.altitude} m</p>
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