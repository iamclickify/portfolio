function initMediaLog() {
  // Fallback data arrays to support local file:/// protocol (CORS restriction bypass)
  const fallbackAnime = [
    {
      "title": "One Piece",
      "status": "Watching",
      "takeaway": "An epic saga that reminds me how a shared dream and family can carry you through any storm.",
      "poster": "https://cdn.myanimelist.net/images/anime/1244/138851.jpg",
      "dateAdded": "2026-08-01"
    },
    {
      "title": "Naruto Shippuden",
      "status": "Completed",
      "takeaway": "Taught me that persistence and staying true to your path can overcome even the deepest cycle of hatred.",
      "poster": "https://cdn.myanimelist.net/images/anime/1565/111305.jpg",
      "dateAdded": "2026-07-15"
    },
    {
      "title": "Steins;Gate",
      "status": "Completed",
      "takeaway": "A mind-bending journey showing the crushing weight of time travel and the value of saving those you care about.",
      "poster": "https://cdn.myanimelist.net/images/anime/1935/127974.jpg",
      "dateAdded": "2026-06-10"
    }
  ];

  // Paths to resources
  const paths = {
    anime: '../data/anime.json'
  };

  // Helper function to fetch json safely
  async function fetchJSON(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP status ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn(`Failed to fetch ${url} (normal if viewing via file:// protocol):`, e);
      return null;
    }
  }

  // Load and render all journal parts
  async function loadJournal() {
    // Fetch anime data source
    let anime = await fetchJSON(paths.anime);

    // Bypassing CORS block under file:// protocol
    if (!anime || anime.length === 0) anime = fallbackAnime;

    // 1. Render Anime Cards
    renderAnime(anime);

    // Initialize Scroll Animations
    initScrollAnimations();

    // Re-initialize Lucide Icons so dynamically added markups render correctly
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // RENDER ANIME
  function renderAnime(items) {
    const container = document.getElementById('anime-list');
    if (!container) return;
    if (items.length === 0) {
      container.innerHTML = `<p style="color: var(--text-muted); font-size: 0.95rem;">No entries found.</p>`;
      return;
    }
    
    container.innerHTML = items.map(item => {
      return `
        <article class="journal-strip">
          <div class="strip-image-wrapper">
            <img class="strip-image" src="${item.poster}" alt="${item.title} Poster" loading="lazy" referrerpolicy="no-referrer">
          </div>
          <div class="strip-content">
            <div class="strip-header">
              <div class="strip-title-row">
                <h3 class="strip-title">${item.title}</h3>
              </div>
            </div>
            <p class="strip-takeaway">"${item.takeaway}"</p>
          </div>
        </article>
      `;
    }).join('');
  }

  // SCROLL ANIMATIONS (INTERSECTION OBSERVER)
  function initScrollAnimations() {
    const fadeSections = document.querySelectorAll('.fade-in-section');
    
    const observerOptions = {
      root: document.querySelector('.main') || null,
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries, self) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          self.unobserve(entry.target); // Trigger only once
        }
      });
    }, observerOptions);

    fadeSections.forEach(section => {
      observer.observe(section);
    });
  }

  // Start initialization
  loadJournal();
}

// Robust execution trigger: run immediately if DOM is already parsed, or wait for event
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMediaLog);
} else {
  initMediaLog();
}
