const modal = document.getElementById("addTaskModal");

const addTaskButton = document.getElementById("addNewTask");

// Fucntions to open and close the modal
function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Function to add the task to the list
function addTask() {
  // Title input text
  const titleInputValue = document.getElementById("titleInput").value;
  const titletext = document.createTextNode(titleInputValue);

  // Summary Input text
  const summaryInputValue = document.getElementById("summaryInput").value;
  const summarytext = document.createTextNode(summaryInputValue);

  // Main li element
  const li = document.createElement("li");

  // create inner div
  const div = document.createElement("div");

  // create title span
  const titleSpan = document.createElement("span");
  titleSpan.classList.add("itemTitle");

  // create title icon
  const i = document.createElement("i");
  i.classList.add("fa-regular", "fa-trash-can");

  // Add span and icon to the div
  div.appendChild(titleSpan);
  div.appendChild(i);

  if (titleInputValue == "") {
    alert("Enter the Title of the task!");
    closeModal();
    return;
  } else {
    titleSpan.appendChild(titletext);
  }

  // create summary span
  const summarySpan = document.createElement("span");
  summarySpan.classList.add("itemSummary");

  if (summarytext === "") {
    alert("Enter the Summary of the task!");
    closeModal();
    return;
  } else {
    summarySpan.appendChild(summarytext);
  }

  // Append everything into main li
  li.appendChild(div);
  li.appendChild(summarySpan);

  // Append the li to the list
  document.querySelector("#taskList").appendChild(li);

  // close the modal on success addition of task
  closeModal();
}

// mark task as checked and remove the task from the list
let list = document.querySelector("#taskList");
list.addEventListener("click", function (event) {
  //  Ensure you clicked on <li> or something inside it
  const li = event.target.closest("li");
  if (!li) return; // Clicked outside of <li>

  // Don't toggle if clciked on the trash icon
  if (event.target.classList.contains("fa-regular", "fa-trash-can")) {
    li.remove();
    return;
  }

  // toggle checked class
  li.classList.toggle("checked");
});
