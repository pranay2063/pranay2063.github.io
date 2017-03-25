

var button = document.querySelector('#button');
var number = document.querySelector('#number');
var remain = document.querySelector('#remain');
var bot = document.querySelector('#bot');
var player = document.querySelector('#player');
var verdict = document.querySelector('#verdict');

var name;

var sum = 25;
var flagBot = false;
var flagPlayer = false;
var flagGameOver = false;
var resetButton;

askName();
number.focus();
button.onclick = turn;

function askName(){

	name = prompt("Enter your first name : ");

	if(!name)
		name = "Player";

	var tmp = name[0];
	tmp = tmp.toUpperCase();
	name = name.toLowerCase();
	name = tmp + name.slice(1);
	if(name.indexOf("Sonveer") != -1)
		name = "Sonakshi";

}

function turn(){

	var num = number.value;

	if(!num || num > 3 || num < 1 || !Number(num) || (sum - num) < 0 || !isNumber(num))
		num = 1;

	player.style.color = "white";
	player.style.backgroundColor = "orange";
	if(!flagPlayer)
	{

		player.textContent = name + " : " + num + " ";
		flagPlayer = true;

	}	
	else player.textContent += num + " ";

	sum -= num;
	remain.textContent = "Remaining number : "+sum;
	if(sum == 0) 
	{

		verdict.style.color = "white";
		verdict.style.backgroundColor = "red";
		bot.textContent = "";
		player.textContent = "";
		verdict.textContent = "You Lose!";
		gameOver();

	}	

	if(!flagGameOver){

		bot.style.color = "white";
		bot.style.backgroundColor = "green";
		if(!flagBot)
		{

			bot.textContent = "Bot : " + (4-num) + " ";  
			flagBot = true;

		}	
		else bot.textContent += (4-num) + " ";

		sum -= (4-num);
		remain.textContent = "Remaining number : "+sum;

		number.value = "";
		number.focus();

	}

}

function gameOver() {
	
	flagGameOver = true;
	number.disabled = true;
	button.disabled = true;

	resetButton = document.createElement('button');
	resetButton.textContent = "Start new game";
	document.body.appendChild(resetButton);
	resetButton.onclick = resetGame;

}

function resetGame(){

	number.disabled = false;
	button.disabled = false;

	bot.textContent = "";
	player.textContent = "";
	verdict.textContent = "";
	number.value = ""; 

	resetButton.parentNode.removeChild(resetButton);
	number.focus();
	remain.textContent = "Remaining number : 25";

	sum = 25;
	flagBot = false;
	flagPlayer = false;
	flagGameOver = false;

}



