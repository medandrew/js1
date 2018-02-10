$(function(){
    /* 1. На основе примера 3_faq сделать так, чтобы клик на любой вопрос закрывал другие открытые ответы. */
    $('.ask').on('click', function(){
        var block = $(this).next();

        block.slideToggle();
        $('.answer:visible').not(block).slideUp();
    });

    /* 2. На основе примера 3_faq сделать так, чтобы клик на любой вопрос закрывал другие открытые ответы.
          При этом 1 вопрос всегда остаётся открытым, т.е. клик на открытый сейчас вопрос не закроет его. */
    $('.answer1:first').show();

    $('.ask1').on('click', function () {
        var block = $(this).next();

        block.slideDown();
        $('.answer1:visible').not(block).slideUp();
    });

    /*3. (*) Поищите плагин и настройте анимацию открытия и закрытия ответов по какой-нибудь произвольной кривой Безье.
             https://github.com/rdallasgray/bez - плагин для jquery */
    $('.ask2').on('click', function(){
        var block = $(this).next();

        block.slideToggle(2000, $.bez([.45,1.57,.45,-0.57]));
        $('.answer2:visible').not(block).slideUp(2000, $.bez([.45,1.57,.45,-0.57]));
    });

    /* 4. Слайдер
     - images из nodeList превратится в объект jQuery
     - обработка событий по кнопкам тоже на jq
     - слайдер в качестве входного параметра принимает не селектор-обёртку, а объект options с настройками в числе которых: селектор до изображений, до кнопок и т.п.
     - у слайдера можно добавить режим autoplay, который по заданному временному интервалу сам будет вызывать next
     */
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

        images.first().addClass('showed');

        btn_prev.on('click', prev);
        btn_next.on('click', next);

        if (options.autoplay == true) {
            setInterval(next, (typeof(options.interval) === 'number' && options.interval > 0) ? options.interval : 1000);
        }

        function prev() {
            images.eq(i).removeClass('showed');
            i--;

            if (i < 0) {
                i = count - 1;
            }

            images.eq(i).addClass('showed');
        }

        function next() {
            images.eq(i).removeClass('showed');
            i++;

            if (i >= count) {
                i = 0;
            }

            images.eq(i).addClass('showed');
        }
    }
});