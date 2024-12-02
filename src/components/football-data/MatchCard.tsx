"use client";

import Link from 'next/link'
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
      <Card className="hover:bg-muted/50 transition-colors p-2 pb-3">
        <CardContent className="p-0">
          <div className="flex items-center justify-between text-xs">
            <div className="font-medium">Week {match.matchday}</div>
            <div className="text-muted-foreground">{gameDate}</div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-col items-center w-[40%]">
              <Image
                src={`https://crests.football-data.org/${match.homeTeam.id}.png`}
                alt={`${match.homeTeam.name} crest`}
                width={32}
                height={32}
                className="object-contain"
              />
              <h5 className="text-sm font-medium text-center mt-1 line-clamp-2">{match.homeTeam.name}</h5>
            </div>
            <div className="flex flex-col items-center w-[20%]">
              {hasScore && (
                <div className="text-xl font-bold">
                  {match.score.fullTime.home} - {match.score.fullTime.away}
                </div>
              )}
            </div>
            <div className="flex flex-col items-center w-[40%]">
              <Image
                src={`https://crests.football-data.org/${match.awayTeam.id}.png`}
                alt={`${match.awayTeam.name} crest`}
                width={32}
                height={32}
                className="object-contain"
              />
              <h5 className="text-sm font-medium text-center mt-1 line-clamp-2">{match.awayTeam.name}</h5>
            </div>
          </div>
          <div className="text-xs text-center text-muted-foreground mt-1">
            {gameTime}
          </div>
        </CardContent>
      </Card>
    // </Link>
  )
}