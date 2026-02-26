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
   4. WHATSAPP BOOKING NOTIFICATION
───────────────────────────────────────── */

/**
 * The hotel's WhatsApp number in international format.
 * No spaces, dashes or plus sign — just digits.
 */
var HOTEL_WHATSAPP = '2348024479308';


/**
 * Reads every labelled field inside a form and returns
 * a neat object of { label: value } pairs.
 *
 * @param  {HTMLFormElement} form
 * @returns {Object}
 */
function collectFormData(form) {
  var data = {};

  // Grab all inputs, selects and textareas that have an id
  var fields = form.querySelectorAll('input[id], select[id], textarea[id]');

  fields.forEach(function(field) {
    // Try to find a <label> that points to this field
    var label = form.querySelector('label[for="' + field.id + '"]');
    var key   = label ? label.textContent.replace('*', '').trim() : field.id;
    var value = field.value.trim();

    if (value) {
      data[key] = value;
    }
  });

  return data;
}


/**
 * Builds a formatted WhatsApp message string from form data.
 *
 * @param  {Object} data  - { label: value } pairs from the form
 * @returns {string}       - Human-readable booking message
 */
function buildWhatsAppMessage(data) {

  var lines = [];

  lines.push('🏨 *NEW BOOKING REQUEST — MTown Hotel & Suites*');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // Map common field labels to nice emoji prefixes
  var emojiMap = {
    'full name':      '👤 *Name:*',
    'name':           '👤 *Name:*',
    'phone number':   '📞 *Phone:*',
    'phone':          '📞 *Phone:*',
    'email address':  '📧 *Email:*',
    'email':          '📧 *Email:*',
    'check-in date':  '📅 *Check-in:*',
    'check-out date': '📅 *Check-out:*',
    'room type':      '🛏 *Room:*',
    'guests':         '👥 *Guests:*',
    'special requests': '📝 *Notes:*',
  };

  Object.keys(data).forEach(function(key) {
    var keyLower  = key.toLowerCase();
    var prefix    = emojiMap[keyLower] || ('• *' + key + ':*');
    lines.push(prefix + ' ' + data[key]);
  });

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('📍 Sani Abacha Way, Dutse, Jigawa');
  lines.push('⏰ Please confirm this booking at your earliest convenience.');

  return lines.join('\n');
}


/**
 * Opens WhatsApp with the pre-filled booking message.
 *
 * @param {string} message - The formatted message text
 */
function openWhatsApp(message) {
  var encoded = encodeURIComponent(message);
  var url     = 'https://wa.me/' + HOTEL_WHATSAPP + '?text=' + encoded;

  // Open in new tab so the form page stays visible
  window.open(url, '_blank');
}


/**
 * Main form submit handler.
 * 1. Prevents default page reload
 * 2. Collects all form fields
 * 3. Builds a WhatsApp message
 * 4. Opens WhatsApp with the pre-filled message
 * 5. Shows on-screen success message
 * 6. Resets the form
 *
 * @param {Event}  event     - The form submit event
 * @param {string} successId - ID of the success message element to show
 */
function handleFormSubmit(event, successId) {
  event.preventDefault();

  var form = event.target;

  // Step 1 — Collect the booking details from the form
  var bookingData = collectFormData(form);

  // Step 2 — Build the WhatsApp message
  var message = buildWhatsAppMessage(bookingData);

  // Step 3 — Open WhatsApp with the pre-filled message
  openWhatsApp(message);

  // Step 4 — Show the on-screen success confirmation
  var successMsg = document.getElementById(successId);
  if (successMsg) {
    successMsg.classList.add('visible');
    setTimeout(function() {
      successMsg.classList.remove('visible');
    }, 8000);
  }

  // Step 5 — Reset the form fields
  form.reset();
}


/* ─────────────────────────────────────────
   5. INIT
───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', function() {
  showPage('home');
});
