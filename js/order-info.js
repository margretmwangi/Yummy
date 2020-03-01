//GOLBAL PIZZA SIZE OBJECTS

//HANDED TOSSED
var ht = {
    sizes: ['Small', 'Medium', 'Large'],
    price: [9.99, 12.99, 14.99] 
  };
  
  //THIN CRUST
  var tc = {
    sizes: ['Medium', 'Large'],
    price: [11.99, 13.99]
  };
  
  //NEW YORK STYLE CRUST
  var nyc = {
    sizes: ['Large', 'Extra Large'],
    price: [16.99, 19.99]
  };
  
  //GLUTEN FREE CRUST
  var gfc = {
    sizes: ["small"],
    price: [10.99]
  };
  
  //HELPER FUNCTION
  var $ = function (id) {
      'use strict';
      return document.getElementById(id);
  };
  
  window.addEventListener('load', function () {
      'use strict';
  
      function main() {
          
          //GETS ADDRESS
          var address = getAddress();
          
          //OUTPUTS ADDRESS TO PAGE
          displayAddress(address);
          
          //SETS SIZES DROPDOWN
          setSize();
          
          //CALCULATES ORDER AMOUNT
          calcAmount(); 
          
          //ADDS EVENT LISTENER TO CUSTOMIZE CLASS
          var orderItems = document.querySelectorAll('.customize');  
          for (var i = 0; i<orderItems.length; i++){   
              orderItems[i].addEventListener('change', function(){
                  calcAmount();
              });      
          }
          
          //EVENT LISTENER FOR SAME AS ADDRESS CHECKBOX 
          $('same').addEventListener('change', function(e){
              console.log(e.target.checked);
              addAddress(address, e.target.checked);
          })
          
      }
  
      main();
      
      //LISTENS FOR CHANGE ON CRUST RADIO BUTTONS
      $('crust-radios').addEventListener('change', function(){
          setSize(); 
          calcAmount();
      });
      
  });
  
  //GETS ADDRESS FROM SESSION STORAGE
  function getAddress() {
      'use strict';
      var address = sessionStorage.getItem('address');
      return JSON.parse(address);
  }
  
  //DISPLAYS AND VALIDATES ADDRESS
  function displayAddress(address) {
      'use strict';
      //console.log(address);
      
      if(!address){
          $('street').innerText = 'No Address Entered';
          return false;
      }
      $('street').innerText = address[4];
      $('city').innerText = address[5];
      $('state').innerText = address[6];
      $('zip-code').innerText = address[7];
  
      if (address[3].length === 0) {
          $('other').style.display = 'none';
      }
  }
  
  //ADDS ADDRESS TO BILLING ADDRESS 
  function addAddress(address, checked){
      'use strict'; 
      console.log(checked);
      if(checked && address){
          $('inputName').value = address[0];
          $('inputAddress').value = address[4];
          $('inputCity').value = address[5];
          $('inputState').value = address[6];
          $('inputZip').value = address[7];
      }else{
          $('inputName').value = '';
          $('inputAddress').value = "";
          $('inputCity').value = '';
          $('inputState').value = '';
          $('inputZip').value = '';
      }
  }
  
  //CALCULATES AND DISPLAYS AMOUNT
  function calcAmount() {
      'use strict';
      var amount = 0;
   
      amount = (+$('sizes').value) + (+$('cheese').value) + (+$('sauce').value) + getToppings();
      
      //console.log( 'the total is ' + amount);
      $('amount').innerText = amount.toFixed(2);
      
  }
  
  //SET WHICH SIZES TO DISPLAY ON DROPDOWN
  function setSize(){
      'use strict';
      var crust = document.getElementsByName('crust');
      var crustChecked = '';
      
      //DETERMINES SELECTED RADIO BOTTON 
      for(var i = 0; i<crust.length; i++){
          if(crust[i].checked){
              crustChecked = crust[i].id;
          }
      }
      
      if(crustChecked === 'hand-tossed'){
          setDropdown(ht);
      }else if(crustChecked === 'thin-crust'){
          setDropdown(tc);
      }else if(crustChecked === 'new-york'){
          setDropdown(nyc);
      }else if(crustChecked === 'gf-crust'){
          setDropdown(gfc);
      }
  }
  
  //SET DROPDOWN HTML
  function setDropdown(crust){
      'use strict';
      //console.log(crust.sizes);
      $('sizes').innerHTML = '';
      for(var i=0; i<crust['sizes'].length; i++){
          $('sizes').innerHTML += `<option value='${crust.price[i]}'>${crust.sizes[i]}</option> `
      }
  }
  
  //RETURNS THE TOPPING CHECKBOXES ARE CHECKED
  function getToppings(){
      'use strict';
      
      var boxChecked = 0; 
      var toppings = document.getElementsByName('topping');
      
      for (var i = 0; i < toppings.length; i++){
          if(toppings[i].checked){
              boxChecked++;
          }
      }
      
      return boxChecked * 0.99;
    }