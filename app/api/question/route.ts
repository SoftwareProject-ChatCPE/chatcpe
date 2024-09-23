import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import * as z from 'zod';
const prisma = new PrismaClient();


// Define a schema for input validation
const questionSchema = z.object({
    question_text: z.string(),
    visit_count: z.number().optional(),
    category_id: z.number(),
    answers: z.array(z.object({
        answer_text: z.string(),
    })),
});



// Create a new question in a category with answers
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {question_text, visit_count, category_id, answers} = questionSchema.parse(body);
        // Check if category exists
        if (!await prisma.category.findUnique({where: {category_id}})) {
            return NextResponse.json({question: null, message: "Category not found"}, {status: 404});
        }
        // Create a new question with
        const newQuestion = await prisma.question.create({
            data: {
                question_text,
                visit_count,
                category_id,
                answers: {
                    create: answers,
                },
            },
        });

        return NextResponse.json(
            {question: newQuestion, message: "Question created successfully"},
            {status: 201}
        );
    } catch (error) {
        console.error("Error creating question:", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}