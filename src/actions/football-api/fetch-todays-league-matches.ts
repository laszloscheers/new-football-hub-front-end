"use server";

import { getApiKeys } from "../../utils/api-array";

// Combined Method - All Relevant League Data
export const fetchTodaysMatchesForLeague = async (
  league: string,
  today: string
) => {
  //Makes API calls to different token keys until one is successful
  var apiCall = false;
  var i = 0;
  const apiKeys = await getApiKeys();

  do {
    try {
      //Fetching the standings, top scorers and matches from the API where i is the API in apiKeys' array
      const resGetLeagueStandings = await fetch(
        process.env.FOOTBALL_DATA_API_ROUTE +
          "competitions/" +
          league +
          "/matches?" +
          "dateFrom=" +
          today +
          "&dateTo=" +
          today,
        {
          method: "GET",
          headers: {
            "X-Auth-Token": apiKeys[i] || "",
          },
        }
      );

      if (resGetLeagueStandings.ok) {
        const getLeagueStandings = await resGetLeagueStandings.json();
        apiCall = false;
        return getLeagueStandings;
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
