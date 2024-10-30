import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import * as z from 'zod';
const prisma = new PrismaClient();

/**
 * Schema for validating an answer object.
 *
 * The answerSchema object enforces that an answer must include:
 * - A numeric question_id
 * - A string answer_text
 *
 */
const answerSchema = z.object({
    question_id: z.number(),
    answer_text: z.string(),
});


/**
 * Handles the HTTP POST request to create a new answer for a specific question.
 *
 * @param request - The incoming HTTP request object containing the answer data in JSON format.
 * @returns A JSON response indicating the result of the operation:
 * - If successful, returns the created answer and a success message with a 201 status code.
 * - If the question does not exist, returns a message indicating the question was not found with a 404 status code.
 * - If an error occurs, returns an error message with a 500 status code.
 */
export async function POST(request: Request) {

    try {
        const body = await request.json();
        const { question_id, answer_text } = answerSchema.parse(body);

        const questionExists = await prisma.question.findUnique({ where: { question_id } });
        if (!questionExists) {
            return NextResponse.json({ answer: null, message: "Question not found" }, { status: 404 });
        }

        const newAnswer = await prisma.answer.create({
            data: {
                answer_text,
                question_id,
            },
        });

        return NextResponse.json(
            { answer: newAnswer, message: "Answer created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating answer:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
