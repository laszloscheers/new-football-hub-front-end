import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { findLeague } from '@/utils/leagues-clubs-players-info';
import { Metadata } from "next";
import Standings from "./_components/Standings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResultsFixtures from "./_components/ResultsFixures";
import LeaguesAvailable from "@/components/football-data/LeaguesAvailable";

interface LeaguePageProps {
  params: {
    league: string;
  };
}

const LeaguePage = async ({ params }: LeaguePageProps) => {
  const leagueData = await findLeague(params.league as string);
  const date = new Date().getFullYear();
  
  if (!leagueData) {
    return <p>League not found.</p>;
  }

  return (
    <section>
     <LeaguesAvailable />
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
              <ResultsFixtures leagueArray={leagueData}/>
            </TabsContent>
            <TabsContent value="standings">
              <Standings leagueArray={leagueData}/>
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

export const generateMetadata = async ({ params }: LeaguePageProps): Promise<Metadata> => {
  const name = params.league;
  const leagueData = await findLeague(name);

  return leagueData ? {
    title: `${leagueData.name} | Football Hub`,
    description: `Information about ${leagueData.name}`,
    robots: "noindex",
  } : {
    title: "Loading...",
    description: "Loading...",
    robots: "noindex",
  };
};
export default LeaguePage;