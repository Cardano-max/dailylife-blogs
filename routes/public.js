const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const { Op } = require('sequelize');

// Home page - show hot posts and all posts
router.get('/', async (req, res) => {
  try {
    // Get hot posts for the slider
    const hotPosts = await Post.findAll({
      where: {
        isHot: true
      },
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    // Get all posts for the grid
    const allPosts = await Post.findAll({
      order: [['createdAt', 'DESC']],
      limit: 12
    });

    res.render('home', {
      title: 'Daily Life - Home',
      hotPosts,
      allPosts
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).render('error', { 
      title: 'Error', 
      message: 'Could not load posts' 
    });
  }
});

// About page
router.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

// Contact page
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

// Resources page
router.get('/resources', (req, res) => {
  res.render('resources', { title: 'Resources' });
});

// Blog listing page
router.get('/blog', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const offset = (page - 1) * limit;

    // Get posts with pagination
    const { count, rows: posts } = await Post.findAndCountAll({
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    const totalPages = Math.ceil(count / limit);

    res.render('blog', {
      title: 'Blog',
      posts,
      currentPage: page,
      totalPages,
      totalPosts: count
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).render('error', { 
      title: 'Error', 
      message: 'Could not load blog posts' 
    });
  }
});

// Post detail page
router.get('/blog/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    
    if (!post) {
      return res.status(404).render('error', { 
        title: 'Not Found', 
        message: 'Post not found' 
      });
    }

    // Get related posts (excluding the current one)
    const relatedPosts = await Post.findAll({
      where: {
        id: {
          [Op.ne]: post.id
        }
      },
      order: [['createdAt', 'DESC']],
      limit: 3
    });

    res.render('post', {
      title: post.title,
      post,
      relatedPosts
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).render('error', { 
      title: 'Error', 
      message: 'Could not load post details' 
    });
  }
});

module.exports = router;