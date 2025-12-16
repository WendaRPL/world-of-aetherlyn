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
    const mobileDropdown = document.querySelector('.mobile-dropdown');
    const body = document.body;
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            const isOpening = !navLinks.classList.contains('active');
            
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle body class untuk CSS control
            body.classList.toggle('menu-open', navLinks.classList.contains('active'));
            
            // Toggle body scroll when menu is open
            const isMenuOpen = navLinks.classList.contains('active');
            body.style.overflow = isMenuOpen ? 'hidden' : '';
            
            // Automatically open dropdown on mobile when menu opens
            if (window.innerWidth <= 768) {
                if (isMenuOpen) {
                    // Open the dropdown when menu opens
                    setTimeout(() => {
                        if (mobileDropdown) {
                            mobileDropdown.classList.add('active');
                        }
                    }, 100); // Small delay for smooth animation
                } else {
                    // Close dropdown when menu closes
                    if (mobileDropdown) {
                        mobileDropdown.classList.remove('active');
                    }
                }
            }
        });
        
        // Close menu when clicking on links
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                // Don't close dropdown if clicking inside dropdown
                if (this.closest('.dropdown-menu')) {
                    e.stopPropagation();
                    return;
                }
                
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
                
                // Close dropdown too
                if (mobileDropdown) {
                    mobileDropdown.classList.remove('active');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = event.target.closest('nav');
            const isClickInsideSidebar = event.target.closest('.nav-links');
            const isClickOnHamburger = event.target.closest('.hamburger');
            
            if (!isClickInsideNav && !isClickInsideSidebar && !isClickOnHamburger && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
                
                // Close dropdown too
                if (mobileDropdown) {
                    mobileDropdown.classList.remove('active');
                }
            }
        });
        
        // Handle dropdown toggle on mobile
        if (mobileDropdown && window.innerWidth <= 768) {
            const dropdownToggle = mobileDropdown.querySelector('.dropdown-toggle');
            
            dropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle dropdown
                mobileDropdown.classList.toggle('active');
                
                // Scroll to dropdown if it's opening
                if (mobileDropdown.classList.contains('active')) {
                    setTimeout(() => {
                        mobileDropdown.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                }
            });
            
            // Close dropdown when clicking outside of it (but inside nav)
            navLinks.addEventListener('click', function(e) {
                if (!e.target.closest('.mobile-dropdown') && mobileDropdown.classList.contains('active')) {
                    mobileDropdown.classList.remove('active');
                }
            });
        }
        
        // Handle Escape key to close sidebar
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
                
                if (mobileDropdown) {
                    mobileDropdown.classList.remove('active');
                }
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                // Reset mobile states when resizing to desktop
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
                
                if (mobileDropdown) {
                    mobileDropdown.classList.remove('active');
                }
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