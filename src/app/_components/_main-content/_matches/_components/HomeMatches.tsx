"use server";

import LeagueCard from "@/components/football-data/LeagueCard";
import MatchCard from "@/components/football-data/MatchCard";
import { MatchProps } from "@/types/match-prop";

const HomeMatches = async ({ homeMatches }: { homeMatches: { league: string, matches: MatchProps[] }[] }) => {

  return (
    <div>
      {homeMatches.map((leagueMatches) => (
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

export default HomeMatches;