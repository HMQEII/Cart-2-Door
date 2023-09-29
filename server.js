const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path"); // Import the 'path' module

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



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Node.js is currently active and listening on port ${port}`);
});
