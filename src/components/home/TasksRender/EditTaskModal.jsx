import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { IoClose } from "react-icons/io5";
import EmojiPickerInput from "../../EmojiPickerInput";
import { toast } from "react-toastify";
import Loading from "../../Loading";
import { auth, db } from "../../../firebase/config";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

const EditTaskModal = ({
  handleCloseModal,
  task,
  onTaskUpdate,
  onTaskDelete,
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState(task?.emoji || "");
  const [taskName, setTaskName] = useState(task?.title || "");
  const [taskDesc, setTaskDesc] = useState(task?.description || "");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const modalRef = useRef(null);
  const bgRef = useRef(null);

  const handleEmojiChange = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const saveTask = async () => {
    if (!selectedEmoji || !taskName || !taskDesc) {
      toast.error("You need to complete all inputs");
      return;
    }

    try {
      setMessage("Updating task...");

      setIsLoading(true);
      const userId = auth.currentUser.uid;
      const taskRef = doc(db, `users/${userId}/tasks`, task.id);

      const updatedTask = {
        emoji: selectedEmoji,
        title: taskName,
        description: taskDesc,
        completed: task.completed,
        updatedAt: new Date(),
      };

      await updateDoc(taskRef, updatedTask);

      onTaskUpdate({
        ...task,
        ...updatedTask,
      });

      toast.success("Task updated successfully");
      handleCloseModal();
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Error updating task");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async () => {
    try {
      setMessage("Deleting task...");
      setIsLoading(true);
      const userId = auth.currentUser.uid;
      const taskRef = doc(db, `users/${userId}/tasks`, task.id);
      await deleteDoc(taskRef);

      onTaskDelete(task.id);

      handleClose();
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error to delete task:", error);
      toast.error("Error deleting task");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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

    const handleClose = () => {
      return new Promise((resolve) => {
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
            onComplete: resolve,
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
      });
    };

    modalRef.current.closeWithAnimation = handleClose;
  }, []);

  const handleClose = async () => {
    await modalRef.current.closeWithAnimation();
    handleCloseModal();
  };

  return (
    <>
      {isLoading && (
        <div className="z-[200] fixed">
          <Loading message={message} />
        </div>
      )}
      <div
        ref={bgRef}
        className="z-50 h-screen top-0 left-0 fixed w-full bg-[#0b1622ad] flex justify-center items-center"
        onClick={handleClose}
      >
        <section
          ref={modalRef}
          className="dark:bg-[#152232] bg-[#FAFAFA] z-[51] text-[#4A6A83] lg:w-[50%] w-[90%] items-center 
          justify-center dark:text-[#728AA1] px-6 py-2 pb-10 gap-4 rounded-lg flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <header className="w-full text-4xl flex justify-end">
            <IoClose
              onClick={handleClose}
              className="cursor-pointer hover:bg-[#728aa11f] rounded-full duration-150"
            />
          </header>
          <h1 className="font-extrabold text-3xl">Edit Task</h1>
          <div className="flex w-full flex-col gap-4">
            <div className="grid gap-2">
              <h2 className="font-semibold text-2xl">Icon Task</h2>
              <div className="w-fit">
                <EmojiPickerInput
                  onEmojiSelect={handleEmojiChange}
                  defaultEmoji={task?.emoji}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <h2 className="font-semibold text-2xl">Task Name</h2>
              <input
                type="text"
                value={taskName}
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
                value={taskDesc}
                placeholder="Go to a real store to buy a new computer"
                onChange={(e) => setTaskDesc(e.target.value)}
                className="border border-[#728AA143] bg-[#728AA113] rounded-sm placeholder:text-[#728AA155] 
                font-semibold p-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition-all duration-200"
              ></textarea>
            </div>
            <div
              className="flex lg:flex-row-reverse gap-4 flex-col justify-between border-t border-[#728AA143] pt-4 
              font-semibold text-lg  text-white"
            >
              <button
                className="bg-[#2696E0] dark:bg-[#027FBE] outline-none px-4 py-1 rounded-lg"
                onClick={saveTask}
              >
                Update Task
              </button>
              <button
                className="bg-red-600 dark:bg-red-700 outline-none px-4 py-1 rounded-lg"
                onClick={deleteTask}
              >
                Delete Task
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EditTaskModal;
