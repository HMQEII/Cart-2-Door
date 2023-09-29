const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define your MongoDB collection where user data will be stored
const usersCollection = client.db('C2D_DB').collection('users');

// Create a registration route
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Insert user data into the MongoDB collection
    try {
        await usersCollection.insertOne({ username, email, password });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error inserting user data:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start your Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
