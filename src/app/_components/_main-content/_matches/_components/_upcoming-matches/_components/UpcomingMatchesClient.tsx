'use client';

import { useMemo, useState } from 'react';
import MatchCard from '@/components/football-data/MatchCard';
import { MatchProps } from '@/types/match-prop';
import { UpcomingDateNavigation } from './UpcomingDateNavigation';

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
interface UpcomingDateNavigationProps {
  onDateChange: (date: Date) => void
  availableDates: AvailableDate[]
  initialDate: Date
}

const UpcomingMatchesClient = (leagueMatches: {leagueMatches: MatchProps[]}) => {
  const today = new Date(new Date().setHours(0, 0, 0, 0))

  const availableDates = useMemo(() => {
    const dates: AvailableDate[] = []
    leagueMatches.leagueMatches.forEach(match => {
      const matchDate = new Date(match.utcDate)
      if (matchDate >= today) {
        const existingDate = dates.find(d => d.date.toDateString() === matchDate.toDateString())
        if (existingDate) {
          existingDate.matches++
        } else {
          dates.push({ date: matchDate, matches: 1 })
        }
      }
    })
    return dates.sort((a, b) => a.date.getTime() - b.date.getTime())
  }, [leagueMatches])

  const initialDate = useMemo(() => {
    return availableDates.length > 0 ? availableDates[0].date : new Date()
  }, [availableDates])

  const [selectedDate, setSelectedDate] = useState<Date>(initialDate)

  const filteredMatches = useMemo(() => {
    return leagueMatches.leagueMatches.filter(match => {
      const matchDate = new Date(match.utcDate)
      return matchDate.toDateString() === selectedDate.toDateString()
    })
  }, [leagueMatches, selectedDate])

  if (availableDates.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No upcoming matches available</div>
  }

  return (
    <div>
      <UpcomingDateNavigation 
        onDateChange={setSelectedDate}
        availableDates={availableDates}
        initialDate={initialDate}
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

export default UpcomingMatchesClient;