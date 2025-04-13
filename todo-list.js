document.addEventListener('DOMContentLoaded', function(){
  const todoList = document.getElementById('todo-list');
  const addBtn = document.getElementById('add-task-btn');
  const inputBox = document.getElementById('todo-input');
  
  let tasks = JSON.parse(localStorage.getItem('tasks')) || []
  tasks.forEach((task) => {
    renderTasks(task)
  })

  addBtn.addEventListener('click', () => {
    const inputText = inputBox.value.trim();
    if (inputText === '') return;

    const newTask = {
      id: Date.now(),
      text: inputText,
      completed: false
    }
    
    inputBox.value = '';

    tasks.push(newTask);
    saveTasks();
    renderTasks(newTask);
    // console.log(tasks);
  })

  function saveTasks(){
    localStorage.setItem('tasks',JSON.stringify(tasks))
  }
  function renderTasks(task){
    const listItem = document.createElement('li');
    listItem.setAttribute('data-id', task.id);
    listItem.innerHTML = `<span>${task.text}</span>
    <button>delete</button>`;
    todoList.appendChild(listItem);
    listItem.addEventListener('click', function(e){
      if (e.target.tagName === 'BUTTON') return;
      task.completed = !task.completed;
      listItem.classList.toggle('completed');
      saveTasks();
    });
    listItem.querySelector('button').addEventListener('click', function(e){
      e.stopPropagation();
      tasks = tasks.filter(t => t.id !== task.id);
      listItem.remove();
      saveTasks();
    })
  }
})