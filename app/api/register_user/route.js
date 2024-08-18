import { NextResponse } from 'next/server';
import connectDB from '../database/db';
import schemas from '../database/schemas';

export async function POST(req, res) {
  const registrationData = await req.json();
  const { email } = registrationData;

  try {
    connectDB();

    let existingUser = await schemas.User.findOne({ email });

    if (existingUser) {
      // Destructure registrationData and remove email field
      const { email, ...updatedUserData } = registrationData;

      // Update existingUser with updatedUserData using Object.assign
      Object.assign(existingUser, updatedUserData);

      existingUser = await existingUser.save();

      console.log('User updated:', existingUser);

      return await NextResponse.json({ message: "User updated successfully", _id: existingUser._id });
    } else {
      return await NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating user:', error);

    return await NextResponse.json({ error: "An error occurred while updating the user" }, { status: 500 });
  }
}
