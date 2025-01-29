import React from "react";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";

const TaskList = ({ status, tasks, updateTask }) => {
  const handleToggleComplete = async (taskId, completed) => {
    try {
      await updateTask(taskId, completed);
      toast.success("Task updated successfully");
    } catch (error) {
      toast.error("Error updating task.");
      console.error("Error updating task:", error);
    }
  };

  return (
    <>
      {tasks.length === 0 ? (
        <>
          {status === "completed" ? null : (
            <p className="dark:text-[#728AA1] text-[#4A6A83] font-semibold lg:font-bold text-xl lg:text-2xl text-center">
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
          <main className="w-full flex items-center justify-center">
            <div className="dark:bg-[#152232] bg-[#FAFAFA] dark:text-[#728AA1] text-[#4A6A83] rounded-lg w-full p-4 lg:px-10 grid gap-6">
              <div className="flex font-bold text-lg lg:text-xl ">
                <h1>Icon</h1>
                <h1 className="flex-1 text-center">Title/Desc</h1>
                <h1>Status</h1>
              </div>
              <div className="flex flex-col gap-5">
                {tasks.map((task) => (
                  <div key={task.id} className="flex gap-12 items-center">
                    <span className="text-4xl lg:text-5xl select-none ">
                      {task.emoji}
                    </span>
                    <div className="flex justify-center flex-col flex-1">
                      <h2 className="lg:text-2xl text-lg font-semibold">
                        {task.title}
                      </h2>
                      <p className="line-clamp-1 text-sm lg:text-base">
                        {task.description}
                      </p>
                    </div>
                    {task.completed ? (
                      <div
                        className="w-7 h-7 rounded-full bg-blue-600 cursor-pointer flex items-center justify-center text-white "
                        onClick={() => handleToggleComplete(task.id, false)}
                      >
                        <FaCheck />
                      </div>
                    ) : (
                      <div
                        className="w-7 h-7 rounded-full  border-2 border-blue-600 cursor-pointer"
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
    </>
  );
};

export default TaskList;
