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

        // Submit to Netlify Forms
        const formData = new FormData(contactForm);

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
            .then(response => {
                if (response.ok) {
                    showNotification('Thank you for your message! We will get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    showNotification('There was an error sending your message. Please try again.', 'error');
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                showNotification('There was an error sending your message. Please try again.', 'error');
            });
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

// =============== LOAD SAVED CONTENT FROM ADMIN ===============
const STORAGE_KEY = 'eyalAdvisoryContent';
const BG_IMAGE_KEY = 'eyalAdvisoryBgImage';
const COLORS_KEY = 'eyalAdvisoryColors';

const contentMapping = {
    companyName: ['.nav__logo h2', '.footer__logo'],
    heroTitleHighlight: ['.hero__title .highlight'],
    heroDescription: ['.hero__description'],
    heroBtnPrimary: ['.hero__buttons .btn--primary'],
    heroBtnSecondary: ['.hero__buttons .btn--secondary'],
    stat1Label: ['.stat__item:nth-child(1) .stat__label'],
    stat2Label: ['.stat__item:nth-child(2) .stat__label'],
    stat3Label: ['.stat__item:nth-child(3) .stat__label'],
    stat4Label: ['.stat__item:nth-child(4) .stat__label'],
    aboutSubtitle: ['.about .section__subtitle'],
    aboutTitle: ['.about .section__title'],
    feature1Title: ['.feature:nth-child(1) .feature__title'],
    feature1Text: ['.feature:nth-child(1) .feature__text'],
    feature2Title: ['.feature:nth-child(2) .feature__title'],
    feature2Text: ['.feature:nth-child(2) .feature__text'],
    servicesSubtitle: ['.services .section__subtitle'],
    servicesTitle: ['.services .section__title'],
    service1Title: ['.service__card:nth-child(1) .service__title'],
    service1Desc: ['.service__card:nth-child(1) .service__description'],
    service2Title: ['.service__card:nth-child(2) .service__title'],
    service2Desc: ['.service__card:nth-child(2) .service__description'],
    service3Title: ['.service__card:nth-child(3) .service__title'],
    service3Desc: ['.service__card:nth-child(3) .service__description'],
    service4Title: ['.service__card:nth-child(4) .service__title'],
    service4Desc: ['.service__card:nth-child(4) .service__description'],
    contactTitle: ['.contact .section__title'],
    contactDesc: ['.contact__description'],
    contactPhone: ['.contact__item:nth-child(2) p'],
    contactEmail: ['.contact__item:nth-child(3) p'],
    topBarName: ['.top-bar__name'],
    topBarPhone: ['.top-bar__phone']
};

function loadSavedContent() {
    const savedContent = localStorage.getItem(STORAGE_KEY);
    if (!savedContent) return;

    try {
        const content = JSON.parse(savedContent);

        // Apply text content
        Object.keys(contentMapping).forEach(key => {
            if (content[key]) {
                contentMapping[key].forEach(selector => {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(el => {
                        el.textContent = content[key];
                    });
                });
            }
        });

        // Special handling for hero title (first line)
        if (content.heroTitle) {
            const heroTitle = document.querySelector('.hero__title');
            if (heroTitle) {
                const highlight = heroTitle.querySelector('.highlight');
                const highlightText = highlight ? highlight.textContent : '';
                heroTitle.innerHTML = content.heroTitle + ' <br><span class="highlight">' + highlightText + '</span>';
            }
        }

        // Special handling for about descriptions
        if (content.aboutDesc1) {
            const aboutDescs = document.querySelectorAll('.about__description');
            if (aboutDescs[0]) aboutDescs[0].textContent = content.aboutDesc1;
        }
        if (content.aboutDesc2) {
            const aboutDescs = document.querySelectorAll('.about__description');
            if (aboutDescs[1]) aboutDescs[1].textContent = content.aboutDesc2;
        }

        // Special handling for contact address (with HTML)
        if (content.contactAddress) {
            const addressEl = document.querySelector('.contact__item:nth-child(1) p');
            if (addressEl) {
                addressEl.innerHTML = content.contactAddress.replace(/\n/g, '<br>');
            }
        }

        // Update stat numbers (data-target attribute)
        ['stat1Number', 'stat2Number', 'stat3Number', 'stat4Number'].forEach((key, index) => {
            if (content[key]) {
                const statEl = document.querySelector(`.stat__item:nth-child(${index + 1}) .stat__number`);
                if (statEl) {
                    statEl.setAttribute('data-target', content[key]);
                    statEl.textContent = '0'; // Reset for animation
                }
            }
        });

        // Special handling for Top Bar to preserve icons
        if (content.topBarName) {
            const el = document.querySelector('.top-bar__name');
            if (el) {
                // Keep the SVG icon
                const icon = el.querySelector('svg');
                const iconHTML = icon ? icon.outerHTML : '';
                el.innerHTML = iconHTML + ' ' + content.topBarName;
            }
        }
        if (content.topBarPhone) {
            const el = document.querySelector('.top-bar__phone');
            if (el) {
                // Keep the SVG icon
                const icon = el.querySelector('svg');
                const iconHTML = icon ? icon.outerHTML : '';
                el.innerHTML = iconHTML + ' ' + content.topBarPhone;
                el.href = 'tel:' + content.topBarPhone.replace(/[^0-9]/g, '');
            }
        }

        console.log('Content loaded from admin panel');
    } catch (e) {
        console.error('Error loading saved content:', e);
    }
}

function loadBackgroundImage() {
    const savedBgImage = localStorage.getItem(BG_IMAGE_KEY);
    if (!savedBgImage) return;

    const bgImage = document.querySelector('.hero__bg-image');
    if (!bgImage) return;

    if (savedBgImage === 'none') {
        bgImage.style.display = 'none';
    } else {
        bgImage.src = savedBgImage;
    }
}

// =============== LOAD SAVED COLORS ===============
function loadColors() {
    const savedColors = localStorage.getItem(COLORS_KEY);
    if (!savedColors) return;

    try {
        const colors = JSON.parse(savedColors);
        const root = document.documentElement;

        if (colors.primaryColor) {
            root.style.setProperty('--primary-color', colors.primaryColor);
        }
        if (colors.secondaryColor) {
            root.style.setProperty('--secondary-color', colors.secondaryColor);
        }
        if (colors.accentColor) {
            root.style.setProperty('--accent-color', colors.accentColor);
        }

        // Apply hero background gradient
        if (colors.heroBgColor1 && colors.heroBgColor2) {
            root.style.setProperty('--hero-bg-gradient',
                `linear-gradient(135deg, ${colors.heroBgColor1} 0%, ${colors.heroBgColor2} 100%)`);
        }

        console.log('Colors loaded from admin panel');
    } catch (e) {
        console.error('Error loading saved colors:', e);
    }
}

// =============== INITIALIZE ON LOAD ===============
window.addEventListener('load', () => {
    // Load saved content from admin
    loadSavedContent();
    loadBackgroundImage();
    loadColors();

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
