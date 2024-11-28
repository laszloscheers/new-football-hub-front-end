"use client"

import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

export function SearchBar() {

  const handleSearch
  = (query: string) => {
    console.log(query)
    }
  return (
    <div className="relative max-w-md">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search leagues, teams, matches..."
        defaultValue=""
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full appearance-none bg-background pl-8 shadow-none"
      />
    </div>
  )
}

