// const form = document.querySelector(".js-form")
// const greeting = document.querySelector(".js-greetings")
const form = document.getElementById("form");
const greeting = document.getElementById('greetings')
const input = document.getElementById('form_input')

const USER_LS = "currentUser";
const SHOWING_CN = "showing";


function saveName(text){
    localStorage.setItem(USER_LS, text)
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN)
    form.addEventListener("submit", handleSubmit)
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
    console.log(text)
    console.log('user exist')
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName()
    }else{
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();