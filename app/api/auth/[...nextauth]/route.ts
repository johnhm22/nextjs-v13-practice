import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
// import GoogleProvider from 'next-auth/providers/Google';
import GoogleProvider from 'next-auth/providers/google'

import { connectToDB } from '@utils/database';
import User from '@models/user';

// type session =

const handler: NextAuthOptions = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user!.email,
            });

            session.user!.id = sessionUser._id.toString();
            return session;
        },

        async signIn({ profile }) {
            try {
                await connectToDB();
                //check if a user already exists
                const userExists = await User.findOne({
                    email: profile!.email,
                });
                //if not, create a new user and save to the database
                if (!userExists && profile) {
                    await User.create({
                        email: profile.email,
                        username: profile!.name!.replace(' ', '').toLowerCase(),
                        image: profile.picture,
                    });
                }
                return true;
            } catch (error) {
                console.log('ERROR is: ', error);
                return false;
            }
        },
    },
});

export { handler as GET, handler as POST };
