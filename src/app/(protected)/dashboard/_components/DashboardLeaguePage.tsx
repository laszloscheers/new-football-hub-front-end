"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaguesAvailable from "@/components/football-data/LeaguesAvailable";
import DashboardResultsFixtures from "./DashboardResultsFixures";
import DashboardStandings from "./DashboardStandings";
import { useEffect, useState } from "react";

interface LeaguePageProps {
  params: {
    league: string;
  };
}

const DashboardLeaguePage = ({ params }: LeaguePageProps) => {
  const [leagueData, setLeagueData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState<number>(0);

  useEffect(() => {
    const date = new Date().getFullYear();
    setDate(date);
    
    const fetchLeagueData = () => {
      fetch('/api/fetch-league', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leagueName: params.league }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.error('Failed to fetch league data');
            throw new Error('Failed to fetch league data');
          }
        })
        .then((data) => {
          setLeagueData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching league data:', error);
          setIsLoading(false);
        });
    };

    fetchLeagueData();
  }, [params.league]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!leagueData) {
    return <p>League not found.</p>;
  }

  return (
    <section>
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
          <Separator className="my-4" />
          <Tabs defaultValue="results-fixtures" className="px-4">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="results-fixtures" className="font-bold">Results & Fixtures</TabsTrigger>
              <TabsTrigger value="standings" className="font-bold">Standings</TabsTrigger>
              <TabsTrigger value="top-scorers" className="font-bold">Top Scorers</TabsTrigger>
            </TabsList>
            <TabsContent value="results-fixtures">
              <DashboardResultsFixtures leagueArray={leagueData}/>
            </TabsContent>
            <TabsContent value="standings">
              <DashboardStandings leagueArray={leagueData}/>
            </TabsContent>
            <TabsContent value="top-scorers">
              <p>Top Scorers</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}

export default DashboardLeaguePage;