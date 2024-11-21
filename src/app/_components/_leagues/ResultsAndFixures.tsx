import { fetchLeagueStandings } from "@/actions/football-api/fetch-league-standings"
import { useEffect } from "react"

interface LeagueProps {
  league: {
    name: string
    logo: string
  }
}

const ResultsAndFixures = ({ league }: LeagueProps) => {

  // useEffect(() => {
  //   const matches = fetchLeagueStandings(league.name);
  //   console.log(matches);
  // }, []);

  return (
    <div className="space-y-4 w-full mt-4">
      <h1>hello2</h1>
    {/* {matches.map((match) => (
      <MatchCard match={match} key={match.id}/>
      ))} */}
  </div>
  )
}

export default ResultsAndFixures;