// ========================================
// MOCK TEST LOGIN PROTECTION
// ========================================

const loggedInUser =
    localStorage.getItem(
        "portalSession"
    );


// User is not logged in

if (!loggedInUser) {

    alert(
        "အစမ်းစာမေးပွဲဖြေဆိုရန် အကောင့်ဝင်ရန် လိုအပ်ပါသည်။"
    );


    window.location.replace(
        "profile.html?redirect=mock-test.html"
    );


    // Stop the rest of this JavaScript file

    throw new Error(
        "Mock Test requires login."
    );
}


// ========================================
// MOCK TEST
// ========================================


// ========================================
// Myanmar Number
// ========================================

function mmNumber(num) {

    const mm = [
        "၀", "၁", "၂", "၃", "၄",
        "၅", "၆", "၇", "၈", "၉"
    ];


    return num
        .toString()
        .replace(
            /\d/g,
            d => mm[d]
        );
}


// ========================================
// Settings
// ========================================

const TOTAL_QUESTIONS = 50;


// 1 hour 30 minutes

const TOTAL_TIME =
    90 * 60;


// ========================================
// Variables
// ========================================

let mockQuestions = [];

let currentQuestion = 0;

let answers = [];

let timeLeft =
    TOTAL_TIME;

let timerInterval;


// ========================================
// Get Questions from question.js
// ========================================

function getAllQuestions() {

    let allQuestions = [];


    /*
        quizzes ထဲမှာ

        "1-1"
        "1-2"
        "1-3"
        ...
        "4-7"

        ဆိုပြီး သိမ်းထားသော
        မေးခွန်းများအားလုံးကို
        စုစည်းပေးမည်။
    */


    Object.values(
        quizzes
    ).forEach(
        questionSet => {

            allQuestions.push(
                ...questionSet
            );

        }
    );


    return allQuestions;
}


// ========================================
// Create Random 50 Questions
// ========================================

function createMockTest() {

    const allQuestions =
        getAllQuestions();


    // Copy original questions

    const shuffled =
        [...allQuestions];


    // ====================================
    // Fisher-Yates Shuffle
    // ====================================

    for (
        let i =
            shuffled.length - 1;

        i > 0;

        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            shuffled[i],
            shuffled[j]
        ]
        =
        [
            shuffled[j],
            shuffled[i]
        ];

    }


    // ====================================
    // Select first 50 after shuffle
    // ====================================

    mockQuestions =
        shuffled.slice(
            0,
            TOTAL_QUESTIONS
        );


    // ====================================
    // Empty answer array
    // ====================================

    answers =
        new Array(
            mockQuestions.length
        ).fill(null);
}


// ========================================
// Load Question
// ========================================

function loadMockQuestion() {

    const question =
        mockQuestions[
            currentQuestion
        ];


    // ====================================
    // Question Number
    // ====================================

    document.getElementById(
        "questionNumber"
    ).textContent =

        `မေးခွန်း ${
            mmNumber(
                currentQuestion + 1
            )
        } / ${
            mmNumber(
                mockQuestions.length
            )
        }`;


    // ====================================
    // Question Text
    // ====================================

    document.getElementById(
        "mockQuestion"
    ).textContent =
        question.question;


    // ====================================
    // Options Container
    // ====================================

    const optionsContainer =
        document.getElementById(
            "mockOptions"
        );


    optionsContainer.innerHTML =
        "";


    // ====================================
    // Create Answer Buttons
    // ====================================

    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.textContent =
                option;


            button.className =
                "mock-option";


            // =================================
            // Restore selected answer
            // =================================

            if (
                answers[
                    currentQuestion
                ] === index
            ) {

                button.classList.add(
                    "selected"
                );

            }


            // =================================
            // Click answer
            // =================================

            button.onclick =
                () =>
                    selectAnswer(
                        index
                    );


            optionsContainer
                .appendChild(
                    button
                );

        }
    );


    updateProgress();

    updateNavigation();

    updateQuestionNumbers();
}


// ========================================
// Select Answer
// ========================================

function selectAnswer(index) {

    answers[
        currentQuestion
    ] = index;


    loadMockQuestion();
}


// ========================================
// Progress
// ========================================

function updateProgress() {

    const answered =
        answers.filter(
            answer =>
                answer !== null
        ).length;


    // ====================================
    // Answered Count
    // ====================================

    document.getElementById(
        "answeredCount"
    ).textContent =

        `ဖြေပြီး: ${
            mmNumber(answered)
        } / ${
            mmNumber(
                mockQuestions.length
            )
        }`;


    // ====================================
    // Progress Bar
    // ====================================

    const progress =
        (
            (
                currentQuestion + 1
            )
            /
            mockQuestions.length
        )
        * 100;


    document.getElementById(
        "mockProgressBar"
    ).style.width =
        progress + "%";
}


