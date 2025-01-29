import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase/config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import Spinner from "../../others/Spinner";
import TaskList from "./TaskList";

const TasksSection = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para cargar todas las tareas
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

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateTask = async (taskId, completed) => {
    try {
      const userId = auth.currentUser.uid;
      const taskRef = doc(db, `users/${userId}/tasks`, taskId);
      await updateDoc(taskRef, { completed });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <TaskList
        status="pending"
        tasks={tasks.filter((task) => !task.completed)}
        updateTask={updateTask}
      />
      <TaskList
        status="completed"
        tasks={tasks.filter((task) => task.completed)}
        updateTask={updateTask}
      />
    </div>
  );
};

export default TasksSection;
