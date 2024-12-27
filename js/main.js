$(document).ready(function () {
  // Cache jQuery selectors
  var tabLinks = $(".tablinks");
  var windowHeight = $(window).height();
  var prevActiveTab;
  var imageViewer = $("#image-viewer");
  var fullImage = $("#full-image");
  var snackbar = $("#snackbar");
  var myDIV = $("#myDIV");

  // Add click event to tab links for smooth scrolling
  tabLinks.on("click", function (e) {
    e.preventDefault();
    var targetSection = $($(this).attr("href"));
    smoothScroll(targetSection);
  });

  // Function to smoothly scroll to the target section
  function smoothScroll(target) {
    var marginTop = 80;
    $("html, body").animate(
      {
        scrollTop: target.offset().top - marginTop,
      },
      800
    );
  }

  // Add scroll event to window to update active tab and hide image viewer
  $(window).on("scroll", function () {
    var scrollPosition = $(this).scrollTop();
    var activeTab;

    // Determine which tab should be active based on scroll position
    tabLinks.each(function () {
      var link = $(this);
      var targetSection = $(link.attr("href"));
      var sectionTop = targetSection.offset().top;
      var sectionHeight = targetSection.outerHeight();
      var sectionBottom = sectionTop + sectionHeight - 80;

      if (
        scrollPosition >= sectionTop - windowHeight / 8 &&
        scrollPosition < sectionBottom &&
        windowHeight <= sectionHeight
      ) {
        activeTab = link;
      } else if (
        scrollPosition >= sectionTop - windowHeight / 8 &&
        windowHeight > sectionHeight
      ) {
        activeTab = link;
      }
    });

    // Update the active tab and hide the image viewer
    updateActiveTab(activeTab);
    imageViewer.fadeOut(50);
  });

  // Function to update the active tab
  function updateActiveTab(activeTab) {
    if (activeTab && activeTab !== prevActiveTab) {
      tabLinks.removeClass("active");
      activeTab.addClass("active");
      prevActiveTab = activeTab;
    }

    // Ensure the last tab is active when scrolled to the bottom
    var documentHeight = $(document).height();
    if ($(window).scrollTop() + windowHeight >= documentHeight) {
      tabLinks.removeClass("active");
      tabLinks.last().addClass("active");
    }
  }

  // Show full image in image viewer when thumbnail is clicked
  $(".popup-image img").click(function () {
    fullImage.attr("src", $(this).attr("src"));
    imageViewer.fadeIn(150);
  });

  // Hide image viewer when clicked
  imageViewer.click(function () {
    imageViewer.fadeOut(50);
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
