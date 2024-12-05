import LeagueCard from "@/components/football-data/LeagueCard";
import { MatchProps } from "@/types/match-prop";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import FinishedMatchesClient from "./_components/FinishedMatchesClient";
import { Card } from "@/components/ui/card";

const FinishedMatches = async ({ finishedMatches }: { finishedMatches: { league: string, matches: MatchProps[] }[] }) => {
  return (
    <Card className="overflow-hidden border-0 p-3">
      {finishedMatches.map((leagueMatches) => (
        <Collapsible
          key={leagueMatches.league}
        >
          <CollapsibleTrigger className="w-full">
              <LeagueCard name={leagueMatches.league} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <FinishedMatchesClient leagueMatches={leagueMatches.matches}/>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </Card>
  );
};

export default FinishedMatches;