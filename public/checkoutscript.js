document.addEventListener('DOMContentLoaded', function () {
    // Get all the elements that contain item prices and input elements
    const itemPriceElements = document.querySelectorAll('td:nth-child(3)');
    const inputElements = document.querySelectorAll('.quantity-input input');

    // Get the subtotal element by its id
    const subtotalElement = document.getElementById('subtotal');

    // Initialize the subtotal variable
    let subtotal = 0;

    // Calculate the initial subtotal
    itemPriceElements.forEach((itemPriceElement, index) => {
        const priceText = itemPriceElement.textContent.trim(); // Trim any leading/trailing spaces
        const price = parseFloat(priceText.replace('£', '')); // Remove the currency symbol and parse as float
        const quantity = parseInt(inputElements[index].value); // Get the quantity value

        subtotal += price * quantity;
    });

    // Update the subtotal element with the calculated subtotal
    subtotalElement.textContent = `£${subtotal.toFixed(2)}`;

    // Listen for changes in input values
    inputElements.forEach((inputElement, index) => {
        inputElement.addEventListener('change', function () {
            const quantity = parseInt(this.value); // Get the updated quantity value
            const priceText = itemPriceElements[index].textContent.trim(); // Get the original price
            const price = parseFloat(priceText.replace('£', '')); // Remove the currency symbol and parse as float

            // Update the corresponding <td> with the new subtotal
            itemPriceElements[index].textContent = `£${(price * quantity).toFixed(2)}`;

            // Recalculate the subtotal
            subtotal = 0;
            itemPriceElements.forEach((itemPriceElement, i) => {
                const currentPriceText = itemPriceElement.textContent.trim();
                const currentPrice = parseFloat(currentPriceText.replace('£', ''));
                const currentQuantity = parseInt(inputElements[i].value);
                subtotal += currentPrice * currentQuantity;
            });

            // Update the subtotal element with the new subtotal
            subtotalElement.textContent = `£${subtotal.toFixed(2)}`;
        });
    });
});