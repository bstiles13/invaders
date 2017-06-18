$(document).ready(function() {

    $('#canvas').hide();

    $('.play').on('click', function() {
        $('.play').hide();
        $('#canvas').show();
        playing = true;
    })
})