document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");

    
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));

    
    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTaskToDOM(taskText, false);
            tasks.push({ text: taskText, completed: false });
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskInput.value = ""; 
        }
    }

    function addTaskToDOM(taskText, completed) {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task");
        if (completed) {
            taskItem.classList.add("completed");
        }

        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button class="remove-btn">&times;</button>
        `;

        taskList.appendChild(taskItem);

        
        taskItem.querySelector(".remove-btn").addEventListener("click", () => {
            taskItem.classList.add("fade-out"); 
            setTimeout(() => {
                taskList.removeChild(taskItem); 
                const updatedTasks = tasks.filter(task => task.text !== taskText);
                localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            }, 500); 
        });

        
        taskItem.addEventListener("click", () => {
            taskItem.classList.toggle("completed");
            const taskIndex = tasks.findIndex(task => task.text === taskText);
            if (taskIndex > -1) {
                tasks[taskIndex].completed = !tasks[taskIndex].completed;
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }
        });
    }
});
