import NextAuth from "next-auth";
import {authOptions} from "@/lib/auth";

/**
 * Initializes and configures the NextAuth authentication handler.
 * 
 * @param authOptions - The configuration options for NextAuth, which include
 * settings for providers, callbacks, and other authentication-related options.
 * 
 * @returns A handler function that processes authentication requests for both
 * GET and POST methods, enabling user authentication and session management.
 */
const handle = NextAuth(authOptions);

export { handle as GET , handle as POST }