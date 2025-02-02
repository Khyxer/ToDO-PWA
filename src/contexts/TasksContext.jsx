import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const userId = auth.currentUser.uid;
      const tasksRef = collection(db, `users/${userId}/tasks`);
      const querySnapshot = await getDocs(tasksRef);
      const tasksData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  const addTask = async (newTask) => {
    try {
      const userId = auth.currentUser.uid;
      const taskData = {
        ...newTask,
        completed: false,
        createdAt: serverTimestamp(),
      };
      const taskRef = collection(db, `users/${userId}/tasks`);
      await addDoc(taskRef, taskData);
      fetchTasks(); // Actualiza la lista de tareas
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      fetchTasks();
    }
  }, []);

  return (
    <TasksContext.Provider value={{ tasks, loading, addTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
