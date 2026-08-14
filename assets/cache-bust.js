// assets/cache-bust.js
document.addEventListener('DOMContentLoaded', function() {
  // Generate a cache-busting value (timestamp)
  const bust = Date.now();
  // Find all anchor tags linking to resume.pdf
  const links = document.querySelectorAll('a[href*="resume.pdf"]');
  links.forEach(link => {
    try {
      const url = new URL(link.href, location.href);
      // Preserve existing query params but set/replace v
      url.searchParams.set('v', bust);
      link.href = url.toString();
    } catch (e) {
      // Fallback for relative URLs
      const parts = link.getAttribute('href').split('?')[0];
      link.setAttribute('href', parts + '?v=' + bust);
    }
  });
});
