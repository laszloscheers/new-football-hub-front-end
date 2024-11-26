import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "../ui/card"
import { Separator } from "@radix-ui/react-dropdown-menu"
export function LoadingLeagueSkeleton() {
  return (
    <Card className="">
      <CardContent className="flex flex-col p-0">
        <div className="flex items-center gap-3 p-4">
          <Skeleton className="h-[75px] w-[75px] rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-5 w-5" />
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <Separator className="shrink-0 bg-border h-[1px] w-full my-4" />
        <Tabs defaultValue="results" className="w-full p-3">
          <TabsList className="w-full justify-start h-11 bg-gray-50/90">
            {["Results & Fixtures", "Standings", "Top Scorers"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase().replace(/ & /g, "-")}
                className="opacity-50 cursor-not-allowed"
                disabled
              >
                <Skeleton className="h-4 w-24" />
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  )
}