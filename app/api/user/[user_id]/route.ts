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


/**
 * Handles GET requests to retrieve a user by their user ID.
 *
 * @param request - The incoming request object.
 * @param params - An object containing route parameters.
 * @param params.user_id - The ID of the user to retrieve.
 * @returns A JSON response containing the user data without the password if found,
 *          or an error message if the user is not found or if an error occurs.
 */
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


/**
 * Handles PUT requests to update a user's information by their user ID.
 *
 * @param request - The incoming request object containing the user's updated data.
 * @param params - An object containing route parameters.
 * @param params.user_id - The ID of the user to update.
 * @returns A JSON response containing the updated user data without the password if successful,
 *          or an error message if the user ID is invalid, the user is not found, or if an error occurs.
 */
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


/**
 * Handles DELETE requests to remove a user by their user ID.
 *
 * @param request - The incoming request object.
 * @param params - An object containing route parameters.
 * @param params.user_id - The ID of the user to delete.
 * @returns A JSON response containing the deleted user data without the password if successful,
 *          or an error message if the user ID is invalid, the user is not found, or if an error occurs.
 */
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