// =========================================================
// settings.js
// =========================================================

(function () {

    const LANGUAGE_KEY = "learn2driveLanguage";
    const THEME_KEY = "learn2driveTheme";

    let language =
        localStorage.getItem(LANGUAGE_KEY) || "my";

    let theme =
        localStorage.getItem(THEME_KEY) || "light";

    let changingPage = false;


    // =====================================================
    // DIGITS
    // =====================================================

    const myanmarDigits = "၀၁၂၃၄၅၆၇၈၉";
    const englishDigits = "0123456789";


    function toEnglishDigits(value) {

        return String(value).replace(
            /[၀-၉]/g,
            function (digit) {

                return englishDigits[
                    myanmarDigits.indexOf(digit)
                ];

            }
        );

    }


    // =====================================================
    // TRANSLATION MAP
    // =====================================================

    const translations = new Map([

        [
            "ယာဉ်မောင်းလိုင်စင်ရေးဖြေစာမေးပွဲ လေ့ကျင့်ရေးပလက်ဖောင်း",
            "Driving Licence Theory Test Practice Platform"
        ],

        [
            "သင်ခန်းစာ တိုးတက်မှု",
            "Lesson Progress"
        ],

        [
            "သင်ခန်းစာပြီးမြောက်ထားမှု ရာခိုင်နှုန်း",
            "Percentage of Lessons Completed"
        ],

        [
            "ပျမ်းမျှရမှတ်",
            "Average Score"
        ],

        [
            "အကောင်းဆုံး ပျမ်းမျှရမှတ်",
            "Best Average Score"
        ],

        [
            "သင်ခန်းစာ ၁",
            "Module 1"
        ],

        [
            "သင်ခန်းစာ ၂",
            "Module 2"
        ],

        [
            "သင်ခန်းစာ ၃",
            "Module 3"
        ],

        [
            "သင်ခန်းစာ ၄",
            "Module 4"
        ],

        [
            "၁.၁ ယာဉ်မောင်းကောင်းတစ်ယောက်၏ အရည်အချင်းများ",
            "1.1 Qualities of a Good Driver"
        ],

        [
            "၁.၂ ယာဉ်မောင်းနှင်ခြင်းမပြုမီစစ်ဆေးရမည့်အချက်နှင့်စထွက်ခြင်း",
            "1.2 Pre-driving Checks and Moving Off"
        ],

        [
            "၁.၃ အဝေးပြေးလမ်း / အမြန်လမ်း",
            "1.3 Highways / Expressways"
        ],

        [
            "၁.၄ ရာသီဥတု / မြင်ကွင်းအခြေအနေ",
            "1.4 Weather / Visibility Conditions"
        ],

        [
            "၁.၅ မီးပွိုင့်နှင့်လမ်းဆုံတွင်လိုက်နာရမည့်အချက်များ",
            "1.5 Traffic Lights and Junction Rules"
        ],

        [
            "၁.၆ မှိုင်နှုန်း / အရှိန်",
            "1.6 Speed / Speed Limits"
        ],

        [
            "၁.၇ ရပ်ခြင်း ၊ ရပ်ဆိုင်း ၊ ရပ်နားခြင်းဆိုင်ရာလိုက်နာရမည့်အချက်များ",
            "1.7 Stopping, Standing and Parking Rules"
        ],

        [
            "၂.၁ အခြားယာဉ်၏နောက်မှ/ရှေ့မှလိုက်ခြင်း",
            "2.1 Following Other Vehicles"
        ],

        [
            "၂.၂ မျက်နှာချင်းဆိုင်ယာဉ်နှင့်တိမ်းရှောင်ခြင်း",
            "2.2 Meeting and Avoiding Oncoming Vehicles"
        ],

        [
            "၂.၃ မညီညာသောလမ်း/ရေလွှမ်းသောလမ်း/စိုစွတ်သောလမ်းတွင် မောင်းနှင်ခြင်း",
            "2.3 Driving on Uneven, Flooded or Wet Roads"
        ],

        [
            "၂.၄ ဘီး/တာယာ",
            "2.4 Wheels / Tyres"
        ],

        [
            "၂.၅ မတော်တဆမှု",
            "2.5 Accidents"
        ],

        [
            "၂.၆ အချက်ပြခြင်း/ဟွန်းတီးခြင်း/မီးအသုံးပြုခြင်း",
            "2.6 Signals, Horn and Use of Lights"
        ],

        [
            "၂.၇ အပူချိန်လွန်ကဲခြင်း",
            "2.7 Overheating"
        ],

        [
            "၃.၁ ဦးစားပေးခြင်း",
            "3.1 Giving Priority / Right of Way"
        ],

        [
            "၃.၂ ကုန်းဆင်း/တက်၊ တောင်တက်/ဆင်းလမ်း",
            "3.2 Driving Uphill and Downhill"
        ],

        [
            "၃.၃ ဂီယာအသုံးပြုခြင်း",
            "3.3 Using Gears"
        ],

        [
            "၃.၄ လီဗာအသုံးပြုခြင်း",
            "3.4 Using Levers / Controls"
        ],

        [
            "၃.၅ စတီယာရင်အသုံးပြုခြင်း",
            "3.5 Steering"
        ],

        [
            "၃.၆ လေကာမှန်/နောက်ကြည့်မှန်/နေကာ",
            "3.6 Windscreen, Mirrors and Sun Visor"
        ],

        [
            "၃.၇ ကလပ်နင်းခြင်း",
            "3.7 Using the Clutch"
        ],

        [
            "၄.၁ ဘရိတ်အသုံးပြုခြင်း",
            "4.1 Using the Brakes"
        ],

        [
            "၄.၂ ကျော်တက်ရာတွင် သတိပြုရမည့်အချက်များ",
            "4.2 Precautions When Overtaking"
        ],

        [
            "၄.၃ ယာဉ်ကွေ့ရာတွင်သတိပြုရမည့်အချက်များ",
            "4.3 Precautions When Turning"
        ],

        [
            "၄.၄ နောက်ဆုတ်ရာတွင်သတိပြုရမည့်အချက်များ",
            "4.4 Precautions When Reversing"
        ],

        [
            "၄.၅ လူကူးမျဉ်းကြား/လမ်းအသုံးပြုသူများ",
            "4.5 Pedestrian Crossings / Road Users"
        ],

        [
            "၄.၆ ဖြတ်သန်းခြင်း",
            "4.6 Passing / Crossing"
        ],

        [
            "၄.၇ ယာဉ်ကြောအတိုင်းမောင်းခြင်း/ပြောင်းခြင်း",
            "4.7 Lane Driving / Changing Lanes"
        ],

        [
            "စုစုပေါင်း အစမ်းစာမေးပွဲ",
            "Overall Mock Test"
        ],

        [
            "မေးခွန်း ၅၀ • အချိန် ၁ နာရီ ၃၀ မိနစ်",
            "50 Questions • 1 Hour 30 Minutes"
        ],

        [
            "အစမ်းစာမေးပွဲ စတင်ရန်",
            "Start Mock Test"
        ],

        [
            "ယာဉ်မောင်းလိုင်စင် အစမ်းလေ့ကျင့်ရေး",
            "Driving Licence Mock Test Practice"
        ],

        [
            "ကျန်ရှိချိန်",
            "Time Remaining"
        ],

        [
            "မေးခွန်းများ",
            "Questions"
        ],

        [
            "နောက်သို့",
            "Previous"
        ],

        [
            "နောက်မေးခွန်းသို့",
            "Next Question"
        ],

        [
            "နောက်ဆုံးမေးခွန်း",
            "Last Question"
        ],

        [
            "စာမေးပွဲတင်မည်",
            "Submit Test"
        ],

        [
            "စမ်းသပ်မှုရလဒ်",
            "Quiz Result"
        ],

        [
            "ထပ်မံကြိုးစားရန်",
            "Try Again"
        ],

        [
            "အစမ်းစာမေးပွဲ ရလဒ်",
            "Mock Test Result"
        ],

        [
            "သင်၏ အစမ်းစာမေးပွဲရလဒ်ကို အောက်တွင်ကြည့်ရှုနိုင်ပါသည်။",
            "You can view your mock test result below."
        ],

        [
            "ရမှတ်",
            "Score"
        ],

        [
            "အောင်မြင်ပါသည်",
            "Passed"
        ],

        [
            "ပြန်လည်ဖြေဆိုရန်",
            "Try Again"
        ],

        [
            "Portal သို့ပြန်သွားရန်",
            "Back to Portal"
        ],

        [
            "✅ မှန်ပါသည်",
            "✅ Correct"
        ],

        [
            "🎉 အောင်မြင်သည်",
            "🎉 Passed"
        ],

        [
            "❌ ကျရှုံးသည်",
            "❌ Failed"
        ],

        [
            "✅ အောင်မြင်သည်",
            "✅ Passed"
        ],

        [
            "❌ မအောင်မြင်ပါ",
            "❌ Failed"
        ],

        [
            "ထပ်မံလေ့ကျင့်ရန်လိုအပ်သည်",
            "More Practice Needed"
        ]

    ]);


    const reverseTranslations =
        new Map(
            Array.from(
                translations,
                function ([my, en]) {
                    return [en, my];
                }
            )
        );


    // =====================================================
    // CREATE TOOLBAR
    // =====================================================

    function createToolbar() {

    if (
        document.getElementById("l2dSettings")
    ) {
        return;
    }

    const toolbar =
        document.createElement("div");

    toolbar.id =
        "l2dSettings";

    toolbar.className =
        "l2d-settings";

    toolbar.innerHTML = `

        <div class="l2d-language-switch">

            <button
                type="button"
                id="l2dLangToggle"
                class="control-btn"
                title="Toggle language">
                🇬🇧
            </button>

        </div>

        <button
            type="button"
            id="l2dTheme"
            class="control-btn"
            title="Toggle theme">

            <span id="l2dThemeIcon">
                🌙
            </span>

        </button>

    `;

    document.body.insertBefore(
        toolbar,
        document.body.firstChild
    );

    document
        .getElementById("l2dLangToggle")
        .addEventListener(
            "click",
            function () {

                setLanguage(
                    language === "my"
                        ? "en"
                        : "my"
                );

            }
        );

    document
        .getElementById("l2dTheme")
        .addEventListener(
            "click",
            toggleTheme
        );
}


    // =====================================================
    // TEXT TRANSLATION
    // =====================================================

    function translateTextNode(node) {

        if (
            !node ||
            node.nodeType !== Node.TEXT_NODE
        ) {
            return;
        }


        if (
            node.parentElement &&
            node.parentElement.closest(
                "#l2dSettings"
            )
        ) {
            return;
        }


        const original =
            node.nodeValue;


        const clean =
            original.trim();


        if (!clean) {
            return;
        }


        let translated;


        if (language === "en") {

            translated =
                translations.get(clean);

        } else {

            translated =
                reverseTranslations.get(clean);

        }


        if (translated) {

            node.nodeValue =
                original.replace(
                    clean,
                    translated
                );

        }

    }


    function translatePageText() {

        const walker =
            document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT
            );


        const textNodes = [];

        let current;


        while (
            (current = walker.nextNode())
        ) {

            textNodes.push(current);

        }


        textNodes.forEach(
            translateTextNode
        );

    }


    // =====================================================
    // DYNAMIC TEXT
    // =====================================================

    function translateDynamicText() {

        if (language !== "en") {
            return;
        }


        const progress =
            document.getElementById(
                "progress"
            );


        if (progress) {

            progress.textContent =
                toEnglishDigits(
                    progress.textContent
                )
                .replace(
                    "မေးခွန်း",
                    "Question"
                );

        }


        const score =
            document.getElementById(
                "score"
            );


        if (score) {

            score.textContent =
                toEnglishDigits(
                    score.textContent
                )
                .replace(
                    "ရမှတ်:",
                    "Score:"
                );

        }


        const questionNumber =
            document.getElementById(
                "questionNumber"
            );


        if (questionNumber) {

            questionNumber.textContent =
                toEnglishDigits(
                    questionNumber.textContent
                )
                .replace(
                    "မေးခွန်း",
                    "Question"
                );

        }


        const answeredCount =
            document.getElementById(
                "answeredCount"
            );


        if (answeredCount) {

            answeredCount.textContent =
                toEnglishDigits(
                    answeredCount.textContent
                )
                .replace(
                    "ဖြေပြီး:",
                    "Answered:"
                );

        }


        const timer =
            document.getElementById(
                "timer"
            );


        if (timer) {

            timer.textContent =
                toEnglishDigits(
                    timer.textContent
                );

        }


        const portalProgress =
            document.getElementById(
                "portalProgress"
            );


        if (portalProgress) {

            portalProgress.textContent =
                toEnglishDigits(
                    portalProgress.textContent
                );

        }


        const averageScore =
            document.getElementById(
                "averageScore"
            );


        if (averageScore) {

            averageScore.textContent =
                toEnglishDigits(
                    averageScore.textContent
                );

        }


        const finalScore =
            document.getElementById(
                "final-score"
            );


        if (finalScore) {

            finalScore.textContent =
                toEnglishDigits(
                    finalScore.textContent
                );

        }


        const percentage =
            document.getElementById(
                "percentage"
            );


        if (percentage) {

            percentage.textContent =
                toEnglishDigits(
                    percentage.textContent
                );

        }


        const feedback =
            document.getElementById(
                "feedback"
            );


        if (feedback) {

            feedback.textContent =
                feedback.textContent
                    .replace(
                        "✅ မှန်ပါသည်",
                        "✅ Correct"
                    )
                    .replace(
                        "❌ မှားပါသည်။ အဖြေမှန် -",
                        "❌ Incorrect. Correct answer -"
                    );

        }


        const statusText =
            document.getElementById(
                "status-text"
            );


        if (statusText) {

            statusText.textContent =
                toEnglishDigits(
                    statusText.textContent
                )
                .replace(
                    "အောင်မှတ် -",
                    "Pass mark -"
                )
                .replace(
                    "အောင်မှတ်",
                    "Pass mark"
                )
                .replace(
                    "မှတ် လိုအပ်သည်",
                    "points required"
                );

        }


        const numberButtons =
            document.querySelectorAll(
                "#questionNumbers button"
            );


        numberButtons.forEach(
            function (button) {

                button.textContent =
                    toEnglishDigits(
                        button.textContent
                    );

            }
        );

    }


    // =====================================================
    // LANGUAGE
    // =====================================================

   function updateLanguageButtons() {

    const langButton =
        document.getElementById(
            "l2dLangToggle"
        );

    if (!langButton) {
        return;
    }

    langButton.textContent =
        language === "my"
            ? "🇬🇧"
            : "🇲🇲";

    langButton.title =
        language === "my"
            ? "Switch to English"
            : "Switch to Myanmar";
}


    function applyLanguage() {

        if (changingPage) {
            return;
        }


        changingPage = true;


        document.documentElement.lang =
            language === "en"
                ? "en"
                : "my";


        translatePageText();

        translateDynamicText();

        updateLanguageButtons();


        changingPage = false;

    }

function setLanguage(nextLanguage) {

    language = nextLanguage;

    localStorage.setItem(
        LANGUAGE_KEY,
        language
    );


    if (
        typeof window.updateDashboard ===
        "function"
    ) {

        window.updateDashboard();

    }


    applyLanguage();


    // Tell quiz.js that language changed
    window.dispatchEvent(
        new CustomEvent(
            "l2dLanguageChanged",
            {
                detail: {
                    language: language
                }
            }
        )
    );

}


    // =====================================================
    // THEME
    // =====================================================

    function updateThemeButton() {

        const icon =
            document.getElementById(
                "l2dThemeIcon"
            );


        if (!icon) {
            return;
        }


        icon.textContent =
            theme === "dark"
                ? "☀️"
                : "🌙";

    }


    function applyTheme() {

        document.body.classList.toggle(
            "l2d-dark",
            theme === "dark"
        );


        updateThemeButton();

    }


    function toggleTheme() {

        theme =
            theme === "dark"
                ? "light"
                : "dark";


        localStorage.setItem(
            THEME_KEY,
            theme
        );


        applyTheme();

    }


    // =====================================================
    // WATCH DYNAMIC QUIZ CONTENT
    // =====================================================

    function watchPage() {

        const observer =
            new MutationObserver(
                function () {

                    if (changingPage) {
                        return;
                    }


                    requestAnimationFrame(
                        applyLanguage
                    );

                }
            );


        observer.observe(
            document.body,
            {
                childList: true,
                subtree: true,
                characterData: true
            }
        );

    }


    // =====================================================
    // START
    // =====================================================

    function startSettings() {

        createToolbar();

        applyTheme();

        applyLanguage();

        watchPage();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            startSettings
        );

    } else {

        startSettings();

    }

})();