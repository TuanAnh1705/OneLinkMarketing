import { sheetController } from "@vns-core/core";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, phone, company, budget, subject, message } = await req.json();

    const result = await sheetController.submitContact({
      name,
      email,
      phone,
      company,
      budget,
      subject,
      message,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Failed to send form", err);
    const message = err instanceof Error ? err.message : "Failed to send form";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
