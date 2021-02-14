function Time(){
    const calender = new Date();

    const year = calender.getFullYear();
    const month = calender.getMonth();
    const date = calender.getDate();
    const day = calender.getDay();
    const hours = calender.getHours();
    const minutes = calender.getMinutes();
    const seconds = calender.getSeconds();

    // document.getElementById('date').innerHTML = `${year} ${month} ${date} ${day}`
    // document.getElementById('clock').innerHTML = `${hours<10?`0${hours}`:`${hours}`}
    // :${minutes<10? `0${minutes}`:`${minutes}`}
    // :${seconds<10? `0${seconds}`:`${seconds}`}`

    document.getElementById('date').innerHTML = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium'}).format(calender)
    document.getElementById('clock').innerHTML = new Intl.DateTimeFormat('en-GB', {timeStyle: 'short' }).format(calender)
    document.getElementById('second').innerHTML = `${seconds<10?`0${seconds}`:`${seconds}`}`

}


function init(){
    Time();
    setInterval(Time, 1000);
}

init();
