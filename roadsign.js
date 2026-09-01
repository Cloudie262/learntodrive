const search = document.getElementById("search");

const cards = document.querySelectorAll(".card");

const buttons = document.querySelectorAll(".category button");

let currentCategory = "all";



// ------------------ SEARCH ------------------

search.addEventListener("keyup", function () {

    let value = search.value.toLowerCase();

    cards.forEach(card => {

        let title = card.querySelector("h3").textContent.toLowerCase();

        let category = card.dataset.category;

        let matchTitle = title.includes(value);

        let matchCategory =
            currentCategory === "all" ||
            category === currentCategory;

        if (matchTitle && matchCategory) {

            card.style.display = "block";

        }

        else {

            card.style.display = "none";

        }

    });

});



// ------------------ FILTER ------------------

buttons.forEach(button => {

    button.addEventListener("click", function () {

        buttons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        currentCategory = button.dataset.filter;

        let value = search.value.toLowerCase();

        cards.forEach(card => {

            let title = card.querySelector("h3").textContent.toLowerCase();

            let category = card.dataset.category;

            let matchTitle = title.includes(value);

            let matchCategory =
                currentCategory === "all" ||
                category === currentCategory;

            if (matchTitle && matchCategory) {

                card.style.display = "block";

            }

            else {

                card.style.display = "none";

            }

        });

    });

});