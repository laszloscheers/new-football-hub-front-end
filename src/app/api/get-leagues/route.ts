import { NextResponse } from "next/server";

const handler = async (req: Request) => {
  if (req.method === "POST") {
    try {
      const { token } = await req.json();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/leagues`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const leagues = await response.json();
        return NextResponse.json(leagues, { status: 200 });
      } else {
        return NextResponse.json(
          { error: "Failed to retrieved Leagues" },
          { status: 500 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: `Error getting Leagues: ${error}` },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { error: `EMethod ${req.method} Not Allowed` },
      { status: 500 }
    );
  }
};

export { handler as POST };
