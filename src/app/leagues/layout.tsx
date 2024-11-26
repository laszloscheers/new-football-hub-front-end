import AddsSideBar from "@/app/_components/_sidebars/AddsSideBar";
import ChatSideBar from "@/app/_components/_sidebars/ChatSideBar";
import HeroParticle from "@/app/_components/HeroParticle";
import MarqueeComponent from "@/app/_components/MarqueeComponent";
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
    <div className='relative h-screen w-full'>
      <div className='absolute top-0  h-screen w-full z-10'>
        <div className='flex flex-row justify-between pt-12 px-48'>
          <AddsSideBar />
          <main>
              <div className="max-w-3xl">
                {children}
              </div>
          </main>
          <ChatSideBar />
        </div>
        <MarqueeComponent />
      </div>
      <HeroParticle />
    </div>
  );
}
