//HELPER FUNCTION
var $ = function (id) {
    'use strict';
    return document.getElementById(id);
};

window.addEventListener('load', function () {
    'use strict';


    $('submit-order').addEventListener('click', function (e) {
        e.preventDefault();

        var inputs = document.querySelectorAll('#info-form');

        console.log(validate() + ' ' + validation(inputs) + ' ' + inputValidation());
        
        if (validate() && validation(inputs) && inputValidation()) {
            window.alert('Your order has been placed!!!');
        }

    });

    $('credit').addEventListener('keyup', function () {
        cardType();
    });

});


function validate() {
    'use strict';
    
    console.log((cardNumberValidate()+ ' '+ dateValidate() + ' '+ luhnValidation() + ' '+ cvcValidation()));

    if (cardNumberValidate() && dateValidate() && luhnValidation() && cvcValidation()) {
        return true;
    }

    return false;
}


function cardNumberValidate() {
    'use strict';
    var cardNumber = $('credit').value;
    cardNumber = parseInt(cardNumber, 10);

    if (isNaN(cardNumber)) {
        $('credit').style.border = '1px solid red';
        return false;
    } else {
        $('credit').style.border = '1px solid #16ba4f';
    }
    return true;
}

function dateValidate() {
    'use strict';

    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();
    
    //console.log(sh('ex-year').value , $('ex-month').value);
    
    if(currentYear === $('ex-year').value && currentMonth > $('ex-month').value){
        $('date-error').innerText = 'Invalid Date';
        return false;
    }else{
        $('date-error').innerText = '';
        return true;
    }
    
}

function luhnValidation() {
    'use strict';

    var sum = 0;
    var temp = 0;
    var tempArr = [];
    var cardNumber = $('credit').value;

    cardNumber = cardNumber.split('').reverse();

    for (var i = 0; i < cardNumber.length; i++) {
        temp = (+cardNumber[i]) * 2;
        //console.log(temp);
        if (i % 2 !== 0) {
            //console.log(temp);
            if (temp >= 10) {
                tempArr = temp.toString().split('');
                //console.log(tempArr);
                sum += +tempArr[0];
                sum += +tempArr[1];
            } else {
                sum += temp;
            }
        } else {
            sum += (+cardNumber[i]);
        }
    }

    console.log(sum);
    if (sum % 10 === 0) {
        return true;
    }

    return false;
}

//4512113014843252
function cardType() {
    'use strict';

    var cardNumber = $('credit').value;

    var firstTwoDigits = cardNumber.split('').slice(0, 2).join('');

    if (cardNumber[0] === '4' && (cardNumber.length == 13 || cardNumber.length == 16)) {
        $('type').innerText = 'Visa';
    } else if (firstTwoDigits >= '51' && firstTwoDigits <= '55' && cardNumber.length == 16) {
        $('type').innerText = 'MasterCard';
    } else if (cardNumber[0] === '3' && cardNumber.length == 15) {
        $('type').innerText = 'American Express';
    } else {
        $('type').innerText = 'Invalid';
        return false;
    }

    return true;
}


//4512113014843252
function cvcValidation(){
    var cvcRegex = /^\d{3}$/g;
    var cvc = $('cvc-code');
    
    if(!cvcRegex.test(cvc.value)){    
        cvc.classList.add('error-input');
        return false;
    }
    cvc.classList.remove('error-input');
    return true;
}


//VALIDATES ADDRESS INPUTS 
function validation(inputs) {
    var valid = true;
    for (var i = 0; i < inputs[0].length; i++) {
        if (inputs[0][i].value === '' && inputs[0][i].id !== 'other') {
            //console.log(inputs[i]); 
            //inputs[0][i].style.border = '1px solid red';
            inputs[0][i].classList.add('error-input');
            valid = false;
        } else {
            inputs[0][i].classList.remove('error-input');
            //inputs[0][i].style.border = '1px solid #16ba4f';
        }
    }
    return valid;
}

//INPUT VALIDATION
function inputValidation() {
    'use strict';
    var valid = true;
    var nameRegex = /^[a-zA-Z]+$/;
    var phoneRegex = /^\(\d{3}[)]\d{3}-\d{4}$|^\(\d{3}\)\s\d{3}-\d{4}$|^\d{10}$/;
    var zipRegex = /^\d{5}$/g;
    var stateRegex = /^[a-z]{2}$/gi;

    //console.log(nameRegex.test($('inputName').value));

    console.log($('inputName').value);
    //NAME VALIDATION
    if (nameRegex.test($('inputName').value)) {
        $('inputName').classList.remove('error-input');
    } else {
        $('inputName').classList.add('error-input');
        valid = false;
    }
    
     
    //ZIP CODE VALIDATION
    if (zipRegex.test($('inputZip').value)) {
        $('inputZip').classList.remove('error-input');
    } else {
        $('inputZip').classList.add('error-input');
        valid = false;
    }

  
    return valid;
}