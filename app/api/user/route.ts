import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import * as z from 'zod';

// Define  a scheme for input validation
const userSchema = z.object({
    name: z.string(),
    surname: z.string(),
    email: z.string().email(),
    password: z.string().min(1,).max(8,'Password must be at least 8 characters'),
})

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, surname, email, password } = userSchema.parse(body);

       // Check if email already exists
        const existingEmail = await prisma.user.findUnique({
            where: { email: email as string },
        });

       if (existingEmail) {
        return NextResponse.json({ user: null, message: "Email already exists" }, { status: 409 });
        }

        // Hash the password
        const hashedPassword = await hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                surname,
                email,
                password: hashedPassword,
            },
        });

        if (!newUser) {
            return new Response("Failed to create user", { status: 500 });
        }
    const { password: _, ...user } = newUser;
        return NextResponse.json(
            { user: newUser, message: "User created successfully" },
            { status: 201 }
        );
    } catch (error) {
        // console.error('Error creating user:', error);  // Log the error for debugging
        return new Response("Internal Server Error", { status: 500 });
    }
}

// Fetch all users
export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

//login
