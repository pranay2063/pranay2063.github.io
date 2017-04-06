
var canvas = document.querySelector('#myCanvas');
context = canvas.getContext('2d');

/*
context.beginPath();
context.rect(20,40,50,50);
context.fillStyle = "red";
context.fill();
//context.strokeStyle = "red";
//context.stroke();
context.closePath();

context.beginPath();
context.arc(240, 160, 20, 0, Math.PI*2, false);
context.fillStyle = "green";
context.fill();
context.closePath();
*/

var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2;
var dy = -2;
var ballRadius = 5;

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
	x += dx;
	y += dy;

	//ballRadius is included to detect collision when ball just touches the wall
	if(x < ballRadius) dx = -dx;
	if(y < ballRadius) dy = -dy;
	if(x > (canvas.width - ballRadius))	dx = -dx;
	if(y > (canvas.height - ballRadius))	dy = -dy;
}

setInterval(draw, 1);







