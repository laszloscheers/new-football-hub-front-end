'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronLeft, ChevronRight, CalendarIcon } from 'lucide-react'
import { cn } from "@/lib/utils"

interface UpcomingDateNavigationProps {
  onDateChange: (date: Date) => void
  availableDates: AvailableDate[]
  initialDate: Date
}

export interface AvailableDate {
  date: Date
  matches: number
}

export function UpcomingDateNavigation({ onDateChange, availableDates, initialDate }: UpcomingDateNavigationProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate)
  const [calendarOpen, setCalendarOpen] = useState(false)

  useEffect(() => {
    setSelectedDate(initialDate)
    onDateChange(initialDate)
  }, [initialDate, onDateChange])

  const handleDateChange = (direction: 'prev' | 'next') => {
    const currentIndex = availableDates.findIndex(
      d => d.date.toDateString() === selectedDate.toDateString()
    )

    if (currentIndex === -1) return

    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1

    if (newIndex >= 0 && newIndex < availableDates.length) {
      const newDate = availableDates[newIndex].date
      setSelectedDate(newDate)
      onDateChange(newDate)
    }
  }

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      onDateChange(date)
      setCalendarOpen(false)
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 bg-white text-gray-600 p-2 rounded-lg shadow-sm border mb-2">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => handleDateChange('prev')}
        disabled={selectedDate.toDateString() === availableDates[0].date.toDateString()}
        className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "min-w-[120px] justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2 font-medium",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate.toLocaleDateString('default', { 
              day: '2-digit',
              month: '2-digit',
              weekday: 'short'
            }).toUpperCase()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white border-gray-200">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            disabled={(date) => 
              !availableDates.some(d => d.date.toDateString() === date.toDateString()) ||
              date < new Date(new Date().setHours(0, 0, 0, 0))
            }
            initialFocus
            defaultMonth={initialDate}
            className="bg-white"
          />
        </PopoverContent>
      </Popover>

      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => handleDateChange('next')}
        disabled={selectedDate.toDateString() === availableDates[availableDates.length - 1].date.toDateString()}
        className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

