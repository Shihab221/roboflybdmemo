import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // Validate credentials
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // Example: Hardcoded user authentication
        if (credentials.username === "admin" && credentials.password === "password") {
          return { id: 1, name: "admin", email: "admin@example.com" };
        }

        // Return null if authentication fails
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         username: { label: 'Username', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       authorize: async (credentials) => {
//         // Add your own authentication logic here
//         const user = { id: 1, name: 'admin', email: 'admin@example.com' };
//         if (user) {
//           return Promise.resolve(user);
//         } else {
//           return Promise.resolve(null);
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: 'jwt',
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id;
//       return session;
//     },
//   },
// });

// export { handler as GET, handler as POST };