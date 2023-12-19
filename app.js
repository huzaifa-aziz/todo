document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
  
    function addTask() {
      const taskText = taskInput.value.trim();
  
      if (taskText !== "") {
        const listItem = createTaskElement(taskText);
        taskList.appendChild(listItem);
        saveTasksToLocalStorage();
        taskInput.value = "";
      }
    }
  
    window.addTask = addTask;
  
    function removeTask(button) {
      const listItem = button.parentNode;
      taskList.removeChild(listItem);
      saveTasksToLocalStorage();
    }
  
    window.removeTask = removeTask;
  
    function toggleTaskStatus(span) {
      const listItem = span.parentNode;
      listItem.classList.toggle("completed");
      saveTasksToLocalStorage();
    }
  
    function editTask(span) {
      const listItem = span.parentNode;
      const currentText = span.innerText;
      const newText = prompt("Edit task:", currentText);
  
      if (newText !== null) {
        span.innerText = newText;
        saveTasksToLocalStorage();
      }
    }
  
    function createTaskElement(taskText) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <span onclick="toggleTaskStatus(this)">${taskText}</span>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="removeTask(this)">Remove</button>
      `;
      return listItem;
    }
  
    function saveTasksToLocalStorage() {
      const tasks = Array.from(taskList.children).map((task) => {
        return {
          text: task.querySelector("span").innerText,
          completed: task.classList.contains("completed"),
        };
      });
  
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function loadTasksFromLocalStorage() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
      tasks.forEach((task) => {
        const listItem = createTaskElement(task.text);
        if (task.completed) {
          listItem.classList.add("completed");
        }
        taskList.appendChild(listItem);
      });
    }
  
    loadTasksFromLocalStorage();
  });
  