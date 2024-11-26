import Image from "next/image"
import MatchesForHome from "./MatchesForHome";
import Link from "next/link";

const MainDataDisplay = () => {
  
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
    <div className="mb-8 flex justify-center space-x-8">
      {leagues.map((league) => (
        <Link
          href={{
            pathname: `/leagues/${league.url}`,
          }}
          key={league.name}
        >
        <Image
          src={league.logo}
          alt={league.name}
          width={80}
          height={80}
        />
        </Link>
      ))}
    </div>
    <MatchesForHome />

  </section>
  )
}

export default MainDataDisplay;