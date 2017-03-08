function initializeCourseSlider() {
    var isMobileResolution = $(window).width() <= 767,
        sliderExists = $('.course-slider-xs').hasClass("slick-slider");
    $(".course-card").toggleClass("slidable", isMobileResolution);
    if (isMobileResolution) {    //Second condition will avoid the multiple calls from resize
        $(".copy-meta-mobile").show();
        $(".copy-meta").hide();
        if (!sliderExists) {
            $(".course-slider-xs").slick({
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
            });
        }
    } else {
        $(".copy-meta").show();
        $(".copy-meta-mobile").hide();
        if (sliderExists) {
            $(".course-slider-xs").slick('unslick');
            $(".course-slider-xs").html();
            $(".slick-arrow, .pageInfo").hide();
        }
    }
}

function paginate(page, size, total) {
    var start = size * page,
        end = (start + size - 1) >= total ? total - 1 : (start + size - 1);
    $(".profile-item-desktop").each(function (index, item) {
        if (index >= start && index <= end) {
            $(item).css('display', 'block');
        } else {
            $(item).css('display', 'none');
        }
    });
    $(".pagination-start").text(start + 1);
    $(".pagination-end").text(end + 1);
}

$(document).ready(function () {
    initializeCourseSlider();
    $(window).resize(function () {
        initializeCourseSlider();
    });

    // Initialize instructor bio modals
    $(".instructor-image").leanModal({closeButton: ".modal_close", top: '10%'});

    // Create MutationObserver which prevents the body of
    // the page from scrolling when a modal window is displayed
    var observer = new MutationObserver(function (mutations, obv) {
        mutations.forEach(function (mutation) {
            if ($(mutation.target).css('display') === 'block') {
                $('body').css('overflow', 'hidden');
            } else {
                $('body').css('overflow', 'auto');
            }
        });
    });
    $('.modal').each(function (index, element) {
        observer.observe(element, {attributes: true, attributeFilter: ['style']});
    });

    // Custom function showing current slide
    var $status = $('.pagingInfo');
    var $slickElement = $('.course-slider-xs');

    $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        // currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        $status.text(i + ' of ' + slick.slideCount);
    });

    // Initialize FAQ
    $("ul.faq-links-list li.item").click(function () {
        if ($(this).find(".answer").hasClass('hidden')) {
            $(this).find(".answer").removeClass("hidden");
        } else {
            $(this).find(".answer").addClass("hidden");
        }
    });

    // Instructor pagination
    var page = 0,
        size = 4,
        total = parseInt($(".instructor-size").text()),
        max_pages = Math.ceil(total / size) - 1;

    paginate(page, size, total);

    $("#pagination-next").click(function () {
        if (page == max_pages) {
            return false;
        }
        if (page + 1 == max_pages) {
            $(this).removeClass("active");
        }
        page = page + 1;
        paginate(page, size, total);
        $("#pagination-previous").addClass("active");
        return false;
    });

    $("#pagination-previous").click(function () {
        if (page == 0) {
            return false;
        }
        if (page - 1 == 0) {
            $(this).removeClass("active");
        }
        page = page - 1;
        paginate(page, size, total);
        $("#pagination-next").addClass("active");
        return false;
    });

    $("#accordion-group").accordion({
        header: "> .accordion-item > .accordion-head",
        collapsible: true,
        heightStyle: "content"
    });
});