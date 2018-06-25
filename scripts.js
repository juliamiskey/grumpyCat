console.log('connected');


const jokes = {};

jokes.getJoke = function () {
    return $.ajax({
        url: 'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'GET'
    });
};

jokes.getJokes = function (jokesToRequest) {
    // we will need to store the joke request
    const requests = [];
    // We also need to run a loop for the number of jokes the user wants
    for (let i = 0; i < jokesToRequest; i = i + 1) {

        requests.push(jokes.getJoke());
    }

    // For each jokes, push that into an Array
    //Confirm when all the jokes come back
    $.when(...requests)
        .then((...results) => {
            results = results.map((result) => {
                return result[0];
            });
            console.log(results);
        });
};


// jokes.events = function () {
//     $('form').on('submit', function (e) {
//         e.preventDefault();
//         // to store number of jokes requested in the form
//         const numberOfJokes = $('input[type=number]').val();
//         jokes.getJokes(numberOfJokes);
//     });
// };

// jokes.init = function () {
//     jokes.events();
// };

$(function () {
    jokes.init();
});

// POP UP IMAGE
window.onload = function () {
    var myCatImg = document.createElement("img");

    function setAttributes(el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }

    setAttributes(myCatImg, {
        id: "myCat",
        src:
            "styles/assets/shy-grumpy-cat.png",
        alt: "Shy Grumpy Cat"
    });
    myCatImg.style.cssText =
        "position:fixed; bottom:-360px; left:50%; width: 35vw; max-width:320px; z-index: 1000; transform-origin: 50% 50%; transition: bottom 400ms ease-in-out;";
    document.body.appendChild(myCatImg);

    var myCat = document.getElementById("myCat"),
        delayCatAnimation = 3000; 

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function showCat() {
        setTimeout(function () {
            myCat.style.bottom = "0";
        }, delayCatAnimation);
    }

    showCat();

    function showBlock() {
        setTimeout(function () {
            myCat.style.left = getRandomInt(0, 80) + "%";
            myCat.style.bottom = "0";
        }, getRandomInt(1000, 5000));
    }

    function hiddenBlock() {
        myCat.style.bottom = "-220px";
        myCat.style.transitionDelay = "100ms";
        myCat.style.transitionDuration = "250ms";

        showBlock();
    }

    myCat.addEventListener("mouseenter", hiddenBlock);
};

