import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import Image from "next/image"
import { fetchLeagueStandings } from "@/actions/football-api/fetch-league-standings";
import { cn } from "@/lib/utils";
import { LeagueProps } from "@/types/league-props";
interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

interface TableEntry {
  position: number;
  team: Team;
  playedGames: number;
  form: string | null;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

const Standings = async ({ leagueArray }: { leagueArray: LeagueProps }) => {
  const leagueStandings = await fetchLeagueStandings(leagueArray.code);
  const leagueData: TableEntry[] = leagueStandings ? leagueStandings.standings[0].table : [];

  return (
    <div className="w-full overflow-x-auto rounded-t-lg mt-5">
    <Table id="top_scorer_table" className="w-full min-w-[640px]">
      <TableHeader>
        <TableRow className="bg-muted hover:bg-muted">
          <TableHead className="text-muted-foreground font-bold w-[60px] rounded-tl-lg">Pos</TableHead>
          <TableHead className="text-muted-foreground font-bold w-[40px]"></TableHead>
          <TableHead className="text-muted-foreground font-bold">Team</TableHead>
          <TableHead className="text-muted-foreground font-bold text-center hidden sm:table-cell">GP</TableHead>
          <TableHead className="text-muted-foreground font-bold text-center hidden sm:table-cell">W</TableHead>
          <TableHead className="text-muted-foreground font-bold text-center hidden sm:table-cell">D</TableHead>
          <TableHead className="text-muted-foreground font-bold text-center hidden sm:table-cell">L</TableHead>
          <TableHead className="text-muted-foreground font-bold text-center hidden md:table-cell">GF</TableHead>
          <TableHead className="text-muted-foreground font-bold text-center hidden md:table-cell">GA</TableHead>
          <TableHead className="text-muted-foreground font-bold text-center">GD</TableHead>
          <TableHead className="text-muted-foreground font-bold text-center rounded-tr-lg">Pts</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leagueData.map((team, index) => (
          <TableRow
            key={team.team.name}
            className={cn(
              "hover:bg-muted/50",
              index % 2 === 0 ? "bg-background" : "bg-muted/20"
            )}
          >
            <TableCell className="font-medium" id="league_table_position">
              <div className="league_table_data">{team.position}</div>
            </TableCell>
            <TableCell className="league_table_columns">
              <div className="relative w-6 h-6">
                <Image
                  src={team.team.crest}
                  alt={`${team.team.name} crest`}
                  fill
                  className="object-contain club_crests_table"
                />
              </div>
            </TableCell>
            <TableCell id="league_table_club_name">
              <Link 
                href={`/club/${team.team.name.toLowerCase()}`} 
                id="league_table_link"
                className="hover:underline text-foreground"
              >
                <div className="league_table_data">{team.team.name}</div>
              </Link>
            </TableCell>
            <TableCell className="league_table_columns text-center hidden sm:table-cell">
              <div className="league_table_data">{team.playedGames}</div>
            </TableCell>
            <TableCell className="league_table_columns text-center hidden sm:table-cell">
              <div className="league_table_data">{team.won}</div>
            </TableCell>
            <TableCell className="league_table_columns text-center hidden sm:table-cell">
              <div className="league_table_data">{team.draw}</div>
            </TableCell>
            <TableCell className="league_table_columns text-center hidden sm:table-cell">
              <div className="league_table_data">{team.lost}</div>
            </TableCell>
            <TableCell className="league_table_columns text-center hidden md:table-cell">
              <div className="league_table_data">{team.goalsFor}</div>
            </TableCell>
            <TableCell className="league_table_columns text-center hidden md:table-cell">
              <div className="league_table_data">{team.goalsAgainst}</div>
            </TableCell>
            <TableCell className="league_table_columns text-center">
              <div className="league_table_data">{team.goalDifference}</div>
            </TableCell>
            <TableCell className="league_table_columns text-center font-bold">
              <div className="league_table_data">{team.points}</div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
  )

}

export default Standings;