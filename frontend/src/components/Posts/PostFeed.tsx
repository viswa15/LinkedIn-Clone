import React, {  useEffect } from 'react';
// import axios from 'axios';
import PostCard from './PostCard';
import CreatePost from './CreatePost';
import { usePostStore } from '../../stores/postStore';
// const apiUrl = import.meta.env.VITE_BASE_URL;

// interface Post {
//   _id: string;
//   content: string;
//   author: {
//     _id: string;
//     name: string;
//     email: string;
//   };
//   createdAt: string;
// }

// const PAGE_SIZE = 5;

const PostFeed: React.FC = () => {
  const { posts, isLoading, hasMore, page, fetchPosts } = usePostStore();
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [page, setPage] = useState(1);
  // const [hasMore, setHasMore] = useState(true);

  // const fetchPosts = async (pageNum = 1) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`${apiUrl}/api/posts`, {
  //       params: { page: pageNum, limit: PAGE_SIZE }
  //     });
  //     const newPosts = response.data;
  //     setPosts((prev) => pageNum === 1 ? newPosts : [...prev, ...newPosts]);
  //     setHasMore(newPosts.length === PAGE_SIZE);
  //   } catch (error) {
  //     console.error('Failed to fetch posts:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    // Fetch initial posts only if the list is empty
    if (page === 1) {
      fetchPosts();
    }
  }, [fetchPosts, page]);

   // Loading skeleton JSX can be extracted to a separate component
  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
            {/* ... skeleton JSX ... */}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <CreatePost /> {/* No prop needed anymore */}
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      {isLoading && <LoadingSkeleton />}
      {!isLoading && hasMore && (
        <button
          onClick={fetchPosts} // Just call fetchPosts
          className="w-full py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          View More Posts
        </button>
      )}
      {!isLoading && !hasMore && posts.length > 0 && (
        <div className="text-center text-gray-500 mt-4">No more posts left.</div>
      )}
    </div>
  );
};

export default PostFeed;