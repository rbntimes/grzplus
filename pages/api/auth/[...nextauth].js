import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import db from "../../../db.js";

const options = {
  // Configure one or more authentication providers
  providers: [
    // Providers.Credentials({
    //   // The name to display on the sign in form (e.g. 'Sign in with...')
    //   name: "Credentials",
    //   // The credentials is used to generate a suitable form on the sign in page.
    //   // You can specify whatever fields you are expecting to be submitted.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "jsmith" },
    //     password: { label: "Password", type: "password" }
    //   },
    //   authorize: async credentials => {
    //     // Add logic here to look up the user from the credentials supplied
    //     const user = {
    //       id: 1,
    //       name: "hylke",
    //       role: "COUNSELOR",
    //       email: "cees@grzplus.nl"
    //     };
    //     console.log(user);
    //     if (user) {
    //       // Any object returned will be saved in `user` property of the JWT
    //       return Promise.resolve(user);
    //     } else {
    //       // If you return null or false then the credentials will be rejected
    //       return Promise.resolve(null);
    //       // You can also Reject this callback with an Error or with a URL:
    //       // return Promise.reject(new Error('error message')) // Redirect to error page
    //       // return Promise.reject('/path/to/redirect')        // Redirect to a URL
    //     }
    //   }
    // }),
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN
    }),
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      authorize: async credentials => {
        // Add logic here to look up the user from the credentials supplied
        console.log(credentials);
        const user = await db.one(`SELECT * FROM users WHERE email = $1`, [
          credentials.email
        ]);

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve(user);
        } else {
          // If you return null or false then the credentials will be rejected
          return Promise.reject("/");
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject('/path/to/redirect')        // Redirect to a URL
        }
      }
    })
  ],
  callbacks: {
    session: async session => {
      const user = await db.one(`SELECT * FROM users WHERE email = $1`, [
        session.user.email
      ]);

      return Promise.resolve({ ...session, dbUser: user });
    },
    signIn: async props => {
      console.log(props, "----------------------------");
      return Promise.resolve(true);
    }
  }

  // A database is optional, but required to persist accounts in a database
  // database: {
  //   host: process.env.HOST,
  //   port: Number(process.env.PORT),
  //   database: process.env.DATABASE,
  //   user: process.env.DB_USER,
  //   password: process.env.PASSWORD,
  //   ssl: {
  //     rejectUnauthorized: false
  //   }
  // }
};

export default (req, res) => NextAuth(req, res, options);
