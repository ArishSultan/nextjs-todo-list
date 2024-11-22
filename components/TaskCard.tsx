"use client";
import Image from "next/image";
import TrashIcon from "../public/images/Trash.svg";
import EditIcon from "../public/images/edit.png";
import Link from "next/link";

export default function TaskCard({
  task,
  onToggle,
  onDelete,
}: {
  task: {
    id: number;
    title: string;
    color: string;
    completed: boolean;
  };
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 rounded-md">
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={onToggle}
      >
        <label className="flex items-center relative cursor-pointer">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={onToggle}
            className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded-full border border-primary checked:bg-secondary checked:border-secondary"
          />
          <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
            >
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
            </svg>
          </span>
        </label>

        <p
          className={`text-sm font-normal ${task.completed && "line-through"}`}
          style={{ color: task.color }}
        >
          {task.title}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link href={`/edit/${task.id}`}>
          <Image
            src={EditIcon}
            alt="Edit Icon"
            className="cursor-pointer"
            width={15}
          />
        </Link>
        <Image
          src={TrashIcon}
          alt="Delete Icon"
          onClick={onDelete}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
