/* ============================================================
   MAIN.JS — JavaScript untuk interaktivitas portfolio
   
   JavaScript = bahasa pemrograman yang membuat halaman web
   menjadi interaktif (animasi, klik, dsb.)
   ============================================================ */


/* ---- 1. TUNGGU SAMPAI HALAMAN SELESAI DIMUAT ----
   DOMContentLoaded = event yang terpicu saat HTML selesai dibaca browser */
document.addEventListener('DOMContentLoaded', function () {

  /* ---- 2. HAMBURGER MENU (mobile) ----
     Saat tombol ☰ diklik, munculkan / sembunyikan menu navigasi */
  const navToggle = document.querySelector('.nav-toggle');   // tombol hamburger
  const navLinks  = document.querySelector('.nav-links');    // daftar link nav

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      // .classList.toggle() = tambahkan class jika belum ada, hapus jika sudah ada
      navLinks.classList.toggle('open');
      // Ubah aria-label untuk aksesibilitas (screen reader)
      const isOpen = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
    });

    // Tutup menu saat link diklik (di mobile setelah navigasi)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }


  /* ---- 3. ACTIVE LINK DI NAVBAR ----
     Tandai link nav yang sesuai dengan halaman yang sedang dibuka */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });


  /* ---- 4. ANIMASI FADE-UP saat scroll ----
     Elemen dengan class .fade-up akan muncul perlahan saat masuk viewport */
  const fadeEls = document.querySelectorAll('.fade-up');

  // IntersectionObserver = API browser untuk mendeteksi elemen masuk layar
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Tambahkan class .visible → CSS akan men-trigger transisi
        entry.target.classList.add('visible');
        // Hentikan observasi agar tidak berulang
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1   // terpicu saat 10% elemen terlihat
  });

  fadeEls.forEach(function (el) { observer.observe(el); });


  /* ---- 5. ANIMASI SKILL BAR ----
     Progress bar skill melebar dari 0% ke nilai yang kita tentukan */
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const barObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const bar   = entry.target;
        const width = bar.getAttribute('data-width');  // ambil nilai dari HTML
        bar.style.width = width + '%';
        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(function (bar) { barObserver.observe(bar); });


  /* ---- 6. UPLOAD & PREVIEW SCREENSHOT (halaman project) ----
     Klik area dashed box → buka file picker → tampilkan gambar */
  const screenshotArea  = document.getElementById('screenshotArea');
  const screenshotInput = document.getElementById('screenshotInput');
  const screenshotImg   = document.getElementById('screenshotImg');
  const uploadHint      = document.getElementById('uploadHint');

  if (screenshotArea && screenshotInput) {
    // Klik area = klik input file (tersembunyi)
    screenshotArea.addEventListener('click', function () {
      screenshotInput.click();
    });

    // Drag & drop support
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
      if (file && file.type.startsWith('image/')) {
        showPreview(file);
      }
    });

    // Saat file dipilih dari file picker
    screenshotInput.addEventListener('change', function () {
      const file = screenshotInput.files[0];
      if (file) showPreview(file);
    });

    function showPreview(file) {
      // FileReader = API untuk membaca file sebagai URL data
      const reader = new FileReader();
      reader.onload = function (e) {
        screenshotImg.src    = e.target.result;
        screenshotImg.style.display = 'block';
        if (uploadHint) uploadHint.style.display = 'none';
        screenshotArea.classList.add('has-image');
      };
      reader.readAsDataURL(file);   // baca file sebagai base64 URL
    }
  }


  /* ---- 7. YEAR OTOMATIS DI FOOTER ----
     Tahun copyright tidak perlu diganti manual setiap tahun baru */
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
/* ---- Akhir DOMContentLoaded ---- */
