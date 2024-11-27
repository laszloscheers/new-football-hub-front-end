import LeagueCard from "@/components/football-data/LeagueCard";
import { MatchProps } from "@/types/match-prop";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import UpcomingMatchesClient from "./_components/UpcomingMatchesClient";

const UpcomingMatches = async ({ upcomingMatches }: { upcomingMatches: { league: string, matches: MatchProps[] }[] }) => {
  return (
    <div>
      {upcomingMatches.map((leagueMatches) => (
        <Collapsible
          key={leagueMatches.league}
        >
          <CollapsibleTrigger className="w-full">
              <LeagueCard name={leagueMatches.league} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <UpcomingMatchesClient leagueMatches={leagueMatches.matches}/>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export default UpcomingMatches;