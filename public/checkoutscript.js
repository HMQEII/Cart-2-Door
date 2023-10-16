document.addEventListener('DOMContentLoaded', function() {
    function retrieveDetailsFromLocalStorage() {
        // Retrieve the details from local storage
        const localVariableDetails = JSON.parse(localStorage.getItem('localVariableDetails'));

        if (localVariableDetails) {
            // Set the details in the checkout page
            document.getElementById('shopname').textContent = localVariableDetails.shopName;
            document.getElementById('itemname').textContent = localVariableDetails.itemName;
            const imgElement = document.createElement('img');
            imgElement.src = localVariableDetails.Image;
            const itemprice = localVariableDetails.price;
            // alert(itemprice);
            // alert(JSON.stringify(localVariableDetails.Image));
            document.getElementById('selectedImage').src = localVariableDetails.Image;
            document.getElementById('initialprice').textContent = localVariableDetails.price;
            // alert(localVariableDetails.shopName);
            // alert(localVariableDetails.itemName);
        }
    }

    // Call the function to retrieve and display details
    retrieveDetailsFromLocalStorage();
});


// JavaScript to handle increment and decrement functionality for each row
// const decrementButtons = document.querySelectorAll('.decrement-button');
// const incrementButtons = document.querySelectorAll('.increment-button');
// const quantityInputs = document.querySelectorAll('.quantity-input input');

// decrementButtons.forEach((decrementButton, index) => {
//     decrementButton.addEventListener('click', () => {
//         if (quantityInputs[index].value > 1) {
//             quantityInputs[index].value = parseInt(quantityInputs[index].value) - 1;
//         }
//     });
// });

// incrementButtons.forEach((incrementButton, index) => {
//     incrementButton.addEventListener('click', () => {
//         quantityInputs[index].value = parseInt(quantityInputs[index].value) + 1;
//     });
// });


