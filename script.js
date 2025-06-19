
function addTask() {
    const input = document.getElementById('task-input');
    const taskText = input.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    // Toggle complete on click
    li.addEventListener('click', function () {
        li.classList.toggle('completed');
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation(); // prevent toggle when deleting
        li.remove();
    });

    li.appendChild(deleteBtn);
    document.getElementById('task-list').appendChild(li);
    input.value = '';
}
