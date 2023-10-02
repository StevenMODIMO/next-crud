import User from "@/models/userModel";
import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const email = body.email;
  const password = body.password;
  await dbConnect();
  try {
    const user = await User.signup(email, password);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