//calculation code
document.addEventListener('DOMContentLoaded', function () {
    // Get all the input elements and the subtotal element
    const inputElements = document.querySelectorAll('.quantity-input input');
    const subtotalElement = document.getElementById('subtotal');
    const temp = parseFloat(document.getElementById('initialprice').textContent.replace('₹ ', ''));
    const taxElement = document.getElementById('tax');
    let charges = parseFloat(taxElement.textContent.replace('₹ ', ''));

    // Function to update the subtotal
    function updateSubtotal() {
      let subtotal = 0;

      // Iterate through each input element
      inputElements.forEach(inputElement => {
        // Get the quantity from the input element
        const quantity = parseInt(inputElement.value);

        // Get the price element for this input
        const priceElement = inputElement.closest('tr').querySelector('td:nth-child(3)');
        const priceText = priceElement.textContent;
        const price = parseFloat(priceText.replace('₹ ', ''));

        // Calculate the row subtotal based on the quantity and price
        const rowSubtotal = (temp * quantity).toFixed(2);
        subtotal += parseFloat(rowSubtotal);

        // Update the corresponding <td> with the new row subtotal
        priceElement.textContent = `₹ ${rowSubtotal}`;
      });

      // Update the subtotal element with the new subtotal
      subtotalElement.textContent = `₹ ${subtotal.toFixed(2)}`;

      // Calculate the new tax based on the updated subtotal
      // if (subtotal > 200) {
      //   charges = 40; // Update charges if subtotal > 200
      // } else {
      charges = 0.18 // Set charges to default value if subtotal <= 200
      // }
      ucharges = charges * subtotal

      // Update the tax element with the new tax
      taxElement.textContent = `₹ ${ucharges.toFixed(2)}`;

      // Update the total
      updateTotal();
    }

    function updateTotal() {
      // Get the current subtotal
      const subtotalText = subtotalElement.textContent;
      const subtotal = parseFloat(subtotalText.replace('₹ ', ''));

      // Calculate the total by adding charges to the subtotal
      const total = (subtotal + ucharges).toFixed(2);

      // Update the 'bill' element with the new total
      const billElement = document.getElementById('bill');
      billElement.textContent = `₹ ${total}`;
    }

    // Calculate the initial subtotal
    updateSubtotal();

    // Listen for changes in the input value for all input elements
    inputElements.forEach(inputElement => {
      inputElement.addEventListener('input', updateSubtotal);
    });
  });
  // document.getElementById('payment-button').addEventListener('click', function (event) {
  //   // Prevent the default form submission behavior
  //   alert('here i am');
  //   event.preventDefault();
  //   const totalAmountInPaise= parseInt(document.getElementById('bill').textContent) * 100
  //   var data = {
  //     key: 'rzp_test_7vCh5UQuRzt3AN', // Replace with your Razorpay API key
  //     amount: totalAmountInPaise,
  //     currency: 'INR',
  //     name: 'Cart 2 Door',
  //     description: 'Payment for your order',
  //     image: '/Images/SHLocal_logo.png',
  //     order_id: 'C2D_EIC0001', // Replace with the order ID from your server
  //     handler: function (response) {
  //       // This function will be called when the payment is successful.
  //       // You can update your database or perform other actions here.
  //       alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
  //     },
  //   };
  //   var rzp = new Razorpay(data);
  //   rzp.open();

  // });
  
  // document.getElementById('payment-button').addEventListener('click', function (event) {
  //   // Prevent the default form submission behavior
  //   alert('button was pressed');
  //   event.preventDefault();
  //   var billAmountInPounds = document.getElementById('bill').textContent; // Get the amount in pounds, e.g., '₹ 1'
  //   var billAmountInPaise = parseFloat(billAmountInPounds.replace('₹ ', '')) * 100; // Convert to paise
  //   alert(billAmountInPaise);
  //   const orderid = `${Date.now()}_YOUR_BUSINESS_ID_${Math.random().toString(36).substring(7)}`;

  //   var razorpayOptions = {
  //     key: 'rzp_test_7vCh5UQuRzt3AN', // Replace with your actual Razorpay key
  //     amount: billAmountInPaise, // Correctly convert the amount to paise
  //     currency: 'INR', // Replace with the currency code (e.g., INR for Indian Rupees)
  //     name: 'Cart 2 Door',
  //     description: 'Payment for your order',
  //     image: '/Images/SHLocal_logo.png', // Replace with your company logo URL
  //     order_id: orderid, // Replace with the order ID from your server
  //     handler: function (response) {
  //       // This function will be called when the payment is successful.
  //       // You can update your database or perform other actions here.
  //       alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
  //     },
  //   };
  
  //   var rzp = new Razorpay(razorpayOptions);
  //   rzp.open();
  // });

  // document.addEventListener("DOMContentLoaded", function () {
  //   const placeOrderButton = document.querySelector("#place-order-button");
  
  //   placeOrderButton.addEventListener("click", async () => {
  //     const firstName = document.querySelector("#firstName").value;
  //     const lastName = document.querySelector("#lastName").value;
  //     const username = document.querySelector("#username").textContent;
  //     const state = document.querySelector("#state").value;
  //     const city = document.querySelector("#city").value;
  //     const pincode = document.querySelector("#1234").value;
  //     const total = parseFloat(document.querySelector("#bill").textContent.replace("₹ ", ""));
  
  //     // Send the checkout data to the server
  //   //   const response = await fetch("/checkout", {
  //   //     method: "POST",
  //   //     headers: {
  //   //       "Content-Type": "application/json",
  //   //     },
  //   //     body: JSON.stringify({
  //   //       firstName,
  //   //       lastName,
  //   //       username,
  //   //       state,
  //   //       city,
  //   //       pincode,
  //   //       total,
  //   //     }),
  //   //   });
  
  //   //   const data = await response.json();
  
  //   //   if (data.success) {
  //   //     // Order placed successfully, you can redirect the user or show a success message
  //   //     alert("Order placed successfully!");
  //   //   } else {
  //   //     // Order placement failed, handle the error
  //   //     alert("Order placement failed. Please try again.");
  //   //   }
  //   });
  // });
  



  document.getElementById("payment-button").addEventListener("click", function (event) {
    event.preventDefault();
    const billElement = document.getElementById("bill");
    const billContent = billElement.textContent.trim(); 
    const numericValue = parseFloat(billContent.replace(/[^0-9.]/g, '')); 
    const totalAmountInPaise = Math.round(numericValue * 100);
    // alert(totalAmountInPaise);
    // Send a request to your server to create the order
    fetch("/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        totalAmountInPaise: totalAmountInPaise,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          var razorpayOptions = {
            key: "rzp_test_7vCh5UQuRzt3AN", // Replace with your Razorpay API key
            amount: totalAmountInPaise,
            currency: "INR",
            name: "Cart 2 Door",
            description: "Payment for your order",
            image: "/Images/SHLocal_logo.png",
            order_id: data.order_id, // Use the order ID from the server
            handler: function (response) {
              alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
            },
          };
  
          var rzp = new Razorpay(razorpayOptions);
          rzp.open();
        } else {
          console.error(data.message);
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred. Please try again.");
      });
  });
  