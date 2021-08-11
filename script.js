//const 
const question = "question";
const answers = "answers";
const choiceA = "choice-a";
const choiceB = "choice-b";
const choiceC = "choice-c";
const choiceD = "choice-d";

//containers
var timeEl = document.querySelector(".time");
var questionAnswer = document.querySelector(".question-answer");
var startContainer = document.querySelector("#start-page-container");
var questionContainer = document.querySelector("#question-container");
var resultsContainer = document.querySelector("#results-container");
var answerContainer = document.querySelector("#answer-container");
var highscoresContainer = document.querySelector("#highscores-container");


//buttons
var highscoresButton = document.querySelector("#highscores-button");
var startButton = document.querySelector("#start-button");
var nextButton = document.querySelector("#next");

//question & answer choices
var questionTitle = document.querySelector("#question-title");
var choiceABtn = document.querySelector("#choice-a");
var choiceBBtn = document.querySelector("#choice-b");
var choiceCBtn = document.querySelector("#choice-c");
var choiceDBtn = document.querySelector("#choice-d");

//results
var score = document.querySelector("#score");


var currentQuestion = 0;
var secondsLeft = 30;

var quizQuestions = [
    { 
        question: "test question 1",
        answer: { 
            choiceA: "choice a",
            choiceB: "choice b",
            choiceC: "choice c",
            choiceD: "choice d",
        }, 
        correctAnswer: "c",
        userSelection: ""

    },
    { 
        question: "test question 2", 
        answer: { 
            choiceA: "choice a",
            choiceB: "choice b",
            choiceC: "choice c",
            choiceD: "choice d"
        }, 
        correctAnswer: "c",
        userSelection: ""

    },
    {
        question: "test question 3", 
        answer: { 
            choiceA: "choice a",
            choiceB: "choice b",
            choiceC: "choice c",
            choiceD: "choice d"
        }, 
        correctAnswer: "c",
        userSelection: ""
    },
    {
        question: "test question 4", 
        answer: { 
            choiceA: "choice a",
            choiceB: "choice b",
            choiceC: "choice c",
            choiceD: "choice d"
        }, 
        correctAnswer: "a",
        userSelection: ""
    },

];


function start (){ //start button 
    startContainer.setAttribute("class", "hidden");
    questionContainer.classList.remove("hidden");
    startTimer();
    showQuestion();
}

function startTimer(){ //start timer
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
    
        }
   
    });
}

function showQuestion(){
    var question = quizQuestions[currentQuestion];
    questionTitle.innerText = question.question;
    console.log(question);
    choiceABtn.textContent = question.answer.choiceA;
    choiceBBtn.textContent = question.answer.choiceB;
    choiceCBtn.textContent = question.answer.choiceC;
    choiceDBtn.textContent = question.answer.choiceD;
}

function selectAnswer(choice){
   quizQuestions[currentQuestion].userSelection = choice;
   currentQuestion++; 
    if (currentQuestion === quizQuestions.length) {
        showResults();
    } else { 
        showQuestion();
    }

}



function selectAnswerA(){
    selectAnswer("a");
}

function selectAnswerB(){
    selectAnswer("b");
}

function selectAnswerC(){
    selectAnswer("c");
}

function selectAnswerD(){
    selectAnswer("d");
}



function showResults(){ //show results
    resultsContainer.classList.remove("hidden");
    questionContainer.setAttribute("class", "hidden");
    var correctAnswers = 0;
    for (var i = 0; i < quizQuestions.length; i++) {
        if (quizQuestions[i].userSelection === quizQuestions[i].correctAnswer) {
            correctAnswers++;
        }
    }
    var percentage = correctAnswers / quizQuestions.length * 100;
    score.textContent = `YOU GOT ${correctAnswers} out of ${quizQuestions.length} correct which is ${percentage}%`;

}

function showHighscore(){
    highscoresContainer.classList.remove("hidden");
    startContainer.setAttribute("class", "hidden");

}


startButton.addEventListener("click", start);
choiceABtn.addEventListener("click", selectAnswerA);
choiceBBtn.addEventListener("click", selectAnswerB);
choiceCBtn.addEventListener("click", selectAnswerC);
choiceDBtn.addEventListener("click", selectAnswerD);
highscoresButton.addEventListener("click", showHighscore);


//quizQuestions[currentQuestion].userSelection =  
  
    