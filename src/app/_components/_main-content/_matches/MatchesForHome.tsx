"use server";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import TodaysOngoingMatches from './_components/TodaysOngoingMatches';
import { MatchProps } from "@/types/match-prop";
import { findLeague, getActualLeagues } from "@/utils/leagues-clubs-players-info";
import { fetchLeagueMatches } from '@/actions/football-api/fetch-league-matches';
import FinishedMatches from './_components/_finished-matches/FinishedMatches';
import UpcomingMatches from './_components/_upcoming-matches/UpcomingMatches';


const MatchesForHome = async () => {

  const leaguesArray = await getActualLeagues();
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  const todaysMatchesByLeague: { league: string; matches: MatchProps[] }[] = [];
  const ongoingMatchesByLeague: { league: string; matches: MatchProps[] }[] = [];
  const finishedMatchesByLeague: { league: string; matches: MatchProps[] }[] = [];
  const upcomingMatchesByLeague: { league: string; matches: MatchProps[] }[] = [];

  const fetchAllMatches = async (leagueCode: string): Promise<MatchProps[]> => {
    const allMatches = await fetchLeagueMatches(leagueCode);
    return allMatches.matches || [];
  };

  for (const league of leaguesArray) {
    const leagueInfo = await findLeague(league.name);
    if (leagueInfo) {
      const leagueMatches = await fetchAllMatches(leagueInfo.code);
      if (leagueMatches.length > 0) {
        const ongoingMatches = leagueMatches.filter((match) => match.status === 'IN_PLAY' || match.status === 'PAUSED');
        const finishedMatches = leagueMatches.filter((match) => match.status === 'FINISHED');
        const upcomingMatches = leagueMatches.filter((match) => match.status === 'SCHEDULED');
        const todaysMatches = leagueMatches.filter((match: MatchProps) => match.utcDate.startsWith(today));

        if (todaysMatches.length > 0) {
          todaysMatchesByLeague.push({ league: leagueInfo.name, matches: todaysMatches });
        }
        if (ongoingMatches.length > 0) {
          ongoingMatchesByLeague.push({ league: leagueInfo.name, matches: ongoingMatches });
        }
        if (finishedMatches.length > 0) {
          finishedMatchesByLeague.push({ league: leagueInfo.name, matches: finishedMatches });
        }
        if (upcomingMatches.length > 0) {
          upcomingMatchesByLeague.push({ league: leagueInfo.name, matches: upcomingMatches });
        }
      }
    }
  }

  const availableTabs = [
    { key: 'today', label: "Today's Matches", content: todaysMatchesByLeague },
    { key: 'ongoing', label: 'Ongoing', content: ongoingMatchesByLeague },
    { key: 'finished', label: 'Finished', content: finishedMatchesByLeague },
    { key: 'upcoming', label: 'Upcoming', content: upcomingMatchesByLeague },
  ].filter(tab => tab.content.length > 0);

  const defaultTab = availableTabs.length > 0 ? availableTabs[0].key : '';

  return (
    <Tabs defaultValue={defaultTab}>
      <TabsList className={`mb-4 grid w-full grid-cols-${availableTabs.length}`}>
        {availableTabs.map(tab => (
          <TabsTrigger key={tab.key} value={tab.key}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {todaysMatchesByLeague.length > 0 && (
        <TabsContent value="today" className="2xl:space-y-4">
          <TodaysOngoingMatches homeMatches={todaysMatchesByLeague}/>
        </TabsContent>
      )}
      {ongoingMatchesByLeague.length > 0 && (
        <TabsContent value="ongoing" className="2xl:space-y-4">
          <TodaysOngoingMatches homeMatches={ongoingMatchesByLeague}/>
        </TabsContent>
      )}
      {finishedMatchesByLeague.length > 0 && (
        <TabsContent value="finished" className="2xl:space-y-4">
          <FinishedMatches finishedMatches={finishedMatchesByLeague}/>
        </TabsContent>
      )}
      {upcomingMatchesByLeague.length > 0 && (
        <TabsContent value="upcoming" className="2xl:space-y-4">
          <UpcomingMatches upcomingMatches={upcomingMatchesByLeague}/>
        </TabsContent>
      )}
    </Tabs>
  )
}

export default MatchesForHome;