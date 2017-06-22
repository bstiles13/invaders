$(document).ready(function() {


    // console.log(lives);
    // console.log(playing);
    var newScore;
    console.log(localStorage.getItem("score"));

    if (localStorage.getItem("score") === 0 || localStorage.getItem("score") === "0") {
        $('#canvas').hide();
        $('.results').hide();
    } else {
        $('.start').hide();
    }

    $('.play').on('click', function() {
        $('.start').hide();
        $('#canvas').show();
        playing = true;
        setInterval(function() {
        if (lives <= 0 && playing) {
            // Store
            localStorage.setItem("score", score);
            // Retrieve
            newScore = localStorage.getItem("score");
            console.log(newScore);
            playing = false;
            $('.results').show();
         };
        }, 200);
    });

    // $(document).on('click', '.submit-score', function() {
    //     $.post('/submit', {score: newScore}, function(data) {
    //         console.log('success');
    //         localStorage.setItem("score", 0);
    //     })
    // })

    $(document).on('click', '.again', function() {
        localStorage.setItem("score", 0);
    })





    // $(document).on('click', '.test', function() {
    //     console.log('something');
    //     console.log(user);
    // })
})