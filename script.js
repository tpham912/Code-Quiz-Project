//const 
const question = "question";
const answers = "answers";
const choiceA = "choice-a";
const choiceB = "choice-b";
const choiceC = "choice-c";
const choiceD = "choice-d";
const nickname = "nickname";
const highscore = "highscore";
const startQuiz = document.querySelector("#start-quiz");
const highscore1 = document.querySelector("#highscore");
const message = document.querySelector("#message");

//containers
var timeEl = document.querySelector(".time");
var questionAnswer = document.querySelector(".question-answer");
var startContainer = document.querySelector("#start-page-container");
var questionContainer = document.querySelector("#question-container");
var resultsContainer = document.querySelector("#results-container");
var answerContainer = document.querySelector("#answer-container");
var highscoresContainer = document.querySelector("#highscores-container");

//buttons
var highscoreButton = document.querySelector("#highscore-button");
var startButton = document.querySelector("#start-button");
var homepage = document.querySelector("#back-button");
var saveButton = document.querySelector("#save-button");
var backHome = document.querySelector("#back-homepage");
var add = document.querySelector("#add-player");
var allScores = document.querySelector(".score-board");
const scoreboard = document.querySelector("#scoreboard");

//question & answer choices
var questionTitle = document.querySelector("#question-title");
var choiceABtn = document.querySelector("#choice-a");
var choiceBBtn = document.querySelector("#choice-b");
var choiceCBtn = document.querySelector("#choice-c");
var choiceDBtn = document.querySelector("#choice-d");

//results
let percentage;
var score = document.querySelector("#score");
var usernameInput = document.querySelector(".user-name");
var displayName = document.querySelector("#display-name");
var highscores = [];

// footer
const footer = document.querySelector(".footer");

var currentQuestion = 0;

var secondsLeft = 20;
var timerInterval;

var quizQuestions = [
    { 
        question: "Q1: What Hawaiian dish resembles a bowl of deconstructed sushi?",
        answer: { 
            choiceA: "A - Poke",
            choiceB: "B - Chirashi",
            choiceC: "C - Spam Musubi",
            choiceD: "D - All of the above",
        }, 
        correctAnswer: "a",
        userSelection: ""

    },
    { 
        question: "Q2: The Arrector Pili muscles are responsible for what phenomenon?", 
        answer: { 
            choiceA: "A - Cardiac arrest",
            choiceB: "B - Goose bumps",
            choiceC: "C - Sweating",
            choiceD: "D - None of the above"
        }, 
        correctAnswer: "b",
        userSelection: ""

    },
    {
        question: "Q3: What did the “Itsy Bitsy Spider” climb up?", 
        answer: { 
            choiceA: "A - The watersprout",
            choiceB: "B - The sewage",
            choiceC: "C - The mountain",
            choiceD: "D - The fire escape",
        }, 
        correctAnswer: "a",
        userSelection: ""
    },
    {
        question: "Q4: What classic video game requires you to eat all the dots throughout a maze?", 
        answer: { 
            choiceA: "A - Bomber man",
            choiceB: "B - Pac-Man",
            choiceC: "C - Mario",
            choiceD: "D - There's no such game"
        }, 
        correctAnswer: "b",
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

function start () { //start button 
    startContainer.setAttribute("class", "hidden");
    scoreboard.setAttribute("class", "hidden");
    questionContainer.classList.remove("hidden");
    startQuiz.setAttribute("class", "hidden");
    highscore1.setAttribute("class", "hidden");
    footer.setAttribute("class", "hidden");
    showQuestion();
}

function startTimer() { // Start timer
    timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        for (let i = 0; i < quizQuestions.length; i++) {
            if (secondsLeft == 0 && i < quizQuestions.length) {
                clearInterval(timerInterval);
                showResults();
            }
        }
    }, 1000);
}

