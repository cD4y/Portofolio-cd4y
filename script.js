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

// mobile menu toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', ()=>{
  const open = navLinks.style.display === 'flex';
  navLinks.style.display = open ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position='absolute';
  navLinks.style.top='60px'; navLinks.style.left='18px'; navLinks.style.right='18px';
  navLinks.style.background='var(--nav-bg-solid)';
  navLinks.style.border='1px solid var(--border)';
  navLinks.style.borderRadius='16px';
  navLinks.style.padding='20px';
});

// ambient particle canvas
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
window.addEventListener('resize', ()=>{ resize(); initParticles(); });

// slow-drifting dot-grid pattern, drawn on the same canvas (cheap: no extra DOM/paint layer)
const patternSpacing = 46;
let patternOffset = 0;
function drawPattern(){
  patternOffset = (patternOffset + 0.012) % patternSpacing;
  const isDark = root.getAttribute('data-theme') === 'dark';
  ctx.fillStyle = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';
  for(let x = -patternSpacing + patternOffset; x < w + patternSpacing; x += patternSpacing){
    for(let y = -patternSpacing + patternOffset; y < h + patternSpacing; y += patternSpacing){
      ctx.beginPath();
      ctx.arc(x, y, 1.3, 0, Math.PI*2);
      ctx.fill();
    }
  }
}

function draw(){
  ctx.clearRect(0,0,w,h);
  drawPattern();
  for(let i=0;i<particles.length;i++){
    const p = particles[i];
    p.x += p.vx; p.y += p.vy;
    if(p.x<0) p.x=w; if(p.x>w) p.x=0;
    if(p.y<0) p.y=h; if(p.y>h) p.y=0;
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,97,248,0.55)';
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
    for(let j=i+1;j<particles.length;j++){
      const q = particles[j];
      const dx=p.x-q.x, dy=p.y-q.y, dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<130){
        ctx.strokeStyle = `rgba(255,97,248,${0.15*(1-dist/130)})`;
        ctx.lineWidth=1;
        ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
draw();

// loading screen: progress bar mengikuti proses loading beneran (gambar, font, dll),
// bukan timer buatan. Baru selesai (100%) kalau window sudah benar-benar "load".
(function(){
  const loader = document.getElementById("loader");
  const loadingText = document.getElementById("loading-text");
  const progressFill = document.querySelector(".progress-fill");
  const texts = ["Menyiapkan Pengalaman...","Memuat Portofolio...","Menyiapkan Animasi...","Hampir Siap..."];

  document.body.style.overflow = "hidden";

  let percent = 0;
  let textIndex = 0;
  let pageLoaded = false;

  // progress "palsu" hanya untuk feedback visual, tapi DIBATASI maks 90%
  // sampai window benar-benar selesai load. Jadi tidak pernah "selesai duluan"
  // padahal asetnya belum siap.
  const tick = setInterval(() => {
    const cap = pageLoaded ? 100 : 90;
    if (percent < cap) {
      percent++;
      progressFill.style.width = percent + "%";
      if (percent % 25 === 0 && textIndex < texts.length) {
        loadingText.textContent = texts[textIndex++];
      }
    }
    if (percent >= 100) {
      clearInterval(tick);
      finishLoading();
    }
  }, 30);

  function finishLoading(){
    setTimeout(() => {
      loader.classList.add("hide");
      document.body.style.overflow = "auto";
    }, 400);
  }

  // Tunggu semua resource (gambar, css, font, iframe, dll) benar-benar selesai load
  function markLoaded(){
    pageLoaded = true;
    // pastikan font custom juga sudah siap sebelum dianggap "selesai"
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => { pageLoaded = true; });
    }
  }

  if (document.readyState === "complete") {
    markLoaded();
  } else {
    window.addEventListener("load", markLoaded);
  }

  // safety net: kalau karena suatu hal load event tidak pernah fire
  // (misal ada resource yang gagal/hang), tetap paksa selesai setelah 8 detik
  // supaya user tidak stuck permanen di loading screen.
  setTimeout(() => { pageLoaded = true; }, 8000);
})();
