/**
 * CBT RANK — Reusable Header & Footer Components with Clean Root Absolute URLs
 * Injecting this single script into any HTML page automatically renders
 * the unified Navbar and Footer with active link highlighting & mobile menu support.
 */

(function () {
  // Determine current active page filename (e.g., 'answerkey', 'result', 'index')
  let pathname = window.location.pathname.split('/').pop() || 'index';
  pathname = pathname.replace(/\.html$/i, '').replace(/\.php$/i, '');
  if (!pathname) pathname = 'index';

  /* ============================================================
     1. HEADER / NAVBAR COMPONENT (Absolute Root Paths)
  ============================================================ */
  const headerHtml = `
    <header class="navbar" id="navbar">
      <div class="navbar-inner">
        <a href="/index" class="nav-logo" aria-label="CBT RANK Home">
          <div class="logo-circle">CBT</div>
          <span class="logo-text">CBT RANK</span>
        </a>
        <nav aria-label="Main Navigation">
          <ul class="nav-links">
            <li><a href="/index" class="${pathname === 'index' || pathname === '' ? 'active' : ''}">Home</a></li>
            <li><a href="/answerkey" class="${pathname === 'answerkey' ? 'active' : ''}">Answer Key</a></li>
          </ul>
        </nav>
        <button class="hamburger" id="hamburger" aria-label="Toggle Navigation Menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="mobile-drawer" id="mobile-drawer" role="navigation" aria-label="Mobile Navigation">
        <a href="/index" class="${pathname === 'index' || pathname === '' ? 'active' : ''}">Home</a>
        <a href="/answerkey" class="${pathname === 'answerkey' ? 'active' : ''}">Answer Key</a>
      </div>
    </header>
  `;

  /* ============================================================
     2. FOOTER COMPONENT (Absolute Root Paths)
  ============================================================ */
  const currentYear = new Date().getFullYear();
  const footerHtml = `
    <footer>
      <div class="footer-inner">
        <nav aria-label="Footer Navigation">
          <ul class="footer-links">
            <li><a href="/index" class="${pathname === 'index' || pathname === '' ? 'active' : ''}">Home</a></li>
            <li><a href="/about-us" class="${pathname === 'about-us' ? 'active' : ''}">About Us</a></li>
            <li><a href="/contact-us" class="${pathname === 'contact-us' ? 'active' : ''}">Contact Us</a></li>
            <li><a href="/privacy-policy" class="${pathname === 'privacy-policy' ? 'active' : ''}">Privacy Policy</a></li>
            <li><a href="/terms-and-conditions" class="${pathname === 'terms-and-conditions' ? 'active' : ''}">Terms and Conditions</a></li>
            <li><a href="/disclaimer" class="${pathname === 'disclaimer' ? 'active' : ''}">Disclaimer</a></li>
          </ul>
        </nav>
        <div class="footer-copy">© ${currentYear} CBTRANK.COM | All Rights Reserved</div>
      </div>
    </footer>

    <!-- Floating Telegram Button -->
    <a href="https://t.me/cbtrank" class="float-telegram" target="_blank" rel="noopener noreferrer" title="Join Telegram Channel" aria-label="Join CBT RANK Telegram Channel">
      <img src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png" alt="Telegram">
    </a>
  `;

  /* ============================================================
     3. DOM INJECTION & EVENT LISTENERS
  ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    // Inject Header if target element exists or at top of body
    const headerContainer = document.getElementById('navbar-container');
    if (headerContainer) {
      headerContainer.innerHTML = headerHtml;
    } else {
      const existingHeader = document.querySelector('header.navbar');
      if (existingHeader) {
        existingHeader.outerHTML = headerHtml;
      } else {
        document.body.insertAdjacentHTML('afterbegin', headerHtml);
      }
    }

    // Inject Footer if target element exists or at bottom of body
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      footerContainer.innerHTML = footerHtml;
    } else {
      const existingFooter = document.querySelector('footer');
      if (existingFooter) {
        existingFooter.outerHTML = footerHtml;
      } else {
        document.body.insertAdjacentHTML('beforeend', footerHtml);
      }
    }

    // Setup Mobile Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mobileDrawer = document.getElementById('mobile-drawer');

    if (hamburger && mobileDrawer) {
      hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
        if (isOpen) {
          mobileDrawer.classList.add('open');
        } else {
          mobileDrawer.classList.remove('open');
        }
      });

      mobileDrawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('open');
          mobileDrawer.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });
    }
  });

})();
