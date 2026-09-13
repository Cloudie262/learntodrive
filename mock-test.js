const TOTAL_QUESTIONS = 50;
const TOTAL_TIME = 90 * 60;

let mockQuestions = [];
let currentQuestion = 0;
let answers = [];
let timeLeft = TOTAL_TIME;
let timerInterval;

let language =
    localStorage.getItem("learn2driveLanguage") || "my";


function mmNumber(number) {

    const mm =
        ["၀","၁","၂","၃","၄","၅","၆","၇","၈","၉"];

    return String(number)
        .replace(/\d/g, n => mm[n]);
}


function number(number) {

    return language === "my"
        ? mmNumber(number)
        : number;
}


// Get all questions
function getAllQuestions() {

    return Object.values(quizzes).flat();
}


// Random 50 Questions
function createMockTest() {

    const questions =
        [...getAllQuestions()];

    questions.sort(() =>
        Math.random() - 0.5
    );

    mockQuestions =
        questions.slice(0, TOTAL_QUESTIONS);

    answers =
        new Array(mockQuestions.length)
        .fill(null);
}


// Load Question
function loadMockQuestion() {

    const question =
        mockQuestions[currentQuestion];


    document.getElementById(
        "questionNumber"
    ).textContent =

        language === "my"

        ? `မေးခွန်း ${number(currentQuestion + 1)} / ${number(mockQuestions.length)}`

        : `Question ${currentQuestion + 1} / ${mockQuestions.length}`;


    document.getElementById(
        "mockQuestion"
    ).textContent =

        language === "en" && question.questionEn

        ? question.questionEn

        : question.question;


    const container =
        document.getElementById("mockOptions");

    container.innerHTML = "";


    question.options.forEach((option, index) => {

        const button =
            document.createElement("button");

        button.className = "mock-option";


        if (language === "en" &&
            question.optionsEn) {

            button.textContent =
                question.optionsEn[index];

        } else {

            button.textContent = option;
        }


        if (answers[currentQuestion] === index) {

            button.classList.add("selected");
        }


        button.onclick =
            () => selectAnswer(index);


        container.appendChild(button);
    });


    updateProgress();
    updateNavigation();
    updateQuestionNumbers();
}


// Select
function selectAnswer(index) {

    answers[currentQuestion] = index;

    loadMockQuestion();
}


// Progress
function updateProgress() {

    const answered =
        answers.filter(a => a !== null).length;


    document.getElementById(
        "answeredCount"
    ).textContent =

        language === "my"

        ? `ဖြေပြီး: ${number(answered)} / ${number(mockQuestions.length)}`

        : `Answered: ${answered} / ${mockQuestions.length}`;


    const progress =
        ((currentQuestion + 1) /
        mockQuestions.length) * 100;


    document.getElementById(
        "mockProgressBar"
    ).style.width =
        progress + "%";
}


// Navigation
function updateNavigation() {

    previousBtn.disabled =
        currentQuestion === 0;


    nextBtn.textContent =

        currentQuestion === mockQuestions.length - 1

        ? language === "my"
            ? "နောက်ဆုံးမေးခွန်း"
            : "Last Question"

        : language === "my"
            ? "နောက်မေးခွန်းသို့"
            : "Next Question";
}


previousBtn.onclick = function () {

    if (currentQuestion > 0) {

        currentQuestion--;

        loadMockQuestion();
    }
};


nextBtn.onclick = function () {

    if (currentQuestion <
        mockQuestions.length - 1) {

        currentQuestion++;

        loadMockQuestion();
    }
};


// Question Number Buttons
function updateQuestionNumbers() {

    const container =
        document.getElementById("questionNumbers");

    container.innerHTML = "";


    mockQuestions.forEach((q, index) => {

        const button =
            document.createElement("button");

        button.textContent =
            number(index + 1);


        if (index === currentQuestion)
            button.classList.add("current");


        if (answers[index] !== null)
            button.classList.add("answered");


        button.onclick = function () {

            currentQuestion = index;

            loadMockQuestion();
        };


        container.appendChild(button);
    });
}


// Timer
function updateTimer() {

    const hours =
        Math.floor(timeLeft / 3600);

    const minutes =
        Math.floor((timeLeft % 3600) / 60);

    const seconds =
        timeLeft % 60;


    document.getElementById("timer").textContent =

        `${number(hours)}:${number(
            String(minutes).padStart(2, "0")
        )}:${number(
            String(seconds).padStart(2, "0")
        )}`;
}


function startTimer() {

    timerInterval =
        setInterval(() => {

            timeLeft--;

            updateTimer();


            if (timeLeft <= 0) {

                clearInterval(timerInterval);

                submitMockTest();
            }

        }, 1000);
}


// Submit
function submitMockTest() {

    clearInterval(timerInterval);

    let score = 0;


    mockQuestions.forEach((question, index) => {

        if (answers[index] === question.answer) {
            score++;
        }
    });


    const percentage =
        Math.round(
            score / mockQuestions.length * 100
        );


    window.location =
        `mock-result.html?score=${score}&total=${mockQuestions.length}&percentage=${percentage}`;
}


submitBtn.onclick = function () {

    const unanswered =
        answers.filter(a => a === null).length;


    if (unanswered > 0) {

        const message =

            language === "my"

            ? `မဖြေရသေးသော မေးခွန်း ${unanswered} ခုရှိပါသည်။ စာမေးပွဲတင်မည်လား?`

            : `${unanswered} questions are unanswered. Submit anyway?`;


        if (!confirm(message)) return;
    }


    submitMockTest();
};


// Language
function setLanguage(lang) {

    language = lang;

    localStorage.setItem("learn2driveLanguage", lang);

    loadMockQuestion();
}


// Theme
function toggleTheme() {

    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "learn2driveTheme",
        dark ? "dark" : "light"
    );

    // The home page owns the theme button.
}


if (localStorage.getItem("learn2driveTheme") === "dark") {

    document.body.classList.add("dark");

    // The home page owns the theme button.
}


createMockTest();
loadMockQuestion();
updateTimer();
startTimer();
window.L2DI18n.register(state => { language = state.language; });
