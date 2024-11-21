"use client";

import Footer from '@/components/Footer';
import HeroParticle from './_components/HeroParticle';
import HeroSection from './_components/HeroSection';
import MarqueeComponent from './_components/MarqueeComponent';
import AddsSideBar from './_components/AddsSideBar';
import ChatSideBar from './_components/ChatSideBar';
import HomePageContent from './_components/HomePageContent';

export default function Home() {


  return (
    <div className='relative h-screen w-full'>
      <div className='absolute top-0  h-screen w-full z-10'>
        <div className='flex flex-row justify-between pt-12 px-48'>
          <AddsSideBar />
          <main>
              <div className="max-w-3xl">
                <HeroSection />
                <HomePageContent />
              </div>
          </main>
          <ChatSideBar />
        </div>
        <MarqueeComponent />
        <Footer />
      </div>
      <HeroParticle />
    </div>
  );
}
