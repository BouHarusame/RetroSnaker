/**
 * Created by 12448 on 2018/5/13.
 */
/*
*  思路：用一个初始化 整理游戏开始状态，
*  创建食物
*  创建蛇
*  给蛇加运动
*  判断吃到食物
*  判断边界和游戏结束条件
*  出现弹出
*  重新开始、暂停功能
* */

var map = document.getElementById('main'),
 startGame = document.getElementById('startGame'),
 score = document.getElementById('score'),
 scoreAll = document.getElementById('scoreAll'),
 lose = document.getElementById('lose'),
 close = document.getElementById('close'),
 startPause = document.getElementById('startPause'),
 speed = 200,
 snakeTimer,
 sc = 0,
 startGameBool = true,
 startPauseBool = true;

init();
function init(){
    //地图初始化
    this.mapW = map.offsetWidth;
    this.mapH = map.offsetHeight;
    // 食物初始化状态
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;

    // 蛇初始化
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [[3,1,'head'],[2,1,'body'],[1,1,'body']];
    //游戏属性
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    bindEvent();

}
function playGame(){
    snake();
    food();
    startGame.style.display = 'none';
    startPause.style.display = 'block';
}
function food(){//创建食物
    var food = document.createElement('div');
    food.style.position = 'absolute';
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    this.foodX = parseInt(Math.random()*Math.floor(this.mapW/this.foodW));
    this.foodY = parseInt(Math.random()*Math.floor(this.mapH/this.foodH));
    food.style.left = this.foodX * this.foodW + 'px';
    food.style.top = this.foodY * this.foodH + 'px';
    food.classList.add('food');
    map.appendChild(food);
}

function snake(){//创建蛇
    for(var i = 0; i < this.snakeBody.length; i++){
        var snake = document.createElement('div');
        snake.style.position = 'absolute';
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.top = this.snakeBody[i][1] * this.snakeW +'px';
        snake.style.left = this.snakeBody[i][0] * this.snakeH + 'px';
        snake.classList.add(this.snakeBody[i][2]);
        map.appendChild(snake).classList.add('snake');
        switch(this.direct){
            case 'left':
                snake.style.transform = 'rotate(180deg)';
                break;
            case 'right':
                snake.style.transform = 'rotate(0deg)';
                break;
            case 'up':
                snake.style.transform = 'rotate(270deg)';
                break;
            case 'down':
                snake.style.transform = 'rotate(90deg)';
                break;
            default:
                break;
        }

    }
}

function move(){//设置蛇移动
    for(var i = this.snakeBody.length - 1; i>0; i--){
        this.snakeBody[i][0] = this.snakeBody[i-1][0];
        this.snakeBody[i][1] = this.snakeBody[i-1][1];
    }
    //蛇头位置
    switch(this.direct){
        case 'right':
            this.snakeBody[0][0] += 1;
            break;
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        case  'up':
            this.snakeBody[0][1] -= 1;
            break;
        case 'down':
            this.snakeBody[0][1] += 1;
            break;
        default :
            break;
    }
    //删除之前的snake
    removeClass('snake');
    snake();
    //吃到食物条件判断
    if(this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY ){
        var snakeBodyX = this.snakeBody[this.snakeBody.length-1][0];
        var snakeBodyY = this.snakeBody[this.snakeBody.length-1][1];
        switch (this.direct){
            case 'right':
                this.snakeBody.push([snakeBodyX + 1,snakeBodyY,'body']);
                break;
            case 'left':
                this.snakeBody.push([snakeBodyX - 1, snakeBodyY, 'body']);
                break;
            case 'up':
                this.snakeBody.push([snakeBodyX, snakeBodyY - 1, 'body']);
                break;
            case 'down':
                this.snakeBody.push([snakeBodyX, snakeBodyY + 1, 'body']);
                break;
            default :
                break;
        }
        removeClass('food');
        food();
        sc++;
        score.innerText = sc;
        scoreAll.innerText =sc;
    }

    //边界检测
    if(this.snakeBody[0][0] < 0 || this.snakeBody[0][0] > this.mapW/this.snakeW ){
        this.reloadGame();
    }
    if(this.snakeBody[0][1] < 0 || this.snakeBody[0][1] > this.mapH/this.snakeH ){
        this.reloadGame();
    }
    var snakeHeaderX = this.snakeBody[0][0];

    var snakeHeaderY = this.snakeBody[0][1];
    for(var i = 1; i < this.snakeBody.length; i ++){
        var BodyX = this.snakeBody[i][0];
        var BodyY = this.snakeBody[i][1];
        if( snakeHeaderX == BodyX && snakeHeaderY == BodyY){
            this.reloadGame();
        }
    }
}
function removeClass(classname){
    var ele = document.getElementsByClassName(classname);
    while(ele.length >0){
        ele[0].parentNode.removeChild(ele[0]);
    }
}
function setDerict(code){
     switch(code){
         case 37 :
             if(this.left){
                 this.direct = 'left';
                 this.left = false;
                 this.right = false;
                 this.up = true;
                 this.down = true;
             }
             break;
         case 38 :
             if(this.up){
                 this.direct = 'up';
                 this.left = true;
                 this.right = true;
                 this.up = false;
                 this.down = false;
             }
             break;
         case 39 :
             if(this.right){
                 this.direct = 'right';
                 this.left = false;
                 this.right = false;
                 this.up = true;
                 this.down = true;
             }
             break;
         case 40:
             if(this.down){
                 this.direct = 'down';
                 this.left = true;
                 this.right = true;
                 this.up = false;
                 this.down = false;
             }
             break;
         default :
             break;
     }
}
function reloadGame(){
    removeClass('snake');
    removeClass('food');
    clearInterval(snakeTimer);
    lose.style.display = 'block';
    this.snakeBody = [[3,1,'head'],[2,1,'body'],[1,1,'body']];
    //游戏属性
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    startPauseBool = true;
    startGameBool = true;
    lose.style.display = 'block';
    scoreAll.innerHTML = sc;
    sc = 0;
    score.innerHTML = 0;
}
function bindEvent(){
    close.addEventListener('click',function(){
        lose.style.display = 'none';
    },false);
    startGame.addEventListener('click',startAndPauseGame,false);
    startPause.addEventListener('click',startAndPauseGame,false);
}
function startAndPauseGame(){
    if(startPauseBool){
        if(startGameBool){
            console.log(1);
            playGame();
            startGameBool = false;
        }
        snakeTimer = setInterval(function(){
            move();
        },speed);
        document.onkeydown = function(e){
            var code = e.keyCode;
            setDerict(code);
        };
        startPause.setAttribute('src','img/pause.png');
        startPauseBool = false;

    }else{
        //暂停
        clearInterval(snakeTimer);
        startPause.setAttribute('src','img/start.png');
        startPauseBool = true;
        document.onkeydown = function (e) {
            e.returnValue = false;
            return false;
        };
    }
}