import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();






export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const categoryId = url.pathname.split('/').pop();
        // Validate category_id
        if (!categoryId || isNaN(parseInt(categoryId, 10))) {
            return NextResponse.json({ error: "Invalid category ID provided" }, { status: 400 });
        }
        const questions = await prisma.question.findMany({
            where: { category_id: parseInt(categoryId, 10) },
            orderBy: { question_id: 'asc' },
            include: {
                answer: {
                    select: {
                        answer_id: true,
                        answer_text: true,
                    },
                },
            },

        });


        return NextResponse.json(questions, { status: 200 });
    } catch (error) {
        console.error("Error fetching questions:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}



/**
 * Deletes a question and its associated answers from the database.
 *
 * @param request - The HTTP request object.
 * @param params - An object containing route parameters.
 * @param params.question_id - The ID of the question to be deleted.
 * @returns A JSON response indicating the result of the delete operation.
 *          - If successful, returns a message confirming deletion with a 200 status.
 *          - If the question ID is invalid, returns an error message with a 400 status.
 *          - If the question is not found, returns an error message with a 404 status.
 *          - If an internal error occurs, returns an error message with a 500 status.
 */
export async function DELETE(request: Request, { params }: { params: { question_id: string } }) {
    try {
        const questionId = parseInt(params.question_id, 10);

        if (isNaN(questionId)) {
            return NextResponse.json({ error: "Invalid question ID provided" }, { status: 400 });
        }

        // Check if the question exists before attempting to delete
        const existingQuestion = await prisma.question.findUnique({
            where: { question_id: questionId },
        });

        if (!existingQuestion) {
            return NextResponse.json({ error: "Question not found" }, { status: 404 });
        }

        // Delete the question and associated answers
        await prisma.answer.deleteMany({
            where: { question_id: questionId },
        });

        await prisma.question.delete({
            where: { question_id: questionId },
        });

        return NextResponse.json({ message: "Question and associated answers deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting question:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


/**
 * Updates a question and its associated answer in the database.
 *
 * @param request - The HTTP request object containing the updated question and answer data.
 * @param params - An object containing route parameters.
 * @param params.question_id - The ID of the question to be updated.
 * @returns A JSON response with the updated question and answer.
 *          - If successful, returns the updated question and answer with a 200 status.
 *          - If the question ID is invalid or data is missing, returns an error message with a 400 status.
 *          - If an internal error occurs, returns an error message with a 500 status.
 */
export async function PUT(request: Request, { params }: { params: { question_id: string } }) {
    try {
        const questionId = parseInt(params.question_id, 10);
        const { question_text, answer_text } = await request.json();

        // Validate if data is empty
        if (!question_text || !answer_text) {
            return NextResponse.json({ error: "Question text and answer text are required" }, { status: 400 });
        }

        if (isNaN(questionId)) {
            return NextResponse.json({ error: "Invalid question ID provided" }, { status: 400 });
        }

        // Update the question and the associated answer
        const updatedQuestion = await prisma.question.update({
            where: { question_id: questionId },
            data: {
                question_text,
                answer: {
                    update: {
                        answer_text: answer_text, // Update the associated answer text
                    },
                },
            },
            include: { answer: true }, // Include the updated answer in the response
        });

        return NextResponse.json(updatedQuestion, { status: 200 });
    } catch (error) {
        console.error("Error updating question and answer:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
