import React, { useState } from "react";
import { create } from "zustand";
import { Button, Input } from "shadcn-ui"; // Ensure proper import path

// Zustand Store
const useTaskStore = create((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  removeTask: (index) =>
    set((state) => ({ tasks: state.tasks.filter((_, i) => i !== index) })),
}));

export default function App() {
  const { tasks, addTask, removeTask } = useTaskStore();
  const [task, setTask] = useState("");

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-xl">
      <h1 className="text-xl font-bold mb-4">Task Manager</h1>
      <div className="flex space-x-2">
        <Input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter task" />
        <Button onClick={() => { addTask(task); setTask(""); }}>Add</Button>
      </div>
      <ul className="mt-4">
        {tasks.map((t, i) => (
          <li key={i} className="flex justify-between items-center p-2 bg-gray-100 mt-2 rounded">
            {t} <Button variant="destructive" onClick={() => removeTask(i)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
