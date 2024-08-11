const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv').config();

// const port = 5000;
const filePath = path.join(__dirname, 'tasks.json');

app.use(express.json());
const PORT = process.env.PORT || 3000;
app.use(cors());
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/getTasks' , (req , res)=>{    
      // read JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading file');
        return;
      }
      res.json(JSON.parse(data));
})
});

app.post('/saveChanges',(req , res)=>{
    const { id, status, dateSubmitted, dateCompleted } = req.body;
  // Read the JSON file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading file' });
    }

    let tasks;
    try {
      tasks = JSON.parse(data);
    } catch (err) {
      return res.status(500).json({ error: 'Error parsing JSON' });
    }

    // Find the task to update
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update the task
    tasks[taskIndex] = { ...tasks[taskIndex], status, dateSubmitted, dateCompleted };

    // Write the updated JSON back to the file
    fs.writeFile(filePath, JSON.stringify(tasks, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error writing file' });
      }

      res.status(200).json({ message: 'Task updated successfully', data: tasks[taskIndex] });
    });
  });

});

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });







