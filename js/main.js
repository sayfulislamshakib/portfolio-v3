$(document).ready(function () {
  // Cache jQuery selectors
  var imageViewer = $("#image-viewer");
  var fullImage = $("#full-image");
  var snackbar = $("#snackbar");
  var myDIV = $("#myDIV");

  // Highlight the active tab for global navigation (filename-based)
  function setActiveTabGlobal() {
    var $tabs = $('.tab a');
    $tabs.removeClass('active');
    var page = window.location.pathname.split('/').pop().toLowerCase();
    if (page === '' || page === '/') page = 'index.html'; // treat root as home
    $tabs.each(function () {
      var tab = $(this);
      var href = tab.attr('href').toLowerCase();
      if (href === page) {
        tab.addClass('active');
      }
    });
  }

  // Highlight the active tab for in-page anchor navigation (scroll-based)
  function setActiveTabAnchors() {
    var $tabs = $('.tab a.tablinks');
    var scrollPos = $(window).scrollTop();
    var found = false;
    $tabs.each(function () {
      var href = $(this).attr('href');
      if (href && href.startsWith('#')) {
        var target = $(href);
        if (target.length) {
          var offset = target.offset().top - 150; // adjust offset as needed
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

  function initAnchorTabs() {
    setActiveTabAnchors();
    $(window).off('scroll', setActiveTabAnchors).on('scroll', setActiveTabAnchors);
  }

  // Detect which logic to use
  if ($('.tab a.tablinks').length > 0) {
    // In-page anchor navigation (case study)
    initAnchorTabs();
  } else if (document.getElementById('crm-nav')) {
    // If crm-nav is loaded dynamically, observe and initialize
    const observer = new MutationObserver(function() {
      if ($('#crm-nav .tablinks').length > 0) {
        initAnchorTabs();
      }
    });
    observer.observe(document.getElementById('crm-nav'), { childList: true });
  } else {
    // Global navigation (main pages)
    if (document.getElementById('global-nav')) {
      const observer = new MutationObserver(function() {
        setActiveTabGlobal();
      });
      observer.observe(document.getElementById('global-nav'), { childList: true });
    } else {
      setActiveTabGlobal();
    }
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

  // Prevent click on active tab (global navigation)
  $(document).on('click', '.tab a.active', function(e) {
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

// Function to toggle the display of a div
function myFunction() {
  var x = $("#myDIV");
  if (x.css("display") === "none" || x.css("display") === "") {
    x.css("display", "block");
  } else {
    x.css("display", "none");
  }
}
