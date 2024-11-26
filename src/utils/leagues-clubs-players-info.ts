"use server";

// Define the interface to match the leagues array
export interface LeagueProps {
  name: string;
  code: string;
  logo: string;
}

// Function to get the leagues array
export const getLeagues = async (): Promise<LeagueProps[]> => {
  const leagues = [
    {
      name: "Premier League",
      code: "PL",
      logo: "/assets/images/premier-league-logo.webp",
    },
    {
      name: "Premiership",
      code: "PL",
      logo: "/assets/images/premier-league-logo.webp",
    },
    {
      name: "Bundesliga",
      code: "BL1",
      logo: "/assets/images/bundesliga-logo.webp",
    },
    {
      name: "Ligue 1",
      code: "FL1",
      logo: "/assets/images/ligue-1-logo.webp",
    },
    {
      name: "Ligue1",
      code: "FL1",
      logo: "/assets/images/ligue-1-logo.webp",
    },
    {
      name: "Serie a",
      code: "SA",
      logo: "/assets/images/serie-a-logo.webp",
    },
    {
      name: "Primera division",
      code: "PD",
      logo: "/assets/images/la-liga-logo.webp",
    },
    {
      name: "La Liga",
      code: "PD",
      logo: "/assets/images/la-liga-logo.webp",
    },
    {
      name: "EFL Championship",
      code: "ELC",
      logo: "/assets/images/efl-championship.webp",
    },
  ];

  return leagues;
};

// Takes the name of a league and returns the search ID
export const findLeague = async (
  leagueName: string
): Promise<LeagueProps | undefined> => {
  const leagues = await getLeagues();
  const filtered = leagues.filter((league) => {
    const lowerCaseQuery = leagueName.toLowerCase().replace(/-/g, " ");
    return league.name.toLowerCase().includes(lowerCaseQuery);
  });
  return filtered.length > 0 ? filtered[0] : undefined;
};

