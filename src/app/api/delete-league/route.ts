import { NextResponse } from "next/server";

const handler = async (req: Request) => {
  if (req.method === "DELETE") {
    try {
      const { token, name } = await req.json();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/leagues`,
        {
          method: "DELETE",
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
          { success: "Leagues deleted successfully" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { error: "Failed to deleted Leagues" },
          { status: 500 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: `Error deleted Leagues: ${error}` },
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

export { handler as DELETE };
