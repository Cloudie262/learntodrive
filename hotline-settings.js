// ================================================
// LEARN2DRIVE HOTLINE SETTINGS
// Myanmar / English
// Light / Dark Mode
// ================================================

(function () {

    // ============================================
    // STORAGE KEYS
    // ============================================

    const LANGUAGE_KEY = "learn2driveLanguage";
    const THEME_KEY = "learn2driveTheme";


    // ============================================
    // GET SAVED SETTINGS
    // ============================================

    let language =
        localStorage.getItem(LANGUAGE_KEY) || "my";

    let theme =
        localStorage.getItem(THEME_KEY) || "light";


    // ============================================
    // UPDATE LANGUAGE BUTTON
    // ============================================

    function updateLanguageButton() {

        const langButton =
            document.getElementById("l2dLangToggle");

        if (!langButton) {
            return;
        }

        if (language === "en") {

            langButton.textContent = "🇲🇲";

            langButton.setAttribute(
                "aria-label",
                "Switch to Myanmar language"
            );

            langButton.setAttribute(
                "title",
                "Myanmar"
            );

        } else {

            langButton.textContent = "🇬🇧";

            langButton.setAttribute(
                "aria-label",
                "Switch to English language"
            );

            langButton.setAttribute(
                "title",
                "English"
            );

        }
    }


    // ============================================
    // APPLY LANGUAGE
    // ============================================

    function applyLanguage() {

        const elements =
            document.querySelectorAll(
                "[data-my][data-en]"
            );

        elements.forEach(function (element) {

            if (language === "en") {

                element.textContent =
                    element.dataset.en;

            } else {

                element.textContent =
                    element.dataset.my;

            }

        });


        document.documentElement.lang =
            language === "en"
                ? "en"
                : "my";


        document.title =
            language === "en"
                ? "Hotline for Drivers"
                : "ယာဉ်မောင်းသူများအတွက် Hotline";


        updateLanguageButton();
    }


    // ============================================
    // SET LANGUAGE
    // ============================================

    function setLanguage(nextLanguage) {

        language = nextLanguage;

        localStorage.setItem(
            LANGUAGE_KEY,
            language
        );

        applyLanguage();
    }


    // ============================================
    // TOGGLE LANGUAGE
    // ============================================

    function toggleLanguage() {

        if (language === "my") {

            setLanguage("en");

        } else {

            setLanguage("my");

        }
    }


    // ============================================
    // UPDATE THEME ICON
    // ============================================

    function updateThemeIcon() {

        const icon =
            document.getElementById(
                "l2dThemeIcon"
            );

        if (!icon) {
            return;
        }

        if (theme === "dark") {

            icon.textContent = "☀️";

        } else {

            icon.textContent = "🌙";

        }
    }


    // ============================================
    // APPLY THEME
    // ============================================

    function applyTheme() {

        document.body.classList.toggle(
            "l2d-dark",
            theme === "dark"
        );

        updateThemeIcon();
    }


    // ============================================
    // TOGGLE THEME
    // ============================================

    function toggleTheme() {

        if (theme === "dark") {

            theme = "light";

        } else {

            theme = "dark";

        }

        localStorage.setItem(
            THEME_KEY,
            theme
        );

        applyTheme();
    }


    // ============================================
    // START SETTINGS
    // ============================================

    function startSettings() {

        const langButton =
            document.getElementById(
                "l2dLangToggle"
            );

        const themeButton =
            document.getElementById(
                "l2dThemeBtn"
            );


        // LANGUAGE BUTTON
        if (langButton) {

            langButton.addEventListener(
                "click",
                function () {

                    toggleLanguage();

                }
            );

        }


        // THEME BUTTON
        if (themeButton) {

            themeButton.addEventListener(
                "click",
                function () {

                    toggleTheme();

                }
            );

        }


        applyTheme();
        applyLanguage();
    }


    // ============================================
    // PAGE LOAD
    // ============================================

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            startSettings
        );

    } else {

        startSettings();

    }

})();