function showQuestion(){
    var question = quizQuestions[currentQuestion];
    questionTitle.textContent = question.question;

    choiceABtn.textContent = question.answer.choiceA;
    choiceBBtn.textContent = question.answer.choiceB;
    choiceCBtn.textContent = question.answer.choiceC;
    choiceDBtn.textContent = question.answer.choiceD;
    
    secondsLeft = 20;
    timeEl.textContent = secondsLeft;
    clearInterval(timerInterval);
    startTimer();
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

function showResults() { //show results
    clearInterval(timerInterval);
    resultsContainer.classList.remove("hidden");
    questionContainer.setAttribute("class", "hidden");

    var correctAnswers = 0;
    for (var i = 0; i < quizQuestions.length; i++) {
        if (quizQuestions[i].userSelection === quizQuestions[i].correctAnswer) {
            correctAnswers++;
        }
    }
    percentage = correctAnswers / quizQuestions.length * 100;
    
    score.textContent = `YOU GOT ${correctAnswers} OUT OF ${quizQuestions.length} CORRECT`;

}

function enterUserRecord() {
    let username = usernameInput.value; 

    var userRecord = {
        username: username,
        highscore: percentage
    }
 
    localStorage.setItem("userRecord", JSON.stringify(userRecord));
    
    if (userRecord.username == "") {
        displayName.setAttribute("class", "hidden");
    } else {
        displayName.classList.remove("hidden");
        displayName.textContent = `${userRecord.username} got ${userRecord.highscore}%`;
    }
}

var scoreBoardList = [];
let hasSaved = false;

function saveAllPlayers() {
    if (hasSaved) {
        score.textContent = `You've already saved once!`;
        return;
    }

    // Retrieve the item "allPlayers" from localStorage
    let storedPlayers = localStorage.getItem("allPlayers");

    // Check if storedPlayers is not null (meaning there is existing data)
    if (storedPlayers !== null) {
        // If there is data, parse it from JSON format into a JavaScript array
        scoreBoardList = JSON.parse(storedPlayers);
        hasSaved = true;
    } else {
        // If there is no data, initialize scoreBoardList as an empty array
        scoreBoardList = [];
        hasSaved = false;
    }

    // Retrieve the latest player record from localStorage
    let addPlayer = JSON.parse(localStorage.getItem("userRecord"));

    // Add the new player record to the list
    if (addPlayer) {  // Check to ensure addPlayer is not null
        scoreBoardList.push(addPlayer);
    }

    // Save the updated list back to localStorage
    localStorage.setItem("allPlayers", JSON.stringify(scoreBoardList));
    hasSaved = true;
}

function display10RecentPlayers() {
    // homepage.style.display = "none";
    highscore1.setAttribute("class", "hidden");
    startContainer.setAttribute("class", "hidden");
    startQuiz.setAttribute("class", "hidden");
    footer.setAttribute("class", "hidden");

    let allPlayers = JSON.parse(localStorage.getItem("allPlayers"));

     // Initialize an empty string to hold the player information
    let players = '';

    if (allPlayers.length > 10) {
        let last10Players = allPlayers.slice(-10);
        
        // Loop through each of the last 10 players and append their info to the players string
        for (let i = 0; i < last10Players.length; i++) {
            players += `${last10Players[i].username} : ${last10Players[i].highscore}% <br>`;
        }
        
        // Set the content for the scores display
        allScores.innerHTML = `<b>THE 10 MOST RECENT PLAYERS </b> <br>` + players;
    } 
}

// Highscore board
function showHighscores() {
    startContainer.setAttribute("class", "hidden");
    footer.setAttribute("class", "hidden");
    startButton.style.display = "none";
    homepage.style.display = "none";
    message.classList.remove("hidden");
    backHome.classList.remove("hidden");
    scoreboard.setAttribute("class", "hidden");
    var record = JSON.parse(localStorage.getItem("userRecord"));
    message.textContent = `The latest player: ${record.username} got ${record.highscore}%`;
}

function goHome() {
    window.location.href = "https://tpham912.github.io/Code-Quiz-Project/";
}

startButton.addEventListener("click", start);
choiceABtn.addEventListener("click", selectAnswerA);
choiceBBtn.addEventListener("click", selectAnswerB);
choiceCBtn.addEventListener("click", selectAnswerC);
choiceDBtn.addEventListener("click", selectAnswerD);
homepage.addEventListener("click", goHome);
backHome.addEventListener("click", goHome);
highscoreButton.addEventListener("click", showHighscores);
scoreboard.addEventListener("click", display10RecentPlayers)
saveButton.addEventListener("click", enterUserRecord);
saveButton.addEventListener("click", saveAllPlayers);

    