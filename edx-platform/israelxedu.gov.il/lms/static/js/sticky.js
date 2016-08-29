
var $el = $('#sticky'),
    stickyBarTop = $('#sticky').offset().top,
    MIN_WEB_WIDTH = 768;

function initializeSticky(){
    if ($el.length) {        //Element should exist
        $(window).scroll(function(){
            if ($(window).width() >= MIN_WEB_WIDTH){
                var windowTop = $(window).scrollTop();
                if (stickyBarTop < windowTop){
                    makeSticky();
                }
                else {
                    removeSticky();
                }
            }
        });
    }
}

function makeSticky(){
    $el.css({
        'position': 'fixed',
        'top': 0,
        'width': '100%',
        'z-index': '10',
        'box-shadow': '0px 1px 5px rgba(0,0,0,0.5)'
    });
    $(".sticky-course-title").removeClass("hidden");
    $(".course-run").addClass("hidden");
}

function removeSticky(){
    $el.css({
        'position': 'static',
        'z-index': '0',
        'box-shadow': 'none'
    });
    $(".sticky-course-title").addClass("hidden");
    $(".course-run").removeClass("hidden");
}

$(document).ready(function(){
    initializeSticky();
});

$(window).resize(function(){
    if ($(window).width() >= MIN_WEB_WIDTH) {
        makeSticky();
    }
    else {
        removeSticky();
    }
});
