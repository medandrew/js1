/*
	some - селектор     $('.some')
	some - HTMLElement  $(this)
	some - NodeList     $([..., ..., ...])
*/
function $(some){
    var elements;

    if(some instanceof HTMLElement) {
    	elements = [some];
    }
    else if(some instanceof Array || some instanceof NodeList) {
    	elements = some;
    }
    else {
    	elements = document.querySelectorAll(some);
    }
    return new OurJquery(elements);
}

/* elements: NodeList || Array */
function OurJquery(elements){
    this.elements = elements;

    this.on = function(name, handler){
    	for(var i = 0; i < this.elements.length; i++){
    		this.elements[i].addEventListener(name, handler);
    	}
        return this;
    };

    this.addClass = function(name){
    	for(var i = 0; i < this.elements.length; i++){
    		this.elements[i].classList.add(name);
    	}
        return this;
    };

    this.removeClass = function(name){
        for(var i = 0; i < this.elements.length; i++){
            this.elements[i].classList.remove(name);
        }
        return this;
    };

    /*
        если code не передан, то вернёт innerHTML 1-ого элемента
        если code передан, то установит innerHTML всем элементам
    */
    this.html = function(code){
        if(typeof code === 'undefined'){
            return this.elements.length > 0 ? this.elements[0].innerHTML : null;
        }

        for(var i = 0; i < this.elements.length; i++){
            this.elements[i].innerHTML = code;
        }

        return this;
    };

    /*
        param1 - str, param2 - не передан
        .css('color'); => вернуть style.color первого элемента набора

        param1 - str, param2 - str
        .css('color', 'red'); => всем элементам задаём style.color = 'red'

        param1 - object, param2 - не передан
        .css({
            color: '#fff',
            background: '#f90',
            cursor: 'pointer'
        }); => всем элементам задаём все пары
                    style.color = '#fff'
                    style.background = '#f90'
                    style.cursor = 'pointer'
     */

    /* Первый вариант */
    this.css = function(param1, param2){
        if (typeof(param1) === 'string' && param2 === undefined) {
            return this.elements[0].style[param1];
        }

        if (typeof(param1) === 'object') {
            for(var i = 0; i < this.elements.length; i++){
                for(var key in param1) {
                    this.elements[i].style[key] = param1[key];
                }
            }
        }

        if (typeof(param1) === 'string' && typeof(param2) === 'string') {
            for(var i = 0; i < this.elements.length; i++){
                this.elements[i].style[param1] = param2;
            }
        }
        return this;
    };

    /* Второй вариант
    this.css = function(param1, param2){
        if (typeof(param1) === 'string' && param2 === undefined) {
            getCss(elements, param1);
        }
        if (typeof(param1) === 'object') {
            setCssObj(elements, param1);
        }
        if (typeof(param1) === 'string' && typeof(param2) === 'string') {
            setCss(elements, param1, param2);
        }
        return this;
    };

    function getCss(elem, x) {
        return elem[0].style[x];
    }

    function setCss(elem, x, y) {
        for(var i = 0; i < elem.length; i++){
            elem[i].style[x] = y;
        }
    }

    function setCssObj(elem, x) {
        for(var i = 0; i < elem.length; i++){
            for(var key in x) {
                elem[i].style[key] = x[key];
            }
        }
    }*/

    this.fadeOut = function(time, callback){
        for(var i = 0; i < this.elements.length; i++){
            fade(this.elements[i] , time, callback);
        }
    };

    function fade(elem, t, callback){
        // кадров в секунду (по умолчанию 50)
        var fps = 50;
        // время работы анимации (по умолчанию 500мс)
        var time = t || 500;
        // сколько всего покажем кадров
        var steps = time / fps;
        // текущее значение opacity - изначально 0
        var op = 1;
        // изменение прозрачности за 1 кадр
        var d0 = op / steps;

        // устанавливаем интервал (1000 / fps)
        // например, 50fps -> 1000 / 50 = 20мс
        var timer = setInterval(function(){
            // уменьшаем текущее значение opacity
            op -= d0;
            // устанавливаем opacity элементу DOM
            elem.style.opacity = op;
            // уменьшаем количество оставшихся шагов анимации
            steps--;

            // если анимация окончена
            if(steps == 0){
                // убираем интервал выполнения
                clearInterval(timer);
                // и убираем элемент из потока документа
                elem.style.display = 'none';
                // и коллбэком возвращаем его в поток :)
                callback.call(elem);
            }
        }, (1000 / fps));
    }
}
