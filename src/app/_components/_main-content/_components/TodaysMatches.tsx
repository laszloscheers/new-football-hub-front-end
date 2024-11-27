"use server";

import { fetchTodaysMatchesForLeague } from "@/actions/football-api/fetch-todays-league-matches";
import LeagueCard from "@/components/football-data/LeagueCard";
import MatchCard from "@/components/football-data/MatchCard";
import { MatchProps } from "@/types/match-prop";
import { findLeague, getActualLeagues } from "@/utils/leagues-clubs-players-info";

const TodaysMatches = async () => {

  const leaguesArray = await getActualLeagues();
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const todaysMatchesByLeague: { league: string; matches: MatchProps[] }[] = [];

  const fetchTodaysMatches = async (leagueCode: string): Promise<MatchProps[]> => {
    const allMatches = await fetchTodaysMatchesForLeague(leagueCode, today);
    const todaysMatches = allMatches.matches.filter((match: MatchProps) => match.utcDate.startsWith(today));
    return todaysMatches;
  };

  for (const league of leaguesArray) {
    const leagueInfo = await findLeague(league.name);
    if (leagueInfo) {
      const leagueMatches = await fetchTodaysMatches(leagueInfo.code);
      if (leagueMatches.length > 0) {
        todaysMatchesByLeague.push({ league: leagueInfo.name, matches: leagueMatches });
      }
    }
  }


  return (
    <div>
      {todaysMatchesByLeague.map((leagueMatches) => (
        <div key={leagueMatches.league}>
          <LeagueCard name={leagueMatches.league} />
          {leagueMatches.matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TodaysMatches