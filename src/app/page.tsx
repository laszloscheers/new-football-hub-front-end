import MarqueeComponent from './_components/MarqueeComponent';
import AddsSideBar from './_components/_sidebars/AddsSideBar';
import HomePageContent from './_components/_main-content/HomePageContent';
import ChatSideBar from './_components/_sidebars/ChatSideBar';
import HeroParticle from './_components/HeroParticle';

export default function Home() {


  return (
    <div className='relative h-screen w-full'>
      <div className='absolute top-0  h-screen w-full z-10'>
        <div className='flex flex-row justify-between pt-12 px-48'>
          <AddsSideBar />
          <main>
              <div className="max-w-3xl">
                <HomePageContent />
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
