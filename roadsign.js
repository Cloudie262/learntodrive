const search = document.getElementById("search");
const cards = document.querySelectorAll(".card");
const buttons = document.querySelectorAll(".category button");

const languageToggle =
    document.getElementById("language-toggle");

const themeToggle =
    document.getElementById("theme-toggle");

const themeIcon =
    themeToggle.querySelector("i");

const themeText =
    themeToggle.querySelector("span");

let currentCategory = "all";
let currentLanguage =
    localStorage.getItem("language") || "my";

let currentTheme =
    localStorage.getItem("theme") || "light";

/* ================= TRANSLATIONS ================= */

const translations = [
    {
        myTitle: "ရပ်ပါ",
        enTitle: "Stop",

        myText:
            "ဆက်မသွားမီ ယာဉ်ကို အပြီးအပိုင် ခေတ္တရပ်တန့်ပါ။",

        enText:
            "Stop the vehicle completely before continuing."
    },

    {
        myTitle: "လူကူးမျဉ်းကျား",
        enTitle: "Pedestrian Crossing",

        myText:
            "လူကူးမျဉ်းကျား လမ်းညွှန်အမှတ်အသားသည် လူများ လမ်းဖြတ်ကူးနိုင်သော နေရာကို ညွှန်ပြသည်။",

        enText:
            "A pedestrian crossing indicates a designated area where people can safely cross the road."
    },

    {
        myTitle: "အရှိန်ကန့်သတ်ချက်",
        enTitle: "Speed Limit",

        myText:
            "ထိုလမ်းပိုင်းတွင် မောင်းနှင်ရန် ခွင့်ပြုထားသော အမြင့်ဆုံးအရှိန်ကို ညွှန်ပြသည်။",

        enText:
            "A speed limit sign indicates the maximum speed legally allowed on that road section."
    },

    {
        myTitle:
            "ကွေ့ရိုကျနျမပွုရ (U-Turn မကွေ့ရ)",

        enTitle:
            "No U-Turn",

        myText:
            "ထိုနေရာတွင် ယာဉ်များ U-Turn မကွေ့ရဟု တားမြစ်ထားကြောင်း ညွှန်ပြသည်။",

        enText:
            "U-turning is prohibited at this location."
    },

    {
        myTitle: "ဘယ်ဘက်မကွေ့ရ",
        enTitle: "No Left Turn",

        myText:
            "ထိုလမ်းဆုံ သို့မဟုတ် လမ်းခွဲတွင် ဘယ်ဘက်သို့ ကွေ့ခွင့်မရှိကြောင်း ညွှန်ပြသည်။",

        enText:
            "Left turns are prohibited at this junction or intersection."
    },

    {
        myTitle: "ကျော်မတက်ရ",
        enTitle: "No Overtaking",

        myText:
            "ထိုလမ်းပိုင်းတွင် ရှေ့ယာဉ်များကို ကျော်တက်ခွင့်မရှိကြောင်း ညွှန်ပြသည်။",

        enText:
            "Overtaking other vehicles is prohibited on this road section."
    },

    {
        myTitle: "ကားမရပ်ရ",
        enTitle: "No Parking",

        myText:
            "သတ်မှတ်ထားသော ဧရိယာတွင် ယာဉ်ရပ်တန့်ခြင်း သို့မဟုတ် ပါကင်ထိုးခြင်း မပြုရပါ။",

        enText:
            "Stopping or parking vehicles is prohibited in this area."
    },

    {
        myTitle: "လမ်းပြင်နေသည်",
        enTitle: "Road Works",

        myText:
            "ရှေ့တွင် လမ်းပြင်ဆင်ရေးလုပ်ငန်းများ ရှိသောကြောင့် အရှိန်လျှော့၍ မောင်းနှင်ပါ။",

        enText:
            "Road construction work is ahead. Slow down and drive carefully."
    },

    {
        myTitle: "အမြင့်ဆုံး အရှိန်နှုန်း",
        enTitle: "Maximum Speed",

        myText:
            "မောင်းနှင်ရန် ခွင့်ပြုထားသော အမြင့်ဆုံး အရှိန်နှုန်း ဖြစ်သည်။",

        enText:
            "The maximum speed permitted for driving."
    },

    {
        myTitle: "နှစ်ဖက်သွား လမ်း",
        enTitle: "Two-Way Traffic",

        myText:
            "လမ်းတွင် ယာဉ်များ နှစ်ဖက်စလုံးသို့ မောင်းနှင်မည်ဖြစ်ကြောင်း ညွှန်ပြသည်။",

        enText:
            "Vehicles will travel in both directions on this road."
    },

    {
        myTitle: "ဟွန်းမတီးရ",
        enTitle: "No Horn",

        myText:
            "ထိုဧရိယာအတွင်း ဟွန်းတီးခွင့် မရှိကြောင်း ညွှန်ပြသည်။",

        enText:
            "Using the horn is prohibited in this area."
    },

    {
        myTitle: "ကားရပ်နားရန်နေရာ",
        enTitle: "Parking",

        myText:
            "သတ်မှတ်ထားသော ဧရိယာတွင် ယာဉ်များကို ရပ်နားခွင့်ပြုကြောင်း ညွှန်ပြသည်။",

        enText:
            "Vehicles are allowed to stop and park in this designated area."
    },

    {
        myTitle: "စားသောက်ဆိုင်",
        enTitle: "Restaurant",

        myText:
            "အစားအသောက်များ ရရှိနိုင်သော စားသောက်ဆိုင် အနီးအနားတွင် ရှိသည်။",

        enText:
            "A restaurant serving food and drinks is nearby."
    },

    {
        myTitle: "သန့်စင်ခန်း",
        enTitle: "Restroom",

        myText:
            "အများသုံး အိမ်သာနှင့် သန့်စင်ခန်းများ အနီးအနားတွင် ရှိကြောင်း ညွှန်ပြသည်။",

        enText:
            "Public restrooms are available nearby."
    },

    {
        myTitle: "ဟိုတယ်",
        enTitle: "Hotel",

        myText:
            "ခရီးသွားများ တည်းခိုရန် ဟိုတယ်များ အနီးအနားတွင် ရှိကြောင်း ညွှန်ပြသည်။",

        enText:
            "Hotels or accommodation are available nearby."
    },

    {
        myTitle: "ဆေးရုံ",
        enTitle: "Hospital",

        myText:
            "ဆေးရုံ သို့မဟုတ် ဆေးခန်းများ အနီးအနားတွင် ရှိကြောင်း ညွှန်ပြသည်။",

        enText:
            "A hospital or clinic is available nearby."
    },

    {
        myTitle: "အရေးပေါ် ဖုန်းလိုင်း",
        enTitle: "Emergency Hotline",

        myText:
            "အရေးပေါ် အကူအညီတောင်းခံနိုင်သော ဖုန်းဝန်ဆောင်မှု ရှိကြောင်း ညွှန်ပြသည်။",

        enText:
            "An emergency telephone service is available nearby."
    },

    {
        myTitle: "လူကူးလမ်း",
        enTitle: "Pedestrian Crossing",

        myText:
            "လူများ ဘေးကင်းစွာ လမ်းဖြတ်ကူးနိုင်သည့် သတ်မှတ်ထားသော လူကူးဧရိယာ ဖြစ်သည်။",

        enText:
            "A designated pedestrian area for safely crossing the road."
    },

    {
        myTitle: "ရှေ့တွင် ဘယ်ဘက်သို့ ကွေ့ရန်ရှိသည်",
        enTitle: "Left Turn Ahead",

        myText:
            "ရှေ့တွင် ဘယ်ဘက်သို့ ကွေ့ရမည်ဖြစ်သောကြောင့် အရှိန်လျှော့၍ ပြင်ဆင်မောင်းနှင်ပါ။",

        enText:
            "A left turn is ahead. Slow down and prepare to turn."
    },

    {
        myTitle: "ရှေ့တွင် ညာဘက် လမ်းကွေးရှိသည်",
        enTitle: "Right Curve Ahead",

        myText:
            "မကြာမီ လမ်းသည် ညာဘက်သို့ ကွေးသွားမည်ဖြစ်၍ အရှိန်လျှော့မောင်းနှင်ပါ။",

        enText:
            "The road curves right ahead. Slow down and drive carefully."
    },

    {
        myTitle: "မိုးရွာလျှင် လမ်းချော်နိုင်သည်",
        enTitle: "Slippery When Wet",

        myText:
            "ရေစိုသောအခြေအနေတွင် လမ်းမျက်နှာပြင် ချောနေနိုင်သောကြောင့် အရှိန်လျှော့ပါ။",

        enText:
            "The road may be slippery when wet. Slow down."
    },

    {
        myTitle: "ရှေ့တွင် မီးပွိုင့်ရှိသည်",
        enTitle: "Traffic Lights Ahead",

        myText:
            "ရှေ့တွင် မီးပွိုင့်ရှိသောကြောင့် အရှိန်လျှော့ပြီး ရပ်တန့်ရန် ပြင်ဆင်ပါ။",

        enText:
            "Traffic lights are ahead. Slow down and prepare to stop."
    },

    {
        myTitle: "ရှေ့တွင် လမ်းကျဉ်းမည်",
        enTitle: "Road Narrows Ahead",

        myText:
            "ရှေ့တွင် လမ်းအကျယ် ကျဉ်းသွားမည်ဖြစ်၍ အရှိန်လျှော့ပြီး သတိပြုမောင်းနှင်ပါ။",

        enText:
            "The road narrows ahead. Slow down and drive carefully."
    },

    {
        myTitle: "အဝိုင်းပတ် လမ်းဆုံ",
        enTitle: "Roundabout",

        myText:
            "ရှေ့တွင် အဝိုင်းပတ်ရှိသောကြောင့် အရှိန်လျှော့ပြီး သတိပြုမောင်းနှင်ပါ။",

        enText:
            "A roundabout is ahead. Slow down and drive carefully."
    },

    {
        myTitle: "အကြံပြု အရှိန်နှုန်း",
        enTitle: "Advisory Speed",

        myText:
            "လမ်းကွေး သို့မဟုတ် အန္တရာယ်ရှိသောနေရာများတွင် မောင်းနှင်ရန် အကြံပြုထားသော အရှိန်နှုန်း ဖြစ်သည်။",

        enText:
            "The recommended safe speed for curves or hazardous road conditions."
    }
];

