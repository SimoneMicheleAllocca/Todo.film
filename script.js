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
            <span style="flex: 1; margin-right: 10px;">${taskText}</span>
            <div style="display: flex; align-items: center;">
                <button class="edit-btn" style="border: none; background: none; color: inherit; cursor: pointer; margin-right: 5px;">✎</button>
                <button class="remove-btn" style="border: none; background: none; color: inherit;">&times;</button>
            </div>
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

        taskItem.querySelector(".edit-btn").addEventListener("click", () => {
            const newTaskText = prompt("Modifica il nome del film:", taskText);
            if (newTaskText !== null && newTaskText.trim() !== "") {
                const taskIndex = tasks.findIndex(task => task.text === taskText);
                if (taskIndex > -1) {
                    tasks[taskIndex].text = newTaskText.trim();
                    localStorage.setItem("tasks", JSON.stringify(tasks));
                    taskItem.querySelector("span").innerText = newTaskText.trim();
                    taskItem.classList.remove("completed");
                }
            }
        });

        taskItem.querySelector("span").addEventListener("click", () => {
            taskItem.classList.toggle("completed");
            const taskIndex = tasks.findIndex(task => task.text === taskText);
            if (taskIndex > -1) {
                tasks[taskIndex].completed = !tasks[taskIndex].completed;
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }
        });
    }
});
