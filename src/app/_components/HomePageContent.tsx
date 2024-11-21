import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Image from "next/image"
import Link from 'next/link';
import League from './_leagues/League';

import { findLeagueCode } from '@/actions/footbal-api/helper-functions';
import { mapAPIs } from '@/actions/footbal-api/api-array';

const MainDataDisplay = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const apiLength = Object.keys(mapAPIs).length;
  const leagues = [
    { name: "Premier League", logo: "/assets/images/premier-league-logo.webp" },
    { name: "La Liga", logo: "/assets/images/la-liga-logo.webp" },
    { name: "Bundesliga", logo: "/assets/images/bundesliga-logo.webp" },
    { name: "Serie A", logo: "/assets/images/serie-a-logo.webp" },
    { name: "Ligue 1", logo: "/assets/images/ligue-1-logo.webp" },
    { name: "EFL Championship", logo: "/assets/images/efl-championship.webp" },
  ]

  useEffect(() => {
    const matches = fetchLeagueStandings("Premier League");
  }, []);
  
  const fetchLeagueStandings = async (league: string) => {
    //Makes API calls to different token keys until one is successful
    const leagueCode = findLeagueCode(league);
    var apiCall = false;
    var i = 0;
  
    do {
      try {
        //Fetching the standings, top scorers and matches from the API where i is the API in apiKeys' array
        const resGetLeagueStandings = await fetch(
          mapAPIs[0].link + "competitions/" + leagueCode + "/standings",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Auth-Token": mapAPIs[0].token || "",
              "access-control-allow-origin":
                process.env.NEXT_PUBLIC_APP_URL || "",
            },
          }
        );
        console.log(resGetLeagueStandings);

        if (resGetLeagueStandings.ok) {
          const getLeagueStandings = await resGetLeagueStandings.json();
          apiCall = false;
          return getLeagueStandings;
        }
      } catch (error) {
        //If it is the last error send the error "Too many requests"
        console.log(error);
        if (i === apiLength - 1) {
          return { error: "Too many requests, try again later" };
        } else {
          //If an error is catch stops the loop
          apiCall = true;
          i++;
        }
      }
  
      //Runs apiLength times because that's the number of keys that we have
    } while (apiCall && i < apiLength);
  };

  return (
  <section className=" px-4 py-8">
    <div className="mb-8 flex justify-center space-x-8">
      {leagues.map((league) => (
        <Link href="#" key={league.name}>
        <Image
          key={league.name}
          src={league.logo}
          alt={league.name}
          width={80}
          height={80}
        />
        </Link>
      ))}
    </div>
    <Tabs defaultValue="today">
      <TabsList className="mb-4 grid w-full grid-cols-3">
        <TabsTrigger value="today">Today's Matches</TabsTrigger>
        <TabsTrigger value="ongoing">Ongoing Matches</TabsTrigger>
        <TabsTrigger value="finished">Finished Matches</TabsTrigger>
      </TabsList>
      <div className="mb-4 flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center space-x-2">
          <CalendarDays className="h-5 w-5 bg-white" />
          <span className="text-lg font-medium bg-white">
            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
        <Button variant="outline" size="icon" onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <TabsContent value="today">
        <League league={leagues[0]}/>
      </TabsContent>

      <TabsContent value="ongoing">
        <div className="rounded-lg bg-white/10 p-8 text-center bg-white">
          <p>No ongoing matches at the moment.</p>
        </div>
      </TabsContent>
      <TabsContent value="finished">
        <div className="rounded-lg bg-white/10 p-8 text-center bg-white">
          <p>No finished matches for the selected date.</p>
        </div>
      </TabsContent>
    </Tabs>
  </section>
  )
}

export default MainDataDisplay;