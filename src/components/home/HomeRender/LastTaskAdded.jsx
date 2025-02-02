import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase/config";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import Spinner from "../../others/Spinner";
import { FaCheck } from "react-icons/fa";
import { useUserColor } from "../../../contexts/UserColorContext";

const LastTaskAdded = () => {
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

  const debug = () => {
    console.log(tasks.length);
  };

  return (
    <>
      {loading ? (
        <div className="w-full justify-center items-center flex ">
          <Spinner />
        </div>
      ) : (
        <div>
          {tasks.length < 1 ? (
            <h1 className="font-medium text-xl lg:text-2xl text-[#4A6A83] dark:text-[#728AA1] text-center">
              You have not created any tasks yet, go to the "Task" section to
              create a new task
            </h1>
          ) : (
            <div className="grid gap-2">
              <h1 className="font-medium text-xl lg:text-2xl text-[#4A6A83] dark:text-[#728AA1]">
                Recent Added Task
              </h1>
              {tasks.map((task) => (
                <div
                  className="dark:bg-[#152232] bg-[#FAFAFA] rounded-lg  flex gap-4 dark:text-[#728AA1] text-[#4A6A83] items-center px-4 py-2"
                  key={task.id}
                >
                  <span className="text-3xl">{task.emoji}</span>
                  <div className="flex-1 ">
                    <h2 className="line-clamp-1 text-xl font-semibold">
                      {task.title}
                    </h2>
                    <p className="text-sm line-clamp-1">{task.description}</p>
                  </div>
                  {task.completed ? (
                    <div
                      className="w-7 h-7 rounded-full  flex items-center justify-center text-white"
                      style={{ backgroundColor: userColor }}
                    >
                      <FaCheck />
                    </div>
                  ) : (
                    <div
                      className="w-7 h-7 rounded-full border-2 "
                      style={{ borderColor: userColor }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LastTaskAdded;
