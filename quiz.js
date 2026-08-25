// ========================================
// Get Module & Lesson from URL
// ========================================

const params =
    new URLSearchParams(window.location.search);

const moduleNumber =
    params.get("module");

const lessonNumber =
    params.get("lesson");


// Example:
// module = 1
// lesson = 1
// quizKey = "1-1"

const quizKey =
    `${moduleNumber}-${lessonNumber}`;


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
        .replace(/\d/g, d => mm[d]);
}


// ========================================
// Get HTML Elements
// ========================================

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


// ========================================
// Quiz Data
// ========================================

let quizQuestions =
    quizzes[quizKey] || [];


// ========================================
// Quiz Variables
// ========================================

let currentQuestion = 0;

let score = 0;

let answered = false;


// ========================================
// Shuffle Questions
// ========================================

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


// ========================================
// Start Quiz
// ========================================

function startQuiz() {

    // Randomize questions

    quizQuestions =
        shuffle([
            ...quizzes[quizKey]
        ]);

    currentQuestion = 0;

    score = 0;

    quizPage.classList.remove("hidden");

    resultPage.classList.add("hidden");

    nextBtn.textContent =
        "နောက်မေးခွန်းသို့";

    loadQuestion();
}


// ========================================
// Load Question
// ========================================

function loadQuestion() {

    answered = false;

    feedbackEl.textContent = "";

    feedbackEl.style.color = "";


    const q =
        quizQuestions[currentQuestion];


    // Question Progress

    progressEl.textContent =
        `မေးခွန်း ${mmNumber(
            currentQuestion + 1
        )} / ${mmNumber(
            quizQuestions.length
        )}`;


    // Score

    scoreEl.textContent =
        `ရမှတ်: ${mmNumber(score)}`;


    // Question

    questionEl.textContent =
        q.question;


    // Clear Options

    optionsEl.innerHTML = "";


    // Create Options

    q.options.forEach(
        (option, index) => {

            const btn =
                document.createElement(
                    "button"
                );

            btn.textContent =
                option;

            btn.className =
                "option-btn";

            btn.onclick =
                () => checkAnswer(index);

            optionsEl.appendChild(btn);
        }
    );
}


// ========================================
// Check Answer
// ========================================

function checkAnswer(selected) {

    // Only answer once

    if (answered) return;

    answered = true;


    const q =
        quizQuestions[currentQuestion];


    const buttons =
        document.querySelectorAll(
            ".option-btn"
        );


    buttons.forEach(
        (btn, index) => {

            btn.disabled = true;


            // Correct Answer

            if (index === q.answer) {

                btn.classList.add(
                    "correct"
                );
            }


            // Wrong Selected Answer

            if (
                index === selected &&
                index !== q.answer
            ) {

                btn.classList.add(
                    "wrong"
                );
            }
        }
    );


    // Correct

    if (selected === q.answer) {

        score++;

        scoreEl.textContent =
            `ရမှတ်: ${mmNumber(score)}`;

        feedbackEl.textContent =
            "✅ မှန်ပါသည်";

        feedbackEl.style.color =
            "green";
    }


    // Wrong

    else {

        feedbackEl.textContent =
            `❌ မှားပါသည်။ အဖြေမှန် - ${
                q.options[q.answer]
            }`;

        feedbackEl.style.color =
            "red";
    }
}


// ========================================
// Next Question
// ========================================

nextBtn.onclick = function () {

    // Must answer first

    if (!answered) return;


    currentQuestion++;


    // More questions

    if (
        currentQuestion <
        quizQuestions.length
    ) {

        loadQuestion();
    }


    // Quiz Finished

    else {

        showResult();
    }
};


// ========================================
// Show Result
// ========================================

function showResult() {

    quizPage.classList.add("hidden");

    resultPage.classList.remove("hidden");


    const total =
        quizQuestions.length;


    // 80% Pass Mark

    const passMark =
        Math.ceil(total * 0.8);


    const percent =
        Math.round(
            (score / total) * 100
        );


    // Final Score

    finalScore.textContent =
        `${mmNumber(score)} / ${mmNumber(total)}`;


    // Percentage

    percentageEl.textContent =
        `${mmNumber(percent)}%`;


    // ====================================
    // Get Existing Scores
    // ====================================

    let lessonScores =
        JSON.parse(
            localStorage.getItem(
                "lessonScores"
            )
        ) || {};


    const lessonID =
        `${moduleNumber}-${lessonNumber}`;


    // ====================================
    // Save Score
    // ====================================

    /*
       Lesson ကို အရင်ကဖြေထားရင်
       score အသစ်နဲ့ update လုပ်မယ်။

       ဥပမာ

       အရင် = 70%
       အသစ် = 90%

       90% ကိုသိမ်းမယ်။
    */

    if (
        !lessonScores[lessonID] ||
        percent > lessonScores[lessonID]
    ) {

        lessonScores[lessonID] =
            percent;

        localStorage.setItem(
            "lessonScores",
            JSON.stringify(
                lessonScores
            )
        );
    }


    // ====================================
    // PASS
    // ====================================

    if (score >= passMark) {

        resultTitle.textContent =
            "🎉 အောင်မြင်သည်";

        resultTitle.className =
            "pass";


        statusText.textContent =
            `အောင်မှတ် - ${
                mmNumber(passMark)
            } / ${
                mmNumber(total)
            }`;


        // ====================================
        // Mark Lesson Complete
        // ====================================

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


    // ====================================
    // FAIL
    // ====================================

    else {

        resultTitle.textContent =
            "❌ ကျရှုံးသည်";

        resultTitle.className =
            "fail";


        statusText.textContent =
            `အောင်မှတ် ${
                mmNumber(passMark)
            } မှတ် လိုအပ်သည်`;
    }
}


// ========================================
// Restart Quiz
// ========================================

restartBtn.onclick =
    () => startQuiz();


// ========================================
// Start Quiz
// ========================================

startQuiz();