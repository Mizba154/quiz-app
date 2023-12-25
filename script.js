const questionNumber=document.querySelector(".question-number");
const questionText=document.querySelector(".question-text");
const optionsContainer=document.querySelector(".options-container");
const answerIndicatorContainer=document.querySelector(".ans-indicator");
const quizContainer=document.querySelector(".quiz-container");
const questionContainer=document.querySelector(".question-container");
const scoreContainer=document.querySelector(".score-container");
const name=document.querySelector(".name");

let questionCounter=0;
let currentQuestion;
let availableQuestions=[];
let availableOPtions=[];
let correctAnswers=0;
let attempt=0;

//Push the quetions into availableQuestions array
function setAvailableQuestions(){
	const totalQuestions=quiz.length;
	for(let i=0;i<totalQuestions; i++){
		availableQuestions.push(quiz[i])
	}
}


function getNewQuestion(){
    //set question number
    questionNumber.innerHTML="Question "+(questionCounter+1)+" of 10";

    //set question text
    // fetch a random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion=questionIndex;
    questionText.innerHTML=currentQuestion.q;

    //get the position of 'questionIndex' from the avaible questions array;
    const index1=availableQuestions.indexOf(questionIndex);
    //remove the 'questionIndex' from the avaibaleQuestion array,so the question won't repeate again
    availableQuestions.splice(index1,1);
    

    //set Options
    //fetch the length of the options
    const optionLen= currentQuestion.options.length;
    //push options in availableOptions array
    for(let i=0; i<optionLen; i++){
        availableOPtions.push(i)
    }


    optionsContainer.innerHTML='';
 	let animationDelay = 0.15;
	//create options in HTML
	for(let i=0;i<optionLen; i++){
		//random option
		const optionIndex = availableOPtions[Math.floor(Math.random() * availableOPtions.length)];
		//get the position of 'OptionIndex' from the availableOptions
		const index2= availableOPtions.indexOf(optionIndex);
		//removes the 'optionIndex' from the availableOptions, so that option does not repeat
		availableOPtions.splice(index2,1);



		const option = document.createElement("div");
		option.innerHTML=currentQuestion.options[optionIndex];
		option.id=optionIndex;
		option.style.animationDelay = animationDelay+'s';
		animationDelay=animationDelay+0.15;
		option.className="option";
		optionsContainer.appendChild(option);
		option.setAttribute("onclick","getResult(this)");
	}
 	
 	questionCounter++
}

//fetch the result of current attempt question
function getResult(element){
	const id = parseInt(element.id);
	//fetch the answer by comparing the id of clicked option
	if (id === currentQuestion.answer){
		//set the green color to the correct option
		element.classList.add("correct");
		// add the indicator correct mark
		updateAnswerIndicator("correct");
		correctAnswers++;
		console.log("correct:"+correctAnswers)
	}
	else{
		//set the red color to the wrong option
		element.classList.add("wrong");
		// add the indicator wrong mark
		updateAnswerIndicator("wrong");

		// if the answer is incorrect, show the correct option
		const optionLen = optionsContainer.children.length;
		for(let i=0; i<optionLen; i++){
			if(parseInt(optionsContainer.children[i].id) === currentQuestion.answer){
				optionsContainer.children[i].classList.add("correct");
			}
		}
	}
	attempt++;
	unclickableOptions();
}

// Restrict the user to select an option, when once selected
function unclickableOptions() {
	// body...
	const optionLen = optionsContainer.children.length;
	for(let i=0;i<optionLen; i++){
		optionsContainer.children[i].classList.add("already-answered");
	}
}

function answerIndicator(){
	answerIndicatorContainer.innerHTML = '';
	const totalQuestions = quiz.length;
	for(let i=0; i<10; i++){
		const indicator = document.createElement("div");
		answerIndicatorContainer.appendChild(indicator);
	}
}

function updateAnswerIndicator(markType){
	answerIndicatorContainer.children[questionCounter-1].classList.add(markType)
}

function next(){
	if(questionCounter===10){
		console.log("Quiz Over!");
		quizOver();
	}
	else{
		getNewQuestion();
	}
}

function quizOver(){
	// hide question container
	questionContainer.classList.add("hide");
	//show score container
	scoreContainer.classList.remove("hide");
	quizResult();
}

function quizResult(){
	
	scoreContainer.querySelector(".tot-questions").innerHTML = 10;
	scoreContainer.querySelector(".tot-attempt").innerHTML =attempt;
	scoreContainer.querySelector(".tot-correct").innerHTML = correctAnswers;
	scoreContainer.querySelector(".tot-wrong").innerHTML = attempt- correctAnswers;
	scoreContainer.querySelector(".tot-score").innerHTML = correctAnswers+" / 10";
}

function startQuiz(){
	// hide quiz container
	quizContainer.classList.add("hide");
	// shows question container
	questionContainer.classList.remove("hide");

	//First we will set all questions in avaibleQuestins array
	setAvailableQuestions();
	//Secondly we will call getNewQuestion() function
	getNewQuestion();
	// to create answer indicators
	answerIndicator();
}

function resetQuiz(){
	questionCounter=0;
	correctAnswers = 0;
	attempt = 0;
}
function tryAgainQuiz(){
	// hide the score container
	scoreContainer.classList.add("hide");
	// removes the question container
	questionContainer.classList.remove("hide");
	resetQuiz();
	startQuiz();

}

function goToHome(){
	// hide score container
	scoreContainer.classList.add("hide");
	// removes the question container
	quizContainer.classList.remove("hide");
	resetQuiz();
}	
function rEload()
{
	
	questionContainer.classList.add("hide");

	quizContainer.classList.remove("hide");
	resetQuiz();
}