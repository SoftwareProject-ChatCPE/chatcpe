import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


/**
 * Handles the PUT request to update the visit count of a specific question.
 *
 * @param {Request} request - The incoming HTTP request object.
 * @param {Object} param1 - An object containing route parameters.
 * @param {Object} param1.params - The route parameters.
 * @param {string} param1.params.visit_id - The ID of the question to update.
 *
 * @return {Promise<Response>} A promise that resolves to the HTTP response object.
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