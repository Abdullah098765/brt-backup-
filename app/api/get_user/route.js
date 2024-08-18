import { NextResponse } from "next/server";
import connectDB from "../database/db";
import Schemas from "../database/schemas";

connectDB();

export async function POST(req, res) {
      const { email } = await req.json()
      try {
            const existingUser = await Schemas.User.findOne({ email })
            if (!existingUser) {
                  return NextResponse.json({ error: "Invalid emal" });
            }

            return NextResponse.json(existingUser);
      } catch (error) {
            console.error('Error GETTING USER:', error);

            return NextResponse.json({ error: 'An error occurred GETTING USER' });
      }
}
