// Declare Everything

var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;

// Trivia Questions

var triviaQuestions = [{
	question: "What are the names of the three Schuyler sisters?",
	multipleChoice: ["A: Angela, Eliza, Peggy", "B: Angela, Elaina, Patty", "C: Angelica, Eliza, Peggy", "D: Angelica, Eliza, Patty"],
    answer: 2},
    {
    question: "Actor Daveed Diggs plays two different roles in Hamilton. In Act One, he portrays Marquis de Lafayette. Who does he portray in Act Two?",
	multipleChoice: ["A: Phillip Hamilton", "B: Thomas Jefferson", "C: James Madison", "D: George Washington"],
    answer: 1},
    {
    question: "What is the Eigth Duel Commandment?",
	multipleChoice: ["A: Confess your sins", "B: Send in the seconds to negotiate peace", "C: Duel before the sun is in the sky", "D: Choose a friend to act as your second"],
    answer: 1},
    {
    question: "In the song 'The Room Where it Happens', how was Aaron Burr involved in the agreement between Alexander Hamilton, Thomas Jefferson, and James Madison?",
	multipleChoice: ["A: He convinced the three to sit down together for negotiations.", "B: He asked James Madison to advocate for Washington D.C. as the nation’s capital.", "C: He told Alexander Hamilton that an agreement needed to be reached.", "D: He wasn’t."],
    answer: 3},
    {
	question: "Who wrote the Reynolds Pamphlet?",
	multipleChoice: ["A: James Reynolds", "B: Maria Reynolds", "C: Alexander Hamilton", "D: Eliza Schuyler"],
	answer: 2},
    {
	question: "Who is Phillip Hamilton seeking in 'Blow us All Away' to get an apology for insulting his father?", 
	multipleChoice: ["A: John Laurens", "B: Aaron Burr", "C: George Eacker", "D: Nathaniel Pendleton"],
	answer: 2},
    {
	question: "According to 'Who lives, Who Dies, Who Tells Your Story', which of Eliza's many accomplishments after Hamilton's death was she most proud?",
	multipleChoice: ["A: Establishing the first private orphanage in NYC", "B: Raising funds in D.C for the Washington Monument", "C: Speaking out against slavery", "D: Interviewing every solider that fought by Hamiton's side"],
	answer: 0},
    {
	question: "Which actor portrayed Alexander Hamilton on opening night?",
	multipleChoice: ["A: Lin Manuel Miranda", "B: Leslie Odom Jr.", "C: Javier Muñoz", "D: Miguel Cervantes"],
    answer: 0},
    {
	question: "Which actor has not portrayed King George on broadway in Hamilton?",
	multipleChoice: ["A: Andrew Rannells", "B: Jonathan Groff", "C: Brian d'Arcy James", "D: Rory O'Malley"],
    answer: 2},
    {
	question: "Who is the director of Hamilton",
	multipleChoice: ["A: Lin Manuel Miranda", "B: Thomas Kail", "C: Andrew Lloyd Webber", "D: Daveed Diggs"],
    answer: 1},
    {
	question: "At which theater did Hamilton begin its run on Broadway?",
	multipleChoice: ["A: Palace Theatre", "B: Shubert Theatre", "C: Richard Rogers Theatre", "D: Nederlander Theatre"],
	answer: 2}
];

// These are the messages that appear in between questions and at the end of the game

var resultMessages = {
	correct: "<h2>Correct</h2><br>Maaaaan, you're nonstop!",
	incorrect: "<h2>Incorrect!</h2> You can't be serious!",
	endTime: "Take a note from Hamilton and answer like you're running out of time.... because you ran out of time!",
	finished: "<BR><h2>Wait for it! Let's see your legacy!</h2>"
}

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

// Selects New Question
function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('<h2>Question #' + (currentQuestion+1) + '</h2>');
	$('.question').html('<h3>' + triviaQuestions[currentQuestion].question + '</h3>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].multipleChoice[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}


// Timer function
function countdown(){
	seconds = 20;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down in showCountdown function
	time = setInterval(showCountdown, 1000);
}

// Show Countdown
function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    // If the timer runs out of time, stop timer, declare wrong answer, run answer page function
    if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

// Answer Page function
function answerPage(){
    // Clears Previous Elements
    $('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].multipleChoice[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	
	//If User Gets the Answer Correct
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
        $('#message').html(resultMessages.correct);
    // If User Gets the Answer Wrong
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(resultMessages.incorrect);
        $('#correctedAnswer').html('The correct answer was:<br> ' + rightAnswerText);
    // If User Runs Out of Time
	} else{
		unanswered++;
		$('#message').html(resultMessages.endTime);
		$('#correctedAnswer').html('The correct answer was:<br> ' + rightAnswerText);
		answered = true;
	}
	// If the current question reaches the end of the trivia list, stop the timer, show the scoreboard
	if(currentQuestion == (triviaQuestions.length-1)){
        setTimeout(scoreboard, 5000)
    // Otherwise add another question, set new timeout, add new question 
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
    // Empties previous information
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();

	$('#finalMessage').html(resultMessages.finished);
	$('#correctAnswers').html("Right: " + correctAnswer);
	$('#incorrectAnswers').html("Wrong: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}