// smooth scrolling (buttery inertia scroll instead of the browser's default
// linear "scroll-behavior:smooth" jump). Falls back silently to normal native
// scrolling if the CDN script didn't load, and is skipped entirely when the
// user has requested reduced motion.
let lenis = null;
const reduceMotionMQ = window.matchMedia('(prefers-reduced-motion: reduce)');

function initSmoothScroll(){
  if(typeof Lenis === 'undefined' || reduceMotionMQ.matches) return;

  lenis = new Lenis({
    duration: 1.1,
    easing: (t)=> 1 - Math.pow(1 - t, 4), // easeOutQuart: quick start, gentle settle
    smoothWheel: true,
    smoothTouch: false // native touch scroll already feels good on mobile; re-smoothing it adds lag
  });

  function raf(time){
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Let Lenis drive programmatic scroll instead of the CSS scroll-behavior,
  // so both don't fight each other on the same anchor jump.
  document.documentElement.style.scrollBehavior = 'auto';

  // In-page nav links (#about, #skills, etc.) scroll with the same eased motion,
  // offset so content doesn't land hidden under the fixed floating nav pill.
  document.querySelectorAll('a[href^="#"]').forEach(link=>{
    const targetId = link.getAttribute('href');
    if(targetId.length <= 1) return; // skip bare "#" links
    link.addEventListener('click', (e)=>{
      const target = document.querySelector(targetId);
      if(!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -90 });
    });
  });
}
initSmoothScroll();

