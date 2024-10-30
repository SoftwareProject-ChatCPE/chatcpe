import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Handles GET requests to retrieve a list of questions from the database.
 * The questions are ordered by their visit count in descending order.
 * Each question includes its ID, text, visit count, associated category name, and answer text.
 *
 * @returns A promise that resolves to a NextResponse object containing
 * the list of questions in JSON format with a status code of 200, or an error message with a status code of 500
 * if an error occurs during the database query.
 */
export async function GET() {
    try {
   const questions = await prisma.question.findMany({
       select: {
           question_id: true,
           question_text: true,
           visit_count: true,
           category: {
               select: {
                   category_name: true,
               },
           },
           answer: {
               select:{
                     answer_text: true,
               }
           }
       },
       orderBy: {
           visit_count: 'desc',
       },
});

        return NextResponse.json(questions, { status: 200 });
    } catch (error) {
        console.error("Error getting questions:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}