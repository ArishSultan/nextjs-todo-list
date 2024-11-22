"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import backIcon from "../../../public/images/back-arrow.svg";
import axiosInstance from "@/lib/axios";
import TaskForm from "@/components/TaskForm";

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const [initialData, setInitialData] = useState<{
    title: string;
    color: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axiosInstance.get(`/tasks/${params.id}`);
        setInitialData(response.data);
      } catch (error) {
        console.error("Failed to load task data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [params.id]);

  const handleUpdate = async (data: { title: string; color: string }) => {
    try {
      setIsUpdating(true);
      await axiosInstance.put(`/tasks/${params.id}`, data);
      router.push("/");
    } catch (err) {
      console.error("Failed to update task:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return <p>Loading task...</p>;
  if (!initialData) return <p>Task not found.</p>;

  return (
    <div>
      <Image
        src={backIcon}
        alt="Back Icon"
        onClick={() => router.push("/")}
        className="cursor-pointer mb-10"
      />
      <TaskForm
        initialData={initialData}
        onSubmit={handleUpdate}
        buttonText="Update Task"
        isLoading={isUpdating}
      />
    </div>
  );
}
