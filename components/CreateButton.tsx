"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PlusIcon from "../public/images/plus.svg";

export default function CreateButton() {
  const pathname = usePathname();

  return (
    pathname === "/" && (
      <div className="container mx-auto flex items-center justify-center -mb-10 px-2">
        <Link
          href="/create"
          className="w-full bg-primary text-white flex items-center justify-center gap-2 rounded-lg h-14"
        >
          Create Task
          <Image src={PlusIcon} alt="Plus Icon" />
        </Link>
      </div>
    )
  );
}
