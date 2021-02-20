const body = document.querySelector("body");
let body_height = document.body.scrollHeight
let image_height = body_height*1.05;
let browser_height = window.outerHeight     //현재 내 창 크기

function removeScroll(){
    body.classList.remove("body_scroll")
}

function addScroll(){
    body.classList.add("body_scroll")

}

function checkWindowSize(){
    browser_height = window.outerHeight

    if(screen.availHeight == browser_height){
        removeScroll();
    }else{
        addScroll();
    }
}

function paintImage(){
    const image = new Image();
    // image.src = `images/${imgNumber}.png`
    image.classList.add("bgImage")
    // image.src="https://source.unsplash.com/user/erondu/1600x900";
    image.src="https://source.unsplash.com/user/erondu";
    image.style=`height: ${image_height}px`

    body.prepend(image);    //prepend: body앞에 코드 추가
}

// function genRandom(){
//     const number = Math.floor(Math.random()*5)+1;
//     return number
// }

function init(){
    paintImage();
    checkWindowSize();      //창모드인 상태로 페이지 업로드 했을 때 스크롤 추가하기 위함
    window.addEventListener('resize', checkWindowSize);
}

init();