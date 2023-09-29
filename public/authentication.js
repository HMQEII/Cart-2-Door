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

document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registration-form");

    registrationForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from submitting traditionally

        // Get user input
        const username = document.getElementById("rusername").value;
        const email = document.getElementById("remail").value;
        const password = document.getElementById("rpassword").value;

        console.log(username,email,password);

        if (password.length<6)
        {
            //done here, rest validation is done in server.js
            openPopup("password must contain minimum 6 characters");
            document.getElementById("rpassword").value="";
        }
        else
        {
            const userData = {
                username,
                email,
                password,
            };
            // Send a POST request to your server (Node.js) for user registration
            fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        openPopup(data.message); // Registration successful
                        // window.location.reload();
                        document.getElementById('email').value=email;
                        document.getElementById('password').value=password;
                        //shifting page to Login
                        const loginLink = document.querySelector('.login-link');
                        loginLink.click();
                             

                    } else {
                        openPopup(data.message); // Registration failed by authentication.js
                        document.getElementById("rusername").value = "";
                        document.getElementById("remail").value = "";
                        document.getElementById("rpassword").value = "";
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("Registration failed. Please try again later.");
                }); 
            
        }
    });
});

//Login verification process
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Making an AJAX POST request to your server for login
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }), // Send email and password to server
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // Login successful, store the username in local storage
                localStorage.setItem("username", data.username);
                const temp = localStorage.getItem("username");
                document.getElementById('email').setItem="";
                document.getElementById('password').setItem="";
                //alert(temp);
                window.location.href = "/Home.html";
            } else {
                // Display an error message to the user
                openPopup(data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert(error);
        });
    });
});
