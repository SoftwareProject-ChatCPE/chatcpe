import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import * as z from 'zod';
const prisma = new PrismaClient();

const questionSchema = z.object({
    question_text: z.string(),
    visit_count: z.number().optional(),
    category_id: z.number(),
    answer_text: z.string().optional(),
});
//get all questions
export async function GET(request: Request) {
    try {
        const questions = await prisma.question.findMany({
            include: {
                category: {
                    select: {
                        category_id: true,
                        category_name: true,
                    },
                },
                answer: {
                    select: {
                        answer_id: true,
                        answer_text: true,
                    },
                },
            },
        });

        return NextResponse.json({ questions });
    } catch (error) {
        console.error("Error getting questions:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
// create a new question
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { question_text, visit_count, category_id, answer_text } = questionSchema.parse(body);

        const categoryExists = await prisma.category.findUnique({ where: { category_id } });
        if (!categoryExists) {
            return NextResponse.json({ question: null, message: "Category not found" }, { status: 404 });
        }
        // Validate if data is empty
        if (!question_text|| !answer_text) {
            return NextResponse.json({ question: null, message: "Question text and answer text is required" }, { status: 400 });
        }

        const newQuestion = await prisma.question.create({
            data: {
                question_text,
                visit_count,
                category: {
                    connect: { category_id }
                },
                answer: {
                    create: {
                        answer_text: answer_text || "", // Use provided answer_text or empty string
                    },
                },
            },
        });
        return NextResponse.json(
            { question: newQuestion, message: "Question created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating category:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}