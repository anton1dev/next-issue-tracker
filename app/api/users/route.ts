import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const usersFromServer = await prisma.user.findMany({ orderBy: {name: 'asc'}});

    return NextResponse.json(usersFromServer);
}