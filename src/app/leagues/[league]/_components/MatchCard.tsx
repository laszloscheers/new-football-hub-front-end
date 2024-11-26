import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image';
import React from 'react'

const MatchCard = (match: {match : any}) => {

  // //Formatting Time
  // const gameDate = format(new Date(`${match.utcDate}`), 'dd-MM-yyyy');
  // const gameTime = format(new Date(`${match.utcDate}`), 'k.mm');

  return (
    <></>
  //   <Card key={match.name}>
  //   <CardHeader>
  //     <div className="col-span-6 text-left">
  //       Day {match.matchday}
  //     </div>
  //     <div className="col-span-6 text-right">
  //       {gameDate}
  //     </div>
  //   </CardHeader>
  //   <CardContent className="flex items-center p-4 ">
  //     <div className="col-span-5">
  //       <Image src={clubCrests.link1 + match.homeTeam.id + clubCrests.link2} alt={`Image of  ${match.homeTeam.name}`} width={50} height={50} />
  //     </div>
  //     <div className="col-span-2">
  //       <p className="font-semibold">{match.score.fullTime.home} - {match.score.fullTime.away}</p>
  //       <p className="font-semibold">Kick Off</p>
  //       <p className="text-sm text-muted-foreground">{gameTime} (GMT+1)</p>
  //     </div>
  //     <div className="col-span-5">
  //       <Image src={clubCrests.link1 + match.awayTeam.id + clubCrests.link2} alt={`Image of  ${match.awayTeam.name}`} width={50} height={50} />
  //     </div>
  //   </CardContent>
  // </Card>
  )
}

export default MatchCard