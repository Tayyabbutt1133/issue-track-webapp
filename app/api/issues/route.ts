import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { createIssueSchema } from "../../ValidationSchemas";

// Initialize PrismaClient
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export async function POST(request: NextRequest) {
  let body;
  
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON format' },
      { status: 400 }
    );
  }

  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { errors: validation.error.format() },
      { status: 400 }
    );
  }

  try {
    const newIssue = await prisma.issue.create({
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
      },
    });

    return NextResponse.json(
      { success: true, data: newIssue },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating issue:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { success: false, error: `Prisma error: ${error.message}` },
        { status: 500 }
      );
    } else if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message, stack: error.stack },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: 'An unexpected error occurred while creating the issue' },
        { status: 500 }
      );
    }
  }
}