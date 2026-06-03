# Chulpakanqi — Ultra-Luxury Private Bungalows & Estates

Link: https://jllbmedia.github.io/chulpakanqi-website/

A premium, bespoke single-page landing website for **Chulpakanqi**, an ultra-exclusive luxury sanctuary in the Cusco Sacred Valley, Peru. This project showcases high-end web design practices, modern typography, custom bento-grid layouts, and rich, scroll-driven interactive experiences.

🌐 **Live Demo:** [Chulpakanqi Website](https://jllbmedia.github.io/chulpakanqi-website/)

---

## 🎨 Visuals & Aesthetics

The website is designed with a premium, immersive dark theme:
- **Primary Palette:** Volcanic Charcoal Black (`#080A0A`), Elevated Card Charcoal (`#121415`), and Refined Sand Gold (`#D6B280`).
- **Typography:** Modern styling using Google Fonts (Outfit for display headings and Geist for body text).
- **Responsive Layout:** Responsive Bento grid design that adapts perfectly to desktop, tablet, and mobile displays.

---

## 🚀 Key Features

- **Smooth Inertial Scrolling:** Powered by [Lenis](https://github.com/darkroomengineering/lenis) for a highly polished, luxurious scrolling feel.
- **GSAP & ScrollTrigger Animations:**
  - Dynamic page-entry timeline for the hero section elements.
  - Interactive scroll-driven zoom/scale effects on cards.
  - Word-by-word scroll-scrubbing text reveal in the experience narrative section.
- **Interactive Bento Grid Slider:** An auto-playing/interactive bento-card carousel displaying various estate amenities.
- **Premium Guest Testimonials:** A custom, animated reviews slider with transition effects.
- **Single-Focus FAQ Accordion:** Clean, custom-coded accordion with smooth max-height transitions using GSAP.
- **Secure Booking Gateway:** Form validation for reservation requests, including custom input state handling and simulated estate allocation check.

---

## 🛠️ Technologies Used

- **HTML5 & Semantic Markup:** Clean, search-engine-optimized structure using semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer >`).
- **Bespoke Vanilla CSS3:** Pure styling utilizing CSS custom properties (variables), fluid typography (via `clamp()`), flexbox, and CSS grid layout. No external utility frameworks are used, allowing maximum flexibility and lightweight performance.
- **Modern JavaScript (ES6+):** Pure vanilla JS for interaction logic and application state handling.
- **GSAP (GreenSock Animation Platform) & ScrollTrigger:** Standard-setting web animation library.
- **Lenis Smooth Scroll:** Modern smooth scroll library.
- **Phosphor Icons:** Thin, clean, luxury-oriented iconography.

---

## 📂 Project Structure

- `index.html`: Contains the core structure and HTML sections.
- `style.css`: Contains the responsive layout rules, design tokens, and element styles.
- `app.js`: Script containing Lenis, GSAP, testimonial slider, FAQ, and validation logic.
- `assets/`: Image directory containing the visual mockups and photos.

---

## 💻 Local Setup & Development

Since this project uses vanilla technologies, there are no dependencies to install. 

1. Clone this repository:
   ```bash
   git clone https://github.com/jllbmedia/chulpakanqi-website.git
   ```
2. Open `index.html` directly in your browser, or run a local development server (such as Live Server in VS Code, or python's HTTP server):
   ```bash
   # Python 3
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your web browser.
