"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import backIcon from "../../public/images/back-arrow.svg";
import axiosInstance from "@/lib/axios";
import TaskForm from "@/components/TaskForm";

export default function CreateTaskPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async (data: { title: string; color: string }) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/tasks", data);

      if (response.status === 201) {
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (err) {
      console.error("Failed to create task:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-2">
      <Image
        src={backIcon}
        alt="Back Icon"
        onClick={() => router.push("/")}
        className="cursor-pointer mb-10"
      />
      <TaskForm
        onSubmit={handleCreate}
        buttonText="Add Task"
        isLoading={isLoading}
      />
    </div>
  );
}
