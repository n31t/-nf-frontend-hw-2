'use client'

import { useState } from 'react';
import { useEffect } from 'react';
import TaskList from './components/TaskList';

const taskList = [{id: 1, text: "Todo Test", completed: false}]

export default function Home() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(taskList);
  // const [tasks, setTasks] = useState(() => {
  //   if (typeof window !== 'undefined') {
  //     const savedTasks = window.localStorage.getItem('tasks');
  //     if (savedTasks) {
  //       return JSON.parse(savedTasks);
  //     }
  //   }
  //   return taskList;
  // });
  const [filter, setFilter] = useState('all')
  const [itemsLeft, setItemsLeft] = useState(0)
  

  // useEffect(() => {
  //   const savedTasks = localStorage.getItem('tasks');
  //   if (savedTasks) {
  //     setTasks(JSON.parse(savedTasks));
  //   }
  // }, []);

  useEffect(() => {
    calculateItemsLeft()
  }, [tasks])

  // useEffect(() => {
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }, [tasks]);


  const handleAddTask = () => {
    if( task === '') return;
    const newTask = {
      id: tasks.length +1,
      text: task,
      completed: false
    }
    setTask('')
    setTasks([...tasks, newTask])
  };

  const handleToggleTask = (id) => {
    const newTasks = [...tasks]
    newTasks.map((task) => {
      if(task.id === id) {
        task.completed = !task.completed
      }
    })
    setTasks(newTasks)
  };

  const handleDeleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id)
    newTasks.map((task, index) => task.id = index + 1)
    setTasks(newTasks)
  };

  const calculateItemsLeft = () => {
    const newcounter = tasks.filter((task) => !task.completed).length
    setItemsLeft(newcounter)
  }

  const clearCompleted = () => {
    const newTasks = tasks.filter((task) => !task.completed)
    newTasks.map((task, index) => task.id = index + 1)
    setTasks(newTasks)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
        
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do ?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          onClick={
            task === '' ? () => alert("Please enter a task") :
            handleAddTask
          }
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
        {/* Medium level: extract todo's listing to TaskList component */}
        <TaskList 
          tasks={tasks} 
          handleToggleTask={handleToggleTask} 
          handleDeleteTask={handleDeleteTask} 
          filter={filter}
        />
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span> {itemsLeft} items left</span> 
          <div>
            <button onClick={() => setFilter("all")} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All</button>
            <button onClick={() => setFilter("active")} className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>Active</button>
            <button onClick={() => setFilter("completed")} className={`${filter === 'completed' ? 'text-white' : ''}`}>Completed</button>
          </div>
          <button
            onClick={() => clearCompleted()}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>


  );
}
