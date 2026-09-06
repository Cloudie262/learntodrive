// ======================================================
// quiz.js
// Learn2Drive
// ======================================================


// ======================================================
// 1. GET MODULE AND LESSON FROM URL
// ======================================================

const params = new URLSearchParams(window.location.search);

const moduleNumber = params.get("module");
const lessonNumber = params.get("lesson");


// Example:
// quiz.html?module=1&lesson=1
//
// moduleNumber = "1"
// lessonNumber = "1"
//
// quizKey = "1-1"

const quizKey = `${moduleNumber}-${lessonNumber}`;


// ======================================================
// 2. CHECK IF MODULE QUESTIONS EXIST
// ======================================================

if (
    !moduleNumber ||
    !lessonNumber
) {

    alert(
        "Module or lesson information is missing."
    );

    window.location.href = "portal.html";

}


if (
    typeof quizzes === "undefined"
) {

    alert(
        "question.js could not be loaded."
    );

    throw new Error(
        "question.js is not loaded."
    );

}


if (
    !quizzes[quizKey]
) {

    alert(
        `Questions for Module ${moduleNumber}, Lesson ${lessonNumber} were not found.\n\nQuiz key: ${quizKey}`
    );

    window.location.href = "portal.html";

}


// ======================================================
// 3. MYANMAR NUMBERS
// ======================================================

function mmNumber(num) {

    const mm = [
        "၀",
        "၁",
        "၂",
        "၃",
        "၄",
        "၅",
        "၆",
        "၇",
        "၈",
        "၉"
    ];


    return String(num).replace(
        /\d/g,
        digit => mm[digit]
    );

}


// ======================================================
// 4. HTML ELEMENTS
// ======================================================

const quizPage =
    document.getElementById("quiz-page");

const resultPage =
    document.getElementById("result-page");

const questionEl =
    document.getElementById("question");

const optionsEl =
    document.getElementById("options");

const progressEl =
    document.getElementById("progress");

const scoreEl =
    document.getElementById("score");

const feedbackEl =
    document.getElementById("feedback");

const nextBtn =
    document.getElementById("next-btn");

const resultTitle =
    document.getElementById("result-title");

const finalScore =
    document.getElementById("final-score");

const percentageEl =
    document.getElementById("percentage");

const statusText =
    document.getElementById("status-text");

const restartBtn =
    document.getElementById("restart-btn");


// ======================================================
// 5. LOAD QUESTIONS FOR THIS MODULE
// ======================================================

let quizQuestions = [];

let currentQuestion = 0;

let score = 0;

let answered = false;


// ======================================================
// 6. SHUFFLE QUESTIONS
// ======================================================

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];

    }


    return array;
}


// ======================================================
// 7. START QUIZ
// ======================================================

function startQuiz() {

    // Important:
    // Make a COPY of the questions.
    // question.js remains unchanged.

    quizQuestions =
        shuffle(
            [...quizzes[quizKey]]
        );


    currentQuestion = 0;

    score = 0;

    answered = false;


    quizPage.classList.remove(
        "hidden"
    );


    resultPage.classList.add(
        "hidden"
    );


    nextBtn.textContent =
        "နောက်မေးခွန်းသို့";


    loadQuestion();

}


// ======================================================
// 8. LOAD QUESTION
// ======================================================
function loadQuestion() {

    answered = false;

    feedbackEl.textContent = "";

    feedbackEl.style.color = "";


    const q =
        quizQuestions[currentQuestion];


    const language =
        localStorage.getItem(
            "learn2driveLanguage"
        ) || "my";


    // ==========================================
    // FIND ORIGINAL QUESTION INDEX
    // ==========================================

    const originalQuestions =
        quizzes[quizKey];


    const originalIndex =
        originalQuestions.findIndex(
            function (item) {

                return (
                    item.question === q.question
                );

            }
        );


    let displayQuestion =
        q.question;


    let displayOptions =
        q.options;


    // ==========================================
    // ENGLISH VERSION
    // ==========================================

    if (
        language === "en" &&
        typeof quizTranslations !== "undefined" &&
        quizTranslations[quizKey] &&
        quizTranslations[quizKey][originalIndex]
    ) {

        const translated =
            quizTranslations[quizKey][originalIndex];


        displayQuestion =
            translated.question;


        displayOptions =
            translated.options;

    }


    // ==========================================
    // PROGRESS + SCORE
    // ==========================================

    if (language === "en") {

        progressEl.textContent =
            `Question ${
                currentQuestion + 1
            } / ${
                quizQuestions.length
            }`;


        scoreEl.textContent =
            `Score: ${score}`;

    }

    else {

        progressEl.textContent =
            `မေးခွန်း ${
                mmNumber(
                    currentQuestion + 1
                )
            } / ${
                mmNumber(
                    quizQuestions.length
                )
            }`;


        scoreEl.textContent =
            `ရမှတ်: ${
                mmNumber(score)
            }`;

    }


    // ==========================================
    // QUESTION
    // ==========================================

    questionEl.textContent =
        displayQuestion;


    // ==========================================
    // OPTIONS
    // ==========================================

    optionsEl.innerHTML = "";


    displayOptions.forEach(
        function (option, index) {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "option-btn";


            button.textContent =
                option;


            button.addEventListener(
                "click",
                function () {

                    checkAnswer(index);

                }
            );


            optionsEl.appendChild(
                button
            );

        }
    );

}


