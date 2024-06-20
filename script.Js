document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const taskInput = document.getElementById('task-input');
    const dueDate = document.getElementById('due-date').value;
    const category = document.getElementById('category').value;

    if (taskInput.value.trim()) {
        addTask(taskInput.value, dueDate, category);
        taskInput.value = '';
    }
});

function addTask(description, dueDate, category) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    
    li.innerHTML = `
        <span>${description} - ${category} - ${dueDate}</span>
        <div>
            <button onclick="markCompleted(this)">✔️</button>
            <button onclick="deleteTask(this)">❌</button>
        </div>
    `;
    
    taskList.appendChild(li);
    saveTasks();
}

function markCompleted(button) {
    const li = button.parentElement.parentElement;
    li.classList.toggle('completed');
    saveTasks();
}

function deleteTask(button) {
    const li = button.parentElement.parentElement;
    li.remove();
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(function(li) {
        const description = li.children[0].innerText.split(' - ')[0];
        const category = li.children[0].innerText.split(' - ')[1];
        const dueDate = li.children[0].innerText.split(' - ')[2];
        const completed = li.classList.contains('completed');
        tasks.push({ description, dueDate, category, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        addTask(task.description, task.dueDate, task.category);
        if (task.completed) {
            document.querySelectorAll('#task-list li')[document.querySelectorAll('#task-list li').length - 1].classList.add('completed');
        }
    });
}

document.addEventListener('DOMContentLoaded', loadTasks);