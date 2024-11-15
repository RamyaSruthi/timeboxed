// TaskScheduler.js
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const hours = Array.from({ length: 18 }, (_, i) => {
  const hour = i + 6;
  return {
    time: format(new Date().setHours(hour, 0, 0), 'h:mm a'),
    hour: hour
  };
});

// Progress Bar Component with props properly passed
const ProgressBar = ({ tasks, hours, completedTasks, totalTaskSlots, completionPercentage }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-3xl shadow-xl p-6 mb-6"
  >
    <h2 className="text-lg font-semibold mb-4">Your Day In Motion</h2>
    <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full flex">
        {hours.map((_, index) => (
          <motion.div
            key={index}
            initial={{ scaleY: 0 }}
            animate={{ 
              scaleY: 1,
              backgroundColor: tasks[index]?.completed 
                ? "#10B981" 
                : tasks[index]?.task 
                  ? "#E5E7EB" 
                  : "transparent"
            }}
            transition={{ delay: index * 0.03 }}
            className="flex-1 border-r border-white/20 origin-bottom"
          />
        ))}
      </div>
    </div>
    
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex justify-between mt-2 text-xs text-gray-500"
    >
      {hours.filter((_, i) => i % 3 === 0).map(({ time }, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 + index * 0.1 }}
        >
          {time}
        </motion.span>
      ))}
    </motion.div>

    <motion.div 
      className="mt-4 flex justify-between text-sm text-gray-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <span>{completedTasks} of {totalTaskSlots} tasks completed</span>
      <span>{completionPercentage.toFixed(0)}% complete</span>
    </motion.div>
  </motion.div>
);

const TaskScheduler = ({ selectedDate }) => {
  const dateKey = format(new Date(selectedDate), 'yyyy-MM-dd');
  const [tasks, setTasks] = useState([]);
  const [activeInput, setActiveInput] = useState(null);
  
  const getStoredTasks = (date) => {
    const storedTasks = localStorage.getItem(date);
    if (storedTasks) {
      return JSON.parse(storedTasks);
    }
    return hours.map(() => ({ task: '', completed: false }));
  };

  const toggleTaskCompletion = (index) => {
    if (!tasks[index].task) return;
    
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    localStorage.setItem(dateKey, JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleTaskChange = (index, newTask) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, task: newTask } : task
    );
    localStorage.setItem(dateKey, JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  useEffect(() => {
    setTasks(getStoredTasks(dateKey));
  }, [dateKey]);

  // Calculate completion metrics
  const totalTaskSlots = tasks.filter(task => task.task).length;
  const completedTasks = tasks.filter(task => task.task && task.completed).length;
  const completionPercentage = totalTaskSlots ? 
    (completedTasks / totalTaskSlots) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text"
        >
          {format(new Date(selectedDate), 'EEEE, MMMM d')}
        </motion.h1>

        <ProgressBar 
          tasks={tasks}
          hours={hours}
          completedTasks={completedTasks}
          totalTaskSlots={totalTaskSlots}
          completionPercentage={completionPercentage}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl p-6"
        >
          <div className="max-h-[600px] overflow-y-auto">
            <AnimatePresence>
              {hours.map((hour, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group flex items-center mb-3 last:mb-0"
                >
                  <div className="w-20 text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                    {hour.time}
                  </div>

                  <motion.div 
                    className="flex-grow"
                    whileHover={{ scale: 1.01 }}
                    onClick={() => tasks[index]?.task && toggleTaskCompletion(index)}
                  >
                    {tasks[index]?.completed ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="px-4 py-3 cursor-pointer"
                      >
                        <span className="line-through text-gray-400 decoration-2">
                          {tasks[index].task}
                        </span>
                      </motion.div>
                    ) : (
                      <div className="px-4 py-3">
                        <input
                          type="text"
                          value={tasks[index]?.task || ''}
                          onChange={(e) => handleTaskChange(index, e.target.value)}
                          onFocus={() => setActiveInput(index)}
                          onBlur={() => setActiveInput(null)}
                          className={`w-full focus:outline-none ${
                            activeInput === index 
                              ? 'text-gray-800'
                              : tasks[index]?.task 
                                ? 'text-gray-800'
                                : 'text-gray-400'
                          }`}
                          placeholder="Add task"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TaskScheduler;