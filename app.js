// ========================================
// Myanmar Number
// ========================================

function toMyanmarDigit(num) {

    const myanmarDigits = [
        '၀', '၁', '၂', '၃', '၄',
        '၅', '၆', '၇', '၈', '၉'
    ];

    return num
        .toString()
        .split('')
        .map(digit => myanmarDigits[digit] || digit)
        .join('');
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
        header.querySelector("span:last-child");


    if (
        window.getComputedStyle(lesson).display
        === "block"
    ) {

        lesson.style.display = "none";

        if (arrow) {
            arrow.textContent = "▼";
        }

    } else {

        lesson.style.display = "block";

        if (arrow) {
            arrow.textContent = "▲";
        }
    }
}


// ========================================
// Total Lessons
// ========================================

const TOTAL_LESSONS = 28;


// ========================================
// Get Completed Lessons
// ========================================

function getCompletedLessons() {

    return JSON.parse(
        localStorage.getItem("completedLessons")
    ) || [];
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
            (completed / TOTAL_LESSONS) * 100
        );


    const portalProgress =
        document.getElementById(
            "portalProgress"
        );

    if (portalProgress) {

        portalProgress.textContent =
            toMyanmarDigit(progress);
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
        JSON.parse(
            localStorage.getItem("lessonScores")
        ) || {};


    const scoreValues =
        Object.values(lessonScores);


    let average = 0;


    if (scoreValues.length > 0) {

        const total =
            scoreValues.reduce(
                (sum, score) =>
                    sum + Number(score),
                0
            );


        average =
            Math.round(
                total / scoreValues.length
            );
    }


    const averageScore =
        document.getElementById(
            "averageScore"
        );


    if (averageScore) {

        averageScore.textContent =
            toMyanmarDigit(average);
    }
}


// ========================================
// Mark Lesson Complete
// ========================================

function markLessonComplete(module, lesson) {

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
}


// ========================================
// Open Quiz
// ========================================

// Normal lesson quizzes do NOT require login.

function openQuiz(module, lesson) {

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

        updateDashboard();

        updateMockButton();

    }
);
