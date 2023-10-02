import User from "@/models/userModel"
import { dbConnect } from "@/lib/db"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials
                await dbConnect()
                const user = await User.login(email, password)
                return user
            }
        })
    ],
    pages: {
        signIn: "/auth/login"
    }
})

export { handler as GET, handler as POST };