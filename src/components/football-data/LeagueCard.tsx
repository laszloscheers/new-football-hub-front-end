import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from 'lucide-react'
import { findLeague } from "@/utils/leagues-clubs-players-info"

interface LeagueCardProps {
  name: string
}

const LeagueCard = async ({ name }: LeagueCardProps) => {
  const leagueData = await findLeague(name)
  const currentYear = new Date().getFullYear()

  if (!leagueData) {
    return <p className="text-muted-foreground">League not found.</p>
  }

  return (
    <Card className="w-full overflow-hidden bg-[#06213e] hover:bg-[#002b57] transition-colors mb-1">
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-3 sm:p-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex-shrink-0">
              <Image
                src={leagueData.logo}
                alt={leagueData.name}
                width={400}
                height={400}
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
              />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-yellow-400">
                {leagueData.name}
              </h3>
              <p className="text-xs sm:text-sm text-white/80">
                {currentYear} - {currentYear + 1}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-yellow-400 hover:text-yellow-500 hover:bg-transparent"
          >
            <Star className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default LeagueCard;