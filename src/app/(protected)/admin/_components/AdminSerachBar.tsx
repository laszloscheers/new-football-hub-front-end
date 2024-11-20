"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce";

const AdminSearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set('query', searchTerm);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search users..."
          defaultValue={searchParams.get('query')?.toString()}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
        />
      </div>
  )
}

export default AdminSearchBar;