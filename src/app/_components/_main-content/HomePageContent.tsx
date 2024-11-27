import MatchesForHome from "./MatchesForHome";
import { getActualLeagues } from "@/utils/leagues-clubs-players-info";
import LeaguesAvailable from "@/components/football-data/LeaguesAvailable";

const HomePageContent = async () => {
  const leaguesArray = await getActualLeagues();

  return (
  <section className=" px-4">
    <LeaguesAvailable />
    <MatchesForHome />

  </section>
  )
}

export default HomePageContent;