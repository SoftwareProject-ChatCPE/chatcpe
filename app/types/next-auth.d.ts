import NextAuth from "next-auth"

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