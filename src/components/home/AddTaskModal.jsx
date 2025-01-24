import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { IoClose } from "react-icons/io5";

const AddTaskModal = ({
  handleCloseModal,
  openModal,
  closeModal,
  setCloseModal,
  setOpenModal,
}) => {
  const modalRef = useRef(null);
  const bgRef = useRef(null);

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
  }, [openModal, closeModal, setCloseModal, setOpenModal]);

  return (
    <>
      <div
        className="z-50 h-screen fixed w-full bg-[#0b1622ad] flex justify-center items-center"
        ref={bgRef}
        onClick={handleCloseModal}
      >
        <section
          ref={modalRef}
          className="dark:bg-[#152232] bg-[#FAFAFA] z-[51] text-[#4A6A83] lg:w-[50%] w-[90%] items-center justify-center dark:text-[#728AA1] px-6 py-2 pb-10 gap-4 rounded-lg flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <header className="w-full text-4xl flex justify-end ">
            <IoClose
              onClick={handleCloseModal}
              className="cursor-pointer hover:bg-[#728aa11f] rounded-full duration-150"
            />
          </header>
          <h1 className="font-extrabold text-3xl">Add Task</h1>
          <div className="flex w-full flex-col gap-4">
            <div className="grid gap-2">
              <h2 className="font-semibold text-2xl">Icon Task</h2>
              <div className="border-dashed border-2 rounded-lg h-12 w-12 dark:border-[#728AA1] border-[#4A6A83] cursor-pointer hover:bg-[#728AA113] hover:scale-105  duration-150"></div>
            </div>
            <div className="grid gap-2">
              <h2 className="font-semibold text-2xl">Task Name</h2>
              <input
                type="text"
                placeholder="Buy a new computer"
                className="border border-[#728AA143] bg-[#728AA113] rounded-sm placeholder:text-[#728AA155] font-semibold p-2 outline-none"
              />
            </div>
            <div className="grid gap-2">
              <h2 className="font-semibold text-2xl">Task Description</h2>
              <textarea
                rows={5}
                placeholder="Go to a real store to buy a new computer"
                className="border border-[#728AA143] bg-[#728AA113] rounded-sm placeholder:text-[#728AA155] font-semibold p-2 outline-none"
              ></textarea>
            </div>
            <button className=" bg-[#2696E0] dark:bg-[#027FBE] outline-none px-4 py-1 rounded-lg text-white font-bold text-lg">
              Add Task
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default AddTaskModal;
