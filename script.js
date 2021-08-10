const QUESTION = "question";
const CHOICE_A = "choice-a";
const ANSWERS = "answers";
var timeEl = document.querySelector(".time");
var questionAnswer = document.querySelector(".question-answer");
var startContainer = document.getElementById("start-page-container");
//var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results")
var submitButton = document.getElementById("submit");
var startButton = document.getElementById("start-button");
var questionTitle = document.getElementById("question-title");
var choiceA = document.getElementById("choice-a");

var currentQuestion = 0;

var quizQuestions = [
    { 
        QUESTION: "test question1",
        ANSWERS: { 
            CHOICE_A: "choice a",
            b: "choice b",
            c: "choice c"
        }, 
        correctAnswer: "c"

    },
    { 
        QUESTION: "test question2", 
        ANSWERS: { 
            CHOICE_A: "choice a",
            b: "choice b",
            c: "choice c"
        }, 
        correctAnswer: "c"

    }
];



function start (){ //start button 
    startContainer.setAttribute("class", "hidden");
    startTimer();
    showQuestion();
}


function startTimer(){ //start timer
    var timerInterval = setInterval(function() {
        //secondsLeft--;
        //timeEl.textContent = secondsLeft + " Next Question.";
   
    });
}

function showQuestion(){
    var question = quizQuestions[currentQuestion];
    questionTitle.innerText = question.QUESTION;
    console.log(question);
    choiceA.textContent = question.ANSWERS.CHOICE_A;
}

function selectAnswer(){
    currentQuestion++; 
    if (currentQuestion === quizQuestions.length) {
        showResults();
    } else { 
        showQuestion();
    }

}
function showResults(){ //show results

}

startButton.addEventListener("click", start);
submitButton.addEventListener("click", showResults);
questionAnswer.addEventListener("click", selectAnswer);