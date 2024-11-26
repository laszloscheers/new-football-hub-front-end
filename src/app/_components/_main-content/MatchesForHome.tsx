"use client";

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react'

const MatchesForHome = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Tabs defaultValue="today">
      <TabsList className="mb-4 grid w-full grid-cols-4">
        <TabsTrigger value="today">Today's Matches</TabsTrigger>
        <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
        <TabsTrigger value="finished">Finished</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
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
        <p>Todays Matches</p>
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

      <TabsContent value="upcoming">
        <div className="rounded-lg bg-white/10 p-8 text-center bg-white">
          <p>No upcoming matches for the selected date.</p>
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default MatchesForHome;