import { NextResponse } from "next/server";

const handler = async (req: Request) => {
  if (req.method === "POST") {
    try {
      const { token, name } = await req.json();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/leagues`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
          }),
        }
      );
      if (response.ok) {
        return NextResponse.json(
          { success: "Leagues added successfully" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { error: "Failed to added Leagues" },
          { status: 500 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: `Error added Leagues: ${error}` },
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
