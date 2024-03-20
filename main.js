$(document).ready(function () {
  var tabLinks = $(".tablinks");
  var windowHeight = $(window).height();
  var prevActiveTab;

  tabLinks.on("click", function (e) {
    e.preventDefault();
    var targetSection = $($(this).attr("href"));
    smoothScroll(targetSection);
  });

  function smoothScroll(target) {
    var marginTop = 80;
    $("html, body").animate(
      {
        scrollTop: target.offset().top - marginTop,
      },
      800
    );
  }

  $(window).on("scroll", function () {
    var scrollPosition = $(this).scrollTop();
    var activeTab;

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

    updateActiveTab(activeTab);
  });

  function updateActiveTab(activeTab) {
    if (activeTab && activeTab !== prevActiveTab) {
      tabLinks.removeClass("active");
      activeTab.addClass("active");
      prevActiveTab = activeTab;
    }

    var documentHeight = $(document).height();
    if ($(window).scrollTop() + windowHeight >= documentHeight) {
      tabLinks.removeClass("active");
      tabLinks.last().addClass("active");
    }
  }
});

// Using jQuery for image popup functionality
$(document).ready(function () {
  // When an image inside "popup-image" is clicked, display the full image
  $(".popup-image img").click(function () {
    $("#full-image").attr("src", $(this).attr("src"));
    $("#image-viewer").fadeIn(150);
  });

  // Clicking on the image viewer hides it
  $("#image-viewer").click(function () {
    $("#image-viewer").fadeOut(50);
  });

  // Close the image viewer when the user scrolls
  $(window).scroll(function () {
    $("#image-viewer").fadeOut(50);
  });
});

// Copy text into clipboard

function copyText() {
  navigator.clipboard.writeText("sayfulislamshakib.cs@gmail.com");
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}
