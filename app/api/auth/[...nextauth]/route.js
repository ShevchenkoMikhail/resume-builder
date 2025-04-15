import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/app/lib/mongodb-client";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        session: async ({ session, token, user }) => {
            if (session?.user) {
                session.user.id = token?.sub || user?.id;
            }
            return session;
        },
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
            }
            return token;
        }
    },
    pages: {
        signIn: '/auth/signin',
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 дней
    },
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };