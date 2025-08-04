import React from 'react';
// import { MessageCircle, Heart, Share } from 'lucide-react';

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

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInDays < 7) {
      return `${Math.floor(diffInDays)}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-medium">
            {post.author.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium text-gray-900">{post.author.name}</h3>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
          </div>
          <p className="text-gray-600 text-xs">{post.author.email}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-gray-900 whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100">
        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
          <Heart className="w-5 h-5" />
          <span className="text-sm">Like</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">Comment</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
          <Share className="w-5 h-5" />
          <span className="text-sm">Share</span>
        </button>
      </div> */}
    </div>
  );
};

export default PostCard;