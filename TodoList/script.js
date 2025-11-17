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

addTaskButton.addEventListener("click", function () {
  const title = taskDescription.value.trim();
  const category = selectedCategoryValue || "others";
  const date = taskEndDate.value;

  if (taskDescription.value.trim()) {
    const listItem = document.createElement("li");
    listItem.className = "list-item";

    // Checkbox, title , delete icon
    const itemPart = document.createElement("div");
    itemPart.className = "item-parts";

    const partOne = document.createElement("div");
    partOne.className = "part-one";

    const inputCheck = document.createElement("input");
    inputCheck.type = "checkbox";

    inputCheck.addEventListener("change", () => {
      if (inputCheck.checked) {
        listItem.setAttribute("data-status", "completed");
        listItem.classList.add("completed");
        itemTitle.classList.add("done");
      } else {
        listItem.setAttribute("data-status", "active");
        listItem.classList.remove("completed");
        itemTitle.classList.remove("done");
      }

      const activeFilter = document.querySelector(".status-filter .active");
      // get selected filter type
      const type = activeFilter.id.replace("Filter", "").toLowerCase(); // Remove the "Filter" from the id : allFilter, activeFilter and completeFilter.
      applyStatusFilter(type);
    });

    const itemTitle = document.createElement("span");
    itemTitle.className = "item-title";
    itemTitle.textContent = title;

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-regular fa-trash-can";

    partOne.appendChild(inputCheck);
    partOne.appendChild(itemTitle);

    itemPart.appendChild(partOne);
    itemPart.appendChild(deleteIcon);

    // Date and category
    const detailsList = document.createElement("ul");

    const itemCategory = document.createElement("li");

    const tagIcon = document.createElement("i");
    tagIcon.className = "fa-solid fa-tag";

    itemCategory.appendChild(tagIcon);

    itemCategory.append(" " + category);

    const categoryClassMap = {
      work: "work-color",
      personal: "personal-color",
      health: "date-passed",
      shopping: "shopping-color",
    };

    if (categoryClassMap[category]) {
      itemCategory.classList.add(categoryClassMap[category]);
    }

    detailsList.appendChild(itemCategory);

    if (date) {
      const itemEndDate = document.createElement("li");
      itemEndDate.textContent = date;
      detailsList.appendChild(itemEndDate);

      const today = new Date();

      const inputDate = new Date(date);
      if (today > inputDate) {
        itemEndDate.classList.add("date-passed");
      }
    }

    // Final Task
    listItem.appendChild(itemPart);
    listItem.appendChild(detailsList);
    listItem.setAttribute("data-status", "active");

    // Add task to the task list
    taskList.appendChild(listItem);

    // Empty the input on successful task addition
    taskDescription.value = "";
    selectedCategoryValue = "";
    taskEndDate.value = "";
    addCategory.value = selectedCategoryValue;
    addCategory.textContent = "Select Category";
  } else {
    alert("Please enter a Task.");
  }
});

// Filters

const filters = document.querySelectorAll(".status-filter span");

document.getElementById("allFilter").classList.add("active");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((f) => f.classList.remove("active"));

    filter.classList.add("active");

    // get selected filter type
    const type = filter.id.replace("Filter", "").toLowerCase(); // Remove the "Filter" from the id : allFilter, activeFilter and completeFilter.
    applyStatusFilter(type);
  });
});

function applyStatusFilter(type) {
  const tasks = document.querySelectorAll(".list-item");

  tasks.forEach((task) => {
    const status = task.getAttribute("data-status");

    if (type === "all" || type === status) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

// Dropdown filter

const dropdownFilter = document.getElementById("categoryFilterButton");
const dropdownFilterItems = document.getElementById("categoryFilterContent");

dropdownFilter.addEventListener("click", () => {
  dropdownFilterItems.style.display =
    dropdownFilterItems.style.display === "none" ? "block" : "none";
});

window.addEventListener("click", (event) => {
  if (
    !dropdownFilter.contains(event.target) &&
    !dropdownFilterItems.contains(event.target)
  ) {
    dropdownFilterItems.style.display = "none";
  }
});

// Applying drop down filter

const dropdownFilterList = document.querySelectorAll(
  "#categoryFilterContent a"
);

dropdownFilterList.forEach((dropFilter) => {
  dropFilter.addEventListener("click", (e) => {
    e.preventDefault();

    const selectedCategory = dropFilter.dataset.value;
    const categoryFilterBtn = document.getElementById("categoryFilterButton");

    categoryFilterBtn.textContent =
      selectedCategory === "" ? "All Category" : dropFilter.textContent;

    dropdownFilterItems.style.display = "none";
  });
});

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
