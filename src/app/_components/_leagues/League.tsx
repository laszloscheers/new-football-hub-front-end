import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { StarFilledIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import ResultsAndFixures from "./ResultsAndFixures"
interface LeagueProps {
  league: {
    name: string
    logo: string
  }
}
const League = ({ league }: LeagueProps) => {


  const date = new Date().getFullYear();

  return (
      <>
      <Card>
        <CardContent className="flex flex-col p-0">
          <div className="flex items-center p-4 gap-4">
            <div>
              <Image
                key={league.name}
                src={league.logo}
                alt={league.name}
                width={75}
                height={75}
              />
            </div>
            <div>
              <span className="flex gap-8">
                <h3 className="text-2xl font-bold pb-2">{league.name}</h3>
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
          <div className="flex items-center pb-3">
            <Button variant={null} className="font-bold">
              Results & Fixtures
            </Button>
            <Button variant={null} className="font-bold">
              Standings
            </Button>
            <Button variant={null} className="font-bold">
              Top Scorers
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardContent className="flex items-center justify-between p-4">
          <ResultsAndFixures league={league}/>
        </CardContent>
      </Card>


  </>
  )
}

export default League