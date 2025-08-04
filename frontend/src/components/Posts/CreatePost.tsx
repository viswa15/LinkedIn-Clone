import React, { useState } from 'react';
import { Send } from 'lucide-react';
// import axios from 'axios';
import { usePostStore } from '../../stores/postStore';

// const apiUrl = import.meta.env.VITE_BASE_URL;
// interface CreatePostProps {
//   onPostCreated: () => void;
// }

const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  // const [loading, setLoading] = useState(false);
   const { createPost, isCreating } = usePostStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const success = await createPost(content);
    if (success) {
      setContent('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={3}
            disabled={isCreating}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!content.trim() || isCreating}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4 mr-2" />
            {isCreating ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;