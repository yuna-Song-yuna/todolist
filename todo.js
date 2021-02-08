const todoForm = document.querySelector(".js-todoForm"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".js-todoList");

const TODO_LS = "todo"
let todos = []


// 삭제 버튼 클릭했을 때 이벤트 => 해당 li html에서 삭제하고 보여주기, 삭제하고 남은 나머지만 local storage에 저장하기
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
//local storage에 만들어 놓은 todo객체 저장하기
function saveTodo(){
    localStorage.setItem(TODO_LS, JSON.stringify(todos));
}


//화면에 element만들어 보여주기, todo객체 만들기=>saveTodo함수 실행
let newId = 0;
function paintTodo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    newId = newId + 1;
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

//local storage에 저장되어있는 객체 불러오기=>paintTodo함수 실행
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