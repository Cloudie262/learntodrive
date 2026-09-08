// ========================================
// MOCK RESULT LOGIN PROTECTION
// ========================================

const loggedInUser =
    localStorage.getItem(
        "portalSession"
    );


// User is not logged in

if (!loggedInUser) {

    alert(
        "အစမ်းစာမေးပွဲရလဒ်ကို ကြည့်ရှုရန် အကောင့်ဝင်ရန် လိုအပ်ပါသည်။"
    );


    window.location.replace(
        "profile.html"
    );


    // Stop JavaScript

    throw new Error(
        "Mock Test result requires login."
    );
}


// ========================================
// Get Result from URL
// ========================================

const params =
    new URLSearchParams(
        window.location.search
    );


// ========================================
// Score
// ========================================

const score =
    Number(
        params.get("score")
    ) || 0;


// ========================================
// Total Questions
// ========================================

const total =
    Number(
        params.get("total")
    ) || 50;


// ========================================
// Percentage
// ========================================

const percentage =
    Number(
        params.get("percentage")
    ) || 0;


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
// Get HTML Elements
// ========================================

const resultIcon =
    document.getElementById(
        "resultIcon"
    );


const resultTitle =
    document.getElementById(
        "resultTitle"
    );


const resultMessage =
    document.getElementById(
        "resultMessage"
    );


const scoreElement =
    document.getElementById(
        "score"
    );


const percentageElement =
    document.getElementById(
        "percentage"
    );


const statusElement =
    document.getElementById(
        "status"
    );


const retryBtn =
    document.getElementById(
        "retryBtn"
    );


const homeBtn =
    document.getElementById(
        "homeBtn"
    );


// ========================================
// Display Score
// ========================================

scoreElement.textContent =

    `${mmNumber(
        score
    )} / ${mmNumber(
        total
    )}`;


// ========================================
// Display Percentage
// ========================================

percentageElement.textContent =

    `${mmNumber(
        percentage
    )}%`;


// ========================================
// Pass / Fail
// ========================================

// Mock Test pass mark = 80%

const passMark =
    80;


// ========================================
// PASS
// ========================================

if (
    percentage >=
    passMark
) {

    resultIcon.textContent =
        "🎉";


    resultTitle.textContent =
        "အောင်မြင်ပါသည်";


    resultMessage.textContent =
        "ဂုဏ်ယူပါတယ်။ သင်သည် အစမ်းစာမေးပွဲကို အောင်မြင်စွာ ဖြေဆိုနိုင်ခဲ့ပါသည်။";


    statusElement.textContent =
        "✅ အောင်မြင်သည်";


    statusElement.className =
        "result-status pass";

}


// ========================================
// FAIL
// ========================================

else {

    resultIcon.textContent =
        "📚";


    resultTitle.textContent =
        "ထပ်မံလေ့ကျင့်ရန်လိုအပ်သည်";


    resultMessage.textContent =
        "မပူပါနှင့်။ သင်ခန်းစာများကို ပြန်လည်လေ့လာပြီး ထပ်မံဖြေဆိုနိုင်ပါသည်။";


    statusElement.textContent =
        "❌ မအောင်မြင်ပါ";


    statusElement.className =
        "result-status fail";
}


// ========================================
// Retry Mock Test
// ========================================

retryBtn.onclick =
    function () {

        window.location =
            "mock-test.html";

    };


// ========================================
// Back To Portal
// ========================================

homeBtn.onclick =
    function () {

        window.location =
            "portal.html";

    };
