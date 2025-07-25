const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const dateInput = document.getElementById("todo-date");
const todoBody = document.getElementById("todo-body");
const deleteAllBtn = document.getElementById("delete-all");

let todos = [];
let editIndex = null;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = input.value.trim();
  const date = dateInput.value;

  if (editIndex !== null) {
    todos[editIndex] = { ...todos[editIndex], task, date };
    editIndex = null;
    alert("Data berhasil diubah!");
  } else {
    const isDuplicate = todos.some(t => t.task === task && t.date === date);
    if (isDuplicate) {
      alert("Duplikat task tidak diizinkan!");
      return;
    }

    todos.push({ task, date, done: false });
    alert("Data berhasil ditambahkan!");
  }

  renderTodos();
  form.reset();
});

function sortTodos(type) {
  switch (type) {
    case "task-asc":
      todos.sort((a, b) => a.task.localeCompare(b.task));
      break;
    case "task-desc":
      todos.sort((a, b) => b.task.localeCompare(a.task));
      break;
    case "date-asc":
      todos.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "date-desc":
      todos.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
  }
  renderTodos();
}

deleteAllBtn.addEventListener("click", () => {
  const isConfirmed = confirm("Yakin nih, mau HAPUS SEMUA???");
  if (isConfirmed) {
    todos = [];
    renderTodos();
    alert("Semua task berhasil dihapus. Jangan Menyesal ya!");
  }
});


function toggleStatus(index) {
  todos[index].done = !todos[index].done;
  renderTodos();
}

function deleteTask(index) {
  const isConfirmed = confirm("Yakin nih, mau dihapus?");
  if (isConfirmed) {
    todos.splice(index, 1);
    renderTodos();
    alert("Ok Bos, sudah dihapus!");
  }
}

function editTask(index) {
  const todo = todos[index];
  input.value = todo.task;
  dateInput.value = todo.date;
  editIndex = index;
}

function renderTodos() {
  todoBody.innerHTML = "";

  if (todos.length === 0) {
    todoBody.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
    return;
  }

  todos.forEach((todo, index) => {
    const row = document.createElement("tr");

    const statusText = todo.done ? "Completed" : "Pending";
    const statusColor = todo.done ? "green" : "orange";
    const toggleClass = todo.done ? "toggle-btn completed" : "toggle-btn pending";

    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td style="color: ${statusColor}; font-weight: bold;">${statusText}</td>
      <td>
        <button onclick="editTask(${index})" title="Edit">✏️</button>
        <button class="${toggleClass}" onclick="toggleStatus(${index})" title="Toggle Status">✔️</button>
        <button onclick="deleteTask(${index})" title="Delete">🗑️</button>
      </td>
    `;

    todoBody.appendChild(row);
  });
}