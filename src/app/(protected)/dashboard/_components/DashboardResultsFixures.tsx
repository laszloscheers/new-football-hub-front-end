'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MatchCard from '@/components/football-data/MatchCard';
import { MatchProps } from '@/types/match-prop';
import { LeagueProps } from '@/types/league-props';

const DashboardResultsFixtures = ({ leagueArray }: { leagueArray: LeagueProps }) => {
  const [todayMatches, setTodayMatches] = useState<MatchProps[]>([]);
  const [ongoingMatches, setOngoingMatches] = useState<MatchProps[]>([]);
  const [finishedMatches, setFinishedMatches] = useState<MatchProps[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<MatchProps[]>([]);

  useEffect(() => {
    const fetchMatches = () => {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

      fetch('/api/fetch-league-matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leagueCode: leagueArray.code }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.error('Failed to fetch matches for league:', leagueArray.name);
            throw new Error('Failed to fetch matches');
          }
        })
        .then((data) => {
          const matchesArray = data.matches;

          const todayMatches = matchesArray.filter((match: MatchProps) => match.utcDate.startsWith(today));
          const ongoingMatches = matchesArray.filter((match: MatchProps) => match.status === 'IN_PLAY' || match.status === 'PAUSED');
          const finishedMatches = matchesArray.filter((match: MatchProps) => match.status === 'FINISHED');
          const upcomingMatches = matchesArray.filter((match: MatchProps) => match.status === 'SCHEDULED');

          setTodayMatches(todayMatches);
          setOngoingMatches(ongoingMatches);
          setFinishedMatches(finishedMatches);
          setUpcomingMatches(upcomingMatches);
        })
        .catch((error) => {
          console.error('Error fetching matches for league:', leagueArray.name, error);
        });
    };

    fetchMatches();
  }, [leagueArray]);

  return (
    <Tabs defaultValue="today">
      <TabsList>
        <TabsTrigger value="today">Today's Matches</TabsTrigger>
        <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
        <TabsTrigger value="finished">Finished</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
      </TabsList>
      <TabsContent value="today">
        {todayMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </TabsContent>
      <TabsContent value="ongoing">
        {ongoingMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </TabsContent>
      <TabsContent value="finished">
        {finishedMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </TabsContent>
      <TabsContent value="upcoming">
        {upcomingMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default DashboardResultsFixtures;