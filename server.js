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
const CartItemSchema = new mongoose.Schema({
    userid: String,
    shopName: String,
    itemName: String,
    Image: String,
    price: Number,
});

const CartItem = mongoose.model("CartItem", CartItemSchema);
const Order = mongoose.model("Order", OrderSchema);
const User = mongoose.model("User", UserSchema);

app.get('/getEmail/:username', async (req, res) => {
  try {
      const username = req.params.username;
      const user = await User.findOne({ username });
      if (user) {
          res.json({ email: user.email });
      } else {
          res.status(404).json({ error: 'User not found' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Server error' });
  }
});


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



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Node.js is currently active and listening on port ${port}`);

    // Open the desired URL in the default web browser
    const { exec } = require("child_process");
    exec(`start http://localhost:${port}/WelcomePage.html`); // Replace with the actual URL you want to open
});


//calling razorpay
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



app.post("/addtocart", async (req, res) => {
  const { userid, shopName, itemName, Image, price } = req.body;

  try {
      const cartItem = new CartItem({
          userid,
          shopName,
          itemName,
          Image,
          price,
      });

      await cartItem.save();

      res.json({ success: true, message: "Item added to the cart." });
  } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Failed to add item to the cart." });
  }
});

app.get("/getCartItems", async (req, res) => {
  const userid = req.params.userid;
  // console.log("UserID from route parameter: " + userid);
  try {
    const userid = req.params.userid;
    // console.log(userid);
    const query = CartItem.find({ userId: userid });
  console.log("MongoDB Query: " + JSON.stringify(query.getQuery()));

  const cartItems = await query.exec();
  console.log("Fetched cart items:", cartItems);

    // Send the cart items as JSON
    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve cart items." });
  }
});


app.delete("/deleteCartItem/:itemId", async (req, res) => {
  const itemId = req.params.itemId;

  try {
    // Delete the item from the database based on the itemId
    const result = await CartItem.deleteOne({ _id: itemId });

    if (result.deletedCount === 1) {
      res.json({ success: true, message: "Item deleted successfully." });
    } else {
      res.json({ success: false, message: "Item not found or could not be deleted." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete the item." });
  }
});
