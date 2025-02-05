// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // Example: Hardcoded authentication
        if (credentials.username === "admin" && credentials.password === "password") {
          return { id: "1", name: "admin", email: "admin@example.com" }; // ✅ ID as string
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // ✅ Store user ID in the token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // ✅ Assign user ID
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
