//Current jobs date calculator

//Date calculator
document.addEventListener("DOMContentLoaded", () => {
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

  document.getElementById("calculated-time").textContent = resultText;
});
