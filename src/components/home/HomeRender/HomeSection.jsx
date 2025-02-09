import LastTaskAdded from "./LastTaskAdded";
import TasksInfo from "./TasksInfo";

const HomeSection = () => {
  return (
    <>
      <div className="grid gap-12 lg:mt-7">
        <TasksInfo />
        <LastTaskAdded />
      </div>
    </>
  );
};

export default HomeSection;
