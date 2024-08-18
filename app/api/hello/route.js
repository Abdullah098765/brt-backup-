import { NextResponse } from 'next/server';
import connectDB from '../database/db';

export async function GET(req, res) {
      try {
            connectDB();
            console.log('Initialization code executed');

            return await NextResponse.json({ message: "Initialization code executed" });
      } catch (error) {
            console.error('Initialization error:', error);
            return await NextResponse.json({ error: "Initialization error" });
      }
}
