import React from 'react'
import { Card, CardContent } from '../ui/card'
import Image from "next/image";
import { Button } from '../ui/button';
import { StarFilledIcon } from "@radix-ui/react-icons";
import { findLeague } from '@/utils/leagues-clubs-players-info';

const LeagueCard = async ( leagueName: { name:string } ) => {
  const leagueData = await findLeague(leagueName.name);
  const date = new Date().getFullYear();

  if (!leagueData) {
    return <p>League not found.</p>;
  }

  return (
    <Card>
      <CardContent className="flex flex-col p-0">
        <div className="flex items-center p-4 gap-4">
          <div>
            <Image
              key={leagueData.name}
              src={leagueData.logo}
              alt={leagueData.name}
              width={75}
              height={75}
            />
          </div>
          <div>
            <span className="flex gap-8">
              <h3 className="text-2xl font-bold pb-2">{leagueData.name}</h3>
              <span className="flex items-center">
                <Button variant={null} size={null} >
                  <StarFilledIcon className=" text-yellow-400" style={{width: "2.3rem", height:"2.3rem"}} />
                </Button>
              </span>
            </span>
            <p className="text-sm text-muted-foreground">{date} - {date+1}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default LeagueCard