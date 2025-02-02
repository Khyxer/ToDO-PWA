import LastTaskAdded from "./LastTaskAdded";
import TasksInfo from "./TasksInfo";

const HomeSection = () => {
  return (
    <>
      <div className="grid gap-7" >
        <TasksInfo />
        <LastTaskAdded />
      </div>
    </>
  );
};

export default HomeSection;
