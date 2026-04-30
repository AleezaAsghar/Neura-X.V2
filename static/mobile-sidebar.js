/* NeuraX Mobile Sidebar Patch
   Place this file at: static/js/mobile-sidebar.js
   Link it before </body> in dashboard templates.
*/
(function () {
  function createMobileToggle() {
    if (document.getElementById('mobileSidebarToggle')) return;

    const sidebar = document.querySelector('body > div.fixed.inset-y-0.left-0.w-72, .sidebar-modern');
    if (!sidebar) return;

    const btn = document.createElement('button');
    btn.id = 'mobileSidebarToggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Open menu');
    btn.className = 'md:hidden fixed top-4 left-4 z-[70] bg-white text-slate-800 rounded-xl shadow-lg px-3 py-2 border border-slate-200';
    btn.innerHTML = '☰';

    const overlay = document.createElement('div');
    overlay.id = 'mobileSidebarOverlay';
    overlay.className = 'hidden fixed inset-0 bg-black/50 z-[60] md:hidden';

    function closeMenu() {
      document.body.classList.remove('mobile-sidebar-open');
      overlay.classList.add('hidden');
      btn.innerHTML = '☰';
      btn.setAttribute('aria-label', 'Open menu');
    }

    function openMenu() {
      document.body.classList.add('mobile-sidebar-open');
      overlay.classList.remove('hidden');
      btn.innerHTML = '✕';
      btn.setAttribute('aria-label', 'Close menu');
    }

    btn.addEventListener('click', function () {
      if (document.body.classList.contains('mobile-sidebar-open')) closeMenu();
      else openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    sidebar.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 768) closeMenu();
      });
    });

    document.body.appendChild(overlay);
    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createMobileToggle);
  } else {
    createMobileToggle();
  }
})();
