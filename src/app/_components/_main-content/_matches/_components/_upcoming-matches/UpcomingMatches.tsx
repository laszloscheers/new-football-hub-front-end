import LeagueCard from "@/components/football-data/LeagueCard";
import { MatchProps } from "@/types/match-prop";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import UpcomingMatchesClient from "./_components/UpcomingMatchesClient";
import { Card } from "@/components/ui/card";

const UpcomingMatches = async ({ upcomingMatches }: { upcomingMatches: { league: string, matches: MatchProps[] }[] }) => {
  return (
    <Card className="overflow-hidden border-0 p-3">
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
    </Card>
  );
};

export default UpcomingMatches;