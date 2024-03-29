import clientPromise from "@/libs/mongoClient";
import { User } from "@/models/User";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  secret: process.env.AUTH_SECRET_KEY,
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGO_URI!);

        const user = await User.findOne({ email });
        const passwordOk = user && password === user.password;

        if (passwordOk) {
          return user;
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
