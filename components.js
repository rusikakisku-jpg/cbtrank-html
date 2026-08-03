/**
 * CBT RANK — Reusable Header & Footer Components
 * Injecting this single script into any HTML page automatically renders
 * the unified Navbar and Footer with active link highlighting & mobile menu support.
 */

(function () {
  // Determine current active page filename
  const pathname = window.location.pathname.split('/').pop() || 'index.html';

  /* ============================================================
     1. HEADER / NAVBAR COMPONENT
  ============================================================ */
  const headerHtml = `
    <header class="navbar" id="navbar">
      <div class="navbar-inner">
        <a href="index.html" class="nav-logo" aria-label="CBT RANK Home">
          <div class="logo-circle">CBT</div>
          <span class="logo-text">CBT RANK</span>
        </a>
        <nav aria-label="Main Navigation">
          <ul class="nav-links">
            <li><a href="index.html" class="${pathname === 'index.html' || pathname === '' ? 'active' : ''}">Home</a></li>
            <li><a href="answerkey.html" class="${pathname === 'answerkey.html' ? 'active' : ''}">Answer Key</a></li>
          </ul>
        </nav>
        <button class="hamburger" id="hamburger" aria-label="Toggle Navigation Menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="mobile-drawer" id="mobile-drawer" role="navigation" aria-label="Mobile Navigation">
        <a href="index.html" class="${pathname === 'index.html' || pathname === '' ? 'active' : ''}">Home</a>
        <a href="answerkey.html" class="${pathname === 'answerkey.html' ? 'active' : ''}">Answer Key</a>
      </div>
    </header>
  `;

  /* ============================================================
     2. FOOTER COMPONENT
  ============================================================ */
  const currentYear = new Date().getFullYear();
  const footerHtml = `
    <footer>
      <div class="footer-inner">
        <nav aria-label="Footer Navigation">
          <ul class="footer-links">
            <li><a href="index.html" class="${pathname === 'index.html' || pathname === '' ? 'active' : ''}">Home</a></li>
            <li><a href="about-us.html" class="${pathname === 'about-us.html' ? 'active' : ''}">About Us</a></li>
            <li><a href="contact-us.html" class="${pathname === 'contact-us.html' ? 'active' : ''}">Contact Us</a></li>
            <li><a href="privacy-policy.html" class="${pathname === 'privacy-policy.html' ? 'active' : ''}">Privacy Policy</a></li>
            <li><a href="terms-and-conditions.html" class="${pathname === 'terms-and-conditions.html' ? 'active' : ''}">Terms and Conditions</a></li>
            <li><a href="disclaimer.html" class="${pathname === 'disclaimer.html' ? 'active' : ''}">Disclaimer</a></li>
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
