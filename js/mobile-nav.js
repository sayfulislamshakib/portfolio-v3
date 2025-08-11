// Load mobile navigation
document.addEventListener('DOMContentLoaded', function() {
  // First load the mobile nav structure
  fetch('/nav/mobile-nav.html')
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML('afterbegin', html);
      
      // Then set the active page text
      const activePage = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
      const pageNames = {
        'index.html': 'Home',
        'about.html': 'About',
        'redesign.html': 'Redesign',
        'resume.html': 'Resume',
        'resume-new.html': 'Resume',
        'contact.html': 'Contact'
      };
      
      const activeText = document.querySelector('.mobile-tab .active');
      if (activeText) {
        activeText.textContent = pageNames[activePage] || 'Home';
      }
    });
});
