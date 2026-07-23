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

// typing / deleting effect for job roles
const typedRoleEl = document.getElementById('typed-role');
const jobTitles = ['Pengembang Web', 'Desainer UI/UX', 'Pengembang Game', 'Analis Data'];
let jobIndex = 0, charIndex = 0, isDeleting = false;

function typeLoop(){
  const current = jobTitles[jobIndex];
  if(!isDeleting){
    charIndex++;
    typedRoleEl.textContent = current.slice(0, charIndex);
    if(charIndex === current.length){
      isDeleting = true;
      setTimeout(typeLoop, 1400); // pause before deleting
      return;
    }
    setTimeout(typeLoop, 90);
  } else {
    charIndex--;
    typedRoleEl.textContent = current.slice(0, charIndex);
    if(charIndex === 0){
      isDeleting = false;
      jobIndex = (jobIndex + 1) % jobTitles.length;
      setTimeout(typeLoop, 400); // pause before typing next
      return;
    }
    setTimeout(typeLoop, 45);
  }
}
typeLoop();

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
