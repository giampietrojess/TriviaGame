

// Start Button Coding
$('#startBtn').on('click', function(){
    // When start button is clicked, the button is also hidden, and ...
    $(this).hide();
    // New game function begins
	newGame();
});

// Start Over Button
$('#startOverBtn').on('click', function(){
    // After clicking start over, the button hides and...
    $(this).hide();
    // New game function begins
	newGame();
});

// New Game Function
function newGame(){
    // Clears prior elements
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
    $('#unanswered').empty();
    // Resets Values
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
    unanswered = 0;
    // Loads New Question
	newQuestion();
}

