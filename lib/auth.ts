import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs";

/**
 * Configuration options for the NextAuth authentication library.
 *
 * Includes the adapter for Prisma, secret for JWT, session strategy,
 * custom pages, authentication providers, and callback methods.
 *
 * Properties:
 * - adapter: The adapter used for integration with Prisma.
 * - secret: A secret key used for signing JSON Web Tokens.
 * - session: Configuration for session management, including the strategy used.
 * - pages: Custom pages for authentication actions such as sign-in.
 * - providers: An array of authentication providers, configured here with credentials for email and password.
 * - callbacks: Callback methods for various authentication events; includes handling JWT and session information.
 */
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

                /**
                 * A boolean value indicating the result of comparing the provided password with the stored user password.
                 *
                 * The `passwordMatch` variable stores the result of an asynchronous operation that compares the
                 * `password` field from the `credentials` object with the `password` field from the `existingUser` object.
                 * The result is `true` if the passwords match, and `false` otherwise.
                 *
                 * @type {Promise<boolean>}
                 * @see compare
                 * @see credentials
                 * @see existingUser
                 */
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