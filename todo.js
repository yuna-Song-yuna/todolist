const todoForm = document.querySelector(".js-todoForm"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".js-todoList");

const TODO_LS = "todo"
let todos = []


function filterFn(){

}

function deleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanTodo = todos.filter((todo)=>{
        return todo.id !== parseInt(li.id);
    })
    todos = cleanTodo
    saveTodo();
}

//local storage에는 자바스크립트의 data를 저장할 수 없음. string만 저장 가능
function saveTodo(){
    localStorage.setItem(TODO_LS, JSON.stringify(todos));
}

function paintTodo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNumber+1;
    delBtn.innerText = "❌"
    delBtn.addEventListener("click", deleteTodo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    todoList.appendChild(li);
    const todoObj = {
        text: text,
        id: newId
    }
    todos.push(todoObj);
    saveTodo()
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value = '';
    
}

function loadTodo(){
    const loadtodo = localStorage.getItem(TODO_LS);
    if(loadtodo){
        const parsedTodo = JSON.parse(loadtodo);
        parsedTodo.map(todo=>paintTodo(todo.text))
    }
}

function init(){
    loadTodo();
    todoForm.addEventListener("submit", handleSubmit)
}

init();