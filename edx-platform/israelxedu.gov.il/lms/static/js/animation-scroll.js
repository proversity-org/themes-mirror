$(document).ready(function () {
    $('.back-to-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, 300);
    });

    $('ul.list-divided li.item a').on('click', function(event) {
        event.preventDefault();
        var div = $(this).attr('href');
        $('html, body').animate({scrollTop: $(div).offset().top}, 300);
    });
});
