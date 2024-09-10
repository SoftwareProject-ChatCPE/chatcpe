import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
