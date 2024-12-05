'use client'

import { useState, useEffect } from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Star } from 'lucide-react'
import { findLeague } from "@/utils/leagues-clubs-players-info"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner";
import { useSession } from 'next-auth/react'

interface LeagueCardProps {
  name: string
}

const LeagueCard = ({ name }: LeagueCardProps) => {
  const { data: session, status } = useSession()
  const [leagueData, setLeagueData] = useState<any>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    if (status === 'loading') return; // Wait for session to be loaded
    if (!session) return; // Handle case where user is not logged in

    const fetchData = async () => {
      try {
        const data = await findLeague(name);
        setLeagueData(data);
        const savedStatus = await checkIfLeagueIsSaved(name);
        setIsSaved(savedStatus);
      } catch (error) {
        console.error('Error fetching league data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [name, session, status]);

  const checkIfLeagueIsSaved = async (leagueName: string) => {
    const response = await fetch('/api/get-leagues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: session?.user.token }),
    });

    if (!response.ok) {
      throw new Error('Failed to check if league is saved');
    }

    const savedLeagues = await response.json();
    return savedLeagues.some((league: { name: string }) => league.name === leagueName);
  };

  const saveLeague = async (name: string) => {
    const response = await fetch('/api/add-league', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        token: session?.user?.token,
      }),
    })
    if (response.ok) {
      setIsSaved(true)
      toast.success(`${name} has been added to your favorites.`);
    } else {
      toast.error("There was an error saving the league.")
    }
  }

  const deleteLeague = async (name: string) => {
    const response = await fetch('/api/delete-league', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        token: session?.user?.token,
      }),
    })
    if (response.ok) {
      setIsSaved(false);
      toast.success(`${name} has been removed from your favorites.`);
    } else {
      toast.error("There was an error removing the league.");
    }
  }

  const handleStarClick = (name: string) => {
    if (isSaved) {
      deleteLeague(name)
    } else {
      saveLeague(name)
    }
  }

  if (isLoading) {
    return <p className="text-muted-foreground">Loading...</p>
  }

  if (!leagueData) {
    return <p className="text-muted-foreground">League not found.</p>
  }

  return (
    <Card className="flex items-center justify-between my-1 p-3 border-none bg-[#06213e] hover:bg-[#06213e]/95 transition-colors">
      <CardContent className="p-0 flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Image
            src={leagueData.logo}
            alt={leagueData.name}
            width={400}
            height={400}
            className="w-10 h-10 object-contain"
          />
        </div>
        <div>
          <h3 className="text-sm text-left font-semibold text-yellow-400">
            {leagueData.name}
          </h3>
          <p className="text-xs text-left text-white/80">
            {currentYear} - {currentYear + 1}
          </p>
        </div>
      </CardContent>
      <Button
        variant="ghost"
        size="icon"
        className="text-yellow-400 hover:text-yellow-500 hover:bg-transparent p-0"
        onClick={() => handleStarClick(leagueData.name)}
      >
        <Star className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
      </Button>
    </Card>
  )
}

export default LeagueCard

