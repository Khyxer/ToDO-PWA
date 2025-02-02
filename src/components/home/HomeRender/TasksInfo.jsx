import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase/config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  doc,
  getDoc,
} from "firebase/firestore";
import Spinner from "../../others/Spinner";
import { FaCheck } from "react-icons/fa";
import { useUserColor } from "../../../contexts/UserColorContext";

const TasksInfo = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userColor } = useUserColor();

  const fetchTasks = async () => {
    try {
      const userId = auth.currentUser.uid;
      const tasksRef = collection(db, `users/${userId}/tasks`);

      const q = query(tasksRef, orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(q);
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

  const completedTasks = tasks.filter((task) => task.completed === true);
  const pendingTasks = tasks.filter((task) => task.completed === false);
  const midTask = tasks.length / 2;

  const calculatePorcentage = (completedTasks.length / tasks.length) * 100;

  return (
    <>
      <div className="h-20 bg-[#FAFAFA] dark:bg-[#152232] rounded-lg text-[#4A6A83] dark:text-[#728AA1] flex justify-between lg:justify-around p-6 lg:p-12  items-center text-base lg:text-xl lg:font-semibold ">
        <div className="flex flex-col items-center ">
          <span className="font-bold" style={{ color: userColor }}>
            {tasks.length}
          </span>
          Total Task
        </div>
        <div className="flex flex-col items-center ">
          <span className="font-bold " style={{ color: userColor }}>
            {completedTasks.length}
          </span>
          Completed
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold" style={{ color: userColor }}>
            {pendingTasks.length}
          </span>
          Pending
        </div>
      </div>
      {tasks.length > 2 && (
        <div className="grid gap-2">
          <div className="text-[#4A6A83] dark:text-[#728AA1] flex justify-between lg:text-xl font-semibold ">
            <span>0</span>
            <span>{midTask}</span>
            <span>{tasks.length}</span>
          </div>
          <div className="bg-[#728AA1] h-2 rounded-full overflow-hidden">
            <div
              className=" h-full rounded-full duration-300"
              style={{
                width: `${calculatePorcentage}%`,
                backgroundColor: userColor,
              }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default TasksInfo;
