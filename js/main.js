// автособранный из инлайна; при желании переписать на jQuery
$(function(){
document.querySelectorAll('.cat-toolbar-sort .sort-btn').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.cat-toolbar-sort .sort-btn').forEach(x=>x.classList.remove('is-active'));b.classList.add('is-active')}));
document.querySelectorAll('.pagination .page').forEach(p=>p.addEventListener('click',()=>{if(p.textContent==='←'||p.textContent==='→')return;document.querySelectorAll('.pagination .page').forEach(x=>x.classList.remove('is-active'));p.classList.add('is-active')}));

/* Резервный обработчик модалок для СТАНДАЛОН-версии (dist, без main.js).
   В split-версии (site/) этот <script> вырезается split_assets — там работает js/main.js. */
(function(){
  function closeM(){var o=document.querySelectorAll('.req-overlay.is-open');for(var i=0;i<o.length;i++){o[i].classList.remove('is-open');}document.body.style.overflow='';}
  function openM(id,car){var m=document.getElementById(id);if(!m){return;}if(car){var s=m.querySelector('.mdl-car');if(s){s.textContent=car;}}m.classList.add('is-open');document.body.style.overflow='hidden';}
  document.addEventListener('click',function(e){
    var t=e.target.closest('.js-modal-open');
    if(t){e.preventDefault();openM(t.getAttribute('data-modal'),t.getAttribute('data-car'));return;}
    if(e.target.closest('.js-modal-close')||e.target.classList.contains('req-overlay')){closeM();}
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeM();}});
  document.addEventListener('submit',function(e){
    if(e.target.classList.contains('js-modal-form')){e.preventDefault();
      var c=e.target.closest('.req-card');
      if(c){c.innerHTML='<button type="button" class="req-close js-modal-close" aria-label="Закрыть">×</button><h3 class="req-title">Заявка отправлена!</h3><p class="req-sub">Спасибо! Мы свяжемся с вами в ближайшее время.</p>';}
      else{e.target.innerHTML='<div class="calc-lead-done">Заявка отправлена! Свяжемся с вами в ближайшее время.</div>';}
    }
  });
})();

/* Мобильное меню: бургер, Esc, клик по ссылке. */
(function(){
  var menu=document.getElementById('mobMenu'); if(!menu) return;
  var burger=document.querySelector('.js-mob-open');
  function open(){menu.hidden=false;document.body.style.overflow='hidden';if(burger)burger.setAttribute('aria-expanded','true');}
  function close(){menu.hidden=true;if(burger)burger.setAttribute('aria-expanded','false');
    /* если из меню открыли модалку — скролл разблокирует уже она */
    if(!document.querySelector('.req-overlay.is-open')){document.body.style.overflow='';}}
  document.addEventListener('click',function(e){
    if(e.target.closest('.js-mob-open')){open();return;}
    if(e.target.closest('.js-mob-close')){close();return;}
    /* ссылка или кнопка вызова модалки внутри меню — меню закрываем */
    if(!menu.hidden && e.target.closest('#mobMenu a, #mobMenu .js-modal-open')){close();}
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!menu.hidden){close();}});
  /* вернулись на десктоп с открытым меню — не оставляем body заблокированным */
  window.addEventListener('resize',function(){if(window.innerWidth>1100&&!menu.hidden){close();}});
})();

document.querySelectorAll(".cd-thumb").forEach(function(t){t.addEventListener("click",function(){document.querySelectorAll(".cd-thumb").forEach(function(x){x.classList.remove("is-active")});t.classList.add("is-active");document.getElementById("cdMain").style.backgroundImage=t.style.backgroundImage;})});document.querySelectorAll(".mod-row").forEach(function(r){r.addEventListener("click",function(e){if(e.target.closest("a"))return;r.parentNode.classList.toggle("open");})});

/* Калькулятор calc-multi-4 (mc-*) — тёмные/красные темы */
(function(){var sum=document.getElementById('cr-sum'),term=document.getElementById('cr-term');if(!sum)return;
function fmt(n){return Math.round(n).toLocaleString('ru-RU');}
function calc(){var s=+sum.value,t=+term.value,r=4.9/12/100;
document.getElementById('cv-sum').textContent=fmt(s)+' ₽';document.getElementById('cv-term').textContent=t+' мес.';
var k=Math.pow(1+r,t),pay=s*r*k/(k-1);document.getElementById('cv-month').textContent=fmt(pay)+' ₽';}
sum.addEventListener('input',calc);term.addEventListener('input',calc);
var mn=document.getElementById('mc-minus'),pl=document.getElementById('mc-plus');
if(mn)mn.addEventListener('click',function(){term.value=Math.max(+term.min,+term.value-6);calc();});
if(pl)pl.addEventListener('click',function(){term.value=Math.min(+term.max,+term.value+6);calc();});
calc();})();

