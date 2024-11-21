import { mapAPIs } from "./api-array";
import { findLeagueCode } from "./helper-functions";

const apiLength = Object.keys(mapAPIs).length;

// Combined Method - All Relevant League Data
export const fetchLeagueStandings = async (league: string) => {
  //Makes API calls to different token keys until one is successful
  const leagueCode = findLeagueCode(league);
  var apiCall = false;
  var i = 0;

  do {
    try {
      //Fetching the standings, top scorers and matches from the API where i is the API in apiKeys' array
      const resGetLeagueStandings = await fetch(
        mapAPIs[0].link + "competitions/" + leagueCode + "/standings",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": mapAPIs[0].token || "",
            "access-control-allow-origin":
              process.env.NEXT_PUBLIC_APP_URL || "",
          },
        }
      );
      if (resGetLeagueStandings.ok) {
        const getLeagueStandings = await resGetLeagueStandings.json();
        console.log(getLeagueStandings);
        apiCall = false;
        return getLeagueStandings;
      }
    } catch (error) {
      //If it is the last error send the error "Too many requests"
      if (i === apiLength - 1) {
        return { error: "Too many requests, try again later" };
      } else {
        //If an error is catch stops the loop
        apiCall = true;
        i++;
      }
    }

    //Runs apiLength times because that's the number of keys that we have
  } while (apiCall && i < apiLength);
};
