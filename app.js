// ========================================
// Myanmar Number
// ========================================

function toMyanmarDigit(num) {

    const myanmarDigits = [
        "၀", "၁", "၂", "၃", "၄",
        "၅", "၆", "၇", "၈", "၉"
    ];

    return num
        .toString()
        .split("")
        .map(digit =>
            myanmarDigits[digit] || digit
        )
        .join("");
}


// ========================================
// Accordion
// ========================================

function toggle(id) {

    const lesson =
        document.getElementById(id);

    const header =
        lesson.previousElementSibling;

    const arrow =
        header.querySelector(
            "span:last-child"
        );


    if (
        window.getComputedStyle(
            lesson
        ).display === "block"
    ) {

        lesson.style.display =
            "none";

        if (arrow) {
            arrow.textContent =
                "▼";
        }

    } else {

        lesson.style.display =
            "block";

        if (arrow) {
            arrow.textContent =
                "▲";
        }
    }
}


// ========================================
// Total Lessons
// ========================================

const TOTAL_LESSONS = 28;


// ========================================
// Pass Percentage
// ========================================

const PASS_PERCENTAGE = 80;


// ========================================
// Get Completed Lessons
// ========================================

function getCompletedLessons() {

    return JSON.parse(
        localStorage.getItem(
            "completedLessons"
        )
    ) || [];
}


// ========================================
// Get Lesson Scores
// ========================================

function getLessonScores() {

    return JSON.parse(
        localStorage.getItem(
            "lessonScores"
        )
    ) || {};
}


// ========================================
// Dashboard Update
// ========================================

function updateDashboard() {

    const completedLessons =
        getCompletedLessons();


    // ====================================
    // Lesson Progress
    // ====================================

    const completed =
        completedLessons.length;


    const progress =
        Math.round(
            (
                completed /
                TOTAL_LESSONS
            ) * 100
        );


    const portalProgress =
        document.getElementById(
            "portalProgress"
        );


    if (portalProgress) {

        portalProgress.textContent =
            toMyanmarDigit(
                progress
            );
    }


    const progressBar =
        document.getElementById(
            "progressBar"
        );


    if (progressBar) {

        progressBar.style.width =
            progress + "%";
    }


    // ====================================
    // Average Score
    // ====================================

    const lessonScores =
        getLessonScores();


    const scoreValues =
        Object.values(
            lessonScores
        );


    let average = 0;


    if (
        scoreValues.length > 0
    ) {

        const total =
            scoreValues.reduce(
                (sum, score) =>
                    sum + Number(score),
                0
            );


        average =
            Math.round(
                total /
                scoreValues.length
            );
    }


    const averageScore =
        document.getElementById(
            "averageScore"
        );


    if (averageScore) {

        averageScore.textContent =
            toMyanmarDigit(
                average
            );
    }
}


// ========================================
// Show Lesson Status
// ========================================

function showLessonStatus() {

    const completedLessons =
        getCompletedLessons();


    const lessonScores =
        getLessonScores();


    const lessonElements =
        document.querySelectorAll(
            ".lesson[data-lesson]"
        );


    lessonElements.forEach(
        lesson => {


            // =================================
            // Get Lesson ID
            // =================================

            const lessonID =
                lesson.dataset.lesson;


            // =================================
            // Find Status Element
            // =================================

            const status =
                lesson.querySelector(
                    ".lesson-status"
                );


            if (!status) {
                return;
            }


            // Remove old status classes

            lesson.classList.remove(
                "not-attempted",
                "attempted",
                "completed"
            );


            // =================================
            // Does this lesson have a score?
            // =================================

            const hasScore =
                Object.prototype
                    .hasOwnProperty
                    .call(
                        lessonScores,
                        lessonID
                    );


            // =================================
            // Is lesson completed?
            // =================================

            const isCompleted =
                completedLessons.includes(
                    lessonID
                );


            // =================================
            // COMPLETED
            // =================================

            if (isCompleted) {

                lesson.classList.add(
                    "completed"
                );


                if (hasScore) {

                    const score =
                        Number(
                            lessonScores[
                                lessonID
                            ]
                        );


                    status.innerHTML =
                        `<i class="fa-solid fa-circle-check"></i>
                        ရမှတ် ${toMyanmarDigit(score)}%
                        • ပြီးမြောက်ပြီး`;

                } else {

                    status.innerHTML =
                        `<i class="fa-solid fa-circle-check"></i>
                        ပြီးမြောက်ပြီး`;
                }


                return;
            }


            // =================================
            // ATTEMPTED BUT NOT PASSED
            // =================================

            if (hasScore) {

                const score =
                    Number(
                        lessonScores[
                            lessonID
                        ]
                    );


                const needed =
                    Math.max(
                        0,
                        PASS_PERCENTAGE -
                        score
                    );


                lesson.classList.add(
                    "attempted"
                );


                status.innerHTML =
                    `<i class="fa-solid fa-circle-exclamation"></i>
                    ရမှတ် ${toMyanmarDigit(score)}%
                    • အောင်ရန် ${toMyanmarDigit(needed)}% လိုအပ်`;


                return;
            }


            // =================================
            // NEVER ATTEMPTED
            // =================================

            lesson.classList.add(
                "not-attempted"
            );


            status.innerHTML =
                `<i class="fa-regular fa-circle"></i>
                မဖြေရသေး`;

        }
    );
}


// ========================================
// Mark Lesson Complete
// ========================================

function markLessonComplete(
    module,
    lesson
) {

    let completedLessons =
        getCompletedLessons();


    const lessonID =
        `${module}-${lesson}`;


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


    updateDashboard();

    showLessonStatus();
}


// ========================================
// Open Quiz
// ========================================

function openQuiz(
    module,
    lesson
) {

    window.location =
        `quiz.html?module=${module}&lesson=${lesson}`;
}


// ========================================
// Start Mock Test
// ========================================


// Mock Test DOES require login.

function startMockTest() {

    const loggedInUser =
        localStorage.getItem(
            "portalSession"
        );


    // User is NOT logged in
    if (!loggedInUser) {

        alert(
            "အစမ်းစာမေးပွဲဖြေဆိုရန် အကောင့်ဝင်ရန် လိုအပ်ပါသည်။"
        );


        // Go to profile login page.
        // After successful login,
        // user can be redirected to Mock Test.

        window.location.href =
            "profile.html?redirect=mock-test.html";


        return;
    }


    // User IS logged in

    window.location.href =
        "mock-test.html";
}

// ========================================
// Update Mock Test Button
// ========================================

function updateMockButton() {

    const mockBtn =
        document.getElementById(
            "mockBtn"
        );


    if (!mockBtn) return;


    const loggedInUser =
        localStorage.getItem(
            "portalSession"
        );


    // Logged in

    if (loggedInUser) {

        mockBtn.innerHTML =
            '<i class="fa-solid fa-wand-magic-sparkles"></i> အစမ်းစာမေးပွဲ စတင်ရန်';

    }


    // Not logged in

    else {

        mockBtn.innerHTML =
            '<i class="fa-solid fa-lock"></i> အကောင့်ဝင်ပြီး အစမ်းစာမေးပွဲ ဖြေဆိုရန်';
    }
}
// ========================================
// Page Load
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // Update overall percentage
        // and average score

        updateDashboard();


        // Show individual lesson
        // status

        showLessonStatus();
        updateMockButton();

    }
);
