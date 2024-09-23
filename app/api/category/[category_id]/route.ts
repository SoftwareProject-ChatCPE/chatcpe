import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


//Get category by category_id
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
        console.error("Error fetching category:", error);
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

        const body = await request.json();
        const { category_name } = body;

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