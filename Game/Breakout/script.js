
var canvas = document.querySelector('#myCanvas');
context = canvas.getContext('2d');

var leftPressed = false;
var rightPressed = false;

document.addEventListener("keyup", keyUpHandler);
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e){
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width){
		paddleX = relativeX - paddleWidth/2;
	}
}

function keyUpHandler(event){

	if(event.keyCode == 37)
		leftPressed = false;
	else if(event.keyCode == 39)
		rightPressed = false;

}

function keyDownHandler(event){

	if(event.keyCode == 37)
		leftPressed = true;
	else if(event.keyCode == 39)
		rightPressed = true;	

}

var x = canvas.width/2;
var y = canvas.height-20;

var dx = 2;
var dy = -2;
var ballRadius = 10;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickStartTop = 35;
var brickStartLeft = 30;

var score = 0;
var lives = 2;

var bricks = [];
for(i = 0; i < brickRowCount; ++i){
	bricks[i] = [];
	for(j = 0; j < brickColumnCount; ++j)
		bricks[i][j] = {x : 0, y : 0, status : 1};
}

function collisionDetection(){
	for(i = 0; i < brickRowCount; ++i){
		for(j = 0; j < brickColumnCount; ++j){
			var b = bricks[i][j];
			if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight && b.status) {
                dy = -dy;
                b.status = 0;
                ++score;
                if(score == brickRowCount*brickColumnCount){
                	alert("YOU WON!");
                	document.location.reload();
                }    	
            }
		}
	}
}

function drawLives(){
	context.font = "12px Arial";
	context.fillStyle = "rgba(0, 0, 255, 1)";
	context.fillText("LIVES : "+lives, canvas.width-65, 20);
}

function drawScore() {
	context.font = "12px Arial";
	context.fillStyle = "rgba(0, 0, 255, 1)";
	context.fillText("SCORE : "+score, 8, 20);
}

function drawBrick(){

	var tmpX = brickStartLeft;
	var tmpY = brickStartTop;
	
	for(i = 0; i < brickRowCount; ++i){
		for(j = 0; j < brickColumnCount; ++j){
			bricks[i][j].x = tmpX;
			bricks[i][j].y = tmpY;
			if(bricks[i][j].status)
			{	
				context.beginPath();
				context.rect(tmpX, tmpY, brickWidth, brickHeight);
				context.fillStyle = "rgba(0, 0, 255, 0.5)";
				context.fill();
				context.closePath();
			}	
			tmpX += (brickWidth+brickPadding);
		}

		tmpX = brickStartLeft;
		tmpY += (brickHeight+brickPadding);
	}

}

var paddleWidth = 75;
var paddleHeight = 10;
var paddleX = (canvas.width - paddleWidth)/2;
var paddleY = (canvas.height - paddleHeight);

function drawPaddle() {
	context.beginPath();
	context.rect(paddleX, paddleY, paddleWidth, paddleWidth);
	context.fillStyle = "lightblue";
	context.fill();
	context.closePath();
}

function drawBall(){
	context.beginPath();
	context.arc(x, y, ballRadius, 0, Math.PI*2, false);
	context.fillStyle = "blue";
	context.fill();
	context.closePath();
}

function draw(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawBrick();
	drawPaddle();
	drawScore();
	drawLives();
	x += dx;
	y += dy;

	collisionDetection();

	if(x < ballRadius)	dx = -dx;
		else if(x > (canvas.width - ballRadius))	dx = -dx;

	if(y < ballRadius) dy = -dy;
		else if(y > (canvas.height - ballRadius - paddleHeight) && (x > paddleX && x < paddleX + paddleWidth))	dy = -dy;
			else if(y > (canvas.height - ballRadius)){
				
				--lives;
				if(!lives){
					alert("GAME OVER");
					document.location.reload();
				}
				else
				{

					dx = 3;
					dy = -3;
					x = canvas.width/2;
					y = canvas.height-20;
					paddleX = (canvas.width - paddleWidth)/2;
					paddleY = (canvas.height - paddleHeight);
				}	
			
			}


	if(rightPressed && paddleX < (canvas.width-paddleWidth)) paddleX += 7;
	else if(leftPressed && paddleX > 0) paddleX -= 7;
}

setInterval(draw, 10);




