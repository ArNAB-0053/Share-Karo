import { NextResponse } from "next/server";
import EmailTemplate from "../../../Components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
        from: "arnab.dev",
        to: ["arnabbhattacharyya1234@gmail.com"],
        subject: "Hello world",
        react: EmailTemplate({ firstName: "John" }),
      });
      

    return NextResponse.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
