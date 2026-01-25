// =============== CONTENT CONFIGURATION ===============
const contentFields = {
    // Branding
    companyName: { selector: '.nav__logo h2, .footer__logo', property: 'textContent' },

    // Hero Section
    heroTitle: { selector: '.hero__title', property: 'firstLine' },
    heroTitleHighlight: { selector: '.hero__title .highlight', property: 'textContent' },
    heroDescription: { selector: '.hero__description', property: 'textContent' },
    heroBtnPrimary: { selector: '.hero__buttons .btn--primary', property: 'textContent' },
    heroBtnSecondary: { selector: '.hero__buttons .btn--secondary', property: 'textContent' },

    // Stats
    stat1Number: { selector: '.stat__item:nth-child(1) .stat__number', property: 'data-target' },
    stat1Label: { selector: '.stat__item:nth-child(1) .stat__label', property: 'textContent' },
    stat2Number: { selector: '.stat__item:nth-child(2) .stat__number', property: 'data-target' },
    stat2Label: { selector: '.stat__item:nth-child(2) .stat__label', property: 'textContent' },
    stat3Number: { selector: '.stat__item:nth-child(3) .stat__number', property: 'data-target' },
    stat3Label: { selector: '.stat__item:nth-child(3) .stat__label', property: 'textContent' },
    stat4Number: { selector: '.stat__item:nth-child(4) .stat__number', property: 'data-target' },
    stat4Label: { selector: '.stat__item:nth-child(4) .stat__label', property: 'textContent' },

    // About Section
    aboutSubtitle: { selector: '.about .section__subtitle', property: 'textContent' },
    aboutTitle: { selector: '.about .section__title', property: 'textContent' },
    aboutDesc1: { selector: '.about__description:nth-of-type(1)', property: 'textContent' },
    aboutDesc2: { selector: '.about__description:nth-of-type(2)', property: 'textContent' },
    feature1Title: { selector: '.feature:nth-child(1) .feature__title', property: 'textContent' },
    feature1Text: { selector: '.feature:nth-child(1) .feature__text', property: 'textContent' },
    feature2Title: { selector: '.feature:nth-child(2) .feature__title', property: 'textContent' },
    feature2Text: { selector: '.feature:nth-child(2) .feature__text', property: 'textContent' },

    // Services Section
    servicesSubtitle: { selector: '.services .section__subtitle', property: 'textContent' },
    servicesTitle: { selector: '.services .section__title', property: 'textContent' },
    service1Title: { selector: '.service__card:nth-child(1) .service__title', property: 'textContent' },
    service1Desc: { selector: '.service__card:nth-child(1) .service__description', property: 'textContent' },
    service2Title: { selector: '.service__card:nth-child(2) .service__title', property: 'textContent' },
    service2Desc: { selector: '.service__card:nth-child(2) .service__description', property: 'textContent' },
    service3Title: { selector: '.service__card:nth-child(3) .service__title', property: 'textContent' },
    service3Desc: { selector: '.service__card:nth-child(3) .service__description', property: 'textContent' },
    service4Title: { selector: '.service__card:nth-child(4) .service__title', property: 'textContent' },
    service4Desc: { selector: '.service__card:nth-child(4) .service__description', property: 'textContent' },

    // Contact Section
    contactTitle: { selector: '.contact .section__title', property: 'textContent' },
    contactDesc: { selector: '.contact__description', property: 'textContent' },
    contactAddress: { selector: '.contact__item:nth-child(1) p', property: 'innerHTML' },
    contactPhone: { selector: '.contact__item:nth-child(2) p', property: 'textContent' },
    contactEmail: { selector: '.contact__item:nth-child(3) p', property: 'textContent' },

    // Top Bar Section
    topBarName: { selector: '.top-bar__name', property: 'innerHTML', isHTML: true },
    topBarPhone: { selector: '.top-bar__phone', property: 'innerHTML', isHTML: true }
};

// =============== STORAGE KEYS ===============
const STORAGE_KEY = 'eyalAdvisoryContent';
const BG_IMAGE_KEY = 'eyalAdvisoryBgImage';
const COLORS_KEY = 'eyalAdvisoryColors';

// =============== DEFAULT COLORS ===============
const DEFAULT_COLORS = {
    primaryColor: '#1a2849',
    secondaryColor: '#c9a96e',
    accentColor: '#2c3e5f',
    heroBgColor1: '#1a2849',
    heroBgColor2: '#2c3e5f'
};

// =============== DOM ELEMENTS ===============
const saveBtn = document.getElementById('saveAll');
const removeBgBtn = document.getElementById('removeBg');
const resetBgBtn = document.getElementById('resetBg');
const bgUpload = document.getElementById('bgUpload');
const bgPreviewImg = document.getElementById('bgPreviewImg');
const exportBtn = document.getElementById('exportBtn');
const importFile = document.getElementById('importFile');
const toast = document.getElementById('toast');

