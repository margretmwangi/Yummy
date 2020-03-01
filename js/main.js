
//HELPER FUNCTION
var $ = function (id) {
    'use strict';
    return document.getElementById(id);
};

window.addEventListener('load', function () {
    'use strict';

    var addressType = $('inputAddress-type');

    //DISPLAY OTHER INPUT
    addressType.addEventListener('change', function () {

        if (addressType.value === 'other') {
            $('inputOther').style.visibility = 'visible';
        } else {
            $('inputOther').style.visibility = 'hidden';
        }
    })

    //DISPLAYS MODAL
    $('order').addEventListener('click', function () {
        $('my-modal').style.display = 'flex';
    });

    //CLOSES MODAL
    $('close').addEventListener('click', function () {
        $('my-modal').style.display = 'none';
    });


    //LISTENS FOR SUBMIT BUTTON PRESS
    $('submit-address').addEventListener('click', function (e) {
        //e.preventDefault();

        var inputs = document.querySelectorAll('#info-form');
        var address = getAddress(inputs);

        if (inputValidation() && validation(inputs)) {
            var confirm = window.confirm('Your Adress is ' + address);
            if (confirm) {
                storeAddress(inputs);
            } else {
                e.preventDefault();
            }
        } else {
            e.preventDefault();
        }
    });
});

function getAddress(inputs) {
    'use strict';
    var address = [];
    for (var i = 3; i < inputs[0].length; i++) {
        address[i] = inputs[0][i].value;
    }

    return address.join(' ');
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
    //var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var zipRegex = /^\d{5}$/g;

    console.log(nameRegex.test($('inputName').value));

    console.log($('inputName').value);
    //NAME VALIDATION
    if (nameRegex.test($('inputName').value)) {
        $('inputName').classList.remove('error-input');
    } else {
        $('inputName').classList.add('error-input');
        valid = false;
    }

    //PHONE VALIDATION
    if (phoneRegex.test($('inputPhone').value)) {
        $('inputPhone').classList.remove('error-input');
    } else {
        $('inputPhone').classList.add('error-input');
        valid = false;
    }

    // EMAIL VALIDATION
//    if (emailRegex.test('inputEmial').value) {
//        $('inputPhone').classList.remove('error-input');
//    } else {
//        $('inputPhone').classList.add('error-input');
//        valid = false;
//    }
    
    //ZIP CODE VALIDATION
    if (zipRegex.test($('inputZip').value)) {
        $('inputZip').classList.remove('error-input');
    } else {
        $('inputZip').classList.add('error-input');
        valid = false;
    }

    //console.log(valid);
    return valid;
}

//STORES ADDRESS TO LOCAL STORAGE
function storeAddress(inputs) {
    var inputArray = [];

    for (var i = 1; i < inputs[0].length; i++) {
        inputArray.push(inputs[0][i].value);
    }

    sessionStorage.setItem('address', JSON.stringify(inputArray));
}
