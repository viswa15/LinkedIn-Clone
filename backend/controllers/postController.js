import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  const post = await Post.create({ content: req.body.content, author: req.user._id });
  res.json(post);
};

export const getFeed = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }).populate('author', 'name');
  res.json(posts);
};
