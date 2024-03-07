const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define your MongoDB connection URI
const mongoURI = 'mongodb+srv://mani_45:manigsn123@cluster0.qfqabv2.mongodb.net/taskmanager?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');

    // Define your route to load items
    router.post('/loaduserdata', async (req, res) => {
      try {
        // Access the MongoDB collection directly
        const collection = mongoose.connection.db.collection('users');

        // Fetch items from MongoDB collection
        const items = await collection.find({}).toArray();

        res.json(items); // Send the fetched items as JSON response
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }
    });
  })
  .catch(err => console.log(err));

module.exports = router;