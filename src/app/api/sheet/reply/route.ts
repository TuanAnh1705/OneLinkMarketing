import { sheetController } from "@vns-core/core";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const result = await sheetController.submitReply({ name, email, message });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ message: "Reply sent successfully!" });
  } catch (err) {
    console.error("Failed to send reply", err);
    const message = err instanceof Error ? err.message : "Failed to send reply";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
