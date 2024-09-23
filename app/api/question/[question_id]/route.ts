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
        });

        return NextResponse.json(questions, { status: 200 });
    } catch (error) {
        console.error("Error fetching questions:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


//delete a question by question_id also delete the answers
export async function DELETE(request: Request, { params }: { params: { question_id: string } }) {
    try {
        const questionId = parseInt(params.question_id, 10);

        if (isNaN(questionId)) {
            return NextResponse.json({ error: "Invalid question ID provided" }, { status: 400 });
        }

        // Delete the question and associated answers
        const deletedQuestion = await prisma.question.delete({
            where: { question_id: questionId },
            include: { answers: true },
        });

        return NextResponse.json({ message: "Question and associated answers deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting question:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
