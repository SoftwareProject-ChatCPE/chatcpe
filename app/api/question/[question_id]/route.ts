import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


type Answer = {
    answer_text: string;
};


// Get all questions from category_id
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


//delete a category by question_id also delete the answers
export async function DELETE(request: Request, { params }: { params: { question_id: string } }) {
    try {
        const questionId = parseInt(params.question_id, 10);

        if (isNaN(questionId)) {
            return NextResponse.json({ error: "Invalid category ID provided" }, { status: 400 });
        }

        // Delete the category and associated answer
        const deletedQuestion = await prisma.question.delete({
            where: { question_id: questionId },
            include: { answer: true },
        });

        return NextResponse.json({ message: "Question and associated answer deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting category:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

//update a question by question_id also update the answers
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
