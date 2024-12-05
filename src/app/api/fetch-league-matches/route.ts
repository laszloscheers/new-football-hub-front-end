import { getApiKeys } from "@/utils/api-array";
import { findLeague } from "@/utils/leagues-clubs-players-info";
import { NextResponse } from "next/server";

const handler = async (req: Request) => {
  if (req.method === "POST") {
    //Makes API calls to different token keys until one is successful
    var apiCall = false;
    var i = 0;
    const apiKeys = await getApiKeys();
    const { leagueCode } = await req.json();

    do {
      try {
        //Fetching the Matches, top scorers and matches from the API where i is the API in apiKeys' array
        const resGetLeagueMatches = await fetch(
          process.env.FOOTBALL_DATA_API_ROUTE +
            "competitions/" +
            leagueCode +
            "/matches",
          {
            method: "GET",
            headers: {
              "X-Auth-Token": apiKeys[i] || "",
            },
          }
        );

        if (resGetLeagueMatches.ok) {
          const getLeagueMatches = await resGetLeagueMatches.json();
          apiCall = false;
          return NextResponse.json(getLeagueMatches, { status: 200 });
        } else {
          return { error: "Something went wrong" };
        }
      } catch (error) {
        //If it is the last error send the error "Too many requests"
        if (i === apiKeys.length - 1) {
          return { error: "Too many requests, try again later" + error };
        } else {
          //If an error is catch stops the loop
          apiCall = true;
          i++;
        }
      }

      //Runs apiLength times because that's the number of keys that we have
    } while (apiCall && i < apiKeys.length);
  } else {
    return NextResponse.json(
      { error: `EMethod ${req.method} Not Allowed` },
      { status: 500 }
    );
  }
};

export { handler as POST };
