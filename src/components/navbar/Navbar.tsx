"use client"

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { JSX, SVGProps, useEffect, useState } from "react"
import ButtonAuth from "../ButtonAuth"
import { SearchBar } from "./_components/SearchBar"
import Image from "next/image";
import { LanguageSelector } from "./_components/LanguageSelector"
import { ModeToggle } from "./_components/ModeToggle"
import { useTheme } from "next-themes"
import { UserButton } from "./_components/UserButton"

export default function Component() {

  const { resolvedTheme } = useTheme()

  const handleLanguageChange = (language: string) => {
    // Implement language change logic
    console.log("Language changed to:", language)
  }

  const handleModeChange = (mode: string) => {
    // Implement mode change and database storage logic
    console.log("Mode changed to:", mode)
  }

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-20 z-5 bg-secondary">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className="grid gap-2 py-6">
            <Link href="/" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              Results
            </Link>
            <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              News
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
        <Image src={resolvedTheme === 'dark' ? "/assets/images/football-hub-logo-dark.png" : "/assets/images/football-hub-logo.png"} alt="Football Hub site Logo" width={192} height={42} />
        <span className="sr-only">Toggle navigation menu</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6">
        <Link
          href="/"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors hover:bg-white hover:text-gray-900 focus:bg-white focus:text-gray-900 focus:secondary-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-white/50 data-[state=open]:bg-white/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Results
        </Link>
        {/* <Link
          href="#"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors hover:bg-white hover:text-gray-900 focus:bg-white focus:text-gray-900 focus:secondary-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-white/50 data-[state=open]:bg-white/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          News
        </Link> */}
        {/* <SearchBar /> */}
        <UserButton />
        {/* <LanguageSelector currentLanguage="en" onLanguageChange={handleLanguageChange} /> */}
        <ModeToggle onModeChange={handleModeChange} />
      </nav>
    </header>
  )
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}