let baseContent = {}; // Store the initial content.json structure

// =============== INITIALIZATION ===============
document.addEventListener('DOMContentLoaded', () => {
    loadBaseContent(); // Load existing content.json first
    loadSavedContent();
    loadBackgroundImage();
    loadSavedColors();
    setupEventListeners();
    setupColorListeners();
    setupNavigation();
});

// =============== LOAD BASE CONTENT ===============
async function loadBaseContent() {
    try {
        const response = await fetch('../content.json');
        if (response.ok) {
            baseContent = await response.json();
        }
    } catch (e) {
        console.error('Error loading base content:', e);
    }
}

// =============== LOAD SAVED CONTENT ===============
function loadSavedContent() {
    const savedContent = localStorage.getItem(STORAGE_KEY);
    if (savedContent) {
        try {
            const content = JSON.parse(savedContent);
            Object.keys(content).forEach(key => {
                const input = document.getElementById(key);
                if (input) {
                    input.value = content[key];
                }
            });
        } catch (e) {
            console.error('Error loading saved content:', e);
        }
    }
}

// =============== LOAD BACKGROUND IMAGE ===============
function loadBackgroundImage() {
    const savedBgImage = localStorage.getItem(BG_IMAGE_KEY);
    if (savedBgImage) {
        bgPreviewImg.src = savedBgImage;
    }
}

// =============== SETUP EVENT LISTENERS ===============
function setupEventListeners() {
    // Save All Button
    saveBtn.addEventListener('click', saveAllContent);

    // Background Image Upload
    bgUpload.addEventListener('change', handleBgUpload);

    // Remove Background
    removeBgBtn.addEventListener('click', removeBackground);

    // Reset Background
    resetBgBtn.addEventListener('click', resetBackground);

    // Export Button
    exportBtn.addEventListener('click', exportContent);

    // Import File
    importFile.addEventListener('change', importContent);

    // Reset Colors
    const resetColorsBtn = document.getElementById('resetColors');
    if (resetColorsBtn) {
        resetColorsBtn.addEventListener('click', resetColors);
    }
}

// =============== SETUP COLOR LISTENERS ===============
function setupColorListeners() {
    const colorInputs = ['primaryColor', 'secondaryColor', 'accentColor', 'heroBgColor1', 'heroBgColor2'];

    colorInputs.forEach(id => {
        const colorInput = document.getElementById(id);
        const textInput = document.getElementById(id + 'Text');

        if (colorInput && textInput) {
            // Sync color picker to text input
            colorInput.addEventListener('input', () => {
                textInput.value = colorInput.value.toUpperCase();
                updateColorPreview();
            });

            // Sync text input to color picker
            textInput.addEventListener('input', () => {
                const value = textInput.value;
                if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
                    colorInput.value = value;
                    updateColorPreview();
                }
            });

            // Format on blur
            textInput.addEventListener('blur', () => {
                let value = textInput.value.trim();
                if (!value.startsWith('#')) {
                    value = '#' + value;
                }
                if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
                    textInput.value = value.toUpperCase();
                    colorInput.value = value;
                }
            });
        }
    });
}

// =============== UPDATE COLOR PREVIEW ===============
function updateColorPreview() {
    const primaryColor = document.getElementById('primaryColor')?.value || DEFAULT_COLORS.primaryColor;
    const secondaryColor = document.getElementById('secondaryColor')?.value || DEFAULT_COLORS.secondaryColor;
    const heroBgColor1 = document.getElementById('heroBgColor1')?.value || DEFAULT_COLORS.heroBgColor1;
    const heroBgColor2 = document.getElementById('heroBgColor2')?.value || DEFAULT_COLORS.heroBgColor2;

    const previewHeader = document.getElementById('previewHeader');
    const previewButton = document.getElementById('previewButton');
    const previewHeroBg = document.getElementById('previewHeroBg');

    if (previewHeader) {
        previewHeader.style.backgroundColor = primaryColor;
    }
    if (previewButton) {
        previewButton.style.backgroundColor = secondaryColor;
    }
    if (previewHeroBg) {
        previewHeroBg.style.background = `linear-gradient(135deg, ${heroBgColor1} 0%, ${heroBgColor2} 100%)`;
    }
}

// =============== LOAD SAVED COLORS ===============
function loadSavedColors() {
    const savedColors = localStorage.getItem(COLORS_KEY);
    if (savedColors) {
        try {
            const colors = JSON.parse(savedColors);
            Object.keys(colors).forEach(key => {
                const colorInput = document.getElementById(key);
                const textInput = document.getElementById(key + 'Text');
                if (colorInput) {
                    colorInput.value = colors[key];
                }
                if (textInput) {
                    textInput.value = colors[key].toUpperCase();
                }
            });
            updateColorPreview();
        } catch (e) {
            console.error('Error loading saved colors:', e);
        }
    }
}

