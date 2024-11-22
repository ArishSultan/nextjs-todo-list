"use client";

import { useState } from "react";
import Image from "next/image";
import PlusIcon from "../public/images/plus.svg";
import { COLORS } from "@/utils/constants";

interface TaskFormProps {
  initialData?: { title: string; color: string };
  onSubmit: (data: { title: string; color: string }) => Promise<void>;
  isLoading?: boolean;
  buttonText: string;
}

export default function TaskForm({
  initialData = { title: "", color: "#FF3B30" },
  onSubmit,
  isLoading = false,
  buttonText,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialData.title);
  const [color, setColor] = useState(initialData.color);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    setError("");
    await onSubmit({ title, color });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-2 font-bold text-sm text-primary">
          Title
        </label>
        <input
          type="text"
          className="w-full px-4 h-12 rounded-md bg-[#262626] text-white placeholder:text-[#5a5a5a] outline-none"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => {
            setError("");
            setTitle(e.target.value);
          }}
        />
      </div>
      <div>
        <label className="block mb-2 font-bold text-sm text-primary">
          Color
        </label>
        <div className="flex flex-wrap gap-4">
          {COLORS.map((clr) => (
            <button
              key={clr}
              className={`w-12 h-12 rounded-full ${
                clr === color ? "ring-2 ring-white" : ""
              }`}
              style={{ backgroundColor: clr }}
              type="button"
              onClick={() => setColor(clr)}
            />
          ))}
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-primary text-white flex items-center justify-center gap-2 rounded-lg h-14"
          disabled={isLoading}
        >
          {isLoading ? (
            <span>Saving...</span>
          ) : (
            <>
              {buttonText}
              {buttonText === "Add Task" && <Image src={PlusIcon} alt="Icon" />}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
