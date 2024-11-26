"use client";
import { Card, CardContent } from "@/components/ui/card";
import GradualSpacing from "@/components/ui/gradual-spacing"
import ShimmerButton from "@/components/ui/shimmer-button";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation'
import { useTransition } from "react";

const SignUpBanner = () => {
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
        <CardContent className="p-8 flex flex-col justify-center items-center">
          <GradualSpacing
          className="mb-4 font-display text-center text-xl -tracking-widest dark:text-white  font-bold"
          text="Your Web for Football Data"
          />

          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-5 text-sm text-gray-400">
            Unleash all the potential, sign up now!
          </motion.p>
          <div className="max-w-[120px]">
            <ShimmerButton className="shadow-2xl py-2 max-w-[120px]"onClick={navigate} disabled={isPending}>
              <span className="flex flex-row align-middle   text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Sign Up
              </span>
            </ShimmerButton>
          </div>
        </CardContent>
      </Card>

    </motion.section>
  )
}

export default SignUpBanner;