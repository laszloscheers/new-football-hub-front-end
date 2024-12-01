import MatchesForHome from "./_matches/MatchesForHome";
import { getActualLeagues } from "@/utils/leagues-clubs-players-info";
import LeaguesAvailable from "@/components/football-data/LeaguesAvailable";
import MarqueeComponent from "./MarqueeComponent";

const HomePageContent = async () => {
  const leaguesArray = await getActualLeagues();

  return (
  <section className=" px-4">
    <LeaguesAvailable />
    <MatchesForHome />
    <MarqueeComponent />
  </section>
  )
}

export default HomePageContent;