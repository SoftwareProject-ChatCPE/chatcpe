import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import * as z from 'zod';

// Define  a scheme for input validation
const userSchema = z.object({
    name: z.string(),
    surname: z.string(),
    email: z.string().email(),
    password: z.string().min(8,).max(30,'Password must be at least 8 characters'),
})

/**
 * Fetches all users from the database.
 *
 * @returns {Promise<Response>} A promise that resolves to a NextResponse object containing
 * the list of users in JSON format with a status code of 200 if successful,
 * or a Response object with a status code of 500 in case of an error.
 */
export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

/**
 * Handles the creation of a new user by processing the incoming request.
 * Validates the request body, checks for existing email, hashes the password,
 * and stores the new user in the database.
 *
 * @param req - The incoming HTTP request object containing the user data in JSON format.
 * @returns A promise that resolves to a NextResponse object. If the user is created successfully,
 * it returns the user data and a success message with a status code of 201.
 * If the email already exists, it returns a conflict message with a status code of 409.
 * In case of any other error, it returns an internal server error message with a status code of 500.
 */
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
        console.error('Error creating user:', error);  // Log the error for debugging
        return new Response("Internal Server Error", { status: 500 });
    }
}