// ---------- i18n: ID / EN ----------
const translations = {
  id: {
    'meta.title': 'CD4Y — Portofolio',
    'meta.description': 'Hidayatullah — perancang produk & front-end engineer yang membangun antarmuka imersif dan berperforma tinggi untuk brand dan startup ambisius.',
    'skip': 'Lewati ke konten utama',
    'loader.text': 'Memuat Pengalaman...',
    'nav.menu': 'Buka menu',
    'nav.about': 'Tentang',
    'nav.skills': 'Keahlian',
    'nav.portfolio': 'Portofolio',
    'nav.experience': 'Pengalaman',
    'nav.services': 'Layanan',
    'nav.cta': 'Kontak',
    'nav.langGroup': 'Pilih bahasa',
    'nav.themeTitle': 'Ubah mode gelap',
    'hero.greeting': 'Halo, saya',
    'hero.rolePrefix': 'Saya sebagai',
    'hero.lead': 'Seorang perancang produk & front-end engineer yang membangun antarmuka imersif dan berperforma tinggi untuk brand dan startup yang ambisius.',
    'hero.ctaPrimary': 'Lihat Portofolio →',
    'hero.ctaSecondary': 'Mulai Proyek',
    'hero.roles': ['Pengembang Web', 'Desainer UI/UX', 'Pengembang Game', 'Analis Data'],
    'about.eyebrow': 'Tentang Saya',
    'about.name': 'Nama',
    'about.nickname': 'Panggilan',
    'about.npm': 'NPM',
    'about.residence': 'Tempat Tinggal',
    'about.eduHeading': 'Pendidikan',
    'about.edu1.year': '2025 — Sekarang',
    'about.edu1.field': 'Informatika',
    'about.edu2.year': '2020 — 2023',
    'about.edu2.field': 'Teknik Kendaraan Ringan',
    'skills.eyebrow': 'Keahlian',
    'skills.heading': 'Bahasa & alat yang saya kuasai',
    'skills.lead': 'Disusun dari yang paling sering saya pakai di bagian atas.',
    'skills.sub1': 'Bahasa Pemrograman',
    'skills.sub2': 'Keahlian Lainnya',
    'portfolio.eyebrow': 'Portofolio',
    'portfolio.heading': 'Karya pilihan',
    'portfolio.lead': 'Beberapa proyek terbaru yang mencakup desain produk, situs brand, dan eksperimen interaktif.',
    'portfolio.visitSite': 'Kunjungi Situs',
    'portfolio.card1.title': 'Absensi',
    'portfolio.card1.aria': 'Buka situs Absensi',
    'portfolio.card2.title': 'Permintaan Maaf',
    'portfolio.card2.aria': 'Buka situs Permintaan Maaf',
    'portfolio.card3.title': 'Kasir',
    'portfolio.card3.aria': 'Buka situs Kasir',
    'experience.eyebrow': 'Pengalaman',
    'experience.heading': 'Tempat-tempat saya berkarya',
    'experience.lead': 'Perjalanan melalui studio produk, startup, dan praktik independen.',
    'experience.item1.date': '2023 — Sekarang',
    'experience.item1.role': 'Principal Product Designer',
    'experience.item1.desc': 'Memimpin desain untuk perkakas berbasis AI, mengelola design system dan arsitektur front-end untuk produk unggulan.',
    'experience.item2.role': 'Senior UI/UX Designer',
    'experience.item2.desc': 'Merancang dan merilis pengalaman dasbor inti yang digunakan oleh 200 ribu+ merchant di seluruh dunia.',
    'experience.item3.date': '2018 — 2020',
    'experience.item3.role': 'Front-End Developer',
    'experience.item3.desc': 'Membangun situs pemasaran interaktif dan eksperimen brand untuk klien agensi kreatif.',
    'experience.item4.date': '2016 — 2018',
    'experience.item4.role': 'Desainer Lepas (Freelance)',
    'experience.item4.org': 'Praktik Independen',
    'experience.item4.desc': 'Mengerjakan proyek brand dan desain web untuk startup tahap awal di Asia Tenggara.',
    'services.eyebrow': 'Layanan',
    'services.heading': 'Bagaimana saya bisa membantu',
    'services.lead': 'Model kerja sama yang fleksibel, tergantung tahap perkembangan produk Anda saat ini.',
    'services.card1.title': 'Desain Produk',
    'services.card1.desc': 'Riset UX menyeluruh, wireframing, dan UI berkualitas tinggi untuk produk web dan mobile.',
    'services.card1.li1': 'Riset pengguna & alur',
    'services.card1.li2': 'Wireframe & prototipe',
    'services.card1.li3': 'Design system',
    'services.card2.title': 'Pengembangan Front-End',
    'services.card2.desc': 'Implementasi presisi piksel dan berperforma tinggi di React dengan perhatian penuh pada motion dan detail.',
    'services.card2.li1': 'React & TypeScript',
    'services.card2.li2': 'Animasi & mikro-interaksi',
    'services.card2.li3': 'Aksesibilitas & performa',
    'services.card3.title': 'Brand & Pengalaman Web',
    'services.card3.desc': 'Identitas visual yang dipadukan dengan situs imersif yang mengekspresikannya secara utuh.',
    'services.card3.li1': 'Identitas merek',
    'services.card3.li2': 'Art direction',
    'services.card3.li3': 'Eksperimen 3D & WebGL',
    'blog.eyebrow': 'Tulisan',
    'blog.heading': 'Catatan dari studio',
    'blog.lead': 'Pemikiran seputar design system, motion, dan membangun antarmuka yang terasa matang.',
    'blog.readNote': 'Baca catatan',
    'blog.card1.tag': 'DESIGN SYSTEM',
    'blog.card1.title': 'Token adalah bahasa, bukan spreadsheet',
    'blog.card1.desc': 'Mengapa memperlakukan design token sebagai kosakata mengubah cara tim mengembangkan sebuah sistem.',
    'blog.card2.tag': 'MOTION',
    'blog.card2.title': 'Mengatur koreografi scroll tanpa berlebihan',
    'blog.card2.desc': 'Kerangka kerja praktis untuk menentukan kapan motion pantas ditampilkan di sebuah halaman.',
    'blog.card3.tag': 'REKAYASA',
    'blog.card3.title': 'Glassmorphism, dengan tetap terkendali',
    'blog.card3.desc': 'Mengatur blur, kedalaman, dan kontras dengan tepat tanpa mengorbankan keterbacaan.',
    'contact.eyebrow': 'Kontak',
    'contact.heading': 'Mari membangun sesuatu yang luar biasa.',
    'contact.lead': 'Punya proyek dalam pikiran, atau sekadar ingin menyapa? Kotak masuk saya selalu terbuka — biasanya saya membalas dalam satu hari.',
    'contact.emailLabel': 'Email',
    'contact.locationLabel': 'Lokasi',
    'contact.availabilityLabel': 'Ketersediaan',
    'contact.availabilityValue': 'Menerima proyek mulai Agustus 2026',
    'contact.form.name': 'Nama',
    'contact.form.namePh': 'Nama Anda',
    'contact.form.email': 'Email',
    'contact.form.emailPh': 'anda@perusahaan.com',
    'contact.form.subject': 'Subjek',
    'contact.form.subjectPh': 'Pertanyaan proyek',
    'contact.form.message': 'Pesan',
    'contact.form.messagePh': 'Ceritakan tentang proyek Anda...',
    'contact.form.submit': 'Kirim Pesan →',
    'footer.tagline': 'Creative developer yang membangun produk digital berperforma tinggi dan matang.',
    'footer.navHeading': 'Navigasi',
    'footer.socialHeading': 'Sosial',
    'footer.copyright': '© 2026 CD4Y. Seluruh hak dilindungi.'
  },
  en: {
    'meta.title': 'CD4Y — Portfolio',
    'meta.description': 'Hidayatullah — a product designer & front-end engineer building immersive, high-performance interfaces for ambitious brands and startups.',
    'skip': 'Skip to main content',
    'loader.text': 'Loading Experience...',
    'nav.menu': 'Open menu',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.portfolio': 'Portfolio',
    'nav.experience': 'Experience',
    'nav.services': 'Services',
    'nav.cta': 'Contact',
    'nav.langGroup': 'Choose language',
    'nav.themeTitle': 'Toggle dark mode',
    'hero.greeting': "Hi, I'm",
    'hero.rolePrefix': 'I work as a',
    'hero.lead': 'A product designer & front-end engineer building immersive, high-performance interfaces for ambitious brands and startups.',
    'hero.ctaPrimary': 'View Portfolio →',
    'hero.ctaSecondary': 'Start a Project',
    'hero.roles': ['Web Developer', 'UI/UX Designer', 'Game Developer', 'Data Analyst'],
    'about.eyebrow': 'About Me',
    'about.name': 'Name',
    'about.nickname': 'Nickname',
    'about.npm': 'Student ID',
    'about.residence': 'Location',
    'about.eduHeading': 'Education',
    'about.edu1.year': '2025 — Present',
    'about.edu1.field': 'Informatics',
    'about.edu2.year': '2020 — 2023',
    'about.edu2.field': 'Light Vehicle Engineering',
    'skills.eyebrow': 'Skills',
    'skills.heading': 'Languages & tools I work with',
    'skills.lead': 'Arranged with what I use most often at the top.',
    'skills.sub1': 'Programming Languages',
    'skills.sub2': 'Other Skills',
    'portfolio.eyebrow': 'Portfolio',
    'portfolio.heading': 'Selected work',
    'portfolio.lead': 'A few recent projects spanning product design, brand sites, and interactive experiments.',
    'portfolio.visitSite': 'Visit Site',
    'portfolio.card1.title': 'Attendance',
    'portfolio.card1.aria': 'Open the Attendance site',
    'portfolio.card2.title': 'Apology',
    'portfolio.card2.aria': 'Open the Apology site',
    'portfolio.card3.title': 'Cashier',
    'portfolio.card3.aria': 'Open the Cashier site',
    'experience.eyebrow': 'Experience',
    'experience.heading': "Where I've worked",
    'experience.lead': 'A journey through product studios, startups, and independent practice.',
    'experience.item1.date': '2023 — Present',
    'experience.item1.role': 'Principal Product Designer',
    'experience.item1.desc': 'Leading design for AI-powered tools, overseeing the design system and front-end architecture for flagship products.',
    'experience.item2.role': 'Senior UI/UX Designer',
    'experience.item2.desc': 'Designed and shipped the core dashboard experience used by 200K+ merchants worldwide.',
    'experience.item3.date': '2018 — 2020',
    'experience.item3.role': 'Front-End Developer',
    'experience.item3.desc': 'Built interactive marketing sites and brand experiments for creative agency clients.',
    'experience.item4.date': '2016 — 2018',
    'experience.item4.role': 'Freelance Designer',
    'experience.item4.org': 'Independent Practice',
    'experience.item4.desc': 'Worked on brand and web design projects for early-stage startups across Southeast Asia.',
    'services.eyebrow': 'Services',
    'services.heading': 'How I can help',
    'services.lead': 'A flexible working model, depending on the current stage of your product.',
    'services.card1.title': 'Product Design',
    'services.card1.desc': 'Thorough UX research, wireframing, and high-quality UI for web and mobile products.',
    'services.card1.li1': 'User & flow research',
    'services.card1.li2': 'Wireframes & prototypes',
    'services.card1.li3': 'Design system',
    'services.card2.title': 'Front-End Development',
    'services.card2.desc': 'Pixel-precise, high-performance implementation in React with close attention to motion and detail.',
    'services.card2.li1': 'React & TypeScript',
    'services.card2.li2': 'Animation & micro-interactions',
    'services.card2.li3': 'Accessibility & performance',
    'services.card3.title': 'Brand & Web Experience',
    'services.card3.desc': 'Visual identity paired with immersive sites that express it fully.',
    'services.card3.li1': 'Brand identity',
    'services.card3.li2': 'Art direction',
    'services.card3.li3': '3D & WebGL experiments',
    'blog.eyebrow': 'Writing',
    'blog.heading': 'Notes from the studio',
    'blog.lead': 'Thoughts on design systems, motion, and building interfaces that feel considered.',
    'blog.readNote': 'Read note',
    'blog.card1.tag': 'DESIGN SYSTEM',
    'blog.card1.title': 'Tokens are a language, not a spreadsheet',
    'blog.card1.desc': 'Why treating design tokens as vocabulary changes how a team grows a system.',
    'blog.card2.tag': 'MOTION',
    'blog.card2.title': 'Choreographing scroll without overdoing it',
    'blog.card2.desc': 'A practical framework for deciding when motion earns its place on a page.',
    'blog.card3.tag': 'ENGINEERING',
    'blog.card3.title': 'Glassmorphism, kept in check',
    'blog.card3.desc': 'Tuning blur, depth, and contrast without sacrificing readability.',
    'contact.eyebrow': 'Contact',
    'contact.heading': "Let's build something remarkable.",
    'contact.lead': 'Got a project in mind, or just want to say hi? My inbox is always open — I usually reply within a day.',
    'contact.emailLabel': 'Email',
    'contact.locationLabel': 'Location',
    'contact.availabilityLabel': 'Availability',
    'contact.availabilityValue': 'Open for projects starting August 2026',
    'contact.form.name': 'Name',
    'contact.form.namePh': 'Your name',
    'contact.form.email': 'Email',
    'contact.form.emailPh': 'you@company.com',
    'contact.form.subject': 'Subject',
    'contact.form.subjectPh': 'Project inquiry',
    'contact.form.message': 'Message',
    'contact.form.messagePh': 'Tell me about your project...',
    'contact.form.submit': 'Send Message →',
    'footer.tagline': 'A creative developer building mature, high-performance digital products.',
    'footer.navHeading': 'Navigation',
    'footer.socialHeading': 'Social',
    'footer.copyright': '© 2026 CD4Y. All rights reserved.'
  }
};

