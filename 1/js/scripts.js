window.addEventListener('load', function(e){
   
    var num1 = document.querySelector('.num1');
    var num2 = document.querySelector('.num2');
    var operator = document.querySelector('.operator');
    var result = document.querySelector('.res');
    var go = document.querySelector('.go');

    num1.addEventListener('input', function(){
        buttonUnblock();
        prepare(num1);
    });

    num2.addEventListener('input', function(){
        buttonUnblock();
        prepare(num2);
    });

    operator.oninput = buttonUnblock;

    go.addEventListener('click', function(){
        if ('' != num1.value && '' != num2.value) {
            calculate(operator.value);
            this.disabled = true;
        } else {
            result.innerHTML = 'Введите оба числа';
        }
    });



    function buttonUnblock() {
        go.disabled = false;
    }

    function prepare(obj) {
        obj.value = obj.value.replace(/\D/g, '');
    }

    function calculate(operator) {
        var a = parseInt(num1.value);
        var b = parseInt(num2.value);

        switch (operator) {
            case '+':
                res = a + b;
                break;
            case '-':
                res = a - b;
                break;
            case '*':
                res = a * b;
                break;
            case '/':
                if (num2.value == 0) {
                    res = 'Делить на 0 не лучшее решение';
                } else {
                    res = a / b;
                }
                break;
            default:
                res = 'Неверный оператор';
        }
        result.innerHTML = res;
    }
});
