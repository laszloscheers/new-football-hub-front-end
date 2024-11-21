"use client"

import { Search, User, Menu } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Component() {
  return (
    <header className="flex items-center justify-between bg-gray-900 p-4">
      <div className="flex items-center space-x-4">
        <img src="/placeholder.svg?height=40&width=40" alt="Logo" className="h-10 w-10" />
        <span className="text-white text-xl font-bold">LOGO</span>
      </div>
      <nav className="flex items-center space-x-6">
        <Link href="/" className="text-white hover:text-gray-300">
          Home
        </Link>
        <Link href="/results" className="text-white hover:text-gray-300">
          Results
        </Link>
        <Link href="/news" className="text-white hover:text-gray-300">
          News
        </Link>
      </nav>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
        </div>
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <Menu className="text-white" />
      </div>
    </header>
  )
}