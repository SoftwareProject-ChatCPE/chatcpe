import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as z from 'zod';
import { hash } from "bcryptjs";

const userUpdateSchema = z.object({
  name: z.string().optional(),
  surname: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
});

// Fetch a single user by user_id
export async function GET(request: Request, { params }: { params: { user_id: string } }) {
  try {
    const userId = parseInt(params.user_id, 10);

    // Check if the conversion resulted in a valid number
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID provided" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Exclude password from the response
    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Update a user by user_id
export async function PUT(request: Request, { params }: { params: { user_id: string } }) {
  try {
    const userId = parseInt(params.user_id, 10);

    // Check if the conversion resulted in a valid number
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID provided" }, { status: 400 });
    }

    const body = await request.json();
    const validatedData = userUpdateSchema.parse(body);

    // Hash the password if it is being updated
    if (validatedData.password) {
      validatedData.password = await hash(validatedData.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { user_id: userId },
      data: validatedData,
    });

    // Exclude password from the response
    const { password, ...userWithoutPassword } = updatedUser;
    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Delete a user by user_id
export async function DELETE(request: Request, { params }: { params: { user_id: string } }) {
  try {
    const userId = parseInt(params.user_id, 10);

    // Check if the conversion resulted in a valid number
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID provided" }, { status: 400 });
    }

    const deletedUser = await prisma.user.delete({
      where: { user_id: userId },
    });

    // Exclude password from the response
    const { password, ...userWithoutPassword } = deletedUser;
    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}