let currentLang = localStorage.getItem('lang') === 'en' ? 'en' : 'id';

function applyLanguage(lang){
  const dict = translations[lang] || translations.id;
  currentLang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(dict[key] !== undefined) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const key = el.getAttribute('data-i18n-placeholder');
    if(dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el=>{
    const key = el.getAttribute('data-i18n-aria');
    if(dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el=>{
    const key = el.getAttribute('data-i18n-title');
    if(dict[key] !== undefined) el.setAttribute('title', dict[key]);
  });
  document.querySelectorAll('[data-i18n-content]').forEach(el=>{
    const key = el.getAttribute('data-i18n-content');
    if(dict[key] !== undefined) el.setAttribute('content', dict[key]);
  });

  document.getElementById('html-root').setAttribute('lang', lang);

  langButtons.forEach(btn=>{
    const active = btn.getAttribute('data-lang') === lang;
    btn.setAttribute('aria-pressed', String(active));
  });
  if(langToggleEl) langToggleEl.setAttribute('data-active', lang);

  localStorage.setItem('lang', lang);
  restartTypeLoop(); // job titles need to swap language too
}

const langButtons = document.querySelectorAll('.lang-btn');
const langToggleEl = document.querySelector('.lang-toggle');
langButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const lang = btn.getAttribute('data-lang');
    if(lang !== currentLang) applyLanguage(lang);
  });
});

