import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



/**
 * Retrieves an answer from the database by its ID.
 *
 * @param request - The HTTP request object.
 * @param params - An object containing route parameters.
 * @param params.answer_id - The ID of the answer to be retrieved.
 * @returns A JSON response containing the answer object with a status of 200 if found,
 *          or an error message with an appropriate status code if an error occurs.
 */
export async function GET(request: Request, { params }: { params: { answer_id: string } }) {
    try {
        const answerId = parseInt(params.answer_id, 10);

        if (isNaN(answerId)) {
            return NextResponse.json({ error: "Invalid answer ID provided" }, { status: 400 });
        }

        const answer = await prisma.answer.findUnique({
            where: { answer_id: answerId },
        });

        if (!answer) {
            return NextResponse.json({ error: "Answer not found" }, { status: 404 });
        }

        return NextResponse.json(answer, { status: 200 });
    } catch (error) {
        console.error("Error fetching answer:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
/**
 * Updates an existing answer in the database by its ID.
 *
 * @param request - The HTTP request object containing the updated answer data in JSON format.
 * @param params - An object containing route parameters.
 * @param params.answer_id - The ID of the answer to be updated.
 * @returns A JSON response containing the updated answer object with a status of 200 if successful,
 *          or an error message with an appropriate status code if an error occurs.
 */
export async function PUT(request: Request, { params }: { params: { answer_id: string } }) {
    try {
        const answerId = parseInt(params.answer_id, 10);

        if (isNaN(answerId)) {
            return NextResponse.json({ error: "Invalid answer ID provided" }, { status: 400 });
        }

        const body = await request.json();
        const { answer_text } = body;

        const updatedAnswer = await prisma.answer.update({
            where: { answer_id: answerId },
            data: {
                answer_text,
            },
        });

        return NextResponse.json(updatedAnswer, { status: 200 });
    } catch (error) {
        console.error("Error updating answer:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
