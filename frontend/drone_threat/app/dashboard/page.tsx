"use client"
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { User, MapPin, Plane, Database, Play, ListVideo, Plus } from 'lucide-react';
import { uploadFeedToCloudinary, saveFeedToDatabase } from './cloudinaryUtils';

const DroneDashboard = () => {
  // Fetch user information from Clerk
  const { user } = useUser();

  // State for managing feeds
  const [feeds, setFeeds] = useState<Array<{ 
    id: string; 
    videoURL: string; 
    name: string; 
    cloudinaryPublicId?: string 
  }>>([]);
  const [selectedFeed, setSelectedFeed] = useState<{ 
    id: string; 
    videoURL: string; 
    name: string; 
    cloudinaryPublicId?: string 
  } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Handle creating a new feed
  const handleCreateNewFeed = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('video/')) {
      alert('Please select a valid video file');
      return;
    }

    setIsUploading(true);

    try {
      // Upload to Cloudinary
      const { publicId, secureUrl } = await uploadFeedToCloudinary(file);

      // Save to database
      await saveFeedToDatabase({
        publicId,
        secureUrl,
        name: file.name,
        userId: user?.id || 'unknown'
      });

      // Create local feed object
      const newFeed = {
        id: publicId,
        videoURL: secureUrl,
        name: file.name,
        cloudinaryPublicId: publicId
      };

      // Update feeds state
      setFeeds([...feeds, newFeed]);
      setSelectedFeed(newFeed);
    } catch (error) {
      console.error('Feed upload error:', error);
      alert('Failed to upload feed');
    } finally {
      setIsUploading(false);
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
            disabled={isUploading}
          />
          <label 
            htmlFor="feedUpload" 
            className={`
              ${isUploading 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 cursor-pointer'
              } 
              text-white px-3 py-2 rounded flex items-center justify-center
            `}
          >
            {isUploading ? 'Uploading...' : (
              <>
                <Plus size={16} className="mr-2" />
                Create New Feed
              </>
            )}
          </label>
        </div>

        {/* Rest of the component remains the same */}
        {/* ... (previous code) ... */}
      </div>
    </div>
  );
};

export default DroneDashboard;