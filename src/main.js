const canv = document.querySelector("canvas");
const ctx = canv.getContext('2d');
const score_output = document.getElementById("score_out");
const balls = ["img/green_ball.png", "img/green_ball.png", "img/red_ball.png", "img/yellow_ball.png"];
const basketPath = "img/kosz.png";

let basket_x = canv.width / 2 - 50;
let basket_y = canv.height - 90;


const basket_w = 100;
const basket_h = 90;

let isRightPressed = false;
let isLeftPressed = false;

const speed = 5;

let score = 0;

let basket = new Image();
basket.src = basketPath;

let ball = new Image();

let ball_x = 0;
let ball_y = 0;    

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        isRightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        isLeftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        isRightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        isLeftPressed = false;
    }
}

function drawBall(_ballStatus) {
    if (_ballStatus == "CATCHED") {
        ball_x = Number(Math.random() * (canv.width - 70) + 70);
        ball.src = balls[Math.floor(Math.random() * balls.length)];
           
        ctx.drawImage(ball, ball_x, ball_y, 70, 100);
    } else if (_ballStatus == "SPAWN_NEW") {
        ball_y = 0;
        ball_x = Number(Math.random() * (canv.width - 70) + 70);
        ball.src = balls[Math.floor(Math.random() * balls.length)];
    
        
        ctx.drawImage(ball, ball_x, ball_y, 70, 100);
    
    } else if (_ballStatus == "FALLING") {
        ctx.drawImage(ball, ball_x, ball_y, 70, 100);
    }
}

function isOnEdge() {
    if (basket_x == 0) {
        return "left";
    } else if (basket_x == canv.width - basket_w) {
        return "right";
    }
}

function drawBasket() {
    ctx.beginPath();
    ctx.drawImage(basket, basket_x, basket_y, basket_w, basket_h);
    ctx.fill();
    ctx.closePath();
}

function basketMovement() {
    if (isRightPressed && isOnEdge() != "right") {
        basket_x += speed;
    } else if (isLeftPressed && isOnEdge() != "left") {
        basket_x -= speed;
    }
}

function manageBall() {
    if (ball_y == canv.height && ball_x == basket_x) {
        score++;
        console.log("CATCHED");
        return "CATCHED";
    } else if (ball_y == canv.height) {
        console.log("SPAWN_NEW");
        return "SPAWN_NEW";
    } else {
        ball_y += speed;
        console.log("FALLING");
        return "FALLING";
    }
}

function update() {
    basketMovement();
}

function draw() {
    ctx.clearRect(0, 0, canv.width, canv.height);
    drawBasket();
    drawBall(manageBall());
    score_output.innerHTML = score.toString();
}

function loop() {
    update();
    draw();
    drawBall(213769); // Ale easter egg wtf
    requestAnimationFrame(loop);
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

loop();