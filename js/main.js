/* main.js — интерактив сайта (jQuery).
   Делегирование на document → один файл работает на всех страницах,
   обработчики молча игнорируются там, где нужных элементов нет. */
$(function () {

  // Каталог — переключение сортировки
  $(document).on('click', '.cat-toolbar-sort .sort-btn', function () {
    $('.cat-toolbar-sort .sort-btn').removeClass('is-active');
    $(this).addClass('is-active');
  });

  // Каталог — пагинация
  $(document).on('click', '.pagination .page', function () {
    var t = $.trim($(this).text());
    if (t === '←' || t === '→') return; // стрелки ← →
    $('.pagination .page').removeClass('is-active');
    $(this).addClass('is-active');
  });

  // Деталь авто — миниатюры галереи
  $(document).on('click', '.cd-thumb', function () {
    $('.cd-thumb').removeClass('is-active');
    $(this).addClass('is-active');
    $('#cdMain').css('background-image', $(this).css('background-image'));
  });

  // Деталь авто — выбор комплектации
  $(document).on('click', '.trim-card', function (e) {
    if (e.target.tagName === 'A') return; // не перехватываем клик по кнопке «Выбрать»
    $('.trim-card').removeClass('is-active');
    $(this).addClass('is-active');
  });

  // FAQ (кредит, контакты) — аккордеон, открыт только один
  $(document).on('click', '.faq-item', function () {
    var $item = $(this);
    $('.faq-item').not($item).removeClass('is-open');
    $item.toggleClass('is-open');
  });

  // Квиз — выбор варианта ответа
  $(document).on('click', '.quiz-option', function () {
    $('.quiz-option').removeClass('is-active');
    $(this).addClass('is-active');
  });

  // Детальная авто — раскрытие оснащения комплектации (аккордеон)
  $(document).on('click', '.mod-row', function (e) {
    if ($(e.target).closest('a').length) return;   // клик по кнопке «Оставить заявку» не раскрывает
    $(this).parent().toggleClass('open');
  });

  // Калькулятор кредита (layout multi-4): сумма + срок -> платёж; степперы ± меняют срок
  (function () {
    var $sum = $('#cr-sum'), $term = $('#cr-term');
    if (!$sum.length) return;                     // нет калькулятора на странице

    function fmt(n) { return Math.round(n).toLocaleString('ru-RU'); }
    function calc() {
      var s = +$sum.val(), t = +$term.val(), r = 0.069 / 12;
      $('#cv-sum').text(fmt(s) + ' ₽');
      $('#cv-term').text(t + ' мес.');
      var k = Math.pow(1 + r, t), pay = s * r * k / (k - 1);
      $('#cv-month').text(fmt(pay) + ' ₽');
    }
    $(document).on('input change', '.mc-range', calc);
    $(document).on('click', '#mc-minus', function () { $term.val(Math.max(+$term.attr('min'), +$term.val() - 6)); calc(); });
    $(document).on('click', '#mc-plus', function () { $term.val(Math.min(+$term.attr('max'), +$term.val() + 6)); calc(); });
    calc();
  })();

  // Модалки заявка/кредит/обмен: .js-modal-open[data-modal][data-car] (зеркалит инлайн-скрипт build_site.py)
  function modalClose() { $('.req-overlay.is-open').removeClass('is-open'); $('body').css('overflow', ''); }
  $(document).on('click', '.js-modal-open', function (e) {
    e.preventDefault();
    var $m = $('#' + $(this).attr('data-modal'));
    var car = $(this).attr('data-car');
    if (car) $m.find('.mdl-car').text(car);
    $m.addClass('is-open'); $('body').css('overflow', 'hidden');
  });
  $(document).on('click', '.js-modal-close', modalClose);
  $(document).on('click', '.req-overlay', function (e) { if (e.target === this) modalClose(); });
  $(document).on('keydown', function (e) { if (e.key === 'Escape') modalClose(); });
  $(document).on('submit', '.js-modal-form', function (e) {
    e.preventDefault();
    var $card = $(this).closest('.req-card');
    if ($card.length) {
      $card.html(
        '<button type="button" class="req-close js-modal-close" aria-label="Закрыть">×</button>' +
        '<h3 class="req-title">Заявка отправлена!</h3>' +
        '<p class="req-sub">Спасибо! Мы свяжемся с вами в ближайшее время.</p>');
    } else {
      $(this).html('<div class="calc-lead-done">Заявка отправлена! Свяжемся с вами в ближайшее время.</div>');
    }
  });

});


/* Карусель «Новые поступления»: стрелки перелистывания + счётчик снизу */
(function(){
  var list = document.querySelectorAll('[data-carousel]');
  for (var k=0;k<list.length;k++){ (function(c){
    var track=c.querySelector('[data-carousel-track]'); if(!track) return;
    var prev=c.querySelector('[data-carousel-prev]'), next=c.querySelector('[data-carousel-next]');
    var cur=c.querySelector('[data-carousel-current]'), tot=c.querySelector('[data-carousel-total]');
    var cards=track.children;
    if(tot) tot.textContent=cards.length;
    function step(){ var f=cards[0]; if(!f) return 300; var s=getComputedStyle(track); var g=parseFloat(s.columnGap||s.gap)||16; return f.getBoundingClientRect().width+g; }
    function update(){ var st=step(), max=cards.length-1; var idx=Math.round(track.scrollLeft/st); if(idx<0)idx=0; if(idx>max)idx=max; if(cur)cur.textContent=idx+1; if(prev)prev.disabled=track.scrollLeft<=2; if(next)next.disabled=track.scrollLeft>=track.scrollWidth-track.clientWidth-2; }
    if(prev) prev.addEventListener('click',function(){ track.scrollBy({left:-step(),behavior:'smooth'}); });
    if(next) next.addEventListener('click',function(){ track.scrollBy({left:step(),behavior:'smooth'}); });
    track.addEventListener('scroll',update); window.addEventListener('resize',update); update();
  })(list[k]); }
})();
