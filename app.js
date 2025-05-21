let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taksNameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const deadlineInput = document.getElementById("deadline");
const addTaskBtn = document.getElementById("add-task");

const taskList = document.getElementById("task-items");
const filterSelect = document.getElementById("filter");

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

function updateTaskStatus(index, newStatus) {
  tasks[index].taskStatus = newStatus;

  saveTask();

  displayTaskList();
}

function checkOverdueTask() {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  tasks = tasks.map((task) => {
    if (task.deadline < todayString && task.taskStatus !== "completed") {
      return { ...task, taskStatus: "overdue" };
    }

    return task;
  });

  saveTask();
}

function filterTask(taskArray) {
  const filterValue = filterSelect.value;

  if (!filterValue) {
    return taskArray;
  }
console.log(filterValue);
  if (
    filterValue === "in_progress" ||
    filterValue === "overdue" ||
    filterValue === "completed"
  ) {
    

    return taskArray.filter((task) => task.taskStatus === filterValue);
  }

  return taskArray;
}

function displayTaskList() {
  console.log(tasks);

  checkOverdueTask();

  const filteredTasks = filterTask(tasks);

  let taskListItems = "";
  filteredTasks.map((task, index) => {
    taskListItems += `
       <li class="list-group-item text-justify d-flex justify-content-between align-items-center">
         <div>
           ${task.deadline} | ${task.taksName} | #${task.category} | ${
      task.taskStatus
    }
         </div>
         <div>
           <select class="form-select status-select" data-index="${index}">
             <option value="in_progress" ${
               task.taskStatus === "in_progress" ? "selected" : ""
             }>In Progress</option>
             <option value="completed" ${
               task.taskStatus === "completed" ? "selected" : ""
             }>Completed</option>
             <option value="overdue" ${
               task.taskStatus === "overdue" ? "selected" : ""
             } disabled>Overdue</option>
           </select>
         </div>
       </li>
     `;
  });

  taskList.innerHTML = taskListItems;

  document.querySelectorAll(".status-select").forEach((select) => {
    select.addEventListener("change", function () {
      const taskIndex = this.getAttribute("data-index");
      const newStatus = this.value;
      updateTaskStatus(taskIndex, newStatus);
    });
  });
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

filterSelect.addEventListener("change", displayTaskList);