// typing / deleting effect for job roles — pulls its word list from the
// active language so switching ID/EN mid-animation swaps cleanly.
const typedRoleEl = document.getElementById('typed-role');
let jobIndex = 0, charIndex = 0, isDeleting = false, typeTimer = null;

function typeLoop(){
  const jobTitles = translations[currentLang]['hero.roles'];
  const current = jobTitles[jobIndex % jobTitles.length];
  if(!isDeleting){
    charIndex++;
    typedRoleEl.textContent = current.slice(0, charIndex);
    if(charIndex === current.length){
      isDeleting = true;
      typeTimer = setTimeout(typeLoop, 1400); // pause before deleting
      return;
    }
    typeTimer = setTimeout(typeLoop, 90);
  } else {
    charIndex--;
    typedRoleEl.textContent = current.slice(0, charIndex);
    if(charIndex === 0){
      isDeleting = false;
      jobIndex = (jobIndex + 1) % jobTitles.length;
      typeTimer = setTimeout(typeLoop, 400); // pause before typing next
      return;
    }
    typeTimer = setTimeout(typeLoop, 45);
  }
}
function restartTypeLoop(){
  if(typeTimer) clearTimeout(typeTimer);
  jobIndex = 0; charIndex = 0; isDeleting = false;
  if(typedRoleEl) typeLoop();
}
typeLoop();
applyLanguage(currentLang); // sync all data-i18n text, toggle UI, and <html lang> on load

