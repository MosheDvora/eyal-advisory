# Eyal Advisory - Financial & Business Advisory Website

A modern, professional static website for a financial and business advisory firm specializing in Outsourced CFO, Accounting, Taxes, and Transaction Services. Built with vanilla HTML, CSS, and JavaScript for optimal performance and easy customization.

## Features

### Design & Layout
- **Professional Design**: Clean, corporate design with a green and gold color scheme
- **Fully Responsive**: Mobile-first design that works perfectly on all devices
- **Smooth Animations**: Scroll-based animations, fade-ins, and transitions
- **Modern Typography**: Google Fonts (Playfair Display for headings, Inter for body text)

### Sections
1. **Hero Section**: Eye-catching landing with gradient background and call-to-action buttons
2. **Stats Section**: Animated counter showcasing key metrics (Years, Clients, Transactions, Satisfaction)
3. **About Section**: Company overview with feature highlights
4. **Services Section**: 4 comprehensive service cards (Outsourced CFO, Accounting, Taxes, Transaction Services)
5. **Advisory Approach**: 4-step client-centered process explanation
6. **CTA Section**: Call-to-action with gradient background
7. **Contact Section**: Contact information and working form
8. **Footer**: Multi-column footer with links and social media

### Interactive Features
- Sticky navigation with scroll effect
- Mobile-friendly hamburger menu
- Smooth scrolling to sections
- Active link highlighting based on scroll position
- Animated counters in stats section
- Parallax effect on hero section
- Scroll-triggered fade-in animations
- Form validation with notifications
- Keyboard accessibility support

## File Structure

```
/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript for interactivity
└── README.md           # Documentation
```

## Getting Started

### Option 1: Open Directly
Simply open `index.html` in your web browser. No server required!

### Option 2: Local Development Server
For a better development experience with live reload:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Customization Guide

### Colors
Edit the CSS variables in `styles.css` (lines 2-10):

```css
:root {
    --primary-color: #006847;      /* Main green (British Racing Green) */
    --secondary-color: #c9a96e;    /* Gold accent */
    --accent-color: #008560;       /* Secondary green (lighter teal) */
    --text-color: #333;            /* Main text */
    --text-light: #666;            /* Secondary text */
}
```

### Content
1. **Company Name**: Search and replace "Eyal Advisory" throughout `index.html`
2. **Hero Section**: Edit lines 47-60 in `index.html`
3. **Stats**: Update `data-target` attributes (lines 68-87)
4. **Services**: Modify service cards (lines 132-215)
5. **Contact Info**: Update contact details (lines 287-326)

### Fonts
Current fonts: Playfair Display (headings) + Inter (body)
To change, edit the Google Fonts link in `index.html` (line 8) and CSS variables.

### Images
Replace the placeholder `image__placeholder` div (line 127) with:
```html
<img src="your-image.jpg" alt="Description">
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- Intersection Observer API for efficient scroll animations
- Debounced scroll events
- RequestAnimationFrame for smooth parallax
- Lazy loading support for images
- Minimal dependencies (no frameworks)
- Optimized CSS animations

## Form Functionality

The contact form includes:
- Client-side validation
- Email format validation
- Success/error notifications
- Form reset after submission

**Note**: The form currently shows a notification but doesn't send data to a server. To connect to a backend:

1. Uncomment and modify the fetch code in `script.js` (lines 189-193)
2. Replace `/api/contact` with your endpoint
3. Set up server-side handling

## Deployment

### GitHub Pages
1. Push files to a GitHub repository
2. Go to Settings > Pages
3. Select branch and root folder
4. Your site will be live at `https://username.github.io/repo-name`

### Netlify
1. Drag and drop the folder to Netlify
2. Or connect your Git repository
3. Instant deployment with CDN

### Other Hosting
Upload all files to your web hosting via FTP/SFTP. The site is fully static and works anywhere.

## Accessibility

- Semantic HTML5 markup
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators for keyboard users
- Sufficient color contrast ratios
- Responsive text sizing

## License

This is a template website. Feel free to use and modify for your projects.

## Support

For issues or questions, please refer to the documentation or modify the code to suit your needs.

---

**Built with:** HTML5 | CSS3 | Vanilla JavaScript
**No frameworks required** - Pure, performant code

