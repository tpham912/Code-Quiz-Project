//const 
const question = "question";
const answers = "answers";
const choiceA = "choice-a";
const choiceB = "choice-b";
const choiceC = "choice-c";
const choiceD = "choice-d";
const nickname = "nickname";
const highscore = "highscore";

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
var inputInitials = document.querySelector("#first-name");
var inputInitials = document.querySelector("#last-name");



var highscores = [];


var currentQuestion = 0;
var secondsLeft = 20;

var quizQuestions = [
    { 
        question: "Q1: Which of the following is correct about features of JavaScript?",
        answer: { 
            choiceA: "A - JavaScript is is complementary to and integrated with HTML.",
            choiceB: "B - JavaScript is open and cross-platform.",
            choiceC: "C - Both of the above.",
            choiceD: "D - All of the above.",
        }, 
        correctAnswer: "c",
        userSelection: ""

    },
    { 
        question: "Q2: Which built-in method sorts the elements of an array?", 
        answer: { 
            choiceA: "A - changeOrder(order)",
            choiceB: "B - order()",
            choiceC: "C - sort",
            choiceD: "D - None of the above"
        }, 
        correctAnswer: "c",
        userSelection: ""

    },
    {
        question: "Q3: When is EDC (Electric Daisy Carnival) 2021?", 
        answer: { 
            choiceA: "A - Friday, Oct 22, 2021 - Sunday, Oct 24, 2021",
            choiceB: "B - Wednesday, Dec 22, 2021 - Friday, Dec 24, 2021",
            choiceC: "C - I don't listen to EDM",
            choiceD: "D - All festivals are cancelled indefinitely",
        }, 
        correctAnswer: "a",
        userSelection: ""
    },
    {
        question: "Q4: Who is the artist for the song Shelter?", 
        answer: { 
            choiceA: "A - Porter Robinson",
            choiceB: "B - Katy Perry",
            choiceC: "C - Miley Cyrus",
            choiceD: "D - David Bowie"
        }, 
        correctAnswer: "a",
        userSelection: ""
    },
    {
        question: "Q5: What does HTML stand for?", 
        answer: { 
            choiceA: "A - Hyper Trainer Marking Language",
            choiceB: "B - Hyper Text Marketing Language",
            choiceC: "C - Hyper Text Markup Language",
            choiceD: "D - Hyper Trainer Marking Lever"
        }, 
        correctAnswer: "c",
        userSelection: ""
    }

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
            gameOver();
        }
   
    }, 1000);
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
    score.textContent = `YOU GOT ${correctAnswers} OUT OF ${quizQuestions.length} CORRECT WHICH IS ${percentage}%`;
    var save = { 
        nickname : "test",
        highscore : percentage
    };
    highscores.push(save);
    localStorage.setItem("highscores", JSON.stringify(highscores));

}

function showHighscore() {
    highscoresContainer.classList.remove("hidden");
    startContainer.setAttribute("class", "hidden");
    var highscores = localStorage.getItem("highscores");
    console.log(highscores); 
    displayHighscore();
}

function displayhighScore() {
    highscore.textContent = highscore;

}

startButton.addEventListener("click", start);
choiceABtn.addEventListener("click", selectAnswerA);
choiceBBtn.addEventListener("click", selectAnswerB);
choiceCBtn.addEventListener("click", selectAnswerC);
choiceDBtn.addEventListener("click", selectAnswerD);
highscoresButton.addEventListener("click", showHighscore);
  
    