$(function(){

    var $links = $('.menu a'),
        heading = $('h2'),
        button = $(".scrollTop"),
        mh = $('.menu').height();

    $links.on('click', function(e){
        e.preventDefault();

        $links.removeClass('active');
        var selector = $(this).addClass('active').attr('href');
        var $target = $(selector);

        if($target.length > 0){
            $('html,body').animate({
                scrollTop: $target.offset().top - mh - 20
            }, 500);
        }
    });

    /* 1. Сделать кнопку для скроллинга страницы вверх. */
    /* 2. (*) Дописать код в пример 6_scroll так, чтобы при скролле менялось выделение активного пункта меню в шапке. */
    button.on('click', function(){
        $('html,body').animate({
            scrollTop: 0
        }, 1500);
        return false;
    });

    $(window).on('scroll', function(){
        showButton();
        showActiveLink();
    });

    showButton();
    showActiveLink();

    function showButton(){
        ($(window).scrollTop() > 400) ? button.fadeIn(600) : button.hide();
    }

    function showActiveLink() {
        heading.each(function (i, elem) {
            if ($(window).scrollTop() > $(elem).offset().top - 300) {
                $links.removeClass('active');
                $links.eq(i).addClass('active')
            }
        });
    }

    /* 3. Внедрить в слайдер фотографий анимацию смены картинок с помощью jquery animate. Либо перепишите свой слайдер на jQuery, либо стартуйте с примера 7_slider_hw. */
    new Slider({
        container: '.gallery-1',
        images: '.photos img',
        btn_prev: '.buttons .prev',
        btn_next: '.buttons .next',
        autoplay: true,
        interval: 3000
    });

    function Slider(options){
        var images = $(options.container + ' ' + options.images),
            btn_prev = $(options.container + ' ' + options.btn_prev),
            btn_next = $(options.container + ' ' + options.btn_next),
            count = images.length,
            i = 0;

        images.first().css({opacity: 1});

        btn_prev.on('click', prev);
        btn_next.on('click', next);

        if (options.autoplay == true) {
            setInterval(next, (typeof(options.interval) === 'number' && options.interval > 0) ? options.interval : 1000);
        }

        function prev() {
            images.eq(i).css({
                            right: 0,
                            bottom: 0,
                            left: 'auto',
                            top: 'auto'
                        })
                        .animate({
                            opacity: 0,
                            width: 0
                        }, 1000);
            i--;

            if (i < 0) {
                i = count - 1;
            }

            images.eq(i).css({
                            opacity: 1,
                            width: 0,
                            left: 0,
                            top: 0,
                            right: 'auto',
                            bottom: 'auto'
                        })
                        .animate({
                            width: '100%'
                        }, 1000);
        }

        function next() {
            images.eq(i).css({
                            left: 0,
                            top: 0,
                            right: 'auto',
                            bottom: 'auto'
                        })
                        .animate({
                            opacity: 0,
                            width: 0
                        }, 1000);
            i++;

            if (i >= count) {
                i = 0;
            }

            images.eq(i).css({
                            opacity: 1,
                            width: 0,
                            right: 0,
                            bottom: 0,
                            left: 'auto',
                            top: 'auto'
                        })
                        .animate({
                            width: '100%'
                        }, 1000);
        }
    }
});