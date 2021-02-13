function Time(){
    const date = new Date();
    //onsole.log(date)
    const year = date.getFullYear();
    const month = date.getDate();
    const day = date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();


    document.getElementById('date').innerHTML = `${year} ${month} ${day}`

    document.getElementById('clock').innerHTML = `${hours<10?`0${hours}`:`${hours}`}
    :${minutes<10? `0${minutes}`:`${minutes}`}
    :${seconds<10? `0${seconds}`:`${seconds}`}`
}

Time();
setInterval(Time, 1000);
