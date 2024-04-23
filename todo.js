document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('add');
    const taskList = document.getElementById('taskList');
    const countSpan = document.querySelector('.count');
    const errorText = document.getElementById('error');

    let tasks = [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const li = document.createElement('li');

            // Task name display
            const taskNameDisplay = document.createElement('span');
            taskNameDisplay.textContent = task.name;
            taskNameDisplay.style.marginRight = '10px';
            taskNameDisplay.style.textDecoration = task.done ? 'line-through' : 'none';
            li.appendChild(taskNameDisplay);

            // Add edit button
            const editButton = createButton('fa fa-pencil', () => {
                enableInlineEdit(taskNameDisplay, index);
            });
            li.appendChild(editButton);

            // Add delete button
            const deleteButton = createButton('fa fa-trash', () => {
                deleteTask(index);
            });
            li.appendChild(deleteButton);

            // Add done checkbox
            const doneCheckbox = document.createElement('input');
            doneCheckbox.type = 'checkbox';
            doneCheckbox.checked = task.done;
            doneCheckbox.addEventListener('change', (event) => markTaskDone(index, event.target.checked));
            li.appendChild(doneCheckbox);

            taskList.appendChild(li);
        });

        updateTaskCount(); // Update task count display
    }

    // Function to create a button with a specified icon and click handler
    function createButton(iconClass, clickHandler) {
        const button = document.createElement('button');
        button.innerHTML = `<i class="${iconClass}"></i>`;
        button.addEventListener('click', clickHandler);
        return button;
    }

    // Function to update the task count display
    function updateTaskCount() {
        const incompleteTasks = tasks.filter(task => !task.done).length;
        countSpan.textContent = incompleteTasks;
    }

    // Function to add a task
    function addTask() {
        const taskName = taskInput.value.trim();
        if (taskName !== '') {
            tasks.push({ name: taskName, done: false });
            taskInput.value = '';
            renderTasks();
            errorText.style.display = 'none';
        } else {
            errorText.style.display = 'block';
        }
    }

    // Function to delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    // Function to enable inline editing
    function enableInlineEdit(taskNameDisplay, index) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = taskNameDisplay.textContent;
        input.style.marginRight = '10px';
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                tasks[index].name = input.value.trim();
                renderTasks();
            }
        });
        taskNameDisplay.replaceWith(input);
        input.focus();
    }

    // Function to mark a task as done
    function markTaskDone(index, isDone) {
        tasks[index].done = isDone;
        renderTasks();
    }

    // Add task on button click
    addButton.addEventListener('click', addTask);

    // Render initial tasks
    renderTasks();
});
