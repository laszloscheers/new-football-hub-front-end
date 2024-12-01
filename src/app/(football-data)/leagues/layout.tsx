import AddsSideBar from "@/app/_components/_sidebars/AddsSideBar";
import ChatSideBar from "@/app/_components/_sidebars/ChatSideBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leagues | Football Hub",
  description: "Football leagues",
  robots: "noindex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col xl:flex-row justify-between px-4 sm:px-6 lg:px-8 xl:px-12 py-12 gap-6 xl:gap-8 max-w-8xl mx-auto w-full">
        <aside className="w-full 2xl:w-80 order-2 xl:order-1">
          <AddsSideBar />
        </aside>
        
        <main className="flex-grow w-full order-1 xl:order-2 max-w-3xl mx-auto">
          <div className="2xl:space-y-6">
          {children}
          </div>
        </main>
        <aside className="w-full 2xl:w-80 order-3">
          <ChatSideBar />
        </aside>
      </div>
    </div>
  );
}
