import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


/**
 * Handles GET requests to retrieve a single category by its ID.
 *
 * @param request - The incoming request object.
 * @param params - An object containing route parameters.
 * @param params.category_id - The ID of the category to retrieve.
 * @returns A JSON response containing the category data if found, or an error message if not.
 *          - Status 200: Returns the category data.
 *          - Status 400: Returns an error if the category ID is invalid.
 *          - Status 404: Returns an error if the category is not found.
 *          - Status 500: Returns an error if there is an internal server error.
 */
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


/**
 * Updates a category's name by its ID.
 *
 * @param request - The incoming request object containing the new category data.
 * @param params - An object containing route parameters.
 * @param params.category_id - The ID of the category to update.
 * @returns A JSON response containing the updated category data if successful.
 *          - Status 200: Returns the updated category data.
 *          - Status 400: Returns an error if the category ID is invalid, the request body is invalid, or the category name is empty.
 *          - Status 500: Returns an error if there is an internal server error.
 */
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


/**
 * Deletes a category by its ID if it has no associated questions.
 *
 * @param request - The incoming request object.
 * @param params - An object containing route parameters.
 * @param params.category_id - The ID of the category to delete.
 * @returns A JSON response indicating the result of the delete operation.
 *          - Status 200: Returns a success message if the category is deleted.
 *          - Status 400: Returns an error if the category ID is invalid or if the category has associated questions.
 *          - Status 500: Returns an error if there is an internal server error.
 */
export async function DELETE(request: Request, { params }: { params: { category_id: string } }) {
    try {
        const categoryId = parseInt(params.category_id, 10);

        if (isNaN(categoryId)) {
            return NextResponse.json({ error: "Invalid category ID provided" }, { status: 400 });
        }

        const hasQuestions = await prisma.question.count({
            where: { category_id: categoryId },
        });

        if (hasQuestions > 0) {
            return NextResponse.json({ error: "Category has questions, delete questions before deleting Category" }, { status: 400 });
        }

        await prisma.category.delete({
            where: { category_id: categoryId },
        });

        return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting category:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}