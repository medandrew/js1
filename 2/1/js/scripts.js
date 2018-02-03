window.onload = function(e){
    
    var inputs = document.querySelectorAll('.check');
    var form = document.querySelector('form');
    var error = document.querySelector('.message_error');

    form.addEventListener('submit', function (e) {
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            var value = input.value;
            var pattern = new RegExp(input.dataset.pattern);

            if (!pattern.test(value)) {

                input.classList.add('error');
                e.preventDefault();
                error.innerHTML = 'Неправильно заполнены поля';

            } else {

                if(input.classList.contains('error')) {
                    input.classList.remove('error');
                }

            }
        }
    });
};
