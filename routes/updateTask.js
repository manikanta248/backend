const express = require('express');
const cors = require('cors');
const router = express.Router();
const Task = require('../models/TasksDataSchema');

// Enable CORS for all routes in this router
router.use(cors());

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Use CORS middleware with custom options
router.options('*', cors(corsOptions));

// Update task route
router.put('/updatetask/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTaskData = req.body;

    // Find the task by ID and update it
    const updatedTask = await Task.findByIdAndUpdate(taskId, updatedTaskData, { new: true });

    // If task is not found, return 404
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Send the updated task as JSON response
    res.json(updatedTask);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Delete task route
router.delete('/deletetask/:id', async (req, res) => {
  try {
    const taskId = req.params.id;

    // Find the task by ID and delete it
    const deletedTask = await Task.findByIdAndDelete(taskId);

    // If task is not found, return 404
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
