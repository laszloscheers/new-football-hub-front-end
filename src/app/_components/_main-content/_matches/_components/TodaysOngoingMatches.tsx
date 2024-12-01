import LeagueCard from "@/components/football-data/LeagueCard";
import MatchCard from "@/components/football-data/MatchCard";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MatchProps } from "@/types/match-prop";

const TodaysOngoingMatches = ({ homeMatches }: { homeMatches: { league: string, matches: MatchProps[] }[] }) => {

  return (
    <div>
      {homeMatches.map((leagueMatches) => (
        <Collapsible
          key={leagueMatches.league}
          open={leagueMatches.league === 'Premier League' ? true : undefined}
        >
          <CollapsibleTrigger className="w-full">
              <LeagueCard name={leagueMatches.league} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            {leagueMatches.matches.map((match) => (
              <div key={match.id} className="mb-3">
                <MatchCard match={match} />
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export default TodaysOngoingMatches;