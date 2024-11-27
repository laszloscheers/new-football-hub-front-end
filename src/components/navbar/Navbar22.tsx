"use client"

import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import Image from "next/image"
import { SearchBar } from "./_components/SearchBar"
import { UserAvatar } from "./_components/UserAvatar"
import { LanguageSelector } from "./_components/LanguageSelector"
import { ModeToggle } from "./_components/ModeToggle"

export default function Navbar() {
  const handleLanguageChange = (language: string) => {
    // Implement language change logic
    console.log("Language changed to:", language)
  }

  const handleModeChange = (mode: string) => {
    // Implement mode change and database storage logic
    console.log("Mode changed to:", mode)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="grid gap-4 py-4">
              <Link href="/results" className="text-sm font-medium">
                Results
              </Link>
              <Link href="/news" className="text-sm font-medium">
                News
              </Link>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src="/placeholder.svg" alt="FlashScore" width={32} height={32} />
          <span className="hidden font-bold sm:inline-block">FlashScore</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/results"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Results
          </Link>
          <Link
            href="/news"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            News
          </Link>
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          <SearchBar />
          <UserAvatar />
          <LanguageSelector currentLanguage="en" onLanguageChange={handleLanguageChange} />
          <ModeToggle onModeChange={handleModeChange} />
        </div>
      </div>
    </header>
  )
}