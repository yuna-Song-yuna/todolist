const todoForm = document.querySelector(".js-todoForm"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".js-todoList"),
    todoDone = document.querySelector(".js-todoDone");

const calender = new Date();
const month = calender.getMonth()+1;
const date = calender.getDate();

let todos = []
let doneTodos = []

//local storage에는 자바스크립트의 data를 저장할 수 없음. string만 저장 가능
//local storage에 만들어 놓은 todo객체 저장하기
function saveTodo(){
    localStorage.setItem('todo', JSON.stringify(todos));
}

// TODO LIST에서 삭제 버튼 클릭했을 때 이벤트 => 해당 li html에서 삭제하고 보여주기, 삭제하고 남은 나머지만 local storage에 저장하기
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

// DONE에서 삭제 버튼 클릭했을 때
function deleteDoneTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    todoDone.removeChild(li);
    const cleanTodo = doneTodos.filter((todo)=>{
        return todo.id !== parseInt(li.id);
    })
    doneTodos = cleanTodo
    localStorage.setItem('doneTodo', JSON.stringify(doneTodos));
}

// DONE에서 실행취소 버튼 클릭했을 때
function moveToTodo(event){
    const li = event.target.parentNode;
    const moveTodo = doneTodos.filter((todo)=>{
        return todo.id == parseInt(li.id)
    })
    console.log(moveTodo[0])
    paintTodo(moveTodo[0]);
    deleteDoneTodo(event);
    saveTodo();
}

// DONE으로 해당 값 뿌려주고 localstrage('doneTodo')로 값 이동
function paintDoneTodo(todo){
    console.log('paintdonetodo', todo)
    const check = document.createElement("button")
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    check.innerText = "실행취소"
    delBtn.innerText = "❌"
    check.addEventListener("click", moveToTodo)
    delBtn.addEventListener("click", deleteDoneTodo)

    span.innerText = todo.text;
    li.appendChild(check)
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = todo.id;
    todoDone.appendChild(li);

    doneTodos.push(todo)
    localStorage.setItem('doneTodo', JSON.stringify(doneTodos))
}

// TODO LIST 에서 check버튼 클릭 이벤트 발생 시 실행: deleteTodo(), paintDoneTodo()
function doneTodo(event){
    //console.log(event.target.parentNode)
    const li = event.target.parentNode;
    const doneList = todos.filter((todo)=>{
        return todo.id == parseInt(li.id)
    })
    console.log('list:',doneList[0])

    deleteTodo(event);
    paintDoneTodo(doneList[0]);
}

//받은 값 화면에 뿌려주고 todos 배열에 추가
function paintTodo(todo){
    const check = document.createElement("button")
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    check.innerText = "✅"
    delBtn.innerText = "❌"
    check.addEventListener("click", doneTodo);
    delBtn.addEventListener("click", deleteTodo);
    span.innerText = todo.text;
    li.appendChild(check)
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = todo.id
    todoList.appendChild(li);   //todoList(ul)안에 생성한 li 집어넣기(=화면에 출력하는 마지막 단계)
    const todoObj = {
    id: todo.id,
    text: todo.text
    }
    todos.push(todoObj);

}

//submit 발생 시 paintTodo()에 인풋담아서 실행하고 saveTodo()실행
let todoMax = 0;
let doneTodoMax = 0;
if(localStorage.todo !== '[]' && localStorage.todo) todoMax = JSON.parse(localStorage.todo)[JSON.parse(localStorage.todo).length-1].id;
if(localStorage.doneTodo !== '[]' && localStorage.doneTodo) doneTodoMax = JSON.parse(localStorage.doneTodo)[JSON.parse(localStorage.doneTodo).length-1].id;

const maxId = Math.max(todoMax, doneTodoMax)
let newId = maxId+1;

function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    const todoObj = {
        id: newId,
        text: currentValue
    }
    paintTodo(todoObj)
    saveTodo();
    todoInput.value = '';
    newId += 1;
}

//local storage에 저장되어있는 객체 불러오기
function loadTodo(){
    const loadtodo = localStorage.getItem('todo');
    console.log('loadtodo:',loadtodo)

    if(loadtodo){
        const parsedTodo = JSON.parse(loadtodo);
        parsedTodo.map(todo=>paintTodo(todo))
    }

    const donetodo =localStorage.getItem('doneTodo');
    console.log('donetodo:', donetodo)
    if(donetodo){
        const parsedDoneTodo = JSON.parse(donetodo);
        parsedDoneTodo.map(todo=>paintDoneTodo(todo))
    }
}

function init(){
    loadTodo();
    todoForm.addEventListener("submit", handleSubmit)
}

init();