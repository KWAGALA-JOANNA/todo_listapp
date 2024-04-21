document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todoForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('edit')) {
            enableEditMode(target.closest('li'));
        } else if (target.classList.contains('save')) {
            saveTaskEdit(target.closest('li'));
        } else if (target.classList.contains('cancel')) {
            cancelTaskEdit(target.closest('li'));
        }
    });

    function addTask(taskText) {
        const li = createTaskElement(taskText);
        taskList.appendChild(li);
    }

    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        

        const deleteButton = createButton('Delete', 'delete', () => {
            li.remove();
        });

        const editButton = createButton('Edit', 'edit', () => {
            enableEditMode(li);
        });

        li.appendChild(deleteButton);
        li.appendChild(editButton);

        return li;
    }

    function createButton(text, className, clickHandler) {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = className;
        button.addEventListener('click', clickHandler);
        return button;
    }

    function enableEditMode(li) {
        const taskText = li.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = taskText;
        input.className = 'edit-input';
        

        const saveButton = createButton('Save', 'save', () => {
            saveTaskEdit(li);
        });

        const cancelButton = createButton('Cancel', 'cancel', () => {
            cancelTaskEdit(li);
        });

        li.textContent = '';
        li.appendChild(input);
        li.appendChild(saveButton);
        li.appendChild(cancelButton);

        input.focus(); // Focus on the input field for editing
    }

    function saveTaskEdit(li) {
        const input = li.querySelector('.edit-input');
        const newText = input.value.trim();
        if (newText !== '') {
            li.textContent = newText;

            const deleteButton = createButton('Delete', 'delete', () => {
                li.remove();
            });

            const editButton = createButton('Edit', 'edit', () => {
                enableEditMode(li);
            });

            li.appendChild(deleteButton);
            li.appendChild(editButton);
        } else {
            alert('Task cannot be empty!');
            enableEditMode(li); // Re-enable edit mode if task is empty
        }
    }

    function cancelTaskEdit(li) {
        const taskText = li.textContent;
        li.textContent = '';

        const editButton = createButton('Edit', 'edit', () => {
            enableEditMode(li);
        });

        li.textContent = taskText;
        li.appendChild(editButton);
    }
});
