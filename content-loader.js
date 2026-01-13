// =============== CONTENT LOADER FROM JSON ===============
// This script loads content from content.json and updates the page dynamically

async function loadContent() {
    try {
        const response = await fetch('content.json');
        if (!response.ok) {
            throw new Error('Failed to load content');
        }
        const content = await response.json();

        // Update content on the page
        updatePageContent(content);
    } catch (error) {
        console.error('Error loading content:', error);
        // Fallback to static content if JSON fails to load
    }
}

function updatePageContent(content) {
    // Update Hero Section
    if (content.hero) {
        const heroTitle = document.querySelector('.hero__title');
        if (heroTitle) {
            heroTitle.innerHTML = `${content.hero.title_line1} <br><span class="highlight">${content.hero.title_line2}</span>`;
        }

        const heroDesc = document.querySelector('.hero__description');
        if (heroDesc) {
            heroDesc.textContent = content.hero.description;
        }

        const primaryBtn = document.querySelector('.hero__buttons .btn--primary');
        if (primaryBtn) {
            primaryBtn.textContent = content.hero.button_primary;
        }

        const secondaryBtn = document.querySelector('.hero__buttons .btn--secondary');
        if (secondaryBtn) {
            secondaryBtn.textContent = content.hero.button_secondary;
        }

        const heroBgImage = document.querySelector('.hero__bg-image');
        if (heroBgImage && content.hero.background_image) {
            heroBgImage.src = content.hero.background_image;
        }
    }

    // Update Stats
    if (content.stats) {
        const statNumbers = document.querySelectorAll('.stat__number');
        if (statNumbers.length >= 4) {
            statNumbers[0].setAttribute('data-target', content.stats.years);
            statNumbers[1].setAttribute('data-target', content.stats.clients);
            statNumbers[2].setAttribute('data-target', content.stats.transactions);
            statNumbers[3].setAttribute('data-target', content.stats.satisfaction);
        }
    }

    // Update About Section
    if (content.about) {
        const aboutSubtitle = document.querySelector('.about__content .section__subtitle');
        if (aboutSubtitle) {
            aboutSubtitle.textContent = content.about.subtitle;
        }

        const aboutTitle = document.querySelector('.about__content .section__title');
        if (aboutTitle) {
            aboutTitle.textContent = content.about.title;
        }

        const aboutDescs = document.querySelectorAll('.about__description');
        if (aboutDescs.length >= 2) {
            aboutDescs[0].textContent = content.about.description1;
            aboutDescs[1].textContent = content.about.description2;
        }

        const aboutImage = document.querySelector('.about__img');
        if (aboutImage && content.about.image) {
            aboutImage.src = content.about.image;
        }

        // Update features
        if (content.about.features && content.about.features.length >= 2) {
            const featureTitles = document.querySelectorAll('.feature__title');
            const featureTexts = document.querySelectorAll('.feature__text');

            if (featureTitles.length >= 2) {
                featureTitles[0].textContent = content.about.features[0].title;
                featureTitles[1].textContent = content.about.features[1].title;
            }

            if (featureTexts.length >= 2) {
                featureTexts[0].textContent = content.about.features[0].text;
                featureTexts[1].textContent = content.about.features[1].text;
            }
        }
    }

    // Update Services Section
    if (content.services) {
        const servicesSubtitle = document.querySelector('.services .section__subtitle');
        if (servicesSubtitle) {
            servicesSubtitle.textContent = content.services.subtitle;
        }

        const servicesTitle = document.querySelector('.services .section__title');
        if (servicesTitle) {
            servicesTitle.textContent = content.services.title;
        }

        // Update service cards
        if (content.services.items) {
            const serviceTitles = document.querySelectorAll('.service__title');
            const serviceDescs = document.querySelectorAll('.service__description');

            content.services.items.forEach((item, index) => {
                if (serviceTitles[index]) {
                    serviceTitles[index].textContent = item.title;
                }
                if (serviceDescs[index]) {
                    serviceDescs[index].textContent = item.description;
                }
            });
        }
    }

    // Update Approach Section
    if (content.approach) {
        const approachSubtitle = document.querySelector('.approach .section__subtitle');
        if (approachSubtitle) {
            approachSubtitle.textContent = content.approach.subtitle;
        }

        const approachTitle = document.querySelector('.approach .section__title');
        if (approachTitle) {
            approachTitle.textContent = content.approach.title;
        }

        // Update steps
        if (content.approach.steps) {
            const stepTitles = document.querySelectorAll('.step__title');
            const stepDescs = document.querySelectorAll('.step__description');

            content.approach.steps.forEach((step, index) => {
                if (stepTitles[index]) {
                    stepTitles[index].textContent = step.title;
                }
                if (stepDescs[index]) {
                    stepDescs[index].textContent = step.description;
                }
            });
        }
    }

    // Update CTA Section
    if (content.cta) {
        const ctaTitle = document.querySelector('.cta__title');
        if (ctaTitle) {
            ctaTitle.textContent = content.cta.title;
        }

        const ctaDesc = document.querySelector('.cta__description');
        if (ctaDesc) {
            ctaDesc.textContent = content.cta.description;
        }

        const ctaBtn = document.querySelector('.cta .btn--primary');
        if (ctaBtn) {
            ctaBtn.textContent = content.cta.button_text;
        }
    }

    // Update Contact Section
    if (content.contact) {
        const contactTitle = document.querySelector('.contact__info .section__title');
        if (contactTitle) {
            contactTitle.textContent = content.contact.title;
        }

        const contactDesc = document.querySelector('.contact__description');
        if (contactDesc) {
            contactDesc.textContent = content.contact.description;
        }

        // Update contact items
        const contactItems = document.querySelectorAll('.contact__item');
        if (contactItems.length >= 3) {
            // Address
            const addressP = contactItems[0].querySelector('p');
            if (addressP) {
                addressP.innerHTML = `${content.contact.address_line1}<br>${content.contact.address_line2}`;
            }

            // Phone
            const phoneP = contactItems[1].querySelector('p');
            if (phoneP) {
                phoneP.textContent = content.contact.phone;
            }

            // Email
            const emailP = contactItems[2].querySelector('p');
            if (emailP) {
                emailP.textContent = content.contact.email;
            }
        }
    }

    // Update Company Name (nav logo and footer)
    if (content.company) {
        const navLogo = document.querySelector('.nav__logo h2');
        if (navLogo) {
            navLogo.textContent = content.company.name;
        }

        const footerLogo = document.querySelector('.footer__logo');
        if (footerLogo) {
            footerLogo.textContent = content.company.name;
        }

        // Update page title
        document.title = `${content.company.name} - Financial & Business Advisory Services`;
    }
}

// Load content when page loads
document.addEventListener('DOMContentLoaded', loadContent);
