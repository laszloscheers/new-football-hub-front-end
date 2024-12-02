import { sendContactPageForm } from "@/lib/mail";
import { NextResponse } from "next/server";

const handler = async (req: Request) => {
  try {
    const { name, email, phone, message } = await req.json();
    await sendContactPageForm({ name, email, phone, message });
    return NextResponse.json(
      { success: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
};

export { handler as POST };
