document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // SIDEBAR ACTIVE STATES
  // ==========================================
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(nl => nl.classList.remove('active'));
      link.classList.add('active');
    });
  });
});
