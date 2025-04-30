// Get current path for active navigation highlighting
document.addEventListener('DOMContentLoaded', function() {
    // Get current path
    const path = window.location.pathname;
    
    // Store path in window object for potential use in EJS templates
    window.currentPath = path;
    
    // Add fade-in animation to post cards
    const animateCards = () => {
      const cards = document.querySelectorAll('.animate__animated');
      cards.forEach((card, index) => {
        // Stagger the animations
        setTimeout(() => {
          card.classList.add('animate__fadeIn');
        }, index * 100);
      });
    };
    
    animateCards();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  });