import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MatchCard from '@/components/football-data/MatchCard'
import { fetchLeagueMatches } from '@/actions/football-api/fetch-league-matches'
import { MatchProps } from "@/types/match-prop"
import { LeagueProps } from "@/types/league-props"

const ResultsFixtures = async ({ leagueArray }: { leagueArray: LeagueProps }) => {

  const today = new Date().toDateString()

  const allMatches = await fetchLeagueMatches(leagueArray.code);
  const matchesArray = allMatches.matches;

  const todayMatches = matchesArray.filter((match: MatchProps) => new Date(match.utcDate).toDateString() === today);
  const ongoingMatches = matchesArray.filter((match: MatchProps) => match.status === 'IN_PLAY' || match.status === 'PAUSED');
  const finishedMatches = matchesArray.filter((match: MatchProps) => match.status === 'FINISHED');

  return (
    <Tabs defaultValue="all-matches" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="all-matches" className="text-xs sm:text-sm">All Matches</TabsTrigger>
        <TabsTrigger value="today-matches" className="text-xs sm:text-sm">Today's Matches</TabsTrigger>
        <TabsTrigger value="ongoing-matches" className="text-xs sm:text-sm">Ongoing Matches</TabsTrigger>
        <TabsTrigger value="finished-matches" className="text-xs sm:text-sm">Finished</TabsTrigger>
      </TabsList>
      <TabsContent value="all-matches" className="space-y-4">
        {matchesArray.map((match: MatchProps) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </TabsContent>
      <TabsContent value="today-matches" className="space-y-4">
        {todayMatches.map((match: MatchProps) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </TabsContent>
      <TabsContent value="ongoing-matches" className="space-y-4">
        {ongoingMatches.map((match: MatchProps) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </TabsContent>
      <TabsContent value="finished-matches" className="space-y-4">
        {finishedMatches.map((match: MatchProps)=> (
          <MatchCard key={match.id} match={match} />
        ))}
      </TabsContent>
    </Tabs>
  )
}

export default ResultsFixtures;