// ========================================
// Previous / Next Navigation
// ========================================

function updateNavigation() {

    const previousBtn =
        document.getElementById(
            "previousBtn"
        );


    const nextBtn =
        document.getElementById(
            "nextBtn"
        );


    // ====================================
    // Disable Previous on Question 1
    // ====================================

    previousBtn.disabled =
        currentQuestion === 0;


    // ====================================
    // Last Question
    // ====================================

    if (
        currentQuestion ===
        mockQuestions.length - 1
    ) {

        nextBtn.textContent =
            "နောက်ဆုံးမေးခွန်း";

    }

    else {

        nextBtn.textContent =
            "နောက်မေးခွန်းသို့";

    }
}


// ========================================
// Previous Button
// ========================================

document.getElementById(
    "previousBtn"
).onclick =
    function () {

        if (
            currentQuestion > 0
        ) {

            currentQuestion--;


            loadMockQuestion();

        }

    };


// ========================================
// Next Button
// ========================================

document.getElementById(
    "nextBtn"
).onclick =
    function () {

        if (
            currentQuestion <
            mockQuestions.length - 1
        ) {

            currentQuestion++;


            loadMockQuestion();

        }

    };


// ========================================
// Question Number Navigation
// ========================================

function updateQuestionNumbers() {

    const container =
        document.getElementById(
            "questionNumbers"
        );


    container.innerHTML =
        "";


    mockQuestions.forEach(
        (question, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.textContent =
                mmNumber(
                    index + 1
                );


            // =================================
            // Current Question
            // =================================

            if (
                index ===
                currentQuestion
            ) {

                button.classList.add(
                    "current"
                );

            }


            // =================================
            // Answered Question
            // =================================

            if (
                answers[index] !==
                null
            ) {

                button.classList.add(
                    "answered"
                );

            }


            // =================================
            // Jump to Question
            // =================================

            button.onclick =
                function () {

                    currentQuestion =
                        index;


                    loadMockQuestion();

                };


            container.appendChild(
                button
            );

        }
    );
}


// ========================================
// Timer
// ========================================

function startTimer() {

    timerInterval =
        setInterval(
            function () {

                timeLeft--;


                // =================================
                // Time Finished
                // =================================

                if (
                    timeLeft <= 0
                ) {

                    clearInterval(
                        timerInterval
                    );


                    submitMockTest();


                    return;
                }


                updateTimer();

            },

            1000
        );
}


// ========================================
// Display Timer
// ========================================

function updateTimer() {

    const hours =
        Math.floor(
            timeLeft / 3600
        );


    const minutes =
        Math.floor(
            (
                timeLeft % 3600
            )
            /
            60
        );


    const seconds =
        timeLeft % 60;


    document.getElementById(
        "timer"
    ).textContent =

        `${mmNumber(
            hours
        )}:${mmNumber(
            minutes
                .toString()
                .padStart(
                    2,
                    "0"
                )
        )}:${mmNumber(
            seconds
                .toString()
                .padStart(
                    2,
                    "0"
                )
        )}`;
}


// ========================================
// Submit Mock Test
// ========================================

function submitMockTest() {

    // Stop timer

    clearInterval(
        timerInterval
    );


    let score = 0;


    // ====================================
    // Calculate Score
    // ====================================

    mockQuestions.forEach(
        (question, index) => {

            if (
                answers[index] ===
                question.answer
            ) {

                score++;

            }

        }
    );


    // ====================================
    // Percentage
    // ====================================

    const percentage =
        Math.round(
            (
                score
                /
                mockQuestions.length
            )
            *
            100
        );


    // ====================================
    // Save Result
    // ====================================

    localStorage.setItem(
        "mockTestScore",
        score
    );


    localStorage.setItem(
        "mockTestPercentage",
        percentage
    );


    // ====================================
    // Go To Result Page
    // ====================================

    window.location =

        `mock-result.html?score=${score}&total=${mockQuestions.length}&percentage=${percentage}`;
}


// ========================================
// Submit Button
// ========================================

document.getElementById(
    "submitBtn"
).onclick =
    function () {

        const answered =
            answers.filter(
                answer =>
                    answer !== null
            ).length;


        const unanswered =
            mockQuestions.length
            -
            answered;


        // ====================================
        // Confirm if unanswered questions
        // ====================================

        if (
            unanswered > 0
        ) {

            const confirmSubmit =
                confirm(

                    `မဖြေရသေးသော မေးခွန်း ${unanswered} ခု ရှိပါသည်။\n\nစာမေးပွဲတင်မည်လား?`

                );


            if (
                !confirmSubmit
            ) {

                return;

            }

        }


        submitMockTest();

    };


// ========================================
// START MOCK TEST
// ========================================

createMockTest();

loadMockQuestion();

updateTimer();

startTimer();
