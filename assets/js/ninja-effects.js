/*
===============================================
NINJATECHHQ - ADVANCED INTERACTIVE EFFECTS
JavaScript Enhancement System
===============================================
*/

class NinjaEffects {
    constructor() {
        this.init();
    }

    init() {
        this.createParticles();
        this.initScrollAnimations();
        this.initSkillBars();
        this.initTypewriter();
        this.initCounters();
        this.initParallax();
        this.initCursorEffects();
        this.initPageTransitions();
        
        console.log('🥷 NinjaTech Effects Activated!');
    }

    // Create Floating Particles Background
    createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'ninja-particles';
        document.body.prepend(particleContainer);

        // Create individual particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: ${Math.random() > 0.5 ? '#32cd32' : '#3b82f6'};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.6 + 0.2};
                animation: float ${Math.random() * 20 + 20}s infinite linear;
                animation-delay: ${Math.random() * 20}s;
            `;
            particleContainer.appendChild(particle);
        }
    }

    // Initialize Scroll Animations
    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Animate elements on scroll
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Add scroll-based classes to existing elements
        document.querySelectorAll('.card, .service-item, .feature-box, .pricing-table').forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    // Initialize Skill Bars Animation
    initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target;
                    const percentage = progress.getAttribute('data-percentage') || '90';
                    setTimeout(() => {
                        progress.style.width = percentage + '%';
                    }, 500);
                }
            });
        });

        skillBars.forEach(bar => skillObserver.observe(bar));
    }

    // Initialize Typewriter Effect
    initTypewriter() {
        const typewriterElements = document.querySelectorAll('.typewriter');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '3px solid #10b981';
            
            let i = 0;
            const timer = setInterval(() => {
                element.textContent += text.charAt(i);
                i++;
                
                if (i > text.length) {
                    clearInterval(timer);
                    // Remove cursor after typing is done
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 1000);
                }
            }, 100);
        });
    }

    // Initialize Counter Animations
    initCounters() {
        const counters = document.querySelectorAll('[data-count]');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += step;
                        counter.textContent = Math.floor(current);
                        
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        }
                    }, 16);
                    
                    counterObserver.unobserve(counter);
                }
            });
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // Initialize Parallax Effects
    initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    // Initialize Custom Cursor Effects
    initCursorEffects() {
        // Create custom cursor
        const cursor = document.createElement('div');
        cursor.className = 'ninja-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #32cd32, #3b82f6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
            transform: translate(-50%, -50%);
            opacity: 0;
        `;
        document.body.appendChild(cursor);

        const cursorTrail = document.createElement('div');
        cursorTrail.className = 'ninja-cursor-trail';
        cursorTrail.style.cssText = `
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(50, 205, 50, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: all 0.2s ease;
            transform: translate(-50%, -50%);
            opacity: 0;
        `;
        document.body.appendChild(cursorTrail);

        // Update cursor position
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.opacity = '1';
            
            cursorTrail.style.left = e.clientX + 'px';
            cursorTrail.style.top = e.clientY + 'px';
            cursorTrail.style.opacity = '1';
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorTrail.style.opacity = '0';
        });

        // Cursor hover effects
        document.querySelectorAll('a, button, .btn').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorTrail.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorTrail.style.borderColor = '#32cd32';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorTrail.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorTrail.style.borderColor = 'rgba(50, 205, 50, 0.3)';
            });
        });
    }

    // Initialize Page Transitions
    initPageTransitions() {
        // Smooth page load animation
        window.addEventListener('load', () => {
            document.body.style.animation = 'fadeIn 0.8s ease-in-out';
        });

        // Add loading overlay
        const loadingOverlay = document.createElement('div');
        loadingOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            transition: opacity 0.5s ease;
        `;
        
        const spinner = document.createElement('div');
        spinner.className = 'ninja-spinner';
        loadingOverlay.appendChild(spinner);
        
        document.body.prepend(loadingOverlay);

        // Hide loading overlay when page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    loadingOverlay.remove();
                }, 500);
            }, 1000);
        });
    }
}

// CSS Animations
const cssAnimations = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

@keyframes pulse-glow {
    0%, 100% { 
        box-shadow: 0 0 5px rgba(50, 205, 50, 0.5),
                    0 0 10px rgba(50, 205, 50, 0.3),
                    0 0 15px rgba(59, 130, 246, 0.2);
    }
    50% { 
        box-shadow: 0 0 20px rgba(50, 205, 50, 0.8),
                    0 0 30px rgba(50, 205, 50, 0.6),
                    0 0 40px rgba(59, 130, 246, 0.4);
    }
}

.ninja-glow-pulse {
    animation: pulse-glow 2s infinite;
}
`;

// Add CSS animations to document
const styleSheet = document.createElement('style');
styleSheet.textContent = cssAnimations;
document.head.appendChild(styleSheet);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NinjaEffects();
});

// Export for use in other scripts
window.NinjaEffects = NinjaEffects;
