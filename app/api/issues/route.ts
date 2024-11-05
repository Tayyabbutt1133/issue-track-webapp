import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { createIssueSchema } from "../../../app/ValidationSchemas";


// Initialize Prisma Client
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format, { status: 400 });
    }

    // Use prisma instance for database operation
    const newIssue = await prisma.issue.create({
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
      },
    });

    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    console.error('Error creating issue:', error);

    // Handle Prisma errors specifically
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: `Prisma error: ${error.message}` },
        { status: 500 }
      );
    } else if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, stack: error.stack },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: 'An unexpected error occurred while creating the issue' },
        { status: 500 }
      );
    }
  } finally {
    // Disconnect Prisma Client after request completes
    await prisma.$disconnect();
  }
}
