let inputDir = {x:0,y:0};
let speed = 5;
let lastPaintTime=0;
let snakeArr = [
    {x:13,y:15}
]
let score = 0 ;
food = {x:6,y:7}
//Game Function
function main(ctime){
    window.requestAnimationFrame(main)
    if((ctime - lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
 function isCollide(snake){
//If You Collide To Yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
// If You Bump In To Wall
    if(snake[0].x >= 18 || snake[0].x<=0 || snake[0].y >=18 || snake[0].y<=0){
            return true;
        }
}

 function gameEngine(){
// part 1 update snake array and food 
    if(isCollide(snakeArr)){
        inputDir = {x:0,y:0};
        alert("Game Over , enter a key to start a new game");
        snakeArr=[
            {x:13,y:15}
        ];
        score = 0;
        
    
    
    }
//if you have eatten the food increment the score and re-genarate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        score += speed;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            highscoreBox.innerHTML = "highscore: "+hiscoreval;
        }
        scoreBox.innerHTML="score: "+score;
        snakeArr.unshift({x :snakeArr[0].x + inputDir.x ,y:snakeArr[0].y + inputDir.y })
        let a=2 ;
        let b=16;

        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }
// moving the snake
    for(let i= snakeArr.length-2;i>=0;i--){
        const element = snakeArr[i];
        snakeArr[i+1]={...snakeArr[i]};

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

// part 2 display the snake and food 
    //display the snake
    board.innerHTML="";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0){
            snakeElement.classList.add("head");
        }
        else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);

        });
    //display food
        foodElement = document.createElement('div')
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);      
 }


// main logic start
let hiscore = localStorage.getItem("hiscore")
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(localStorage.getItem("hiscore"));

    highscoreBox.innerHTML = "highscore: "+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e => {
    inputDir = {x:0,y:1}//Start the game
    switch(e.key){
        case 'ArrowUp':
            console.log("arrow up");
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case 'ArrowDown':
            console.log("arrow down");
            inputDir.x= 0;
            inputDir.y= 1;
                break;
        case 'ArrowLeft':
            console.log("arrow right");
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case 'ArrowRight':
            console.log("arrow left");
            inputDir.x= 1;
            inputDir.y= 0;
            break;
    }

})