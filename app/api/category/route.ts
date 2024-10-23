import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//Get all categories
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


//Create a new category
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