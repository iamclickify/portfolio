# Clickify — Personal Portfolio

A lightweight, static developer portfolio and writing site for myself.

This repository stores the codebase of my portfolio website.


**Tech stack & libraries**
- Plain HTML5, CSS3, and vanilla JavaScript (no build step).
- Fonts loaded from Google Fonts (Outfit, Inter, JetBrains Mono).
- Progressive enhancement patterns: IntersectionObserver for scroll animations and lazy-loaded images.

## Repository Structure

```text
portfolio/
├── assets/                     
├── css/                       
├── data/                       
├── js/                         
├── pages/                     
│   ├── writings/              
├── posts/                      
├── extractor.html
├── index.html                  
├── README.md                   
├── script.js                   
└── style.css                   
```

Development notes

- No build system: drop the folder into any static host.
- Local file:// usage: some fetch() calls to JSON may fail under strict CORS when served via `file://` — `js/media-log.js` includes fallback arrays so the media log still renders when opened locally.
- UX details: The site uses `IntersectionObserver` for fade-in animations and `loading="lazy"` on images to reduce initial load.

Deployment

- Host on GitHub Pages


This repository does not contain an explicit LICENSE file.


