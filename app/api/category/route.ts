import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/**
 * Handles GET requests to retrieve all categories from the database.
 * Each category includes a count of associated questions.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 * The response contains a JSON array of categories with their question counts and a status code of 200.
 * If an error occurs, it returns a JSON object with an error message and a status code of 500.
 */
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { questions: true },
        },
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


/**
 * Handles POST requests to create a new category in the database.
 *
 * @param req - The incoming request object containing the category data in JSON format.
 * 
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 * - If the category already exists, it returns a JSON object with a message and a status code of 409.
 * - If the category name is not provided, it returns a JSON object with a message and a status code of 400.
 * - If the category is successfully created, it returns a JSON object with the new category and a message, with a status code of 201.
 * - If an error occurs during the process, it returns a JSON object with an error message and a status code of 500.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { category_name } = body;

    // Check if category already exists
    const existingCategory = await prisma.category.findFirst({
      where: { category_name: category_name as string },
    });

    if (existingCategory) {
      return NextResponse.json({ category: null, message: "Category already exists" }, { status: 409 });
    }
    if (!category_name) {
      return NextResponse.json("Category name is required", { status: 400 });
    }

    const newCategory = await prisma.category.create({
      data: {
        category_name,
      },
    });

    if (!newCategory) {
      return NextResponse.json("Failed to create category", { status: 500 });
    }

    return NextResponse.json(
      { category: newCategory, message: "Category created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}