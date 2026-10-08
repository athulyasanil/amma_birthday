let currentPage = 1;
const totalPages = 8;

let currentPhoto = 1;
const totalPhotos = 12;


// =====================================================
// PHOTO QUOTES
// =====================================================

const photoQuotes = [
    "The best memories are the ones that feel like home. ❤️",

    "Some moments become precious simply because we shared them.",

    "A picture may freeze a moment, but love keeps it forever.",

    "Home has always felt a little warmer because of you.",

    "If I could keep one thing forever, it would be these little moments.",

    "Thank you for filling my childhood with memories I will always carry.",

    "Some of my happiest memories have you somewhere in them.",

    "Years may pass, but these moments will always be a part of me.",

    "You made ordinary days feel special without even trying.",

    "No matter where life takes me, these memories will always come with me.",

    "A lifetime of memories, and still so many more to make.",

    "My favourite memories will always have a little bit of you in them. ❤️"
];


// =====================================================
// PAGE NAVIGATION
// =====================================================

function showPage(pageNumber) {

    if (pageNumber < 1 || pageNumber > totalPages) {
        return;
    }

    currentPage = pageNumber;

    const pages = document.querySelectorAll(".page");

    const dots = document.querySelectorAll(".dot");


    // Remove active class from all pages

    pages.forEach(function(page) {

        page.classList.remove("active");

    });


    // Activate selected page

    const selectedPage =
        document.getElementById("page" + currentPage);

    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    // Update navigation dots

    dots.forEach(function(dot, index) {

        if (index === currentPage - 1) {

            dot.classList.add("active-dot");

        } else {

            dot.classList.remove("active-dot");

        }

    });


    // Back button

    const backButton =
        document.getElementById("backButton");


    if (currentPage === 1) {

        backButton.style.visibility = "hidden";

    } else {

        backButton.style.visibility = "visible";

    }


    // Next button

    const nextButton =
        document.getElementById("nextButton");


    if (currentPage === totalPages) {

        nextButton.style.visibility = "hidden";

    } else {

        nextButton.style.visibility = "visible";

    }


    // Restart animations on the new page

    restartPageAnimations(selectedPage);


    // Start confetti on final page

    if (currentPage === 8) {

        startConfetti();

    }

}


// =====================================================
// RESTART PAGE ANIMATIONS
// =====================================================

function restartPageAnimations(page) {

    if (!page) {
        return;
    }


    const animatedElements =
        page.querySelectorAll(
            ".reveal, .reveal-delay, .reveal-delay-2, " +
            ".reveal-delay-3, .reveal-delay-4, .reveal-delay-5"
        );


    animatedElements.forEach(function(element) {

        element.style.animation = "none";

        // Force browser to restart animation

        void element.offsetWidth;

        element.style.animation = "";

    });

}


// =====================================================
// NEXT PAGE
// =====================================================

function nextPage() {

    if (currentPage < totalPages) {

        showPage(currentPage + 1);

    }

}


// =====================================================
// PREVIOUS PAGE
// =====================================================

function previousPage() {

    if (currentPage > 1) {

        showPage(currentPage - 1);

    }

}


// =====================================================
// PHOTO SLIDESHOW
// =====================================================

function showPhoto(photoNumber) {

    if (photoNumber < 1) {

        photoNumber = totalPhotos;

    }


    if (photoNumber > totalPhotos) {

        photoNumber = 1;

    }


    currentPhoto = photoNumber;


    const photo =
        document.getElementById("memoryPhoto");

    const quote =
        document.getElementById("photoQuote");

    const number =
        document.getElementById("photoNumber");


    if (!photo || !quote || !number) {
        return;
    }


    // Fade current photo out

    photo.style.opacity = "0";

    photo.style.transform = "scale(0.96)";


    setTimeout(function() {

        // IMPORTANT:
        // Your photos are .jpeg

        photo.src =
            `/static/images/amma${currentPhoto}.jpeg`;


        quote.textContent =
            `"${photoQuotes[currentPhoto - 1]}"`;


        number.textContent =
            `${currentPhoto} / ${totalPhotos}`;


        // Fade new photo in

        photo.style.opacity = "1";

        photo.style.transform = "scale(1)";


    }, 400);

}


// =====================================================
// NEXT PHOTO
// =====================================================

function nextPhoto() {

    showPhoto(currentPhoto + 1);

}


// =====================================================
// PREVIOUS PHOTO
// =====================================================

function previousPhoto() {

    showPhoto(currentPhoto - 1);

}


// =====================================================
// AUTOMATIC PHOTO SLIDESHOW
// =====================================================

setInterval(function() {

    // Only change photos while Page 4 is open

    if (currentPage === 4) {

        nextPhoto();

    }

}, 5000);


// =====================================================
// CONFETTI
// =====================================================

function startConfetti() {

    const container =
        document.querySelector(".confetti-container");


    if (!container) {
        return;
    }


    // Don't create duplicate confetti

    if (container.children.length > 0) {
        return;
    }


    const symbols = [
        "♡",
        "✦",
        "✿",
        "♥",
        "✧",
        "❀"
    ];


    for (let i = 0; i < 55; i++) {

        const piece =
            document.createElement("span");


        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];


        piece.style.position = "absolute";


        piece.style.left =
            Math.random() * 100 + "%";


        piece.style.top = "-10%";


        piece.style.fontSize =
            (12 + Math.random() * 18) + "px";


        piece.style.opacity =
            0.35 + Math.random() * 0.65;


        piece.style.animation =
            `confettiFall ${3 + Math.random() * 4}s linear ${Math.random() * 2}s infinite`;


        container.appendChild(piece);

    }

}


// =====================================================
// KEYBOARD NAVIGATION
// =====================================================

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "ArrowRight") {

            nextPage();

        }


        if (event.key === "ArrowLeft") {

            previousPage();

        }

    }
);


// =====================================================
// SWIPE NAVIGATION FOR PHONE
// =====================================================

let touchStartX = 0;

let touchEndX = 0;


document.addEventListener(
    "touchstart",
    function(event) {

        touchStartX =
            event.changedTouches[0].screenX;

    }
);


document.addEventListener(
    "touchend",
    function(event) {

        touchEndX =
            event.changedTouches[0].screenX;


        const difference =
            touchStartX - touchEndX;


        // Swipe left → next page

        if (difference > 60) {

            nextPage();

        }


        // Swipe right → previous page

        if (difference < -60) {

            previousPage();

        }

    }
);


// =====================================================
// INITIAL WEBSITE SETUP
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        showPage(1);

        showPhoto(1);

    }
);