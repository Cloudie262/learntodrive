(function () {


    const LANGUAGE_KEY =
        "learn2driveLanguage";


    const THEME_KEY =
        "learn2driveTheme";



    let language =
        localStorage.getItem(
            LANGUAGE_KEY
        ) || "en";


    let theme =
        localStorage.getItem(
            THEME_KEY
        ) || "light";



    // ==========================================
    // APPLY LANGUAGE
    // ==========================================

    function applyLanguage() {


        const elements =
            document.querySelectorAll(
                "[data-my][data-en]"
            );


        elements.forEach(
            function(element) {


                if (
                    language === "my"
                ) {

                    element.textContent =
                        element.dataset.my;

                }

                else {

                    element.textContent =
                        element.dataset.en;

                }


            }
        );



        document.documentElement.lang =

            language === "my"

                ? "my"

                : "en";



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



    // ==========================================
    // SET LANGUAGE
    // ==========================================

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


        window.dispatchEvent(

            new CustomEvent(

                "l2dLanguageChanged",

                {

                    detail: {

                        language:
                            language

                    }

                }

            )

        );


    }



    // ==========================================
    // APPLY THEME
    // ==========================================

    function applyTheme() {


        document.body.classList.toggle(

            "l2d-dark",

            theme === "dark"

        );



        const icon =
            document.getElementById(
                "l2dThemeIcon"
            );



        if (icon) {

            icon.textContent =

                theme === "dark"

                    ? "☀️"

                    : "🌙";

        }


    }



    // ==========================================
    // TOGGLE THEME
    // ==========================================

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



    // ==========================================
    // START
    // ==========================================

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



        if (myButton) {

            myButton.addEventListener(

                "click",

                function() {

                    setLanguage(
                        "my"
                    );

                }

            );

        }



        if (enButton) {

            enButton.addEventListener(

                "click",

                function() {

                    setLanguage(
                        "en"
                    );

                }

            );

        }



        if (themeButton) {

            themeButton.addEventListener(

                "click",

                toggleTheme

            );

        }



        applyTheme();

        applyLanguage();


    }



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