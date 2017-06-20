$(document).ready(function() {

    $('#canvas').hide();

    $('.play').on('click', function() {
        $('.play').hide();
        $('#canvas').show();
        playing = true;
    })

    // $(document).on('click', '.test', function() {
    //     console.log('something');
    //     console.log(user);
    // })
})