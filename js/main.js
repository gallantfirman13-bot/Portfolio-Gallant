/* ============================================================
   MAIN.JS — JavaScript untuk interaktivitas portfolio
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- 1. HAMBURGER MENU (mobile) ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }


  /* ---- 2. DARK MODE TOGGLE ----
     Simpan pilihan tema di localStorage agar diingat saat halaman di-refresh */
  const themeToggle = document.getElementById('themeToggle');
  const html        = document.documentElement;  // tag <html>

  // Cek apakah user sebelumnya sudah pilih dark mode
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    html.classList.add('dark');
    if (themeToggle) themeToggle.textContent = '☀️';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      html.classList.toggle('dark');
      const isDark = html.classList.contains('dark');

      // Ganti ikon toggle
      themeToggle.textContent = isDark ? '☀️' : '🌙';

      // Simpan preferensi ke localStorage
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }


  /* ---- 3. ACTIVE LINK DI NAVBAR ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
  });


  /* ---- 4. ANIMASI FADE-UP saat scroll ---- */
  const fadeEls = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(function (el) { observer.observe(el); });


  /* ---- 5. (skill bar persentase sudah dihapus — sekarang cukup pakai
             label kualitatif di .skill-level, tanpa progress bar) ---- */

  /* ---- 6. UPLOAD & PREVIEW SCREENSHOT (halaman project) ---- */
  const screenshotArea  = document.getElementById('screenshotArea');
  const screenshotInput = document.getElementById('screenshotInput');
  const screenshotImg   = document.getElementById('screenshotImg');
  const uploadHint      = document.getElementById('uploadHint');

  if (screenshotArea && screenshotInput) {
    screenshotArea.addEventListener('click', function () {
      screenshotInput.click();
    });

    screenshotArea.addEventListener('dragover', function (e) {
      e.preventDefault();
      screenshotArea.style.borderColor = 'var(--color-accent)';
    });

    screenshotArea.addEventListener('dragleave', function () {
      screenshotArea.style.borderColor = '';
    });

    screenshotArea.addEventListener('drop', function (e) {
      e.preventDefault();
      screenshotArea.style.borderColor = '';
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) showPreview(file);
    });

    screenshotInput.addEventListener('change', function () {
      const file = screenshotInput.files[0];
      if (file) showPreview(file);
    });

    function showPreview(file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        screenshotImg.src = e.target.result;
        screenshotImg.style.display = 'block';
        if (uploadHint) uploadHint.style.display = 'none';
        screenshotArea.classList.add('has-image');
      };
      reader.readAsDataURL(file);
    }
  }


  /* ---- 7. BACK TO TOP BUTTON ---- */
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    // Tampilkan tombol setelah scroll 300px ke bawah
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ---- 8. ACTIVE NAV LINK saat scroll (hanya di home) ---- */
  const sections = document.querySelectorAll('section[id]');

  if (sections.length > 0) {
    window.addEventListener('scroll', function () {
      let current = '';
      sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      document.querySelectorAll('.nav-links a').forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  }


  /* ---- 9. YEAR OTOMATIS DI FOOTER ---- */
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
