function Time(){
    const calender = new Date();

    const hours = calender.getHours();
    const minutes = calender.getMinutes();
    const seconds = calender.getSeconds();


    document.getElementById('clock').innerHTML = `${hours<10?`0${hours}`:`${hours}`}
    :${minutes<10? `0${minutes}`:`${minutes}`}
    :${seconds<10? `0${seconds}`:`${seconds}`}`
}


function day(){
    const calender = new Date();

    const year = calender.getFullYear();
    const month = calender.getMonth();
    const date = calender.getDate();
    const day = calender.getDay();

    document.getElementById('date').innerHTML = `${year} ${month} ${date} ${day}`
}



function init(){
    day();
    Time();
    setInterval(Time, 1000);
}

init();