// theme toggle (light = current site theme, dark = new dark variant)
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
function applyTheme(theme){
  if(theme === 'dark'){
    root.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
  } else {
    root.removeAttribute('data-theme');
    themeToggle.checked = false;
  }
}
const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme === 'dark' ? 'dark' : 'light');
themeToggle.addEventListener('change', ()=>{
  const next = themeToggle.checked ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, {threshold:0.15});
revealEls.forEach(el=> io.observe(el));

// header: elevate to a solid background + shadow once the page is scrolled
const siteHeader = document.querySelector('header');
let scrollTicking = false;
function updateHeaderScrollState(){
  siteHeader.classList.toggle('scrolled', window.scrollY > 12);
  scrollTicking = false;
}
window.addEventListener('scroll', ()=>{
  if(!scrollTicking){
    requestAnimationFrame(updateHeaderScrollState);
    scrollTicking = true;
  }
}, { passive:true });
updateHeaderScrollState();

// mobile menu toggle — flip classes; the slide-in panel visuals live entirely in CSS
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navBackdrop = document.querySelector('.nav-backdrop');

// Matches the CSS breakpoint where .nav-links switches from an always-visible
// inline row (desktop) to a collapsible dropdown (mobile/tablet).
const mobileMenuQuery = window.matchMedia('(max-width: 1024px)');

function setMenu(open){
  navLinks.classList.toggle('open', open);
  navBackdrop.classList.toggle('open', open);
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  syncNavInert();
}

// Accessibility fix: on mobile the closed dropdown was set to max-height:0 +
// opacity:0, but its links stayed in the DOM and focusable — a keyboard user
// tabbing through the page could tab into invisible links inside it. `inert`
// removes hidden-and-closed nav-links from both focus and the a11y tree,
// without touching anything visual. Only applied on mobile: on desktop the
// same element is the always-visible inline nav and must stay interactive.
function syncNavInert(){
  const shouldBeInert = mobileMenuQuery.matches && !navLinks.classList.contains('open');
  navLinks.toggleAttribute('inert', shouldBeInert);
}
syncNavInert();
mobileMenuQuery.addEventListener('change', syncNavInert);

burger.addEventListener('click', ()=> setMenu(!navLinks.classList.contains('open')));
navBackdrop.addEventListener('click', ()=> setMenu(false));
navLinks.querySelectorAll('a').forEach(link=>{
  link.addEventListener('click', ()=> setMenu(false));
});
window.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') setMenu(false);
});

// ambient particle canvas (connecting dots web)
const canvas = document.createElement('canvas');
canvas.id = 'bg-canvas';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');
let w, h, particles = [];
function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = document.body.scrollHeight;
}
function initParticles(){
  particles = Array.from({length: Math.min(70, Math.floor(w/22))}, ()=>({
    x: Math.random()*w, y: Math.random()*h,
    vx: (Math.random()-0.5)*0.15, vy: (Math.random()-0.5)*0.15,
    r: Math.random()*1.4+0.4
  }));
}
resize(); initParticles();

