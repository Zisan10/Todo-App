console.clear();
("use strict");
//start find element
const container = document.querySelector(".container");
const form = container.querySelector(".form");
const inputText = form.querySelector("#addTodo");
const addButton = form.querySelector("#addButton");
const deleteButton = document.querySelector(".addButton");
const seeAddtodo = container.querySelector(".see-addTodo");
const todoLists = container.querySelector("#lists");
const showMessage = container.querySelector("#showMessage");
// end find element

// todos store
const todosStore = () => {
  return localStorage.getItem("myTodo")
    ? JSON.parse(localStorage.getItem("myTodo"))
    : [];
};

// show message
const showMess = (text, status) => {
  showMessage.innerHTML = text;
  showMessage.classList.add(`m-${status}`);
  setInterval(() => {
    showMessage.classList.remove(`m-${status}`);
    showMessage.innerHTML = "";
  }, 1000);
};
// create todo
const createTodo = (todoValue, todoId) => {
  const todoElementlist = document.createElement("li");
  todoElementlist.id = todoId;
  todoElementlist.classList.add("list");
  todoElementlist.innerHTML = `<span>${todoValue}</span>
                <span><button class="deleteButton" id="addButton">
                <i class="fa-solid fa-trash"></i></button></span>`;
  todoLists.appendChild(todoElementlist);
  // delete todo listener
  const deleteButton = todoElementlist.querySelector(".deleteButton");
  deleteButton.addEventListener("click", deleteTodo);
};
// delete todo function
const deleteTodo = (event) => {
  const selectTodo = event.target.closest(".list");
  if (selectTodo) {
    todoLists.removeChild(selectTodo);
  }
  showMess("Deleted Successfully✔", "denger");
  // delete todo local storage
  let todoid = selectTodo.id;
  let getTodo = todosStore();
  getTodo = getTodo.filter((todo) => todo.todoId != todoid);
  localStorage.setItem("myTodo", JSON.stringify(getTodo));
};
// add Todo
const addtodo = (e) => {
  e.preventDefault();
  const todoValue = inputText.value;
  // toDo id creat
  const todoId = Date.now().toString();
  createTodo(todoValue, todoId);
  showMess("Added Successfully✔", "success");

  // todo store in local storage
  const storeTodo = todosStore();
  storeTodo.push({ todoId, todoValue });
  localStorage.setItem("myTodo", JSON.stringify(storeTodo));
  inputText.value = "";
};

// get value in list from storage
const setValuelist = () => {
  const todos = todosStore();
  todos.map((todo) => {
    createTodo(todo.todoValue, todo.todoId);
  });
};

// add event listener
form.addEventListener("submit", addtodo);
window.addEventListener("DOMContentLoaded", setValuelist);
