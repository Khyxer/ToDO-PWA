import { useEffect, useRef, useState } from "react";
import { auth, db } from "../../../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useUserColor } from "../../../contexts/UserColorContext";
import gsap from "gsap";
import Spinner from "../../others/Spinner";

const TasksInfo = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userColor } = useUserColor();
  const barRef = useRef(null);

  const completedTasks = tasks.filter((task) => task.completed === true);
  const pendingTasks = tasks.filter((task) => task.completed === false);
  const midTask = tasks.length / 2;

  const calculatePorcentage = (completedTasks.length / tasks.length) * 100;

  const runAnimation = () => {
    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        {
          width: "0%",
          opacity: 0,
        },
        {
          width: `${calculatePorcentage}%`,
          opacity: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.75)",
        }
      );
    }
  };

  useEffect(() => {
    if (!loading && tasks.length > 0) {
      runAnimation();
    }
  }, [tasks, loading]);

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

  return (
    <>
      {!loading && (
        <main>
          {tasks.length > 0 && (
            <div>
              {pendingTasks.length === 0 && (
                <h2
                  className="text-2xl lg:text-4xl lg:font-bold text-center dark:text-[#728AA1] text-[#4A6A83] 
                font-semibold mb-14 "
                >
                  🎉 ¡Congratulations you are completed all task! 🎉
                </h2>
              )}
              <div
                className="h-20 bg-[#FAFAFA] dark:bg-[#152232] rounded-lg text-[#4A6A83] dark:text-[#728AA1] 
              flex justify-between lg:justify-around p-6 lg:p-12  items-center text-base lg:text-xl lg:font-semibold "
              >
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
            </div>
          )}

          {tasks.length > 2 && (
            <div className="grid gap-2 mt-7">
              <div className="text-[#4A6A83] dark:text-[#728AA1] flex justify-between lg:text-xl font-semibold ">
                <span>0</span>
                <span>{midTask}</span>
                <span>{tasks.length}</span>
              </div>
              <div className="bg-[#728AA1] h-2 rounded-full overflow-hidden">
                <div
                  ref={barRef}
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: userColor,
                  }}
                ></div>
              </div>
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default TasksInfo;
