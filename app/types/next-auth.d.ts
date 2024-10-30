import NextAuth from "next-auth"

/**
 * Module declaration for "next-auth".
 * Extends the default `user` and `Session` interfaces.
 */
declare module "next-auth" {
    interface user{
        name : string;
    }
    interface Session {
        user: user &{
            name : string
            surname : string
        }
        token: {
            name : string
            surname : string
        }
    }
}