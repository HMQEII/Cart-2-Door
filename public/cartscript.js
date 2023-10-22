// document.addEventListener("DOMContentLoaded", () => {
//   // Fetch cart items and append them to the table
//   fetch("/getCartItems")
//     .then((response) => response.json())
//     .then((cartItems) => {
//       const cartItemsTable = document.getElementById("cart-items");

//       // Iterate through cart items and create rows
//       cartItems.forEach((item) => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//           <td>
//             <a href="#" class="trash-icon"><ion-icon name="trash-outline"></ion-icon></a>
//           </td>
//           <td><img src="${item.Image}" alt="" /></td>
//           <td>${item.shopName}</td>
//           <td>${item.itemName}</td>
//           <td>£${item.price}</td>
//           <td><input class="w-25 pl-1" value="1" type="number" /></td>
//           <td>£${item.price}</td>
//         `;

//         cartItemsTable.appendChild(row);
//       });
//     })
//     .catch((error) => console.error(error));
// });

document.addEventListener("DOMContentLoaded", () => {
  // Fetch cart items and append them to the table
  const username = localStorage.getItem("username");
  // alert(username);
  fetch('/getCartItems')
    .then((response) => response.json())
    .then((cartItems) => {
      const cartItemsTable = document.getElementById("cart-items");
      const subtotalElement = document.getElementById("subtotal");
      // Iterate through cart items and create rows
      cartItems.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>
            <a href="#" class="trash-icon" data-item-id="${item._id}"><ion-icon name="trash-outline"></ion-icon></a>
          </td>
          <td><img src="${item.Image}" alt="" /></td>
          <td>${item.shopName}</td>
          <td>${item.itemName}</td>
          <td>£${item.price}</td>
          <td><input class="w-25 pl-1" value="1" min="1" type="number" /></td>
          <td>₹${item.price}</td>
        `;

        // Add a click event listener to the trash icon
        const trashIcon = row.querySelector(".trash-icon");
        trashIcon.addEventListener("click", (event) => {
          event.preventDefault();
          const itemId = trashIcon.getAttribute("data-item-id");

          // Show a confirmation dialog
          const confirmed = confirm("Are you sure you want to delete this item?");
          if (confirmed) {
            // Send a request to delete the item from the database
            fetch(`/deleteCartItem/${itemId}`, {
              method: "DELETE",
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.success) {
                  // Refresh the page after item is deleted
                  location.reload();
                } else {
                  alert("Failed to delete the item from the database.");
                }
              })
              .catch((error) => console.error(error));
          }
        });
        const quantityInput = row.querySelector("input[type='number']");
        quantityInput.addEventListener("input", () => {
          const quantity = parseInt(quantityInput.value, 10);
          const price = item.price;
          const totalPrice = quantity * price;
          // Update the total price in the row
          row.querySelector("td:last-child").textContent = `₹${totalPrice}`;
        });
        cartItemsTable.appendChild(row);
      });
      function updateSubtotal() {
        const totalElements = document.querySelectorAll("#cart-items td:last-child");
        let subtotal = 0;
    
        totalElements.forEach((totalElement) => {
          const price = parseFloat(totalElement.textContent.substring(1)); // Remove the "£" sign and parse as float
          subtotal += price;
        });
    
        // Update the subtotal element with the calculated value
        subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
        const delcharges = document.getElementById("charges");
        let charges, total;
        if (subtotal < 100) {
          charges = 15;
          total = subtotal + charges;
          delcharges.textContent = `₹${charges.toFixed(2)}`;
        } else {
          charges = 0.15;
          const ucharges = charges * subtotal;
          total = ucharges + subtotal;
          delcharges.textContent = `₹${ucharges.toFixed(2)}`;
        }

        // Update the total in the DOM
        // const delcharges = document.getElementById("charges");
        // delcharges.textContent = `₹${charges.toFixed(2)}`;
        const totalField = document.getElementById("total"); // Adjust this to match your HTML
        totalField.textContent = `₹${total.toFixed(2)}`;
      }
    
      // Call the updateSubtotal function initially
      updateSubtotal();
    
      // Add an event listener to all quantity input fields to update the subtotal
      const quantityInputs = document.querySelectorAll("input[type='number']");
      quantityInputs.forEach((quantityInput) => {
        quantityInput.addEventListener("input", updateSubtotal);
      });
      
    })
    .catch((error) => console.error(error));
});
