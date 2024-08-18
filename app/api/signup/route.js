import { NextResponse } from 'next/server';
import connectDB from '../database/db';
import schemas from '../database/schemas';


export async function POST(req, res) {
      const registrationData = await req.json();
      const { firstname, lastname, email } = registrationData
      console.log(firstname, lastname, email,);

      try {
            connectDB();


            const existingUser = await schemas.User.findOne({
                  $or: [
                        { email: email },
                  ],
            });

            if (existingUser) {
                  return await NextResponse.json({ error: "User already exists with the same email" }, { status: 400 });
            }

            const newUser = new schemas.User({
                  firstname,
                  lastname,
                  bragname: null,
                  email,
                  phoneNumber: "",
                  country: "",
                  age: "",
                  gender: "",
            });

            const savedUser = await newUser.save();

            console.log('User saved to the database:', savedUser._id);

            return await NextResponse.json({ message: "User registered successfully", _id: savedUser._id });
      } catch (error) {
            console.error('Error registering user:', error);

            return await NextResponse.json({ error: "An error occurred while registering the user" }, { status: 500 });
      }
}
