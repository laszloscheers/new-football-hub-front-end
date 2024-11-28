"use client"

import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useCallback } from "react"

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (term) {
        params.set("query", term)
      } else {
        params.delete("query")
      }
      router.push(`/search?${params.toString()}`)
    },
    [router, searchParams]
  )

  return (
    <div className="relative max-w-md">
      <Suspense fallback={<p>Loading...</p>}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search leagues, teams, matches..."
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full appearance-none bg-background pl-8 shadow-none"
      />
      </Suspense>
    </div>
  )
}

