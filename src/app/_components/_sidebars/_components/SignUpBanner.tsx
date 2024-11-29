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
      className="text-center w-full"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card>
        <CardContent className="p-4 sm:p-6 flex flex-col justify-center items-center">
          <GradualSpacing
            className="mb-2 font-display text-center text-lg sm:text-xl -tracking-widest dark:text-white font-bold"
            text="Your Web for Football Data"
          />

          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-3 text-xs sm:text-sm text-gray-400"
          >
            Unleash all the potential, sign up now!
          </motion.p>
          <ShimmerButton 
            className="shadow-2xl py-1 sm:py-2 px-4 w-full max-w-[120px]" 
            onClick={navigate} 
            disabled={isPending}
          >
            <span className="flex flex-row align-middle justify-center text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
              Sign Up
            </span>
          </ShimmerButton>
        </CardContent>
      </Card>
    </motion.section>
  )
}

export default SignUpBanner;

