/* ============================================================
   MTown Hotel & Suites — main.js
   Site Interactions & Navigation
   ============================================================ */


/* ─────────────────────────────────────────
   1. PAGE NAVIGATION (SPA routing)
───────────────────────────────────────── */

/**
 * Shows the requested page and hides all others.
 * Updates active state on desktop and mobile nav links.
 * @param {string} pageName - e.g. 'home', 'rooms', 'about'
 */
function showPage(pageName) {

  // Hide all pages
  document.querySelectorAll('.page').forEach(function(page) {
    page.classList.remove('active');
  });

  // Remove active from all nav links
  document.querySelectorAll('.desktop-nav a, .mobile-menu a').forEach(function(link) {
    link.classList.remove('active');
  });

  // Show the target page
  var targetPage = document.getElementById('page-' + pageName);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  // Mark matching desktop nav link as active
  var activeNavLink = document.getElementById('nav-' + pageName);
  if (activeNavLink) {
    activeNavLink.classList.add('active');
  }

  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Close mobile menu if open
  closeMobileMenu();
}


/* ─────────────────────────────────────────
   2. MOBILE MENU TOGGLE
───────────────────────────────────────── */

function toggleMobileMenu() {
  var menu      = document.getElementById('mobile-menu');
  var hamburger = document.getElementById('hamburger-btn');

  menu.classList.toggle('open');
  hamburger.classList.toggle('open');
}

function closeMobileMenu() {
  var menu      = document.getElementById('mobile-menu');
  var hamburger = document.getElementById('hamburger-btn');

  if (menu)      menu.classList.remove('open');
  if (hamburger) hamburger.classList.remove('open');
}

// Close mobile menu on outside click
document.addEventListener('click', function(e) {
  var menu      = document.getElementById('mobile-menu');
  var hamburger = document.getElementById('hamburger-btn');

  if (
    menu && menu.classList.contains('open') &&
    !menu.contains(e.target) &&
    hamburger && !hamburger.contains(e.target)
  ) {
    closeMobileMenu();
  }
});


/* ─────────────────────────────────────────
   3. HEADER SCROLL EFFECT
───────────────────────────────────────── */

window.addEventListener('scroll', function() {
  var header = document.getElementById('site-header');
  if (!header) return;

  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


/* ─────────────────────────────────────────
   4. BOOKING FORM HANDLER
───────────────────────────────────────── */

/**
 * Handles booking form submission.
 * Shows a success message then resets the form.
 */
function handleFormSubmit(event, successId) {
  event.preventDefault();

  var successMsg = document.getElementById(successId);

  if (successMsg) {
    successMsg.classList.add('visible');

    setTimeout(function() {
      successMsg.classList.remove('visible');
    }, 6000);
  }

  event.target.reset();
}


/* ─────────────────────────────────────────
   5. INIT
───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', function() {
  showPage('home');
});
