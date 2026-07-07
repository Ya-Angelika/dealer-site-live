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

document.querySelectorAll(".cd-thumb").forEach(function(t){t.addEventListener("click",function(){document.querySelectorAll(".cd-thumb").forEach(function(x){x.classList.remove("is-active")});t.classList.add("is-active");document.getElementById("cdMain").style.backgroundImage=t.style.backgroundImage;})});document.querySelectorAll(".mod-row").forEach(function(r){r.addEventListener("click",function(e){if(e.target.closest("a"))return;r.parentNode.classList.toggle("open");})});

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

document.querySelectorAll('.quiz-option').forEach(o=>o.addEventListener('click',()=>{document.querySelectorAll('.quiz-option').forEach(x=>x.classList.remove('is-active'));o.classList.add('is-active')}));
});


/* Карусель «Новые поступления»: стрелки перелистывания + точки-пагинация */
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
    function update(){ var idx=activeIndex(); for(var j=0;j<dots.length;j++){ dots[j].classList.toggle('is-active',j===idx); } if(prev)prev.disabled=track.scrollLeft<=2; if(next)next.disabled=track.scrollLeft>=track.scrollWidth-track.clientWidth-2; }
    if(prev) prev.addEventListener('click',function(){ track.scrollBy({left:-step(),behavior:'smooth'}); });
    if(next) next.addEventListener('click',function(){ track.scrollBy({left:step(),behavior:'smooth'}); });
    track.addEventListener('scroll',update); window.addEventListener('resize',update); update();
  })(list[k]); }
})();