// Mobile browsers fire 'resize' when the address-bar toolbar hides/shows on scroll,
// even though the width hasn't changed. Rebuilding everything on that noise causes
// visible flicker/jank. Only rebuild for a genuine width change (rotation, real resize),
// and debounce so rapid-fire events collapse into one update.
let lastWidth = window.innerWidth;
let resizeTimer = null;
window.addEventListener('resize', ()=>{
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(()=>{
    const newWidth = window.innerWidth;
    if(newWidth === lastWidth) return; // height-only change (toolbar) — ignore
    lastWidth = newWidth;
    resize(); initParticles(); rebuildStarOrbs();
  }, 150);
});

// Guard: on a browser/environment where 2D canvas isn't available, ctx would
// be null and every draw() call would throw — silently skip the ambient
// effect instead of raising a console error and doing nothing else useful.
let rafId = null;
if(ctx){
  function draw(){
    ctx.clearRect(0,0,w,h);
    for(let i=0;i<particles.length;i++){
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if(p.x<0) p.x=w; if(p.x>w) p.x=0;
      if(p.y<0) p.y=h; if(p.y>h) p.y=0;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,143,192,0.55)';
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
      for(let j=i+1;j<particles.length;j++){
        const q = particles[j];
        const dx=p.x-q.x, dy=p.y-q.y, dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<130){
          ctx.strokeStyle = `rgba(255,143,192,${0.15*(1-dist/130)})`;
          ctx.lineWidth=1;
          ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke();
        }
      }
    }
    rafId = requestAnimationFrame(draw);
  }
  draw();

  // Performance fix: previously this loop ran forever, including while the
  // tab was in the background (switched app, minimized, other tab focused).
  // That burned CPU/battery for a canvas nobody could see. Pause on hide,
  // resume on show.
  document.addEventListener('visibilitychange', ()=>{
    if(document.hidden){
      cancelAnimationFrame(rafId);
    } else {
      draw();
    }
  });
}

// star orbs: real DOM elements (not canvas) that pop up at a random spot, twinkle
// quickly, then re-appear somewhere new — never lingering in the same place twice.
const starField = document.createElement('div');
starField.id = 'star-field';
document.body.prepend(starField); // sits below page content, above base background

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function cycleStar(star){
  if(!star.isConnected) return; // stopped once removed (e.g. on resize rebuild)

  const size = (Math.random()*6 + 6).toFixed(1); // 6–12px
  const left = (5 + Math.random()*90).toFixed(2); // keep 5–95%, away from the very edge
  const top = (4 + Math.random()*92).toFixed(2);  // keep 4–96%, away from the very edge
  const dur = (Math.random()*1.3 + 0.9).toFixed(2); // 0.9–2.2s: quick twinkle

  star.style.width = size + 'px';
  star.style.height = size + 'px';
  star.style.left = left + '%';
  star.style.top = top + '%';

  if(prefersReducedMotion){
    star.style.opacity = '0.55'; // static, no motion
    return;
  }

  // restart the CSS animation from scratch at the new position
  star.style.animation = 'none';
  void star.offsetWidth; // force reflow
  star.style.animation = `starTwinkle ${dur}s ease-in-out`;

  const pause = Math.random()*300; // brief random gap before it pops up elsewhere
  setTimeout(()=> cycleStar(star), dur*1000 + pause);
}

function rebuildStarOrbs(){
  starField.innerHTML = '';
  const count = Math.min(70, Math.floor(window.innerWidth / 18)); // more orbs on screen
  for(let i=0;i<count;i++){
    const star = document.createElement('span');
    star.className = 'star-orb';
    starField.appendChild(star);
    setTimeout(()=> cycleStar(star), Math.random()*1500); // desync initial appearance
  }
}
rebuildStarOrbs();

// Loader: just runs the fake progress bar / text and fades the overlay out.
// Scroll is never locked, so there's no way for it to get stuck.
(function(){
  const loader=document.getElementById("loader");
  const loadingText=document.getElementById("loading-text");
  const progressFill=document.querySelector(".progress-fill");
  const texts=["Menyiapkan Pengalaman...","Memuat Portofolio...","Menyiapkan Animasi...","Hampir Siap..."];
  let percent=0, textIndex=0, finished=false;

  function finishLoading(){
    if(finished) return;
    finished=true;
    clearInterval(progress);
    loader.classList.add("hide");
  }

  const progress=setInterval(()=>{
    percent++;
    progressFill.style.width=percent+"%";
    if(percent%25===0 && textIndex<texts.length){ loadingText.textContent=texts[textIndex++]; }
    if(percent>=100){ setTimeout(finishLoading, 400); }
  }, 30);

  setTimeout(finishLoading, 6000);
})();

