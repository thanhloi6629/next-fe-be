/** @format */

import prisma from "../../../lib/db";
import { NextResponse, NextRequest } from "next/server";
import { parse } from "url";

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

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, name, email } = await req.json();
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: email,
        name: name,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: any) {
  try {
    // const { id } = await req.query;
    const query = parse(req.url, true)?.query;
    const deletePosts = prisma.post.deleteMany({
      where: {
        userId: Number(query.id),
      },
    });
    const deleteUser = prisma.user.delete({
      where: {
        id: Number(query.id),
      },
    });
    await prisma.$transaction([deletePosts, deleteUser]);
    return NextResponse.json(deleteUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
