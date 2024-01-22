import { auth } from "@clerk/nextjs";

export default async function handler(req, res) {
  try {
    const { userId } = auth();
    res.status(200).json({ userId });
  } catch (error) {
    console.error("Error fetching userId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}