/* ================= INITIAL ORIGINAL TEXT ================= */

const originalCards = [];

cards.forEach((card) => {
    const title = card.querySelector("h3");
    const paragraph = card.querySelector("p");

    originalCards.push({
        title: title.textContent,
        paragraph: paragraph.textContent
    });
});

/* ================= SEARCH AND FILTER ================= */

function filterCards() {
    const value = search.value
        .trim()
        .toLowerCase();

    cards.forEach((card) => {
        const cardText = card.textContent.toLowerCase();

        const category = (
            card.dataset.category || ""
        ).toLowerCase();

        const matchesSearch =
            cardText.includes(value);

        const matchesCategory =
            currentCategory === "all" ||
            category === currentCategory;

        card.style.display =
            matchesSearch && matchesCategory
                ? ""
                : "none";
    });
}

search.addEventListener(
    "input",
    filterCards
);

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        buttons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        currentCategory =
            button.dataset.filter.toLowerCase();

        filterCards();
    });
});

/* ================= TRANSLATION ================= */

function updateLanguage() {
    const title = document.querySelector(".title h1");
    const description = document.querySelector(".title p");
    const tipTitle = document.querySelector(".tip-text h3");
    const tipParagraph = document.querySelector(".tip-text p");

    if (currentLanguage === "en") {
        title.textContent =
            "Road Traffic Signs";

        description.textContent =
            "Study the road signs before taking the driving license examination.";

        search.placeholder =
            "Search road signs...";

        buttons[0].textContent = "All";
        buttons[1].textContent = "Warnings";
        buttons[2].textContent = "Regulatory";
        buttons[3].textContent = "Guide";

        tipTitle.textContent =
            "Safe Driving Tip";

        tipParagraph.textContent =
            "Understanding road signs is the first step toward becoming a safe and responsible driver.";

        cards.forEach((card, index) => {
            const translation =
                translations[index];

            if (!translation) {
                return;
            }

            card.querySelector("h3").textContent =
                translation.enTitle;

            card.querySelector("p").textContent =
                translation.enText;
        });

        languageToggle.textContent =
            "မြန်မာ";
    } else {
        title.textContent =
            "ယာဉ်စည်းကမ်း လမ်းညွှန်အမှတ်အသားများ";

        description.textContent =
            "ယာဉ်မောင်းလိုင်စင် စာမေးပွဲ မဖြေဆိုမီ လမ်းညွှန်အမှတ်အသားများကို လေ့လာပါ။";

        search.placeholder =
            "လမ်းညွှန်အမှတ်အသားများ ရှာဖွေရန်...";

        buttons[0].textContent = "အားလုံး";
        buttons[1].textContent = "သတိပေးချက်များ";
        buttons[2].textContent = "စည်းကမ်းချက်များ";
        buttons[3].textContent = "လမ်းညွှန်ချက်များ";

        tipTitle.textContent =
            "ဘေးကင်းစွာ မောင်းနှင်ရေး အကြံပြုချက်";

        tipParagraph.textContent =
            "ယာဉ်စည်းကမ်း လမ်းညွှန်အမှတ်အသားများကို နားလည်သဘောပေါက်ခြင်းသည် ဘေးကင်းပြီး တာဝန်သိသော ယာဉ်မောင်းတစ်ဦး ဖြစ်လာစေရန် ပထမခြေလှမ်း ဖြစ်သည်။";

        cards.forEach((card, index) => {
            const original =
                originalCards[index];

            card.querySelector("h3").textContent =
                original.title;

            card.querySelector("p").textContent =
                original.paragraph;
        });

        languageToggle.textContent =
            "English";
    }

    localStorage.setItem(
        "language",
        currentLanguage
    );

    updateThemeButton();
    filterCards();
}

