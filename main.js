/* ===== הגדרות כלליות – לעריכה ===== */
const SITE={name:"נעה",tagline:"ייעוץ תכנוני לפני שיפוץ",whatsapp:"972522666425",email:"noa61284@gmail.com"};
const PAGES=[["index.html","בית"],["services.html","השירותים"],["about.html","קצת עליי"],["faq.html","שאלות נפוצות"]];
const here=location.pathname.split('/').pop()||'index.html';
const waIcon='<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>';
const navEl=document.createElement('header');navEl.className='nav'+(document.body.dataset.hero?' light':'');
navEl.innerHTML=`<div class="wrap"><a class="brand" href="index.html">${SITE.name}<small>${SITE.tagline}</small></a>
<ul class="menu">${PAGES.map(([h,t])=>`<li><a href="${h}" class="${h==here?'on':''}">${t}</a></li>`).join('')}<li class="mob"><a href="contact.html">צור קשר</a></li></ul>
<a class="btn" href="contact.html">לתיאום ייעוץ</a><button class="burger" aria-label="תפריט">תפריט</button></div>`;
document.body.prepend(navEl);
const ft=document.createElement('footer');
ft.innerHTML=`<div class="wrap"><span class="label">יש לכם תכנית? בואו נדבר</span><a class="big" href="contact.html">בואו נתכנן נכון.</a>
<div class="row"><span>${SITE.name} · ${SITE.tagline} · © ${new Date().getFullYear()}</span><nav>${PAGES.map(([h,t])=>`<a href="${h}">${t}</a>`).join('')}<a href="contact.html">צור קשר</a><a href="https://wa.me/${SITE.whatsapp}" target="_blank">WhatsApp</a><a href="mailto:${SITE.email}">${SITE.email}</a></nav></div></div>`;
document.body.append(ft);
const wa=document.createElement('a');wa.className='wa';wa.href=`https://wa.me/${SITE.whatsapp}`;wa.target='_blank';wa.ariaLabel='WhatsApp';wa.innerHTML=waIcon;document.body.append(wa);
document.querySelectorAll('[data-wa]').forEach(a=>a.href=`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('היי נעה, אשמח להתייעץ לגבי תכנון')}`);
const menu=navEl.querySelector('.menu');navEl.querySelector('.burger').onclick=()=>menu.classList.toggle('open');
/* גלילה: ניווט + פרלקסה */
const par=[...document.querySelectorAll('.parallax img, .cta .bg')];
const onScroll=()=>{navEl.classList.toggle('solid',scrollY>80);
 par.forEach(el=>{const r=el.parentElement.getBoundingClientRect();const p=(r.top+r.height/2-innerHeight/2)/innerHeight;el.style.transform=`translateY(${p*-60}px) scale(1.12)`})};
addEventListener('scroll',onScroll,{passive:true});onScroll();
/* כניסה בגלילה */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.r,.reveal-img').forEach(el=>io.observe(el));
document.querySelectorAll('[data-stagger]').forEach(g=>[...g.children].forEach((c,i)=>{c.classList.add('r');c.style.transitionDelay=i*110+'ms';io.observe(c)}));
/* סליידר הירו */
const sl=[...document.querySelectorAll('.slides img')],cnt=document.querySelector('.counter b');let si=0;
if(sl.length){sl[0].classList.add('on');setInterval(()=>{sl[si].classList.remove('on');si=(si+1)%sl.length;sl[si].classList.add('on');if(cnt)cnt.textContent=String(si+1).padStart(2,'0')},5000)}
/* כותרת: אנימציית מילים */
document.querySelectorAll('.hero h1').forEach(h=>{h.innerHTML=h.textContent.trim().split(/\s+/).map((w,i)=>`<span class="w"><span style="animation-delay:${.15+i*.12}s">${w}</span></span>`).join(' ')});
/* תמונה צפה בריחוף */
const fl=document.querySelector('.float-img');
if(fl){const im=fl.querySelector('img');let x=0,y=0,tx=0,ty=0;
 document.querySelectorAll('[data-img]').forEach(a=>{a.onmouseenter=()=>{im.src=a.dataset.img;fl.classList.add('on')};a.onmouseleave=()=>fl.classList.remove('on')});
 addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY});(function loop(){x+=(tx-x)*.12;y+=(ty-y)*.12;fl.style.left=x+'px';fl.style.top=y+'px';requestAnimationFrame(loop)})()}
/* גרירה אופקית */
document.querySelectorAll('.strip').forEach(s=>{let d=false,sx,sl0;s.onmousedown=e=>{d=true;sx=e.pageX;sl0=s.scrollLeft};addEventListener('mouseup',()=>d=false);s.onmousemove=e=>{if(d){e.preventDefault();s.scrollLeft=sl0-(e.pageX-sx)}}});
