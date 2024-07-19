/** @format */

// import prisma from "../../../lib/db";
import prisma from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    console.log("user", users);
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