// ---------- side rays (hero light-ray effect, raw WebGL, no libraries) ----------
// Ported by hand from a React + ogl component into plain WebGL so it works as
// a classic <script> — no ES module / CDN import involved, so it can never
// get blocked by CORS when the page is opened straight from disk (file://).
(function initSideRays(){
  const container = document.getElementById('side-rays');
  if(!container) return;

  const hexToRgb = hex => {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m ? [parseInt(m[1],16)/255, parseInt(m[2],16)/255, parseInt(m[3],16)/255] : [1,1,1];
  };
  const originToFlip = origin => {
    switch(origin){
      case 'top-left': return [1,0];
      case 'bottom-right': return [0,1];
      case 'bottom-left': return [1,1];
      default: return [0,0];
    }
  };

  const cfg = {
    speed: 2.8, rayColor1: '#d7b751', rayColor2: '#d98953',
    intensity: 1.3, spread: 2, origin: 'top-left', tilt: 0,
    saturation: 1.5, blend: 0.75, falloff: 1.6, opacity: 1
  };

  const VERT = `attribute vec2 position;
void main(){ gl_Position = vec4(position, 0.0, 1.0); }`;

  const FRAG = `precision highp float;
uniform float iTime;
uniform vec2 iResolution;
uniform float iSpeed;
uniform vec3 iRayColor1;
uniform vec3 iRayColor2;
uniform float iIntensity;
uniform float iSpread;
uniform float iFlipX;
uniform float iFlipY;
uniform float iTilt;
uniform float iSaturation;
uniform float iBlend;
uniform float iFalloff;
uniform float iOpacity;

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);
  return clamp(
    (0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)),
    0.0, 1.0) *
    clamp((iResolution.x - length(sourceToCoord)) / iResolution.x, 0.5, 1.0);
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  if (iFlipX > 0.5) fragCoord.x = iResolution.x - fragCoord.x;
  if (iFlipY > 0.5) fragCoord.y = iResolution.y - fragCoord.y;

  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  vec2 rayPos = vec2(iResolution.x * 1.1, -0.5 * iResolution.y);

  float tiltRad = iTilt * 3.14159265 / 180.0;
  float cs = cos(tiltRad);
  float sn = sin(tiltRad);
  vec2 rel = coord - rayPos;
  vec2 tiltedCoord = vec2(rel.x * cs - rel.y * sn, rel.x * sn + rel.y * cs) + rayPos;

  float halfSpread = iSpread * 0.275;
  vec2 rayRefDir1 = normalize(vec2(cos(0.785398 + halfSpread), sin(0.785398 + halfSpread)));
  vec2 rayRefDir2 = normalize(vec2(cos(0.785398 - halfSpread), sin(0.785398 - halfSpread)));

  vec4 rays1 = vec4(iRayColor1, 1.0) * rayStrength(rayPos, rayRefDir1, tiltedCoord, 36.2214, 21.11349, iSpeed);
  vec4 rays2 = vec4(iRayColor2, 1.0) * rayStrength(rayPos, rayRefDir2, tiltedCoord, 22.3991, 18.0234, iSpeed * 0.2);

  vec4 color = rays1 * (1.0 - iBlend) * 0.9 + rays2 * iBlend * 0.9;

  float distanceToLight = length(fragCoord.xy - vec2(rayPos.x, iResolution.y - rayPos.y)) / iResolution.y;
  float brightness = iIntensity * 0.4 / pow(max(distanceToLight, 0.001), iFalloff);
  color.rgb *= brightness;

  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  color.rgb = mix(vec3(gray), color.rgb, iSaturation);

  color.a = max(color.r, max(color.g, color.b)) * iOpacity;
  gl_FragColor = color;
}`;

  let gl = null, program = null, uLoc = {}, animId = null, resizeHandler = null;

  function compileShader(type, src){
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
      console.warn('SideRays shader error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function init(){
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.innerHTML = '';
    container.appendChild(canvas);

    gl = canvas.getContext('webgl', {alpha:true, premultipliedAlpha:false}) ||
         canvas.getContext('experimental-webgl', {alpha:true, premultipliedAlpha:false});
    if(!gl) return; // WebGL unsupported — skip the effect silently

    const vs = compileShader(gl.VERTEX_SHADER, VERT);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAG);
    if(!vs || !fs) return;

    program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
      console.warn('SideRays program link error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // one oversized triangle covering the whole clip space — cheaper than a quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    ['iTime','iResolution','iSpeed','iRayColor1','iRayColor2','iIntensity','iSpread',
     'iFlipX','iFlipY','iTilt','iSaturation','iBlend','iFalloff','iOpacity'].forEach(name=>{
      uLoc[name] = gl.getUniformLocation(program, name);
    });

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const [flipX, flipY] = originToFlip(cfg.origin);
    const c1 = hexToRgb(cfg.rayColor1);
    const c2 = hexToRgb(cfg.rayColor2);
    gl.uniform1f(uLoc.iSpeed, cfg.speed);
    gl.uniform3f(uLoc.iRayColor1, c1[0], c1[1], c1[2]);
    gl.uniform3f(uLoc.iRayColor2, c2[0], c2[1], c2[2]);
    gl.uniform1f(uLoc.iIntensity, cfg.intensity);
    gl.uniform1f(uLoc.iSpread, cfg.spread);
    gl.uniform1f(uLoc.iFlipX, flipX);
    gl.uniform1f(uLoc.iFlipY, flipY);
    gl.uniform1f(uLoc.iTilt, cfg.tilt);
    gl.uniform1f(uLoc.iSaturation, cfg.saturation);
    gl.uniform1f(uLoc.iBlend, cfg.blend);
    gl.uniform1f(uLoc.iFalloff, cfg.falloff);
    gl.uniform1f(uLoc.iOpacity, cfg.opacity);

    function resize(){
      if(!gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(container.clientWidth * dpr));
      const h = Math.max(1, Math.floor(container.clientHeight * dpr));
      canvas.width = w; canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uLoc.iResolution, w, h);
    }
    resizeHandler = resize;
    window.addEventListener('resize', resizeHandler);
    resize();

    function loop(t){
      if(!gl) return;
      gl.uniform1f(uLoc.iTime, t * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      animId = requestAnimationFrame(loop);
    }
    animId = requestAnimationFrame(loop);
  }

  function teardown(){
    if(animId) cancelAnimationFrame(animId);
    animId = null;
    if(resizeHandler) window.removeEventListener('resize', resizeHandler);
    if(gl){
      const lose = gl.getExtension('WEBGL_lose_context');
      if(lose) lose.loseContext();
    }
    container.innerHTML = '';
    gl = null; program = null;
  }

  // only run the WebGL loop while the hero is actually on screen
  const rayObserver = new IntersectionObserver(entries=>{
    const visible = entries[0].isIntersecting;
    if(visible && !gl) init();
    if(!visible && gl) teardown();
  }, {threshold:0.1});
  rayObserver.observe(container);
})();

