const params =
    new URLSearchParams(window.location.search);

const score =
    Number(params.get("score")) || 0;

const total =
    Number(params.get("total")) || 50;

const percentage =
    Number(params.get("percentage")) || 0;

const language =
    localStorage.getItem("learn2driveLanguage") || "my";


function mmNumber(number) {

    const mm =
        ["၀","၁","၂","၃","၄","၅","၆","၇","၈","၉"];

    return String(number)
        .replace(/\d/g, n => mm[n]);
}


function display(number) {

    return language === "my"
        ? mmNumber(number)
        : number;
}


document.getElementById("score").textContent =
    `${display(score)} / ${display(total)}`;

document.getElementById("percentage").textContent =
    `${display(percentage)}%`;


// Pass = 80%
if (percentage >= 80) {

    resultIcon.textContent = "🎉";

    resultTitle.textContent =
        language === "my"
        ? "အောင်မြင်ပါသည်"
        : "Congratulations!";

    resultMessage.textContent =
        language === "my"
        ? "သင်သည် အစမ်းစာမေးပွဲကို အောင်မြင်ပါသည်။"
        : "You passed the mock test.";

    status.textContent =
        language === "my"
        ? "✅ အောင်မြင်သည်"
        : "✅ Passed";

} else {

    resultIcon.textContent = "📚";

    resultTitle.textContent =
        language === "my"
        ? "ထပ်မံလေ့ကျင့်ရန်လိုအပ်သည်"
        : "More Practice Needed";

    resultMessage.textContent =
        language === "my"
        ? "သင်ခန်းစာများကို ပြန်လည်လေ့လာပါ။"
        : "Review the lessons and try again.";

    status.textContent =
        language === "my"
        ? "❌ မအောင်မြင်ပါ"
        : "❌ Failed";
}


retryBtn.onclick = () =>
    window.location = "mock-test.html";


homeBtn.onclick = () =>
    window.location = "portal.html";