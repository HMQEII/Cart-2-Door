function openPopup(message) {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");
  popupMessage.textContent = message;
  popup.style.display = "block";
}

// Function to close the popup
function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}

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
  

document.addEventListener("DOMContentLoaded", function() {
  // Your code here

  document.getElementById("payment-button").addEventListener("click", function (event) {
      // Prevent the default form submission
      event.preventDefault();

      // Check which payment method is selected
      const codRadioButton = document.getElementById("COD");
      const razorPayRadioButton = document.getElementById("paypal");
      function sendEmail(email,subject,body)
      {
        Email.send({
          Host : "smtp.elasticemail.com",
          Username : "q4me.eic@gmail.com",
          Password : "FB017ABBE9E59E85FF5774A6B52D41DF8393",
          To : email,
          From : "q4me.eic@gmail.com",
          Subject : subject,
          Body : body
      }).then(
        message => console.log(message)
      );
      }
      async function getEmail(userid) {
        return fetch(`/getEmail/${userid}`)
            .then(response => {
                if (response.status === 404) {
                    throw new Error('User not found');
                }
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.email) {
                    return data.email;
                } else {
                    throw new Error('Email not found');
                }
            });
    }
    async function placeorder(){
        const firstName = document.getElementById("firstName").value;
          const lastName = document.getElementById("lastName").value;
          const username = document.getElementById("useridforbiling").textContent;
          const state = document.getElementById("state").value;
          const city = document.getElementById("city").value;
          const pincode = document.getElementById("pincode").value;
          const total = parseFloat(document.getElementById("bill").textContent.replace("₹", ""));
          
          // Create a JavaScript object to hold the order data
          const orderData = {
              firstName,
              lastName,
              username,
              state,
              city,
              pincode,
              total,
          };

          // Send a POST request to your server with the order data for Cash on Delivery
          fetch("/checkout", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(orderData),
          })
          .then((response) => response.json())
          .then(async (data) => {
              if (data.success) {
                  // Handle a successful order placement here (e.g., show a success message)
                  openPopup("Order placed successfully!");
                  // Send an email with data
                  
                  try{
                  
                  const emailid = await getEmail(username);
                  // alert(emailid);
                  sendEmail(emailid, 'Hello', 'Order placed successfully');
                }
                catch (error) {
                  console.error("Error while displaying alert:", error);
              }

              } else {
                  // Handle an unsuccessful order placement here (e.g., show an error message)
                  openPopup("Order placement failed. Please try again.");
              }
          })
          .catch((error) => {
              // Handle any network or server error here
              console.error("An error occurred: " + error.message);
          });
      }
      if (codRadioButton.checked) {
          // Cash on Delivery is selected
          placeorder();
      } else if (razorPayRadioButton.checked) {
          // RazorPay is selected
          const billElement = document.getElementById("bill");
          const billContent = billElement.textContent.trim(); 
          const numericValue = parseFloat(billContent.replace(/[^0-9.]/g, '')); 
          const totalAmountInPaise = Math.round(numericValue * 100);
          
          // Send a request to your server to create the order for RazorPay
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
                          placeorder();
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
      }
  });
});




