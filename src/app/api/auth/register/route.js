import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function POST(req) {
  try {
    let body;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "No JSON body sent" },
        { status: 400 }
      );
    }

    const { name, email, password } = body;
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields required" },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    return NextResponse.json({
      success: true,
      message: "User registered",
      userId: result.insertId,
    });
  } catch (error) {
    console.log("DB ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}