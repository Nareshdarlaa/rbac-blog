const express = require('express');
const Blog = require('../models/Blog');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ CREATE a blog (admin only)
router.post('/', authMiddleware('admin'), async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;

    const blog = new Blog({
      title,
      content,
      imageUrl,
      author: req.user.userId
    });

    await blog.save();
    res.status(201).json({ message: 'Blog created successfully' });
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ GET all blogs (public)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name').sort({ timestamp: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});

// ✅ LIKE a blog
router.post('/:id/like', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.likes += 1;
    await blog.save();

    res.status(200).json({ message: 'Blog liked' });
  } catch (err) {
    res.status(500).json({ message: 'Error liking blog' });
  }
});

// ✅ COMMENT on a blog
router.post('/:id/comment', async (req, res) => {
  try {
    const { comment } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.comments.push(comment);
    await blog.save();

    res.status(200).json({ message: 'Comment added' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding comment' });
  }
});

module.exports = router;
