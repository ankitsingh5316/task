// Simulated RESTful API
const API = {
    getTasks: () => JSON.parse(localStorage.getItem('tasks')) || [],
    saveTasks: (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks)),
  };
  
  // DOM Elements
  const views = document.querySelectorAll('.view');
  const taskList = document.getElementById('tasks');
  const searchInput = document.getElementById('search');
  const addTaskForm = document.getElementById('add-task-form');
  const detailTitle = document.getElementById('detail-title');
  const detailDescription = document.getElementById('detail-description');
  const detailDueDate = document.getElementById('detail-due-date');
  
  // Navigation
  function navigateTo(viewId) {
    views.forEach(view => view.style.display = 'none');
    document.getElementById(viewId).style.display = 'block';
  
    if (viewId === 'task-list') {
      renderTaskList();
    }
  }
  
  // Render Task List
  function renderTaskList() {
    const tasks = API.getTasks();
    taskList.innerHTML = tasks.map(task => `
      <li>
        <span onclick="showTaskDetail('${task.id}')">
          <strong>${task.title}</strong> - ${task.dueDate}
        </span>
        <span class="delete-icon" onclick="deleteTask('${task.id}')">Remove</span>
      </li>
    `).join('');
  }
  
  // Show Task Detail
  function showTaskDetail(taskId) {
    const task = API.getTasks().find(t => t.id === taskId);
    if (task) {
      detailTitle.textContent = task.title;
      detailDescription.textContent = task.description;
      detailDueDate.textContent = task.dueDate;
      navigateTo('task-detail');
    }
  }
  
  // Add Task
  addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const tasks = API.getTasks();
    const newTask = {
      id: Date.now().toString(),
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      dueDate: document.getElementById('due-date').value,
    };
    tasks.push(newTask);
    API.saveTasks(tasks);
    addTaskForm.reset();
    navigateTo('task-list');
  });
  
  // Delete Task
  function deleteTask(taskId) {
    const tasks = API.getTasks().filter(task => task.id !== taskId);
    API.saveTasks(tasks);
    renderTaskList(); 
    alert('Task deleted successfully!'); 
  }
  
  // Filter Tasks
  function filterTasks() {
    const query = searchInput.value.toLowerCase();
    const tasks = API.getTasks();
    const filteredTasks = tasks.filter(task =>
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.dueDate.includes(query)
    );
    taskList.innerHTML = filteredTasks.map(task => `
      <li>
        <span onclick="showTaskDetail('${task.id}')">
          <strong>${task.title}</strong> - ${task.dueDate}
        </span>
        <span class="delete-icon" onclick="deleteTask('${task.id}')">Remove</span>
      </li>
    `).join('');
  }
  
  // Initialize
  window.onload = () => {
    navigateTo('task-list');
  };