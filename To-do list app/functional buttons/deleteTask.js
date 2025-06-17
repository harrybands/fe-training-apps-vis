        function deleteTask(id) {
            let tasks = getTasks();
            tasks = tasks.filter(task => task.id !== id);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            document.querySelector(`li[data-id="${id}"]`).remove();
            updateEmptyState();
        }
        
        function deleteAll() {
            localStorage.clear();
            let listItems = document.querySelector("ul");
            console.log("list items: ", listItems);
            listItems.innerHTML = '';
            updateEmptyState();
        }