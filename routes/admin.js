const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const basicAuth = require('../middlewares/auth');

// Apply authentication middleware to all admin routes
router.use(basicAuth);

// Admin dashboard - list all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [['createdAt', 'DESC']]
    });
    
    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      posts
    });
  } catch (error) {
    console.error('Error fetching posts for admin:', error);
    res.status(500).render('error', { 
      title: 'Error', 
      message: 'Could not load admin dashboard' 
    });
  }
});

// New post form
router.get('/posts/new', (req, res) => {
  res.render('admin/edit-post', {
    title: 'New Post',
    post: {
      id: null,
      title: '',
      imageUrl: '',
      content: '',
      isHot: false
    },
    isNew: true
  });
});

// Edit post form
router.get('/posts/edit/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    
    if (!post) {
      return res.status(404).render('error', { 
        title: 'Not Found', 
        message: 'Post not found' 
      });
    }
    
    res.render('admin/edit-post', {
      title: `Edit: ${post.title}`,
      post,
      isNew: false
    });
  } catch (error) {
    console.error('Error fetching post for edit:', error);
    res.status(500).render('error', { 
      title: 'Error', 
      message: 'Could not load post for editing' 
    });
  }
});

// Create new post
router.post('/posts', async (req, res) => {
  try {
    // Handle the isHot checkbox
    const isHot = req.body.isHot === 'on';
    
    await Post.create({
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      content: req.body.content,
      isHot
    });
    
    res.redirect('/admin');
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).render('error', { 
      title: 'Error', 
      message: 'Could not create post' 
    });
  }
});

// Update existing post
router.post('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    
    if (!post) {
      return res.status(404).render('error', { 
        title: 'Not Found', 
        message: 'Post not found' 
      });
    }
    
    // Handle the isHot checkbox
    const isHot = req.body.isHot === 'on';
    
    await post.update({
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      content: req.body.content,
      isHot
    });
    
    res.redirect('/admin');
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).render('error', { 
      title: 'Error', 
      message: 'Could not update post' 
    });
  }
});

// Delete post
router.post('/posts/delete/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    
    if (!post) {
      return res.status(404).render('error', { 
        title: 'Not Found', 
        message: 'Post not found' 
      });
    }
    
    await post.destroy();
    res.redirect('/admin');
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).render('error', { 
      title: 'Error', 
      message: 'Could not delete post' 
    });
  }
});

module.exports = router;