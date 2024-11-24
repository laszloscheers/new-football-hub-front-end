import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import Image from "next/image"
import { useEffect, useState } from "react";
import { fetchLeagueStandings } from "@/actions/football-api/fetch-league-standings";
import { LeagueProps } from "@/actions/football-api/leagues-clubs-players-ids";
import { cn } from "@/lib/utils";

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

const Standings = ({ leagueArray }: { leagueArray: LeagueProps }) => {
  const [leagueData, setLeagueData] = useState<TableEntry[]>([]);

  useEffect(() => {

    const fetchLeagueTable = async () => {
      const leagueStandings = await fetchLeagueStandings(leagueArray.code);
      if (leagueStandings) {
        return leagueStandings.standings[0].table;
      }
    }
    fetchLeagueTable().then(result => {
      if (result) {
        setLeagueData(result);
      }
    });
  }, [leagueArray]);
  console.log(leagueData)

  return (
    <div className="w-full overflow-auto">
      <Table id="top_scorer_table" className="w-full">
        <TableHeader className="bg-slate-900">
          <TableRow>
            <TableHead className="text-white w-[60px]">Pos</TableHead>
            <TableHead className="text-white w-[40px]"></TableHead>
            <TableHead className="text-white">Team</TableHead>
            <TableHead className="text-white text-center">GP</TableHead>
            <TableHead className="text-white text-center">W</TableHead>
            <TableHead className="text-white text-center">D</TableHead>
            <TableHead className="text-white text-center">L</TableHead>
            <TableHead className="text-white text-center">GF</TableHead>
            <TableHead className="text-white text-center">GA</TableHead>
            <TableHead className="text-white text-center">GD</TableHead>
            <TableHead className="text-white text-center">Pts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leagueData.map((team, index) => (
            <TableRow
              key={team.team.name}
              className={cn(
                "hover:bg-slate-100",
                index % 2 === 0 ? "bg-white" : "bg-slate-50"
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
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </TableCell>
              <TableCell id="league_table_club_name">
                <Link 
                  href={`/club/${team.team.name.toLowerCase()}`} 
                  id="league_table_link"
                >
                  <div className="league_table_data">{team.team.name}</div>
                </Link>
              </TableCell>
              <TableCell className="league_table_columns text-center">
                <div className="league_table_data">{team.playedGames}</div>
              </TableCell>
              <TableCell className="league_table_columns text-center">
                <div className="league_table_data">{team.won}</div>
              </TableCell>
              <TableCell className="league_table_columns text-center">
                <div className="league_table_data">{team.draw}</div>
              </TableCell>
              <TableCell className="league_table_columns text-center">
                <div className="league_table_data">{team.lost}</div>
              </TableCell>
              <TableCell className="league_table_columns text-center">
                <div className="league_table_data">{team.goalsFor}</div>
              </TableCell>
              <TableCell className="league_table_columns text-center">
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