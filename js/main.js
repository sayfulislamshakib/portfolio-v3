$(document).ready(function () {
  // Cache jQuery selectors
  var imageViewer = $("#image-viewer");
  var fullImage = $("#full-image");
  var snackbar = $("#snackbar");
  var myDIV = $("#myDIV");

  // Set initial active states
  setActiveTabGlobal();

  // Highlight the active tab for global navigation (filename-based)
  function setActiveTabGlobal() {
    var page = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';

    // Handle both global nav and mobile nav
    $('.tab a, .mobile-tab a, .navigation-option a').each(function () {
      var tab = $(this);
      var href = (tab.attr('href') || '').toLowerCase();

      // Special case for home page
      if (page === 'index.html' && !href) {
        tab.addClass('active');
        return;
      }

      // Remove active from non-matching tabs
      if (href !== page) {
        tab.removeClass('active');
      } else {
        tab.addClass('active');
      }
    });
  }

  // Ensure active states are set whenever navigation happens
  $(document).on('click', '.tab a, .mobile-tab a, .navigation-option a', function () {
    var href = $(this).attr('href');
    if (href && !href.startsWith('#')) {
      // Small delay to ensure DOM is ready after navigation
      setTimeout(setActiveTabGlobal, 100);
    }
  });

  // Highlight the active tab for in-page anchor navigation (scroll-based)
  function setActiveTabAnchors(selector = '.tab a.tablinks') {
    var $tabs = $(selector);
    var scrollPos = $(window).scrollTop();
    var found = false;

    // Check if we're at the bottom of the page
    if ((window.innerHeight + Math.ceil(scrollPos)) >= document.body.offsetHeight) {
      $tabs.removeClass('active');
      $tabs.last().addClass('active');
      return;
    }

    $tabs.each(function () {
      var href = $(this).attr('href');
      if (href && href.startsWith('#')) {
        var target = $(href);
        if (target.length) {
          var offset = target.offset().top - 150;
          if (scrollPos >= offset) {
            $tabs.removeClass('active');
            $(this).addClass('active');
            found = true;
          }
        }
      }
    });

    // If at the top, highlight the first tab
    if (!found) {
      $tabs.removeClass('active');
      $tabs.first().addClass('active');
    }
  }

  function initAnchorTabs(selector) {
    const handler = () => setActiveTabAnchors(selector);
    handler();
    $(window).off('scroll', handler).on('scroll', handler);
  }

  // Detect which logic to use
  if ($('.tab a.tablinks').length > 0) {
    // In-page anchor navigation (case study)
    initAnchorTabs('.tab a.tablinks');
  } else if (document.getElementById('crm-nav')) {
    // If crm-nav is loaded dynamically, observe and initialize
    const observer = new MutationObserver(function () {
      if ($('#crm-nav .tablinks').length > 0) {
        initAnchorTabs('#crm-nav .tablinks');
      }
    });
    observer.observe(document.getElementById('crm-nav'), { childList: true });
  } else {
    // Global navigation (main pages)
    if (document.getElementById('global-nav')) {
      const observer = new MutationObserver(setActiveTabGlobal);
      observer.observe(document.getElementById('global-nav'), { childList: true });
    } else {
      setActiveTabGlobal();
    }
  }

  // Observe redesign-nav for dynamic loading
  if (document.getElementById('redesign-nav')) {
    const observer = new MutationObserver(() => initAnchorTabs('#redesign-nav .tablinks'));
    observer.observe(document.getElementById('redesign-nav'), { childList: true });
    initAnchorTabs('#redesign-nav .tablinks');
  }

  // Smooth scroll for in-page anchor links
  $(document).on('click', 'a[href^="#"]', function (e) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - 80 // adjust offset as needed
      }, 600);
    }
  });

  // Prevent click on any active tab
  $(document).on('click', '.tab a.active, .tablinks.active', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  });
});

// Function to copy email to clipboard and show snackbar notification
function copyText() {
  navigator.clipboard.writeText("sayfulislamshakib.cs@gmail.com");
  var x = $("#snackbar");
  x.addClass("show");
  setTimeout(function () {
    x.removeClass("show");
  }, 3000);
}


// Current jobs date calculator
// Date calculator
$(function () {
  const startDate = new Date("2022-11-01"); // Start date: November 2022
  const today = new Date(); // Current date

  // Add one month to the current date
  const nextMonth = new Date(today.setMonth(today.getMonth() + 1));

  let years = today.getFullYear() - startDate.getFullYear();
  let months = today.getMonth() - startDate.getMonth();

  // Adjust the year and month if the current month is before the start month
  if (months < 0) {
    years--;
    months += 12;
  }

  // Display the result
  let resultText;
  if (years === 0) {
    resultText = `${months} month(s)`;
  } else {
    resultText = `${years} yr ${months} mos`;
  }

  if (document.getElementById("calculated-time")) {
    document.getElementById("calculated-time").textContent = resultText;
  }
});


