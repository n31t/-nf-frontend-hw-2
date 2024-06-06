import React from 'react';
import TaskItem from '../TaskItem';

export default function TaskList({ tasks, handleToggleTask, handleDeleteTask, filter }) {
  var filteredTasks = tasks;
  switch(filter) {
    case 'all':
      break;
    case 'active':
      filteredTasks = tasks.filter((task) => !task.completed);
      break;
    case 'completed':
      filteredTasks = tasks.filter((task) => task.completed);
      break;
    default:
      break;
  }

  return (
    <ul>
      {filteredTasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          handleToggleTask={handleToggleTask} 
          handleDeleteTask={handleDeleteTask} 
        />
      ))}
    </ul>
  );
}
