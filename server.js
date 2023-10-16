const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Razorpay = require('razorpay');
const path = require("path"); // Import the 'path' module
// const open = require("open");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
const uri = "mongodb+srv://aaronrocksa24:Aaroncoutinho24@c2d.23ujxhc.mongodb.net/C2D_DB?retryWrites=true&w=majority";
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Define a user schema and model
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});
const OrderSchema = new mongoose.Schema({
    firstName: String,
  lastName: String,
  username: String,
  state: String,
  city: String,
  pincode: Number,
  total: Number,
  orderCompleted: String,
  timestamp: { type: Date, default: Date.now },
  });

const Order = mongoose.model("Order", OrderSchema);
const User = mongoose.model("User", UserSchema);

//checking process for registration boxe
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
      // Check if the email already exists in the database
      const existingUser = await User.findOne({ email });
      const existingUsername = await User.findOne({ username });

      if (existingUser) 
       {
          // Email already exists, send a response indicating that
          res.json({ success: false, message: "Email already exists. Try signing in or use a different EmailID" });
        } 
        else if (existingUsername)
        {
            res.json({ success: false, message: "Username already exists. Please add a unique Username" });
        }
        else 
        {
          // Create a new user
          const newUser = new User({ username, email, password });

          // Save the user to the database
          await newUser.save();

          // Registration successful
          res.json({ success: true, message: "Registration successful!" });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Registration failed. Please try again." });
  }
});


// Add a route for user login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
      // Find the user by email in the database
      const user = await User.findOne({ email });

      if (!user) {
          // User not found, send a response indicating that
          res.json({ success: false, message: "User not found. Please check your credentials." });
      } else {
          // Check if the password matches
          if (user.password === password) {
              // Login successful
              res.json({ success: true, message: "Login successful!", username: user.username });

          } else {
              // Password doesn't match, send a response indicating that
              res.json({ success: false, message: "Incorrect password. Please try again." });
          }
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Login failed. Please try again." });
  }
});

//send data to Order's DB table
app.post("/checkout", async (req, res) => {
    const {
      firstName,
      lastName,
      username,
      state,
      city,
      pincode,
      total,
    } = req.body;
  
    try {
      // Create a new order
      const newOrder = new Order({
        firstName,
        lastName,
        username,
        state,
        city,
        pincode,
        total,
        orderCompleted: "no", // Set as 'no' by default
      });
  
      // Save the order to the database
      await newOrder.save();
  
      // Checkout successful
      res.json({ success: true, message: "Order placed successfully!" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Order placement failed. Please try again." });
    }
  });


// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Node.js is currently active and listening on port ${port}`);
// });
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Node.js is currently active and listening on port ${port}`);

    // Open the desired URL in the default web browser
    const { exec } = require("child_process");
    exec(`start http://localhost:${port}/WelcomePage.html`); // Replace with the actual URL you want to open
});



const razorpay = new Razorpay({
  key_id: "rzp_test_7vCh5UQuRzt3AN", // Replace with your Razorpay API key
  key_secret: "sYWpjcbVpXcA3fuplJNO99cc", // Replace with your Razorpay API secret
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(__dirname + "/public"));

// Endpoint for creating orders
app.post("/create-order", async (req, res) => {
  const totalAmountInPaise = req.body.totalAmountInPaise;

  const options = {
    amount: totalAmountInPaise,
    currency: "INR",
  };

  try {
    const order = await razorpay.orders.create(options);

    res.json({ success: true, order_id: order.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Order creation failed." });
  }
});




//razorpay request
// const razorpay = new Razorpay({
//   key_id: 'rzp_test_7vCh5UQuRzt3AN',
//   key_secret: 'sYWpjcbVpXcA3fuplJNO99cc',
// });

// app.post('/create-order', async (req, res) => {
//   const { totalAmountInPaise } = req.body; // You should send the total amount from the client.

//   const options = {
//     amount: totalAmountInPaise, // Amount in paise
//     currency: 'INR', // Currency code (e.g., INR)
//   };

//   try {
//     const order = await razorpay.orders.create(options);

//     // Return the order details to the client
//     res.json(order);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Order creation failed. Please try again.' });
//   }
// });


// var instance = new Razorpay({ key_id: 'YOUR_KEY_ID', key_secret: 'YOUR_SECRET' })

// instance.orders.create({
//   amount: 50000,
//   currency: "INR",
//   receipt: "receipt#1",
//   notes: {
//     key1: "value3",
//     key2: "value2"
//   }
// })


