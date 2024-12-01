"use client";

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe2, Clock, Users, Trophy, Target, Zap, MessageSquare, Star } from 'lucide-react'
import ShimmerButton from "@/components/ui/shimmer-button"

export default function ManifestoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-12 md:py-24 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <Badge className="mb-4" variant="secondary">Our Manifesto</Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
              Revolutionizing Football Data Access
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              At Football Hub, we believe in making football data accessible, accurate, and actionable for fans worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                To provide football enthusiasts with real-time, comprehensive match data and statistics across major leagues worldwide, fostering a more connected and informed football community.
              </p>
            </div>
            <div className="grid gap-4 md:gap-8 grid-cols-2">
              <Card className="p-4 md:p-6">
                <CardContent className="space-y-2 p-0">
                  <Globe2 className="h-6 w-6 mb-2 text-primary" />
                  <h3 className="font-bold">Global Coverage</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive coverage of major leagues worldwide
                  </p>
                </CardContent>
              </Card>
              <Card className="p-4 md:p-6">
                <CardContent className="space-y-2 p-0">
                  <Clock className="h-6 w-6 mb-2 text-primary" />
                  <h3 className="font-bold">Real-Time Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Live scores and match events as they happen
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">What We Offer</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6">
              <CardContent className="space-y-2 p-0">
                <Trophy className="h-6 w-6 mb-2 text-primary" />
                <h3 className="font-bold">Major Leagues</h3>
                <p className="text-sm text-muted-foreground">
                  Premier League, La Liga, Bundesliga, Serie A, Ligue 1, and more
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="space-y-2 p-0">
                <Target className="h-6 w-6 mb-2 text-primary" />
                <h3 className="font-bold">Match Statistics</h3>
                <p className="text-sm text-muted-foreground">
                  Detailed match stats, lineups, and live commentary
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="space-y-2 p-0">
                <Zap className="h-6 w-6 mb-2 text-primary" />
                <h3 className="font-bold">Live Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time score updates and match events
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="space-y-2 p-0">
                <Users className="h-6 w-6 mb-2 text-primary" />
                <h3 className="font-bold">Community</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with football fans from around the world
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="space-y-2 p-0">
                <MessageSquare className="h-6 w-6 mb-2 text-primary" />
                <h3 className="font-bold">Live Chat</h3>
                <p className="text-sm text-muted-foreground">
                  Discuss matches in real-time with other fans
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="space-y-2 p-0">
                <Star className="h-6 w-6 mb-2 text-primary" />
                <h3 className="font-bold">Favorites</h3>
                <p className="text-sm text-muted-foreground">
                  Personalize your experience by following your favorite teams
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Accuracy</h3>
              <p className="text-muted-foreground">
                We prioritize delivering precise and reliable football data to our users.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Accessibility</h3>
              <p className="text-muted-foreground">
                Making football information easily accessible to fans everywhere.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Community</h3>
              <p className="text-muted-foreground">
                Building a global community of passionate football enthusiasts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold">Join Our Community</h2>
            <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
              Experience football like never before with real-time updates, comprehensive statistics, and a vibrant community of fans.
            </p>
            
            <div className="mt-8 flex flex-col items-center">
              
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6 text-base sm:text-lg text-muted-foreground"
              >
                Unleash all the potential, sign up now!
              </motion.p>

              <ShimmerButton 
                className="py-2 sm:py-3 px-6 sm:px-8 text-base sm:text-lg font-semibold"
                onClick={() => {/* Add navigation logic here */}}
              >
                <span className="flex flex-row align-middle justify-center text-center leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
                  Sign Up
                </span>
              </ShimmerButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

