let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filter = 'all';

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        const taskInfo = document.createElement('div');
        taskInfo.classList.add('task-info');

        const text = document.createElement('span');
        text.textContent = task.text;

        const time = document.createElement('span');
        time.classList.add('timestamp');
        time.textContent = `Added: ${task.timestamp}`;

        taskInfo.appendChild(text);
        taskInfo.appendChild(time);

        li.appendChild(taskInfo);

        li.addEventListener('click', () => toggleTask(index));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', e => {
            e.stopPropagation();
            deleteTask(index);
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    updateFilterButtons();
}

function addTask() {
    const input = document.getElementById('task-input');
    const text = input.value.trim();
    if (text === '') return;

    const newTask = {
        text: text,
        completed: false,
        timestamp: new Date().toLocaleString()
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    input.value = '';
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function setFilter(type) {
    filter = type;
    renderTasks();
}

function updateFilterButtons() {
    document.querySelectorAll('.filter-section button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(filter)) {
            btn.classList.add('active');
        }
    });
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}

// Initial render
renderTasks();
