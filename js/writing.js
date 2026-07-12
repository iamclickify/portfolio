document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.getElementById('progress-bar');
  const tocList = document.getElementById('toc-list');
  const headings = document.querySelectorAll('.article-content h2, .article-content h3');
  const tocItems = document.querySelectorAll('.toc-item');

  // Smooth scroll for TOC links
  if (tocList) {
    tocList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          // Update URL hash without jumping
          history.pushState(null, null, `#${targetId}`);
        }
      });
    });
  }

  // Scroll listener for reading progress bar and TOC active highlights
  function handleScroll() {
    // 1. Reading Progress Bar
    if (progressBar) {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight > 0) {
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
      } else {
        progressBar.style.width = '0%';
      }
    }

    // 2. Highlight Active Section in TOC
    if (headings.length > 0 && tocItems.length > 0) {
      let activeHeadingId = '';
      const scrollThreshold = 120; // Scroll threshold offset in px

      for (let i = 0; i < headings.length; i++) {
        const rect = headings[i].getBoundingClientRect();
        if (rect.top <= scrollThreshold) {
          activeHeadingId = headings[i].id;
        } else if (i === 0) {
          activeHeadingId = headings[0].id;
        }
      }

      tocItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === `#${activeHeadingId}`) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  }

  // Bind scroll event
  window.addEventListener('scroll', handleScroll);
  // Trigger once on load to initialize state
  handleScroll();
});
