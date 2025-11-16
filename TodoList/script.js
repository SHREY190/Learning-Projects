// Variables and constants

const addCategory = document.getElementById("categoryDropButton");
const drop = document.getElementById("addDropContent");
const addCategoryItems = document.querySelectorAll("#addDropContent a");
const addTaskButton = document.getElementById("addButton");
const taskDescription = document.getElementById("tastInput");
const taskEndDate = document.getElementById("datePicker");
const taskList = document.getElementById("taskList");
let selectedCategoryValue = "";

//---- Function to select category ----

// Open dropdown on button click
addCategory.addEventListener("click", function () {
  const dropDisplay = document.getElementById("addDropContent");

  dropDisplay.style.display =
    dropDisplay.style.display === "none" ? "block" : "none";
});

// Handle click outside of button and dropdown
window.onclick = function (event) {
  if (!addCategory.contains(event.target) && !drop.contains(event.target)) {
    drop.style.display = "none";
  }
};

// Selecting the Category from the dropdown list.
addCategoryItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();

    const label = this.textContent;
    const value = this.dataset.value;

    addCategory.textContent = label;
    selectedCategoryValue = value;

    // console.log("Selected Category=>", selectedCategoryValue);
    drop.style.display = "none";
  });
});

// ---- Function to add the task to the list ----

function addTask() {
  const title = taskDescription.value.trim();
  const category = selectedCategoryValue || "others";
  const date = taskEndDate.value;

  if (taskDescription.value.trim()) {
  }
}

// Toggle Theme button

function toggleTheme() {
  let icon = document.getElementById("themeIcon");
  let body = document.body;

  body.classList.toggle("dark-mode");

  if (icon.classList.contains("fa-moon")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    icon.title = "Light Mode";
    localStorage.setItem("theme", "dark");
  } else if (icon.classList.contains("fa-sun")) {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
    icon.title = "Dark Mode";
    localStorage.setItem("theme", "light");
  }
}

// Check theme on laod
let icon = document.getElementById("themeIcon");
let body = document.body;

let storedTheme = localStorage.getItem("theme");
// console.log(storedTheme);

if (storedTheme === "dark") {
  icon.classList.remove("fa-moon");
  icon.classList.add("fa-sun");
  body.classList.add("dark-mode");
}
