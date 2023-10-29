// Get all tab links
const tabLinks = document.querySelectorAll(".tablinks");

// Get all sections that you want to link to
const sections = document.querySelectorAll("section");

// Create an Intersection Observer instance
const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			// Remove the "active" class from all tab links
			tabLinks.forEach((tabLink) => {
				tabLink.classList.remove("active");
			});

			// Add the "active" class to the corresponding tab link
			const targetTabLink = document.querySelector(
				`[href="#${entry.target.id}"]`
			);
			if (targetTabLink) {
				targetTabLink.classList.add("active");
			}
		}
	});
});

// Observe each section
sections.forEach((section) => {
	observer.observe(section);
});

// Add click event listeners to each tab link
tabLinks.forEach((link) => {
	link.addEventListener("click", (event) => {
		event.preventDefault(); // Prevent the default link behavior

		// Remove the "active" class from all tab links
		tabLinks.forEach((tabLink) => {
			tabLink.classList.remove("active");
		});

		// Add the "active" class to the clicked tab link
		link.classList.add("active");

		// Get the target section ID from the href attribute
		const targetSectionId = link.getAttribute("href").substring(1);

		// Scroll to the target section
		const targetSection = document.getElementById(targetSectionId);
		if (targetSection) {
			targetSection.scrollIntoView({ behavior: "smooth" });
		}
	});
});

// Using jQuery for image popup functionality
$(document).ready(function () {
	$(".popup-image img").click(function () {
		$("#full-image").attr("src", $(this).attr("src"));
		$("#image-viewer").fadeIn(150);
	});

	$("#image-viewer").click(function () {
		$("#image-viewer").fadeOut(150);
	});
});
