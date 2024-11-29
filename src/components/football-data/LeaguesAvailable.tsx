import Link from 'next/link'
import Image from "next/image";
import { getActualLeagues } from '@/utils/leagues-clubs-players-info';

const LeaguesAvailable = async () => {
  const leaguesArray = await getActualLeagues();
  return (
    <div className="mb-8 flex justify-center 2xl:space-x-8">
    {leaguesArray.map((league) => (
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
  )
}

export default LeaguesAvailable