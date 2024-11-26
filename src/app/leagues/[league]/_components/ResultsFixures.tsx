import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeagueProps } from '@/utils/leagues-clubs-players-info'
import MatchCard from '@/components/football-data/MatchCard'
import { fetchLeagueMatches } from '@/actions/football-api/fetch-league-matches'


interface Match {
  id: string
  matchday: number
  utcDate: string
  status: string
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

const ResultsFixtures = async ({ leagueArray }: { leagueArray: LeagueProps }) => {

  const today = new Date().toDateString()

  const allMatches = await fetchLeagueMatches(leagueArray.code);
  const matchesArray = allMatches.matches;

  const todayMatches = matchesArray.filter((match: Match) => new Date(match.utcDate).toDateString() === today);
  const ongoingMatches = matchesArray.filter((match: Match) => match.status === 'IN_PLAY' || match.status === 'PAUSED');
  const finishedMatches = matchesArray.filter((match: Match) => match.status === 'FINISHED');

  return (
    <Tabs defaultValue="all-matches" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="all-matches" className="text-xs sm:text-sm">All Matches</TabsTrigger>
        <TabsTrigger value="today-matches" className="text-xs sm:text-sm">Today's Matches</TabsTrigger>
        <TabsTrigger value="ongoing-matches" className="text-xs sm:text-sm">Ongoing Matches</TabsTrigger>
        <TabsTrigger value="finished-matches" className="text-xs sm:text-sm">Finished</TabsTrigger>
      </TabsList>
      <TabsContent value="all-matches" className="space-y-4">
        {matchesArray.map((match: Match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </TabsContent>
      <TabsContent value="today-matches" className="space-y-4">
        {todayMatches.map((match: Match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </TabsContent>
      <TabsContent value="ongoing-matches" className="space-y-4">
        {ongoingMatches.map((match: Match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </TabsContent>
      <TabsContent value="finished-matches" className="space-y-4">
        {finishedMatches.map((match: Match)=> (
          <MatchCard key={match.id} match={match} />
        ))}
      </TabsContent>
    </Tabs>
  )
}

export default ResultsFixtures;
