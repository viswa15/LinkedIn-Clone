import React from 'react';
import PostFeed from '../components/Posts/PostFeed';

const HomePage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to ConnectHub</h1>
        <p className="text-gray-600">Stay connected with your professional network</p>
      </div>
      <PostFeed />
    </div>
  );
};

export default HomePage;