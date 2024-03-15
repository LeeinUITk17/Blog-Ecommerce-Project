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

module.exports={
    submitForm,
}