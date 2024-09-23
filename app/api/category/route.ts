import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//Get all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories, { status: 200 });
  }catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
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