import { NextResponse } from "next/server";

export async function GET(req, res) {
    try {
        console.log("API URL", process.env.API);
        const response = await fetch(`http://100.24.238.50:3000/me`, {});
        console.log({ response });
        return NextResponse.json(response);
    } catch (error) {
        console.error("Error GETTING USER:", error);

        return NextResponse.json({ error: "An error occurred GETTING USER" });
    }
}
