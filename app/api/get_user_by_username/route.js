import { NextResponse } from "next/server";
import connectDB from "../database/db";
import Schemas from "../database/schemas";

connectDB();

export async function POST(req, res) {
  try {
    const data = await req.json();
    const { usernameOrEmail } = data;

    const existingUser = await Schemas.User.findOne({
      $or: [
        { bragname: usernameOrEmail },
        { email: usernameOrEmail },
      ],
    });
    
    if (!existingUser) {
      return await NextResponse.json({ error: "Invalid username or email" });
    }

    return await NextResponse.json(existingUser);
  } catch (error) {
    console.error('Error during login:', error);

    return await NextResponse.json({ error: 'An error occurred during login' });
  }
}
