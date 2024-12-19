$(document).ready(function () {
  var tabLinks = $(".tablinks");
  var windowHeight = $(window).height();
  var prevActiveTab;
  var imageViewer = $("#image-viewer");
  var fullImage = $("#full-image");
  var snackbar = $("#snackbar");
  var myDIV = $("#myDIV");

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
    imageViewer.fadeOut(50);
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

  $(".popup-image img").click(function () {
    fullImage.attr("src", $(this).attr("src"));
    imageViewer.fadeIn(150);
  });

  imageViewer.click(function () {
    imageViewer.fadeOut(50);
  });
});

function copyText() {
  navigator.clipboard.writeText("sayfulislamshakib.cs@gmail.com");
  var x = $("#snackbar");
  x.addClass("show");
  setTimeout(function () {
    x.removeClass("show");
  }, 3000);
}

function myFunction() {
  var x = $("#myDIV");
  if (x.css("display") === "none" || x.css("display") === "") {
    x.css("display", "block");
  } else {
    x.css("display", "none");
  }
}
