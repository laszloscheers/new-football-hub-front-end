import { findLeague } from "@/utils/leagues-clubs-players-info";
import { NextResponse } from "next/server";

const handler = async (req: Request) => {
  if (req.method === "POST") {
    try {
      const { leagueCode } = await req.json();
      const leagueData = await findLeague(leagueCode);

      if (!leagueData) {
        return NextResponse.json(
          { error: "League not found" },
          { status: 404 }
        );
      }

      const apiKeys = ["key1", "key2", "key3"]; // Example API keys
      let apiCall = true;
      let i = 0;

      while (apiCall && i < apiKeys.length) {
        try {
          const resGetLeagueMatches = await fetch(
            `https://api.football-data.org/v2/competitions/${leagueCode}/matches`,
            {
              headers: {
                "X-Auth-Token": apiKeys[i],
              },
            }
          );

          if (resGetLeagueMatches.ok) {
            const getLeagueMatches = await resGetLeagueMatches.json();
            apiCall = false;
            return NextResponse.json(getLeagueMatches, { status: 200 });
          } else {
            return NextResponse.json(
              { error: "Something went wrong" },
              { status: 500 }
            );
          }
        } catch (error) {
          // If it is the last error, send the error "Too many requests"
          if (i === apiKeys.length - 1) {
            return NextResponse.json(
              { error: "Too many requests, try again later: " + (error instanceof Error ? error.message : "Unknown error") },
              { status: 429 }
            );
          } else {
            // If an error is caught, continue to the next API key
            apiCall = true;
            i++;
          }
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return NextResponse.json(
        { error: "Error processing request: " + errorMessage },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { error: `Method ${req.method} Not Allowed` },
      { status: 405 }
    );
  }
};

export { handler as POST };