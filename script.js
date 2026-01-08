// =============== DOM ELEMENTS ===============
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');
const contactForm = document.getElementById('contactForm');

// =============== MOBILE NAVIGATION ===============
// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
}

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});

// =============== HEADER SCROLL EFFECT ===============
function scrollHeader() {
    if (window.scrollY >= 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', scrollHeader);

// =============== ACTIVE LINK ON SCROLL ===============
function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__link[href*=' + sectionId + ']')?.classList.add('active');
        } else {
            document.querySelector('.nav__link[href*=' + sectionId + ']')?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// =============== SCROLL REVEAL ANIMATION ===============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Elements to animate on scroll
const animateElements = document.querySelectorAll(`
    .section__title,
    .section__subtitle,
    .about__content,
    .about__image,
    .service__card,
    .step,
    .stat__item,
    .contact__info,
    .contact__form
`);

animateElements.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// =============== COUNTER ANIMATION ===============
const counters = document.querySelectorAll('.stat__number');
let counterAnimated = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Observe stats section for counter animation
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterAnimated) {
                animateCounters();
                counterAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// =============== SMOOTH SCROLL ===============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =============== CONTACT FORM HANDLING ===============
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        showNotification('Thank you for your message! We will get back to you soon.', 'success');

        // Reset form
        contactForm.reset();

        // In a real application, you would send the data to a server here
        // Example:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ name, email, phone, message })
        // });
    });
}

// =============== NOTIFICATION SYSTEM ===============
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 20px 30px;
        background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        font-size: 15px;
        font-weight: 500;
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add to page
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// =============== PARALLAX EFFECT FOR HERO ===============
let ticking = false;

function parallaxHero() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero__content');
    const heroScroll = document.querySelector('.hero__scroll');

    if (hero && scrolled < window.innerHeight) {
        const parallaxValue = scrolled * 0.5;
        hero.style.transform = `translateY(${parallaxValue}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 1.5;
    }

    if (heroScroll && scrolled < window.innerHeight) {
        heroScroll.style.opacity = 1 - (scrolled / window.innerHeight) * 2;
    }

    ticking = false;
}

function requestParallax() {
    if (!ticking) {
        window.requestAnimationFrame(parallaxHero);
        ticking = true;
    }
}

window.addEventListener('scroll', requestParallax);

// =============== LAZY LOADING FOR IMAGES ===============
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// =============== SERVICE CARDS STAGGER ANIMATION ===============
const serviceCards = document.querySelectorAll('.service__card');
serviceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

const steps = document.querySelectorAll('.step');
steps.forEach((step, index) => {
    step.style.transitionDelay = `${index * 0.1}s`;
});

// =============== PERFORMANCE OPTIMIZATION ===============
// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll functions
const debouncedScrollHeader = debounce(scrollHeader, 10);
const debouncedScrollActive = debounce(scrollActive, 10);

window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', scrollActive);
window.addEventListener('scroll', debouncedScrollHeader);
window.addEventListener('scroll', debouncedScrollActive);

// =============== KEYBOARD ACCESSIBILITY ===============
// Add focus styles for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add keyboard accessibility style
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    body.keyboard-nav *:focus {
        outline: 2px solid var(--secondary-color);
        outline-offset: 2px;
    }
`;
document.head.appendChild(keyboardStyle);

// =============== INITIALIZE ON LOAD ===============
window.addEventListener('load', () => {
    // Initial scroll check
    scrollHeader();
    scrollActive();

    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');
});

// =============== PREVENT SCROLL RESTORATION ===============
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// =============== LOG INITIALIZATION ===============
console.log('%c Eyal Advisory Website ', 'background: #1a2849; color: #c9a96e; font-size: 16px; padding: 10px;');
console.log('Website initialized successfully');
