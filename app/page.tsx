"use client";

import { useState, useEffect } from "react";
import TaskSummary from "../components/TaskSummary";
import TaskCard from "../components/TaskCard";
import ClipboardIcon from "../public/images/Clipboard.svg";
import Image from "next/image";
import axiosInstance from "@/lib/axios";

interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async function fetchTasks() {
      try {
        const response = await axiosInstance.get("/tasks");
        setTasks(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleToggle(id: number) {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (!taskToUpdate) return;

    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

    try {
      await axiosInstance.put(`/tasks/${id}`, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (error: any) {
      setError(error.message);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error: any) {
      setError(error.message);
    }
  }

  return (
    <>
      <TaskSummary
        totalTasks={tasks.length}
        completedTasks={tasks.filter((t) => t.completed).length}
      />
      <div className="mt-6 space-y-4">
        {loading ? (
          <p>Loading tasks...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={() => handleToggle(task.id)}
              onDelete={() => handleDelete(task.id)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-[#808080] mt-10 pt-10 border-t-[1px] border-[#333333] rounded-lg">
            <Image
              src={ClipboardIcon}
              alt="Clipboard Icon"
              className="mx-auto"
            />
            <h2 className="mt-4 font-bold">
              You don't have any tasks registered yet.
            </h2>
            <p className="mt-6">Create tasks and organize your to-do items.</p>
          </div>
        )}
      </div>
    </>
  );
}
