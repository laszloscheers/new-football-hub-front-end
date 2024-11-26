import Link from 'next/link'
import Image from 'next/image'
import { Card, CardHeader, CardContent } from "@/components/ui/card"

interface Match {
  id: string
  matchday: number
  utcDate: string
  homeTeam: {
    id: number
    name: string
  }
  awayTeam: {
    id: number
    name: string
  }
  score: {
    fullTime: {
      home: number | null
      away: number | null
    }
  }
}

interface MatchCardProps {
  match: Match
}

export default function MatchCard({ match }: MatchCardProps) {
  const gameDate = new Date(match.utcDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  const gameTime = new Date(match.utcDate).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

  return (
    <Link href={`/match/${match.id}`} className="block">
      <Card className="hover:bg-muted/50 transition-colors">
        <CardHeader className="pb-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <div>Week {match.matchday}</div>
            <div>{gameDate}</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center space-y-2 w-1/3">
              <Image
                src={`https://crests.football-data.org/${match.homeTeam.id}.png`}
                alt={`${match.homeTeam.name} crest`}
                width={40}
                height={40}
                className="object-contain"
              />
              <h5 className="text-sm font-medium text-center">{match.homeTeam.name}</h5>
            </div>
            <div className="flex flex-col items-center space-y-1 w-1/3">
              <div className="text-xl font-bold">
                {match.score.fullTime.home !== null ? match.score.fullTime.home : '-'}
                {' - '}
                {match.score.fullTime.away !== null ? match.score.fullTime.away : '-'}
              </div>
              <div className="text-xs text-muted-foreground">Kick Off</div>
              <div className="text-xs text-muted-foreground">{gameTime} (GMT+1)</div>
            </div>
            <div className="flex flex-col items-center space-y-2 w-1/3">
              <Image
                src={`https://crests.football-data.org/${match.awayTeam.id}.png`}
                alt={`${match.awayTeam.name} crest`}
                width={40}
                height={40}
                className="object-contain"
              />
              <h5 className="text-sm font-medium text-center">{match.awayTeam.name}</h5>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
