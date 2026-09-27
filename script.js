// nav scroll state
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>10);});

// active link
const links=document.querySelectorAll('.nav-links a');
const sections=[...document.querySelectorAll('main section[id]')];
window.addEventListener('scroll',()=>{
  let cur='';
  sections.forEach(s=>{ if(window.scrollY>=s.offsetTop-100) cur=s.id; });
  links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
});

// mobile menu
const hamburger=document.getElementById('hamburger'), mm=document.getElementById('mobileMenu'), scrim=document.getElementById('scrim');
function closeMenu(){mm.classList.remove('open'); scrim.classList.remove('open');}
hamburger.addEventListener('click',()=>{mm.classList.add('open'); scrim.classList.add('open');});
scrim.addEventListener('click',closeMenu);
mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));

// theme toggle
const themeToggle=document.getElementById('themeToggle');
try{
  const saved=localStorage.getItem('vk-theme');
  if(saved){document.documentElement.setAttribute('data-theme',saved); themeToggle.textContent = saved==='light'?'☀️':'🌙';}
}catch(e){}
themeToggle.addEventListener('click',()=>{
  const cur=document.documentElement.getAttribute('data-theme')==='light'?'dark':'light';
  document.documentElement.setAttribute('data-theme', cur==='light'?'light':'');
  themeToggle.textContent = cur==='light'?'☀️':'🌙';
  try{localStorage.setItem('vk-theme',cur);}catch(e){}
});

// project filter
const filterBtns=document.querySelectorAll('.filter-btn');
const cards=document.querySelectorAll('.project-card');
filterBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    cards.forEach(c=>{ c.style.display=(f==='all'||c.dataset.cat===f)?'grid':'none'; });
  });
});

// contact form (client-side only, ready for backend integration)
const form=document.getElementById('contactForm'), toast=document.getElementById('toast');
form.addEventListener('submit',e=>{
  e.preventDefault();
  if(!form.checkValidity()){ form.reportValidity(); return; }
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),3200);
  form.reset();
});
