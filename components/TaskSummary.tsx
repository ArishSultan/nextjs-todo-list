export default function TaskSummary({
  totalTasks,
  completedTasks,
}: {
  totalTasks: number;
  completedTasks: number;
}) {
  return (
    <div className="flex justify-between items-center text-sm text-gray-400">
      <p>
        <span className="text-primary font-bold">Total: </span>
        <span className="bg-[#333333] py-0.5 px-2 rounded-full ">
          {totalTasks}
        </span>
      </p>
      <p>
        <span className="text-secondary font-bold">Completed: </span>
        <span className="bg-[#333333] py-0.5 px-2 rounded-full">
          {totalTasks === 0 ? 0 : `${completedTasks} of ${totalTasks}`}
        </span>
      </p>
    </div>
  );
}
