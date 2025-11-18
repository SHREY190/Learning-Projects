// script.js
// Complete working JS for the ToDo app (status + category filters, counts, add/delete, checkbox toggle)

// --- Elements & state ---
const addCategoryBtn = document.getElementById("categoryDropButton");
const addCategoryDrop = document.getElementById("addDropContent");
const addCategoryItems = document.querySelectorAll("#addDropContent a");

const addTaskButton = document.getElementById("addButton");
const taskDescription = document.getElementById("tastInput");
const taskEndDate = document.getElementById("datePicker");
const taskList = document.getElementById("taskList");

// category filter UI
const categoryFilterBtn = document.getElementById("categoryFilterButton");
const categoryFilterContent = document.getElementById("categoryFilterContent");
const categoryFilterItems = document.querySelectorAll(
  "#categoryFilterContent a"
);

// status filter spans
const statusFilterSpans = document.querySelectorAll(".status-filter span");

// default selected category value for add-task dropdown
let selectedCategoryValue = "";

// ensure filter button has dataset value (empty = all)
if (!categoryFilterBtn.dataset.value) categoryFilterBtn.dataset.value = "";

// ----------------------
// Dropdown: Add-Category (Add task)
// ----------------------
addCategoryBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  addCategoryDrop.style.display =
    addCategoryDrop.style.display === "block" ? "none" : "block";
});

// select category from add-task dropdown
addCategoryItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const label = this.textContent.trim();
    const value = this.dataset.value ?? "";

    addCategoryBtn.textContent = label;
    addCategoryBtn.dataset.value = value; // keep for reference if needed
    selectedCategoryValue = value;

    addCategoryDrop.style.display = "none";
  });
});

// ----------------------
// Close add-category dropdown when clicking outside
// ----------------------
window.addEventListener("click", (event) => {
  if (
    !addCategoryBtn.contains(event.target) &&
    !addCategoryDrop.contains(event.target)
  ) {
    addCategoryDrop.style.display = "none";
  }
});

// ----------------------
// Adding Tasks
// ----------------------
addTaskButton.addEventListener("click", () => {
  const title = taskDescription.value.trim();
  const category = selectedCategoryValue || "others";
  const date = taskEndDate.value;

  if (!title) {
    alert("Please enter a Task.");
    return;
  }

  // create elements
  const listItem = document.createElement("li");
  listItem.className = "list-item";
  listItem.dataset.status = "active"; // active by default
  listItem.dataset.category = category; // save category

  const itemParts = document.createElement("div");
  itemParts.className = "item-parts";

  const partOne = document.createElement("div");
  partOne.className = "part-one";

  const inputCheck = document.createElement("input");
  inputCheck.type = "checkbox";

  const itemTitle = document.createElement("span");
  itemTitle.className = "item-title";
  itemTitle.textContent = title;

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-regular fa-trash-can";

  // append checkbox + title
  partOne.appendChild(inputCheck);
  partOne.appendChild(itemTitle);
  itemParts.appendChild(partOne);
  itemParts.appendChild(deleteIcon);

  // details (category + date)
  const detailsList = document.createElement("ul");

  const itemCategory = document.createElement("li");
  const tagIcon = document.createElement("i");
  tagIcon.className = "fa-solid fa-tag";
  itemCategory.appendChild(tagIcon);

  // category label separated in span so styling doesn't affect icon
  const catText = document.createElement("span");
  catText.textContent = " " + category;
  itemCategory.appendChild(catText);

  // Add category color class to text span
  const categoryClassMap = {
    work: "work-color",
    personal: "personal-color",
    health: "date-passed", // you used this class earlier; change if you want a dedicated health-color
    shopping: "shopping-color",
    others: "others-color",
  };
  if (categoryClassMap[category]) {
    catText.classList.add(categoryClassMap[category]);
  }

  detailsList.appendChild(itemCategory);

  if (date) {
    const itemEndDate = document.createElement("li");
    itemEndDate.textContent = date;
    // mark date-passed if in past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);
    if (inputDate < today) itemEndDate.classList.add("date-passed");
    detailsList.appendChild(itemEndDate);
  }

  // assemble
  listItem.appendChild(itemParts);
  listItem.appendChild(detailsList);

  // append to DOM
  taskList.appendChild(listItem);

  // attach checkbox listener (for this newly created checkbox)
  inputCheck.addEventListener("change", () => {
    if (inputCheck.checked) {
      listItem.dataset.status = "completed";
      listItem.classList.add("completed");
      itemTitle.classList.add("done");
    } else {
      listItem.dataset.status = "active";
      listItem.classList.remove("completed");
      itemTitle.classList.remove("done");
    }
    totalCount();
    filterTasks(); // reapply current filters so changes reflect immediately
  });

  // reset inputs
  taskDescription.value = "";
  taskEndDate.value = "";
  selectedCategoryValue = "";
  addCategoryBtn.textContent = "Select Category";
  addCategoryBtn.dataset.value = "";

  // update counts and reapply filters so new task obeys active filters
  totalCount();
  filterTasks();
});

