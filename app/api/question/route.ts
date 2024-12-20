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


/**
 * Handles GET requests to retrieve a list of questions from the database.
 * Each question includes its associated category and answer details.
 *
 * @param request - The incoming request object.
 * @returns A JSON response containing the list of questions with their categories and answers,
 *          or an error message if the operation fails.
 */
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

/**
 * Handles POST requests to create a new question in the database.
 * Validates the request body against a predefined schema and checks for the existence of the specified category.
 * If valid, creates a new question with an associated answer.
 *
 * @param request - The incoming request object containing the question details in JSON format.
 * @returns A JSON response containing the newly created question and a success message,
 *          or an error message if the operation fails or the input is invalid.
 */
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