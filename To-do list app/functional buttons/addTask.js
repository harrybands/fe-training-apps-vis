        function addTask() {
            const taskInput = document.getElementById('taskInput');
            const taskText = taskInput.value.trim();
            const errorMsg = document.getElementById('taskError');

            if (!taskText) {
                if (errorMsg) {
                    errorMsg.textContent = 'Vui lòng nhập task bạn định làm';
                    errorMsg.style.display = 'block';
                }
                return;             
            }
            if (errorMsg) {
                errorMsg.style.display = 'none';        
            }
            const task = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            saveTask(task);

            // Render the task
            renderTask(task);

            // Clear input
            taskInput.value = '';
        }