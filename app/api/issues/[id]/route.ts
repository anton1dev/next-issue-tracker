import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const body = await request.json()

    const validation = issueSchema.safeParse(body)

    if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 });


    const issueToEdit = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!issueToEdit) return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

    const updatedIssue = await prisma.issue.update({
        where: {id: parseInt(params.id)},
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(updatedIssue);
}