// Load after question.js, question-translation.js, the page script and setting.js.
(() => {
  "use strict";
  window.l2dQuizTranslation = true;
  const key = "learn2driveLanguage";
  let language = localStorage.getItem(key) === "en" ? "en" : "my";
  const source = new WeakMap();
  if (typeof quizzes !== "undefined") {
    Object.entries(quizzes).forEach(([lesson, list]) => {
      list.forEach((question, index) => source.set(question, { lesson, index }));
    });
  }
  const choose = (my, en) => language === "my" ? my : en;
  const number = value => language === "my"
    ? String(value).replace(/\d/g, d => "၀၁၂၃၄၅၆၇၈၉"[d])
    : String(value);
  function set(selector, value) {
    const element = document.querySelector(selector);
    if (!element) return;
    const icon = element.querySelector(":scope > i");
    if (!icon) {
      if (element.textContent !== value) element.textContent = value;
      return;
    }
    const text = " " + value;
    const nodes = [...element.childNodes].filter(node => node !== icon);
    if (nodes.map(node => node.textContent).join("") === text) return;
    nodes.forEach(node => node.remove());
    element.appendChild(document.createTextNode(text));
  }
  function translated(question) {
    const location = source.get(question);
    if (language !== "en" || !location || typeof quizTranslations === "undefined") return question;
    const entry = quizTranslations[location.lesson]?.[location.index];
    return entry ? { ...question, question: entry.question, options: entry.options } : question;
  }
  function render() {
    document.documentElement.lang = language;
    if (document.getElementById("quiz-page") && typeof quizQuestions !== "undefined") {
      const q = quizQuestions[currentQuestion];
      set("#next-btn", choose("နောက်မေးခွန်းသို့", "Next question"));
      set("#restart-btn", choose("ထပ်မံကြိုးစားရန်", "Try again"));
      set("#back-btn", choose("Portal သို့ပြန်သွားရန်", "Back to Portal"));
      set("#result-page > h1", choose("စမ်းသပ်မှုရလဒ်", "Test result"));
      if (q) {
        const view = translated(q);
        set("#question", view.question);
        document.querySelectorAll("#options .option-btn").forEach((button, i) => {
          if (button.textContent !== view.options[i]) button.textContent = view.options[i];
        });
        set("#progress", choose("မေးခွန်း ", "Question ") + number(currentQuestion + 1) + " / " + number(quizQuestions.length));
        set("#score", choose("ရမှတ်: ", "Score: ") + number(score));
        if (answered) {
          const wrong = document.querySelector("#options .wrong");
          set("#feedback", wrong
            ? choose("❌ မှားပါသည်။ အဖြေမှန် - ", "❌ Incorrect. Correct answer - ") + view.options[q.answer]
            : choose("✅ မှန်ပါသည်", "✅ Correct"));
        }
      } else if (!quizQuestions.length) {
        set("#question", choose("ဒီသင်ခန်းစာအတွက် မေးခွန်းများ မရှိသေးပါ။", "No questions are available for this lesson."));
      }
      if (!document.getElementById("result-page").classList.contains("hidden") && quizQuestions.length) {
        const total = quizQuestions.length;
        const pass = Math.ceil(total * 0.8);
        set("#final-score", number(score) + " / " + number(total));
        set("#percentage", number(Math.round(score / total * 100)) + "%");
        set("#result-title", score >= pass ? choose("🎉 အောင်မြင်သည်", "🎉 Passed") : choose("❌ ကျရှုံးသည်", "❌ Failed"));
        set("#status-text", score >= pass
          ? choose("အောင်မှတ် - ", "Pass mark - ") + number(pass) + " / " + number(total)
          : choose("အောင်မှတ် ", "You need ") + number(pass) + choose(" မှတ် လိုအပ်သည်", " marks to pass"));
      }
    }
    if (document.getElementById("mockQuestion") && typeof mockQuestions !== "undefined") {
      const q = mockQuestions[currentQuestion];
      if (q) {
        const view = translated(q);
        set("#mockQuestion", view.question);
        document.querySelectorAll("#mockOptions button").forEach((button, i) => {
          if (button.textContent !== view.options[i]) button.textContent = view.options[i];
        });
      }
      set(".mock-header h1", choose("စုစုပေါင်း အစမ်းစာမေးပွဲ", "Full mock test"));
      set(".mock-header p", choose("ယာဉ်မောင်းလိုင်စင် အစမ်းလေ့ကျင့်ရေး", "Driving licence practice test"));
      set(".timer-box span", choose("ကျန်ရှိချိန်", "Time remaining"));
      set("#questionNumber", choose("မေးခွန်း ", "Question ") + number(currentQuestion + 1) + " / " + number(mockQuestions.length));
      set("#answeredCount", choose("ဖြေပြီး: ", "Answered: ") + number(answers.filter(a => a !== null).length) + " / " + number(mockQuestions.length));
      set("#previousBtn", choose("နောက်သို့", "Previous"));
      set("#nextBtn", currentQuestion === mockQuestions.length - 1
        ? choose("နောက်ဆုံးမေးခွန်း", "Last question") : choose("နောက်မေးခွန်းသို့", "Next question"));
      set(".question-navigation h3", choose("မေးခွန်းများ", "Questions"));
      set("#submitBtn", choose("စာမေးပွဲတင်မည်", "Submit test"));
      document.querySelectorAll("#questionNumbers button").forEach((button, i) => {
        if (button.textContent !== number(i + 1)) button.textContent = number(i + 1);
      });
      const h = Math.floor(timeLeft / 3600);
      const m = String(Math.floor(timeLeft % 3600 / 60)).padStart(2, "0");
      const s = String(timeLeft % 60).padStart(2, "0");
      set("#timer", number(h) + ":" + number(m) + ":" + number(s));
    }
    if (document.getElementById("resultTitle") && typeof percentage !== "undefined") {
      const passed = percentage >= 80;
      set("#resultTitle", passed ? choose("အောင်မြင်ပါသည်", "Passed") : choose("ထပ်မံလေ့ကျင့်ရန်လိုအပ်သည်", "More practice needed"));
      set("#resultMessage", passed
        ? choose("ဂုဏ်ယူပါတယ်။ သင်သည် အစမ်းစာမေးပွဲကို အောင်မြင်စွာ ဖြေဆိုနိုင်ခဲ့ပါသည်။", "Congratulations! You passed the mock test.")
        : choose("မပူပါနှင့်။ သင်ခန်းစာများကို ပြန်လည်လေ့လာပြီး ထပ်မံဖြေဆိုနိုင်ပါသည်။", "Review the lessons and try again."));
      set("#score", number(score) + " / " + number(total));
      set("#percentage", number(percentage) + "%");
      set("#status", passed ? choose("✅ အောင်မြင်သည်", "✅ Passed") : choose("❌ မအောင်မြင်ပါ", "❌ Failed"));
      set(".result-score small", choose("ရမှတ်", "Score"));
      set("#retryBtn", choose("ပြန်လည်ဖြေဆိုရန်", "Try again"));
      set("#homeBtn", choose("Portal သို့ပြန်သွားရန်", "Back to Portal"));
    }
  }
  const observer = new MutationObserver(refresh);
  function refresh() {
    observer.disconnect();
    try { render(); }
    finally { observer.observe(document.body, { childList: true, subtree: true, characterData: true }); }
  }
  window.addEventListener("l2dLanguageChanged", event => {
    language = event.detail?.language === "my" ? "my" : "en";
    localStorage.setItem(key, language);
    refresh();
  });
  window.addEventListener("storage", event => {
    if (event.key === key) {
      language = event.newValue === "my" ? "my" : "en";
      refresh();
    }
  });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", refresh);
  else refresh();
})();
