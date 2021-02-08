function Time(){
    const date = new Date();
    //onsole.log(date)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    document.getElementById('clock').innerHTML = `${hours<10?`0${hours}`:`${hours}`}
    :${minutes<10? `0${minutes}`:`${minutes}`}
    :${seconds<10? `0${seconds}`:`${seconds}`}`
}

Time();
setInterval(Time, 1000);
