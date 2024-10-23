import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


//get an answer by answer_id
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
//update an answer by answer_id
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
