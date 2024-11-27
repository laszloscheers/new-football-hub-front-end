import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import HomeMatches from './_components/HomeMatches';
import { MatchProps } from "@/types/match-prop";
import { findLeague, getActualLeagues } from "@/utils/leagues-clubs-players-info";
import { fetchLeagueMatches } from '@/actions/football-api/fetch-league-matches';


const MatchesForHome = async () => {

  const leaguesArray = await getActualLeagues();
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  const todaysMatchesByLeague: { league: string; matches: MatchProps[] }[] = [];
  const ongoingMatchesByLeague: { league: string; matches: MatchProps[] }[] = [];
  const finishedMatchesByLeague: { league: string; matches: MatchProps[] }[] = [];
  const upcomingMatchesByLeague: { league: string; matches: MatchProps[] }[] = [];

  const fetchAllMatches = async (leagueCode: string): Promise<MatchProps[]> => {
    const allMatches = await fetchLeagueMatches(leagueCode);
    return allMatches.matches;
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

  return (
    <Tabs defaultValue="today">
      <TabsList className="mb-4 grid w-full grid-cols-4">
        {todaysMatchesByLeague.length > 0 && <TabsTrigger value="today">Today's Matches</TabsTrigger>}
        {ongoingMatchesByLeague.length > 0 && <TabsTrigger value="ongoing">Ongoing</TabsTrigger>}
        {finishedMatchesByLeague.length > 0 && <TabsTrigger value="finished">Finished</TabsTrigger>}
        {upcomingMatchesByLeague.length > 0 && <TabsTrigger value="upcoming">Upcoming</TabsTrigger>}
      </TabsList>
      {todaysMatchesByLeague.length > 0 && (
        <TabsContent value="today" className="space-y-4">
          <HomeMatches homeMatches={todaysMatchesByLeague}/>
        </TabsContent>
      )}
      {ongoingMatchesByLeague.length > 0 && (
        <TabsContent value="ongoing" className="space-y-4">
          <HomeMatches homeMatches={ongoingMatchesByLeague}/>
        </TabsContent>
      )}
      {finishedMatchesByLeague.length > 0 && (
        <TabsContent value="finished" className="space-y-4">
          <HomeMatches homeMatches={finishedMatchesByLeague}/>
        </TabsContent>
      )}
      {upcomingMatchesByLeague.length > 0 && (
        <TabsContent value="upcoming" className="space-y-4">
          <HomeMatches homeMatches={upcomingMatchesByLeague}/>
        </TabsContent>
      )}
    </Tabs>
  )
}

export default MatchesForHome;

      {/* <div className="mb-4 flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center space-x-2">
          <CalendarDays className="h-5 w-5 bg-white" />
          <span className="text-lg font-medium bg-white">
            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
        <Button variant="outline" size="icon" onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div> */}