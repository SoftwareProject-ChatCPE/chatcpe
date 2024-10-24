import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//get all questions with visit count and also sort them by visit count
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