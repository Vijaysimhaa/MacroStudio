// ═══════════════════════════════════════════════════════════════════════════════
// MacroStudio — Modern JavaScript Interactions
// ═══════════════════════════════════════════════════════════════════════════════

'use strict';

// ───────────────────────────────────────────────────────────────────────────────
// Mobile Navigation
// ───────────────────────────────────────────────────────────────────────────────
const initNavigation = () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.nav');
    
    if (!navToggle || !navLinks) return;
    
    // Toggle mobile menu
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.boxShadow = '0 2px 16px rgba(0, 0, 0, 0.08)';
        } else {
            nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
};

// ───────────────────────────────────────────────────────────────────────────────
// Smooth Scroll
// ───────────────────────────────────────────────────────────────────────────────
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#home') return;
            
            const target = document.querySelector(targetId);
            if (!target) return;
            
            e.preventDefault();
            
            const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
};

// ───────────────────────────────────────────────────────────────────────────────
// Animated Counter for Stats
// ───────────────────────────────────────────────────────────────────────────────
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        const easeOutQuad = progress * (2 - progress);
        const current = Math.floor(easeOutQuad * (end - start) + start);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
};

const initStatCounters = () => {
    const stats = document.querySelectorAll('[data-stat-target]');
    let hasAnimated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                stats.forEach(stat => {
                    const target = parseInt(stat.dataset.statTarget);
                    animateValue(stat, 0, target, 2000);
                });
                hasAnimated = true;
            }
        });
    }, { threshold: 0.5 });
    
    if (stats.length > 0) {
        observer.observe(stats[0]);
    }
};

// ───────────────────────────────────────────────────────────────────────────────
// Intersection Observer for Fade-in Animations
// ───────────────────────────────────────────────────────────────────────────────
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Animate these elements
    const animatedElements = document.querySelectorAll(`
        .panel-card,
        .doc-card,
        .support-card,
        .workflow-step,
        .stage-panel,
        .studio-card
    `);
    
    animatedElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// ───────────────────────────────────────────────────────────────────────────────
// Parallax Effect
// ───────────────────────────────────────────────────────────────────────────────
const initParallax = () => {
    const heroStage = document.querySelector('.hero-stage');
    if (!heroStage) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.3;
                heroStage.style.transform = `translateY(${rate}px)`;
                ticking = false;
            });
            ticking = true;
        }
    });
};

// ───────────────────────────────────────────────────────────────────────────────
// Timeline Row Pulse Animation
// ───────────────────────────────────────────────────────────────────────────────
const initTimelinePulse = () => {
    const liveTag = document.querySelector('.tag-live');
    if (!liveTag) return;
    
    setInterval(() => {
        liveTag.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => {
            liveTag.style.animation = '';
        }, 1000);
    }, 3000);
};

// ───────────────────────────────────────────────────────────────────────────────
// Button Ripple Effect
// ───────────────────────────────────────────────────────────────────────────────
const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
};

const initButtonRipples = () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
};

// ───────────────────────────────────────────────────────────────────────────────
// Download Analytics
// ───────────────────────────────────────────────────────────────────────────────
const initDownloadTracking = () => {
    const downloadButtons = document.querySelectorAll('a[href*=".dmg"]');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            console.log('📦 Download initiated:', button.href);
            
            // Add download state
            button.style.opacity = '0.7';
            button.style.pointerEvents = 'none';
            
            setTimeout(() => {
                button.style.opacity = '1';
                button.style.pointerEvents = 'auto';
            }, 2000);
            
            // You can add analytics here:
            // gtag('event', 'download', { 'event_category': 'engagement' });
            // plausible('Download');
        });
    });
};

// ───────────────────────────────────────────────────────────────────────────────
// Dynamic Year
// ───────────────────────────────────────────────────────────────────────────────
const updateYear = () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
};

// ───────────────────────────────────────────────────────────────────────────────
// Keyboard Shortcuts
// ───────────────────────────────────────────────────────────────────────────────
const initKeyboardShortcuts = () => {
    document.addEventListener('keydown', (e) => {
        // CMD+K or CTRL+K to focus search (if you add one)
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            console.log('Search shortcut triggered');
        }
        
        // D for download
        if (e.key === 'd' && !e.metaKey && !e.ctrlKey) {
            const target = e.target;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
            
            const downloadButton = document.querySelector('a[href*=".dmg"]');
            if (downloadButton) {
                downloadButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
                downloadButton.style.animation = 'pulse 0.5s ease-in-out';
                setTimeout(() => {
                    downloadButton.style.animation = '';
                }, 500);
            }
        }
    });
};

// ───────────────────────────────────────────────────────────────────────────────
// Add CSS Animations
// ───────────────────────────────────────────────────────────────────────────────
const injectAnimations = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
};

// ───────────────────────────────────────────────────────────────────────────────
// Easter Egg: Konami Code
// ───────────────────────────────────────────────────────────────────────────────
const initKonamiCode = () => {
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiCode = [];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-konamiPattern.length);
        
        if (konamiCode.join(',') === konamiPattern.join(',')) {
            console.log('🎉 Konami code activated!');
            document.body.style.animation = 'rainbow 3s linear infinite';
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });
};

// ───────────────────────────────────────────────────────────────────────────────
// Console Branding
// ───────────────────────────────────────────────────────────────────────────────
const initConsoleBranding = () => {
    console.log('%c🎨 MacroStudio', 'font-size: 48px; font-weight: bold; background: linear-gradient(90deg, #007AFF, #5856D6); -webkit-background-clip: text; color: transparent;');
    console.log('%cBuilt with ♥ for the macOS community', 'font-size: 14px; color: #6e6e73;');
    console.log('%cGitHub: https://github.com/yourusername/MacroStudio', 'font-size: 12px; color: #007AFF;');
    console.log('%cWant to contribute? We\'re open source!', 'font-size: 12px; color: #34C759;');
};

// ───────────────────────────────────────────────────────────────────────────────
// Performance Monitoring
// ───────────────────────────────────────────────────────────────────────────────
const initPerformanceMonitoring = () => {
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.name === 'first-contentful-paint') {
                    console.log(`⚡ FCP: ${entry.startTime.toFixed(2)}ms`);
                }
            }
        });
        observer.observe({ entryTypes: ['paint'] });
    }
    
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Page load: ${loadTime}ms`);
    });
};

// ───────────────────────────────────────────────────────────────────────────────
// Initialize Everything
// ───────────────────────────────────────────────────────────────────────────────
const init = () => {
    // Core functionality
    initNavigation();
    initSmoothScroll();
    initStatCounters();
    initScrollAnimations();
    initParallax();
    initTimelinePulse();
    initButtonRipples();
    initDownloadTracking();
    updateYear();
    initKeyboardShortcuts();
    
    // Enhancements
    injectAnimations();
    initKonamiCode();
    initConsoleBranding();
    initPerformanceMonitoring();
    
    // Remove FOUC
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
};

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ═══════════════════════════════════════════════════════════════════════════════
// Export for module usage (optional)
// ═══════════════════════════════════════════════════════════════════════════════
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { init };
}
