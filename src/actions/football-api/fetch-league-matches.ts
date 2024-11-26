"use server";

import { getApiKeys } from "../../utils/api-array";

// Combined Method - All Relevant League Data
export const fetchLeagueMatches = async (league: string) => {
  //Makes API calls to different token keys until one is successful
  var apiCall = false;
  var i = 0;
  const apiKeys = await getApiKeys();

  do {
    try {
      //Fetching the Matches, top scorers and matches from the API where i is the API in apiKeys' array
      const resGetLeagueMatches = await fetch(
        process.env.FOOTBALL_DATA_API_ROUTE +
          "competitions/" +
          league +
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
        return getLeagueMatches;
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
};