// =============== RESET COLORS ===============
function resetColors() {
    Object.keys(DEFAULT_COLORS).forEach(key => {
        const colorInput = document.getElementById(key);
        const textInput = document.getElementById(key + 'Text');
        if (colorInput) {
            colorInput.value = DEFAULT_COLORS[key];
        }
        if (textInput) {
            textInput.value = DEFAULT_COLORS[key].toUpperCase();
        }
    });
    localStorage.removeItem(COLORS_KEY);
    updateColorPreview();
    showToast('✅ הצבעים הוחזרו לברירת מחדל', 'success');
}

// =============== SAVE ALL CONTENT ===============
async function saveAllContent() {
    const saveBtn = document.getElementById('saveAll');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = '⏳ שומר...';
    saveBtn.disabled = true;

    try {
        // 1. Save to LocalStorage (as backup/instant local cache)
        const localContent = {};
        Object.keys(contentFields).forEach(key => {
            const input = document.getElementById(key);
            if (input) {
                localContent[key] = input.value;
            }
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(localContent));

        // Save colors
        const colors = {
            primaryColor: document.getElementById('primaryColor')?.value || DEFAULT_COLORS.primaryColor,
            secondaryColor: document.getElementById('secondaryColor')?.value || DEFAULT_COLORS.secondaryColor,
            accentColor: document.getElementById('accentColor')?.value || DEFAULT_COLORS.accentColor,
            heroBgColor1: document.getElementById('heroBgColor1')?.value || DEFAULT_COLORS.heroBgColor1,
            heroBgColor2: document.getElementById('heroBgColor2')?.value || DEFAULT_COLORS.heroBgColor2
        };
        localStorage.setItem(COLORS_KEY, JSON.stringify(colors));

        // 2. Map to content.json structure
        const gitContent = JSON.parse(JSON.stringify(baseContent)); // Deep copy

        // Company
        if (!gitContent.company) gitContent.company = {};
        gitContent.company.name = document.getElementById('companyName').value;

        // Hero
        if (!gitContent.hero) gitContent.hero = {};
        gitContent.hero.title_line1 = document.getElementById('heroTitle').value;
        gitContent.hero.title_line2 = document.getElementById('heroTitleHighlight').value;
        gitContent.hero.description = document.getElementById('heroDescription').value;
        gitContent.hero.button_primary = document.getElementById('heroBtnPrimary').value;
        gitContent.hero.button_secondary = document.getElementById('heroBtnSecondary').value;

        // Stats
        if (!gitContent.stats) gitContent.stats = {};
        gitContent.stats.years = parseInt(document.getElementById('stat1Number').value);
        gitContent.stats.clients = parseInt(document.getElementById('stat2Number').value);
        gitContent.stats.transactions = parseInt(document.getElementById('stat3Number').value);
        gitContent.stats.satisfaction = parseInt(document.getElementById('stat4Number').value);

        // About
        if (!gitContent.about) gitContent.about = {};
        gitContent.about.subtitle = document.getElementById('aboutSubtitle').value;
        gitContent.about.title = document.getElementById('aboutTitle').value;
        gitContent.about.description1 = document.getElementById('aboutDesc1').value;
        gitContent.about.description2 = document.getElementById('aboutDesc2').value;

        if (!gitContent.about.features) gitContent.about.features = [{}, {}];
        if (!gitContent.about.features[0]) gitContent.about.features[0] = {};
        if (!gitContent.about.features[1]) gitContent.about.features[1] = {};

        gitContent.about.features[0].title = document.getElementById('feature1Title').value;
        gitContent.about.features[0].text = document.getElementById('feature1Text').value;
        gitContent.about.features[1].title = document.getElementById('feature2Title').value;
        gitContent.about.features[1].text = document.getElementById('feature2Text').value;

        // Services
        if (!gitContent.services) gitContent.services = {};
        gitContent.services.subtitle = document.getElementById('servicesSubtitle').value;
        gitContent.services.title = document.getElementById('servicesTitle').value;

        if (!gitContent.services.items) gitContent.services.items = [{}, {}, {}, {}];

        const serviceIds = ['service1', 'service2', 'service3', 'service4'];
        serviceIds.forEach((id, index) => {
            if (!gitContent.services.items[index]) gitContent.services.items[index] = {};
            gitContent.services.items[index].title = document.getElementById(id + 'Title').value;
            gitContent.services.items[index].description = document.getElementById(id + 'Desc').value;
        });

        // Contact
        if (!gitContent.contact) gitContent.contact = {};
        gitContent.contact.title = document.getElementById('contactTitle').value;
        gitContent.contact.description = document.getElementById('contactDesc').value;
        gitContent.contact.phone = document.getElementById('contactPhone').value;
        gitContent.contact.email = document.getElementById('contactEmail').value;

        // Handle Address (split by line)
        const addressLines = document.getElementById('contactAddress').value.split('\n');
        gitContent.contact.address_line1 = addressLines[0] || '';
        gitContent.contact.address_line2 = addressLines[1] || '';

        // Add Top Bar fields (new structure)
        if (!gitContent.topBar) gitContent.topBar = {};
        gitContent.topBar.name = document.getElementById('topBarName').value;
        gitContent.topBar.phone = document.getElementById('topBarPhone').value;

        // 3. Send to Netlify Function
        const response = await fetch('/.netlify/functions/save-content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: gitContent
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to save to server');
        }

        showToast('✅ השינויים נשמרו! האתר מתעדכן (1-2 דקות)...', 'success');

    } catch (error) {
        console.error('Save failed:', error);
        showToast('❌ שגיאה בשמירה: ' + error.message, 'error');
    } finally {
        saveBtn.textContent = originalText;
        saveBtn.disabled = false;
    }
}

// =============== HANDLE BACKGROUND UPLOAD ===============
function handleBgUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
        showToast('❌ יש להעלות קובץ תמונה בלבד', 'error');
        return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        showToast('❌ גודל התמונה מקסימלי הוא 5MB', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        const base64 = event.target.result;

        // Update preview
        bgPreviewImg.src = base64;

        // Save to localStorage
        localStorage.setItem(BG_IMAGE_KEY, base64);

        showToast('✅ תמונת הרקע עודכנה!', 'success');
    };
    reader.readAsDataURL(file);
}

