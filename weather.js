const weather = document.querySelector(".js-weather")

const COORDS = 'coords';
const API = "e34d71404f31bbc570753d9121676047"


function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&cnt=7&appid=${API}&units=metric`)
    .then(function(res){
        return res.json()
    }).then(function(json){
        const temperature = json.current.temp;
        const place = json.timezone;
        weather.innerText = `${temperature}°C @ ${place}`;
    })
    console.log('weather request is success')
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,       //latitude: latitude일 때 이렇게 표현 가능
        longitude
    }
    saveCoords(coordsObj)
    getWeather(latitude, longitude)
}

function handleGeoError(){
    console.log("Can't find locate")
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS)
    if(loadedCoords === null) askForCoords();
    else{
        const parsedCoords = JSON.parse(loadedCoords);
        //console.log(loadedCoords)
        //console.log(parsedCoords)
        getWeather(parsedCoords.latitude, parsedCoords.longitude)
    };
}

function init(){
    loadCoords()
}

init()