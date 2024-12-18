'use client';

import { useMemo, useState } from 'react';
import MatchCard from '@/components/football-data/MatchCard';
import { MatchProps } from '@/types/match-prop';
import { FinishedDateNavigation } from "./FinishedDateNavigation";


export interface League {
  name: string
  season: string
  logo: string
  isFavorite?: boolean
}

export interface AvailableDate {
  date: Date
  matches: number
}


const FinishedMatchesClient = (leagueMatches: {leagueMatches: MatchProps[]}) => {
  const availableDates = useMemo(() => {
    const dates: AvailableDate[] = []
    leagueMatches.leagueMatches.forEach(match => {
      const matchDate = new Date(match.utcDate)
      const existingDate = dates.find(d => d.date.toDateString() === matchDate.toDateString())
      if (existingDate) {
        existingDate.matches++
      } else {
        dates.push({ date: matchDate, matches: 1 })
      }
    })
    return dates.sort((a, b) => a.date.getTime() - b.date.getTime())
  }, [leagueMatches])

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    availableDates.length > 0 ? availableDates[availableDates.length - 1].date : undefined
  )

  const filteredMatches = useMemo(() => {
    if (!selectedDate) return []
    return leagueMatches.leagueMatches.filter(match => {
      const matchDate = new Date(match.utcDate)
      return matchDate.toDateString() === selectedDate.toDateString()
    })
  }, [leagueMatches, selectedDate])

  if (availableDates.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No matches available</div>
  }

  return (
    <div className='mt-2 mb-3'>
      <FinishedDateNavigation 
        onDateChange={setSelectedDate}
        availableDates={availableDates}
      />
      <div className="2xl:space-y-4">
        {filteredMatches.map(match => (
          <MatchCard key={match.id} match={match} />
        ))}
        {filteredMatches.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No matches scheduled for this date
          </div>
        )}
      </div>
    </div>
  );
};

export default FinishedMatchesClient;