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

});
