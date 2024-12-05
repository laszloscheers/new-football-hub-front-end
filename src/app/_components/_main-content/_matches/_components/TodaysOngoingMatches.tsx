import LeagueCard from "@/components/football-data/LeagueCard"
import MatchCard from "@/components/football-data/MatchCard"
import { Card } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { MatchProps } from "@/types/match-prop"

const TodaysOngoingMatches = ({ homeMatches }: { homeMatches: { league: string, matches: MatchProps[] }[] }) => {
  return (
    <Card className="overflow-hidden border-0 p-3">
      {homeMatches.map((leagueMatches) => (
        <Collapsible
          key={leagueMatches.league}
          open={leagueMatches.league === 'Premier League' ? true : undefined}
        >
          <CollapsibleTrigger className="w-full">
            <LeagueCard name={leagueMatches.league} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="my-3">
              {leagueMatches.matches.map((match) => (
                <div key={match.id} className="mb-2">
                  <MatchCard match={match} />
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </Card>
  )
}

export default TodaysOngoingMatches
