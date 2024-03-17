(function() {
	'use strict';

	var tinyslider = function() {
		var el = document.querySelectorAll('.testimonial-slider');

		if (el.length > 0) {
			var slider = tns({
				container: '.testimonial-slider',
				items: 1,
				axis: "horizontal",
				controlsContainer: "#testimonial-nav",
				swipeAngle: false,
				speed: 700,
				nav: true,
				controls: true,
				autoplay: true,
				autoplayHoverPause: true,
				autoplayTimeout: 3500,
				autoplayButtonOutput: false
			});
		}
	};
	tinyslider();

	


	var sitePlusMinus = function() {

		var value,
    		quantity = document.getElementsByClassName('quantity-container');

		function createBindings(quantityContainer) {
	      var quantityAmount = quantityContainer.getElementsByClassName('quantity-amount')[0];
	      var increase = quantityContainer.getElementsByClassName('increase')[0];
	      var decrease = quantityContainer.getElementsByClassName('decrease')[0];
	      increase.addEventListener('click', function (e) { increaseValue(e, quantityAmount); });
	      decrease.addEventListener('click', function (e) { decreaseValue(e, quantityAmount); });
	    }

	    function init() {
	        for (var i = 0; i < quantity.length; i++ ) {
						createBindings(quantity[i]);
	        }
	    };

	    function increaseValue(event, quantityAmount) {
	        value = parseInt(quantityAmount.value, 10);

	        console.log(quantityAmount, quantityAmount.value);

	        value = isNaN(value) ? 0 : value;
	        value++;
	        quantityAmount.value = value;
	    }

	    function decreaseValue(event, quantityAmount) {
	        value = parseInt(quantityAmount.value, 10);

	        value = isNaN(value) ? 0 : value;
	        if (value > 0) value--;

	        quantityAmount.value = value;
	    }
	    
	    init();
		
	};
	sitePlusMinus();


})()

const submitForm = () => {
    console.log('Submit form function called');

    const cartItems = document.querySelectorAll('.product-thumbnail');
    const productsData = [];

    cartItems.forEach(item => {
        const productId = item.getAttribute('data-product-id');
        const quantity = item.querySelector('.quantity-amount').value;

        productsData.push({
            productId,
            quantity
        });
    });

    console.log('Products data:', productsData);

    const productsInput = document.createElement('input');
    productsInput.type = 'hidden';
    productsInput.name = 'productsData';
    productsInput.value = JSON.stringify(productsData);

    console.log('Appending input to form:', productsInput);

    document.getElementById('checkoutForm').appendChild(productsInput);

    console.log('Submitting form');
    document.getElementById('checkoutForm').submit();
};

  const charging = () => {
	var selectElement = document.getElementById('listaddress');
var selectedOption = selectElement.options[selectElement.selectedIndex];
document.getElementById('shipping_fee').innerText = selectedOption.value;
var id = selectedOption.getAttribute('data-id');
document.getElementById('address_id').value = id;
var subtotal = parseFloat(document.getElementById('subtotal').innerText);
var shipping_fee = parseFloat(selectedOption.value);
var total = subtotal + shipping_fee;

document.getElementById('total').innerText = total;
document.getElementById('hiddentotal').value = total;
  };
  
  charging();
  document.getElementById('listaddress').addEventListener('change', charging);