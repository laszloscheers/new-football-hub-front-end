import { findLeague } from "@/utils/leagues-clubs-players-info";
import { NextResponse } from "next/server";

const handler = async (req: Request) => {
  if (req.method === "POST") {
    try {
      const { leagueName } = await req.json();
      const leagueData = await findLeague(leagueName);

      if (!leagueData) {
        return NextResponse.json(
          { error: "League not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(leagueData, { status: 200 });
    } catch (error) {
      console.error("Error fetching league");
    }
  } else {
    return NextResponse.json(
      { error: `EMethod ${req.method} Not Allowed` },
      { status: 500 }
    );
  }
};

export { handler as POST };
