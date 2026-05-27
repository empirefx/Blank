(function(){
  var page = location.pathname.split('/').pop();
  var active = '';

  if (page === 'index.html') {
    active = 'components';
  } else if (page === 'display.html') {
    var p = new URLSearchParams(location.search);
    active = p.get('cat') === 'patterns' ? 'patterns' :
             p.get('cat') === 'pages' ? 'pages' : '';
  }

  if (active) {
    var links = document.querySelectorAll('.view-navbar-link');
    for (var i = 0; i < links.length; i++) {
      if (links[i].textContent.toLowerCase() === active) {
        links[i].classList.add('active');
        break;
      }
    }
  }

  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  var html = document.documentElement;
  var saved = localStorage.getItem('theme');
  if (saved) html.setAttribute('data-theme', saved);
  btn.addEventListener('click', function() {
    var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    var frames = document.querySelectorAll('iframe');
    for (var i = 0; i < frames.length; i++) {
      frames[i].contentWindow.postMessage({type:'theme',theme:next},'*');
    }
  });
})();
