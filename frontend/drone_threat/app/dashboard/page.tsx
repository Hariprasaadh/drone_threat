"use client"
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { User, MapPin, Plane, Database, Play, ListVideo, Plus } from 'lucide-react';

const DroneDashboard = () => {
  // Fetch user information from Clerk
  const { user } = useUser();

  // State for managing feeds
  const [feeds, setFeeds] = useState<Array<{ id: string; videoURL: string; name: string }>>([]);
  const [selectedFeed, setSelectedFeed] = useState(null);
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
    <div className="bg-black text-white min-h-screen flex">
      {/* Sidebar */}
      <div className="w-72 bg-gray-900 flex flex-col">
        {/* Product Name */}
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold text-white">DroneTrack Pro</h1>
        </div>

        {/* Create New Feed Section */}
        <div className="p-4 border-b border-gray-800">
          <input 
            type="file" 
            id="feedUpload" 
            accept="video/*" 
            className="hidden" 
            onChange={handleCreateNewFeed}
          />
          <label 
            htmlFor="feedUpload" 
            className="bg-green-600 text-white px-3 py-2 rounded flex items-center cursor-pointer justify-center"
          >
            <Plus size={16} className="mr-2" />
            Create New Feed
          </label>
        </div>

        {/* Feeds List */}
        <div className="flex-grow overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center mb-4">
              <ListVideo className="mr-2 text-blue-500" />
              <h2 className="text-lg">Feeds</h2>
            </div>
            {feeds.length === 0 ? (
              <p className="text-gray-500 text-center">No feeds yet</p>
            ) : (
              feeds.map((feed) => (
                <div 
                  key={feed.id} 
                  className={`mb-2 p-2 rounded cursor-pointer flex items-center ${
                    selectedFeed?.id === feed.id 
                    ? 'bg-blue-700' 
                    : 'hover:bg-gray-800'
                  }`}
                  onClick={() => setSelectedFeed(feed)}
                >
                  <div className="w-12 h-8 bg-gray-700 rounded mr-2">
                    {/* Placeholder for video thumbnail */}
                  </div>
                  <span className="truncate flex-grow">{feed.name}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* User Section */}
        <div className="p-4 border-t border-gray-800 flex items-center">
          {user?.imageUrl ? (
            <img 
              src={user.imageUrl} 
              alt="User profile" 
              className="w-10 h-10 rounded-full mr-2"
            />
          ) : (
            <User className="text-gray-400 hover:text-white cursor-pointer mr-2" />
          )}
          <span className="text-sm text-gray-300">{username}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow bg-black p-4 flex flex-col">
        {/* Selected Feed Preview */}
        {selectedFeed && (
          <div className="mb-4 bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg mb-2">Selected Feed</h2>
            <video 
              src={selectedFeed.videoURL} 
              controls 
              className="w-full max-h-80 object-cover rounded"
            />
          </div>
        )}

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