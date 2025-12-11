let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

showTasks();

addBtn.addEventListener("click", addTask);

function addTask() {
    let text = taskInput.value.trim();

    if (text === "") return;

    tasks.push({
        text: text,
        complete: false
    });

    taskInput.value = "";
    saveTasks();
    showTasks();
}

function showTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.className = "task";
        if (task.complete) li.classList.add("complete");

        li.innerHTML = `
            <span onclick="toggleComplete(${index})">${task.text}</span>
            <button onclick="deleteTask(${index})">X</button>
        `;

        taskList.appendChild(li);
    });
}

function toggleComplete(i) {
    tasks[i].complete = !tasks[i].complete;
    saveTasks();
    showTasks();
}

function deleteTask(i) {
    tasks.splice(i, 1);
    saveTasks();
    showTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
