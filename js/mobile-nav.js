/**
 * Mobile Navigation Logic
 * Handles loading the mobile menu bar, toggling the menu,
 * and setting active states.
 */

document.addEventListener('DOMContentLoaded', function() {
  const basePath = getBasePath();
  const mobileNavPath = `${basePath}nav/mobile-nav.html`;

  // 1. Load the mobile nav bar (the top strip with the button)
  fetch(mobileNavPath)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${mobileNavPath}`);
      return res.text();
    })
    .then(html => {
      document.body.insertAdjacentHTML('afterbegin', html);
      initMobileNav(basePath);
    })
    .catch(err => console.error('Error loading mobile nav:', err));
});

/**
 * Determines the base path for assets based on current URL
 */
function getBasePath() {
  // Simple check: if we are in a subfolder like /case-study/, we need to go up one level
  // This can be expanded if the site structure gets deeper
  if (window.location.pathname.includes('/case-study/')) {
    return '../';
  }
  return '';
}

/**
 * Initialize the mobile navigation functionality
 */
function initMobileNav(basePath) {
  // Set the active page title in the top bar
  updateMobileHeaderTitle();

  // Attach click listener to the Menu button
  const menuButton = document.querySelector('.mobile-menu');
  if (menuButton) {
    menuButton.addEventListener('click', (e) => toggleMobileMenu(e, basePath));
  }
}

/**
 * Updates the text in the mobile header based on current page
 */
function updateMobileHeaderTitle() {
  const activePage = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
  const pageNames = {
    'index.html': 'Home',
    'about.html': 'About',
    'redesign.html': 'Redesign',
    'resume.html': 'Resume',
    'resume-new.html': 'Resume',
    'contact.html': 'Contact',
    'crm-case-study.html': 'CRM Case Study' // Added support for the case study page
  };

  const activeText = document.querySelector('.mobile-tab .active');
  if (activeText) {
    // Default to 'Home' if no match found, or use the map
    activeText.textContent = pageNames[activePage] || 'Portfolio'; 
  }
}

/**
 * Toggles the mobile menu open/closed
 */
function toggleMobileMenu(e, basePath) {
  e.stopPropagation(); // Prevent immediate closing
  
  const navContainer = document.getElementById("mobile-nav");
  if (!navContainer) return;

  // Check if we need to load the content first
  if (navContainer.innerHTML.trim() === "") {
    loadGlobalNavContent(navContainer, basePath);
  } else {
    // Just toggle visibility
    const isHidden = navContainer.style.display === "none" || navContainer.style.display === "";
    if (isHidden) {
      openMenu(navContainer);
    } else {
      closeMenu(navContainer);
    }
  }
}

/**
 * Loads the links from global-nav.html into the mobile menu container
 */
function loadGlobalNavContent(container, basePath) {
  const globalNavPath = `${basePath}nav/global-nav.html`;
  
  fetch(globalNavPath)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${globalNavPath}`);
      return res.text();
    })
    .then(html => {
      container.innerHTML = html;
      highlightActiveLinks(container);
      openMenu(container);
    })
    .catch(err => console.error('Error loading global nav for mobile:', err));
}

/**
 * Opens the menu and attaches the outside click listener
 */
function openMenu(container) {
  container.style.display = "block";
  // Delay adding the listener slightly to avoid catching the current click
  setTimeout(() => {
    document.addEventListener('click', handleOutsideClick);
  }, 0);
}

/**
 * Closes the menu and removes the outside click listener
 */
function closeMenu(container) {
  container.style.display = "none";
  document.removeEventListener('click', handleOutsideClick);
}

/**
 * Handles clicks outside the menu to close it
 */
function handleOutsideClick(e) {
  const navContainer = document.getElementById("mobile-nav");
  const menuButton = document.querySelector('.mobile-menu');

  // If click is inside the menu or on the button, do nothing
  if (navContainer.contains(e.target) || (menuButton && menuButton.contains(e.target))) {
    return;
  }

  closeMenu(navContainer);
}

/**
 * Highlights the current page link in the mobile menu
 */
function highlightActiveLinks(container) {
  const currentPage = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
  const links = container.getElementsByTagName('a');
  
  for (let link of links) {
    const href = link.getAttribute('href');
    if (!href) continue;
    
    // Simple match
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  }
}