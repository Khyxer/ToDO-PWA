import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import EmojiPickerInput from "../../EmojiPickerInput";
import { toast } from "react-toastify";
import Loading from "../../Loading";
import { auth, db } from "../../../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import Spinner from "../../others/Spinner";
import TaskList from "./TaskList";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { useUserColor } from "../../../contexts/UserColorContext";

const TasksSection = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);
  const bgRef = useRef(null);
  const { userColor } = useUserColor();

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

  const handleEmojiChange = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleTaskUpdate = async (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleTaskDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleAddTask = async () => {
    if (!selectedEmoji || !taskName || !taskDesc) {
      toast.error("You need to complete all inputs");
      return;
    }
    setIsLoading(true);

    try {
      const userId = auth.currentUser.uid;
      const taskData = {
        emoji: selectedEmoji,
        title: taskName,
        description: taskDesc,
        completed: false,
        createdAt: serverTimestamp(),
      };

      const taskRef = collection(db, `users/${userId}/tasks`);
      await addDoc(taskRef, taskData);

      setIsLoading(false);
      toast.success("Task added successfully");
      handleCloseModal();
      fetchTasks();
    } catch (error) {
      setIsLoading(false);
      toast.error("Error adding task");
      console.error("something went wrong:", error);
    }
  };

  const handleCloseModal = () => {
    setCloseModal(true);
  };

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    if (openModal) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.2,
        }
      );
      gsap.fromTo(
        bgRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.2,
        }
      );
    }

    if (closeModal) {
      gsap.fromTo(
        modalRef.current,
        {
          scale: 1,
          opacity: 1,
        },
        {
          scale: 1.2,
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            setOpenModal(false);
            setCloseModal(false);
          },
        }
      );
      gsap.fromTo(
        bgRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          duration: 0.2,
        }
      );
    }
  }, [openModal, closeModal]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div
        onClick={handleOpenModal}
        className="fixed z-10 bottom-5 right-5 text-4xl p-2  text-white cursor-pointer rounded-full shadow-md "
        style={{ backgroundColor: userColor }}
      >
        <FaPlus />
      </div>
      {openModal && (
        <>
          {isLoading && (
            <div className="z-[200] fixed">
              <Loading message={"Creating task"} />
            </div>
          )}
          <div
            className="z-50 h-screen fixed w-full top-0 left-0  bg-[#0b1622ad] flex justify-center items-center"
            ref={bgRef}
            onClick={handleCloseModal}
          >
            <section
              ref={modalRef}
              className="dark:bg-[#152232] bg-[#FAFAFA] z-[51] text-[#4A6A83] lg:w-[50%] w-[90%] items-center 
              justify-center dark:text-[#728AA1] px-6 py-2 pb-10 gap-4 rounded-lg flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <header className="w-full text-4xl flex justify-end">
                <IoClose
                  onClick={handleCloseModal}
                  className="cursor-pointer hover:bg-[#728aa11f] rounded-full duration-150"
                />
              </header>
              <h1 className="font-extrabold text-3xl">Add Task</h1>
              <div className="flex w-full flex-col gap-4">
                <div className="grid gap-2">
                  <h2 className="font-semibold text-2xl">Icon Task</h2>
                  <div className="w-fit">
                    <EmojiPickerInput onEmojiSelect={handleEmojiChange} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <h2 className="font-semibold text-2xl">Task Name</h2>
                  <input
                    type="text"
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Buy a new computer"
                    className="border border-[#728AA143] bg-[#728AA113] rounded-sm placeholder:text-[#728AA155] 
                    font-semibold p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none 
                    transition-all duration-200"
                  />
                </div>
                <div className="grid gap-2">
                  <h2 className="font-semibold text-2xl">Task Description</h2>
                  <textarea
                    rows={5}
                    placeholder="Go to a real store to buy a new computer"
                    onChange={(e) => setTaskDesc(e.target.value)}
                    className="border border-[#728AA143] bg-[#728AA113] rounded-sm placeholder:text-[#728AA155] 
                    font-semibold p-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                    transition-all duration-200"
                  ></textarea>
                </div>
                <button
                  className=" bg-[#2696E0] dark:bg-[#027FBE] outline-none px-4 py-1 rounded-lg text-white 
                  font-bold text-lg"
                  onClick={handleAddTask}
                >
                  Add Task
                </button>
              </div>
            </section>
          </div>
        </>
      )}
      <TaskList
        status="pending"
        tasks={tasks.filter((task) => !task.completed)}
        updateTask={updateTask}
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
      />
      <TaskList
        status="completed"
        tasks={tasks.filter((task) => task.completed)}
        updateTask={updateTask}
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
      />
    </div>
  );
};

export default TasksSection;
