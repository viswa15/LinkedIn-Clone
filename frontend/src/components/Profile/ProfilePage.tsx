import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
import PostCard from '../Posts/PostCard';
import { MapPin, Calendar, Edit3 } from 'lucide-react';
// import axios from 'axios';
import { useAuthStore } from '../../stores/authStore';
import api from '../../lib/api'; // Use the configured api helper

interface Post {
  _id: string;
  content: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

const ProfilePage: React.FC = () => {
  // const { user } = useAuth();
  const { user, updateBio } = useAuthStore();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(user?.bio || '');
  

  // const apiUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const response = await api.get(`/api/user/${user.id}/posts`); // Assuming this endpoint exists
        setUserPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch user posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserPosts();
  }, [user]);

  useEffect(() => {
    setEditedBio(user?.bio || '');
  }, [user?.bio]);

  const handleSaveBio = async () => {
    await updateBio(editedBio);
    setIsEditing(false);
  };
  
  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start space-x-6">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>
            <p className="text-gray-600 mt-1">{user.email}</p>
            
            <div className="mt-4">
              {isEditing ? (
                <div className="space-y-3">
                  <textarea
                    value={editedBio}
                    onChange={(e) => setEditedBio(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveBio}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditedBio(user.bio || '');
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700">
                  {user.bio || 'No bio available. Click Edit Profile to add one!'}
                </p>
              )}
            </div>

            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Joined January 2024</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Remote</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Posts</h2>
        {loading ? (
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : userPosts.length > 0 ? (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">You haven't posted anything yet.</p>
            <p className="text-gray-400 text-sm mt-1">Share your thoughts with the community!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;