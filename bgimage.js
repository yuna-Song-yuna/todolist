const body = document.querySelector("body");


function paintImage(){
    const image = new Image();
    // image.src = `images/${imgNumber}.png`
    image.classList.add("bgImage")
    image.src="https://source.unsplash.com/user/erondu/1600x900"
    // image.width="100%"
    body.prepend(image);    //prepend: body앞에 코드 추가
}

// function genRandom(){
//     const number = Math.floor(Math.random()*5)+1;
//     return number
// }

// function init(){
//     const randomNumber = genRandom();
//     paintImage(randomNumber)
// }

//init();
paintImage();