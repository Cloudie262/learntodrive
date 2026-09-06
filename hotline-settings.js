// ================================================
// LEARN2DRIVE HOTLINE SETTINGS
// Myanmar / English
// Light / Dark Mode
// ================================================

(function () {


    // ============================================
    // STORAGE KEYS
    // ============================================

    const LANGUAGE_KEY =
        "learn2driveLanguage";

    const THEME_KEY =
        "learn2driveTheme";



    // ============================================
    // GET SAVED SETTINGS
    // ============================================

    let language =
        localStorage.getItem(
            LANGUAGE_KEY
        ) || "my";


    let theme =
        localStorage.getItem(
            THEME_KEY
        ) || "light";



    // ============================================
    // LANGUAGE BUTTONS
    // ============================================

    function updateLanguageButtons() {


        const myButton =
            document.getElementById(
                "l2dMy"
            );


        const enButton =
            document.getElementById(
                "l2dEn"
            );



        if (myButton) {

            myButton.classList.toggle(

                "active",

                language === "my"

            );

        }



        if (enButton) {

            enButton.classList.toggle(

                "active",

                language === "en"

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



        elements.forEach(
            function (element) {


                if (
                    language === "en"
                ) {

                    element.textContent =
                        element.dataset.en;

                }

                else {

                    element.textContent =
                        element.dataset.my;

                }


            }
        );



        document.documentElement.lang =

            language === "en"

                ? "en"

                : "my";



        document.title =

            language === "en"

                ? "Hotline for Drivers"

                : "ယာဉ်မောင်းသူများအတွက် Hotline";



        updateLanguageButtons();


    }



    // ============================================
    // CHANGE LANGUAGE
    // ============================================

    function setLanguage(
        nextLanguage
    ) {


        language =
            nextLanguage;



        localStorage.setItem(

            LANGUAGE_KEY,

            language

        );



        applyLanguage();


    }



    // ============================================
    // THEME ICON
    // ============================================

    function updateThemeIcon() {


        const icon =
            document.getElementById(
                "l2dThemeIcon"
            );


        if (!icon) {

            return;

        }



        if (
            theme === "dark"
        ) {

            icon.textContent =
                "☀️";

        }

        else {

            icon.textContent =
                "🌙";

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


        if (
            theme === "dark"
        ) {

            theme =
                "light";

        }

        else {

            theme =
                "dark";

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


        const myButton =
            document.getElementById(
                "l2dMy"
            );


        const enButton =
            document.getElementById(
                "l2dEn"
            );


        const themeButton =
            document.getElementById(
                "l2dThemeBtn"
            );



        // Myanmar button

        if (myButton) {

            myButton.addEventListener(

                "click",

                function () {

                    setLanguage(
                        "my"
                    );

                }

            );

        }



        // English button

        if (enButton) {

            enButton.addEventListener(

                "click",

                function () {

                    setLanguage(
                        "en"
                    );

                }

            );

        }



        // Theme button

        if (themeButton) {

            themeButton.addEventListener(

                "click",

                function () {

                    toggleTheme();

                }

            );

        }



        // Apply saved settings

        applyTheme();

        applyLanguage();


    }



    // ============================================
    // PAGE LOAD
    // ============================================

    if (
        document.readyState ===
        "loading"
    ) {


        document.addEventListener(

            "DOMContentLoaded",

            startSettings

        );


    }

    else {


        startSettings();


    }


})();