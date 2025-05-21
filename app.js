let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taksNameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const deadlineInput = document.getElementById("deadline");
const addTaskBtn = document.getElementById("add-task");

const taskList = document.getElementById("task-items");

function saveTask() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(taksName, category, deadline) {
  const taskStatus = "in_progress";

  // required fields
  if (!taksName || !category || !deadline) {
    alert("Please fill in all fields");
    return;
  }

  // add task
  tasks.push({ taksName, category, deadline, taskStatus });

  saveTask();

  displayTaskList();
}

function updateTaskStatus() {}

function checkOverdueTask() {}

function filterTask() {}

function displayTaskList() {
  console.log(tasks);

  let taskListItems = "";
  tasks.map((task) => {
    taskListItems += `<li class="list-group-item">${task.taksName} - (${task.category}) - ${task.deadline} - ${task.taskStatus}</li>`;
  });

  taskList.innerHTML = taskListItems;
}

window.addEventListener("load", () => {
  displayTaskList();
});

addTaskBtn.addEventListener("click", function () {
  const taksName = taksNameInput.value;
  const category = categoryInput.value;
  const deadline = deadlineInput.value;

  addTask(taksName, category, deadline);

  taksNameInput.value = "";
  categoryInput.value = "";
  deadlineInput.value = "";
});
