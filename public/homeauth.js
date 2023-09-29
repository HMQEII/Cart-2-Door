// Retrieve the username from local storage
const username = localStorage.getItem("username");

// Check if the username exists in local storage
if (username) {
    // Update the DOM element with the username
    document.getElementById("userid").textContent = username;
    // alert(username);
}