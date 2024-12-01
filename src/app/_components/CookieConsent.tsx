'use client'

import { useState, useEffect } from 'react'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface CookiePreferences {
  functional: boolean
  statistics: boolean
  marketing: boolean
}

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [preferences, setPreferences] = useState<CookiePreferences>({
    functional: true, // Always true
    statistics: true,
    marketing: true
  })

  useEffect(() => {
    // Check if user has already set preferences
    const hasConsent = document.cookie.includes('cookie-consent=')
    if (!hasConsent) {
      setIsOpen(true)
    }
  }, [])

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleAccept = () => {
    setPreferences({
      functional: true,
      statistics: true,
      marketing: true
    })
    setCookiePreferences({
      functional: true,
      statistics: true,
      marketing: true
    })
    setIsOpen(false)
  }

  const handleReject = () => {
    setPreferences({
      functional: true,
      statistics: false,
      marketing: false
    })
    setCookiePreferences({
      functional: true,
      statistics: false,
      marketing: false
    })
    setIsOpen(false)
  }

  const handleSavePreferences = () => {
    setCookiePreferences(preferences)
    setIsOpen(false)
  }

  const setCookiePreferences = (prefs: CookiePreferences) => {
    // Set cookie consent preferences
    document.cookie = `cookie-consent=${JSON.stringify(prefs)};path=/;max-age=31536000`
    
    // Disable cookies based on preferences
    if (!prefs.statistics) {
      // Disable analytics cookies
      document.cookie = '_ga=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT'
      document.cookie = '_ga_*=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT'
    }
    
    if (!prefs.marketing) {
      // Disable marketing cookies
      document.cookie = '_fbp=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT'
      // Add other marketing cookies to disable
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm sm:max-w-md md:max-w-lg">
      <div className="bg-background border rounded-lg shadow-lg w-full relative overflow-hidden">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-4 sm:p-6">
          <p className="text-sm mb-4 sm:mb-6">
            To offer the best experiences, we use technologies like cookies to
            store and/or access device information. Consenting to these
            technologies will allow us to process data such as browsing behavior or
            unique IDs on this site. Not consenting or withdrawing consent may
            adversely affect certain features and functions.
          </p>

          <div className="space-y-4">
            {/* Functional Section */}
            <div className="border rounded-lg p-3 sm:p-4">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection('functional')}
              >
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="font-medium text-sm sm:text-base">Functional</span>
                  <span className="text-xs text-emerald-600">Always active</span>
                </div>
                {expandedSections['functional'] ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
              {expandedSections['functional'] && (
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                  Cookies necessary for the basic functionality of the site.
                </p>
              )}
            </div>

            {/* Statistics Section */}
            <div className="border rounded-lg p-3 sm:p-4">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection('statistics')}
              >
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="font-medium text-sm sm:text-base">Statistics</span>
                  <Switch
                    checked={preferences.statistics}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({ ...prev, statistics: checked }))
                    }
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                {expandedSections['statistics'] ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
              {expandedSections['statistics'] && (
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                  Cookies used to analyze user behavior.
                </p>
              )}
            </div>

            {/* Marketing Section */}
            <div className="border rounded-lg p-3 sm:p-4">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection('marketing')}
              >
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="font-medium text-sm sm:text-base">Marketing</span>
                  <Switch
                    checked={preferences.marketing}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({ ...prev, marketing: checked }))
                    }
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                {expandedSections['marketing'] ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
              {expandedSections['marketing'] && (
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                  Cookies used for personalized advertising.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-6">
            <Button 
              onClick={handleAccept}
              className="flex-1 bg-green-400 hover:bg-green-500 text-secondary text-sm"
            >
              Accept
            </Button>
            <Button 
              onClick={handleReject}
              variant="outline"
              className="flex-1 text-sm"
            >
              Reject
            </Button>
            <Button 
              onClick={handleSavePreferences}
              variant="outline"
              className="flex-1 text-sm"
            >
              Save preferences
            </Button>
          </div>

          <div className="flex justify-center gap-2 sm:gap-4 mt-4 text-xs">
            <Link href="/terms-and-conditions" className="text-primary hover:underline">
              Terms & Conditions
            </Link>
            <Link href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            <Link href="/cookies-policy" className="text-primary hover:underline">
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}