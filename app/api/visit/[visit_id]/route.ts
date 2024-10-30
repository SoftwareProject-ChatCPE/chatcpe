import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


/**
 * Handles a PUT request to increment the visit count of a question.
 *
 * @param request - The incoming HTTP request object.
 * @param params - An object containing route parameters.
 * @param params.visit_id - The ID of the question whose visit count is to be incremented.
 * @returns A JSON response with the updated question data if successful, or an error message if not.
 */
export async function PUT(request: Request, { params }: { params: { visit_id: string } }) {
    try {
        const questionId = parseInt(params.visit_id, 10);

        if (isNaN(questionId)) {
            return NextResponse.json({ error: "Invalid question ID provided" }, { status: 400 });
        }

        // Increment the visit count
        const updatedQuestion = await prisma.question.update({
            where: { question_id: questionId },
            data: { visit_count: { increment: 1 } },
        });

        return NextResponse.json(updatedQuestion, { status: 200 });
    } catch (error) {
        console.error("Error updating visit count:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}