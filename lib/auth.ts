import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.JWT_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/auth/sign-in',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    console.log("Missing email or password in credentials");
                    return null;
                }
                const existingUser = await prisma.user.findFirst({
                    where: { email: credentials?.email }
                });
                if (!existingUser) {
                    console.log("User not found");
                    return null;
                }
                const passwordMatch = await compare(credentials.password, existingUser.password);
                if (!passwordMatch) {
                    console.log("Incorrect password");
                    return null;
                }
                console.log("Login success", existingUser);
                return {
                    id: `${existingUser.user_id}`,
                    email: existingUser.email,
                    name: existingUser.name,
                    surname: existingUser.surname,
                    role: existingUser.role
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    name: user.name,
                };
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    name: token.name,
                }
            };
        },
    }
};