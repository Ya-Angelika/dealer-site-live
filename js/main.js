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

  // Калькулятор кредита — ползунки + аннуитетный расчёт
  (function () {
    var $price = $('#cr-price'), $down = $('#cr-down'), $term = $('#cr-term');
    if (!$price.length) return;                 // нет калькулятора на странице — выходим

    function fmt(n) { return Math.round(n).toLocaleString('ru-RU'); }
    function calc() {
      var price = +$price.val();
      $down.attr('max', price);                  // взнос не больше стоимости авто
      if (+$down.val() > price) $down.val(price);
      var down = +$down.val(), term = +$term.val();

      $('#cv-price').text(fmt(price) + ' ₽');
      $('#cv-down').text(fmt(down) + ' ₽');
      $('#cv-term').text(term + ' месяцев');

      var principal = Math.max(price - down, 0), r = 0.069 / 12, pay = 0;
      if (principal > 0) { var k = Math.pow(1 + r, term); pay = principal * r * k / (k - 1); }

      $('#cv-month').html(fmt(pay) + ' ₽<small>/мес</small>');
      $('#cv-total').text('Итого: ' + fmt(pay * term) + ' ₽ за ' + term + ' месяцев');
    }
    $(document).on('input change', '.calc-range', calc);
    calc();                                       // первичный расчёт
  })();

});
