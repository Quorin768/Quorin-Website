document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .node, .connector, .converge-center').forEach(function (el) {
    observer.observe(el);
  });

  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      q.closest('.faq-item').classList.toggle('open');
    });
  });

  // Final CTA — split heading into words for the dancing text effect
  var ctaHeading = document.querySelector('.final-cta .section-title');
  if (ctaHeading) {
    var words = ctaHeading.textContent.trim().split(/\s+/);
    ctaHeading.innerHTML = words.map(function (w, i) {
      var delay = (i * 0.12).toFixed(2);
      return '<span class="word-dance" style="animation-delay:' + delay + 's">' + w + '</span>';
    }).join(' ');

    var ctaObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('dance-active');
        } else {
          entry.target.classList.remove('dance-active');
        }
      });
    }, { threshold: 0.4 });
    ctaObserver.observe(ctaHeading);
  }

  // Expandable contact widget toggle
  var contactWidget = document.querySelector('.contact-widget');
  var contactFab = document.querySelector('.contact-fab');
  if (contactWidget && contactFab) {
    contactFab.addEventListener('click', function () {
      contactWidget.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!contactWidget.contains(e.target)) {
        contactWidget.classList.remove('open');
      }
    });
  }
});
