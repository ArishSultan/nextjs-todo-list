import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import Logo from "../public/images/rocket.svg";
import CreateButton from "@/components/CreateButton";

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple Todo App to organize your tasks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased bg-background1 text-white"}>
        <header className="py-4 bg-background2 px-2">
          <div className="container mx-auto flex items-center justify-center h-[200px]">
            <div className="flex items-center space-x-2 text-2xl font-bold sm:text-3xl md:text-4xl">
              <Image src={Logo} alt="Logo" />
              <span className="text-primary">Todo</span>
              <span className="text-secondary">App</span>
            </div>
          </div>

          <CreateButton />
        </header>
        <main className="container mx-auto mt-20 px-2">{children}</main>
      </body>
    </html>
  );
}
