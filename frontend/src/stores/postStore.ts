// src/stores/postStore.ts
import { create } from 'zustand';
import api from '../lib/api';

const PAGE_SIZE = 5;

interface Post {
  _id: string;
  content: string;
  author: { _id: string; name: string; email: string; };
  createdAt: string;
}

interface PostState {
  posts: Post[];
  isLoading: boolean;
  isCreating: boolean;
  page: number;
  hasMore: boolean;
  fetchPosts: () => Promise<void>;
  createPost: (content: string) => Promise<boolean>;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  isLoading: false,
  isCreating: false,
  page: 1,
  hasMore: true,

  fetchPosts: async () => {
    const { page } = get();
    set({ isLoading: true });
    try {
      const response = await api.get('/api/posts', {
        params: { page, limit: PAGE_SIZE },
      });
      const newPosts = response.data;
      set((state) => ({
        posts: page === 1 ? newPosts : [...state.posts, ...newPosts],
        hasMore: newPosts.length === PAGE_SIZE,
        page: state.page + 1, // Increment page for the next fetch
      }));
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  createPost: async (content: string) => {
    set({ isCreating: true });
    try {
      await api.post('/api/posts', { content });
      // Reset and refetch posts to show the new one on top
      set({ page: 1, posts: [] });
      await get().fetchPosts();
      return true;
    } catch (error) {
      console.error('Failed to create post:', error);
      return false;
    } finally {
      set({ isCreating: false });
    }
  },
}));