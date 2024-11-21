// API info for the Football Data API -  use a HTTP header named "X-Auth-Token" with the token as the value.
export const mapAPIs = [
  { link: "/api/", token: process.env.REACT_APP_API_KEY_1 },
  { link: "/api/", token: process.env.REACT_APP_API_KEY_2 },
  { link: "/api/", token: process.env.REACT_APP_API_KEY_3 },
  { link: "/api/", token: process.env.REACT_APP_API_KEY_4 },
  { link: "/api/", token: process.env.REACT_APP_API_KEY_5 },
  { link: "/api/", token: process.env.REACT_APP_API_KEY_6 },
  { link: "/api/", token: process.env.REACT_APP_API_KEY_7 },
  { link: "/api/", token: process.env.REACT_APP_API_KEY_8 },
  { link: "/api/", token: process.env.REACT_APP_API_KEY_9 },
  { link: "/api/", token: process.env.REACT_APP_API_KEY_10 },
  { link: "/api/", token: process.env.REACT_APP_API_KEY_11 },
  { link: "/api/", token: process.env.REACT_APP_API_KEY_12 },
];

// API info for odds
export const OddsApi1 = {
  link1: "https://api.the-odds-api.com/v4/sports/",
  link2: "/odds/?apiKey=",
  token3: process.env.REACT_APP_API_KEY_16,
  link4: "&regions=eu&markets=h2h",
};

//Image Links
export const clubCrests = {
  link1: "https://crests.football-data.org/",
  link2: ".svg",
};
