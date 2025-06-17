    document.addEventListener('DOMContentLoaded', loadTasks);

        function renderTask(task) {
            const taskList = document.getElementById('taskList');
            const li = document.createElement('li');
            li.dataset.id = task.id;
            if (task.completed) {
                li.classList.add('completed');
            }

            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${task.id})">
                <span class="task-text">${task.text}</span>
                <button class="delete-btn" onclick="deleteTask(${task.id})"> Xóa </button>
            `;

            taskList.appendChild(li);
            updateEmptyState();
        }

        function saveTask(task) {
            let tasks = getTasks();
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function getTasks() {
            return JSON.parse(localStorage.getItem('tasks')) || [];
        }

        function loadTasks() {
            const tasks = getTasks();
            tasks.forEach(task => renderTask(task));
        }

        function toggleTask(id) {
            let tasks = getTasks();
            tasks = tasks.map(task => {
                if (task.id === id) {
                    task.completed = !task.completed;
                }
                return task;
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            updateTaskDisplay(id);
        }

        function updateTaskDisplay(id) {
            const li = document.querySelector(`li[data-id="${id}"]`);
            const task = getTasks().find(t => t.id === id);
            if (task.completed) {
                li.classList.add('completed');
                li.querySelector('input[type="checkbox"]').checked = true;
            } else {
                li.classList.remove('completed');
                li.querySelector('input[type="checkbox"]').checked = false;
            }
        }

        function updateEmptyState() {
            const taskList = document.getElementById('taskList');
            if (taskList.children.length === 0) {
                taskList.innerHTML = '<li class="empty-state">Chưa có task nào!</li>';
            } else if (taskList.querySelector('.empty-state')) {
                taskList.querySelector('.empty-state').remove();
            }
        }

        // allow adding tasks with Enter button
        document.getElementById('taskInput').addEventListener('keypress', function(e) {

            if (e.key === 'Enter') {
            console.log("click enter");
                addTask();
            }
        });