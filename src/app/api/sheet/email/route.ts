import { sheetController } from "@vns-core/core";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const result = await sheetController.submitEmail({ email });

    if (!result.success) {
      // Invalid email → 400 (client), any other failure → 500.
      if (result.error === "Invalid email") {
        return NextResponse.json({ error: "Email không hợp lệ." }, { status: 400 });
      }
      return NextResponse.json({ error: "Please Try Again!" }, { status: 500 });
    }

    return NextResponse.json({ message: "Successfully subscribed!" });
  } catch (err) {
    console.error("Failed To Send Email:", err);
    return NextResponse.json({ error: "Please Try Again!" }, { status: 500 });
  }
}
