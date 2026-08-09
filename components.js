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

  // Determine root prefix dynamically for GitHub Pages (/cbtrank-html/) or custom domain/local
  let rootPrefix = '/';
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  if (pathParts.length > 0 && pathParts[0] === 'cbtrank-html') {
    rootPrefix = '/cbtrank-html/';
  }

  const homeUrl = rootPrefix;
  const answerkeyUrl = rootPrefix + 'answerkey';
  const aboutUrl = rootPrefix + 'about-us';
  const contactUrl = rootPrefix + 'contact-us';
  const privacyUrl = rootPrefix + 'privacy-policy';
  const termsUrl = rootPrefix + 'terms-and-conditions';
  const disclaimerUrl = rootPrefix + 'disclaimer';

  /* ============================================================
     1. HEADER / NAVBAR COMPONENT (Dynamic Root-Aware Paths)
  ============================================================ */
  const headerHtml = `
    <header class="navbar" id="navbar">
      <div class="navbar-inner">
        <a href="${homeUrl}" class="nav-logo" aria-label="CBT RANK Home">
          <div class="logo-circle">CBT</div>
          <span class="logo-text">CBT RANK</span>
        </a>
        <nav aria-label="Main Navigation">
          <ul class="nav-links">
            <li><a href="${homeUrl}" class="${pathname === 'index' || pathname === '' ? 'active' : ''}">Home</a></li>
            <li><a href="${answerkeyUrl}" class="${pathname === 'answerkey' ? 'active' : ''}">Answer Key</a></li>
            <li id="nav-blog-li" style="display: none;"><a href="${rootPrefix}blog.html" class="${pathname === 'blog' ? 'active' : ''}">Blog</a></li>
          </ul>
        </nav>
        <button class="hamburger" id="hamburger" aria-label="Toggle Navigation Menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="mobile-drawer" id="mobile-drawer" role="navigation" aria-label="Mobile Navigation">
        <a href="${homeUrl}" class="${pathname === 'index' || pathname === '' ? 'active' : ''}">Home</a>
        <a href="${answerkeyUrl}" class="${pathname === 'answerkey' ? 'active' : ''}">Answer Key</a>
        <a href="${rootPrefix}blog.html" id="mobile-blog-link" style="display: none;" class="${pathname === 'blog' ? 'active' : ''}">Blog</a>
      </div>
    </header>
  `;

  /* ============================================================
     2. FOOTER COMPONENT (Dynamic Root-Aware Paths)
  ============================================================ */
  const currentYear = new Date().getFullYear();
  const footerHtml = `
    <footer>
      <div class="footer-inner">
        <nav aria-label="Footer Navigation">
          <ul class="footer-links">
            <li><a href="${homeUrl}" class="${pathname === 'index' || pathname === '' ? 'active' : ''}">Home</a></li>
            <li><a href="${aboutUrl}" class="${pathname === 'about-us' ? 'active' : ''}">About Us</a></li>
            <li><a href="${contactUrl}" class="${pathname === 'contact-us' ? 'active' : ''}">Contact Us</a></li>
            <li><a href="${privacyUrl}" class="${pathname === 'privacy-policy' ? 'active' : ''}">Privacy Policy</a></li>
            <li><a href="${termsUrl}" class="${pathname === 'terms-and-conditions' ? 'active' : ''}">Terms and Conditions</a></li>
            <li><a href="${disclaimerUrl}" class="${pathname === 'disclaimer' ? 'active' : ''}">Disclaimer</a></li>
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

    // Automatic address bar URL cleanup (Strips .html extension for 100% SEO-friendly clean URLs)
    try {
      if (window.history && window.history.replaceState) {
        let currentPath = window.location.pathname;
        if (/\.html$/i.test(currentPath)) {
          let cleanPath = currentPath.replace(/\.html$/i, '');
          if (cleanPath.endsWith('/index')) {
            cleanPath = cleanPath.substring(0, cleanPath.length - 5);
          }
          window.history.replaceState({}, '', cleanPath + window.location.search);
        }
      }
    } catch (e) {}
  });

})();
