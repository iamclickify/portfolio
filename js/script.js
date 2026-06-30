document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. SIDEBAR ACTIVE STATES
  // ==========================================
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(nl => nl.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // ==========================================
  // 2. AUDIO PLAYER LOGIC
  // ==========================================
  const audio = document.getElementById('audio-player');
  const playBtn = document.getElementById('play-btn');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const progressBar = document.getElementById('progress-bar');
  const progressContainer = document.getElementById('progress-container');
  const visualizer = document.getElementById('visualizer');

  if (audio && playBtn) {
    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().then(() => {
          playIcon.classList.add('hidden');
          pauseIcon.classList.remove('hidden');
          visualizer.classList.add('playing');
        }).catch(err => {
          console.error("Audio playback error:", err);
        });
      } else {
        audio.pause();
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        visualizer.classList.remove('playing');
      }
    });

    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        const pct = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${pct}%`;
      }
    });

    // Reset indicator if the track finishes playing (if loop is disabled)
    audio.addEventListener('ended', () => {
      if (!audio.loop) {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        visualizer.classList.remove('playing');
        progressBar.style.width = '0%';
      }
    });

    progressContainer.addEventListener('click', (e) => {
      if (audio.duration) {
        const rect = progressContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const pct = clickX / width;
        audio.currentTime = pct * audio.duration;
      }
    });
  }
});
