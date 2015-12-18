'use strict';
var secretNumber,
userGuess,
pastGuesses = [],
count,
guessHtml,
userFeedback,
numberDifference,
alreadyGuessed,
$newButton,
$form,
$input,
$feedback,
$count,
$guessList;

$(document).ready(pageLoad);

function pageLoad() {

	$('.what').click(function() {
		$('.overlay').fadeIn(1000);
	});

	$('a.close').click(function() {
		$('.overlay').fadeOut(1000);
	});

	$newButton = $('a.new');
	$form = $('form');
	$input = $form.find('#userGuess');
	$feedback = $('#feedback');
	$count = $('#count');
	$guessList = $('#guessList');

	newGame();

	$newButton.click(newGame);
	$form.submit(function(event) {
		event.preventDefault();
		guessInput();
	});

}

function newGame() {
	$form.find('input[type=submit]');
	resetVariables();
	render();
	generateNumber();
}

function guessInput() {
	userGuess = $input.val();
	$input.val('');
	$input.focus();

	if (checkGuess()) {
		return ;
	}

	generateFeedback();
	trackGuess();
	guessCount();
	render();
}

function checkGuess() {
	if (userGuess % 1 !== 0) {
		alert('Please enter a number');
		return true;
	}

	if (userGuess < 1 || userGuess > 100) {
		alert('Please choose a number from 1 to 100');
		return true;
	}

	if (pastGuesses.length > 0) {
		$.each(pastGuesses,function(guess,value) {
			if(userGuess == value) {
				alreadyGuessed = true;
			}
		});
	}

	if (alreadyGuessed) {
		alreadyGuessed = false;
		alert('You guessed this number already');
		return true;
	}

	return false;
}

function generateFeedback() {
	numberDifference = Math.abs(userGuess - secretNumber);
	console.log(secretNumber);

	if (secretNumber == userGuess) {
		userFeedback = 'Congratulations!<br><br>Click new game to play again';
	}

	else if (numberDifference > 50) {
		userFeedback = 'Ice Cold';
	}
	
	else if (numberDifference > 30) {
		userFeedback = 'Cold';
	}
	else if (numberDifference > 20) {
		userFeedback = 'Warm';
	}
	else if (numberDifference > 10) {
		userFeedback = 'Hot';
	}
	else if (numberDifference > 0) {
		userFeedback = 'Very Hot';
	}
}

function trackGuess() {
	pastGuesses.push(userGuess);
	guessHtml = '';
	if(pastGuesses[0].length) {
		$.each(pastGuesses,function(guess,value) {
			guessHtml += '<li>' + value + '</li>';
		});
	}
}

function guessCount() {
	count++;
}

function render() {
	$guessList.html(guessHtml);
	$count.html(count);
	$feedback.html(userFeedback);
}

function generateNumber() {
	secretNumber = Math.floor(Math.random()*100)+1;
}

function resetVariables() {
	count = 0;
	pastGuesses = [];
	guessHtml='';
	userGuess = '';
	userFeedback = 'Make your Guess!';
}
