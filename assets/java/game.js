// Declare Everything
var triviaQuestions = [{
	question: "Question?",
	answerList: ["A: Choice one", "B: Choice Two", "C: Choice Three", "D: Choice Four"],
	answer: 1
}
// ,{
// 	question: "Question?",
// 	answerList: ["A: Choice one", "B: Choice Two", "C: Choice Three", "D: Choice Four"],
// 	answer: 0
// },{
// 	question: "Question?",
// 	answerList: ["A: Choice one", "B: Choice Two", "C: Choice Three", "D: Choice Four"],
// 	answer: 0
// },{
// 	question: "Question?",
// 	answerList: ["A: Choice one", "B: Choice Two", "C: Choice Three", "D: Choice Four"],
// 	answer: 2
// },{
// 	question: "Question?",
// 	answerList: ["A: Choice one", "B: Choice Two", "C: Choice Three", "D: Choice Four"],
// 	answer: 3
// },{
// 	question: "Question?",
// 	answerList: ["A: Choice one", "B: Choice Two", "C: Choice Three", "D: Choice Four"],
// 	answer: 0
// },{
// 	question: "Question?",
// 	answerList: ["A: Choice one", "B: Choice Two", "C: Choice Three", "D: Choice Four"],
// 	answer: 1
// },{
// 	question: "Question?",
// 	answerList: ["A: Choice one", "B: Choice Two", "C: Choice Three", "D: Choice Four"],
// 	answer: 2
// },{
// 	question: "Question?",
// 	answerList: ["A: Choice one", "B: Choice Two", "C: Choice Three", "D: Choice Four"],
// 	answer: 1
// },{
// 	question: "Question?",
// 	answerList: ["A: Choice one", "B: Choice Two", "C: Choice Three", "D: Choice Four"],
// 	answer: 2
// },{
// 	question: "Question?",
// 	answerList: ["A: Choice one", "B: Choice Two", "C: Choice Three", "D: Choice Four"],
// 	answer: 1
// },{
// 	question: "Question?",
// 	answerList: ["A: Choice one", "B: Choice Two", "C: Choice Three", "D: Choice Four"],
// 	answer: 3
// },{
// 	question: "Question?",
// 	answerList: ["A: Choice one", "B: Choice Two", "C: Choice Three", "D: Choice Four"],
// 	answer: 1
// },{
// 	question: "Question?",
// 	answerList: ["A: Choice one", "B: Choice Two", "C: Choice Three", "D: Choice Four"],
// 	answer: 2
// },{
// 	question: "Question?",
// 	answerList: ["A: Choice one", "B: Choice Two", "C: Choice Three", "D: Choice Four"],
// 	answer: 0
// }
];

var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;

var messages = {
	correct: "Maaaaan, you're nonstop!",
	incorrect: "No, that's not it.",
	endTime: "You should learn how to answer trivia questions like you're running out of time.... because you ran out of time!",
	finished: "Done! What's your legacy? Let's see!"
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
	$('#currentQuestion').html('<h2>Question #'+(currentQuestion+1)+'/'+triviaQuestions.length + '</h2>');
	$('.question').html('<h3>' + triviaQuestions[currentQuestion].question + '</h3>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
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
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

// Show Countdown
function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    // If the timer runs out of time, clear timer, declare wrong answer, run answer page function
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


	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	
	//If User Gets the Answer Correct
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
        $('#message').html(messages.correct);
    // If User Gets the Answer Wrong
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was:<br> ' + rightAnswerText);
    // If User Runs Out of Time
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was:<br> ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}