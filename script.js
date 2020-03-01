function totalPrice (){
    var price = 0;
    var selectedSize = document.getElementById("sizes")
    var CostOfSize = selectedSize.options[selectedSize.selectedIndex].value;
    var selectedCrust = document.getElementById("crusts")
    var CostOfCrust = selectedCrust.options[selectedCrust.selectedIndex].value;
    var selectedTopping = document.getElementById("toppings")
    var CostOfToppings = selectedTopping.options[selectedCrust.selectedIndex].value;
    var QuantityOfPizza = document.getElementById("numberOfPizzas").value;
    price = parseInt(CostOfSize) + parseInt(CostOfCrust) + parseInt(CostOfToppings)
    totalPrice = price * parseInt(QuantityOfPizza);
    document.getElementById("total").value = totalPrice;
    event.preventDefault();
  };
  
  function totalPrice1 (){
    var price = 0;
    var selectedSize = document.getElementById("sizes1")
    var CostOfSize = selectedSize.options[selectedSize.selectedIndex].value;
    var selectedCrust = document.getElementById("crusts1")
    var CostOfCrust = selectedCrust.options[selectedCrust.selectedIndex].value;
    var selectedTopping = document.getElementById("toppings1")
    var CostOfToppings = selectedTopping.options[selectedCrust.selectedIndex].value;
    var QuantityOfPizza = document.getElementById("numberOfPizzas1").value;
    price = parseInt(CostOfSize) + parseInt(CostOfCrust) + parseInt(CostOfToppings)
    totalPrice = price * parseInt(QuantityOfPizza);
    document.getElementById("totalDelivery").value = totalPrice;
    event.preventDefault();
    
  };
  
  $(document).ready (function(){
  
  $("#order").on("click", function(){
    $("#menu").fadeIn(1000);
    $(".deliver").hide();
  })
  
  $("#makeOrder").on("click", function(){
    $(".deliver").show();
  })
  
  $("#deliver").on("click", function(){
    $("#menu1").fadeIn(1000);
  })
  
  $("#order").on("click", function(){
    $("#menu1").hide();
  })
  
  $("#orderDelivery").on("click", function(){
    var yourLocation = document.getElementById("location").value;
    alert("Your delivery will be made to " + yourLocation + ", delivery fee is Kshs.200");
  });
  
  $("#submit").on("click", function () {
    var userName = document.getElementById("name").value;
    alert(userName + " " + "we have received your message, thank you for your feedback");
  });
  
  });