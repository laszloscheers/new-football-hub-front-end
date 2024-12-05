"use client";

import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from 'react';

export interface MatchProps {
  id: string;
  matchday: number;
  utcDate: string;
  status: string;
  homeTeam: {
    id: number;
    name: string;
  };
  awayTeam: {
    id: number;
    name: string;
  };
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
}

export default function MatchCard({ match }: { match: MatchProps }) {
  const [gameDate, setGameDate] = useState('');
  const [gameTime, setGameTime] = useState('');

  useEffect(() => {
    const date = new Date(match.utcDate);
    setGameDate(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }));
    setGameTime(date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
  }, [match.utcDate]);

  const hasScore = match.score.fullTime.home !== null && match.score.fullTime.away !== null;

  return (
    // <Link href={`/match/${match.id}`} className="block">
      <Card className="hover:bg-muted/50 transition-colors p-3">
        <CardContent className="p-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center w-[40%]">
              <Image
                src={`https://crests.football-data.org/${match.homeTeam.id}.png`}
                alt={`${match.homeTeam.name} crest`}
                width={400}
                height={400}
                className="w-12 h-12 object-contain"
              />
              <h5 className="text-sm font-medium text-center mt-1 line-clamp-2">{match.homeTeam.name}</h5>
            </div>
            <div className="flex flex-col items-center w-[20%]">
              <div className="text-muted-foreground text-sm mb-2">{gameDate}</div>
              {hasScore && (
                <div className="text-3xl font-bold">
                  {match.score.fullTime.home} - {match.score.fullTime.away}
                </div>
              )}
              <div className="text-sm text-center text-muted-foreground mt-2">
                {gameTime}
              </div>
            </div>
            <div className="flex flex-col items-center w-[40%]">
              <Image
                src={`https://crests.football-data.org/${match.awayTeam.id}.png`}
                alt={`${match.awayTeam.name} crest`}
                width={400}
                height={400}
                className="w-12 h-12 object-contain"
              />
              <h5 className="text-sm font-medium text-center mt-1 line-clamp-2">{match.awayTeam.name}</h5>
            </div>
          </div>
        </CardContent>
      </Card>
    // </Link>
  )
}