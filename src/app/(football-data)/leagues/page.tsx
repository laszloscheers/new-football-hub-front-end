import Image from "next/image"
import Link from "next/link";
import LeaguePage from "./[league]/page";

const LeaguesPage = () => {
  
  const leagues = [
    { name: "Premier League", logo: "/assets/images/premier-league-logo.webp", url: "premier-league" },
    { name: "La Liga", logo: "/assets/images/la-liga-logo.webp", url: "la-liga" },
    { name: "Bundesliga", logo: "/assets/images/bundesliga-logo.webp", url: "bundesliga" },
    { name: "Serie A", logo: "/assets/images/serie-a-logo.webp", url: "serie-a" },
    { name: "Ligue 1", logo: "/assets/images/ligue-1-logo.webp", url: "ligue-1" },
    { name: "EFL Championship", logo: "/assets/images/efl-championship.webp", url: "efl-championship" },
  ]

  return (
    <section className=" px-4">
      <LeaguePage params={{
        league: "Premier League"
      }} />

    </section>
  )
}

export default LeaguesPage