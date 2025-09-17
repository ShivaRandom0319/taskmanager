// -------------------------
// DAILY TASKS
// -------------------------

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let today = new Date().toDateString();
let lastSavedDate = localStorage.getItem("lastSavedDate");

if (lastSavedDate !== today) {
  tasks = tasks.map(t => ({ ...t, done: false }));
  localStorage.setItem("lastSavedDate", today);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("lastSavedDate", today);
}

function addTask() {
  const title = document.getElementById("task").value.trim();
  const desc = document.getElementById("desc").value.trim();
  if (!title) return;
  tasks.push({ title, desc, done: false });
  saveTasks();
  renderTasks();
  document.getElementById("task").value = "";
  document.getElementById("desc").value = "";
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.done ? "done" : "";
    li.innerHTML = `
      <span>
        <strong>${task.title}</strong><br/>
        <small>${task.desc}</small>
      </span>
      <button class="done-btn" onclick="toggleDone(${index})">${task.done ? "Undo" : "Done"}</button>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

renderTasks();

// -------------------------
// MOTIVATION SECTION
// -------------------------

let motivations = JSON.parse(localStorage.getItem("motivations")) || [];

function saveMotivations() {
  localStorage.setItem("motivations", JSON.stringify(motivations));
}

function addMotivation() {
  const input = document.getElementById("motivationInput");
  const text = input.value.trim();
  if (!text) return;
  motivations.push(text);
  saveMotivations();
  renderMotivations();
  input.value = "";
}

function deleteMotivation(index) {
  motivations.splice(index, 1);
  saveMotivations();
  renderMotivations();
}

function renderMotivations() {
  const list = document.getElementById("motivationList");
  list.innerHTML = "";
  motivations.forEach((text, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${text}</span>
      <button onclick="deleteMotivation(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

renderMotivations();
