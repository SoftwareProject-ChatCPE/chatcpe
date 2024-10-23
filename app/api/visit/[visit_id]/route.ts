import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//increment the visit count of a question
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