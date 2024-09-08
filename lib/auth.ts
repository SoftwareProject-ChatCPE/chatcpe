import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import {prisma} from "@/lib/prisma";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {compare} from "bcryptjs";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session:{
        strategy: 'jwt'

    },
    pages:{
      signIn: '/auth/sign-in',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',

            credentials: {
                email: {label: "Email", type: "email", placeholder: "jsmith@example.com"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password){
                    return null;
                }
             const existingUser = await prisma.user.findFirst({
                 where:{email:credentials?.email}
             });
                if(!existingUser){
                    return null;
                }
              const passwordMatch = await compare(credentials.password, existingUser.password);

                if(!passwordMatch){
                    return null;
                }
                return {
                    id: `${existingUser.user_id}`,
                    email: existingUser.email,
                    name: existingUser.name,
                    surname: existingUser.surname,
                    role: existingUser.role

                }
            }
        })
    ]
}