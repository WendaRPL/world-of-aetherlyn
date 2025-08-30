// scripts/main.js
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeCustomCursor();
    initializeAnimations();
});

// Mobile Menu functionality
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on links
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('nav') && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Custom Cursor functionality
function initializeCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline && window.innerWidth > 768) {
        document.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Outline follows with a delay
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: 'forwards' });
        });
        
        // Add cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .cta-button, .link-card, .highlight-item');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.opacity = '0.8';
            });
            
            element.addEventListener('mouseleave', function() {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.opacity = '0.5';
            });
        });
    } else if (cursorDot && cursorOutline) {
        // Hide custom cursor elements on mobile
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }
}

// Additional animations
function initializeAnimations() {
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.highlight-item, .link-card, .patch-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Add some floating crystals dynamically
function createFloatingCrystals() {
    const container = document.querySelector('.floating-crystals');
    if (!container) return;
    
    const crystalCount = 6;
    
    for (let i = 0; i < crystalCount; i++) {
        const crystal = document.createElement('div');
        crystal.className = 'floating-crystal';
        
        const size = 15 + Math.random() * 15;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 6;
        const duration = 4 + Math.random() * 4;
        
        crystal.style.cssText = `
            position: absolute;
            top: ${posY}%;
            left: ${posX}%;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(45deg, var(--accent-primary), var(--accent-secondary));
            clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
            opacity: ${0.1 + Math.random() * 0.2};
            animation: float ${duration}s ease-in-out ${delay}s infinite;
        `;
        
        container.appendChild(crystal);
    }
}

// Initialize crystals after DOM is loaded
setTimeout(createFloatingCrystals, 1000);