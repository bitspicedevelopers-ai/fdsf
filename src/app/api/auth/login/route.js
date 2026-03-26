import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  const [rows] = await db.execute(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password]
  );

  if (rows.length === 0) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Login success",
    user: rows[0],
  });
}
