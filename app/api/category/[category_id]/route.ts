import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Get single categories
export async function GET(request: Request, { params }: { params: { category_id: string } }) {
    try {
        const categoryId = parseInt(params.category_id, 10);

        if (isNaN(categoryId)) {
            return NextResponse.json({ error: "Invalid category ID provided" }, { status: 400 });
        }

        const category = await prisma.category.findUnique({
            where: { category_id: categoryId },
        });

        if (!category) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json(category, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// Update a category by category_id
export async function PUT(request: Request, { params }: { params: { category_id: string } }) {
    try {
        const categoryId = parseInt(params.category_id, 10);

        if (isNaN(categoryId)) {
            return NextResponse.json({ error: "Invalid category ID provided" }, { status: 400 });
        }

        if (!request.body) {
            return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
        }

        const body = await request.json();
        const { category_name } = body;

        if (typeof category_name !== 'string' || category_name.trim() === "") {
            return NextResponse.json({ error: "Category name cannot be empty" }, { status: 400 });
        }

        const updatedCategory = await prisma.category.update({
            where: { category_id: categoryId },
            data: {
                category_name,
            },
        });

        return NextResponse.json(updatedCategory, { status: 200 });
    } catch (error) {
        console.error("Error updating category:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// Delete a category by category_id
export async function DELETE(request: Request, { params }: { params: { category_id: string } }) {
    try {
        const categoryId = parseInt(params.category_id, 10);

        if (isNaN(categoryId)) {
            return NextResponse.json({ error: "Invalid user ID provided" }, { status: 400 });
        }
        //check if user has questions and return error if it does
        const questions = await prisma.question.findMany({
            where: { category_id: categoryId },
        });
        if (questions.length > 0) {
            return NextResponse.json({ error: "Category has questions, delete questions before deleting Category" }, { status: 400 });
        }
        const deletedCategory = await prisma.category.delete({
            where: { category_id: categoryId },
        });

        return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}