// ---------- interactive cards: portfolio / services / blog ----------
// cursor-tracked spotlight (--mx/--my consumed by the ::before glow in the
// CSS) shared by all three card types, plus a light 3D tilt on the portfolio
// thumbnails only, where the extra depth actually helps show off the shot.
(function initCardInteractions(){
  const spotlightCards = document.querySelectorAll('.gallery-card, .service-card, .blog-card');
  if(!spotlightCards.length) return;

  spotlightCards.forEach(card=>{
    card.addEventListener('pointermove', (e)=>{
      if(e.pointerType === 'touch') return; // touch devices get the static fallback in CSS
      const rect = card.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', mx + '%');
      card.style.setProperty('--my', my + '%');
    });
  });

  if(reduceMotionMQ.matches) return; // skip the 3D tilt for reduced-motion users

  const tiltThumbs = document.querySelectorAll('.gallery-thumb');
  const TILT_MAX = 7; // degrees — kept subtle so it reads as depth, not a gimmick

  tiltThumbs.forEach(thumb=>{
    const card = thumb.closest('.gallery-card');
    thumb.addEventListener('pointermove', (e)=>{
      if(e.pointerType === 'touch') return;
      const rect = thumb.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      thumb.style.transform = `rotateX(${(-py * TILT_MAX).toFixed(2)}deg) rotateY(${(px * TILT_MAX).toFixed(2)}deg)`;
    });
    (card || thumb).addEventListener('pointerleave', ()=>{
      thumb.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });
})();
