// src/components/TaskList.js

import React, { useState, useEffect } from 'react';
import TaskProgress from './TaskComp.js';

const api = process.env.REACT_APP_API_URL;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the server
    const fetchTasks = async () => {
      try {
        let data = '';
        data = await fetch(`${api}/getTasks`)
          .then(response => response.json());
        console.log(data);
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>Loading tasks...</p>
      ) : (
        tasks.map(task => (
          <TaskProgress key={task.id} task={task} />
        ))
      )}
    </div>
  );
};

export default TaskList;
