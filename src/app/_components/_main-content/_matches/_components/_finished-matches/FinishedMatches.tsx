import LeagueCard from "@/components/football-data/LeagueCard";
import { MatchProps } from "@/types/match-prop";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import FinishedMatchesClient from "./_components/FinishedMatchesClient";

const FinishedMatches = async ({ finishedMatches }: { finishedMatches: { league: string, matches: MatchProps[] }[] }) => {
  return (
    <div>
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
    </div>
  );
};

export default FinishedMatches;