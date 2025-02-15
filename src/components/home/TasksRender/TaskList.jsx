import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
import Spinner from "../../others/Spinner";
import gsap from "gsap";
import { useUserColor } from "../../../contexts/UserColorContext";
import EditTaskModal from "./EditTaskModal";

const TaskList = ({
  status,
  tasks,
  updateTask,
  onTaskUpdate,
  onTaskDelete,
}) => {
  const [loading, setLoading] = useState(false);
  const [localTasks, setLocalTasks] = useState(tasks);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { userColor } = useUserColor();

  useEffect(() => {
    const newTasks = tasks.filter(
      (task) => !localTasks.find((t) => t.id === task.id)
    );

    newTasks.forEach((task) => {
      const element = document.querySelector(`[data-task-id="${task.id}"]`);
      if (element) {
        gsap.set(element, {
          x: status === "completed" ? -100 : 100,
          opacity: 0,
        });

        gsap.to(element, {
          x: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });

    setLocalTasks(tasks);
  }, [tasks, status]);

  const animateOut = async (element, direction) => {
    if (!element) return;

    return gsap.to(element, {
      x: direction === "right" ? 100 : -100,
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  const handleToggleComplete = async (taskId, completed) => {
    setLoading(true);
    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);

    try {
      if (status !== "completed" && completed) {
        await animateOut(taskElement, "right");
      } else if (status === "completed" && !completed) {
        await animateOut(taskElement, "left");
      }

      await updateTask(taskId, completed);
    } catch (error) {
      toast.error("Error updating task.");
      console.error("Error updating task:", error);

      gsap.to(taskElement, {
        x: 0,
        opacity: 1,
        duration: 0.3,
      });
    }

    setLoading(false);
  };

  const handleEditTaskModal = (task) => {
    setSelectedTask(task);
    setEditTaskModal(true);
  };

  return (
    <>
      {tasks.length === 0 ? (
        <>
          {status === "completed" ? null : (
            <p
              className="dark:text-[#728AA1] text-[#4A6A83] font-semibold lg:font-bold text-xl lg:text-2xl 
            text-center"
            >
              Add task by clicking the{" "}
              <span className="text-blue-500">"+"</span> icon
            </p>
          )}
        </>
      ) : (
        <div>
          <header className="mb-6">
            <h1 className="font-medium text-xl lg:text-2xl text-[#4A6A83] dark:text-[#728AA1]">
              {status === "completed" ? "Completed" : "Pending"}
            </h1>
          </header>
          <main className="w-full flex items-center justify-center ">
            <div
              className="dark:bg-[#152232] bg-[#FAFAFA] dark:text-[#728AA1] text-[#4A6A83] rounded-lg w-full 
            p-4 lg:px-10 grid gap-6"
            >
              <div className="flex font-bold text-lg lg:text-xl justify-between pl-5">
                <h1>Icon</h1>
                <h1>Title/Desc</h1>
                <h1>Status</h1>
              </div>
              <div className="flex flex-col gap-2 ">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    data-task-id={task.id}
                    style={{ opacity: 1, transform: "translateX(0)" }}
                    className="flex gap-12 items-center duration-150 cursor-pointer dark:hover:bg-[#1e57982e] 
                    hover:bg-[#c0bfbf3c] p-2 rounded-xl "
                  >
                    <div
                      className="flex flex-1 gap-12"
                      onClick={() => handleEditTaskModal(task)}
                    >
                      <span className="text-4xl lg:text-5xl select-none sm:min-w-[6%] flex justify-center items-center">
                        {task.emoji}
                      </span>
                      <div className="flex justify-center flex-col flex-1">
                        <h2 className="lg:text-2xl text-lg font-semibold line-clamp-2 ">
                          {task.title}
                        </h2>
                        <p className="line-clamp-1 text-sm lg:text-base">
                          {task.description}
                        </p>
                      </div>
                    </div>
                    {task.completed ? (
                      <div
                        className="w-7 h-7 rounded-full  cursor-pointer flex items-center justify-center text-white"
                        style={{ backgroundColor: userColor }}
                        onClick={() => handleToggleComplete(task.id, false)}
                      >
                        <FaCheck />
                      </div>
                    ) : (
                      <div
                        className="w-7 h-7 rounded-full border-2 cursor-pointer"
                        style={{ borderColor: userColor }}
                        onClick={() => handleToggleComplete(task.id, true)}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      )}
      {editTaskModal && (
        <EditTaskModal
          handleCloseModal={() => {
            setEditTaskModal(false);
            setSelectedTask(null);
          }}
          task={selectedTask}
          onTaskUpdate={onTaskUpdate}
          onTaskDelete={onTaskDelete}
        />
      )}
    </>
  );
};

export default TaskList;