languageToggle.addEventListener(
    "click",
    () => {
        currentLanguage =
            currentLanguage === "my"
                ? "en"
                : "my";

        updateLanguage();
    }
);

/* ================= THEME ================= */

function updateThemeButton() {
    document.documentElement.dataset.theme =
        currentTheme;

    if (currentTheme === "dark") {
        themeIcon.className =
            "fa-solid fa-sun";

        themeText.textContent =
            currentLanguage === "my"
                ? "အလင်း"
                : "Light";
    } else {
        themeIcon.className =
            "fa-solid fa-moon";

        themeText.textContent =
            currentLanguage === "my"
                ? "အမှောင်"
                : "Dark";
    }
}

themeToggle.addEventListener(
    "click",
    () => {
        currentTheme =
            currentTheme === "light"
                ? "dark"
                : "light";

        localStorage.setItem(
            "theme",
            currentTheme
        );

        updateThemeButton();
    }
);

/* ================= CARD SELECT ================= */

cards.forEach((card) => {
    card.addEventListener("click", () => {
        cards.forEach((item) => {
            item.classList.remove("selected");
        });

        card.classList.add("selected");
    });
});

/* ================= MODAL ================= */

const modalHTML = `
    <div id="card-modal" class="modal-overlay">

        <div class="modal-content">

            <button
                class="modal-close"
                type="button">
                &times;
            </button>

            <div
                id="modal-card-content"
                class="card modal-card">
            </div>

        </div>

    </div>
`;

document.body.insertAdjacentHTML(
    "beforeend",
    modalHTML
);

const modal =
    document.getElementById("card-modal");

const modalBody =
    document.getElementById(
        "modal-card-content"
    );

const modalClose =
    document.querySelector(".modal-close");

cards.forEach((card) => {
    card.addEventListener(
        "dblclick",
        () => {
            modalBody.innerHTML =
                card.innerHTML;

            modal.classList.add("show");
            document.body.classList.add(
                "modal-open"
            );
        }
    );
});

function closeModal() {
    modal.classList.remove("show");
    document.body.classList.remove(
        "modal-open"
    );
}

modalClose.addEventListener(
    "click",
    closeModal
);

modal.addEventListener(
    "click",
    (event) => {
        if (event.target === modal) {
            closeModal();
        }
    }
);

document.addEventListener(
    "keydown",
    (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    }
);

/* ================= FIRST LOAD ================= */

document.documentElement.dataset.theme =
    currentTheme;

updateLanguage();
updateThemeButton();
filterCards();