// Takes the name of a club and returns the club ID
export const findClubId = async (
  clubName: string
): Promise<string | undefined> => {
  // Object to search a team by name and find the id
  const clubId = [
    // Prem Teams
    { name: "manchester city fc", id: 65 },
    { name: "man city", id: 65 },
    { name: "manchester united", id: 66 },
    { name: "manchester utd", id: 66 },
    { name: "man utd", id: 66 },
    { name: "liverpool fc", id: 64 },
    { name: "liverpool f.c.", id: 64 },
    { name: "liverpool", id: 64 },
    { name: "chelsea", id: 61 },
    { name: "chelsea fc", id: 61 },
    { name: "chelsea f.c.", id: 61 },
    { name: "tottenham hotspur", id: 73 },
    { name: "tottenham hotspur fc", id: 73 },
    { name: "tottenham", id: 73 },
    { name: "spurs", id: 73 },
    { name: "arsenal fc", id: 57 },
    { name: "west ham", id: 563 },
    { name: "west ham fc", id: 563 },
    { name: "wolves", id: 76 },
    { name: "wolverhampton wanderers fc", id: 76 },
    { name: "crystal palace", id: 354 },
    { name: "crystal palace fc", id: 354 },
    { name: 'leicester city"', id: 338 },
    { name: 'leicester city fc"', id: 338 },
    { name: "aston villa", id: 58 },
    { name: "aston villa fc", id: 58 },
    { name: "southampton fc", id: 340 },
    { name: "southampton", id: 340 },
    { name: "brighton & hove albion fc", id: 397 },
    { name: "brighton", id: 397 },
    { name: "brentford", id: 402 },
    { name: "brentford fc", id: 402 },
    { name: "newcastle", id: 67 },
    { name: "newcastle united fc", id: 67 },
    { name: "leeds united fc", id: 341 },
    { name: "leeds", id: 341 },
    { name: "leedsUtd", id: 341 },
    { name: "leedsUnited", id: 341 },
    { name: "everton", id: 62 },
    { name: "everton fc", id: 62 },
    { name: "burnley", id: 328 },
    { name: "burnley fc", id: 328 },
    { name: "watford fc", id: 346 },
    { name: "watford", id: 346 },
    { name: "norwich city fc", id: 68 },
    { name: "norwich city", id: 68 },
    { name: "norwich", id: 68 },
    // Serie A Teams
    { name: 'ac milan"', id: 98 },
    { name: "fc internazionale milano", id: 108 },
    { name: "inter", id: 108 },
    { name: "ssc napoli", id: 113 },
    { name: "juventus fc", id: 109 },
    { name: "as roma", id: 100 },
    { name: "ss lazio", id: 110 },
    { name: "acf fiorentina", id: 99 },
    { name: "atalanta bc", id: 102 },
    { name: "us sassuolo calcio", id: 471 },
    { name: "hellas verona fc", id: 450 },
    { name: "torino fc", id: 586 },
    { name: "bologna fc 1909", id: 103 },
    { name: "udinese calcio", id: 115 },
    { name: "empoli fc", id: 445 },
    { name: "spezia calcio", id: 488 },
    { name: "uc sampdoria", id: 584 },
    { name: "cagliari calcio", id: 104 },
    { name: "venezia fc", id: 454 },
    { name: "genoa fc", id: 107 },
    { name: "us salernitana 1919", id: 455 },
    // Bundesliga Teams
    { name: "fc bayern münchen", id: 5 },
    { name: "fc bayern munich", id: 5 },
    { name: "borussia dortmund", id: 4 },
    { name: "bayer leverkusen", id: 3 },
    { name: "rb leipzig", id: 721 },
    { name: "red bull leipzig", id: 721 },
    { name: "rasenballsport leipzig", id: 721 },
    { name: "sc freiburg", id: 17 },
    { name: "tsg 1899 hoffenheim", id: 2 },
    { name: "1. fc köln", id: 1 },
    { name: "1. fc koln", id: 1 },
    { name: "eintracht frankfurt", id: 19 },
    { name: "1. fsv mainz 05", id: 15 },
    { name: "borussia mönchengladbach", id: 18 },
    { name: "borussia monchengladbach", id: 18 },
    { name: "vfl bochum 1848", id: 36 },
    { name: "vfl wolfsburg", id: 11 },
    { name: "fc augsburg", id: 16 },
    { name: "vfb stuttgart", id: 10 },
    { name: "arminia bielefeld", id: 38 },
    { name: "hertha berlin", id: 9 },
    { name: "hertha bsc", id: 9 },
    { name: "spvgg greuther fürth 1903", id: 21 },
    { name: "spvgg greuther furth 1903", id: 21 },
    //La Liga
    { name: "real madrid cf", id: 86 },
    { name: "fc barcelona", id: 81 },
    { name: "barca", id: 81 },
    { name: "sevilla fc", id: 559 },
    { name: "club atlético de madrid", id: 78 },
    { name: "club atletico de madrid", id: 78 },
    { name: "real betis balompié", id: 90 },
    { name: "real sociedad de fútbol", id: 92 },
    { name: "real sociedad de futbol", id: 92 },
    { name: "villarreal cf", id: 99 },
    { name: "athletic club", id: 77 },
    { name: "athletic bilbao", id: 77 },
    { name: 'valencia cf"', id: 95 },
    { name: "ca osasuna", id: 79 },
    { name: "rcd espanyol de barcelona", id: 80 },
    { name: "rc celta de vigo", id: 558 },
    { name: "rayo vallecano de madrid", id: 87 },
    { name: "getafe cf", id: 82 },
    { name: "elche cf", id: 285 },
    { name: "granada cf", id: 83 },
    { name: "rcd mallorca", id: 89 },
    { name: "cádiz cf", id: 264 },
    { name: "cadiz cf", id: 264 },
    { name: "levante ud", id: 88 },
    { name: "deportivo alavés", id: 263 },
    { name: "deportivo alaves", id: 263 },
    // Championship Teams
    { name: "fulham fc", id: 63 },
    { name: "afc bournemouth", id: 1044 },
    { name: "huddersfield town afc", id: 394 },
    { name: "nottingham forest fc", id: 351 },
    { name: "luton town fc", id: 389 },
    { name: "sheffield united fc", id: 356 },
    { name: "blackburn rovers fc", id: 59 },
    { name: "middlesbrough fc", id: 343 },
    { name: "millwall fc", id: 384 },
    { name: "coventry city fc", id: 1076 },
    { name: "queens park rangers fc", id: 69 },
    { name: "qpr", id: 69 },
    { name: "west bromwich albion fc", id: 74 },
    { name: "preston north end fc", id: 1081 },
    { name: "swansea city afc", id: 72 },
    { name: "stoke city fc", id: 70 },
    { name: "blackpool fc", id: 336 },
    { name: "cardiff city fc", id: 715 },
    { name: "birmingham city fc", id: 332 },
    { name: "bristol city fc", id: 387 },
    { name: "hull city afc", id: 322 },
    { name: "barnsley fc", id: 357 },
    { name: "derby county fc", id: 342 },
    { name: "peterborough united fc", id: 1077 },
    // Ligue 1 Teams
    { name: "paris saint-germain fc", id: 524 },
    { name: "paris saint germain fc", id: 524 },
    { name: "psg", id: 524 },
    { name: "olympique de marseille", id: 516 },
    { name: "stade rennais fc 1901", id: 529 },
    { name: "rennes", id: 529 },
    { name: "rc strasbourg alsace", id: 576 },
    { name: "ogc nice", id: 522 },
    { name: "as monaco fc", id: 548 },
    { name: "lille ocs", id: 521 },
    { name: "racing club de lens", id: 546 },
    { name: "fc nantes", id: 543 },
    { name: "olympique lyonnais", id: 523 },
    { name: "lyon fc", id: 523 },
    { name: "montpellier hsc", id: 518 },
    { name: "stade brestois 29", id: 512 },
    { name: "stade de reims", id: 547 },
    { name: "reims fc", id: 547 },
    { name: "angers sco", id: 532 },
    { name: "es troyes ac", id: 531 },
    { name: "fc lorient", id: 336 },
    { name: "clermont foot 63", id: 541 },
    { name: "as saint-étienne", id: 527 },
    { name: "as saint étienne", id: 527 },
    { name: "as saint-etienne", id: 527 },
    { name: "as saint etienn", id: 527 },
    { name: "fc girondins de bordeaux", id: 526 },
    { name: "fc metz", id: 545 },
  ];
  const filtered = clubId.filter((club) => {
    const lowerCaseQuery = clubName.toLowerCase();
    return club.name.toLowerCase().includes(lowerCaseQuery);
  });
  return filtered.length > 0 ? filtered[0].id.toString() : undefined;
};