// =============== REMOVE BACKGROUND ===============
function removeBackground() {
    localStorage.setItem(BG_IMAGE_KEY, 'none');
    bgPreviewImg.src = '';
    bgPreviewImg.alt = 'ללא תמונת רקע';
    showToast('✅ תמונת הרקע הוסרה', 'success');
}

// =============== RESET BACKGROUND ===============
function resetBackground() {
    localStorage.removeItem(BG_IMAGE_KEY);
    bgPreviewImg.src = '../Gemini-v1.png';
    showToast('✅ תמונת הרקע הוחזרה לברירת מחדל', 'success');
}

// =============== EXPORT CONTENT ===============
function exportContent() {
    const content = localStorage.getItem(STORAGE_KEY);
    const bgImage = localStorage.getItem(BG_IMAGE_KEY);
    const colors = localStorage.getItem(COLORS_KEY);

    const exportData = {
        content: content ? JSON.parse(content) : {},
        backgroundImage: bgImage || null,
        colors: colors ? JSON.parse(colors) : DEFAULT_COLORS,
        exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `eyal-advisory-content-${new Date().toISOString().split('T')[0]}.json`;
    a.click();

    URL.revokeObjectURL(url);
    showToast('✅ הקובץ יורד...', 'success');
}

// =============== IMPORT CONTENT ===============
function importContent(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const importData = JSON.parse(event.target.result);

            // Import content fields
            if (importData.content) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(importData.content));
                Object.keys(importData.content).forEach(key => {
                    const input = document.getElementById(key);
                    if (input) {
                        input.value = importData.content[key];
                    }
                });
            }

            // Import background image
            if (importData.backgroundImage) {
                localStorage.setItem(BG_IMAGE_KEY, importData.backgroundImage);
                if (importData.backgroundImage === 'none') {
                    bgPreviewImg.src = '';
                } else {
                    bgPreviewImg.src = importData.backgroundImage;
                }
            }

            // Import colors
            if (importData.colors) {
                localStorage.setItem(COLORS_KEY, JSON.stringify(importData.colors));
                Object.keys(importData.colors).forEach(key => {
                    const colorInput = document.getElementById(key);
                    const textInput = document.getElementById(key + 'Text');
                    if (colorInput) {
                        colorInput.value = importData.colors[key];
                    }
                    if (textInput) {
                        textInput.value = importData.colors[key].toUpperCase();
                    }
                });
                updateColorPreview();
            }

            showToast('✅ ההגדרות יובאו בהצלחה!', 'success');
        } catch (error) {
            showToast('❌ שגיאה בייבוא הקובץ', 'error');
            console.error('Import error:', error);
        }
    };
    reader.readAsText(file);

    // Reset file input
    e.target.value = '';
}

// =============== NAVIGATION ===============
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Smooth scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// =============== TOAST NOTIFICATION ===============
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
