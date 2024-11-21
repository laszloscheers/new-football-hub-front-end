import Marquee from "@/components/ui/marquee"

const MarqueeComponent = () => {
  return (
    <div className="py-20 flex justify-center">
      <Marquee reverse pauseOnHover className="[--duration:20s] max-w-7xl text-lg">
        <h3>Next.js</h3>
        <h3>Nest.js</h3>
        <h3>Maria DB</h3>
        <h3>Next Auth</h3>
        <h3>JWT</h3>
        <h3>OAuth</h3>
        <h3>Resend</h3>
        <h3>Tailwind</h3>
        <h3>Shadcn</h3>
        <h3>Magic Ui</h3>
        <h3>And More...</h3>
      </Marquee>
    </div>
  )
}

export default MarqueeComponent;