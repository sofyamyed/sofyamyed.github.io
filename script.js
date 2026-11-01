// Кнопки «Скопировать»
document.querySelectorAll('.copy__btn').forEach(function (b) {
  b.addEventListener('click', function () {
    var t = b.parentNode.querySelector('.copy__text').innerText;
    var label = b.textContent;
    function done() {
      b.textContent = 'Скопировано ✓'; b.classList.add('is-done');
      setTimeout(function () { b.textContent = label; b.classList.remove('is-done'); }, 1800);
    }
    function fallback() {
      var a = document.createElement('textarea');
      a.value = t; a.style.position = 'fixed'; a.style.opacity = '0';
      document.body.appendChild(a); a.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      document.body.removeChild(a);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(t).then(done, fallback);
    } else { fallback(); }
  });
});

// Подсветка текущего шага на таймлайне
(function () {
  var links = [].slice.call(document.querySelectorAll('.tl__step'));
  if (!links.length || !('IntersectionObserver' in window)) return;
  var map = {};
  links.forEach(function (l) { map[l.getAttribute('href').slice(1)] = l; });
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        links.forEach(function (l) { l.classList.remove('is-on'); });
        var l = map[e.target.id]; if (l) l.classList.add('is-on');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
})();

// На телефоне прокрутить меню к текущему разделу
(function () {
  var m = document.querySelector('.menu'), on = m && m.querySelector('.is-on');
  if (m && on && m.scrollWidth > m.clientWidth) m.scrollLeft = on.offsetLeft - (m.clientWidth - on.offsetWidth) / 2;
})();