// ----------------------
// Delete via event delegation (works for dynamic items)
// ----------------------
taskList.addEventListener("click", (e) => {
  // delete icon clicked
  if (e.target.classList.contains("fa-trash-can")) {
    const itemToDelete = e.target.closest(".list-item");
    if (!itemToDelete) return;
    itemToDelete.remove();
    totalCount();
    filterTasks();
  }
});

// ----------------------
// Status filter (All / Active / Completed)
// ----------------------
// Make "All" active by default (if not already)
const allFilterSpan = document.getElementById("allFilter");
if (allFilterSpan && !document.querySelector(".status-filter .active")) {
  allFilterSpan.classList.add("active");
}

// clicking status spans
statusFilterSpans.forEach((span) => {
  span.addEventListener("click", () => {
    statusFilterSpans.forEach((s) => s.classList.remove("active"));
    span.classList.add("active");
    filterTasks();
  });
});

// ----------------------
// Category filter dropdown (UI)
// ----------------------
categoryFilterBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  categoryFilterContent.style.display =
    categoryFilterContent.style.display === "block" ? "none" : "block";
});

// close category-filter dropdown when clicking outside
window.addEventListener("click", (event) => {
  if (
    !categoryFilterBtn.contains(event.target) &&
    !categoryFilterContent.contains(event.target)
  ) {
    categoryFilterContent.style.display = "none";
  }
});

// clicking an item inside category filter
categoryFilterItems.forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const selected = a.dataset.value ?? "";
    // store selected filter value on button dataset
    categoryFilterBtn.dataset.value = selected;
    categoryFilterBtn.textContent =
      selected === "" ? "All Categories" : a.textContent;
    categoryFilterContent.style.display = "none";
    filterTasks();
  });
});

// ----------------------
// Unified filter function (status + category)
// ----------------------
function filterTasks() {
  const activeStatusFilter = document.querySelector(".status-filter .active");
  const statusType = activeStatusFilter
    ? activeStatusFilter.id.replace("Filter", "").toLowerCase()
    : "all";

  const categoryType = categoryFilterBtn.dataset.value ?? "";

  const tasks = document.querySelectorAll(".list-item");
  tasks.forEach((task) => {
    const taskStatus = task.dataset.status ?? "active";
    const taskCategory = task.dataset.category ?? "";

    const matchesStatus = statusType === "all" || statusType === taskStatus;
    const matchesCategory =
      categoryType === "" || categoryType === taskCategory;

    task.style.display = matchesStatus && matchesCategory ? "block" : "none";
  });
}

// ----------------------
// Counts
// ----------------------
function totalCount() {
  const tasks = document.querySelectorAll(".list-item");
  const total = tasks.length;
  const active = document.querySelectorAll(
    '.list-item[data-status="active"]'
  ).length;
  const completed = document.querySelectorAll(
    '.list-item[data-status="completed"]'
  ).length;

  // update DOM (make sure these elements exist in your HTML)
  const totalEl = document.getElementById("totalCount");
  const activeEl = document.getElementById("activeCount");
  const completedEl = document.getElementById("completedCount");

  if (totalEl) totalEl.textContent = total;
  if (activeEl) activeEl.textContent = active;
  if (completedEl) completedEl.textContent = completed;
}

// initialize counts & filters on load (if there are any pre-existing items)
document.addEventListener("DOMContentLoaded", () => {
  totalCount();
  filterTasks();
});
