window.onload = function(){

    new Slider('.gallery-1');
    new Photo({
        images: '.gallery-2 .photos img',
        btn_prev: '.gallery-2 .buttons .prev',
        btn_next: '.gallery-2 .buttons .next'
    });

    function Slider(container){
        this.btn_prev = document.querySelector(container + ' .buttons .prev');
        this.btn_next = document.querySelector(container + ' .buttons .next');
        this.images = document.querySelectorAll(container + ' .photos img');
        this.i = 0;

        var obj = this;

        this.prev = function () {
            obj.images[obj.i].classList.remove('showed');
            obj.i--;

            if(obj.i < 0){
                obj.i = obj.images.length - 1;
            }

            obj.images[obj.i].classList.add('showed');
        };

        this.next = function () {
            obj.images[obj.i].classList.remove('showed');
            obj.i++;

            if(obj.i >= obj.images.length){
                obj.i = 0;
            }

            obj.images[obj.i].classList.add('showed');
        };

        obj.btn_prev.onclick = obj.prev;
        obj.btn_next.onclick = obj.next;
    }

    function Photo(object){
        this.images = document.querySelectorAll(object.images);
        this.btn_prev = document.querySelector(object.btn_prev);
        this.btn_next = document.querySelector(object.btn_next);
        this.i = 0;

        var obj = this;

        this.prev = function () {
            obj.images[obj.i].classList.remove('showed');
            obj.i--;

            if(obj.i < 0){
                obj.i = obj.images.length - 1;
            }

            obj.images[obj.i].classList.add('showed');
        };

        this.next = function () {
            obj.images[obj.i].classList.remove('showed');
            obj.i++;

            if(obj.i >= obj.images.length){
                obj.i = 0;
            }

            obj.images[obj.i].classList.add('showed');
        };

        obj.btn_prev.onclick = obj.prev;
        obj.btn_next.onclick = obj.next;
    }
};
