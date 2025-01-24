import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { gsap } from "gsap";
import AddTaskModal from "./AddTaskModal";

const AddTaskButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);

  function handleCloseModal() {
    setCloseModal(true);
  }

  function handleOpenModal() {
    setOpenModal(!openModal);
  }

  return (
    <>
      <div className="fixed z-10  bottom-5 right-5 text-4xl p-2 bg-[#027FBE] text-white cursor-pointer rounded-full ">
        <FaPlus onClick={handleOpenModal} />
      </div>
      {openModal ? (
        <AddTaskModal
          setCloseModal={setCloseModal}
          setOpenModal={setOpenModal}
          handleCloseModal={handleCloseModal}
          openModal={openModal}
          closeModal={closeModal}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default AddTaskButton;
