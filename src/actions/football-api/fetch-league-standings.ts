"use server";
import { apiKeys, footballDataUrl } from "./api-array";
import { findLeagueCode } from "./helper-functions";

// Combined Method - All Relevant League Data
export const fetchLeagueStandings = async (league: string) => {
  //Makes API calls to different token keys until one is successful
  var apiCall = false;
  var i = 0;

  do {
    try {
      //Fetching the standings, top scorers and matches from the API where i is the API in apiKeys' array
      const resGetLeagueStandings = await fetch(
        footballDataUrl + "competitions/" + league + "/standings",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": apiKeys[i] || "",
            "access-control-allow-origin":
              process.env.NEXT_PUBLIC_APP_URL + "/*" || "",
          },
        }
      );
      return resGetLeagueStandings.json();

      if (resGetLeagueStandings.ok) {
        const getLeagueStandings = await resGetLeagueStandings.json();
        apiCall = false;
        return getLeagueStandings;
      }
    } catch (error) {
      //If it is the last error send the error "Too many requests"
      console.log(error);
      if (i === apiKeys.length - 1) {
        return { error: error };
      } else {
        //If an error is catch stops the loop
        apiCall = true;
        i++;
      }
    }

    //Runs apiLength times because that's the number of keys that we have
  } while (apiCall && i < apiKeys.length);
};
