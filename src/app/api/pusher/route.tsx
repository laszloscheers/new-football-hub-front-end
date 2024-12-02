import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const handler = async (req: Request) => {
  if (req.method === 'POST') {

    try {
      const { message, username, token } = await req.json();
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message, username }),
      });

      if (response.ok) {
        return NextResponse.json(
          { success: "Message sent successfully" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { error: "Failed to send message" },
          { status: 500 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: `Error sending message: ${error}` },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { error: `EMethod ${req.method} Not Allowed` },
      { status: 500 }
    );
  }
}

export { handler as POST };