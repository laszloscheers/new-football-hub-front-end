import { Card, CardContent } from "@/components/ui/card";
import GradualSpacing from "@/components/ui/gradual-spacing"
import ShinyButton from "@/components/ui/shiny-button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from 'next/navigation'
import { useTransition } from "react";

const HeroSection = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const navigate = () => {
    startTransition(() => {
      router.push('/sign-up')
    });
  };
  return (
    <motion.section 
      className="text-center"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      >
      <Card>
        <CardContent className="p-8">
          <GradualSpacing
          className="mb-2 font-display text-center text-xl -tracking-widest  text-black dark:text-white md:text-3xl  font-bold"
          text="Your Web for Football Data"
          />

          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-3 text-md text-gray-400">
            Unleash all the potential by registering.
          </motion.p>
          <ShinyButton onClick={navigate} disabled={isPending}>
            <span className="flex flex-row gap-2 ">Sign Up<ArrowRight className="w-4 h-4" /></span>
          </ShinyButton>
        </CardContent>
      </Card>

    </motion.section>
  )
}

export default HeroSection