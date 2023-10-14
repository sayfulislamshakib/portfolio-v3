// Get all tab links
const tabLinks = document.querySelectorAll(".tablinks");

// Get all sections that you want to link to
const sections = document.querySelectorAll("section");

// Function to check if an element is in the viewport
const isElementInViewport = (el) => {
	const rect = el.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};

// Function to update the active tab based on the currently visible section
const updateActiveTab = () => {
	let found = false;
	sections.forEach((section, index) => {
		if (!found && isElementInViewport(section)) {
			// Remove the "active" class from all tab links
			tabLinks.forEach((tabLink) => {
				tabLink.classList.remove("active");
			});

			// Add the "active" class to the corresponding tab link
			tabLinks[index].classList.add("active");
			found = true; // Only highlight the first visible section
		}
	});
};

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

// Add a scroll event listener to update the active tab while scrolling
window.addEventListener("scroll", updateActiveTab);

// Call the updateActiveTab function once to initialize the active tab
updateActiveTab();

// Using jQuery for image popup functionality
$(document).ready(function () {
	$(".popup-image img").click(function () {
		$("#full-image").attr("src", $(this).attr("src"));
		$("#image-viewer").fadeIn(250);
	});

	$("#image-viewer").click(function () {
		$("#image-viewer").fadeOut(250);
	});
});
