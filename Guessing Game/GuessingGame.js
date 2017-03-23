

var randomNumber = Math.floor(Math.random()*100) + 1;
var guessField = document.querySelector('#number');
var button = document.querySelector('#button');
var prev = document.querySelector('#prev');
var check = document.querySelector('#check');
var compare = document.querySelector('#compare');

var cnt = 1;

guessField.focus();

function turn() {

	num = guessField.value;

	if(!num || num < 1 || num > 100)
	{

		num = 0;
		//alert("Input does not match specifications"); 
		//return ;

	}
	
	if(cnt === 1)
		prev.textContent = "Previous Guesses : " + num + " ";

	else prev.textContent += num + " ";

	if(num != randomNumber)
	{
		
		check.style.backgroundColor = "red";
		check.textContent = "Wrong!";
		check.style.color = "white";

		if(num > randomNumber)
			compare.textContent = "Last guess was too high!";
		else compare.textContent = "Last guess was too low!";

	}
	else if(num == randomNumber)
	{ 
		
		check.style.backgroundColor = "green";
		check.textContent = "Congratulations! You got it right!";
		check.style.color = "white";
		compare.textContent = "";
		gameOver();

	}

	++cnt;
	if(cnt > 7)
	{

		check.textContent = "GAME OVER!";
		compare.textContent = "";
		gameOver();

	}	

	guessField.focus();
	guessField.value = "";

}

button.onclick = turn;
var resetButton;

function gameOver(){

	guessField.disabled = true;
	button.disabled = true;
	resetButton = document.createElement('button');
	resetButton.textContent = "Start new game";
	document.body.appendChild(resetButton);
	resetButton.onclick = resetGame;

}


function resetGame() {
	
	cnt = 1;
	guessField.value = "";
	prev.textContent = "";
	check.textContent = "";
	compare.textContent = "";

	button.disabled = false
	guessField.disabled = false;

	resetButton.parentNode.removeChild(resetButton);
	randomNumber = Math.floor(Math.random()*100) + 1;
	guessField.focus();

}

