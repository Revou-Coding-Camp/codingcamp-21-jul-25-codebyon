const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const dateInput = document.getElementById("todo-date");
const todoBody = document.getElementById("todo-body");
const deleteAllBtn = document.getElementById("delete-all");

let todos = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = input.value.trim();
  const date = dateInput.value;

  if (task && date) {
    todos.push({ task, date, done: false });
    renderTodos();
    form.reset();
  }
});

deleteAllBtn.addEventListener("click", () => {
  todos = [];
  renderTodos();
});

function toggleStatus(index) {
  todos[index].done = !todos[index].done;
  renderTodos();
}

function deleteTask(index) {
  todos.splice(index, 1);
  renderTodos();
}

function renderTodos() {
  todoBody.innerHTML = "";

  if (todos.length === 0) {
    todoBody.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
    return;
  }

  todos.forEach((todo, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>${todo.done ? "Completed" : "Pending"}</td>
      <td>
        <button onclick="toggleStatus(${index})" style="margin-right: 5px;">✔</button>
        <button onclick="deleteTask(${index})">✖</button>
      </td>
    `;

    todoBody.appendChild(row);
  });
}