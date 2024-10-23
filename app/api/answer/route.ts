import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import * as z from 'zod';
const prisma = new PrismaClient();

const answerSchema = z.object({
    question_id: z.number(),
    answer_text: z.string(),
});

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
