import { NextResponse } from 'next/server';
import connectDB from '../database/db';
import schemas from '../database/schemas';

export async function POST(req, res) {
      const registrationData = await req.json();
      const { email, creditCard } = registrationData;
console.log(email, creditCard);
      try {
            connectDB();

            // Find the user by email and update the creditCard field
            const updatedUser = await schemas.User.findOneAndUpdate(
                  { email: email },
                  { $set: { creditCard: creditCard , level:2} },
                  { new: true }
            );

            if (!updatedUser) {
                  return await NextResponse.json({ error: "User not found" }, { status: 404 });
            }

            return await NextResponse.json({ message: "User updated successfully", user: updatedUser }, { status: 200 });
      } catch (error) {
            console.error('Error updating user:', error);

            return await NextResponse.json({ error: "An error occurred while updating the user" }, { status: 500 });
      }
}
