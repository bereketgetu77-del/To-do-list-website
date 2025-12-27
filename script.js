// Select elements
const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => addTaskToDOM(task));

// Add new task
addBtn.addEventListener('click', () => {
  const taskText = input.value.trim();
  if(taskText) {
    const task = { text: taskText, done: false };
    tasks.push(task);
    saveTasks();
    addTaskToDOM(task);
    input.value = '';
  }
});

// Add task to DOM
function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.className = 'task';
  if(task.done) li.classList.add('done');

  li.innerHTML = `
    <span>${task.text}</span>
    <div>
      <button class="done-btn">✔</button>
      <button class="delete-btn">🗑</button>
    </div>
  `;

  // Mark as done
  li.querySelector('.done-btn').addEventListener('click', () => {
    li.classList.toggle('done');
    task.done = !task.done;
    saveTasks();
  });

  // Delete task
  li.querySelector('.delete-btn').addEventListener('click', () => {
    taskList.removeChild(li);
    tasks = tasks.filter(t => t !== task);
    saveTasks();
  });

  taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