/* Калькулятор calc-multi-3 (c3-*) — синяя тема. Взнос вычитается из тела кредита. */
(function(){var sum=document.getElementById('c3-sum'),down=document.getElementById('c3-down'),term=document.getElementById('c3-term');
if(!sum||!down||!term)return;
function fmt(n){return Math.round(n).toLocaleString('ru-RU');}
function short(n){return n>=1e6?(n/1e6).toFixed(1).replace(/[.,]0$/,'').replace('.',',')+' млн':Math.round(n/1000)+' тыс.';}
function fill(el){var min=+el.min,max=+el.max;el.style.setProperty('--p',(max>min?(el.value-min)/(max-min)*100:0)+'%');}
function calc(){
  var s=+sum.value;
  /* взнос не может превышать стоимость авто */
  down.max=s; if(+down.value>s){down.value=s;}
  document.getElementById('c3-down-max').textContent=short(s);
  var d=+down.value,t=+term.value,r=4.9/12/100,body=s-d;
  document.getElementById('c3v-sum').textContent=fmt(s)+' ₽';
  document.getElementById('c3v-down').textContent=fmt(d)+' ₽';
  document.getElementById('c3v-term').textContent=t+' мес.';
  var pay=0;
  if(body>0){var k=Math.pow(1+r,t);pay=body*r*k/(k-1);}
  document.getElementById('c3v-month').textContent=fmt(pay)+' ₽';
  fill(sum);fill(down);fill(term);
}
sum.addEventListener('input',calc);down.addEventListener('input',calc);term.addEventListener('input',calc);
calc();})();

(function(){
  var list = document.querySelectorAll('[data-carousel]');
  for (var k=0;k<list.length;k++){ (function(c){
    var track=c.querySelector('[data-carousel-track]'); if(!track) return;
    var prev=c.querySelector('[data-carousel-prev]'), next=c.querySelector('[data-carousel-next]');
    var dotsBox=c.querySelector('[data-carousel-dots]');
    var cards=track.children, n=cards.length;
    function step(){ var f=cards[0]; if(!f) return 300; var s=getComputedStyle(track); var g=parseFloat(s.columnGap||s.gap)||16; return f.getBoundingClientRect().width+g; }
    var dots=[];
    if(dotsBox){ dotsBox.innerHTML=''; for(var i=0;i<n;i++){ (function(idx){ var d=document.createElement('button'); d.type='button'; d.className='carousel-dot'; d.setAttribute('aria-label','Слайд '+(idx+1)); d.addEventListener('click',function(){ track.scrollTo({left:step()*idx,behavior:'smooth'}); }); dotsBox.appendChild(d); dots.push(d); })(i); } }
    function activeIndex(){ var st=step(), idx=Math.round(track.scrollLeft/st); if(idx<0)idx=0; if(idx>n-1)idx=n-1; return idx; }
    function update(){ var idx=activeIndex(); for(var j=0;j<dots.length;j++){ dots[j].classList.toggle('is-active',j===idx); } var atEnd=track.scrollLeft>=track.scrollWidth-track.clientWidth-2; if(prev)prev.disabled=track.scrollLeft<=2; if(next)next.disabled=atEnd; c.classList.toggle('is-end',atEnd); }
    if(prev) prev.addEventListener('click',function(){ track.scrollBy({left:-step(),behavior:'smooth'}); });
    if(next) next.addEventListener('click',function(){ track.scrollBy({left:step(),behavior:'smooth'}); });
    track.addEventListener('scroll',update); window.addEventListener('resize',update); update();
  })(list[k]); }
})();

/* Мини-карусель фото в hero (hero-v5-bigtype) */
(function(){
  var photo=document.querySelector('[data-h5-photos]'); if(!photo) return;
  var imgs=photo.getAttribute('data-h5-photos').split('|');
  var dots=photo.querySelectorAll('[data-h5-dot]');
  var prev=photo.querySelector('[data-h5-prev]'), next=photo.querySelector('[data-h5-next]');
  var i=0;
  function show(k){
    i=(k+imgs.length)%imgs.length;
    photo.style.backgroundImage="url('images/cars/"+imgs[i]+"')";
    for(var j=0;j<dots.length;j++){ dots[j].classList.toggle('is-active',j===i); }
  }
  for(var j=0;j<dots.length;j++){ (function(idx){ dots[idx].addEventListener('click',function(){ show(idx); }); })(j); }
  if(prev) prev.addEventListener('click',function(){ show(i-1); });
  if(next) next.addEventListener('click',function(){ show(i+1); });
})();

document.querySelectorAll('.quiz-option').forEach(o=>o.addEventListener('click',()=>{document.querySelectorAll('.quiz-option').forEach(x=>x.classList.remove('is-active'));o.classList.add('is-active')}));
});