// ======================================================
// 9. CHECK ANSWER
// ======================================================

function checkAnswer(selected) {

    if (answered) {

        return;

    }


    answered = true;


    const q =
        quizQuestions[
            currentQuestion
        ];


    const buttons =
        document.querySelectorAll(
            ".option-btn"
        );


    buttons.forEach(
        function (
            button,
            index
        ) {

            button.disabled =
                true;


            // Correct answer
            if (
                index === q.answer
            ) {

                button.classList.add(
                    "correct"
                );

            }


            // Wrong selected answer
            if (
                index === selected &&
                index !== q.answer
            ) {

                button.classList.add(
                    "wrong"
                );

            }

        }
    );


    // ==================================================
    // CORRECT
    // ==================================================

    if (
        selected === q.answer
    ) {

        score++;


        scoreEl.textContent =
            `ရမှတ်: ${
                mmNumber(score)
            }`;


        feedbackEl.textContent =
            "✅ မှန်ပါသည်";


        feedbackEl.style.color =
            "green";

    }


    // ==================================================
    // WRONG
    // ==================================================

    else {

        feedbackEl.textContent =
            `❌ မှားပါသည်။ အဖြေမှန် - ${
                q.options[
                    q.answer
                ]
            }`;


        feedbackEl.style.color =
            "red";

    }

}


// ======================================================
// 10. NEXT QUESTION
// ======================================================

nextBtn.addEventListener(
    "click",
    function () {

        // User must choose an answer first

        if (!answered) {

            return;

        }


        currentQuestion++;


        if (
            currentQuestion <
            quizQuestions.length
        ) {

            loadQuestion();

        }

        else {

            showResult();

        }

    }
);


// ======================================================
// 11. RESULT
// ======================================================

function showResult() {

    quizPage.classList.add(
        "hidden"
    );


    resultPage.classList.remove(
        "hidden"
    );


    const total =
        quizQuestions.length;


    const passMark =
        Math.ceil(
            total * 0.8
        );


    const percent =
        Math.round(
            (score / total) * 100
        );


    finalScore.textContent =
        `${mmNumber(score)} / ${mmNumber(total)}`;


    percentageEl.textContent =
        `${mmNumber(percent)}%`;


// ======================================================
// SAVE SCORE
// ======================================================

    let lessonScores =
        JSON.parse(
            localStorage.getItem(
                "lessonScores"
            )
        ) || {};


    const lessonID =
        quizKey;


    // Save only the best score

    if (
        !lessonScores[
            lessonID
        ] ||
        percent >
        lessonScores[
            lessonID
        ]
    ) {

        lessonScores[
            lessonID
        ] = percent;


        localStorage.setItem(
            "lessonScores",
            JSON.stringify(
                lessonScores
            )
        );

    }


// ======================================================
// PASS
// ======================================================

    if (
        score >= passMark
    ) {

        resultTitle.textContent =
            "🎉 အောင်မြင်သည်";


        resultTitle.className =
            "pass";


        statusText.textContent =
            `အောင်မှတ် - ${
                mmNumber(
                    passMark
                )
            } / ${
                mmNumber(
                    total
                )
            }`;


        // Save completed lesson

        let completedLessons =
            JSON.parse(
                localStorage.getItem(
                    "completedLessons"
                )
            ) || [];


        if (
            !completedLessons.includes(
                lessonID
            )
        ) {

            completedLessons.push(
                lessonID
            );


            localStorage.setItem(
                "completedLessons",
                JSON.stringify(
                    completedLessons
                )
            );

        }

    }


// ======================================================
// FAIL
// ======================================================

    else {

        resultTitle.textContent =
            "❌ ကျရှုံးသည်";


        resultTitle.className =
            "fail";


        statusText.textContent =
            `အောင်မှတ် ${
                mmNumber(
                    passMark
                )
            } မှတ် လိုအပ်သည်`;

    }

}


// ======================================================
// 12. RESTART
// ======================================================

restartBtn.addEventListener(
    "click",
    function () {

        startQuiz();

    }
);


// ======================================================
// 13. START
// ======================================================
window.addEventListener(
    "l2dLanguageChanged",
    function () {

        // Reload the SAME question
        // without restarting the quiz
        loadQuestion();

    }
);
startQuiz();