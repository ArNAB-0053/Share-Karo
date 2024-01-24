import EmailTemplate  from "../../../Components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: { json: () => any; }) {
  const res = await req.json();
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["arnabbhattacharyya1234@gmail.com"],
      subject: res?.userName + ' ShareKaro',
      react: EmailTemplate({ res }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
