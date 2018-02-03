window.addEventListener('load', function(e){

    $('.check').addClass('focus')
                .on('focus', function(){
                    $(this).addClass('shadow');
                })
                .on('blur', function(){
                    $(this).removeClass('shadow');
                });

    var items = $('.items .item');

    items.css({
            color: '#fff',
            background: '#f90',
            cursor: 'pointer'
    }).on('click', function(){
        var item = $(this);

        console.log(item.css('color'));
        item.css('color', '#777');
    });

    items.on('dblclick', function(){
        $(this).fadeOut(1000, function(){
            $(this).css({
                opacity: 1,
                display: 'inline-block',
                background: '#050'
            });
        });
    });

});
